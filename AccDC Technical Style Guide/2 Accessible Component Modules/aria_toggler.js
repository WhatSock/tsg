/*!
Toggle Generator R2.4
Copyright 2010-2018 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License

To avoid backwards compatible screen reader support issues, ARIA Toggle and ARIA Checkbox Rules :
IMG : Use aria-label to set screen reader text.
INPUT : Use both aria-label and Title to set screen reader text.
All tags that support innerHTML: Use innerText (whether offscreen or visible) to set screen reader text.
Image links (A tag with embedded IMG): Use innerText and add alt="" to the IMG tag to set screen reader text. (This is required for iOS support using Voiceover)
	*/

(function() {
  $A.Toggle = function(trigger, config) {
    var config = config || {},
      t = typeof trigger === "string" ? $A.getEl(trigger) : trigger,
      that = this,
      tRole = $A.getAttr(t, "role"),
      isCheckbox = tRole == "checkbox" || tRole == "switch" ? true : false,
      sraText = $A.createEl("span", null, $A.sraCSS),
      sAP = config.suppressARIAPressed ? true : false;

    if (!config.noToggle && config.noARIA) {
      if (!config.roleText) config.roleText = "Toggle";

      if (!config.stateText) config.stateText = "Pressed";

      t.appendChild(sraText);
    }

    var toggle = function(state) {
      var cr = true;

      if (config.callback && typeof config.callback === "function")
        cr = config.callback.apply(t, [state]);

      if (cr) {
        if (!config.noToggle && config.noARIA)
          sraText.innerHTML = state
            ? "&nbsp;" + config.roleText + "&nbsp;" + config.stateText
            : "&nbsp;" + config.roleText;
        else if (!config.noToggle) {
          if (!sAP)
            $A.setAttr(
              t,
              isCheckbox ? "aria-checked" : "aria-pressed",
              state ? "true" : "false"
            );
        }
        that.state = state;
      }
    };
    var nn = t.nodeName.toLowerCase();

    if (
      !(
        (nn == "input" &&
          ($A.getAttr(t, "type") == "button" ||
            $A.getAttr(t, "type") == "image")) ||
        (nn == "a" && $A.getAttr(t, "href")) ||
        nn == "button"
      )
    )
      $A.setAttr(t, "tabindex", "0");

    $A.unbind(t, "click keydown");

    $A.bind(t, {
      keydown: function(ev) {
        var k = ev.which || ev.keyCode;

        if (k == 13 || k == 32) {
          ev.preventDefault();
          ev.stopPropagation();

          if (
            !(
              t.nodeName.toLowerCase() == "input" &&
              t.type == "image" &&
              k == 32
            )
          )
            $A.trigger(t, "click");
        }
      },
      click: function(ev) {
        toggle.apply(t, [that.state ? false : true]) ? true : false;
        ev.preventDefault();
      }
    });
    that.set = function(state) {
      toggle.apply(t, [state]);
    };

    if (!config.noToggle) toggle.apply(t, [config.state ? true : false]);
  };
})();
