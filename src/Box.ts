import {ElementBase, ElementType} from "./components/ElementBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {ComponentBase} from "./components/ComponentBase";
import {InputType} from "./enums/InputType";
import {IElementStyleInputOptions} from "./interfaces/IElementStyleInputOptions";
import {DialogInput} from "./components/DialogInput";
import {ButtonType, DialogButton} from "./components/DialogButton";
import {Dialog} from "./Dialog";
import {DialogText, TextBlockType} from "./components/DialogText";
import {DialogSelect} from "./components/DıalogSelect";

export class Box extends ElementBase {
    protected components: Array<ElementBase>;

    public onSubmit: () => void;
    public onCancel: () => void;

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

    public addButton(text: string, buttonType?: ButtonType, style?: IElementStyleOptions) {
        const component = new DialogButton(this.ref, this, text, buttonType,  style);
        this.addComponent(component);

        if(buttonType === ButtonType.Submit)
            component.ref.addEventListener("click", this.onSubmit);
        else if(buttonType === ButtonType.Cancel)
            component.ref.addEventListener("click", this.onCancel);

        console.log("Button added", this);
        return component;
    }

    public addBox(style?: IElementStyleOptions): Box {
        const el = ElementBase.createHTMLElement("div", this.ref);
        const box = new Box(el, this, ElementType.Box, style);
        box.addClass("g-box");
        this.addComponent(box);
        return box;
    }

    public addText(text: string, textBlockType?: TextBlockType, style?: IElementStyleOptions) {
        const el = ElementBase.createHTMLElement(textBlockType || TextBlockType.Paragraph, this.ref);
        const textComponent = new DialogText(el, this, text, textBlockType, style);
        textComponent.addClass("g-text");
        this.addComponent(textComponent);
        return textComponent;
    }

    public addSelect(options: string[], style?: IElementStyleOptions) {
        const component = new DialogSelect(this.ref, this, options, style);
        component.addClass("g-select");
        this.addComponent(component);
        return component;

    }

    public getComponents() {
        return this.components;
    }

    protected addComponent(component: ElementBase) {
        this.components.push(component);
    }
}