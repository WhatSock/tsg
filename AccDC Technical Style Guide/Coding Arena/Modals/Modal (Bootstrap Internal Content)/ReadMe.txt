This implementation pulls modal content from within the same page.
When loaded, the DOM node for each modal content container is removed from the DOM, and stored within the AccDC Object that is associated with the modal ID.
This is done to prevent ID conflicts when event handlers are applied after a modal opens.

Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

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

Required HTML5 attributes for the modal container element:

• data-first="true" : Must be added to the first focusable active element within the modal to control circular tabbing and shift+tabbing.
• data-last="true" : Must be added to the last focusable active element within the modal to control circular tabbing and shift+tabbing.

Also, when Implementing a Close link or button, the className must match the "closeClassName" property within the JavaScript invocation statement.
(If not explicitly set, the default value "lbClose" will be set by default, and should be used for all Close links or buttons)
Doing so will automatically bind the AccDC Close Methods with this element, and return keyboard focus properly when the AccDC Object is closed.

To prevent possible accessibility issues for screen reader users, do not use role="dialog" or role="application" within the markup.