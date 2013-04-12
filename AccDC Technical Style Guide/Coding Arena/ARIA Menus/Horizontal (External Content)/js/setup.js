$A.bind(window, 'load', function(){

	// Configure menu functionality

	$A.setMenu('a.menu2', 'files/menus.html', 'menu-options2', function(ev, dc){
		alert('Do something with this.href or id="' + this.id + '"');
	}, false, document,
					{
					role: 'Menu',
					accStart: 'Start',
					accEnd: 'End',
					openState: 'Open',
					ariaLevel: 3,
					containerClass: 'foMenu',
					menuTag: 'ul',
					menuClass: 'menu2',
					itemTag: 'a',
					folderClass: 'submenu2',
					linkClass: 'link2',
					horizontal: true,

					// 0 = don't apply forced autoPositioning
					autoPosition: 0,
					offsetLeft: function(dc){
						return 0;
					},
					offsetTop: function(dc){
						return 0;
					},
					overrides:
									{
									cssObj:
													{
// Change the default relative positioning of menus and submenus to absolute for the positioning calculation
													position: 'absolute',
													zIndex: 1
													}
									// Additional AccDC API properties and methods can be applied here.
									}
					});
});