import {ElementBase, ElementType} from "./components/ElementBase";
import {DialogTitle} from "./components/DialogTitle";
import {TextAlign} from "./enums/TextAlign";
import {Color} from "./enums/Color";
import {ComponentBase} from "./components/ComponentBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {Box} from "./Box";



export class Dialog extends Box {
    private visible: boolean;
    private dialogTitle: DialogTitle;

    public onClose : () => void;

    protected constructor(ref: HTMLElement, parentRef: HTMLElement, title?: string, style?: IElementStyleOptions) {
        super(ref, parentRef, ElementType.Dialog, style);
        this.visible = false;

        if(style)
            this.setStyle(style);

        if(title) {
            this.dialogTitle = new DialogTitle(this.ref, this, title);
            this.dialogTitle.addClass("g-dialog-title");
        }
        this.components = new Array<ComponentBase>();
    }

    public show() {
        this.visible = true;
        super.show();
        //console.log("Dialog is visible", this.title);
    }

    public hide() {
        this.visible = false;
        super.hide();
    }

    get isVisible() {
        return this.visible;
    }

    public static createDialog(parent: HTMLElement, title?: string, style?: IElementStyleOptions) {
        const el = super.createHTMLElement("div", parent);
        const dialog = new Dialog(el, parent, title, style);
        dialog.addClass("g-dialog");
        return dialog;
    }

    public static destroyDialog(dialog: Dialog) {
        throw new Error("Not implemented");
    }



}