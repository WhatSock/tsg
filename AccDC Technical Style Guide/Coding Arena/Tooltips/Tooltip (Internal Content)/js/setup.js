$A.bind(window, 'load', function(){

	// Tooltip AccDC Object
	var tooltipId = $A.setTooltip(
					{

					// Set a unique ID for the tooltip AccDC Object, which can also be referenced through $A.reg['uniqueId']
					id: 'myTooltip',

// To override the default event trigger bindings, you can add a custom event binding like so if you wish to manually trigger the tooltip later
// bind: 'custom',
// Then you can manually open the tooltip programmatically like so
// $A.reg.uniqueId.open();
// Doing so requires that either 'targetObj' or 'isStatic' also be set as well, so that a valid insertion point is declared.
// View the AccDC Core API documentation at WhatSock.com for more details about these properties,
// or view the Web Chat implementation within this package to see an example of this in the code for the Tooltip declaration.

// Set the screen reader accessible boundary text values
					role: 'Tooltip',
					accStart: 'Start',
					accEnd: 'End',

					// Set the triggering element using a DOM node or a CSS Selector
					trigger: 'a#helpIcon',

					// Specify that literal content is to be rendered
					mode: 0,

					// Use removeChild to grab the desired tooltip content from within the document
					// This is important to prevent ID attribute conflicts later
					source: $A.getEl('tooltip-help').parentNode.removeChild($A.getEl('tooltip-help')),

					// Position the tooltip on the right of the triggering element
					autoPosition: 3,

					// Move the Tooltip AccDC Object 10px to the right when opened
					offsetLeft: 10,

					// Set the class name for the top level container element
					className: 'tooltip',

					// Set the heading level that will be accessible for screen reader users
					ariaLevel: 2

					// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)

					});

	var passwordTooltipId = $A.setTooltip(
					{

					// Set a unique ID for the tooltip AccDC Object, which can also be referenced through $A.reg['uniqueId']
					id: 'myPasswordTooltip',

					// Set the screen reader accessible boundary text values
					role: 'Tooltip',
					accStart: 'Start',
					accEnd: 'End',

					// Set the triggering element using a DOM node or a CSS Selector
					trigger: 'input#pWord',

					// Specify that literal content is to be rendered
					mode: 0,

					// Use removeChild to grab the desired tooltip content from within the document
					// This is important to prevent ID attribute conflicts later
					source: $A.getEl('tooltip-password').parentNode.removeChild($A.getEl('tooltip-password')),

					// Position the tooltip on the right of the triggering element
					autoPosition: 3,

					// Move the Tooltip AccDC Object 10px to the right when opened
					offsetLeft: 10,

					// Set the class name for the top level container element
					className: 'tooltip',

					// Set the heading level that will be accessible for screen reader users
					ariaLevel: 2

					// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)
					});
});