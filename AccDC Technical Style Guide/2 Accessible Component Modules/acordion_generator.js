/*!
Accordion Generator Module R2.6
Copyright 2010-2016 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.generateAccordion = function(selector, overrides, context, callback, isAria){
		var accordionIds = [], wheel = [], context = context || document,
			accordions = $A.query(selector, context, function(i, o){

			var isBtn = $A.getAttr(o, 'role') == 'button' || o.nodeName.toLowerCase() == 'button' ? true : false, isLnk =
				$A.getAttr(o, 'role') == 'link' || (o.nodeName.toLowerCase() == 'a' && $A.getAttr(o, 'href')) ? true : false;

			if (!isAria && (isBtn || isLnk))
				isAria = true;

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
			ovrs.role = $A.getAttr(o, 'data-role') || 'Accordion';
			ovrs.autoStart = $A.getAttr(o, 'data-defaultopen') ? true : false;
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
			ovrs.bind = 'click';
			ovrs.isTab = true;
			ovrs.tabRole = isAria ? '' : (overrides.accordionRole || 'Accordion');
			ovrs.tabState = isAria ? '' : (overrides.accordionState || 'Expanded');
			ovrs.toggleClass = overrides.toggleClass || 'open';
			ovrs.isToggle = typeof overrides.isToggle === 'boolean' ? overrides.isToggle : true;
			ovrs.allowCascade = true;
			ovrs.runDuring = function(dc){
				$A.setAttr(dc.accDCObj,
								{
								role: 'region',
								'aria-labelledby': $A.getAttr(dc.triggerObj, 'id')
								});

				$A.setAttr(dc.triggerObj, 'aria-controls', dc.accDCObjId);
			};
			ovrs.runAfter = function(dc){
				$A.addClass(dc.triggerObj, dc.toggleClass);

				if (isAria)
					$A.setAttr(dc.triggerObj, isBtn ?
									{
									'aria-pressed': 'true',
									'aria-expanded': 'true'
									} : (isLnk ?
									{
									'aria-expanded': 'true'
									} : {}));

				if (callback && typeof callback === 'function')
					callback.apply(dc.triggerObj, [dc]);
			};
			ovrs.runAfterClose = function(dc){
				$A.remClass(dc.triggerObj, dc.toggleClass);

				if (isAria)
					$A.setAttr(dc.triggerObj, isBtn ?
									{
									'aria-pressed': 'false',
									'aria-expanded': 'false'
									} : (isLnk ?
									{
									'aria-expanded': 'false'
									} : {}));

				if (callback && typeof callback === 'function')
					callback.apply(dc.triggerObj, [dc]);
			};

			$A.setAttr(o,
							{
							tabindex: '0'
							});

			// Ensure keyboard accessibility for non-active elements such as Divs, Spans, and A tags with no href attribute
			$A.bind(o, 'keydown', function(ev){
				var k = ev.which || ev.keyCode;

				if (k == 13 || k == 32){
					$A.trigger(o, 'click');
					ev.preventDefault();
				}
			});

			if (isAria)
				$A.setAttr(o, isBtn ?
								{
								'aria-pressed': 'false',
								'aria-expanded': 'false'
								} : (isLnk ?
								{
								'aria-expanded': 'false'
								} : {}));

			wheel.push(ovrs);
			accordionIds.push(id);
		});

		$A(wheel, overrides);
		return accordionIds;
	};

	var imgLoaderId = 'i' + $A.genId();
})();