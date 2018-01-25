/*!
AccDC Bootstrap R1.4
Copyright 2010-2018 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License

Please edit this file however desired to customize functionality.

*/

(function(){
	$A.bootstrap = function(context){
		var context = context && context.nodeType === 1 ? context : document;

// Accessible Calendar Pickers
// Parse all A and button tags that include the class 'accCalendar'
// An Input tag with type=text is specified as the return recipient by matching the data-name attribute of the A/Button with the Input tag's Name attribute.
// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setCalendar)
			$A.query('a.accCalendar, button.accCalendar', context, function(i, o){
				if ($A.reg[o.id] && $A.reg[o.id].loaded){
					var tdc = $A.reg[o.id];
					tdc.returnFocus = false;
					tdc.close();
					tdc.returnFocus = true;
				}

				var targ = $A.query('input[name="' + $A.getAttr(o, 'data-name') + '"]', context)[0];

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple)
					$A.setCalendar(o.id, o, targ, false, function(ev, dc){

						targ.value = ('0' + (dc.range.current.month + 1)).slice(-2) + '/' + ('0' + dc.range.current.mDay).slice(-2) + '/'
							+ dc.range.current.year;

						dc.close();
					},
									{
									// Uncomment to disable auto positioning
									// autoPosition: 0,
									cssObj:
													{
													position: 'absolute',
													zIndex: 1
													},
									// Uncomment the following to enable disabled date ranges
									/*
																	disabledTxt: 'Disabled',
																	ajax: function(dc, save){
					
											// Run before the datepicker renders
					
											// Set current date variables
											var date = new Date(), current =
															{
															day: date.getDate(),
															month: date.getMonth(),
															year: date.getFullYear(),
															weekDay: date.getDay()
															};
					
											// Disable all dates prior to the current day
											if (current.year > dc.range.current.year
												|| (current.year === dc.range.current.year && current.month > dc.range.current.month)){
												dc.range[dc.range.current.month].disabled[dc.range.current.year] =
																[
																1,
																2,
																3,
																4,
																5,
																6,
																7,
																8,
																9,
																10,
																11,
																12,
																13,
																14,
																15,
																16,
																17,
																18,
																19,
																20,
																21,
																22,
																23,
																24,
																25,
																26,
																27,
																28,
																29,
																30,
																31
																];
											}
					
											if (current.year === dc.range.current.year && current.month === dc.range.current.month){
												dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];
					
												for (var day = 1; day < current.day; day++){
													dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
												}
											}
					
											// Disable all dates that fall on Saturday or Sunday
											if (!dc.range[dc.range.current.month].disabled[dc.range.current.year])
												dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];
											date.setFullYear(dc.range.current.year);
											date.setMonth(dc.range.current.month);
											var max = dc.range[dc.range.current.month].max;
					
											if (dc.range.current.month === 1)
												max = (new Date(dc.range.current.year, 1, 29).getMonth() == 1) ? 29 : 28;
					
											for (var day = 1; day <= max; day++){
												date.setDate(day);
												var weekDay = date.getDay();
					
												// 0 = Sunday, 6 = Saturday
												if (weekDay === 0 || weekDay === 6)
													dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
											}
					
											// Now render the datepicker after configuring the disabled date ranges
																		dc.open();
																	}
									*/
									});
			});

		// Accessible Modals
		// Parse all A and Button tags that include the class 'accModal'
		// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setModal)
			$A.query('a.accModal, button.accModal', context, function(i, o){
				if ($A.reg[o.id] && $A.reg[o.id].loaded){
					var tdc = $A.reg[o.id];
					tdc.returnFocus = false;
					tdc.close();
					tdc.returnFocus = true;
				}

				var p = $A.getAttr(o, 'data-src'),
					cid = $A.getEl($A.getAttr(o, 'data-internal')) || (p ? null : $A.reg[o.id] && $A.reg[o.id].source);

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && (cid || p))
					$A.setModal(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									// Set screen reader accessible boundary text values
									role: $A.getAttr(o, 'data-role') || 'Modal',
									source: cid && cid.nodeType === 1 ? cid : p.replace('#', ' #'),
									mode: cid && cid.nodeType === 1 ? 0 : null,
									trigger: o,
									click: function(ev, dc){
										ev.stopPropagation();
									},
									runAfter: function(dc){
										// Run script every time after the content completes rendering

										// Configure specific controls when detected
										$A.getScript('js/config/modals.js');

										// Add a background div for the filtered opasity, with class='modalBackdrop'
										dc.backdrop = $A.createEl('div', null, null, 'modalBackdrop', document.createTextNode(' '));
										dc.accDCObj.parentNode.insertBefore(dc.backdrop, dc.accDCObj);

										// Enable outer click to close
										$A.bind(dc.backdrop, 'click', function(ev){
											dc.close();
											ev.stopPropagation();
										});
									},
									runAfterClose: function(dc){
										// Remove the backdrop div after the modal closes
										if (dc.backdrop)
											dc.backdrop.parentNode.removeChild(dc.backdrop);
									},
									// Set the class name for the top level container element
									className: 'modal',
// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the modal content, which will cause Close Method Binding to automatically occur when the content is rendered.
									closeClassName: 'lbClose',

									// Announce the dialog content for screen reader users when first rendered
									announce: true

									// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)
									});
			});

		// Accessible Popups
		// Parse all A and Button tags that include the class 'accPopup'
		// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setPopup)
			$A.query('a.accPopup, button.accPopup', context, function(i, o){
				if ($A.reg[o.id] && $A.reg[o.id].loaded){
					var tdc = $A.reg[o.id];
					tdc.returnFocus = false;
					tdc.close();
					tdc.returnFocus = true;
				}

				var p = $A.getAttr(o, 'data-src'),
					cid = $A.getEl($A.getAttr(o, 'data-internal')) || (p ? null : $A.reg[o.id] && $A.reg[o.id].source),
					autoPosition = parseInt($A.getAttr(o, 'data-autoposition')),
					offsetLeft = parseInt($A.getAttr(o, 'data-offsetleft')), offsetTop = parseInt($A.getAttr(o, 'data-offsettop'));

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && (cid || p))
					$A.setPopup(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									// Set screen reader accessible boundary text values
									role: $A.getAttr(o, 'data-role') || 'Popup',
									source: cid && cid.nodeType === 1 ? cid : p.replace('#', ' #'),
									mode: cid && cid.nodeType === 1 ? 0 : null,
									trigger: o,
									autoPosition: isNaN(autoPosition) ? 3 : autoPosition,
									offsetLeft: isNaN(offsetLeft) ? 10 : offsetLeft,
									offsetTop: isNaN(offsetTop) ? -20 : offsetTop,
									// Set the class name for the top level container element
									className: 'popup',
// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the popup content, which will cause Close Method Binding to automatically occur when the content is rendered.
									closeClassName: 'popupClose'
									// (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)
									});
			});

		// Accessible Tooltips
		// Parse all A, Button, and form field tags that include the class 'accTooltip'
		// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setTooltip)
			$A.query('a.accTooltip, button.accTooltip, input.accTooltip, select.accTooltip', context, function(i, o){
				if ($A.reg[o.id] && $A.reg[o.id].loaded){
					var tdc = $A.reg[o.id];
					tdc.returnFocus = false;
					tdc.close();
					tdc.returnFocus = true;
				}

				var p = $A.getAttr(o, 'data-src'),
					cid = $A.getEl($A.getAttr(o, 'data-internal')) || (p ? null : $A.reg[o.id] && $A.reg[o.id].source),
					autoPosition = parseInt($A.getAttr(o, 'data-autoposition')),
					offsetLeft = parseInt($A.getAttr(o, 'data-offsetleft')), offsetTop = parseInt($A.getAttr(o, 'data-offsettop'));

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && (cid || p))
					$A.setTooltip(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									role: $A.getAttr(o, 'data-role') || 'tooltip',
									source: cid && cid.nodeType === 1 ? cid : p.replace('#', ' #'),
									mode: cid && cid.nodeType === 1 ? 0 : null,
									trigger: o,
									autoPosition: isNaN(autoPosition) ? 3 : autoPosition,
									offsetLeft: isNaN(offsetLeft) ? 10 : offsetLeft,
									offsetTop: isNaN(offsetTop) ? 0 : offsetTop
									});
			});

		// Accessible Banners
		// Parse all Div tags that include the class 'accBanner'
		if ($A.setBanner)
			$A.query('div.accBanner', context, function(i, o){
				var p = $A.getAttr(o, 'data-src');

				if (p){
					if ($A.reg[o.id] && $A.reg[o.id].loaded){
						var tdc = $A.reg[o.id];
						tdc.returnFocus = false;
						tdc.close();
						tdc.returnFocus = true;
					}

					// Prevent duplicate event bindings when nested within multi-level same page apps
					if ($A.internal.data(o, 'bound'))
						var multiple = true;

					else
						$A.internal.data(o, 'bound', true);

					if (!multiple)
						$A.setBanner(
										{
										// Set the ID of the AccDC Object to match the ID of the triggering element.
										id: o.id,
										// Set screen reader accessible boundary text values
										role: $A.getAttr(o, 'data-role') || 'Banner',
										accStart: 'Start',
										accEnd: 'End',
										source: p.replace('#', ' #'),
										// Insert the banner content within the div
										isStatic: o,
										// Configure a hidden close link for screen reader users
										showHiddenClose: true,
										// Choose whether the hidden close link appears in the tab order
										displayHiddenClose: false,
										// Set a class name for the hidden close link
										closeClassName: 'closeLnk',
										// Clear inline styling and prevent auto positioning, to use a style sheet instead
										cssObj: {},
										autoFix: 0,
										// Set the heading level that will be accessible for screen reader users
										ariaLevel: 2,
										// Configure a mouse event handler for the AccDC Object
										mouseOut: function(ev, dc){
										// Remove this if you don't want to close the banner onMouseOut
										//										dc.close();
										}
										});
				}
			});

		// Accessible Accordions
		// Parse all tags that include the class 'accAccordion'
		if ($A.generateAccordion){
			var track = {};
			$A.query('.accAccordion', context, function(i, o){
				var g = $A.getAttr(o, 'data-group');

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && g){
					if (!track[g])
						track[g] = [];

					track[g].push(o);
				}
			});

			for (n in track){

				$A.generateAccordion(track[n],
								{
								accordionRole: $A.getAttr(track[n][0], 'data-role') || 'Accordion',
								accordionState: $A.getAttr(track[n][0], 'data-openstate') || 'Expanded',
								toggleClass: 'open',
								preload: true,
								preloadImages: true
								}, context, function(dc){
				// Optional callback

				// This function is executed every time a section opens or closes.
				// 'this' refers to the triggering element

				// This is how to differentiate between them at runtime

				// if (dc.loaded)
				// The alert applies only to the currently open section
				// alert(this.id);

				// if (!dc.loaded)
				// The alert applies only to the newly closed section
				// alert(this.id);

				// dc.containerDiv is the DOM node that contains the newly loaded content,
				// and 'this' or dc.triggerObj is the triggering element.

				// dc is an AccDC Object, and all AccDC API properties and methods apply.
				// E.G dc.close() will close the accordion.

				});
			}
		}

		// Accessible Carousels/Slideshows
		// Parse all Div tags that include the class 'accCarousel'
		if ($A.setCarousel)
			$A.query('div.accCarousel', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), d = $A.getAttr(o, 'data-defaultopen');

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && p)
					$A.setCarousel(o, p, d,
									{
									complete: function(dc){
									// Placeholder, triggers after a slide completes loading.
									},
									btnPrev: function(ev, dc){
									// Placeholder, triggers whenever a Previous button is activated.
									},
									btnNext: function(ev, dc){
									// Placeholder, triggers whenever a Next button is activated.
									},
									btnPrevG: function(ev, dc){
									// Placeholder, triggers whenever a Previous Group button is activated.
									},
									btnNextG: function(ev, dc){
									// Placeholder, triggers whenever a Next Group button is activated.
									}
									});
			});

		// Accessible Trees
		// Parse all Div tags that include the class 'accTree'
		if ($A.setTree)
			$A.query('div.accTree', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), t = $A.getAttr(o, 'data-type');

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && p){

					// Configure custom functionality based on the value of data-type
					if (t == 'google-map')
						// Add supporting components
						$A.getScript('js/config/google.js');

					$A.setTree(
									{
									id: o.id,
									path: p,
									title: $A.getAttr(o, 'data-label') || 'TreeView',
									container: o,
									/* More optional overrides
									treeTag: 'ul',
dividerTag: 'li',
									treeClass: 'branch',
									treeItemTag: 'a',
									treeItemClass: 'leaf',
									topClass: 'TreeView',
									*/
									bind: 'focus',
									callback: function(ev, dc){
										// Triggers whenever the above 'bind' event is fired on each focusable tree node.

										// Configure custom functionality based on the value of data-type
										if (t == 'google-map'){
											if (dc.tmp)
												clearTimeout(dc.tmp);

											var i = $A.inArray(this, dc.tree.childNodes), lat = dc.xmlNodes[i].attributes.getNamedItem('lat').value,
												lng = dc.xmlNodes[i].attributes.getNamedItem('lng').value,
												zoom = dc.xmlNodes[i].attributes.getNamedItem('zoom').value;
											// Use setTimeout to prevent process stacking when using the arrow keys to navigate
											dc.tmp = setTimeout(function(){
												// Call the 'set' method in the Google Map AccDC Object using its "id" property (in google.js)
												$A.reg.map.google.set(lat, lng, zoom);
											}, 1000);
										}
									}
									});
				}
			});

		// Accessible Menus
		// Parse all A and Button tags that include the class 'accMenu'
		// Button and A tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setMenu)
			$A.query('button.accMenu, a.accMenu', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), cid = $A.getAttr(o, 'data-internal'), flyout = $A.getAttr(o, 'data-flyout');

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && (cid || p))
					$A.setMenu(o, cid || p.substring(0, p.indexOf('#')), cid ? p : p.substring(p.indexOf('#') + 1), function(ev, dc){
						// Do something with the menu item A tag when it is activated
						alert('Do something with this.href or id="' + this.id
							+ '" Modify "accdc_bootstrap.js" to configure this functionality.');
					}, cid ? true : false, context,
									{

									// Assign a role name for screen reader users
									role: $A.getAttr(o, 'data-role') || 'Menu',
									// Assign beginning and ending text to be appended to the role name for screen reader users
									accStart: $A.getAttr(o, 'data-starttext') || 'Start',
									accEnd: $A.getAttr(o, 'data-endtext') || 'End',

// Assign the state text, which will be appended to the triggering element text when a menu is open for screen reader users
									openState: $A.getAttr(o, 'data-openstate') || 'Open',
									// Set the starting menu level, (this is automatically incremented when submenus are opened)
									ariaLevel: 3,

									// Set the main container class, (which will surround the menu as a Div tag when rendered)
									containerClass: $A.getAttr(o, 'data-containerclass') || 'menu',

									// Specify the menu tag name in the markup
									menuTag: $A.getAttr(o, 'data-menutag') || 'ol',
									// Specify the menu class name on the above tag in the markup
									menuClass: $A.getAttr(o, 'data-menuclass') || 'menu',

// Specify the active element that will be used as each menu node
// Important, if nesting A tags within LIs, only the A tag should be used for this purpose
// Active elements should never be nested.
// The following tag will receive keyboard focus within the menu structure when using the arrow keys to navigate
// Event bindings are also tied to this tag
									itemTag: $A.getAttr(o, 'data-menuitemtag') || 'a',
									// Specify the class name that indicates when a menu item opens a submenu
									folderClass: $A.getAttr(o, 'data-menufolderclass') || 'submenu',
									// Specify the class name that indicates when a menu item is to be triggered directly
									// This should not be the same as the folderClass declaration
									linkClass: $A.getAttr(o, 'data-menulinkclass') || 'link',

									// Specify if the menu is a flyout menu
									// If true, the Left and Right arrow keys will scroll the open menu
									// If false, the Up and Down arrow keys will scroll the open menu instead
									horizontal: flyout ? true : false,

									// 0 = don't apply forced autoPositioning
									autoPosition: 0,
									// Set custom offset values to adjust the positioning calculation
									// May return a positive or negative number
									offsetLeft: function(dc){
										return 0;
									},
									offsetTop: function(dc){
										return 0;
									},
									overrides:
													{
													cssObj:
																	{
																	position: 'absolute',
																	zIndex: 1
																	}
													// Additional AccDC API properties and methods can be applied here.
													}
									});
			});

		// Accessible Tabs
		// Parse all tags that include the class 'accTab' (Recommended A, DIV, SPAN, or LI tags)
		if ($A.setTabs){
			var track = {};
			$A.query('.accTab', context, function(i, o){
				var g = $A.getAttr(o, 'data-group');

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && g){
					if (!track[g])
						track[g] = [];

					track[g].push(o);
				}
			});

			for (n in track){
				$A.setTabs(track[n],
								{
								preload: true,
								preloadImages: true,
								toggleClass: 'active',
								ariaLevel: 2
								}, true, context, function(dc){
				// Optionally perform an action after each tab finishes rendering.
				// dc.containerDiv is the DOM node that contains the newly loaded content,
				// and dc.triggerObj is the triggering element.
				// dc is an AccDC Object, and all AccDC API properties and methods apply.
				// E.G dc.close() will close the tab.
				});
			}
		}

		// Keyboard Accessible Scrollable Div
		// Parse all div tags that include the class 'accScrollable'
		if ($A.makeScrollable)
			$A.query('div.accScrollable', context, function(i, o){
				$A.makeScrollable(o);
			});

		// Accessible Toggle
		// Parse all tags that include the class 'accToggle'
		// Required: Accessible Popup Module
		if ($A.setPopup)
			$A.query('.accToggle', context, function(i, o){
				if ($A.reg[o.id] && $A.reg[o.id].loaded)
					$A.reg[o.id].close();

				var p = $A.getAttr(o, 'data-src'),
					cid = $A.getEl($A.getAttr(o, 'data-internal')) || (p ? null : $A.reg[o.id] && $A.reg[o.id].source),
					isStatic = $A.getEl($A.getAttr(o, 'data-insert')),
					state = $A.getAttr(o, 'data-defaultopen') == 'true' ? true : false,
					toggleClass = $A.getAttr(o, 'data-toggleclass') || 'togglePressed';

				// Prevent duplicate event bindings when nested within multi-level same page apps
				if ($A.internal.data(o, 'bound'))
					var multiple = true;

				else
					$A.internal.data(o, 'bound', true);

				if (!multiple && ((cid || p) && isStatic)){

					$A.setPopup(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									role: ' ',
									bind: 'click',
									trigger: o,
									isToggle: true,
									source: cid && cid.nodeType === 1 ? cid : p.replace('#', ' #'),
									mode: cid && cid.nodeType === 1 ? 0 : null,
									isStatic: isStatic,
									autoStart: state,
									// Manually override defaults
									preventAutoClose: true,
									autoPosition: 0,
									cssObj:
													{
													position: ''
													},
									runDuring: function(dc){
										$A.setAttr(dc.accDCObj,
														{
														role: 'region',
														'aria-labelledby': o.id
														});
									},
									runAfter: function(dc){
										$A.addClass(dc.triggerObj, toggleClass);
										$A.setAttr(dc.triggerObj, 'aria-expanded', 'true');
									},
									runAfterClose: function(dc){
										$A.remClass(dc.triggerObj, toggleClass);
										$A.setAttr(dc.triggerObj, 'aria-expanded', 'false');
									},
									keyDown: function(ev, dc){},
									announce: false,
									forceFocus: false,
									returnFocus: false,
									className: 'toggle-section',
									showHiddenBounds: false
									});

					// Ensure keyboard accessibility for non-active elements such as Divs, Spans, and A tags with no href attribute
					$A.bind(o, 'keydown', function(ev){
						var k = ev.which || ev.keyCode;

						if (k == 13 || k == 32){
							$A.trigger(o, 'click');
							ev.preventDefault();
						}
					});

					$A.setAttr(o,
									{
									tabindex: '0',
									'aria-expanded': state ? 'true' : 'false'
									});
				}
			});

		// Accessible Footnotes
		// Parse all Span tags that include the class 'accFootnote'
		if ($A.setFootnotes){
			// Get the first object simply to configure shared parameters
			var o = $A.query('span.accFootnote', context)[0];

			// Prevent duplicate event bindings when nested within multi-level same page apps
			if ($A.internal.data(o, 'bound'))
				var multiple = true;

			else
				$A.internal.data(o, 'bound', true);

			if (!multiple)
				$A.setFootnotes('span.accFootnote', context,
								{

								// Set the tooltip text for the footnote (this will also be the accessible name for screen reader users)
								fnText: $A.getAttr(o, 'data-fntext') || 'Footnote',

								// Set the footnote character or text that will comprise the visual link text for returning footnotes
								fnChar: $A.getAttr(o, 'data-fnchar') || '&#8224;',

// Set the tooltip text for the footnote back links (this will also be the accessible name for screen reader users)
								backText: $A.getAttr(o, 'data-backtext') || 'Back to Footnote'
								});
		}
	};

	$A.bind(window, 'load', $A.bootstrap);
})();