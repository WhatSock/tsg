$A.bind(window, 'load', function(){

	$A.bind('#opt1, #opt2, #opt3, #opt4', 'change', function(ev){

		var quantity = 0, subtotal = 0.00;

		$A.query('div.options label input:checked', function(i, o){
			quantity = i + 1;
			subtotal += parseFloat($A.getAttr(o, 'data-price'));
		});

		subtotal = subtotal.toFixed(2);

		// Now display the new values

		$A.getEl('quantity').innerHTML = quantity.toString();
		$A.getEl('subtotal').innerHTML = ('$' + subtotal.toString());

// And announce the changed values for screen reader users ($A.getEl is simply grabbing the container element with id="totals")

		var s = $A.getEl('totals');
		$A.announce(s);
	});
});