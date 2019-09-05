$A.bind(window, "load", function() {
  var createMenuIcon = function(lbl, triggerObj, descId) {
    // Create a menu icon for touch screen devices to ensure accessibility for screen reader users, must have a textual label, and a triggerObj to be bound to.
    if (!lbl || !triggerObj) return;

    var a = $A.createEl(
      "a",
      {
        role: "button",
        href: "#",
        "aria-label": lbl,
        "aria-describedby": descId
      },
      {
        position: "absolute"
      },
      "menu-icon",
      $A.createEl("span")
    );

    $A.bind(a, {
      click: function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        $A.trigger(triggerObj, "popupmenu");
      }
    });
    return a;
  };

  // Configure ARIA Tabs

  $A.setTabs(
    "a.accTab",
    {
      // Set the AccDC Object to render literal content
      mode: 0,

      // Allow tabs to be toggled
      // isToggle: true,

      // Customize the Start and End boundary text keywords for screen reader users for localization if needed
      role: "Tab",
      accStart: "Start",
      accEnd: "End",

      // Customize the heading level for screen reader users (defaults to 3 if omitted)
      ariaLevel: 2,

      // Set a className that will be added to the triggering element for the currently active tab
      toggleClass: "active"

      // Any other AccDC API properties and methods can be applied here as overrides if desired
    },
    true,
    document,
    function(dc) {
      // Optional callback that runs after a tab finishes loading
      // 'this' refers to the triggering element
      // E.G alert( this.id )
      // 'dc' refers to the current AccDC Object for the tab content, so all AccDC API properties and methods apply to this object as well.
      // E.G The property dc.containerDiv provides access to the DOM node where the tab content is rendered
      // alert(dc.containerDiv.innerHTML);
    }
  );

  // Configure menu functionality

  $A.setMenu(
    "a.accTab",
    "hiddenDivId",
    "context-menu",
    function(ev, dc) {
      // Ignore menu item nodes that include aria-disabled="true" when clicked
      if ($A.getAttr(this, "aria-disabled") == "true") return false;
      else alert('Do something with this.href or id="' + this.id + '"');

      // dc.top.triggerObj is the right clicked Tab DOM node
      alert(dc.top.triggerObj.id);
    },
    true,
    document,
    {
      // Enable right click functionality
      // Automatically configures keyboard support using Shift+F10 and the Applications key
      rightClick: true,

      // Set the accessible help description that will be announced for screen reader users
      rightClickText:
        "Press Shift+F10 or the Applications key to open the popup menu",

      // Specify the menu tag name in the markup
      menuTag: "ol",

      // Specify the active element that will be used as each menu item node
      // Important, if nesting A tags within LIs, only the A tag should be used for this purpose
      // Active elements should never be nested.
      // The following tag will receive keyboard focus within the menu structure when using the arrow keys to navigate
      // Event bindings are also tied to this tag
      itemTag: "a",

      // Disable auto positioning for submenus
      autoPosition: 0,

      // Set AccDC API overrides to customize functionality
      overrides: {
        // Set inline styling that will be included within each menu instance
        // z-index is automatically incremented using +=1 for proper layering
        cssObj: {
          position: "absolute",
          zIndex: 1
        },

        // Run script while each menu is rendering, occurs before DOM insertion
        runDuring: function(dc) {
          if (dc.top == dc) {
            // Set specific styling for the parent Div if this is the top level menu instance
            // Set initial positioning before DOM insertion to prevent screen flicker from occuring
            dc.top.css({
              top:
                $A.xOffset(dc.top.triggerObj).top +
                dc.top.triggerObj.offsetHeight +
                10,
              left:
                $A.xOffset(dc.top.triggerObj).left +
                dc.top.triggerObj.offsetWidth * 0.3
            });
          } else {
            // Otherwise, set the container styling that is applied to all submenu instances
            // In this case, dc.triggerObj references the parent menu triggering element
            if (dc.triggerObj)
              dc.css({
                "margin-left": dc.triggerObj.offsetWidth / 2 + "px",
                "margin-top": -(dc.triggerObj.offsetHeight / 2) + "px"
              });
          }
        },

        // Run script after each menu finishes rendering
        runAfter: function(dc) {
          // Do other stuff after the menu is rendered
        }
      }
    }
  );

  // Create a clickable hamburger icon for touch screen device users, and bind one for each triggering element
  if ("ontouchstart" in window) {
    $A.query("a.accTab", document, function(i, tgr) {
      var mI = createMenuIcon("Open Menu", tgr, tgr.id),
        position = function() {
          $A.css(mI, {
            left: tgr.offsetLeft + tgr.offsetWidth + 3
          });
        };

      position();
      tgr.parentNode.appendChild(mI);
      $A.bind(window, "resize", position);
    });
  }
});
