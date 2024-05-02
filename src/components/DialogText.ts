import {ComponentBase, ComponentType} from "./ComponentBase";
import {ElementBase} from "./ElementBase";
import {IElementStyleOptions} from "../interfaces/IElementStyleOptions";

export enum TextBlockType {
    Paragraph = "p",
    Span = "span"
}

export class DialogText extends ComponentBase {
    constructor(parent: HTMLElement, parentRef: ElementBase, text: string, textBlockType: TextBlockType, style?: IElementStyleOptions) {
        super(parent, parentRef, ComponentType.Text);

        this.ref.innerText = text;

        if(style)
            this.setStyle(style);
        this.setStyle({
            display: "block"
        })
    }
}