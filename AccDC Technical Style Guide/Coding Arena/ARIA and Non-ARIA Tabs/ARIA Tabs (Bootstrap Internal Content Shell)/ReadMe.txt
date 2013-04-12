This shell template includes no CSS styling for the Tablist.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other Tablists that include styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

As an ARIA widget implementation, the Tablist container element must include the attribute role="tablist", and all Tab item links must include the attribute role="tab" to ensure accessibility for screen reader users.  

Both the Tablist container element and all Tab item links must include unique ID attribute values.

The innerHTML for each Tab item link must contain a textual label, which may be positioned offscreen to hide it visually if desired.
(This textual label is necessary so that screen reader users will be able to identify the purpose of the node, and also to ensure proper feedback in iOS devices when using Voiceover.)

Images may also be used within Tab item links if desired, however, they must include the attribute alt="" to hide them from screen reader users.

To add tooltips for sighted users, use the Title attribute instead, and make sure that the tooltip text matches the text contained within the textual label if positioned offscreen to hide it visually.

This implementation pulls Tab panel content from within the same page.
When loaded, the DOM node for each Tab panel container is removed from the DOM, and stored within the AccDC Object that is associated with the triggering element.
This is done to prevent ID conflicts when event handlers are applied after a Tab panel opens.

Available HTML5 attributes:

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

Required attributes:

• role="tablist" : The ARIA role that specifies a group of tab controls. This must only be included within the element that contains all individual tabs.
• role="tab" : The ARIA role that specifies an individual tab control. To ensure accessibility, this element must not contain any other active elements.
• class="accTab" : The bootstrap class name that specifies an accessible Tab link.
• id : The unique ID of the element. This value is also registered as the ID of the individual Tab AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.    
       