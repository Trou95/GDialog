GDialog is a straightforward JavaScript dialog editor designed for FiveM and RageMP servers. With GDialog, you can create user interfaces using JavaScript without the need to create HTML pages for each interaction menu. 
However, please note that it is still under development.

Here is a preview video:


https://github.com/Trou95/GDialog/assets/72773406/7bedaac2-ff8e-4f33-a642-211d0f40502c


# **Examples:**

**Creating a dialog**

```
const dialog = Dialog.createDialog(app, "My First Dialog");
```

The **createDialog** function takes four parameters, three of which are optional. These parameters are as follows:
* **parent**: Reference to the HTML element where the dialog will be placed.
* **title**: Text to be displayed in the title section of the dialog. (Please note that if this text is not specified, you will need to manually add the closing functionality.)
* **style**: Style parameters. (Uses the default style if not specified. See default.css)
* **flags**: Customization flags for the dialog.



## Adding components to our dialog

### Text Component

```
dialog.addText("Hello, World!");
```

The addText function allows us to add a message to our dialog. It also has both required and optional parameters:

* **text**: The message to be displayed.
* **textBlockType**: The type of HTML element where the message will be displayed. (Optional; defaults to < p > if not specified)
* **style**: Style settings.


### Input Component

```
dialog.addInput(InputType.Text, "Username");
```

The addInput function takes three parameters, two of which are optional:

* **type**: The type of input field to be communicated to HTML. Some types are predefined for future use: Text, Password, Number, and Email.
* **placeholder**: The placeholder text to be displayed in the input field.
* **style**: And once again, our style settings (if needed).


### Button Component

```
dialog.addButton("Submit", ButtonType.Submit)
```

The addButton function takes a total of three parameters, with one required and two optional:

* **text**: The text to be displayed inside the button.
* **buttonType**: This parameter is divided into two categories: Submit and Cancel. While specifying this parameter is not mandatory, it facilitates capturing dialog events.
* **style**: Style settings.

### Box Component

```
dialog.addBox()
```

The addBox function, as you can see in the example, has a simple yet very functional usage. The Box Component is used for grouping elements and takes only one optional parameter, which is the frequently encountered style. 

We'll discuss styling our dialogs shortly, but for now, let's create a simple example now that we've learned all the components.


```
const dialog = Dialog.createDialog(app, "My First Dialog");

dialog.addText("Whats your favorite color?");
dialog.addInput(InputType.Text, "Type here");
dialog.addButton("Submit", ButtonType.Submit);
 ```

Our component should look like this;
![gdialog](https://github.com/Trou95/GDialog/assets/72773406/e4aabb7d-d356-4504-b397-d9e7d5516585)



## Styling our elements


Now, let's discuss customizing and styling our dialogs. We have two options for this.

Firstly, you remember the optional style parameter that appears in every function, right? With this parameter, we can customize all our elements. However, since this feature applies styling inline, it is not recommended. Nevertheless, let's take a look at its usage.

Let's try giving style to our Text Component from the previous example.

```
dialog.addText("Whats your favorite color?", TextBlockType.Paragraph, {color: Color.Green});
```

in the above example, we styled it during creation, but since our function takes 3 parameters, we also had to specify the TextBlockType parameter. In such cases, we can apply styling later.


```
dialog.addText("Whats your favorite color?").setStyle({color: Color.Green});
```

But as mentioned earlier, styling inline is not recommended; instead, it's better to use our own CSS classes. Now let's redo the previous action but with the addition of a class. First, we create a CSS file named custom.css and apply the same styling as before:

```
//custom.css
.my-custom-text {
    color: 'green';
}
```

Now let's apply this to our Text Component:

```
dialog.addText("Whats your favorite color?").addClass("my-custom-text")
```

## Listenig dialog events

Listening to dialog events is one of the most crucial aspects. Let's learn how to do it now.

As I mentioned earlier, specifying the ButtonType when creating a button makes this task easier. For example, in the addButton function from our previous example, adding the following line right after it would be sufficient:

```
dialog.onSubmit = () => dialog.hide(); // Added this line
dialog.addButton("Submit", ButtonType.Submit);"
```

However, in cases where we don't use this feature and want to listen to events from other components, we currently need to manually add the event listener to the HTML element using the ref property. Unfortunately, there is no support for this at the moment.
