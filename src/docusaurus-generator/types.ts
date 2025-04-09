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

import { CompoundDef } from '../doxygen-xml-parser/compounddef.js'
import { DocusaurusGenerator } from './index.js'

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
  generator: DocusaurusGenerator

  constructor (generator: DocusaurusGenerator) {
    this.generator = generator
  }

  abstract renderMdx (compoundDef: CompoundDef, frontMatter: FrontMatter): string
}

// ----------------------------------------------------------------------------

// https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter
export interface FrontMatter {
  keywords: string[]
  [key: string]: string | string[] | null | boolean
}

// ----------------------------------------------------------------------------
