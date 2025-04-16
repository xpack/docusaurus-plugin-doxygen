/*
 * This file is part of the xPack project (http://xpack.github.io).
 * Copyright (c) 2025 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/licenses/MIT.
 */

// ----------------------------------------------------------------------------

import assert from 'assert'
import * as fs from 'fs/promises'
import path from 'path'
import * as util from 'node:util'

import { AbstractCompoundDefType } from '../doxygen-xml-parser/compounddef.js'
import { DoxygenData } from '../doxygen-xml-parser/index.js'
import { PluginOptions } from '../plugin/options.js'
import { SidebarItem } from '../plugin/types.js'
import { Classes } from './data-model/classes.js'
import { Files } from './data-model/files.js'
import { Folders } from './data-model/folders.js'
import { Groups } from './data-model/groups.js'
import { Namespaces } from './data-model/namespaces.js'
import { DoxygenFileOptions } from './data-model/options.js'
import { DescriptionTypeGenerator, DocEmptyType, DocMarkupType, DocParamListType, DocParaType, DocRefTextType, DocSimpleSectType, DocURLLink, ListingType } from './elements-generators/descriptiontype.js'
import { ElementGeneratorBase } from './elements-generators/element-generator-base.js'
import { PageGeneratorBase as GeneratorBase } from './pages-generators/base.js'
import { GroupGenerator } from './pages-generators/group.js'
import { Sidebar } from './sidebar.js'
import { FrontMatter } from './types.js'
import { formatDate } from './utils.js'
import { RefType } from './elements-generators/reftype.js'
import { NamespaceGenerator } from './pages-generators/namespace.js'
import { ClassPageGenerator } from './pages-generators/class.js'
import { Pages } from './data-model/pages.js'
import { IncType } from './elements-generators/inctype.js'
import { SectionDefType } from './elements-generators/sectiondeftype.js'
import { DocListType } from './elements-generators/doclisttype.js'

// ----------------------------------------------------------------------------

export class DocusaurusGenerator {
  // The data parsed from the Doxygen XML files.
  doxygenData: DoxygenData
  // From the project docusaurus.config.ts or defaults.
  pluginOptions: PluginOptions

  doxygenOptions: DoxygenFileOptions
  // A map of compound definitions, indexed by their id.
  compoundDefsById: Map<string, AbstractCompoundDefType> = new Map()
  // Permalinks are relative to the Docusaurus baseUrl folder.
  permalinksById: Map<string, string> = new Map()
  docusaurusIdsById: Map<string, string> = new Map()

  groups: Groups
  namespaces: Namespaces
  folders: Folders
  files: Files
  classes: Classes
  pages: Pages

  // kind: DoxCompoundKind
  permalinkPrefixesByKind: { [key: string]: string } = {
    class: 'classes',
    struct: 'structs',
    union: 'unions',
    interface: 'interfaces',
    protocol: 'protocols',
    category: 'categories',
    exception: 'exceptions',
    service: 'services',
    singleton: 'singletons',
    module: 'modules',
    type: 'types',
    file: 'files',
    namespace: 'namespaces',
    group: 'groups',
    page: 'pages',
    example: 'examples',
    dir: 'folders',
    concept: 'concepts'
  }

  pageGenerators: Map<string, GeneratorBase> = new Map()

  elementGenerators: Map<string, ElementGeneratorBase> = new Map()

  // --------------------------------------------------------------------------

  constructor ({
    doxygenData, pluginOptions
  }: {
    doxygenData: DoxygenData
    pluginOptions: PluginOptions
  }) {
    // console.log('DocusaurusGenerator.constructor()')
    this.doxygenData = doxygenData
    this.pluginOptions = pluginOptions

    this.groups = new Groups(this.doxygenData.compoundDefs)
    this.namespaces = new Namespaces(this.doxygenData.compoundDefs)
    this.folders = new Folders(this.doxygenData.compoundDefs)
    this.files = new Files(this.doxygenData.compoundDefs, this.folders)
    this.classes = new Classes(this.doxygenData.compoundDefs)
    this.pages = new Pages(this.doxygenData.compoundDefs)

    this.doxygenOptions = new DoxygenFileOptions(this.doxygenData.doxyfile.options)

    // Add generators for the top pages, grouped by 'kind'.
    this.pageGenerators.set('group', new GroupGenerator(this))
    this.pageGenerators.set('namespace', new NamespaceGenerator(this))
    this.pageGenerators.set('class', new ClassPageGenerator(this))

    // Add generators for the parsed xml elements.
    this.elementGenerators.set('AbstractDescriptionType', new DescriptionTypeGenerator(this))
    this.elementGenerators.set('AbstractDescriptionType', new DescriptionTypeGenerator(this))
    this.elementGenerators.set('AbstractDocParaType', new DocParaType(this))
    this.elementGenerators.set('AbstractDocURLLink', new DocURLLink(this))
    this.elementGenerators.set('AbstractRefType', new RefType(this))
    this.elementGenerators.set('AbstractDocMarkupType', new DocMarkupType(this))
    this.elementGenerators.set('AbstractDocRefTextType', new DocRefTextType(this))
    this.elementGenerators.set('AbstractDocSimpleSectType', new DocSimpleSectType(this))
    this.elementGenerators.set('AbstractListingType', new ListingType(this))
    this.elementGenerators.set('AbstractDocEmptyType', new DocEmptyType(this))
    this.elementGenerators.set('AbstractIncType', new IncType(this))
    this.elementGenerators.set('AbstractSectionDefType', new SectionDefType(this))
    this.elementGenerators.set('AbstractDocParamListType', new DocParamListType(this))
    this.elementGenerators.set('AbstractDocListType', new DocListType(this))
  }

  async generate (): Promise<void> {
    this.createCompoundDefsMap()

    this.createPermalinksMap()

    await this.prepareOutputFolder()
    await this.writeSidebar()
    await this.generatePages()
  }

  // --------------------------------------------------------------------------
  createCompoundDefsMap (): void {
    // console.log('DocusaurusGenerator.createCompoundDefsMap()')
    for (const compoundDef of this.doxygenData.compoundDefs) {
      // console.log(compoundDef.id)
      this.compoundDefsById.set(compoundDef.id, compoundDef)
    }
  }

  createPermalinksMap (): void {
    // console.log('DocusaurusGenerator.createPermalinksMap()')
    assert(this.pluginOptions.outputFolderPath)
    // const outputFolderPath = this.options.outputFolderPath
    for (const compoundDef of this.doxygenData.compoundDefs) {
      // console.log(compoundDef.kind, compoundDef.compoundName)
      const kind = compoundDef.kind
      const prefix = this.permalinkPrefixesByKind[kind]
      assert(prefix !== undefined)

      const id = compoundDef.id

      let name: string = ''
      if (kind === 'dir') {
        name = this.folders.getPathRecursive(id)
      } else if (kind === 'file') {
        const file = this.files.membersById.get(id)
        assert(file !== undefined)
        if (file.parentFolderId.length > 0) {
          name = this.folders.getPathRecursive(file.parentFolderId) + '/'
        }
        name += compoundDef.compoundName
      } else if (kind === 'class' || kind === 'namespace') {
        name = compoundDef.compoundName.replaceAll('::', '/')
      } else {
        name = compoundDef.compoundName
      }
      name = name.replaceAll(/[^a-zA-Z0-9/-]/g, '-')
      // const permalink = `/${outputFolderPath}/${prefix}/${name}`
      const permalink = `/${prefix}/${name}`
      // console.log('permalink:', permalink)
      this.permalinksById.set(compoundDef.id, permalink)

      const docusaurusId = `/${prefix}/${name.replaceAll('/', '-') as string}`
      this.docusaurusIdsById.set(compoundDef.id, docusaurusId)
    }
  }

  async writeSidebar (): Promise<void> {
    const sidebar = new Sidebar(this)

    const sidebarItems: SidebarItem[] = sidebar.createItems()
    // console.log('sidebarItems:', util.inspect(sidebarItems, { compact: false, depth: 999 }))
    const jsonString = JSON.stringify(sidebarItems, null, 2)

    assert(this.pluginOptions.outputFolderPath)
    assert(this.pluginOptions.sidebarFileName)
    const filePath = path.join(this.pluginOptions.outputFolderPath, this.pluginOptions.sidebarFileName)

    // Superfluous if done after prepareOutputFolder()
    await fs.mkdir(path.dirname(this.pluginOptions.outputFolderPath), { recursive: true })

    console.log(`Writing sidebar file ${filePath as string}...`)
    await fs.writeFile(filePath, jsonString, 'utf8')
  }

  // https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs
  async prepareOutputFolder (): Promise<void> {
    assert(this.pluginOptions.outputFolderPath)
    const outputFolderPath = this.pluginOptions.outputFolderPath
    try {
      await fs.access(outputFolderPath)
      // Remove the folder if it exist.
      console.log(`Removing existing folder ${outputFolderPath}...`)
      await fs.rm(outputFolderPath, { recursive: true, force: true })
    } catch (err) {
      // The folder does not exist, nothing to do.
    }
    // Create the folder as empty.
    await fs.mkdir(outputFolderPath, { recursive: true })
  }

  // https://nodejs.org/en/learn/manipulating-files/working-with-file-descriptors-in-nodejs
  async generatePages (): Promise<void> {
    // console.log('DocusaurusGenerator.generatePages()')
    console.log('Generating Docusaurus pages (object -> url)...')

    assert(this.pluginOptions.outputFolderPath)
    const outputFolderPath = this.pluginOptions.outputFolderPath

    for (const compoundDef of this.doxygenData.compoundDefs) {
      if (compoundDef.kind === 'page' && compoundDef.id === 'indexpage') {
        // This is the @mainpage. We diverge from Doxygen and generate
        // the API main page differently, with the list of topics and
        // this page detailed description. Therefore it is not generated
        // as a regular page and must be skipped at this stage.
        continue
      }
      const permalink = this.permalinksById.get(compoundDef.id)
      assert(permalink !== undefined)
      console.log(`${compoundDef.kind}: ${compoundDef.compoundName}`, '->', `${outputFolderPath}${permalink}...`)

      const docusaurusId = this.docusaurusIdsById.get(compoundDef.id)
      assert(docusaurusId !== undefined)

      const fileName = `${docusaurusId}.mdx`
      // console.log('fileName:', fileName)
      const filePath = `${outputFolderPath}${fileName}`

      const frontMatter: FrontMatter = {
        title: `${compoundDef.compoundName}`,
        slug: `${outputFolderPath.replace(/^docs/, '')}${permalink}`,
        description: '...',
        custom_edit_url: null,
        keywords: ['doxygen', 'reference', `${compoundDef.kind}`]
      }

      let bodyText = `TODO ${compoundDef.compoundName}\n`
      const docusaurusGenerator = this.pageGenerators.get(compoundDef.kind)
      if (docusaurusGenerator !== undefined) {
        bodyText = await docusaurusGenerator.renderMdx(compoundDef, frontMatter)
      } else {
        // console.error(util.inspect(compoundDef), { compact: false, depth: 999 })
        console.error('page generator for', compoundDef.kind, 'not implemented yet in', this.constructor.name)
        // TODO: enable it after implementing folders & files
        // continue
      }

      await this.writeFile({
        filePath,
        frontMatter,
        bodyText
      })

      if (compoundDef.kind === 'file') {
        const permalink = this.permalinksById.get(compoundDef.id) + '/source'
        assert(permalink !== undefined)
        console.log(`${compoundDef.kind}: ${compoundDef.compoundName}`, '->', `${outputFolderPath}${permalink}`)

        const docusaurusId = this.docusaurusIdsById.get(compoundDef.id)
        assert(docusaurusId !== undefined)

        const fileName = `${docusaurusId}-source.mdx`
        // console.log('fileName:', fileName)
        const filePath = `${outputFolderPath}${fileName}`

        const frontMatter: FrontMatter = {
          title: `${compoundDef.compoundName}`,
          slug: `${outputFolderPath.replace(/^docs/, '')}${permalink}`,
          description: '...',
          custom_edit_url: null,
          keywords: ['doxygen', 'reference', `${compoundDef.kind}`, 'source']
        }

        let bodyText = `TODO ${compoundDef.compoundName}\n`
        const docusaurusGenerator = this.pageGenerators.get(compoundDef.kind)
        if (docusaurusGenerator !== undefined) {
          bodyText = await docusaurusGenerator.renderMdx(compoundDef, frontMatter)
        } else {
          // console.error(util.inspect(compoundDef), { compact: false, depth: 999 })
          console.error('page generator for', compoundDef.kind, 'not implemented yet in', this.constructor.name)
          // TODO: enable it after implementing folders & files
          // continue
        }

        await this.writeFile({
          filePath,
          frontMatter,
          bodyText
        })
      }
    }

    {
      // Home page for the API reference.
      // It diverts from Doxygen, since it renders the list of topics and
      // the main page.
      const filePath = `${outputFolderPath}/index.mdx`

      const projectBrief = this.doxygenOptions.getOptionCdataValue('PROJECT_BRIEF')
      const permalink = '' // The root of the API sub-site.

      const frontMatter: FrontMatter = {
        title: `${projectBrief} API Reference`,
        slug: `${outputFolderPath.replace(/^docs/, '')}/${permalink}`,
        description: '...',
        custom_edit_url: null,
        keywords: ['doxygen', 'reference']
      }

      const docusaurusGenerator = this.pageGenerators.get('group')
      assert(docusaurusGenerator !== undefined)
      const bodyText = await docusaurusGenerator.renderIndexMdx()

      await this.writeFile({
        filePath,
        frontMatter,
        bodyText
      })
    }

    {
      const filePath = `${outputFolderPath}/namespaces/index.mdx`
      const permalink = 'namespaces'

      const frontMatter: FrontMatter = {
        title: 'The Namespaces Reference',
        slug: `${outputFolderPath.replace(/^docs/, '')}/${permalink}`,
        description: '...',
        custom_edit_url: null,
        keywords: ['doxygen', 'namespaces', 'reference']
      }

      const docusaurusGenerator = this.pageGenerators.get('namespace')
      assert(docusaurusGenerator !== undefined)
      const bodyText = await docusaurusGenerator.renderIndexMdx()

      await this.writeFile({
        filePath,
        frontMatter,
        bodyText
      })
    }

    {
      const filePath = `${outputFolderPath}/classes/index.mdx`
      const permalink = 'classes'

      const frontMatter: FrontMatter = {
        title: 'The Classes Reference',
        slug: `${outputFolderPath.replace(/^docs/, '')}/${permalink}`,
        description: '...',
        custom_edit_url: null,
        keywords: ['doxygen', 'classes', 'reference']
      }

      const docusaurusGenerator = this.pageGenerators.get('class')
      assert(docusaurusGenerator !== undefined)
      const bodyText = await docusaurusGenerator.renderIndexMdx()

      await this.writeFile({
        filePath,
        frontMatter,
        bodyText
      })
    }

    {
      const frontMatter: FrontMatter = {
        title: 'The Folders & Files Reference',
        slug: '/api/folders',
        description: '...',
        custom_edit_url: null,
        keywords: ['doxygen', 'folders']
      }

      await this.writeFile({
        filePath: 'docs/api/folders/index.mdx',
        frontMatter,
        bodyText: 'TODO Folders\n'
      })
    }
  }

  async writeFile ({
    filePath,
    bodyText,
    frontMatter
  }: {
    filePath: string
    bodyText: string
    frontMatter: FrontMatter
  }): Promise<void> {
    bodyText += '\n'
    bodyText += `<GeneratedByDoxygen version="${this.doxygenData.doxygenindex.version}" />\n`

    // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
    let frontMatterText = ''
    frontMatterText += '---\n'
    frontMatterText += '\n'
    frontMatterText += '# DO NOT EDIT!\n'
    frontMatterText += '# Automatically generated via docusaurus-plugin-doxygen by Doxygen.\n'
    frontMatterText += '\n'
    for (const [key, value] of Object.entries(frontMatter)) {
      if (Array.isArray(value)) {
        frontMatterText += `${key}:\n`
        for (const arrayValue of frontMatter[key] as string[]) {
          frontMatterText += `  - ${arrayValue}\n`
        }
      } else if (typeof value === 'boolean') {
        frontMatterText += `${key}: ${value ? 'true' : 'false'}\n`
      } else {
        frontMatterText += `${key}: ${value}\n`
      }
    }
    frontMatterText += '\n'
    frontMatterText += `date: ${formatDate(new Date())}\n`
    frontMatterText += '\n'
    frontMatterText += '---\n'
    frontMatterText += '\n'

    if (bodyText.includes('<Link')) {
      frontMatterText += 'import Link from \'@docusaurus/Link\'\n'
    }

    // Theme components.
    if (bodyText.includes('<CodeBlock')) {
      frontMatterText += 'import CodeBlock from \'@theme/CodeBlock\'\n'
    }
    if (bodyText.includes('<Admonition')) {
      frontMatterText += 'import Admonition from \'@theme/Admonition\'\n'
    }

    const components = [
      'GeneratedByDoxygen',
      'MembersList',
      'MembersListItem',
      'TreeTable',
      'TreeTableRow',
      'ParametersList',
      'ParametersListItem',
      'MemberDefinition'
    ]

    for (const component of components) {
      if (bodyText.includes(`<${component}`)) {
        frontMatterText += `import ${component} from '@xpack/docusaurus-plugin-doxygen/components/${component}'\n`
      }
    }

    frontMatterText += '\n'

    await fs.mkdir(path.dirname(filePath), { recursive: true })

    const fileHandle = await fs.open(filePath, 'ax')

    await fileHandle.write(frontMatterText)
    await fileHandle.write(bodyText)

    await fileHandle.close()
  }

  getPermalink (refid: string): string {
    return `/${this.pluginOptions.outputFolderPath}${this.permalinksById.get(refid)}`
  }

  getElementRenderer (element: Object): ElementGeneratorBase | undefined {
    let elementClass = element.constructor
    while (elementClass.name !== '') {
      const elementGenerator = this.elementGenerators.get(elementClass.name)
      if (elementGenerator !== undefined) {
        return elementGenerator
      }
      elementClass = Object.getPrototypeOf(elementClass)
    }

    console.error(util.inspect(element), { compact: false, depth: 999 })
    console.error('no element generator for', element.constructor.name, 'in', this.constructor.name)
    return undefined
  }

  renderElementMdx (element: Object | undefined): string {
    if (element === undefined) {
      return ''
    }

    if (typeof element === 'string') {
      return element
    }

    if (Array.isArray(element)) {
      let result = ''
      for (const elementOfArray of element) {
        result += this.renderElementMdx(elementOfArray)
      }
      return result
    }

    const renderer: ElementGeneratorBase | undefined = this.getElementRenderer(element)
    if (renderer === undefined) {
      // The error was displayed in getElementRenderer().
      return ''
    }

    return renderer.renderMdx(element)
  }

  renderElementsMdx (elements: Object[] | undefined): string {
    if (elements === undefined) {
      return ''
    }

    let result = ''
    for (const element of elements) {
      result += this.renderElementMdx(element)
    }

    return result
  }
}

// ----------------------------------------------------------------------------
