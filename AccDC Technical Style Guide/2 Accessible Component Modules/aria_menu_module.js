/*!
ARIA Menu Module R2.2
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

(function(){
	var track = {};

	$A.setMenu = function(trigger, path, topLvlId, callback, isInternal, context, config){
		var bfr = isInternal ? $A.getEl(path) : $A.createEl('div'), handler = callback || function(){}, config = config || {},

		// Declare a recursive function for setting up submenus
		runAfter = function(dc){
			dc.mNode = $A.query((config.menuTag || 'ul') + '.' + (config.menuClass || 'menu'), dc.containerDiv)[0], ids = [];
			var offsetLeft = parseInt($A.getAttr(dc.mNode, 'data-offsetleft')),
				offsetTop = parseInt($A.getAttr(dc.mNode, 'data-offsettop')), redraw = false,
				hor = $A.getAttr(dc.mNode, 'data-horizontal'), autoPosition = parseInt($A.getAttr(dc.mNode, 'data-autoposition'));

			if (!hor)
				hor = config.horizontal ? 'true' : 'false';
			dc.hor = hor === 'true' ? true : false;

			if (!isNaN(offsetLeft)){
				dc.offsetLeft += offsetLeft;
				redraw = true;
			}

			if (!isNaN(offsetTop)){
				dc.offsetTop += offsetTop;
				redraw = true;
			}

			if (!isNaN(autoPosition)){
				dc.autoPosition = autoPosition;
				redraw = true;
			}

			if (redraw)
				dc.setPosition();
			createMenu((config.menuTag || 'ul') + '.' + (config.menuClass || 'menu'), (config.menuTag || 'ul') + '.'
				+ (config.menuClass || 'menu') + ' ' + (config.itemTag || 'li'), dc, config);
			var subMenuObjects = [];
			$A.query(((config.menuTag || 'ul') + '.' + (config.menuClass || 'menu') + ' ' + (config.itemTag || 'li')) + '.'
				+ (config.folderClass || 'submenu'), dc.containerDiv, function(i, o){
				subMenuObjects.push(
								{
								id: dc.id + o.id,
								role: dc.role,
								accStart: dc.accStart,
								accEnd: dc.accEnd,
								bind: 'click',
								isTab: true,
								tabRole: '',
								tabState: config.openState || 'Open',
								trigger: o,
								handler: handler,
								topLvlId: dc.topLvlId + o.id,
								source: track[dc.topLvlId + o.id],
								autoPosition: isNaN(config.autoPosition) ? 3 : config.autoPosition,
								runBefore: function(dc){
									// Configure relative spatial positioning
									dc.offsetLeft = typeof config.offsetLeft === 'number'
										? config.offsetLeft : ( typeof config.offsetLeft === 'function'
											? config.offsetLeft(dc) : (!config.horizontal && dc.parent ? -(dc.parent.accDCObj.offsetWidth / 2) : 0));
									dc.offsetTop = typeof config.offsetTop === 'number'
										? config.offsetTop : ( typeof config.offsetTop === 'function'
											? config.offsetTop(dc) : (!config.horizontal ? -dc.triggerObj.offsetHeight : 0));
								},
								runDuring: function(dc){
									$A.setAttr(dc.accDCObj, 'role', 'application');
								},
								runAfter: runAfter,
								runBeforeClose: runBeforeClose,
								cssObj:
												{
												position: (config.overrides && config.overrides.cssObj && config.overrides.cssObj.position) || 'relative',
												zIndex: dc.cssObj.zIndex + 1
												},
								// Set a general className for each menu container
								className: config.containerClass || 'menu',
								ariaLevel: dc.ariaLevel + 1,
								tabOut: dc.tabOut,
								allowCascade: true
								});
				$A.setAttr(o, 'aria-haspopup', 'true');

				if ($A.reg[dc.id + o.id]){
					var tdc = $A.reg[dc.id + o.id];

					if (tdc.fn.sraCSSObj)
						tdc.fn.sraCSSObj.parentNode.removeChild(tdc.fn.sraCSSObj);
					tdc.returnFocus = false;
					tdc.close();
					tdc.returnFocus = true;
				}
				// if (o.parentNode != dc.mNode)
				ids.push(o.id);
			});
			$A(dc, subMenuObjects, config.overrides);
			$A.query(((config.menuTag || 'ul') + '.' + (config.menuClass || 'menu') + ' ' + (config.itemTag || 'li')) + '.'
				+ (config.linkClass || 'link'), dc.containerDiv, function(i, o){
				$A.bind(o, 'click', function(ev){
					dc.top.close();

					if (dc.handler && typeof dc.handler === 'function')
						return dc.handler.apply(this,
										[
										ev,
										dc
										]);
				});

				// if (o.parentNode != dc.mNode)
				ids.push(o.id);
			});

			if (ids.length)
				$A.setAttr(dc.mNode, 'aria-owns', ids.join(' '));
		},

		// Declare a recursive function for unbinding events
		runBeforeClose = function(dc){
			if (dc.children.length){
				for (var i = 0; i < dc.children.length; i++)
								dc.children[i].close();
			}

			if (dc.iNodes && dc.iNodes.length)
				$A.unbind(dc.iNodes, 'click keypress keydown');
		},

		// Parse menu constructs
		postLoad = function(){
			$A.query((config.menuTag || 'ul') + '.' + (config.menuClass || 'menu'), bfr, function(i, o){
				track[o.id] = o.parentNode.removeChild(o) || track[o.id];
			});

			if ($A.reg[topLvlId]){
				var tdc = $A.reg[topLvlId];

				if (tdc.fn.sraCSSObj)
					tdc.fn.sraCSSObj.parentNode.removeChild(tdc.fn.sraCSSObj);
				tdc.returnFocus = false;
				tdc.close();
				tdc.returnFocus = true;
			}

			$A(
							[
							{
							id: topLvlId,
							role: config.role || 'Menu',
							accStart: config.accStart || 'Start',
							accEnd: config.accEnd || 'End',
							controlType: 'MenuControl',
							bind: 'click',
							isToggle: true,
							toggleRole: '',
							toggleState: config.openState || 'Open',
							trigger: trigger,
							handler: handler,
							topLvlId: topLvlId,
							source: track[topLvlId],
							autoPosition: isNaN(config.autoPosition) ? 3 : config.autoPosition,
							runOnceBefore: function(dc){
								$A.bind(dc.triggerObj, 'focus', function(ev){
									if (dc.loaded && !("ontouchstart" in window))
										dc.close();
								});
							},
							runBefore: function(dc){
								// Close all previously opened menus
								$A.find('*', function(dc){
									if (dc.controlType && dc.controlType == 'MenuControl' && dc.loaded)
										dc.close();
								});
								// Configure relative spatial positioning
								dc.offsetLeft = typeof config.offsetLeft === 'number'
									? config.offsetLeft : ( typeof config.offsetLeft === 'function'
										? config.offsetLeft(dc) : (!config.horizontal && dc.parent ? -(dc.parent.accDCObj.offsetWidth / 2) : 0));
								dc.offsetTop = typeof config.offsetTop === 'number'
									? config.offsetTop : ( typeof config.offsetTop === 'function'
										? config.offsetTop(dc) : (!config.horizontal ? -dc.triggerObj.offsetHeight : 0));
							},
							runDuring: function(dc){
								$A.setAttr(dc.accDCObj, 'role', 'application');
							},
							runAfter: runAfter,
							runBeforeClose: runBeforeClose,
							cssObj:
											{
											position: (config.overrides && config.overrides.cssObj && config.overrides.cssObj.position) || 'absolute',
											zIndex: (config.overrides && config.overrides.cssObj && config.overrides.cssObj.zIndex) || 1
											},
							className: config.containerClass || 'menu',
							ariaLevel: config.ariaLevel || 3,
							tabOut: function(ev, dc){
								if (!("ontouchstart" in window)){
									dc.top.close();
								}
							},
							allowCascade: true
							}
							], config.overrides, true);
		};

		// If isInternal is set, parse bfr instantly
		if (isInternal)
			postLoad();

		// Otherwise preload HTML markup using lazy loading
		else
			$A.load(bfr, path, postLoad);
		$A.setAttr($A.query(trigger, context)[0], 'aria-haspopup', 'true');
	};

	var createMenu = function(parent, children, dc, config){
		var index = 0;
		$A.query(parent, dc.containerDiv, function(i, o){
			$A.setAttr(o, 'role', 'menu');
		});

		var setFocus = function(){
			var l = this;

			for (var j = items.length - 1; j >= 0; j--){
				if (items[j].id == l.id)
					index = j;
				$A.setAttr(items[j],
								{
								tabindex: -1,
								'aria-selected': 'false'
								});
			}

			$A.setAttr(l,
							{
							tabindex: '0',
							'aria-selected': 'true'
							}).focus();
		}, items = dc.iNodes = $A.query(children, dc.containerDiv, function(i, o){
			$A.setAttr(o,
							{
							role: 'menuitem',
							'aria-posinset': i + 1,
							tabindex: -1
							});

			$A.bind(o,
							{
							keypress: function(ev){
								var k = ev.which || ev.keyCode;

								// 13 enter, 27 escape
								if (k == 27){
									dc.close();
									ev.preventDefault();
								}

								else if (k == 13){
									$A.trigger(this, 'click');
									ev.preventDefault();
								}
							},
							keydown: function(ev){
								var k = ev.which || ev.keyCode;

								// 37 left, 38 up, 39 right, 40 down
								if (k >= 37 && k <= 40){
									ev.preventDefault();

									if (dc != dc.top && ((k == 37 && !dc.hor) || (k == 38 && dc.hor)))
										dc.close();

									else if ((k == 39 && !dc.hor) || (k == 40 && dc.hor)){
										if ($A.hasClass(this, config.folderClass || 'submenu'))
											$A.trigger(this, 'click');
									}

									else if ((k == 38 && !dc.hor) || (k == 37 && dc.hor))
										index = index <= 0 ? items.length - 1 : index - 1;

									else if ((k == 40 && !dc.hor) || (k == 39 && dc.hor))
										index = index >= (items.length - 1) ? 0 : index + 1;

									if (((k == 38 || k == 40) && !dc.hor) || ((k == 37 || k == 39) && dc.hor)){
										if (!items[index] || items[index].nodeType !== 1)
											index = 0;

										if (items.length)
											setFocus.apply(items[index]);
									}
								}
							}
							});
		});
		$A.query(items, function(i, o){
			$A.setAttr(o, 'aria-setsize', items.length);
		});
		setFocus.apply(items[index]);
	};

	$A.bind(window, 'resize', function(){
		$A.find('*', function(dc){
			if (dc.controlType && dc.controlType == 'MenuControl' && dc.loaded){
				dc.close();
			}
		});
	});
})();