/*!
Carousel From XML Module R2.2.2
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

(function(){
	$A.setCarousel = function(container, path, autoStart, config){

		// config variables
		var config = config || {}, lNavCls = config.lNavCls || 'lNav', rNavCls = config.rNavCls || 'rNav',
			contentCls = config.contentCls || 'centerContent', btnTag = config.btnTag || 'button',
			btnCls = config.btnCls || 'navButton', btnSlideCls = config.btnSlideCls || 'navSlideButton',
			btnGroupCls = config.btnGroupCls || 'navGroupButton', groupNameCls = config.groupNameCls || 'groupName',
			ariaLevel = config.ariaLevel || 3,

		// Internal variables
		xml = null, track = {}, bId = container.id || 'l' + $A.genId(), announce = {}, tmp = $A.createEl('div'),
			handlers = config.handlers || {}, paused = loading = false;
		$A.load(tmp, path, function(data){
			xml = str2xml(data);
			var attrs =
				'role accStart accEnd height width className prevTitle nextTitle slideName groupName btnPText btnNText btnPGText btnNGText btnPAccesskey btnNAccesskey btnPGAccesskey btnNGAccesskey direction timer animDelay hiddenMsg'.split(
				' '),
				vals = {}, d = xml.documentElement, forward = d.attributes.getNamedItem('forward').value == 'yes' ? true : false,
				cycle = d.attributes.getNamedItem('cycle').value == 'yes' ? true : false,
				showGroup = d.attributes.getNamedItem('showGroup').value == 'yes' ? true : false,
				groupPosTop = d.attributes.getNamedItem('groupPosTop').value == 'yes' ? true : false,
				isGrouped = d.attributes.getNamedItem('isGrouped').value == 'yes' ? true : false;

			for (var i = 0; i < attrs.length; i++)
							vals[attrs[i]] = d.attributes.getNamedItem(attrs[i]).value;
			track.length = 0;
			$A.query('carousel > *', xml, function(i, n){
				track.length += 1;

				if (!isGrouped){
					track[i] = n.childNodes[0].nodeValue;
					announce[bId + i] = n.attributes.getNamedItem('announce').value;
				}

				else{
					track[i] =
									{
									name: n.attributes.getNamedItem('name').value,
									length: 0
									};

					$A.query('*', n, function(j, m){
						track[i].length += 1;
						track[i][j] = m.childNodes[0].nodeValue;
						announce[bId + i + j] = m.attributes.getNamedItem('announce').value;
					});
				}
			});
			var lDiv = $A.createEl('div', null, null, lNavCls), rDiv = $A.createEl('div', null, null, rNavCls),
				cDiv = $A.createEl('div', null, null, contentCls), btnAttrs = {};

			if (btnTag == 'a')
				btnAttrs.href = '#';

			if (btnTag != 'a' && btnTag != 'button')
				btnAttrs.tabindex = '0';

			if (btnTag != 'button')
				btnAttrs.role = 'button';
			var btnP = $A.createEl(btnTag, btnAttrs, null, btnCls + ' ' + btnSlideCls),
				btnN = $A.createEl(btnTag, btnAttrs, null, btnCls + ' ' + btnSlideCls),
				btnPG = $A.createEl(btnTag, btnAttrs, null, btnCls + ' ' + btnGroupCls),
				btnNG = $A.createEl(btnTag, btnAttrs, null, btnCls + ' ' + btnGroupCls), pDiv = $A.createEl('div', null,
							{
							position: 'relative'
							}, 'parentDivCls'), bDiv = $A.createEl('div', null,
							{
							position: 'relative',
							overflow: 'hidden',
							width: '100%',
							height: '100%'
							});

			$A.setAttr(btnP,
							{
							accesskey: vals.btnPAccesskey,
							title: trim(vals.prevTitle + ' ' + vals.slideName)
							}).innerHTML = '<span aria-hidden="true">' + vals.btnPText + '</span>';

			btnP.appendChild($A.createEl('span', null, $A.sraCSS, null,
				document.createTextNode(vals.prevTitle + ' ' + vals.slideName)));

			$A.setAttr(btnN,
							{
							accesskey: vals.btnNAccesskey,
							title: trim(vals.nextTitle + ' ' + vals.slideName)
							}).innerHTML = '<span aria-hidden="true">' + vals.btnNText + '</span>';

			btnN.appendChild($A.createEl('span', null, $A.sraCSS, null,
				document.createTextNode(vals.nextTitle + ' ' + vals.slideName)));

			pDiv.appendChild(lDiv);
			pDiv.appendChild(cDiv);
			pDiv.appendChild(rDiv);
			lDiv.appendChild(btnP);
			rDiv.appendChild(btnN);
			cDiv.appendChild(bDiv);

			if (isGrouped){
				$A.setAttr(btnPG,
								{
								accesskey: vals.btnPGAccesskey,
								title: trim(vals.prevTitle + ' ' + vals.groupName)
								}).innerHTML = '<span aria-hidden="true">' + vals.btnPGText + '</span>';

				btnPG.appendChild($A.createEl('span', null, $A.sraCSS, null,
					document.createTextNode(vals.prevTitle + ' ' + vals.groupName)));

				$A.setAttr(btnNG,
								{
								accesskey: vals.btnNGAccesskey,
								title: trim(vals.nextTitle + ' ' + vals.groupName)
								}).innerHTML = '<span aria-hidden="true">' + vals.btnNGText + '</span>';

				btnNG.appendChild($A.createEl('span', null, $A.sraCSS, null,
					document.createTextNode(vals.nextTitle + ' ' + vals.groupName)));
				lDiv.appendChild(btnPG);
				rDiv.appendChild(btnNG);
			}
			$A(
							[
							{
							id: bId,
							role: vals.role,
							accStart: vals.accStart || 'Start',
							accEnd: vals.accEnd || 'End',
							ariaLevel: ariaLevel,
							showHiddenClose: false,
							isStatic: container,
							autoStart: true,
							source: pDiv,
							className: vals.className,
							cssObj:
											{
											height: vals.height,
											width: vals.width
											},
							btn:
											{
											P: btnP,
											N: btnN,
											PG: btnPG,
											NG: btnNG
											},
							runOnceBefore: function(dc){
								$A(dc,
												[
												{
												id: bId + 'gn',
												role: 'Group Name',
												showHiddenBounds: false,
												className: groupNameCls,
												allowReopen: true,
												returnFocus: false,
												cssObj:
																{
																position: 'absolute'
																},
												groupName: '',
												runBefore: function(dc){
													dc.source = '<span>' + dc.groupName + '</span>';
												}
												}
												]);
								dc.gdc = $A.reg[bId + 'gn'];

								if (groupPosTop)
									dc.gdc.autoPosition = 1;

								else
									dc.gdc.autoPosition = 5;
							},
							runAfter: function(dc){
								if (!tmpd){
									tmpd = $A.createEl('div', null, dc.sraCSS);
									document.body.appendChild(tmpd);
								}
								dc.dirFlag = 0;
								dc.gdc.targetObj = firstChild(dc.accDCObj);
								dc.gdc.triggerObj = bDiv;
								var objs = [], tmp2 = $A.createEl('div');

								for (var n in track){
									if (n.toString() === '0' || n > 0){
										if (!isGrouped){
											if (!autoStart)
												autoStart = '0';
											objs.push(
															{
															id: bId + n,
															slideVal: parseInt(n),
															slideMax: track.length,
															autoStart: autoStart.toString() === n.toString() ? true : false,
															source: track[n]
															});

											tmp2.innerHTML = track[n];
											$A.query('img', tmp2, function(x, y){
												tmpd.appendChild($A.createEl('img',
																{
																src: y.src,
																alt: ''
																}));
											});
										}

										else{
											var aS = '';

											if (!autoStart || typeof autoStart !== 'string')
												aS =
																[
																0,
																0
																];

											else
												aS = autoStart.split(',');

											for (var m in track[n]){
												if (m.toString() === '0' || m > 0){
													objs.push(
																	{
																	id: bId + n + m,
																	slideVal: parseInt(m),
																	slideMax: track[n].length,
																	groupVal: parseInt(n),
																	groupMax: track.length,
																	autoStart: aS[0].toString() === n.toString() && aS[1].toString() === m.toString() ? true : false,
																	source: track[n][m]
																	});

													tmp2.innerHTML = track[n][m];
													$A.query('img', tmp2, function(x, y){
														tmpd.appendChild($A.createEl('img',
																		{
																		src: y.src,
																		alt: ''
																		}));
													});
												}
											}
										}
									}
								}

								if (vals.direction != 'lr' && vals.direction != 'tb')
									vals.direction = 'lr';
								$A(dc, objs,
												{
												role: 'slide',
												allowMultiple: true,
												showHiddenBounds: false,
												isStatic: bDiv,
												append: true,
												cssObj:
																{
																position: 'absolute'
																},
												runBefore: function(dc){
													dc.cssObj.height = bDiv.clientHeight;
													dc.cssObj.width = bDiv.clientWidth;

													if (dc.parent.firstLoaded){
														if (vals.direction == 'lr'){
															dc.cssObj.left = !dc.parent.dirFlag ? (bDiv.offsetLeft + bDiv.clientLeft) - bDiv.clientWidth
																: (bDiv.offsetLeft + bDiv.clientLeft) + bDiv.clientWidth;
															dc.cssObj.top = bDiv.offsetTop + bDiv.clientTop;
														}

														else if (vals.direction == 'tb'){
															dc.cssObj.top = !dc.parent.dirFlag ? (bDiv.offsetTop + bDiv.clientTop) - bDiv.clientHeight
																: (bDiv.offsetTop + bDiv.clientTop) + bDiv.clientHeight;
															dc.cssObj.left = bDiv.offsetLeft + bDiv.clientLeft;
														}
													}

													else{
														dc.cssObj.top = bDiv.offsetTop + bDiv.clientTop;
														dc.cssObj.left = bDiv.offsetLeft + bDiv.clientLeft;
													}
												},
												runAfter: function(dc){
													if (isGrouped && showGroup && dc.parent.gdc.groupName != track[dc.groupVal].name){
														dc.parent.gdc.groupName = track[dc.groupVal].name;
														dc.parent.gdc.open();
													}

													if (dc.parent.cur)
														dc.parent.old = dc.parent.cur;
													dc.parent.cur = dc;

													if (dc.parent.firstLoaded){
														var o =
																		{
																		left: bDiv.offsetLeft + bDiv.clientLeft,
																		top: bDiv.offsetTop + bDiv.clientTop
																		};

														if (vals.direction == 'lr')
															o.left = !dc.parent.dirFlag ? o.left + bDiv.offsetWidth : o.left - bDiv.offsetWidth;

														else if (vals.direction == 'tb')
															o.top = !dc.parent.dirFlag ? o.top + bDiv.offsetHeight : o.top - bDiv.offsetHeight;

														if (isGrouped && showGroup && (paused || !vals.timer))
															$A.announce(dc.parent.gdc.groupName);

														if (paused || !vals.timer)
															$A.announce(announce[dc.id]);
														loading = true;
														animate(dc.accDCObj, dc.parent.old.accDCObj,
																		{
																		top: bDiv.offsetTop + bDiv.clientTop,
																		left: bDiv.offsetLeft + bDiv.clientLeft
																		}, o,
																		{
																		duration: parseInt(vals.animDelay),
																		complete: function(){
																			if (dc && dc.parent && dc.accDCObj && dc.parent.accDCObj){
																				dc.parent.old.close();
																				loading = false;

																				if (handlers.complete && typeof handlers.complete === 'function')
																					handlers.complete.apply(dc, [dc]);
																				dc.parent.setInc();
																			}
																		}
																		});
													}

													else{
														dc.parent.firstLoaded = true;
														dc.parent.setInc();

														if (handlers.complete && typeof handlers.complete === 'function')
															handlers.complete.apply(dc, [dc]);
													}
												}
												});
								$A.bind(window, 'resize.' + bId, function(ev){
									dc.cur.css(
													{
													top: bDiv.offsetTop + bDiv.clientTop,
													left: bDiv.offsetLeft + bDiv.clientLeft
													});
								});

								dc.pSlide = function(ev, auto){
									if (loading)
										return;

									var ret = null;

									if (handlers.btnPrev && typeof handlers.btnPrev === 'function' && dc.accDCObj)
										ret = handlers.btnPrev.apply(this,
														[
														ev,
														dc
														]);

									if (typeof ret === 'boolean' && !ret)
										return false;

									var id = '';

									if (dc){
										if (!isGrouped){
											if (dc.cur.slideVal > 0)
												id = bId + (dc.cur.slideVal - 1);

											else if (cycle)
												id = bId + (dc.cur.slideMax - 1);

											else
												return false;
										}

										else{
											var g = dc.cur.groupVal, s = dc.cur.slideVal;

											if (g < 1 && s < 1 && !cycle)
												return false;

											else if (s < 1){
												g = g > 0 ? g - 1 : dc.cur.groupMax - 1;
												s = track[g].length - 1;
											}

											else
												s -= 1;
											id = bId + g + s;
										}
									}
									var ndc = $A.reg[id];
									dc.dirFlag = 0;

									if (ndc && ndc.id)
										ndc.open();
								};
								dc.nSlide = function(ev, auto){
									if (loading)
										return;

									var ret = null;

									if (handlers.btnNext && typeof handlers.btnNext === 'function' && dc.accDCObj)
										ret = handlers.btnNext.apply(this,
														[
														ev,
														dc
														]);

									if (typeof ret === 'boolean' && !ret)
										return false;

									var id = '';

									if (dc){
										if (!isGrouped){
											if (dc.cur.slideVal < (dc.cur.slideMax - 1))
												id = bId + (dc.cur.slideVal + 1);

											else if (cycle)
												id = bId + 0;

											else
												return false;
										}

										else{
											var g = dc.cur.groupVal, s = dc.cur.slideVal;

											if (g >= (dc.cur.groupMax - 1) && s >= (dc.cur.slideMax - 1) && !cycle)
												return false;

											else if (s >= (dc.cur.slideMax - 1)){
												g = g < (dc.cur.groupMax - 1) ? g + 1 : 0;
												s = 0;
											}

											else
												s += 1;
											id = bId + g + s;
										}
									}
									var ndc = $A.reg[id];
									dc.dirFlag = 1;

									if (ndc && ndc.id)
										ndc.open();
								};
								dc.pGroup = function(ev){
									if (loading)
										return;

									var ret = null;

									if (handlers.btnPrevG && typeof handlers.btnPrevG === 'function')
										ret = handlers.btnPrevG.apply(this,
														[
														ev,
														dc
														]);

									if (typeof ret === 'boolean' && !ret)
										return false;

									var id = '', g = dc.cur.groupVal;

									if (g < 1 && !cycle)
										return false;

									else{
										g = g > 0 ? g - 1 : dc.cur.groupMax - 1;
										id = bId + g + 0;
										var ndc = $A.reg[id];
										dc.dirFlag = 0;
										ndc.open();
									}
								};
								dc.nGroup = function(ev){
									if (loading)
										return;

									var ret = null;

									if (handlers.btnNextG && typeof handlers.btnNextG === 'function')
										ret = handlers.btnNextG.apply(this,
														[
														ev,
														dc
														]);

									if (typeof ret === 'boolean' && !ret)
										return false;

									var id = '', g = dc.cur.groupVal;

									if (g >= (dc.cur.groupMax - 1) && !cycle)
										return false;

									else{
										g = g < (dc.cur.groupMax - 1) ? g + 1 : 0;
										id = bId + g + 0;
										var ndc = $A.reg[id];
										dc.dirFlag = 1;
										ndc.open();
									}
								};
								$A.bind(btnP,
												{
												click: function(ev){
													ev.preventDefault();
													dc.pSlide.apply(this,
																	[
																	ev,
																	dc
																	]);
												},
												keypress: function(ev){
													var k = ev.which || ev.keyCode;

													if (k == 13 || k == 32){
														ev.preventDefault();
														dc.pSlide.apply(this,
																		[
																		ev,
																		dc
																		]);
													}
												}
												});

								$A.bind(btnN,
												{
												click: function(ev){
													ev.preventDefault();
													dc.nSlide.apply(this,
																	[
																	ev,
																	dc
																	]);
												},
												keypress: function(ev){
													var k = ev.which || ev.keyCode;

													if (k == 13 || k == 32){
														ev.preventDefault();
														dc.nSlide.apply(this,
																		[
																		ev,
																		dc
																		]);
													}
												}
												});

								if (isGrouped){
									$A.bind(btnPG,
													{
													click: function(ev){
														ev.preventDefault();
														dc.pGroup.apply(this,
																		[
																		ev,
																		dc
																		]);
													},
													keypress: function(ev){
														var k = ev.which || ev.keyCode;

														if (k == 13 || k == 32){
															ev.preventDefault();
															dc.pGroup.apply(this,
																			[
																			ev,
																			dc
																			]);
														}
													}
													});

									$A.bind(btnNG,
													{
													click: function(ev){
														ev.preventDefault();
														dc.nGroup.apply(this,
																		[
																		ev,
																		dc
																		]);
													},
													keypress: function(ev){
														var k = ev.which || ev.keyCode;

														if (k == 13 || k == 32){
															ev.preventDefault();
															dc.nGroup.apply(this,
																			[
																			ev,
																			dc
																			]);
														}
													}
													});
								}

								if (vals.timer > 0){
									$A.bind('body', 'keypress.' + bId, function(ev){
										var k = ev.which || ev.keyCode;

										if (k == 27 && !paused){
											paused = true;
											vals.timer = 0;
											ev.preventDefault();
										}
									});
									firstChild(dc.accDCObj).appendChild($A.createEl('div', null, dc.sraCSS, null,
										document.createTextNode(vals.hiddenMsg)));
								}
							},
							focusIn: function(ev, dc){
								paused = true;
								clearTimeout(dc.inc);
							},
							focusOut: function(ev, dc){
								paused = false;
								dc.setInc();
							},
							mouseOver: function(ev, dc){
								paused = true;
								clearTimeout(dc.inc);
							},
							mouseOut: function(ev, dc){
								paused = false;
								dc.setInc();
							},
							setInc: function(){
								var dc = this;

								if (dc.id){
									clearTimeout(dc.inc);

									if (vals.timer > 0)
										dc.inc = setTimeout(function(){
											if (paused)
												return;

											if (forward)
												dc.nSlide(null, true);

											else
												dc.pSlide(null, true);
										}, vals.timer);
								}
							},
							runBeforeClose: function(dc){
								tmpd.innerHTML = '';
							},
							runAfterClose: function(dc){
								$A.unbind(window, '.' + bId);

								if (dc.inc)
									clearTimeout(dc.inc);

								for (var i = 0; i < dc.children.length; i++)
												$A.destroy(dc.children[i].id);
								$A.destroy(dc.id);
							}
							}
							]);
		});
	};

	var tmpd = null, trim = function(str){
		return str.replace(/^\s+|\s+$/g, '');
	}, firstChild = function(e, t){
		var e = e ? e.firstChild : null;

		while (e){
			if (e.nodeType === 1 && (!t || t.toLowerCase() === e.nodeName.toLowerCase()))
				break;

			e = e.nextSibling;
		}
		return e;
	}, str2xml = function(data){
		if (!data)
			data = '';
		var doc;

		if (window.DOMParser){
			var parser = new DOMParser();
			doc = parser.parseFromString(data, "text/xml");
		}

		else{
			doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(data);
		}
		return doc;
	}, animate = function(ele, ele2, targ, targ2, config){
		if (!ele || !ele2)
			return;
		var start = {}, start2 = {}, disp = {}, disp2 = {}, uTotalTime = config.duration || 0;

		for (var t in targ){
			start[t] = parseInt($A.css(ele, t));
			disp[t] = targ[t] - start[t];
		}

		for (var t in targ2){
			start2[t] = parseInt($A.css(ele2, t));
			disp2[t] = targ2[t] - start2[t];
		}
		var freq = Math.PI / (2 * uTotalTime), startTime = new Date().getTime(), tmr = setInterval(function(){
			var elapsedTime = new Date().getTime() - startTime;

			if (elapsedTime < uTotalTime){
				var f = Math.abs(Math.sin(elapsedTime * freq)), nw = {}, nw2 = {};

				for (var s in start){
					nw[s] = Math.round(f * disp[s] + start[s]);
					$A.css(ele, s, nw[s]);
				}

				for (var s in start2){
					nw2[s] = Math.round(f * disp2[s] + start2[s]);
					$A.css(ele2, s, nw2[s]);
				}

				if (config.step)
					config.step.apply(ele,
									[
									nw,
									nw2
									]);
			}

			else{
				clearInterval(tmr);

				for (var t in targ)
								$A.css(ele, t, targ[t]);

				for (var t in targ2)
								$A.css(ele2, t, targ2[t]);

				if (config.complete)
					config.complete.apply(ele,
									[
									targ,
									targ2
									]);
			}
		}, 10);
	};
})();