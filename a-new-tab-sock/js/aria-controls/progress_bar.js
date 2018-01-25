/*!
Progress Bar Module R1.1
Copyright 2010-2015 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

$A.createEl('progress');
(function(){
	$A.setProgressBar = function(config){
		if (!config || !config.id || !config.config)
			return null;

		var getVT = function(val, max){
			if (isNaN(max))
				return '';

			if (!val)
				val = 0;
			var percentage = parseInt((val / max) * 100);
			return percentage + '%';
		};
		$A([config],
						{
						role: 'Progress Bar',
						accStart: 'Start',
						accEnd: 'End',
						showHiddenClose: false,
						allowCascade: true,
						runDuring: function(dc){
							$A.setAttr(dc.accDCObj,
											{
											role: 'region',
											'aria-label': dc.role
											});

							dc.fn.sraStart.innerHTML = dc.fn.sraEnd.innerHTML = '';
							$A.setAttr(dc.fn.sraStart,
											{
											'aria-hidden': 'true'
											});

							$A.setAttr(dc.fn.sraEnd,
											{
											'aria-hidden': 'true'
											});
						},
						runBefore: function(dc){
							dc.source = $A.createEl('progress',
											{
											id: config.id,
											value: config.config.value,
											max: config.config.max,
											'aria-valuetext': getVT(config.config.value, config.config.max)
											});
						},
						set: function(val){
							var dc = $A.reg[config.id], percentage = getVT(val, dc.config.max);
							$A.setAttr(dc.source,
											{
											value: val,
											'aria-valuetext': percentage
											});
						},
						config: config.config
						}, false, true);

		return $A.reg[config.id];
	};
})();