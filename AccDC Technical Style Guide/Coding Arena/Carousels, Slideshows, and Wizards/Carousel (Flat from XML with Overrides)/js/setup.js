$A.bind(window, 'load', function(){

// Set the Rotating Carousel and set the default position to slide 1 using its array index value ('0')

// Since this is a complicated control type that includes custom values and an AccDC Object declaration, we are going to put this into a render function so we can make it toggleable

	window.renderCarousel = function(){

		// Declare a dotList variable for use later, as well as a UL DOM node variable and index value
		var dotList = [], dotIndex = 0, dotNavUl = null, stopBtn = null;

		$A.setCarousel($A.getEl('carouselId'), 'files/carousel.xml', '0',
						{

						// Configure optional overrides

						// The center Div where the slides are cycled within a relatively positioned container
						contentCls: 'centerContent',

// Set the nav button element type
// 'button' is recommended so that the action is automatically triggered when accesskeys are pressed, which doesn't happen for other element types
						btnTag: 'button',
						// Set the shared class name for all nav buttons
						btnCls: 'navButton',

						// Set the class name for the Next and Previous Slide buttons
						btnSlideCls: 'navSlideButton',

// Set the class name for the Group Name container element (Div tag), which is rendered above or below the center slide container
						groupNameCls: 'groupName',

						// Set the hidden heading level for screen reader users (defaults to 3 if omitted)
						ariaLevel: 2,

						// Customize the DOM rendering order or add additional controls to the DOM when rendered within the carousel
						renderFn: function(parentDiv, leftDiv, centerDiv, bufferDiv, rightDiv, btnPrev, btnNext, isGrouped, btnPrevGroup,
							btnNextGroup){

							// Create a topDiv node for the Stop/Play button to be appended within
							var topDiv = $A.createEl('div', null, null, 'topDiv clearfix');
							parentDiv.appendChild(topDiv);

							// Add container element DOM node where slides will dynamically rotate
							parentDiv.appendChild(centerDiv);
							centerDiv.appendChild(bufferDiv);

// Create new DOM nodes to group the Prev and Next nav buttons, plus a clickable dot region for manual control via keyboard or mouse

							var navDiv = $A.createEl('div', null, null, 'navDivClass clearfix'),
								navDivColLeft = $A.createEl('div', null, null, 'leftCol'),
								navDivColMid = $A.createEl('div', null, null, 'midCol'),
								navDivColRight = $A.createEl('div', null, null, 'rightCol');

							// Set an UL element for displaying the clickable dots
							dotNavUl = $A.createEl('ul',
											{
											// Add a Group role for AT users, plus an accessible label
											role: 'group',
											'aria-label': 'Slides'
											}, null, 'dotNavClass');

							// Add the new nodes within the parentDiv DOM node in the desired order, which will be after centerDiv
							parentDiv.appendChild(navDiv);
							navDiv.appendChild(navDivColLeft);
							navDiv.appendChild(navDivColMid);
							navDiv.appendChild(navDivColRight);
							navDivColLeft.appendChild(btnPrev);
							navDivColMid.appendChild(dotNavUl);
							navDivColRight.appendChild(btnNext);

							// Create a markup string for the innerHTML of dotNavUl to speed things up a bit

							dotNavUl.innerHTML
								= '<li role="button" tabindex="0" title="Emiliana Torrini - Love in the Time of Science" aria-label="Emiliana Torrini - Love in the Time of Science" data-index="1" ><span aria-hidden="true">1</span></li><li role="button" tabindex="0" title="Frente - Labour of Love" aria-label="Frente - Labour of Love" data-index="2" ><span aria-hidden="true">2</span></li><li role="button" tabindex="0" title="Hooverphonic - Blue Wonder Power Milk" aria-label="Hooverphonic - Blue Wonder Power Milk" data-index="3" ><span aria-hidden="true">3</span></li><li role="button" tabindex="0" title="New Order - Substance" aria-label="New Order - Substance" data-index="4" ><span aria-hidden="true">4</span></li><li role="button" tabindex="0" title="U2 - The Unforgettable Fire" aria-label="U2 - The Unforgettable Fire" data-index="5" ><span aria-hidden="true">5</span></li>';

// Now bind event handlers to process the clickable dots when activated by mouse or keyboard, and store the returned array of LI elements in dotList

							dotList = $A.query('li', dotNavUl, function(i, o){
								$A.setAttr(o, 'tabindex', '-1');
								$A.bind(o,
												{
												click: function(ev){
													// Use the value of data-index to set the desired slide in the carousel
													var dc = $A.reg['carouselId'];
													dc.setSlide((parseInt($A.getAttr(this, 'data-index')) - 1));
													ev.preventDefault();
												},
												keydown: function(ev){
													var k = ev.which || ev.keyCode;

													// Enable Enter and Spacebar activation for the keyboard focusable dot buttons
													if (k == 13 || k == 32){
														$A.trigger(this, 'click');
														ev.preventDefault();
													}

													else if (k >= 37 && k <= 40){
														if (k == 37 || k == 38){
															if (!dotIndex)
																dotIndex = dotList.length - 1;

															else
																dotIndex--;
														}

														else if (k == 39 || k == 40){
															if (dotIndex >= dotList.length - 1)
																dotIndex = 0;

															else
																dotIndex++;
														}
														$A.query(dotList, function(j, p){
															$A.setAttr(p, 'tabindex', '-1');
														});
														$A.setAttr(dotList[dotIndex], 'tabindex', '0').focus();
														ev.preventDefault();
													}
												}
												});
							});
							$A.setAttr(dotList[dotIndex], 'tabindex', '0');
							$A.addClass(btnNext, 'right');

							// Now add keyboard support to the slide container node

							$A.bind(centerDiv,
											{
											keydown: function(ev){
												var k = ev.which || ev.keyCode;

												if (k == 37 || k == 39){
													if (k == 37)
														$A.trigger(btnPrev, 'click');

													else if (k == 39)
														$A.trigger(btnNext, 'click');
													ev.preventDefault();
												}
											}
											});

							// Make the slide region focusable and give it a name

							$A.setAttr(centerDiv,
											{
											tabindex: '0',
											role: 'region',
											'aria-label': 'Slide',
											'data-keyboard': 'Press Left or Right to scroll'
											});

							// Create a Stop/Play button to be appended within topDiv

							stopBtn = $A.createEl('a',
											{
											role: 'button',
											href: '#',
											'aria-label': 'Stop rotation',
											title: 'Stop rotation'
											}, null, 'stopBtn');

							stopBtn.innerHTML = '<span aria-hidden="true">X</span>';
							topDiv.appendChild(stopBtn);

							$A.bind(stopBtn,
											{
											click: function(ev){
												var dc = $A.reg['carouselId'];
												dc.enableAuto(dc.isStopped ? true : false);
												ev.preventDefault();
											}
											});
						},

						// Set custom callbacks for the slide rendering action
						handlers:
										{
										complete: function(dc){
											$A.remClass(dotList, 'active-slide');

											$A.query(dotList, function(i, o){
												$A.setAttr(o,
																{
																tabindex: '-1',
																'aria-current': 'false'
																});
											});

											$A.addClass($A.setAttr(dotList[dc.slideVal],
															{
															tabindex: '0',
															'aria-current': 'true'
															}), 'active-slide');

											dotIndex = dc.slideVal;
										},
										stopStateChange: function(isStopped, dc){
											$A.setAttr(stopBtn,
															{
															'aria-label': dc.isStopped ? 'Resume rotation' : 'Stop rotation',
															title: dc.isStopped ? 'Resume rotation' : 'Stop rotation'
															});

											$A[dc.isStopped ? 'addClass' : 'remClass'](stopBtn, 'stopped').innerHTML = dc.isStopped
												? '<span aria-hidden="true">O</span>' : '<span aria-hidden="true">X</span>';
										}
										}
						});
	};

	renderCarousel();
});