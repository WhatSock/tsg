/*!
AccDC API - 3.0 for Dojo (10/24/2013)
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/
define("dojo/acc.dc.api", ["./query!css3", "./on", "./ready", "./request", "./html", "./dom-construct", "./request/script"],
function(dojoQuery, dojoOn, dojoReady, dojoRequest, dojoHtml, dojoConst, dojoScript, undefined){

var accDCVersion = '3.0 (10/24/2013)',
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
return n.innerText || n.textContent || '';
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
for (n in name){
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
padding: 0,
border: 0,
height: '1px',
width: '1px',
overflow: 'hidden',
zIndex: -1000
},

sraCSSClear = function(o){
css(o, {
position: '',
clip: 'auto',
padding: '',
height: '',
width: '',
overflow: '',
zIndex: ''
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

xOffset = function(c, p){
var o = {left:0, top:0},
p = p || document.body;
while (c && c != p) {
o.left += c.offsetLeft;
o.top += c.offsetTop;
c = c.offsetParent;
}
return o;
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

$L,

pL = (function() {
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
//readyBound = false,
//readyList = [],
//DOMContentLoaded,
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
// pL.fn.attr.call( selector, context, true );
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
return pL.find(selector);
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
dojoReady(selector);
return this;
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

slice: function() {
return this.pushStack( slice.apply( this, arguments ),
"slice", slice.call(arguments).join(",") );
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
},

// See test/unit/core.js for details concerning isFunction.
// Since version 1.3, DOM methods and functions like alert
// aren't supported. They return false on IE (#2968).
isFunction: function( obj ) {
return pL.type(obj) === "function";
},

isArray: Array.isArray || isArray,

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

rootpL = pL(document);

return (accDC.pL = $L = pL);
})();

(function() {

var root = document.documentElement,
div = document.createElement("div");

div.style.display = "none";
var all = div.getElementsByTagName("*"),
a = div.getElementsByTagName("a")[0];

if ( !all || !all.length || !a ){
return;
}

pL.support = {
checkClone: false
};

div = document.createElement("div");
div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
var fragment = document.createDocumentFragment();
fragment.appendChild( div.firstChild );
// WebKit doesn't clone checked state correctly in fragments
pL.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

root = div = all = a = fragment = null;
})();

var
windowData = {},
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
if (!elem || !pL.acceptData( elem ) ) {
return;
}
elem = elem == window ?
windowData :
elem;
var isNode = elem && elem.nodeType,
id = isNode ? elem[ pL.expando ] : null,
cache = pL.cache,
thisCache;
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
if (!elem || !pL.acceptData( elem ) ) {
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
if ( isNode) {
try {
delete elem[ pL.expando ];
} catch(e){
if ( elem.removeAttribute )
elem.removeAttribute( pL.expando );
}
// Completely remove the data cache
delete cache[ id ];
} else {
for ( var n in elem ) {
delete elem[ n ];
}
}
}
},

// A method for determining if a DOM node can handle the data expando
acceptData: function( elem ) {
if ( elem && elem.nodeName ) {
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
var attr = this[0].attributes,
name;
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
// data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
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
// $this.triggerHandler( "setData" + parts[1] + "!", args );
pL.data( this, key, value );
// $this.triggerHandler( "changeData" + parts[1] + "!", args );
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

var
rnamespaces = /\.(.*)$/,
rescape = /[^\w\s.|`]/g,
fcleanup = function( nm ) {
return nm.replace(rescape, "\\$&");
},
focusCounts = { focusin: 0, focusout: 0 },
rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
rkeyEvent = /^key/,
rmouseEvent = /^(?:mouse|contextmenu)|click/,
hoverHack = function( events ) {
return pL.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
};

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
$A.bind(elem, type, eventHandle);
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
$A.unbind(elem, type, elemData.handle);
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
trigger: function( event, data, elem) {
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
guid: 1E8,
proxy: pL.proxy,
special: {}
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

(function(){

var Sizzle = function( selector, context, results, seed) {
results = results || [];
context = context || document;
if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
return results;
}
if ( !selector || typeof selector !== "string" ) {
return results;
}
dojoQuery(selector, context).forEach(function(o, i){
if (inArray(o, results) === -1)
results.push(o);
});
return results;
};

Sizzle.matchesSelector = function( node, expr ) {
return Sizzle(expr, null, null, [node] ).length > 0;
};

pL.find = Sizzle;
pL.unique = function(ret){
var c = ret, p = -1;
for (var i = 0; i < c.length; i++){
p = inArray(c[i], ret);
if (p !== -1)
ret.splice(p, 1);
}
return ret;
};

})();

var runtil = /Until$/,
rparentsprev = /^(?:parents|prevUntil|prevAll)/,
rmultiselector = /,/,
isSimple = /^.[^:#\[\.,]*$/,
slice = Array.prototype.slice;

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
pos = typeof selectors !== "string" ?
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
return elem && elem.nodeType === 1;
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
rnodeName = /<([\w:]+)/,
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

pL.fn.extend({
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
}
});

pL.extend({
cleanData: function( elems ) {
var data, id, cache = pL.cache,
special = pL.event.special;
for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
if ( elem.nodeName && pL.noData[elem.nodeName.toLowerCase()] ) {
continue;
}
id = elem[ pL.expando ];
if ( id ) {
data = cache[ id ];
// Dojo
$A.unbind(elem, '*');
if ( elem.removeAttribute ) {
elem.removeAttribute( pL.expando );
}
delete cache[ id ];
}
}
}
});

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
fragment = dojoConst.toDom(args[0], doc);
}
if ( cacheable ) {
pL.fragments[ args[0] ] = cacheresults ? fragment : 1;
}
return { fragment: fragment, cacheable: cacheable };
};

pL.fragments = {};

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
_load = pL.fn.load,
oldXhr = new window.XMLHttpRequest();

pL.fn.extend({

load: function( url, params, callback ) {
if ( typeof url !== "string" && _load){
return _load.apply( this, arguments );
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
success: function(data, status, xhr) {
var nData = null, frag = null;
if (selector){
selector = selector.replace(/^\s+|\s+$/g, '');
frag = document.createDocumentFragment();
dojoHtml.set(frag, data, {
cleanContent: true,
extractContent: true,
parseContent: false
});
nData = pL.find(selector, frag)[0];
if (!nData && frag.querySelectorAll)
nData = frag.querySelectorAll(selector)[0];
}
if (!nData) nData = data;
dojoHtml.set(self[0], nData, {
cleanContent: true,
extractContent: true,
parseContent: false
});
if ( callback )
callback.apply(self[0], [nData, status, xhr]);
frag = nData = data = null;
}
});
return this;
}

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

getScripts: function( urls, callback) {
if (!isArray(urls) || !urls.length || !urls[0]) return;
for (var i = 0; i < urls.length; i++)
pL.get(urls[i], null, callback, "script");
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
pL.dojoMod(pL.ajaxSettings);
},

ajaxSet: function( settings ) {
var s = pL.ajaxSettings;
pL.extend( s, settings );
pL.dojoMod(s);
return s;
},

ajaxSettings: {
url: location.href,
global: true,
type: "GET",
contentType: "application/x-www-form-urlencoded",
processData: true,
async: true,
accepts: {
xml: "application/xml, text/xml",
html: "text/html",
script: "text/javascript, application/javascript",
json: "application/json, text/javascript",
text: "text/plain",
_default: "*/*"
}
},

dojoModVals: {
// url: 'url',
// data: 'data',
cache: 'preventCache',
type: 'method',
// timeout: 'timeout',
dataType: 'handleAs',
// headers: 'headers',
async: 'sync'
},

dojoMod: function(o){
for (var n in o){
if (pL.dojoModVals[n]){
if (n == 'dataType' && o[n] == 'html')
o[pL.dojoModVals[n]] = 'text';
else if (n == 'cache' || n == 'async')
o[pL.dojoModVals[n]] = o[n] ? false : true;
else
o[pL.dojoModVals[n]] = o[n];
}
}
return o;
},

ajax: function( origSettings ) {
var s = pL.dojoMod(pL.extend(true, {}, pL.ajaxSettings, origSettings)),
xhr, jsonp, status, data, type = s.method.toUpperCase(), noContent = rnoContent.test(type);

s.context = origSettings && origSettings.context != null ? origSettings.context : s;

if (s.load && typeof s.load === 'function'){
s.success = s.load;
s.load = null;
}
if (s.always && typeof s.always === 'function'){
s.complete = s.always;
s.always = null;
}
if (s.fail && typeof s.fail === 'function'){
s.error = s.fail;
s.fail = null;
}

var isJS = (s.dataType == 'script' || s.dataType == 'jsonp');

if (isJS){
if (s.dataType == 'script'){
var notAsync = (('async' in s && !s.async) || ('sync' in s && s.sync)),
sLoad = function(){
var head = document.getElementsByTagName("head")[0] || document.documentElement;
var script = document.createElement("script");
if ( s.scriptCharset ) {
script.charset = s.scriptCharset;
}
script.src = s.url;
var done = false;
script.onload = script.onreadystatechange = function() {
if ( !done && (!this.readyState ||
this.readyState === "loaded" || this.readyState === "complete") ) {
done = true;
pL.handleSuccess( s, xhr, null, '');
pL.handleComplete( s, xhr, null, '');
// Handle memory leak in IE
script.onload = script.onreadystatechange = null;
if ( head && script.parentNode ) {
head.removeChild( script );
}
}
};
// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
// This arises when a base node is used (#2709 and #4378).
head.insertBefore( script, head.firstChild );
};
if (notAsync) sLoad();
else setTimeout(sLoad, 1);
return undefined;
} else{
xhr = dojoScript.get(s.url, {
checkString: s.checkString,
jsonp: s.jsonp,
query: s.query,
preventCache: s.preventCache,
timeout: s.timeout
})
.then(function(data){
// success/load
pL.handleSuccess(s, xhr, xhr && xhr.response && xhr.response.status ? xhr.response.status : null, data);
},
function(error){
// error/fail
pL.handleError(s, xhr, xhr && xhr.response && xhr.response.status ? xhr.response.status : null, error);
})
.always(function(dataOrError){
// complete
pL.handleComplete(s, xhr, xhr && xhr.response && xhr.response.status ? xhr.response.status : null, dataOrError);
});
}
} else{
xhr = dojoRequest(s.url, s)
.then(function(data){
// success/load
pL.handleSuccess(s, xhr, xhr && xhr.response && xhr.response.status ? xhr.response.status : null, data);
},
function(error){
// error/fail
pL.handleError(s, xhr, xhr && xhr.response && xhr.response.status ? xhr.response.status : null, error);
},
function(progEvent){
// progress event
pL.handleProgress(s, xhr, xhr && xhr.response && xhr.response.status ? xhr.response.status : null, progEvent);
})
.always(function(dataOrError){
// complete
pL.handleComplete(s, xhr, xhr && xhr.response && xhr.response.status ? xhr.response.status : null, dataOrError);
});
}

// return XMLHttpRequest to allow aborting the request etc.
return xhr;
}

});

pL.handleError = function( s, xhr, status, e ) {
if ( s.error ) {
s.error.call( s.context, xhr, status, e );
}
};

pL.handleProgress = function( s, xhr, status, progEvent){
if ( s.progress){
s.progress.call( s.context, xhr, status, progEvent);
}
};

pL.handleSuccess = function( s, xhr, status, data ) {
if ( s.success ) {
s.success.call( s.context, data, status, xhr );
}
};

pL.handleComplete = function( s, xhr, status ) {
if ( s.complete ) {
s.complete.call( s.context, xhr, status );
}
};

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
if (onReady)
pL(fn);
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
return window.String.prototype.announce.apply(str, [str, null, noRepeat, aggr]);
},

query: function(sel, con, call){
if (con && typeof con === 'function'){
call = con;
con = null;
}
var r = [];
if (isArray(sel)) r = sel;
else if (typeof sel !== 'string') r.push(sel);
else
pL.find(sel, con, r);
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
dojoConst.place(lc, a, 'after');
lc = lastChild(c);
}
}
if (r.loaded)
dojoConst.destroy(a);
// Force DOM refresh for IE8 and JAWS13
$A.announce('&nbsp;');
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
if (!o || o.nodeType !== 1) return;
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
if (isArray(source))
pL.getScripts(source, callback);
else
pL.getScript(source, callback);
if (disableAsync) pL.ajaxSetup({async: true});
};

$A.post = function(source, hPostData, callback, hPostType){
return pL.post(source, hPostData, callback, hPostType);
};

$A.ajax = function(ajaxOptions){
return pL.ajax(ajaxOptions);
};

var eventHashTS = 'events' + now();

$A.bind = function(ta2, e2, fn, data, kn){
if (!ta2) return;
var ta = ta2;
if (ta.pL && ta.pL == accDCVersion){
ta = ta.get();
}
if (e2 == 'load' && (ta == 'body' || ta == window || ta == document || ta == document.body || ta == dojo.body()))
pL(fn);
else {
if (typeof ta === 'string')
ta = pL.find(ta);
if (inArray(':', e2) === -1){
if (typeof e2 === 'string'){
var tmp = {};
tmp[e2] = null;
e2 = tmp;
}
for (var e in e2){
var evs = e.split(' '),
evsa = [];
for (var x = 0; x < evs.length; x++){
if (evs[x])
evsa.push(evs[x].split('.'));
}
pL(ta).each(function(i, o){
if (data && kn)
pL.data(o, kn, data);
var stor = pL.data(o, eventHashTS) || [];
for (var x = 0; x < evsa.length; x++){
var h = dojoOn(o, evsa[x][0], e2[e] || fn);
stor.push({
e: evsa[x][0],
h: h,
f: e2[e] || fn,
n: evsa[x][1] || ''
});
}
pL.data(o, eventHashTS, stor);
});
}
} else{
dojoQuery(ta).on(e2, fn);
}
}
return ta2;
};

$A.unbind = function(ta2, e, kn){
if (!ta2) return;
var ta = ta2;
if (ta.pL && ta.pL == accDCVersion){
ta = ta.get();
}
if (!e) e = '*';
if (typeof ta === 'string')
ta = pL.find(ta);
if (inArray(':', e) === -1){
var evs = e.split(' '),
evsa = [];
for (var x = 0; x < evs.length; x++){
if (evs[x])
evsa.push(evs[x].split('.'));
}
pL(ta).each(function(i, o){
if (kn && typeof kn === 'string')
pL.removeData(o, kn);
var stor = pL.data(o, eventHashTS) || [],
storI = stor.length;
for (var x = 0; x < evsa.length; x++){
if (stor.length){
for (var z = stor.length - 1; z >= 0; z--){
if (
(evsa[x][0] && evsa[x][0] == stor[z].e && !evsa[x][1] && (typeof kn !== 'function' || kn === stor[z].f)) ||
(evsa[x][0] && evsa[x][0] == stor[z].e && evsa[x][1] && evsa[x][1] == stor[z].n && (typeof kn !== 'function' || kn === stor[z].f)) ||
(!evsa[x][0] && evsa[x][1] && evsa[x][1] == stor[z].n && (typeof kn !== 'function' || kn === stor[z].f)) ||
(evsa[x][0] == '*' && (typeof kn !== 'function' || kn === stor[z].f))
){
stor[z].h.remove();
stor.splice(z, 1);
}
}
}
}
if (storI != stor.length)
pL.data(o, eventHashTS, stor);
});
}
return ta2;
};

$A.trigger = function(ta2, e){
if (!ta2) return;
var ta = ta2;
if (ta.pL && ta.pL == accDCVersion){
ta = ta.get();
}
if (inArray(':', e) === -1){
if (typeof ta === 'string')
ta = pL.find(ta);
var evs = e.split(' '),
evsa = [];
for (var x = 0; x < evs.length; x++){
if (evs[x])
evsa.push(evs[x].split('.'));
}
pL(ta).each(function(i, o){
for (var x = 0; x < evsa.length; x++){
dojoOn.emit(o, evsa[x][0], {
bubbles: true,
cancelable: true
}); 
}
});
}
return ta2;
};

window[(window.AccDCNamespace ? window.AccDCNamespace : '$A')] = $A;

var calcPosition = function(dc, objArg, posVal){
var obj = objArg || dc.posAnchor;
if (obj && typeof obj == 'string')
obj = pL.find(obj)[0];
else if (!obj) obj = dc.triggerObj;
if (!obj) return;
var
autoPosition = posVal || dc.autoPosition,
pos = { },
aPos = {
height: xHeight(dc.accDCObj),
width: xWidth(dc.accDCObj)
},
oPos = xOffset(obj);
var position = css(dc.accDCObj, 'position');
if (position == 'relative'){
var po = xOffset(obj.parentNode),
co = xOffset(obj);
oPos = {
top: co.top - po.top,
left: co.left - po.left
};
} else if (position == 'fixed' && css(obj, 'position') == 'fixed')
oPos.top = obj.offsetTop;
oPos.height = xHeight(obj);
oPos.width = xWidth(obj);
if (autoPosition == 1){
pos.left = oPos.left;
pos.top = oPos.top - aPos.height;
} else if (autoPosition == 2){
pos.left = oPos.left + oPos.width;
pos.top = oPos.top - aPos.height;
} else if (autoPosition == 3){
pos.left = oPos.left + oPos.width;
pos.top = oPos.top;
} else if (autoPosition == 4){
pos.left = oPos.left + oPos.width;
pos.top = oPos.top + oPos.height;
} else if (autoPosition == 5){
pos.left = oPos.left;
pos.top = oPos.top + oPos.height;
} else if (autoPosition == 6){
pos.left = oPos.left - aPos.width;
pos.top = oPos.top + oPos.height;
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
pos.left = oPos.left + oPos.width - aPos.width;
pos.top = oPos.top - aPos.height;
} else if (autoPosition == 11){
pos.left = oPos.left + oPos.width - aPos.width;
pos.top = oPos.top;
} else if (autoPosition == 12){
pos.left = oPos.left + oPos.width - aPos.width;
pos.top = oPos.top + oPos.height;
}
if (typeof dc.offsetTop === 'number' && (dc.offsetTop < 0 || dc.offsetTop > 0))
pos.top += dc.offsetTop;
if (typeof dc.offsetLeft === 'number' && (dc.offsetLeft < 0 || dc.offsetLeft > 0))
pos.left += dc.offsetLeft;
css(dc.accDCObj, pos);
};

window.String.prototype.announce = function announce(strm, loop, noRep, aggr){
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
announce(String.announce.alertMsgs[0], true, noRep, aggr);
}, timeLength);
}
return obj;
};

window.String.announce = {
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
}
};

$A.bind(window, 'load', function(){
if (!String.announce.placeHolder){
String.announce.placeHolder = createEl('span', {
'aria-live': 'polite'
}, sraCSS);
dojo.body().appendChild(String.announce.placeHolder);
String.announce.placeHolder2 = createEl('span', {
role: 'alert'
}, sraCSS);
dojo.body().appendChild(String.announce.placeHolder2);
}
});

pL.accDC = function(accDCObjects, gImport, parentDC){
var wheel = [],
ids = [],

getScript = function(dc, u, f){
pL.ajaxSetup({async: false});
$A.getScript(u, f);
pL.ajaxSetup({async: true});
},

changeTabs = function(dc, isClose){
var dc = wheel[dc.indexVal];
if (dc.isTab){
if (dc.tabState){
for (var w = 0; w < wheel.length; w++){
var wl = wheel[w];
if (wl.isTab){
var ss = pL.data(wl.triggerObj, 'sra');
if (ss){
if (wl.loaded)
dojoConst.place('<span>&nbsp;' + wl.tabRole + '&nbsp;' + wl.tabState + '</span>', ss, 'only');
else 
dojoConst.place('<span>&nbsp;' + wl.tabRole + '</span>', ss, 'only');
}
}
}
$A.query(dc.trigger, function(){
if (this != dc.triggerObj){
dojoConst.place('<span>&nbsp;' + dc.tabRole + '</span>', pL.data(this, 'sra'), 'only');
}
});
}
} else if (dc.isToggle){
if (dc.toggleState)
$A.query(dc.trigger, function(){
var ss = pL.data(this, 'sra');
if (ss){
if (!isClose)
dojoConst.place('<span>&nbsp;' + dc.toggleRole + '&nbsp;' + dc.toggleState + '</span>', ss, 'only');
else
dojoConst.place('<span>&nbsp;' + dc.toggleRole + '</span>', ss, 'only');
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
if (dc.className)
addClass(dc.accDCObj, dc.className);
dc.accDCObj.appendChild(dc.fn.sraStart);
dc.accDCObj.appendChild(dc.containerDiv);
dc.accDCObj.appendChild(dc.fn.sraEnd);
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
getScript(dc, dc.runJSOnceBefore);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSOnceBefore && dc.fn.proto.runJSOnceBefore.length){
getScript(dc, dc.fn.proto.runJSOnceBefore);
}
if ($A.fn.globalDC.runJSOnceBefore && $A.fn.globalDC.runJSOnceBefore.length){
getScript(dc, $A.fn.globalDC.runJSOnceBefore);
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
getScript(dc, dc.runJSBefore);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSBefore && dc.fn.proto.runJSBefore.length){
getScript(dc, dc.fn.proto.runJSBefore);
}
if ($A.fn.globalDC.runJSBefore && $A.fn.globalDC.runJSBefore.length){
getScript(dc, $A.fn.globalDC.runJSBefore);
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
dc.fn.sraStart.innerHTML = '<span>' + dc.role + '&nbsp;' + dc.accStart + '</span>';
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
dc.fn.sraEnd.innerHTML = '<span>' + dc.role + '&nbsp;' + dc.accEnd + '</span>';
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
dojoConst.place(dc.accDCObj, dc.fn.morphObj, 'after');
dojoConst.place(dc.fn.morphObj, dc.containerDiv, 'only');
dc.fn.morph = false;
} else if (dc.isStatic){
var node = null;
if (typeof dc.isStatic === 'string')
node = pL.find(dc.isStatic)[0];
else if (dc.isStatic.nodeType === 1)
node = dc.isStatic;
if (dc.append)
dojoConst.place(dc.accDCObj, node, 'last');
else if (dc.prepend)
dojoConst.place(dc.accDCObj, node, 'first');
else
dojoConst.place(dc.accDCObj, node, 'only');
}else if (dc.targetObj && (!dc.returnFocus || dc.triggerObj))
dojoConst.place(dc.accDCObj, dc.targetObj, 'after');
else if (dc.triggerObj)
dojoConst.place(dc.accDCObj, dc.triggerObj, 'after');
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
getScript(dc, dc.runJSOnceAfter);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSOnceAfter && dc.fn.proto.runJSOnceAfter.length){
getScript(dc, dc.fn.proto.runJSOnceAfter);
}
if ($A.fn.globalDC.runJSOnceAfter && $A.fn.globalDC.runJSOnceAfter.length){
getScript(dc, $A.fn.globalDC.runJSOnceAfter);
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
getScript(dc, dc.runJSAfter);
}
if (dc.allowCascade){
if (dc.fn.proto.runJSAfter && dc.fn.proto.runJSAfter.length){
getScript(dc, dc.fn.proto.runJSAfter);
}
if ($A.fn.globalDC.runJSAfter && $A.fn.globalDC.runJSAfter.length){
getScript(dc, $A.fn.globalDC.runJSAfter);
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
$A.announce('&nbsp;');
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
// Force DOM refresh for IE8 and JAWS13
$A.announce('&nbsp;');
if (dc.fn.containsFocus && !dc.fn.bypass)
dc.fn.toggleFocus = true;
dc.fn.override = true;
if (dc.returnFocus && dc.triggerObj && !dc.fn.bypass){
if (dc.triggerObj.nodeName.toLowerCase() == 'form'){
var s = pL.find('*[type="submit"]', dc.triggerObj)[0];
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
var sraO = pL.data(this, 'sra');
if ((dc.isTab || dc.isToggle) && sraO && sraO.parentNode)
sraO.parentNode.removeChild(sraO);
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
cs.top = dc.accDCObj.offsetTop;
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
var dc = wheel[dc.indexVal];
if ((!dc.loading && !dc.loaded) || dc.fn.isDragSet) return dc;
dc.fn.isDragSet = true;
var opts = {},
save = {};
if (dc.drag.handle){
if (typeof dc.drag.handle === 'string')
opts.handle = pL.find(dc.drag.handle)[0];
else if (dc.drag.handle.nodeType)
opts.handle = dc.drag.handle;
}
if (css(dc.accDCObj, 'position') == 'relative') opts.relative = true;
if (dc.drag.minDistance && dc.drag.minDistance > 0)
opts.distance = dc.drag.minDistance;
dc.drag.confineToN = null;
pL(dc.accDCObj)

.drag('init', function(ev, dd){
dc.fn.isDragging = true;
var position = css(this, 'position');
if (position == 'fixed')
css(this, {
top: dd.offsetY,
left: dd.offsetX,
right: '',
bottom: ''
});
else if (position == 'relative'){
var po = xOffset(this.parentNode),
co = xOffset(this);
css(this, {
top: co.top - po.top,
left: co.left - po.left
});
} else css(this, xOffset(this));
if (typeof dc.drag.confineTo === 'string')
dc.drag.confineToN = pL.find(dc.drag.confineTo)[0];
else if (dc.drag.confineTo && dc.drag.confineTo.nodeName)
dc.drag.confineToN = dc.drag.confineTo;
if (dc.drag.confineToN && dc.drag.confineToN.nodeName){
save.nFixed = false;
var npos = css(dc.drag.confineToN, 'position');
if (css(this, 'position') == 'relative'){
dc.drag.confineToN = this.parentNode;
dd.limit = {
top: 0,
left: 0
};
} else if (npos == 'fixed'){
save.nFixed = true;
dd.limit = {
top: dc.drag.confineToN.offsetTop,
left: xOffset(dc.drag.confineToN).left
};
} else
dd.limit = xOffset(dc.drag.confineToN);
dd.limit.bottom = dd.limit.top + xHeight(dc.drag.confineToN);
dd.limit.right = dd.limit.left + xWidth(dc.drag.confineToN);
}
if (dc.drag.init && typeof dc.drag.init === 'function')
dc.drag.init.apply(this, [ev, dd, dc]);
})

.drag('start', function(ev, dd){
dc.onDragStart.apply(this, [ev, dd, dc]);
})

.drag(function(ev, dd){
if (save.y != dd.offsetY || save.x != dd.offsetX){
var position = css(this, 'position');
if (dc.drag.override && typeof dc.drag.override === 'function')
dc.drag.override.apply(this, [ev, dd, dc]);

else if (dc.drag.confineToN && dc.drag.confineToN.nodeName){
var n = {
top: dd.offsetY,
left: dd.offsetX
},
height = xHeight(this),
width = xWidth(this);
// Correct for flush edges
if (n.top < dd.limit.top)
n.top = dd.limit.top;
if ((n.top + height) > dd.limit.bottom)
n.top = dd.limit.bottom;
if (n.left < dd.limit.left)
n.left = dd.limit.left;
if ((n.left + width) > dd.limit.right)
n.left = dd.limit.right;
// Set positioning
if (n.top >= dd.limit.top && (n.top + height) <= dd.limit.bottom)
xTop(this, n.top);
if (n.left >= dd.limit.left && (n.left + width) <= dd.limit.right)
xLeft(this, n.left);

} else if (typeof dc.drag.maxX === 'number' || typeof dc.drag.maxY === 'number'){
if (typeof dc.drag.maxX === 'number' && ((dd.originalX < dd.offsetX && (dd.offsetX - dd.originalX) <= dc.drag.maxX) || (dd.originalX > dd.offsetX && (dd.originalX - dd.offsetX) <= dc.drag.maxX)))
xLeft(this, dd.offsetX);
if (typeof dc.drag.maxY === 'number' && ((dd.originalY < dd.offsetY && (dd.offsetY - dd.originalY) <= dc.drag.maxY) || (dd.originalY > dd.offsetY && (dd.originalY - dd.offsetY) <= dc.drag.maxY)))
xTop(this, dd.offsetY);

}else{
xTop(this, dd.offsetY);
xLeft(this, dd.offsetX);
}

dc.onDrag.apply(this, [ev, dd, dc]);
save.y = dd.offsetY;
save.x = dd.offsetX;
}
})

.drag('end', function(ev, dd){
dc.fn.isDragging = false;
dc.drag.y = dd.offsetY;
dc.drag.x = dd.offsetX;
dc.onDragEnd.apply(this, [ev, dd, dc]);
}, opts);

if (dc.dropTarget){
pL(dc.dropTarget)

.drop('init', function(ev, dd){
if (dc.fn.isDragging){
if (dc.dropInit && typeof dc.dropInit === 'function')
dc.dropInit.apply(this, [ev, dd, dc]);
}
})

.drop('start', function(ev, dd){
if (dc.fn.isDragging)
dc.onDropStart.apply(this, [ev, dd, dc]);
})

.drop(function(ev, dd){
if (dc.fn.isDragging)
dc.onDrop.apply(this, [ev, dd, dc]);
})

.drop('end', function(ev, dd){
if (dc.fn.isDragging)
dc.onDropEnd.apply(this, [ev, dd, dc]);
});

pL.drop(dc.drop);
if (dc.accDD.on){
dc.accDD.dropLinks = [];
$A.query(dc.accDD.dropTargets, function(i, v){
dc.accDD.dropLinks.push(createEl('a', {
href: '#'
}, null, dc.accDD.dropClassName, createText(dc.accDD.dropText + ' ' + dc.role)));
});
var da = typeof dc.accDD.dropAnchor === 'string' ?
pL.find(dc.accDD.dropAnchor)[0] :
dc.accDD.dropAnchor.nodeType ?
dc.accDD.dropAnchor : null;
if (da) dc.accDD.dropAnchors[0] = da;
dc.accDD.dragLink = createEl('a', {
href: '#'
}, dc.sraCSS, dc.accDD.dragClassName, createText(dc.accDD.dragText + ' ' + dc.role));
dc.containerDiv.appendChild(dc.accDD.dragLink);
$A.bind(dc.accDD.dragLink, {
focus: function(ev){
css(sraCSSClear(this), {
position: 'relative',
zIndex: 1000
}, dc.accDD.dragLinkStyle);
},
blur: function(ev){
css(this, dc.sraCSS);
},
click: function(ev){
if (dc.accDD.isDragging){
dc.accDD.isDragging = false;
pL.each(dc.accDD.dropLinks, function(i, v){
if (v.parentNode)
v.parentNode.removeChild(v);
});
dc.accDD.dragLink.innerHTML = dc.accDD.dragText + '&nbsp;' + dc.role;
} else {
dc.accDD.isDragging = true;
pL.each(dc.accDD.dropLinks, function(i, v){
css(v, dc.sraCSS);
insertBefore(dc.accDD.dropAnchors[i], v);
$A.bind(v, {
focus: function(ev){
var pos = xOffset(dc.accDD.dropAnchors[i]),
rel = 'absolute';
var position = css(dc.accDD.dropAnchors[i], 'position');
if (position == 'fixed'){
pos.top = dc.accDD.dropAnchors[i].offsetTop;
rel = 'fixed';
} else if (position == 'relative'){
pos.top = xOffset(dc.accDD.dropAnchors[i]).top - xOffset(dc.accDD.dropAnchors[i].parentNode).top;
pos.left = xOffset(dc.accDD.dropAnchors[i]).left - xOffset(dc.accDD.dropAnchors[i].parentNode).left;
rel = 'relative';
}
css(sraCSSClear(this), {
position: rel,
zIndex: 1000,
top: pos.top,
left: pos.left
}, dc.accDD.dropLinkStyle);
},
blur: function(ev){
css(this, dc.sraCSS);
},
click: function(ev){
dc.accDD.isDragging = false;
dc.accDD.dragLink.innerHTML = dc.accDD.dragText + '&nbsp;' + dc.role;
pL.each(dc.accDD.dropLinks, function(e, g){
if (g.parentNode)
g.parentNode.removeChild(g);
});
dc.accDD.fireDrop.apply(dc.accDD.dropTargets[i], [ev, dc]);
$A.setFocus(dc.accDD.dropTargets[i]);
ev.preventDefault();
}
});
});
dc.accDD.dragLink.innerHTML = dc.accDD.actionText + '&nbsp;' + dc.role;
dc.accDD.fireDrag.apply(dc.accDCObj, [ev, dc]);
}
ev.preventDefault();
}
});
}
}
return wheel[dc.indexVal] = dc;
},

unsetDrag = function(dc, uDrop){
var dc = wheel[dc.indexVal];
if (!dc.closing && !dc.loaded) return dc;
$A.unbind(dc.drag.handle ? dc.drag.handle : dc.accDCObj, 'draginit dragstart dragend drag');
if (dc.dropTarget){
if (uDrop)
$A.unbind(dc.dropTarget, 'dropinit dropstart dropend drop');
if (dc.accDD.on){
pL.each(dc.accDD.dropLinks, function(i, v){
if (v.parentNode)
v.parentNode.removeChild(v);
});
if (dc.accDD.dragLink.parentNode)
dc.accDD.dragLink.parentNode.removeChild(dc.accDD.dragLink);
}
}
dc.fn.isDragSet = false;
return wheel[dc.indexVal] = dc;
},

autoStart = [],

setBindings = function(dc){
dc.fn.toggleFocus = dc.fn.containsFocus = false;
dc.bind = dc.binders || dc.bind;
if (inArray('focus', dc.bind.split(' ')) >= 0) dc.fn.containsFocus = true;
dc.fn.triggerB = dc.trigger;
dc.fn.bindB = dc.bind;
$A.query(dc.trigger, function(){
if (this && this.nodeType === 1){
if (this.nodeName.toLowerCase() == 'a' && !this.href) setAttr(this, 'href', '#');
$A.bind(this, dc.bind, function(ev){
dc.triggerObj = this;
dc.open();
ev.preventDefault();
});
if ((dc.isTab && (dc.tabRole || dc.tabState)) || (dc.isToggle && (dc.toggleRole || dc.toggleState))){
var ss = createEl('span', null, sraCSS);
this.appendChild(ss);
pL.data(this, 'sra', ss);
dc.fn.sraCSSObj = ss;
if (dc.isTab)
dojoConst.place((dc.loaded ? ('<span>&nbsp;' + dc.tabRole + '&nbsp;' + dc.tabState + '</span>') : ('<span>&nbsp;' + dc.tabRole + '</span>')), ss, 'only');
else if (dc.isToggle)
dojoConst.place((dc.loaded ? ('<span>&nbsp;' + dc.toggleRole + '&nbsp;' + dc.toggleState + '</span>') : ('<span>&nbsp;' + dc.toggleRole + '</span>')), ss, 'only');
}
}
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
dojoHtml.set(dc.containerDiv, source, {
cleanContent: true,
extractContent: true,
parseContent: false
});
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
if (dc.dropTarget && dc.accDD.on){
dc.accDD.dropTargets = [];
dc.accDD.dropAnchors = [];
$A.query(dc.dropTarget, function(){
dc.accDD.dropAnchors.push(this);
dc.accDD.dropTargets.push(this);
});
}
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
dragText: 'Drag',
dropText: 'Drop',
dropAnchor: null,
dropAnchors: [],
dropTargets: [],
actionText: 'Dragging',
isDragging: false,
dragClassName: '',
dropClassName: '',
dragLinkStyle: {},
dropLinkStyle: {},
duration: 500,
fireDrag: function(ev, dc){
var os = xOffset(this);
dc.accDD.dragDD = {
drag: this,
proxy: this,
drop: dc.accDD.dropTargets,
available: dc.accDD.dropTargets,
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
var da = typeof dc.accDD.dropAnchor === 'string' ?
pL.find(dc.accDD.dropAnchor)[0] :
dc.accDD.dropAnchor.nodeType ?
dc.accDD.dropAnchor : null;
if (da) dc.accDD.dropAnchors[0] = da;
return dc.accDD.dragDD.drop = dc.accDD.dragDD.available = dc.accDD.dropTargets;
},
startX: os.left + (xWidth(this) / 2),
startY: os.top + (xHeight(this) / 2),
deltaX: 0,
deltaY: 0,
originalX: os.left,
originalY: os.top,
offsetX: 0,
offsetY: 0
};
dc.accDD.dragDD.target = (typeof dc.drag.handle === 'string' ?
pL.find(dc.drag.handle)[0] :
dc.drag.handle && dc.drag.handle.nodeType ?
dc.drag.handle : null) || this;
var position = css(this, 'position');
if (position == 'fixed')
dc.accDD.dragDD.originalY = this.offsetTop;
else if (position == 'relative'){
dc.accDD.dragDD.originalY = xOffset(this).top - xOffset(this.parentNode).top;
dc.accDD.dragDD.originalX = xOffset(this).left - xOffset(this.parentNode).left;
}
},
fireDrop: function(ev, dc){
$A.announce(dc.accDD.actionText);
dc.onDragStart.apply(dc.accDD.dragDD.target, [ev, dc.accDD.dragDD, dc]);
var os = xOffset(this);
dc.accDD.dropDD = {
target: this,
drag: dc.accDD.dragDD.drag,
proxy: dc.accDD.dragDD.proxy,
drop: dc.accDD.dragDD.drop,
available: dc.accDD.dragDD.available,
update: function(dc){
return dc.accDD.dropDD.drop = dc.accDD.dropDD.available = dc.accDD.dragDD.update(dc);
},
startX: dc.accDD.dragDD.startX,
startY: dc.accDD.dragDD.startY,
originalX: dc.accDD.dragDD.originalX,
originalY: dc.accDD.dragDD.originalY,
deltaX: 0,
deltaY: 0,
offsetX: os.left,
offsetY: os.top
};
var position = css(this, 'position');
if (position == 'fixed')
dc.accDD.dropDD.offsetY = this.offsetTop;
else if (position == 'relative'){
dc.accDD.dropDD.offsetY = xOffset(this).top - xOffset(this.parentNode).top;
dc.accDD.dropDD.offsetX = xOffset(this).left - xOffset(this.parentNode).left;
}
function update(){
var position = css(dc.accDD.dragDD.drag, 'position'),
os = xOffset(dc.accDD.dragDD.drag);
dc.accDD.dragDD.offsetY = os.top;
dc.accDD.dragDD.offsetX = os.left;
if (position == 'fixed')
dc.accDD.dragDD.offsetY = dc.accDD.dragDD.drag.offsetTop;
else if (position == 'relative'){
dc.accDD.dragDD.offsetY = xOffset(dc.accDD.dragDD.drag).top - xOffset(dc.accDD.dragDD.drag.parentNode).top;
dc.accDD.dragDD.offsetX = xOffset(dc.accDD.dragDD.drag).left - xOffset(dc.accDD.dragDD.drag.parentNode).left;
}
}
transition(dc.accDD.dragDD.drag, {
top: dc.accDD.dropDD.offsetY,
left: dc.accDD.dropDD.offsetX
}, {
duration: dc.accDD.duration,
step: function(){
update();
dc.onDrag.apply(dc.accDD.dragDD.target, [ev, dc.accDD.dragDD, dc]);
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
dc.onDropStart.apply(dc.accDD.dropDD.target, [ev, dc.accDD.dropDD, dc]);
dc.onDrop.apply(dc.accDD.dropDD.target, [ev, dc.accDD.dropDD, dc]);
dc.onDropEnd.apply(dc.accDD.dropDD.target, [ev, dc.accDD.dropDD, dc]);
dc.onDragEnd.apply(dc.accDD.dragDD.target, [ev, dc.accDD.dragDD, dc]);
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
var t = typeof dc.trigger === 'string' ?
pL.find(dc.trigger)[0] :
dc.trigger.nodeType ?
dc.trigger : null;
dc.triggerObj = t ? t : null;
dc.open();
}

};

if (window.InitAccDC && window.InitAccDC.length){
pL.ajaxSetup({async: false});
$A.getScript(window.InitAccDC);
pL.ajaxSetup({async: true});
}

})($L);

});