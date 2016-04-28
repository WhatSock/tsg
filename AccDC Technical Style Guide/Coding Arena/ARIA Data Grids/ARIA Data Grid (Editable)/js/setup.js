$A.bind(window, 'load', function(){

	var grid = new $A.DataGrid('dataGridId');

	grid.editable(true);

	grid.setEditOffset(function(cellObject){
		var o = $A.xOffset(cellObject.cellNodeA);
		o.height = $A.xHeight(cellObject.cellNodeA);
		o.width = $A.xWidth(cellObject.cellNodeA);
		return o;
	});

	grid.setChangeListener(function(originalCellObject, newValue, rowObject, gridInstance){
		// rowObject reflects the same object passed to grid.add
		// so that rowObject.id reflects the original row ID.
		// originalCellObject reflects the cell object instance passed within 'cells' when passed to grid.add
		// making it easy to validate the data by comparing originalCellObject.value with newValue
		// To prevent rendering the changed input or new toggle state, simply return false
		if (typeof newValue !== 'boolean' && !newValue)
			return false;

		var val = typeof newValue === 'boolean' ? (newValue ? 'true' : 'false') : formatStr(newValue),
			str = '<span>Update DB row "' + rowObject.id + '" field "' + originalCellObject.id + '" with <br />value: "' + val
				+ '"</span>', popup = $A.getEl('popupId');
		popup.innerHTML = str;
		$A.remClass(popup, 'hidden');
		setTimeout(function(){
			$A.addClass(popup, 'hidden');
		}, 4000);
		$A.announce(popup);
	});

	// set accessible text for screen reader users
	grid.setAccessibleText(
					{
					// Set offscreen and tooltip text for toggle cells
					toggleButtonRole: 'Toggle Button',
					toggleButtonState: 'Pressed',
					disabledText: 'Disabled',
					// Set the page text to be announced to screen reader users during infinite scrolling. E.G "Page 2", "Page 3", etc.
					pageRole: 'Page',
					// Set the active state and help tooltip text for mouse users
					editLinkAction: 'Editable',
					dblClickTitle: 'Click to activate',
					// Set the title text for the edit field
					editFieldTitle: 'Press Enter to save, or Escape to cancel.'
					});

	grid.mapColumnNames(
					[
					{
					id: 'row-id',
					lbl: 'ID',
					colClass: 'gridcell-col1'
					},
					{
					id: 'personal-name',
					lbl: 'Name',
					colClass: 'gridcell-col2'
					},
					{
					id: 'personal-email',
					lbl: 'Email',
					colClass: 'gridcell-col3'
					},
					{
					id: 'personal-city',
					lbl: 'Residence',
					colClass: 'gridcell-col4'
					},
					{
					id: 'personal-university',
					lbl: 'University',
					colClass: 'gridcell-col5'
					},
					{
					id: 'personal-status',
					lbl: 'Attendance',
					colClass: 'gridcell-col6'
					}
					]);

	grid.enableRowHeaders(true, 'row-id');
	grid.setRowMax(10);

	var pageHeaderSpan = $A.getEl('pTotal'), pageEdit = $A.getEl('goTo'), pageCurrent = 0, pageTotal = 0,
		firstBtn = $A.getEl('btnFirst'), prevBtn = $A.getEl('btnPrev'), nextBtn = $A.getEl('btnNext'),
		lastBtn = $A.getEl('btnLast');

	grid.setPageIndexChangeListener(function(currentPage, totalPages, gridInstance){
		if (pageCurrent != currentPage){
			if (currentPage === 1){
				firstBtn.disabled = prevBtn.disabled = true;
			}

			else{
				firstBtn.disabled = prevBtn.disabled = false;
			}

			if (currentPage === totalPages){
				nextBtn.disabled = lastBtn.disabled = true;
			}

			else{
				nextBtn.disabled = lastBtn.disabled = false;
			}
		}
		pageTotal = totalPages;
		pageHeaderSpan.innerHTML = 'Page ' + currentPage + ' of ' + totalPages;
		pageEdit.value = pageCurrent = currentPage;
	});

	grid.open();

	// Load test records
	var spin = 2;

	for (var tIndex = 1; tIndex <= 1071; tIndex++){
		// Use the .add() method to import another table row
		grid.add(
						{
						id: tIndex,
						cells:
										{
										'row-id':
														{
														readonly: true,
														value: tIndex
														},
										'personal-name':
														{
														value: (spin === 2 ? 'Rincewind' : spin === 1 ? 'Ponder Stibbons' : 'Hrun the Barbarian')
														},
										'personal-email':
														{
														value: (spin === 2 ? 'wizzard@whatsock.com' : spin === 1 ? 'ponder@whatsock.com' : 'aarg@whatsock.com')
														},
										'personal-city':
														{
														value: 'Ankh-Morpork'
														},
										'personal-university':
														{
														value: (spin === 2 || spin === 1 ? 'Unseen University' : 'Gruntings')
														},
										'personal-status':
														{
														type: 'toggle',
														name: 'Active',
														value: (spin === 2 ? false : true)
														}
										}
						});

		if (!spin)
			spin = 2;

		else
			spin -= 1;

		if (tIndex == 10)
			// Render the first page and load all other records in the background
			grid.openPage(1);
	}

	// Set pagination bindings
	$A.bind('button.paginate', 'click', function(ev){
		var o = this, open = false;

		if (o.id == 'btnFirst' && pageCurrent > 1){
			grid.firstPage();
			open = true;
		}

		else if (o.id == 'btnPrev' && pageCurrent > 1){
			grid.prevPage();
			open = true;
		}

		else if (o.id == 'btnNext' && pageCurrent < pageTotal){
			grid.nextPage();
			open = true;
		}

		else if (o.id == 'btnLast' && pageCurrent < pageTotal){
			grid.lastPage();
			open = true;
		}

		else if (o.id == 'btnGo'){
			var val = Math.floor(pageEdit.value);

			if (val > 0 && val <= pageTotal && val !== pageCurrent){
				grid.openPage(val);
				open = true;
			}

			else
				pageEdit.value = pageCurrent;
		}

		if (open){
			$A.announce('Page ' + pageCurrent);
			grid.focus();
		}
		ev.preventDefault();
	});
	$A.bind(pageEdit, 'keydown', function(ev){
		var k = ev.which || ev.keyCode;

		if (k == 13){
			$A.trigger('#btnGo', 'click');
			ev.preventDefault();
		}
	});

	var formatStr = function(s, q){
		var str = '';

		if (typeof s === 'number')
			str = s.toString();

		else
			str = s;

		var i = str.length, aRet = [];

		while (i--){
			var iC = str[i].charCodeAt();

			if (str[i] != "\n" && (iC < 65 || iC > 127 || (iC > 90 && iC < 97)))
				aRet[i] = '&#' + iC + ';';

			else
				aRet[i] = str[i];
		}

		return aRet.join('');
	};
});