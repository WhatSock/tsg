/*!
ARIA Footnote Generator Module R2.1
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.setFootnotes = function(selector, context, config){

		var config = config || {}, fnChar = config.fnChar || '&#8224;', fnText = config.fnText || 'Footnote',
			backText = config.backText || 'Back to Footnote', pair = {}, context = context || document;

		$A.query(selector, context, function(i, o){
			var fnId = $A.getAttr(o, 'data-footnote'), index = i;

			if (!pair[fnId])
				pair[fnId] =
								{
								fns: [],
								last: 0,
								name: $A.getText(o),
								targ: $A.getEl(fnId)
								};

			var a = $A.createEl('a',
							{
							href: '#',
							title: fnText + (i + 1),
							'aria-label': fnText + (i + 1)
							}, null, null, $A.createEl('sup',
							{
							'aria-hidden': 'true'
							}, null, null, document.createTextNode(i + 1)));

			pair[fnId].fns.push(a);
			o.appendChild(a);

			$A.bind(a, 'click', function(ev){
				pair[fnId].last = $A.inArray(this, pair[fnId].fns);
				pair[fnId].fn.focus();
				ev.preventDefault();
			});

			if (!pair[fnId].fn){
				var a2 = $A.createEl('a',
								{
								href: '#',
								title: backText + ' ' + pair[fnId].name,
								'aria-label': backText + ' ' + pair[fnId].name
								});

				a2.innerHTML = '<span aria-hidden="true">' + fnChar + '</span>';
				pair[fnId].fn = a2;
				pair[fnId].targ.appendChild(a2);
				$A.bind(a2, 'click', function(ev){
					pair[fnId].fns[pair[fnId].last].focus();
					ev.preventDefault();
				});
			}
		});
	};
})();