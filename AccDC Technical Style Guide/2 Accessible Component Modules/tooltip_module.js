/*!
Tooltip Module R1.2.1
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
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
						role: 'Tooltip',
						bind: 'mouseover click focusin',
						returnFocus: false,
						displayHiddenClose: false,
						accStart: 'Start',
						accEnd: 'End',
						accClose: 'Close',
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
							// Assign a mouseout handler for the triggering element
							$A.bind(dc.triggerObj, 'mouseout.tooltip blur.tooltip', function(ev){
								dc.close();
							});
							$A.bind(window, 'resize.tooltip', function(ev){
								if (dc.autoPosition)
									dc.setPosition();
							});
						},
						announce: true,
						// Set a mousout handler on the AccDC Object as well
						mouseOut: function(ev, dc){
							dc.close();
						},
						runAfterClose: function(dc){
							$A.unbind(dc.triggerObj, '.tooltip');
							$A.unbind(window, '.tooltip');
						},
						className: 'tooltip',
						closeClassName: 'tooltipClose'
						}, true);

		// Return the new tooltip AccDC Object ID
		return overrides.id;
	};
})();