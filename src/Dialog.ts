import {ElementType} from "./components/ElementBase";
import {DialogTitle} from "./components/DialogTitle";
import {TextAlign} from "./enums/TextAlign";
import {Color} from "./enums/Color";
import {ComponentBase} from "./components/ComponentBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {Box} from "./Box";



export class Dialog extends Box {
    private isVisible: boolean;
    private dialogTitle: DialogTitle;

    protected constructor(ref: HTMLElement, parentRef: any, title: string, style: IElementStyleOptions) {
        super(ref, parentRef, ElementType.Dialog, style);
        this.isVisible = false;

        if(style)
            this.setStyle(style);

        this.dialogTitle = new DialogTitle(this.ref, this, title, {
            padding: "5",
            backgroundColor: Color.Gray,
            color: Color.White,
            textAlign: TextAlign.Center,
        });
        this.components = new Array<ComponentBase>();
    }

    public show() {
        this.isVisible = true;
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


    public static createDialog(parent: HTMLElement, title: string, style?: IElementStyleOptions) {
        const el = super.createHTMLElement("div", parent);
        const dialog = new Dialog(el, parent, title, style);
        dialog.addClass("g-dialog");
        return dialog;
    }

    public static destroyDialog(dialog: Dialog) {
        throw new Error("Not implemented");
    }



}