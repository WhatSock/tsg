This implementation pulls tooltip content from within the same page.
When loaded, the DOM node for each tooltip content container is removed from the DOM, and stored within the AccDC Object that is associated with the tooltip ID.
This is done to prevent ID conflicts when event handlers are applied after a tooltip opens.

Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

Available HTML5 attributes for the triggering element:

• data-src : The resource path and pointer to the ID attribute of the tooltip container element.
If set, data-internal should be blank or not included.
• data-internal : The ID attribute of the tooltip container element within the same document.
If data-internal is set, data-src should be blank or not included. 
• data-role : The role name that is conveyed to screen reader users as beginning and ending boundary text for the new content. "Tooltip" is set by default if no value is specified. 
• data-autoposition : The autoPosition override, which dynamically positions the new content relative to the triggering element. This reflects the autoPosition property documented within AccDC, and may be a value between 0 and 12. The default is 3 if left blank or not included. 
• data-offsetleft : The offsetLeft override, which dynamically positions the new content relative to the triggering element. The default is 10 if left blank or not included. 
• data-offsettop : The offsetTop override, which dynamically positions the new content relative to the triggering element. The default is 0 if left blank or not included.  

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes for the triggering element:

• class="accTooltip" : The bootstrap class name that specifies an accessible tooltip.  
• id : The unique ID of the element. This value is also registered as the ID of the Tooltip AccDC Object, making it possible to invoke the object programmatically.
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.    

When an A tag is used as the triggering element, it must adhere to the following:
1. If the element contains no link text and no Img element, then the link should include an informative Title attribute. (This is only valid if there is no link text at all)
2. If the element contains an Img tag and no link text, then the Img tag should include an informative Alt attribute and Title attribute, both of which should match.
3. The A tag must include an Href attribute, to ensure keyboard accessibility.
