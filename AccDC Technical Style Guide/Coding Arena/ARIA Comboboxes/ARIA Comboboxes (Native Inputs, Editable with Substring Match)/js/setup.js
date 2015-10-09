$A.bind(window, 'load', function(){

	var search = function(s){
		if (!s)
			return;

		s = 'http://www.goodreads.com/search?utf8=%E2%9C%93&query=' + encodeURIComponent(s);
		window.open(s);
	};

	// Create a new ARIA Combobox instance
	var myAuthorCombobox = new $A.Combobox($A.getEl('authors'), $A.getEl('authrEdit'));

	// Disable auto population of default value
	myAuthorCombobox.setDefault(false);

	// Use substring match instead of default left-string match
	myAuthorCombobox.setSubstringMatch(true);

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
	myAuthorCombobox.onSelect(function(optionText, optionValue, comboboxElement, selectElement){
		comboboxElement.value = optionValue;
		myAuthorCombobox.close();
		// Return the modified value so that the combobox doesn't open again instantly.
		return optionValue;
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

	$A.bind('#authrBtn', 'click', function(ev){
		search(myAuthorCombobox.combobox.value);
		ev.preventDefault();
	});
});