$A.bind(window, 'load', function(){

	// Create an override function to normalize the scrollIntoView animation functionality
	var scrollIntoViewOverride = function(optionNode, cbInstance){
		// cbInstance.listboxNode is the parent role="listbox" container element
		if (cbInstance.listboxNode != cbInstance.listboxNodeLast){
			cbInstance.listboxNodeLast = cbInstance.listboxNode;
			cbInstance.myScroller = zenscroll.createScroller(cbInstance.listboxNode, 200, 0);
		}

		if (cbInstance.myScroller)
			cbInstance.myScroller.center(optionNode);
	};

	// Create a new ARIA Combobox instance
	var myAuthorCombobox = new $A.Combobox($A.getEl('authors'), $A.getEl('authrEdit'));
	myAuthorCombobox.scrollIntoView = scrollIntoViewOverride;

	// Disable auto population of default value
	myAuthorCombobox.setDefault(false);

	// Use substring match instead of default left-string match
	myAuthorCombobox.setSubstringMatch(true);
	myAuthorCombobox.setCharMin(2);

	// Set CSS autopositioning relative to the triggering element.
	// Accepted AccDC API values between 0-disabled-default and 12
	// For details, see WhatSock.com > Core API > CSS > .autoPosition
	myAuthorCombobox.setAutoPosition(5);

	// Set a positive or negative top/left offset to be applied to the autoPosition property calculation
	myAuthorCombobox.setOffset(
					{
					top: 7,
					left: 30
					});

	// Process every time a new value is saved
	myAuthorCombobox.onSelect(function(optionText, selectedOptionNodes, comboboxElement, selectElement){
		var values = [], insertionPoint = $A.getEl('insertionPoint');
		$A.query(selectedOptionNodes, function(i, o){
			values.push(o.value);
		});

		if (values.length){
			insertionPoint.innerHTML = '<ul><li>' + values.join('</li><li>') + '</li></ul>';
			$A.announce(insertionPoint, true, true);
		}

		else
			insertionPoint.innerHTML = '';

		comboboxElement.value = '';
		// Return the modified value so that the combobox doesn't open again instantly.
		return '';
	});

	// Logic to distinguish between touch screen devices
	if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)){

		// For non-touch devices, add screen reader accessible keyboard instructions
		myAuthorCombobox.setPromptText('Type and press the down arrow to browse available matches');
		// Set a default list option display size for standard screens
		myAuthorCombobox.setSize(7);
	}

	else{

		// Set a default list option display size for touch screens, 3 for phones, 5 for tablets
		myAuthorCombobox.setSize(isPhone ? 3 : 5);
	}

	// Get the Close icon triggering element for sighted mouse and touch device users
	var mobileCloseIcon = $A.getEl('mobileCloseIcon');

	// Process after the suggestion window is opened
	myAuthorCombobox.onOpen(function(dc){
		$A.remClass(mobileCloseIcon, 'hidden');
	});

	// Process after the suggestion window is closed
	myAuthorCombobox.onClose(function(dc){
		$A.addClass(mobileCloseIcon, 'hidden');
	});

	// Add a click handler to the Close icon
	$A.bind(mobileCloseIcon, 'click', function(ev){
		myAuthorCombobox.close();
	});

	// Now fire up the newly instantiated ARIA Combobox
	myAuthorCombobox.start();

	$A.bind('#clearAll',
					{
					click: function(ev){
						// Clear all of the selected options.
						myAuthorCombobox.clearAll();
						$A.getEl('insertionPoint').innerHTML = '';
						myAuthorCombobox.combobox.focus();
						ev.preventDefault();
					}
					});

	$A.bind('#authrBtn', 'click', function(ev){
		var values = [], selectedMatches = myAuthorCombobox.getValue();
		$A.query(selectedMatches, function(i, o){
			values.push(o.value);
		});
		alert('Option nodes selected ' + selectedMatches.length + '\n' + 'Selected values ' + values.toString());
		ev.preventDefault();
	});
});