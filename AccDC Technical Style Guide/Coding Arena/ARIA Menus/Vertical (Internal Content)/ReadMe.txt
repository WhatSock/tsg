This implementation pulls menu content from within the same page.
When loaded, the DOM node for each menu container is removed from the DOM, and stored within the AccDC Object that is associated with the menu ID.
This is done to prevent ID conflicts when event handlers are applied after a menu opens.

The lists can be set to any tag, such as OL, UL, etc, as long as this is specified in the menuTag property within the JavaScript declaration statement or within the data-menutag attribute on the triggering element if Bootstrapped.

The same is true for the menu item nodes, which is specified using the menuItemTag property in the JavaScript declaration statement, or within the data-menuitemtag attribute on the triggering element if Bootstrapped.

Menus and submenus may be nested or broken out into separate lists within the markup if desired, as long as they are all contained within the same top level container element specified by ID within the JavaScript invocation statement, or within the data-internal attribute on the triggering element if Bootstrapped.

All menu container elements and menu item nodes must include unique ID attributes.

Submenus are mapped by combining the ID attribute of the top level menu container ID and the submenu pointer link ID, which, when combined, points to the ID of the referenced submenu container.

All menu item nodes must include innerText to ensure accessibility for screen reader users.

Don't include any ARIA attributes within the menu markup, since this is handled automatically by the Menu module.