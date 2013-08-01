ARIA Menus

An ARIA Menu is a simple control type that can easily be made accessible.

Expected behaviors: A keyboard accessible triggering element opens the menu, the arrow keys are used to browse available menu items or open and close submenus, pressing Tab will close all open menus, and pressing Escape will close the currently open menu.

ARIA menus can be implemented in two ways, horizontally or vertically.

This has nothing to do with what they look like, since the CSS styling can be set to whatever you like, but rather, refers to the keyboard interaction model for each menu.

A vertical menu is navigated using the Up and Down arrow keys to scroll through menu items, and Left and Right are used to close or open submenus.

A horizontal menu is navigated using the Left and Right arrow keys to scroll through menu items, and Up and Down are used to close or open submenus.

You can optionally set different interaction models for specific menus or submenus depending on how the menu is visually presented, so that the behavior properly fits the UI design.

The Menu Module automates these processes by adding all related event handlers and managing all related rendering procedures.

HTML Syntax

Basic menu structure with no submenus:

<ol class="menu" id="uniqueId1">
<li>
<a href="#" class="link" id="uniqueId2">
Menu Item One Name
</a>
</li>
<li>
<a href="#" class="link" id="uniqueId3">
Menu Item Two Name
</a>
</li>
<li>
<a href="#" class="link" id="uniqueId4">
Menu Item Three Name
</a>
</li>
</ol>

Basic menu structure with nested submenus:

<ol class="menu" id="uniqueId1">
<li>

<a href="#" class="submenu" id="-uniqueId2">
Subfolder Menu Item One Name (Level 1)
</a>

<ol class="menu" id="uniqueId1-uniqueId2">
<li>

<a href="#" class="submenu" id="-uniqueId2-1">
Subfolder Submenu Item One Name (Level 2)
</a>

<ol class="menu" id="uniqueId1-uniqueId2-uniqueId2-1">
<li>

<a href="#" class="link" id="uniqueId2-1-1">
Submenu Item One Name (Level 3)
</a>

</li>
</ol>

</li>
<li>

<a href="#" class="link" id="uniqueId2-2">
Submenu Item Two Name (Level 2)
</a>

</li>
</ol>

</li>
<li>

<a href="#" class="link" id="uniqueId3">
Menu Item Two Name (Level 1)
</a>

</li>
</ol>

The HTML menu syntax is flexible, and may consist of UL tags, OL tags, DIV tags, or any other combination, as long as the container element includes a unique ID, as well as each menu item tag.

For simplicity, these have been marked up as list elements, which is generally preferable since it includes native screen reader support for nested lists. Also, the use of standard A tags with an Href attribute ensures keyboard accessibility across all Assistive Technologies for graceful degradation.

You may also use additional HTML markup within the menu item links for formatting purposes (such as SPAN tags), as long as you don't add additional active elements such as clickable images. The only actionable element should be the menu item link, and nothing else.

Submenus are mapped by combining the ID attribute value of the container element, with the ID attribute value of the submenu link. The two combined point to the full ID attribute value of the associated submenu container element.

For example, notice the ID value on the top level menu OL tag above is id="uniqueId1", and the ID of the first Subfolder A tag within that structure is id="-uniqueId2".

When you combine the two ("uniqueId1-uniqueId2"), notice that this directly points to the submenu OL tag as its ID attribute value.

You can experiment with this in the Coding Arena "Shell" folders, where the same code is used.

Important: Don't add any ARIA attributes to the markup, and don't add tabindex attributes.
All of these are handled automatically when the menus are rendered.

If the menu constructs are contained within the same page, they must be contained within a container element that has an ID attribute. This is used by the setup function to confine the parsing query to this node only.

Example:

<div id="hiddenDivId" class="hidden">

<ol class="menu" id="uniqueId1">
...
</ol>

</div>

The following attributes are handled automatically by the Menu Module:

• role="menubar"
• role="menu"
• aria-owns
• tabindex
• role="menuitem"
• aria-selected
• aria-posinset
• aria-setsize

HTML5 attributes that can optionally be added to the menu list container markup:

• data-horizontal="true"/"false" : Sets or unsets a horizontal flyout menu where the Left and Right arrow keys will be used to navigate menu item nodes, and Up and Down will be used to close or open submenus. This temporarily overrides the interaction model set within the JavaScript declaration statement.

• data-offsetleft=<number> : Specifies a positive or negative offsetLeft value that will be applied to the menu after it is rendered.

• data-offsettop=<number> : Specifies a positive or negative offsetTop value that will be applied to the menu after it is rendered.

• data-autoposition=<number between 0 and 12> : Specifies a custom autoPosition value that will control where the menu is visually positioned relative to the triggering element.
Accepted values:
0: Disabled 
1: Above/Center/Left Edge Aligned 
2: Above/Right/Right Edge Aligned 
3: Level/Right/Right Edge Aligned 
4: Below/Right/Right Edge Aligned 
5: Below/Center/Left Edge Aligned 
6: Below/Left/Left Edge Aligned 
7: Level/Left/Left Edge Aligned 
8: Above/Left/Left Edge Aligned 
9: Level/Center/Left Edge Aligned 
10: Above/Center/Right Edge Aligned 
11: Level/Center/Right Edge Aligned 
12: Below/Center/Right Edge Aligned 

Example:

<ol class="menu" id="uniqueId1-uniqueId2-uniqueId2-1" data-horizontal="true" data-offsetleft="10" data-offsettop="-20" data-autoposition="3">
...
</ol>

JavaScript invocation statement syntax:

$A.setMenu( 'CSS-SelectorForTriggeringElement' , 'LocalePathOrContainerID' , 'TopLevelMenuID' ,
callbackFunction(ev, dc){
// Do something every time a menu item link node is clicked
} , areMenusInTheSameDoc? , contextDOM-Node , {
// Configure key / value mapping overrides
});

Parameters

Parameter 1: The triggering element CSS Selector :
This points to the triggering element link or button that you want to use as the menu triggering element. For instance, the CSS Selector "a.button" points to the A tag with class="button" for this purpose.

Parameter 2: The Locale Path or Container ID :
When menus are contained within an external HTML file, this string value is the relative file path, such as "files/menus.html".
When menus are contained within the same page, this string value is the ID attribute of the container element where all of the menu tags  are located, such as "hiddenDivId".

Parameter 3: Top Level Menu ID:
This string is the top level menu ID attribute value, such as "uniqueId1", which is used to specify which menu will be opened first when the triggering element is activated.

Parameter 4: The Callback Function:
This is where you can set specific functionality to occur whenever a menu item link is activated, whether this is to navigate to another page, or to perform another client side action. 
When declared, two arguments are passed to the function, first is the event object, and the second is the AccDC Object for the currently open menu object.
Using 'this' within the function will reference the DOM node for the activated element, which is useful if mapping the ID attribute to a particular action.

Parameter 5: Are Menus within the Same Doc:
A Boolean (true or false), that specifies whether the script should process the Locale parameter as an internal or external resource locator.
If menu markup is contained within an external HTML file, set this to false, otherwise set to true.

Parameter 6: The Context DOM Node:
This is the DOM node that will be used to confine the parsing query.
Typically this is set to document, since all of the IDs are relative to this location.
However, this parameter gives you the ability to reference iFrame documents instead if desired.

Parameter 7: The Config Object:
This is a key / value mapping of overrides that can be used to customize the element types of menu container and menu item elements, the class names for each, the boundary text that is conveyed to screen reader users, the menu heading level, the default keyboard interaction model, the default auto positioning if desired, plus additional AccDC API overrides if desired.

Example:

{

// Assign a role name for screen reader users
role: 'Menu',
// Assign beginning and ending text to be appended to the role name for screen reader users
accStart: 'Start',
accEnd: 'End',
// Assign the state text, which will be appended to the triggering element when a menu is open for screen reader users
openState: 'Open',

// Set the initial menu heading level
ariaLevel: 3,

// Set the main container class, (which will surround the menu as a Div tag when rendered)
containerClass: 'menu',

// Specify the menu tag name in the markup
menuTag: 'ol',
// Specify the menu class name on the above tag in the markup
menuClass: 'menu',

// Specify the active element that will be used as each menu node
// Important, if nesting A tags within LIs, only the A tag should be used for this purpose
// Active elements should never be nested.
// The following tag will receive keyboard focus within the menu structure when using the arrow keys to navigate
// Event bindings are also tied to this tag
itemTag: 'a',

// Specify the class name that indicates when a menu item opens a submenu
folderClass: 'submenu',
// Specify the class name that indicates when a menu item is to be triggered directly
// This should not be the same as the folderClass declaration
linkClass: 'link',

// Specify if the menu is a flyout menu
// If true, the Left and Right arrow keys will scroll the open menu
// If false, the Up and Down arrow keys will scroll the open menu instead
horizontal: false,

// Set a default autoPosition value between 0 (disabled) and 12
autoPosition: 0,

// Set custom offset values to adjust the positioning calculation
// May return a positive or negative number
offsetLeft: function(dc){
return 0;
},
offsetTop: function(dc){
return 0;
},

overrides: {
// Additional AccDC API properties and methods can be applied here if desired.
}

}

Programmatic Control

Every menu instance is registered as an AccDC Object, the ID of which matches the ID attribute value on the menu container element.

This means that you can programmatically control each menu using JavaScript if desired, like so:

// Get a reference to the top level Menu AccDC Object for the menu container with id="uniqueId"

var dc = $A.reg['uniqueId'];

// Now invoke the object

dc.open();

// Or

dc.close();

// All other AccDC API properties and methods can be applied here as well.

Triggering Element Requirements

Regarding the triggering element for opening menus, you should always use an active element for this purpose to ensure accessibility for both screen reader and keyboard only users.

Within the Coding Arena samples, these are standard links (A tags with an Href attribute). However, you can use whatever type of triggering element you wish, a standard link, button, or image link, with any type of styling. There must be an active element as a triggering element though, to ensure accessibility.

Styling

The sample menus in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the menu. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled menu will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The menus within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accMenu", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the top level menu list.
If pointing to a menu list within the same document, only the ID attribute should be included here. 
• data-internal : The ID attribute of the container element for all menu lists within the same document.
If data-src is set to an external source, data-internal should be blank or not included. 
• data-role : The role name that is conveyed to screen reader users at the beginning and end of each menu section. "Menu" is set by default if no value
is specified. 
• data-starttext : The role state that is conveyed to screen reader users at the beginning of each menu section. "Start" is set by default if no value is
specified. 
• data-endtext : The role state that is conveyed to screen reader users at the end of each menu section. "End" is set by default if no value is specified.
• data-openstate : The open state text that is conveyed to screen reader users within the triggering link when open. "Open" is set by default if no value
is specified. 
• data-containerclass : The class name that will be added dynamically to the surrounding Div tag for each menu group when rendered. "menu" is set by default
if no value is specified. 
• data-menutag : The tag name for the container element that contains all menu item tags. All menu item tags must be contained within this container element,
even if they are not first level child nodes. "ol" is set by default if no value is specified. 
• data-menuclass : The shared class name that is contained within every menu container element. All menu tags specified by data-menutag must include this
class name. "menu" is set by default if no value is specified. 
• data-menuitemtag : The shared tag name that specifies all menu item tags. All menu item tags must be contained within the container element specified
by data-menutag, even if they are not first level child nodes. "a" is set by default if no value is specified. 
• data-menufolderclass : The shared class name that is contained within every menu tag that opens a submenu. "submenu" is set by default if no value is
specified. 
• data-menulinkclass : The shared class name that is contained within every menu tag that does not open a submenu. "link" is set by default if no value
is specified. 
• data-flyout="true" : Specifies a horizontal flyout menu where the Left and Right arrow keys will be used to navigate menu item nodes, and Up and Down
will be used to close or open submenus. If data-flyout is not included within the markup, the default vertically oriented keyboard assignments will be
applied automatically.        

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes for the triggering element:

• class="accMenu" : The bootstrap class name that specifies an accessible menu triggering element.    

Implementation Notes

The lists can be set to any tag, such as OL, UL, etc, as long as this is specified in the menuTag property within the JavaScript declaration statement or within the data-menutag attribute on the triggering element if Bootstrapped.

The same is true for the menu item nodes, which is specified using the menuItemTag property in the JavaScript declaration statement, or within the data-menuitemtag attribute on the triggering element if Bootstrapped.

Menus and submenus may be nested or broken out into separate lists within the markup if desired, as long as they are all contained within the same top level container element specified by ID within the JavaScript invocation statement, or within the data-internal attribute on the triggering element if Bootstrapped.

All menu container elements and menu item nodes must include unique ID attributes.

Submenus are mapped by combining the ID attribute of the top level menu container ID and the submenu pointer link ID, which, when combined, points to the ID of the referenced submenu container.

All menu item nodes must include innerText to ensure accessibility for screen reader users.

Don't include any ARIA attributes within the menu markup, since this is handled automatically by the Menu module.