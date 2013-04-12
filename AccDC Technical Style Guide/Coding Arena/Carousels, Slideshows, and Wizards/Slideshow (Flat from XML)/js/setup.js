$A.bind(window, 'load', function(){

// Set the Slideshow and set the default position to slide 1 using its array index value ('0')

// Since this is a complicated control type that includes custom values and an AccDC Object declaration, we are going to put this into a render function so we can make it toggleable

	window.renderCarousel = function(){

		$A.setCarousel($A.getEl('carouselId'), 'files/carousel.xml', '0',
						{

						// Configure optional overrides

						// Set the classes for the three floating Div panels that comprise the carousel
						// The left Div where the Prev Slide and Prev Group buttons are rendered
						lNavCls: 'lNav',
						// The center Div where the slides are cycled within a relatively positioned container
						contentCls: 'centerContent',
						// The right Div where the Next Slide and Next Group buttons are rendered
						rNavCls: 'rNav',

// Set the nav button element type
// ('button' is recommended so that the action is automatically triggered when accesskeys are pressed, which doesn't happen for other element types
						btnTag: 'button',
						// Set the shared class name for all nav buttons
						btnCls: 'navButton',

						// Set the class name for the Next and Previous Slide buttons
						btnSlideCls: 'navSlideButton',
						// Set the class name for the Next and Previous Group buttons (if applicable)
						btnGroupCls: 'navGroupButton',

// Set the class name for the Group Name container element (Div tag), which is rendered above or below the center slide container
						groupNameCls: 'groupName',

						// Set the hidden heading level for screen reader users (defaults to 3 if omitted)
						ariaLevel: 2,

						// Set custom callbacks for the slide rendering action and for each nav button
						handlers:
										{
										complete: function(dc){
										// Runs every time a new slide completes rendering
										// 'this' is the Carousel AccDC Object, and is the same as the 'dc' argument
										// The content of the new slide is contained within the DOM node dc.containerDiv
										// E.G alert(dc.containerDiv.innerHTML);
										},
										btnPrev: function(ev, dc){
										// Runs every time the Prev Slide button is clicked
										// 'this' is the button element DOM node
										// 'dc' is the Carousel AccDC Object
										},
										btnNext: function(ev, dc){
										// Runs every time the Next Slide button is clicked
										// 'this' is the button element DOM node
										// 'dc' is the Carousel AccDC Object
										// Return false to prevent the next slide from rendering
										},
										btnPrevG: function(ev, dc){
										// Runs every time the Prev Group button is clicked
										// 'this' is the button element DOM node
										// 'dc' is the Carousel AccDC Object
										},
										btnNextG: function(ev, dc){
										// Runs every time the Next Group button is clicked
										// 'this' is the button element DOM node
										// 'dc' is the Carousel AccDC Object
										}
										}
						});
	};

	renderCarousel();

	// Now set the event bindings for the Toggle Carousel button

	$A.bind('#toggleBtn', 'click', function(ev){

// Since the carousel is registered as an AccDC Object, and has the same ID as the ID attribute of the container element that was first declared,
// we will use this object reference to control the carousel.

// Get a reference to the Carousel AccDC Object

		var dc = $A.reg['carouselId'];

		if (dc && dc.loaded)
			dc.close(); // Destroys the AccDC Object automatically to prevent interval conflicts

		else
			renderCarousel();
	});
});