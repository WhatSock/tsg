ARIA Sliders

ARIA Sliders are used to present adjustable values for users, and can easily be made accessible.

Expected behaviors: The slider should have only one tab stop in the tab order, the arrow keys should move the slider in single value increments, PageUp/PageDown should move the slider in 10% increments, Home/End should move the slider to the beginning or end, and the slider should be draggable using the mouse as usual.

The Slider Module automates these processes by adding all related event handlers and managing keyboard focus appropriately.

HTML Syntax

<div class="slider">

<div class="min" aria-hidden="true">
<span>0%</span>
</div>

<div class="slide clearfix">

<div class="nub" id="handleId"><!--
This is the slider thumb icon
--></div>

</div>

<div class="max" aria-hidden="true">
<span>100%</span>
</div>

</div>

Notice that aria-hidden="true" is used on the Min and Max container tags.
Since these values will be provided to screen reader users as part of the ARIA Slider Control, having them announced during navigation would only repeat the same information twice, which is unnecessary. So aria-hidden is used to remove them from the Virtual Buffer for screen reader users.

The next step is to use CSS to set the width and height of the slider, which you can see examples of in the Coding Arena samples.
This is important, because when the Slider Control is instantiated, it will use these offsets to configure the positioning calculations and map them to related keyboard commands.

The following attributes are handled automatically by the Slider Module:

• tabindex
• aria-label
• role="slider"
• aria-valuemin
• aria-valuemax
• aria-valuenow
• aria-valuetext
• aria-orientation

JavaScript invocation statement syntax:

$A.setSlider('handleId', {
// Configure key / value mappings
});

Parameters

The first parameter is the ID of the element that will be made draggable, which will then be morphed into an AccDC Object. E.G "handleId"
The markup structure will slightly change at this point, since an extra DIV will then surround the element with id="handleId".

The second parameter is where all of the slider configuration is set.

Example:

{

// Set the role text that is conveyed to screen reader users
role: 'Slider',

// Set a minimum value
min: 0,

// Set a maximum value
max: 100,

// Set the start value
now: 50,

// Is a vertical slider?
vertical: false,

// Set the hidden link text for graceful degradation
// This should reflect the purpose of the slider
degradeLbl: 'Manually choose a percentage',

// Return the string that will act as the ARIA Slider label for screen reader users
// This should reflect the purpose of the slider
ariaLabel: function(dc){
return 'Choose a percentage between 0 and 100';
},

// Return the string that will act as the textual notification for screen reader users
// This is automatically announced every time the slider is moved
valueText: function(dc, val){
return val + '%';
},

// Set the action to occur whenever the value changes
onDrag: function(ev, dd, dc, val){
// ev is the standard event object
// dd is the custom drag event object
// dc is the AccDC Object for the Slider
// val is the current value of the slider
},

// Set the class name for the surrounding Div, which automatically surrounds the drag handle element
className: 'handleWrapper'

}

Programmatic Control

After a Slider Control is instantiated, it can be controlled programmatically using its ID, which matches the ID attribute value of the drag handle (passed as the first parameter in the invocation statement).

Example:

// Get a reference to the Slider AccDC Object using its ID, which matches the handle elements ID attribute

var dc = $A.reg['handleId'];

// Get the current slider value

var currentVal = dc.config.now;

// Assign a new slider value

dc.config.now = currentVal + 10;

// Apply the change

dc.set.apply(dc);

Styling

The sample sliders in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled sliders will be accessible.

Implementation Notes

Simply use CSS to set the size of the slider, and the height and width of the container element, and then the slider will configure itself using these offsets.

Since repetitive labels are used, and the textual slider icon has no value for screen reader users, aria-hidden="true" is used to hide them from screen reader users.

Don't include any other ARIA attributes however, the Slider module handles this automatically.  

The slide icon can be changed to anything, or an image or CSS background image can be used instead, and the styling can be configured for any layout, and it will still be accessible for screen reader and keyboard only users.

Voiceover instructions for use on iOS touch screen devices:

When Voiceover is used on iOS touch screen devices, Voiceover instructs the user to swipe up and down with one finger to adjust the slider value, which is incorrect. (Last verified on 04/07/2013)

Instead, do the following:
1. Use one finger and double tap the slide icon, and keep your finger pressed down on the second tap.
2. Wait until you hear a slight noise, then slide your finger in the direction that you wish to move the slider.
3. Then lift your finger to release the slider.

(Credit goes to David Hilbert Poehlman for providing Voiceover pass-through technique instructions.)