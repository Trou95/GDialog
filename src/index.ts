import {Dialog, DialogFlags} from "./Dialog";
import {InputType} from "./enums/InputType";
import {ButtonType} from "./components/DialogButton";
import {Box} from "./Box";


const init = () => {
    const app: HTMLElement = document.getElementById("app")
    if(!app)
        return;

    let dialogs = new Array<Dialog>();

    const dialog = Dialog.createDialog(app, "Dialog 1", {}, DialogFlags.Moveable);

    dialog.addText("Please enter your credentials");
    dialog.addInput(InputType.Text, "Username");
    dialog.addInput(InputType.Password, "Password")
    dialog.addBox()
        .addButton("Submit", ButtonType.Submit)
        .getParent<Box>()
        .addButton("Cancel", ButtonType.Cancel);


    dialog.onClose = () => {
       dialog.hide();
    }

}

init();