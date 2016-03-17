$A.bind(window, 'load', function(){

	// Set the standard Image Link Checkbox

	var standardIL = new $A.Toggle('a1',
					{

					// Disable ARIA
					noARIA: true,

					// Set the role and state text for screen reader users
					roleText: 'Checkbox',
					stateText: 'Checked',

					// Set the initial state
					state: false,

					// Declare a callback to run every time the state changes
					callback: function(state){
						// 'this' is the triggering element

						document.getElementById('a1img').src = state ? 'img/horse_checked.svg' : 'img/horse.svg';

						$A.getEl('a1mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#a1mirror', 'change', function(ev){
		standardIL.set(this.checked);
	});

	// Set the standard A tag (with background image) Checkbox

	var standardBGI = new $A.Toggle('a2',
					{
					noARIA: true,
					roleText: 'Checkbox',
					stateText: 'Checked',
					state: false,
					callback: function(state){
						if (state)
							$A.addClass(this, 'checked');

						else
							$A.remClass(this, 'checked');

						$A.getEl('a2mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#a2mirror', 'change', function(ev){
		standardBGI.set(this.checked);
	});
});