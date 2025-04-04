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
import util from 'util'

import { DoxygenXmlParser } from './index.js'

// ----------------------------------------------------------------------------

// <xsd:complexType name="refType">
// <xsd:simpleContent>
//   <xsd:extension base="xsd:string">
//     <xsd:attribute name="refid" type="xsd:string" />
//     <xsd:attribute name="prot" type="DoxProtectionKind" use="optional"/>
//     <xsd:attribute name="inline" type="DoxBool" use="optional"/>
//   </xsd:extension>
// </xsd:simpleContent>
// </xsd:complexType>

// <xsd:simpleType name="DoxProtectionKind">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="public" />
//   <xsd:enumeration value="protected" />
//   <xsd:enumeration value="private" />
//   <xsd:enumeration value="package" />
// </xsd:restriction>
// </xsd:simpleType>

export class RefType {
  // Mandatory elements.
  text: string = '' // The name of the reference, passed as element text.

  // Mandatory attributes.
  refid: string = ''

  // Optional attributes.
  prot: string | undefined // DoxProtectionKind
  inline: Boolean | undefined // DoxBool

  constructor (xml: DoxygenXmlParser, element: Object, elementName: string = 'ref') {
    // console.log(elementName, util.inspect(element))

    // ------------------------------------------------------------------------
    // Process elements.

    assert(xml.isInnerElementText(element, elementName))
    this.text = xml.getInnerElementText(element, elementName)

    assert(this.text.length > 0)

    // ------------------------------------------------------------------------
    // Process attributes.

    assert(xml.hasAttributes(element))

    const attributesNames = xml.getAttributesNames(element)
    for (const attributeName of attributesNames) {
      if (attributeName === '@_refid') {
        this.refid = xml.getAttributeStringValue(element, '@_refid')
      } else if (attributeName === '@_prot') {
        this.prot = xml.getAttributeStringValue(element, '@_prot')
      } else if (attributeName === '@_inline') {
        this.inline = Boolean(xml.getAttributeBooleanValue(element, '@_inline'))
      } else {
        console.error(util.inspect(element))
        console.error(`${elementName} attribute:`, attributeName, 'not implemented yet')
      }
    }

    assert(this.refid.length > 0)

    // ------------------------------------------------------------------------

    // console.log(this)
  }
}

// ----------------------------------------------------------------------------
