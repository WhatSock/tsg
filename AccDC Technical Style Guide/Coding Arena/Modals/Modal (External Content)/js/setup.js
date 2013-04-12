$A.bind(window, 'load', function(){

	var modalId = $A.setModal(
					{

					// Set a unique ID for the modal AccDC Object, which can be referenced through $A.reg['uniqueId']
					id: 'myModal',

// To override the default event trigger bindings, you can add a custom event binding like so if you wish to manually trigger the modal later
// bind: 'custom',
// Then you can manually open the modal programmatically like so
// $A.reg.uniqueId.open();
// Doing so requires that either 'targetObj' or 'isStatic' also be set as well, so that a valid insertion point is declared.
// View the AccDC Core API documentation at WhatSock.com for more details about these properties,
// or view the Web Chat implementation within this package to see an example of this in the code for the Tooltip declaration.

// Set the screen reader accessible boundary text values
					role: 'Login',
					accStart: 'Start',
					accEnd: 'End',

					// Set a triggering element using either the DOM node or a CSS Selector
					trigger: '#loginBtn',

					// Specify the file path and ID attribute of the modal container element
					source: 'files/modal.html #modal-login',

					// Set the class name for the top level container element
					className: 'modal',

// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the modal content, which will cause Close Method Binding to automatically occur when the content is rendered.
					closeClassName: 'lbClose',

					// Set the heading level that will be accessible for screen reader users
					// This is set to 1, since a modal constitutes an independent content section equal to a standalone page
					ariaLevel: 1,

					// Run configuration script after the Modal AccDC Object finishes loading
					runAfter: function(dc){

						// Set a background Div for the modal, so it will appear as a lightbox
						dc.backdrop = $A.createEl('div', null, null, 'modalBackdrop', document.createTextNode(' '));
						dc.accDCObj.parentNode.insertBefore(dc.backdrop, dc.accDCObj);

						// Now configure the form functionality within the modal

						$A.bind('#lbForm', 'submit', function(ev){
							if (!this.uname.value){
								alert('Woops! You forgot your username...');
								this.uname.focus();
							}

							else if (!this.pass.value){
								alert('Woops! You forgot your password...');
								this.pass.focus();
							}

							else{
								alert('WOW!');
								dc.close();
							}
							ev.preventDefault();
						});
					},

					runAfterClose: function(dc){
						if (dc.backdrop)
							dc.backdrop.parentNode.removeChild(dc.backdrop);
					}

					// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)

					});
});