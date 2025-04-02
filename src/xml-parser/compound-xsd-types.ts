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

import { XmlPrologue, XmlTopElementAttributes, XmlText } from './common-types.js'

// ----------------------------------------------------------------------------
// component.xsd

// <?xml version='1.0' encoding='UTF-8' standalone='no'?>
// <doxygen xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="compound.xsd" version="1.13.2" xml:lang="en-US">
//   <compounddef id="classmicro__os__plus_1_1utils_1_1double__list__iterator" kind="class" language="C++" prot="public">
//   ... (possibly multiple times)
//   </compounddef>
// </doxygen>

export type XmlCompoundFile = XmlCompoundFileElements[]

export type XmlCompoundFileElements = XmlPrologue | XmlDoxygenElement | XmlText

// ----------------------------------------------------------------------------

// <xsd:element name="doxygen" type="DoxygenType"/>

export interface XmlDoxygenElement extends XmlTopElementAttributes {
  doxygen: XmlDoxygenTypeElements[]
}

// <xsd:complexType name="DoxygenType">
//   <xsd:sequence maxOccurs="unbounded">
//     <xsd:element name="compounddef" type="compounddefType" minOccurs="0" />
//   </xsd:sequence>
//   <xsd:attribute name="version" type="DoxVersionNumber" use="required" />
//   <xsd:attribute ref="xml:lang" use="required"/>
// </xsd:complexType>

export type XmlDoxygenTypeElements = XmlCompoundDefElement | XmlText

export interface XmlCompoundDefElement extends XmlCompoundDefTypeAttributes {
  compounddef: XmlCompoundDefTypeElements[]
}

// <xsd:complexType name="compounddefType">
//   <xsd:sequence>
//     <xsd:element name="compoundname" type="xsd:string"/>
//     <xsd:element name="title" type="xsd:string" minOccurs="0" />
//     <xsd:element name="basecompoundref" type="compoundRefType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="derivedcompoundref" type="compoundRefType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="includes" type="incType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="includedby" type="incType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="incdepgraph" type="graphType" minOccurs="0" />
//     <xsd:element name="invincdepgraph" type="graphType" minOccurs="0" />
//     <xsd:element name="innermodule" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="innerdir" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="innerfile" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="innerclass" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="innerconcept" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="innernamespace" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="innerpage" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="innergroup" type="refType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="qualifier" type="xsd:string" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="templateparamlist" type="templateparamlistType" minOccurs="0" />
//     <xsd:element name="sectiondef" type="sectiondefType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="tableofcontents" type="tableofcontentsType" minOccurs="0" maxOccurs="1" />
//     <xsd:element name="requiresclause" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="initializer" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
//     <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
//     <xsd:element name="exports" type="exportsType" minOccurs="0" maxOccurs="1"/>
//     <xsd:element name="inheritancegraph" type="graphType" minOccurs="0" />
//     <xsd:element name="collaborationgraph" type="graphType" minOccurs="0" />
//     <xsd:element name="programlisting" type="listingType" minOccurs="0" />
//     <xsd:element name="location" type="locationType" minOccurs="0" />
//     <xsd:element name="listofallmembers" type="listofallmembersType" minOccurs="0" />
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
//   <xsd:attribute name="kind" type="DoxCompoundKind" />
//   <xsd:attribute name="language" type="DoxLanguage" use="optional"/>
//   <xsd:attribute name="prot" type="DoxProtectionKind" />
//   <xsd:attribute name="final" type="DoxBool" use="optional"/>
//   <xsd:attribute name="inline" type="DoxBool" use="optional"/>
//   <xsd:attribute name="sealed" type="DoxBool" use="optional"/>
//   <xsd:attribute name="abstract" type="DoxBool" use="optional"/>
// </xsd:complexType>

export type XmlCompoundDefTypeElements = XmlCompoundNameElement | XmlTitleElement | XmlInnerGroupElement | XmlInnerNamespaceElement | XmlInnerDirElement | XmlInnerFileElement | XmlInnerNamespaceElement | XmlInnerClassElement | XmlBriefDescriptionElement | XmlDetailedDescriptionElement | XmlIncludesElement | XmlProgramListingElement | XmlTemplateParamListElement | XmlBaseCompoundRefElement | XmlDerivedCompoundRefElement | XmlListOfAllMembersElement | XmlSectionDefElement | XmlText

interface XmlCompoundDefTypeAttributes {
  ':@': {
    '@_id': string
    '@_kind': XmlDoxCompoundKind
    '@_prot': XmlDoxProtectionKind
    '@_final'?: XmlDoxBool
    '@_inline'?: XmlDoxBool
    '@_sealed'?: XmlDoxBool
    '@_abstract'?: XmlDoxBool
  }
}

export interface XmlCompoundNameElement {
  compoundname: [XmlText]
}

export interface XmlTitleElement {
  title: [XmlText]
}

export interface XmlBaseCompoundRefElement extends XmlCompoundRefTypeAttributes {
  basecompoundref: XmlCompoundRefTypeElements[]
}

export interface XmlDerivedCompoundRefElement extends XmlCompoundRefTypeAttributes {
  derivedcompoundref: XmlCompoundRefTypeElements[]
}

export interface XmlIncludesElement extends XmlIncTypeAttributes {
  includes: XmlIncTypeElements[]
}

export interface XmlIncludedByElement extends XmlIncTypeAttributes {
  includedby: XmlIncTypeElements[]
}

export interface XmlInnerDirElement extends XmlRefTypeAttributes {
  innerdir: XmlRefTypeElements[]
}

export interface XmlInnerFileElement extends XmlRefTypeAttributes {
  innerfile: XmlRefTypeElements[]
}

export interface XmlInnerClassElement extends XmlRefTypeAttributes {
  innerclass: XmlRefTypeElements[]
}

export interface XmlInnerNamespaceElement extends XmlRefTypeAttributes {
  innernamespace: XmlRefTypeElements[]
}

export interface XmlInnerPageElement extends XmlRefTypeAttributes {
  innergpage: XmlRefTypeElements[]
}

export interface XmlInnerGroupElement extends XmlRefTypeAttributes {
  innergroup: XmlRefTypeElements[]
}

export interface XmlSectionDefElement extends XmlSectionDefTypeAttributes {
  sectiondef: XmlSectionDefTypeElements[]
}

export interface XmlBriefDescriptionElement {
  briefdescription: XmlDescriptionTypeElements[]
}

export interface XmlDetailedDescriptionElement {
  detaileddescription: XmlDescriptionTypeElements[]
}

export interface XmlProgramListingElement extends XmlListingTypeAttributes {
  programlisting: XmlListingTypeElements[]
}

export interface XmlLocationElement extends XmlLocationTypeAttributes {
  location: []
}

export interface XmlListOfAllMembersElement {
  listofallmembers: XmlListOfAllMemberTypeElements[]
}

// <xsd:complexType name="listofallmembersType">
//   <xsd:sequence>
//     <xsd:element name="member" type="memberRefType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

export type XmlListOfAllMemberTypeElements = XmlMemberElement | XmlText

export interface XmlMemberElement extends XmlMemberRefTypeAttributes {
  member: XmlMemberRefTypeElements[]
}

// <xsd:complexType name="memberRefType">
//   <xsd:sequence>
//     <xsd:element name="scope" type="xsd:string" />
//     <xsd:element name="name" type="xsd:string" />
//   </xsd:sequence>
//   <xsd:attribute name="refid" type="xsd:string" />
//   <xsd:attribute name="prot" type="DoxProtectionKind" />
//   <xsd:attribute name="virt" type="DoxVirtualKind" />
//   <xsd:attribute name="ambiguityscope" type="xsd:string" />
// </xsd:complexType>

export type XmlMemberRefTypeElements = XmlScopeElement | XmlNameElement | XmlText

export interface XmlMemberRefTypeAttributes {
  ':@': {
    '@_refid': string
    '@_prot': XmlDoxProtectionKind
    '@_virt': XmlDoxVirtualKind
    '@_ambiguityscope': string
  }
}

export interface XmlScopeElement {
  scope: [XmlText]
}

// <xsd:complexType name="docHtmlOnlyType">
//   <xsd:simpleContent>
//     <xsd:extension base="xsd:string">
//       <xsd:attribute name="block" type="xsd:string" />
//     </xsd:extension>
//   </xsd:simpleContent>
// </xsd:complexType>

// <xsd:complexType name="compoundRefType">
//   <xsd:simpleContent>
//     <xsd:extension base="xsd:string">
//       <xsd:attribute name="refid" type="xsd:string" use="optional" />
//       <xsd:attribute name="prot" type="DoxProtectionKind" />
//       <xsd:attribute name="virt" type="DoxVirtualKind" />
//     </xsd:extension>
//   </xsd:simpleContent>
// </xsd:complexType>

export type XmlCompoundRefTypeElements = XmlText

export interface XmlCompoundRefTypeAttributes {
  ':@': {
    '@_refid'?: string
    '@_prot': XmlDoxProtectionKind
    '@_virt': XmlDoxVirtualKind
  }
}

// <xsd:complexType name="reimplementType">
//   <xsd:simpleContent>
//     <xsd:extension base="xsd:string">
//       <xsd:attribute name="refid" type="xsd:string" />
//     </xsd:extension>
//   </xsd:simpleContent>
// </xsd:complexType>

// <xsd:complexType name="incType">
//   <xsd:simpleContent>
//     <xsd:extension base="xsd:string">
//       <xsd:attribute name="refid" type="xsd:string" use="optional" />
//       <xsd:attribute name="local" type="DoxBool" />
//     </xsd:extension>
//   </xsd:simpleContent>
// </xsd:complexType>

export type XmlIncTypeElements = XmlText

export interface XmlIncTypeAttributes {
  ':@': {
    '@_refid'?: string
    '@_local': XmlDoxBool
  }
}

// <xsd:complexType name="exportsType">
//   <xsd:sequence>
//     <xsd:element name="export" type="exportType" maxOccurs="unbounded"/>
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="exportType">
//   <xsd:simpleContent>
//     <xsd:extension base="xsd:string">
//       <xsd:attribute name="refid" type="xsd:string" use="optional" />
//     </xsd:extension>
//   </xsd:simpleContent>
// </xsd:complexType>

// <xsd:complexType name="refType">
//   <xsd:simpleContent>
//     <xsd:extension base="xsd:string">
//       <xsd:attribute name="refid" type="xsd:string" />
//       <xsd:attribute name="prot" type="DoxProtectionKind" use="optional"/>
//       <xsd:attribute name="inline" type="DoxBool" use="optional"/>
//     </xsd:extension>
//   </xsd:simpleContent>
// </xsd:complexType>

export type XmlRefTypeElements = XmlText

export interface XmlRefTypeAttributes {
  ':@': {
    '@_refid': string
    '@_prot'?: XmlDoxProtectionKind
    '@_inline'?: XmlDoxBool
  }
}

// <xsd:complexType name="refTextType">
//   <xsd:simpleContent>
//     <xsd:extension base="xsd:string">
//      <xsd:attribute name="refid" type="xsd:string" />
//      <xsd:attribute name="kindref" type="DoxRefKind" />
//      <xsd:attribute name="external" type="xsd:string" use="optional"/>
//      <xsd:attribute name="tooltip" type="xsd:string" use="optional"/>
//     </xsd:extension>
//   </xsd:simpleContent>
// </xsd:complexType>

export type XmlRefTextTypeElements = XmlText

export interface XmlRefTextTypeAttributes {
  ':@': {
    '@_refid': string
    '@_kindref': XmlDoxRefKind
    '@_external'?: string
    '@_tooltip'?: string
  }
}

// <xsd:simpleType name="MemberKind">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="define"/>
//     <xsd:enumeration value="property"/>
//     <xsd:enumeration value="event"/>
//     <xsd:enumeration value="variable"/>
//     <xsd:enumeration value="typedef"/>
//     <xsd:enumeration value="enum"/>
//     <xsd:enumeration value="enumvalue"/>
//     <xsd:enumeration value="function"/>
//     <xsd:enumeration value="signal"/>
//     <xsd:enumeration value="prototype"/>
//     <xsd:enumeration value="friend"/>
//     <xsd:enumeration value="dcop"/>
//     <xsd:enumeration value="slot"/>
//   </xsd:restriction>
// </xsd:simpleType>

// <xsd:complexType name="MemberType">
//   <xsd:sequence>
//     <xsd:element name="name" type="xsd:string"/>
//   </xsd:sequence>
//   <xsd:attribute name="refid" type="xsd:string" use="required"/>
//   <xsd:attribute name="kind" type="MemberKind" use="required"/>
// </xsd:complexType>

// <xsd:complexType name="sectiondefType">
//   <xsd:sequence>
//     <xsd:element name="header" type="xsd:string" minOccurs="0" />
//     <xsd:element name="description" type="descriptionType" minOccurs="0" />
//     <xsd:choice maxOccurs="unbounded">
//       <xsd:element name="memberdef" type="memberdefType" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="member" type="MemberType" minOccurs="0" maxOccurs="unbounded" />
//     </xsd:choice>
//   </xsd:sequence>
//   <xsd:attribute name="kind" type="DoxSectionKind" />
// </xsd:complexType>

export type XmlSectionDefTypeElements = XmlHeaderElement | XmlDescriptionElement | XmlMemberDefElement | XmlMemberElement | XmlText

export interface XmlSectionDefTypeAttributes {
  ':@': {
    '@_kind': XmlDoxSectionKind
  }
}

export interface XmlHeaderElement {
  header: [XmlText]
}

export interface XmlDescriptionElement {
  description: XmlDescriptionTypeElements[]
}

export interface XmlMemberDefElement extends XmlMemberDefTypeAttributes {
  memberdef: XmlMemberDefTypeElements[]
}

// <xsd:complexType name="memberdefType">
//   <xsd:sequence>
//     <xsd:element name="templateparamlist" type="templateparamlistType" minOccurs="0" />
//     <xsd:element name="type" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="definition" type="xsd:string" minOccurs="0" />
//     <xsd:element name="argsstring" type="xsd:string" minOccurs="0" />
//     <xsd:element name="name" type="xsd:string" />
//     <xsd:element name="qualifiedname" type="xsd:string" minOccurs="0"/>
//     <xsd:element name="read" type="xsd:string" minOccurs="0" />
//     <xsd:element name="write" type="xsd:string" minOccurs="0" />
//     <xsd:element name="bitfield" type="xsd:string" minOccurs="0" />
//     <xsd:element name="reimplements" type="reimplementType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="reimplementedby" type="reimplementType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="qualifier" type="xsd:string" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="param" type="paramType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="enumvalue" type="enumvalueType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="requiresclause" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="initializer" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="exceptions" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
//     <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
//     <xsd:element name="inbodydescription" type="descriptionType" minOccurs="0" />
//     <xsd:element name="location" type="locationType" />
//     <xsd:element name="references" type="referenceType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="referencedby" type="referenceType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="kind" type="DoxMemberKind" />
//   <xsd:attribute name="id" type="xsd:string" />
//   <xsd:attribute name="prot" type="DoxProtectionKind" />
//   <xsd:attribute name="static" type="DoxBool" />
//   <xsd:attribute name="extern" type="DoxBool" use="optional" />
//   <xsd:attribute name="strong" type="DoxBool" use="optional"/>
//   <xsd:attribute name="const" type="DoxBool" use="optional"/>
//   <xsd:attribute name="explicit" type="DoxBool" use="optional"/>
//   <xsd:attribute name="inline" type="DoxBool" use="optional"/>
//   <xsd:attribute name="refqual" type="DoxRefQualifierKind" use="optional"/>
//   <xsd:attribute name="virt" type="DoxVirtualKind" use="optional"/>
//   <xsd:attribute name="volatile" type="DoxBool" use="optional"/>
//   <xsd:attribute name="mutable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="noexcept" type="DoxBool" use="optional"/>
//   <xsd:attribute name="noexceptexpression" type="xsd:string" use="optional"/>
//   <xsd:attribute name="nodiscard" type="DoxBool" use="optional"/>
//   <xsd:attribute name="constexpr" type="DoxBool" use="optional"/>
//   <xsd:attribute name="consteval" type="DoxBool" use="optional"/>
//   <xsd:attribute name="constinit" type="DoxBool" use="optional"/>
//   <!-- Qt property -->
//   <xsd:attribute name="readable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="writable" type="DoxBool" use="optional"/>
//   <!-- C++/CLI variable -->
//   <xsd:attribute name="initonly" type="DoxBool" use="optional"/>
//   <!-- C++/CLI and C# property -->
//   <xsd:attribute name="settable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="privatesettable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="protectedsettable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="gettable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="privategettable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="protectedgettable" type="DoxBool" use="optional"/>
//   <!-- C++/CLI function -->
//   <xsd:attribute name="final" type="DoxBool" use="optional"/>
//   <xsd:attribute name="sealed" type="DoxBool" use="optional"/>
//   <xsd:attribute name="new" type="DoxBool" use="optional"/>
//   <!-- C++/CLI event -->
//   <xsd:attribute name="add" type="DoxBool" use="optional"/>
//   <xsd:attribute name="remove" type="DoxBool" use="optional"/>
//   <xsd:attribute name="raise" type="DoxBool" use="optional"/>
//   <!-- Objective-C 2.0 protocol method -->
//   <xsd:attribute name="optional" type="DoxBool" use="optional"/>
//   <xsd:attribute name="required" type="DoxBool" use="optional"/>
//   <!-- Objective-C 2.0 property accessor -->
//   <xsd:attribute name="accessor" type="DoxAccessor" use="optional"/>
//   <!-- UNO IDL -->
//   <xsd:attribute name="attribute" type="DoxBool" use="optional"/>
//   <xsd:attribute name="property" type="DoxBool" use="optional"/>
//   <xsd:attribute name="readonly" type="DoxBool" use="optional"/>
//   <xsd:attribute name="bound" type="DoxBool" use="optional"/>
//   <xsd:attribute name="removable" type="DoxBool" use="optional"/>
//   <xsd:attribute name="constrained" type="DoxBool" use="optional"/>
//   <xsd:attribute name="transient" type="DoxBool" use="optional"/>
//   <xsd:attribute name="maybevoid" type="DoxBool" use="optional"/>
//   <xsd:attribute name="maybedefault" type="DoxBool" use="optional"/>
//   <xsd:attribute name="maybeambiguous" type="DoxBool" use="optional"/>
// </xsd:complexType>

export type XmlMemberDefTypeElements = XmlTemplateParamListElement | XmlNameElement | XmlLocationElement | XmlBriefDescriptionElement | XmlDetailedDescriptionElement | XmlInbodyDescriptionElement | XmlQualifiedNametElement | XmlText

export interface XmlMemberDefTypeAttributes {
  ':@': {
    '@_kind': string
    '@_id': string
    '@_prot': string
    '@_static': XmlDoxBool
    '@_const': XmlDoxBool
    '@_constexpr': XmlDoxBool
    '@_explicit': XmlDoxBool
    '@_inline': XmlDoxBool
    '@_mutable': XmlDoxBool
    '@_virt': XmlDoxVirtualKind
    // TODO
  }
}

export interface XmlTemplateParamListElement {
  templateparamlist: XmlParamElement[]
}

export interface XmlQualifiedNametElement {
  qualifiedname: [XmlText]
}

export interface XmlInbodyDescriptionElement {
  inbodydescription: XmlDescriptionTypeElements[]
}

export interface XmlEnumvalueTypeElement extends XmlEnumvalueTypeAttributes {
  enumvalue: XmlEnumvalueTypeElements[]
}

// <xsd:complexType name="descriptionType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="title" type="xsd:string" minOccurs="0"/>
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="internal" type="docInternalType" minOccurs="0" maxOccurs="unbounded"/>
//     <xsd:element name="sect1" type="docSect1Type" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// ??? Why there are more than listed here?
// export type XmlDescriptionType = XmlTitleElement | XmlParaElement // internal, sect1

export type XmlDescriptionTypeElements = XmlParaElement | XmlBoldElement | XmlParameterListElement | XmlComputerOutputElement | XmlRefElement | XmlSimpleSectElement | XmlProgramListingElement | XmlDocCmdGroupElements | XmlText

export interface XmlParaElement {
  para: XmlDescriptionTypeElements[]
}

// <xsd:complexType name="enumvalueType">
//   <xsd:sequence>
//     <xsd:element name="name" type="xsd:string" />
//     <xsd:element name="initializer" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
//     <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
//   <xsd:attribute name="prot" type="DoxProtectionKind" />
// </xsd:complexType>

export type XmlEnumvalueTypeElements = XmlNameElement | XmlInitializerElement | XmlBriefDescriptionElement | XmlDetailedDescriptionElement | XmlText

export interface XmlEnumvalueTypeAttributes {
  ':@': {
    '@_id': string
    '@_prot': XmlDoxProtectionKind
  }
}

export interface XmlNameElement {
  name: [XmlText]
}

export interface XmlInitializerElement {
  initializer: XmlLinkedTextTypeElements[]
}

// <xsd:complexType name="templateparamlistType">
//   <xsd:sequence>
//     <xsd:element name="param" type="paramType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

export type XmlTemplateParamListTypeElements = XmlParamElement | XmlText

export interface XmlParamElement {
  param: XmlParamTypeElements[]
}

// <xsd:complexType name="paramType">
//   <xsd:sequence>
//     <xsd:element name="attributes" type="xsd:string" minOccurs="0" />
//     <xsd:element name="type" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="declname" type="xsd:string" minOccurs="0" />
//     <xsd:element name="defname" type="xsd:string" minOccurs="0" />
//     <xsd:element name="array" type="xsd:string" minOccurs="0" />
//     <xsd:element name="defval" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="typeconstraint" type="linkedTextType" minOccurs="0" />
//     <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
//   </xsd:sequence>
// </xsd:complexType>

export type XmlParamTypeElements = XmlAttributesElement | XmlTypeElement | XmlDeclNameElement | XmlDefNameElement | XmlArrayElement | XmlDefvalElement | XmlBriefDescriptionElement | XmlText

export interface XmlAttributesElement {
  attributes: [XmlText]
}

export interface XmlTypeElement {
  type: XmlLinkedTextTypeElements[]
}

export interface XmlDeclNameElement {
  declname: [XmlText]
}

export interface XmlDefNameElement {
  defname: [XmlText]
}

export interface XmlArrayElement {
  array: [XmlText]
}

export interface XmlDefvalElement {
  defval: XmlLinkedTextTypeElements[]
}

export interface XmlTypeConstraintElement {
  typeconstraint: XmlLinkedTextTypeElements[]
}

// <xsd:complexType name="linkedTextType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//   <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

export type XmlLinkedTextTypeElements = XmlRefElement | XmlText

// <xsd:complexType name="graphType">
//   <xsd:sequence>
//     <xsd:element name="node" type="nodeType" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="nodeType">
//   <xsd:sequence>
//     <xsd:element name="label" type="xsd:string" />
//     <xsd:element name="link" type="linkType" minOccurs="0" />
//     <xsd:element name="childnode" type="childnodeType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="childnodeType">
//   <xsd:sequence>
//     <xsd:element name="edgelabel" type="xsd:string" minOccurs="0" maxOccurs="unbounded"/>
//   </xsd:sequence>
//   <xsd:attribute name="refid" type="xsd:string" />
//   <xsd:attribute name="relation" type="DoxGraphRelation" />
// </xsd:complexType>

// <xsd:complexType name="linkType">
//   <xsd:attribute name="refid" type="xsd:string" />
//   <xsd:attribute name="external" type="xsd:string" use="optional"/>
// </xsd:complexType>

// <xsd:complexType name="listingType">
//   <xsd:sequence>
//     <xsd:element name="codeline" type="codelineType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="filename" type="xsd:string" use="optional"/>
// </xsd:complexType>

export type XmlListingTypeElements = XmlCodeLineElement | XmlText

export interface XmlListingTypeAttributes {
  ':@': {
    '@_filename': string
  }
}

export interface XmlCodeLineElement extends XmlCodeLineTypeAttributes {
  codeline: XmlCodeLineTypeElements[]
}
// <xsd:complexType name="codelineType">
//   <xsd:sequence>
//     <xsd:element name="highlight" type="highlightType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="lineno" type="xsd:integer" />
//   <xsd:attribute name="refid" type="xsd:string" />
//   <xsd:attribute name="refkind" type="DoxRefKind" />
//   <xsd:attribute name="external" type="DoxBool" />
// </xsd:complexType>

export type XmlCodeLineTypeElements = XmlHighlightElement | XmlText

export interface XmlCodeLineTypeAttributes {
  ':@': {
    '@_lineno': number // !
    '@_refid': string
    '@_refkind': string
    '@_external': string
  }
}

export interface XmlHighlightElement extends XmlHighlightTypeAttributes {
  highlight: XmlHighlightTypeElements[]
}

// <xsd:complexType name="highlightType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:choice minOccurs="0" maxOccurs="unbounded">
//     <xsd:element name="sp" type="spType" />
//     <xsd:element name="ref" type="refTextType" />
//   </xsd:choice>
//   <xsd:attribute name="class" type="DoxHighlightClass" />
// </xsd:complexType>

export type XmlHighlightTypeElements = XmlRefElement | XmlSpElement | XmlText

export interface XmlHighlightTypeAttributes {
  ':@': {
    '@_class': string
  }
}

export interface XmlRefElement extends XmlRefTextTypeAttributes {
  ref: XmlRefTextTypeElements[]
}

export interface XmlSpElement extends XmlSpTypeAttributes {
  sp: XmlSpTypeElements[]
}
// <xsd:complexType name="spType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:attribute name="value" type="xsd:integer" use="optional"/>
// </xsd:complexType>

export type XmlSpTypeElements = XmlText

export interface XmlSpTypeAttributes {
  ':@': {
    '@_value': number
  }
}

// <xsd:complexType name="referenceType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:attribute name="refid" type="xsd:string" />
//   <xsd:attribute name="compoundref" type="xsd:string" use="optional" />
//   <xsd:attribute name="startline" type="xsd:integer" />
//   <xsd:attribute name="endline" type="xsd:integer" />
// </xsd:complexType>

// <xsd:complexType name="locationType">
//   <xsd:attribute name="file" type="xsd:string" />
//   <xsd:attribute name="line" type="xsd:integer" />
//   <xsd:attribute name="column" type="xsd:integer" use="optional"/>
//   <xsd:attribute name="declfile" type="xsd:string" use="optional"/>
//   <xsd:attribute name="declline" type="xsd:integer" use="optional"/>
//   <xsd:attribute name="declcolumn" type="xsd:integer" use="optional"/>
//   <xsd:attribute name="bodyfile" type="xsd:string" />
//   <xsd:attribute name="bodystart" type="xsd:integer" />
//   <xsd:attribute name="bodyend" type="xsd:integer" />
// </xsd:complexType>

export interface XmlLocationTypeAttributes {
  ':@': {
    '@_file': string
    '@_line': number
    '@_column'?: number
    '@_declfile'?: string
    '@_declline'?: number
    '@_declcolumn'?: number
    '@_bodyfile': string
    '@_bodystart': number
    '@_bodyend': number
  }
}

// <xsd:complexType name="docSect1Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="title" type="docTitleType" minOccurs="0" />
//     <xsd:choice maxOccurs="unbounded">
//       <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="internal" type="docInternalS1Type" minOccurs="0"  maxOccurs="unbounded" />
//       <xsd:element name="sect2" type="docSect2Type" minOccurs="0" maxOccurs="unbounded" />
//     </xsd:choice>
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docSect2Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="title" type="docTitleType" minOccurs="0" />
//     <xsd:choice maxOccurs="unbounded">
//       <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="sect3" type="docSect3Type" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="internal" type="docInternalS2Type" minOccurs="0" />
//     </xsd:choice>
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docSect3Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="title" type="docTitleType" minOccurs="0" />
//     <xsd:choice maxOccurs="unbounded">
//       <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="sect4" type="docSect4Type" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="internal" type="docInternalS3Type" minOccurs="0" />
//     </xsd:choice>
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docSect4Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="title" type="docTitleType" minOccurs="0" />
//     <xsd:choice maxOccurs="unbounded">
//       <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="sect5" type="docSect5Type" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="internal" type="docInternalS4Type" minOccurs="0" />
//     </xsd:choice>
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docSect5Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="title" type="docTitleType" minOccurs="0" />
//     <xsd:choice maxOccurs="unbounded">
//       <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="sect6" type="docSect6Type" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="internal" type="docInternalS5Type" minOccurs="0" />
//     </xsd:choice>
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docSect6Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="title" type="docTitleType" minOccurs="0" />
//     <xsd:choice maxOccurs="unbounded">
//       <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//       <xsd:element name="internal" type="docInternalS6Type" minOccurs="0" />
//     </xsd:choice>
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docInternalType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="sect1" type="docSect1Type" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docInternalS1Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="sect2" type="docSect2Type" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docInternalS2Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="sect3" type="docSect3Type" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docInternalS3Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="sect4" type="docSect4Type" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docInternalS4Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="sect5" type="docSect5Type" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docInternalS5Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="sect5" type="docSect6Type" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docInternalS6Type" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="para"  type="docParaType"  minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:group name="docTitleCmdGroup">
//   <xsd:choice>
//     <xsd:element name="ulink" type="docURLLink" />
//     <xsd:element name="bold" type="docMarkupType" />
//     <xsd:element name="s" type="docMarkupType" />
//     <xsd:element name="strike" type="docMarkupType" />
//     <xsd:element name="underline" type="docMarkupType" />
//     <xsd:element name="emphasis" type="docMarkupType" />
//     <xsd:element name="computeroutput" type="docMarkupType" />
//     <xsd:element name="subscript" type="docMarkupType" />
//     <xsd:element name="superscript" type="docMarkupType" />
//     <xsd:element name="center" type="docMarkupType" />
//     <xsd:element name="small" type="docMarkupType" />
//     <xsd:element name="cite" type="docMarkupType" />
//     <xsd:element name="del" type="docMarkupType" />
//     <xsd:element name="ins" type="docMarkupType" />
//     <xsd:element name="htmlonly" type="docHtmlOnlyType" />
//     <xsd:element name="manonly" type="xsd:string" />
//     <xsd:element name="xmlonly" type="xsd:string" />
//     <xsd:element name="rtfonly" type="xsd:string" />
//     <xsd:element name="latexonly" type="xsd:string" />
//     <xsd:element name="docbookonly" type="xsd:string" />
//     <xsd:element name="image" type="docImageType" />
//     <xsd:element name="dot" type="docDotMscType" />
//     <xsd:element name="msc" type="docDotMscType" />
//     <xsd:element name="plantuml" type="docPlantumlType" />
//     <xsd:element name="anchor" type="docAnchorType" />
//     <xsd:element name="formula" type="docFormulaType" />
//     <xsd:element name="ref" type="docRefTextType" />
//     <xsd:element name="emoji" type="docEmojiType" />
//     <xsd:element name="linebreak" type="docEmptyType" />
//     <xsd:element name="nonbreakablespace" type="docEmptyType" />
//     <xsd:element name="iexcl" type="docEmptyType" />
//     <xsd:element name="cent" type="docEmptyType" />
//     <xsd:element name="pound" type="docEmptyType" />
//     <xsd:element name="curren" type="docEmptyType" />
//     <xsd:element name="yen" type="docEmptyType" />
//     <xsd:element name="brvbar" type="docEmptyType" />
//     <xsd:element name="sect" type="docEmptyType" />
//     <xsd:element name="umlaut" type="docEmptyType" />
//     <xsd:element name="copy" type="docEmptyType" />
//     <xsd:element name="ordf" type="docEmptyType" />
//     <xsd:element name="laquo" type="docEmptyType" />
//     <xsd:element name="not" type="docEmptyType" />
//     <xsd:element name="shy" type="docEmptyType" />
//     <xsd:element name="registered" type="docEmptyType" />
//     <xsd:element name="macr" type="docEmptyType" />
//     <xsd:element name="deg" type="docEmptyType" />
//     <xsd:element name="plusmn" type="docEmptyType" />
//     <xsd:element name="sup2" type="docEmptyType" />
//     <xsd:element name="sup3" type="docEmptyType" />
//     <xsd:element name="acute" type="docEmptyType" />
//     <xsd:element name="micro" type="docEmptyType" />
//     <xsd:element name="para" type="docEmptyType" />
//     <xsd:element name="middot" type="docEmptyType" />
//     <xsd:element name="cedil" type="docEmptyType" />
//     <xsd:element name="sup1" type="docEmptyType" />
//     <xsd:element name="ordm" type="docEmptyType" />
//     <xsd:element name="raquo" type="docEmptyType" />
//     <xsd:element name="frac14" type="docEmptyType" />
//     <xsd:element name="frac12" type="docEmptyType" />
//     <xsd:element name="frac34" type="docEmptyType" />
//     <xsd:element name="iquest" type="docEmptyType" />
//     <xsd:element name="Agrave" type="docEmptyType" />
//     <xsd:element name="Aacute" type="docEmptyType" />
//     <xsd:element name="Acirc" type="docEmptyType" />
//     <xsd:element name="Atilde" type="docEmptyType" />
//     <xsd:element name="Aumlaut" type="docEmptyType" />
//     <xsd:element name="Aring" type="docEmptyType" />
//     <xsd:element name="AElig" type="docEmptyType" />
//     <xsd:element name="Ccedil" type="docEmptyType" />
//     <xsd:element name="Egrave" type="docEmptyType" />
//     <xsd:element name="Eacute" type="docEmptyType" />
//     <xsd:element name="Ecirc" type="docEmptyType" />
//     <xsd:element name="Eumlaut" type="docEmptyType" />
//     <xsd:element name="Igrave" type="docEmptyType" />
//     <xsd:element name="Iacute" type="docEmptyType" />
//     <xsd:element name="Icirc" type="docEmptyType" />
//     <xsd:element name="Iumlaut" type="docEmptyType" />
//     <xsd:element name="ETH" type="docEmptyType" />
//     <xsd:element name="Ntilde" type="docEmptyType" />
//     <xsd:element name="Ograve" type="docEmptyType" />
//     <xsd:element name="Oacute" type="docEmptyType" />
//     <xsd:element name="Ocirc" type="docEmptyType" />
//     <xsd:element name="Otilde" type="docEmptyType" />
//     <xsd:element name="Oumlaut" type="docEmptyType" />
//     <xsd:element name="times" type="docEmptyType" />
//     <xsd:element name="Oslash" type="docEmptyType" />
//     <xsd:element name="Ugrave" type="docEmptyType" />
//     <xsd:element name="Uacute" type="docEmptyType" />
//     <xsd:element name="Ucirc" type="docEmptyType" />
//     <xsd:element name="Uumlaut" type="docEmptyType" />
//     <xsd:element name="Yacute" type="docEmptyType" />
//     <xsd:element name="THORN" type="docEmptyType" />
//     <xsd:element name="szlig" type="docEmptyType" />
//     <xsd:element name="agrave" type="docEmptyType" />
//     <xsd:element name="aacute" type="docEmptyType" />
//     <xsd:element name="acirc" type="docEmptyType" />
//     <xsd:element name="atilde" type="docEmptyType" />
//     <xsd:element name="aumlaut" type="docEmptyType" />
//     <xsd:element name="aring" type="docEmptyType" />
//     <xsd:element name="aelig" type="docEmptyType" />
//     <xsd:element name="ccedil" type="docEmptyType" />
//     <xsd:element name="egrave" type="docEmptyType" />
//     <xsd:element name="eacute" type="docEmptyType" />
//     <xsd:element name="ecirc" type="docEmptyType" />
//     <xsd:element name="eumlaut" type="docEmptyType" />
//     <xsd:element name="igrave" type="docEmptyType" />
//     <xsd:element name="iacute" type="docEmptyType" />
//     <xsd:element name="icirc" type="docEmptyType" />
//     <xsd:element name="iumlaut" type="docEmptyType" />
//     <xsd:element name="eth" type="docEmptyType" />
//     <xsd:element name="ntilde" type="docEmptyType" />
//     <xsd:element name="ograve" type="docEmptyType" />
//     <xsd:element name="oacute" type="docEmptyType" />
//     <xsd:element name="ocirc" type="docEmptyType" />
//     <xsd:element name="otilde" type="docEmptyType" />
//     <xsd:element name="oumlaut" type="docEmptyType" />
//     <xsd:element name="divide" type="docEmptyType" />
//     <xsd:element name="oslash" type="docEmptyType" />
//     <xsd:element name="ugrave" type="docEmptyType" />
//     <xsd:element name="uacute" type="docEmptyType" />
//     <xsd:element name="ucirc" type="docEmptyType" />
//     <xsd:element name="uumlaut" type="docEmptyType" />
//     <xsd:element name="yacute" type="docEmptyType" />
//     <xsd:element name="thorn" type="docEmptyType" />
//     <xsd:element name="yumlaut" type="docEmptyType" />
//     <xsd:element name="fnof" type="docEmptyType" />
//     <xsd:element name="Alpha" type="docEmptyType" />
//     <xsd:element name="Beta" type="docEmptyType" />
//     <xsd:element name="Gamma" type="docEmptyType" />
//     <xsd:element name="Delta" type="docEmptyType" />
//     <xsd:element name="Epsilon" type="docEmptyType" />
//     <xsd:element name="Zeta" type="docEmptyType" />
//     <xsd:element name="Eta" type="docEmptyType" />
//     <xsd:element name="Theta" type="docEmptyType" />
//     <xsd:element name="Iota" type="docEmptyType" />
//     <xsd:element name="Kappa" type="docEmptyType" />
//     <xsd:element name="Lambda" type="docEmptyType" />
//     <xsd:element name="Mu" type="docEmptyType" />
//     <xsd:element name="Nu" type="docEmptyType" />
//     <xsd:element name="Xi" type="docEmptyType" />
//     <xsd:element name="Omicron" type="docEmptyType" />
//     <xsd:element name="Pi" type="docEmptyType" />
//     <xsd:element name="Rho" type="docEmptyType" />
//     <xsd:element name="Sigma" type="docEmptyType" />
//     <xsd:element name="Tau" type="docEmptyType" />
//     <xsd:element name="Upsilon" type="docEmptyType" />
//     <xsd:element name="Phi" type="docEmptyType" />
//     <xsd:element name="Chi" type="docEmptyType" />
//     <xsd:element name="Psi" type="docEmptyType" />
//     <xsd:element name="Omega" type="docEmptyType" />
//     <xsd:element name="alpha" type="docEmptyType" />
//     <xsd:element name="beta" type="docEmptyType" />
//     <xsd:element name="gamma" type="docEmptyType" />
//     <xsd:element name="delta" type="docEmptyType" />
//     <xsd:element name="epsilon" type="docEmptyType" />
//     <xsd:element name="zeta" type="docEmptyType" />
//     <xsd:element name="eta" type="docEmptyType" />
//     <xsd:element name="theta" type="docEmptyType" />
//     <xsd:element name="iota" type="docEmptyType" />
//     <xsd:element name="kappa" type="docEmptyType" />
//     <xsd:element name="lambda" type="docEmptyType" />
//     <xsd:element name="mu" type="docEmptyType" />
//     <xsd:element name="nu" type="docEmptyType" />
//     <xsd:element name="xi" type="docEmptyType" />
//     <xsd:element name="omicron" type="docEmptyType" />
//     <xsd:element name="pi" type="docEmptyType" />
//     <xsd:element name="rho" type="docEmptyType" />
//     <xsd:element name="sigmaf" type="docEmptyType" />
//     <xsd:element name="sigma" type="docEmptyType" />
//     <xsd:element name="tau" type="docEmptyType" />
//     <xsd:element name="upsilon" type="docEmptyType" />
//     <xsd:element name="phi" type="docEmptyType" />
//     <xsd:element name="chi" type="docEmptyType" />
//     <xsd:element name="psi" type="docEmptyType" />
//     <xsd:element name="omega" type="docEmptyType" />
//     <xsd:element name="thetasym" type="docEmptyType" />
//     <xsd:element name="upsih" type="docEmptyType" />
//     <xsd:element name="piv" type="docEmptyType" />
//     <xsd:element name="bull" type="docEmptyType" />
//     <xsd:element name="hellip" type="docEmptyType" />
//     <xsd:element name="prime" type="docEmptyType" />
//     <xsd:element name="Prime" type="docEmptyType" />
//     <xsd:element name="oline" type="docEmptyType" />
//     <xsd:element name="frasl" type="docEmptyType" />
//     <xsd:element name="weierp" type="docEmptyType" />
//     <xsd:element name="imaginary" type="docEmptyType" />
//     <xsd:element name="real" type="docEmptyType" />
//     <xsd:element name="trademark" type="docEmptyType" />
//     <xsd:element name="alefsym" type="docEmptyType" />
//     <xsd:element name="larr" type="docEmptyType" />
//     <xsd:element name="uarr" type="docEmptyType" />
//     <xsd:element name="rarr" type="docEmptyType" />
//     <xsd:element name="darr" type="docEmptyType" />
//     <xsd:element name="harr" type="docEmptyType" />
//     <xsd:element name="crarr" type="docEmptyType" />
//     <xsd:element name="lArr" type="docEmptyType" />
//     <xsd:element name="uArr" type="docEmptyType" />
//     <xsd:element name="rArr" type="docEmptyType" />
//     <xsd:element name="dArr" type="docEmptyType" />
//     <xsd:element name="hArr" type="docEmptyType" />
//     <xsd:element name="forall" type="docEmptyType" />
//     <xsd:element name="part" type="docEmptyType" />
//     <xsd:element name="exist" type="docEmptyType" />
//     <xsd:element name="empty" type="docEmptyType" />
//     <xsd:element name="nabla" type="docEmptyType" />
//     <xsd:element name="isin" type="docEmptyType" />
//     <xsd:element name="notin" type="docEmptyType" />
//     <xsd:element name="ni" type="docEmptyType" />
//     <xsd:element name="prod" type="docEmptyType" />
//     <xsd:element name="sum" type="docEmptyType" />
//     <xsd:element name="minus" type="docEmptyType" />
//     <xsd:element name="lowast" type="docEmptyType" />
//     <xsd:element name="radic" type="docEmptyType" />
//     <xsd:element name="prop" type="docEmptyType" />
//     <xsd:element name="infin" type="docEmptyType" />
//     <xsd:element name="ang" type="docEmptyType" />
//     <xsd:element name="and" type="docEmptyType" />
//     <xsd:element name="or" type="docEmptyType" />
//     <xsd:element name="cap" type="docEmptyType" />
//     <xsd:element name="cup" type="docEmptyType" />
//     <xsd:element name="int" type="docEmptyType" />
//     <xsd:element name="there4" type="docEmptyType" />
//     <xsd:element name="sim" type="docEmptyType" />
//     <xsd:element name="cong" type="docEmptyType" />
//     <xsd:element name="asymp" type="docEmptyType" />
//     <xsd:element name="ne" type="docEmptyType" />
//     <xsd:element name="equiv" type="docEmptyType" />
//     <xsd:element name="le" type="docEmptyType" />
//     <xsd:element name="ge" type="docEmptyType" />
//     <xsd:element name="sub" type="docEmptyType" />
//     <xsd:element name="sup" type="docEmptyType" />
//     <xsd:element name="nsub" type="docEmptyType" />
//     <xsd:element name="sube" type="docEmptyType" />
//     <xsd:element name="supe" type="docEmptyType" />
//     <xsd:element name="oplus" type="docEmptyType" />
//     <xsd:element name="otimes" type="docEmptyType" />
//     <xsd:element name="perp" type="docEmptyType" />
//     <xsd:element name="sdot" type="docEmptyType" />
//     <xsd:element name="lceil" type="docEmptyType" />
//     <xsd:element name="rceil" type="docEmptyType" />
//     <xsd:element name="lfloor" type="docEmptyType" />
//     <xsd:element name="rfloor" type="docEmptyType" />
//     <xsd:element name="lang" type="docEmptyType" />
//     <xsd:element name="rang" type="docEmptyType" />
//     <xsd:element name="loz" type="docEmptyType" />
//     <xsd:element name="spades" type="docEmptyType" />
//     <xsd:element name="clubs" type="docEmptyType" />
//     <xsd:element name="hearts" type="docEmptyType" />
//     <xsd:element name="diams" type="docEmptyType" />
//     <xsd:element name="OElig" type="docEmptyType" />
//     <xsd:element name="oelig" type="docEmptyType" />
//     <xsd:element name="Scaron" type="docEmptyType" />
//     <xsd:element name="scaron" type="docEmptyType" />
//     <xsd:element name="Yumlaut" type="docEmptyType" />
//     <xsd:element name="circ" type="docEmptyType" />
//     <xsd:element name="tilde" type="docEmptyType" />
//     <xsd:element name="ensp" type="docEmptyType" />
//     <xsd:element name="emsp" type="docEmptyType" />
//     <xsd:element name="thinsp" type="docEmptyType" />
//     <xsd:element name="zwnj" type="docEmptyType" />
//     <xsd:element name="zwj" type="docEmptyType" />
//     <xsd:element name="lrm" type="docEmptyType" />
//     <xsd:element name="rlm" type="docEmptyType" />
//     <xsd:element name="ndash" type="docEmptyType" />
//     <xsd:element name="mdash" type="docEmptyType" />
//     <xsd:element name="lsquo" type="docEmptyType" />
//     <xsd:element name="rsquo" type="docEmptyType" />
//     <xsd:element name="sbquo" type="docEmptyType" />
//     <xsd:element name="ldquo" type="docEmptyType" />
//     <xsd:element name="rdquo" type="docEmptyType" />
//     <xsd:element name="bdquo" type="docEmptyType" />
//     <xsd:element name="dagger" type="docEmptyType" />
//     <xsd:element name="Dagger" type="docEmptyType" />
//     <xsd:element name="permil" type="docEmptyType" />
//     <xsd:element name="lsaquo" type="docEmptyType" />
//     <xsd:element name="rsaquo" type="docEmptyType" />
//     <xsd:element name="euro" type="docEmptyType" />
//     <xsd:element name="tm" type="docEmptyType" />
//   </xsd:choice>
// </xsd:group>

// <xsd:complexType name="docTitleType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
// </xsd:complexType>

// <xsd:complexType name="docSummaryType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
// </xsd:complexType>

// <xsd:group name="docCmdGroup">
//   <xsd:choice>
//     <!-- start workaround for xsd.exe
//       <xsd:group ref="docTitleCmdGroup"/>
//     -->
//     <xsd:element name="ulink" type="docURLLink" />
//     <xsd:element name="bold" type="docMarkupType" />
//     <xsd:element name="s" type="docMarkupType" />
//     <xsd:element name="strike" type="docMarkupType" />
//     <xsd:element name="underline" type="docMarkupType" />
//     <xsd:element name="emphasis" type="docMarkupType" />
//     <xsd:element name="computeroutput" type="docMarkupType" />
//     <xsd:element name="subscript" type="docMarkupType" />
//     <xsd:element name="superscript" type="docMarkupType" />
//     <xsd:element name="center" type="docMarkupType" />
//     <xsd:element name="small" type="docMarkupType" />
//     <xsd:element name="cite" type="docMarkupType" />
//     <xsd:element name="del" type="docMarkupType" />
//     <xsd:element name="ins" type="docMarkupType" />
//     <xsd:element name="htmlonly" type="docHtmlOnlyType" />
//     <xsd:element name="manonly" type="xsd:string" />
//     <xsd:element name="xmlonly" type="xsd:string" />
//     <xsd:element name="rtfonly" type="xsd:string" />
//     <xsd:element name="latexonly" type="xsd:string" />
//     <xsd:element name="docbookonly" type="xsd:string" />
//     <xsd:element name="image" type="docImageType" />
//     <xsd:element name="dot" type="docDotMscType" />
//     <xsd:element name="msc" type="docDotMscType" />
//     <xsd:element name="plantuml" type="docPlantumlType" />
//     <xsd:element name="anchor" type="docAnchorType" />
//     <xsd:element name="formula" type="docFormulaType" />
//     <xsd:element name="ref" type="docRefTextType" />
//     <xsd:element name="emoji" type="docEmojiType" />
//     <xsd:element name="linebreak" type="docEmptyType" />
//     <xsd:element name="nonbreakablespace" type="docEmptyType" />
//     <xsd:element name="iexcl" type="docEmptyType" />
//     <xsd:element name="cent" type="docEmptyType" />
//     <xsd:element name="pound" type="docEmptyType" />
//     <xsd:element name="curren" type="docEmptyType" />
//     <xsd:element name="yen" type="docEmptyType" />
//     <xsd:element name="brvbar" type="docEmptyType" />
//     <xsd:element name="sect" type="docEmptyType" />
//     <xsd:element name="umlaut" type="docEmptyType" />
//     <xsd:element name="copy" type="docEmptyType" />
//     <xsd:element name="ordf" type="docEmptyType" />
//     <xsd:element name="laquo" type="docEmptyType" />
//     <xsd:element name="not" type="docEmptyType" />
//     <xsd:element name="shy" type="docEmptyType" />
//     <xsd:element name="registered" type="docEmptyType" />
//     <xsd:element name="macr" type="docEmptyType" />
//     <xsd:element name="deg" type="docEmptyType" />
//     <xsd:element name="plusmn" type="docEmptyType" />
//     <xsd:element name="sup2" type="docEmptyType" />
//     <xsd:element name="sup3" type="docEmptyType" />
//     <xsd:element name="acute" type="docEmptyType" />
//     <xsd:element name="micro" type="docEmptyType" />
//     <xsd:element name="para" type="docEmptyType" />
//     <xsd:element name="middot" type="docEmptyType" />
//     <xsd:element name="cedil" type="docEmptyType" />
//     <xsd:element name="sup1" type="docEmptyType" />
//     <xsd:element name="ordm" type="docEmptyType" />
//     <xsd:element name="raquo" type="docEmptyType" />
//     <xsd:element name="frac14" type="docEmptyType" />
//     <xsd:element name="frac12" type="docEmptyType" />
//     <xsd:element name="frac34" type="docEmptyType" />
//     <xsd:element name="iquest" type="docEmptyType" />
//     <xsd:element name="Agrave" type="docEmptyType" />
//     <xsd:element name="Aacute" type="docEmptyType" />
//     <xsd:element name="Acirc" type="docEmptyType" />
//     <xsd:element name="Atilde" type="docEmptyType" />
//     <xsd:element name="Aumlaut" type="docEmptyType" />
//     <xsd:element name="Aring" type="docEmptyType" />
//     <xsd:element name="AElig" type="docEmptyType" />
//     <xsd:element name="Ccedil" type="docEmptyType" />
//     <xsd:element name="Egrave" type="docEmptyType" />
//     <xsd:element name="Eacute" type="docEmptyType" />
//     <xsd:element name="Ecirc" type="docEmptyType" />
//     <xsd:element name="Eumlaut" type="docEmptyType" />
//     <xsd:element name="Igrave" type="docEmptyType" />
//     <xsd:element name="Iacute" type="docEmptyType" />
//     <xsd:element name="Icirc" type="docEmptyType" />
//     <xsd:element name="Iumlaut" type="docEmptyType" />
//     <xsd:element name="ETH" type="docEmptyType" />
//     <xsd:element name="Ntilde" type="docEmptyType" />
//     <xsd:element name="Ograve" type="docEmptyType" />
//     <xsd:element name="Oacute" type="docEmptyType" />
//     <xsd:element name="Ocirc" type="docEmptyType" />
//     <xsd:element name="Otilde" type="docEmptyType" />
//     <xsd:element name="Oumlaut" type="docEmptyType" />
//     <xsd:element name="times" type="docEmptyType" />
//     <xsd:element name="Oslash" type="docEmptyType" />
//     <xsd:element name="Ugrave" type="docEmptyType" />
//     <xsd:element name="Uacute" type="docEmptyType" />
//     <xsd:element name="Ucirc" type="docEmptyType" />
//     <xsd:element name="Uumlaut" type="docEmptyType" />
//     <xsd:element name="Yacute" type="docEmptyType" />
//     <xsd:element name="THORN" type="docEmptyType" />
//     <xsd:element name="szlig" type="docEmptyType" />
//     <xsd:element name="agrave" type="docEmptyType" />
//     <xsd:element name="aacute" type="docEmptyType" />
//     <xsd:element name="acirc" type="docEmptyType" />
//     <xsd:element name="atilde" type="docEmptyType" />
//     <xsd:element name="aumlaut" type="docEmptyType" />
//     <xsd:element name="aring" type="docEmptyType" />
//     <xsd:element name="aelig" type="docEmptyType" />
//     <xsd:element name="ccedil" type="docEmptyType" />
//     <xsd:element name="egrave" type="docEmptyType" />
//     <xsd:element name="eacute" type="docEmptyType" />
//     <xsd:element name="ecirc" type="docEmptyType" />
//     <xsd:element name="eumlaut" type="docEmptyType" />
//     <xsd:element name="igrave" type="docEmptyType" />
//     <xsd:element name="iacute" type="docEmptyType" />
//     <xsd:element name="icirc" type="docEmptyType" />
//     <xsd:element name="iumlaut" type="docEmptyType" />
//     <xsd:element name="eth" type="docEmptyType" />
//     <xsd:element name="ntilde" type="docEmptyType" />
//     <xsd:element name="ograve" type="docEmptyType" />
//     <xsd:element name="oacute" type="docEmptyType" />
//     <xsd:element name="ocirc" type="docEmptyType" />
//     <xsd:element name="otilde" type="docEmptyType" />
//     <xsd:element name="oumlaut" type="docEmptyType" />
//     <xsd:element name="divide" type="docEmptyType" />
//     <xsd:element name="oslash" type="docEmptyType" />
//     <xsd:element name="ugrave" type="docEmptyType" />
//     <xsd:element name="uacute" type="docEmptyType" />
//     <xsd:element name="ucirc" type="docEmptyType" />
//     <xsd:element name="uumlaut" type="docEmptyType" />
//     <xsd:element name="yacute" type="docEmptyType" />
//     <xsd:element name="thorn" type="docEmptyType" />
//     <xsd:element name="yumlaut" type="docEmptyType" />
//     <xsd:element name="fnof" type="docEmptyType" />
//     <xsd:element name="Alpha" type="docEmptyType" />
//     <xsd:element name="Beta" type="docEmptyType" />
//     <xsd:element name="Gamma" type="docEmptyType" />
//     <xsd:element name="Delta" type="docEmptyType" />
//     <xsd:element name="Epsilon" type="docEmptyType" />
//     <xsd:element name="Zeta" type="docEmptyType" />
//     <xsd:element name="Eta" type="docEmptyType" />
//     <xsd:element name="Theta" type="docEmptyType" />
//     <xsd:element name="Iota" type="docEmptyType" />
//     <xsd:element name="Kappa" type="docEmptyType" />
//     <xsd:element name="Lambda" type="docEmptyType" />
//     <xsd:element name="Mu" type="docEmptyType" />
//     <xsd:element name="Nu" type="docEmptyType" />
//     <xsd:element name="Xi" type="docEmptyType" />
//     <xsd:element name="Omicron" type="docEmptyType" />
//     <xsd:element name="Pi" type="docEmptyType" />
//     <xsd:element name="Rho" type="docEmptyType" />
//     <xsd:element name="Sigma" type="docEmptyType" />
//     <xsd:element name="Tau" type="docEmptyType" />
//     <xsd:element name="Upsilon" type="docEmptyType" />
//     <xsd:element name="Phi" type="docEmptyType" />
//     <xsd:element name="Chi" type="docEmptyType" />
//     <xsd:element name="Psi" type="docEmptyType" />
//     <xsd:element name="Omega" type="docEmptyType" />
//     <xsd:element name="alpha" type="docEmptyType" />
//     <xsd:element name="beta" type="docEmptyType" />
//     <xsd:element name="gamma" type="docEmptyType" />
//     <xsd:element name="delta" type="docEmptyType" />
//     <xsd:element name="epsilon" type="docEmptyType" />
//     <xsd:element name="zeta" type="docEmptyType" />
//     <xsd:element name="eta" type="docEmptyType" />
//     <xsd:element name="theta" type="docEmptyType" />
//     <xsd:element name="iota" type="docEmptyType" />
//     <xsd:element name="kappa" type="docEmptyType" />
//     <xsd:element name="lambda" type="docEmptyType" />
//     <xsd:element name="mu" type="docEmptyType" />
//     <xsd:element name="nu" type="docEmptyType" />
//     <xsd:element name="xi" type="docEmptyType" />
//     <xsd:element name="omicron" type="docEmptyType" />
//     <xsd:element name="pi" type="docEmptyType" />
//     <xsd:element name="rho" type="docEmptyType" />
//     <xsd:element name="sigmaf" type="docEmptyType" />
//     <xsd:element name="sigma" type="docEmptyType" />
//     <xsd:element name="tau" type="docEmptyType" />
//     <xsd:element name="upsilon" type="docEmptyType" />
//     <xsd:element name="phi" type="docEmptyType" />
//     <xsd:element name="chi" type="docEmptyType" />
//     <xsd:element name="psi" type="docEmptyType" />
//     <xsd:element name="omega" type="docEmptyType" />
//     <xsd:element name="thetasym" type="docEmptyType" />
//     <xsd:element name="upsih" type="docEmptyType" />
//     <xsd:element name="piv" type="docEmptyType" />
//     <xsd:element name="bull" type="docEmptyType" />
//     <xsd:element name="hellip" type="docEmptyType" />
//     <xsd:element name="prime" type="docEmptyType" />
//     <xsd:element name="Prime" type="docEmptyType" />
//     <xsd:element name="oline" type="docEmptyType" />
//     <xsd:element name="frasl" type="docEmptyType" />
//     <xsd:element name="weierp" type="docEmptyType" />
//     <xsd:element name="imaginary" type="docEmptyType" />
//     <xsd:element name="real" type="docEmptyType" />
//     <xsd:element name="trademark" type="docEmptyType" />
//     <xsd:element name="alefsym" type="docEmptyType" />
//     <xsd:element name="larr" type="docEmptyType" />
//     <xsd:element name="uarr" type="docEmptyType" />
//     <xsd:element name="rarr" type="docEmptyType" />
//     <xsd:element name="darr" type="docEmptyType" />
//     <xsd:element name="harr" type="docEmptyType" />
//     <xsd:element name="crarr" type="docEmptyType" />
//     <xsd:element name="lArr" type="docEmptyType" />
//     <xsd:element name="uArr" type="docEmptyType" />
//     <xsd:element name="rArr" type="docEmptyType" />
//     <xsd:element name="dArr" type="docEmptyType" />
//     <xsd:element name="hArr" type="docEmptyType" />
//     <xsd:element name="forall" type="docEmptyType" />
//     <xsd:element name="part" type="docEmptyType" />
//     <xsd:element name="exist" type="docEmptyType" />
//     <xsd:element name="empty" type="docEmptyType" />
//     <xsd:element name="nabla" type="docEmptyType" />
//     <xsd:element name="isin" type="docEmptyType" />
//     <xsd:element name="notin" type="docEmptyType" />
//     <xsd:element name="ni" type="docEmptyType" />
//     <xsd:element name="prod" type="docEmptyType" />
//     <xsd:element name="sum" type="docEmptyType" />
//     <xsd:element name="minus" type="docEmptyType" />
//     <xsd:element name="lowast" type="docEmptyType" />
//     <xsd:element name="radic" type="docEmptyType" />
//     <xsd:element name="prop" type="docEmptyType" />
//     <xsd:element name="infin" type="docEmptyType" />
//     <xsd:element name="ang" type="docEmptyType" />
//     <xsd:element name="and" type="docEmptyType" />
//     <xsd:element name="or" type="docEmptyType" />
//     <xsd:element name="cap" type="docEmptyType" />
//     <xsd:element name="cup" type="docEmptyType" />
//     <xsd:element name="int" type="docEmptyType" />
//     <xsd:element name="there4" type="docEmptyType" />
//     <xsd:element name="sim" type="docEmptyType" />
//     <xsd:element name="cong" type="docEmptyType" />
//     <xsd:element name="asymp" type="docEmptyType" />
//     <xsd:element name="ne" type="docEmptyType" />
//     <xsd:element name="equiv" type="docEmptyType" />
//     <xsd:element name="le" type="docEmptyType" />
//     <xsd:element name="ge" type="docEmptyType" />
//     <xsd:element name="sub" type="docEmptyType" />
//     <xsd:element name="sup" type="docEmptyType" />
//     <xsd:element name="nsub" type="docEmptyType" />
//     <xsd:element name="sube" type="docEmptyType" />
//     <xsd:element name="supe" type="docEmptyType" />
//     <xsd:element name="oplus" type="docEmptyType" />
//     <xsd:element name="otimes" type="docEmptyType" />
//     <xsd:element name="perp" type="docEmptyType" />
//     <xsd:element name="sdot" type="docEmptyType" />
//     <xsd:element name="lceil" type="docEmptyType" />
//     <xsd:element name="rceil" type="docEmptyType" />
//     <xsd:element name="lfloor" type="docEmptyType" />
//     <xsd:element name="rfloor" type="docEmptyType" />
//     <xsd:element name="lang" type="docEmptyType" />
//     <xsd:element name="rang" type="docEmptyType" />
//     <xsd:element name="loz" type="docEmptyType" />
//     <xsd:element name="spades" type="docEmptyType" />
//     <xsd:element name="clubs" type="docEmptyType" />
//     <xsd:element name="hearts" type="docEmptyType" />
//     <xsd:element name="diams" type="docEmptyType" />
//     <xsd:element name="OElig" type="docEmptyType" />
//     <xsd:element name="oelig" type="docEmptyType" />
//     <xsd:element name="Scaron" type="docEmptyType" />
//     <xsd:element name="scaron" type="docEmptyType" />
//     <xsd:element name="Yumlaut" type="docEmptyType" />
//     <xsd:element name="circ" type="docEmptyType" />
//     <xsd:element name="tilde" type="docEmptyType" />
//     <xsd:element name="ensp" type="docEmptyType" />
//     <xsd:element name="emsp" type="docEmptyType" />
//     <xsd:element name="thinsp" type="docEmptyType" />
//     <xsd:element name="zwnj" type="docEmptyType" />
//     <xsd:element name="zwj" type="docEmptyType" />
//     <xsd:element name="lrm" type="docEmptyType" />
//     <xsd:element name="rlm" type="docEmptyType" />
//     <xsd:element name="ndash" type="docEmptyType" />
//     <xsd:element name="mdash" type="docEmptyType" />
//     <xsd:element name="lsquo" type="docEmptyType" />
//     <xsd:element name="rsquo" type="docEmptyType" />
//     <xsd:element name="sbquo" type="docEmptyType" />
//     <xsd:element name="ldquo" type="docEmptyType" />
//     <xsd:element name="rdquo" type="docEmptyType" />
//     <xsd:element name="bdquo" type="docEmptyType" />
//     <xsd:element name="dagger" type="docEmptyType" />
//     <xsd:element name="Dagger" type="docEmptyType" />
//     <xsd:element name="permil" type="docEmptyType" />
//     <xsd:element name="lsaquo" type="docEmptyType" />
//     <xsd:element name="rsaquo" type="docEmptyType" />
//     <xsd:element name="euro" type="docEmptyType" />
//     <xsd:element name="tm" type="docEmptyType" />
//     <!-- end workaround for xsd.exe -->
//     <xsd:element name="hruler" type="docEmptyType" />
//     <xsd:element name="preformatted" type="docMarkupType" />
//     <xsd:element name="programlisting" type="listingType" />
//     <xsd:element name="verbatim" type="xsd:string" />
//     <xsd:element name="javadocliteral" type="xsd:string" />
//     <xsd:element name="javadoccode" type="xsd:string" />
//     <xsd:element name="indexentry" type="docIndexEntryType" />
//     <xsd:element name="orderedlist" type="docListType" />
//     <xsd:element name="itemizedlist" type="docListType" />
//     <xsd:element name="simplesect" type="docSimpleSectType" />
//     <xsd:element name="title" type="docTitleType" />
//     <xsd:element name="variablelist" type="docVariableListType" />
//     <xsd:element name="table" type="docTableType" />
//     <xsd:element name="heading" type="docHeadingType" />
//     <xsd:element name="dotfile" type="docImageFileType" />
//     <xsd:element name="mscfile" type="docImageFileType" />
//     <xsd:element name="diafile" type="docImageFileType" />
//     <xsd:element name="plantumlfile" type="docImageFileType" />
//     <xsd:element name="toclist" type="docTocListType" />
//     <xsd:element name="language" type="docLanguageType" />
//     <xsd:element name="parameterlist" type="docParamListType" />
//     <xsd:element name="xrefsect" type="docXRefSectType" />
//     <xsd:element name="copydoc" type="docCopyType" />
//     <xsd:element name="details" type="docDetailsType" />
//     <xsd:element name="blockquote" type="docBlockQuoteType" />
//     <xsd:element name="parblock" type="docParBlockType" />
//   </xsd:choice>
// </xsd:group>

export type XmlDocCmdGroupElements = XmlBoldElement | XmlComputerOutputElement | XmlParameterListElement | XmlSimpleSectElement | XmlText

export interface XmlBoldElement {
  bold: XmlDocMarkupTypeElements[]
}

export interface XmlComputerOutputElement {
  computeroutput: XmlDocMarkupTypeElements[]
}

export interface XmlParameterListElement extends XmlDocParamListTypeAttributes {
  parameterlist: XmlDocParamListTypeElements[]
}

export interface XmlSimpleSectElement extends XmlDocSimpleSectTypeAttributes {
  simplesect: XmlDocSimpleSectTypeElements[]
}

// <xsd:complexType name="docParaType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
// </xsd:complexType>

export type XmlDocParaTypeElements = XmlDocCmdGroupElements | XmlText

// <xsd:complexType name="docMarkupType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docCmdGroup" minOccurs="0" maxOccurs="unbounded" />
// </xsd:complexType>

export type XmlDocMarkupTypeElements = XmlDocCmdGroupElements | XmlText

// <xsd:complexType name="docURLLink" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="url" type="xsd:string" />
// </xsd:complexType>

export type XmlDocURLLinkTypeElements = XmlDocCmdGroupElements | XmlText

export interface XmlDocURLLinkTypeAttributes {
  ':@': {
    '@_url': string
  }
}

// <xsd:complexType name="docAnchorType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docFormulaType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docIndexEntryType">
//   <xsd:sequence>
//     <xsd:element name="primaryie" type="xsd:string" />
//     <xsd:element name="secondaryie" type="xsd:string" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docListType">
//   <xsd:sequence>
//     <xsd:element name="listitem" type="docListItemType" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="type" type="DoxOlType" />
//   <xsd:attribute name="start" type="xsd:integer" />
// </xsd:complexType>

// <xsd:complexType name="docListItemType">
//   <xsd:sequence>
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="override" type="DoxCheck" />
//   <xsd:attribute name="value" type="xsd:integer" use="optional"/>
// </xsd:complexType>

// <xsd:complexType name="docSimpleSectType">
//   <xsd:sequence>
//     <xsd:element name="title" type="docTitleType" minOccurs="0" />
//     <xsd:sequence minOccurs="0" maxOccurs="unbounded">
//       <xsd:element name="para" type="docParaType" minOccurs="1" maxOccurs="unbounded" />
//     </xsd:sequence>
//   </xsd:sequence>
//   <xsd:attribute name="kind" type="DoxSimpleSectKind" />
// </xsd:complexType>

export type XmlDocSimpleSectTypeElements = XmlTitleElement | XmlParaElement | XmlText

export interface XmlDocSimpleSectTypeAttributes {
  ':@': {
    '@_kind': XmlDoxSimpleSectKind
  }
}

// <xsd:complexType name="docVarListEntryType">
//   <xsd:sequence>
//     <xsd:element name="term" type="docTitleType" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:group name="docVariableListGroup">
//   <xsd:sequence>
//     <xsd:element name="varlistentry" type="docVarListEntryType" />
//     <xsd:element name="listitem" type="docListItemType" />
//   </xsd:sequence>
// </xsd:group>

// <xsd:complexType name="docVariableListType">
//   <xsd:sequence>
//     <xsd:group ref="docVariableListGroup" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docRefTextType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="refid" type="xsd:string" />
//   <xsd:attribute name="kindref" type="DoxRefKind" />
//   <xsd:attribute name="external" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docTableType">
//   <xsd:sequence>
//     <xsd:element name="caption" type="docCaptionType" minOccurs="0" maxOccurs="1" />
//     <xsd:element name="row" type="docRowType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="rows" type="xsd:integer" />
//   <xsd:attribute name="cols" type="xsd:integer" />
//   <xsd:attribute name="width" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docRowType">
//   <xsd:sequence>
//     <xsd:element name="entry" type="docEntryType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docEntryType">
//   <xsd:sequence>
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="thead" type="DoxBool" />
//   <xsd:attribute name="colspan" type="xsd:integer" />
//   <xsd:attribute name="rowspan" type="xsd:integer" />
//   <xsd:attribute name="align" type="DoxAlign" />
//   <xsd:attribute name="valign" type="DoxVerticalAlign" />
//   <xsd:attribute name="width" type="xsd:string" />
//   <xsd:attribute name="class" type="xsd:string" />
//   <xsd:anyAttribute processContents="skip"/>
// </xsd:complexType>

// <xsd:complexType name="docCaptionType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:simpleType name="range_1_6">
//   <xsd:restriction base="xsd:integer">
//     <xsd:minInclusive value="1"/>
//     <xsd:maxInclusive value="6"/>
//   </xsd:restriction>
// </xsd:simpleType>

// <xsd:complexType name="docHeadingType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="level" type="range_1_6" />
// </xsd:complexType>

// <xsd:complexType name="docImageType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="type" type="DoxImageKind" use="optional"/>
//   <xsd:attribute name="name" type="xsd:string" use="optional"/>
//   <xsd:attribute name="width" type="xsd:string" use="optional"/>
//   <xsd:attribute name="height" type="xsd:string" use="optional"/>
//   <xsd:attribute name="alt" type="xsd:string" use="optional"/>
//   <xsd:attribute name="inline" type="DoxBool" use="optional"/>
//   <xsd:attribute name="caption" type="xsd:string" use="optional"/>
// </xsd:complexType>

// <xsd:complexType name="docDotMscType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="name" type="xsd:string" use="optional"/>
//   <xsd:attribute name="width" type="xsd:string" use="optional"/>
//   <xsd:attribute name="height" type="xsd:string" use="optional"/>
//   <xsd:attribute name="caption" type="xsd:string" use="optional"/>
// </xsd:complexType>

// <xsd:complexType name="docImageFileType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="name" type="xsd:string" use="optional">
//     <xsd:annotation>
//       <xsd:documentation>The mentioned file will be located in the directory as specified by XML_OUTPUT</xsd:documentation>
//     </xsd:annotation>
//   </xsd:attribute>
//   <xsd:attribute name="width" type="xsd:string" use="optional"/>
//   <xsd:attribute name="height" type="xsd:string" use="optional"/>
// </xsd:complexType>

// <xsd:complexType name="docPlantumlType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="name" type="xsd:string" use="optional"/>
//   <xsd:attribute name="width" type="xsd:string" use="optional"/>
//   <xsd:attribute name="height" type="xsd:string" use="optional"/>
//   <xsd:attribute name="caption" type="xsd:string" use="optional"/>
//   <xsd:attribute name="engine" type="DoxPlantumlEngine" use="optional"/>
// </xsd:complexType>

// <xsd:complexType name="docTocItemType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:group ref="docTitleCmdGroup" minOccurs="0" maxOccurs="unbounded" />
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docTocListType">
//   <xsd:sequence>
//     <xsd:element name="tocitem" type="docTocItemType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docLanguageType">
//   <xsd:sequence>
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="langid" type="xsd:string" />
// </xsd:complexType>

export type XmlDocLanguageTypeElements = XmlParaElement | XmlText

export interface XmlDocLanguageTypeAttributes {
  ':@': {
    '@_langid': string
  }
}

// <xsd:complexType name="docParamListType">
//   <xsd:sequence>
//     <xsd:element name="parameteritem" type="docParamListItem" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
//   <xsd:attribute name="kind" type="DoxParamListKind" />
// </xsd:complexType>

export type XmlDocParamListTypeElements = XmlParameterItemElement | XmlText

export interface XmlDocParamListTypeAttributes {
  ':@': {
    '@_kind': XmlDoxParamListKind
  }
}

export interface XmlParameterItemElement {
  parameteritem: XmlDocParamListItemElements[]
}

// <xsd:complexType name="docParamListItem">
//   <xsd:sequence>
//     <xsd:element name="parameternamelist" type="docParamNameList" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="parameterdescription" type="descriptionType" />
//   </xsd:sequence>
// </xsd:complexType>

export type XmlDocParamListItemElements = XmlParameterNameListElement | XmlParameterDescriptionElement | XmlText

export interface XmlParameterNameListElement {
  parameternamelist: XmlDocParamNameListElements[]
}

export interface XmlParameterDescriptionElement {
  parameterdescription: XmlDescriptionTypeElements[]
}

// <xsd:complexType name="docParamNameList">
//   <xsd:sequence>
//     <xsd:element name="parametertype" type="docParamType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="parametername" type="docParamName" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

export type XmlDocParamNameListElements = XmlParameterTypeElement | XmlParameterNameElement | XmlText

export interface XmlParameterTypeElement extends XmlDocParamNameAttributes {
  parametertype: XmlDocParamTypeElements[]
}

export interface XmlParameterNameElement extends XmlDocParamNameAttributes {
  parametername: XmlDocParamNameElements[]
}

// <xsd:complexType name="docParamType" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="1" />
//   </xsd:sequence>
// </xsd:complexType>

export type XmlDocParamTypeElements = XmlRefElement | XmlText

// <xsd:complexType name="docParamName" mixed="true">   <-- Character data is allowed to appear between the child elements!
//   <xsd:sequence>
//     <xsd:element name="ref" type="refTextType" minOccurs="0" maxOccurs="1" />
//   </xsd:sequence>
//   <xsd:attribute name="direction" type="DoxParamDir" use="optional" />
// </xsd:complexType>

export type XmlDocParamNameElements = XmlRefElement | XmlText

export interface XmlDocParamNameAttributes {
  ':@': {
    '@_direction': XmlDoxParamDir
  }
}

// <xsd:complexType name="docXRefSectType">
//   <xsd:sequence>
//     <xsd:element name="xreftitle" type="xsd:string" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="xrefdescription" type="descriptionType" />
//   </xsd:sequence>
//   <xsd:attribute name="id" type="xsd:string" />
// </xsd:complexType>

// <xsd:complexType name="docCopyType">
//   <xsd:sequence>
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="sect1" type="docSect1Type" minOccurs="0" maxOccurs="unbounded" />
//     <xsd:element name="internal" type="docInternalType" minOccurs="0" />
//   </xsd:sequence>
//   <xsd:attribute name="link" type="xsd:string" />
// </xsd:complexType>
// <xsd:complexType name="docDetailsType">
//   <xsd:sequence>
//     <xsd:element name="summary" type="docSummaryType" minOccurs="0" maxOccurs="1" />
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docBlockQuoteType">
//   <xsd:sequence>
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docParBlockType">
//   <xsd:sequence>
//     <xsd:element name="para" type="docParaType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docEmptyType"/>

// <xsd:complexType name="tableofcontentsType">
//   <xsd:sequence>
//     <xsd:choice>
//       <xsd:element name="tocsect" type="tableofcontentsKindType" minOccurs="1" maxOccurs="unbounded" />
//       <xsd:element name="tableofcontents" type="tableofcontentsType" minOccurs="0" maxOccurs="unbounded" />
//     </xsd:choice>
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="tableofcontentsKindType">
//   <xsd:sequence>
//     <xsd:element name="name" type="xsd:string" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="reference" type="xsd:string" minOccurs="1" maxOccurs="1"/>
//     <xsd:element name="tableofcontents" type="tableofcontentsType" minOccurs="0" maxOccurs="unbounded" />
//   </xsd:sequence>
// </xsd:complexType>

// <xsd:complexType name="docEmojiType">
//   <xsd:attribute name="name" type="xsd:string"/>
//   <xsd:attribute name="unicode" type="xsd:string"/>
// </xsd:complexType>

export type XmlDocEmojiTypeElements = XmlText

export interface XmlDocEmojiTypeAttributes {
  ':@': {
    '@_name': string
    '@_unicode': string
  }
}

// <!-- Simple types -->
// <xsd:simpleType name="DoxBool">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="yes" />
//     <xsd:enumeration value="no" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxBool = 'yes' | 'no'

// <xsd:simpleType name="DoxGraphRelation">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="include" />
//     <xsd:enumeration value="usage" />
//     <xsd:enumeration value="template-instance" />
//     <xsd:enumeration value="public-inheritance" />
//     <xsd:enumeration value="protected-inheritance" />
//     <xsd:enumeration value="private-inheritance" />
//     <xsd:enumeration value="type-constraint" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxGraphRelation = 'include' | 'usage' // TODO

// <xsd:simpleType name="DoxRefKind">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="compound" />
//     <xsd:enumeration value="member" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxRefKind = 'compound' | 'member'

// <xsd:simpleType name="DoxMemberKind">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="define" />
//     <xsd:enumeration value="property" />
//     <xsd:enumeration value="event" />
//     <xsd:enumeration value="variable" />
//     <xsd:enumeration value="typedef" />
//     <xsd:enumeration value="enum" />
//     <xsd:enumeration value="function" />
//     <xsd:enumeration value="signal" />
//     <xsd:enumeration value="prototype" />
//     <xsd:enumeration value="friend" />
//     <xsd:enumeration value="dcop" />
//     <xsd:enumeration value="slot" />
//     <xsd:enumeration value="interface" />
//     <xsd:enumeration value="service" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxMemberKind = 'define' | 'property' | 'event' | 'variable' | 'typedef' | 'enum' | 'function' | 'signal' | 'prototype' | 'friend' | 'dcop' | 'slot' | 'interface' | 'service'

// <xsd:simpleType name="DoxProtectionKind">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="public" />
//     <xsd:enumeration value="protected" />
//     <xsd:enumeration value="private" />
//     <xsd:enumeration value="package" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxProtectionKind = 'public' | 'protected' | 'private' | 'package'

// <xsd:simpleType name="DoxRefQualifierKind">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="lvalue" />
//     <xsd:enumeration value="rvalue" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxRefQualifierKind = 'lvalue' | 'rvalue'

// <xsd:simpleType name="DoxLanguage">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="Unknown" />
//     <xsd:enumeration value="IDL" />
//     <xsd:enumeration value="Java" />
//     <xsd:enumeration value="C#" />
//     <xsd:enumeration value="D" />
//     <xsd:enumeration value="PHP" />
//     <xsd:enumeration value="Objective-C" />
//     <xsd:enumeration value="C++" />
//     <xsd:enumeration value="JavaScript" />
//     <xsd:enumeration value="Python" />
//     <xsd:enumeration value="Fortran" />
//     <xsd:enumeration value="VHDL" />
//     <xsd:enumeration value="XML" />
//     <xsd:enumeration value="SQL" />
//     <xsd:enumeration value="Markdown" />
//     <xsd:enumeration value="Slice" />
//     <xsd:enumeration value="Lex" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxLanguage = 'Unknown' | 'C++' // TODO

// <xsd:simpleType name="DoxVirtualKind">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="non-virtual" />
//     <xsd:enumeration value="virtual" />
//     <xsd:enumeration value="pure-virtual" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxVirtualKind = 'non-virtual' | 'virtual' | 'pure-virtual'

// <xsd:simpleType name="DoxCompoundKind">
//   <xsd:restriction base="xsd:string">
//     <xsd:enumeration value="class" />
//     <xsd:enumeration value="struct" />
//     <xsd:enumeration value="union" />
//     <xsd:enumeration value="interface" />
//     <xsd:enumeration value="protocol" />
//     <xsd:enumeration value="category" />
//     <xsd:enumeration value="exception" />
//     <xsd:enumeration value="service" />
//     <xsd:enumeration value="singleton" />
//     <xsd:enumeration value="module" />
//     <xsd:enumeration value="type" />
//     <xsd:enumeration value="file" />
//     <xsd:enumeration value="namespace" />
//     <xsd:enumeration value="group" />
//     <xsd:enumeration value="page" />
//     <xsd:enumeration value="example" />
//     <xsd:enumeration value="dir" />
//     <xsd:enumeration value="concept" />
//   </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxCompoundKind = 'class' | 'struct' | 'union' | 'interface' | 'protocol' | 'category' | 'exception' | 'service' | 'singleton' | 'module' | 'type' | 'file' | 'namespace' | 'group' | 'page' | 'example' | 'dir' | 'concept'

// <xsd:simpleType name="DoxSectionKind">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="user-defined" />
//   <xsd:enumeration value="public-type" />
//   <xsd:enumeration value="public-func" />
//   <xsd:enumeration value="public-attrib" />
//   <xsd:enumeration value="public-slot" />
//   <xsd:enumeration value="signal" />
//   <xsd:enumeration value="dcop-func" />
//   <xsd:enumeration value="property" />
//   <xsd:enumeration value="event" />
//   <xsd:enumeration value="public-static-func" />
//   <xsd:enumeration value="public-static-attrib" />
//   <xsd:enumeration value="protected-type" />
//   <xsd:enumeration value="protected-func" />
//   <xsd:enumeration value="protected-attrib" />
//   <xsd:enumeration value="protected-slot" />
//   <xsd:enumeration value="protected-static-func" />
//   <xsd:enumeration value="protected-static-attrib" />
//   <xsd:enumeration value="package-type" />
//   <xsd:enumeration value="package-func" />
//   <xsd:enumeration value="package-attrib" />
//   <xsd:enumeration value="package-static-func" />
//   <xsd:enumeration value="package-static-attrib" />
//   <xsd:enumeration value="private-type" />
//   <xsd:enumeration value="private-func" />
//   <xsd:enumeration value="private-attrib" />
//   <xsd:enumeration value="private-slot" />
//   <xsd:enumeration value="private-static-func" />
//   <xsd:enumeration value="private-static-attrib" />
//   <xsd:enumeration value="friend" />
//   <xsd:enumeration value="related" />
//   <xsd:enumeration value="define" />
//   <xsd:enumeration value="prototype" />
//   <xsd:enumeration value="typedef" />
//   <xsd:enumeration value="enum" />
//   <xsd:enumeration value="func" />
//   <xsd:enumeration value="var" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxSectionKind = 'user-defined' | 'public-type' | 'public-func' | 'public-attrib' // TODO

// <xsd:simpleType name="DoxHighlightClass">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="comment" />
//   <xsd:enumeration value="normal" />
//   <xsd:enumeration value="preprocessor" />
//   <xsd:enumeration value="keyword" />
//   <xsd:enumeration value="keywordtype" />
//   <xsd:enumeration value="keywordflow" />
//   <xsd:enumeration value="stringliteral" />
//   <xsd:enumeration value="xmlcdata" />
//   <xsd:enumeration value="charliteral" />
//   <xsd:enumeration value="vhdlkeyword" />
//   <xsd:enumeration value="vhdllogic" />
//   <xsd:enumeration value="vhdlchar" />
//   <xsd:enumeration value="vhdldigit" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxHighlightClass = 'comment' | 'normal' | 'preprocessor' | 'keyword' // TODO

// <xsd:simpleType name="DoxSimpleSectKind">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="see" />
//   <xsd:enumeration value="return" />
//   <xsd:enumeration value="author" />
//   <xsd:enumeration value="authors" />
//   <xsd:enumeration value="version" />
//   <xsd:enumeration value="since" />
//   <xsd:enumeration value="date" />
//   <xsd:enumeration value="note" />
//   <xsd:enumeration value="warning" />
//   <xsd:enumeration value="pre" />
//   <xsd:enumeration value="post" />
//   <xsd:enumeration value="copyright" />
//   <xsd:enumeration value="invariant" />
//   <xsd:enumeration value="remark" />
//   <xsd:enumeration value="attention" />
//   <xsd:enumeration value="important" />
//   <xsd:enumeration value="par" />
//   <xsd:enumeration value="rcs" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxSimpleSectKind = 'see' | 'return' | 'author' | 'authors' | 'version' | 'since' | 'date' | 'note' | 'warning' | 'pre' | 'post' | 'copyright' | 'invariant' | 'remark' | 'attention' | 'important' | 'par' | 'rcs'

// <xsd:simpleType name="DoxCheck">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="checked" />
//   <xsd:enumeration value="unchecked" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxCheck = 'checked' | 'unchecked'

// <xsd:simpleType name="DoxVersionNumber">
// <xsd:restriction base="xsd:string">
//   <xsd:pattern value="\d+\.\d+.*" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxVersionNumber = string

// <xsd:simpleType name="DoxImageKind">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="html" />
//   <xsd:enumeration value="latex" />
//   <xsd:enumeration value="docbook" />
//   <xsd:enumeration value="rtf" />
//   <xsd:enumeration value="xml" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxImageKind = 'html' | 'latex' | 'docbook' | 'rtf' | 'xml'

// <xsd:simpleType name="DoxPlantumlEngine">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="uml"/>
//   <xsd:enumeration value="bpm"/>
//   <xsd:enumeration value="wire"/>
//   <xsd:enumeration value="dot"/>
//   <xsd:enumeration value="ditaa"/>
//   <xsd:enumeration value="salt"/>
//   <xsd:enumeration value="math"/>
//   <xsd:enumeration value="latex"/>
//   <xsd:enumeration value="gantt"/>
//   <xsd:enumeration value="mindmap"/>
//   <xsd:enumeration value="wbs"/>
//   <xsd:enumeration value="yaml"/>
//   <xsd:enumeration value="creole"/>
//   <xsd:enumeration value="json"/>
//   <xsd:enumeration value="flow"/>
//   <xsd:enumeration value="board"/>
//   <xsd:enumeration value="git"/>
//   <xsd:enumeration value="hcl"/>
//   <xsd:enumeration value="regex"/>
//   <xsd:enumeration value="ebnf"/>
//   <xsd:enumeration value="files"/>
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxPlantumlEngine = string // TODO

// <xsd:simpleType name="DoxParamListKind">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="param" />
//   <xsd:enumeration value="retval" />
//   <xsd:enumeration value="exception" />
//   <xsd:enumeration value="templateparam" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxParamListKind = 'param' | 'retval' | 'exception' | 'templateparam'

// <xsd:simpleType name="DoxCharRange">
// <xsd:restriction base="xsd:string">
//   <xsd:pattern value="[aeiouncAEIOUNC]" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxCharRange = string

// <xsd:simpleType name="DoxParamDir">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="in"/>
//   <xsd:enumeration value="out"/>
//   <xsd:enumeration value="inout"/>
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxParamDir = 'in' | 'out' | 'inout'

// <xsd:simpleType name="DoxAccessor">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="retain"/>
//   <xsd:enumeration value="copy"/>
//   <xsd:enumeration value="assign"/>
//   <xsd:enumeration value="weak"/>
//   <xsd:enumeration value="strong"/>
//   <xsd:enumeration value="unretained"/>
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxAccessor = 'retain' | 'copy' | 'assign' | 'weak' | 'strong' | 'unretained'

// <xsd:simpleType name="DoxAlign">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="left"/>
//   <xsd:enumeration value="right"/>
//   <xsd:enumeration value="center"/>
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxAlign = 'left' | 'right' | 'center'

// <xsd:simpleType name="DoxVerticalAlign">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="bottom"/>
//   <xsd:enumeration value="top"/>
//   <xsd:enumeration value="middle"/>
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxVerticalAlign = 'bottom' | 'top' | 'middle'

// <xsd:simpleType name="DoxOlType">
// <xsd:restriction base="xsd:string">
//   <xsd:enumeration value="1" />
//   <xsd:enumeration value="a" />
//   <xsd:enumeration value="A" />
//   <xsd:enumeration value="i" />
//   <xsd:enumeration value="I" />
// </xsd:restriction>
// </xsd:simpleType>

export type XmlDoxOlType = string

// ----------------------------------------------------------------------------
