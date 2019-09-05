$A.bind(window, "load", function() {
  // Create an override function to normalize the scrollIntoView animation functionality
  var scrollIntoViewOverride = function(optionNode, cbInstance) {
    // cbInstance.listboxNode is the parent role="listbox" container element
    if (cbInstance.listboxNode != cbInstance.listboxNodeLast) {
      cbInstance.listboxNodeLast = cbInstance.listboxNode;
      cbInstance.myScroller = zenscroll.createScroller(
        cbInstance.listboxNode,
        200,
        0
      );
    }

    if (cbInstance.myScroller) cbInstance.myScroller.center(optionNode);
  };

  var search = function(s) {
    if (!s) return;

    s = "https://www.google.com/search?q=" + encodeURIComponent(s);
    window.open(s);
  };

  // Create a new ARIA Combobox instance
  var myHardwareCombobox = new $A.Combobox(
    $A.getEl("devicesId"),
    $A.getEl("hardwareEdit")
  );
  myHardwareCombobox.scrollIntoView = scrollIntoViewOverride;

  // Disable auto population of default value
  myHardwareCombobox.setDefault(false);

  // Use word match instead of default left-string match
  myHardwareCombobox.setWordMatch(true);

  // Process every time a new value is saved
  myHardwareCombobox.onSelect(function(
    optionText,
    optionValue,
    comboboxElement,
    selectElement
  ) {
    comboboxElement.value = optionText;
    myHardwareCombobox.close();
    // Return the value so that the combobox doesn't open again instantly.
    return optionText;
  });

  // Logic to distinguish between touch screen devices
  if (
    !(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    )
  ) {
    // For non-touch devices, add screen reader accessible keyboard instructions
    myHardwareCombobox.setPromptText(
      "Type keywords and press the down arrow to browse available matches"
    );
    // Set a default list option display size for standard screens
    myHardwareCombobox.setSize(5);
  } else {
    // Set a default list option display size for touch screens, 3 for phones, 5 for tablets
    myHardwareCombobox.setSize(isPhone ? 3 : 5);
  }

  // Disable the offscreen Close link for mobile touch screen users
  // False/null/'' to disable, or text string such as 'Close Dropdown' to set as text.
  myHardwareCombobox.setCloseText(false);

  // Set container element to render suggestions listbox within, instead of using auto-DOM-insertion.
  myHardwareCombobox.dc.isStatic = "#autoSuggest";

  // Now fire up the newly instantiated ARIA Combobox
  myHardwareCombobox.start();

  $A.bind("#hardwareBtn", "click", function(ev) {
    search(myHardwareCombobox.combobox.value);
    ev.preventDefault();
  });
});
