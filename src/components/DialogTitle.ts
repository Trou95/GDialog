import {ComponentBase, ComponentType} from "./ComponentBase";
import {ElementBase} from "./ElementBase";
import {IElementStyleOptions} from "../interfaces/IElementStyleOptions";


export class DialogTitle extends ComponentBase {
    constructor(parent: HTMLElement, parentRef: any, title: string, style?: IElementStyleOptions) {
        const header = ElementBase.createHTMLElement("div", parent);

        header.style.width = "100%";
        header.style.height = "20px";
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";
        header.style.height = style.height || "fit-content";

        const text = ElementBase.createHTMLElement("h1", header);
        text.style.justifySelf = "flex-start";
        text.style.fontSize = style.fontSize || "14px";
        text.style.paddingLeft = "5px";

        const closeBtn = ElementBase.createHTMLElement("button", header);
        closeBtn.innerHTML = "X";
        closeBtn.style.color = style.color || "white";
        closeBtn.style.backgroundColor = "transparent";
        closeBtn.style.fontSize = style.fontSize || "14px";
        closeBtn.style.border = "none";
        closeBtn.style.cursor = "pointer";
        closeBtn.classList.add("g-close-btn");

        text.innerHTML = title;
        super(header, parentRef, ComponentType.Caption);

        if(style)
            this.setStyle(style);
        this.setStyle({
            userSelect: "none",
        })
    }
}