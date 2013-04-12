ARIA Tabs

Tabs are a fairly simple control type that are easy to make accessible.

Though similar in both concept and execution to Accordions, they are not the same.

An Accordion has a series of triggering elements that expand and collapse, the rendered content of which is inserted directly after the triggering element when opened.
The container element insertion points for Accordions are not shared.
Also, all Accordion links appear in the tab order.
The reason why ARIA attributes such as role="tablist" and role="tab" are not included within accordions, is because the insertion of inline content would place dynamic content sections within the same Tablist container, making it impossible to determine the order of nested Tab controls when present within the inserted content.

In contrast, a Tab Control has a series of grouped triggering elements that expand and collapse, the rendered content of which is inserted directly after the triggering element group when opened.
The container element insertion point for all Tab Control triggering elements is shared between them.
Also, the group of triggering elements in a Tab Control has only one tab stop. The arrow keys are then used to switch focus between each Tab, and the Enter or Space key is used to expand the desired Tab content panel.

The chosen implementation should always match the UI that it's being applied to, to prevent confusion.

The Tab Module automates these processes by adding all related event handlers and managing all related rendering procedures.

HTML Syntax

Referencing external content:

<div role="tablist" id="tabList1">
<div>
<a href="#" class="accTab" data-src="files/tabs.html#containerId1" data-insert="tabPanelId" data-defaultopen="true"  id="tabId1" role="tab">
<span>Triggering Element One Name</span>
</a>
</div>
<div>
<a href="#" class="accTab" data-src="files/tabs.html#containerId2" data-insert="tabPanelId" id="tabId2" role="tab">
<span>Triggering Element Two Name</span>
</a>
</div>
</div>

<div id="tabPanelId"><!--
(All Tab panel content will be inserted here when a Tab is opened)
--></div>

Or referencing internal content:

<div role="tablist" id="tabList2">
<div>
<a href="#" class="accTab" data-internal="containerId1" data-insert="tabPanelId2" data-defaultopen="true"  id="x-tabId1" role="tab">
<span>Triggering Element One Name</span>
</a>
</div>
<div>
<a href="#" class="accTab" data-internal="containerId2" data-insert="tabPanelId2" id="x-tabId2" role="tab">
<span>Triggering Element Two Name</span>
</a>
</div>
</div>

<div id="tabPanelId2"><!--
(All Tab panel content will be inserted here when a Tab is opened)
--></div>

HTML5 "data-" attributes are used to configure specific functionality for each Tab expand/collapse link. These include the following:

• data-src : The resource path and pointer to the ID attribute of the Tab content container element.
If set, data-internal should be blank or not included. 
• data-internal : The ID attribute of the Tab content container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-insert : The ID attribute of the container element where the Tab content will be inserted when rendered. (This must not be inside the triggering element, and must be the same for all Tab links within the same group)
• data-defaultopen="true" : Specifies that the referenced Tab panel will open automatically. (Only one Tab link per group should include this attribute.)

Required attributes:

• role="tablist" must be included within the container element (where all Tab links are contained).
• role="tab" must be included within all Tab links.
• Both the Tablist container element (with role="tablist") and all Tab links (with role="tab") must include unique ID attribute values.

Important: The insertion point where Tab panel content is rendered must be inline with (meaning directly after) the Tablist group, to ensure accessibility for screen reader and keyboard only users. (No other active elements or page content should separate them.)

The examples above use DIV tags as container elements, but it doesn't really matter what the container element is, as long as the IDs match up. For instance, the interactive samples use standard list markup to group related Tab links, which works well and is easy to format.

Container element HTML syntax:

<div id="containerId1">
Tab panel 1 content goes here.
</div>

<div id="containerId2">
Tab panel 2 content goes here.
</div>

The following attributes are handled automatically by the Tab Module:

• tabindex
• aria-label
• aria-owns
• aria-selected
• aria-expanded

JavaScript invocation statement syntax:

$A.setTabs( 'div.tabGroup a.accTab' , {
// Configuration key / value mappings
}, useARIA? , document ,
function(dc){
// Optional callback to execute after a Tab panel opens
// 'this' is the same as dc.triggerObj, and is the DOM node for the triggering element
// dc.containerDiv is the DOM container node that contains the newly loaded Tab panel content.
} );

Parameters

The first parameter is a CSS Selector that specifies all Tab expand/collapse links that are part of the same Tablist group.

If multiple Tablist groups are present on the same page, each Tablist should be declared separately using the above statement, and the CSS Selector should only reference the expand/collapse node links that apply to that particular Tablist, and to no other.

The reason for this is simple. When a Tab panel is opened, it will close all other Tab panels when an expand link is activated. So if you don't want all of the nodes of every other Tablist group on the page to be closed at the same time as well, then you should separate them using unique CSS Selectors for each group.

The second parameter is used to configure Tab functionality using key / value map overrides.

Example:

{

// Set the Tab panel boundary text that will be conveyed to screen reader users
role: 'Tab',
accStart: 'Start',
accEnd: 'End',

// Set the Tab AccDC Object to render literal content
// (only when pulling content from within the same page, remove otherwise)
mode: 0,

// Preload HTML markup to speed rendering
// (only when pulling content from an external page, remove otherwise)
preload: true,

// Preload images to speed rendering
// (only when pulling content from an external page, remove otherwise)
preloadImages: true,

// Set a className that will be added to the triggering element for the currently active tab
toggleClass: 'active',

// Choose whether or not to make Tab expand/collapse links toggles as well
isToggle: false

// Additional AccDC API properties and methods may be applied here as well if desired.

}

The third parameter (useARIA?) is a Boolean (true or false), that specifies whether the Tab Control will be configured as an ARIA Tab widget. 
If true, role="tablist" and role="tab" must be present within the markup in the correct locations.
If false, role="tablist" and role="tab" must not be included within the markup.

Important: The ARIA attributes role="tablist" and role="tab" must only be used on client side widgets that don't require a page refresh or navigate to another page.
The reasons why are fully discussed in the article at http://lnkd.in/5nPudh

The fourth parameter (contextDOM_Node) specifies the container DOM node where the Tablist markup is contained, which confines the CSS Selector to the contents of this node.
This can also be used to reference Tab groups contained within iFrame documents.

The fifth parameter is a callback function that can be used to configure additional functionality whenever a Tab panel finishes rendering.

Programmatic Control

Every Tab panel is registered as an AccDC Object, the ID of which matches the ID attribute value on the Tab expand/collapse link. For this reason, all Tab expand/collapse links must have unique ID attribute values.

This means that you can programmatically control each Tab panel using JavaScript if desired, like so:

// Get a reference to the Tab AccDC Object for the Tab expand/collapse link with id="uniqueId"

var dc = $A.reg['uniqueId'];

// Now invoke the object

dc.open();

// Or

dc.close();

// All other AccDC API properties and methods can be applied here as well.

Triggering Element Requirements

Regarding the triggering element for expand/collapse links, you should always use an active element for this purpose to ensure accessibility for both screen reader and keyboard only users.

Within the Coding Arena samples, these are standard links (A tags with an Href attribute). However, you can use whatever type of triggering element you wish, a standard link, button, or image link, with any type of styling. There must be an active element as a triggering element though, to ensure accessibility.

If using an image link however, the IMG tag must have a null Alt attribute (alt="") to hide it from screen reader users, and offscreen text must be included if no visible screen text is present.
This will ensure the highest level of accessibility for the highest percentage of screen reader users across all platforms.

Styling

The sample Tabs in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the Tablist. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled Tablist will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The Tablists within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accTab", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the tab content container element.
If set, data-internal should be blank or not included.
• data-internal : The ID attribute of the tab panel container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-defaultopen="true" : Specifies that the referenced tab will open automatically. Only one tab per group should include this attribute. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the tab panel content. "Tab" is set by default if no value is specified. 
• data-insert : The ID attribute of the container element where tab panel content will be inserted. 
• data-group : The shared group name for all related tabs. This is used to differentiate separate tab groups within the same document. 
• data-headinglvl : The heading level of the tab panel section for screen reader users. This should reflect proper nesting. If the tab panel content is inserted within an H1, data-headinglvl should be set to '2', and so on. If no value is specified, and if no override is set within accdc_bootstrap.js via ariaLevel:#, '3' will be set by default.    

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes for the triggering element:

• role="tablist" : The ARIA role that specifies a group of tab controls. This must only be included within the element that contains all individual tabs.
• role="tab" : The ARIA role that specifies an individual tab control. To ensure accessibility, this element must not contain any other active elements.
• class="accTab" : The bootstrap class name that specifies an accessible Tab link.
• id : The unique ID of the element. This value is also registered as the ID of the individual Tab AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.        

Implementation Notes

As an ARIA widget implementation, the Tablist container element must include the attribute role="tablist", and all Tab item links must include the attribute role="tab" to ensure accessibility for screen reader users.  

Both the Tablist container element and all Tab item links must include unique ID attribute values.

The innerHTML for each Tab item link must contain a textual label, which may be positioned offscreen to hide it visually if desired.
(This textual label is necessary so that screen reader users will be able to identify the purpose of the node, and also to ensure proper feedback in iOS devices when using Voiceover.)

Images may also be used within Tab item links if desired, however, they must include the attribute alt="" to hide them from screen reader users.

To add tooltips for sighted users, use the Title attribute instead, and make sure that the tooltip text matches the text contained within the textual label if positioned offscreen to hide it visually.
