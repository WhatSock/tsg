/*!
ARIA Menu Module R2.14
Copyright 2010-2017 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

(function(){
	var track = {}, trapCM = null, trapC = null;

	$A.setMenu = function(trigger, path, topLvlId, callback, isInternal, context, config){
		var bfr = isInternal ? $A.getEl(path) : $A.createEl('div'), handler = callback || function(){}, config = config || {},

		// Declare a recursive function for setting up submenus
		runAfter = function(dc){
			if (dc.triggerObj && dc != dc.top)
				$A.setAttr(dc.triggerObj, 'aria-expanded', 'true');

			trapC.menuOpen = true;
			trapC.currentMenu = dc.top;

			if ('ontouchstart' in window){
				$A.bind(dc.accDCObj, 'touchstart', function(ev){
					trapC.pass = true;
				});
			}

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
								bind: 'popupsubmenu',
								isTab: true,
								tabRole: '',
								tabState: '',
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

									if (dc.showHiddenBounds){
										dc.fn.sraStart.innerHTML = dc.fn.sraEnd.innerHTML = '';
										$A.setAttr(dc.fn.sraStart, 'aria-hidden', 'true');
										$A.setAttr(dc.fn.sraEnd, 'aria-hidden', 'true');
									}
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
				$A.setAttr(o,
								{
								'aria-haspopup': 'true',
								'aria-expanded': 'false'
								});

				if ($A.reg[dc.id + o.id]){
					var tdc = $A.reg[dc.id + o.id];

					if (tdc.fn.sraCSSObj)
						tdc.fn.sraCSSObj.parentNode.removeChild(tdc.fn.sraCSSObj);
					tdc.returnFocus = false;
					tdc.close();
					tdc.returnFocus = true;
				}

				ids.push(o.id);
			});
			$A(dc, subMenuObjects, config.overrides);
			$A.query(((config.menuTag || 'ul') + '.' + (config.menuClass || 'menu') + ' ' + (config.itemTag || 'li')) + '.'
				+ (config.linkClass || 'link'), dc.containerDiv, function(i, o){

				var isSet = $A.internal.data(o, 'isset');

				if (!isSet){
					$A.internal.data(o, 'isset', true);

					$A.bind(o, 'menulink', function(ev){
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
				}
			});

			if (ids.length)
				$A.setAttr(dc.mNode, 'aria-owns', ids.join(' '));

// Check if this is a submenu, then remove the parent menu from the tab order to preserve one tab stop for the menu construct
			if (dc != dc.top && dc.parent && dc.parent.iNodes && dc.triggerObj)
				$A.setAttr(dc.triggerObj, 'tabindex', '-1');

			// Set bindings to handle when focus moves out of the menu
			if (dc == dc.top){
				$A.bind('body', 'focusin.accmenu', function(ev){
					if (dc.tempFocus)
						dc.tempFocus = null;

					else if (!('ontouchstart' in window))
						dc.top.close();
				});
				$A.bind(dc.accDCObj, 'focusin', function(ev){
					dc.tempFocus = this;
				});
			}
		},

		// Declare a recursive function for unbinding events
		runBeforeClose = function(dc){
			if (dc.triggerObj && dc != dc.top)
				$A.setAttr(dc.triggerObj, 'aria-expanded', 'false');

			if (dc.children.length){
				for (var i = 0; i < dc.children.length; i++)
								dc.children[i].close();
			}

			if (dc.iNodes && dc.iNodes.length)
				$A.unbind(dc.iNodes, 'click keydown popupsubmenu menulink');

			if (dc != dc.top && dc.parent && dc.parent.iNodes && dc.triggerObj)
				$A.setAttr(dc.triggerObj, 'tabindex', '0');

			if (dc == dc.top)
				$A.unbind('body', 'focusin.accmenu');
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
							accStart: config.accStart || '',
							accEnd: config.accEnd || '',
							controlType: 'MenuControl',
							bind: 'popupmenu',
							trigger: trigger,
							handler: handler,
							topLvlId: topLvlId,
							source: track[topLvlId],
							autoPosition: isNaN(config.autoPosition) ? 3 : config.autoPosition,
							isStatic: 'body',
							append: true,
							click: function(ev, dc){
								trapC.pass = true;
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

								if (dc.showHiddenBounds){
									dc.fn.sraStart.innerHTML = dc.fn.sraEnd.innerHTML = '';
									$A.setAttr(dc.fn.sraStart, 'aria-hidden', 'true');
									$A.setAttr(dc.fn.sraEnd, 'aria-hidden', 'true');
								}
							},
							runAfter: runAfter,
							mouseLeave: function(ev, dc){
								if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)){
									dc.close();
								}
							},
							runBeforeClose: runBeforeClose,
							runAfterClose: function(dc){
								trapC.menuOpen = false;
							},
							cssObj:
											{
											position: (config.overrides && config.overrides.cssObj && config.overrides.cssObj.position) || 'absolute',
											zIndex: (config.overrides && config.overrides.cssObj && config.overrides.cssObj.zIndex) || 1
											},
							className: config.containerClass || 'menu',
							ariaLevel: config.ariaLevel || 3,
							tabOut: function(ev, dc){
								if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)){
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

		if (config.rightClick && config.rightClickText
			&& !('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)){
			var rcId = 'rc' + $A.genId(), rcDesc = $A.createEl('div',
							{
							id: rcId,
							role: 'tooltip'
							},
							{
							display: 'none'
							});

			rcDesc.innerHTML = config.rightClickText;
			document.body.appendChild(rcDesc);
		}

		if (typeof trapC !== 'function'){
			trapC = function(ev){
				if (!trapC.pass && (!trapCM || !trapCM.pass) && trapC.menuOpen){
					if (trapC.currentMenu && trapC.currentMenu.id && trapC.currentMenu.loaded)
						trapC.currentMenu.close();
				}

				if (trapC)
					trapC.pass = false;

				if (trapCM)
					trapCM.pass = false;
			};
			trapC.menuOpen = trapC.pass = false;
			$A.bind(document, 'click touchstart', trapC);
		}

		if (config.rightClick && typeof trapCM !== 'function'){
			trapCM = function(ev){
				if (trapCM.pass){
					ev.preventDefault();
				}
				trapCM.pass = false;
			};
			trapCM.pass = false;
			$A.bind(document, 'contextmenu', trapCM);
		}

		$A.query(trigger, context, function(i, tgr){
			if (tgr.nodeName.toLowerCase() != 'body')
				$A.setAttr(tgr, 'aria-haspopup', 'true');

			if (rcId)
				addDescribedby(tgr, rcId);

			if (config.rightClick){

				$A.bind(tgr,
								{
								contextmenu: function(ev){
									ev.preventDefault();

									if (trapCM)
										trapCM.pass = true;
								},
								mouseup: function(ev){
									var btn = -1;

									if (ev.which == null)
										/* IE case */
										btn = (ev.button < 2) ? 1 : ((ev.button == 4) ? 3 : 2);

									else
										/* All others */
										btn = (ev.which < 2) ? 1 : ((ev.which == 2) ? 3 : 2);

									if (btn == 2){
										if (trapCM)
											trapCM.pass = true;

										if ($A.reg[topLvlId].loaded)
											$A.reg[topLvlId].close();

										else{
											$A.reg[topLvlId].event = ev;
											$A.trigger(tgr, 'popupmenu');
										}
										ev.preventDefault();
									}
								},
								keydown: function(ev){
									var k = ev.which || ev.keyCode;

									if (k == 93 || (ev.shiftKey && k == 121)){
										if (trapCM)
											trapCM.pass = true;
										$A.trigger(tgr, 'popupmenu');
										ev.preventDefault();
									}
								}
								});

				if ('ontouchstart' in window){
					var touched = 0, released = 0, longTouched = false;
					$A.bind(tgr,
									{
									touchstart: function(ev){
										touched = new Date().getTime() + 2000;
									},
									touchend: function(ev){
										released = new Date().getTime();

										if (released > touched){
											longTouched = true;
											ev.stopPropagation();
											ev.preventDefault();
											$A.trigger(tgr, 'popupmenu');
										}

										else
											longTouched = false;
									},
									click: function(ev){
										if (longTouched){
											longTouched = false;
											ev.stopPropagation();
											ev.preventDefault();
										}
									}
									});
				}
			}

			else{

				$A.bind(tgr,
								{
								keydown: function(ev){
									var k = ev.which || ev.keyCode;

									if (k == 40 || k == 13 || k == 32){
										$A.trigger(tgr, 'popupmenu');
										ev.stopPropagation();
										ev.preventDefault();
									}
								},
								click: function(ev){
									trapC.pass = true;

									if ($A.reg[topLvlId].loaded)
										$A.reg[topLvlId].close();

									else
										$A.trigger(tgr, 'popupmenu');
									ev.preventDefault();
								}
								});
			}

			$A.bind(tgr,
							{
							closepopupmenu: function(ev){
								if ($A.reg[topLvlId].loaded)
									$A.reg[topLvlId].close();
							}
							});
		});
	};

	var createMenu = function(parent, children, dc, config){
		var index = 0, xItems = [], move = function(l){
			for (var i = index + 1; i <= (items.length - 1); i++){
				if (l.toLowerCase() == xItems[i].replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
					index = i;
					setFocus.apply(items[index]);
					return;
				}
			}

			for (var i = 0; i < index; i++){
				if (l.toLowerCase() == xItems[i].replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
					index = i;
					setFocus.apply(items[index]);
					return;
				}
			}
		};
		$A.query(parent, dc.containerDiv, function(i, o){
			$A.setAttr(o, 'role', dc.hor ? 'menubar' : 'menu');
		});

		var setFocus = function(){
			var l = this;

			for (var j = items.length - 1; j >= 0; j--){
				if (items[j].id == l.id)
					index = j;
				$A.setAttr(items[j],
								{
								tabindex: -1
								});
			}

			$A.setAttr(l,
							{
							tabindex: '0'
							}).focus();
		}, items = dc.iNodes = $A.query(children, dc.containerDiv, function(i, o){
			xItems.push($A.getText(o));

			$A.setAttr(o,
							{
							role: 'menuitem',
							'aria-posinset': i + 1,
							tabindex: -1
							});

			$A.bind(o,
							{
							keydown: function(ev){
								var k = ev.which || ev.keyCode;

								// 13 enter, 27 escape
								if (k == 27){
									dc.close();
									ev.stopPropagation();
									ev.preventDefault();
								}

								else if (k == 13){
									if ($A.hasClass(this, config.folderClass || 'submenu')){
										if ($A.getAttr(this, 'aria-disabled') != 'true')
											$A.trigger(this, 'popupsubmenu');

										else
											dc.top.close();
									}

									else
										$A.trigger(this, 'menulink');
									ev.stopPropagation();
									ev.preventDefault();
								}

								// 37 left, 38 up, 39 right, 40 down
								else if (k >= 37 && k <= 40){
									ev.preventDefault();
									ev.stopPropagation();

									if (dc != dc.top && ((k == 37 && !dc.hor) || (k == 38 && dc.hor)))
										dc.close();

									else if ((k == 39 && !dc.hor) || (k == 40 && dc.hor)){
										if ($A.hasClass(this, config.folderClass || 'submenu') && $A.getAttr(this, 'aria-disabled') != 'true')
											$A.trigger(this, 'popupsubmenu');
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

								else if ((k >= 48 && k <= 57) || (k >= 65 && k <= 90)){
									move(String.fromCharCode(k));
									ev.stopPropagation();
									ev.preventDefault();
								}
							},
							click: function(ev){
								if ($A.hasClass(this, config.folderClass || 'submenu')){
									if ($A.getAttr(this, 'aria-disabled') != 'true')
										$A.trigger(this, 'popupsubmenu');

									else
										dc.top.close();
								}

								else
									$A.trigger(this, 'menulink');
								ev.preventDefault();
							}
							});
		});
		$A.query(items, function(i, o){
			$A.setAttr(o, 'aria-setsize', items.length);
		});
		setFocus.apply(items[index]);
	}, trim = function(str){
		return str.replace(/^\s+|\s+$/g, '');
	}, addDescribedby = function(obj, cn){
		if (!obj)
			return null;
		var o = $A.isArray(obj) ? obj : [obj], names = cn.split(' ');

		for (var i = 0; i < o.length; i++){
			for (var n = 0; n < names.length; n++){
				if (!hasDescribedby(o[i], names[n])){
					var l = $A.getAttr(o[i], 'aria-describedby');

					if (!l)
						l = '';
					$A.setAttr(o[i], 'aria-describedby', trim(l + ' ' + names[n]));
				}
			}
		}
		return obj;
	}, hasDescribedby = function(obj, cn){
		var l = $A.getAttr(obj, 'aria-describedby');

		if (!obj || !l)
			return false;

		var names = cn.split(' '), i = 0;

		for (var n = 0; n < names.length; n++){
			if (l.indexOf(names[n]) !== -1)
				i += 1;
		}

		if (i === names.length)
			return true;
		return false;
	};

	$A.bind(window, 'resize', function(){
		$A.find('*', function(dc){
			if (dc.controlType && dc.controlType == 'MenuControl' && dc.loaded){
				dc.close();
			}
		});
	});
})();