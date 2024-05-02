import {Dialog, DialogFlags} from "./Dialog";
import {InputType} from "./enums/InputType";
import {ButtonType} from "./components/DialogButton";


const init = () => {
    const app: HTMLElement = document.getElementById("app")
    if(!app)
        return;

    let dialogs = new Array<Dialog>();

    const dialog = Dialog.createDialog(app, "Dialog 1", {}, DialogFlags.Moveable);

    dialog.addInput(InputType.Text, "Username");
    dialog.addInput(InputType.Password, "Password")
    const el = dialog.addBox();
    //el.addButton("Submit").getParent<Box>().addButton("Cancel").getParent<Box>().addClass("g-box");


    el.onSubmit = () => {
        alert("Submit clicked");
    }
    el.addButton("Submit", ButtonType.Submit);

    el.onCancel = () => {
        alert("Cancel clicked");
    }
    el.addButton("Cancel", ButtonType.Cancel);

    dialog.onClose = () => {
       alert("Dialog closed");
       dialog.show();
    }

}

init();