(function() {
  $A.bind(window, "load", function() {
    var apiToggles = [],
      moduleToggles = [],
      ariaToggles = [],
      eventToggles = [];

    $A.query("div.AccDC .panel > .control > button", function(i, o) {
      $A.setAttr(o, "aria-expanded", "false");
      apiToggles.push(
        new $A.Toggle(o, {
          state: false,
          suppressARIAPressed: true,
          callback: function(state) {
            $A.setAttr(this, "aria-expanded", state ? "true" : "false");

            if (state) {
              $A.addClass(this, "pressed");
              $A.remClass(this.parentNode.nextElementSibling, "hdn");
            } else {
              $A.remClass(this, "pressed");
              $A.addClass(this.parentNode.nextElementSibling, "hdn");
            }
            return true;
          }
        })
      );
    });

    var moduleMap = {};

    $A.query("div.Modules .panel > .control > button", function(i, o) {
      $A.setAttr(o, "aria-expanded", "false");
      moduleMap["#" + o.id] = new $A.Toggle(o, {
        state: false,
        suppressARIAPressed: true,
        callback: function(state) {
          $A.setAttr(this, "aria-expanded", state ? "true" : "false");

          if (state) {
            $A.addClass(this, "pressed");
            $A.remClass(this.parentNode.nextElementSibling, "hdn");
          } else {
            $A.remClass(this, "pressed");
            $A.addClass(this.parentNode.nextElementSibling, "hdn");
          }
          return true;
        }
      });
      moduleToggles.push(moduleMap["#" + o.id]);
    });

    $A.query("div.ARIA .panel > .control > button", function(i, o) {
      $A.setAttr(o, "aria-expanded", "false");
      ariaToggles.push(
        new $A.Toggle(o, {
          state: false,
          suppressARIAPressed: true,
          callback: function(state) {
            $A.setAttr(this, "aria-expanded", state ? "true" : "false");

            if (state) {
              $A.addClass(this, "pressed");
              $A.remClass(this.parentNode.nextElementSibling, "hdn");
            } else {
              $A.remClass(this, "pressed");
              $A.addClass(this.parentNode.nextElementSibling, "hdn");
            }
            return true;
          }
        })
      );
    });

    $A.query("div.Events .panel > .control > button", function(i, o) {
      $A.setAttr(o, "aria-expanded", "false");
      eventToggles.push(
        new $A.Toggle(o, {
          state: false,
          suppressARIAPressed: true,
          callback: function(state) {
            $A.setAttr(this, "aria-expanded", state ? "true" : "false");

            if (state) {
              $A.addClass(this, "pressed");
              $A.remClass(this.parentNode.nextElementSibling, "hdn");
            } else {
              $A.remClass(this, "pressed");
              $A.addClass(this.parentNode.nextElementSibling, "hdn");
            }
            return true;
          }
        })
      );
    });

    $A.bind("div.expand-collapse > p > button", "click", function(ev) {
      var o = this,
        a = null,
        c = false;

      if (o.id == "col-1") {
        a = apiToggles;
        c = true;
      } else if (o.id == "exp-1") {
        a = apiToggles;
        c = false;
      } else if (o.id == "col-2") {
        a = moduleToggles;
        c = true;
      } else if (o.id == "exp-2") {
        a = moduleToggles;
        c = false;
      } else if (o.id == "col-3") {
        a = ariaToggles;
        c = true;
      } else if (o.id == "exp-3") {
        a = ariaToggles;
        c = false;
      } else if (o.id == "col-4") {
        a = eventToggles;
        c = true;
      } else if (o.id == "exp-4") {
        a = eventToggles;
        c = false;
      }

      for (var i = 0; i < a.length; i++) a[i].set(c ? false : true);
      $A.announce(c ? "Collapsed" : "Expanded");
      ev.preventDefault();
    });

    $A.bind("p.topLink a", "click", function(ev) {
      $A.setFocus($A.query("h1")[0]);
      ev.preventDefault();
    });

    // Setup skip link functionality
    $A.bind("#skipLink", "click", function(ev) {
      $A.setFocus($A.getEl("wrapper"));
      ev.preventDefault();
    });

    $A.bind("#mlto", {
      click: function(ev) {
        this.href = "mailto:bryan.garaventa@whatsock.com";
      },
      blur: function(ev) {
        this.href = "#";
      }
    });

    createHeaderNav();

    SyntaxHighlighter.defaults["gutter"] = false;
    SyntaxHighlighter.all();

    // Generate permalinks
    /*var baseURL = 'http://whatsock.com/tsg/#';
		$A.query('h2', function(i, o){
			var d = o.parentNode, a = $A.createEl('a',
							{
							href: baseURL + d.id,
							title: 'Permalink: ' + baseURL + d.id,
							'aria-label': 'Permalink: ' + baseURL + d.id
							}, null, 'permalink');

			a.innerHTML = '<span aria-hidden="true">#</span>';
			d.appendChild(a);
			$A.css(a, 'left', -(a.offsetWidth));
		});*/

    var verNode = $A.getEl("AccDCCurrentVerS1");

    if (verNode && $A.version) {
      verNode.innerHTML = (
        "Currently running AccDC API for Standalone, version: " + $A.version
      ).announce();
    }

    var loc = top.location.href || "",
      hsh = loc.slice(loc.indexOf("#"));
    if (moduleMap[hsh]) {
      moduleMap[hsh].set(true);
    }

    if (window.navigator.onLine)
      // Check for updates
      $A.getScript("http://api.whatsock.com/tsg-updates.js");
  });

  var hds = {},
    createHeaderNav = function() {
      var ph = $A.getEl("skipLinks"),
        hs = $A.query("div.hd > h2");
      hds = {};

      for (var i = 0; i < hs.length; i++) {
        var h = hs[i];

        if (ph && h.className !== "skip") {
          h.id = "H" + $A.genId();
          var leli = $A.createEl("li");
          var a = $A.createEl(
            "a",
            {
              href: "#"
            },
            null,
            h.id,
            document.createTextNode($A.getText(h))
          );

          ph.appendChild(leli);
          leli.appendChild(a);
          $A.setAttr(h, "tabindex", -1);
          hds[h.id] = h;
          $A.bind(a, "click", function(ev) {
            hds[this.className].focus();
            ev.preventDefault();
          });

          //if (i < (hs.length - 1))
          //ph.appendChild($A.createEl('span', null, null, null, document.createTextNode(' | ')));
        }
      }
    };
})();
