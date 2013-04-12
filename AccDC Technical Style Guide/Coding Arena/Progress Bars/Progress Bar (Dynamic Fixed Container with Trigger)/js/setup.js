$A.bind(window, 'load', function(){

	// Create a Progress Bar AccDC Object and save it in "myProgressBar"

	var myProgressBar = $A.setProgressBar(
					{

					// Set a unique ID, which will also be the ID attribute value for the 'progress' element
					id: 'progressbar1',

					// Set the boundary text for screen reader users
					role: 'Download',
					accStart: 'Start',
					accEnd: 'End',

					// Set initial values for the progress bar, may be Int or Float
					config:
									{
									value: 0,
									max: 80
									},

					// Specify the container element where the progress bar AccDC Object will be inserted
					isStatic: 'body',

					// Prepend the progress bar content to the content already contained within the body element
					// This also places it at the top of the page for screen reader users
					prepend: true,

					// Set the class name for the top level container Div that surrounds the 'progress' element
					className: 'progressBar',

					// Load the polyfill script after the progress bar is rendered for cross-browser compatibility
					// (The accompanying CSS file must also be included in the header of the page)
					runJSAfter: ['js/progress-polyfill.min.js'],

					// Fix the progress bar to the middle center of the viewport
					autoFix: 9,

					// Run script after the progress bar finishes rendering
					runAfter: function(dc){
					// Optionally do something
					// dc.source is the DOM node for the rendered 'progress' element
					},

					// Run script after the progress bar finishes closing
					runAfterClose: function(dc){
					// Optionally do something
					}

					// Other AccDC API properties and methods can be applied here as well if desired

					});

	// Configure the Download button to open the progress bar and set incremental values

	$A.bind('#downloadBtn', 'click', function(ev){

		// Don't open the progress bar if it's already loaded

		if (!myProgressBar.loaded){

			// Open the progress bar AccDC Object
			myProgressBar.open();

			// Now, let's set up a timer to show the animation in action

			// Set a starting value
			var iVal = 0;

			// Set an interval
			var inter = setInterval(function(){

				// Set a new value for the previously instantiated progress bar AccDC Object
				myProgressBar.set(iVal);

				iVal++;

				// Stop the interval when it reaches 80
				if (iVal > 80){
					clearInterval(inter);

					// Now close the progress bar, since processing has completed
					myProgressBar.close();
				}
			}, 300);
		}

		ev.preventDefault();
	});
});