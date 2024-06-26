import {ComponentBase, ComponentType} from "./ComponentBase";
import {IElementStyleOptions} from "../interfaces/IElementStyleOptions";
import {ElementBase} from "./ElementBase";

export enum ButtonType {
    Submit = "submit",
    Cancel = "cancel",
}

export class DialogButton extends ComponentBase {
    constructor(parent: HTMLElement, parentRef: ElementBase, text: string, readonly buttonType?: ButtonType, style?: IElementStyleOptions) {
        const el = ElementBase.createHTMLElement("button", parent);
        super(el, parentRef, ComponentType.Button);
        this.ref.textContent = text;

        if(style)
            this.setStyle(style);

        this.setStyle({
            display: "block",
            cursor: "pointer",
        })

        this.addClass("g-btn")
    }
}