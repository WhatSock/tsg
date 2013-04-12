$A.bind(window, 'load', function(){

	// Set the A tag ARIA Toggle Button

	var standardA = new $A.Toggle('a1',
					{

					// Set the initial state
					state: false,

					// Declare a callback to run every time the state changes
					callback: function(state){

						// 'this' is the triggering element

						if (state)
							$A.addClass(this, 'pressed');

						else
							$A.remClass(this, 'pressed');

						$A.getEl('a1mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#a1mirror', 'change', function(ev){
		// Manually set the A tag ARIA Toggle Button to match the new value
		standardA.set(this.checked);
	});

	// Set the standard DIV tag ARIA Toggle Button

	var divBtn = new $A.Toggle('div1',
					{
					state: false,
					callback: function(state){
						if (state)
							$A.addClass(this, 'pressed');

						else
							$A.remClass(this, 'pressed');

						$A.getEl('div1mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#div1mirror', 'change', function(ev){
		divBtn.set(this.checked);
	});

	// Set the SPAN tag ARIA Toggle Button

	var spanBtn = new $A.Toggle('span1',
					{
					state: false,
					callback: function(state){
						if (state)
							$A.addClass(this, 'pressed');

						else
							$A.remClass(this, 'pressed');

						$A.getEl('span1mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#span1mirror', 'change', function(ev){
		spanBtn.set(this.checked);
	});

	// Set the HelpIcon IMG ARIA Toggle Button

	var helpIcon = new $A.Toggle('helpIcon',
					{
					state: true,
					callback: function(state){
						if (state){
							$A.addClass(this, 'pressed');
							$A.remClass($A.getEl('helpSect1'), 'hidden');
						}

						else{
							$A.remClass(this, 'pressed');
							$A.addClass($A.getEl('helpSect1'), 'hidden');
						}

						return true;
					}
					});
});