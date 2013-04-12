/*!
Configure specific controls using the triggering element ID and matching AccDC Object ID

This script is referenced from within accdc_bootstrap.js,
and is meant to be a global configuration script for common control types that span multiple web pages with the same configuration.
*/

(function(){
	// Get a reference for the AccDC Object that matches the triggering element's ID

// for the Login AccDC Object
	if ($A.reg['loginBtn']){

	var dc = $A.reg['loginBtn'];

// Now, dc.containerDiv is the DOM node that contains all of the modal content

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
	}
})();