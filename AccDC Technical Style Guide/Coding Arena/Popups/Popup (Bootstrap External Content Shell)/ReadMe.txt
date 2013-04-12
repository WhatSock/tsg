This shell template includes limitted CSS styling for the popup.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other popups that include additional styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

This implementation pulls popup content from an external page.
Markup preloading is used to maximize speed and performance.

Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

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

When Implementing a Close link or button, the className must match the "closeClassName" property within the JavaScript invocation statement.
(If not explicitly set, the default value "popupClose" will be set by default, and should be used for all Close links or buttons)
Doing so will automatically bind the AccDC Close Methods with this element, and return keyboard focus properly when the AccDC Object is closed.

To prevent possible accessibility issues for screen reader users, do not use role="dialog" or role="application" within the markup.