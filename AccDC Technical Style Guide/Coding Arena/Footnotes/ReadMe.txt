Footnotes

Footnotes are simple control types that are easy to make accessible.

Expected behaviors: Provide a link as the footnote that jumps to the footnote text, provide a link at the footnote text that returns focus back to the triggering element (and account for multiple footnote links that lead to the same footnote text), and provide meaningful textual equivalents for screen reader users.

The Footnotes Module automates these processes by creating all necessary anchor elements, adding all related event handlers, and managing keyboard focus appropriately.

HTML Syntax

Footnote text in the body:

<span class="accFootnote" data-footnote="footnotePointer1">My body text</span>

A SPAN tag should be used to surround the word or phrase that you want to designate as a footnote within the body content.

Required attributes for Footnote SPANs in the body:

• class="accFootnote" : The class name that specifies a footnote link section to be bound.
(All footnote tags should share the same class name.)
• data-footnote : Contains the ID attribute value that points to the specified footnote text at the bottom of the page.
(More than one footnote may point to the same footnote text by using the same ID value if multiple footnotes reference the same text)

Important: When the footnotes are parsed using the class name, a numerical index link is generated and appended to the footnote SPAN tag.

By default, the inner text content is used to generate the title attribute for the associated footnote link, but this can optionally be overridden by adding the attribute data-label to the associated footnote span tag.

Example:

<span data-label="My custom tooltip" class="accFootnote" data-footnote="footnotePointer1">My body text</span>

For Footnote Text nodes in the footer:

<span id="footnotePointer1"></span>

An empty SPAN tag should be used to set the focus point of the Footnote Text node in the footer, which is where focus will be moved to when the footnote link in the body is activated.

The Footnote Text SPAN tag must be placed just before the footnote text in the source code order, since this is where the Footnote Back Link will be inserted.
(This is also where focus is moved to when a footnote link in the body is activated, which must be before the relevant footnote text, and not after.)

The Footnote Text SPAN tag must be empty, and must not surround the footnote text. Doing so will cause the inserted Back Link to appear after the footnote text, instead of before it, as expected.

Required attributes for Footnote Text SPANs in the footer:

• id="uniqueId" : The unique ID of the Footnote Text node.
(This must match the value of data-footnote so that each associated footnote link in the body will be properly bound to this focusable node in the footer.)

The following attributes are handled automatically by the Footnotes Module:

• aria-label

JavaScript invocation statement syntax:

$A.setFootnotes('.accFootnote', document, {
// Configure functionality key / value mappings
});

Parameters

The first parameter is a CSS Selector that specifies all footnote SPAN tags in the body.

The second parameter is the context DOM node where footnote SPANs will be queried using the CSS Selector declared in parameter one.
(This makes it possible to query footnotes contained within iFrame documents)

The third parameter configures footnote functionality using a key / value map.

Example:

{

// Set the tooltip text for the footnote (this will also be the accessible name for screen reader users)
fnText: 'Footnote',

// Set the footnote character or text that will comprise the visual link text for returning footnotes
fnChar: '&#8224;',

// Set the tooltip text for the footnote back links (this will also be the accessible name for screen reader users)
backText: 'Back to Footnote'

}

Styling

The sample footnotes in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled footnotes will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The footnotes within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accFootnote", then configures the same module declaration as previously described using these HTML5 attributes.

Available HTML5 attributes for footnote SPANs in the body:

• data-footnote : The ID attribute value of the matching footnote text anchor tag elsewhere in the document
(Focus will be moved to this anchor tag when the footnote link is activated)
• data-fntext : The tooltip text for the footnote
(this will also be the accessible name for screen reader users)
• data-fnchar : The footnote character or text that will comprise the visual link text for returning footnotes
• data-backtext : The tooltip text for the footnote back links
(this will also be the accessible name for screen reader users)

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes:

• class="accFootnote" : The bootstrap class name that specifies a footnote link to be bound.
(Must only be on footnote links in the body, and not upon footnote text anchors in the footer)
• id : The unique ID of the footnote text anchor tag.
(Must only be on footnote text anchors, and must match the data-footnote attribute values for associated footnote links within the body)
