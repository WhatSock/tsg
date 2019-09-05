$A.bind(window, "load", function() {
  // Set the Sortable ARIA Listbox

  var sortableListbox = new $A.Listbox("sortableLB", {
    label: "Rearange the colors",
    defaultIndex: 0,
    isSortable: true, // The Spacebar can be used to toggle grabbing and dropping when true
    allowDelete: false, // The Delete key will remove the selected item when true

    // Help messages that are announced to screen reader users
    grabInstruct:
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
        ? "Double tap to grab"
        : "Press Space to grab",
    dropInstruct:
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
        ? "Double tap to drop"
        : "Press Space to drop",
    grabMsg: "Grabbed",
    dropMsg: "Moved",
    cancelDrop: "Grab canceled",
    callback: function(sNode, cNodes) {
      // Do stuff when an item is moved to or activated
    }
  });
});
