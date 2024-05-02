import {ElementBase, ElementType} from "./components/ElementBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {ComponentBase} from "./components/ComponentBase";
import {InputType} from "./enums/InputType";
import {IElementStyleInputOptions} from "./interfaces/IElementStyleInputOptions";
import {DialogInput} from "./components/DialogInput";
import {DialogButton} from "./components/DialogButton";
import {Dialog} from "./Dialog";

export class Box extends ElementBase {
    protected components: Array<ElementBase>;

    protected constructor(ref: HTMLElement, parentRef: ElementBase | HTMLElement, elementType: ElementType, private style: IElementStyleOptions) {
        super(ref, parentRef, elementType || ElementType.Box);

        this.components = new Array<ComponentBase>();

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
        const box = new Box(el, this, ElementType.Box, style);
        this.addComponent(box);
        return box;
    }

    public getComponents() {
        return this.components;
    }

    protected addComponent(component: ElementBase) {
        this.components.push(component);
    }
}