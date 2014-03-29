$A.bind(window, 'load', function(){

	var modalId = $A.setModal(
					{

					// Set a unique ID for the modal AccDC Object, which can be referenced through $A.reg['uniqueId']
					id: 'uniqueId',

// To override the default event trigger bindings, you can add a custom event binding like so if you wish to manually trigger the modal later
// bind: 'custom',
// Then you can manually open the modal programmatically like so
// $A.reg.uniqueId.open();
// Doing so requires that either 'targetObj' or 'isStatic' also be set as well, so that a valid insertion point is declared.
// View the AccDC Core API documentation at WhatSock.com for more details about these properties,
// or view the Web Chat implementation within this package to see an example of this in the code for the Tooltip declaration.

// Set the screen reader accessible boundary text values
					role: 'Dialog',
					accStart: 'Start',
					accEnd: 'End',

					// Set a triggering element using either the DOM node or a CSS Selector
					trigger: '#modalTrigger',

					// Specify the file path and ID attribute of the modal container element
					source: 'files/modal.html #modalContainer',

					// Set the class name for the top level container element
					className: 'modal',

// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the modal content, which will cause Close Method Binding to automatically occur when the content is rendered.
					closeClassName: 'lbClose',

					// Set the heading level that will be accessible for screen reader users
					// This is set to 1, since a modal constitutes an independent content section equal to a standalone page
					ariaLevel: 1,

					// Run script after the Modal AccDC Object finishes loading
					runAfter: function(dc){

// 'dc' is the Modal AccDC Object
// dc.containerDiv is the DOM node where the newly rendered content is contained
// dc.close() will close the Modal AccDC Object

// Create a background Div for the modal, so it will appear as a lightbox, then store it within the 'dc' AccDC Object instance
// 'modalBackdrop' is the class name for the new element
						dc.backdrop = $A.createEl('div', null, null, 'modalBackdrop', document.createTextNode(' '));
						// Now insert the backdrop before the top level AccDC Object container element
						dc.accDCObj.parentNode.insertBefore(dc.backdrop, dc.accDCObj);

					// Now configure modal form field bindings and other stuff here

					},

					// Run script after the Modal AccDC Object has closed
					runAfterClose: function(dc){
						// Remove the backdrop Div tag
						if (dc.backdrop)
							dc.backdrop.parentNode.removeChild(dc.backdrop);
					},

					// Announce the dialog content for screen reader users when first rendered
					announce: true

					// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)

					});
});