import {IElement} from "../interfaces/IElement";
import {Dialog} from "../dialog";
import {ComponentBase} from "./ComponentBase";

export enum ElementType {
    Dialog = "dialog",
    Box = "box",
    Component = "component",
}

export abstract class ElementBase implements IElement {
    constructor(public readonly ref: HTMLElement, private readonly elementType: ElementType ) {}

    getStyle(): CSSStyleDeclaration {
        return this.ref.style;
    }

    setStyle(style: object): CSSStyleDeclaration {
        for (const key in style) {
            this.ref.style[key] = style[key];
        }
        return this.ref.style;
    }

    addClass(className: string | string[]): ElementBase {
        this.ref.classList.add(Array.isArray(className) ? className.join(" ") : className);
        return this;
    }

    getId(): string | null {
        return this.ref.id;
    }

    setId(id: string): IElement {
        this.ref.id = id;
        return this;
    }

    getAttribute(name: string): string | null {
        return this.ref.getAttribute(name);
    }

    setAttribute(name: string, value: string): IElement {
        this.ref.setAttribute(name, value);
        return this;
    }

    getAttributes(): NamedNodeMap {
        return this.ref.attributes;
    }

    as<T extends Dialog | ComponentBase>(): T {
        if (this.elementType === ElementType.Dialog)
            return this as unknown as T;
        else if (this.elementType === ElementType.Component)
            return this as unknown as T;
        else
            throw new Error("Element type not recognized");
    }

    protected static createHTMLElement(tag: string, parent: HTMLElement) {
        const el =  document.createElement(tag);
        console.log("ElementBase.CreateElement: ", el);
        if (!el)
            throw new Error("Element not created");
        parent.appendChild(el);
        return el;
    }
}