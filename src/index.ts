import {Dialog} from "./dialog";
import {Color} from "./enums/Color";
import {InputType} from "./enums/InputType";


const init = () => {
    const app: HTMLElement = document.getElementById("app")
    if(!app)
        return;

    let dialogs = new Array<Dialog>();

    const dialog = Dialog.createDialog(app, "Dialog 1", {
        color: "black",
        backgroundColor: Color.Orange,
        fontSize: "14px",
        width: "500px",
        height: "200px",
        borderRadius: "5px",
    });
    dialog.addInput(InputType.Text, {
        color: Color.Black,
        backgroundColor: Color.White,
    });
    dialog.addInput(InputType.Password, {
        color: Color.Black,
        backgroundColor: Color.White,
    }).addClass("g-input");
    dialog.addButton("Submit", {
        color: Color.White,
        backgroundColor: Color.Green,
    }).addClass("submit-button");
    dialog.show();
}

init();