/*!
ARIA Listbox Generator Module R2.2
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
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
									tabindex: '-1',
									// 'aria-hidden': 'true',
									'aria-selected': 'false'
									});
				});

			if (that.options[i]){
				$A.setAttr(that.options[i],
								{
								tabindex: '0',
								// 'aria-hidden': 'false',
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
				if (toggle[id])
					selected.push(id);
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
									// 'aria-hidden': 'true',
									'aria-selected': 'false',
									'aria-label': getLabel(o)
									});

					if (config.isSortable || config.isMultiselect)
						$A.setAttr(o, config.isSortable ? 'aria-grabbed' : 'aria-checked', 'false');

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
				$A.setAttr(this, 'aria-checked', toggle[this.id] ? 'true' : 'false');
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
									$A.setAttr(this, 'aria-checked', toggle[this.id] ? 'true' : 'false');
									updateChecked();
								}
								select(track[this.id]);
							},
							'keypress.arialistbox': function(ev){
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
							},
							'keydown.arialistbox': function(ev){
								var k = ev.which || ev.keyCode;

								if (k == 38){
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
		}, getLabel = function(o){
			return(function(){
				var s = '';
				$A.query('img', o, function(j, p){
					if (p.alt)
						s += p.alt + ' ';
				});
				return s;
			})() + (o.innerText || o.textContent);
		}, items = [], move = function(l){
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
			track = [];
			items = [];
			toggle = [];
			max = 0;
			var ids = [];
			that.options = $A.query('#' + list.id + ' > li > a', function(i, o){
				track[o.id] = i;
				items.push($A.getText(o));

				if (config.isMultiselect)
					toggle[o.id] = false;
				max = i;

				if (!s)
					$A.setAttr(o,
									{
									tabindex: '-1',
									// 'aria-hidden': 'true',
									'aria-selected': 'false',
									'aria-label': getLabel(o)
									});

				$A.setAttr(o, 'aria-posinset', i + 1);

				if (!s && (config.isSortable || config.isMultiselect))
					$A.setAttr(o, config.isSortable ? 'aria-grabbed' : 'aria-checked', 'false');

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
					if ((inI(that.options[k].id) && $A.getAttr(that.options[k], 'aria-checked') != 'true')
						|| (!inI(that.options[k].id) && $A.getAttr(that.options[k], 'aria-checked') != 'false')
							|| (!i.length && $A.getAttr(that.options[k], 'aria-checked') != 'false'))
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