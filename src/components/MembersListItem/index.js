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

export default function MembersListItem({
  itemLeft,
  itemRight,
  children
}) {
  return (
    <>
      <tr class="doxyMemberItem">
        <td class="doxyMemberItemLeft" align="right" valign="top">{itemLeft}</td>
        <td class="doxyMemberItemRight" align="left" valign="top">{itemRight}</td>
      </tr>
      <tr class="doxyMemberDescription">
        <td class="doxyMemberDescriptionLeft">&nbsp;</td>
        <td class="doxyMemberDescriptionRight">{children}</td>
      </tr>
      <tr class="doxyMemberSeparator">
        <td class="doxyMemSeparatorLeft" colspan="2"></td>
      </tr>
    </>
  );
}

// ----------------------------------------------------------------------------
