(() => {
  // src/components/ElementBase.ts
  var ElementBase = class {
    constructor(ref, elementType) {
      this.ref = ref;
      this.elementType = elementType;
    }
    getStyle() {
      return this.ref.style;
    }
    setStyle(style) {
      for (const key in style) {
        this.ref.style[key] = style[key];
      }
      return this.ref.style;
    }
    addClass(className) {
      this.ref.classList.add(Array.isArray(className) ? className.join(" ") : className);
      return this;
    }
    getId() {
      return this.ref.id;
    }
    setId(id) {
      this.ref.id = id;
      return this;
    }
    getAttribute(name) {
      return this.ref.getAttribute(name);
    }
    setAttribute(name, value) {
      this.ref.setAttribute(name, value);
      return this;
    }
    getAttributes() {
      return this.ref.attributes;
    }
    as() {
      if (this.elementType === "dialog" /* Dialog */)
        return this;
      else if (this.elementType === "component" /* Component */)
        return this;
      else
        throw new Error("Element type not recognized");
    }
    static createHTMLElement(tag, parent) {
      const el = document.createElement(tag);
      console.log("ElementBase.CreateElement: ", el);
      if (!el)
        throw new Error("Element not created");
      parent.appendChild(el);
      return el;
    }
  };

  // src/components/ComponentBase.ts
  var ComponentBase = class extends ElementBase {
    constructor(ref, componentType) {
      super(ref, "component" /* Component */);
      this.componentType = componentType;
    }
    getType() {
      return this.componentType;
    }
  };

  // src/components/DialogTitle.ts
  var DialogTitle = class extends ComponentBase {
    constructor(parent, title, style) {
      const header = ElementBase.createHTMLElement("div", parent);
      header.style.width = "100%";
      header.style.height = "20px";
      header.style.display = "flex";
      header.style.justifyContent = "space-between";
      header.style.alignItems = "center";
      header.style.height = style.height || "fit-content";
      const text = ElementBase.createHTMLElement("h1", header);
      text.style.justifySelf = "flex-start";
      text.style.fontSize = style.fontSize || "14px";
      text.style.paddingLeft = "5px";
      const closeBtn = ElementBase.createHTMLElement("button", header);
      closeBtn.innerHTML = "X";
      closeBtn.style.color = style.color || "white";
      closeBtn.style.backgroundColor = "transparent";
      closeBtn.style.fontSize = style.fontSize || "14px";
      closeBtn.style.border = "none";
      closeBtn.style.cursor = "pointer";
      closeBtn.classList.add("g-close-btn");
      text.innerHTML = title;
      super(header, "caption" /* Caption */);
      const styleOptions = style || {
        color: "white",
        backgroundColor: "black",
        fontFamily: "Arial",
        fontSize: "14px",
        fontWeight: "normal",
        width: "100%",
        height: "20px",
        padding: "0"
      };
      this.setStyle({
        ...styleOptions,
        "userSelect": "none"
      });
    }
  };

  // src/components/DialogInput.ts
  var DialogInput = class extends ComponentBase {
    constructor(parent, type, style) {
      const el = ElementBase.createHTMLElement("input", parent);
      super(el, "input" /* Input */);
      this.ref.setAttribute("type", type);
      const styleOptions = {
        color: style.color || "black",
        backgroundColor: style.backgroundColor || "white",
        fontSize: style.fontSize || "14px",
        width: style.width || "90%",
        height: style.height || "20px",
        padding: style.padding || "5px",
        margin: style.margin || "10px auto",
        border: style.border || "1px solid black",
        borderRadius: style.borderRadius || "5px",
        boxShadow: style.boxShadow || "none"
      };
      this.setStyle({
        ...styleOptions,
        display: "block"
      });
    }
  };

  // src/components/DialogButton.ts
  var DialogButton = class extends ComponentBase {
    constructor(parent, text, style) {
      const el = ElementBase.createHTMLElement("button", parent);
      super(el, "button" /* Button */);
      this.ref.textContent = text;
      const styleOptions = {
        color: style.color || "black",
        backgroundColor: style.backgroundColor || "white",
        fontSize: style.fontSize || "14px",
        width: style.width || "auto",
        height: style.height || "auto",
        padding: style.padding || "5px",
        margin: style.margin || "10px auto",
        border: style.border || "1px solid black",
        borderRadius: style.borderRadius || "5px",
        boxShadow: style.boxShadow || "none"
      };
      this.setStyle({
        ...styleOptions,
        display: "block",
        cursor: "pointer"
      });
    }
  };

  // src/Box.ts
  var Box = class _Box extends ElementBase {
    constructor(ref, elementType, style) {
      super(ref, elementType || "box" /* Box */);
      this.style = style;
      const styleOptions = style || {
        color: "black",
        backgroundColor: "white",
        fontFamily: "Arial",
        fontSize: "14px",
        fontWeight: "normal",
        width: "100%",
        height: "20px",
        padding: "5px"
      };
      this.setStyle(styleOptions);
    }
    addInput(type, style) {
      const component = new DialogInput(this.ref, type, style);
      this.addComponent(component);
      return component;
    }
    addButton(text, style) {
      const component = new DialogButton(this.ref, text, style);
      this.addComponent(component);
      return component;
    }
    addBox(style) {
      const el = ElementBase.createHTMLElement("div", this.ref);
      return new _Box(el, "box" /* Box */, style);
    }
    addComponent(component) {
      this.components.push(component);
    }
  };

  // src/dialog.ts
  var Dialog = class _Dialog extends Box {
    constructor(ref, title, style) {
      super(ref, "dialog" /* Dialog */, style);
      this.isVisible = false;
      const styleOptions = {
        color: style.color || "black",
        backgroundColor: style.backgroundColor || "white",
        fontSize: style.fontSize || "14px",
        width: style.width || "100%",
        height: style.height || "auto",
        padding: style.padding || "0",
        margin: style.margin || "auto",
        display: style.display || "block",
        border: style.border || "none"
      };
      this.setStyle(styleOptions);
      this.dialogTitle = new DialogTitle(this.ref, title, {
        padding: "5",
        backgroundColor: "gray" /* Gray */,
        color: "white" /* White */,
        textAlign: "center" /* Center */
      });
      this.components = new Array();
    }
    show() {
      this.isVisible = true;
      this.ref.style.display = "block";
      console.log("Dialog is visible", this.title);
    }
    hide() {
      this.isVisible = false;
      this.ref.style.display = "none";
    }
    get visible() {
      return this.isVisible;
    }
    get title() {
      return this.dialogTitle;
    }
    static createDialog(parent, title, style) {
      const el = super.createHTMLElement("div", parent);
      return new _Dialog(el, title, style);
    }
    static destroyDialog(dialog) {
      throw new Error("Not implemented");
    }
  };

  // src/index.ts
  var init = () => {
    const app = document.getElementById("app");
    if (!app)
      return;
    let dialogs = new Array();
    const dialog = Dialog.createDialog(app, "Dialog 1", {
      color: "black",
      backgroundColor: "orange" /* Orange */,
      fontSize: "14px",
      width: "500px",
      height: "200px",
      borderRadius: "5px"
    });
    dialog.addInput("text" /* Text */, {
      color: "black" /* Black */,
      backgroundColor: "white" /* White */
    });
    dialog.addInput("password" /* Password */, {
      color: "black" /* Black */,
      backgroundColor: "white" /* White */
    }).addClass("g-input");
    dialog.addButton("Submit", {
      color: "white" /* White */,
      backgroundColor: "green" /* Green */
    }).addClass("submit-button");
    dialog.show();
  };
  init();
})();
