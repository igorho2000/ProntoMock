# ProntoMock <img src='assets/logo.png' width='24' height='24'>

[ProntoMock](https://www.prontomock.com), as it's name suggests, is a rapid (pronto) online mockup application. ProntoMock (henceforth referred to as `PM`) implements the core functionalities of popular online design tools such as `Canva` and `Figma`, providing users with a `familiar yet more streamlined experience`. This is the documentation and tutorial of PM, let's jump right in!

### Table of Contents
- [Story and Motivation](#story-and-motivation)
- [Tools and Skills Utilized](#tools-and-skills-utilized)
- [Tutorial](#tutorial)
  - [User Account](#user-account)
  - [Dashboard](#dashboard)
    - [Projects](#projects)
    - [Drafts](#drafts)
  - [Editor](#editor)
    - [Elements](#elements)
    - [Select](#select)
    - [Properties Panel](#properties-panel)
    - [Actions and Shortcuts](#actions-and-shortcuts)
- [Future Development](#future-development)
- [Demo](#demo)
- [Contact](#contact)

## Story and Motivation

In July, I was working on the Google UX Design Professional Certificate. As part of the curriculum, I learned to use popular online mockup software such as Figma and Adobe XD. I thought to myself then, `“how hard would it be to code a graphics editor from scratch?”` As such, in August when I finished learning React and was looking for project ideas, creating a mockup editor kept popping into my head. 

With minimal fanfare, I began work on PM in mid-September. 1.5 months later, I’m pleased to announce that `ProntoMock v1.0 (Beta)` is complete. This version contains all basic functions expected from a mockup editor, the [complete list](#tutorial) could be found below.

This is, however, not the end of the development of PM. There are [dozens of more functions](#future-development) I aim at adding to the application to ensure PM is not only a cool project, but also a fully functional software that I myself would use on a daily basis.

## Tools and Skills Utilized
> **Fundamentals**

HTML
•	CSS
•	JavaScript
•	RWD
•	Accessibility

> **Framework and Related Libraries**

React
•	React Hooks
•	React Router
•	React Redux

> **Firebase**

Firestore Database
•	Storage
•	Authentication
•	Hosting

> **Packages**

html-to-image
•	html2canvas
•	jspdf

> **Tools**

Git & GitHub
•	npm
•	ESLint
•	Local Storage
•	Google Fonts API

## Tutorial

[ProntoMock](www.prontomock.com) <img src='assets/logo.png' width='16' height='16'> v1.0 (Beta)

### User Account

| Function | Description |
| -------- | ----------- |
| Sign Up | Click on `Sign Up` on the home page, then choose either manual account creation or sign up with Google. <br> <ul><li>**Manual Account Creation**: Enter your name, email, and password. Then, click on the blue `sign up` button.</li><li>**Sign Up with Google**: Click on the gray `sign up with Google` button. Then, choose a google account to sign up with. </li></ul> |
| Sign In | Click on `Sign In` on the home page, then choose either manual sign in or sign in with Google. <br> <ul><li>**Manual Sign In**: Enter your email, and password. Then, click on the blue `sign in` button.</li><li>**Sign In with Google**: Click on the gray `sign in with Google` button. Then, choose a google account to sign in with. </li></ul> |
| Forgot Password | Click on `Sign In` on the home page. Then, enter your account email and click on `Forgot Password`. Check your email and follow the instructions to reset your password. Finally, sign in with your new password. |
| User Settings | Click on the `round user photo` in the upper right corner of the dashboard or editor. Click on `Settings` and enter changes into the form. Click on  `Save Changes` to save settings. |
| Log Out | Click on the `round user photo` in the upper right corner of the dashboard or editor. Click on `Log Out`. |

### Dashboard

Files (drafts) in PM are stored in projects (folders). The dashboard is where users are able to access all files of their account.

#### Projects

| Function | Description |
| -------- | ----------- |
| Access Projects | Click on the `Project name` in the upper left corner, then choose a project to navigate to from the drop down menu. |
| New Project | Click on the `Project name` in the upper left corner, then click on  `New Project` in the bottom of the drop down menu. Enter a project name in the form and click on  `Create Project`. |
| Project Settings | Click on the `Gear Icon` beside the project name.<br><ul><li>**Change Project Name**: Enter the new name into the form, then click on the blue `Finish` button to save changes.</li><li>**Delete Project**: Click on the red `Delete Project` button. This action in irreversible.</li></ul> |

#### Drafts

| Function | Description |
| -------- | ----------- |
| New Draft | Click on the blue `New Draft` button in the bottom right corner (This button is unavailable in mobile devices). Enter a project name and choose a draft size from the drop down menu. Click on `Create Draft`. |
| Access Draft | Hover on a draft thumbnail and click on the `draft name` to go to the draft editor. |
| Draft Options | Hover on a draft thumbnail and click on the  `three dots icon` to access draft options.<br><ul><li>**Star/Unstar Draft**: Click on the `icon` to star or unstar drafts. Starred drafts will be listed in front of other unstarred drafts.</li><li>**Rename Draft**: Click on the `icon` and enter the new name into the form. Click on `Rename` to save changes.</li><li>**Move Draft**: Click on the `icon` and select a project to move the draft to. Click on `Move` to save changes.</li><li>**Duplicate Draft**: Click on the `icon` to duplicate the draft.</li><li>**Delete Draft**: Click on the `icon` to delete the draft. This action is irreversible.</li></ul>

### Editor

Drafts in PM can be edited in the editor. In this section, core functions of the editor as well as best practices will be shared.

#### Elements

PM v1.0 (Beta) supports four basic elements (text, square, ellipse, line) and two graphic elements (image, icon). Each element contains certain properties that can be modified via the properties panel in the right of the editor.

| Function | Description |
| -------- | ----------- |
| Add Basic Element | Locate the `Elements Panel` to the left of the editor, then click on the `text icon`, `square icon`, `ellipse icon`, or `line` icon to add that particular element to the canvas. The new element will appear in the upper left corner of the canvas. |
| Add Image | Locate the `Elements Panel` to the left of the editor, then click on the `image icon`. Drag an image file to the gray area of the `image uploader` or click on the gray area to select a file via file explorer. Click on `Add Image` to add the image to the canvas. The image will appear in the upper left corner of the canvas. Restrictions:<br><li>**File Types**: jpeg, png, and svg are supported. Other file types will be rejected.</li><li>**File Size**: Files must be smaller than 2 MB. Files that exceed this limit will be rejected.</li><ul></ul>
| Add Icon | Locate the `Elements Panel` to the left of the editor, then click on the `icon icon`. Search for an icon by entering keywords into the search bar. PM supports five types of icons: `Regular`, `Round`, `Sharp`, `Outlined`, and `Two-Toned`. Add an icon to the canvas by clicking on the desired icon, then clicking `Add Icon`. The new icon will appear in the upper left corner of the canvas.  |

> 💡 **Tip**: Elements added from the elements panel will be appended to the canvas in the element's default form. In some cases, it is more convenient to add a new element by simply duplicating an already-styled element on the canvas.

> **Note**: The color of Two-Toned icons could not be modified.

> **Note**: Text elements currently do not support differing fonts, styles, sizes, and color within the same element. A workaround is to utilize multiple text elements to create variation in your draft. Variable styles within the same text element is under development and will be released in PM v2.0.

#### Select

Elements on the canvas can only be modified if they are selected. Selected an element by simply clicking on it.

| Function | Description |
| -------- | ----------- |
| Select Element(s) | Select an element by simply clicking on it. To select multiple elements, hold down the `shift` key and select as usual. |
| Deselect Element(s) | Deselect all selected element by clicking anywhere outside the selected area. To deselect particular selected elements, hold down the `shift` key and click on an selected element to deselect it. |
| Move Element(s) | Click on any selected element and simply drag to a desired location. Alternatively, users can also manually change the location of elements via the properties panel |
| Resize Element(s) | Selected items are render with a control box that supports drag resizing.<br>Press down on the `right or bottom bars` and drag to resize only the element's width or height.<br>Press down on the `bottom right bar` and drag to resize proportionally. |

> 💡 **Tip**: Selected elements are by default rendered with a control box which prevents users from selecting other unselected elements if an selected element contains the unselected element. To select multiple elements, it is recommended that nested elements should be selected first before parent elements.

> 💡 **Tip**: If multiple elements are selected, the control box will only support proportional resizing. For other controls, utilize the properties panel.

#### Properties Panel

The properties panel contains all the options available for modification for selected elements. To change a value, simply enter or select a desired new value then press `enter` or click anywhere outside the input area to save the new value.

| Function | Description |
| -------- | ----------- |
| Color Picker | To change color settings of an element via hex, simply enter the desired color code into the input box and press `enter`.<br>To change color settings of an element via rgba, click on the `square color preview icon` to open up additional controls. |
| Document | **Change draft** settings: Size, Unit, Margin, and Fill. |
| Export | Export draft into `pdf`, `jpg`, or `png` then download. Downloads typically take around 5 seconds but may take longer if many images are used. |
| Dimensions | **Change dimension settings**: X, Y, Width, Height, Rotate, Radius. |
| Align | If only one element is selected, alignment will be based on margin guides.<br>If multiple elements are selected, alignment will be based on the first element selected.<br>**Options**: toLeft, toHorizontalCenter, toRight, toTop, toVerticalCenter, toBottom, horizontalDistribution, verticalDistribution, moveToFront, and moveToBack. |
| Text | **Change text settings**: Size, Style (Bold, Underline, Italic), Align (Left, Center, Right, Justify), Font, and Color. |
| Fill | **Change fill settings**: Color |
| Border | **Change border settings**: Style (None, Solid, Dashed, Dotted), Width, and Color. |

> 💡 **Tip**: Select `Custom` in document size to manually change the width and height of the document.

> 💡 **Tip**: Some properties support different values for each side of an element. Check the checkbox below those properties to define different values for each side. Hover over the input areas to view the side that input area controls. For example, if an input area shows a blue right border, it indicates that that input area is responsible for controlling the right side of an element.

> 💡 **Tip**: Margins are a useful tool for alignment.

#### Actions and Shortcuts

| Function | Shortcut | Description |
| -------- | -------- | ----------- |
| Save | `ctrl+s` | Saves the draft to the cloud. Users **MUST** save their drafts before exiting the editor or all changes will be discarded.<br>Saving can also be done by clicking the `save icon` below the elements panel. A `red dot` indicates that the draft hasn't been saved to the cloud. |
| Undo | `ctrl+z` | PM automatically saves a imprint of each edit **(this is different from saving to the cloud)**. Invoking undo will return the draft to it's last modified state. <br>Undoing can also be done by clicking the `undo icon` below the elements panel. Or by `right clicking` outside of selected elements and clicking `undo`. |
| Copy | `ctrl+c` | Copies all selected elements.<br>Copying can also be done by `right clicking` on selected elements and clicking `copy` |
| Cut | `ctrl+x` | Cuts all selected elements.<br>Cutting can also be done by `right clicking` on selected elements and clicking `cut` |
| Duplicate | `ctrl+d` | Duplicates all selected elements.<br>Duplicating can also be done by `right clicking` on selected elements and clicking `duplicate` |
| Delete | `delete` | Deletes all selected elements.<br>Deleting can also be done by `right clicking` on selected elements and clicking `delete` |
| Paste | `ctrl+v` | Pastes all selected elements.<br>Pasting can also be done by `right clicking` outside of selected elements and clicking `paste` |

> **Warning**: Users **MUST** press the `save icon` or `ctrl + s` to save changes to the cloud. If users leave the draft without saving, every change made will be discarded.

> **Note**: Document property changes cannot be undone. If you wish to revert changes, directly edit them in the properties panel.

## Future Development

`ProntoMock v1.0 (beta)` support all basic functions expected of a mockup editor. However, there are many more functions that could be added to the software to enhance its usefulness. Additional features in future versions of ProntoMock v2.0 may include:

**1. Sharing between Users**: Users will be able to collaborate on the same project with multiple other users.

**2. Variable Text**: Users will be able to include different fonts, sizes, alignment, and styles in the same text component

**3. Pen Tool**: Users will be able to draw free-hand lines.

**4. Enhanced Selected Control Box**: Dragging, resizing, and rotating will be smoother and more intuitive.

## Demo

PM is freely available at www.prontomock.com. Create an account to try out the software yourself. Or, use the following demo account to explore the application without signing up.

**Demo Account**: igorlifemanagement@gmail.com
**Password**: password

## Contact

I welcome all suggestions that can improve the UX/UI of PM. Feel free to drop me a message.

📫 **Email**: igorho2000@gmail.com

🌐 **Website**: www.projectonepremium.com

💼 **Hire**: https://www.fiverr.com/igorho423
