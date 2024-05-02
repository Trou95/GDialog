import {ComponentBase, ComponentType} from "./ComponentBase";
import {ElementBase} from "./ElementBase";
import {IElementStyleOptions} from "../interfaces/IElementStyleOptions";


export class DialogTitle extends ComponentBase {
    constructor(parent: HTMLElement, parentRef: any, title: string, style?: IElementStyleOptions) {
        const header = ElementBase.createHTMLElement("div", parent);


        const text = ElementBase.createHTMLElement("h1", header);
        text.classList.add("g-dialog-header");


        const closeBtn = ElementBase.createHTMLElement("button", header);
        closeBtn.classList.add("g-dialog-close-btn");
        closeBtn.innerHTML = "X";

        text.innerHTML = title;
        super(header, parentRef, ComponentType.Caption);

        if(style)
            this.setStyle(style);
        this.setStyle({
            userSelect: "none",
        })
    }
}