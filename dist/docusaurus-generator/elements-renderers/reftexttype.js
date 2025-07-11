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
import { ElementTextRendererBase } from './element-renderer-base.js';
import { escapeMdx } from '../utils.js';
// ----------------------------------------------------------------------------
export class RefTextTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element) {
        // console.log(util.inspect(element, { compact: false, depth: 999 }))
        if (element.external !== undefined) {
            console.error(element.elementName, 'attribute external not yet rendered in', this.constructor.name);
        }
        if (element.tooltip !== undefined) {
            console.error(element.elementName, 'attribute tooltip not yet rendered in', this.constructor.name);
        }
        let text = '';
        const permalink = this.workspace.getPermalink({
            refid: element.refid,
            kindref: element.kindref
        });
        if (permalink !== undefined && permalink.length > 0) {
            text += `<a href="${permalink}">${escapeMdx(element.text.trim())}</a>`;
        }
        else {
            text += `${escapeMdx(element.text.trim())}`;
        }
        return text;
    }
}
// ----------------------------------------------------------------------------
//# sourceMappingURL=reftexttype.js.map