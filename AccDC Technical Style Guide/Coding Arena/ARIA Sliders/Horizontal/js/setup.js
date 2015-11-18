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
						// Calculate the current percentage and append the "%" character to make the purpose clear textually
						return Math.round(((val / dc.config.max) * 100)) + '%';
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
});