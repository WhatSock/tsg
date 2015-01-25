This implementation pulls menu content from an external page.
Markup preloading is used to maximize speed and performance.

Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the top level menu list.
If pointing to a menu list within the same document, only the ID attribute should be included here. 
• data-internal : The ID attribute of the container element for all menu lists within the same document.
If data-src is set to an external source, data-internal should be blank or not included. 

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

HTML5 attributes that can optionally be added to the menu list container tag markup:

1. data-horizontal="true"/"false" : Sets or unsets a horizontal flyout menu where the Left and Right arrow keys will be used to navigate menu item nodes, and Up and Down will be used to close or open submenus. This temporarily overrides the interaction model set within the JavaScript declaration statement.

2. data-offsetleft=<number> : Specifies a positive or negative offsetLeft value that will be applied to the menu after it is rendered.

3. data-offsettop=<number> : Specifies a positive or negative offsetTop value that will be applied to the menu after it is rendered.

4. data-autoposition=<number between 0 and 12> : Specifies a custom autoPosition value that will control where the menu is visually positioned relative to the triggering element.
• 0: Disabled 
• 1: Above/Center/Left Edge Aligned 
• 2: Above/Right/Right Edge Aligned 
• 3: Level/Right/Right Edge Aligned 
• 4: Below/Right/Right Edge Aligned 
• 5: Below/Center/Left Edge Aligned 
• 6: Below/Left/Left Edge Aligned 
• 7: Level/Left/Left Edge Aligned 
• 8: Above/Left/Left Edge Aligned 
• 9: Level/Center/Left Edge Aligned 
• 10: Above/Center/Right Edge Aligned 
• 11: Level/Center/Right Edge Aligned 
• 12: Below/Center/Right Edge Aligned  

The lists can be set to any tag, such as OL, UL, etc, as long as this is specified in the menuTag property within the JavaScript declaration statement or within the data-menutag attribute on the triggering element if Bootstrapped.

The same is true for the menu item nodes, which is specified using the menuItemTag property in the JavaScript declaration statement, or within the data-menuitemtag attribute on the triggering element if Bootstrapped.

Menus and submenus may be nested or broken out into separate lists within the markup if desired, as long as they are all contained within the same top level container element specified by ID within the JavaScript invocation statement, or within the data-internal attribute on the triggering element if Bootstrapped.

All menu container elements and menu item nodes must include unique ID attributes.

Submenus are mapped by combining the ID attribute of the top level menu container ID and the submenu pointer link ID, which, when combined, points to the ID of the referenced submenu container.

All menu item nodes must include innerText to ensure accessibility for screen reader users.

Don't include any ARIA attributes within the menu markup, since this is handled automatically by the Menu module.