Banners

A Banner is a simple control type, which can easily be made accessible.

Expected behaviors: Ensure that the content of the banner appears at the top of the page, ensure that the beginning and ending boundaries are conveyed to screen reader users, and make sure the banner can be closed from the keyboard (if applicable).

The Banner Module automates these processes by instantiating banner content as an AccDC Object.

Container element HTML syntax:

<div id="bannerContainerElementId">
Banner content goes here.
</div>

JavaScript invocation statement syntax:

var bannerId = $A.setBanner({
// Configuration key / value map
});

Parameters

The first parameter configures banner functionality using a key / value map.

Example:

{

// Configuration key / value mappings

// Set a unique ID for the Banner AccDC Object
id: 'myBannerId',

// Set the boundary text for screen reader users
role: 'Banner',

// Set the Banner AccDC Object to render literal content
// (Only if pulling content from within the same page, remove otherwise)
mode: 0,

// Set the content to be rendered by pulling it from within the same page
// 'removeChild' is important here, so no duplicate ID conflicts can occur when the object is opened and closed
// (Only if pulling content from within the same page, remove otherwise)
source: $A.getEl('bannerContainerElementId').parentNode.removeChild($A.getEl('bannerContainerElementId')),

// Specify the path and ID of the banner content to be loaded
// (Only if pulling content from an external page, remove otherwise)
source: 'files/overlays.html #bannerContainerElementId',

// Disable automatic positioning if wishing to use a Style Sheet instead
autoFix: 0,

// Specify that the banner should open as soon as the page loads
autoStart: true,

// Set a class name for the banner top level container element
className: 'banner',

// Specify that the textual content of the banner should automatically be announced to screen reader users when opened
announce: true,

// Choose the container element where the banner will be inserted
isStatic: 'body',
// Choose to prepend the banner instead of replacing the content within the container element
// (This places the banner content at the top of the page in the reading order for screen readers)
prepend: true,

// Set a hidden close link to appear for screen reader users
showHiddenClose: true,

// Remove the hidden close link from the tab order so it doesn't appear when tabbing
displayHiddenClose: false,

// Set the heading level that will be accessible for screen reader users
ariaLevel: 2,

// Run a script after the banner finishes loading
runAfter: function(dc){
// Optionally do stuff
// 'dc' is the Banner AccDC Object
// dc.containerDiv is the DOM node where all banner content is rendered
}

// Other AccDC API properties and methods can go here as well if desired.

}

Programmatic Control

The invocation statement returns the ID of the newly instantiated Banner AccDC Object, which can be used to programmatically control each banner using JavaScript if desired.

Example:

// Get a reference to the Banner AccDC Object

var dc = $A.reg[bannerId];

// Which you can then open

dc.open();

// Or close

dc.close();

// All other AccDC API properties and methods can be applied here as well.

Styling

The sample banners in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the banner. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled banner will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The banners within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accBanner", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes:

• data-src : The resource path and pointer to the ID attribute of the banner container element. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the new content. "Banner" is set by default if no value is specified.  

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes:

• class="accBanner" : The bootstrap class name that specifies a banner insertion point container.
• id : The unique ID of the element. This value is also registered as the ID of the banner AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.                
