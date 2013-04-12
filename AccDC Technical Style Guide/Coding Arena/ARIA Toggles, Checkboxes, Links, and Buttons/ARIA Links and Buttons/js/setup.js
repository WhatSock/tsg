$A.bind(window, 'load', function(){

	// Set the A tag ARIA Button

	var standardA = new $A.Toggle('a1',
					{

					// Disable toggling
					noToggle: true,

					// Declare a callback to run every time the triggering element is activated
					callback: function(){
						// 'this' is the triggering element
						alert('Brilliant! Now navigate to this.href or do something else.');
					}
					});

	// Set the standard DIV tag ARIA Button

	var divBtn = new $A.Toggle('div1',
					{
					noToggle: true,
					callback: function(){
						var href = $A.getAttr(this, 'data-href');
						alert('Awesome! Now navigate to ' + href);
					}
					});

	// Set the SPAN tag ARIA Link

	var spanLnk = new $A.Toggle('span1',
					{
					noToggle: true,
					callback: function(){
						var href = $A.getAttr(this, 'data-href');
						alert('Really? If you feel you must, I guess... Go to ' + href);
					}
					});

	// Set the HelpIcon IMG ARIA Link

	var helpIcon = new $A.Toggle('helpIcon',
					{
					noToggle: true,
					callback: function(){
						var href = $A.getAttr(this, 'data-href');
						alert('Now navigate to ' + href);
					}
					});
});