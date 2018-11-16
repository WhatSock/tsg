$A.bind(window, 'load', function(){

	// Declare a value mapping that can be used to customize the returned value for the slider control

	var timeVals =
		['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM',
			'10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
			'8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

	// Set the vertical ARIA Slider

	$A.setSlider('handle2',
					{

					// Set the role text that is conveyed to screen reader users
					role: 'Slider',

					// Set a minimum value
					min: 0,

					// Set a maximum value
					max: timeVals.length - 1,

					// Set the start value
					now: 9,

					// Is a vertical slider?
					vertical: true,

					// Set the hidden link text for graceful degradation
					degradeLbl: 'Manually set a time value',

					// Return the string that will act as the ARIA Slider label for screen reader users
					ariaLabel: function(dc){
						return 'Choose a time';
					},

					// Return the string that will act as the textual notification for screen reader users when the slider is moved
					valueText: function(dc, val){
						// Return the string mapped in the Time array with the matching index value
						var vText = timeVals[val];
// Save a reference of the new value-text string value within the slider dc object so it can be referenced by the Decrement and Increment buttons.
						dc.vText = vText;
						// Return the updated string so it can be added to the aria-valuetext attribute within the slider when moved.
						return vText;
					},

					// Set the action to occur whenever the value changes
					onDrag: function(ev, dd, dc, val){
						// Sync the value with the standard Select element
						$A.getEl('syncSelect').value = val.toString();
					},

					// Set the class name for the surrounding Div, which automatically surrounds the drag handle element
					className: 'nub2'
					});

	// Set a binding for the standard Select element to sync

	$A.bind('#syncSelect', 'change blur', function(ev){
		// Get a reference to the Slider AccDC Object using its ID, which matches the handle elements ID attribute
		var dc = $A.reg['handle2'];
		// Assign a new slider value
		dc.config.now = parseInt(this.value);
		// Apply the change
		dc.set();
	});

	// Configure the Decrement and Increment buttons for mobile device support.
	$A.query('div.min2, div.max2', function(i, o){
		var dir = $A.getAttr(o, 'data-dir');

		if (dir == 'd'){
			// Set click binding for the Decrement button
			$A.bind(o, 'click', function(ev){
				// Get a reference to the Slider AccDC Object using its ID, which matches the handle elements ID attribute
				var dc = $A.reg['handle2'];
				// Assign a new slider value
				dc.config.now--;
				// Apply the change to the slider
				dc.set(function(dc){
					// Update the associated select element
					$A.getEl('syncSelect').value = dc.config.now.toString();
					// Now announce the new value-text string for screen reader users.
					dc.vText.announce();
				});
				ev.preventDefault();
			});
		}

		else if (dir == 'i'){
			// Set click binding for the Increment button
			$A.bind(o, 'click', function(ev){
				// Get a reference to the Slider AccDC Object using its ID, which matches the handle elements ID attribute
				var dc = $A.reg['handle2'];
				// Assign a new slider value
				dc.config.now++;
				// Apply the change to the slider
				dc.set(function(dc){
					// Update the associated select element
					$A.getEl('syncSelect').value = dc.config.now.toString();
					// Now announce the new value-text string for screen reader users.
					dc.vText.announce();
				});
				ev.preventDefault();
			});
		}
	});
});