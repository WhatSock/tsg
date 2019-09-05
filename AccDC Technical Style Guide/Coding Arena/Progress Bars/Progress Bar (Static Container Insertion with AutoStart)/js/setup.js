$A.bind(window, "load", function() {
  // Create a Progress Bar AccDC Object and save it in "myProgressBar"

  var myProgressBar = $A.setProgressBar({
    // Set a unique ID, which will also be the ID attribute value for the 'progress' element
    id: "progressbar1",

    // Set the boundary text for screen reader users
    role: "Loading",
    accStart: "Start",
    accEnd: "End",

    // Set initial values for the progress bar, may be Int or Float
    config: {
      value: 0,
      max: 100
    },

    // Specify the container element where the progress bar AccDC Object will be inserted
    isStatic: "#progressBarContainer",

    // Set the class name for the top level container Div that surrounds the 'progress' element
    className: "progressBar",

    // Load the polyfill script after the progress bar is rendered for cross-browser compatibility
    // (The accompanying CSS file must also be included in the header of the page)
    runJSAfter: ["js/progress-polyfill.min.js"],

    // Run script after the progress bar finishes rendering
    runAfter: function(dc) {
      // Optionally do something
      // dc.source is the DOM node for the rendered 'progress' element
    },

    // Run script after the progress bar finishes closing
    runAfterClose: function(dc) {
      // Optionally do something
    }

    // Other AccDC API properties and methods can be applied here as well if desired
  });

  // Open the progress bar AccDC Object
  myProgressBar.open();

  // Now, let's set up a timer to show the animation in action

  // Set a starting value
  var iVal = 0;

  // Set an interval
  var inter = setInterval(function() {
    // Set a new value for the previously instantiated progress bar AccDC Object
    myProgressBar.set(iVal);

    iVal++;

    // Stop the interval when it reaches 100
    if (iVal > 100) {
      clearInterval(inter);

      // Now close the progress bar, since processing has completed
      myProgressBar.close();
    }
  }, 300);
});
