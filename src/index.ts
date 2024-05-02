import {Dialog} from "./Dialog";
import {InputType} from "./enums/InputType";
import {Box} from "./Box";
import {ElementType} from "./components/ElementBase";
import {ComponentBase} from "./components/ComponentBase";


const init = () => {
    const app: HTMLElement = document.getElementById("app")
    if(!app)
        return;

    let dialogs = new Array<Dialog>();

    const dialog = Dialog.createDialog(app, "Dialog 1");

    dialog.addInput(InputType.Text, "Username");
    dialog.addInput(InputType.Password, "Password")
    const el = dialog.addBox();
    el.addButton("Submit").getParent<Box>().addButton("Cancel").getParent<Box>().addClass("g-box");


    dialog.ref.addEventListener("click", (e) => {
        console.log("Dialog clicked", e);
    });

    dialog.onClose = () => {
        setInterval(() => {
            dialog.show();
        }, 1000);
    }

}

init();