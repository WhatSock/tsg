/*!
Modal Module R1.11
Copyright 2020 Bryan Garaventa (WhatSock.com)
Refactoring Contributions Copyright 2018 Danny Allen (dannya.com) / Wonderscore Ltd (wonderscore.co.uk)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function() {
  var openModals = [];

  $A.setModal = function(overrides) {
    if (overrides && !overrides.id) overrides.id = $A.genId();

    // Preload external content to prevent rendering delays
    // This can be overridden by setting mode to 0 or greater in the overrides argument
    if (typeof overrides.mode !== "number")
      overrides.source = (function() {
        var d = $A.createEl("div");
        $A.load(d, overrides.source);
        return d;
      })();

    // Modal AccDC Object declaration
    $A(
      [overrides],
      {
        // Set the role for screen reader users
        role: "Dialog",
        bind: "click",
        // Force focus to the beginning of the new content section when rendered
        forceFocus: true,
        // Set the container element where the AccDC Object will be inserted
        isStatic: "body",
        // Choose to append the AccDC Object instead of replacing prior content
        append: true,
        showHiddenBounds: false,
        accClose: "Close",
        // Fix the visual positioning to the middle center of the viewport
        autoFix: 9,
        allowCascade: true,

        // Run script while the AccDC Object loads
        runDuring: function(dc) {
          $A.query("body > *", function() {
            $A.setAttr(this, "aria-hidden", "true");
          });
          $A.addClass(dc.containerDiv, "containerDiv");
          $A.setAttr(dc.containerDiv, "tabindex", "-1");
          dc.firstField =
            $A.query('*[data-first="true"]', dc.containerDiv)[0] ||
            dc.containerDiv;
          dc.lastField = $A.query('*[data-last="true"]', dc.containerDiv)[0];

          if (overrides.ariaDialog) {
            $A.setAttr(dc.accDCObj, {
              role: "dialog",
              "aria-label": dc.role,
              "aria-modal": "true"
            });
            var desc = "";
            $A.query("*[data-description]", dc.containerDiv, function(i, o) {
              if (!o.id) o.id = $A.genId();
              desc += (desc ? " " : "") + o.id;
            });
            if (desc) $A.setAttr(dc.accDCObj, "aria-describedby", desc);
          } else {
            $A.setAttr(dc.accDCObj, {
              role: "region",
              "aria-label": dc.role
            });
          }
        },

        // Run script after the AccDC Object finishes loading
        runAfter: function(dc) {
          if (!openModals.length) {
            $A.bind(window, "resize.accmodal", function(ev) {
              dc.reposition();
            });
            $A.bind("body", "focusin.accmodal", function(ev) {
              if (openModals[openModals.length - 1].tempFocus)
                openModals[openModals.length - 1].tempFocus = null;
              else if (openModals[openModals.length - 1].lastField)
                openModals[openModals.length - 1].lastField.focus();
            });
          }

          openModals.push(dc);

          if (overrides.alertDialog) $A.announce(dc.containerDiv, false, true);
        },

        // Run script before the AccDC Object closes
        runBeforeClose: function(dc) {
          openModals.pop();

          if (!openModals.length) {
            $A.unbind(window, ".accmodal");
            $A.unbind("body", ".accmodal");
          }

          if (openModals.length) {
            $A.setAttr(
              openModals[openModals.length - 1].accDCObj,
              "aria-hidden",
              "false"
            );
            $A.remAttr(
              openModals[openModals.length - 1].accDCObj,
              "aria-hidden"
            );
          } else {
            $A.query("body > *", function() {
              $A.setAttr(this, "aria-hidden", "false");
              $A.remAttr(this, "aria-hidden");
            });
          }

          // To prevent memory leaks in Dojo/MooTools, unbind all other event handlers within the modal
          $A.query("*", dc.containerDiv, function(i, o) {
            $A.unbind(o, "*");
          });
        },

        reposition: function(callbackFn) {
          if (!openModals.length) {
            return false;
          }

          if (openModals[openModals.length - 1].autoFix)
            openModals[openModals.length - 1].applyFix();
          else if (openModals[openModals.length - 1].autoPosition)
            openModals[openModals.length - 1].setPosition();

          // Run custom specified function?
          if (typeof callbackFn === "function") {
            callbackFn(openModals[openModals.length - 1]);
          }

          return true;
        },

        // Set a localized focusIn handler on the AccDC Object to control circular tabbing
        focusIn: function(ev, dc) {
          // dc.tempFocus will bubble up to the body focusIn handler to verify if focus is still within the AccDC Object or not
          dc.tempFocus = this;
        },
        tabOut: function(ev, dc) {
          // Move to the first form field if tabbing forward out of the AccDC Object
          if (dc.firstField) dc.firstField.focus();
        },
        // Add a keyDown handler to the AccDC Object
        keyDown: function(ev, dc) {
          var k = ev.which || ev.keyCode;

          // If Escape is pressed, close the modal
          if (k == 27) dc.close();
        },
        // Set the className for the close link, must match the className for any other close links in the rendered content
        // AccDC Object close functionality is automatically configured
        closeClassName: "lbClose",
        className: "modal"
      },
      true
    );

    // Return the new modal AccDC Object ID
    return overrides.id;
  };
})();
