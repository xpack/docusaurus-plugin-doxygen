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
import * as util from 'node:util'

import { xml } from './xml.js'
import { OptionType } from './doxyfileoptiontype.js'

// ----------------------------------------------------------------------------

// <xsd:element name="doxyfile" type="DoxygenFileType"/>

// <xsd:complexType name="DoxygenFileType">
//   <xsd:sequence>
//     <xsd:element name="option" type="OptionType" minOccurs="0" maxOccurs="unbounded"/>
//   </xsd:sequence>
//   <xsd:attribute name="version" type="xsd:string" use="required"/>
//   <xsd:attribute ref="xml:lang" use="required"/>
// </xsd:complexType>

export class DoxygenFileType {
  // Mandatory attributes.
  version: string = ''
  lang: string = ''

  // Optional elements.
  options: OptionType[] | undefined

  // Optional attributes.
  noNamespaceSchemaLocation: string | undefined

  constructor (element: Object, elementName: string = 'doxyfile') {
    // console.log(elementName, util.inspect(element))

    const innerElements = xml.getInnerElements(element, elementName)
    assert(innerElements.length > 0)

    for (const innerElement of innerElements) {
      if (xml.hasInnerText(innerElement)) {
        // Ignore texts.
      } else if (xml.hasInnerElement(innerElement, 'option')) {
        if (this.options === undefined) {
          this.options = []
        }
        this.options.push(new OptionType(innerElement, 'option'))
      } else {
        console.error(util.inspect(innerElement))
        console.error(`doxyfile ${elementName} element:`, Object.keys(innerElement), 'not implemented yet')
      }
    }

    // ------------------------------------------------------------------------
    // Process attributes.

    assert(xml.hasAttributes(element))

    const attributesNames = xml.getAttributesNames(element)
    // console.log(attributesNames)
    for (const attributeName of attributesNames) {
      // console.log(attributeName)
      if (attributeName === '@_version') {
        this.version = xml.getAttributeStringValue(element, '@_version')
      } else if (attributeName === '@_lang') {
        this.lang = xml.getAttributeStringValue(element, '@_lang')
      } else if (attributeName === '@_noNamespaceSchemaLocation') {
        this.noNamespaceSchemaLocation = xml.getAttributeStringValue(element, '@_noNamespaceSchemaLocation')
      } else {
        console.error(util.inspect(element))
        console.error(`doxyfile ${elementName} attribute:`, attributeName, 'not implemented yet')
      }
    }
    assert(this.version.length > 0)
    assert(this.lang.length > 0)

    // ------------------------------------------------------------------------

    // console.log(this)
  }
}

// ----------------------------------------------------------------------------
