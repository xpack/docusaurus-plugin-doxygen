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

import * as util from 'util'

import { AbstractRefType } from '../../doxygen-xml-parser/reftype.js'
import { ElementGeneratorBase } from './element-generator-base.js'
import assert from 'assert'

export class RefType extends ElementGeneratorBase {
  renderMdx (element: AbstractRefType): string {
    console.log(util.inspect(element), { compact: false, depth: 999 })

    let result = ''

    const permalink = this.generator.getPermalink(element.refid)
    assert(permalink !== undefined && permalink.length > 1)

    result += `<Link to="${permalink}">`
    result += element.text
    result += '</Link>'

    return result
  }
}

// ----------------------------------------------------------------------------
