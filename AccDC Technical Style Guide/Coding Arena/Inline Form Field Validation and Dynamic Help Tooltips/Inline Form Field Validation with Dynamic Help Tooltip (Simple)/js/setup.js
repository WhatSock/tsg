$A.bind(window, 'load', function(){

	// Configure the form fields

	$A.setFormFields($A.getEl('contactForm'),
					{


					// Configure the Help Tooltip for the Input with id="questionId"

					'questionId':
									{

									// Set default help text
									helpText: 'Would you like a hint? It rhymes with "Sarah".',
									validate: function(ev, dc){
										// First check if the field is blank
										if (!this.value){
											dc.source = 'Would you like a hint? It rhymes with "Sarah".';
											dc.open();
											return false;
										}
										// Otherwise, check the inputted text against the correct character sequence
										var a = 'terra', s = this.value.toLowerCase(), pos = function(){
											var r = -1;

											for (var i = 0; i < s.length; i++){
												if (s.charAt(i) === a.charAt(i) && s.substring(0, i) === a.substring(0, i))
													r = i;
											}
											return r;
										}();

										// Customize the tooltip based on the values entered
										if (s.length === 1 && pos === -1){
											dc.source = 'Hmmm, it doesn\'t look like you\'re off to a good start.';
											// Now reopen the tooltip so that it renders the new message
											dc.open();
										}

										else if (s.length === 3 && pos === -1){
											dc.source = 'Well, you can keep going if you want, but it won\'t help much.';
											dc.open();
										}

										else if (s.length === 1 && pos === 0){
											dc.source = 'Ah, now you are on the right track!';
											dc.open();
										}

										else if (s.length === 3 && pos < 2){
											dc.source = 'It looks like you\'ve wandered off there a bit...';
											dc.open();
										}

										else if (s.length === 4 && pos === 3){
											dc.source = 'Excellent! You are almost there.';
											dc.open();
										}

										else if (s.length > 5){
											dc.source = 'Wo, hold on there cowboy!';
											dc.open();
										}

										else if (s.length === 5 && s.substring(0) !== a.substring(0)){
											dc.source = 'Ah, nice try with that one...';
											dc.open();
										}

										else if (s.length === 5 && s === a){
											dc.source = 'That\'s correct, you\'ve got it!';

											// Now, only render the confirmation message if previous tooltips are open first.
											// This prevents the tooltip from appearing again when setting focus to the field after it passes validation
											if (dc.loaded)
												dc.open();
											// Then return true to pass validation
											return true;
										}
										// Otherwise, return false if validation fails
										return false;
									},

									// Assign a class to be toggled
									toggleClass: 'passedValidation',

									// Set the above class to be toggled only when validation is true, and not when false
									togglePassed: true,
									overrides:
													{

													// Set a node where the toggleClass property value will be toggled when validation passes
													classObj: $A.getEl('questionId').parentNode,

													// Position the help tooltip on the right of the Input field
													autoPosition: 3,
													className: 'helpTooltip'
													}
									},

					// Configure error handling for Inputs with specific ID attribute values

					// For the Name field (the Input tag with id="your_name")

					'your_name':
									{
									errorText: 'Your name is required',
									validate: function(ev, dc){

										// Is the field empty? Return true or false

										return this.value ? true : false;
									},
									overrides:
													{

													// Position the error tooltip above the Input field
													autoPosition: 1
													// (The autoPosition property is documented on the Core API tab at WhatSock.com)

													}
									},

					// For the Email field (the Input tag with id="your_email")

					'your_email':
									{
									errorText: 'Your email is required',
									validate: function(ev, dc){

										// Is the field empty? Return true or false

										return this.value ? true : false;
									},
									overrides:
													{

													// Position the error tooltip above the Input field
													autoPosition: 1
													// (The autoPosition property is documented on the Core API tab at WhatSock.com)

													}
									}
					}, function(ev){

		// Optionally do stuff when the form is submitted
		alert('YAY!');

		// use preventDefault() to cancel
		ev.preventDefault();
	});
});