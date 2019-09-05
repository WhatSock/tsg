$A.bind(window, "load", function() {
  // Syntax: $A.makeScrollable( scrollableDivDOM_Node , msgForScreenReaderUsers );

  $A.makeScrollable($A.getEl("scrollPane"), "Scrollable Region");
});
