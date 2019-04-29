/*!
ARIA Combobox Module R2.2
(Requires AccDC API version 3.3 (11/15/2016) +> )
Copyright 2019 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.Combobox = function(sel, combobox, child){
		if (!sel || !combobox)
			return null;

		var isInput = (combobox.nodeName.toLowerCase() == 'input' || combobox.nodeName.toLowerCase() == 'textarea')
			? true : false;

		if (!isInput && !child)
			return null;

		if ($A.getAttr(combobox, 'role') != 'combobox'){
			alert('The combobox element is missing the role="combobox" attribute, which is required.');
			return null;
		}
		$A.setAttr(combobox, 'aria-haspopup', 'listbox');

		var baseId = 'cb' + $A.genId(), that = this, start = false, promptText = $A.createEl('div',
						{
						id: baseId + 'pt'
						},
						{
						display: 'none'
						});

		document.body.appendChild(promptText);
		$A.setAttr(combobox, 'aria-describedby', promptText.id);

		if (!combobox.id)
			combobox.id = baseId + 'cb';

		$A(
						[
						{
						id: baseId + 's',
						role: 'Popup',
						returnFocus: false,
						showHiddenBounds: true,
						showHiddenClose: true,
						accClose: 'Close Popup',
						displayHiddenClose: false,
						autoPosition: 0,
						offsetLeft: 0,
						offsetTop: 0,
						className: 'toplevel-div clearfix',
						middleClass: 'middle-div clearfix',
						listboxClass: 'listbox clearfix',
						optionClass: 'option clearfix',
						activeClass: 'active',
						toggleClass: 'pressed',
						triggerObj: combobox,
						comboboxControl: true,
						cb:
										{
										key: '',
										charMin: 0,
										sel: sel,
										child: child,
										baseId: baseId,
										baseInc: 1,
										options: {},
										optionNodes: [],
										size: 0,
										readonly: false,
										multiple: false,
										checked: false,
										multipleDivider: function(values){
											return values.join('	');
										},
										required: false,
										parentTag: 'ul',
										childTag: 'li',
										names: [],
										values: [],
										matches: [],
										value: '',
										showAll: false,
										substringMatch: false,
										wordMatch: false,
										autoComplete: false,
										currentOption: null,
										activeDescendant: false,
										sIndex: -1,
										clicked: false,
										mClicked: false,
										isInput: isInput,
										setDefault: true,
										bound: false,
										fn:
														{
														update: function(){
															var dc = this.dc;
															that.close();
															dc.cb.options = {};
															dc.cb.currentOption = null;
															dc.cb.names = [];
															dc.cb.values = [];
															dc.cb.readonly = dc.cb.isInput ? ($A.getAttr(dc.triggerObj, 'readonly') ? true : false) : true;
															dc.cb.required = dc.cb.isInput ? ($A.getAttr(dc.triggerObj, 'required') ? true : false)
																: ($A.getAttr(dc.triggerObj, 'aria-required') == 'true' ? true : false);
															dc.cb.multiple = $A.getAttr(dc.cb.sel, 'multiple') ? true : false;
															dc.cb.optionNodes = $A.query('option', dc.cb.sel);

															if (dc.cb.readonly){
																dc.cb.substringMatch = dc.cb.wordMatch = false;
															}

															for (var i = 0; i < dc.cb.optionNodes.length; i++){
																dc.cb.baseInc++;
																var o = $A.createEl(dc.cb.childTag,
																				{
																				role: 'option',
																				tabindex: '-1',
																				id: dc.cb.baseId + dc.cb.baseInc,
																				'data-value': dc.cb.optionNodes[i].value
																				}, null, dc.optionClass);

																if (dc.cb.multiple)
																	$A.setAttr(o, 'aria-checked', 'false');

																dc.cb.options[dc.cb.optionNodes[i].value] =
																				{
																				so: dc.cb.optionNodes[i],
																				checked: dc.cb.optionNodes[i].selected,
																				no: trim($A.getText(dc.cb.optionNodes[i])).replace(/<|>/g, ''),
																				v: dc.cb.optionNodes[i].value,
																				i: i
																				};

																o.innerHTML = '<a><span>' + dc.cb.options[dc.cb.optionNodes[i].value].no + '</span></a>';
																dc.cb.options[dc.cb.optionNodes[i].value].o = o;
																dc.cb.names.push(dc.cb.options[dc.cb.optionNodes[i].value].no);
																dc.cb.values.push(dc.cb.optionNodes[i].value);
															}

															dc.cb.sel.selectedIndex = dc.cb.sel.selectedIndex >= 0 ? dc.cb.sel.selectedIndex : 0;

															if (!dc.cb.multiple)
																dc.cb.fn.setValue(dc.cb.options[dc.cb.optionNodes[dc.cb.sel.selectedIndex].value], true);

															else{
																dc.cb.autoComplete = true;
																dc.cb.fn.setValue(false, true);
															}

															if (dc.cb.required && dc.cb.isInput)
																$A.setAttr(dc.triggerObj,
																				{
																				'aria-required': 'true'
																				});
														},
														render: function(pass, scroll, noRecheck){
															var dc = this.dc;

															if (dc.cb.multiple && !noRecheck){
																for (var value in dc.cb.options){
																	var option = dc.cb.options[value];
																	$A.setAttr(option.o, 'aria-checked', option.checked ? 'true' : 'false');
																} // End for loop
															}

															if (dc.cb.readonly){
																var pShowAll = dc.cb.showAll;
																dc.cb.showAll = true;
															}

															if (!dc.cb.readonly && !dc.cb.showAll && !dc.cb.value){
																dc.cb.showAll = pShowAll;
																return true;
															}

															if (!scroll){
																dc.cb.sIndex = dc.cb.sel.selectedIndex;
																dc.cb.matches = [];
																that.close();
															}

															if (scroll && dc.cb.key){
																var v = dc.cb.key.toLowerCase(), fd = false, oI = dc.cb.sIndex;
																dc.cb.sIndex++;

																for (var i = dc.cb.sIndex; i < dc.cb.names.length; i++){
																	if ($A.inArray(v, dc.cb.names[i].toLowerCase()) === 0){
																		fd = true;
																		dc.cb.sIndex = i;
																		break;
																	}
																}

																if (!fd){
																	dc.cb.sIndex = 0;

																	for (var i = dc.cb.sIndex; i < oI; i++){
																		if ($A.inArray(v, dc.cb.names[i].toLowerCase()) === 0){
																			fd = true;
																			dc.cb.sIndex = i;
																			break;
																		}
																	}
																}

																if (!fd)
																	dc.cb.sIndex = oI;

																else{
																	if (!dc.cb.multiple){
																		dc.cb.currentOption = dc.cb.options[dc.cb.values[dc.cb.sIndex]];
																		dc.cb.value = dc.cb.currentOption.no;
																	}

																	else{
																		dc.cb.currentOption = [];
																		dc.cb.currentOption[0] = dc.cb.options[dc.cb.values[dc.cb.sIndex]];
																		dc.cb.value = dc.cb.currentOption[0].no;
																	}

																	if (!dc.cb.multiple)
																		$A.setAttr(dc.triggerObj, 'aria-activedescendant', dc.cb.currentOption.o.id);

																	else
																		$A.setAttr(dc.triggerObj, 'aria-activedescendant', dc.cb.currentOption[0].o.id);
																}

																$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);

																if (!dc.cb.multiple){
																	$A.addClass(dc.cb.currentOption.o, dc.activeClass);
																	that.scrollIntoView(dc.cb.currentOption.o, that);
																}

																else{
																	$A.addClass(dc.cb.currentOption[0].o, dc.activeClass);
																	that.scrollIntoView(dc.cb.currentOption[0].o, that);
																}
															}

															else{
																if (pass || dc.cb.showAll || dc.cb.readonly){
																	dc.cb.matches = dc.cb.values;
																}

																else{
																	for (var i = 0; i < dc.cb.names.length; i++){
																		if (dc.cb.wordMatch){
																			var vA = trim(dc.cb.value).toLowerCase().split(' '),
																				nA = trim(dc.cb.names[i]).toLowerCase().split(' '), vx = 0, nx = 0;

																			for (var z = 0; z < vA.length; z++){
																				for (var y = 0; y < nA.length; y++){
																					if (trim(vA[z]) && trim(nA[y])
																						&& $A.inArray(trim(vA[z]), trim(nA[y])) !== -1 && trim(vA[z]).length == trim(nA[y]).length){
																						nx++;
																						break;
																					}
																				}
																				vx++;
																			}

																			if (vx && nx && vx <= nx){
																				dc.cb.matches.push(dc.cb.values[i]);
																			}
																		}

																		else if ((!dc.cb.wordMatch && !dc.cb.substringMatch
																			&& $A.inArray(dc.cb.value.toLowerCase(), dc.cb.names[i].toLowerCase()) === 0)
																			|| (!dc.cb.wordMatch && dc.cb.substringMatch
																				&& $A.inArray(dc.cb.value.toLowerCase(), dc.cb.names[i].toLowerCase()) !== -1))
																			dc.cb.matches.push(dc.cb.values[i]);
																	}
																}

																if (!dc.cb.matches.length)
																	return true;

																if (dc.cb.readonly)
																	dc.cb.sIndex = dc.cb.sel.selectedIndex;

																else
																	dc.cb.sIndex = 0;

																if (dc.cb.readonly){
																	dc.cb.showAll = pShowAll;
																	dc.cb.activeDescendant = true;
																	dc.cb.currentObject = dc.cb.options[dc.cb.matches[dc.cb.sIndex]];
																}
															}
															return false;
														},
														setAltTrigger: function(o){
															if (!o || o.nodeType !== 1)
																return;
															var dc = this.dc;

															if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0){
																$A.setAttr(o,
																				{
																				role: 'button',
																				'aria-expanded': 'false'
																				});
															}

															else{
																$A.setAttr(o,
																				{
																				'aria-hidden': 'true',
																				tabindex: '-1'
																				});
															}

															dc.cb.altClicked = false;

															$A.unbind(o, 'click');

															$A.bind(o, 'click', function(ev){
																if (!dc.cb.altClicked){
																	dc.cb.altClicked = true;

																	if (!dc.loaded){
																		that.open();
																	}

																	else{
																		if (dc.cb.multiple && dc.cb.mClicked){
																			dc.cb.fn.setValue(false, false, true);
																			dc.cb.mClicked = false;
																		}
																		that.close();
																	}
																	dc.triggerObj.focus();
																	setTimeout(function(){
																		dc.cb.altClicked = false;
																	}, 300);
																}
																ev.stopPropagation();
																ev.preventDefault();
															});
															dc.cb.altTrigger = o;
														},
														setValue: function(option, pass, manual){
															var dc = this.dc;

															if (option && !dc.cb.multiple){
																dc.cb.value = option.no;
																dc.cb.currentOption = option;

																if (!pass)
																	option.so.selected = true;

																if (!pass && dc.cb.fn.onSelect && typeof dc.cb.fn.onSelect === 'function'){
																	var nv = dc.cb.fn.onSelect.apply(dc.triggerObj, [option.no, option.v, dc.triggerObj, dc.cb.sel]);

																	if (nv || typeof nv == 'string')
																		dc.cb.value = nv;
																}

																else if (dc.cb.isInput){
																	if (manual || dc.cb.setDefault)
																		dc.triggerObj.value = dc.cb.value;
																}

																else{
																	if (manual || dc.cb.setDefault)
																		dc.cb.child.innerHTML = dc.cb.value;
																}
															}

															else if (!option && dc.cb.multiple){

																var soNodes = [];

																if (pass){
																	soNodes = $A.query('option[selected]', dc.cb.sel);

																	for (var i = 0; i < soNodes.length; i++){
																		dc.cb.options[soNodes[i].value].checked = true;
																	}
																}

																dc.cb.currentOption = [];
																dc.cb.value = '';
																var vals = [];

																for (var value in dc.cb.options){
																	var option = dc.cb.options[value];

																	if (!pass){
																		option.checked = $A.getAttr(option.o, 'aria-checked') == 'true' ? true : false;
																		option.so.selected = option.checked ? 'selected' : false;
																	}

																	if (option.checked){
																		dc.cb.currentOption.push(option);
																		soNodes.push(option.so);
																		vals.push(option.no);
																	}
																} // End for loop

																dc.cb.value = dc.cb.multipleDivider(vals);

																if (!pass && dc.cb.fn.onSelect && typeof dc.cb.fn.onSelect === 'function'){
																	var nv = dc.cb.fn.onSelect.apply(dc.triggerObj, [dc.cb.value, soNodes, dc.triggerObj, dc.cb.sel]);

																	if (nv || typeof nv == 'string')
																		dc.cb.value = nv;
																}

																else if (dc.cb.isInput){
																	if (manual || dc.cb.setDefault)
																		dc.triggerObj.value = dc.cb.value;
																}

																else{
																	if (manual || dc.cb.setDefault)
																		dc.cb.child.innerHTML = dc.cb.value;
																}
															}

															dc.cb.pValue = dc.cb.value;
														},
														checkValue: function(v){
															var dc = this.dc;

															if (!(v && v.length >= dc.cb.charMin))
																return -1;

															for (var i = 0; i < dc.cb.names.length; i++){
																if (trim(v) && trim(v.toLowerCase()) == trim(dc.cb.names[i].toLowerCase())){
																	return i;
																}
															}
															return -1;
														},
														unsetValue: function(pass){
															var dc = this.dc;

															if (!pass && dc.cb.sel.selectedIndex >= 0)
																dc.cb.optionNodes[dc.cb.sel.selectedIndex].selected = false;
															dc.cb.currentOption = null;

															if (dc.cb.isInput){
																dc.cb.value = dc.triggerObj.value;
															}

															else{
																dc.cb.value = $A.getText(dc.cb.child);
															}
														},
														bind: function(){
															var dc = this.dc;

															if (dc.cb.bound)
																return;

															$A.unbind(dc.triggerObj, 'keydown keyup click focus blur');

															$A.bind(dc.triggerObj,
																			{
																			keydown: function(ev){
																				var e = this, k = ev.which || ev.keyCode;

																				if (k == 9){
																					if (dc.loaded){
																						if (dc.cb.autoComplete && dc.cb.activeDescendant){
																							if (!dc.cb.multiple)
																								dc.cb.fn.setValue(dc.cb.options[dc.cb.matches[dc.cb.sIndex]], false, true);

																							else
																								dc.cb.fn.setValue(false, false, true);
																						}
																						that.close();
																					}
																				}

																				else if (k == 13 && !dc.cb.isInput && !dc.cb.activeDescendant && !dc.loaded){
																					that.open();
																					ev.preventDefault();
																				}

																				else if (!dc.cb.multiple && (k == 13 || k == 32) && dc.cb.activeDescendant && dc.loaded){
																					dc.cb.fn.setValue(dc.cb.options[dc.cb.matches[dc.cb.sIndex]], false, true);
																					that.close();
																					announceVal();
																					ev.preventDefault();
																				}

																				else if (dc.cb.multiple && k == 13 && dc.cb.activeDescendant && dc.loaded){
																					dc.cb.fn.setValue(false, false, true);
																					that.close();
																					announceVal();

																					ev.preventDefault();
																				}

																				else if (dc.cb.multiple && k == 32 && dc.cb.activeDescendant && dc.loaded){
																					$A.setAttr(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, 'aria-checked',
																						$A.getAttr(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, 'aria-checked')
																							== 'true' ? 'false' : 'true');
																					ev.preventDefault();
																				}

																				else if (k == 38 || k == 40){
																					ev.preventDefault();
																				}

																				else if (dc.cb.readonly && ((k >= 48 && k <= 57) || (k >= 65 && k <= 90))){
																					dc.cb.key += String.fromCharCode(k);
																					dc.cb.fn.render(false, true, true);

																					if (dc.cb.keyReset)
																						clearTimeout(dc.cb.keyReset);
																					dc.cb.keyReset = setTimeout(function(){
																						dc.cb.key = '';
																					}, 1500);
																				}
																			},
																			keyup: function(ev){
																				var e = this, k = ev.which || ev.keyCode;

																				if (dc.cb.readonly && dc.loaded && (k == 37 || k == 39)){
																					ev.preventDefault();
																				}

																				else if (((ev.altKey && k == 40) || k == 40)
																					&& !dc.cb.activeDescendant && !dc.loaded && dc.cb.readonly){
																					dc.cb.activeDescendant = true;
																					dc.cb.sIndex = ((dc.cb.readonly || dc.cb.showAll) && dc.cb.sel.selectedIndex >= 0
																						&& !dc.cb.multiple) ? dc.cb.sel.selectedIndex : 0;
																					that.open();
																					ev.preventDefault();
																				}

																				else if (((ev.altKey && k == 40) || k == 40)
																					&& !dc.cb.activeDescendant && dc.loaded && !dc.cb.readonly){
																					dc.cb.activeDescendant = true;
																					dc.cb.sIndex = ((dc.cb.readonly || dc.cb.showAll) && dc.cb.sel.selectedIndex >= 0
																						&& !dc.cb.multiple) ? dc.cb.sel.selectedIndex : 0;
																					$A.setAttr(e,
																									{
																									'aria-activedescendant': dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o.id,
																									'aria-expanded': 'true'
																									});

																					$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);
																					$A.addClass(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, dc.activeClass);
																					that.scrollIntoView(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, that);
																					ev.preventDefault();
																				}

																				else if (k == 40 && dc.cb.activeDescendant && dc.loaded){
																					if (dc.cb.sIndex < dc.cb.matches.length - 1)
																						dc.cb.sIndex++;

																					else
																						dc.cb.sIndex = 0;
																					$A.setAttr(e, 'aria-activedescendant', dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o.id);
																					$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);
																					$A.addClass(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, dc.activeClass);
																					that.scrollIntoView(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, that);
																					ev.preventDefault();
																				}

																				else if (ev.altKey && k == 38 && dc.cb.activeDescendant && dc.loaded){
																					if (!dc.cb.multiple)
																						dc.cb.fn.setValue(dc.cb.options[dc.cb.matches[dc.cb.sIndex]], false, true);

																					else
																						dc.cb.fn.setValue(false, false, true);
																					that.close();
																					announceVal();

																					ev.preventDefault();
																				}

																				else if (k == 38 && dc.cb.activeDescendant && dc.loaded){
																					if (dc.cb.sIndex > 0)
																						dc.cb.sIndex--;

																					else
																						dc.cb.sIndex = dc.cb.matches.length - 1;
																					$A.setAttr(e, 'aria-activedescendant', dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o.id);
																					$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);
																					$A.addClass(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, dc.activeClass);
																					that.scrollIntoView(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, that);
																					ev.preventDefault();
																				}

																				else if (k == 27 || k == 37 || k == 39){
																					$A.setAttr(e,
																									{
																									'aria-expanded': 'false',
																									'aria-activedescendant': '',
																									'aria-controls': ''
																									});

																					dc.cb.activeDescendant = false;
																					$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);

																					if (k == 27)
																						that.close();
																				}

																				else if (!dc.cb.readonly && k != 9 && !(k == 9 && ev.shiftKey)){
																					if (dc.cb.isInput)
																						dc.cb.value = e.value;
																					var x = dc.cb.fn.checkValue(dc.cb.value);

																					if (dc.cb.value && x !== -1){
																						var option = dc.cb.options[dc.cb.values[x]];

																						if (!dc.cb.multiple)
																							dc.cb.currentOption = option;

																						else{
																							dc.cb.currentOption = [];
																							dc.cb.currentOption[0] = option;
																						}
																						option.so.selected = true;
																						that.close();
																					}

																					else{
																						if (dc.cb.value && dc.cb.value.length >= dc.cb.charMin){
																							var skp = (dc.cb.isInput && !dc.cb.readonly) ? true : false;

																							if (skp){
																								if (!dc.cb.pValue || dc.cb.pValue.length != combobox.value.length){
																									dc.cb.pValue = combobox.value;
																									skp = false;
																								}
																							}

																							if (!skp){
																								dc.cb.fn.render();
																								that.open(true);
																							}
																						}

																						else
																							that.close();
																					}
																				}
																			},
																			click: function(ev){
																				if (!dc.cb.altTrigger){
																					if (!dc.cb.isInput && !dc.loaded)
																						that.open();

																					else if ((!dc.cb.isInput || (dc.cb.isInput && dc.cb.multiple)) && dc.loaded)
																						that.close();
																				}
																				ev.stopPropagation();
																				ev.preventDefault();
																			},
																			focus: function(ev){},
																			blur: function(ev){
																				if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
																					&& !dc.cb.multiple){
																					setTimeout(function(){
																						if (!dc.cb.altClicked){
																							if (dc.loaded){
																								if (dc.cb.autoComplete && dc.cb.activeDescendant && !dc.cb.clicked)
																									dc.cb.fn.setValue(dc.cb.options[dc.cb.matches[dc.cb.sIndex]], false, true);
																								that.close();
																							}
																							dc.cb.clicked = false;
																						}
																					}, 150);
																				}
																			}
																			});
															dc.cb.bound = true;
														},
														set: function(){
															var dc = this.dc;
															$A.setAttr(dc.triggerObj,
																			{
																			'aria-expanded': 'false',
																			'aria-autocomplete': 'list',
																			'aria-activedescendant': '',
																			'aria-controls': ''
																			});

															if (!dc.cb.isInput){
																dc.cb.baseInc++;

																if (!dc.cb.child.id)
																	$A.setAttr(dc.cb.child,
																					{
																					tabindex: '-1',
																					'id': dc.cb.baseId + dc.cb.baseInc
																					});

																addLabelledby(dc.triggerObj, dc.cb.child.id);
															}
														},
														onSelect: null,
														onOpen: null,
														onClose: null,
														onTriggerChange: null,
														setSize: function(){
															var dc = this.dc,
																s = (dc.cb.size || 5) <= dc.cb.matches.length ? (dc.cb.size || 5) : dc.cb.matches.length,
																o = dc.cb.options[dc.cb.matches[0]].o, h = xHeight(o);
															h += parseInt($A.css(o, 'margin-top')) + parseInt($A.css(o, 'margin-bottom'));
															h = (s * h)
																+ (parseInt($A.css(dc.source, 'padding-top')) + parseInt($A.css(dc.source, 'padding-bottom')));
															$A.css(dc.source, 'height', h);
														}
														}
										},
						runBefore: function(dc){
							if (!dc.cb.matches.length)
								return dc.cancel = true;
							dc.cb.baseInc++;
							dc.source = that.listboxNode = $A.createEl(dc.cb.parentTag,
											{
											role: 'listbox',
											id: dc.cb.baseId + dc.cb.baseInc
											}, null, dc.listboxClass);

							for (var i = 0; i < dc.cb.matches.length; i++){
								dc.source.appendChild(dc.cb.options[dc.cb.matches[i]].o);
							}
							$A.find('*', function(dc){
								if (dc.comboboxControl && dc.loaded)
									dc.close();
							});
						},
						runDuring: function(dc){
							$A.setAttr(dc.triggerObj,
											{
											'aria-controls': dc.source.id
											});

							$A.addClass(dc.containerDiv, dc.middleClass);

							if (dc.showHiddenBounds){
								dc.fn.sraStart.innerHTML = dc.fn.sraEnd.innerHTML = '';
								$A.setAttr(dc.fn.sraStart, 'aria-hidden', 'true');
								$A.setAttr(dc.fn.sraEnd, 'aria-hidden', 'true');
							}
						},
						click: function(ev, dc){
							ev.stopPropagation();
						},
						runAfter: function(dc){

							$A.query(dc.cb.matches, function(i, v){
								$A.unbind(dc.cb.options[v].o, 'click');

								$A.bind(dc.cb.options[v].o,
												{
												click: function(ev){
													if (!dc.cb.multiple){
														dc.cb.fn.setValue(dc.cb.options[v], false, true);
														dc.cb.clicked = true;
														that.close();
														announceVal();
													}

													else{
														var o = dc.cb.options[v].o;

														if (o)
															$A.setAttr(o, 'aria-checked', $A.getAttr(o, 'aria-checked') == 'true' ? 'false' : 'true');
														dc.cb.mClicked = true;
													}

													ev.preventDefault();
												},
												focus: function(ev){
													if (dc.cb.multiple)
														$A.setAttr(dc.triggerObj, 'aria-expanded', 'true');
												}
												});
							});

							if (!(dc.cb.sIndex >= 0))
								dc.cb.sIndex = 0;

							if (dc.cb.readonly){
								$A.setAttr(dc.triggerObj,
												{
												'aria-activedescendant': dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o.id,
												'aria-expanded': 'true'
												});

								$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);
								$A.addClass(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, dc.activeClass);
							}

							dc.cb.fn.setSize();

							that.scrollIntoView(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, that);

							$A.announce(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].no, true);

							if (dc.cb.altTrigger && dc.cb.altTrigger.nodeType === 1){
								$A.addClass(dc.cb.altTrigger, dc.toggleClass);

								$A.setAttr(dc.cb.altTrigger,
												{
												'aria-expanded': 'true'
												});

								if (dc.cb.fn.onTriggerChange && typeof dc.cb.fn.onTriggerChange === 'function')
									dc.cb.fn.onTriggerChange.apply(dc.cb.altTrigger, [dc.cb.altTrigger, dc.loaded]);
							}

							$A.bind('body', 'click.acccombobox', function(ev){
								if ((!dc.cb.isInput || (dc.cb.isInput && dc.cb.multiple)) && dc.loaded){
									that.close();
									ev.preventDefault();
								}
							});

							if (dc.cb.fn.onOpen && typeof dc.cb.fn.onOpen === 'function')
								dc.cb.fn.onOpen.apply(dc.triggerObj, [dc]);
						},
						runBeforeClose: function(dc){
							if (dc.loaded){
								if (dc.cb.multiple && dc.cb.mClicked){
									dc.cb.fn.setValue(false, false, true);
								}
							}
						},
						runAfterClose: function(dc){
							dc.cb.mClicked = false;
							$A.setAttr(dc.triggerObj, 'aria-expanded', 'false');

							if (dc.cb.altTrigger && dc.cb.altTrigger.nodeType === 1){
								$A.remClass(dc.cb.altTrigger, dc.toggleClass);

								$A.setAttr(dc.cb.altTrigger,
												{
												'aria-expanded': 'false'
												});

								if (dc.cb.fn.onTriggerChange && typeof dc.cb.fn.onTriggerChange === 'function')
									dc.cb.fn.onTriggerChange.apply(dc.cb.altTrigger, [dc.cb.altTrigger, dc.loaded]);
							}

							$A.unbind('body', 'click.acccombobox');

							if (dc.cb.fn.onClose && typeof dc.cb.fn.onClose === 'function')
								dc.cb.fn.onClose.apply(dc.triggerObj, [dc]);
						}
						}
						], null, false, true);

		var dc = $A.reg[baseId + 's'];
		dc.cb.dc = dc.cb.fn.dc = that.dc = dc;

		that.combobox = dc.triggerObj;
		that.select = dc.cb.sel;
		dc.targetObj = dc.triggerObj;

		var announceVal = function(){
			if (!(dc.cb.fn.onSelect && typeof dc.cb.fn.onSelect === 'function')){
				setTimeout(function(){
					if (!dc.cb.multiple || dc.cb.isInput){
						$A.announce(dc.cb.value.toString(), false, true);
					}

					else if (dc.cb.child){
						$A.announce(dc.cb.child, false, true);
					}
				}, 150);
			}
		};

		that.setCharMin = function(v){
			if (typeof v == 'number' && v >= 0)
				dc.cb.charMin = v;
		};

		that.setShowAll = function(v){
			dc.cb.showAll = v ? true : false;
		};

		that.setSubstringMatch = function(v){
			dc.cb.substringMatch = v ? true : false;
		};

		that.setWordMatch = function(v){
			dc.cb.wordMatch = v ? true : false;
		};

		that.setTags = function(o){
			if (o.parentTag)
				dc.cb.parentTag = o.parentTag;

			if (o.childTag)
				dc.cb.childTag = o.childTag;
		};

		that.setOffset = function(o){
			if (!isNaN(o.left))
				dc.offsetLeft = o.left;

			if (!isNaN(o.top))
				dc.offsetTop = o.top;
		};

		that.setAutoComplete = function(v){
			dc.cb.autoComplete = v ? true : false;
		};

		that.close = function(){
			$A.setAttr(dc.triggerObj,
							{
							'aria-expanded': 'false',
							'aria-activedescendant': '',
							'aria-controls': ''
							});

			$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);

			dc.close();
			dc.cb.activeDescendant = false;
		};

		that.open = function(passive){
			if (dc.loaded)
				return;

			if (start){
				dc.cb.fn.render();
				dc.open();

				if (dc.loaded){
					if (!passive){
						$A.setAttr(dc.triggerObj,
										{
										'aria-activedescendant': dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o.id,
										'aria-expanded': 'true'
										});

						$A.remClass($A.query('.' + dc.activeClass, dc.source), dc.activeClass);
						$A.addClass(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, dc.activeClass);
					}
					that.scrollIntoView(dc.cb.options[dc.cb.matches[dc.cb.sIndex]].o, that);
				}
			}
		};

		that.setAltTrigger = function(o){
			dc.cb.fn.setAltTrigger(o);
		};

		that.setAutoPosition = function(n){
			if (!isNaN(n) && n < 10)
				dc.autoPosition = n;
		};

		that.setSize = function(n){
			if (!isNaN(n) && n > 0)
				dc.cb.size = n;
		};

		that.setPosAnchor = function(o){
			dc.posAnchor = o;
		};

		that.setTargetObj = function(o){
			dc.targetObj = o;
		};

		that.setClassNames = function(o){
			if (o.toplevelClass)
				dc.className = o.toplevelClass;

			if (o.middleClass)
				dc.middleClass = o.middleClass;

			if (o.listboxClass)
				dc.listboxClass = o.listboxClass;

			if (o.optionClass)
				dc.optionClass = o.optionClass;

			if (o.activeClass)
				dc.activeClass = o.activeClass;

			if (o.toggleClass)
				dc.toggleClass = o.toggleClass;
		};

		that.setDefault = function(v){
			dc.cb.setDefault = v ? true : false;
		};

		that.setMultipleDivider = function(fn){
			if (fn && typeof fn == 'function')
				dc.cb.multipleDivider = fn;
		};

		that.clearAll = function(){
			that.close();

			for (var value in dc.cb.options){
				var option = dc.cb.options[value];
				option.so.selected = false;
				option.checked = false;
				$A.setAttr(option.o, 'aria-checked', 'false');
			} // End for loop

			if (dc.cb.isInput)
				dc.triggerObj.value = '';

			else if (dc.cb.child){
				if (!dc.cb.multiple)
					dc.cb.child.innerHTML = '';

				else
					dc.cb.fn.setValue(false, true);
			}
		};

		that.update = function(){
			dc.cb.fn.update();
		};

		that.start = function(){
			start = true;
			dc.cb.fn.bind();
			dc.cb.fn.update();

			if (document.activeElement == combobox && (dc.cb.readonly || dc.cb.value)){
				that.open();
			}
		};

		that.stop = function(){
			start = false;
			that.close();
		};

		that.onSelect = function(fn){
			if (fn && typeof fn === 'function')
				dc.cb.fn.onSelect = fn;
		};

		that.onOpen = function(fn){
			if (fn && typeof fn === 'function')
				dc.cb.fn.onOpen = fn;
		};

		that.onClose = function(fn){
			if (fn && typeof fn === 'function')
				dc.cb.fn.onClose = fn;
		};

		that.onTriggerChange = function(fn){
			if (fn && typeof fn === 'function')
				dc.cb.fn.onTriggerChange = fn;
		};

		that.setPromptText = function(s){
			promptText.innerHTML = s;
		};

		that.setCloseText = function(s){
			if (!s){
				dc.showHiddenBounds = false;
			}

			else{
				dc.showHiddenBounds = true;
				dc.accClose = s;
			}
		};

		that.scrollIntoView = function(o, cb){
			var i = document.documentElement.scrollLeft;
			o.scrollIntoView();

			if (document.documentElement.scrollLeft != i)
				document.documentElement.scrollLeft = i;
		};

		that.getValue = function(){
			if (!dc.cb.multiple)
				return dc.cb.sel.value;

			else{
				var r = [];

				for (var value in dc.cb.options){
					var option = dc.cb.options[value];

					if (option.checked && option.so.selected)
						r.push(option.so);
				} // End for loop
				return r;
			}
		};

		$A.bind(window, 'resize', function(){
			if (dc.loaded){
				dc.setPosition();
				dc.cb.fn.setSize();
			}
		});

		if (!dc.cb.isInput && !$A.getAttr(dc.triggerObj, 'tabindex'))
			$A.setAttr(dc.triggerObj, 'tabindex', '0');
		dc.cb.fn.set();
	};

	var trim = function(str){
		return str.replace(/^\s+|\s+$/g, '');
	}, addLabelledby = function(obj, cn){
		if (!obj)
			return null;
		var o = $A.isArray(obj) ? obj : [obj], names = cn.split(' ');

		for (var i = 0; i < o.length; i++){
			for (var n = 0; n < names.length; n++){
				if (!hasLabelledby(o[i], names[n])){
					var l = $A.getAttr(o[i], 'aria-labelledby');

					if (!l)
						l = '';
					$A.setAttr(o[i], 'aria-labelledby', trim(l + ' ' + names[n]));
				}
			}
		}
		return obj;
	}, hasLabelledby = function(obj, cn){
		var l = $A.getAttr(obj, 'aria-labelledby');

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
	}, xHeight = function(e, h){
		var css, pt = 0, pb = 0, bt = 0, bb = 0;

		if (!e)
			return 0;

		if (xNum(h)){
			if (h < 0)
				h = 0;

			else
				h = Math.round(h);
		}

		else
			h = -1;
		css = xDef(e.style);

		if (css && xDef(e.offsetHeight) && xStr(e.style.height)){
			if (h >= 0){
				if (document.compatMode == 'CSS1Compat'){
					pt = xGetComputedStyle(e, 'padding-top', 1);

					if (pt !== null){
						pb = xGetComputedStyle(e, 'padding-bottom', 1);
						bt = xGetComputedStyle(e, 'border-top-width', 1);
						bb = xGetComputedStyle(e, 'border-bottom-width', 1);
					}

					else if (xDef(e.offsetHeight, e.style.height)){
						e.style.height = h + 'px';
						pt = e.offsetHeight - h;
					}
				}
				h -= (pt + pb + bt + bb);

				if (isNaN(h) || h < 0)
					return;

				else
					e.style.height = h + 'px';
			}
			h = e.offsetHeight;
		}

		else if (css && xDef(e.style.pixelHeight)){
			if (h >= 0)
				e.style.pixelHeight = h;
			h = e.style.pixelHeight;
		}
		return h;
	}, xNum = function(){
		for (var i = 0; i < arguments.length; i++){
			if (isNaN(arguments[i]) || typeof arguments[i] !== 'number')
				return false;
		}
		return true;
	}, xDef = function(){
		for (var i = 0; i < arguments.length; i++){
			if (typeof arguments[i] === 'undefined')
				return false;
		}
		return true;
	}, xStr = function(){
		for (var i = 0; i < arguments.length; i++){
			if (typeof arguments[i] !== 'string')
				return false;
		}
		return true;
	}, xGetComputedStyle = function(e, p, i){
		if (!e)
			return null;
		var s, v = 'undefined', dv = document.defaultView;

		if (dv && dv.getComputedStyle){
			if (e == document)
				e = document.body;
			s = dv.getComputedStyle(e, '');

			if (s)
				v = s.getPropertyValue(p);
		}

		else if (e.currentStyle)
			v = e.currentStyle[xCamelize(p)];

		else
			return null;
		return i ? (parseInt(v) || 0) : v;
	}, xCamelize = function(cssPropStr){
		var i, c, a, s;
		a = cssPropStr.split('-');
		s = a[0];

		for (i = 1; i < a.length; i++){
			c = a[i].charAt(0);
			s += a[i].replace(c, c.toUpperCase());
		}
		return s;
	};
})();