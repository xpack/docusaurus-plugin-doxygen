import { ElementLinesRendererBase, ElementTextRendererBase } from './element-renderer-base.js';
import { AbstractDescriptionType, AbstractDocAnchorType, AbstractDocEmptyType, AbstractDocFormulaType, AbstractDocImageType, AbstractDocMarkupType, AbstractDocParamListType, AbstractDocParaType, AbstractDocRefTextType, AbstractDocSimpleSectType, AbstractDocURLLink, AbstractSpType, AbstractVerbatimType } from '../../data-model/compounds/descriptiontype-dm.js';
export declare class DescriptionTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDescriptionType): string;
}
export declare class DocParaTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocParaType): string;
}
export declare class DocURLLinkTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocURLLink): string;
}
export declare class DocMarkupTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocMarkupType): string;
}
export declare class DocRefTextTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocRefTextType): string;
}
export declare class DocSimpleSectTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocSimpleSectType): string;
}
export declare class SpTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractSpType): string;
}
export declare class DocEmptyTypeLinesRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocEmptyType): string;
}
export declare class DocParamListTypeTextRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocParamListType): string;
}
export declare class DocAnchorTypeLinesRenderer extends ElementLinesRendererBase {
    renderToMdxLines(element: AbstractDocAnchorType): string[];
}
export declare class VerbatimRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractVerbatimType): string;
}
export declare class FormulaRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocFormulaType): string;
}
export declare class ImageRenderer extends ElementTextRendererBase {
    renderToMdxText(element: AbstractDocImageType): string;
}
