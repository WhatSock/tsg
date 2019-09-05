/*!
ARIA Footnote Generator Module R2.6
Copyright 2019 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function() {
  var base = "footnotes" + $A.genId();
  $A[base] = {};
  $A[base + "a"] = {};

  $A.setFootnotes = function(selector, context, config) {
    var config = config || {},
      fnChar = config.fnChar || "&#8224;",
      fnText = config.fnText || "Footnote",
      backText = config.backText || "Back to Footnote",
      pair = {},
      context = context || document;

    $A.query(selector, context, function(i, o) {
      var fnId = $A.getAttr(o, "data-footnote"),
        index = i;

      if (!pair[fnId])
        pair[fnId] = {
          fns: [],
          last: 0,
          name: $A.getAttr(o, "data-label") || $A.getText(o),
          targ: $A.getEl(fnId)
        };

      if (
        $A[base][base + fnId + i] &&
        $A[base][base + fnId + i].nodeType === 1 &&
        $A[base][base + fnId + i].parentNode
      ) {
        $A[base][base + fnId + i].parentNode.removeChild(
          $A[base][base + fnId + i]
        );
        delete $A[base][base + fnId + i];
      }

      if (
        $A[base + "a"][base + fnId + i] &&
        $A[base + "a"][base + fnId + i].nodeType === 1 &&
        $A[base + "a"][base + fnId + i].parentNode
      ) {
        $A[base + "a"][base + fnId + i].parentNode.removeChild(
          $A[base + "a"][base + fnId + i]
        );
        delete $A[base + "a"][base + fnId + i];
      }

      var a = ($A[base][base + fnId + i] = $A.createEl(
        "a",
        {
          id: base + fnId + i,
          href: "#",
          title: $A.getAttr(o, "data-label") || $A.getText(o),
          "aria-label": fnText + (i + 1)
        },
        null,
        null,
        $A.createEl(
          "sup",
          {
            "aria-hidden": "true"
          },
          null,
          null,
          document.createTextNode("[" + (i + 1) + "]")
        )
      ));

      pair[fnId].fns.push(a);
      o.appendChild(a);

      $A.bind(a, "click", function(ev) {
        pair[fnId].last = $A.inArray(this, pair[fnId].fns);
        pair[fnId].fn.focus();
        ev.preventDefault();
      });

      if (!pair[fnId].fn) {
        var a2 = ($A[base + "a"][base + fnId + i] = $A.createEl("a", {
          href: "#",
          title: backText,
          "aria-label": backText
        }));

        a2.innerHTML = '<span aria-hidden="true">' + fnChar + "</span>";
        pair[fnId].fn = a2;
        pair[fnId].targ.appendChild(a2);
        $A.bind(a2, "click", function(ev) {
          pair[fnId].fns[pair[fnId].last].focus();
          ev.preventDefault();
        });
      }
    });
  };
})();
