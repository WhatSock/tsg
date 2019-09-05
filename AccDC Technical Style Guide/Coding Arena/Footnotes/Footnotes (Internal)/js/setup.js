$A.bind(window, "load", function() {
  // Configure the footnotes within the document

  // "accFootnote" is the class name selector that points to the Span tags within the document that are to become footnotes

  $A.setFootnotes(".accFootnote", document, {
    // Set the tooltip text for the footnote (this will also be the accessible name for screen reader users)
    fnText: "Footnote",

    // Set the footnote character or text that will comprise the visual link text for returning footnotes
    fnChar: "&#8224;",

    // Set the tooltip text for the footnote back links (this will also be the accessible name for screen reader users)
    backText: "Back to Footnote"
  });
});
