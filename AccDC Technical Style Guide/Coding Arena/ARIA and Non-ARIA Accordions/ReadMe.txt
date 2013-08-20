Accordions

Accordions are a fairly simple control type that are easy to make accessible.

Though similar in both concept and execution to Tab Controls, they are not the same.

A Tab Control has a series of grouped triggering elements that expand and collapse, the rendered content of which is inserted directly after the triggering element group when opened.
The container element insertion point for all Tab Control triggering elements is shared between them.
Also, the group of triggering elements in a Tab Control has only one tab stop. The arrow keys are then used to switch focus between each Tab, and the Enter or Space key is used to expand the desired Tab content panel.

In contrast, an Accordion has a series of triggering elements that expand and collapse, the rendered content of which is inserted directly after the triggering element when opened.
The container element insertion points for Accordions are not shared.
Also, all Accordion links appear in the tab order.
The reason why ARIA attributes such as role="tablist" and role="tab" are not included within accordions, is because the insertion of inline content would place dynamic content sections within the same Tablist container, making it impossible to determine the order of nested Tab controls when present within the inserted content.

The chosen implementation should always match the UI that it's being applied to, to prevent confusion.

The Accordion Module automates these processes by adding all related event handlers and managing all related rendering procedures.

HTML Syntax

Referencing external content:

<div class="accordionGroup">

<a href="#" class="accAccordion" data-src="files/accordions.html#containerId1" data-insert="sectId1" data-defaultopen="true"  id="accordionId1">
Triggering Element One Name
</a>

<div id="sectId1"><!--
(accordionId1 content will be inserted here when opened)
--></div>

<a href="#" class="accAccordion" data-src="files/accordions.html#containerId2" data-insert="sectId2" id="accordionId2">
Triggering Element Two Name
</a>

<div id="sectId2"><!--
(accordionId2 content will be inserted here when opened)
--></div>

</div>

Or referencing internal content:

<div class="accordionGroup2">

<a href="#" class="accAccordion" data-internal="containerId1" data-insert="x-sectId1" data-defaultopen="true"  id="x-accordionId1">
Triggering Element One Name
</a>

<div id="x-sectId1"><!--
(x-accordionId1 content will be inserted here when opened)
--></div>

<a href="#" class="accAccordion" data-internal="containerId2" data-insert="x-sectId2" id="x-accordionId2">
Triggering Element Two Name
</a>

<div id="x-sectId2"><!--
(x-accordionId2 content will be inserted here when opened)
--></div>

</div>

HTML5 "data-" attributes are used to configure specific functionality for each accordion expand/collapse link. These include the following:

• data-src : The resource path and pointer to the ID attribute of the accordion content container element.
If set, data-internal should be blank or not included. 
• data-internal : The ID attribute of the accordion content container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-insert : The ID attribute of the container element where the accordion content will be inserted when rendered. (This must not be inside the triggering element)
• data-defaultopen="true" : Specifies that the referenced accordion node will open automatically. Only one accordion node per group should include this
attribute.    

Required attributes:

• All accordion triggering elements must include unique ID attribute values.

Important: The insertion point where accordion content is rendered must be inline with (meaning directly after) the triggering element, to ensure accessibility for screen reader and keyboard only users. (No other active elements or page content should separate them.)

The examples above use DIV tags as container elements, but it doesn't really matter what the container element is, as long as the IDs match up. For instance, the interactive samples in the Coding Arena use DL tags as the main container, DTs to hold the triggering element, and DDs to act as the insertion points, which works well and is easy to format.

Container element HTML syntax:

<div id="containerId1">
Accordion panel 1 content goes here.
</div>

<div id="containerId2">
Accordion panel 2 content goes here.
</div>

JavaScript invocation statement syntax:

$A.generateAccordion( 'div.accordionGroup a.accAccordion' , {
// Configuration key / value mappings
}, document , callbackFunction(dc){
// Run every time an accordion expand/collapse link is toggled
// 'dc' is the registered Accordion AccDC Object
// dc.triggerObj is the triggering element
// dc.containerDiv is the DOM node where all accordion panel content is rendered
// dc.loaded reflects whether the accordion panel is currently open
} );

Parameters

The first parameter is a CSS Selector that specifies all accordion expand/collapse links that are part of the same accordion group.

If multiple accordions are present on the same page, each accordion should be declared separately using the above statement, and the CSS Selector should only reference the expand/collapse node links that apply to that particular accordion, and to no other.

The reason for this is simple. When an accordion is active, it will close all open accordion nodes when an expand link is activated. So if you don't want all of the nodes of every other accordion on the page to be closed at the same time as well, then you should separate them using unique CSS Selectors for each group.

The second parameter is used to configure accordion functionality using key / value map overrides.

Example:

{

// Set the hidden text role and state that will be added to the triggering element for screen reader users
accordionRole: 'Accordion',
accordionState: 'Expanded',

// Set the accordion AccDC Object to render literal content
// (only when pulling content from within the same page, remove otherwise)
mode: 0,

// Preload HTML markup to speed rendering
// (only when pulling content from an external page, remove otherwise)
preload: true,

// Preload images to speed rendering
// (only when pulling content from an external page, remove otherwise)
preloadImages: true,

// Set the class name that will be added to the triggering element of the currently open accordion
toggleClass: 'open',

// Choose whether or not to make accordion expand/collapse links toggles as well
isToggle: false

// Additional AccDC API properties and methods may be applied here as well if desired.

}

The third parameter (contextDOM_Node) specifies the container DOM node where the accordion is contained, which confines the CSS Selector to the contents of this node.
This can also be used to reference accordion groups contained within iFrame documents.

The fourth parameter is a callback function that can be used to configure additional functionality whenever an accordion is opened or closed.

Programmatic Control

Every accordion node is registered as an AccDC Object, the ID of which matches the ID attribute value on the accordion expand/collapse link. For this reason, all accordion expand/collapse links must have unique ID attribute values.

This means that you can programmatically control each accordion node using JavaScript if desired, like so:

// Get a reference to the accordion AccDC Object for the accordion expand/collapse link with id="uniqueId"

var dc = $A.reg['uniqueId'];

// Now invoke the object

dc.open();

// Or

dc.close();

// All other AccDC API properties and methods can be applied here as well.

Triggering Element Requirements

Regarding the triggering element for expand/collapse links, you should always use an active element for this purpose to ensure accessibility for both screen reader and keyboard only users.

Within the Coding Arena samples, these are standard links (A tags with an Href attribute), which includes a SPAN tag with a changeable background image. However, you can use whatever type of triggering element you wish, a standard link, button, or image link, with any type of styling. There must be an active element as a triggering element though, to ensure accessibility.

Styling

The sample accordions in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the accordion. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled accordion will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The accordions within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accAccordion", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the accordion content container element.
If set, data-internal should be blank or not included. 
• data-internal : The ID attribute of the accordion content container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-defaultopen="true" : Specifies that the referenced accordion node will open automatically. Only one accordion node per group should include this
attribute. 
• data-role : The role name that is conveyed to screen reader users within the accordion link. "Accordion" is set by default if no value is specified. 
• data-openstate : The open state text that is conveyed to screen reader users within the accordion link when open. "Expanded" is set by default if no value
is specified. 
• data-insert : The ID attribute of the container element where accordion node content will be inserted. The referenced container element must not be included
within the accordion link node. 
• data-group : The shared group name for all related nodes within an accordion. This is used to differentiate separate accordion groups within the same
document. 

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes for the triggering element:

• class="accAccordion" : The bootstrap class name that specifies an accessible accordion node. 
• id : The unique ID of the element. This value is also registered as the ID of the individual accordion node AccDC Object, making it possible to invoke
the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.    
        
    
