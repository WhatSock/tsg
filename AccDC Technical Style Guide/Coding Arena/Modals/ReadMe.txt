Modals

A Modal is a relatively simple control type, and can easily be made accessible.

Expected behaviors: Ensure that the background content is hidden from screen reader users, ensure that the beginning and ending boundaries are conveyed to screen reader users, make sure the modal can be closed from the keyboard, and ensure that circular tabbing confines keyboard focus within the modal content.

The Modal Module automates these processes by instantiating the content as a Modal AccDC Object, which can be configured and controlled programmatically if desired to enhance functionality.

HTML Syntax

For the triggering element:

<a href="#" id="modalTrigger"> Triggering Element </a>

(A triggering element is not actually required)

For the modal container element:

<div id="modalContainerId">
Modal content goes here.
</div>

Required HTML5 attributes for the modal container element:

• data-first="true" : Must be added to the first focusable active element within the modal to control circular tabbing and shift+tabbing.
• data-last="true" : Must be added to the last focusable active element within the modal to control circular tabbing and shift+tabbing.

Also, when Implementing a Close link or button, the className must match the "closeClassName" property within the JavaScript invocation statement.
(If not explicitly set, the default value "lbClose" will be set by default, and should be used for all Close links or buttons)
Doing so will automatically bind the AccDC Close Methods with this element, and return keyboard focus properly when the AccDC Object is closed.

The following attributes are handled automatically by the Modal Module:

• aria-hidden

JavaScript invocation statement syntax:

var modalId = $A.setModal({
// Configure functionality key / value mappings
});

Parameters

The first parameter configures modal functionality using a key / value map.

Example:

{

// Set a unique ID for the modal AccDC Object, which can be referenced through $A.reg['uniqueId']
id: 'uniqueId',

// Set the screen reader accessible boundary text values
role: 'Modal',

// Set a triggering element using either the DOM node or a CSS Selector
// (Only if a triggering element is present, remove otherwise)
trigger: '#modalTrigger',

// Prevent focus from returning to a triggering element
// (Only if a triggering element is not present, remove otherwise)
returnFocus: false,

// Specify that literal content is to be rendered
// (Only if pulling content from within the same page, remove otherwise)
mode: 0,

// Use removeChild to grab the desired modal content from within the document
// This is important to prevent ID attribute conflicts later
// (Only if pulling content from within the same page, remove otherwise)
source: $A.getEl('modalContainerId').parentNode.removeChild($A.getEl('modalContainerId')),

// Specify the file path and ID attribute of the modal container element
// (Only if pulling content from an external page, remove otherwise)
source: 'files/modal.html #modalContainerId',

// Set the class name for the top level container element
className: 'modal',

// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the modal content, which will cause Close Method Binding to automatically occur when the content is rendered.
closeClassName: 'lbClose',

// Enable the ARIA modal dialog design pattern as documented at
// http://whatsock.com/training/matrices/#dialog
ariaDialog: false,

// Enable role=alert to announce the Dialog content no matter which window is currently active.
alertDialog: false,

// Run script after the Modal AccDC Object finishes loading
runAfter: function(dc){

// 'dc' is the Modal AccDC Object

// Set a background Div for the modal, so it will appear as a lightbox
dc.backdrop = $A.createEl('div', null, null, 'modalBackdrop', document.createTextNode(' '));
// Now insert the backdrop Div before the Modal AccDC Object top level container
dc.accDCObj.parentNode.insertBefore(dc.backdrop, dc.accDCObj);

// Now configure content bindings within the modal
// dc.containerDiv is the DOM node where the newly rendered modal content is contained

// All other AccDC API properties and methods are similarly available for the 'dc' object

},

// Run script after the Modal AccDC Object finishes closing
runAfterClose: function(dc){
// Remove the backdrop Div
if (dc.backdrop)
dc.backdrop.parentNode.removeChild(dc.backdrop);
}

// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)

}

Programmatic Control

Every modal is registered as an AccDC Object, the ID of which is returned by the JavaScript invocation statement.

This means that you can programmatically control each modal using JavaScript.

Example:

// Get a reference to the Modal AccDC Object using the ID  stored in the modalId variable

var dc = $A.reg[modalId];

// Now invoke the modal

dc.open();

// Or close the modal

dc.close();

// All other AccDC API properties and methods can be applied here as well.

Triggering Element Requirements

A triggering element for a modal is not required, but when one is present, you should always use an active element for this purpose to ensure accessibility for both screen reader and keyboard only users.

Within the Coding Arena samples, these are standard links (A tags with an Href attribute). However, you can use whatever type of triggering element you wish, a standard link, button, or image link, with any type of styling.

Styling

The sample modals in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the modal. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled modal will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The modals within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accModal", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the modal container element.
If set, data-internal should be blank or not included. 
• data-internal : The ID attribute of the modal container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the new content. "Modal" is set by default if no value is specified.    

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes for the triggering element:

• class="accModal" : The bootstrap class name that specifies an accessible modal.  
• id : The unique ID of the element. This value is also registered as the ID of the modal AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.        

Implementation Notes

Do not use aria-haspopup.

It might sound like a good idea to notify screen reader users that a 'Popup' is attached by adding the attribute aria-haspopup="true" to the triggering element,
but this is not a good idea.

Screen readers announce different feedback based on the various combinations of element types and ARIA roles in the markup, which can lead to confusion and misrepresent the purpose of the feature altogether.

Examples:

<!-- Triggering Element One
JAWS 13 and 14 announces as "Has Popup"
NVDA2013 announces as "SubMenu"
-->

<a href="#" aria-haspopup="true"> Triggering Element One </a>

<!-- Triggering Element Two
JAWS 13 and 14 announces as "Menu"
NVDA2013 announces as "Menu Button SubMenu"
-->

<a href="#" role="button" aria-haspopup="true"> Triggering Element Two </a>

<!-- Triggering Element Three
JAWS 13 and 14 announces as "Menu"
NVDA2013 announces as "Menu Button SubMenu"
-->

<button aria-haspopup="true"> Triggering Element Three </button>

In short, don't use aria-haspopup unless you are triggering a menu.
