import {ElementBase, ElementType} from "./components/ElementBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {ComponentBase} from "./components/ComponentBase";
import {InputType} from "./enums/InputType";
import {IElementStyleInputOptions} from "./interfaces/IElementStyleInputOptions";
import {DialogInput} from "./components/DialogInput";
import {DialogButton} from "./components/DialogButton";

export class Box extends ElementBase {
    protected components: Array<ComponentBase>;

    protected constructor(ref: HTMLElement, elementType: ElementType, private style: IElementStyleOptions) {
        super(ref, elementType || ElementType.Box);

        const styleOptions = style || {
            color: "black",
            backgroundColor: "white",
            fontFamily: "Arial",
            fontSize: "14px",
            fontWeight: "normal",
            width: "100%",
            height: "20px",
            padding: "5px",
        };
        this.setStyle(styleOptions);
    }

    public addInput(type: InputType, style?: IElementStyleInputOptions) : DialogInput {
        const component = new DialogInput(this.ref, type, style);
        this.addComponent(component);
        return component;
    }

    public addButton(text: string, style?: IElementStyleOptions) {
        const component = new DialogButton(this.ref, text, style);
        this.addComponent(component);
        return component;
    }

    public addBox(style?: IElementStyleOptions): Box {
        const el = ElementBase.createHTMLElement("div", this.ref);
        return new Box(el, ElementType.Box, style);
    }

    protected addComponent(component: ComponentBase) {
        this.components.push(component);
    }
}