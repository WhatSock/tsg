$A.bind(window, 'load', function(){

	// Create a new ARIA Combobox instance
	var myStateCombobox = new $A.Combobox($A.getEl('states'), $A.getEl('stt'));

	// Disable auto population of default value
	myStateCombobox.setDefault(false);

	// Set CSS autopositioning relative to the triggering element.
	// Accepted AccDC API values between 0-disabled-default and 12
	// For details, see WhatSock.com > Core API > CSS > .autoPosition
	myStateCombobox.setAutoPosition(5);

	// Set a positive or negative top/left offset to be applied to the autoPosition property calculation
	myStateCombobox.setOffset(
					{
					top: 5,
					left: 10
					});

	// Force the highlighted value to be automatically saved when focus moves away from the Combobox
	myStateCombobox.setAutoComplete(true);

	// Logic to distinguish between touch screen devices
	if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)){

		// For non-touch devices, add screen reader accessible keyboard instructions
		myStateCombobox.setPromptText('First type then press the down arrow to browse available matches');
		// Set a default list option display size for standard screens
		myStateCombobox.setSize(6);
	}

	else{

		// Set a default list option display size for touch screens, 3 for phones, 5 for tablets
		myStateCombobox.setSize(isPhone ? 3 : 5);
	}

	// Get the Close icon triggering element for sighted mouse and touch device users
	var stateCloseIcon = $A.getEl('mobileCloseIcon');

	// Process after the suggestion window is opened
	myStateCombobox.onOpen(function(dc){
		$A.remClass(stateCloseIcon, 'hidden');
	});

	// Process after the suggestion window is closed
	myStateCombobox.onClose(function(dc){
		$A.addClass(stateCloseIcon, 'hidden');
	});

	// Add a click handler to the Close icon
	$A.bind(stateCloseIcon, 'click', function(ev){
		myStateCombobox.close();
	});

	// Now fire up the newly instantiated ARIA Combobox
	myStateCombobox.start();

	var myCountryCombobox = new $A.Combobox($A.getEl('countries'), $A.getEl('ctry'));

	myCountryCombobox.setAutoPosition(5);

	myCountryCombobox.setOffset(
					{
					top: 5,
					left: 10
					});

	// Specify a dedicated toggle element for the Country ARIA Combobox
	myCountryCombobox.setAltTrigger($A.getEl('ctryIcon'));

	// Add logic to process each time the toggle element state changes
	myCountryCombobox.onTriggerChange(function(toggleObj, openState){
		if (openState){
			// Opened
			$A.setAttr(toggleObj, 'src', 'img/up.png');
		}

		else{
			// Closed
			$A.setAttr(toggleObj, 'src', 'img/down.png');
		}
	});

	myCountryCombobox.setAutoComplete(true);

	if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)){

		myCountryCombobox.setPromptText('Press the down arrow to browse available matches');
		myCountryCombobox.setSize(6);
	}

	else{

		myCountryCombobox.setSize(isPhone ? 3 : 5);
	}

	myCountryCombobox.start();

	$A.bind('#frm1', 'submit', function(ev){
		var f = this, s = '';
		$A.query('input[type="text"]', f, function(i, o){
			s += o.name + '=' + o.value + '\n';
		});
		alert(s);
		ev.preventDefault();
	});
});