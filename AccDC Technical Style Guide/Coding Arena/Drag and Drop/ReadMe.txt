Drag and Drop

Drag and Drop isn't called for much as part of a general feature set, but it's good to know how to make this functionality accessible for both screen reader and keyboard only users.

Expected behaviors: All draggable objects must be accessible from the keyboard with or without a screen reader running, and hidden links should be used to identify draggable objects and the location of drop zones.

The Drag and Drop Module automates these processes by adding all related event handlers and managing all related rendering procedures.

JavaScript invocation statement syntax:

$A.setDragAndDrop({
// Configure functionality using a key / value map
});

Parameters

The first parameter configures drag and drop functionality using a key / value map.

Example:

{

// Specify the draggable objects using a CSS Selector
setDrag: 'ul#options li > img',

// Specify the initial drop zone
setDrop: 'div.chosenBooks',

// CSS Selector or DOM node that specifies an optional strategic focus point where programmatic focus will return after a drop action completes
returnFocusTo: 'div.chosenBooks h3',

// Set the context node
root: document,

// Now, since the hidden links need custom link text for each draggable item,
// we're going to recursively query the data-label attribute for every image and return it
setName: function(obj){
// 'obj' is the object that matches the CSS Selector above in 'setDrag'
return $A.getAttr(obj, 'data-label');
},

// Set the initial styles for the morphed AccDC Object, which will need absolute positioning
cssObj:
{
position: 'absolute',
zIndex: 1
},

// Prevent block formatting when surrounding divs are added
displayInline: true,

// Run script before the AccDC Object opens
runBefore: function(dc){

// Do stuff

},

// Run script after the AccDC Object opens
runAfter: function(dc){

// Do stuff

},

// Configure drag and drop event handlers
on: {

// Fire when the mouse moves a minimum distance.        
dragStart: function(ev, dd, dc){
// 'ev' is the event object
// 'dd' is the Drag and Drop custom event object
// 'dc' is the AccDC Object for the draggable object
},

// Fire every time the mouse moves when dragging.  
drag: function(ev, dd, dc){
// 'ev' is the event object
// 'dd' is the Drag and Drop custom event object
// 'dc' is the AccDC Object for the draggable object
},

// Fire when the dragged element moves within the tolerance of a drop target element.  
dropStart: function(ev, dd, dc){
// 'ev' is the event object
// 'dd' is the Drag and Drop custom event object
// 'dc' is the AccDC Object for the draggable object
},

// Fire when the dragged element is dropped within the tolerance of a drop target element.  
drop: function(ev, dd, dc){
// 'ev' is the event object
// 'dd' is the Drag and Drop custom event object
// 'dc' is the AccDC Object for the draggable object
},

// Fire when the dragged element moves out of the tolerance of a drop target element.  
dropEnd: function(ev, dd, dc){
// 'ev' is the event object
// 'dd' is the Drag and Drop custom event object
// 'dc' is the AccDC Object for the draggable object
},

// Fire after all other drag and drop handlers have fired.  
dragEnd: function(ev, dd, dc){
// 'ev' is the event object
// 'dd' is the Drag and Drop custom event object
// 'dc' is the AccDC Object for the draggable object
}

},

// Restrict draggability, since there's no point in having stuff wiz around everywhere...
confineTo: 'div.booksWrapper',

// Set the drop animation time length for keyboard users in milliseconds
duration: 2000,

// Set keywords for screen reader and keyboard only users
dragText: 'Move',
toText: 'to',

// IMPORTANT: All dropTarget elements must include a data-label attribute to specify a unique name for the drop region for screen reader and keyboard only users.
// View the Coding Arena HTML markup for examples.

actionText: 'Dragging',

// Override default relative positioning to use absolute instead
// Effects only the hidden drag links when they receive focus
ddCSS:
{
position: 'absolute',
zIndex: 10
},

// Set class names for the drag links
dragClassName: 'ddLink'

}

The properties and methods of the 'dd' drag and drop custom event object are as follows:

For drag events:

target (DOM Node) 
The drag element to which the event handler has been bound. (Always the same as "this" within a drag event handler) 

drag (DOM Node) 
The dragged element to which the drag event has been bound. 

proxy (DOM Node) 
The dragged element which determines the drop target tolerance. 

drop (Array) 
An array of all active drop targets for the current drag instance. 

available (Array) 
An array of all available drop targets for the current instance. 

update (Method) 
Helper function that updates the locations of all available drop targets in the current drag instance. 

startX (Number) 
The horizontal location of the "mousedown" event. 

startY (Number) 
The vertical location of the "mousedown" event. 

deltaX (Number) 
The horizontal distance moved from "startX". 

deltaY (Number) 
The vertical distance moved from "startX". 

originalX (Number) 
The starting horizontal position of the dragged element. 

originalY (Number) 
The starting vertical position of the dragged element. 

offsetX (Number) 
The moved horizontal position of the dragged element. 

offsetY (Number) 
The moved vertical position of the dragged element. 

For drop events:

target (DOM Node) 
The drop element to which the event handler has been bound. (Always the same as "this" within an event handler) 

drag (DOM Node) 
The dragged element to which the drag event has been bound. 

proxy (DOM Node) 
The dragged element, which determines the drop target tolerance. 

drop (Array) 
Array of all active drop targets for the current drag instance. 

available (Array) 
Array of all available drop targets for the current drag instance. 

update (Method) 
Helper function that updates the locations of all available drop targets in the current drag instance. 

startX (Number) 
The horizontal location of the "mousedown" event. 

startY (Number) 
The vertical location of the "mousedown" event. 

deltaX (Number) 
The horizontal distance moved from "startX". 

deltaY (Number) 
The vertical distance moved from "startX". 

originalX (Number) 
The starting horizontal position of the dragged element. 

originalY (Number) 
The starting vertical position of the dragged element. 

offsetX (Number) 
The moved horizontal position of the dragged element. 

offsetY (Number) 
The moved vertical position of the dragged element.  

