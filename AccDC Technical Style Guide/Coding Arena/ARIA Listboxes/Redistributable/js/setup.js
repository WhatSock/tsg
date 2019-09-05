$A.bind(window, "load", function() {
  // Set the Cart ARIA Listbox

  var movable1Listbox = new $A.Listbox("move1LB", {
    // Set the CSS selector that identifies list item node elements within the parent List container
    selector: "li > a",

    // Set the screen reader accessible label text
    label: "Cart",

    // Set the default index for the list
    defaultIndex: 0,

    // Enable multiselect
    isMultiselect: true,

    // Declare a callback that is executed every time a new list item is selected
    callback: function(sNode, cNodes) {
      // Optionally do stuff when an item is moved to or activated
    }
  });

  // Set the Basket ARIA Listbox

  var movable2Listbox = new $A.Listbox("move2LB", {
    selector: "li > a",
    label: "Basket",
    defaultIndex: 0,
    isMultiselect: true,
    callback: function(sNode, cNodes) {
      // Optionally do stuff when an item is moved to or activated
    }
  });

  // Add an event binding to move items from one list to the other

  $A.bind("#addBtn", "click", function(ev) {
    // Remove the selected DOM nodes from the first ARIA Listbox, and store them in 'nodes'
    // This is an array of A tags
    var nodes = movable1Listbox.rem(movable1Listbox.val());

    // Now add the removed nodes to the second ARIA Listbox
    movable2Listbox.add(nodes);

    // Announce the content change to screen reader users
    if (nodes && nodes.length) $A.announce("Items Added");
  });

  // Set an event binding on the Remove button to perform the reverse action

  $A.bind("#remBtn", "click", function(ev) {
    var nodes = movable2Listbox.rem(movable2Listbox.val());
    movable1Listbox.add(nodes);

    if (nodes && nodes.length) $A.announce("Items Removed");
  });
});
