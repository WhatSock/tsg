Popups

A Popup is a relatively simple control type, and can easily be made accessible.

Expected behaviors: Ensure that the beginning and ending boundaries are conveyed to screen reader users, make sure the popup can be closed from the keyboard, and ensure that focus moves appropriately when the popup opens and closes.

The Popup Module automates these processes by instantiating the content as a Popup AccDC Object, which can be configured and controlled programmatically if desired to enhance functionality.

HTML Syntax

For the triggering element:

<a href="#" id="popupTrigger"> Triggering Element </a>

For the popup container element:

<div id="popupContainerId">
Popup content goes here.
</div>

When Implementing a Close link or button, the className must match the "closeClassName" property within the JavaScript invocation statement.
(If not explicitly set, the default value "popupClose" will be set by default, and should be used for all Close links or buttons)
Doing so will automatically bind the AccDC Close Methods with this element, and return keyboard focus properly when the AccDC Object is closed.

JavaScript invocation statement syntax:

var popupId = $A.setPopup({
// Configure functionality key / value mappings
});

Parameters

The first parameter configures popup functionality using a key / value map.

Example:

{

// Set a unique ID for the Popup AccDC Object, which can be referenced through $A.reg['uniqueId']
id: 'uniqueId',

// Set the screen reader accessible boundary text values
role: 'Popup',
accStart: 'Start',
accEnd: 'End',

// Set a triggering element using either the DOM node or a CSS Selector
trigger: '#popupTrigger',

// Specify that literal content is to be rendered
// (Only if pulling content from within the same page, remove otherwise)
mode: 0,

// Use removeChild to grab the desired popup content from within the document
// This is important to prevent ID attribute conflicts later
// (Only if pulling content from within the same page, remove otherwise)
source: $A.getEl('popupContainerId').parentNode.removeChild($A.getEl('popupContainerId')),

// Specify the file path and ID attribute of the popup container element
// (Only if pulling content from an external page, remove otherwise)
source: 'files/popup.html #popupContainerId',

// Position the popup on the right of the triggering element
autoPosition: 3,

// Move the Popup AccDC Object 10px to the right, and 20px up when opened
offsetLeft: 10,
offsetTop: -20,

// Set the class name for the top level container element
className: 'popup',

// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the popup content, which will cause Close Method Binding to automatically occur when the content is rendered.
closeClassName: 'popupClose',

// Set a visually hidden close link for screen reader users to appear at the end of the popup content
showHiddenClose: true,

// Set the visually hidden close link to appear onFocus (required for 508 compliance if no other keyboard accessible close method is available)
displayHiddenClose: true,

// Set the heading level that will be accessible for screen reader users
ariaLevel: 2,

// Run script after the Popup AccDC Object finishes loading
runAfter: function(dc){
// 'dc' is the Popup AccDC Object
// dc.containerDiv is the DOM node where the newly rendered popup content is contained
// All other AccDC API properties and methods are similarly available for the 'dc' object
},

// Run script after the Popup AccDC Object finishes closing
runAfterClose: function(dc){
// Optionally do stuff
}

// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)

}

Programmatic Control

Every popup is registered as an AccDC Object, the ID of which is returned by the JavaScript invocation statement.

This means that you can programmatically control each popup using JavaScript.

Example:

// Get a reference to the Popup AccDC Object using the ID  stored in the popupId variable

var dc = $A.reg[popupId];

// Now invoke the popup

dc.open();

// Or close the popup

dc.close();

// All other AccDC API properties and methods can be applied here as well.

Triggering Element Requirements

Regarding the triggering element, you should always use an active element for this purpose to ensure accessibility for both screen reader and keyboard only users.

Within the samples, these are standard links (A tags with an Href attribute). However, you can use whatever type of triggering element you wish, a standard link, button, or image link, with any type of styling. There must be an active element as a triggering element though, to ensure accessibility.

Styling

The sample popups in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the popup. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled popup will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The popups within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accPopup", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the popup container element.
If set, data-internal should be blank or not included. 
• data-internal : The ID attribute of the popup container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the new content. "Popup" is set by default if no value is specified.
• data-autoposition : The autoPosition override, which dynamically positions the new content relative to the triggering element. This reflects the autoPosition property documented within AccDC, and may be a value between 0 and 12. The default is 3 if left blank or not included. 
• data-offsetleft : The offsetLeft override, which dynamically positions the new content relative to the triggering element. The default is 10 if left blank or not included. 
• data-offsettop : The offsetTop override, which dynamically positions the new content relative to the triggering element. The default is -20 if left blank or not included.    

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes for the triggering element:

• class="accPopup" : The bootstrap class name that specifies an accessible popup.  
• id : The unique ID of the element. This value is also registered as the ID of the Popup AccDC Object, making it possible to invoke the object programmatically.
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

Do not use role="dialog" or role="application" on popups.

It may be tempting to apply the ARIA attributes role="dialog" or role="application" to the popup container markup, since the component is supposed to simulate an application pane.

Doing so however when variable content is involved, is more likely to cause accessibility issues to occur.

When role="dialog" is applied, JAWS 12 and 13, and NVDA, enforce Applications Mode, so that Virtual Buffer navigation is not possible for screen reader users without performing a manual override. 

This means that, all static text within the popup will be inaccessible to screen reader users.

The use of role="application" works in a similar manner in JAWS 14 and in NVDA, by restricting the use of Virtual Buffer navigation.

Since the popup content is already fully accessible to screen reader users, the addition of role="dialog" or role="application" does not increase accessibility in any way for screen reader users, and increases the likelihood that textual content will not be accessible to screen reader users.
