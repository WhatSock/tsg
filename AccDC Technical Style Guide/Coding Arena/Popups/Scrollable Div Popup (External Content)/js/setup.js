$A.bind(window, 'load', function(){

	// Popup AccDC Object
	var popupId = $A.setPopup(
					{

					// Set a unique ID for the popup AccDC Object, which can be referenced through $A.reg['uniqueId']
					id: 'myScrollPopup',

					// Set the screen reader accessible boundary text values
					role: 'Popup',
					accStart: 'Start',
					accEnd: 'End',

					// Set the triggering element using a DOM node or a CSS Selector
					trigger: '#myPopup',

					// Set the file path and container ID for the popup content
					source: 'files/popup.html #scrollContentId',

					// Position the popup on the right of the triggering element
					autoPosition: 0,

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

					// Enable auto announcement of popup content for screen reader users
					announce: true,

// Disable auto focus to the beginning of the new content, since we are going to set focus to the scrollable Div container instead
					forceFocus: false,

					// Run script after the Popup AccDC Object finishes loading
					runAfter: function(dc){
						// 'dc' is the Popup AccDC Object
						// dc.containerDiv is the DOM node where the newly rendered popup content is contained
						// dc.accDCObj is the DOM node for the top level container element, which includes dc.containerDiv
						// All other AccDC API properties and methods are similarly available for the 'dc' object

						// Set aria-pressed on the triggering element
						$A.setAttr(dc.triggerObj, 'aria-pressed', 'true');

// Syntax: $A.makeScrollable( scrollableDivDOM_Node , isHorizontal? , arrowKeyIncrementValue , pageUpDownKeyIncrementValue , optionalInnerChildDOM-NodeOverride );
						$A.makeScrollable(dc.accDCObj, false, 0.3, 0.9, dc.containerDiv);

						// Now, set focus to the top level container that is scrollable
						dc.accDCObj.focus();
					},

					// Run script after the Popup AccDC Object finishes closing
					runAfterClose: function(dc){

						// Unset aria-pressed on the triggering element
						$A.setAttr(dc.triggerObj, 'aria-pressed', 'false');
					}
					});
});