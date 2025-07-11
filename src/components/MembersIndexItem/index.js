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

export default function MembersIndexItem({
  template,
  type,
  name,
  children
}) {
  return (
    <>
      {template &&
        <>
          <tr class="doxyMemberIndexTemplate">
            <td class="doxyMemberIndexTemplate" colspan="2"><div>{template}</div></td>
          </tr>
          <tr class="doxyMemberIndexItem">
            {type &&
              <>
                <td class="doxyMemberIndexItemTypeTemplate" align="right" valign="top">{type}</td>
                <td class="doxyMemberIndexItemNameTemplate" align="left" valign="top">{name}</td>
              </>
            }
            {!type &&
              <>
                <td class="doxyMemberIndexItemNoTypeNameTemplate" colspan="2" align="left" valign="top">{name}</td>
              </>
            }
          </tr>
        </>
      }
      {!template &&
        <>
          <tr class="doxyMemberIndexItem">
            <td class="doxyMemberIndexItemType" align="right" valign="top">{type}</td>
            <td class="doxyMemberIndexItemName" align="left" valign="top">{name}</td>
          </tr>
        </>
      }
      <tr class="doxyMemberIndexDescription">
        <td class="doxyMemberIndexDescriptionLeft"></td>
        <td class="doxyMemberIndexDescriptionRight">{children}</td>
      </tr>
      <tr class="doxyMemberIndexSeparator">
        <td class="doxyMemberIndexSeparator" colspan="2"></td>
      </tr>
    </>
  );
}

// ----------------------------------------------------------------------------
