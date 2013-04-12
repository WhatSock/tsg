Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

Available HTML5 attributes:

• data-footnote : The ID attribute value of the matching footnote text anchor tag elsewhere in the document (Focus will be moved to this anchor tag when the footnote link is activated)
• data-fntext : The tooltip text for the footnote (this will also be the accessible name for screen reader users)
• data-fnchar : The footnote character or text that will comprise the visual link text for returning footnotes
• data-backtext : The tooltip text for the footnote back links (this will also be the accessible name for screen reader users)

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes:

• class="accFootnote" : The bootstrap class name that specifies a footnote link to be bound. (Must only be on footnote links, and not upon footnote text anchors)
• id : The unique ID of the footnote text anchor tag. (This must match the data-footnote attribute values for associated footnote links within the body)