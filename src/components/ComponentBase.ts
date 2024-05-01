import {ElementBase, ElementType} from "./ElementBase";

export enum ComponentType {
    Input = "input",
    Button = "button",
    Select = "select",
    Caption = "caption",
}

export abstract class ComponentBase extends ElementBase {
    protected constructor(ref: HTMLElement, private readonly componentType: ComponentType) {
        super(ref, ElementType.Component);
    }

    public getType(): ComponentType {
        return this.componentType;
    }

}