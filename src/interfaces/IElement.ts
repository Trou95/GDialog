import {Dialog} from "../Dialog";
import {ComponentBase} from "../components/ComponentBase";

export interface IElement {
    readonly ref: HTMLElement;

    getStyle(): CSSStyleDeclaration;
    setStyle(style: object): CSSStyleDeclaration;
    addClass(className: string | string[]): IElement;
    getAttribute(name: string): string | null;
    setAttribute(name: string, value: string): IElement;
    getAttributes(): NamedNodeMap;
    as<T extends Dialog | ComponentBase>(): T;
}