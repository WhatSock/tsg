This shell template includes no CSS styling for the accordion.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other accordions that include styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

This implementation pulls accordion content from an external page.
Both markup and images are optionally preloaded for closed accordion sections, to increase speed and performance when opened.

HTML5 "data-" attributes are used to configure specific functionality for each accordion expand/collapse link.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the accordion content container element.
If set, data-internal should be blank or not included. 
• data-internal : The ID attribute of the accordion content container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-defaultopen="true" : Specifies that the referenced accordion node will open automatically. Only one accordion node per group should include this attribute. 
• data-insert : The ID attribute of the container element where accordion node content will be inserted. The referenced container element must not be included within the accordion link node. 

Required attributes for the triggering element:

• id : The unique ID of the element. This value is also registered as the ID of the individual accordion node AccDC Object, making it possible to invoke
the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.    
    