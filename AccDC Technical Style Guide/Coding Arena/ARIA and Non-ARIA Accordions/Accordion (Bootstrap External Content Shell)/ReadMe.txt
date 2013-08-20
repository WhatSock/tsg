This shell template includes no CSS styling for the accordion.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other accordions that include styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

This implementation pulls accordion content from an external page.
Both markup and images are optionally preloaded for closed accordion sections, to increase speed and performance when opened.

Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

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
    