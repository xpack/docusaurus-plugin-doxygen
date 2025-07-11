/*
 * This file is part of the xPack project (http://xpack.github.io).
 * Copyright (c) 2024 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/licenses/MIT.
 */

// ----------------------------------------------------------------------------

import styles from './styles.module.css';
import React from 'react';

// ----------------------------------------------------------------------------

// A weird thing happens here when the name is not `version`.
export default function DoxygenPage({children, pluginConfig}) {
  const doxygenVersion=` ${pluginConfig.doxygenVersion ?? 'unknown'}`
  // console.log(`DoxygenPage: doxygenVersion=${doxygenVersion}`)

  return (
    <div class="doxyPage">
      {children}
      <hr/>
      <p class="doxyGeneratedBy">
        Generated via <a href="https://github.com/xpack/docusaurus-plugin-doxygen">docusaurus-plugin-doxygen</a> by <a href="https://www.doxygen.nl">Doxygen</a>{doxygenVersion}.
      </p>
    </div>
  );
}

// ----------------------------------------------------------------------------
