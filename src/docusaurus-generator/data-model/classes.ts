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

import * as util from 'node:util'
import assert from 'node:assert'

import { CompoundDef } from '../../doxygen-xml-parser/compounddef.js'

// ----------------------------------------------------------------------------

export class Classes {
  membersById: Map<string, Class>
  topLevelClassIds: string[] = []

  constructor (compoundDefs: CompoundDef[]) {
    this.membersById = new Map()

    for (const compoundDef of compoundDefs) {
      if (compoundDef.kind === 'class') {
        this.membersById.set(compoundDef.id, new Class(compoundDef))
      }
    }

    // Recreate classes hierarchies.
    for (const [classId, classs] of this.membersById) {
      for (const baseClassId of classs.baseClassIds) {
        const baseClass = this.membersById.get(baseClassId)
        assert(baseClass !== undefined)
        // console.log('baseClassId', baseClassId, 'has child', classId)
        baseClass.derivedClassIds.push(classId)
      }
    }

    for (const [classId, classs] of this.membersById) {
      if (classs.baseClassIds.length === 0) {
        this.topLevelClassIds.push(classId)
      }
    }
  }
}

export class Class {
  compoundDef: CompoundDef
  derivedClassIds: string[] = []
  baseClassIds: string[] = []

  constructor (compoundDef: CompoundDef) {
    // console.log('Class.constructor', util.inspect(compoundDef))
    this.compoundDef = compoundDef

    if (Array.isArray(compoundDef.baseCompoundRefs)) {
      for (const ref of compoundDef.baseCompoundRefs) {
        // console.log('component', compoundDef.id, 'has base', ref.refid)
        if (ref.refid !== undefined) {
          this.baseClassIds.push(ref.refid)
        }
      }
    }
  }
}

// ----------------------------------------------------------------------------
