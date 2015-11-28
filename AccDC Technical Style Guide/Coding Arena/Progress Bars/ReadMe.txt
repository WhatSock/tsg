Progress Bars

A Progress Bar control is a relatively simple HTML5 control that, nevertheless, does require a specific implementation in order to work correctly in a backwards compatible manner with Internet Explorer 8.

The Progress Bar module automates this process by instantiating a Progress Bar control that can be programmatically set at runtime as values change.

HTML Syntax

Unobtrusive:

(No HTML markup is needed)

Inline:

<div id="pbTargetZone"></div>

The following attributes are handled automatically by the Progress Bar Module:

• value
• aria-valuetext

JavaScript invocation statement syntax:

var myProgressBar = $A.setProgressBar({
// Configure functionality using a key / value map
});

Parameters

The first parameter configures Progress Bar functionality using a key / value map.

Example:

{

// Set a unique ID, which will also be the ID attribute value for the 'progress' element when rendered
id: 'progressbar1',

// Set the boundary text for screen reader users
role: 'Download',

// Set initial values for the progress bar, values may be of type Int or Float
config: {
value: 0,
max: 100
},

// Specify the container element where the Progress Bar AccDC Object will be inserted
// (Only if pointing to the ID of a target zone container element, remove otherwise)
isStatic: '#pbTargetZone',

// Specify the container element where the unobtrusive Progress Bar AccDC Object will be inserted
// (Only if no target zone container tag is present, remove otherwise)
isStatic: 'body',
// Also, prepend the progress bar content to the content already contained within the body element
// This also places it at the top of the page for screen reader users
prepend: true,

// Set the class name for the top level container Div that surrounds the 'progress' element
className: 'progressBar',

// Load the Progress Polyfill script after the progress bar is rendered for cross-browser compatibility
// (The accompanying CSS file must also be included in the header of the page)
runJSAfter: ['js/progress-polyfill.min.js'],

// Run script after the progress bar finishes rendering
runAfter: function(dc){
// Optionally do something
// dc.source is the DOM node for the rendered 'progress' element
},

// Run script after the progress bar finishes closing
runAfterClose: function(dc){
// Optionally do something
}

// Other AccDC API properties and methods can be applied here as well if desired

}

Programmatic Control

The function "$A.setProgressBar" returns the instantiated AccDC Object for the progress bar, which can then be controlled as follows:

// Render the Progress Bar
myProgressBar.open();

// Update the Progress Bar with a new value
myProgressBar.set(50);

// Then close the Progress Bar after the process has completed
myProgressBar.close();

Styling

The sample Progress Bars in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

Instructions for changing the visual appearance of the 'progress' element are discussed in the article "Cross Browser HTML5 Progress Bars In Depth", at
http://www.useragentman.com/blog/2012/01/03/cross-browser-html5-progress-bars-in-depth/

Implementation Notes

To ensure proper rendering across various browsers, the Progress Bar Module requires the following dependencies:

• The Progress Polyfill by Lea Verou (https://github.com/LeaVerou/HTML5-Progress-polyfill)
