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
import * as util from 'util'

import { AbstractRefType } from '../../doxygen-xml-parser/reftype.js'
import { ElementGeneratorBase } from './element-generator-base.js'

// ----------------------------------------------------------------------------

export class RefType extends ElementGeneratorBase {
  renderMdx (element: AbstractRefType): string {
    // console.log(util.inspect(element), { compact: false, depth: 999 })

    if (element.prot !== undefined) {
      console.error(element.elementName, 'attribute prot not yet rendered in', this.constructor.name)
    }
    if (element.inline !== undefined) {
      console.error(element.elementName, 'attribute inline not yet rendered in', this.constructor.name)
    }

    let result = ''

    const permalink = this.context.getPagePermalink(element.refid)
    assert(permalink !== undefined && permalink.length > 1)

    result += `<Link to="${permalink}">`
    result += this.context.escapeHtml(element.text)
    result += '</Link>'

    return result
  }
}

// ----------------------------------------------------------------------------
