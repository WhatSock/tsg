/*!
Configure specific controls using the triggering element ID and matching AccDC Object ID

This script is referenced from within accdc_bootstrap.js,
and is meant to be a global configuration script for common control types that span multiple web pages with the same configuration.
*/

(function(){

	// Check for the presence of the AccDC Object that matches the triggering element's ID
	if ($A.reg['modalTrigger']){

		// Get a reference to the modal AccDC Object using the ID attribute value of the triggering element
		var dc = $A.reg['modalTrigger'];

	// Now, dc.containerDiv is the DOM node that contains all of the newly rendered modal content

	// Do stuff to configure the modal content.

	// dc.close() will manually close the modal AccDC Object for example

	// All other AccDC API properties and methods are similarly applicable here.

	}
})();