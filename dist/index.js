(() => {
  // src/components/ElementBase.ts
  var ElementBase = class _ElementBase {
    constructor(ref, parentRef, elementType) {
      this.ref = ref;
      this.parentRef = parentRef;
      this.elementType = elementType;
      this.hash = _ElementBase.generateHash();
      this.setAttribute("hash", this.hash);
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
    getElementType() {
      return this.elementType;
    }
    hide() {
      if (this.ref.classList.contains("g-hidden"))
        return;
      this.ref.classList.add("g-hidden");
    }
    show() {
      this.ref.classList.remove("g-hidden");
    }
    getParent() {
      return this.parentRef;
    }
    as() {
      return this;
    }
    static generateHash() {
      const hashTable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?/!@#$%^&*()_+-=[]{}|;:,.<>?";
      let hash = "";
      for (let i = 0; i < 16; i++) {
        hash += hashTable[Math.floor(Math.random() * hashTable.length)];
      }
      return hash;
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
      const text = ElementBase.createHTMLElement("h1", header);
      text.classList.add("g-dialog-header");
      const closeBtn = ElementBase.createHTMLElement("button", header);
      closeBtn.classList.add("g-dialog-close-btn");
      closeBtn.innerHTML = "X";
      closeBtn.addEventListener("click", () => {
        const dialog = parentRef;
        dialog.hide();
        if (dialog.onClose)
          dialog.onClose();
      });
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
    constructor(parent, parentRef, text, buttonType, style) {
      const el = ElementBase.createHTMLElement("button", parent);
      super(el, parentRef, "button" /* Button */);
      this.buttonType = buttonType;
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
      this.components = new Array();
      if (style)
        this.setStyle(style);
    }
    addInput(type, placeholder, style) {
      const component = new DialogInput(this.ref, this, type, placeholder, style);
      component.addClass("g-input");
      this.addComponent(component);
      return component;
    }
    addButton(text, buttonType, style) {
      const component = new DialogButton(this.ref, this, text, buttonType, style);
      this.addComponent(component);
      if (buttonType === "submit" /* Submit */)
        component.ref.addEventListener("click", this.onSubmit);
      else if (buttonType === "cancel" /* Cancel */)
        component.ref.addEventListener("click", this.onCancel);
      console.log("Button added", this);
      return component;
    }
    addBox(style) {
      const el = ElementBase.createHTMLElement("div", this.ref);
      const box = new _Box(el, this, "box" /* Box */, style);
      box.addClass("g-box");
      this.addComponent(box);
      return box;
    }
    getComponents() {
      return this.components;
    }
    addComponent(component) {
      this.components.push(component);
    }
  };

  // src/Dialog.ts
  var Dialog = class _Dialog extends Box {
    constructor(ref, parentRef, title, style) {
      super(ref, parentRef, "dialog" /* Dialog */, style);
      this.visible = false;
      if (style)
        this.setStyle(style);
      if (title) {
        this.dialogTitle = new DialogTitle(this.ref, this, title);
        this.dialogTitle.addClass("g-dialog-title");
      }
      this.components = new Array();
    }
    show() {
      this.visible = true;
      super.show();
    }
    hide() {
      this.visible = false;
      super.hide();
    }
    get isVisible() {
      return this.visible;
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
    const el = dialog.addBox();
    el.onSubmit = () => {
      alert("Submit clicked");
    };
    el.addButton("Submit", "submit" /* Submit */);
    el.onCancel = () => {
      alert("Cancel clicked");
    };
    el.addButton("Cancel", "cancel" /* Cancel */);
    dialog.ref.addEventListener("click", (e) => {
      console.log("Dialog clicked", e);
    });
    dialog.onClose = () => {
      alert("Dialog closed");
      dialog.show();
    };
  };
  init();
})();
