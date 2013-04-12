Tooltips

A Tooltip is a relatively simple control type, which can easily be made accessible.

Expected behaviors: Ensure that the beginning and ending boundaries are conveyed to screen reader users, and make sure the Tooltip is accessible from the keyboard.

The Tooltip Module automates these processes by instantiating the content as a Tooltip AccDC Object, which can be configured and controlled programmatically if desired to enhance functionality.

HTML Syntax

For the triggering element:

<a href="#" id="tooltipTrigger1"> Triggering Element </a>

Or

<input type="..." id="tooltipTrigger2" title="Field name if no Label tag is associated" />

Or

<select id="tooltipTrigger3" title="Field name if no Label tag is associated">
<option value="0"> Option One </option>
<option value="1"> Option Two </option>
</select>

For the tooltip container element:

<div id="tooltipContainerId">
Tooltip content goes here.
</div>

JavaScript invocation statement syntax:

var tooltipId = $A.setTooltip({
// Configure functionality key / value mappings
});

Parameters

The first parameter configures tooltip functionality using a key / value map.

Example:

{

// Set a unique ID for the Tooltip AccDC Object, which can be referenced through $A.reg['uniqueId']
id: 'uniqueId',

// Set the screen reader accessible boundary text values
role: 'Tooltip',
accStart: 'Start',
accEnd: 'End',

// Set the triggering element using a DOM node or a CSS Selector
trigger: '#tooltipTrigger1',

// Specify that literal content is to be rendered
// (Only if pulling content from within the same page, remove otherwise)
mode: 0,

// Use removeChild to grab the desired Tooltip content from within the document
// This is important to prevent ID attribute conflicts later
// (Only if pulling content from within the same page, remove otherwise)
source: $A.getEl('tooltipContainerId').parentNode.removeChild($A.getEl('tooltipContainerId')),

// Set a file path to pull the Tooltip content from and reference the container element ID
// (Only if pulling content from an external page, remove otherwise)
source: 'files/tooltip.html #tooltipContainerId',

// Position the Tooltip on the right of the triggering element
autoPosition: 3,

// Move the Tooltip AccDC Object 10px to the right when opened
offsetLeft: 10,

// Set the class name for the top level container element
className: 'tooltip',

// Set the heading level that will be accessible for screen reader users
ariaLevel: 2

// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)

}

Programmatic Control

Every tooltip is registered as an AccDC Object, the ID of which is returned by the JavaScript invocation statement.

This means that you can programmatically control each tooltip using JavaScript.

Example:

// Get a reference to the Tooltip AccDC Object using the ID  stored in the tooltipId variable

var dc = $A.reg[tooltipId];

// Now change the content of the tooltip

dc.source = 'Hello World';

// All other AccDC API properties and methods can be applied here as well.

Styling

The sample tooltips in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled tooltip will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The tooltips within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accTooltip", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes:

• data-src : The resource path and pointer to the ID attribute of the tooltip container element.
If set, data-internal should be blank or not included.
• data-internal : The ID attribute of the tooltip container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the new content. "Tooltip" is set by default if no value is specified. 
• data-autoposition : The autoPosition override, which dynamically positions the new content relative to the triggering element. This reflects the autoPosition property documented within AccDC, and may be a value between 0 and 12. The default is 3 if left blank or not included. 
• data-offsetleft : The offsetLeft override, which dynamically positions the new content relative to the triggering element. The default is 10 if left blank or not included. 
• data-offsettop : The offsetTop override, which dynamically positions the new content relative to the triggering element. The default is 0 if left blank or not included.    

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes:

• class="accTooltip" : The bootstrap class name that specifies an accessible tooltip.  
• id : The unique ID of the element. This value is also registered as the ID of the Tooltip AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.        

Implementation Notes

When an A tag is used as the triggering element, it must adhere to the following:
1. If the element contains no link text and no Img element, then the link should include an informative Title attribute. (This is only valid if there is no link text at all)
2. If the element contains an Img tag and no link text, then the Img tag should include an informative Alt attribute and Title attribute, both of which should match.
3. The A tag must include an Href attribute, to ensure keyboard accessibility.

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
