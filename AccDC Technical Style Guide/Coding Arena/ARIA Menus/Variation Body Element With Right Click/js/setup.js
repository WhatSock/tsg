$A.bind(window, "load", function() {
  // Configure menu functionality

  $A.setMenu(
    "body",
    "hiddenDivId",
    "context-menu",
    function(ev, dc) {
      // Ignore menu item nodes that include aria-disabled="true" when clicked
      if ($A.getAttr(this, "aria-disabled") == "true") return false;
      else alert('Do something with this.href or id="' + this.id + '"');
    },
    true,
    document,
    {
      // Enable right click functionality
      // Automatically configures keyboard support using Shift+F10 and the Applications key
      rightClick: true,

      // Specify the menu tag name in the markup
      menuTag: "ol",

      // Specify the active element that will be used as each menu item node
      // Important, if nesting A tags within LIs, only the A tag should be used for this purpose
      // Active elements should never be nested.
      // The following tag will receive keyboard focus within the menu structure when using the arrow keys to navigate
      // Event bindings are also tied to this tag
      itemTag: "a",

      // Disable auto positioning
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
          var page = function(e) {
            var posx = 0,
              posy = 0;

            if (e.pageX || e.pageY) {
              posx = e.pageX;
              posy = e.pageY;
            } else if (e.clientX || e.clientY) {
              posx =
                e.clientX +
                document.body.scrollLeft +
                document.documentElement.scrollLeft;
              posy =
                e.clientY +
                document.body.scrollTop +
                document.documentElement.scrollTop;
            }
            return {
              x: posx,
              y: posy
            };
          };

          // Set specific styling for the parent Div if this is the top level menu instance
          // Set initial positioning before DOM insertion to prevent screen flicker from occuring
          if (dc.top == dc) {
            var pos = page(dc.event);

            dc.top.css({
              position: "fixed",
              top: pos.y,
              left: pos.x
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
          // Do other stuff after the menu finishes rendering
          $A.query("#-back, #-forward", dc.containerDiv, function(i, e) {
            $A.setAttr(e, "aria-disabled", "true");
          });
        }
      }
    }
  );
});
