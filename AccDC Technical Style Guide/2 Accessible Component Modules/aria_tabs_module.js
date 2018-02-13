/*!
ARIA Tabs Module R1.14
Copyright 2010-2018 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.setTabs = function(selector, overrides, useARIA, context, callback){
		var tabIds = [], wheel = [], autoStartId = '', overrides = overrides || {}, context = context || document,
			tabs = $A.query(selector, context, function(i, o){
			if ($A.reg[o.id]){
				var tdc = $A.reg[o.id];

				if (tdc.fn.sraCSSObj)
					tdc.fn.sraCSSObj.parentNode.removeChild(tdc.fn.sraCSSObj);
				tdc.returnFocus = false;
				tdc.close();
				tdc.returnFocus = true;
			}

			var id = o.id || $A.genId(), ovrs = {}, isInternal = $A.getAttr(o, 'data-internal');
			ovrs.id = id;
			ovrs.role = $A.getAttr(o, 'data-role') || 'Tab';
			ovrs.autoStart = $A.getAttr(o, 'data-defaultopen') ? true : false;

			if (ovrs.autoStart)
				autoStartId = i;
			ovrs.trigger = o;
			ovrs.mode = typeof overrides.mode === 'number' ? overrides.mode : (overrides.preload ? 0 : 1);
			ovrs.source = isInternal ? (function(){
				var g = $A.getEl(isInternal);

				if (g)
					return g.parentNode.removeChild(g);

				else
					return $A.reg[o.id] && $A.reg[o.id].source;
			})() : (function(){
				var d = $A.createEl('div'), s = $A.getAttr(o, 'data-src');
				s = s.replace('#', ' #');

				if (overrides.preload){
					$A.load(d, s, function(){
						if (overrides.preloadImages){
							if (!$A.getEl(imgLoaderId)){
								document.body.appendChild($A.createEl('div',
												{
												id: imgLoaderId
												}, $A.sraCSS));
							}

							overrides.imgLoader = $A.getEl(imgLoaderId);
							$A.query('img', d, function(i, o){
								if (o.src && $A.query('img[src="' + o.src + '"]', overrides.imgLoader).length < 1){
									overrides.imgLoader.appendChild($A.createEl('img',
													{
													src: o.src,
													alt: ''
													}));
								}
							});
						}
					});

					return d;
				}

				else
					return s;
			})();
			ovrs.isStatic = '#' + $A.getAttr(o, 'data-insert');
			ovrs.showHiddenBounds = overrides.showHiddenBounds || false;
			ovrs.showHiddenClose = overrides.showHiddenClose || false;
			ovrs.bind = 'click';
			ovrs.ariaLevel = $A.getAttr(o, 'data-headinglvl') || overrides.ariaLevel || 3;
			ovrs.isTab = useARIA ? false : true;
			ovrs.tabRole = useARIA ? '' : (overrides.tabRole || 'Tab');
			ovrs.tabState = useARIA ? '' : (overrides.tabState || 'Selected');
			ovrs.toggleClass = overrides.toggleClass || 'active';
			ovrs.allowCascade = true;
			ovrs.runDuring = function(dc){
				if (useARIA){
					$A.setAttr(dc.triggerObj, 'aria-controls', dc.accDCObjId);
					$A.setAttr(dc.accDCObj,
									{
									role: 'tabpanel',
									tabindex: overrides.disableTabPanelFocus ? -1 : '0',
									'aria-labelledby': $A.getAttr(dc.triggerObj, 'id'),
									'aria-describedby': dc.containerDivId
									});
				}
			};

			ovrs.runAfter = function(dc){
				$A.query(selector, context, function(j, p){
					$A.remClass(p, dc.toggleClass);

					if (useARIA)
						$A.setAttr(p,
										{
										'aria-expanded': p == dc.triggerObj ? 'true' : 'false',
										'aria-selected': p == dc.triggerObj ? 'true' : 'false'
										});
				});

				$A.addClass(dc.triggerObj, dc.toggleClass);

				if (callback && typeof callback === 'function')
					callback.apply(dc.triggerObj, [dc]);
			};
			ovrs.runAfterClose = function(dc){
				$A.query(selector, context, function(j, p){
					$A.remClass(p, dc.toggleClass);

					if (useARIA)
						$A.setAttr(p,
										{
										'aria-selected': 'false',
										'aria-expanded': 'false'
										});
				});
			};

			wheel.push(ovrs);
			tabIds.push(id);
		});

		if (useARIA){
			setClosest(tabs[0], tabIds.join(' '));
			createARIATabs(selector, context, autoStartId);
		}

		else
			checkTabs(selector, context);
		$A(wheel, overrides);
		return tabIds;
	};

	var createARIATabs = function(selector, context, start){
		var cur = null, index = start || 0, setFocus = function(s){
			var i = $A.inArray(this, tabs);

			if (i !== -1)
				index = i;

			if (cur){
				$A.setAttr(cur,
								{
								tabindex: '-1'
								});
			}

			cur = this;
			$A.setAttr(cur,
							{
							tabindex: '0'
							});

			if (!s)
				cur.focus();
		}, xItems = [], move = function(l){
			for (var i = index + 1; i <= (tabs.length - 1); i++){
				if (l.toLowerCase() == xItems[i].replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
					index = i;
					setFocus.apply(tabs[index]);
					return;
				}
			}

			for (var i = 0; i < index; i++){
				if (l.toLowerCase() == xItems[i].replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
					index = i;
					setFocus.apply(tabs[index]);
					return;
				}
			}
		}, tabs = $A.query(selector, context, function(z){
			xItems.push($A.getText(this));

			$A.setAttr(this,
							{
							tabindex: '-1',
							'aria-posinset': z + 1,
							'aria-expanded': 'false',
							'aria-selected': 'false',
							'aria-label': $A.getText(this)
							});

			$A.unbind(this, 'click keydown');

			$A.bind(this,
							{
							click: function(ev){
								setFocus.apply(this, [true]);
								ev.preventDefault();
							},
							keydown: function(ev){
								var k = ev.which || ev.keyCode;

								// 37 left, 38 up, 39 right, 40 down, 35 end, 36 home
								if (k >= 35 && k <= 40 && !ev.altKey){
									if (k == 37 || k == 38)
										index = index === 0 ? tabs.length - 1 : index - 1;

									else if (k == 39 || k == 40)
										index = index === tabs.length - 1 ? 0 : index + 1;

									else if (k == 35)
										index = tabs.length - 1;

									else if (k == 36)
										index = 0;

									setFocus.apply(tabs[index]);
									ev.stopPropagation();
									ev.preventDefault();
								}

								else if ((k == 13 || k == 32) && !ev.altKey){
									$A.trigger(tabs[index], 'click');
									ev.stopPropagation();
									ev.preventDefault();
								}

								else if (((k >= 48 && k <= 57) || (k >= 65 && k <= 90)) && !ev.altKey){
									move(String.fromCharCode(k));
									ev.stopPropagation();
									ev.preventDefault();
								}
							}
							});
		});

		$A.query(tabs, function(i, o){
			$A.setAttr(o, 'aria-setsize', tabs.length);
		});

		if (tabs.length){
			cur = tabs[0];
			$A.setAttr(cur, 'tabindex', 0);
		}
	}, checkTabs = function(selector, context){
		$A.query(selector, context, function(i, o){
			var tn = o.nodeName.toLowerCase();

			if (tn != 'a' && tn != 'button'){
				$A.setAttr(o,
								{
								role: 'link',
								tabindex: '0'
								});

				$A.unbind(o, 'keydown');

				$A.bind(o, 'keydown', function(ev){
					var k = ev.which || ev.keyCode;

					if (k == 13){
						$A.trigger(o, 'click');
						ev.stopPropagation();
						ev.preventDefault();
					}
				});
			}
		});
	}, imgLoaderId = 'i' + $A.genId(), setClosest = function(start, owns){
		var i = 0;

		while (start){
			start = start.parentNode;

			if (start && i > 0 && $A.getAttr(start, 'role') == 'tablist'){
				$A.setAttr(start, 'aria-owns', owns);
				return;
			}
			i++;
		}
	};
})();