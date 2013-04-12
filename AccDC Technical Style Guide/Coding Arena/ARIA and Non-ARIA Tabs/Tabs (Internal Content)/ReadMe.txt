As an implementation that does not use ARIA, the attributes role="tablist" and role="tab" must not be included anywhere in the markup.

Both the Tablist container element and all Tab item links must include unique ID attribute values.

The innerHTML for each Tab item link must contain a textual label, which may be positioned offscreen to hide it visually if desired.
(This textual label is necessary so that screen reader users will be able to identify the purpose of the node, and also to ensure proper feedback in iOS devices when using Voiceover.)

Images may also be used within Tab item links if desired.
(If the image is non-informative, or if it only repeats the text contained within the textual label, it should include the attribute alt="" to hide it from screen reader users.)

This implementation pulls Tab panel content from within the same page.
When loaded, the DOM node for each Tab panel container is removed from the DOM, and stored within the AccDC Object that is associated with the triggering element.
This is done to prevent ID conflicts when event handlers are applied after a Tab panel opens.

Since this implementation is not an ARIA widget, standard keyboard functionality is applied, with a standard tab order.

HTML5 "data-" attributes are used to configure specific functionality for each Tab expand/collapse link.

Available HTML5 attributes:

• data-src : The resource path and pointer to the ID attribute of the tab content container element.
If set, data-internal should be blank or not included.
• data-internal : The ID attribute of the tab panel container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-defaultopen="true" : Specifies that the referenced tab will open automatically. Only one tab per group should include this attribute. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the tab panel content. "Tab" is set by default if no value is specified. 
• data-insert : The ID attribute of the container element where tab panel content will be inserted. 

Required attributes:

• id : The unique ID of the element. This value is also registered as the ID of the individual Tab AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.    
   