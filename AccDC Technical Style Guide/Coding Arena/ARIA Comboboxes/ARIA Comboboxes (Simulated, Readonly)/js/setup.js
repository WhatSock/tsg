$A.bind(window, 'load', function(){

	// Create a new ARIA Combobox instance
	var myLangCB = new $A.Combobox($A.getEl('languagesId'), $A.getEl('langBtnId'), $A.getEl('langChild'));

	// Set CSS autopositioning relative to the triggering element.
	// Accepted AccDC API values between 0-disabled-default and 12
	// For details, see WhatSock.com > Core API > .autoPosition
	myLangCB.setAutoPosition(5);

	// Set a positive or negative top/left offset to be applied to the autoPosition property calculation
	myLangCB.setOffset(
					{
					top: 5,
					left: 10
					});

	// Logic to distinguish between touch screen devices
	if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)){

		// For non-touch devices, add screen reader accessible keyboard instructions
		myLangCB.setPromptText('Press the down arrow to open the available options');
		// Set a default list option display size for standard screens
		myLangCB.setSize(7);
	}

	else{

		// Set a default list option display size for touch screens, 3 for phones, 5 for tablets
		myLangCB.setSize(isPhone ? 3 : 5);
	}

	// Set specific text for the hidden Close link encountered by screen reader users
	myLangCB.setCloseText('Close Language Selector');

	// Process after the suggestion window is opened
	myLangCB.onOpen(function(){
		$A.addClass(myLangCB.combobox, 'pressed');
		$A.getEl('arrowSymbolId').innerHTML = '&#8593;';
	});

	// Process after the suggestion window is closed
	myLangCB.onClose(function(){
		$A.remClass(myLangCB.combobox, 'pressed');
		$A.getEl('arrowSymbolId').innerHTML = '&#8595;';
	});

	// Now fire up the newly instantiated ARIA Combobox
	myLangCB.start();

	$A.bind('#frm', 'submit', function(ev){
		alert(this['language'].value);
		ev.preventDefault();
	});
});