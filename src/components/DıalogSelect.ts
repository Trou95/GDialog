import {ComponentBase, ComponentType} from "./ComponentBase";
import {ElementBase} from "./ElementBase";
import {IElementStyleOptions} from "../interfaces/IElementStyleOptions";


export class DialogSelect extends ComponentBase {
    constructor(parent: HTMLElement, parentRef: ElementBase, options: string[], style?: IElementStyleOptions) {
        const el = ElementBase.createHTMLElement("select", parent);
        super(el, parentRef, ComponentType.Select);

        options.forEach((option) => {
            const opt = ElementBase.createHTMLElement("option", el);
            opt.textContent = option;
            opt.setAttribute("value", option);
        });

        if(style)
            this.setStyle(style);
        this.setStyle({
            display: "block"
        })
    }
}