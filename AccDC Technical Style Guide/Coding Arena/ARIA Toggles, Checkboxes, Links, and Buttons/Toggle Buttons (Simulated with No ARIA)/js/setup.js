$A.bind(window, "load", function() {
  // Set the Toggle for the A tag with id="a1"

  var standardA1 = new $A.Toggle("a1", {
    // Disable ARIA
    noARIA: true,

    // Set the role and state text for screen reader users
    roleText: "Toggle Button",
    stateText: "Pressed",

    // Set the initial state
    state: false,

    // Declare a callback to run every time the state changes
    callback: function(state) {
      // 'this' is the triggering element

      $A.getEl("a1mirror").checked = state ? "checked" : false;

      // Return true to accept the ARIA state change, or false to prevent
      return true;
    }
  });

  $A.bind("#a1mirror", "change", function(ev) {
    standardA1.set(this.checked);
  });

  // Set the Toggle for the A tag with id="a2"

  var standardA2 = new $A.Toggle("a2", {
    noARIA: true,
    roleText: "Toggle Button",
    stateText: "Pressed",
    state: false,
    callback: function(state) {
      $A.getEl("a2mirror").checked = state ? "checked" : false;

      // Return true to accept the ARIA state change, or false to prevent
      return true;
    }
  });

  $A.bind("#a2mirror", "change", function(ev) {
    standardA2.set(this.checked);
  });

  // Set the Toggle for the A tag with id="a3"

  var standardA3 = new $A.Toggle("a3", {
    noARIA: true,
    roleText: "Toggle Button",
    stateText: "Pressed",
    state: true,
    callback: function(state) {
      if (state) {
        $A.addClass(this, "pressed");
        $A.remClass($A.getEl("helpSect1"), "hidden");
      } else {
        $A.remClass(this, "pressed");
        $A.addClass($A.getEl("helpSect1"), "hidden");
      }

      // Return true to accept the ARIA state change, or false to prevent
      return true;
    }
  });
});
