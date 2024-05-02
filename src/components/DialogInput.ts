import {ComponentBase, ComponentType} from "./ComponentBase";
import {ElementBase} from "./ElementBase";
import {IElementStyleInputOptions} from "../interfaces/IElementStyleInputOptions";
import {InputType} from "../enums/InputType";

export class DialogInput extends ComponentBase {
    constructor(parent: HTMLElement, parentRef: any, type: InputType,  placeholder?: string, style?: IElementStyleInputOptions) {
        const el = ElementBase.createHTMLElement("input", parent);
        super(el, parentRef, ComponentType.Input);

        this.ref.setAttribute("type", type);
        this.ref.setAttribute("placeholder", placeholder);

        if(style)
            this.setStyle(style);
        this.setStyle({
            display: "block"
        })
    }
}