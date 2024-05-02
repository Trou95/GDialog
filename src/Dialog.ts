import {ElementBase, ElementType} from "./components/ElementBase";
import {DialogTitle} from "./components/DialogTitle";
import {TextAlign} from "./enums/TextAlign";
import {Color} from "./enums/Color";
import {ComponentBase} from "./components/ComponentBase";
import {IElementStyleOptions} from "./interfaces/IElementStyleOptions";
import {Box} from "./Box";

export enum DialogFlags {
    None = 0,
    Moveable = 1,
}

export class Dialog extends Box {
    private visible: boolean;
    private dialogTitle: DialogTitle;
    private isMoving: boolean;

    public onClose : () => void;

    protected constructor(ref: HTMLElement, parentRef: HTMLElement, title?: string, style?: IElementStyleOptions, flags?: DialogFlags) {
        super(ref, parentRef, ElementType.Dialog, style);
        this.visible = false;

        if(style)
            this.setStyle(style);

        if(title) {
            this.dialogTitle = new DialogTitle(this.ref, this, title);
            this.dialogTitle.addClass("g-dialog-title");

            if(flags & DialogFlags.Moveable) {
                this.isMoving = false;
                this.setStyle({
                    position: "absolute",
                })
                this.dialogTitle.ref.addEventListener("mousedown", (e) => {
                    this.isMoving = true;
                    const rect = this.ref.getBoundingClientRect();
                    const offsetX = e.clientX - rect.left;
                    const offsetY = e.clientY - rect.top;

                    const move = (e: MouseEvent) => {
                        if(this.isMoving) {
                            this.setStyle({
                                left: e.clientX - offsetX + "px",
                                top: e.clientY - offsetY + "px",
                            })
                        }
                    }
                    const stop = () => {
                        this.isMoving = false;
                        parentRef.removeEventListener("mousemove", move);
                        parentRef.removeEventListener("mouseup", stop);
                    }

                    parentRef.addEventListener("mousemove", move)
                    parentRef.addEventListener("mouseup", stop);
                });
            }

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

    public static createDialog(parent: HTMLElement, title?: string, style?: IElementStyleOptions, flags?: DialogFlags) {
        const el = super.createHTMLElement("div", parent);
        const dialog = new Dialog(el, parent, title, style, flags);
        dialog.addClass("g-dialog");
        return dialog;
    }

    public static destroyDialog(dialog: Dialog) {
        throw new Error("Not implemented");
    }



}