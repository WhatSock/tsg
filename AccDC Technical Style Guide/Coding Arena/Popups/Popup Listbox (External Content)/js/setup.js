$A.bind(window, 'load', function(){

	// Popup AccDC Object
	var popupId = $A.setPopup(
					{

					// Set a unique ID for the popup AccDC Object, which can be referenced through $A.reg['uniqueId']
					id: 'myPopup',

					// Set the screen reader accessible boundary text values
					role: 'Language Selector',
					accStart: 'Start',
					accEnd: 'End',

					// Set the triggering element using a DOM node or a CSS Selector
					trigger: 'a#myPopup',

					// Set the file path and container ID for the popup content
					source: 'files/popup.html #popup-lang',

					// Position the popup on the right of the triggering element
					autoPosition: 3,

					// Move the Popup AccDC Object 10px to the right when opened
					offsetLeft: 10,

					// Set the class name for the top level container element
					className: 'popup',

// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the popup content, which will cause Close Method Binding to automatically occur when the content is rendered.
					closeClassName: 'popupClose',

					// Set a visually hidden close link for screen reader users to appear at the end of the popup content
					showHiddenClose: true,

// Set the visually hidden close link to appear onFocus (required for 508 compliance if no other keyboard accessible close method is available)
					displayHiddenClose: true,

					// Set the heading level that will be accessible for screen reader users
					ariaLevel: 2,

// Choose a different insertion point in the DOM; must be a DOM node; defaults to the triggering element if not specified.
					targetObj: null,

// Choose a different focus element in the DOM for CSS autoPositioning; may be a DOM node or CSS Selector; defaults to the triggering element if not specified.
					posAnchor: '',

					// Disable auto announcement of popup content for screen reader users
					announce: false,

// Disable auto focus to the beginning of the new content, since we are going to set focus to the first language in the listbox instead
					forceFocus: false,

					// Run script after the Popup AccDC Object finishes loading
					runAfter: function(dc){
						// 'dc' is the Popup AccDC Object
						// dc.containerDiv is the DOM node where the newly rendered popup content is contained
						// All other AccDC API properties and methods are similarly available for the 'dc' object

						// Set aria-pressed on the triggering element
						$A.setAttr(dc.triggerObj, 'aria-pressed', 'true');

						// Set the listbox and save the instance in the variable 'myListbox'

						var myListbox = new $A.Listbox($A.getEl('standardLB'),
										{
										defaultIndex: 0,
										label: 'Choose Language',
										callback: function(optionNode, optionsArray){
											// Toggle the class "selected" when a list option receives focus
											$A.query(optionsArray, function(i, o){
												if (o == optionNode)
													$A.addClass(o, 'selected');

												else
													$A.remClass(o, 'selected');
											});
										}
										});

// Now add additional bindings to all listbox options so that we can click or press Enter on an option to choose it
						$A.bind(myListbox.options,
										{
										click: function(ev){

											// Save the Language node text within the Span with id="valueText"
											$A.getEl('valueText').innerHTML = $A.getText(this);
											// Then close the Popup AccDC Object
											dc.close();

											ev.preventDefault();
										},
										keydown: function(ev){
											var k = ev.which || ev.keyCode;

											// Check if Enter is pressed
											if (k == 13){

												// Save the Language node text within the Span with id="valueText"
												$A.getEl('valueText').innerHTML = $A.getText(this);
												// Then close the Popup AccDC Object
												dc.close();

												ev.preventDefault();
											}
										}
										});

						// Now, set focus to the first language in the listbox
						myListbox.options[0].focus();
					},

					// Run script after the Popup AccDC Object finishes closing
					runAfterClose: function(dc){

						// Unset aria-pressed on the triggering element
						$A.setAttr(dc.triggerObj, 'aria-pressed', 'false');
					}
					});
});