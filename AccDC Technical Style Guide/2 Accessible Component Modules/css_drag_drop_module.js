/*!
CSS Drag and Drop Module R1.1
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

(function(){

	$A.setDragAndDrop = function(config){
		// Create a unique ID
		var id = 'tmp' + $A.genId(),
		// Set CSS properties for the hidden drag and drop links
		ddCSS = config.ddCSS || {},
		// Set CSS properties for each AccDC Object
		cssObj = config.cssObj || {},
		// Set group of drag and drop event handlers
		on = config.on || {},
		// Set the root node
		root = config.root || document;
		// Loop through all nodes matching the setDrag CSS Selector
		$A.query(config.setDrag, root, function(i, obj){
			// Morph each node into a draggable AccDC Object and pass an object literal to configure functionality
			$A.morph(obj,
							{
							// Increment each ID to make unique
							id: id + i,
							// Return a string value to use as the hidden drag and drop link text
							role: config.setName(obj),
							// Prevent hidden boundary text from being displayed
							showHiddenBounds: false,
							// Prevent the AccDC Object from being closed by screen reader users
							showHiddenClose: false,
// Save a reference to the original object
original: obj,
							// Enable draggability
							isDraggable: true,
							// Configure additional drag options
							drag:
											{
											confineTo: config.confineTo
											},
							// Configure accessible drag and drop
							accDD:
											{
											// Enable automatic accessibility
											on: true,
											// Set drag and drop keywords
											dragText: config.dragText || 'Drag',
											dropText: config.dropText || 'Drop',
											actionText: config.actionText || 'Dragging',
											// Apply hidden drag and drop link styles
											dragLinkStyle: ddCSS,
											dropLinkStyle: ddCSS,

dragClassName: config.dragClassName || '',
dropClassName: config.dropClassName || '',

											// Optionally set a custom insertion point where drop links will be inserted into the DOM
											dropAnchor: config.dropAnchor || '',
											// Set the drop animation time length
											duration: config.duration || 1000

											},
							// Set drag and drop event handlers
							onDragStart: config.on.dragStart,
							onDrag: config.on.drag,
							onDropStart: config.on.dropStart,
							onDrop: config.on.drop,
							onDropEnd: config.on.dropEnd,
							onDragEnd: config.on.dragEnd,
							// Set the initial drop zone
							dropTarget: config.setDrop,
							// Apply styles for the AccDC Object
							cssObj: cssObj,
							displayInline: config.displayInline || false,
							// Run script before the AccDC Object opens (before morphing the DOM node)
							runBefore: function(dc){
								if (config.runBefore)
									config.runBefore.apply(dc, [dc]);
							},
							// Run script after the AccDC Object opens (after morphing the DOM node)
							runAfter: function(dc){
								if (config.runAfter)
									config.runAfter.apply(dc, [dc]);
							}
							});
		});
	};
})();