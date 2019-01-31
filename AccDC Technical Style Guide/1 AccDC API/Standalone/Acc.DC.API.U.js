/*!
AccDC API - 3.4 Standalone (12/11/2017)
Copyright 2010-2017 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/
(function( window, undefined ) {

var accDCVersion = '3.4 (12/11/2017)',
document = window.document,
accDC = {},

getEl = function(e){
if (document.getElementById) return document.getElementById(e);
else if (document.all) return document.all[e];
else return null;
},

createEl = function(t){
var o = document.createElement(t);
if (arguments.length === 1) return o;
if (arguments[1]) setAttr(o, arguments[1]);
if (arguments[2]) css(o, arguments[2]);
if (arguments[3]) addClass(o, arguments[3]);
if (arguments[4]) o.appendChild(arguments[4]);
return o;
},

createText = function(s){
return document.createTextNode(s);
},

createAttr = function(a){
return document.createAttribute(a);
},

getAttr = function(e, n){
if (!e) return null;
var a;
if (e.getAttribute)
a = e.getAttribute(n);
if (!a && e.getAttributeNode)
a = e.getAttributeNode(n);
if (!a && e[n])
a = e[n];
return a;
},

remAttr = function(e, n){
if (!e) return false;
var a = isArray(n) ? n : [n];
for (var i = 0; i < a.length; i++){
if (e.removeAttribute) e.removeAttribute(a[i]);
}
return false;
},

getText = function(n){
if (!n) return '';
return n.innerText || n.textContent || pL.find.getText([n]) || '';
},

css = function(obj, p, v){
if (!obj) return null;
if (obj.nodeName && typeof p === 'string' && !v) return obj.style && obj.style[p] ? obj.style[p] : xGetComputedStyle(obj, p);
var o = isArray(obj) ? obj : [obj],
check = 'top left bottom right width height';
for (var i = 0; i < o.length; i++){
if (typeof p === 'string'){
try {
o[i].style[xCamelize(p)] = check.indexOf(p) !== -1 && typeof v === 'number' ? v + 'px' : v;
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
} else if (typeof p === 'object'){
for (var a = 1; a < arguments.length; a++){
for (var n in arguments[a]){
try {
o[i].style[xCamelize(n)] = check.indexOf(n) !== -1 && typeof arguments[a][n] === 'number' ? arguments[a][n] + 'px' : arguments[a][n];
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

trim = function(str){
return str.replace(/^\s+|\s+$/g, '');
},

setAttr = function(obj, name, value){
if (!obj) return null;
if (typeof name === 'string'){
obj.setAttribute(name, value);
} else if (typeof name === 'object'){
for (var n in name){
obj.setAttribute(n, name[n]);
}
}
return obj;
},

isArray = function(v){
return v && typeof v === 'object' && typeof v.length === 'number' && typeof v.splice === 'function' && !(v.propertyIsEnumerable('length'));
},

inArray = function(search, stack){
if (stack.indexOf) return stack.indexOf(search);
for (var i = 0; i < stack.length; i++){
if (stack[i] === search) return i;
}
return -1;
},

hasClass = function(obj, cn){
if (!obj || !obj.className) return false;
var names = cn.split(' '),
i = 0;
for (var n = 0; n < names.length; n++){
if (obj.className.indexOf(names[n]) !== -1) i += 1;
}
if (i === names.length) return true;
return false;
},

addClass = function(obj, cn){
if (!obj) return null;
var o = isArray(obj) ? obj : [obj],
names = cn.split(' ');
for (var i = 0; i < o.length; i++){
for (var n = 0; n < names.length; n++){
if (!hasClass(o[i], names[n])){
o[i].className = trim(o[i].className + ' ' + names[n]);
}
}
}
return obj;
},

remClass = function(obj, cn){
if (!obj) return null;
var o = isArray(obj) ? obj : [obj],
names = cn.split(' ');
for (var i = 0; i < o.length; i++){
for (var n = 0; n < names.length; n++){
var classes = o[i].className.split(' ');
var a = inArray(names[n], classes);
if (a !== -1){
classes.splice(a, 1);
if (classes.length) o[i].className = trim(classes.join(' '));
else o[i].className = '';
}
}
}
return obj;
},

firstChild = function(e, t){
var e = e ? e.firstChild : null;
while(e){
if (e.nodeType === 1 && (!t || t.toLowerCase() === e.nodeName.toLowerCase())) break;
e = e.nextSibling;
}
return e;
},

lastChild = function(e, t){
var e = e ? e.lastChild : null;
while(e){
if (e.nodeType === 1 && (!t || t.toLowerCase() === e.nodeName.toLowerCase())) break;
e = e.previousSibling;
}
return e;
},

insertBefore = function(f, s){
if (!f) return s;
f.parentNode.insertBefore(s, f);
return s;
},

nowI = 0,

now = function(v){
return new Date().getTime() + (nowI++);
},

sraCSS = {
position: 'absolute',
clip: 'rect(1px 1px 1px 1px)',
clip: 'rect(1px, 1px, 1px, 1px)',
clipPath: 'inset(50%)',
padding: 0,
border: 0,
height: '1px',
width: '1px',
overflow: 'hidden',
whiteSpace: 'nowrap'
},

sraCSSClear = function(o){
css(o, {
position: '',
clip: 'auto',
clipPath: 'none',
padding: '',
height: '',
width: '',
overflow: '',
whiteSpace: 'normal'
});
return o;
},

getWin = function(){
return {
width: window.document.documentElement.clientWidth || window.document.body.clientWidth,
height: window.document.documentElement.clientHeight || window.document.body.clientHeight
};
},

transition = function(ele, targ, config){
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
tmr = setInterval( function(){
var elapsedTime = new Date().getTime() - startTime;
if (elapsedTime < uTotalTime){
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
xOffset = function(c, forceAbsolute, forceRelative, returnTopLeftOnly){
if (c && c.nodeType === 1){
var r = {},
position = css(c, 'position');
if (forceAbsolute || position == 'absolute') r = getAbsolutePos(c);
else if (forceRelative || position == 'relative'){
r.top = c.offsetTop;
r.left = c.offsetLeft;
} else
r = c.getBoundingClientRect();
if (!returnTopLeftOnly){
// Normalize the height, width, right, and bottom properties of r regardless which method above is used
r.height = xHeight(c);
r.width = xWidth(c);
r.right = r.left + r.width;
r.bottom = r.top + r.height;
} else {
// Otherwise ensure only top and left properties are returned if returnTopLeftOnly = true
r.height = r.width = r.right = r.bottom = '';
}
return r;
} else return null;
},

// BG:3.4:11/17/2017
getAbsolutePos = function(obj){
var curleft = curtop = 0;
do {
curleft += obj.offsetLeft;
curtop += obj.offsetTop;
} while (obj = obj.offsetParent);
return {
left: curleft,
top: curtop
};
},

xCamelize = function(cssPropStr){
  var i, c, a, s;
  a = cssPropStr.split('-');
  s = a[0];
  for (i=1; i<a.length; i++) {
    c = a[i].charAt(0);
    s += a[i].replace(c, c.toUpperCase());
  }
  return s;
},

xGetComputedStyle = function(e, p, i){
if (!e) return null;
var s,
v = 'undefined',
dv = document.defaultView;
if(dv && dv.getComputedStyle){
if (e == document) e = document.body;
s = dv.getComputedStyle(e,'');
if (s)
v = s.getPropertyValue(p);
} else if (e.currentStyle)
v = e.currentStyle[xCamelize(p)];
  else return null;
  return i ? (parseInt(v) || 0) : v;
},

xNum = function(){
for(var i=0; i<arguments.length; i++){
if (isNaN(arguments[i]) || typeof arguments[i] !== 'number') return false;
}
return true;
},

xDef = function(){
for(var i=0; i<arguments.length; i++){
if (typeof arguments[i] === 'undefined') return false;
}
return true;
},

xStr = function(){
for(var i=0; i<arguments.length; i++){
if (typeof arguments[i] !== 'string') return false;
}
  return true;
},

xHeight = function(e,h){
var css, pt=0, pb=0, bt=0, bb=0;
if (!e) return 0;
if (xNum(h)) {
if (h<0) h = 0;
else h=Math.round(h);
} else h=-1;
css=xDef(e.style);
if(css && xDef(e.offsetHeight) && xStr(e.style.height)) {
if(h>=0) {
if (document.compatMode=='CSS1Compat') {
pt=xGetComputedStyle(e,'padding-top',1);
if (pt !== null) {
pb=xGetComputedStyle(e,'padding-bottom',1);
bt=xGetComputedStyle(e,'border-top-width',1);
bb=xGetComputedStyle(e,'border-bottom-width',1);
}
else if(xDef(e.offsetHeight,e.style.height)){
e.style.height=h+'px';
pt=e.offsetHeight-h;
}
}
h-=(pt+pb+bt+bb);
if(isNaN(h)||h<0) return;
else e.style.height=h+'px';
}
h=e.offsetHeight;
} else if(css && xDef(e.style.pixelHeight)) {
if(h>=0) e.style.pixelHeight=h;
h=e.style.pixelHeight;
}
return h;
},

xWidth = function(e,w){
var css, pl=0, pr=0, bl=0, br=0;
if (!e) return 0;
if (xNum(w)) {
if (w<0) w = 0;
else w=Math.round(w);
} else w=-1;
css=xDef(e.style);
if(css && xDef(e.offsetWidth) && xStr(e.style.width)) {
if(w>=0) {
if (document.compatMode=='CSS1Compat') {
pl=xGetComputedStyle(e,'padding-left',1);
if (pl !== null) {
pr=xGetComputedStyle(e,'padding-right',1);
bl=xGetComputedStyle(e,'border-left-width',1);
br=xGetComputedStyle(e,'border-right-width',1);
}
else if(xDef(e.offsetWidth,e.style.width)){
e.style.width=w+'px';
pl=e.offsetWidth-w;
}
}
w-=(pl+pr+bl+br);
if(isNaN(w)||w<0) return;
else e.style.width=w+'px';
}
w=e.offsetWidth;
}
else if(css && xDef(e.style.pixelWidth)) {
if(w>=0) e.style.pixelWidth=w;
w=e.style.pixelWidth;
}
return w;
},

xTop = function(e, iY){
if (!e) return 0;
var css=xDef(e.style);
if(css && xStr(e.style.top)) {
if(xNum(iY)) e.style.top=iY+'px';
else {
iY=parseInt(e.style.top);
if(isNaN(iY)) iY=xGetComputedStyle(e,'top',1);
if(isNaN(iY)) iY=0;
}
}
else if(css && xDef(e.style.pixelTop)) {
if(xNum(iY)) e.style.pixelTop=iY;
else iY=e.style.pixelTop;
}
return iY;
},

xLeft = function(e, iX){
if (!e) return 0;
var css=xDef(e.style);
if (css && xStr(e.style.left)) {
if(xNum(iX)) e.style.left=iX+'px';
else {
iX=parseInt(e.style.left);
if(isNaN(iX)) iX=xGetComputedStyle(e,'left',1);
if(isNaN(iX)) iX=0;
}
}
else if(css && xDef(e.style.pixelLeft)) {
if(xNum(iX)) e.style.pixelLeft=iX;
else iX=e.style.pixelLeft;
}
return iX;
},

// BG:3.4:11/15/2017
pointerPos = function(e){
var posx = 0, posy = 0;
if (e.pageX || e.pageY) {
posx = e.pageX;
posy = e.pageY;
}
else if (e.clientX || e.clientY) {
posx = e.clientX + document.body.scrollLeft
+ document.documentElement.scrollLeft;
posy = e.clientY + document.body.scrollTop
+ document.documentElement.scrollTop;
}
return {
x: posx,
y: posy
};
},

/*
The below components are derived from a combination of jQuery 1.4.4 and jQuery 1.8.1, and include three main components, none of which are public:

1) The event binding model
2) The data serialization model
3) The Sizzle CSS selector engine

All other components and features have been removed to increase speed and reduce process redundancies,
and 'jQuery' has been changed to 'pL' to make it clear that standard jQuery functionality won't work here.

The AccDC object model is not the same as the jQuery object model, since AccDC Objects are instantiated separately.
*/

$L,

rformElems = /^(?:textarea|input|select)$/i,
rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
rkeyEvent = /^key/,
rmouseEvent = /^(?:mouse|contextmenu)|click/,
rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
hoverHack = function( events ) {
return pL.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
};

var pL = (function() {
var pL = function( selector, context ) {
return new pL.fn.init( selector, context );
},
_pL = accDC.pL,
_$L = $L,
rootpL,
quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
isSimple = /^.[^:#\[\.,]*$/,
rnotwhite = /\S/,
rwhite = /\s/,
trimLeft = /^\s+/,
trimRight = /\s+$/,
rnonword = /\W/,
rdigit = /\d/,
rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
rvalidchars = /^[\],:{}\s]*$/,
rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
rwebkit = /(webkit)[ \/]([\w.]+)/,
ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
rmsie = /(msie) ([\w.]+)/,
rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
userAgent = navigator.userAgent,
browserMatch,
readyBound = false,
readyList = [],
DOMContentLoaded,
toString = Object.prototype.toString,
hasOwn = Object.prototype.hasOwnProperty,
push = Array.prototype.push,
slice = Array.prototype.slice,
trim = String.prototype.trim,
indexOf = Array.prototype.indexOf,
class2type = {};
pL.fn = pL.prototype = {
init: function( selector, context ) {
var match, elem, ret, doc;
if ( !selector ) {
return this;
}
if ( selector.nodeType ) {
this.context = this[0] = selector;
this.length = 1;
return this;
}
if ( selector === "body" && !context && document.body ) {
this.context = document;
this[0] = document.body;
this.selector = "body";
this.length = 1;
return this;
}
if ( typeof selector === "string" ) {
match = quickExpr.exec( selector );
if ( match && (match[1] || !context) ) {
if ( match[1] ) {
doc = (context ? context.ownerDocument || context : document);
ret = rsingleTag.exec( selector );
if ( ret ) {
if ( pL.isPlainObject( context ) ) {
selector = [ document.createElement( ret[1] ) ];
pL.fn.attr.call( selector, context, true );
} else {
selector = [ doc.createElement( ret[1] ) ];
}
} else {
ret = pL.buildFragment( [ match[1] ], [ doc ] );
selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
}
return pL.merge( this, selector );
} else {
elem = document.getElementById( match[2] );
if ( elem && elem.parentNode ) {
if ( elem.id !== match[2] ) {
return rootpL.find( selector );
}
this.length = 1;
this[0] = elem;
}
this.context = document;
this.selector = selector;
return this;
}
} else if ( !context && !rnonword.test( selector ) ) {
this.selector = selector;
this.context = document;
selector = document.getElementsByTagName( selector );
return pL.merge( this, selector );
} else if ( !context || context.pL ) {
return (context || rootpL).find( selector );
} else {
return pL( context ).find( selector );
}
} else if ( pL.isFunction( selector ) ) {
return rootpL.ready( selector );
}
if (selector.selector !== undefined) {
this.selector = selector.selector;
this.context = selector.context;
}
return pL.makeArray( selector, this );
},
selector: "",
pL: accDCVersion,
length: 0,
size: function() {
return this.length;
},
toArray: function() {
return slice.call( this, 0 );
},
get: function( num ) {
return num == null ?
// Return a 'clean' array
this.toArray() :
// Return just the object
( num < 0 ? this.slice(num)[ 0 ] : this[ num ] );
},
// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack: function( elems, name, selector ) {
// Build a new pL matched element set
var ret = pL();
if ( pL.isArray( elems ) ) {
push.apply( ret, elems );
} else {
pL.merge( ret, elems );
}
// Add the old object onto the stack (as a reference)
ret.prevObject = this;
ret.context = this.context;
if ( name === "find" ) {
ret.selector = this.selector + (this.selector ? " " : "") + selector;
} else if ( name ) {
ret.selector = this.selector + "." + name + "(" + selector + ")";
}
// Return the newly-formed element set
return ret;
},
// Execute a callback for every element in the matched set.
// (You can seed the arguments with an array of args, but this is
// only used internally.)
each: function( callback, args ) {
return pL.each( this, callback, args );
},
ready: function( fn ) {
// Attach the listeners
pL.bindReady();
// If the DOM is already ready
if ( pL.isReady ) {
// Execute the function immediately
fn.call( document, pL );
// Otherwise, remember the function for later
} else if ( readyList ) {
// Add the function to the wait list
readyList.push( fn );
}
return this;
},
slice: function() {
return this.pushStack( slice.apply( this, arguments ),
"slice", slice.call(arguments).join(",") );
},
map: function( callback ) {
return this.pushStack( pL.map(this, function( elem, i ) {
return callback.call( elem, i, elem );
}));
},
// For internal use only.
// Behaves like an Array's method, not like a pL method.
push: push,
sort: [].sort,
splice: [].splice
};
// Give the init function the pL prototype for later instantiation
pL.fn.init.prototype = pL.fn;
pL.extend = 
pL.fn.extend = function() {
 var options, name, src, copy, copyIsArray, clone,
target = arguments[0] || {},
i = 1,
length = arguments.length,
deep = false;
// Handle a deep copy situation
if ( typeof target === "boolean" ) {
deep = target;
target = arguments[1] || {};
// skip the boolean and the target
i = 2;
}
// Handle case when target is a string or something (possible in deep copy)
if ( typeof target !== "object" && !pL.isFunction(target) ) {
target = {};
}
// extend pL itself if only one argument is passed
if ( length === i ) {
target = this;
--i;
}
for ( ; i < length; i++ ) {
// Only deal with non-null/undefined values
if ( (options = arguments[ i ]) != null ) {
// Extend the base object
for ( name in options ) {
src = target[ name ];
copy = options[ name ];
// Prevent never-ending loop
if ( target === copy ) {
continue;
}
// Recurse if we're merging plain objects or arrays
if ( deep && copy && ( pL.isPlainObject(copy) || (copyIsArray = pL.isArray(copy)) ) ) {
if ( copyIsArray ) {
copyIsArray = false;
clone = src && pL.isArray(src) ? src : [];
} else {
clone = src && pL.isPlainObject(src) ? src : {};
}
// Never move original objects, clone them
target[ name ] = 
pL.extend( deep, clone, copy );
// Don't bring in undefined values
} else if ( copy !== undefined ) {
target[ name ] = copy;
}
}
}
}
// Return the modified object
return target;
};
pL.extend({
noConflict: function( deep ) {
$L = _$L;
if ( deep ) {
accDC.pL = _pL;
}
return pL;
},
// Is the DOM ready to be used? Set to true once it occurs.
isReady: false,
// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait: 1,
// Handle when the DOM is ready
ready: function( wait ) {
// A third-party is pushing the ready event forwards
if ( wait === true ) {
pL.readyWait--;
}
// Make sure that the DOM is not already loaded
if ( !pL.readyWait || (wait !== true && !pL.isReady) ) {
// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
if ( !document.body ) {
return setTimeout( pL.ready, 1 );
}
// Remember that the DOM is ready
pL.isReady = true;
// If a normal DOM Ready event fired, decrement, and wait if need be
if ( wait !== true && --pL.readyWait > 0 ) {
return;
}
// If there are functions bound, to execute
if ( readyList ) {
// Execute all of them
var fn,
i = 0,
ready = readyList;
// Reset the list of functions
readyList = null;
while ( (fn = ready[ i++ ]) ) {
fn.call( document, pL );
}
// Trigger any bound ready events
if ( pL.fn.trigger ) {
pL( document ).trigger( "ready" ).unbind( "ready" );
}
}
}
},
bindReady: function() {
if ( readyBound ) {
return;
}
readyBound = true;
// Catch cases where $(document).ready() is called after the
// browser event has already occurred.
if ( document.readyState === "complete" ) {
// Handle it asynchronously to allow scripts the opportunity to delay ready
return setTimeout( pL.ready, 1 );
}
// Mozilla, Opera and webkit nightlies currently support this event
if ( document.addEventListener ) {
// Use the handy event callback
document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
// A fallback to window.onload, that will always work
window.addEventListener( "load", pL.ready, false );
// If IE event model is used
} else if ( document.attachEvent ) {
// ensure firing before onload,
// maybe late but safe also for iframes
document.attachEvent("onreadystatechange", DOMContentLoaded);
// A fallback to window.onload, that will always work
window.attachEvent( "onload", pL.ready );
// If IE and not a frame
// continually check to see if the document is ready
var toplevel = false;
try {
toplevel = window.frameElement == null;
} catch(e) {}
if ( document.documentElement.doScroll && toplevel ) {
doScrollCheck();
}
}
},
// See test/unit/core.js for details concerning isFunction.
// Since version 1.3, DOM methods and functions like alert
// aren't supported. They return false on IE (#2968).
isFunction: function( obj ) {
return pL.type(obj) === "function";
},
isArray: Array.isArray || function( obj ) {
return pL.type(obj) === "array";
},
// A crude way of determining if an object is a window
isWindow: function( obj ) {
return obj && typeof obj === "object" && "setInterval" in obj;
},
isNaN: function( obj ) {
return obj == null || !rdigit.test( obj ) || isNaN( obj );
},
type: function( obj ) {
return obj == null ?
String( obj ) :
class2type[ toString.call(obj) ] || "object";
},
isPlainObject: function( obj ) {
// Must be an Object.
// Because of IE, we also have to check the presence of the constructor property.
// Make sure that DOM nodes and window objects don't pass through, as well
if ( !obj || pL.type(obj) !== "object" || obj.nodeType || pL.isWindow( obj ) ) {
return false;
}
// Not own constructor property must be Object
if ( obj.constructor &&
!hasOwn.call(obj, "constructor") &&
!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
return false;
}
// Own properties are enumerated firstly, so to speed up,
// if last one is own, then all properties are own.
var key;
for ( key in obj ) {}
return key === undefined || hasOwn.call( obj, key );
},
isEmptyObject: function( obj ) {
for ( var name in obj ) {
return false;
}
return true;
},
error: function( msg ) {
throw msg;
},
parseJSON: function( data ) {
if ( typeof data !== "string" || !data ) {
return null;
}
// Make sure leading/trailing whitespace is removed (IE can't handle it)
data = pL.trim( data );
// Make sure the incoming data is actual JSON
// Logic borrowed from http://json.org/json2.js
if ( rvalidchars.test(data.replace(rvalidescape, "@")
.replace(rvalidtokens, "]")
.replace(rvalidbraces, "")) ) {
// Try to use the native JSON parser first
return window.JSON && window.JSON.parse ?
window.JSON.parse( data ) :
(new Function("return " + data))();
} else {
pL.error( "Invalid JSON: " + data );
}
},
noop: function() {},
// Evalulates a script in a global context
globalEval: function( data ) {
if ( data && rnotwhite.test(data) ) {
// Inspired by code by Andrea Giammarchi
// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
var head = document.getElementsByTagName("head")[0] || document.documentElement,
script = document.createElement("script");
script.type = "text/javascript";
if ( pL.support.scriptEval ) {
script.appendChild( document.createTextNode( data ) );
} else {
script.text = data;
}
// Use insertBefore instead of appendChild to circumvent an IE6 bug.
// This arises when a base node is used (#2709).
head.insertBefore( script, head.firstChild );
head.removeChild( script );
}
},
nodeName: function( elem, name ) {
return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
},
// args is for internal usage only
each: function( object, callback, args ) {
var name, i = 0,
length = object.length,
isObj = length === undefined || pL.isFunction(object);
if ( args ) {
if ( isObj ) {
for ( name in object ) {
if ( callback.apply( object[ name ], args ) === false ) {
break;
}
}
} else {
for ( ; i < length; ) {
if ( callback.apply( object[ i++ ], args ) === false ) {
break;
}
}
}
// A special, fast, case for the most common use of each
} else {
if ( isObj ) {
for ( name in object ) {
if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
break;
}
}
} else {
for ( var value = object[0];
i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
}
}
return object;
},
// Use native String.trim function wherever possible
trim: trim,
// results is for internal usage only
makeArray: function( array, results ) {
var ret = results || [];
if ( array != null ) {
// The window, strings (and functions) also have 'length'
// The extra typeof function check is to prevent crashes
// in Safari 2 (See: #3039)
// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
var type = pL.type(array);
if ( array.length == null || type === "string" || type === "function" || type === "regexp" || pL.isWindow( array ) ) {
push.call( ret, array );
} else {
pL.merge( ret, array );
}
}
return ret;
},
inArray: inArray,
merge: function( first, second ) {
var i = first.length,
j = 0;
if ( typeof second.length === "number" ) {
for ( var l = second.length; j < l; j++ ) {
first[ i++ ] = second[ j ];
}
} else {
while ( second[j] !== undefined ) {
first[ i++ ] = second[ j++ ];
}
}
first.length = i;
return first;
},
grep: function( elems, callback, inv ) {
var ret = [], retVal;
inv = !!inv;
// Go through the array, only saving the items
// that pass the validator function
for ( var i = 0, length = elems.length; i < length; i++ ) {
retVal = !!callback( elems[ i ], i );
if ( inv !== retVal ) {
ret.push( elems[ i ] );
}
}
return ret;
},
// arg is for internal usage only
map: function( elems, callback, arg ) {
var ret = [], value;
// Go through the array, translating each of the items to their
// new value (or values).
for ( var i = 0, length = elems.length; i < length; i++ ) {
value = callback( elems[ i ], i, arg );
if ( value != null ) {
ret[ ret.length ] = value;
}
}
return ret.concat.apply( [], ret );
},
// A global GUID counter for objects
guid: 1,
proxy: function( fn, proxy, thisObject ) {
if ( arguments.length === 2 ) {
if ( typeof proxy === "string" ) {
thisObject = fn;
fn = thisObject[ proxy ];
proxy = undefined;
} else if ( proxy && !pL.isFunction( proxy ) ) {
thisObject = proxy;
proxy = undefined;
}
}
if ( !proxy && fn ) {
proxy = function() {
return fn.apply( thisObject || this, arguments );
};
}
// Set the guid of unique handler to the same of original handler, so it can be removed
if ( fn ) {
proxy.guid = fn.guid = fn.guid || proxy.guid || pL.guid++;
}
// So proxy can be declared as an argument
return proxy;
}
});
// Populate the class2type map
pL.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
if ( indexOf ) {
pL.inArray = function( elem, array ) {
return indexOf.call( array, elem );
};
}
// Verify that \s matches non-breaking spaces
// (IE fails on this test)
if ( !rwhite.test( "\xA0" ) ) {
trimLeft = /^[\s\xA0]+/;
trimRight = /[\s\xA0]+$/;
}
// All pL objects should point back to these
rootpL = pL(document);
// Cleanup functions for the document ready method
if ( document.addEventListener ) {
DOMContentLoaded = function() {
document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
pL.ready();
};
} else if ( document.attachEvent ) {
DOMContentLoaded = function() {
// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
if ( document.readyState === "complete" ) {
document.detachEvent( "onreadystatechange", DOMContentLoaded );
pL.ready();
}
};
}
// The DOM ready check for Internet Explorer
function doScrollCheck() {
if ( pL.isReady ) {
return;
}
try {
// If IE is used, use the trick by Diego Perini
// http://javascript.nwbox.com/IEContentLoaded/
document.documentElement.doScroll("left");
} catch(e) {
setTimeout( doScrollCheck, 1 );
return;
}
// and execute any waiting functions
pL.ready();
}
// Expose pL to the global object
return (accDC.pL = $L = pL);
})();
// edit1start
(function() {
pL.support = {};
var root = document.documentElement,
script = document.createElement("script"),
div = document.createElement("div"),
id = "script" + now();
div.style.display = "none";
div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var all = div.getElementsByTagName("*"),
a = div.getElementsByTagName("a")[0];
//select = document.createElement("select"),
//opt = select.appendChild( document.createElement("option") );
// Can't get basic test support
if ( !all || !all.length || !a ){
return;
}
pL.support = {
// IE strips leading whitespace when .innerHTML is used
leadingWhitespace: div.firstChild.nodeType === 3,
// Make sure that tbody elements aren't automatically inserted
// IE will insert them into empty tables
tbody: !div.getElementsByTagName("tbody").length,
// Make sure that link elements get serialized correctly by innerHTML
// This requires a wrapper element in IE
htmlSerialize: !!div.getElementsByTagName("link").length,
parentNode: true,
// Get the style information from getAttribute
// (IE uses .cssText insted)
//style: /red/.test( a.getAttribute("style") ),
// Make sure that URLs aren't manipulated
// (IE normalizes it by default)
//hrefNormalized: a.getAttribute("href") === "/a",
// Make sure that element opacity exists
// (IE uses filter instead)
// Use a regex to work around a WebKit issue. See #5145
//opacity: /^0.55$/.test( a.style.opacity ),
// Verify style float existence
// (IE uses styleFloat instead of cssFloat)
//cssFloat: !!a.style.cssFloat,
// Make sure that if no value is specified for a checkbox
// that it defaults to "on".
// (WebKit defaults to "" instead)
//checkOn: div.getElementsByTagName("input")[0].value === "on",
// Make sure that a selected-by-default option has a working selected property.
// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
//optSelected: opt.selected,
//optDisabled: false,
// Will be defined later
deleteExpando: true,
checkClone: false,
scriptEval: false,
noCloneEvent: true
//boxModel: null,
//inlineBlockNeedsLayout: false,
//shrinkWrapBlocks: false,
//reliableHiddenOffsets: true
};
// Make sure that the options inside disabled selects aren't marked as disabled
// (WebKit marks them as diabled)
//select.disabled = true;
//pL.support.optDisabled = !opt.disabled;
script.type = "text/javascript";
try {
script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
} catch(e) {}
root.insertBefore( script, root.firstChild );
// Make sure that the execution of code works by injecting a script
// tag with appendChild/createTextNode
// (IE doesn't support this, fails, and uses .text instead)
if ( window[ id ] ) {
pL.support.scriptEval = true;
delete window[ id ];
}
// Test to see if it's possible to delete an expando from an element
// Fails in Internet Explorer
try {
delete script.test;
} catch(e) {
pL.support.deleteExpando = false;
}
root.removeChild( script );
if ( div.attachEvent && div.fireEvent ) {
div.attachEvent("onclick", function click() {
// Cloning a node shouldn't copy over any
// bound event handlers (IE does this)
pL.support.noCloneEvent = false;
div.detachEvent("onclick", click);
});
div.cloneNode(true).fireEvent("onclick");
}
div = document.createElement("div");
div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
var fragment = document.createDocumentFragment();
fragment.appendChild( div.firstChild );
// WebKit doesn't clone checked state correctly in fragments
pL.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
/*
// Figure out if the W3C box model works as expected
// document.body must exist before we can do this
pL(function() {
var div = document.createElement("div");
div.style.width = div.style.paddingLeft = "1px";
document.body.appendChild( div );
pL.boxModel = pL.support.boxModel = div.offsetWidth === 2;
if ( "zoom" in div.style ) {
// Check if natively block-level elements act like inline-block
// elements when setting their display to 'inline' and giving
// them layout
// (IE < 8 does this)
div.style.display = "inline";
div.style.zoom = 1;
pL.support.inlineBlockNeedsLayout = div.offsetWidth === 2;
// Check if elements with layout shrink-wrap their children
// (IE 6 does this)
div.style.display = "";
div.innerHTML = "<div style='width:4px;'></div>";
pL.support.shrinkWrapBlocks = div.offsetWidth !== 2;
}
div.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
var tds = div.getElementsByTagName("td");
// Check if table cells still have offsetWidth/Height when they are set
// to display:none and there are still other visible table cells in a
// table row; if so, offsetWidth/Height are not reliable for use when
// determining if an element has been hidden directly using
// display:none (it is still safe to use offsets if a parent element is
// hidden; don safety goggles and see bug #4512 for more information).
// (only IE 8 fails this test)
pL.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;
tds[0].style.display = "";
tds[1].style.display = "none";
// Check if empty table cells still have offsetWidth/Height
// (IE < 8 fail this test)
pL.support.reliableHiddenOffsets = pL.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
div.innerHTML = "";
document.body.removeChild( div ).style.display = "none";
div = tds = null;
});
*/
// Technique from Juriy Zaytsev
// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
var eventSupported = function( eventName ) {
var el = document.createElement("div");
eventName = "on" + eventName;
var isSupported = (eventName in el);
if ( !isSupported ) {
el.setAttribute(eventName, "return;");
isSupported = typeof el[eventName] === "function";
}
el = null;
return isSupported;
};
pL.support.submitBubbles = eventSupported("submit");
pL.support.changeBubbles = eventSupported("change");
// release memory in IE
root = script = div = all = a = null;
})();
// edit1end
var windowData = {},
rbrace = /^(?:\{.*\}|\[.*\])$/;
pL.extend({
cache: {},
// Please use with caution
uuid: 0,
// Unique for each copy of pL on the page
expando: "AccDC" + now(),
// The following elements throw uncatchable exceptions if you
// attempt to add expando properties to them.
noData: {
"embed": true,
// Ban all objects except for Flash (which handle expandos)
"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
"applet": true
},
data: function( elem, name, data ) {
if ( !pL.acceptData( elem ) ) {
return;
}
elem = elem == window ?
windowData :
elem;
var isNode = elem.nodeType,
id = isNode ? elem[ pL.expando ] : null,
cache = pL.cache, thisCache;
if ( isNode && !id && typeof name === "string" && data === undefined ) {
return;
}
// Get the data from the object directly
if ( !isNode ) {
cache = elem;
// Compute a unique ID for the element
} else if ( !id ) {
elem[ pL.expando ] = id = ++pL.uuid;
}
// Avoid generating a new cache unless none exists and we
// want to manipulate it.
if ( typeof name === "object" ) {
if ( isNode ) {
cache[ id ] = 
pL.extend(cache[ id ], name);
} else {
pL.extend( cache, name );
}
} else if ( isNode && !cache[ id ] ) {
cache[ id ] = {};
}
thisCache = isNode ? cache[ id ] : cache;
// Prevent overriding the named cache with undefined values
if ( data !== undefined ) {
thisCache[ name ] = data;
}
return typeof name === "string" ? thisCache[ name ] : thisCache;
},
removeData: function( elem, name ) {
if ( !pL.acceptData( elem ) ) {
return;
}
elem = elem == window ?
windowData :
elem;
var isNode = elem.nodeType,
id = isNode ? elem[ pL.expando ] : elem,
cache = pL.cache,
thisCache = isNode ? cache[ id ] : id;
// If we want to remove a specific section of the element's data
if ( name ) {
if ( thisCache ) {
// Remove the section of cache data
delete thisCache[ name ];
// If we've removed all the data, remove the element's cache
if ( isNode && pL.isEmptyObject(thisCache) ) {
pL.removeData( elem );
}
}
// Otherwise, we want to remove all of the element's data
} else {
if ( isNode && pL.support.deleteExpando ) {
delete elem[ pL.expando ];
} else if ( elem.removeAttribute ) {
elem.removeAttribute( pL.expando );
// Completely remove the data cache
} else if ( isNode ) {
delete cache[ id ];
// Remove all fields from the object
} else {
for ( var n in elem ) {
delete elem[ n ];
}
}
}
},
// A method for determining if a DOM node can handle the data expando
acceptData: function( elem ) {
if ( elem.nodeName ) {
var match = pL.noData[ elem.nodeName.toLowerCase() ];
if ( match ) {
return !(match === true || elem.getAttribute("classid") !== match);
}
}
return true;
}
});
pL.fn.extend({
data: function( key, value ) {
var data = null;
if ( typeof key === "undefined" ) {
if ( this.length ) {
var attr = this[0].attributes, name;
data = pL.data( this[0] );
for ( var i = 0, l = attr.length; i < l; i++ ) {
name = attr[i].name;
if ( name.indexOf( "data-" ) === 0 ) {
name = name.substr( 5 );
dataAttr( this[0], name, data[ name ] );
}
}
}
return data;
} else if ( typeof key === "object" ) {
return this.each(function() {
pL.data( this, key );
});
}
var parts = key.split(".");
parts[1] = parts[1] ? "." + parts[1] : "";
if ( value === undefined ) {
data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
// Try to fetch any internally stored data first
if ( data === undefined && this.length ) {
data = pL.data( this[0], key );
data = dataAttr( this[0], key, data );
}
return data === undefined && parts[1] ?
this.data( parts[0] ) :
data;
} else {
return this.each(function() {
var $this = pL( this ),
args = [ parts[0], value ];
$this.triggerHandler( "setData" + parts[1] + "!", args );
pL.data( this, key, value );
$this.triggerHandler( "changeData" + parts[1] + "!", args );
});
}
},
removeData: function( key ) {
return this.each(function() {
pL.removeData( this, key );
});
}
});
function dataAttr( elem, key, data ) {
// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if ( data === undefined && elem.nodeType === 1 ) {
data = elem.getAttribute( "data-" + key );
if ( typeof data === "string" ) {
try {
data = data === "true" ? true :
data === "false" ? false :
data === "null" ? null :
!pL.isNaN( data ) ? parseFloat( data ) :
rbrace.test( data ) ? pL.parseJSON( data ) :
data;
} catch( e ) {}
// Make sure we set the data so it isn't changed later
pL.data( elem, key, data );
} else {
data = undefined;
}
}
return data;
}
var rclass = /[\n\t]/g,
rspaces = /\s+/,
rreturn = /\r/g,
rspecialurl = /^(?:href|src|style)$/,
rtype = /^(?:button|input)$/i,
rfocusable = /^(?:button|input|object|select|textarea)$/i,
rclickable = /^a(?:rea)?$/i,
rradiocheck = /^(?:radio|checkbox)$/i;
pL.extend({
attrFn: {
val: true,
css: true,
html: true,
text: true,
data: true,
width: true,
height: true,
offset: true
}
});
var rnamespaces = /\.(.*)$/,
rformElems = /^(?:textarea|input|select)$/i,
rperiod = /\./g,
rspace = / /g,
rescape = /[^\w\s.|`]/g,
fcleanup = function( nm ) {
return nm.replace(rescape, "\\$&");
},
focusCounts = { focusin: 0, focusout: 0 };
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
pL.event = {
// Bind an event to an element
// Original by Dean Edwards
add: function( elem, types, handler, data ) {
if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
return;
}
// For whatever reason, IE has trouble passing the window object
// around, causing it to be cloned in the process
if ( pL.isWindow( elem ) && ( elem !== window && !elem.frameElement ) ) {
elem = window;
}
if ( handler === false ) {
handler = returnFalse;
} else if ( !handler ) {
// Fixes bug #7229. Fix recommended by jdalton
  return;
}
var handleObjIn, handleObj;
if ( handler.handler ) {
handleObjIn = handler;
handler = handleObjIn.handler;
}
// Make sure that the function being executed has a unique ID
if ( !handler.guid ) {
handler.guid = pL.guid++;
}
// Init the element's event structure
var elemData = pL.data( elem );
// If no elemData is found then we must be trying to bind to one of the
// banned noData elements
if ( !elemData ) {
return;
}
// Use a key less likely to result in collisions for plain JS objects.
// Fixes bug #7150.
var eventKey = elem.nodeType ? "events" : "__events__",
events = elemData[ eventKey ],
eventHandle = elemData.handle;
if ( typeof events === "function" ) {
// On plain objects events is a fn that holds the the data
// which prevents this data from being JSON serialized
// the function does not need to be called, it just contains the data
eventHandle = events.handle;
events = events.events;
} else if ( !events ) {
if ( !elem.nodeType ) {
// On plain objects, create a fn that acts as the holder
// of the values to avoid JSON serialization of event data
elemData[ eventKey ] = elemData = function(){};
}
elemData.events = events = {};
}
if ( !eventHandle ) {
elemData.handle = eventHandle = function() {
// Handle the second event of a trigger and when
// an event is called after a page has unloaded
return typeof pL !== "undefined" && !pL.event.triggered ?
pL.event.handle.apply( eventHandle.elem, arguments ) :
undefined;
};
}
// Add elem as a property of the handle function
// This is to prevent a memory leak with non-native events in IE.
eventHandle.elem = elem;
// Handle multiple events separated by a space
// pL(...).bind("mouseover mouseout", fn);
types = types.split(" ");
var type, i = 0, namespaces;
while ( (type = types[ i++ ]) ) {
handleObj = handleObjIn ?
pL.extend({}, handleObjIn) :
{ handler: handler, data: data };
// Namespaced event handlers
if ( type.indexOf(".") > -1 ) {
namespaces = type.split(".");
type = namespaces.shift();
handleObj.namespace = namespaces.slice(0).sort().join(".");
} else {
namespaces = [];
handleObj.namespace = "";
}
handleObj.type = type;
if ( !handleObj.guid ) {
handleObj.guid = handler.guid;
}
// Get the current list of functions bound to this event
var handlers = events[ type ],
special = pL.event.special[ type ] || {};
// Init the event handler queue
if ( !handlers ) {
handlers = events[ type ] = [];
// Check for a special event handler
// Only use addEventListener/attachEvent if the special
// events handler returns false
if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
// Bind the global event handler to the element
if ( elem.addEventListener ) {
elem.addEventListener( type, eventHandle, false );
} else if ( elem.attachEvent ) {
elem.attachEvent( "on" + type, eventHandle );
}
}
}
if ( special.add ) { 
special.add.call( elem, handleObj ); 
if ( !handleObj.handler.guid ) {
handleObj.handler.guid = handler.guid;
}
}
// Add the function to the element's handler list
handlers.push( handleObj );
// Keep track of which events have been used, for global triggering
pL.event.global[ type ] = true;
}
// Nullify elem to prevent memory leaks in IE
elem = null;
},
global: {},
// Detach an event or set of events from an element
remove: function( elem, types, handler, pos ) {
// don't do events on text and comment nodes
if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
return;
}
if ( handler === false ) {
handler = returnFalse;
}
var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
eventKey = elem.nodeType ? "events" : "__events__",
elemData = pL.data( elem ),
events = elemData && elemData[ eventKey ];
if ( !elemData || !events ) {
return;
}
if ( typeof events === "function" ) {
elemData = events;
events = events.events;
}
// types is actually an event object here
if ( types && types.type ) {
handler = types.handler;
types = types.type;
}
// Unbind all events for the element
if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
types = types || "";
for ( type in events ) {
pL.event.remove( elem, type + types );
}
return;
}
// Handle multiple events separated by a space
// pL(...).unbind("mouseover mouseout", fn);
types = types.split(" ");
while ( (type = types[ i++ ]) ) {
origType = type;
handleObj = null;
all = type.indexOf(".") < 0;
namespaces = [];
if ( !all ) {
// Namespaced event handlers
namespaces = type.split(".");
type = namespaces.shift();
namespace = new RegExp("(^|\\.)" + 
pL.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
}
eventType = events[ type ];
if ( !eventType ) {
continue;
}
if ( !handler ) {
for ( j = 0; j < eventType.length; j++ ) {
handleObj = eventType[ j ];
if ( all || namespace.test( handleObj.namespace ) ) {
pL.event.remove( elem, origType, handleObj.handler, j );
eventType.splice( j--, 1 );
}
}
continue;
}
special = pL.event.special[ type ] || {};
for ( j = pos || 0; j < eventType.length; j++ ) {
handleObj = eventType[ j ];
if ( handler.guid === handleObj.guid ) {
// remove the given handler for the given type
if ( all || namespace.test( handleObj.namespace ) ) {
if ( pos == null ) {
eventType.splice( j--, 1 );
}
if ( special.remove ) {
special.remove.call( elem, handleObj );
}
}
if ( pos != null ) {
break;
}
}
}
// remove generic event handler if no more handlers exist
if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
pL.removeEvent( elem, type, elemData.handle );
}
ret = null;
delete events[ type ];
}
}
// Remove the expando if it's no longer used
if ( pL.isEmptyObject( events ) ) {
var handle = elemData.handle;
if ( handle ) {
handle.elem = null;
}
delete elemData.events;
delete elemData.handle;
if ( typeof elemData === "function" ) {
pL.removeData( elem, eventKey );
} else if ( pL.isEmptyObject( elemData ) ) {
pL.removeData( elem );
}
}
},
// bubbling is internal
trigger: function( event, data, elem /*, bubbling */ ) {
// Event object or event type
var type = event.type || event,
bubbling = arguments[3];
if ( !bubbling ) {
event = typeof event === "object" ?
// pL.Event object
event[ pL.expando ] ? event :
// Object literal
pL.extend( pL.Event(type), event ) :
// Just the event type (string)
pL.Event(type);
if ( type.indexOf("!") >= 0 ) {
event.type = type = type.slice(0, -1);
event.exclusive = true;
}
// Handle a global trigger
if ( !elem ) {
// Don't bubble custom events when global (to avoid too much overhead)
event.stopPropagation();
// Only trigger if we've ever bound an event for it
if ( pL.event.global[ type ] ) {
pL.each( pL.cache, function() {
if ( this.events && this.events[type] ) {
pL.event.trigger( event, data, this.handle.elem );
}
});
}
}
// Handle triggering a single element
// don't do events on text and comment nodes
if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
return undefined;
}
// Clean up in case it is reused
event.result = undefined;
event.target = elem;
// Clone the incoming data, if any
data = pL.makeArray( data );
data.unshift( event );
}
event.currentTarget = elem;
// Trigger the event, it is assumed that "handle" is a function
var handle = elem.nodeType ?
pL.data( elem, "handle" ) :
(pL.data( elem, "__events__" ) || {}).handle;
if ( handle ) {
handle.apply( elem, data );
}
var parent = elem.parentNode || elem.ownerDocument;
// Trigger an inline bound script
try {
if ( !(elem && elem.nodeName && pL.noData[elem.nodeName.toLowerCase()]) ) {
if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
event.result = false;
event.preventDefault();
}
}
// prevent IE from throwing an error for some elements with some event types, see #3533
} catch (inlineError) {}
if ( !event.isPropagationStopped() && parent ) {
pL.event.trigger( event, data, parent, true );
} else if ( !event.isDefaultPrevented() ) {
var old,
target = event.target,
targetType = type.replace( rnamespaces, "" ),
isClick = pL.nodeName( target, "a" ) && targetType === "click",
special = pL.event.special[ targetType ] || {};
if ( (!special._default || special._default.call( elem, event ) === false) && 
!isClick && !(target && target.nodeName && pL.noData[target.nodeName.toLowerCase()]) ) {
try {
if ( target[ targetType ] ) {
// Make sure that we don't accidentally re-trigger the onFOO events
old = target[ "on" + targetType ];
if ( old ) {
target[ "on" + targetType ] = null;
}
pL.event.triggered = true;
target[ targetType ]();
}
// prevent IE from throwing an error for some elements with some event types, see #3533
} catch (triggerError) {}
if ( old ) {
target[ "on" + targetType ] = old;
}
pL.event.triggered = false;
}
}
},
handle: function( event ) {
var all, handlers, namespaces, namespace_re, events,
namespace_sort = [],
args = pL.makeArray( arguments );
event = args[0] = pL.event.fix( event || window.event );
event.currentTarget = this;
// Namespaced event handlers
all = event.type.indexOf(".") < 0 && !event.exclusive;
if ( !all ) {
namespaces = event.type.split(".");
event.type = namespaces.shift();
namespace_sort = namespaces.slice(0).sort();
namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
}
event.namespace = event.namespace || namespace_sort.join(".");
events = pL.data(this, this.nodeType ? "events" : "__events__");
if ( typeof events === "function" ) {
events = events.events;
}
handlers = (events || {})[ event.type ];
if ( events && handlers ) {
// Clone the handlers to prevent manipulation
handlers = handlers.slice(0);
for ( var j = 0, l = handlers.length; j < l; j++ ) {
var handleObj = handlers[ j ];
// Filter the functions by class
if ( all || namespace_re.test( handleObj.namespace ) ) {
// Pass in a reference to the handler function itself
// So that we can later remove it
event.handler = handleObj.handler;
event.data = handleObj.data;
event.handleObj = handleObj;
var ret = handleObj.handler.apply( this, args );
if ( ret !== undefined ) {
event.result = ret;
if ( ret === false ) {
event.preventDefault();
event.stopPropagation();
}
}
if ( event.isImmediatePropagationStopped() ) {
break;
}
}
}
}
return event.result;
},
props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

fixHooks: {},

keyHooks: {
props: "char charCode key keyCode".split(" "),
filter: function( event, original ) {

// Add which for key events
if ( event.which == null ) {
event.which = original.charCode != null ? original.charCode : original.keyCode;
}

return event;
}
},

mouseHooks: {
props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter: function( event, original ) {
var eventDoc, doc, body,
button = original.button,
fromElement = original.fromElement;

// Calculate pageX/Y if missing and clientX/Y available
if ( event.pageX == null && original.clientX != null ) {
eventDoc = event.target.ownerDocument || document;
doc = eventDoc.documentElement;
body = eventDoc.body;

event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
}

// Add relatedTarget, if necessary
if ( !event.relatedTarget && fromElement ) {
event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
}

// Add which for click: 1 === left; 2 === middle; 3 === right
// Note: button is not normalized, so don't use it
if ( !event.which && button !== undefined ) {
event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
}
return event;
}
},

fix: function( event ) {
if ( event[ pL.expando ] ) {
return event;
}

// Create a writable copy of the event object and normalize some properties
var i, prop,
originalEvent = event,
fixHook = pL.event.fixHooks[ event.type ] || {},
copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

event = pL.Event( originalEvent );

for ( i = copy.length; i; ) {
prop = copy[ --i ];
event[ prop ] = originalEvent[ prop ];
}

// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
if ( !event.target ) {
event.target = originalEvent.srcElement || document;
}

// Target should not be a text node (#504, Safari)
if ( event.target.nodeType === 3 ) {
event.target = event.target.parentNode;
}

// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
event.metaKey = !!event.metaKey;

return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
},

// Deprecated, use pL.guid instead
guid: 1E8,
// Deprecated, use pL.proxy instead
proxy: pL.proxy,
special: {
ready: {
// Make sure the ready event is setup
setup: pL.bindReady,
teardown: pL.noop
},
beforeunload: {
setup: function( data, namespaces, eventHandle ) {
// We only want to do this special case on windows
if ( pL.isWindow( this ) ) {
this.onbeforeunload = eventHandle;
}
},
teardown: function( namespaces, eventHandle ) {
if ( this.onbeforeunload === eventHandle ) {
this.onbeforeunload = null;
}
}
}
}
};
pL.removeEvent = document.removeEventListener ?
function( elem, type, handle ) {
if ( elem.removeEventListener ) {
elem.removeEventListener( type, handle, false );
}
} : 
function( elem, type, handle ) {
if ( elem.detachEvent ) {
elem.detachEvent( "on" + type, handle );
}
};
pL.Event = function( src ) {
// Allow instantiation without the 'new' keyword
if ( !this.preventDefault ) {
return new pL.Event( src );
}
// Event object
if ( src && src.type ) {
this.originalEvent = src;
this.type = src.type;
// Event type
} else {
this.type = src;
}
// timeStamp is buggy for some events on Firefox(#3843)
// So we won't rely on the native value
this.timeStamp = now();
// Mark it as fixed
this[ pL.expando ] = true;
};
function returnFalse() {
return false;
}
function returnTrue() {
return true;
}
// pL.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
pL.Event.prototype = {
preventDefault: function() {
this.isDefaultPrevented = returnTrue;
var e = this.originalEvent;
if ( !e ) {
return;
}
// if preventDefault exists run it on the original event
if ( e.preventDefault ) {
e.preventDefault();
// otherwise set the returnValue property of the original event to false (IE)
} else {
e.returnValue = false;
}
},
stopPropagation: function() {
this.isPropagationStopped = returnTrue;
var e = this.originalEvent;
if ( !e ) {
return;
}
// if stopPropagation exists run it on the original event
if ( e.stopPropagation ) {
e.stopPropagation();
}
// otherwise set the cancelBubble property of the original event to true (IE)
e.cancelBubble = true;
},
stopImmediatePropagation: function() {
this.isImmediatePropagationStopped = returnTrue;
this.stopPropagation();
},
isDefaultPrevented: returnFalse,
isPropagationStopped: returnFalse,
isImmediatePropagationStopped: returnFalse
};
// Checks if an event happened on an element within another element
// Used in pL.event.special.mouseenter and mouseleave handlers
var withinElement = function( event ) {
// Check if mouse(over|out) are still within the same parent element
var parent = event.relatedTarget;
// Firefox sometimes assigns relatedTarget a XUL element
// which we cannot access the parentNode property of
try {
// Traverse up the tree
while ( parent && parent !== this ) {
parent = parent.parentNode;
}
if ( parent !== this ) {
// set the correct event type
event.type = event.data;
// handle event if we actually just moused on to a non sub-element
pL.event.handle.apply( this, arguments );
}
// assuming we've left the element since we most likely mousedover a xul element
} catch(e) { }
},
// In case of event delegation, we only need to rename the event.type,
// liveHandler will take care of the rest.
delegate = function( event ) {
event.type = event.data;
pL.event.handle.apply( this, arguments );
};
// Create mouseenter and mouseleave events
pL.each({
mouseenter: "mouseover",
mouseleave: "mouseout"
}, function( orig, fix ) {
pL.event.special[ orig ] = {
setup: function( data ) {
pL.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
},
teardown: function( data ) {
pL.event.remove( this, fix, data && data.selector ? delegate : withinElement );
}
};
});

// submit delegation
if ( !pL.support.submitBubbles ) {
pL.event.special.submit = {
setup: function( data, namespaces ) {
if ( this.nodeName.toLowerCase() !== "form" ) {
pL.event.add(this, "click.specialSubmit", function( e ) {
var elem = e.target,
type = elem.type;
if ( (type === "submit" || type === "image") && pL( elem ).closest("form").length ) {
e.liveFired = undefined;
return trigger( "submit", this, arguments );
}
});
pL.event.add(this, "keypress.specialSubmit", function( e ) {
var elem = e.target,
type = elem.type;
if ( (type === "text" || type === "password") && pL( elem ).closest("form").length && e.keyCode === 13 ) {
e.liveFired = undefined;
return trigger( "submit", this, arguments );
}
});
} else {
return false;
}
},
teardown: function( namespaces ) {
pL.event.remove( this, ".specialSubmit" );
}
};
}

// change delegation, happens here so we have bind.
if ( !pL.support.changeBubbles ) {
var changeFilters,
getVal = function( elem ) {
var type = elem.type, val = elem.value;
if ( type === "radio" || type === "checkbox" ) {
val = elem.checked;
} else if ( type === "select-multiple" ) {
val = elem.selectedIndex > -1 ?
pL.map( elem.options, function( elem ) {
return elem.selected;
}).join("-") :
"";
} else if ( elem.nodeName.toLowerCase() === "select" ) {
val = elem.selectedIndex;
}
return val;
},
testChange = function testChange( e ) {
var elem = e.target, data, val;
if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
return;
}
data = pL.data( elem, "_change_data" );
val = getVal(elem);
// the current data will be also retrieved by beforeactivate
if ( e.type !== "focusout" || elem.type !== "radio" ) {
pL.data( elem, "_change_data", val );
}
if ( data === undefined || val === data ) {
return;
}
if ( data != null || val ) {
e.type = "change";
e.liveFired = undefined;
return pL.event.trigger( e, arguments[1], elem );
}
};
pL.event.special.change = {
filters: {
focusout: testChange, 
beforedeactivate: testChange,
click: function( e ) {
var elem = e.target, type = elem.type;
if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
return testChange.call( this, e );
}
},
// Change has to be called before submit
// Keydown will be called before keypress, which is used in submit-event delegation
keydown: function( e ) {
var elem = e.target, type = elem.type;
if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
type === "select-multiple" ) {
return testChange.call( this, e );
}
},
// Beforeactivate happens also before the previous element is blurred
// with this event you can't trigger a change event, but you can store
// information
beforeactivate: function( e ) {
var elem = e.target;
pL.data( elem, "_change_data", getVal(elem) );
}
},
setup: function( data, namespaces ) {
if ( this.type === "file" ) {
return false;
}
for ( var type in changeFilters ) {
pL.event.add( this, type + ".specialChange", changeFilters[type] );
}
return rformElems.test( this.nodeName );
},
teardown: function( namespaces ) {
pL.event.remove( this, ".specialChange" );
return rformElems.test( this.nodeName );
}
};
changeFilters = pL.event.special.change.filters;
// Handle when the input is .focus()'d
changeFilters.focus = changeFilters.beforeactivate;
}

function trigger( type, elem, args ) {
args[0].type = type;
return pL.event.handle.apply( elem, args );
}

// Create "bubbling" focus and blur events
if ( document.addEventListener ) {
pL.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
pL.event.special[ fix ] = {
setup: function() {
if ( focusCounts[fix]++ === 0 ) {
document.addEventListener( orig, handler, true );
}
}, 
teardown: function() { 
if ( --focusCounts[fix] === 0 ) {
document.removeEventListener( orig, handler, true );
}
}
};
function handler( e ) { 
e = pL.event.fix( e );
e.type = fix;
return pL.event.trigger( e, null, e.target );
}
});
}

pL.each(["bind", "one"], function( i, name ) {
pL.fn[ name ] = function( type, data, fn ) {
// Handle object literals
if ( typeof type === "object" ) {
for ( var key in type ) {
this[ name ](key, data, type[key], fn);
}
return this;
}
if ( pL.isFunction( data ) || data === false ) {
fn = data;
data = undefined;
}
var handler = name === "one" ? pL.proxy( fn, function( event ) {
pL( this ).unbind( event, handler );
return fn.apply( this, arguments );
}) : fn;
if ( type === "unload" && name !== "one" ) {
this.one( type, data, fn );
} else {
for ( var i = 0, l = this.length; i < l; i++ ) {
pL.event.add( this[i], type, handler, data );
}
}
return this;
};
});

pL.fn.extend({
unbind: function( type, fn ) {
// Handle object literals
if ( typeof type === "object" && !type.preventDefault ) {
for ( var key in type ) {
this.unbind(key, type[key]);
}
} else {
for ( var i = 0, l = this.length; i < l; i++ ) {
pL.event.remove( this[i], type, fn );
}
}
return this;
},
trigger: function( type, data ) {
return this.each(function() {
pL.event.trigger( type, data, this );
});
},
triggerHandler: function( type, data ) {
if ( this[0] ) {
var event = pL.Event( type );
event.preventDefault();
event.stopPropagation();
pL.event.trigger( event, data, this[0] );
return event.result;
}
}
});

pL.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
"change select submit keydown keypress keyup error").split(" "), function( i, name ) {
// Handle event binding
pL.fn[ name ] = function( data, fn ) {
if ( fn == null ) {
fn = data;
data = null;
}
return arguments.length > 0 ?
this.bind( name, data, fn ) :
this.trigger( name );
};

if ( pL.attrFn ) {
pL.attrFn[ name ] = true;
}

if ( rkeyEvent.test( name ) )
pL.event.fixHooks[ name ] = pL.event.keyHooks;
else if ( rmouseEvent.test( name ) ) 
pL.event.fixHooks[ name ] = pL.event.mouseHooks;

});
// Prevent memory leaks in IE
// Window isn't included so as not to unbind existing unload events
// More info:
//  - http://isaacschlueter.com/2006/10/msie-memory-leaks/
if ( window.attachEvent && !window.addEventListener ) {
pL(window).bind("unload", function() {
for ( var id in pL.cache ) {
if ( pL.cache[ id ].handle ) {
// Try/Catch is to handle iframes being unloaded, see #4280
try {
pL.event.remove( pL.cache[ id ].handle.elem );
} catch(e) {}
}
}
});
}
/*
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){
var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
done = 0,
toString = Object.prototype.toString,
hasDuplicate = false,
baseHasDuplicate = true,
rBackslash = /\\/g,
rNonWord = /\W/;
// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
baseHasDuplicate = false;
return 0;
});
var Sizzle = function( selector, context, results, seed ) {
results = results || [];
context = context || document;
var origContext = context;
if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
return [];
}
if ( !selector || typeof selector !== "string" ) {
return results;
}
var m, set, checkSet, extra, ret, cur, pop, i,
prune = true,
contextXML = Sizzle.isXML( context ),
parts = [],
soFar = selector;
// Reset the position of the chunker regexp (start from head)
do {
chunker.exec( "" );
m = chunker.exec( soFar );
if ( m ) {
soFar = m[3];
parts.push( m[1] );
if ( m[2] ) {
extra = m[3];
break;
}
}
} while ( m );
if ( parts.length > 1 && origPOS.exec( selector ) ) {
if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
set = posProcess( parts[0] + parts[1], context );
} else {
set = Expr.relative[ parts[0] ] ?
[ context ] :
Sizzle( parts.shift(), context );
while ( parts.length ) {
selector = parts.shift();
if ( Expr.relative[ selector ] ) {
selector += parts.shift();
}
set = posProcess( selector, set );
}
}
} else {
// Take a shortcut and set the context if the root selector is an ID
// (but not if it'll be faster if the inner selector is an ID)
if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
ret = Sizzle.find( parts.shift(), context, contextXML );
context = ret.expr ?
Sizzle.filter( ret.expr, ret.set )[0] :
ret.set[0];
}
if ( context ) {
ret = seed ?
{ expr: parts.pop(), set: makeArray(seed) } :
Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
set = ret.expr ?
Sizzle.filter( ret.expr, ret.set ) :
ret.set;
if ( parts.length > 0 ) {
checkSet = makeArray( set );
} else {
prune = false;
}
while ( parts.length ) {
cur = parts.pop();
pop = cur;
if ( !Expr.relative[ cur ] ) {
cur = "";
} else {
pop = parts.pop();
}
if ( pop == null ) {
pop = context;
}
Expr.relative[ cur ]( checkSet, pop, contextXML );
}
} else {
checkSet = parts = [];
}
}
if ( !checkSet ) {
checkSet = set;
}
if ( !checkSet ) {
Sizzle.error( cur || selector );
}
if ( toString.call(checkSet) === "[object Array]" ) {
if ( !prune ) {
results.push.apply( results, checkSet );
} else if ( context && context.nodeType === 1 ) {
for ( i = 0; checkSet[i] != null; i++ ) {
if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
results.push( set[i] );
}
}
} else {
for ( i = 0; checkSet[i] != null; i++ ) {
if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
results.push( set[i] );
}
}
}
} else {
makeArray( checkSet, results );
}
if ( extra ) {
Sizzle( extra, origContext, results, seed );
Sizzle.uniqueSort( results );
}
return results;
};
Sizzle.uniqueSort = function( results ) {
if ( sortOrder ) {
hasDuplicate = baseHasDuplicate;
results.sort( sortOrder );
if ( hasDuplicate ) {
for ( var i = 1; i < results.length; i++ ) {
if ( results[i] === results[ i - 1 ] ) {
results.splice( i--, 1 );
}
}
}
}
return results;
};
Sizzle.matches = function( expr, set ) {
return Sizzle( expr, null, null, set );
};
Sizzle.matchesSelector = function( node, expr ) {
return Sizzle( expr, null, null, [node] ).length > 0;
};
Sizzle.find = function( expr, context, isXML ) {
var set;
if ( !expr ) {
return [];
}
for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
var match,
type = Expr.order[i];
if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
var left = match[1];
match.splice( 1, 1 );
if ( left.substr( left.length - 1 ) !== "\\" ) {
match[1] = (match[1] || "").replace( rBackslash, "" );
set = Expr.find[ type ]( match, context, isXML );
if ( set != null ) {
expr = expr.replace( Expr.match[ type ], "" );
break;
}
}
}
}
if ( !set ) {
set = typeof context.getElementsByTagName !== "undefined" ?
context.getElementsByTagName( "*" ) :
[];
}
return { set: set, expr: expr };
};
Sizzle.filter = function( expr, set, inplace, not ) {
var match, anyFound,
old = expr,
result = [],
curLoop = set,
isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );
while ( expr && set.length ) {
for ( var type in Expr.filter ) {
if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
var found, item,
filter = Expr.filter[ type ],
left = match[1];
anyFound = false;
match.splice(1,1);
if ( left.substr( left.length - 1 ) === "\\" ) {
continue;
}
if ( curLoop === result ) {
result = [];
}
if ( Expr.preFilter[ type ] ) {
match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );
if ( !match ) {
anyFound = found = true;
} else if ( match === true ) {
continue;
}
}
if ( match ) {
for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
if ( item ) {
found = filter( item, match, i, curLoop );
var pass = not ^ !!found;
if ( inplace && found != null ) {
if ( pass ) {
anyFound = true;
} else {
curLoop[i] = false;
}
} else if ( pass ) {
result.push( item );
anyFound = true;
}
}
}
}
if ( found !== undefined ) {
if ( !inplace ) {
curLoop = result;
}
expr = expr.replace( Expr.match[ type ], "" );
if ( !anyFound ) {
return [];
}
break;
}
}
}
// Improper expression
if ( expr === old ) {
if ( anyFound == null ) {
Sizzle.error( expr );
} else {
break;
}
}
old = expr;
}
return curLoop;
};
Sizzle.error = function( msg ) {
throw "Syntax error, unrecognized expression: " + msg;
};
var Expr = Sizzle.selectors = {
order: [ "ID", "NAME", "TAG" ],
match: {
ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
},
leftMatch: {},
attrMap: {
"class": "className",
"for": "htmlFor"
},
attrHandle: {
href: function( elem ) {
return elem.getAttribute( "href" );
},
type: function( elem ) {
return elem.getAttribute( "type" );
}
},
relative: {
"+": function(checkSet, part){
var isPartStr = typeof part === "string",
isTag = isPartStr && !rNonWord.test( part ),
isPartStrNotTag = isPartStr && !isTag;
if ( isTag ) {
part = part.toLowerCase();
}
for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
if ( (elem = checkSet[i]) ) {
while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}
checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
elem || false :
elem === part;
}
}
if ( isPartStrNotTag ) {
Sizzle.filter( part, checkSet, true );
}
},
">": function( checkSet, part ) {
var elem,
isPartStr = typeof part === "string",
i = 0,
l = checkSet.length;
if ( isPartStr && !rNonWord.test( part ) ) {
part = part.toLowerCase();
for ( ; i < l; i++ ) {
elem = checkSet[i];
if ( elem ) {
var parent = elem.parentNode;
checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
}
}
} else {
for ( ; i < l; i++ ) {
elem = checkSet[i];
if ( elem ) {
checkSet[i] = isPartStr ?
elem.parentNode :
elem.parentNode === part;
}
}
if ( isPartStr ) {
Sizzle.filter( part, checkSet, true );
}
}
},
"": function(checkSet, part, isXML){
var nodeCheck,
doneName = done++,
checkFn = dirCheck;
if ( typeof part === "string" && !rNonWord.test( part ) ) {
part = part.toLowerCase();
nodeCheck = part;
checkFn = dirNodeCheck;
}
checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
},
"~": function( checkSet, part, isXML ) {
var nodeCheck,
doneName = done++,
checkFn = dirCheck;
if ( typeof part === "string" && !rNonWord.test( part ) ) {
part = part.toLowerCase();
nodeCheck = part;
checkFn = dirNodeCheck;
}
checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
}
},
find: {
ID: function( match, context, isXML ) {
if ( typeof context.getElementById !== "undefined" && !isXML ) {
var m = context.getElementById(match[1]);
// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
return m && m.parentNode ? [m] : [];
}
},
NAME: function( match, context ) {
if ( typeof context.getElementsByName !== "undefined" ) {
var ret = [],
results = context.getElementsByName( match[1] );
for ( var i = 0, l = results.length; i < l; i++ ) {
if ( results[i].getAttribute("name") === match[1] ) {
ret.push( results[i] );
}
}
return ret.length === 0 ? null : ret;
}
},
TAG: function( match, context ) {
if ( typeof context.getElementsByTagName !== "undefined" ) {
return context.getElementsByTagName( match[1] );
}
}
},
preFilter: {
CLASS: function( match, curLoop, inplace, result, not, isXML ) {
match = " " + match[1].replace( rBackslash, "" ) + " ";
if ( isXML ) {
return match;
}
for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
if ( elem ) {
if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
if ( !inplace ) {
result.push( elem );
}
} else if ( inplace ) {
curLoop[i] = false;
}
}
}
return false;
},
ID: function( match ) {
return match[1].replace( rBackslash, "" );
},
TAG: function( match, curLoop ) {
return match[1].replace( rBackslash, "" ).toLowerCase();
},
CHILD: function( match ) {
if ( match[1] === "nth" ) {
if ( !match[2] ) {
Sizzle.error( match[0] );
}
match[2] = match[2].replace(/^\+|\s*/g, '');
// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);
// calculate the numbers (first)n+(last) including if they are negative
match[2] = (test[1] + (test[2] || 1)) - 0;
match[3] = test[3] - 0;
}
else if ( match[2] ) {
Sizzle.error( match[0] );
}
// TODO: Move to normal caching system
match[0] = done++;
return match;
},
ATTR: function( match, curLoop, inplace, result, not, isXML ) {
var name = match[1] = match[1].replace( rBackslash, "" );
if ( !isXML && Expr.attrMap[name] ) {
match[1] = Expr.attrMap[name];
}
// Handle if an un-quoted value was used
match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );
if ( match[2] === "~=" ) {
match[4] = " " + match[4] + " ";
}
return match;
},
PSEUDO: function( match, curLoop, inplace, result, not ) {
if ( match[1] === "not" ) {
// If we're dealing with a complex expression, or a simple one
if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
match[3] = Sizzle(match[3], null, null, curLoop);
} else {
var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
if ( !inplace ) {
result.push.apply( result, ret );
}
return false;
}
} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
return true;
}
return match;
},
POS: function( match ) {
match.unshift( true );
return match;
}
},
filters: {
enabled: function( elem ) {
return elem.disabled === false && elem.type !== "hidden";
},
disabled: function( elem ) {
return elem.disabled === true;
},
checked: function( elem ) {
return elem.checked === true;
},
selected: function( elem ) {
// Accessing this property makes selected-by-default
// options in Safari work properly
if ( elem.parentNode ) {
elem.parentNode.selectedIndex;
}
return elem.selected === true;
},
parent: function( elem ) {
return !!elem.firstChild;
},
empty: function( elem ) {
return !elem.firstChild;
},
has: function( elem, i, match ) {
return !!Sizzle( match[3], elem ).length;
},
header: function( elem ) {
return (/h\d/i).test( elem.nodeName );
},
text: function( elem ) {
var attr = elem.getAttribute( "type" ), type = elem.type;
// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
// use getAttribute instead to test this case
return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
},
radio: function( elem ) {
return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
},
checkbox: function( elem ) {
return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
},
file: function( elem ) {
return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
},
password: function( elem ) {
return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
},
submit: function( elem ) {
var name = elem.nodeName.toLowerCase();
return (name === "input" || name === "button") && "submit" === elem.type;
},
image: function( elem ) {
return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
},
reset: function( elem ) {
return elem.nodeName.toLowerCase() === "input" && "reset" === elem.type;
},
button: function( elem ) {
var name = elem.nodeName.toLowerCase();
return name === "input" && "button" === elem.type || name === "button";
},
input: function( elem ) {
return (/input|select|textarea|button/i).test( elem.nodeName );
},
focus: function( elem ) {
return elem === elem.ownerDocument.activeElement;
}
},
setFilters: {
first: function( elem, i ) {
return i === 0;
},
last: function( elem, i, match, array ) {
return i === array.length - 1;
},
even: function( elem, i ) {
return i % 2 === 0;
},
odd: function( elem, i ) {
return i % 2 === 1;
},
lt: function( elem, i, match ) {
return i < match[3] - 0;
},
gt: function( elem, i, match ) {
return i > match[3] - 0;
},
nth: function( elem, i, match ) {
return match[3] - 0 === i;
},
eq: function( elem, i, match ) {
return match[3] - 0 === i;
}
},
filter: {
PSEUDO: function( elem, match, i, array ) {
var name = match[1],
filter = Expr.filters[ name ];
if ( filter ) {
return filter( elem, i, match, array );
} else if ( name === "contains" ) {
return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;
} else if ( name === "not" ) {
var not = match[3];
for ( var j = 0, l = not.length; j < l; j++ ) {
if ( not[j] === elem ) {
return false;
}
}
return true;
} else {
Sizzle.error( name );
}
},
CHILD: function( elem, match ) {
var type = match[1],
node = elem;
switch ( type ) {
case "only":
case "first":
while ( (node = node.previousSibling) ) {
if ( node.nodeType === 1 ) { 
return false; 
}
}
if ( type === "first" ) { 
return true; 
}
node = elem;
case "last":
while ( (node = node.nextSibling) ) {
if ( node.nodeType === 1 ) { 
return false; 
}
}
return true;
case "nth":
var first = match[2],
last = match[3];
if ( first === 1 && last === 0 ) {
return true;
}
var doneName = match[0],
parent = elem.parentNode;
if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
var count = 0;
for ( node = parent.firstChild; node; node = node.nextSibling ) {
if ( node.nodeType === 1 ) {
node.nodeIndex = ++count;
}
} 
parent.sizcache = doneName;
}
var diff = elem.nodeIndex - last;
if ( first === 0 ) {
return diff === 0;
} else {
return ( diff % first === 0 && diff / first >= 0 );
}
}
},
ID: function( elem, match ) {
return elem.nodeType === 1 && elem.getAttribute("id") === match;
},
TAG: function( elem, match ) {
return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
},
CLASS: function( elem, match ) {
return (" " + (elem.className || elem.getAttribute("class")) + " ")
.indexOf( match ) > -1;
},
ATTR: function( elem, match ) {
var name = match[1],
result = Expr.attrHandle[ name ] ?
Expr.attrHandle[ name ]( elem ) :
elem[ name ] != null ?
elem[ name ] :
elem.getAttribute( name ),
value = result + "",
type = match[2],
check = match[4];
return result == null ?
type === "!=" :
type === "=" ?
value === check :
type === "*=" ?
value.indexOf(check) >= 0 :
type === "~=" ?
(" " + value + " ").indexOf(check) >= 0 :
!check ?
value && result !== false :
type === "!=" ?
value !== check :
type === "^=" ?
value.indexOf(check) === 0 :
type === "$=" ?
value.substr(value.length - check.length) === check :
type === "|=" ?
value === check || value.substr(0, check.length + 1) === check + "-" :
false;
},
POS: function( elem, match, i, array ) {
var name = match[2],
filter = Expr.setFilters[ name ];
if ( filter ) {
return filter( elem, i, match, array );
}
}
}
};
var origPOS = Expr.match.POS,
fescape = function(all, num){
return "\\" + (num - 0 + 1);
};
for ( var type in Expr.match ) {
Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}
var makeArray = function( array, results ) {
array = Array.prototype.slice.call( array, 0 );
if ( results ) {
results.push.apply( results, array );
return results;
}
return array;
};
// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;
// Provide a fallback method if it does not work
} catch( e ) {
makeArray = function( array, results ) {
var i = 0,
ret = results || [];
if ( toString.call(array) === "[object Array]" ) {
Array.prototype.push.apply( ret, array );
} else {
if ( typeof array.length === "number" ) {
for ( var l = array.length; i < l; i++ ) {
ret.push( array[i] );
}
} else {
for ( ; array[i]; i++ ) {
ret.push( array[i] );
}
}
}
return ret;
};
}
var sortOrder, siblingCheck;
if ( document.documentElement.compareDocumentPosition ) {
sortOrder = function( a, b ) {
if ( a === b ) {
hasDuplicate = true;
return 0;
}
if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
return a.compareDocumentPosition ? -1 : 1;
}
return a.compareDocumentPosition(b) & 4 ? -1 : 1;
};
} else {
sortOrder = function( a, b ) {
var al, bl,
ap = [],
bp = [],
aup = a.parentNode,
bup = b.parentNode,
cur = aup;
// The nodes are identical, we can exit early
if ( a === b ) {
hasDuplicate = true;
return 0;
// If the nodes are siblings (or identical) we can do a quick check
} else if ( aup === bup ) {
return siblingCheck( a, b );
// If no parents were found then the nodes are disconnected
} else if ( !aup ) {
return -1;
} else if ( !bup ) {
return 1;
}
// Otherwise they're somewhere else in the tree so we need
// to build up a full list of the parentNodes for comparison
while ( cur ) {
ap.unshift( cur );
cur = cur.parentNode;
}
cur = bup;
while ( cur ) {
bp.unshift( cur );
cur = cur.parentNode;
}
al = ap.length;
bl = bp.length;
// Start walking down the tree looking for a discrepancy
for ( var i = 0; i < al && i < bl; i++ ) {
if ( ap[i] !== bp[i] ) {
return siblingCheck( ap[i], bp[i] );
}
}
// We ended someplace up the tree so do a sibling check
return i === al ?
siblingCheck( a, bp[i], -1 ) :
siblingCheck( ap[i], b, 1 );
};
siblingCheck = function( a, b, ret ) {
if ( a === b ) {
return ret;
}
var cur = a.nextSibling;
while ( cur ) {
if ( cur === b ) {
return -1;
}
cur = cur.nextSibling;
}
return 1;
};
}
// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
var ret = "", elem;
for ( var i = 0; elems[i]; i++ ) {
elem = elems[i];
// Get the text from text nodes and CDATA nodes
if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
ret += elem.value;
// Traverse everything else, except comment nodes
} else if ( elem.nodeType !== 8 ) {
ret += Sizzle.getText( elem.childNodes );
}
}
return ret;
};
// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
// We're going to inject a fake input element with a specified name
var form = document.createElement("div"),
id = "script" + (new Date()).getTime(),
root = document.documentElement;
form.innerHTML = "<a name='" + id + "'/>";
// Inject it into the root element, check its status, and remove it quickly
root.insertBefore( form, root.firstChild );
// The workaround has to do additional checks after a getElementById
// Which slows things down for other browsers (hence the branching)
if ( document.getElementById( id ) ) {
Expr.find.ID = function( match, context, isXML ) {
if ( typeof context.getElementById !== "undefined" && !isXML ) {
var m = context.getElementById(match[1]);
return m ?
m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").value === match[1] ?
[m] :
undefined :
[];
}
};
Expr.filter.ID = function( elem, match ) {
var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
return elem.nodeType === 1 && node && node.value === match;
};
}
root.removeChild( form );
// release memory in IE
root = form = null;
})();
(function(){
// Check to see if the browser returns only elements
// when doing getElementsByTagName("*")
// Create a fake element
var div = document.createElement("div");
div.appendChild( document.createComment("") );
// Make sure no comments are found
if ( div.getElementsByTagName("*").length > 0 ) {
Expr.find.TAG = function( match, context ) {
var results = context.getElementsByTagName( match[1] );
// Filter out possible comments
if ( match[1] === "*" ) {
var tmp = [];
for ( var i = 0; results[i]; i++ ) {
if ( results[i].nodeType === 1 ) {
tmp.push( results[i] );
}
}
results = tmp;
}
return results;
};
}
// Check to see if an attribute returns normalized href attributes
div.innerHTML = "<a href='#'></a>";
if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
div.firstChild.getAttribute("href") !== "#" ) {
Expr.attrHandle.href = function( elem ) {
return elem.getAttribute( "href", 2 );
};
}
// release memory in IE
div = null;
})();
if ( document.querySelectorAll ) {
(function(){
var oldSizzle = Sizzle,
div = document.createElement("div"),
id = "__sizzle__";
div.innerHTML = "<p class='TEST'></p>";
// Safari can't handle uppercase or unicode characters when
// in quirks mode.
if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
return;
}
Sizzle = function( query, context, extra, seed ) {
context = context || document;
// Only use querySelectorAll on non-XML documents
// (ID selectors don't work in non-HTML documents)
if ( !seed && !Sizzle.isXML(context) ) {
// See if we find a selector to speed up
var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
// Speed-up: Sizzle("TAG")
if ( match[1] ) {
return makeArray( context.getElementsByTagName( query ), extra );
// Speed-up: Sizzle(".CLASS")
} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
return makeArray( context.getElementsByClassName( match[2] ), extra );
}
}
if ( context.nodeType === 9 ) {
// Speed-up: Sizzle("body")
// The body element only exists once, optimize finding it
if ( query === "body" && context.body ) {
return makeArray( [ context.body ], extra );
// Speed-up: Sizzle("#ID")
} else if ( match && match[3] ) {
var elem = context.getElementById( match[3] );
// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
if ( elem && elem.parentNode ) {
// Handle the case where IE and Opera return items
// by name instead of ID
if ( elem.id === match[3] ) {
return makeArray( [ elem ], extra );
}
} else {
return makeArray( [], extra );
}
}
try {
return makeArray( context.querySelectorAll(query), extra );
} catch(qsaError) {}
// qSA works strangely on Element-rooted queries
// We can work around this by specifying an extra ID on the root
// and working up from there (Thanks to Andrew Dupont for the technique)
// IE 8 doesn't work on object elements
} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
var oldContext = context,
old = context.getAttribute( "id" ),
nid = old || id,
hasParent = context.parentNode,
relativeHierarchySelector = /^\s*[+~]/.test( query );
if ( !old ) {
context.setAttribute( "id", nid );
} else {
nid = nid.replace( /'/g, "\\$&" );
}
if ( relativeHierarchySelector && hasParent ) {
context = context.parentNode;
}
try {
if ( !relativeHierarchySelector || hasParent ) {
return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
}
} catch(pseudoError) {
} finally {
if ( !old ) {
oldContext.removeAttribute( "id" );
}
}
}
}
return oldSizzle(query, context, extra, seed);
};
for ( var prop in oldSizzle ) {
Sizzle[ prop ] = oldSizzle[ prop ];
}
// release memory in IE
div = null;
})();
}
(function(){
var html = document.documentElement,
matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
if ( matches ) {
// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9 fails this)
var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
pseudoWorks = false;
try {
// This should fail with an exception
// Gecko does not error, returns false instead
matches.call( document.documentElement, "[test!='']:sizzle" );
} catch( pseudoError ) {
pseudoWorks = true;
}
Sizzle.matchesSelector = function( node, expr ) {
// Make sure that attribute selectors are quoted
expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
if ( !Sizzle.isXML( node ) ) {
try { 
if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
var ret = matches.call( node, expr );
// IE 9's matchesSelector returns false on disconnected nodes
if ( ret || !disconnectedMatch ||
// As well, disconnected nodes are said to be in a document
// fragment in IE 9, so check for that
node.document && node.document.nodeType !== 11 ) {
return ret;
}
}
} catch(e) {}
}
return Sizzle(expr, null, null, [node]).length > 0;
};
}
})();
(function(){
var div = document.createElement("div");
div.innerHTML = "<div class='test e'></div><div class='test'></div>";
// Opera can't find a second classname (in 9.6)
// Also, make sure that getElementsByClassName actually exists
if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
return;
}
// Safari caches class attributes, doesn't catch changes (in 3.2)
div.lastChild.className = "e";
if ( div.getElementsByClassName("e").length === 1 ) {
return;
}
Expr.order.splice(1, 0, "CLASS");
Expr.find.CLASS = function( match, context, isXML ) {
if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
return context.getElementsByClassName(match[1]);
}
};
// release memory in IE
div = null;
})();
function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
for ( var i = 0, l = checkSet.length; i < l; i++ ) {
var elem = checkSet[i];
if ( elem ) {
var match = false;
elem = elem[dir];
while ( elem ) {
if ( elem.sizcache === doneName ) {
match = checkSet[elem.sizset];
break;
}
if ( elem.nodeType === 1 && !isXML ){
elem.sizcache = doneName;
elem.sizset = i;
}
if ( elem.nodeName.toLowerCase() === cur ) {
match = elem;
break;
}
elem = elem[dir];
}
checkSet[i] = match;
}
}
}
function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
for ( var i = 0, l = checkSet.length; i < l; i++ ) {
var elem = checkSet[i];
if ( elem ) {
var match = false;
elem = elem[dir];
while ( elem ) {
if ( elem.sizcache === doneName ) {
match = checkSet[elem.sizset];
break;
}
if ( elem.nodeType === 1 ) {
if ( !isXML ) {
elem.sizcache = doneName;
elem.sizset = i;
}
if ( typeof cur !== "string" ) {
if ( elem === cur ) {
match = true;
break;
}
} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
match = elem;
break;
}
}
elem = elem[dir];
}
checkSet[i] = match;
}
}
}
if ( document.documentElement.contains ) {
Sizzle.contains = function( a, b ) {
return a !== b && (a.contains ? a.contains(b) : true);
};
} else if ( document.documentElement.compareDocumentPosition ) {
Sizzle.contains = function( a, b ) {
return !!(a.compareDocumentPosition(b) & 16);
};
} else {
Sizzle.contains = function() {
return false;
};
}
Sizzle.isXML = function( elem ) {
// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833) 
var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
return documentElement ? documentElement.nodeName !== "HTML" : false;
};
var posProcess = function( selector, context ) {
var match,
tmpSet = [],
later = "",
root = context.nodeType ? [context] : context;
// Position selectors must be done after the filter
// And so must :not(positional) so we move all PSEUDOs to the end
while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
later += match[0];
selector = selector.replace( Expr.match.PSEUDO, "" );
}
selector = Expr.relative[selector] ? selector + "*" : selector;
for ( var i = 0, l = root.length; i < l; i++ ) {
Sizzle( selector, root[i], tmpSet );
}
return Sizzle.filter( later, tmpSet );
};
// EXPOSE
pL.find = Sizzle;
pL.expr = Sizzle.selectors;
pL.expr[":"] = pL.expr.filters;
pL.unique = Sizzle.uniqueSort;
pL.text = Sizzle.getText;
pL.isXMLDoc = Sizzle.isXML;
pL.contains = Sizzle.contains;
})();
var runtil = /Until$/,
rparentsprev = /^(?:parents|prevUntil|prevAll)/,
// Note: This RegExp should be improved, or likely pulled from Sizzle
rmultiselector = /,/,
isSimple = /^.[^:#\[\.,]*$/,
slice = Array.prototype.slice,
POS = pL.expr.match.POS,
rneedsContext = pL.expr.match.needsContext;

pL.fn.extend({
find: function( selector ) {
var ret = this.pushStack( "", "find", selector ),
length = 0;
for ( var i = 0, l = this.length; i < l; i++ ) {
length = ret.length;
pL.find( selector, this[i], ret );
if ( i > 0 ) {
// Make sure that the results are unique
for ( var n = length; n < ret.length; n++ ) {
for ( var r = 0; r < length; r++ ) {
if ( ret[r] === ret[n] ) {
ret.splice(n--, 1);
break;
}
}
}
}
}
return ret;
},

closest: function( selectors, context ) {
var cur,
i = 0,
l = this.length,
ret = [],
pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
pL( selectors, context || this.context ) :
0;

for ( ; i < l; i++ ) {
cur = this[i];

while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
if ( pos ? pos.index(cur) > -1 : pL.find.matchesSelector(cur, selectors) ) {
ret.push( cur );
break;
}
cur = cur.parentNode;
}
}

ret = ret.length > 1 ? pL.unique( ret ) : ret;

return this.pushStack( ret, "closest", selectors );
},

filter: function( selector ) {
return this.pushStack( winnow(this, selector, true), "filter", selector );
},
is: function( selector ) {
return !!selector && pL.filter( selector, this ).length > 0;
}
});
pL.extend({
filter: function( expr, elems, not ) {
if ( not ) {
expr = ":not(" + expr + ")";
}
return elems.length === 1 ?
pL.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
pL.find.matches(expr, elems);
}
});
// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {
if ( pL.isFunction( qualifier ) ) {
return pL.grep(elements, function( elem, i ) {
var retVal = !!qualifier.call( elem, i, elem );
return retVal === keep;
});
} else if ( qualifier.nodeType ) {
return pL.grep(elements, function( elem, i ) {
return (elem === qualifier) === keep;
});
} else if ( typeof qualifier === "string" ) {
var filtered = pL.grep(elements, function( elem ) {
return elem.nodeType === 1;
});
if ( isSimple.test( qualifier ) ) {
return pL.filter(qualifier, filtered, !keep);
} else {
qualifier = pL.filter( qualifier, filtered );
}
}
return pL.grep(elements, function( elem, i ) {
return (pL.inArray( elem, qualifier ) >= 0) === keep;
});
}
var rinlinepL = / pL\d+="(?:\d+|null)"/g,
rleadingWhitespace = /^\s+/,
rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
rtagName = /<([\w:]+)/,
rtbody = /<tbody/i,
rhtml = /<|&#?\w+;/,
rnocache = /<(?:script|object|embed|option|style)/i,
// checked="checked" or checked (html5)
rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
raction = /\=([^="'>\s]+\/)>/g,
wrapMap = {
option: [ 1, "<select multiple='multiple'>", "</select>" ],
legend: [ 1, "<fieldset>", "</fieldset>" ],
thead: [ 1, "<table>", "</table>" ],
tr: [ 2, "<table><tbody>", "</tbody></table>" ],
td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
area: [ 1, "<map>", "</map>" ],
_default: [ 0, "", "" ]
};
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
// IE can't serialize <link> and <script> tags normally
if ( !pL.support.htmlSerialize ) {
wrapMap._default = [ 1, "div<div>", "</div>" ];
}
pL.fn.extend({
append: function() {
return this.domManip(arguments, true, function( elem ) {
if ( this.nodeType === 1 ) {
this.appendChild( elem );
}
});
},
after: function() {
if ( this[0] && this[0].parentNode ) {
return this.domManip(arguments, false, function( elem ) {
this.parentNode.insertBefore( elem, this.nextSibling );
});
} else if ( arguments.length ) {
var set = this.pushStack( this, "after", arguments );
set.push.apply( set, pL(arguments[0]).toArray() );
return set;
}
},
// keepData is for internal use only--do not document
remove: function( selector, keepData ) {
for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
if ( !selector || pL.filter( selector, [ elem ] ).length ) {
if ( !keepData && elem.nodeType === 1 ) {
pL.cleanData( elem.getElementsByTagName("*") );
pL.cleanData( [ elem ] );
}
if ( elem.parentNode ) {
 elem.parentNode.removeChild( elem );
}
}
}
return this;
},
empty: function() {
for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
// Remove element nodes and prevent memory leaks
if ( elem.nodeType === 1 ) {
pL.cleanData( elem.getElementsByTagName("*") );
}
// Remove any remaining nodes
while ( elem.firstChild ) {
elem.removeChild( elem.firstChild );
}
}
return this;
},
clone: function( events ) {
// Do the clone
var ret = this.map(function() {
if ( !pL.support.noCloneEvent && !pL.isXMLDoc(this) ) {
// IE copies events bound via attachEvent when
// using cloneNode. Calling detachEvent on the
// clone will also remove the events from the orignal
// In order to get around this, we use innerHTML.
// Unfortunately, this means some modifications to
// attributes in IE that are actually only stored
// as properties will not be copied (such as the
// the name attribute on an input).
var html = this.outerHTML,
ownerDocument = this.ownerDocument;
if ( !html ) {
var div = ownerDocument.createElement("div");
div.appendChild( this.cloneNode(true) );
html = div.innerHTML;
}
return pL.clean([html.replace(rinlinepL, "")
// Handle the case in IE 8 where action=/test/> self-closes a tag
.replace(raction, '="$1">')
.replace(rleadingWhitespace, "")], ownerDocument)[0];
} else {
return this.cloneNode(true);
}
});
// Copy the events from the original to the clone
if ( events === true ) {
cloneCopyEvent( this, ret );
cloneCopyEvent( this.find("*"), ret.find("*") );
}
// Return the cloned set
return ret;
},
html: function( value ) {
if ( value === undefined ) {
return this[0] && this[0].nodeType === 1 ?
this[0].innerHTML.replace(rinlinepL, "") :
null;
// See if we can take a shortcut and just use innerHTML
} else if ( typeof value === "string" && !rnocache.test( value ) &&
(pL.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {
value = value.replace(rxhtmlTag, "<$1></$2>");
try {
for ( var i = 0, l = this.length; i < l; i++ ) {
// Remove element nodes and prevent memory leaks
if ( this[i].nodeType === 1 ) {
pL.cleanData( this[i].getElementsByTagName("*") );
this[i].innerHTML = value;
}
}
// If using innerHTML throws an exception, use the fallback method
} catch(e) {
this.empty().append( value );
}
} else if ( pL.isFunction( value ) ) {
this.each(function(i){
var self = pL( this );
self.html( value.call(this, i, self.html()) );
});
} else {
this.empty().append( value );
}
return this;
},
domManip: function( args, table, callback ) {
var results, first, fragment, parent,
value = args[0],
scripts = [];
// We can't cloneNode fragments that contain checked, in WebKit
if ( !pL.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
return this.each(function() {
pL(this).domManip( args, table, callback, true );
});
}
if ( pL.isFunction(value) ) {
return this.each(function(i) {
var self = pL(this);
args[0] = value.call(this, i, table ? self.html() : undefined);
self.domManip( args, table, callback );
});
}
if ( this[0] ) {
parent = value && value.parentNode;
// If we're in a fragment, just use that instead of building a new one
if ( pL.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
results = { fragment: parent };
} else {
results = pL.buildFragment( args, this, scripts );
}
fragment = results.fragment;
if ( fragment.childNodes.length === 1 ) {
first = fragment = fragment.firstChild;
} else {
first = fragment.firstChild;
}
if ( first ) {
table = table && pL.nodeName( first, "tr" );
for ( var i = 0, l = this.length; i < l; i++ ) {
callback.call(
table ?
root(this[i], first) :
this[i],
i > 0 || results.cacheable || this.length > 1  ?
fragment.cloneNode(true) :
fragment
);
}
}
if ( scripts.length ) {
pL.each( scripts, evalScript );
}
}
return this;
}
});
function root( elem, cur ) {
return pL.nodeName(elem, "table") ?
(elem.getElementsByTagName("tbody")[0] ||
elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
elem;
}
function cloneCopyEvent(orig, ret) {
var i = 0;
ret.each(function() {
if ( this.nodeName !== (orig[i] && orig[i].nodeName) ) {
return;
}
var oldData = pL.data( orig[i++] ),
curData = pL.data( this, oldData ),
events = oldData && oldData.events;
if ( events ) {
delete curData.handle;
curData.events = {};
for ( var type in events ) {
for ( var handler in events[ type ] ) {
pL.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
}
}
}
});
}
pL.buildFragment = function( args, nodes, scripts ) {
var fragment, cacheable, cacheresults,
doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);
// Only cache "small" (1/2 KB) strings that are associated with the main document
// Cloning options loses the selected state, so don't cache them
// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
!rnocache.test( args[0] ) && (pL.support.checkClone || !rchecked.test( args[0] )) ) {
cacheable = true;
cacheresults = pL.fragments[ args[0] ];
if ( cacheresults ) {
if ( cacheresults !== 1 ) {
fragment = cacheresults;
}
}
}
if ( !fragment ) {
fragment = doc.createDocumentFragment();
pL.clean( args, doc, fragment, scripts );
}
if ( cacheable ) {
pL.fragments[ args[0] ] = cacheresults ? fragment : 1;
}
return { fragment: fragment, cacheable: cacheable };
};
pL.fragments = {};
pL.each({
appendTo: "append",
prependTo: "prepend",
insertBefore: "before",
insertAfter: "after",
replaceAll: "replaceWith"
}, function( name, original ) {
pL.fn[ name ] = function( selector ) {
var ret = [],
insert = pL( selector ),
parent = this.length === 1 && this[0].parentNode;
if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
insert[ original ]( this[0] );
return this;
} else {
for ( var i = 0, l = insert.length; i < l; i++ ) {
var elems = (i > 0 ? this.clone(true) : this).get();
pL( insert[i] )[ original ]( elems );
ret = ret.concat( elems );
}
return this.pushStack( ret, name, insert.selector );
}
};
});
pL.extend({
clean: function( elems, context, fragment, scripts ) {
context = context || document;
// !context.createElement fails in IE with an error but returns typeof 'object'
if ( typeof context.createElement === "undefined" ) {
context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
}
var ret = [];
for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
if ( typeof elem === "number" ) {
elem += "";
}
if ( !elem ) {
continue;
}
// Convert html string into DOM nodes
if ( typeof elem === "string" && !rhtml.test( elem ) ) {
elem = context.createTextNode( elem );
} else if ( typeof elem === "string" ) {
// Fix "XHTML"-style tags in all browsers
elem = elem.replace(rxhtmlTag, "<$1></$2>");
// Trim whitespace, otherwise indexOf won't work as expected
var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
wrap = wrapMap[ tag ] || wrapMap._default,
depth = wrap[0],
div = context.createElement("div");
// Go to html and back, then peel off extra wrappers
div.innerHTML = wrap[1] + elem + wrap[2];
// Move to the right depth
while ( depth-- ) {
div = div.lastChild;
}
// Remove IE's autoinserted <tbody> from table fragments
if ( !pL.support.tbody ) {
// String was a <table>, *may* have spurious <tbody>
var hasBody = rtbody.test(elem),
tbody = tag === "table" && !hasBody ?
div.firstChild && div.firstChild.childNodes :
// String was a bare <thead> or <tfoot>
wrap[1] === "<table>" && !hasBody ?
div.childNodes :
[];
for ( var j = tbody.length - 1; j >= 0 ; --j ) {
if ( pL.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
tbody[ j ].parentNode.removeChild( tbody[ j ] );
}
}
}
// IE completely kills leading whitespace when innerHTML is used
if ( !pL.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
}
elem = div.childNodes;
}
if ( elem.nodeType ) {
ret.push( elem );
} else {
ret = pL.merge( ret, elem );
}
}
if ( fragment ) {
for ( i = 0; ret[i]; i++ ) {
if ( scripts && pL.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
} else {
if ( ret[i].nodeType === 1 ) {
ret.splice.apply( ret, [i + 1, 0].concat(pL.makeArray(ret[i].getElementsByTagName("script"))) );
}
fragment.appendChild( ret[i] );
}
}
}
return ret;
},
cleanData: function( elems ) {
var data, id, cache = pL.cache,
special = pL.event.special,
deleteExpando = pL.support.deleteExpando;
for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
if ( elem.nodeName && pL.noData[elem.nodeName.toLowerCase()] ) {
continue;
}
id = elem[ pL.expando ];
if ( id ) {
data = cache[ id ];
if ( data && data.events ) {
for ( var type in data.events ) {
if ( special[ type ] ) {
pL.event.remove( elem, type );
} else {
pL.removeEvent( elem, type, data.handle );
}
}
}
if ( deleteExpando ) {
delete elem[ pL.expando ];
} else if ( elem.removeAttribute ) {
elem.removeAttribute( pL.expando );
}
delete cache[ id ];
}
}
}
});
function evalScript( i, elem ) {
if ( elem.src ) {
pL.ajax({
url: elem.src,
async: false,
dataType: "script"
});
} else {
pL.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );
}
if ( elem.parentNode ) {
elem.parentNode.removeChild( elem );
}
}
var jsc = now(),
rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
rselectTextarea = /^(?:select|textarea)/i,
rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
rnoContent = /^(?:GET|HEAD)$/,
rbracket = /\[\]$/,
jsre = /\=\?(&|$)/,
rquery = /\?/,
rts = /([?&])_=[^&]*/,
rurl = /^(\w+:)?\/\/([^\/?#]+)/,
r20 = /%20/g,
rhash = /#.*$/,
// Keep a copy of the old load method
_load = pL.fn.load;
pL.fn.extend({
load: function( url, params, callback ) {
if ( typeof url !== "string" && _load ) {
return _load.apply( this, arguments );
// Don't do a request if no elements are being requested
} else if ( !this.length ) {
return this;
}
var off = url.indexOf(" ");
if ( off >= 0 ) {
var selector = url.slice(off, url.length);
url = url.slice(0, off);
}
// Default to a GET request
var type = "GET";
// If the second parameter was provided
if ( params ) {
// If it's a function
if ( pL.isFunction( params ) ) {
// We assume that it's the callback
callback = params;
params = null;
// Otherwise, build a param string
} else if ( typeof params === "object" ) {
params = pL.param( params, pL.ajaxSettings.traditional );
type = "POST";
}
}
var self = this;
// Request the remote document
pL.ajax({
url: url,
type: type,
dataType: "html",
data: params,
complete: function( res, status ) {
// If successful, inject the HTML into all the matched elements
if ( status === "success" || status === "notmodified" ) {
// See if a selector was specified
self.html( selector ?
// Create a dummy div to hold the results
pL("<div>")
// inject the contents of the document in, removing the scripts
// to avoid any 'Permission Denied' errors in IE
.append(res.responseText.replace(rscript, ""))
// Locate the specified elements
.find(selector) :
// If not, just inject the full result
res.responseText );
}
if ( callback ) {
self.each( callback, [res.responseText, status, res] );
}
}
});
return this;
},
serialize: function() {
return pL.param(this.serializeArray());
},
serializeArray: function() {
return this.map(function() {
return this.elements ? pL.makeArray(this.elements) : this;
})
.filter(function() {
return this.name && !this.disabled &&
(this.checked || rselectTextarea.test(this.nodeName) ||
rinput.test(this.type));
})
.map(function( i, elem ) {
var val = pL(this).val();
return val == null ?
null :
pL.isArray(val) ?
pL.map( val, function( val, i ) {
return { name: elem.name, value: val };
}) :
{ name: elem.name, value: val };
}).get();
}
});
// Attach a bunch of functions for handling common AJAX events
pL.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function( i, o ) {
pL.fn[o] = function( f ) {
return this.bind(o, f);
};
});
pL.extend({
get: function( url, data, callback, type ) {
// shift arguments if data argument was omited
if ( pL.isFunction( data ) ) {
type = type || callback;
callback = data;
data = null;
}
return pL.ajax({
type: "GET",
url: url,
data: data,
success: callback,
dataType: type
});
},
getScript: function( url, callback ) {
return pL.get(url, null, callback, "script");
},
getJSON: function( url, data, callback ) {
return pL.get(url, data, callback, "json");
},
post: function( url, data, callback, type ) {
// shift arguments if data argument was omited
if ( pL.isFunction( data ) ) {
type = type || callback;
callback = data;
data = {};
}
return pL.ajax({
type: "POST",
url: url,
data: data,
success: callback,
dataType: type
});
},
ajaxSetup: function( settings ) {
pL.extend( pL.ajaxSettings, settings );
},
ajaxSettings: {
url: location.href,
global: true,
type: "GET",
contentType: "application/x-www-form-urlencoded",
processData: true,
async: true,
/*
timeout: 0,
data: null,
username: null,
password: null,
traditional: false,
*/
// This function can be overriden by calling pL.ajaxSetup
xhr: function() {
return new window.XMLHttpRequest();
},
accepts: {
xml: "application/xml, text/xml",
html: "text/html",
script: "text/javascript, application/javascript",
json: "application/json, text/javascript",
text: "text/plain",
_default: "*/*"
}
},
ajax: function( origSettings ) {
var s = 
pL.extend(true, {}, pL.ajaxSettings, origSettings),
jsonp, status, data, type = s.type.toUpperCase(), noContent = rnoContent.test(type);
s.url = s.url.replace( rhash, "" );
// Use original (not extended) context object if it was provided
s.context = origSettings && origSettings.context != null ? origSettings.context : s;
// convert data if not already a string
if ( s.data && s.processData && typeof s.data !== "string" ) {
s.data = pL.param( s.data, s.traditional );
}
// Handle JSONP Parameter Callbacks
if ( s.dataType === "jsonp" ) {
if ( type === "GET" ) {
if ( !jsre.test( s.url ) ) {
s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
}
} else if ( !s.data || !jsre.test(s.data) ) {
s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
}
s.dataType = "json";
}
// Build temporary JSONP function
if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
jsonp = s.jsonpCallback || ("jsonp" + jsc++);
// Replace the =? sequence both in the query string and the data
if ( s.data ) {
s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
}
s.url = s.url.replace(jsre, "=" + jsonp + "$1");
// We need to make sure
// that a JSONP style response is executed properly
s.dataType = "script";
// Handle JSONP-style loading
var customJsonp = window[ jsonp ];
window[ jsonp ] = function( tmp ) {
if ( pL.isFunction( customJsonp ) ) {
customJsonp( tmp );
} else {
// Garbage collect
window[ jsonp ] = undefined;
try {
delete window[ jsonp ];
} catch( jsonpError ) {}
}
data = tmp;
pL.handleSuccess( s, xhr, status, data );
pL.handleComplete( s, xhr, status, data );
if ( head ) {
head.removeChild( script );
}
};
}
if ( s.dataType === "script" && s.cache === null ) {
s.cache = false;
}
if ( s.cache === false && noContent ) {
var ts = now();
// try replacing _= if it is there
var ret = s.url.replace(rts, "$1_=" + ts);
// if nothing was replaced, add timestamp to the end
s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
}
// If data is available, append data to url for GET/HEAD requests
if ( s.data && noContent ) {
s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
}
// Watch for a new set of requests
if ( s.global && pL.active++ === 0 ) {
pL.event.trigger( "ajaxStart" );
}
// Matches an absolute URL, and saves the domain
var parts = rurl.exec( s.url ),
remote = parts && (parts[1] && parts[1].toLowerCase() !== location.protocol || parts[2].toLowerCase() !== location.host);
// If we're requesting a remote document
// and trying to load JSON or Script with a GET
if ( s.dataType === "script" && type === "GET" && remote ) {
var head = document.getElementsByTagName("head")[0] || document.documentElement;
var script = document.createElement("script");
if ( s.scriptCharset ) {
script.charset = s.scriptCharset;
}
script.src = s.url;
// Handle Script loading
if ( !jsonp ) {
var done = false;
// Attach handlers for all browsers
script.onload = script.onreadystatechange = function() {
if ( !done && (!this.readyState ||
this.readyState === "loaded" || this.readyState === "complete") ) {
done = true;
pL.handleSuccess( s, xhr, status, data );
pL.handleComplete( s, xhr, status, data );
// Handle memory leak in IE
script.onload = script.onreadystatechange = null;
if ( head && script.parentNode ) {
head.removeChild( script );
}
}
};
}
// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
// This arises when a base node is used (#2709 and #4378).
head.insertBefore( script, head.firstChild );
// We handle everything using the script element injection
return undefined;
}
var requestDone = false;
// Create the request object
var xhr = s.xhr();
if ( !xhr ) {
return;
}
// Open the socket
// Passing null username, generates a login popup on Opera (#2865)
if ( s.username ) {
xhr.open(type, s.url, s.async, s.username, s.password);
} else {
xhr.open(type, s.url, s.async);
}
// Need an extra try/catch for cross domain requests in Firefox 3
try {
// Set content-type if data specified and content-body is valid for this type
if ( (s.data != null && !noContent) || (origSettings && origSettings.contentType) ) {
xhr.setRequestHeader("Content-Type", s.contentType);
}
// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if ( s.ifModified ) {
if ( pL.lastModified[s.url] ) {
xhr.setRequestHeader("If-Modified-Since", pL.lastModified[s.url]);
}
if ( pL.etag[s.url] ) {
xhr.setRequestHeader("If-None-Match", pL.etag[s.url]);
}
}
// Set header so the called script knows that it's an XMLHttpRequest
// Only send the header if it's not a remote XHR
if ( !remote ) {
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
}
// Set the Accepts header for the server, depending on the dataType
xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
s.accepts[ s.dataType ] + ", */*; q=0.01" :
s.accepts._default );
} catch( headerError ) {}
// Allow custom headers/mimetypes and early abort
if ( s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false ) {
// Handle the global AJAX counter
if ( s.global && pL.active-- === 1 ) {
pL.event.trigger( "ajaxStop" );
}
// close opended socket
xhr.abort();
return false;
}
if ( s.global ) {
pL.triggerGlobal( s, "ajaxSend", [xhr, s] );
}
// Wait for a response to come back
var onreadystatechange = xhr.onreadystatechange = function( isTimeout ) {
// The request was aborted
if ( !xhr || xhr.readyState === 0 || isTimeout === "abort" ) {
// Opera doesn't call onreadystatechange before this point
// so we simulate the call
if ( !requestDone ) {
pL.handleComplete( s, xhr, status, data );
}
requestDone = true;
if ( xhr ) {
xhr.onreadystatechange = pL.noop;
}
// The transfer is complete and the data is available, or the request timed out
} else if ( !requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout") ) {
requestDone = true;
xhr.onreadystatechange = pL.noop;
status = isTimeout === "timeout" ?
"timeout" :
!pL.httpSuccess( xhr ) ?
"error" :
s.ifModified && pL.httpNotModified( xhr, s.url ) ?
"notmodified" :
"success";
var errMsg;
if ( status === "success" ) {
// Watch for, and catch, XML document parse errors
try {
// process the data (runs the xml through httpData regardless of callback)
data = pL.httpData( xhr, s.dataType, s );
} catch( parserError ) {
status = "parsererror";
errMsg = parserError;
}
}
// Make sure that the request was successful or notmodified
if ( status === "success" || status === "notmodified" ) {
// JSONP handles its own success callback
if ( !jsonp ) {
pL.handleSuccess( s, xhr, status, data );
}
} else {
pL.handleError( s, xhr, status, errMsg );
}
// Fire the complete handlers
if ( !jsonp ) {
pL.handleComplete( s, xhr, status, data );
}
if ( isTimeout === "timeout" ) {
xhr.abort();
}
// Stop memory leaks
if ( s.async ) {
xhr = null;
}
}
};
// Override the abort handler, if we can (IE 6 doesn't allow it, but that's OK)
// Opera doesn't fire onreadystatechange at all on abort
try {
var oldAbort = xhr.abort;
xhr.abort = function() {
if ( xhr ) {
// oldAbort has no call property in IE7 so
// just do it this way, which works in all
// browsers
Function.prototype.call.call( oldAbort, xhr );
}
onreadystatechange( "abort" );
};
} catch( abortError ) {}
// Timeout checker
if ( s.async && s.timeout > 0 ) {
setTimeout(function() {
// Check to see if the request is still happening
if ( xhr && !requestDone ) {
onreadystatechange( "timeout" );
}
}, s.timeout);
}
// Send the data
try {
xhr.send( noContent || s.data == null ? null : s.data );
} catch( sendError ) {
pL.handleError( s, xhr, null, sendError );
// Fire the complete handlers
pL.handleComplete( s, xhr, status, data );
}
// firefox 1.5 doesn't fire statechange for sync requests
if ( !s.async ) {
onreadystatechange();
}
// return XMLHttpRequest to allow aborting the request etc.
return xhr;
},
// Serialize an array of form elements or a set of
// key/values into a query string
param: function( a, traditional ) {
var s = [],
add = function( key, value ) {
// If value is a function, invoke it and return its value
value = pL.isFunction(value) ? value() : value;
s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
};
// Set traditional to true for pL <= 1.3.2 behavior.
if ( traditional === undefined ) {
traditional = pL.ajaxSettings.traditional;
}
// If an array was passed in, assume that it is an array of form elements.
if ( pL.isArray(a) || a.pL ) {
// Serialize the form elements
pL.each( a, function() {
add( this.name, this.value );
});
} else {
// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for ( var prefix in a ) {
buildParams( prefix, a[prefix], traditional, add );
}
}
// Return the resulting serialization
return s.join("&").replace(r20, "+");
}
});
function buildParams( prefix, obj, traditional, add ) {
if ( pL.isArray(obj) && obj.length ) {
// Serialize array item.
pL.each( obj, function( i, v ) {
if ( traditional || rbracket.test( prefix ) ) {
// Treat each array item as a scalar.
add( prefix, v );
} else {
// If array item is non-scalar (array or object), encode its
// numeric index to resolve deserialization ambiguity issues.
// Note that rack (as of 1.0.0) can't currently deserialize
// nested arrays properly, and attempting to do so may cause
// a server error. Possible fixes are to modify rack's
// deserialization algorithm or to provide an option or flag
// to force array serialization to be shallow.
buildParams( prefix + "[" + ( typeof v === "object" || pL.isArray(v) ? i : "" ) + "]", v, traditional, add );
}
});
} else if ( !traditional && obj != null && typeof obj === "object" ) {
if ( pL.isEmptyObject( obj ) ) {
add( prefix, "" );
// Serialize object item.
} else {
pL.each( obj, function( k, v ) {
buildParams( prefix + "[" + k + "]", v, traditional, add );
});
}
} else {
// Serialize scalar item.
add( prefix, obj );
}
}
// This is still on the pL object... for now
// Want to move this to pL.ajax some day
pL.extend({
// Counter for holding the number of active queries
active: 0,
// Last-Modified header cache for next request
lastModified: {},
etag: {},
handleError: function( s, xhr, status, e ) {
// If a local callback was specified, fire it
if ( s.error ) {
s.error.call( s.context, xhr, status, e );
}
// Fire the global callback
if ( s.global ) {
pL.triggerGlobal( s, "ajaxError", [xhr, s, e] );
}
},
handleSuccess: function( s, xhr, status, data ) {
// If a local callback was specified, fire it and pass it the data
if ( s.success ) {
s.success.call( s.context, data, status, xhr );
}
// Fire the global callback
if ( s.global ) {
pL.triggerGlobal( s, "ajaxSuccess", [xhr, s] );
}
},
handleComplete: function( s, xhr, status ) {
// Process result
if ( s.complete ) {
s.complete.call( s.context, xhr, status );
}
// The request was completed
if ( s.global ) {
pL.triggerGlobal( s, "ajaxComplete", [xhr, s] );
}
// Handle the global AJAX counter
if ( s.global && pL.active-- === 1 ) {
pL.event.trigger( "ajaxStop" );
}
},
triggerGlobal: function( s, type, args ) {
(s.context && s.context.url == null ? pL(s.context) : pL.event).trigger(type, args);
},
// Determines if an XMLHttpRequest was successful or not
httpSuccess: function( xhr ) {
try {
// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
return !xhr.status && location.protocol === "file:" ||
xhr.status >= 200 && xhr.status < 300 ||
xhr.status === 304 || xhr.status === 1223;
} catch(e) {}
return false;
},
// Determines if an XMLHttpRequest returns NotModified
httpNotModified: function( xhr, url ) {
var lastModified = xhr.getResponseHeader("Last-Modified"),
etag = xhr.getResponseHeader("Etag");
if ( lastModified ) {
pL.lastModified[url] = lastModified;
}
if ( etag ) {
pL.etag[url] = etag;
}
return xhr.status === 304;
},
httpData: function( xhr, type, s ) {
var ct = xhr.getResponseHeader("content-type") || "",
xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
data = xml ? xhr.responseXML : xhr.responseText;
if ( xml && data.documentElement.nodeName === "parsererror" ) {
pL.error( "parsererror" );
}
// Allow a pre-filtering function to sanitize the response
// s is checked to keep backwards compatibility
if ( s && s.dataFilter ) {
data = s.dataFilter( data, type );
}
// The filter can actually parse the response
if ( typeof data === "string" ) {
// Get the JavaScript object, if JSON is used.
if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
data = pL.parseJSON( data );
// If the type is "script", eval it in global context
} else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
pL.globalEval( data );
}
}
return data;
}
});
/*
 * Create the request object; Microsoft failed to properly
 * implement the XMLHttpRequest in IE7 (can't request local files),
 * so we use the ActiveXObject when it is available
 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
 * we need a fallback.
 */
if ( window.ActiveXObject ) {
pL.ajaxSettings.xhr = function() {
if ( window.location.protocol !== "file:" ) {
try {
return new window.XMLHttpRequest();
} catch(xhrError) {}
}
try {
return new window.ActiveXObject("Microsoft.XMLHTTP");
} catch(activeError) {}
};
}
// Does this browser support XHR requests?
pL.support.ajax = !!pL.ajaxSettings.xhr();

(function(pL){

var $A = function(dc, dcA, dcI, onReady, disableAsync){
if (typeof dc === 'object' && !isArray(dc) && 'id' in dc){}
else {
disableAsync = onReady;
onReady = dcI;
dcI = dcA;
dcA = dc;
dc = null;
}
var fn = function(){
if (disableAsync) pL.ajaxSetup({async: false});
pL.accDC(dcA, dcI, dc);
if (disableAsync) pL.ajaxSetup({async: true});
};
if (onReady) pL(fn);
else fn();
};

$A.reg = {};

$A.fn = {
globalDC: {},
wheel: { },
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

globalDCMerge: function(){
$A.find('*', function(dc){
pL.extend(true, dc, $A.fn.globalDC);
});
},

genId: function(id){
return now(id || 'AccDC');
},

announce: function(str, noRepeat, aggr){
if (typeof str !== 'string')
str = getText(str);
return String.prototype.announce.apply(str, [str, null, noRepeat, aggr]);
},

query: function(sel, con, call){
if (con && typeof con === 'function'){
call = con;
con = null;
}
var r = [];
if (isArray(sel)) r = sel;
else if (typeof sel !== 'string') r.push(sel);
else pL.find(sel, con, r);
if (call && typeof call === 'function') pL.each(r, call);
return r;
},

find: function(ids, fn){
var ids = ids.split(',');
for (var id in $A.reg){
if (ids[0] === '*' || inArray(id, ids) !== -1)
fn.apply($A.reg[id], [$A.reg[id]]);
}
},

destroy: function(id, p){
if (!$A.reg[id]) return false;
var r = $A.reg[id],
a = r.accDCObj,
c = r.containerDiv;
if (p && r.loaded){
var lc = lastChild(c);
while(lc){
pL(a).after(lc);
lc = lastChild(c);
}
}
if (r.loaded)
pL(a).remove();
r.accDCObj = r.containerDiv = a = c = null;
var iv = r.indexVal,
wh = r.siblings;
wh.splice(iv, 1);
for (var i = 0; i < wh.length; i++){
wh[i].indexVal = i;
wh[i].siblings = wh;
}
if ($A.reg[id].parent && $A.reg[id].parent.children && $A.reg[id].parent.children.length){
var pc = -1,
cn = $A.reg[id].parent.children;
for (var i = 0; i < cn.length; i++){
if (cn[i].id == id) pc = i;
}
if (pc >= 0)
$A.reg[id].parent.children.splice(pc, 1);
}
delete $A.reg[id];
},

morph: function(dc, obj, dcI){
if (dc.nodeType === 1 && dc.nodeName){
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

setFocus: function(o){
var oTI = null;
if (getAttr(o, 'tabindex')) oTI = getAttr(o, 'tabindex');
setAttr(o, 'tabindex', -1);
o.focus();
if (oTI) setAttr(o, 'tabindex', oTI);
else remAttr(o, 'tabindex');
return o;
}

});

$A.load = function(target, source, hLoadData, callback){
return pL(target).load(source, hLoadData, callback);
};
$A.get = function(source, hGetData, callback, hGetType){
return pL.get(source, hGetData, callback, hGetType);
};
$A.getJSON = function(source, hJSONData, callback){
return pL.getJSON(source, hJSONData, callback);
};
$A.getScript = function(source, callback, disableAsync){
if (typeof callback === 'boolean'){
disableAsync = callback;
callback = null;
}
if (disableAsync) pL.ajaxSetup({async: false});
pL.getScript(source, callback);
if (disableAsync) pL.ajaxSetup({async: true});
};
$A.post = function(source, hPostData, callback, hPostType){
return pL.post(source, hPostData, callback, hPostType);
};
$A.ajax = function(ajaxOptions){
return pL.ajax(ajaxOptions);
};

$A.bind = function(ta, e, fn){
if (e == 'load' && (ta == 'body' || ta == window || ta == document || ta == document.body))
pL(document).ready(function(ev){
fn(ev);
});
else
pL(ta).bind(e, fn);
return ta;
};
$A.unbind = function(ta, e){
pL(ta).unbind(e);
return ta;
};
$A.trigger = function(ta, e){
pL(ta).trigger(e);
return ta;
};

window[(window.AccDCNamespace ? window.AccDCNamespace : '$A')] = $A;

// BG:3.4:11/17/2017
var calcPosition = function(dc, objArg, posVal){
var obj = objArg || dc.posAnchor;
if (obj && typeof obj == 'string') obj = pL(obj).get(0);
else if (!obj) obj = dc.triggerObj;
if (!obj) return;
var
autoPosition = posVal || dc.autoPosition,
pos = {},
aPos = {
height: xHeight(dc.accDCObj),
width: xWidth(dc.accDCObj)
},
oPos = xOffset(obj),
position = css(dc.accDCObj, 'position');
if (position == 'absolute' && css(obj, 'position') != 'fixed') oPos = xOffset(obj, true);
if (autoPosition == 1){
pos.left = oPos.left;
pos.top = oPos.top - aPos.height;
} else if (autoPosition == 2){
pos.left = oPos.right;
pos.top = oPos.top - aPos.height;
} else if (autoPosition == 3){
pos.left = oPos.right;
pos.top = oPos.top;
} else if (autoPosition == 4){
pos.left = oPos.right;
pos.top = oPos.bottom;
} else if (autoPosition == 5){
pos.left = oPos.left;
pos.top = oPos.bottom;
} else if (autoPosition == 6){
pos.left = oPos.left - aPos.width;
pos.top = oPos.bottom;
} else if (autoPosition == 7){
pos.left = oPos.left - aPos.width;
pos.top = oPos.top;
} else if (autoPosition == 8){
pos.left = oPos.left - aPos.width;
pos.top = oPos.top - aPos.height;
} else if (autoPosition == 9){
pos.left = oPos.left;
pos.top = oPos.top;
} else if (autoPosition == 10){
pos.left = oPos.right - aPos.width;
pos.top = oPos.top - aPos.height;
} else if (autoPosition == 11){
pos.left = oPos.right - aPos.width;
pos.top = oPos.top;
} else if (autoPosition == 12){
pos.left = oPos.right - aPos.width;
pos.top = oPos.bottom;
}
if (typeof dc.offsetTop === 'number' && (dc.offsetTop < 0 || dc.offsetTop > 0))
pos.top += dc.offsetTop;
if (typeof dc.offsetLeft === 'number' && (dc.offsetLeft < 0 || dc.offsetLeft > 0))
pos.left += dc.offsetLeft;
css(dc.accDCObj, pos);
};

String.prototype.announce = function announce(strm, loop, noRep, aggr){
if (String.announce.loaded){
if (!String.announce.liveRendered && !aggr && String.announce.placeHolder){
String.announce.liveRendered = true;
document.body.appendChild(String.announce.placeHolder);
}
if (!String.announce.alertRendered && aggr && String.announce.placeHolder2){
String.announce.alertRendered = true;
document.body.appendChild(String.announce.placeHolder2);
}
}
if (strm && strm.nodeName && strm.nodeType === 1) strm = getText(strm);
var obj = strm || this,
str = strm ? strm : this.toString();
if (typeof str !== 'string') return obj;
if (!loop && inArray(str, String.announce.alertMsgs) === -1) String.announce.alertMsgs.push(str);
if ((String.announce.alertMsgs.length == 1 || loop)){
var timeLength = String.announce.baseDelay + (String.announce.iterate(String.announce.alertMsgs[0], /\s|\,|\.|\:|\;|\!|\(|\)|\/|\?|\@|\#|\$|\%|\^|\&|\*|\\|\-|\_|\+|\=/g) * String.announce.charMultiplier);
if (!(noRep && String.announce.lastMsg == String.announce.alertMsgs[0])){
String.announce.lastMsg = String.announce.alertMsgs[0];
if (aggr)
String.announce.placeHolder2.innerHTML = String.announce.alertMsgs[0];
else
String.announce.placeHolder.innerHTML = String.announce.alertMsgs[0];
}
String.announce.alertTO = setTimeout(function(){
String.announce.placeHolder.innerHTML = String.announce.placeHolder2.innerHTML = '';
String.announce.alertMsgs.shift();
if (String.announce.alertMsgs.length >= 1)
String.prototype.announce(String.announce.alertMsgs[0], true, noRep, aggr);
}, timeLength);
}
return obj;
};

String.announce = {
alertMsgs: [],
clear: function(){
if (this.alertTO) clearTimeout(this.alertTO);
this.alertMsgs = [];
},
baseDelay: 1000,
charMultiplier: 10,
lastMsg: '',
iterate: function(str, regExp){
var iCount = 0;
str.replace(regExp, function(){
iCount++;
});
return iCount;
},
loaded: false,
liveRendered: false,
alertRendered: false
};

$A.bind(window, 'load', function(){
if (!String.announce.placeHolder){
String.announce.placeHolder = createEl('div', {
'aria-live': 'polite'
}, sraCSS);
String.announce.placeHolder2 = createEl('div', {
role: 'alert'
}, sraCSS);
}
String.announce.loaded = true;
});

pL.accDC = function(accDCObjects, gImport, parentDC){
var wheel = [],
ids = [],

getScript = function(dc, u, f){
pL.ajax({
async: false,
type: "GET",
url: u,
data: null,
success: function(){
if (f) return f.apply(dc, arguments);
},
dataType: 'script'
});
},

changeTabs = function(dc, isClose){
var dc = wheel[dc.indexVal];
if (dc.isTab){
if (dc.tabState){
for (var w = 0; w < wheel.length; w++){
var wl = wheel[w];
if (wl.isTab){
var ss = pL(wl.triggerObj).data('sra');
if (ss){
if (wl.loaded){
pL(ss).html('<span>&nbsp;' + wl.tabRole + '&nbsp;' + wl.tabState + '</span>');
} else pL(ss).html('<span>&nbsp;' + wl.tabRole + '</span>');
}
}
}
$A.query(dc.trigger, function(){
if (this != dc.triggerObj){
pL(pL(this).data('sra')).html('<span>&nbsp;' + dc.tabRole + '</span>');
}
});
}
} else if (dc.isToggle){
if (dc.toggleState)
$A.query(dc.trigger, function(){
var ss = pL(this).data('sra');
if (ss){
if (!isClose){
pL(ss).html('<span>&nbsp;' + dc.toggleRole + '&nbsp;' + dc.toggleState + '</span>');
} else pL(ss).html('<span>&nbsp;' + dc.toggleRole + '</span>');
}
});
}
return wheel[dc.indexVal] = dc;
},

loadAccDCObj = function(dc){
var dc = wheel[dc.indexVal];
if ((dc.loaded && !dc.allowReopen && !dc.isToggle) || dc.fn.override || dc.lock || dc.loading || dc.closing)
return dc;
else if (dc.loaded && (dc.allowReopen || dc.isToggle)){
dc.fn.bypass = true;
closeAccDCObj(dc);
dc.fn.bypass = false;
if (dc.isToggle) return dc;
}
dc.cancel = false;
dc.content = '';
var nid = now();
dc.accDCObjId = dc.fn.accDCObjId = 'AccDC' + nid;
dc.closeId = 'AccDC' + (nid + (nowI+=1));
dc.containerId = dc.containerDivId = 'AccDC' + (nid + (nowI+=1));
if (dc.importCSS) dc.fn.importCSSId = 'AccDC' + (nid + (nowI+=1));
dc.fn.sraStart = createEl('div', null, sraCSS);
dc.fn.sraEnd = createEl('div', null, sraCSS);
dc.containerDiv = createEl('div', {
id: dc.containerId
});
dc.accDCObj = createEl('div', {
id: dc.fn.accDCObjId
});
if (dc.className) addClass(dc.accDCObj, dc.className);
// BG:3.4:12/11/2017 start
if (dc.showHiddenBounds)
pL(dc.accDCObj)
.append(dc.fn.sraStart);
pL(dc.accDCObj)
.append(dc.containerDiv);
if (dc.showHiddenBounds)
pL(dc.accDCObj)
.append(dc.fn.sraEnd);
// BG:3.4:12/11/2017 end
var events = {
mouseOver: function(ev){
dc.mouseOver.apply(this, [ev, dc]);
},
mouseOut: function(ev){
dc.mouseOut.apply(this, [ev, dc]);
},
resize: function(ev){
dc.resize.apply(this, [ev, dc]);
},
scroll: function(ev){
dc.scroll.apply(this, [ev, dc]);
},
click: function(ev){
dc.click.apply(this, [ev, dc]);
},
dblClick: function(ev){
dc.dblClick.apply(this, [ev, dc]);
},
mouseDown: function(ev){
dc.mouseDown.apply(this, [ev, dc]);
},
mouseUp: function(ev){
dc.mouseUp.apply(this, [ev, dc]);
},
mouseMove: function(ev){
dc.mouseMove.apply(this, [ev, dc]);
},
mouseEnter: function(ev){
dc.mouseEnter.apply(this, [ev, dc]);
},
mouseLeave: function(ev){
dc.mouseLeave.apply(this, [ev, dc]);
},
keyDown: function(ev){
dc.keyDown.apply(this, [ev, dc]);
},
keyPress: function(ev){
dc.keyPress.apply(this, [ev, dc]);
},
keyUp: function(ev){
dc.keyUp.apply(this, [ev, dc]);
},
error: function(ev){
dc.error.apply(this, [ev, dc]);
},
focusIn: function(ev){
dc.focusIn.apply(this, [ev, dc]);
},
focusOut: function(ev){
dc.focusOut.apply(this, [ev, dc]);
}
},
toBind = {};
for (var ev in events){
if (dc[ev] && typeof dc[ev] === 'function')
toBind[ev.toLowerCase()] = events[ev];
}
$A.bind(dc.accDCObj, toBind);
if (!dc.ranJSOnceBefore){
dc.ranJSOnceBefore = true;
if (dc.reverseJSOrder){
dc.runOnceBefore.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runOnceBefore) dc.fn.proto.runOnceBefore.apply(dc, [dc]);
if ($A.fn.globalDC.runOnceBefore) $A.fn.globalDC.runOnceBefore.apply(dc, [dc]);
}
dc.reverseJSOrderPass = true;
}
if (dc.runJSOnceBefore.length){
for (var j = 0; j < dc.runJSOnceBefore.length; j++) getScript(dc, dc.runJSOnceBefore[j]);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSOnceBefore && dc.fn.proto.runJSOnceBefore.length){
for (var j = 0; j < dc.fn.proto.runJSOnceBefore.length; j++) getScript(dc, dc.fn.proto.runJSOnceBefore[j]);
}
if ($A.fn.globalDC.runJSOnceBefore && $A.fn.globalDC.runJSOnceBefore.length){
for (var j = 0; j < $A.fn.globalDC.runJSOnceBefore.length; j++) getScript(dc, $A.fn.globalDC.runJSOnceBefore[j]);
}
}
if (!dc.reverseJSOrder && !dc.reverseJSOrderPass){
dc.runOnceBefore.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runOnceBefore) dc.fn.proto.runOnceBefore.apply(dc, [dc]);
if ($A.fn.globalDC.runOnceBefore) $A.fn.globalDC.runOnceBefore.apply(dc, [dc]);
}
} else dc.reverseJSOrderPass = false;
}
if (dc.reverseJSOrder){
dc.runBefore.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runBefore) dc.fn.proto.runBefore.apply(dc, [dc]);
if ($A.fn.globalDC.runBefore) $A.fn.globalDC.runBefore.apply(dc, [dc]);
}
dc.reverseJSOrderPass = true;
}
if (dc.runJSBefore.length){
for (var j = 0; j < dc.runJSBefore.length; j++) getScript(dc, dc.runJSBefore[j]);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSBefore && dc.fn.proto.runJSBefore.length){
for (var j = 0; j < dc.fn.proto.runJSBefore.length; j++) getScript(dc, dc.fn.proto.runJSBefore[j]);
}
if ($A.fn.globalDC.runJSBefore && $A.fn.globalDC.runJSBefore.length){
for (var j = 0; j < $A.fn.globalDC.runJSBefore.length; j++) getScript(dc, $A.fn.globalDC.runJSBefore[j]);
}
}
if (!dc.reverseJSOrder && !dc.reverseJSOrderPass){
dc.runBefore.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runBefore) dc.fn.proto.runBefore.apply(dc, [dc]);
if ($A.fn.globalDC.runBefore) $A.fn.globalDC.runBefore.apply(dc, [dc]);
}
} else dc.reverseJSOrderPass = false;
if (dc.cancel){
dc.cancel = dc.loading = false;
return dc;
}
dc.loading = true;
if (dc.showHiddenBounds){
setAttr(dc.fn.sraStart, {
id: 'h' + now(),
role: 'heading',
'aria-level': dc.ariaLevel
});
pL(dc.fn.sraStart).append('<span>' + dc.role + '&nbsp;' + dc.accStart + '</span>');
if (dc.showHiddenClose){
dc.fn.closeLink = createEl('a', {
id: dc.closeId,
href: '#'
}, dc.sraCSS, dc.closeClassName);
dc.fn.closeLink.innerHTML = dc.accClose;
insertBefore(dc.fn.sraEnd, dc.fn.closeLink);
if (dc.displayHiddenClose)
$A.bind(dc.fn.closeLink, {
focus: function(){
sraCSSClear(this);
},
blur: function(){
css(this, dc.sraCSS);
}
});
else setAttr(dc.fn.closeLink, 'tabindex', '-1');
}
pL(dc.fn.sraEnd).append('<span>' + dc.role + '&nbsp;' + dc.accEnd + '</span>');
}
if (dc.forceFocus){
setAttr(dc.fn.sraStart, 'tabindex', -1);
css(dc.fn.sraStart, 'outline', 'none');
}
if (dc.displayInline)
css([dc.accDCObj, dc.containerDiv], 'display', 'inline');
switch (dc.mode){
case 1 :
pL(dc.containerDiv).load(dc.source, dc.hLoadData, function(responseText, textStatus, XMLHttpRequest){
dc.hLoad(responseText, textStatus, XMLHttpRequest, dc);
parseRemaining(dc);
});
break;
case 2 :
dc.request = pL.get(dc.source, dc.hGetData, function(source, textStatus){
dc.hGet(source, textStatus, dc);
dc.hSource(dc.content);
parseRemaining(dc);
}, dc.hGetType);
break;
case 3 :
dc.request = pL.getJSON(dc.source, dc.hJSONData, function(source, textStatus){
dc.hJSON(source, textStatus, dc);
dc.hSource(dc.content);
parseRemaining(dc);
});
break;
case 4 :
dc.request = pL.getScript(dc.source, function(source, textStatus){
dc.hScript(source, textStatus, dc);
dc.hSource(dc.content);
parseRemaining(dc);
});
break;
case 5 :
dc.request = pL.post(dc.source, dc.hPostData, function(source, textStatus){
dc.hPost(source, textStatus, dc);
dc.hSource(dc.content);
parseRemaining(dc);
}, dc.hPostType);
break;
case 6 :
dc.request = pL.ajax(dc.ajaxOptions);
break;
default :
dc.hSource(dc.source);
parseRemaining(dc);
}
return wheel[dc.indexVal] = dc;
},

parseRemaining = function(dc){
var dc = wheel[dc.indexVal];
dc.runDuring.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runDuring) dc.fn.proto.runDuring.apply(dc, [dc]);
if ($A.fn.globalDC.runDuring) $A.fn.globalDC.runDuring.apply(dc, [dc]);
}
if (dc.cancel){
dc.cancel = dc.loading = false;
return dc;
}
for (var w = 0; w < wheel.length; w++){
var wl = wheel[w];
if (wl.loaded && !wl.allowMultiple){
wl.fn.bypass = true;
dc.close(wl);
wl.fn.bypass = false;
}
}
css(dc.accDCObj, dc.cssObj);
if (dc.autoFix) setAutoFix(dc);
if (dc.fn.morph && dc.fn.morphObj){
pL(dc.fn.morphObj).after(dc.accDCObj);
pL(dc.containerDiv).append(dc.fn.morphObj);
dc.fn.morph = false;
} else if (dc.isStatic){
if (dc.append)
pL(dc.isStatic).append(dc.accDCObj);
else if (dc.prepend){
if (!firstChild(pL(dc.isStatic).get(0)))
pL(dc.isStatic).append(dc.accDCObj);
else
insertBefore(firstChild(pL(dc.isStatic).get(0)), dc.accDCObj);
}else
pL(dc.isStatic).html(dc.accDCObj);
}else if (dc.targetObj && (!dc.returnFocus || dc.triggerObj))
pL(dc.targetObj).after(dc.accDCObj);
else if (dc.triggerObj)
pL(dc.triggerObj).after(dc.accDCObj);
else if ($A.fn.debug)
alert('Error: The dc.triggerObj property must be programatically set if no trigger or targetObj is specified during setup. View the Traversal and Manipulation section in the WhatSock.com Core API documentation for additional details.');
if (dc.importCSS){
dc.fn.cssLink = createEl('link', {
id: dc.fn.importCSSId,
rel: 'stylesheet',
type: 'text/css',
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
if (dc.isTab || dc.isToggle)
changeTabs(dc);
$A.query('.' + dc.closeClassName, dc.accDCObj, function(){
$A.bind(this, 'click', function(ev){
dc.close();
ev.preventDefault();
});
});
$A.bind(dc.fn.closeLink, 'focus', function(ev){
dc.tabOut(ev, dc);
});
if (dc.timeoutVal)
dc.timer = setTimeout(function(){
dc.timeout(dc);
}, dc.timeoutVal);
if (dc.dropTarget && dc.accDD.on){
dc.accDD.dropTargets = [];
dc.accDD.dropAnchors = [];
$A.query(dc.dropTarget, function(){
dc.accDD.dropAnchors.push(this);
dc.accDD.dropTargets.push(this);
});
}
if (!dc.ranJSOnceAfter){
dc.ranJSOnceAfter = true;
if (dc.reverseJSOrder){
dc.runOnceAfter.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runOnceAfter) dc.fn.proto.runOnceAfter.apply(dc, [dc]);
if ($A.fn.globalDC.runOnceAfter) $A.fn.globalDC.runOnceAfter.apply(dc, [dc]);
}
dc.reverseJSOrderPass = true;
}
if (dc.runJSOnceAfter.length){
for (var j = 0; j < dc.runJSOnceAfter.length; j++) getScript(dc, dc.runJSOnceAfter[j]);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSOnceAfter && dc.fn.proto.runJSOnceAfter.length){
for (var j = 0; j < dc.fn.proto.runJSOnceAfter.length; j++) getScript(dc, dc.fn.proto.runJSOnceAfter[j]);
}
if ($A.fn.globalDC.runJSOnceAfter && $A.fn.globalDC.runJSOnceAfter.length){
for (var j = 0; j < $A.fn.globalDC.runJSOnceAfter.length; j++) getScript(dc, $A.fn.globalDC.runJSOnceAfter[j]);
}
}
if (!dc.reverseJSOrder && !dc.reverseJSOrderPass){
dc.runOnceAfter.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runOnceAfter) dc.fn.proto.runOnceAfter.apply(dc, [dc]);
if ($A.fn.globalDC.runOnceAfter) $A.fn.globalDC.runOnceAfter.apply(dc, [dc]);
}
} else
dc.reverseJSOrderPass = false;
}
if (dc.reverseJSOrder){
dc.runAfter.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runAfter) dc.fn.proto.runAfter.apply(dc, [dc]);
if ($A.fn.globalDC.runAfter) $A.fn.globalDC.runAfter.apply(dc, [dc]);
}
dc.reverseJSOrderPass = true;
}
if (dc.runJSAfter.length){
for (var j = 0; j < dc.runJSAfter.length; j++) getScript(dc, dc.runJSAfter[j]);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSAfter && dc.fn.proto.runJSAfter.length){
for (var j = 0; j < dc.fn.proto.runJSAfter.length; j++) getScript(dc, dc.fn.proto.runJSAfter[j]);
}
if ($A.fn.globalDC.runJSAfter && $A.fn.globalDC.runJSAfter.length){
for (var j = 0; j < $A.fn.globalDC.runJSAfter.length; j++) getScript(dc, $A.fn.globalDC.runJSAfter[j]);
}
}
if (!dc.reverseJSOrder && !dc.reverseJSOrderPass){
dc.runAfter.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runAfter) dc.fn.proto.runAfter.apply(dc, [dc]);
if ($A.fn.globalDC.runAfter) $A.fn.globalDC.runAfter.apply(dc, [dc]);
}
} else
dc.reverseJSOrderPass = false;
if ((parseInt(dc.shadow.horizontal) || parseInt(dc.shadow.vertical)) && dc.shadow.color)
setShadow(dc);
if (dc.autoFix && (!dc.isDraggable || !dc.drag.persist || !dc.drag.x || !dc.drag.y))
sizeAutoFix(dc);
if (dc.isDraggable)
setDrag(dc);
if (forceFocus)
$A.setFocus(dc.fn.sraStart);
if ($A.fn.debug && !getEl(dc.containerId))
alert('Error: The Automatic Accessibility Framework has been overwritten within the AccDC Dynamic Content Object with id=' + dc.id + '. New content should be added in a proper manner using the "source", "containerDiv", or "content" properties to ensure accessibility. View the Setup, Traversal and Manipulation, and Mode Handlers sections in the WhatSock.com Core API documentation for additional details.');
if (dc.announce) $A.announce(dc.containerDiv);
if ($A.bootstrap) $A.bootstrap(dc.containerDiv);
return wheel[dc.indexVal] = dc;
},

closeAccDCObj = function(dc){
var dc = wheel[dc.indexVal];
dc.runBeforeClose.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runBeforeClose) dc.fn.proto.runBeforeClose.apply(dc, [dc]);
if ($A.fn.globalDC.runBeforeClose) $A.fn.globalDC.runBeforeClose.apply(dc, [dc]);
}
if (!dc.loaded || dc.lock) return dc;
dc.closing = true;
if (dc.isDraggable)
unsetDrag(dc);
pL(dc.accDCObj).remove();
if (dc.fn.containsFocus && !dc.fn.bypass)
dc.fn.toggleFocus = true;
dc.fn.override = true;
if (dc.returnFocus && dc.triggerObj && !dc.fn.bypass){
if (dc.triggerObj.nodeName.toLowerCase() == 'form'){
var s = pL(dc.triggerObj).find('*[type="submit"]').get(0);
if (s && s.focus) s.focus();
} else {
if (dc.triggerObj.focus) dc.triggerObj.focus();
else $A.setFocus(dc.triggerObj);
}
}
dc.loaded = dc.fn.override = false;
if (dc.isTab || dc.isToggle)
changeTabs(dc, true);
dc.fn.triggerObj = dc.triggerObj;
dc.closing = false;
dc.runAfterClose.apply(dc, [dc]);
if (dc.allowCascade){
if (dc.fn.proto.runAfterClose) dc.fn.proto.runAfterClose.apply(dc, [dc]);
if ($A.fn.globalDC.runAfterClose) $A.fn.globalDC.runAfterClose.apply(dc, [dc]);
}
return wheel[dc.indexVal] = dc;
},

unsetTrigger = function(dc){
var dc = wheel[dc.indexVal];
$A.query(dc.fn.triggerB, function(){
$A.unbind(this, dc.fn.bindB);
if (dc.isTab || dc.isToggle)
pL(this).data('sra').remove();
});
dc.fn.triggerB = dc.fn.bindB = '';
return wheel[dc.indexVal] = dc;
},

setTrigger = function(dc){
var dc = wheel[dc.indexVal];
unsetTrigger(dc);
return wheel[dc.indexVal] = setBindings(dc);
},

setAutoFix = function(dc){
var dc = wheel[dc.indexVal];
if (!dc.loading && !dc.loaded) return dc;
var cs = {
position: 'fixed',
right: '',
bottom: '',
top: '',
left: ''
};
switch (dc.autoFix){
case 1 :
cs.top = 0;
cs.left = '40%';
break;
case 2 :
cs.top = 0;
cs.right = 0;
break;
case 3 :
cs.top = '40%';
cs.right = 0;
break;
case 4 :
cs.bottom = 0;
cs.right = 0;
break;
case 5 :
cs.bottom = 0;
cs.left = '40%';
break;
case 6 :
cs.bottom = 0;
cs.left = 0;
break;
case 7 :
cs.top = '40%';
cs.left = 0;
break;
case 8 :
cs.top = 0;
cs.left = 0;
break;
case 9 :
cs.top = '40%';
cs.left = '40%';
default :
cs = dc.cssObj;
}
css(dc.accDCObj, cs);
return wheel[dc.indexVal] = dc;
},

sizeAutoFix = function(dc){
var dc = wheel[dc.indexVal];
if (!dc.loading && !dc.loaded) return dc;
var win = getWin();
var bodyW = win.width,
bodyH = win.height,
aW = xWidth(dc.accDCObj),
aH = xHeight(dc.accDCObj);
if (bodyW > aW) var npw = parseInt(aW / bodyW * 100 / 2);
else var npw = 50;
if (bodyH > aH) var nph = parseInt(aH / bodyH * 100 / 2);
else var nph = 50;
switch (dc.autoFix){
case 1 :
case 5 :
css(dc.accDCObj, 'left', 50 - npw + '%');
break;
case 3 :
case 7 :
css(dc.accDCObj, 'top', 50 - nph + '%');
break;
case 9 :
css(dc.accDCObj, {
left: 50 - npw + '%',
top: 50 - nph + '%'
});
}
if (dc.offsetTop < 0 || dc.offsetTop > 0 || dc.offsetLeft < 0 || dc.offsetLeft > 0){
var cs = xOffset(dc.accDCObj);
// BG:3.4:11/15/2017
cs.top += dc.offsetTop;
cs.left += dc.offsetLeft;
css(dc.accDCObj, cs);
}
return wheel[dc.indexVal] = dc;
},

setShadow = function(dc){
var dc = wheel[dc.indexVal];
css(dc.accDCObj, {
'box-shadow': dc.shadow.horizontal + ' ' + dc.shadow.vertical + ' ' + dc.shadow.blur + ' ' + dc.shadow.color,
'-webkit-box-shadow': dc.shadow.horizontal + ' ' + dc.shadow.vertical + ' ' + dc.shadow.blur + ' ' + dc.shadow.color,
'-moz-box-shadow': dc.shadow.horizontal + ' ' + dc.shadow.vertical + ' ' + dc.shadow.blur + ' ' + dc.shadow.color
});
return wheel[dc.indexVal] = dc;
},

setDrag = function(dc){
if ($A.setDragAndDrop && typeof $A.setDragAndDrop == 'function' && $A.setDragAndDrop.setDrag && typeof $A.setDragAndDrop.setDrag == 'function')
$A.setDragAndDrop.setDrag.apply(this, [dc, wheel, pL]);
},

unsetDrag = function(dc, uDrop){
if ($A.setDragAndDrop && typeof $A.setDragAndDrop == 'function' && $A.setDragAndDrop.unsetDrag && typeof $A.setDragAndDrop.unsetDrag == 'function')
$A.setDragAndDrop.unsetDrag.apply(this, [dc, uDrop, wheel, pL]);
},

autoStart = [],

setBindings = function(dc){
dc.fn.toggleFocus = dc.fn.containsFocus = false;
dc.bind = dc.binders || dc.bind;
if (inArray('focus', dc.bind.split(' ')) >= 0) dc.fn.containsFocus = true;
dc.fn.triggerB = dc.trigger;
dc.fn.bindB = dc.bind;
$A.query(dc.trigger, function(){
if (this.nodeName.toLowerCase() == 'a' && !this.href) setAttr(this, 'href', '#');
pL(this).bind(dc.bind, function(ev){
dc.triggerObj = this;
dc.open();
ev.preventDefault();
});
if ((dc.isTab && (dc.tabRole || dc.tabState)) || (dc.isToggle && (dc.toggleRole || dc.toggleState))){
var ss = createEl('span', null, sraCSS);
pL(this).append(ss);
pL(this).data('sra', ss);
dc.fn.sraCSSObj = ss;
}
if (dc.isTab)
pL(ss).html(dc.loaded ? ('<span>&nbsp;' + dc.tabRole + '&nbsp;' + dc.tabState + '</span>') : ('<span>&nbsp;' + dc.tabRole + '</span>'));
else if (dc.isToggle)
pL(ss).html(dc.loaded ? ('<span>&nbsp;' + dc.toggleRole + '&nbsp;' + dc.toggleState + '</span>') : ('<span>&nbsp;' + dc.toggleRole + '</span>'));
});
return dc;
},

AccDCInit = function(dc){
dc = setBindings(dc);
dc.sraCSS = sraCSS;
dc.sraCSSClear = sraCSSClear;
var f = function(){};
f.prototype = dc;
return window[(window.AccDCNamespace ? window.AccDCNamespace : '$A')].reg[dc.id] = $A.reg[dc.id] = new f();
},

svs = ['runJSOnceBefore', 'runOnceBefore', 'runJSBefore', 'runBefore', 'runDuring', 'runJSOnceAfter', 'runOnceAfter', 'runJSAfter', 'runAfter', 'runBeforeClose', 'runAfterClose'];

for (var a = 0; a < accDCObjects.length; a++){
var dc = {
id: '',

fn: {},

trigger: '',
setTrigger: function(dc){
var dc = dc || this;
if (!dc.trigger || !dc.bind){
if ($A.fn.debug)
alert('Error: Both of the dc.trigger and dc.bind properties must be set before this function can be used. View the Setup section in the WhatSock.com Core API documentation for additional details.');
return dc;
}
return setTrigger(dc);
},
unsetTrigger: function(dc){
var dc = dc || this;
if (!dc.fn.triggerB || !dc.fn.bindB) return dc;
return unsetTrigger(dc);
},
targetObj: null,

role: '',
accStart: 'Start',
accEnd: 'End',
accClose: 'Close',
ariaLevel: 2,
showHiddenClose: true,
displayHiddenClose: true,
showHiddenBounds: true,
source: '',
bind: '',
displayInline: false,

allowCascade: false,
reverseJSOrder: false,
runJSOnceBefore: [ ],
runOnceBefore: function(dc){ },
runJSBefore: [ ],
runBefore: function(dc){ },
runDuring: function(dc){ },
runJSOnceAfter: [ ],
runOnceAfter: function(dc){ },
runJSAfter: [ ],
runAfter: function(dc){ },
runBeforeClose: function(dc){ },
runAfterClose: function(dc){ },

allowMultiple: false,
allowReopen: false,
isToggle: false,
toggleRole: '',
toggleState: '',
forceFocus: false,
returnFocus: true,
isStatic: '',
prepend: false,
append: false,
isTab: false,
tabRole: 'Tab',
tabState: 'Selected',
autoStart: false,
announce: false,
lock: false,
mode: 0,

hSource: function(source, dc){
var dc = dc || this;
pL(dc.containerDiv).html(source);
return dc;
},
hLoadData: '',
hLoad: function(responseText, textStatus, XMLHttpRequest, dc){ },
hGetData: { },
hGetType: '',
hGet: function(data, textStatus, dc){ },
hJSONData: { },
hJSON: function(data, textStatus, dc){ },
hScript: function(data, textStatus, dc){ },
hPostData: { },
hPostType: '',
hPost: function(data, textStatus, dc){ },
ajaxOptions: {
beforeSend: function(XMLHttpRequest){
dc.hBeforeSend(this, XMLHttpRequest, dc);
},
success: function(source, textStatus, XMLHttpRequest){
dc.hSuccess(this, source, textStatus, XMLHttpRequest, dc);
dc.hSource(dc.content);
parseRemaining(dc);
},
complete: function(XMLHttpRequest, textStatus){
dc.hComplete(this, XMLHttpRequest, textStatus, dc);
},
error: function (XMLHttpRequest, textStatus, errorThrown){
dc.hError(this, XMLHttpRequest, textStatus, errorThrown, dc);
}
},
hBeforeSend: function(options, XMLHttpRequest, dc){ },
hSuccess: function(options, data, textStatus, XMLHttpRequest, dc){
dc.content = data;
},
hComplete: function(options, XMLHttpRequest, textStatus, dc){ },
hError: function(options, XMLHttpRequest, textStatus, errorThrown, dc){ },

open: function(dc){
var dc = dc || this;
if (dc.fn.toggleFocus)
dc.fn.toggleFocus = false;
else
loadAccDCObj(dc);
return dc;
},
close: function(dc){
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
onDragStart: function(ev, dd, dc){ },
onDragEnd: function(ev, dd, dc){ },
onDrag: function(ev, dd, dc){ },
dropTarget: null,
dropInit: null,
drop: {},
onDropStart: function(ev, dd, dc){ },
onDrop: function(ev, dd, dc){ },
onDropEnd: function(ev, dd, dc){ },
setDrag: function(dc){
var dc = dc || this;
return setDrag(dc);
},
unsetDrag: function(dc, uDrop){
if (dc && typeof dc === 'boolean'){
uDrop = dc;
dc = this;
} else var dc = dc || this;
unsetDrag(dc, uDrop);
return dc;
},

accDD: {
on: false,
dragText: 'Move',
toText: 'to',
dropTargets: [],
// Must match the accepted values for aria-dropeffect
dropEffect: 'move',
actionText: 'Dragging',
returnFocusTo: '',
isDragging: false,
dragClassName: '',
dragLinkStyle: {},
duration: 500,
fireDrag: function(ev, dc){
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
startX: os.left + (os.width / 2),
startY: os.top + (os.height / 2),
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
fireDrop: function(ev, dc){
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
function update(){
// BG:3.4:11/15/2017
var os = xOffset(dc.accDD.dragDD.drag);
dc.accDD.dragDD.offsetY = os.top;
dc.accDD.dragDD.offsetX = os.left;
}
transition(dc.accDD.dragDD.drag, {
top: dc.accDD.dropDD.offsetY,
left: dc.accDD.dropDD.offsetX
}, {
duration: dc.accDD.duration,
step: function(){
update();
dc.onDrag.apply(dc.accDD.dragDD.drag, [ev, dc.accDD.dragDD, dc]);
},
complete: function(){
update();
if (dc.accDD.dragDD.originalY <= dc.accDD.dragDD.offsetY)
dc.accDD.dragDD.deltaY = dc.accDD.dropDD.deltaY = dc.accDD.dragDD.originalY - dc.accDD.dragDD.offsetY;
else if (dc.accDD.dragDD.originalY >= dc.accDD.dragDD.offsetY)
dc.accDD.dragDD.deltaY = dc.accDD.dropDD.deltaY = 0 - (dc.accDD.dragDD.offsetY - dc.accDD.dragDD.originalY);
if (dc.accDD.dragDD.originalX <= dc.accDD.dragDD.offsetX)
dc.accDD.dragDD.deltaX = dc.accDD.dropDD.deltaX = dc.accDD.dragDD.originalX - dc.accDD.dragDD.offsetX;
else if (dc.accDD.dragDD.originalX >= dc.accDD.dragDD.offsetX)
dc.accDD.dragDD.deltaX = dc.accDD.dropDD.deltaX = 0 - (dc.accDD.dragDD.offsetX - dc.accDD.dragDD.originalX);

var rft = dc.accDD.returnFocusTo;

dc.onDropStart.apply(that, [ev, dc.accDD.dropDD, dc]);
dc.onDrop.apply(that, [ev, dc.accDD.dropDD, dc]);
dc.onDropEnd.apply(that, [ev, dc.accDD.dropDD, dc]);
dc.onDragEnd.apply(dc.accDD.dragDD.drag, [ev, dc.accDD.dragDD, dc]);

$A.setFocus((rft.nodeType === 1 ?
rft :
pL(rft).get(0)) || dc.accDCObj);

dc.accDD.isDragging = false;
setAttr(dc.accDCObj, 'aria-grabbed', 'false');
}
});
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

tabOut: function(ev, dc){ },
timeoutVal: 0,
timeout: function(dc){ },

className: '',
closeClassName: 'accDCCloseCls',
cssObj: { },
importCSS: '',
css: function(prop, val, mergeCSS, dc){
var dc = dc || this;
if (typeof prop === 'string' && val){
if (mergeCSS)
dc.cssObj[prop] = val;
css(dc.accDCObj, prop, val);
return dc;
} else if (prop && typeof prop === 'object'){
if (val && typeof val === 'boolean')
pL.extend(dc.cssObj, prop);
css(dc.accDCObj, prop);
return dc;
} else if (prop && typeof prop === 'string')
return css(dc.accDCObj, prop);
},

children: [],
parent: null,

autoPosition: 0,
offsetTop: 0,
offsetLeft: 0,
offsetParent: null,
posAnchor: null,
setPosition: function(obj, posVal, save, dc){
if (typeof obj === 'number'){
dc = save;
save = posVal;
posVal = obj;
}
var dc = dc || this;
if (save){
dc.posAnchor = obj || dc.posAnchor;
dc.autoPosition = posVal || dc.autoPosition;
}
calcPosition(dc, obj, posVal);
return dc;
},

applyFix: function(val, dc){
var dc = dc || this;
if (val)
dc.autoFix = val;
setAutoFix(dc);
if (dc.autoFix > 0)
sizeAutoFix(dc);
return dc;
},

shadow: {
horizontal: '0px',
vertical: '0px',
blur: '0px',
color: ''
},
setShadow: function(dc, shadow){
if (arguments.length === 1 && !('id' in dc)){
shadow = dc;
dc = this;
}
if (shadow)
pL.extend(dc.shadow, shadow);
return setShadow(dc);
},

AccDCInit: function(){
return this;
}

},

aO = accDCObjects[a],
gImport = gImport || {},
gO = {},
iO = {};

if (aO.mode == 6) var ajaxOptions = dc.ajaxOptions;

if (typeof aO.allowCascade !== 'boolean')
aO.allowCascade = gImport.allowCascade;
if (typeof aO.allowCascade !== 'boolean')
aO.allowCascade = $A.fn.globalDC.allowCascade || dc.allowCascade;

if (aO.allowCascade){
for (var s = 0; s < svs.length; s++){
gO[svs[s]] = $A.fn.globalDC[svs[s]];
iO[svs[s]] = gImport[svs[s]];
}
}

if (!pL.isEmptyObject($A.fn.globalDC)) pL.extend(true, dc, $A.fn.globalDC);

if (!pL.isEmptyObject(gImport)) pL.extend(true, dc, gImport);

pL.extend(true, dc, aO);

if (aO.mode == 6 && ajaxOptions) pL.extend(dc.ajaxOptions, ajaxOptions);

if (dc.allowCascade){
for (var s = 0; s < svs.length; s++){
$A.fn.globalDC[svs[s]] = gO[svs[s]];
}
dc.fn.proto = iO;
}

if (dc.id && dc.role){
ids.push(dc.id);
if (dc.autoStart) autoStart.push(dc.id);
dc.indexVal = wheel.length;
wheel[dc.indexVal] = AccDCInit(dc);

if (parentDC){
var chk = -1,
p = $A.reg[parentDC.id],
c = $A.reg[wheel[dc.indexVal].id];
for (var i = 0; i < p.children.length; i++){
if (c.id === p.children[i].id)
chk = i;
}
if (chk >= 0)
p.children.slice(chk, 1, c);
else
p.children.push(c);
c.parent = p;
var t = c;
while(t.parent) t = t.parent;
c.top = t;
} else
wheel[dc.indexVal].top = wheel[dc.indexVal];

} else if ($A.fn.debug)
alert('Error: To ensure both proper functionality and accessibility, every AccDC Dynamic Content Object must have a unique ID and an informative ROLE. View the Setup and Automatic Accessibility Framework sections in the WhatSock.com Core API documentation for additional details.');

}

for (var a = 0; a < wheel.length; a++)
wheel[a].siblings = wheel;

for (var s = 0; s < autoStart.length; s++){
var dc = $A.reg[autoStart[s]];
var t = pL(dc.trigger).get(0);
dc.triggerObj = t ? t : null;
dc.open();
}

};

if (window.InitAccDC && window.InitAccDC.length){
pL.ajaxSetup({async: false});
for (var i = 0; i < window.InitAccDC.length; i++)
$A.getScript(window.InitAccDC[i]);
pL.ajaxSetup({async: true});
}

})($L);
})(window);