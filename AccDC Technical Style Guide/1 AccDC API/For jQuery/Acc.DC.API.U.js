/*!
AccDC API - 3.4 for jQuery (12/11/2017)
Copyright 2010-2017 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/
(function(pL) {
  var accDCVersion = "3.4 (12/11/2017)",
    getEl = function(e) {
      if (document.getElementById) return document.getElementById(e);
      else if (document.all) return document.all[e];
      else return null;
    },
    createEl = function(t) {
      var o = document.createElement(t);
      if (arguments.length === 1) return o;
      if (arguments[1]) setAttr(o, arguments[1]);
      if (arguments[2]) css(o, arguments[2]);
      if (arguments[3]) addClass(o, arguments[3]);
      if (arguments[4]) o.appendChild(arguments[4]);
      return o;
    },
    createText = function(s) {
      return document.createTextNode(s);
    },
    createAttr = function(a) {
      return document.createAttribute(a);
    },
    getAttr = function(e, n) {
      if (!e) return null;
      var a;
      if (e.getAttribute) a = e.getAttribute(n);
      if (!a && e.getAttributeNode) a = e.getAttributeNode(n);
      if (!a && e[n]) a = e[n];
      return a;
    },
    remAttr = function(e, n) {
      if (!e) return false;
      var a = isArray(n) ? n : [n];
      for (var i = 0; i < a.length; i++) {
        if (e.removeAttribute) e.removeAttribute(a[i]);
      }
      return e;
    },
    getText = function(n) {
      if (!n) return "";
      return n.innerText || n.textContent || pL.find.getText([n]) || "";
    },
    css = function(obj, p, v) {
      if (!obj) return null;
      if (obj.nodeName && typeof p === "string" && !v)
        return obj.style && obj.style[p]
          ? obj.style[p]
          : xGetComputedStyle(obj, p);
      var o = isArray(obj) ? obj : [obj],
        check = "top left bottom right width height";
      for (var i = 0; i < o.length; i++) {
        if (typeof p === "string") {
          try {
            o[i].style[xCamelize(p)] =
              check.indexOf(p) !== -1 && typeof v === "number" ? v + "px" : v;
          } catch (ex) {
            /*@cc_on
@if (@_jscript_version <= 5.7) // IE7 and down
if (p != 'display') continue;
var s = '',
t = o[i].nodeName.toLowerCase();
switch(t){
case 'table' :
case 'tr' :
case 'td' :
case 'li' :
s = 'block';
break;
case 'caption' :
s = 'inline';
break;
}
o[i].style[p] = s;
@end @*/
          }
        } else if (typeof p === "object") {
          for (var a = 1; a < arguments.length; a++) {
            for (var n in arguments[a]) {
              try {
                o[i].style[xCamelize(n)] =
                  check.indexOf(n) !== -1 && typeof arguments[a][n] === "number"
                    ? arguments[a][n] + "px"
                    : arguments[a][n];
              } catch (ex) {
                /*@cc_on
@if (@_jscript_version <= 5.7) // IE7 and down
if (n != 'display') continue;
var s = '',
t = o[i].nodeName.toLowerCase();
switch(t){
case 'table' :
case 'tr' :
case 'td' :
case 'li' :
s = 'block';
break;
case 'caption' :
s = 'inline';
break;
}
o[i].style[n] = s;
@end @*/
              }
            }
          }
        }
      }
      return obj;
    },
    trim = function(str) {
      return str.replace(/^\s+|\s+$/g, "");
    },
    setAttr = function(obj, name, value) {
      if (!obj) return null;
      if (typeof name === "string") {
        obj.setAttribute(name, value);
      } else if (typeof name === "object") {
        for (var n in name) {
          obj.setAttribute(n, name[n]);
        }
      }
      return obj;
    },
    isArray = function(v) {
      return (
        v &&
        typeof v === "object" &&
        typeof v.length === "number" &&
        typeof v.splice === "function" &&
        !v.propertyIsEnumerable("length")
      );
    },
    inArray = function(search, stack) {
      if (stack.indexOf) return stack.indexOf(search);
      for (var i = 0; i < stack.length; i++) {
        if (stack[i] === search) return i;
      }
      return -1;
    },
    hasClass = function(obj, cn) {
      if (!obj || !obj.className) return false;
      var names = cn.split(" "),
        i = 0;
      for (var n = 0; n < names.length; n++) {
        if (obj.className.indexOf(names[n]) !== -1) i += 1;
      }
      if (i === names.length) return true;
      return false;
    },
    addClass = function(obj, cn) {
      if (!obj) return null;
      pL(obj).addClass(cn);
      return obj;
    },
    remClass = function(obj, cn) {
      if (!obj) return null;
      pL(obj).removeClass(cn);
      return obj;
    },
    firstChild = function(e, t) {
      var e = e ? e.firstChild : null;
      while (e) {
        if (
          e.nodeType === 1 &&
          (!t || t.toLowerCase() === e.nodeName.toLowerCase())
        )
          break;
        e = e.nextSibling;
      }
      return e;
    },
    lastChild = function(e, t) {
      var e = e ? e.lastChild : null;
      while (e) {
        if (
          e.nodeType === 1 &&
          (!t || t.toLowerCase() === e.nodeName.toLowerCase())
        )
          break;
        e = e.previousSibling;
      }
      return e;
    },
    insertBefore = function(f, s) {
      if (!f) return s;
      f.parentNode.insertBefore(s, f);
      return s;
    },
    nowI = 0,
    now = function(v) {
      return new Date().getTime() + nowI++;
    },
    sraCSS = {
      position: "absolute",
      clip: "rect(1px 1px 1px 1px)",
      clip: "rect(1px, 1px, 1px, 1px)",
      clipPath: "inset(50%)",
      padding: 0,
      border: 0,
      height: "1px",
      width: "1px",
      overflow: "hidden",
      whiteSpace: "nowrap"
    },
    sraCSSClear = function(o) {
      css(o, {
        position: "",
        clip: "auto",
        clipPath: "none",
        padding: "",
        height: "",
        width: "",
        overflow: "",
        whiteSpace: "normal"
      });
      return o;
    },
    getWin = function() {
      return {
        width:
          window.document.documentElement.clientWidth ||
          window.document.body.clientWidth,
        height:
          window.document.documentElement.clientHeight ||
          window.document.body.clientHeight
      };
    },
    transition = function(ele, targ, config) {
      if (!ele) return;
      var uTotalTime = config.duration,
        iTargetY = targ.top,
        iTargetX = targ.left,
        startY = xTop(ele),
        startX = xLeft(ele);
      var dispX = iTargetX - startX,
        dispY = iTargetY - startY,
        freq = Math.PI / (2 * uTotalTime),
        startTime = new Date().getTime(),
        tmr = setInterval(function() {
          var elapsedTime = new Date().getTime() - startTime;
          if (elapsedTime < uTotalTime) {
            var f = Math.abs(Math.sin(elapsedTime * freq));
            xTop(ele, Math.round(f * dispY + startY));
            xLeft(ele, Math.round(f * dispX + startX));
            config.step.apply(ele);
          } else {
            clearInterval(tmr);
            xLeft(ele, iTargetX);
            xTop(ele, iTargetY);
            config.complete.apply(ele);
          }
        }, 10);
    },
    // BG:3.4:11/19/2017
    xOffset = function(c, forceAbsolute, forceRelative, returnTopLeftOnly) {
      if (c && c.nodeType === 1) {
        var r = {},
          position = css(c, "position");
        if (forceAbsolute || position == "absolute") r = getAbsolutePos(c);
        else if (forceRelative || position == "relative") {
          r.top = c.offsetTop;
          r.left = c.offsetLeft;
        } else r = c.getBoundingClientRect();
        if (!returnTopLeftOnly) {
          // Normalize the height, width, right, and bottom properties of r regardless which method above is used
          r.height = xHeight(c);
          r.width = xWidth(c);
          r.right = r.left + r.width;
          r.bottom = r.top + r.height;
        } else {
          // Otherwise ensure only top and left properties are returned if returnTopLeftOnly = true
          r.height = r.width = r.right = r.bottom = "";
        }
        return r;
      } else return null;
    },
    // BG:3.4:11/17/2017
    getAbsolutePos = function(obj) {
      var curleft = (curtop = 0);
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return {
        left: curleft,
        top: curtop
      };
    },
    xCamelize = function(cssPropStr) {
      var i, c, a, s;
      a = cssPropStr.split("-");
      s = a[0];
      for (i = 1; i < a.length; i++) {
        c = a[i].charAt(0);
        s += a[i].replace(c, c.toUpperCase());
      }
      return s;
    },
    xGetComputedStyle = function(e, p, i) {
      if (!e) return null;
      var s,
        v = "undefined",
        dv = document.defaultView;
      if (dv && dv.getComputedStyle) {
        if (e == document) e = document.body;
        s = dv.getComputedStyle(e, "");
        if (s) v = s.getPropertyValue(p);
      } else if (e.currentStyle) v = e.currentStyle[xCamelize(p)];
      else return null;
      return i ? parseInt(v) || 0 : v;
    },
    xNum = function() {
      for (var i = 0; i < arguments.length; i++) {
        if (isNaN(arguments[i]) || typeof arguments[i] !== "number")
          return false;
      }
      return true;
    },
    xDef = function() {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === "undefined") return false;
      }
      return true;
    },
    xStr = function() {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] !== "string") return false;
      }
      return true;
    },
    xHeight = function(e, h) {
      var css,
        pt = 0,
        pb = 0,
        bt = 0,
        bb = 0;
      if (!e) return 0;
      if (xNum(h)) {
        if (h < 0) h = 0;
        else h = Math.round(h);
      } else h = -1;
      css = xDef(e.style);
      if (css && xDef(e.offsetHeight) && xStr(e.style.height)) {
        if (h >= 0) {
          if (document.compatMode == "CSS1Compat") {
            pt = xGetComputedStyle(e, "padding-top", 1);
            if (pt !== null) {
              pb = xGetComputedStyle(e, "padding-bottom", 1);
              bt = xGetComputedStyle(e, "border-top-width", 1);
              bb = xGetComputedStyle(e, "border-bottom-width", 1);
            } else if (xDef(e.offsetHeight, e.style.height)) {
              e.style.height = h + "px";
              pt = e.offsetHeight - h;
            }
          }
          h -= pt + pb + bt + bb;
          if (isNaN(h) || h < 0) return;
          else e.style.height = h + "px";
        }
        h = e.offsetHeight;
      } else if (css && xDef(e.style.pixelHeight)) {
        if (h >= 0) e.style.pixelHeight = h;
        h = e.style.pixelHeight;
      }
      return h;
    },
    xWidth = function(e, w) {
      var css,
        pl = 0,
        pr = 0,
        bl = 0,
        br = 0;
      if (!e) return 0;
      if (xNum(w)) {
        if (w < 0) w = 0;
        else w = Math.round(w);
      } else w = -1;
      css = xDef(e.style);
      if (css && xDef(e.offsetWidth) && xStr(e.style.width)) {
        if (w >= 0) {
          if (document.compatMode == "CSS1Compat") {
            pl = xGetComputedStyle(e, "padding-left", 1);
            if (pl !== null) {
              pr = xGetComputedStyle(e, "padding-right", 1);
              bl = xGetComputedStyle(e, "border-left-width", 1);
              br = xGetComputedStyle(e, "border-right-width", 1);
            } else if (xDef(e.offsetWidth, e.style.width)) {
              e.style.width = w + "px";
              pl = e.offsetWidth - w;
            }
          }
          w -= pl + pr + bl + br;
          if (isNaN(w) || w < 0) return;
          else e.style.width = w + "px";
        }
        w = e.offsetWidth;
      } else if (css && xDef(e.style.pixelWidth)) {
        if (w >= 0) e.style.pixelWidth = w;
        w = e.style.pixelWidth;
      }
      return w;
    },
    xTop = function(e, iY) {
      if (!e) return 0;
      var css = xDef(e.style);
      if (css && xStr(e.style.top)) {
        if (xNum(iY)) e.style.top = iY + "px";
        else {
          iY = parseInt(e.style.top);
          if (isNaN(iY)) iY = xGetComputedStyle(e, "top", 1);
          if (isNaN(iY)) iY = 0;
        }
      } else if (css && xDef(e.style.pixelTop)) {
        if (xNum(iY)) e.style.pixelTop = iY;
        else iY = e.style.pixelTop;
      }
      return iY;
    },
    xLeft = function(e, iX) {
      if (!e) return 0;
      var css = xDef(e.style);
      if (css && xStr(e.style.left)) {
        if (xNum(iX)) e.style.left = iX + "px";
        else {
          iX = parseInt(e.style.left);
          if (isNaN(iX)) iX = xGetComputedStyle(e, "left", 1);
          if (isNaN(iX)) iX = 0;
        }
      } else if (css && xDef(e.style.pixelLeft)) {
        if (xNum(iX)) e.style.pixelLeft = iX;
        else iX = e.style.pixelLeft;
      }
      return iX;
    },
    // BG:3.4:11/15/2017
    pointerPos = function(e) {
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

  var $A = function(dc, dcA, dcI, onReady, disableAsync) {
    if (typeof dc === "object" && !isArray(dc) && "id" in dc) {
    } else {
      disableAsync = onReady;
      onReady = dcI;
      dcI = dcA;
      dcA = dc;
      dc = null;
    }
    var fn = function() {
      if (disableAsync) pL.ajaxSetup({ async: false });
      pL.accDC(dcA, dcI, dc);
      if (disableAsync) pL.ajaxSetup({ async: true });
    };
    if (onReady) pL(fn);
    else fn();
  };

  $A.reg = {};

  $A.fn = {
    globalDC: {},
    wheel: {},
    debug: false
  };

  pL.extend($A, {
    xOffset: xOffset,
    xHeight: xHeight,
    xWidth: xWidth,
    xTop: xTop,
    xLeft: xLeft,
    // BG:3.4:11/15/2017
    pointerPos: pointerPos,
    // BG:3.4:11/17/2017
    getAbsolutePos: getAbsolutePos,
    xDef: xDef,
    xNum: xNum,
    transition: transition,
    isArray: isArray,
    internal: pL,
    version: accDCVersion,
    sraCSS: sraCSS,
    sraCSSClear: sraCSSClear,
    getEl: getEl,
    createEl: createEl,
    getAttr: getAttr,
    remAttr: remAttr,
    createText: createText,
    getText: getText,
    css: css,
    setAttr: setAttr,
    inArray: inArray,
    hasClass: hasClass,
    addClass: addClass,
    remClass: remClass,

    globalDCMerge: function() {
      $A.find("*", function(dc) {
        pL.extend(true, dc, $A.fn.globalDC);
      });
    },

    genId: function(id) {
      return now(id || "AccDC");
    },

    announce: function(str, noRepeat, aggr) {
      if (typeof str !== "string") str = getText(str);
      return String.prototype.announce.apply(str, [str, null, noRepeat, aggr]);
    },

    query: function(sel, con, call) {
      if (con && typeof con === "function") {
        call = con;
        con = null;
      }
      var r = [];
      if (isArray(sel)) r = sel;
      else if (typeof sel !== "string") r.push(sel);
      else pL.find(sel, con, r);
      if (call && typeof call === "function") pL.each(r, call);
      return r;
    },

    find: function(ids, fn) {
      var ids = ids.split(",");
      for (var id in $A.reg) {
        if (ids[0] === "*" || inArray(id, ids) !== -1)
          fn.apply($A.reg[id], [$A.reg[id]]);
      }
    },

    destroy: function(id, p) {
      if (!$A.reg[id]) return false;
      var r = $A.reg[id],
        a = r.accDCObj,
        c = r.containerDiv;
      if (p && r.loaded) {
        var lc = lastChild(c);
        while (lc) {
          pL(a).after(lc);
          lc = lastChild(c);
        }
      }
      if (r.loaded) pL(a).remove();
      r.accDCObj = r.containerDiv = a = c = null;
      var iv = r.indexVal,
        wh = r.siblings;
      wh.splice(iv, 1);
      for (var i = 0; i < wh.length; i++) {
        wh[i].indexVal = i;
        wh[i].siblings = wh;
      }
      if (
        $A.reg[id].parent &&
        $A.reg[id].parent.children &&
        $A.reg[id].parent.children.length
      ) {
        var pc = -1,
          cn = $A.reg[id].parent.children;
        for (var i = 0; i < cn.length; i++) {
          if (cn[i].id == id) pc = i;
        }
        if (pc >= 0) $A.reg[id].parent.children.splice(pc, 1);
      }
      delete $A.reg[id];
    },

    morph: function(dc, obj, dcI) {
      if (dc.nodeType === 1 && dc.nodeName) {
        dcI = obj;
        obj = dc;
        dc = null;
      }
      var c = {
        fn: {
          morph: true,
          morphObj: obj
        },
        autoStart: true
      };
      pL.extend(c, dcI);
      pL.accDC([c], null, dc);
    },

    setFocus: function(o) {
      var oTI = null;
      if (getAttr(o, "tabindex")) oTI = getAttr(o, "tabindex");
      setAttr(o, "tabindex", -1);
      o.focus();
      if (oTI) setAttr(o, "tabindex", oTI);
      else remAttr(o, "tabindex");
      return o;
    }
  });

  $A.load = function(target, source, hLoadData, callback) {
    return pL(target).load(source, hLoadData, callback);
  };
  $A.get = function(source, hGetData, callback, hGetType) {
    return pL.get(source, hGetData, callback, hGetType);
  };
  $A.getJSON = function(source, hJSONData, callback) {
    return pL.getJSON(source, hJSONData, callback);
  };
  $A.getScript = function(source, callback, disableAsync) {
    if (typeof callback === "boolean") {
      disableAsync = callback;
      callback = null;
    }
    if (disableAsync) pL.ajaxSetup({ async: false });
    pL.getScript(source, callback);
    if (disableAsync) pL.ajaxSetup({ async: true });
  };
  $A.post = function(source, hPostData, callback, hPostType) {
    return pL.post(source, hPostData, callback, hPostType);
  };
  $A.ajax = function(ajaxOptions) {
    return pL.ajax(ajaxOptions);
  };

  $A.bind = function(ta, e, fn) {
    if (
      e == "load" &&
      (ta == "body" || ta == window || ta == document || ta == document.body)
    )
      pL(function(ev) {
        fn(ev);
      });
    else pL(ta).on(e, fn);
    return ta;
  };
  $A.unbind = function(ta, e) {
    pL(ta).off(e);
    return ta;
  };
  $A.trigger = function(ta, e) {
    pL(ta).trigger(e);
    return ta;
  };

  window[window.AccDCNamespace ? window.AccDCNamespace : "$A"] = $A;

  // BG:3.4:11/17/2017
  var calcPosition = function(dc, objArg, posVal) {
    var obj = objArg || dc.posAnchor;
    if (obj && typeof obj == "string") obj = pL(obj).get(0);
    else if (!obj) obj = dc.triggerObj;
    if (!obj) return;
    var autoPosition = posVal || dc.autoPosition,
      pos = {},
      aPos = {
        height: xHeight(dc.accDCObj),
        width: xWidth(dc.accDCObj)
      },
      oPos = xOffset(obj),
      position = css(dc.accDCObj, "position");
    if (position == "absolute" && css(obj, "position") != "fixed")
      oPos = xOffset(obj, true);
    if (autoPosition == 1) {
      pos.left = oPos.left;
      pos.top = oPos.top - aPos.height;
    } else if (autoPosition == 2) {
      pos.left = oPos.right;
      pos.top = oPos.top - aPos.height;
    } else if (autoPosition == 3) {
      pos.left = oPos.right;
      pos.top = oPos.top;
    } else if (autoPosition == 4) {
      pos.left = oPos.right;
      pos.top = oPos.bottom;
    } else if (autoPosition == 5) {
      pos.left = oPos.left;
      pos.top = oPos.bottom;
    } else if (autoPosition == 6) {
      pos.left = oPos.left - aPos.width;
      pos.top = oPos.bottom;
    } else if (autoPosition == 7) {
      pos.left = oPos.left - aPos.width;
      pos.top = oPos.top;
    } else if (autoPosition == 8) {
      pos.left = oPos.left - aPos.width;
      pos.top = oPos.top - aPos.height;
    } else if (autoPosition == 9) {
      pos.left = oPos.left;
      pos.top = oPos.top;
    } else if (autoPosition == 10) {
      pos.left = oPos.right - aPos.width;
      pos.top = oPos.top - aPos.height;
    } else if (autoPosition == 11) {
      pos.left = oPos.right - aPos.width;
      pos.top = oPos.top;
    } else if (autoPosition == 12) {
      pos.left = oPos.right - aPos.width;
      pos.top = oPos.bottom;
    }
    if (
      typeof dc.offsetTop === "number" &&
      (dc.offsetTop < 0 || dc.offsetTop > 0)
    )
      pos.top += dc.offsetTop;
    if (
      typeof dc.offsetLeft === "number" &&
      (dc.offsetLeft < 0 || dc.offsetLeft > 0)
    )
      pos.left += dc.offsetLeft;
    css(dc.accDCObj, pos);
  };

  String.prototype.announce = function announce(strm, loop, noRep, aggr) {
    if (String.announce.loaded) {
      if (
        !String.announce.liveRendered &&
        !aggr &&
        String.announce.placeHolder
      ) {
        String.announce.liveRendered = true;
        document.body.appendChild(String.announce.placeHolder);
      }
      if (
        !String.announce.alertRendered &&
        aggr &&
        String.announce.placeHolder2
      ) {
        String.announce.alertRendered = true;
        document.body.appendChild(String.announce.placeHolder2);
      }
    }
    if (strm && strm.nodeName && strm.nodeType === 1) strm = getText(strm);
    var obj = strm || this,
      str = strm ? strm : this.toString();
    if (typeof str !== "string") return obj;
    if (!loop && inArray(str, String.announce.alertMsgs) === -1)
      String.announce.alertMsgs.push(str);
    if (String.announce.alertMsgs.length == 1 || loop) {
      var timeLength =
        String.announce.baseDelay +
        String.announce.iterate(
          String.announce.alertMsgs[0],
          /\s|\,|\.|\:|\;|\!|\(|\)|\/|\?|\@|\#|\$|\%|\^|\&|\*|\\|\-|\_|\+|\=/g
        ) *
          String.announce.charMultiplier;
      if (!(noRep && String.announce.lastMsg == String.announce.alertMsgs[0])) {
        String.announce.lastMsg = String.announce.alertMsgs[0];
        if (aggr)
          String.announce.placeHolder2.innerHTML = String.announce.alertMsgs[0];
        else
          String.announce.placeHolder.innerHTML = String.announce.alertMsgs[0];
      }
      String.announce.alertTO = setTimeout(function() {
        String.announce.placeHolder.innerHTML = String.announce.placeHolder2.innerHTML =
          "";
        String.announce.alertMsgs.shift();
        if (String.announce.alertMsgs.length >= 1)
          String.prototype.announce(
            String.announce.alertMsgs[0],
            true,
            noRep,
            aggr
          );
      }, timeLength);
    }
    return obj;
  };

  String.announce = {
    alertMsgs: [],
    clear: function() {
      if (this.alertTO) clearTimeout(this.alertTO);
      this.alertMsgs = [];
    },
    baseDelay: 1000,
    charMultiplier: 10,
    lastMsg: "",
    iterate: function(str, regExp) {
      var iCount = 0;
      str.replace(regExp, function() {
        iCount++;
      });
      return iCount;
    },
    loaded: false,
    liveRendered: false,
    alertRendered: false
  };

  $A.bind(window, "load", function() {
    if (!String.announce.placeHolder) {
      String.announce.placeHolder = createEl(
        "div",
        {
          "aria-live": "polite"
        },
        sraCSS
      );
      String.announce.placeHolder2 = createEl(
        "div",
        {
          role: "alert"
        },
        sraCSS
      );
    }
    String.announce.loaded = true;
  });

  pL.accDC = function(accDCObjects, gImport, parentDC) {
    var wheel = [],
      ids = [],
      getScript = function(dc, u, f) {
        pL.ajax({
          async: false,
          type: "GET",
          url: u,
          data: null,
          success: function() {
            if (f) return f.apply(dc, arguments);
          },
          dataType: "script"
        });
      },
      changeTabs = function(dc, isClose) {
        var dc = wheel[dc.indexVal];
        if (dc.isTab) {
          if (dc.tabState) {
            for (var w = 0; w < wheel.length; w++) {
              var wl = wheel[w];
              if (wl.isTab) {
                var ss = pL(wl.triggerObj).data("sra");
                if (ss) {
                  if (wl.loaded) {
                    pL(ss).html(
                      "<span>&nbsp;" +
                        wl.tabRole +
                        "&nbsp;" +
                        wl.tabState +
                        "</span>"
                    );
                  } else pL(ss).html("<span>&nbsp;" + wl.tabRole + "</span>");
                }
              }
            }
            $A.query(dc.trigger, function() {
              if (this != dc.triggerObj) {
                pL(pL(this).data("sra")).html(
                  "<span>&nbsp;" + dc.tabRole + "</span>"
                );
              }
            });
          }
        } else if (dc.isToggle) {
          if (dc.toggleState)
            $A.query(dc.trigger, function() {
              var ss = pL(this).data("sra");
              if (ss) {
                if (!isClose) {
                  pL(ss).html(
                    "<span>&nbsp;" +
                      dc.toggleRole +
                      "&nbsp;" +
                      dc.toggleState +
                      "</span>"
                  );
                } else pL(ss).html("<span>&nbsp;" + dc.toggleRole + "</span>");
              }
            });
        }
        return (wheel[dc.indexVal] = dc);
      },
      loadAccDCObj = function(dc) {
        var dc = wheel[dc.indexVal];
        if (
          (dc.loaded && !dc.allowReopen && !dc.isToggle) ||
          dc.fn.override ||
          dc.lock ||
          dc.loading ||
          dc.closing
        )
          return dc;
        else if (dc.loaded && (dc.allowReopen || dc.isToggle)) {
          dc.fn.bypass = true;
          closeAccDCObj(dc);
          dc.fn.bypass = false;
          if (dc.isToggle) return dc;
        }
        dc.cancel = false;
        dc.content = "";
        var nid = now();
        dc.accDCObjId = dc.fn.accDCObjId = "AccDC" + nid;
        dc.closeId = "AccDC" + (nid + (nowI += 1));
        dc.containerId = dc.containerDivId = "AccDC" + (nid + (nowI += 1));
        if (dc.importCSS) dc.fn.importCSSId = "AccDC" + (nid + (nowI += 1));
        dc.fn.sraStart = createEl("div", null, sraCSS);
        dc.fn.sraEnd = createEl("div", null, sraCSS);
        dc.containerDiv = createEl("div", {
          id: dc.containerId
        });
        dc.accDCObj = createEl("div", {
          id: dc.fn.accDCObjId
        });
        if (dc.className) addClass(dc.accDCObj, dc.className);
        // BG:3.4:12/11/2017 start
        if (dc.showHiddenBounds) pL(dc.accDCObj).append(dc.fn.sraStart);
        pL(dc.accDCObj).append(dc.containerDiv);
        if (dc.showHiddenBounds) pL(dc.accDCObj).append(dc.fn.sraEnd);
        // BG:3.4:12/11/2017 end
        var events = {
            mouseOver: function(ev) {
              dc.mouseOver.apply(this, [ev, dc]);
            },
            mouseOut: function(ev) {
              dc.mouseOut.apply(this, [ev, dc]);
            },
            resize: function(ev) {
              dc.resize.apply(this, [ev, dc]);
            },
            scroll: function(ev) {
              dc.scroll.apply(this, [ev, dc]);
            },
            click: function(ev) {
              dc.click.apply(this, [ev, dc]);
            },
            dblClick: function(ev) {
              dc.dblClick.apply(this, [ev, dc]);
            },
            mouseDown: function(ev) {
              dc.mouseDown.apply(this, [ev, dc]);
            },
            mouseUp: function(ev) {
              dc.mouseUp.apply(this, [ev, dc]);
            },
            mouseMove: function(ev) {
              dc.mouseMove.apply(this, [ev, dc]);
            },
            mouseEnter: function(ev) {
              dc.mouseEnter.apply(this, [ev, dc]);
            },
            mouseLeave: function(ev) {
              dc.mouseLeave.apply(this, [ev, dc]);
            },
            keyDown: function(ev) {
              dc.keyDown.apply(this, [ev, dc]);
            },
            keyPress: function(ev) {
              dc.keyPress.apply(this, [ev, dc]);
            },
            keyUp: function(ev) {
              dc.keyUp.apply(this, [ev, dc]);
            },
            error: function(ev) {
              dc.error.apply(this, [ev, dc]);
            },
            focusIn: function(ev) {
              dc.focusIn.apply(this, [ev, dc]);
            },
            focusOut: function(ev) {
              dc.focusOut.apply(this, [ev, dc]);
            }
          },
          toBind = {};
        for (var ev in events) {
          if (dc[ev] && typeof dc[ev] === "function")
            toBind[ev.toLowerCase()] = events[ev];
        }
        $A.bind(dc.accDCObj, toBind);
        if (!dc.ranJSOnceBefore) {
          dc.ranJSOnceBefore = true;
          if (dc.reverseJSOrder) {
            dc.runOnceBefore.apply(dc, [dc]);
            if (dc.allowCascade) {
              if (dc.fn.proto.runOnceBefore)
                dc.fn.proto.runOnceBefore.apply(dc, [dc]);
              if ($A.fn.globalDC.runOnceBefore)
                $A.fn.globalDC.runOnceBefore.apply(dc, [dc]);
            }
            dc.reverseJSOrderPass = true;
          }
          if (dc.runJSOnceBefore.length) {
            for (var j = 0; j < dc.runJSOnceBefore.length; j++)
              getScript(dc, dc.runJSOnceBefore[j]);
          }
          if (dc.allowCascade) {
            if (
              dc.fn.proto.runJSOnceBefore &&
              dc.fn.proto.runJSOnceBefore.length
            ) {
              for (var j = 0; j < dc.fn.proto.runJSOnceBefore.length; j++)
                getScript(dc, dc.fn.proto.runJSOnceBefore[j]);
            }
            if (
              $A.fn.globalDC.runJSOnceBefore &&
              $A.fn.globalDC.runJSOnceBefore.length
            ) {
              for (var j = 0; j < $A.fn.globalDC.runJSOnceBefore.length; j++)
                getScript(dc, $A.fn.globalDC.runJSOnceBefore[j]);
            }
          }
          if (!dc.reverseJSOrder && !dc.reverseJSOrderPass) {
            dc.runOnceBefore.apply(dc, [dc]);
            if (dc.allowCascade) {
              if (dc.fn.proto.runOnceBefore)
                dc.fn.proto.runOnceBefore.apply(dc, [dc]);
              if ($A.fn.globalDC.runOnceBefore)
                $A.fn.globalDC.runOnceBefore.apply(dc, [dc]);
            }
          } else dc.reverseJSOrderPass = false;
        }
        if (dc.reverseJSOrder) {
          dc.runBefore.apply(dc, [dc]);
          if (dc.allowCascade) {
            if (dc.fn.proto.runBefore) dc.fn.proto.runBefore.apply(dc, [dc]);
            if ($A.fn.globalDC.runBefore)
              $A.fn.globalDC.runBefore.apply(dc, [dc]);
          }
          dc.reverseJSOrderPass = true;
        }
        if (dc.runJSBefore.length) {
          for (var j = 0; j < dc.runJSBefore.length; j++)
            getScript(dc, dc.runJSBefore[j]);
        }
        if (dc.allowCascade) {
          if (dc.fn.proto.runJSBefore && dc.fn.proto.runJSBefore.length) {
            for (var j = 0; j < dc.fn.proto.runJSBefore.length; j++)
              getScript(dc, dc.fn.proto.runJSBefore[j]);
          }
          if ($A.fn.globalDC.runJSBefore && $A.fn.globalDC.runJSBefore.length) {
            for (var j = 0; j < $A.fn.globalDC.runJSBefore.length; j++)
              getScript(dc, $A.fn.globalDC.runJSBefore[j]);
          }
        }
        if (!dc.reverseJSOrder && !dc.reverseJSOrderPass) {
          dc.runBefore.apply(dc, [dc]);
          if (dc.allowCascade) {
            if (dc.fn.proto.runBefore) dc.fn.proto.runBefore.apply(dc, [dc]);
            if ($A.fn.globalDC.runBefore)
              $A.fn.globalDC.runBefore.apply(dc, [dc]);
          }
        } else dc.reverseJSOrderPass = false;
        if (dc.cancel) {
          dc.cancel = dc.loading = false;
          return dc;
        }
        dc.loading = true;
        if (dc.showHiddenBounds) {
          setAttr(dc.fn.sraStart, {
            id: "h" + now(),
            role: "heading",
            "aria-level": dc.ariaLevel
          });
          pL(dc.fn.sraStart).append(
            "<span>" + dc.role + "&nbsp;" + dc.accStart + "</span>"
          );
          if (dc.showHiddenClose) {
            dc.fn.closeLink = createEl(
              "a",
              {
                id: dc.closeId,
                href: "#"
              },
              dc.sraCSS,
              dc.closeClassName
            );
            dc.fn.closeLink.innerHTML = dc.accClose;
            insertBefore(dc.fn.sraEnd, dc.fn.closeLink);
            if (dc.displayHiddenClose)
              $A.bind(dc.fn.closeLink, {
                focus: function() {
                  sraCSSClear(this);
                },
                blur: function() {
                  css(this, dc.sraCSS);
                }
              });
            else setAttr(dc.fn.closeLink, "tabindex", "-1");
          }
          pL(dc.fn.sraEnd).append(
            "<span>" + dc.role + "&nbsp;" + dc.accEnd + "</span>"
          );
        }
        if (dc.forceFocus) {
          setAttr(dc.fn.sraStart, "tabindex", -1);
          css(dc.fn.sraStart, "outline", "none");
        }
        if (dc.displayInline)
          css([dc.accDCObj, dc.containerDiv], "display", "inline");
        switch (dc.mode) {
          case 1:
            pL(dc.containerDiv).load(dc.source, dc.hLoadData, function(
              responseText,
              textStatus,
              XMLHttpRequest
            ) {
              dc.hLoad(responseText, textStatus, XMLHttpRequest, dc);
              parseRemaining(dc);
            });
            break;
          case 2:
            dc.request = pL.get(
              dc.source,
              dc.hGetData,
              function(source, textStatus) {
                dc.hGet(source, textStatus, dc);
                dc.hSource(dc.content);
                parseRemaining(dc);
              },
              dc.hGetType
            );
            break;
          case 3:
            dc.request = pL.getJSON(dc.source, dc.hJSONData, function(
              source,
              textStatus
            ) {
              dc.hJSON(source, textStatus, dc);
              dc.hSource(dc.content);
              parseRemaining(dc);
            });
            break;
          case 4:
            dc.request = pL.getScript(dc.source, function(source, textStatus) {
              dc.hScript(source, textStatus, dc);
              dc.hSource(dc.content);
              parseRemaining(dc);
            });
            break;
          case 5:
            dc.request = pL.post(
              dc.source,
              dc.hPostData,
              function(source, textStatus) {
                dc.hPost(source, textStatus, dc);
                dc.hSource(dc.content);
                parseRemaining(dc);
              },
              dc.hPostType
            );
            break;
          case 6:
            dc.request = pL.ajax(dc.ajaxOptions);
            break;
          default:
            dc.hSource(dc.source);
            parseRemaining(dc);
        }
        return (wheel[dc.indexVal] = dc);
      },
      parseRemaining = function(dc) {
        var dc = wheel[dc.indexVal];
        dc.runDuring.apply(dc, [dc]);
        if (dc.allowCascade) {
          if (dc.fn.proto.runDuring) dc.fn.proto.runDuring.apply(dc, [dc]);
          if ($A.fn.globalDC.runDuring)
            $A.fn.globalDC.runDuring.apply(dc, [dc]);
        }
        if (dc.cancel) {
          dc.cancel = dc.loading = false;
          return dc;
        }
        for (var w = 0; w < wheel.length; w++) {
          var wl = wheel[w];
          if (wl.loaded && !wl.allowMultiple) {
            wl.fn.bypass = true;
            dc.close(wl);
            wl.fn.bypass = false;
          }
        }
        css(dc.accDCObj, dc.cssObj);
        if (dc.autoFix) setAutoFix(dc);
        if (dc.fn.morph && dc.fn.morphObj) {
          pL(dc.fn.morphObj).after(dc.accDCObj);
          pL(dc.containerDiv).append(dc.fn.morphObj);
          dc.fn.morph = false;
        } else if (dc.isStatic) {
          if (dc.append) pL(dc.isStatic).append(dc.accDCObj);
          else if (dc.prepend) {
            if (!firstChild(pL(dc.isStatic).get(0)))
              pL(dc.isStatic).append(dc.accDCObj);
            else insertBefore(firstChild(pL(dc.isStatic).get(0)), dc.accDCObj);
          } else pL(dc.isStatic).html(dc.accDCObj);
        } else if (dc.targetObj && (!dc.returnFocus || dc.triggerObj))
          pL(dc.targetObj).after(dc.accDCObj);
        else if (dc.triggerObj) pL(dc.triggerObj).after(dc.accDCObj);
        else if ($A.fn.debug)
          alert(
            "Error: The dc.triggerObj property must be programatically set if no trigger or targetObj is specified during setup. View the Traversal and Manipulation section in the WhatSock.com Core API documentation for additional details."
          );
        if (dc.importCSS) {
          dc.fn.cssLink = createEl("link", {
            id: dc.fn.importCSSId,
            rel: "stylesheet",
            type: "text/css",
            href: dc.importCSS
          });
          dc.accDCObj.appendChild(dc.fn.cssLink);
        }
        if (dc.isDraggable && dc.drag.persist && dc.drag.x && dc.drag.y)
          css(dc.accDCObj, {
            left: dc.drag.x,
            top: dc.drag.y
          });
        else if (dc.autoPosition > 0 && !dc.isStatic && !dc.autoFix)
          calcPosition(dc);
        var forceFocus = dc.forceFocus;
        dc.loading = false;
        dc.loaded = true;
        if (dc.isTab || dc.isToggle) changeTabs(dc);
        $A.query("." + dc.closeClassName, dc.accDCObj, function() {
          $A.bind(this, "click", function(ev) {
            dc.close();
            ev.preventDefault();
          });
        });
        $A.bind(dc.fn.closeLink, "focus", function(ev) {
          dc.tabOut(ev, dc);
        });
        if (dc.timeoutVal)
          dc.timer = setTimeout(function() {
            dc.timeout(dc);
          }, dc.timeoutVal);
        if (dc.dropTarget && dc.accDD.on) {
          dc.accDD.dropTargets = [];
          dc.accDD.dropAnchors = [];
          $A.query(dc.dropTarget, function() {
            dc.accDD.dropAnchors.push(this);
            dc.accDD.dropTargets.push(this);
          });
        }
        if (!dc.ranJSOnceAfter) {
          dc.ranJSOnceAfter = true;
          if (dc.reverseJSOrder) {
            dc.runOnceAfter.apply(dc, [dc]);
            if (dc.allowCascade) {
              if (dc.fn.proto.runOnceAfter)
                dc.fn.proto.runOnceAfter.apply(dc, [dc]);
              if ($A.fn.globalDC.runOnceAfter)
                $A.fn.globalDC.runOnceAfter.apply(dc, [dc]);
            }
            dc.reverseJSOrderPass = true;
          }
          if (dc.runJSOnceAfter.length) {
            for (var j = 0; j < dc.runJSOnceAfter.length; j++)
              getScript(dc, dc.runJSOnceAfter[j]);
          }
          if (dc.allowCascade) {
            if (
              dc.fn.proto.runJSOnceAfter &&
              dc.fn.proto.runJSOnceAfter.length
            ) {
              for (var j = 0; j < dc.fn.proto.runJSOnceAfter.length; j++)
                getScript(dc, dc.fn.proto.runJSOnceAfter[j]);
            }
            if (
              $A.fn.globalDC.runJSOnceAfter &&
              $A.fn.globalDC.runJSOnceAfter.length
            ) {
              for (var j = 0; j < $A.fn.globalDC.runJSOnceAfter.length; j++)
                getScript(dc, $A.fn.globalDC.runJSOnceAfter[j]);
            }
          }
          if (!dc.reverseJSOrder && !dc.reverseJSOrderPass) {
            dc.runOnceAfter.apply(dc, [dc]);
            if (dc.allowCascade) {
              if (dc.fn.proto.runOnceAfter)
                dc.fn.proto.runOnceAfter.apply(dc, [dc]);
              if ($A.fn.globalDC.runOnceAfter)
                $A.fn.globalDC.runOnceAfter.apply(dc, [dc]);
            }
          } else dc.reverseJSOrderPass = false;
        }
        if (dc.reverseJSOrder) {
          dc.runAfter.apply(dc, [dc]);
          if (dc.allowCascade) {
            if (dc.fn.proto.runAfter) dc.fn.proto.runAfter.apply(dc, [dc]);
            if ($A.fn.globalDC.runAfter)
              $A.fn.globalDC.runAfter.apply(dc, [dc]);
          }
          dc.reverseJSOrderPass = true;
        }
        if (dc.runJSAfter.length) {
          for (var j = 0; j < dc.runJSAfter.length; j++)
            getScript(dc, dc.runJSAfter[j]);
        }
        if (dc.allowCascade) {
          if (dc.fn.proto.runJSAfter && dc.fn.proto.runJSAfter.length) {
            for (var j = 0; j < dc.fn.proto.runJSAfter.length; j++)
              getScript(dc, dc.fn.proto.runJSAfter[j]);
          }
          if ($A.fn.globalDC.runJSAfter && $A.fn.globalDC.runJSAfter.length) {
            for (var j = 0; j < $A.fn.globalDC.runJSAfter.length; j++)
              getScript(dc, $A.fn.globalDC.runJSAfter[j]);
          }
        }
        if (!dc.reverseJSOrder && !dc.reverseJSOrderPass) {
          dc.runAfter.apply(dc, [dc]);
          if (dc.allowCascade) {
            if (dc.fn.proto.runAfter) dc.fn.proto.runAfter.apply(dc, [dc]);
            if ($A.fn.globalDC.runAfter)
              $A.fn.globalDC.runAfter.apply(dc, [dc]);
          }
        } else dc.reverseJSOrderPass = false;
        if (
          (parseInt(dc.shadow.horizontal) || parseInt(dc.shadow.vertical)) &&
          dc.shadow.color
        )
          setShadow(dc);
        if (
          dc.autoFix &&
          (!dc.isDraggable || !dc.drag.persist || !dc.drag.x || !dc.drag.y)
        )
          sizeAutoFix(dc);
        if (dc.isDraggable) setDrag(dc);
        if (forceFocus) $A.setFocus(dc.fn.sraStart);
        if ($A.fn.debug && !getEl(dc.containerId))
          alert(
            "Error: The Automatic Accessibility Framework has been overwritten within the AccDC Dynamic Content Object with id=" +
              dc.id +
              '. New content should be added in a proper manner using the "source", "containerDiv", or "content" properties to ensure accessibility. View the Setup, Traversal and Manipulation, and Mode Handlers sections in the WhatSock.com Core API documentation for additional details.'
          );
        if (dc.announce) $A.announce(dc.containerDiv);
        if ($A.bootstrap) $A.bootstrap(dc.containerDiv);
        return (wheel[dc.indexVal] = dc);
      },
      closeAccDCObj = function(dc) {
        var dc = wheel[dc.indexVal];
        dc.runBeforeClose.apply(dc, [dc]);
        if (dc.allowCascade) {
          if (dc.fn.proto.runBeforeClose)
            dc.fn.proto.runBeforeClose.apply(dc, [dc]);
          if ($A.fn.globalDC.runBeforeClose)
            $A.fn.globalDC.runBeforeClose.apply(dc, [dc]);
        }
        if (!dc.loaded || dc.lock) return dc;
        dc.closing = true;
        if (dc.isDraggable) unsetDrag(dc);
        pL(dc.accDCObj).remove();
        if (dc.fn.containsFocus && !dc.fn.bypass) dc.fn.toggleFocus = true;
        dc.fn.override = true;
        if (dc.returnFocus && dc.triggerObj && !dc.fn.bypass) {
          if (dc.triggerObj.nodeName.toLowerCase() == "form") {
            var s = pL(dc.triggerObj)
              .find('*[type="submit"]')
              .get(0);
            if (s && s.focus) s.focus();
          } else {
            if (dc.triggerObj.focus) dc.triggerObj.focus();
            else $A.setFocus(dc.triggerObj);
          }
        }
        dc.loaded = dc.fn.override = false;
        if (dc.isTab || dc.isToggle) changeTabs(dc, true);
        dc.fn.triggerObj = dc.triggerObj;
        dc.closing = false;
        dc.runAfterClose.apply(dc, [dc]);
        if (dc.allowCascade) {
          if (dc.fn.proto.runAfterClose)
            dc.fn.proto.runAfterClose.apply(dc, [dc]);
          if ($A.fn.globalDC.runAfterClose)
            $A.fn.globalDC.runAfterClose.apply(dc, [dc]);
        }
        return (wheel[dc.indexVal] = dc);
      },
      unsetTrigger = function(dc) {
        var dc = wheel[dc.indexVal];
        $A.query(dc.fn.triggerB, function() {
          $A.unbind(this, dc.fn.bindB);
          if (dc.isTab || dc.isToggle)
            pL(this)
              .data("sra")
              .remove();
        });
        dc.fn.triggerB = dc.fn.bindB = "";
        return (wheel[dc.indexVal] = dc);
      },
      setTrigger = function(dc) {
        var dc = wheel[dc.indexVal];
        unsetTrigger(dc);
        return (wheel[dc.indexVal] = setBindings(dc));
      },
      setAutoFix = function(dc) {
        var dc = wheel[dc.indexVal];
        if (!dc.loading && !dc.loaded) return dc;
        var cs = {
          position: "fixed",
          right: "",
          bottom: "",
          top: "",
          left: ""
        };
        switch (dc.autoFix) {
          case 1:
            cs.top = 0;
            cs.left = "40%";
            break;
          case 2:
            cs.top = 0;
            cs.right = 0;
            break;
          case 3:
            cs.top = "40%";
            cs.right = 0;
            break;
          case 4:
            cs.bottom = 0;
            cs.right = 0;
            break;
          case 5:
            cs.bottom = 0;
            cs.left = "40%";
            break;
          case 6:
            cs.bottom = 0;
            cs.left = 0;
            break;
          case 7:
            cs.top = "40%";
            cs.left = 0;
            break;
          case 8:
            cs.top = 0;
            cs.left = 0;
            break;
          case 9:
            cs.top = "40%";
            cs.left = "40%";
          default:
            cs = dc.cssObj;
        }
        css(dc.accDCObj, cs);
        return (wheel[dc.indexVal] = dc);
      },
      sizeAutoFix = function(dc) {
        var dc = wheel[dc.indexVal];
        if (!dc.loading && !dc.loaded) return dc;
        var win = getWin();
        var bodyW = win.width,
          bodyH = win.height,
          aW = xWidth(dc.accDCObj),
          aH = xHeight(dc.accDCObj);
        if (bodyW > aW) var npw = parseInt(((aW / bodyW) * 100) / 2);
        else var npw = 50;
        if (bodyH > aH) var nph = parseInt(((aH / bodyH) * 100) / 2);
        else var nph = 50;
        switch (dc.autoFix) {
          case 1:
          case 5:
            css(dc.accDCObj, "left", 50 - npw + "%");
            break;
          case 3:
          case 7:
            css(dc.accDCObj, "top", 50 - nph + "%");
            break;
          case 9:
            css(dc.accDCObj, {
              left: 50 - npw + "%",
              top: 50 - nph + "%"
            });
        }
        if (
          dc.offsetTop < 0 ||
          dc.offsetTop > 0 ||
          dc.offsetLeft < 0 ||
          dc.offsetLeft > 0
        ) {
          var cs = xOffset(dc.accDCObj);
          // BG:3.4:11/15/2017
          cs.top += dc.offsetTop;
          cs.left += dc.offsetLeft;
          css(dc.accDCObj, cs);
        }
        return (wheel[dc.indexVal] = dc);
      },
      setShadow = function(dc) {
        var dc = wheel[dc.indexVal];
        css(dc.accDCObj, {
          "box-shadow":
            dc.shadow.horizontal +
            " " +
            dc.shadow.vertical +
            " " +
            dc.shadow.blur +
            " " +
            dc.shadow.color,
          "-webkit-box-shadow":
            dc.shadow.horizontal +
            " " +
            dc.shadow.vertical +
            " " +
            dc.shadow.blur +
            " " +
            dc.shadow.color,
          "-moz-box-shadow":
            dc.shadow.horizontal +
            " " +
            dc.shadow.vertical +
            " " +
            dc.shadow.blur +
            " " +
            dc.shadow.color
        });
        return (wheel[dc.indexVal] = dc);
      },
      setDrag = function(dc) {
        if (
          $A.setDragAndDrop &&
          typeof $A.setDragAndDrop == "function" &&
          $A.setDragAndDrop.setDrag &&
          typeof $A.setDragAndDrop.setDrag == "function"
        )
          $A.setDragAndDrop.setDrag.apply(this, [dc, wheel, pL]);
      },
      unsetDrag = function(dc, uDrop) {
        if (
          $A.setDragAndDrop &&
          typeof $A.setDragAndDrop == "function" &&
          $A.setDragAndDrop.unsetDrag &&
          typeof $A.setDragAndDrop.unsetDrag == "function"
        )
          $A.setDragAndDrop.unsetDrag.apply(this, [dc, uDrop, wheel, pL]);
      },
      autoStart = [],
      setBindings = function(dc) {
        dc.fn.toggleFocus = dc.fn.containsFocus = false;
        dc.bind = dc.binders || dc.bind;
        if (inArray("focus", dc.bind.split(" ")) >= 0)
          dc.fn.containsFocus = true;
        dc.fn.triggerB = dc.trigger;
        dc.fn.bindB = dc.bind;
        $A.query(dc.trigger, function() {
          if (this.nodeName.toLowerCase() == "a" && !this.href)
            setAttr(this, "href", "#");
          $A.bind(this, dc.bind, function(ev) {
            dc.triggerObj = this;
            dc.open();
            ev.preventDefault();
          });
          if (
            (dc.isTab && (dc.tabRole || dc.tabState)) ||
            (dc.isToggle && (dc.toggleRole || dc.toggleState))
          ) {
            var ss = createEl("span", null, sraCSS);
            pL(this).append(ss);
            pL(this).data("sra", ss);
            dc.fn.sraCSSObj = ss;
          }
          if (dc.isTab)
            pL(ss).html(
              dc.loaded
                ? "<span>&nbsp;" +
                    dc.tabRole +
                    "&nbsp;" +
                    dc.tabState +
                    "</span>"
                : "<span>&nbsp;" + dc.tabRole + "</span>"
            );
          else if (dc.isToggle)
            pL(ss).html(
              dc.loaded
                ? "<span>&nbsp;" +
                    dc.toggleRole +
                    "&nbsp;" +
                    dc.toggleState +
                    "</span>"
                : "<span>&nbsp;" + dc.toggleRole + "</span>"
            );
        });
        return dc;
      },
      AccDCInit = function(dc) {
        dc = setBindings(dc);
        dc.sraCSS = sraCSS;
        dc.sraCSSClear = sraCSSClear;
        var f = function() {};
        f.prototype = dc;
        return (window[
          window.AccDCNamespace ? window.AccDCNamespace : "$A"
        ].reg[dc.id] = $A.reg[dc.id] = new f());
      },
      svs = [
        "runJSOnceBefore",
        "runOnceBefore",
        "runJSBefore",
        "runBefore",
        "runDuring",
        "runJSOnceAfter",
        "runOnceAfter",
        "runJSAfter",
        "runAfter",
        "runBeforeClose",
        "runAfterClose"
      ];

    for (var a = 0; a < accDCObjects.length; a++) {
      var dc = {
          id: "",

          fn: {},

          trigger: "",
          setTrigger: function(dc) {
            var dc = dc || this;
            if (!dc.trigger || !dc.bind) {
              if ($A.fn.debug)
                alert(
                  "Error: Both of the dc.trigger and dc.bind properties must be set before this function can be used. View the Setup section in the WhatSock.com Core API documentation for additional details."
                );
              return dc;
            }
            return setTrigger(dc);
          },
          unsetTrigger: function(dc) {
            var dc = dc || this;
            if (!dc.fn.triggerB || !dc.fn.bindB) return dc;
            return unsetTrigger(dc);
          },
          targetObj: null,

          role: "",
          accStart: "Start",
          accEnd: "End",
          accClose: "Close",
          ariaLevel: 2,
          showHiddenClose: true,
          displayHiddenClose: true,
          showHiddenBounds: true,
          source: "",
          bind: "",
          displayInline: false,

          allowCascade: false,
          reverseJSOrder: false,
          runJSOnceBefore: [],
          runOnceBefore: function(dc) {},
          runJSBefore: [],
          runBefore: function(dc) {},
          runDuring: function(dc) {},
          runJSOnceAfter: [],
          runOnceAfter: function(dc) {},
          runJSAfter: [],
          runAfter: function(dc) {},
          runBeforeClose: function(dc) {},
          runAfterClose: function(dc) {},

          allowMultiple: false,
          allowReopen: false,
          isToggle: false,
          toggleRole: "",
          toggleState: "",
          forceFocus: false,
          returnFocus: true,
          isStatic: "",
          prepend: false,
          append: false,
          isTab: false,
          tabRole: "Tab",
          tabState: "Selected",
          autoStart: false,
          announce: false,
          lock: false,
          mode: 0,

          hSource: function(source, dc) {
            var dc = dc || this;
            pL(dc.containerDiv).html(source);
            return dc;
          },
          hLoadData: "",
          hLoad: function(responseText, textStatus, XMLHttpRequest, dc) {},
          hGetData: {},
          hGetType: "",
          hGet: function(data, textStatus, dc) {},
          hJSONData: {},
          hJSON: function(data, textStatus, dc) {},
          hScript: function(data, textStatus, dc) {},
          hPostData: {},
          hPostType: "",
          hPost: function(data, textStatus, dc) {},
          ajaxOptions: {
            beforeSend: function(XMLHttpRequest) {
              dc.hBeforeSend(this, XMLHttpRequest, dc);
            },
            success: function(source, textStatus, XMLHttpRequest) {
              dc.hSuccess(this, source, textStatus, XMLHttpRequest, dc);
              dc.hSource(dc.content);
              parseRemaining(dc);
            },
            complete: function(XMLHttpRequest, textStatus) {
              dc.hComplete(this, XMLHttpRequest, textStatus, dc);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              dc.hError(this, XMLHttpRequest, textStatus, errorThrown, dc);
            }
          },
          hBeforeSend: function(options, XMLHttpRequest, dc) {},
          hSuccess: function(options, data, textStatus, XMLHttpRequest, dc) {
            dc.content = data;
          },
          hComplete: function(options, XMLHttpRequest, textStatus, dc) {},
          hError: function(
            options,
            XMLHttpRequest,
            textStatus,
            errorThrown,
            dc
          ) {},

          open: function(dc) {
            var dc = dc || this;
            if (dc.fn.toggleFocus) dc.fn.toggleFocus = false;
            else loadAccDCObj(dc);
            return dc;
          },
          close: function(dc) {
            var dc = dc || this;
            return closeAccDCObj(dc);
          },

          isDraggable: false,
          drag: {
            handle: null,
            maxX: null,
            maxY: null,
            persist: false,
            x: null,
            y: null,
            confineTo: null,
            init: null,
            override: null
          },
          onDragStart: function(ev, dd, dc) {},
          onDragEnd: function(ev, dd, dc) {},
          onDrag: function(ev, dd, dc) {},
          dropTarget: null,
          dropInit: null,
          drop: {},
          onDropStart: function(ev, dd, dc) {},
          onDrop: function(ev, dd, dc) {},
          onDropEnd: function(ev, dd, dc) {},
          setDrag: function(dc) {
            var dc = dc || this;
            return setDrag(dc);
          },
          unsetDrag: function(dc, uDrop) {
            if (dc && typeof dc === "boolean") {
              uDrop = dc;
              dc = this;
            } else var dc = dc || this;
            unsetDrag(dc, uDrop);
            return dc;
          },

          accDD: {
            on: false,
            dragText: "Move",
            toText: "to",
            dropTargets: [],
            // Must match the accepted values for aria-dropeffect
            dropEffect: "move",
            actionText: "Dragging",
            returnFocusTo: "",
            isDragging: false,
            dragClassName: "",
            dragLinkStyle: {},
            duration: 500,
            fireDrag: function(ev, dc) {
              var os = xOffset(this);
              dc.accDD.dragDD = {
                drag: this,
                proxy: this,
                drop: dc.accDD.dropTargets,
                available: dc.accDD.dropTargets,
                /*
update: function(dc){
dc.accDD.dropTargets = [];
dc.accDD.dropAnchors = [];
$A.query(dc.dropTarget, function(){
dc.accDD.dropAnchors.push(this);
dc.accDD.dropTargets.push(this);
});
dc.accDD.dropLinks = [];
pL.each(dc.accDD.dropTargets, function(i, v){
dc.accDD.dropLinks.push(createEl('a', {
href: '#'
}, null, dc.accDD.dropClassName, dc.accDD.dropText + '&nbsp;' + dc.role));
});
var da = pL(dc.accDD.dropAnchor).get(0);
if (da) dc.accDD.dropAnchors[0] = da;
return dc.accDD.dragDD.drop = dc.accDD.dragDD.available = dc.accDD.dropTargets;
},
*/
                // BG:3.4:11/15/2017
                startX: os.left + os.width / 2,
                startY: os.top + os.height / 2,
                deltaX: 0,
                deltaY: 0,
                originalX: os.left,
                originalY: os.top,
                offsetX: 0,
                offsetY: 0
              };
              dc.accDD.dragDD.target = pL(dc.drag.handle).get(0) || this;
              // BG:3.4:11/15/2017
              dc.onDragStart.apply(this, [ev, dc.accDD.dragDD, dc]);
            },
            fireDrop: function(ev, dc) {
              var that = this,
                os = xOffset(this);
              dc.accDD.dropDD = {
                target: this,
                drag: dc.accDD.dragDD.drag,
                proxy: dc.accDD.dragDD.proxy,
                drop: dc.accDD.dragDD.drop,
                available: dc.accDD.dragDD.available,
                /*
update: function(dc){
return dc.accDD.dropDD.drop = dc.accDD.dropDD.available = dc.accDD.dragDD.update(dc);
},
*/
                startX: dc.accDD.dragDD.startX,
                startY: dc.accDD.dragDD.startY,
                originalX: dc.accDD.dragDD.originalX,
                originalY: dc.accDD.dragDD.originalY,
                deltaX: 0,
                deltaY: 0,
                offsetX: os.left,
                offsetY: os.top
              };
              // BG:3.4:11/15/2017
              function update() {
                // BG:3.4:11/15/2017
                var os = xOffset(dc.accDD.dragDD.drag);
                dc.accDD.dragDD.offsetY = os.top;
                dc.accDD.dragDD.offsetX = os.left;
              }
              transition(
                dc.accDD.dragDD.drag,
                {
                  top: dc.accDD.dropDD.offsetY,
                  left: dc.accDD.dropDD.offsetX
                },
                {
                  duration: dc.accDD.duration,
                  step: function() {
                    update();
                    dc.onDrag.apply(dc.accDD.dragDD.drag, [
                      ev,
                      dc.accDD.dragDD,
                      dc
                    ]);
                  },
                  complete: function() {
                    update();
                    if (dc.accDD.dragDD.originalY <= dc.accDD.dragDD.offsetY)
                      dc.accDD.dragDD.deltaY = dc.accDD.dropDD.deltaY =
                        dc.accDD.dragDD.originalY - dc.accDD.dragDD.offsetY;
                    else if (
                      dc.accDD.dragDD.originalY >= dc.accDD.dragDD.offsetY
                    )
                      dc.accDD.dragDD.deltaY = dc.accDD.dropDD.deltaY =
                        0 -
                        (dc.accDD.dragDD.offsetY - dc.accDD.dragDD.originalY);
                    if (dc.accDD.dragDD.originalX <= dc.accDD.dragDD.offsetX)
                      dc.accDD.dragDD.deltaX = dc.accDD.dropDD.deltaX =
                        dc.accDD.dragDD.originalX - dc.accDD.dragDD.offsetX;
                    else if (
                      dc.accDD.dragDD.originalX >= dc.accDD.dragDD.offsetX
                    )
                      dc.accDD.dragDD.deltaX = dc.accDD.dropDD.deltaX =
                        0 -
                        (dc.accDD.dragDD.offsetX - dc.accDD.dragDD.originalX);

                    var rft = dc.accDD.returnFocusTo;

                    dc.onDropStart.apply(that, [ev, dc.accDD.dropDD, dc]);
                    dc.onDrop.apply(that, [ev, dc.accDD.dropDD, dc]);
                    dc.onDropEnd.apply(that, [ev, dc.accDD.dropDD, dc]);
                    dc.onDragEnd.apply(dc.accDD.dragDD.drag, [
                      ev,
                      dc.accDD.dragDD,
                      dc
                    ]);

                    $A.setFocus(
                      (rft.nodeType === 1 ? rft : pL(rft).get(0)) || dc.accDCObj
                    );

                    dc.accDD.isDragging = false;
                    setAttr(dc.accDCObj, "aria-grabbed", "false");
                  }
                }
              );
            }
          },

          /*
mouseOver: function(ev, dc){ },
mouseOut: function(ev, dc){ },
resize: function(ev, dc){ },
scroll: function(ev, dc){ },
click: function(ev, dc){ },
dblClick: function(ev, dc){ },
mouseDown: function(ev, dc){ },
mouseUp: function(ev, dc){ },
mouseMove: function(ev, dc){ },
mouseEnter: function(ev, dc){ },
mouseLeave: function(ev, dc){ },
keyDown: function(ev, dc){ },
keyPress: function(ev, dc){ },
keyUp: function(ev, dc){ },
error: function(ev, dc){ },
focusIn: function(ev, dc){ },
focusOut: function(ev, dc){ },
*/

          tabOut: function(ev, dc) {},
          timeoutVal: 0,
          timeout: function(dc) {},

          className: "",
          closeClassName: "accDCCloseCls",
          cssObj: {},
          importCSS: "",
          css: function(prop, val, mergeCSS, dc) {
            var dc = dc || this;
            if (typeof prop === "string" && val) {
              if (mergeCSS) dc.cssObj[prop] = val;
              css(dc.accDCObj, prop, val);
              return dc;
            } else if (prop && typeof prop === "object") {
              if (val && typeof val === "boolean") pL.extend(dc.cssObj, prop);
              css(dc.accDCObj, prop);
              return dc;
            } else if (prop && typeof prop === "string")
              return css(dc.accDCObj, prop);
          },

          children: [],
          parent: null,

          autoPosition: 0,
          offsetTop: 0,
          offsetLeft: 0,
          offsetParent: null,
          posAnchor: null,
          setPosition: function(obj, posVal, save, dc) {
            if (typeof obj === "number") {
              dc = save;
              save = posVal;
              posVal = obj;
            }
            var dc = dc || this;
            if (save) {
              dc.posAnchor = obj || dc.posAnchor;
              dc.autoPosition = posVal || dc.autoPosition;
            }
            calcPosition(dc, obj, posVal);
            return dc;
          },

          applyFix: function(val, dc) {
            var dc = dc || this;
            if (val) dc.autoFix = val;
            setAutoFix(dc);
            if (dc.autoFix > 0) sizeAutoFix(dc);
            return dc;
          },

          shadow: {
            horizontal: "0px",
            vertical: "0px",
            blur: "0px",
            color: ""
          },
          setShadow: function(dc, shadow) {
            if (arguments.length === 1 && !("id" in dc)) {
              shadow = dc;
              dc = this;
            }
            if (shadow) pL.extend(dc.shadow, shadow);
            return setShadow(dc);
          },

          AccDCInit: function() {
            return this;
          }
        },
        aO = accDCObjects[a],
        gImport = gImport || {},
        gO = {},
        iO = {};

      if (aO.mode == 6) var ajaxOptions = dc.ajaxOptions;

      if (typeof aO.allowCascade !== "boolean")
        aO.allowCascade = gImport.allowCascade;
      if (typeof aO.allowCascade !== "boolean")
        aO.allowCascade = $A.fn.globalDC.allowCascade || dc.allowCascade;

      if (aO.allowCascade) {
        for (var s = 0; s < svs.length; s++) {
          gO[svs[s]] = $A.fn.globalDC[svs[s]];
          iO[svs[s]] = gImport[svs[s]];
        }
      }

      if (!pL.isEmptyObject($A.fn.globalDC))
        pL.extend(true, dc, $A.fn.globalDC);

      if (!pL.isEmptyObject(gImport)) pL.extend(true, dc, gImport);

      pL.extend(true, dc, aO);

      if (aO.mode == 6 && ajaxOptions) pL.extend(dc.ajaxOptions, ajaxOptions);

      if (dc.allowCascade) {
        for (var s = 0; s < svs.length; s++) {
          $A.fn.globalDC[svs[s]] = gO[svs[s]];
        }
        dc.fn.proto = iO;
      }

      if (dc.id && dc.role) {
        ids.push(dc.id);
        if (dc.autoStart) autoStart.push(dc.id);
        dc.indexVal = wheel.length;
        wheel[dc.indexVal] = AccDCInit(dc);

        if (parentDC) {
          var chk = -1,
            p = $A.reg[parentDC.id],
            c = $A.reg[wheel[dc.indexVal].id];
          for (var i = 0; i < p.children.length; i++) {
            if (c.id === p.children[i].id) chk = i;
          }
          if (chk >= 0) p.children.slice(chk, 1, c);
          else p.children.push(c);
          c.parent = p;
          var t = c;
          while (t.parent) t = t.parent;
          c.top = t;
        } else wheel[dc.indexVal].top = wheel[dc.indexVal];
      } else if ($A.fn.debug)
        alert(
          "Error: To ensure both proper functionality and accessibility, every AccDC Dynamic Content Object must have a unique ID and an informative ROLE. View the Setup and Automatic Accessibility Framework sections in the WhatSock.com Core API documentation for additional details."
        );
    }

    for (var a = 0; a < wheel.length; a++) wheel[a].siblings = wheel;

    for (var s = 0; s < autoStart.length; s++) {
      var dc = $A.reg[autoStart[s]];
      var t = pL(dc.trigger).get(0);
      dc.triggerObj = t ? t : null;
      dc.open();
    }
  };

  if (window.InitAccDC && window.InitAccDC.length) {
    pL.ajaxSetup({ async: false });
    for (var i = 0; i < window.InitAccDC.length; i++)
      $A.getScript(window.InitAccDC[i]);
    pL.ajaxSetup({ async: true });
  }
})($);
