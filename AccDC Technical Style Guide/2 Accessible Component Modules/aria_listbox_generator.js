/*!
ARIA Listbox Generator Module R2.7
Copyright 2010-2016 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

(function(){

	$A.Listbox = function(list, config){

		var config = config || {}, grabInstruct = config.grabInstruct || 'Press Space to grab',
			dropInstruct = config.dropInstruct || 'Press Space to drop', grabMsg = config.grabMsg || 'Grabbed',
			dropMsg = config.dropMsg || 'Moved', cancelDrop = config.cancelDrop || 'Grab canceled', isArray = function(v){
			return v && typeof v === 'object'
				&& typeof v.length === 'number' && typeof v.splice === 'function' && !(v.propertyIsEnumerable('length'));
		}, list = typeof list === 'string' ? $A.getEl(list) : list, that = this;
		that.index = isNaN(config.defaultIndex) ? 0 : config.defaultIndex;
		var track = {}, toggle = {}, max = 0, selected = config.isMultiselect ? [] : '', select = function(i, f){
			if (i != that.index || f)
				$A.query('#' + list.id + ' > li > a', function(j, o){
					$A.setAttr(o,
									{
									tabindex: '-1'
									// 'aria-hidden': 'true'
									});

					if (!config.isMultiselect)
						$A.setAttr(o,
										{
										'aria-selected': 'false'
										});
				});

			if (that.options[i]){
				$A.setAttr(that.options[i],
								{
								tabindex: '0'
								// 'aria-hidden': 'false'
								});

				if (!config.isMultiselect)
					$A.setAttr(that.options[i],
									{
									'aria-selected': 'true'
									});

				that.options[i].scrollIntoView();

				that.index = i;
				that.grabbed = grabbed;

				if (f)
					that.options[i].focus();

				if (!config.isMultiselect)
					selected = that.options[i].id;

				if (config.callback && typeof config.callback === 'function')
					setTimeout(function(){
						config.callback.apply(that,
										[
										that.options[i],
										that.options
										]);
					}, 1);
			}
		}, updateChecked = function(){
			selected = [];

			for (id in toggle){
				if (toggle[id]){
					selected.push(id);
				}
			}
		}, grabbed = '', grab = function(){
			$A.query('#' + list.id + ' > li > a', function(i, o){
				$A.remAttr(o, 'aria-grabbed');
				$A.setAttr(o, 'aria-dropeffect', 'move');
			});
			grabbed = this.id;
			$A.setAttr(this, 'aria-grabbed', 'true');
			$A.remAttr(this, 'aria-dropeffect');
			select(track[grabbed]);
			$A.announce(grabMsg);
		}, drop = function(c){
			$A.query('#' + list.id + ' > li > a', function(i, o){
				$A.remAttr(o, 'aria-dropeffect');
				$A.setAttr(o, 'aria-grabbed', 'false');
			});

			if (!c){
				list.insertBefore(that.options[track[grabbed]].parentNode, that.options[that.index].parentNode);
				setOptions(true);
				$A.announce(dropMsg);
			}

			else
				$A.announce(cancelDrop);
			var g = grabbed;
			grabbed = '';
			select(c ? that.index : track[g], c ? false : true);
		}, add = function(o){
			if (!that.options.length)
				that.empty = true;

			if (o){
				if (grabbed)
					drop.apply(this, [true]);

				var isA = isArray(o), a = isA ? o : [o], pLength = that.options.length;

				for (var b = 0; b < a.length; b++){
					var o = a[b], li = $A.createEl('li');

					if (!o || o.nodeType !== 1 || !o.id){
						// alert('The new item must be a valid DOM node with a unique ID attribute value');
						return;
					}

					$A.setAttr(o,
									{
									role: 'option',
									tabindex: '-1',
									'aria-selected': 'false'
									});

																if (!$A.getAttr(o, 'aria-labelledby') && !$A.getAttr(o, 'aria-label'))
																	$A.setAttr(o,
																					{
																					'aria-label': calcNames(o).name
																					});

					if (config.isSortable || config.isMultiselect)
						$A.setAttr(o, config.isSortable ? 'aria-grabbed' : 'aria-selected', 'false');

					li.appendChild(o);
					list.appendChild(li);

					setBindings(o);
				}
				setOptions(true);

				if (pLength < that.options.length)
					select(pLength);
			}
		}, rem = function(i, s){
			if (that.options.length){
				if (grabbed)
					drop.apply(this, [true]);

				var isA = isArray(i), a = isA ? i : [i], ret = [];

				for (var b = 0; b < a.length; b++){
					var r = that.options[a[b]];
					$A.unbind(r, '.arialistbox');
					var pn = r.parentNode;
					ret.push(pn.removeChild(r));
					list.removeChild(pn);
				}

				selected = config.isMultiselect ? [] : '';

				setOptions();

				if (that.index > max)
					that.index = max;

				if (that.options.length)
					select(that.options[that.index] ? that.index : 0, s ? false : true);

				return isA ? ret : ret[0];
			}
		}, activate = function(){
			if (config.isSortable){
				if (grabbed)
					drop.apply(this);

				else
					grab.apply(this);
			}

			else if (config.isMultiselect){
				toggle[this.id] = toggle[this.id] ? false : true;
				$A.setAttr(this, 'aria-selected', toggle[this.id] ? 'true' : 'false');
				updateChecked();
				select(that.index);
			}
		}, setBindings = function(o){
			if (!o)
				$A.bind(list, 'focusin.arialistbox', function(){
					if (config.isSortable)
						$A.announce(grabbed ? dropInstruct : grabInstruct, true);
				});
			$A.bind(o || '#' + list.id + ' > li > a',
							{
							'click.arialistbox': function(ev){
								ev.preventDefault();

								if (config.isSortable){
									select(track[this.id]);
									activate.apply(this);
								}

								else if (config.isMultiselect){
									toggle[this.id] = toggle[this.id] ? false : true;
									$A.setAttr(this, 'aria-selected', toggle[this.id] ? 'true' : 'false');
									updateChecked();
								}
								select(track[this.id]);
							},
							'keydown.arialistbox': function(ev){
								var k = ev.which || ev.keyCode;

								if (k == 13)
									$A.trigger(this, 'click');

								else if (k == 27 && grabbed){
									drop.apply(this, [true]);
									ev.preventDefault();
								}

								else if (k == 32){
									activate.apply(this);
									ev.preventDefault();
								}

								else if (k == 38){
									ev.preventDefault();

									if (that.index > 0)
										select(that.index - 1, true);
								}

								else if (k == 40){
									ev.preventDefault();

									if (that.index < max)
										select(that.index + 1, true);
								}

								else if (k == 35){
									ev.preventDefault();
									select(max, true);
								}

								else if (k == 36){
									ev.preventDefault();
									select(0, true);
								}

								else if (k == 33){
									ev.preventDefault();
									var g = that.index - parseInt((max * (max >= 20 ? 0.1 : 0.5)));

									if (that.index != g)
										select(g > 0 ? g : 0, true);
								}

								else if (k == 34){
									ev.preventDefault();
									var g = that.index + parseInt((max * (max >= 20 ? 0.1 : 0.5)));

									if (that.index != g)
										select(g < max ? g : max, true);
								}

								else if (k == 46 && config.allowDelete){
									ev.preventDefault();
									rem(track[this.id]);
								}

								else if ((k >= 48 && k <= 57) || (k >= 65 && k <= 90)){
									move(String.fromCharCode(k));
									ev.preventDefault();
								}
							}
							});
		},
calcNames = function(node){
		if (!node || node.nodeType !== 1)
			return;

		var trim = function(str){
			if (typeof str !== 'string')
				return '';

			return str.replace(/^\s+|\s+$/g, '');
		}, walkDOM = function(node, fn, refObj){
			if (!node)
				return;
			fn(node, refObj);
			node = node.firstChild;

			while (node){
				walkDOM(node, fn, refObj);
				node = node.nextSibling;
			}
		}, isHidden = function(o, refObj){
			if (o.nodeType !== 1 || o == refObj)
				return false;

			if (o != refObj && ((o.getAttribute && o.getAttribute('aria-hidden') == 'true')
				|| (o.currentStyle && (o.currentStyle['display'] == 'none' || o.currentStyle['visibility'] == 'hidden'))
					|| (document.defaultView && document.defaultView.getComputedStyle && (document.defaultView.getComputedStyle(o,
						'')['display'] == 'none' || document.defaultView.getComputedStyle(o, '')['visibility'] == 'hidden'))
					|| (o.style && (o.style['display'] == 'none' || o.style['visibility'] == 'hidden'))))
				return true;
			return false;
		}, hasParentLabel = function(start, targ, noLabel, refObj){
			if (!start || !targ || start == targ)
				return false;

			while (start){
				start = start.parentNode;

				var rP = start.getAttribute ? start.getAttribute('role') : '';
				rP = (rP != 'presentation' && rP != 'none') ? false : true;

				if (!rP && start.getAttribute && ((!noLabel && trim(start.getAttribute('aria-label'))) || isHidden(start, refObj))){
					return true;
				}

				else if (start == targ)
					return false;
			}

			return false;
		};

		if (isHidden(node, document.body) || hasParentLabel(node, document.body, true, document.body))
			return;

		var accName = '', accDesc = '', desc = '', aDescribedby = node.getAttribute('aria-describedby') || '',
			title = node.getAttribute('title') || '', skip = false, rPresentation = node.getAttribute('role');
		rPresentation = (rPresentation != 'presentation' && rPresentation != 'none') ? false : true;

		var walk = function(obj, stop, refObj){
			var nm = '';

			walkDOM(obj, function(o, refObj){
				if (skip || !o || (o.nodeType === 1 && isHidden(o, refObj)))
					return;

				var name = '';

				if (o.nodeType === 1){
					var aLabelledby = o.getAttribute('aria-labelledby') || '', aLabel = o.getAttribute('aria-label') || '',
						nTitle = o.getAttribute('title') || '', rolePresentation = o.getAttribute('role');
					rolePresentation = (rolePresentation != 'presentation' && rolePresentation != 'none') ? false : true;
				}

				if (o.nodeType === 1
					&& ((!o.firstChild || (o == refObj && (aLabelledby || aLabel))) || (o.firstChild && o != refObj && aLabel))){
					if (!stop && o == refObj && aLabelledby){
						if (!rolePresentation){
							var a = aLabelledby.split(' ');

							for (var i = 0; i < a.length; i++){
								var rO = document.getElementById(a[i]);
								name += ' ' + walk(rO, true, rO) + ' ';
							}
						}

						if (trim(name) || rolePresentation)
							skip = true;
					}

					if (!trim(name) && aLabel && !rolePresentation){
						name = ' ' + trim(aLabel) + ' ';

						if (trim(name) && o == refObj)
							skip = true;
					}

					if (!trim(name)
						&& !rolePresentation && (o.nodeName.toLowerCase() == 'input' || o.nodeName.toLowerCase() == 'select'
							|| o.nodeName.toLowerCase() == 'textarea')
							&& o.id && document.querySelectorAll('label[for="' + o.id + '"]').length){
						var rO = document.querySelectorAll('label[for="' + o.id + '"]')[0];
						name = ' ' + trim(walk(rO, true, rO)) + ' ';
					}

					if (!trim(name) && !rolePresentation && (o.nodeName.toLowerCase() == 'img') && (trim(o.getAttribute('alt')))){
						name = ' ' + trim(o.getAttribute('alt')) + ' ';
					}

					if (!trim(name) && !rolePresentation && nTitle){
						name = ' ' + trim(nTitle) + ' ';
					}
				}

				else if (o.nodeType === 3){
					name = o.data;
				}

				if (name && !hasParentLabel(o, refObj, false, refObj)){
					nm += name;
				}
			}, refObj);

			return nm;
		};

		accName = walk(node, false, node);
		skip = false;

		if (title && !rPresentation){
			desc = trim(title);
		}

		if (aDescribedby && !rPresentation){
			var s = '', d = aDescribedby.split(' ');

			for (var j = 0; j < d.length; j++){
				var rO = document.getElementById(d[j]);
				s += ' ' + walk(rO, true, rO) + ' ';
			}

			if (trim(s))
				desc = s;
		}

		if (trim(desc) && !rPresentation)
			accDesc = desc;

		accName = trim(accName.replace(/\s/g, ' ').replace(/\s\s+/g, ' '));
		accDesc = trim(accDesc.replace(/\s/g, ' ').replace(/\s\s+/g, ' '));

		if (accName == accDesc)
			accDesc = '';

		return {
		name: accName,
		desc: accDesc
		};
	},
items = [], move = function(l){
			for (var i = that.index + 1; i <= max; i++){
				if (l.toLowerCase() == items[i].replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
					select(i, true);
					return;
				}
			}

			for (var i = 0; i < that.index; i++){
				if (l.toLowerCase() == items[i].replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
					select(i, true);
					return;
				}
			}
		}, setOptions = function(s){
			track = {};
			items = [];
			toggle = {};
			max = 0;
			var ids = [];
			that.options = $A.query('#' + list.id + ' > li > a', function(i, o){
				track[o.id] = i;
				items.push($A.getText(o));

				if (config.isMultiselect)
					toggle[o.id] = false;
				max = i;

				if (!s){
					$A.setAttr(o,
									{
									tabindex: '-1',
									'aria-selected': 'false'
									});
																if (!$A.getAttr(o, 'aria-labelledby') && !$A.getAttr(o, 'aria-label'))
																	$A.setAttr(o,
																					{
																					'aria-label': calcNames(o).name
																					});
}

				$A.setAttr(o, 'aria-posinset', i + 1);

				if (!s && (config.isSortable || config.isMultiselect))
					$A.setAttr(o, config.isSortable ? 'aria-grabbed' : 'aria-selected', 'false');

				if (o.id)
					ids.push(o.id);
			});

			if (ids.length)
				$A.setAttr(list, 'aria-owns', ids.join(' '));

			$A.query('#' + list.id + ' > li > a', function(i, o){
				$A.setAttr(o, 'aria-setsize', max + 1);
			});

			if (that.options.length === 1 || (that.empty && that.options.length > 0))
				select(0);
			that.empty = false;
		};

		if (config.isMultiselect)
			$A.setAttr(list, 'aria-multiselectable', 'true');

		if (config.label)
			$A.setAttr(list, 'aria-label', config.label);
		setOptions();
		setBindings();
		that.val = function(i){
			if (typeof i === 'number')
				select(i);

			else if (i && typeof i === 'string')
				select(track[i]);

			else if (i && isArray(i) && config.isMultiselect){
				var inI = function(id){
					for (var j = 0; j < i.length; j++){
						if (i[j] == id)
							return true;
					}

					return false;
				};

				for (var k = 0; k < that.options.length; k++){
					if ((inI(that.options[k].id) && $A.getAttr(that.options[k], 'aria-selected') != 'true')
						|| (!inI(that.options[k].id) && $A.getAttr(that.options[k], 'aria-selected') != 'false')
							|| (!i.length && $A.getAttr(that.options[k], 'aria-selected') != 'false'))
						activate.apply(that.options[k]);
				}
			}

			else
				return selected;
		};
		that.add = add;
		that.rem = function(i){
			var isA = isArray(i), a = isA ? i : [i], r = [];

			for (var b = 0; b < a.length; b++)
							r.push(!a[b] ? null : rem(a[b] && typeof a[b] === 'string' ? track[a[b]] : a[b], true));
			return isA ? r : r[0];
		};
		that.activate = activate;
		that.grabbed = grabbed;
		that.container = list;
		that.val(that.index);
	};
})();