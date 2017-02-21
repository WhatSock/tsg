/*!
Tooltip Module R1.4
Copyright 2010-2017 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.setTooltip = function(overrides){
		if (overrides && !overrides.id)
			overrides.id = $A.genId();

		// Preload external content to prevent rendering delays
		// This can be overridden by setting mode to 0 or greater in the overrides argument
		if (typeof overrides.mode !== 'number')
			overrides.source = (function(){
				var d = $A.createEl('div');
				$A.load(d, overrides.source);
				return d;
			})();

		// Tooltip AccDC Object declaration
		$A([overrides],
						{
						role: 'tooltip',
						bind: 'opentooltip',
						returnFocus: false,
						showHiddenBounds: false,
						// Position the AccDC Object to the right of the triggering element
						autoPosition: 3,
						// Set a positive offset to move the AccDC Object 10px to the right
						offsetLeft: 10,
						cssObj:
										{
										position: 'absolute'
										},
						allowCascade: true,
						runDuring: function(dc){
							$A.setAttr(dc.accDCObj,
											{
											role: 'region',
											'aria-label': dc.role
											});

							$A.setAttr(dc.containerDiv,
											{
											tabindex: -1,
											role: 'tooltip'
											});
						},
						runAfter: function(dc){
							$A.setAttr(dc.triggerObj,
											{
											'aria-describedby': dc.containerDivId
											});
						},
						runAfterClose: function(dc){
							$A.remAttr($A.setAttr(dc.triggerObj, 'aria-describedby', ''), 'aria-describedby');
						},
						className: 'tooltip'
						});

		var dc = $A.reg[overrides.id];

		if (overrides.trigger){
			if (!dc.wait)
				dc.wait = 0;
			var waiting = false, wTo = null;
			$A.bind(overrides.trigger,
							{
							closetooltip: function(ev){
								dc.close();
							},
							'mouseover focusin': function(ev){
								if (!waiting){
									waiting = true;
									var that = this;
									wTo = setTimeout(function(){
										$A.trigger(that, 'opentooltip');
										waiting = false;
									}, dc.wait);
								}
							},
							'mouseleave blur': function(ev){
								if (waiting){
									clearTimeout(wTo);
									waiting = false;
								}

								if (dc.loaded)
									dc.close();
							},
							keydown: function(ev){
								var k = ev.which || ev.keyCode;

								if (k == 27 && dc.loaded){
									dc.close();
									ev.preventDefault();
								}
							}
							});
		}

		$A.bind(window, 'resize', function(ev){
			if (dc.loaded)
				dc.close();
		});

		// Return the new tooltip AccDC Object ID
		return overrides.id;
	};
})();