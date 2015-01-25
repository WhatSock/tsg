ARIA Trees

An ARIA Tree is a complex control type that requires a lot of synchronizing to make accessible.

The reasons why: If the right ARIA attributes are not applied to the correct DOM nodes that receive keyboard focus, and if the parent child ID associations are not properly mapped and maintained, and if tree nodes are not labeled properly using the correct ARIA attributes, and if the tree contains any other active elements that are not part of the ARIA Tree structure, then the ARIA Tree and its contents will not be accessible for screen reader users.

Currently, a large part of this is the result of unequal support by screen reader manufacturers. For example, even though the ARIA specification states that role="document" can be used to embed additional content panels within specific widgets such as this, doing so will result in content panels that are inaccessible using JAWS in both IE and Firefox. (Verified in JAWS 12, 13, and 14)

Nevertheless, the Tree Module automates these processes accessibly by adding all related event handlers and managing all related rendering procedures using an external XML file for configuration.

HTML Syntax

<div id="myTreeId"></div>

XML Syntax

<?xml version="1.0" encoding="UTF-8" ?>
<tree>
<branch id="uniqueId0-1" name="Branch Link Name for id=uniqueId0-1">
<leaf id="uniqueId0-1-1" name="Leaf Link Name for id=uniqueId0-1-1"></leaf>
</branch>
<leaf id="uniqueId0-2" name="Leaf Link Name for id=uniqueId0-2"></leaf>
</tree>

The above XML markup results in the following HTML structure when rendered:

<div class="TreeView">
<div>
<ul role="tree" aria-owns="uniqueId0-1 uniqueId0-2" aria-label="Informative Field Name">
<li>
<a class="branch" aria-expanded="true" id="uniqueId0-1" aria-level="1" role="treeitem" aria-posinset="1" tabIndex="0" aria-selected="true" aria-owns="aria1363672754457" aria-setsize="2" href="#" aria-label="Branch Link Name for id=uniqueId0-1">
<SPAN>Branch Link Name for id=uniqueId0-1</SPAN>
</a>
<div class="TreeView">
<div>
<ul id="aria1363672754457" role="group" aria-owns="uniqueId0-1-1">
<li>
<a class="leaf" id="uniqueId0-1-1" aria-level="2" role="treeitem" aria-posinset="1" tabIndex="-1" aria-selected="false" aria-setsize="1" href="#" aria-label="Leaf Link Name for id=uniqueId0-1-1">
<SPAN>Leaf Link Name for id=uniqueId0-1-1</SPAN>
</a>
</li>
</ul>
</div>
</div>
</li>
<li>
<a class="leaf" id="uniqueId0-2" aria-level="1" role="treeitem" aria-posinset="2" tabIndex="-1" aria-selected="false" aria-setsize="2" href="#" aria-label="Leaf Link Name for id=uniqueId0-2">
<SPAN>Leaf Link Name for id=uniqueId0-2</SPAN>
</a>
</li>
</ul>
</div>
</div>

Required XML attributes:

• id : The unique ID of the node. This will automatically be converted into the ID attribute of the relevant tree item link when rendered. (All IDs must be unique)
• name : The textual name of the node, which will automatically be converted into the textual label for the tree item link when rendered.
(All name attribute values at the same logical node level must be unique to ensure accessibility for screen reader users)

The following attributes are handled automatically by the ARIA Tree Module:

• aria-label
• role="tree"
• role="group"
• aria-owns
• tabindex
• role="treeitem"
• aria-setsize
• aria-posinset
• aria-selected
• aria-expanded

JavaScript invocation statement syntax:

var treeId = $A.setTree({
// Configuration key / value map
});

Parameters

The first parameter is used to configure ARIA Tree functionality using a key / value map.

Example:

{

// Set the XML file to parse
path: 'files/tree.xml',

// Set the label that will be announced to screen reader users
title: 'Informative Field Name',

// Specify the container element where the tree nodes will be inserted
container: 'div#myTree',

// Set the class name shared by all tree AccDC Objects when rendered
topClass: 'TreeView',

// Set the container tree node type
treeTag: 'ul',

// Set the divider node type that will be appended to the treeTag node
dividerTag: 'li',

// Set the focusable tree item node type that will be inserted within dividerTag node
treeItemTag: 'a',

// Set the shared class name for all tree items that expand into subfolders
treeClass: 'branch',

// Set the shared class name for all tree items that do not expand into subfolders
treeItemClass: 'leaf',

// Set the class name that is only set on the tree item node that has focus
selectClass: 'selected',

// Set the handler type that will trigger the callback
bind: 'click',

// Declare a callback function
callback: function(ev, dc){

// Get the XML node that matches the ID attribute of the currently triggered element
var xmlNode = $A.query('#' + this.id, dc.top.xmlDocument)[0];

// To learn more about the XML DOM and supported properties and methods,
// and how to access custom attributes on each node, visit
// http://www.w3schools.com/dom/default.asp

},

overrides: {
// Set optional AccDC API overrides for every AccDC Object that is rendered in the tree
}

}

Programmatic Control

The invocation statement returns the top level ID of the newly instantiated ARIA Tree control, which is now registered as an AccDC Object.

You can use this ID to programmatically change or invoke AccDC API properties and methods within the ARIA Tree structure, and to traverse the parent / child relationship of tree node objects.

Example:

// Get the Tree AccDC Object using the ID stored in the variable treeId

var dc = $A.reg[treeId];

Now, you can traverse the expandable branches in the tree using
dc.siblings, dc.children, dc.parent, and dc.top,
and apply changes, store and retrieve data, or invoke AccDC API commands as desired.

Example:

// Close the Tree AccDC Object and remove it from the DOM.

dc.top.close();

// All other AccDC API properties and methods are similarly available.

Styling

The sample trees in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the tree. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled tree will be accessible.
