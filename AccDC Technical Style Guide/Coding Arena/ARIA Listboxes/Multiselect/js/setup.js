$A.bind(window, 'load', function(){

	// Set the Multiselect ARIA Listbox

	var multiselectListbox = new $A.Listbox($A.getEl('multiselectLB'),
					{

					// Set the default list item index value
					defaultIndex: 0,

					// Set the screen reader accessible label text
					label: 'What do you want with lunch?',

					// Enable multiselect
					isMultiselect: true,

					// Assign a callback to run every time a new list item is selected
					callback: function(optionNode, optionsArray){
						// Toggle the class "selected"
						var vals = this.val();
						$A.query(optionsArray, function(i, o){
							if ($A.inArray(o.id, vals) !== -1)
								$A.addClass(o, 'selected');

							else
								$A.remClass(o, 'selected');
						});

						// Set the Multiselect Field to match this.val()
						// jQuery is used for this part, to save time.
						if ($)
							$('#multiSelectField').val(vals);
					}
					});

	// Bind the Multiselect field with the Multiselect ARIA Listbox

	$A.bind('#multiSelectField', 'keyup blur', function(ev){
		// jQuery is used for this part, to save time.
		if ($)
			multiselectListbox.val($(this).val());
	});

	// Set up the form event binding for adding a new value to the listboxes

	$A.bind('form.addFrm', 'submit', function(ev){
		var newVal = $A.getEl('addNew').value, newId = $A.getEl('addNewId').value;

		if (!newVal || !newId || $A.getEl(newId))
			return false;

		// To add a new ARIA Listbox item, it needs to be an A tag with a unique ID attribute, so let's make one

		var aTag = $A.createEl('a',
						{
						// Assign node attributes
						id: newId,
						// Add an href attribute to ensure keyboard accessibility
						href: '#'
						});

		// Then put the text in the A tag with supporting surrounding markup

		aTag.innerHTML = '<span class="lbl">' + newVal + '</span>';

		// Then add it to the ARIA Listbox as a new option

		multiselectListbox.add(aTag);

// You can also add an array of A tags if desired.
// E.G multiselectListbox.add([aTag1, aTag2, etc]);

// To remove a list item from an ARIA Listbox, simply pass the ID value of the node you wish to remove to the rem() method, which will return the A tag for that node
// var removedNode = multiselectListbox.rem('multiselectOpt1');
// or an array of IDs like so
// var arrayOfRemovedNodes = multiselectListbox.rem(['multiselectOpt1', 'multiselectOpt2']);

// Now let's add the new value to the standard Select element so they match

		var selectField = $A.getEl('multiSelectField');

		selectField.appendChild($A.createEl('option',
						{
						value: newId
						}, null, null, document.createTextNode(newVal)));

		selectField.size = selectField.options.length;

		// Prevent the page from refreshing
		ev.preventDefault();
	});
});