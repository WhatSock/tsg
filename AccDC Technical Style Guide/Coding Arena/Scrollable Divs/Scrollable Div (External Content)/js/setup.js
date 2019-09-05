$A.bind(window, "load", function() {
  // Syntax: $A.makeScrollable( scrollableDivDOM_Node , msgForScreenReaderUsers );

  $A.makeScrollable($A.getEl("scrollPane"), "Scrollable Region");

  // Now, let's configure the loading of new content

  $A.bind("#btn1, #btn2, #btn3", "click", function(ev) {
    var id = this.id,
      scene = "files/pages/";

    if (id == "btn1") scene += "act-i.htm #scene1";
    else if (id == "btn2") scene += "act-i.htm #scene2";
    else if (id == "btn3") scene += "act-i.htm #scene3";

    // Load the new content
    $A.load("#scrollPane", scene, function() {
      // Announce the content change to screen reader users
      $A.announce("Content Loaded");
    });

    ev.preventDefault();
  });
});
