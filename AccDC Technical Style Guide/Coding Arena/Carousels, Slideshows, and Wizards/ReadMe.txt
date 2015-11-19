Carousels, Slideshows, and Wizards

A Carousel is a complex control type that is easy to make accessible.

Expected behaviors: The beginning and ending boundaries should be conveyed to screen reader users, content changes should be announced to screen reader users only when a navigation button is manually activated, all navigation buttons should be keyboard accessible and include unique accesskeys for screen reader users, auto cycling should pause when an element within the carousel receives focus or when the mouse is moved into the region, auto cycling should resume when focus moves out of the carousel or when the mouse moves out of the region, and auto cycling should be stoppable from anywhere on the page using the keyboard.

The Carousel Module automates these processes by adding all related event handlers and managing all related rendering procedures using an external XML file for configuration.

HTML Syntax

<div id="myCarousel"></div>

An external XML file is used to configure and populate each slide of the carousel.  

XML Syntax

Flat:

<?xml version="1.0" encoding="UTF-8" ?>
<carousel
role="Slideshow"
height="auto" width="auto"
className="carouselCls"
prevTitle="Previous" nextTitle="Next" slideName="Slide" groupName=""
showGroup="" groupPosTop=""
btnPText="&#8593;" btnNText="&#8595;" btnPGText="" btnNGText=""
isGrouped="no"
btnPAccesskey="1" btnNAccesskey="2" btnPGAccesskey="" btnNGAccesskey=""
direction="tb" cycle="yes" timer="0" animDelay="1250" forward="yes"
hiddenMsg="" >
<slide announce="Unique Slide Name" ><![CDATA[
HTML content to render goes here
]]></slide>
<slide announce="Unique Slide Name" ><![CDATA[
HTML content to render goes here
]]></slide>
</carousel>

Grouped:

<?xml version="1.0" encoding="UTF-8" ?>
<carousel
role="Carousel"
height="auto" width="auto"
className="carouselCls"
prevTitle="Previous" nextTitle="Next" slideName="Slide" groupName="Group"
showGroup="yes" groupPosTop="yes"
btnPText="&#8592;" btnNText="&#8594;" btnPGText="&#8656;" btnNGText="&#8658;"
isGrouped="yes"
btnPAccesskey="1" btnNAccesskey="2" btnPGAccesskey="3" btnNGAccesskey="4"
direction="lr" cycle="yes" timer="5000" animDelay="2000" forward="yes"
hiddenMsg="Press Escape to stop automatic cycling" >
<group name="Unique Group Name" >
<slide announce="Unique Slide Name" ><![CDATA[
HTML content to render goes here
]]></slide>
<slide announce="Unique Slide Name" ><![CDATA[
HTML content to render goes here
]]></slide>
</group>
<group name="Unique Group Name" >
<slide announce="Unique Slide Name" ><![CDATA[
HTML content to render goes here
]]></slide>
<slide announce="Unique Slide Name" ><![CDATA[
HTML content to render goes here
]]></slide>
</group>
</carousel>

Important: All attributes must remain within the XML markup.
Attributes that are not required may be set to null. E.G. attributeName=""

Carousel attribute definitions:

role : Hidden text role for screen reader users

className : The class name for styling the top level AccDC Object container

prevTitle : Title and screen reader text for the previous button (Must be unique)
nextTitle : Title and screen reader text for the next button (Must be unique)
slideName : Shared name for a slide, appended to prevTitle and nextTitle for Next Slide and Previous Slide button labeling

isGrouped : Must be 'yes' or 'no': Must match the syntax of the XML markup (whether or not the group tag is present)
groupName : Shared name for a group, appended to prevTitle and nextTitle for Next Group and Previous Group button labeling

showGroup : If 'yes', group names will be displayed above or below the carousel (depending on the value of groupPosTop)
groupPosTop : If 'yes', group names are displayed above the carousel, if not, then they are displayed below (only if showGroup='yes')

btnPText : Visible textual label for the Previous Slide button; uses innerHTML to insert
btnNText : Visible textual label for the Next Slide button; uses innerHTML to insert
btnPGText : Visible textual label for the Previous Group button; uses innerHTML to insert
btnNGText : Visible textual label for the Next Group button; uses innerHTML to insert

btnPAccesskey : AccessKey for the Previous Slide button (for screen reader users)
btnNAccesskey : AccessKey for the Next Slide button (for screen reader users)
btnPGAccesskey : AccessKey for the Previous Group button (for screen reader users)
btnNGAccesskey : AccessKey for the Next Group button (for screen reader users)

direction : Must be either 'lr' (left to right), or 'tb' (top to bottom)
cycle : Must be either 'yes' or 'no' to set the behavior of infinite looping
timer : Set to '0' to disable auto rotation, or set a positive integer for N milliseconds
animDelay : Slide animation length in N milliseconds; set to '0' for instant rendering
forward : Set to 'yes' or 'no' to configure auto rotation to move backwards or forwards (relative to direction)

hiddenMsg : Hidden text message for screen reader users to convey supplementary information

Group attribute definitions:

name : The shared name of the group, which will be displayed visually if showGroup='yes'

Slide attribute definitions:

announce : The text that will be announced to screen reader users when a slide is manually changed using the navigation buttons.
If the group tag 'name' attribute value matches the slide tag 'announce' attribute value, then set announce to "" to prevent redundancy for screen reader users.

JavaScript invocation statement syntax:

$A.setCarousel( $A.getEl('myCarousel') , 'path/file.xml' , defaultIndexValue , {
// Configure optional key / value mapping overrides
});

Parameters

The first parameter is the DOM node container element where the carousel will be inserted.

The second parameter is the file path for the associated XML file.

The third parameter is the default slide index value when the carousel is rendered.
When using a flat carousel, this should be of type 'number', such as 0
When using a grouped carousel, this should be of type 'string', such as '0,0'

The fourth parameter is a key / value map of optional overrides to customize functionality.

Example:

{

// Set the classes for the three floating Div panels that comprise the carousel

// The left Div where the Prev Slide and Prev Group buttons are rendered
lNavCls: 'lNav',
// The center Div where the slides are cycled within a relatively positioned container
contentCls: 'centerContent',
// The right Div where the Next Slide and Next Group buttons are rendered
rNavCls: 'rNav',

// Set the nav button element type
// ('button' is recommended so that the action is automatically triggered when accesskeys are pressed, which doesn't happen for other element types
btnTag: 'button',

// Set the shared class name for all nav buttons
btnCls: 'navButton',

// Set the class name for the Next and Previous Slide buttons
btnSlideCls: 'navSlideButton',

// Set the class name for the Next and Previous Group buttons (if applicable)
btnGroupCls: 'navGroupButton',

// Set the class name for the Group Name container element (Div tag), which is optionally rendered above or below the center slide container
groupNameCls: 'groupName',

// Set the hidden heading level for screen reader users (defaults to 3 if omitted)
ariaLevel: 2,

// Set optional callbacks for the slide rendering action
handlers: {

// Runs every time a new slide completes rendering

complete: function(dc){

// 'this' is the Carousel AccDC Object, and is the same as the 'dc' argument
// The content of the new slide is contained within the DOM node dc.containerDiv
// E.G alert(dc.containerDiv.innerHTML);
// dc.top is the top level AccDC Object for the carousel, which can be used to share data between handler functions.

// Other DOM node properties that are available here
// dc.top.btn.P : The Prev Button DOM node
// dc.top.btn.N : The Next Button DOM node
// dc.top.btn.PG : The Prev Group Button DOM node
// dc.top.btn.NG : The Next Group Button DOM node

// Available state and index values
// dc.groupVal : the current index value of the currently active Group (if applicable)
// dc.groupMax : the maximum number of Groups within the carousel
// dc.slideVal : the current index value of the newly loaded slide (relative to siblings if contained within a Group)
// dc.slideMax : the maximum number of Slides within the Group or carousel (if contained within a flat list)

},

// Runs every time the auto rotation of a carousel stops or resumes rotating

stopStateChange: function(isStopped, dc){
// isStopped or paused = true or false
// Or for granular detection
// dc.isStopped = true or false
// dc.isPaused = true or false
},

// Runs every time the Previous Slide button is clicked

btnPrev: function(ev, dc){

// 'this' is the button element DOM node
// 'dc' is the Carousel AccDC Object
// dc.top is the top level AccDC Object for the carousel, which can be used to share data between handler functions.

// Other DOM node properties that are available here
// dc.btn.P : The Prev Button DOM node
// dc.btn.N : The Next Button DOM node
// dc.btn.PG : The Prev Group Button DOM node
// dc.btn.NG : The Next Group Button DOM node

// Available state and index values
// dc.groupVal : the current index value of the currently active Group (if applicable)
// dc.slideVal : the current index value of the newly loaded slide (relative to siblings if contained within a Group)

// Return false to prevent the previous slide from rendering
},

// Runs every time the Next Slide button is clicked

btnNext: function(ev, dc){

// 'this' is the button element DOM node
// 'dc' is the Carousel AccDC Object
// dc.top is the top level AccDC Object for the carousel, which can be used to share data between handler functions.

// Other DOM node properties that are available here
// dc.btn.P : The Prev Button DOM node
// dc.btn.N : The Next Button DOM node
// dc.btn.PG : The Prev Group Button DOM node
// dc.btn.NG : The Next Group Button DOM node

// Available state and index values
// dc.groupVal : the current index value of the currently active Group (if applicable)
// dc.slideVal : the current index value of the newly loaded slide (relative to siblings if contained within a Group)

// Return false to prevent the next slide from rendering
},

// Runs every time the Previous Group button is clicked

btnPrevG: function(ev, dc){

// 'this' is the button element DOM node
// 'dc' is the Carousel AccDC Object
// dc.top is the top level AccDC Object for the carousel, which can be used to share data between handler functions.

// Other DOM node properties that are available here
// dc.btn.P : The Prev Button DOM node
// dc.btn.N : The Next Button DOM node
// dc.btn.PG : The Prev Group Button DOM node
// dc.btn.NG : The Next Group Button DOM node

// Available state and index values
// dc.groupVal : the current index value of the currently active Group (if applicable)
// dc.slideVal : the current index value of the newly loaded slide (relative to siblings if contained within a Group)

// Return false to prevent the previous group from rendering
},

// Runs every time the Next Group button is clicked

btnNextG: function(ev, dc){

// 'this' is the button element DOM node
// 'dc' is the Carousel AccDC Object
// dc.top is the top level AccDC Object for the carousel, which can be used to share data between handler functions.

// Other DOM node properties that are available here
// dc.btn.P : The Prev Button DOM node
// dc.btn.N : The Next Button DOM node
// dc.btn.PG : The Prev Group Button DOM node
// dc.btn.NG : The Next Group Button DOM node

// Available state and index values
// dc.groupVal : the current index value of the currently active Group (if applicable)
// dc.slideVal : the current index value of the newly loaded slide (relative to siblings if contained within a Group)

// Return false to prevent the next group from rendering
}

},

// Customize the DOM rendering order or add additional controls to the DOM when rendered within the carousel
renderFn: function(parentDiv, leftDiv, centerDiv, bufferDiv, rightDiv, btnPrev, btnNext, isGrouped, btnPrevGroup, btnNextGroup){
parentDiv.appendChild(leftDiv);
parentDiv.appendChild(centerDiv);
centerDiv.appendChild(bufferDiv);
parentDiv.appendChild(rightDiv);
leftDiv.appendChild(btnPrev);
rightDiv.appendChild(btnNext);

if (isGrouped){
leftDiv.appendChild(btnPrevGroup);
rightDiv.appendChild(btnNextGroup);
}

}

}

Programmatic Control

When the carousel is instantiated, it includes many nested AccDC Objects that are bound using parent / child relationships.

The top level ID for the carousel matches the ID attribute value of the insertion point container element, making it possible to control the carousel programmatically if desired.

Example:

// If the insertion point DIV tag includes id="myCarousel":

// Get a reference to the Carousel AccDC Object

var dc = $A.reg['myCarousel'];

// Which you can then use to access stored data

var data = serialize(dc.form);

// Or close the carousel and remove it from the DOM

dc.close();

// All other AccDC API properties and methods are similarly available if desired.

// Also, the following Carousel specific properties and methods are available here too

// Set the carousel to a specific slide number, which must be equal to or greater than 0 to match the array index value

dc.setSlide(slideNumber);

// Or the same when using a grouped carousel

dc.setSlide(slideNumber, groupNumber);

// Programmatically stop auto cycling of a carousel

dc.enableAuto(false);

// Programmatically restart auto cycling of a carousel

dc.enableAuto(true);

// Return the current stopped state of an auto rotating carousel

var isStopped = dc.isStopped();

Important: The Carousel AccDC Object consists of many nested AccDC Objects which act as moving parts, similar to cogwheels within the construct.
So when dc.close() is used to close the carousel, it, including all of its nested objects, are destroyed completely.
(This means that stored data will no longer be available programmatically after a carousel is closed.)
This is done to ensure that duplication and scheduling conflicts don't arise when dynamic content panels are swapped, causing the same carousel structure to be reloaded.

Styling

The sample carousels in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled carousel will be accessible.
