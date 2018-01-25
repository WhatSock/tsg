$A.bind(window, 'load', function(){

	// Set the horizontal ARIA Slider

	$A.setSlider('handle2',
					{

					// Set the role text that is conveyed to screen reader users
					role: 'Slider',

					// Set a minimum value
					min: 0,

					// Set a maximum value
					max: 100,

					// Set the start value
					now: 0,

					// Is a vertical slider?
					vertical: false,

					// Set the hidden link text for graceful degradation
					degradeLbl: 'Manually set a size percentage',

					// Return the string that will act as the ARIA Slider label for screen reader users
					ariaLabel: function(dc){
						return 'Set the image size';
					},

					// Return the string that will act as the textual notification for screen reader users when the slider is moved
					valueText: function(dc, val){
// Calculate the current percentage and append the "%" character to make the purpose clear textually as a string to be announced when changed dynamically.
						var vText = Math.round(((val / dc.config.max) * 100)) + '%';
// Save a reference of the new value-text string value within the slider dc object so it can be referenced by the Decrement and Increment buttons.
						dc.vText = vText;
						// Return the updated string so it can be added to the aria-valuetext attribute within the slider when moved.
						return vText;
					},

					// Set the action to occur whenever the value changes
					onDrag: function(ev, dd, dc, val){

						var rotate = parseInt(360 * (val / dc.config.max));

						$A.css($A.getEl('earthImg'),
										{
										height: parseInt(321 * (val / dc.config.max)),
										width: parseInt(428 * (val / dc.config.max)),
										'-ms-transform': 'rotate(' + rotate + 'deg)',
										'-moz-transform': 'rotate(' + rotate + 'deg)',
										'-webkit-transform': 'rotate(' + rotate + 'deg)',
										'-o-transform': 'rotate(' + rotate + 'deg)'
										});
					},

					// Set the class name for the surrounding Div, which automatically surrounds the drag handle element
					className: 'nub2'
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
				// Apply the change
				dc.set.apply(dc);
				// Now announce the new value-text string for screen reader users.
				dc.vText.announce();
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
				// Apply the change
				dc.set.apply(dc);
				// Now announce the new value-text string for screen reader users.
				dc.vText.announce();
				ev.preventDefault();
			});
		}
	});
});