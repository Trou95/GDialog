import {Dialog} from "./Dialog";
import {Color} from "./enums/Color";
import {InputType} from "./enums/InputType";
import {Box} from "./Box";


const init = () => {
    const app: HTMLElement = document.getElementById("app")
    if(!app)
        return;

    let dialogs = new Array<Dialog>();

    const dialog = Dialog.createDialog(app, "Dialog 1");

    dialog.addInput(InputType.Text, "Username");
    dialog.addInput(InputType.Password, "Password")
    dialog.addBox().addButton("Submit").getParent<Box>().addButton("Cancel").getParent<Box>().addClass("g-box");

}

init();