import {ElementBase, ElementType} from "./components/ElementBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {ComponentBase} from "./components/ComponentBase";
import {InputType} from "./enums/InputType";
import {IElementStyleInputOptions} from "./interfaces/IElementStyleInputOptions";
import {DialogInput} from "./components/DialogInput";
import {DialogButton} from "./components/DialogButton";

export class Box extends ElementBase {
    protected components: Array<ComponentBase>;

    protected constructor(ref: HTMLElement, parentRef: any, elementType: ElementType, private style: IElementStyleOptions) {
        super(ref, parentRef, elementType || ElementType.Box);

        if(style)
            this.setStyle(style);
    }

    public addInput(type: InputType, placeholder?: string, style?: IElementStyleInputOptions) : DialogInput {
        const component = new DialogInput(this.ref, this, type, placeholder, style);
        component.addClass("g-input");
        this.addComponent(component);
        return component;
    }

    public addButton(text: string, style?: IElementStyleOptions) {
        const component = new DialogButton(this.ref, this, text, style);
        this.addComponent(component);
        console.log("Button added", this);
        return component;
    }

    public addBox(style?: IElementStyleOptions): Box {
        const el = ElementBase.createHTMLElement("div", this.ref);
        return new Box(el, this.ref, ElementType.Box, style);
    }

    protected addComponent(component: ComponentBase) {
        //this.components.push(component);
    }
}