import {ComponentBase, ComponentType} from "./ComponentBase";
import {ElementBase} from "./ElementBase";
import {IElementStyleInputOptions} from "../interfaces/IElementStyleInputOptions";
import {InputType} from "../enums/InputType";

export class DialogInput extends ComponentBase {
    constructor(parent: HTMLElement, type: InputType, style?: IElementStyleInputOptions) {
        const el = ElementBase.createHTMLElement("input", parent);
        super(el, ComponentType.Input);
        this.ref.setAttribute("type", type);

        const styleOptions = {
            color: style.color || "black",
            backgroundColor: style.backgroundColor || "white",
            fontSize: style.fontSize || "14px",
            width: style.width || "90%",
            height: style.height || "20px",
            padding: style.padding || "5px",
            margin: style.margin || "10px auto",
            border: style.border || "1px solid black",
            borderRadius: style.borderRadius || "5px",
            boxShadow: style.boxShadow || "none",
        };
        this.setStyle({
            ...styleOptions,
            display: "block",
        })
    }
}