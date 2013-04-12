/*!
Scrollable Div Generator R1.4
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.makeScrollable = function(o, msg){
		if (!o)
			return;

		var msg = msg || 'Scrollable Region';
		$A.setAttr(o, 'tabindex', '0');
		$A.bind(o, 'focusin', function(ev){
			$A.announce(msg, true);
		});
	};
})();