This shell template includes no CSS styling for the banner.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other banners that include styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

This implementation pulls banner content from an external page.

Available HTML5 attributes:

• data-src : The resource path and pointer to the ID attribute of the banner container element. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the new content. "Banner" is set by default if no value is specified. 

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes:

• class="accBanner" : The bootstrap class name that specifies a banner insertion point container.
• id : The unique ID of the element. This value is also registered as the ID of the banner AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.        
       