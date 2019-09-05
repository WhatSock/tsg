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
        $A.trigger(triggerObj, "popupmenu");
        ev.stopPropagation();
        ev.preventDefault();
      }
    });
    return a;
  };

  // Set the ARIA Tree control

  var treeId = $A.setTree({
    // Set the XML file to parse
    path: "files/tree.xml",

    // Set the label that will be announced to screen reader users
    title: "Browse Hamlet, by William Shakespeare",

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
      // Only perform this action on tree items that are not subfolder nodes
      if ($A.hasClass(this, "leaf")) {
        // Check for duplicate classes and then add a custom class for the currently active tree node
        $A.query("a.leaf.active", dc.top.accDCObj, function(i, o) {
          $A.remClass(o, "active");
        });
        $A.addClass(this, "active");

        // Get the XML node that matches the ID attribute of the currently triggered element
        var xNode = $A.query("#" + this.id, dc.top.xmlDocument)[0],
          // Then store the 'load' attribute value set on this XML node
          loadVal = xNode.attributes.getNamedItem("load").value;

        // To learn more about the XML DOM and supported properties and methods, visit
        // http://www.w3schools.com/dom/default.asp

        // Now load the page content specified in loadVal and put it within the container with id="book"
        $A.load("#book", loadVal, function(
          responseText,
          textStatus,
          XMLHttpRequest
        ) {
          // After the new content is loaded, do the following:

          // Confirm that processing is complete by announcing a status message to screen reader users
          $A.announce("Content Loaded");
        });
      }
    },

    // Configure AccDC API overrides that will apply to all group AccDC Objects when rendered
    overrides: {
      runAfter: function(dc) {
        // Configure menu functionality

        $A.setMenu(
          "a.leaf",
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
          dc.containerDiv,
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
                // Set specific styling for the parent Div if this is the top level menu instance
                // Set initial positioning before DOM insertion to prevent screen flicker from occuring
                if (dc.top == dc) {
                  dc.top.css({
                    top:
                      $A.xOffset(dc.top.triggerObj).top +
                      dc.top.triggerObj.offsetHeight / 2,
                    left:
                      $A.xOffset(dc.top.triggerObj).left +
                      dc.top.triggerObj.offsetWidth * 0.7
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

        if (!("ontouchstart" in window))
          $A.addClass($A.query("a.leaf", dc.containerDiv), "css-arrow");

        // Create a clickable hamburger icon for touch screen device users, and bind one for each triggering element
        if ("ontouchstart" in window) {
          dc.eventNS = ".e" + $A.genId();
          $A.query("a.leaf", dc.containerDiv, function(i, tgr) {
            var mI = createMenuIcon("Open Menu", tgr, tgr.id),
              position = function() {
                $A.css(mI, {
                  top: tgr.offsetHeight,
                  left: tgr.offsetWidth + 5
                });
              };

            position();
            tgr.parentNode.appendChild(mI);
            $A.bind(window, "resize" + dc.eventNS, position);
          });
        }
      },
      runBeforeClose: function(dc) {
        if ("ontouchstart" in window) $A.unbind(window, dc.eventNS);
      }
    }
  });

  // Set the container element with id="book" to be accessible for keyboard only users
  $A.makeScrollable($A.getEl("book"));
});
