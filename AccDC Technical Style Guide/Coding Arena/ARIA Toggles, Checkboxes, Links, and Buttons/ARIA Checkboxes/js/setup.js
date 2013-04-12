$A.bind(window, 'load', function(){

	// Set the IMG tag ARIA Checkbox

	var standardImg = new $A.Toggle('img1',
					{

					// Set the initial state
					state: false,

					// Declare a callback to run every time the state changes
					callback: function(state){

						// 'this' is the triggering element

						this.src = state ? 'img/checkiconred.png' : 'img/checkiconblue.png';

						$A.getEl('img1mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#img1mirror', 'change', function(ev){
		// Manually set the IMG ARIA Checkbox to match the new value
		standardImg.set(this.checked);
	});

	// Set the INPUT (with type="image") ARIA Checkbox

	var inputBtn = new $A.Toggle('input1',
					{
					state: false,
					callback: function(state){
						this.src = state ? 'img/checkiconred.png' : 'img/checkiconblue.png';

						$A.getEl('input1mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#input1mirror', 'change', function(ev){
		inputBtn.set(this.checked);
	});

	// Set the DIV tag ARIA Checkbox

	var divBtn = new $A.Toggle('div1',
					{
					state: false,
					callback: function(state){
						if (state)
							$A.addClass(this, 'checked');

						else
							$A.remClass(this, 'checked');

						$A.getEl('div1mirror').checked = state ? 'checked' : false;

						// Return true to accept the ARIA state change, or false to prevent
						return true;
					}
					});

	$A.bind('#div1mirror', 'change', function(ev){
		divBtn.set(this.checked);
	});
});