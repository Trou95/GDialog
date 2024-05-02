(() => {
  // src/components/ElementBase.ts
  var ElementBase = class {
    constructor(ref, parentRef, elementType) {
      this.ref = ref;
      this.parentRef = parentRef;
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
    getParent() {
      return this.parentRef;
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
    constructor(ref, parentRef, componentType) {
      super(ref, parentRef, "component" /* Component */);
      this.componentType = componentType;
    }
    getType() {
      return this.componentType;
    }
  };

  // src/components/DialogTitle.ts
  var DialogTitle = class extends ComponentBase {
    constructor(parent, parentRef, title, style) {
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
      super(header, parentRef, "caption" /* Caption */);
      if (style)
        this.setStyle(style);
      this.setStyle({
        userSelect: "none"
      });
    }
  };

  // src/components/DialogInput.ts
  var DialogInput = class extends ComponentBase {
    constructor(parent, parentRef, type, placeholder, style) {
      const el = ElementBase.createHTMLElement("input", parent);
      super(el, parentRef, "input" /* Input */);
      this.ref.setAttribute("type", type);
      this.ref.setAttribute("placeholder", placeholder);
      if (style)
        this.setStyle(style);
      this.setStyle({
        display: "block"
      });
    }
  };

  // src/components/DialogButton.ts
  var DialogButton = class extends ComponentBase {
    constructor(parent, parentRef, text, style) {
      const el = ElementBase.createHTMLElement("button", parent);
      super(el, parentRef, "button" /* Button */);
      this.ref.textContent = text;
      if (style)
        this.setStyle(style);
      this.setStyle({
        display: "block",
        cursor: "pointer"
      });
      this.addClass("g-btn");
    }
  };

  // src/Box.ts
  var Box = class _Box extends ElementBase {
    constructor(ref, parentRef, elementType, style) {
      super(ref, parentRef, elementType || "box" /* Box */);
      this.style = style;
      if (style)
        this.setStyle(style);
    }
    addInput(type, placeholder, style) {
      const component = new DialogInput(this.ref, this, type, placeholder, style);
      component.addClass("g-input");
      this.addComponent(component);
      return component;
    }
    addButton(text, style) {
      const component = new DialogButton(this.ref, this, text, style);
      this.addComponent(component);
      console.log("Button added", this);
      return component;
    }
    addBox(style) {
      const el = ElementBase.createHTMLElement("div", this.ref);
      return new _Box(el, this.ref, "box" /* Box */, style);
    }
    addComponent(component) {
    }
  };

  // src/Dialog.ts
  var Dialog = class _Dialog extends Box {
    constructor(ref, parentRef, title, style) {
      super(ref, parentRef, "dialog" /* Dialog */, style);
      this.isVisible = false;
      if (style)
        this.setStyle(style);
      this.dialogTitle = new DialogTitle(this.ref, this, title, {
        padding: "5",
        backgroundColor: "gray" /* Gray */,
        color: "white" /* White */,
        textAlign: "center" /* Center */
      });
      this.components = new Array();
    }
    show() {
      this.isVisible = true;
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
      const dialog = new _Dialog(el, parent, title, style);
      dialog.addClass("g-dialog");
      return dialog;
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
    const dialog = Dialog.createDialog(app, "Dialog 1");
    dialog.addInput("text" /* Text */, "Username");
    dialog.addInput("password" /* Password */, "Password");
    dialog.addBox().addButton("Submit").getParent().addButton("Cancel").getParent().addClass("g-box");
    dialog.show();
  };
  init();
})();
