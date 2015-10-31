$A.bind(window, 'load', function(){

// Set the Wizard and set the default position to group 1 slide 1 using their array index values ('0,0')

// Since this is a complicated control type that includes custom values and an AccDC Object declaration, we are going to put this into a render function so we can make it toggleable

	window.renderCarousel = function(){

		$A.setCarousel($A.getEl('carouselId'), 'files/carousel.xml', '0,0',
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

						// Set custom callbacks for the slide rendering action
						handlers:
										{

										// Runs every time a new slide completes rendering
										complete: function(dc){
// 'this' is the Carousel AccDC Object, and is the same as the 'dc' argument
// The content of the new slide is contained within the DOM node dc.containerDiv
// E.G alert(dc.containerDiv.innerHTML);

// Other DOM node properties that are available
// dc.top.btn.P : The Prev Button DOM node
// dc.top.btn.N : The Next Button DOM node
// dc.top.btn.PG : The Prev Group Button DOM node
// dc.top.btn.NG : The Next Group Button DOM node

// Available state and index values
// dc.groupVal : the current index value of the currently active Group (if applicable)
// dc.groupMax : the maximum number of Groups within the carousel
// dc.slideVal : the current index value of the newly loaded slide (relative if contained within a Group)
// dc.slideMax : the maximum number of Slides within the Group or carousel (if contained within a flat list)

// To start, let's save a reference to the newly loaded form element, and put it within the top level AccDC Object for the carousel
// This will make it available to all carousel callback handlers by referencing 'dc.top'

											dc.top.form = $A.query('form', dc.containerDiv)[0];

// Let's also save a top level reference of the currently loaded slide
// (this will be the Group index, since each Wizard step is included within 1 Group tag in the XML file), and the slideVal property would simply be relative to it's container

											dc.top.groupVal = dc.groupVal;
											dc.top.groupMax = dc.groupMax;

											// If this is the first Wizard step, let's disable the Prev button

											if (!dc.groupVal)
												$A.setAttr(dc.top.btn.P, 'disabled', 'disabled');

											else
												$A.remAttr(dc.top.btn.P, 'disabled');

// Now let's check for previously saved values and repopulate those form fields (This happens when the Prev button is activated)

											if (dc.top.saved){
												for (n in dc.top.saved){
													if (dc.top.form[n])
														dc.top.form[n].value = dc.top.saved[n];
												}
											}

// Then set focus to the first form field, as long as this isn't the first slide (so it doesn't grap focus when the page loads), or if going backwards using the Prev button

											if (dc.groupVal || dc.top.saved)
												// Simply look for the form field that includes data-first="true", and set focus to it
												$A.query('form *[data-first="true"]', dc.containerDiv)[0].focus();
										},
										btnNext: function(ev, dc){
											// Runs every time the Next Slide button is clicked
											// 'this' is the button element DOM node
											// 'dc' is the Carousel AccDC Object

											// Other DOM node properties that are available
											// dc.btn.P : The Prev Button DOM node
											// dc.btn.N : The Next Button DOM node
											// dc.btn.PG : The Prev Group Button DOM node
											// dc.btn.NG : The Next Group Button DOM node

											// Return false to prevent the next slide from rendering

											// Now, let's do a bit of form field validation.

											// Set an initial return value
											var ret = true;

											// Loop through all form fields that include aria-required="true"
											$A.query('form *[aria-required="true"]', dc.containerDiv, function(i, o){
												if (ret && !o.value){
													// If blank, throw an alert using the error stored in the data-error attribute on the form field tag
													alert($A.getAttr(o, 'data-error'));
													// Set focus to the offending form field
													o.focus();
													// Change the return value and break the loop
													ret = false;
												}
											});

											if (!ret)
												return ret;

// Now, since all form fields have passed, let's save the values in the top level object so we can get them later

// Create a storage object if one doesn't already exist
											if (!dc.top.saved)
												dc.top.saved = {};

											// Then save the name / value pairs
											for (var i = 0; i < dc.top.form.elements.length; i++)
															dc.top.saved[dc.top.form.elements[i].name] = dc.top.form.elements[i].value;

											// Now, if this is the last step, let's do something special with the stored data

											if (dc.top.groupVal == dc.top.groupMax - 1 && dc.top.saved){
												// This is where the name / value pairs can be serialized for a URI or AJAX post to process the saved data.

												// In our case though, where just going to show a totally awesome alert instead! YEA!

												var s = '';

												for (n in dc.top.saved)
																s += n + ': ' + dc.top.saved[n] + '\n';
												alert(s);
											}
										}
										},


						// Customize the DOM rendering order or add additional controls to the DOM when rendered within the carousel
						renderFn: function(parentDiv, leftDiv, centerDiv, bufferDiv, rightDiv, btnPrev, btnNext, isGrouped, btnPrevGroup,
						btnNextGroup){
							parentDiv.appendChild(leftDiv);
							parentDiv.appendChild(centerDiv);
							centerDiv.appendChild(bufferDiv);
							parentDiv.appendChild(rightDiv);
							leftDiv.appendChild(btnPrev);
							rightDiv.appendChild(btnNext);

							if (isGrouped){
								leftDiv.appendChild(btnPrevGroup);
								rightDiv.appendChild(btnNextGroup);
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