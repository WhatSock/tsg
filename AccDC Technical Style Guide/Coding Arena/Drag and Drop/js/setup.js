$A.bind(window, 'load', function(){

	// First, let's create a custom callback handler for when items are dragged away or dropped into the drop target zones

	var callback = function(dc){

// dc.original is a reference pointer to the original object for each AccDC Object
// In this case, it is the IMG tag

// For now though, we're just going to query the list to save time, and get the prices contained within the data-price attribute in each object

		callback.quantity = 0;
		callback.subtotal = 0.00;

		$A.query('ol#selections img', function(i, o){
			callback.quantity = i + 1;
			callback.subtotal += parseFloat($A.getAttr(o, 'data-price'));
		});

		callback.subtotal = callback.subtotal.toFixed(2);

		// Now display the new values

		$A.getEl('quantity').innerHTML = callback.quantity.toString();
		$A.getEl('subtotal').innerHTML = ('$' + callback.subtotal.toString());

// And announce the changed values for screen reader users ($A.getEl is simply grabbing the container element with id="subtotals")

		var s = $A.getEl('subtotals');
		$A.announce(s);
	},

	// Now, let's set up a couple variables to track movement later

	// Get the container Div tags for each target zone, we'll use these as drop zones
	divs = $A.query('div.availableBooks, div.chosenBooks'),

	// Get the two list elements where items will be moved to and from directly
	lists = $A.query('ul#options, ol#selections');

	// Now let's make those images drag and droppable

	$A.setDragAndDrop(
					{

// Specify the draggable objects using a CSS Selector
// Notice the "li > img"
// This is important, because this structure will change when the IMG is morphed into an AccDC Object, which will then turn into "li > div > div > img"
// Since we only want this to run once for non-AccDC Objects though, this is alright
					setDrag: 'ul#options li > img',

					// Specify the initial drop zone
					setDrop: 'div.chosenBooks',

					// Now, since the hidden links need custom link text for each draggable item,
					// we're going to recursively query the data-label attribute for every image and return it
					setName: function(obj){
						// 'obj' is the object that matches the CSS Selector above in 'setDrag'
						return $A.getAttr(obj, 'data-label');
					},

					// Set the initial styles for the morphed AccDC Object, which will need absolute positioning
					cssObj:
									{
									position: 'absolute',
									zIndex: 1
									},

					// Prevent block formatting when surrounding divs are added
					displayInline: true,

					// Run script before the AccDC Object opens
					runBefore: function(dc){

						// Create a tmp namespace to store temporary variables
						dc.tmp =
										{
										// Drop status
										dropped: false,
										// CSS to reset inline style changes when dragging and dropping
										clearCSS:
														{
														zIndex: 1,
														top: '',
														left: '',
														height: '',
														width: ''
														}
										};

						// Set the currently active drag zone
						// This will be tracked separately for each Image AccDC Object
						dc.tmp.zone = divs[0];

						// Set a container where focus will be returned to after a drop action is initiated
						dc.accDD.returnFocusTo = 'div.availableBooks div[role="heading"]';
					},

					// Run script after the AccDC Object opens
					runAfter: function(dc){

					// Here you can optionally do other stuff directly after each new AccDC Object opens

					},

					// Configure drag and drop event handlers
					on:
									{
									dragStart: function(ev, dd, dc){

										// Increment the z-index value as soon as an image is grabbed so that it floats above the others
										dc.css('zIndex', 2);
									},
									drop: function(ev, dd, dc){

										// Prevent same - side dropping
										if (dc.tmp.zone != this){
											dc.tmp.zone = this;
											dc.tmp.dropped = true;

											// Remove all current AccDC Object drag and drop event bindings, since these will be reset
											dc.unsetDrag();

											// Reset styling for the AccDC Object
											dc.css(dc.tmp.clearCSS);

// Now we're going to flip the active and target zones for the current object, and then make it draggable again to reset everything
											if (this == divs[1]){

												// Specify a new drop zone
												dc.dropTarget = 'div.availableBooks';
												// Set a new container where focus will be returned to after a drop action is initiated
												dc.accDD.returnFocusTo = 'div.chosenBooks div[role="heading"]';
												// Move the dropped node accordingly (parentNode grabs the LI tag as well)
												lists[1].appendChild(dc.accDCObj.parentNode);

												callback.apply(dc, [dc]);
											}

											else{
												dc.dropTarget = 'div.chosenBooks';
												dc.accDD.returnFocusTo = 'div.availableBooks div[role="heading"]';
												lists[0].appendChild(dc.accDCObj.parentNode);

												callback.apply(dc, [dc]);
											}

											// Now reassign drag and drop event bindings using the newly configured settings
											dc.setDrag();
										}
									},
									dragEnd: function(ev, dd, dc){
										if (!dc.tmp.dropped)
											// Return to the original position if the drop zone was not valid
											dc.css(dc.tmp.clearCSS);
										dc.tmp.dropped = false;
									}
									},

					// Restrict draggability, since there's no point in having stuff wiz around everywhere...
					confineTo: 'div.booksWrapper',

					// Set the drop animation time length for keyboard users in milliseconds
					duration: 2000,

					// Set keywords for screen reader and keyboard only users
					dragText: 'Move',
					toText: 'to',

// IMPORTANT: All dropTarget elements must include a data-label attribute to specify a unique name for the drop region for screen reader and keyboard only users.
// View the Coding Arena HTML markup for examples.

					actionText: 'Dragging',

					// Override default relative positioning to use absolute instead
					ddCSS:
									{
									position: 'absolute',
									zIndex: 10
									},

					// Set class names for the drag links
					dragClassName: 'ddLink'
					});

	// Now, set the bindings for the Checkout button

	$A.bind('#checkout', 'click', function(ev){
		ev.preventDefault();

		if (isNaN(callback.quantity) || callback.quantity < 1)
			return false;

		var s = 'Quantity: ' + callback.quantity + '\n' +
			'Subtotal: $' + callback.subtotal + '\n' +
			'Surcharge: $1000.00 (For your convenience)\n' +
			'Total: $' + (parseFloat(callback.subtotal) + 1000).toFixed(2);
		alert(s);
	});
});