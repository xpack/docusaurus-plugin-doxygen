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

import { ElementTextRendererBase } from './element-renderer-base.js'
import { AbstractLinkedTextType } from '../../data-model/compounds/linkedtexttype-dm.js'

// ----------------------------------------------------------------------------

// <xsd:complexType name="linkedTextType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//   <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

export class LinkedTextTypeTextRenderer extends ElementTextRendererBase {
  renderToMdxText (element: AbstractLinkedTextType): string {
    // console.log(util.inspect(element, { compact: false, depth: 999 }))

    let text: string = ''

    text += this.workspace.renderElementsToMdxText(element.children)

    return text
  }
}

// ----------------------------------------------------------------------------
