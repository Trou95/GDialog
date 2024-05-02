import {IElement} from "../interfaces/IElement";
import {Dialog} from "../Dialog";
import {ComponentBase} from "./ComponentBase";
import {Box} from "../Box";

export enum ElementType {
    Dialog = "dialog",
    Box = "box",
    Component = "component",
}

export abstract class ElementBase implements IElement {
    public hash: string;

    protected constructor(public readonly ref: HTMLElement, protected readonly parentRef: ElementBase | HTMLElement, private readonly elementType: ElementType) {
        this.hash = ElementBase.generateHash();
        this.setAttribute("hash", this.hash);
    }

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

    getElementType(): ElementType {
        return this.elementType;
    }

    hide() : void {
        if(this.ref.classList.contains("g-hidden"))
            return;
        this.ref.classList.add("g-hidden");
    }

    show() : void {
        this.ref.classList.remove("g-hidden");
    }

    getParent<T extends ElementBase>(): T {
        return this.parentRef as unknown as T;
    }

    as<T extends Dialog | Box | ComponentBase>(): T {
        return this as unknown as T;
    }

    public static generateHash(): string {
        const hashTable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?/!@#$%^&*()_+-=[]{}|;:,.<>?";
        let hash = "";
        for (let i = 0; i < 16; i++) {
            hash += hashTable[Math.floor(Math.random() * hashTable.length)];
        }
        return hash;
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