$A.bind(window, 'load', function(){

	var createMenuIcon = function(lbl, triggerObj, descId){
// Create a menu icon for touch screen devices to ensure accessibility for screen reader users, must have a textual label, and a triggerObj to be bound to.
		if (!lbl || !triggerObj)
			return;

		var a = $A.createEl('a',
						{
						role: 'button',
						href: '#',
						'aria-label': lbl,
						'aria-describedby': descId
						},
						{
						position: 'absolute'
						}, 'menu-icon', $A.createEl('span'));

		$A.bind(a,
						{
						click: function(ev){
							ev.stopPropagation();
							ev.preventDefault();
							$A.trigger(triggerObj, 'popupmenu');
						}
						});
		return a;
	};

	// Configure menu functionality

	$A.setMenu('#page1edit, #page2edit', 'hiddenDivId', 'context-menu', function(ev, dc){

		// Ignore menu item nodes that include aria-disabled="true" when clicked
		if ($A.getAttr(this, 'aria-disabled') == 'true')
			return false;

		else
			alert('Do something with this.href or id="' + this.id + '"');

		// dc.top.triggerObj is the right clicked edit field DOM node
		alert(dc.top.triggerObj.id);
	}, true, document,
					{

					// Enable right click functionality
					// Automatically configures keyboard support using Shift+F10 and the Applications key
					rightClick: true,

					// Set the accessible help description that will be announced for screen reader users
					rightClickText: 'Press Shift+F10 or the Applications key to open the popup menu',

					// Specify the menu tag name in the markup
					menuTag: 'ol',

					// Specify the active element that will be used as each menu item node
					// Important, if nesting A tags within LIs, only the A tag should be used for this purpose
					// Active elements should never be nested.
					// The following tag will receive keyboard focus within the menu structure when using the arrow keys to navigate
					// Event bindings are also tied to this tag
					itemTag: 'a',

					// Disable auto positioning for submenus
					autoPosition: 0,

					// Set AccDC API overrides to customize functionality
					overrides:
									{

									// Set inline styling that will be included within each menu instance
									// z-index is automatically incremented using +=1 for proper layering
									cssObj:
													{
													position: 'absolute',
													zIndex: 1
													},

									// Run script while each menu is rendering, occurs before DOM insertion
									runDuring: function(dc){
										// Set specific styling for the parent Div if this is the top level menu instance
										// Set initial positioning before DOM insertion to prevent screen flicker from occuring
										if (dc.top == dc){
											dc.top.css(
															{
															top: $A.xOffset(dc.top.triggerObj).top + 50,
															left: $A.xOffset(dc.top.triggerObj).left + (dc.top.triggerObj.offsetWidth * 0.4)
															});
										}

										else{
											// Otherwise, set the container styling that is applied to all submenu instances
											// In this case, dc.triggerObj references the parent menu triggering element
											if (dc.triggerObj)
												dc.css(
																{
																'margin-left': (dc.triggerObj.offsetWidth / 2) + 'px',
																'margin-top': -(dc.triggerObj.offsetHeight / 2) + 'px'
																});
										}
									},

									// Run script after each menu finishes rendering
									runAfter: function(dc){
									// Do other stuff after the menu finishes rendering
									}
									}
					});

	// Create a clickable hamburger icon for touch screen device users, and bind one for each triggering element
	if ('ontouchstart' in window){
		$A.query('#page1edit, #page2edit', document, function(i, tgr){
			var mI = createMenuIcon('Open Menu', tgr,
				$A.setAttr($A.query('label[for="' + tgr.id + '"]')[0], 'id', 'd' + $A.genId()).id), position = function(){
				$A.css(mI,
								{
								left: $A.xOffset(tgr).left + tgr.offsetWidth + 3,
								top: $A.xOffset(tgr).top
								});
			};

			position();
			tgr.parentNode.appendChild(mI);
			$A.bind(window, 'resize', position);
		});
	}
});