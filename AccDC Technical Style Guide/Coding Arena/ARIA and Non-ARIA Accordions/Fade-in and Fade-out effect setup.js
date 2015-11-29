/*!
Demonstrates how to add a fade-in and fade-out effect when rendering or closing accordion panels.
For use within "ARIA Accordion (Internal Content)\js\setup.js"
*/

$A.bind(window, 'load', function(){

	$A.generateAccordion('.accAccordion',
					{

					// Set the hidden text role that will be added to the triggering element for screen reader users
					accordionRole: 'Accordion',

					// Set the accordion AccDC Object to render literal content
					mode: 0,

					// Set the class name that will be added to the triggering element of the currently open accordion
					toggleClass: 'open',

					// Choose whether or not to make accordion expand/collapse links toggles as well
					isToggle: true,

					// To add an annimation effect, add the following

					// Run before the accordion panel is rendered
					runBefore: function(dc){
					// add class to dc.accDcObj or set initial CSS left/top positioning
					// This will be set before the accordion panel DOM node is rendered
					},

					// Run after the accordion panel is rendered
					runAfter: function(dc){
					// Now animate dc.accDCObj here using it's current position or class as set previously.
					},

					// And to set a fade out effect
					// Create temp variable to detect when animation finishes
					isFadeComplete: false,

					// Run before the accordion panel is closed
					runBeforeClose: function(dc){
						if (!dc.isFadeComplete && !dc.lock){
							// Halt close action until fade is complete
							dc.lock = true;
							// Now set animation with callback when complete
							setTimeout(function(){
								// Animation callback to exicute after fade animation completes
								// Unlock the accordion panel
								dc.lock = false;
								// Prevent accidental looping
								dc.isFadeComplete = true;
								// Now close the accordion panel completely
								dc.close();
							}, 3000);
						}
					},

					// Run after the accordion panel is closed

					runAfterClose: function(dc){
						// Reset the loop stop variable
						dc.isFadeComplete = false;
					}
					}, $A.getEl('accordionGroup'), function(dc){
	// Optional callback

	// This function is executed every time a section opens or closes.
	// 'this' refers to the triggering element

	// This is how to differentiate between them at runtime

	// if (dc.loaded)
	// The alert applies only to the currently open section
	// alert(this.id);

	// if (!dc.loaded)
	// The alert applies only to the newly closed section
	// alert(this.id);

	// dc.containerDiv is the DOM node that contains the newly loaded content,
	// and 'this' or dc.triggerObj is the triggering element.

	// dc is an AccDC Object, and all AccDC API properties and methods apply.
	// E.G dc.close() will close the accordion.

	});
});