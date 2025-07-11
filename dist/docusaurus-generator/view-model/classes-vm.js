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
import assert from 'node:assert';
import crypto from 'node:crypto';
import { CompoundBase } from './compound-base-vm.js';
import { CollectionBase } from './collection-base.js';
import { escapeHtml, escapeMdx, flattenPath, sanitizeHierarchicalPath } from '../utils.js';
import { IndexEntry } from './indices-vm.js';
// ----------------------------------------------------------------------------
const kindsPlurals = {
    class: 'Classes',
    struct: 'Structs',
    union: 'Unions'
};
// ----------------------------------------------------------------------------
export class Classes extends CollectionBase {
    constructor() {
        super(...arguments);
        // compoundsById: Map<string, Class>
        this.topLevelClasses = [];
    }
    // --------------------------------------------------------------------------
    // constructor (workspace: Workspace) {
    //   super(workspace)
    //   // this.compoundsById = new Map()
    // }
    // --------------------------------------------------------------------------
    addChild(compoundDef) {
        const classs = new Class(this, compoundDef);
        this.collectionCompoundsById.set(classs.id, classs);
        return classs;
    }
    // --------------------------------------------------------------------------
    createCompoundsHierarchies() {
        // Recreate classes hierarchies.
        for (const [classId, base] of this.collectionCompoundsById) {
            const classs = base;
            for (const baseClassId of classs.baseClassIds) {
                // console.log(classId, baseClassId)
                const baseClass = this.collectionCompoundsById.get(baseClassId);
                if (baseClass !== undefined) {
                    // console.log('baseClassId', baseClassId, 'has child', classId)
                    baseClass.children.push(classs);
                    classs.baseClasses.push(baseClass);
                }
                else {
                    console.warn(baseClassId, 'ignored as base class for', classId);
                }
            }
        }
        for (const [classId, base] of this.collectionCompoundsById) {
            const classs = base;
            if (classs.baseClassIds.size === 0) {
                // console.log('topLevelClassId:', classId)
                this.topLevelClasses.push(classs);
            }
        }
    }
    // --------------------------------------------------------------------------
    createSidebarItems() {
        // Add classes to the sidebar.
        // Top level classes are added below a Class category
        const classesCategory = {
            type: 'category',
            label: 'Classes',
            link: {
                type: 'doc',
                id: `${this.workspace.sidebarBaseId}classes/index`
            },
            collapsed: true,
            items: []
        };
        classesCategory.items.push({
            type: 'category',
            label: '#Index',
            link: {
                type: 'doc',
                id: `${this.workspace.sidebarBaseId}index/classes/all`
            },
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'All',
                    id: `${this.workspace.sidebarBaseId}index/classes/all`
                },
                {
                    type: 'doc',
                    label: 'Classes',
                    id: `${this.workspace.sidebarBaseId}index/classes/classes`
                },
                {
                    type: 'doc',
                    label: 'Functions',
                    id: `${this.workspace.sidebarBaseId}index/classes/functions`
                },
                {
                    type: 'doc',
                    label: 'Variables',
                    id: `${this.workspace.sidebarBaseId}index/classes/variables`
                },
                {
                    type: 'doc',
                    label: 'Typedefs',
                    id: `${this.workspace.sidebarBaseId}index/classes/typedefs`
                }
            ]
        });
        for (const classs of this.topLevelClasses) {
            const item = this.createSidebarItemRecursively(classs);
            if (item !== undefined) {
                classesCategory.items.push(item);
            }
        }
        return [classesCategory];
    }
    createSidebarItemRecursively(classs) {
        if (classs.sidebarLabel === undefined) {
            return undefined;
        }
        if (classs.children.length === 0) {
            const docItem = {
                type: 'doc',
                label: classs.sidebarLabel,
                id: `${this.workspace.sidebarBaseId}${classs.docusaurusId}`
            };
            return docItem;
        }
        else {
            const categoryItem = {
                type: 'category',
                label: classs.sidebarLabel,
                link: {
                    type: 'doc',
                    id: `${this.workspace.sidebarBaseId}${classs.docusaurusId}`
                },
                collapsed: true,
                items: []
            };
            for (const child of classs.children) {
                const item = this.createSidebarItemRecursively(child);
                if (item !== undefined) {
                    categoryItem.items.push(item);
                }
            }
            return categoryItem;
        }
    }
    // --------------------------------------------------------------------------
    createMenuItems() {
        const menuItem = {
            label: 'Classes',
            to: `${this.workspace.menuBaseUrl}classes/`
        };
        return [menuItem];
    }
    // --------------------------------------------------------------------------
    async generateIndexDotMdxFile() {
        const filePath = `${this.workspace.outputFolderPath}classes/index.mdx`;
        const permalink = 'classes';
        const frontMatter = {
            title: 'The Classes Reference',
            slug: `${this.workspace.slugBaseUrl}${permalink}`,
            // description: '...', // TODO
            custom_edit_url: null,
            keywords: ['doxygen', 'classes', 'reference']
        };
        const lines = [];
        lines.push('The classes, structs, union and interfaces used by this project are:');
        lines.push('');
        lines.push('<TreeTable>');
        for (const classs of this.topLevelClasses) {
            lines.push(...this.generateIndexMdxFileRecursively(classs, 1));
        }
        lines.push('');
        lines.push('</TreeTable>');
        console.log(`Writing classes index file ${filePath}...`);
        await this.workspace.writeMdxFile({
            filePath,
            frontMatter,
            bodyLines: lines
        });
    }
    generateIndexMdxFileRecursively(classs, depth) {
        // console.log(util.inspect(classs, { compact: false, depth: 999 }))
        const lines = [];
        const permalink = this.workspace.getPagePermalink(classs.id);
        assert(permalink !== undefined && permalink.length > 1);
        const iconLetters = {
            class: 'C',
            struct: 'S',
            union: 'U'
        };
        let iconLetter = iconLetters[classs.kind];
        if (iconLetter === undefined) {
            console.error('Icon kind', classs.kind, 'not supported yet in', this.constructor.name, '(using ?)');
            iconLetter = '?';
        }
        const label = escapeMdx(classs.unqualifiedName);
        lines.push('');
        lines.push('<TreeTableRow');
        lines.push(`  itemIconLetter="${iconLetter}"`);
        lines.push(`  itemLabel="${label}"`);
        lines.push(`  itemLink="${permalink}"`);
        lines.push(`  depth = "${depth}" >`);
        if (classs.briefDescriptionMdxText !== undefined && classs.briefDescriptionMdxText.length > 0) {
            lines.push(classs.briefDescriptionMdxText.replace(/[.]$/, ''));
        }
        lines.push('</TreeTableRow>');
        if (classs.children.length > 0) {
            for (const childClass of classs.children) {
                lines.push(...this.generateIndexMdxFileRecursively(childClass, depth + 1));
            }
        }
        return lines;
    }
    async generatePerInitialsIndexMdxFiles() {
        const allUnorderedEntriesMap = new Map();
        for (const [compoundId, compound] of this.collectionCompoundsById) {
            const compoundEntry = new IndexEntry(compound);
            allUnorderedEntriesMap.set(compoundEntry.id, compoundEntry);
            for (const section of compound.sections) {
                for (const member of section.definitionMembers) {
                    const memberEntry = new IndexEntry(member);
                    allUnorderedEntriesMap.set(memberEntry.id, memberEntry);
                }
            }
        }
        // ------------------------------------------------------------------------
        const outputFolderPath = this.workspace.outputFolderPath;
        {
            const filePath = `${outputFolderPath}index/classes/all.mdx`;
            const permalink = 'index/classes/all';
            const frontMatter = {
                title: 'The Classes and Members Index',
                slug: `${this.workspace.slugBaseUrl}${permalink}`,
                // description: '...', // TODO
                custom_edit_url: null,
                keywords: ['doxygen', 'classes', 'index']
            };
            const lines = [];
            lines.push('The classes, structs, union interfaces and their members, variables, types used by this project are:');
            const orderedEntriesMap = this.orderPerInitials(allUnorderedEntriesMap);
            lines.push(...this.outputEntries(orderedEntriesMap));
            console.log(`Writing index file ${filePath}...`);
            await this.workspace.writeMdxFile({
                filePath,
                frontMatter,
                bodyLines: lines
            });
        }
        // ------------------------------------------------------------------------
        {
            const filePath = `${outputFolderPath}index/classes/classes.mdx`;
            const permalink = 'index/classes/classes';
            const frontMatter = {
                title: 'The Classes Index',
                slug: `${this.workspace.slugBaseUrl}${permalink}`,
                // description: '...', // TODO
                custom_edit_url: null,
                keywords: ['doxygen', 'classes', 'index']
            };
            const lines = [];
            lines.push('The classes, structs, union interfaces used by this project are:');
            const classesUnorderedMap = new Map();
            for (const [id, entry] of allUnorderedEntriesMap) {
                if (entry.objectKind === 'compound') {
                    classesUnorderedMap.set(id, entry);
                }
            }
            const orderedEntries = this.orderPerInitials(classesUnorderedMap);
            lines.push(...this.outputEntries(orderedEntries));
            console.log(`Writing index file ${filePath}...`);
            await this.workspace.writeMdxFile({
                filePath,
                frontMatter,
                bodyLines: lines
            });
        }
        // ------------------------------------------------------------------------
        {
            const filePath = `${outputFolderPath}index/classes/functions.mdx`;
            const permalink = 'index/classes/functions';
            const frontMatter = {
                title: 'The Class Functions Index',
                slug: `${this.workspace.slugBaseUrl}${permalink}`,
                // description: '...', // TODO
                custom_edit_url: null,
                keywords: ['doxygen', 'classes', 'index']
            };
            const lines = [];
            lines.push('The class member functions used by this project are:');
            const classesUnorderedMap = new Map();
            for (const [id, entry] of allUnorderedEntriesMap) {
                if (entry.kind === 'function') {
                    classesUnorderedMap.set(id, entry);
                }
            }
            const orderedEntries = this.orderPerInitials(classesUnorderedMap);
            lines.push(...this.outputEntries(orderedEntries));
            console.log(`Writing index file ${filePath}...`);
            await this.workspace.writeMdxFile({
                filePath,
                frontMatter,
                bodyLines: lines
            });
        }
        // ------------------------------------------------------------------------
        {
            const filePath = `${outputFolderPath}index/classes/variables.mdx`;
            const permalink = 'index/classes/variables';
            const frontMatter = {
                title: 'The Class Variables Index',
                slug: `${this.workspace.slugBaseUrl}${permalink}`,
                // description: '...', // TODO
                custom_edit_url: null,
                keywords: ['doxygen', 'classes', 'index']
            };
            const lines = [];
            lines.push('The class member variables used by this project are:');
            const classesUnorderedMap = new Map();
            for (const [id, entry] of allUnorderedEntriesMap) {
                if (entry.kind === 'variable') {
                    classesUnorderedMap.set(id, entry);
                }
            }
            const orderedEntries = this.orderPerInitials(classesUnorderedMap);
            lines.push(...this.outputEntries(orderedEntries));
            console.log(`Writing index file ${filePath}...`);
            await this.workspace.writeMdxFile({
                filePath,
                frontMatter,
                bodyLines: lines
            });
        }
        // ------------------------------------------------------------------------
        {
            const filePath = `${outputFolderPath}index/classes/typedefs.mdx`;
            const permalink = 'index/classes/typedefs';
            const frontMatter = {
                title: 'The Class Type Definitions Index',
                slug: `${this.workspace.slugBaseUrl}${permalink}`,
                // description: '...', // TODO
                custom_edit_url: null,
                keywords: ['doxygen', 'classes', 'index']
            };
            const lines = [];
            lines.push('The class member type definitions used by this project are:');
            const classesUnorderedMap = new Map();
            for (const [id, entry] of allUnorderedEntriesMap) {
                if (entry.kind === 'typedef') {
                    classesUnorderedMap.set(id, entry);
                }
            }
            const orderedEntries = this.orderPerInitials(classesUnorderedMap);
            lines.push(...this.outputEntries(orderedEntries));
            console.log(`Writing index file ${filePath}...`);
            await this.workspace.writeMdxFile({
                filePath,
                frontMatter,
                bodyLines: lines
            });
        }
        // ------------------------------------------------------------------------
    }
    orderPerInitials(entriesMap) {
        const entriesPerInitialsMap = new Map();
        for (const [id, entry] of entriesMap) {
            const initial = entry.name.charAt(0);
            let mapArray = entriesPerInitialsMap.get(initial);
            if (mapArray === undefined) {
                mapArray = [];
                entriesPerInitialsMap.set(initial, mapArray);
            }
            mapArray.push(entry);
        }
        const orderedMap = new Map();
        const orderedInitials = Array.from(entriesPerInitialsMap.keys()).sort();
        for (const initial of orderedInitials) {
            const unorderedArray = entriesPerInitialsMap.get(initial);
            assert(unorderedArray !== undefined);
            const orderedArray = unorderedArray.sort((a, b) => {
                let nameComparison = a.name.localeCompare(b.name);
                if (nameComparison !== 0) {
                    return nameComparison;
                }
                nameComparison = a.longName.localeCompare(b.longName);
                return nameComparison;
            });
            orderedMap.set(initial, orderedArray);
        }
        return orderedMap;
    }
    outputEntries(entriesPerInitialsMap) {
        const lines = [];
        for (const initial of entriesPerInitialsMap.keys()) {
            lines.push('');
            lines.push(`## - ${escapeMdx(initial)} -`);
            lines.push('');
            const mapArray = entriesPerInitialsMap.get(initial);
            assert(mapArray !== undefined);
            for (const entry of mapArray) {
                let kind = '';
                if (entry.objectKind === 'compound') {
                    kind = `${entry.kind} `;
                }
                if (entry.permalink !== undefined && entry.permalink.length > 0) {
                    lines.push(`- ${escapeMdx(entry.name)}: <a href="${entry.permalink}">${kind}${escapeMdx(entry.longName)}</a>`);
                }
                else {
                    lines.push(`- ${escapeMdx(entry.name)}: ${kind}${escapeMdx(entry.longName)}`);
                }
            }
        }
        return lines;
    }
}
// ----------------------------------------------------------------------------
export class Class extends CompoundBase {
    // --------------------------------------------------------------------------
    constructor(collection, compoundDef) {
        super(collection, compoundDef);
        // Due to multiple-inheritance, there can be multiple parents.
        this.baseClassIds = new Set();
        this.baseClasses = [];
        this.fullyQualifiedName = '?';
        this.unqualifiedName = '?';
        this.templateParameters = '';
        this.classFullNameMdxText = '?';
        // console.log('Class.constructor', util.inspect(compoundDef))
        if (Array.isArray(compoundDef.baseCompoundRefs)) {
            for (const ref of compoundDef.baseCompoundRefs) {
                // console.log('component', compoundDef.id, 'has base', ref.refid)
                if (ref.refid !== undefined) {
                    this.baseClassIds.add(ref.refid);
                }
            }
        }
        // Remove the template parameters.
        this.fullyQualifiedName = compoundDef.compoundName.replace(/<.*>/, '');
        // Remove the namespaces(s).
        this.unqualifiedName = this.fullyQualifiedName.replace(/.*::/, '');
        const index = compoundDef.compoundName.indexOf('<');
        let indexNameTemplateParameters = '';
        if (index >= 0) {
            indexNameTemplateParameters = compoundDef.compoundName.substring(index).replace(/^< /, '<').replace(/ >$/, '>');
            this.templateParameters = indexNameTemplateParameters;
        }
        else if (compoundDef.templateParamList !== undefined) {
            indexNameTemplateParameters = this.renderTemplateParameterNamesToMdxText(compoundDef.templateParamList);
        }
        this.sidebarLabel = this.unqualifiedName;
        this.indexName = `${this.unqualifiedName}${indexNameTemplateParameters}`;
        const kind = compoundDef.kind;
        const kindCapitalised = kind.charAt(0).toUpperCase() + kind.slice(1).toLowerCase();
        this.pageTitle = `The \`${escapeHtml(this.unqualifiedName)}\` ${kindCapitalised}`;
        if (compoundDef.templateParamList !== undefined) {
            this.pageTitle += ' Template';
        }
        this.pageTitle += ' Reference';
        assert(kindsPlurals[kind] !== undefined);
        const pluralKind = kindsPlurals[kind].toLowerCase();
        // Turn the namespace into a hierarchical path. Keep the dot.
        let sanitizedPath = sanitizeHierarchicalPath(this.fullyQualifiedName.replaceAll(/::/g, '/'));
        if (this.templateParameters?.length > 0) {
            // sanitizedPath += sanitizeName(this.templateParameters)
            sanitizedPath += `-${crypto.hash('md5', this.templateParameters)}`;
        }
        this.relativePermalink = `${pluralKind}/${sanitizedPath}`;
        // Replace slash with dash.
        this.docusaurusId = `${pluralKind}/${flattenPath(sanitizedPath)}`;
        this.createSections(this.unqualifiedName);
        // console.log('0', compoundDef.id)
        // console.log('1', compoundDef.compoundName)
        // console.log('2', this.relativePermalink)
        // console.log('3', this.docusaurusId)
        // console.log('4', this.sidebarLabel)
        // console.log('5', this.indexName)
        // console.log('6', this.templateParameters)
        // console.log()
    }
    initializeLate() {
        super.initializeLate();
        const compoundDef = this._private._compoundDef;
        assert(compoundDef !== undefined);
        let classFullName = this.fullyQualifiedName;
        if (this.templateParameters.length > 0) {
            classFullName += escapeMdx(this.templateParameters);
        }
        else {
            classFullName += escapeMdx(this.renderTemplateParameterNamesToMdxText(compoundDef.templateParamList));
        }
        this.classFullNameMdxText = classFullName;
        if (compoundDef.templateParamList?.params !== undefined) {
            this.templateMdxText = escapeMdx(this.renderTemplateParametersToMdxText({
                templateParamList: compoundDef.templateParamList,
                withDefaults: true
            }));
        }
        this.baseCompoundRefs = compoundDef.baseCompoundRefs;
        this.derivedCompoundRefs = compoundDef.derivedCompoundRefs;
        this.templateParamList = compoundDef.templateParamList;
    }
    // --------------------------------------------------------------------------
    renderToMdxLines(frontMatter) {
        const lines = [];
        frontMatter.toc_max_heading_level = 3;
        const descriptionTodo = `@${this.kind} ${escapeMdx(this.compoundName)}`;
        const morePermalink = this.renderDetailedDescriptionToMdxLines !== undefined ? '#details' : undefined;
        lines.push(this.renderBriefDescriptionToMdxText({
            briefDescriptionMdxText: this.briefDescriptionMdxText,
            todo: descriptionTodo,
            morePermalink
        }));
        lines.push('');
        lines.push('## Declaration');
        const classs = this.collection.collectionCompoundsById.get(this.id);
        assert(classs !== undefined);
        // const classFullName = this.classFullNameMdxText
        if (this.templateMdxText !== undefined) {
            lines.push('');
            // Intentionally on two lines.
            lines.push(`<CodeBlock>template ${this.templateMdxText}`);
            lines.push(`${this.kind} ${this.classFullNameMdxText}</CodeBlock>`);
        }
        else {
            lines.push('');
            lines.push(`<CodeBlock>${this.kind} ${this.classFullNameMdxText}</CodeBlock>`);
        }
        lines.push(...this.renderIncludesIndexToMdxLines());
        if (this.kind === 'class' || this.kind === 'struct') {
            if (this.baseCompoundRefs !== undefined) {
                const baseCompoundRefs = new Map();
                for (const baseCompoundRef of this.baseCompoundRefs) {
                    if (!baseCompoundRefs.has(baseCompoundRef.text)) {
                        baseCompoundRefs.set(baseCompoundRef.text, baseCompoundRef);
                    }
                }
                lines.push('');
                if (baseCompoundRefs.size > 1) {
                    lines.push(`## Base ${kindsPlurals[this.kind]?.toLowerCase()}`);
                }
                else {
                    lines.push(`## Base ${this.kind}`);
                }
                lines.push('');
                lines.push('<MembersIndex>');
                for (const baseCompoundRef of baseCompoundRefs.values()) {
                    // console.log(util.inspect(baseCompoundRef, { compact: false, depth: 999 }))
                    if (baseCompoundRef.refid !== undefined) {
                        const baseClass = this.collection.collectionCompoundsById.get(baseCompoundRef.refid);
                        if (baseClass !== undefined) {
                            lines.push(...baseClass.renderIndexToMdxLines());
                            continue;
                        }
                    }
                    const itemName = escapeMdx(baseCompoundRef.text);
                    lines.push('');
                    lines.push('<MembersIndexItem');
                    lines.push(`  type="${this.kind}"`);
                    lines.push(`  name={<>${itemName}</>}>`);
                    lines.push('</MembersIndexItem>');
                }
                lines.push('');
                lines.push('</MembersIndex>');
            }
            else if ('baseClassIds' in classs && classs.baseClassIds.size > 0) {
                lines.push('');
                if (classs.baseClassIds.size > 1) {
                    lines.push(`## Base ${kindsPlurals[this.kind]?.toLowerCase()}`);
                }
                else {
                    lines.push(`## Base ${this.kind}`);
                }
                lines.push('');
                lines.push('<MembersIndex>');
                for (const baseClassId of classs.baseClassIds) {
                    const baseClass = this.collection.collectionCompoundsById.get(baseClassId);
                    if (baseClass !== undefined) {
                        // console.log(util.inspect(derivedCompoundDef, { compact: false, depth: 999 }))
                        lines.push(...baseClass.renderIndexToMdxLines());
                    }
                }
                lines.push('');
                lines.push('</MembersIndex>');
            }
            if (this.derivedCompoundRefs !== undefined) {
                lines.push('');
                lines.push(`## Derived ${kindsPlurals[this.kind]}`);
                lines.push('');
                lines.push('<MembersIndex>');
                for (const derivedCompoundRef of this.derivedCompoundRefs) {
                    // console.log(util.inspect(derivedCompoundRef, { compact: false, depth: 999 }))
                    if (derivedCompoundRef.refid !== undefined) {
                        const derivedClass = this.collection.collectionCompoundsById.get(derivedCompoundRef.refid);
                        if (derivedClass !== undefined) {
                            lines.push(...derivedClass.renderIndexToMdxLines());
                        }
                        else {
                            if (this.collection.workspace.pluginOptions.verbose) {
                                console.warn('Derived class id', derivedCompoundRef.refid, 'not a defined class');
                            }
                            const itemName = escapeMdx(derivedCompoundRef.text.trim());
                            lines.push('');
                            lines.push('<MembersIndexItem');
                            lines.push(`  type="${this.kind}"`);
                            lines.push(`  name={<>${itemName}</>}>`);
                            lines.push('</MembersIndexItem>');
                        }
                    }
                    else {
                        const itemName = escapeMdx(derivedCompoundRef.text.trim());
                        lines.push('');
                        lines.push('<MembersIndexItem');
                        lines.push(`  type="${this.kind}"`);
                        lines.push(`  name={<>${itemName}</>}>`);
                        lines.push('</MembersIndexItem>');
                    }
                }
                lines.push('');
                lines.push('</MembersIndex>');
            }
            else if ('derivedClassIds' in classs && classs.childrenIds.length > 0) {
                lines.push('');
                lines.push(`## Derived ${kindsPlurals[this.kind]}`);
                lines.push('');
                lines.push('<MembersIndex>');
                for (const derivedClassId of classs.childrenIds) {
                    const derivedClass = this.collection.collectionCompoundsById.get(derivedClassId);
                    if (derivedClass !== undefined) {
                        // console.log(util.inspect(derivedCompoundDef, { compact: false, depth: 999 }))
                        lines.push(...derivedClass.renderIndexToMdxLines());
                    }
                    else {
                        console.warn('Derived class id', derivedClassId, 'not a class');
                    }
                }
                lines.push('');
                lines.push('</MembersIndex>');
            }
        }
        lines.push(...this.renderInnerIndicesToMdxLines({
            suffixes: []
        }));
        lines.push(...this.renderSectionIndicesToMdxLines());
        lines.push(...this.renderDetailedDescriptionToMdxLines({
            briefDescriptionMdxText: this.briefDescriptionMdxText,
            detailedDescriptionMdxText: this.detailedDescriptionMdxText,
            todo: descriptionTodo,
            showHeader: true,
            showBrief: !this.hasSect1InDescription
        }));
        if (this.locationMdxText !== undefined) {
            lines.push(this.locationMdxText);
        }
        lines.push(...this.renderSectionsToMdxLines());
        lines.push(...this.renderGeneratedFromToMdxLines());
        return lines;
    }
    renderIndexToMdxLines() {
        // console.log(util.inspect(this, { compact: false, depth: 999 }))
        const lines = [];
        const workspace = this.collection.workspace;
        const permalink = workspace.getPagePermalink(this.id);
        const itemType = this.kind;
        const itemName = `<a href="${permalink}">${escapeMdx(this.indexName)}</a>`;
        lines.push('');
        lines.push('<MembersIndexItem');
        lines.push(`  type="${itemType}"`);
        if (itemName.includes('<') || itemName.includes('&')) {
            lines.push(`  name={<>${itemName}</>}>`);
        }
        else {
            lines.push(`  name="${itemName}">`);
        }
        const morePermalink = this.renderDetailedDescriptionToMdxLines !== undefined ? `${permalink}/#details` : undefined;
        const briefDescriptionMdxText = this.briefDescriptionMdxText;
        if ((briefDescriptionMdxText ?? '').length > 0) {
            lines.push(this.renderBriefDescriptionToMdxText({
                briefDescriptionMdxText,
                morePermalink
            }));
        }
        lines.push('</MembersIndexItem>');
        return lines;
    }
}
// ----------------------------------------------------------------------------
//# sourceMappingURL=classes-vm.js.map