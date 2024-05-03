import {DialogInput} from "./DialogInput";
import {IElementStyleInputOptions} from "../interfaces/IElementStyleInputOptions";
import {InputType} from "../enums/InputType";
import {ElementBase} from "./ElementBase";

export class DialogInputRange extends DialogInput {
    constructor(parent: HTMLElement, parentRef: ElementBase, min: number, max: number, placeholder?: string, style?: IElementStyleInputOptions) {
        super(parent, parentRef, InputType.Range, placeholder, style);
        this.ref.setAttribute("min", min.toString());
        this.ref.setAttribute("max", max.toString());
    }
}