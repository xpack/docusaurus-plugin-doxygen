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
import Link from '@docusaurus/Link'

// ----------------------------------------------------------------------------

export default function ParametersListItem({
  name,
  children
}) {
  return (
    <tr class={styles.paramItem}>
      <td class={styles.paramItemName}>{name}</td>
      <td class={styles.paramItemDescription}>{children}</td>
    </tr>
  );
}

// ----------------------------------------------------------------------------
