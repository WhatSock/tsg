$A.bind(window, "load", function() {
  // Set the ARIA Tree control

  var treeId = $A.setTree({
    // Set the XML file to parse
    path: "files/tree.xml",

    // Set the label that will be announced to screen reader users
    title: "Informative Field Name",

    // Specify the container element where the tree nodes will be inserted
    container: "div.tree",

    // Set the class name shared by all tree AccDC Objects when rendered
    topClass: "TreeView",

    // Set the container tree node type
    treeTag: "ul",

    // Set the divider node type that will be appended to treeTag
    dividerTag: "li",

    // Set the focusable tree item node type that will be inserted within dividerTag
    treeItemTag: "a",

    // Set the shared class name for all tree items that expand into subfolders
    treeClass: "branch",

    // Set the shared class name for all tree items that do not expand into subfolders
    treeItemClass: "leaf",

    // Set the class name that is only set on the tree item node that has focus
    selectClass: "selected",

    // Set the handler type that will trigger the callback
    bind: "click",

    // Declare a callback function
    callback: function(ev, dc) {
      // Get the XML node that matches the ID attribute of the currently triggered element
      var xmlNode = $A.query("#" + this.id, dc.top.xmlDocument)[0];

      // To learn more about the XML DOM and supported properties and methods,
      // and how to access custom attributes on each node, visit
      // http://www.w3schools.com/dom/default.asp
    }
  });
});
