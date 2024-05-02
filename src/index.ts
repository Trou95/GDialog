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


    dialog.getComponents().forEach(c => {
        if(c.getElementType() == ElementType.Box) {
          const box = c as Box;
          const btn = box.getComponents()[0].ref.onclick = () => {
                console.log("Button clicked");
          }
        }
    });

}

init();