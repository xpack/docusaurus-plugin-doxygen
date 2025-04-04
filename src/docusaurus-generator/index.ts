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

import { CompoundDefType } from '../doxygen-xml-parser/compounddef.js'
import { DoxygenData } from '../doxygen-xml-parser/index.js'
import * as fs from 'fs/promises'
import { PluginOptions } from '../plugin/options.js'
import assert from 'assert'
import { Folders } from '../data-model/folders.js'
import { Files } from '../data-model/files.js'
import path from 'path'

// ----------------------------------------------------------------------------

export class DocusaurusGenerator {
  // The data parsed from the Doxygen XML files.
  doxygenData: DoxygenData
  // From the project docusaurus.config.ts or defaults.
  options: PluginOptions
  // A map of compound definitions, indexed by their id.
  compoundDefsById: Map<string, CompoundDefType> = new Map()
  // Permalinks are relative to the Docusaurus baseUrl folder.
  permalinksById: Map<string, string> = new Map()
  docusaurusIdsById: Map<string, string> = new Map()

  folders: Folders
  files: Files

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

  // --------------------------------------------------------------------------

  constructor ({
    doxygenData,
    options
  }: {
    doxygenData: DoxygenData
    options: PluginOptions
  }) {
    // console.log('DocusaurusGenerator.constructor()')
    this.doxygenData = doxygenData
    this.options = options

    this.folders = new Folders(this.doxygenData.compoundDefs)
    this.files = new Files(this.doxygenData.compoundDefs)
  }

  async generate (): Promise<void> {
    this.createCompoundDefsMap()
    this.createFilesHierarchies()

    this.createPermalinksMap()

    await this.prepareOutputFolder()
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

  createFilesHierarchies (): void {
    // console.log('DocusaurusGenerator.createFilesHierarchies()')
    // Create Folders & Files hierarchies.
    // console.log(this.folders.membersById.size)
    for (const [id, item] of this.folders.membersById) {
      for (const folderId of item.childrenFoldersIds) {
        const folder = this.folders.membersById.get(folderId)
        assert(folder !== undefined)
        // console.log('folderId', folderId,'has parent', id)
        folder.parentFolderId = id
      }
      for (const fileId of item.childrenFilesIds) {
        const file = this.files.membersById.get(fileId)
        assert(file !== undefined)
        // console.log('fileId', fileId,'has parent', id)
        file.parentFolderId = id
      }
    }
  }

  createPermalinksMap (): void {
    // console.log('DocusaurusGenerator.createPermalinksMap()')

    assert(this.options.outputFolderPath)
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

  // https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs
  async prepareOutputFolder (): Promise<void> {
    assert(this.options.outputFolderPath)
    const outputFolderPath = this.options.outputFolderPath
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
    console.log('Generating Docusaurus pages...')

    for (const compoundDef of this.doxygenData.compoundDefs) {
      const permalink = this.permalinksById.get(compoundDef.id)
      assert(permalink !== undefined)
      assert(this.options.outputFolderPath)
      const outputFolderPath = this.options.outputFolderPath
      console.log(compoundDef.compoundName, '->', `${outputFolderPath}${permalink}`)

      const docusaurusId = this.docusaurusIdsById.get(compoundDef.id)
      assert(docusaurusId !== undefined)

      const fileName = `${docusaurusId}.mdx`
      // console.log('fileName:', fileName)

      const filePath = `${outputFolderPath}${fileName}`
      const folderPath = path.dirname(filePath)

      // console.log('filePath:', filePath)

      await fs.mkdir(folderPath, { recursive: true })

      const fileHandle = await fs.open(filePath, 'ax')

      // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
      let text = ''
      text += '---\n'
      text += '\n'
      text += '# DO NOT EDIT!\n'
      text += '# Automatically generated via docusaurus-plugin-doxygen by Doxygen.\n'
      text += '\n'
      text += `title: ${compoundDef.compoundName}\n`
      text += `slug: /api${permalink}\n`
      text += 'description: ...\n'
      text += 'custom_edit_url: null\n'
      text += 'keywords:\n'
      text += '  - doxygen\n'
      text += '  - reference\n'
      text += `  - ${compoundDef.kind}\n`
      text += '\n'
      text += 'date: 2020-07-21 17:49:00 +0300\n'
      text += '\n'
      text += '---\n'
      text += '\n'
      text += `TODO ${compoundDef.compoundName}\n`

      await fileHandle.write(text)

      await fileHandle.close()
    }

    {
      const fileHandle = await fs.open('docs/api/index.mdx', 'ax')

      // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
      let text = ''
      text += '---\n'
      text += '\n'
      text += '# DO NOT EDIT!\n'
      text += '# Automatically generated via docusaurus-plugin-doxygen by Doxygen.\n'
      text += '\n'
      text += 'title: Reference\n'
      text += 'slug: /api\n'
      text += 'description: ...\n'
      text += 'custom_edit_url: null\n'
      text += 'keywords:\n'
      text += '  - doxygen\n'
      text += '  - reference\n'
      text += '\n'
      text += 'date: 2020-07-21 17:49:00 +0300\n'
      text += '\n'
      text += '---\n'
      text += '\n'
      text += 'TODO Reference\n'

      await fileHandle.write(text)

      await fileHandle.close()
    }

    {
      const fileHandle = await fs.open('docs/api/namespaces/index.mdx', 'ax')

      // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
      let text = ''
      text += '---\n'
      text += '\n'
      text += '# DO NOT EDIT!\n'
      text += '# Automatically generated via docusaurus-plugin-doxygen by Doxygen.\n'
      text += '\n'
      text += 'title: Reference\n'
      text += 'slug: /api/namespaces\n'
      text += 'description: ...\n'
      text += 'custom_edit_url: null\n'
      text += 'keywords:\n'
      text += '  - doxygen\n'
      text += '  - namespaces\n'
      text += '\n'
      text += 'date: 2020-07-21 17:49:00 +0300\n'
      text += '\n'
      text += '---\n'
      text += '\n'
      text += 'TODO Namespaces\n'

      await fileHandle.write(text)

      await fileHandle.close()
    }

    {
      const fileHandle = await fs.open('docs/api/classes/index.mdx', 'ax')

      // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
      let text = ''
      text += '---\n'
      text += '\n'
      text += '# DO NOT EDIT!\n'
      text += '# Automatically generated via docusaurus-plugin-doxygen by Doxygen.\n'
      text += '\n'
      text += 'title: Reference\n'
      text += 'slug: /api/classes\n'
      text += 'description: ...\n'
      text += 'custom_edit_url: null\n'
      text += 'keywords:\n'
      text += '  - doxygen\n'
      text += '  - classes\n'
      text += '\n'
      text += 'date: 2020-07-21 17:49:00 +0300\n'
      text += '\n'
      text += '---\n'
      text += '\n'
      text += 'TODO Classes\n'

      await fileHandle.write(text)

      await fileHandle.close()
    }

    {
      const fileHandle = await fs.open('docs/api/folders/index.mdx', 'ax')

      // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
      let text = ''
      text += '---\n'
      text += '\n'
      text += '# DO NOT EDIT!\n'
      text += '# Automatically generated via docusaurus-plugin-doxygen by Doxygen.\n'
      text += '\n'
      text += 'title: Reference\n'
      text += 'slug: /api/folders\n'
      text += 'description: ...\n'
      text += 'custom_edit_url: null\n'
      text += 'keywords:\n'
      text += '  - doxygen\n'
      text += '  - folders\n'
      text += '\n'
      text += `date: ${this.formatDate(new Date())}\n`
      text += '\n'
      text += '---\n'
      text += '\n'
      text += 'TODO Folders\n'

      await fileHandle.write(text)

      await fileHandle.close()
    }
  }

  formatDate (date: Date): string {
    // Custom format: YYYY-MM-DD HH:mm:ss
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} +0000`
  }
}

// ----------------------------------------------------------------------------
