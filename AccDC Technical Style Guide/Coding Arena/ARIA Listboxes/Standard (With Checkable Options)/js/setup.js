$A.bind(window, "load", function() {
  // Set the Standard ARIA Listbox

  var standardListbox = new $A.Listbox($A.getEl("standardLB"), {
    defaultIndex: 2,
    label: "Pick a number",
    callback: function(optionNode, optionsArray) {
      // Toggle the class "selected"
      $A.query(optionsArray, function(i, o) {
        if (o == optionNode) $A.addClass(o, "selected");
        else $A.remClass(o, "selected");
      });
      // Set the Standard Select Field to match this.val()
      $A.getEl("standardSelect").value = this.val();
    }
  });

  // Enable mixed checkable state toggling for each option node in the listbox

  $A.query(standardListbox.options, function(i, o) {
    $A.setAttr(o, "aria-checked", "false");
    var changeCheckedState = function(o) {
      var checked = $A.getAttr(o, "aria-checked"),
        change = "";

      if (checked == "false") change = "mixed";
      else if (checked == "mixed") change = "true";
      else change = "false";
      $A.setAttr(o, "aria-checked", change);
      // Do something else with the updated checked state here if desired
    };
    $A.bind(o, {
      click: function(ev) {
        changeCheckedState(o);
        ev.preventDefault();
      },
      keydown: function(ev) {
        var k = ev.which || ev.keyCode;

        if (k == 32) {
          changeCheckedState(o);
          ev.preventDefault();
        }
      }
    });
  });

  // Bind the standard Select field with the Standard ARIA Listbox

  $A.bind("#standardSelect", "change blur", function(ev) {
    // Set the Standard ARIA Listbox to match this.value
    standardListbox.val(this.value);
  });
});
