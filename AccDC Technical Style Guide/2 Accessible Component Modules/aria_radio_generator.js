/*!
ARIA Radio Generator R2.3
Copyright 2010-2016 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

(function() {
  // Send an ID or DOM node as the radioGroupObj parameter, set the CSS Selector for all child radio elements, set the default selection index value, specify the legend text, and define a callback function
  // Set defaultRadioVal to -1 to prevent a default selection from being made automatically
  $A.RadioGroup = function(
    radioGroupObj,
    selector,
    defaultRadioVal,
    legendText,
    callback
  ) {
    var rgo =
        typeof radioGroupObj === "string"
          ? document.getElementById(radioGroupObj)
          : radioGroupObj,
      track = {},
      that = this,
      select = function(index, force) {
        if (isNaN(index)) index = 0;

        for (var i = 0; i < that.radios.length; i++)
          $A.setAttr(that.radios[i], {
            tabindex: "-1",
            // 'aria-selected': 'false',
            "aria-checked": "false"
          });

        $A.setAttr(that.radios[index], {
          tabindex: "0",
          // 'aria-selected': 'true',
          "aria-checked": "true"
        });

        if (force) that.radios[index].focus();
        that.value = that.radios[index].id;
        that.index = index;

        if (callback && typeof callback === "function")
          callback.apply(that, [that.radios[index], that.radios]);
      };

    $A.setAttr(rgo, "aria-label", legendText);
    var ids = [];
    that.radios = $A.query(selector, rgo, function(i, o) {
      track[o.id] = i;
      track.max = i + 1;
      $A.setAttr(o, {
        tabindex: i === 0 && defaultRadioVal === -1 ? "0" : "-1",
        // 'aria-selected': 'false',
        "aria-checked": "false",
        "aria-posinset": track.max
      });

      ids.push(o.id);
    });
    $A.setAttr(rgo, "aria-owns", ids.join(" "));

    for (var i = 0; i < that.radios.length; i++)
      $A.setAttr(that.radios[i], "aria-setsize", track.max);

    $A.unbind(that.radios, "click keydown");

    $A.bind(that.radios, {
      click: function(ev) {
        select(track[this.id]);
        ev.preventDefault();
      },
      keydown: function(ev) {
        var k = ev.which || ev.keyCode;

        if (k == 37 || k == 38) {
          ev.preventDefault();
          ev.stopPropagation();

          if (isNaN(that.index)) that.index = 0;

          if (that.index > 0) select(that.index - 1, true);
          else select(track.max - 1, true);
        } else if (k == 39 || k == 40) {
          ev.preventDefault();
          ev.stopPropagation();

          if (isNaN(that.index)) that.index = 0;

          if (that.index < track.max - 1) select(that.index + 1, true);
          else select(0, true);
        } else if (k == 13 || k == 32) {
          ev.preventDefault();
          ev.stopPropagation();

          $A.trigger(this, "click");
        }
      }
    });

    that.set = function(index) {
      if (
        (typeof index === "string" && !index) ||
        (typeof index === "number" && index < 0) ||
        typeof index === "object"
      )
        return;

      select(typeof index === "string" ? track[index] : index);
    };

    if (defaultRadioVal !== -1)
      select(isNaN(defaultRadioVal) ? 0 : defaultRadioVal);
  };
})();
