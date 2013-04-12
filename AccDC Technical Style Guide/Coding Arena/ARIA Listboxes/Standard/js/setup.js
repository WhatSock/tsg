$A.bind(window, 'load', function(){

	// Set the Standard ARIA Listbox

	var standardListbox = new $A.Listbox($A.getEl('standardLB'),
					{
					defaultIndex: 2,
					label: 'Pick a number',
					callback: function(optionNode, optionsArray){
						// Toggle the class "selected"
						$A.query(optionsArray, function(i, o){
							if (o == optionNode)
								$A.addClass(o, 'selected');

							else
								$A.remClass(o, 'selected');
						});
						// Set the Standard Select Field to match this.val()
						$A.getEl('standardSelect').value = this.val();
					}
					});

	// Bind the standard Select field with the Standard ARIA Listbox

	$A.bind('#standardSelect', 'change blur', function(ev){
		// Set the Standard ARIA Listbox to match this.value
		standardListbox.val(this.value);
	});
});