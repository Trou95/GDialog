import {ElementBase, ElementType} from "./components/ElementBase";
import {DialogTitle} from "./components/DialogTitle";
import {TextAlign} from "./enums/TextAlign";
import {Color} from "./enums/Color";
import {InputType} from "./enums/InputType";
import {IElementStyleInputOptions} from "./interfaces/IElementStyleInputOptions";
import {DialogInput} from "./components/DialogInput";
import {ComponentBase} from "./components/ComponentBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {Box} from "./Box";



export class Dialog extends Box {
    private isVisible: boolean;
    private dialogTitle: DialogTitle;

    protected constructor(ref: HTMLElement, title: string, style: IElementStyleOptions) {
        super(ref, ElementType.Dialog, style);
        this.isVisible = false;

        const styleOptions =  {
            color: style.color || "black",
            backgroundColor: style.backgroundColor || "white",
            fontSize: style.fontSize || "14px",
            width: style.width || "100%",
            height: style.height || "auto",
            padding: style.padding || "0",
            margin: style.margin || "auto",
            display: style.display || "block",
            border: style.border || "none",
        };
        this.setStyle(styleOptions);


        this.dialogTitle = new DialogTitle(this.ref, title, {
            padding: "5",
            backgroundColor: Color.Gray,
            color: Color.White,
            textAlign: TextAlign.Center,
        });
        this.components = new Array<ComponentBase>();
    }

    public show() {
        this.isVisible = true;
        this.ref.style.display = "block";
        console.log("Dialog is visible", this.title);
    }

    public hide() {
        this.isVisible = false;
        this.ref.style.display = "none";

    }

    get visible() {
        return this.isVisible;
    }

    get title() : DialogTitle {
        return this.dialogTitle;
    }


    public static createDialog(parent: HTMLElement, title: string, style: IElementStyleOptions) {
        const el = super.createHTMLElement("div", parent);
        return new Dialog(el, title, style);
    }

    public static destroyDialog(dialog: Dialog) {
        throw new Error("Not implemented");
    }



}