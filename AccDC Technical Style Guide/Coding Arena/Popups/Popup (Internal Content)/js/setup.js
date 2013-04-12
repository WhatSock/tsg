$A.bind(window, 'load', function(){

	// Popup AccDC Object
	var popupId = $A.setPopup(
					{

					// Set a unique ID for the popup AccDC Object, which can be referenced through $A.reg['uniqueId']
					id: 'myPopup',

// To override the default event trigger bindings, you can add a custom event binding like so if you wish to manually trigger the popup later
// bind: 'custom',
// Then you can manually open the popup programmatically like so
// $A.reg.uniqueId.open();
// Doing so requires that either 'targetObj' or 'isStatic' also be set as well, so that a valid insertion point is declared.
// View the AccDC Core API documentation at WhatSock.com for more details about these properties,
// or view the Web Chat implementation within this package to see an example of this in the code for the Tooltip declaration.

// Set the screen reader accessible boundary text values
					role: 'Excerpt',
					accStart: 'Start',
					accEnd: 'End',

					// Set the triggering element using a DOM node or a CSS Selector
					trigger: 'a#myPopup',

					// Specify that literal content is to be rendered
					mode: 0,

					// Use removeChild to grab the desired modal content from within the document
					// This is important to prevent ID attribute conflicts later
					source: $A.getEl('popup-info').parentNode.removeChild($A.getEl('popup-info')),

					// Position the popup on the right of the triggering element
					autoPosition: 3,

					// Move the Popup AccDC Object 10px to the right, and 20px up when opened
					offsetLeft: 10,
					offsetTop: -20,

					// Set the class name for the top level container element
					className: 'popup',

// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the popup content, which will cause Close Method Binding to automatically occur when the content is rendered.
					closeClassName: 'popupClose',

					// Set a visually hidden close link for screen reader users to appear at the end of the popup content
					showHiddenClose: true,

// Set the visually hidden close link to appear onFocus (required for 508 compliance if no other keyboard accessible close method is available)
					displayHiddenClose: true,

					// Set the heading level that will be accessible for screen reader users
					ariaLevel: 2,

// Choose a different insertion point in the DOM; must be a DOM node; defaults to the triggering element if not specified.
					targetObj: null,

// Choose a different focus element in the DOM for CSS autoPositioning; may be a DOM node or CSS Selector; defaults to the triggering element if not specified.
					posAnchor: ''

					// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)

					});
});