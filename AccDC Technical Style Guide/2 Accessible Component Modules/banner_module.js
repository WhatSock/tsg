/*!
Banner Module R1.3
Copyright 2010-2016 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function() {
  $A.setBanner = function(overrides) {
    if (overrides && !overrides.id) overrides.id = $A.genId();

    // Banner AccDC Object declaration
    $A(
      [overrides],
      {
        role: "Banner",
        // Set the mode to pull content from a resource path
        mode: 1,
        isStatic: "body",
        // Choose to prepend the AccDC Object instead of replacing prior content
        prepend: true,
        // Set returnFocus to false because there is no triggering element
        returnFocus: false,
        // Open the AccDC Object onLoad
        autoStart: true,
        accStart: "Start",
        accEnd: "End",
        accClose: "Close",
        // Fix positioning to the bottom middle of the viewport
        autoFix: 5,
        allowCascade: true,
        runDuring: function(dc) {
          // Set a resize event so that auto positioning will be recalculated automatically
          $A.bind(window, "resize.banner", function() {
            dc.applyFix();
          });
          $A.setAttr(dc.accDCObj, {
            role: "complementary"
          });

          dc.fn.sraStart.innerHTML = dc.fn.sraEnd.innerHTML = "";
          $A.setAttr(dc.fn.sraStart, {
            "aria-hidden": "true"
          });

          $A.setAttr(dc.fn.sraEnd, {
            "aria-hidden": "true"
          });
        },
        announce: true,
        runAfterClose: function(dc) {
          // Remove dynamically added resize event
          $A.unbind(window, ".banner");
        },
        // Set a className for the AccDC Object
        className: "banner",
        closeClassName: "bClose"
      },
      true
    );

    // Return the new banner AccDC Object ID
    return overrides.id;
  };
})();
