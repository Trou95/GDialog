import {ComponentBase, ComponentType} from "./ComponentBase";
import {IElementStyleOptions} from "../interfaces/IElementStyleOptions";
import {ElementBase} from "./ElementBase";

export class DialogButton extends ComponentBase {
    constructor(parent: HTMLElement, text: string, style?: IElementStyleOptions) {
        const el = ElementBase.createHTMLElement("button", parent);
        super(el, ComponentType.Button);
        this.ref.textContent = text;

        const styleOptions = {
            color: style.color || "black",
            backgroundColor: style.backgroundColor || "white",
            fontSize: style.fontSize || "14px",
            width: style.width || "auto",
            height: style.height || "auto",
            padding: style.padding || "5px",
            margin: style.margin || "10px auto",
            border: style.border || "1px solid black",
            borderRadius: style.borderRadius || "5px",
            boxShadow: style.boxShadow || "none",
        };
        this.setStyle({
            ...styleOptions,
            display: "block",
            cursor: "pointer",
        })
    }
}