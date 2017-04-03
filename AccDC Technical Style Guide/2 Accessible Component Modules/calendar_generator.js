/*!
ARIA Calendar Module R1.16
Copyright 2010-2017 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.setCalendar = function(pId, trigger, targ, commentsEnabled, callback, config){

		var config = config || {},
			helpText =
				config.helpText
					? config.helpText
					: 'Press the arrow keys to navigate by day, PageUp and PageDown to navigate by month, Alt+PageUp and Alt+PageDown to navigate by year, or Escape to cancel.',

		// Control the behavior of date selection clicks
		handleClick = callback && typeof callback === 'function' ? callback : function(ev, dc){
			targ.value = dc.range.wDays[dc.range.current.wDay].lng + ' ' + dc.range[dc.range.current.month].name + ' '
				+ dc.range.current.mDay + ', ' + dc.range.current.year;
			dc.close();
		}, key =
						{
						alt: true,
						ctrl: false,
						shift: false
						}, pressed = {}, changePressed = function(ev){
			pressed.alt = ev.altKey;
			pressed.ctrl = ev.ctrlKey;
			pressed.shift = ev.shiftKey;
		};

		// Calendar object declaration start
		$A(
						[
						{
						id: pId,
						role: config.role || 'Calendar',
						trigger: trigger,
						bind: 'opendatepicker',
						allowReopen: true,
						showHiddenClose: commentsEnabled && config.editor && config.editor.show ? false : true,
						controlType: 'DatePicker',
						tooltipTxt: config.tooltipTxt || 'Press Escape to cancel',
						disabledTxt: config.disabledTxt || 'Disabled',
						commentedTxt: config.commentedTxt || 'Has Comment',
						prevTxt: config.prevTxt || 'Previous',
						nextTxt: config.nextTxt || 'Next',
						monthTxt: config.monthTxt || 'Month',
						yearTxt: config.yearTxt || 'Year',
						autoPosition: isNaN(config.autoPosition) ? 9 : config.autoPosition,
						offsetTop: isNaN(config.offsetTop) ? 0 : config.offsetTop,
						offsetLeft: isNaN(config.offsetLeft) ? 0 : config.offsetLeft,
						posAnchor: config.posAnchor,
						targetObj: config.targetObj,
						cssObj: config.cssObj ||
										{
										position: 'absolute',
										zIndex: 1
										},
						className: config.className || 'calendar',
						range:
										{
										0:
														{
														name: config.months && config.months[0] ? config.months[0] : 'January',
														max: 31,
														disabled: {},
														comments: {}
														},
										1:
														{
														name: config.months && config.months[1] ? config.months[1] : 'February',
														max: 28,
														disabled: {},
														comments: {}
														},
										2:
														{
														name: config.months && config.months[2] ? config.months[2] : 'March',
														max: 31,
														disabled: {},
														comments: {}
														},
										3:
														{
														name: config.months && config.months[3] ? config.months[3] : 'April',
														max: 30,
														disabled: {},
														comments: {}
														},
										4:
														{
														name: config.months && config.months[4] ? config.months[4] : 'May',
														max: 31,
														disabled: {},
														comments: {}
														},
										5:
														{
														name: config.months && config.months[5] ? config.months[5] : 'June',
														max: 30,
														disabled: {},
														comments: {}
														},
										6:
														{
														name: config.months && config.months[6] ? config.months[6] : 'July',
														max: 31,
														disabled: {},
														comments: {}
														},
										7:
														{
														name: config.months && config.months[7] ? config.months[7] : 'August',
														max: 31,
														disabled: {},
														comments: {}
														},
										8:
														{
														name: config.months && config.months[8] ? config.months[8] : 'September',
														max: 30,
														disabled: {},
														comments: {}
														},
										9:
														{
														name: config.months && config.months[9] ? config.months[9] : 'October',
														max: 31,
														disabled: {},
														comments: {}
														},
										10:
														{
														name: config.months && config.months[10] ? config.months[10] : 'November',
														max: 30,
														disabled: {},
														comments: {}
														},
										11:
														{
														name: config.months && config.months[11] ? config.months[11] : 'December',
														max: 31,
														disabled: {},
														comments: {}
														},
										wDays:
														[
														{
														shrt: config.days && config.days[0] ? config.days[0].s : 'S',
														lng: config.days && config.days[0] ? config.days[0].l : 'Sunday'
														},
														{
														shrt: config.days && config.days[1] ? config.days[1].s : 'M',
														lng: config.days && config.days[1] ? config.days[1].l : 'Monday'
														},
														{
														shrt: config.days && config.days[2] ? config.days[2].s : 'T',
														lng: config.days && config.days[2] ? config.days[2].l : 'Tuesday'
														},
														{
														shrt: config.days && config.days[3] ? config.days[3].s : 'W',
														lng: config.days && config.days[3] ? config.days[3].l : 'Wednesday'
														},
														{
														shrt: config.days && config.days[4] ? config.days[4].s : 'T',
														lng: config.days && config.days[4] ? config.days[4].l : 'Thursday'
														},
														{
														shrt: config.days && config.days[5] ? config.days[5].s : 'F',
														lng: config.days && config.days[5] ? config.days[5].l : 'Friday'
														},
														{
														shrt: config.days && config.days[6] ? config.days[6].s : 'S',
														lng: config.days && config.days[6] ? config.days[6].l : 'Saturday'
														}
														],
										// Change the week day offset for the calendar display
										wdOffset: isNaN(config.wdOffset) ? 0 : config.wdOffset
										},
						getWDay: function(dc, d, r){
							var d = typeof d === 'number' ? d : dc.range.current.wDay, o = dc.range.wdOffset;

							if (o < 0)
								d = (d + o) < 0 ? 7 + o : d + o;

							else if (o > 0)
								d = (d + o) > 6 ? -1 + ((d + o) - 6) : d + o;

							if (r)
								d = 6 - d;
							return d;
						},
						setFocus: function(o, p, s){
							if (!o)
								return;
							this.current = o;
							$A.query('td.day.selected', this.containerDiv, function(i, p){
								$A.setAttr(p,
												{
												tabindex: '-1'
												});

								$A.remClass(p, 'selected');
							});
							$A.addClass(o, 'selected');
							$A.setAttr(o,
											{
											tabindex: '0'
											});

							if (!s)
								o.focus();
						},
						setCurrent: function(dc){
							dc.range.current =
											{
											mDay: dc.date.getDate(),
											month: dc.date.getMonth(),
											year: dc.date.getFullYear(),
											wDay: dc.date.getDay()
											};
						},
						runOnceBefore: function(dc){
							dc.date = new Date();
							dc.setCurrent(dc);
						},
						runBefore: function(dc){
							if (config.ajax && typeof config.ajax === 'function' && !dc.stopAjax && !dc.ajaxLoading){
								dc.ajaxLoading = dc.cancel = true;
								config.ajax.apply(dc, [dc, false]);
							}

							if (dc.range.current.month === 1)
								dc.range[1].max = (new Date(dc.range.current.year, 1, 29).getMonth() == 1) ? 29 : 28;
							dc.baseId = 'b' + $A.genId();
							dc.prevBtnId = dc.baseId + 'p';
							dc.nextBtnId = dc.baseId + 'n';
							dc.source = '<table role="application" class="calendar" aria-label="' + dc.role
								+ '"><tr role="presentation"><td class="nav" accesskey="1" title="' + dc.prevTxt.replace(/<|>|\"/g, '') + ' '
								+ dc.yearTxt.replace(/<|>|\"/g, '') + '" aria-label="' + dc.prevTxt.replace(/<|>|\"/g, '') + ' '
								+ dc.yearTxt.replace(/<|>|\"/g, '') + '" role="button" id="' + dc.prevBtnId
								+ 'Y" tabindex="0"><span aria-hidden="true">&#8656;</span></td><td title="'
								+ dc.tooltipTxt.replace(/<|>|\"/g, '') + '" colspan="5" class="year" role="presentation"><span>'
								+ dc.range.current.year + '</span></td><td class="nav" accesskey="2" title="'
								+ dc.nextTxt.replace(/<|>|\"/g, '') + ' '
								+ dc.yearTxt.replace(/<|>|\"/g, '') + '" aria-label="' + dc.nextTxt.replace(/<|>|\"/g, '') + ' '
								+ dc.yearTxt.replace(/<|>|\"/g, '') + '" role="button" id="' + dc.nextBtnId
								+ 'Y" tabindex="0"><span aria-hidden="true">&#8658;</span></td></tr><tr role="presentation"><td class="nav" accesskey="3" title="'
								+ dc.prevTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '" aria-label="'
								+ dc.prevTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '" role="button" id="'
								+ dc.prevBtnId
								+ '" tabindex="0"><span aria-hidden="true">&#8592;</span></td><td colspan="5" class="month" role="presentation"><span>'
								+ dc.range[dc.range.current.month].name + '</span></td><td class="nav" accesskey="4" title="'
								+ dc.nextTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '" aria-label="'
								+ dc.nextTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '" role="button" id="'
								+ dc.nextBtnId + '" tabindex="0"><span aria-hidden="true">&#8594;</span></td></tr><tr role="presentation">';
							var pMonth = dc.range.current.month > 0 ? dc.range.current.month - 1 : 11,
								nMonth = dc.range.current.month < 11 ? dc.range.current.month + 1 : 0;
							dc.iter = 0;

							for (var i = 0; i < 7; i++){
								var di = dc.getWDay(dc, i), d = dc.range.wDays[di];

								if (!i){
									dc.iter = dc.iterE = (di + 6) > 6 ? -1 + di : di + 6;
									dc.iterS = di;
								}
								dc.source += '<th scope="col" class="week" title="' + d.lng + '" role="presentation"><span>' + d.shrt
									+ '</span></th>';
							}
							dc.source += '</tr><tr role="presentation">';
							var m = new Date();
							m.setDate(1);
							m.setMonth(dc.range.current.month);
							m.setFullYear(dc.range.current.year);
							var f = m.getDay();
							m.setDate(dc.range[dc.range.current.month].max);
							var e = m.getDay(), w = dc.iterS;

							while (w != f){
								w = (w + 1) > 6 ? 0 : w + 1;
								dc.source += '<td class="empty" role="presentation"><span>&nbsp;</span></td>';
							}
							dc.range.track = {};
							var disabled = dc.range[dc.range.current.month].disabled[dc.range.current.year],
								disabledAll = dc.range[dc.range.current.month].disabled['*'],
								comments = dc.range[dc.range.current.month].comments[dc.range.current.year],
								commentsAll = dc.range[dc.range.current.month].comments['*'];

							for (var i = 1; i <= dc.range[dc.range.current.month].max; i++){
								dc.range.track[dc.baseId + i] = i;
								m.setDate(i);
								var dis = (disabled && $A.inArray(i, disabled) !== -1)
									|| (disabledAll && $A.inArray(i, disabledAll) !== -1) ? true : false, comm = '';

								if (comments && comments[i])
									comm = comments[i];

								else if (commentsAll && commentsAll[i])
									comm = commentsAll[i];

								dc.source += '<td ';

								if (dis)
									dc.source += 'aria-disabled="true" ';

								dc.source += 'aria-label="';

								if (comm)
									dc.source += dc.commentedTxt.replace(/<|>|\"/g, '') + ' ';
								dc.source += i + ', ' + dc.range.wDays[m.getDay()].lng + ' ' + dc.range[dc.range.current.month].name + ' '
									+ dc.range.current.year;

								if (comm)
									dc.source += comm.replace(/<|>|\n/g, ' ').replace(/\"/g, '\"');
								dc.source += '" role="link" tabindex="-1" class="day';

								if (dis)
									dc.source += ' disabled';

								if (comm)
									dc.source += ' comment';
								dc.source += '" title="';

								if (dis)
									dc.source += dc.disabledTxt.replace(/<|>|\"/g, '');

								if (comm)
									dc.source += ' ' + dc.commentedTxt.replace(/<|>|\"/g, '');
								dc.source += '" id="' + dc.baseId + i + '"><span aria-hidden="true">' + i + '</span></td>';
								m.setDate(i);
								var w = m.getDay();

								if (w == dc.iter && i < dc.range[dc.range.current.month].max)
									dc.source += '</tr><tr role="presentation">';
							}

							while (e != dc.iter){
								e = (e + 1) > 6 ? 0 : e + 1;
								dc.source += '<td class="empty" role="presentation"><span>&nbsp;</span></td>';
							}
							dc.source += '</tr></table>';

							// Close other calendar pickers that are currently open
							$A.find('*', function(dc){
								if (dc.controlType && dc.controlType == 'DatePicker' && dc.loaded)
									dc.close();
							});
						},
						click: function(ev, dc){
							ev.stopPropagation();
						},
						runDuring: function(dc){
							dc.datepickerLoaded = false;
							$A.bind('body', 'click.datepicker', function(ev){
								if (dc.datepickerLoaded)
									dc.close();
							});

							$A.setAttr(dc.accDCObj,
											{
											role: 'dialog',
											'data-helptext': dc.helpText,
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
						runAfter: function(dc){
							var nMonth = function(){
								var month = dc.range.current.month == 11 ? 0 : dc.range.current.month + 1,
									year = month > 0 ? dc.range.current.year : dc.range.current.year + 1,
									day = dc.range.current.mDay > dc.range[month].max ? dc.range[month].max : dc.range.current.mDay;
								dc.date = new Date(year, month, day);
								dc.setCurrent(dc);
								dc.reopen = true;
								dc.open();
							}, pMonth = function(){
								var month = dc.range.current.month < 1 ? 11 : dc.range.current.month - 1,
									year = month < 11 ? dc.range.current.year : dc.range.current.year - 1,
									day = dc.range.current.mDay > dc.range[month].max ? dc.range[month].max : dc.range.current.mDay;
								dc.date = new Date(year, month, day);
								dc.setCurrent(dc);
								dc.reopen = true;
								dc.open();
							}, gYear = function(forward){
								var month = dc.range.current.month, year = forward ? dc.range.current.year + 1 : dc.range.current.year - 1;

								if (month === 1)
									dc.range[1].max = 28;
								var day = dc.range.current.mDay > dc.range[month].max ? dc.range[month].max : dc.range.current.mDay;
								dc.date = new Date(year, month, day);
								dc.setCurrent(dc);
								dc.reopen = true;
								dc.open();
							};
							var isKP = false;
							$A.bind('#' + dc.containerDivId + ' td.day',
											{
											focus: function(ev){
												if ($A.hasClass(this, 'comment')){
													var tooltipDC = dc.children[0], year = dc.range[dc.range.current.month].comments[dc.range.current.year],
														all = dc.range[dc.range.current.month].comments['*'], comm = '';

													if (year && year[dc.range.current.mDay])
														comm = year[dc.range.current.mDay];

													else if (all && all[dc.range.current.mDay])
														comm = all[dc.range.current.mDay];
													comm = trim(comm.replace(/<|>/g, ''));

													if (comm){
														tooltipDC.source = comm;
														tooltipDC.open();
													}
												}

												else if (dc.children[0].loaded)
													dc.children[0].close();

												if (dc.children[1].openEditor){
													dc.children[1].openEditor = false;
													dc.children[1].reset();
												}
											},
											click: function(ev){
												dc.date.setDate(dc.range.track[this.id]);
												dc.setCurrent(dc);

												if ($A.hasClass(this, 'selected') || (!commentsEnabled && !$A.hasClass(this, 'comment'))){
													if ($A.inArray(dc.range.current.mDay, dc.range[dc.range.current.month].disabled[dc.range.current.year]
														|| dc.range[dc.range.current.month].disabled['*'] || []) === -1){
														handleClick.apply(this, [ev, dc, targ]);
													}

													else{
														ev.stopPropagation();
														ev.preventDefault();
													}
												}

												else
													dc.setFocus(this);
												ev.preventDefault();
											},
											keydown: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13){
													isKP = true;

													if ($A.inArray(dc.range.current.mDay, dc.range[dc.range.current.month].disabled[dc.range.current.year]
														|| dc.range[dc.range.current.month].disabled['*'] || []) === -1){
														handleClick.apply(this, [ev, dc, targ]);
													}

													ev.preventDefault();
												}

												else if (k == 32 && commentsEnabled && config.editor && config.editor.show && !dc.children[1].openEditor){
													dc.children[1].openEditor = true;
													dc.children[1].reset();
													ev.preventDefault();
												}

												else if ((k >= 37 && k <= 40) || k == 27 || (k >= 33 && k <= 36)){
													var wd = dc.range.current.wDay;

													if (k == 37){
														if (wd != dc.iterS && dc.range.current.mDay > 1){
															dc.range.current.mDay--;
															dc.range.current.wDay = (wd - 1) < 0 ? 6 : wd - 1;
															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else if (wd != dc.iterS && dc.range.current.mDay == 1 && wd > 0){
															var month = dc.range.current.month < 1 ? 11 : dc.range.current.month - 1,
																year = month < 11 ? dc.range.current.year : dc.range.current.year - 1, day = dc.range[month].max;

															if (month === 1)
																day = (new Date(year, 1, 29).getMonth() == 1) ? 29 : 28;
															dc.date = new Date(year, month, day);
															dc.setCurrent(dc);
															dc.reopen = true;
															dc.open();
														}
													}

													else if (k == 39){
														if (wd != dc.iterE && dc.range.current.mDay < dc.range[dc.range.current.month].max){
															dc.range.current.mDay++;
															dc.range.current.wDay = (wd + 1) > 6 ? 0 : wd + 1;
															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else if (wd != dc.iterE && dc.range.current.mDay == dc.range[dc.range.current.month].max && wd < 6){
															var month = dc.range.current.month == 11 ? 0 : dc.range.current.month + 1,
																year = month > 0 ? dc.range.current.year : dc.range.current.year + 1;
															dc.date = new Date(year, month, 1);
															dc.setCurrent(dc);
															dc.reopen = true;
															dc.open();
														}
													}

													else if (k == 38){
														if ((dc.range.current.mDay - 7) > 0){
															dc.range.current.mDay -= 7;
															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else{
															var month = dc.range.current.month < 1 ? 11 : dc.range.current.month - 1,
																year = month < 11 ? dc.range.current.year : dc.range.current.year - 1;

															if (month === 1 && (new Date(year, 1, 29).getMonth() == 1))
																dc.range[month].max = 29;

															else if (month === 1)
																dc.range[month].max = 28;
															var day = dc.range[month].max + (dc.range.current.mDay - 7);
															dc.date = new Date(year, month, day);
															dc.setCurrent(dc);
															dc.reopen = true;
															dc.open();
														}
													}

													else if (k == 40){
														if ((dc.range.current.mDay + 7) <= dc.range[dc.range.current.month].max){
															dc.range.current.mDay += 7;
															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else{
															var month = dc.range.current.month == 11 ? 0 : dc.range.current.month + 1,
																year = month > 0 ? dc.range.current.year : dc.range.current.year + 1,
																day = dc.range.current.mDay + 7 - dc.range[dc.range.current.month].max;
															dc.date = new Date(year, month, day);
															dc.setCurrent(dc);
															dc.reopen = true;
															dc.open();
														}
													}

													else if (k == 27){
														dc.close();
													}

													else if (k == 33){
														if (pressed.alt)
															gYear(true);

														else
															nMonth();
													}

													else if (k == 34){
														if (pressed.alt)
															gYear();

														else
															pMonth();
													}

													else if (k == 36){
														if (wd != dc.iterS && dc.range.current.mDay > 1){
															while (dc.range.current.wDay != dc.iterS && $A.getEl(dc.baseId + (dc.range.current.mDay - 1))){
																dc.range.current.wDay = (dc.range.current.wDay - 1) < 0 ? 6 : dc.range.current.wDay - 1;
																dc.range.current.mDay--;
															}
															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}
													}

													else if (k == 35){
														if (wd != dc.iterE && dc.range.current.mDay < dc.range[dc.range.current.month].max){
															while (dc.range.current.wDay != dc.iterE && $A.getEl(dc.baseId + (dc.range.current.mDay + 1))){
																dc.range.current.wDay = (dc.range.current.wDay + 1) > 6 ? 0 : dc.range.current.wDay + 1;
																dc.range.current.mDay++;
															}
															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}
													}
													ev.preventDefault();
												}

												else if (k == 9 && !pressed.alt && !pressed.ctrl && !pressed.shift){
													$A.getEl(dc.prevBtnId + 'Y').focus();
													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 && !isKP){
													if ($A.inArray(dc.range.current.mDay, dc.range[dc.range.current.month].disabled[dc.range.current.year]
														|| dc.range[dc.range.current.month].disabled['*'] || []) === -1){
														if (!dc.setFocus.firstOpen)
															handleClick.apply(this, [ev, dc, targ]);
													}

													ev.preventDefault();
												}

												isKP = dc.setFocus.firstOpen = false;
											}
											});

							$A.bind('#' + dc.prevBtnId,
											{
											click: function(ev){
												pMonth();
												ev.preventDefault();
											},
											keydown: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 || k == 32){
													pMonth();
													ev.preventDefault();
												}

												else if (k == 27){
													dc.close();
													ev.preventDefault();
												}

												else if (k == 38){
													$A.getEl(dc.prevBtnId + 'Y').focus();
													ev.preventDefault();
												}

												else if (k == 39){
													$A.getEl(dc.nextBtnId).focus();
													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
											}
											});
							$A.bind('#' + dc.nextBtnId,
											{
											click: function(ev){
												nMonth();
												ev.preventDefault();
											},
											keydown: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 || k == 32){
													nMonth();
													ev.preventDefault();
												}

												else if (k == 27){
													dc.close();
													ev.preventDefault();
												}

												else if (k == 38){
													$A.getEl(dc.nextBtnId + 'Y').focus();
													ev.preventDefault();
												}

												else if (k == 37){
													$A.getEl(dc.prevBtnId).focus();
													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
											}
											});

							$A.bind('#' + dc.prevBtnId + 'Y',
											{
											click: function(ev){
												gYear();
												ev.preventDefault();
											},
											keydown: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 || k == 32){
													gYear();
													ev.preventDefault();
												}

												else if (k == 27){
													dc.close();
													ev.preventDefault();
												}

												else if (k == 9 && !pressed.alt && !pressed.ctrl && pressed.shift){
													$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();
													ev.preventDefault();
												}

												else if (k == 39){
													$A.getEl(dc.nextBtnId + 'Y').focus();
													ev.preventDefault();
												}

												else if (k == 40){
													$A.getEl(dc.prevBtnId).focus();
													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
											}
											});
							$A.bind('#' + dc.nextBtnId + 'Y',
											{
											click: function(ev){
												gYear(true);
												ev.preventDefault();
											},
											keydown: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 || k == 32){
													gYear(true);
													ev.preventDefault();
												}

												else if (k == 27){
													dc.close();
													ev.preventDefault();
												}

												else if (k == 37){
													$A.getEl(dc.prevBtnId + 'Y').focus();
													ev.preventDefault();
												}

												else if (k == 40){
													$A.getEl(dc.nextBtnId).focus();
													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
											}
											});

							dc.range.index = $A.query('td.day', dc.containerDiv);
							dc.setFocus.firstOpen = true;
							dc.setFocus(dc.range.index[dc.range.current.mDay - 1]);

							if (commentsEnabled && config.editor && config.editor.show)
								dc.children[1].open();

							$A.bind(window, 'resize.datepicker', function(ev){
								dc.setPosition();
							});

							$A.setAttr(dc.triggerObj, 'aria-expanded', 'true');
							setTimeout(function(){
								dc.datepickerLoaded = true;
							}, 750);

							$A.announce(dc.helpText);
						},
						helpText: helpText,
						tabOut: function(ev, dc){
						// dc.close();
						},
						runAfterClose: function(dc){
							if (!dc.reopen){
								if (config.resetCurrent){
									dc.date = new Date();
									dc.setCurrent(dc);
								}

								if (commentsEnabled)
									dc.children[0].close();

								if (commentsEnabled && config.editor && config.editor.show){
									dc.children[1].lock = false;
									dc.children[1].close();
								}
							}

							else
								dc.reopen = false;

							if (config.ajax && typeof config.ajax === 'function')
								dc.lock = dc.ajaxLoading = false;

							$A.unbind(window, '.datepicker');
							$A.unbind('body', '.datepicker');

							$A.setAttr(dc.triggerObj, 'aria-expanded', 'false');
						}
						}
						]);
		// Calendar object declaration end

		$A.setAttr(trigger, 'aria-expanded', 'false');

		var odc = $A.reg[pId], odcDel = false, odcDelFn = function(){
			odcDel = false;
		};
		$A.bind(trigger, 'click', function(ev){
			if (!odcDel && !odc.loaded){
				odcDel = true;
				$A.trigger(this, 'opendatepicker');
				setTimeout(odcDelFn, 1000);
			}

			else if (!odcDel && odc.loaded){
				odcDel = true;
				odc.close();
				setTimeout(odcDelFn, 1000);
			}
			ev.preventDefault();
		});

		// Comment object declaration start
		$A($A.reg[pId],
						[
						{
						id: pId + 'commentTooltip',
						role: config.comments && config.comments.role || 'Comment',
						returnFocus: false,
						showHiddenClose: false,
						allowReopen: true,
						autoPosition: isNaN(config.comments && config.comments.autoPosition) ? 1 : config.comments.autoPosition,
						offsetTop: isNaN(config.comments && config.comments.offsetTop) ? 0 : config.comments.offsetTop,
						offsetLeft: isNaN(config.comments && config.comments.offsetLeft) ? 0 : config.comments.offsetLeft,
						cssObj:
										{
										position: 'absolute',
										zIndex: $A.reg[pId].cssObj.zIndex
										},
						className: config.comments && config.comments.className || 'commentTooltip',
						runBefore: function(dc){
							dc.triggerObj = dc.parent.accDCObj;
						}
						}
						]);
		// Comment object declaration end

		// Form object declaration start
		$A($A.reg[pId],
						[
						{
						id: pId + 'commentAdd',
						role: config.editor && config.editor.role || 'Edit',
						returnFocus: false,
						allowReopen: true,
						autoPosition: isNaN(config.editor && config.editor.autoPosition) ? 6 : config.editor.autoPosition,
						offsetTop: isNaN(config.editor && config.editor.offsetTop) ? 0 : config.editor.offsetTop,
						offsetLeft: isNaN(config.editor && config.editor.offsetLeft) ? 0 : config.editor.offsetLeft,
						cssObj:
										{
										position: 'absolute',
										zIndex: $A.reg[pId].cssObj.zIndex
										},
						className: config.editor && config.editor.className || 'commentAdd',
						openEditor: false,
						source: '<textarea style="visibility: hidden; display: none;" class="commentTa" title="'
							+ $A.reg[pId + 'commentTooltip'].role + '"></textarea><button title="'
							+ (config.editor && config.editor.role || 'Edit') + ' ' + $A.reg[pId + 'commentTooltip'].role
								+ '" class="commentBtn">' + (config.editor && config.editor.role || 'Edit') + '</button>',
						runBefore: function(dc){
							dc.triggerObj = dc.parent.accDCObj;
						},
						click: function(ev, dc){
							ev.stopPropagation();
						},
						runDuring: function(dc){
							$A.setAttr(dc.accDCObj,
											{
											role: 'dialog',
											'aria-label': dc.role
											});

							$A.setAttr(dc.containerDiv, 'role', 'application');

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
						add: function(dc){
							var comm = trim(dc.textarea.value.replace(/<|>|\n/g, ' '));

							if (!dc.comments[dc.parent.range.current.year])
								dc.comments[dc.parent.range.current.year] = {};
							dc.comments[dc.parent.range.current.year][dc.parent.range.current.mDay] = comm;
							var lbl = dc.parent.range.current.mDay + ', ' + dc.parent.range.wDays[dc.parent.range.current.wDay].lng + ' '
								+ dc.parent.range[dc.parent.range.current.month].name + ' ' + dc.parent.range.current.year, pre = '';

							if ((dc.parent.range[dc.parent.range.current.month].disabled[dc.parent.range.current.year]
								&& $A.inArray(dc.parent.range.current.mDay,
									dc.parent.range[dc.parent.range.current.month].disabled[dc.parent.range.current.year]) !== -1)
								|| (dc.parent.range[dc.parent.range.current.month].disabled['*'] && $A.inArray(dc.parent.range.current.mDay,
									dc.parent.range[dc.parent.range.current.month].disabled['*']) !== -1))
								pre += dc.parent.disabledTxt.replace(/<|>|\"/g, '') + ' ';

							if (!comm)
								$A.remClass(dc.parent.current, 'comment');

							else{
								$A.addClass(dc.parent.current, 'comment');
								pre += dc.parent.commentedTxt.replace(/<|>|\"/g, '') + ' ';
							}
							lbl = pre + lbl;
							$A.setAttr(dc.parent.current,
											{
											title: trim(pre),
											'aria-label': lbl + ' ' + comm.replace(/\"/g, '\"')
											});
						},
						reset: function(){
							var dc = this;

							if (dc.openEditor){
								dc.comments = dc.parent.range[dc.parent.range.current.month].comments;

								if (!dc.textarea)
									dc.textarea = $A.query('textarea', dc.containerDiv, function(){
										$A.css(this,
														{
														visibility: '',
														display: ''
														});

										dc.css('left', dc.parent.accDCObj.offsetLeft);
										$A.bind(this,
														{
														focus: function(ev){
															if (dc.parent.children[0].loaded)
																dc.parent.children[0].close();
														},
														keydown: function(ev){
															var k = ev.which || ev.keyCode;

															if (this.value.length > 800)
																this.value = this.value.substring(0, 799);

															if (k == 13){
																dc.add.apply(this, [dc]);
																dc.parent.current.focus();
																dc.openEditor = false;
																dc.reset();
																ev.preventDefault();
															}

															else if (k == 27){
																dc.parent.current.focus();
																dc.openEditor = false;
																dc.reset();
																ev.preventDefault();
															}
														}
														});
									})[0];

								else{
									$A.css(dc.textarea,
													{
													visibility: '',
													display: ''
													});

									dc.css('left', dc.parent.accDCObj.offsetLeft);
								}
								$A.setAttr(dc.textarea,
												{
												title: dc.parent.range.current.mDay + ', '
													+ dc.parent.range.wDays[dc.parent.range.current.wDay].lng + ' '
													+ dc.parent.range[dc.parent.range.current.month].name + ' ' + dc.parent.range.current.year
												}).focus();

								if (dc.comments[dc.parent.range.current.year]
									&& dc.comments[dc.parent.range.current.year][dc.parent.range.current.mDay])
									dc.textarea.value = dc.comments[dc.parent.range.current.year][dc.parent.range.current.mDay];
								$A.setAttr(dc.commentBtn,
												{
												title: (config.editor && config.editor.action1 || 'Save') + ' ' + $A.reg[pId + 'commentTooltip'].role
												}).innerHTML = config.editor && config.editor.action1 || 'Save';
							}

							else{
								if (dc.textarea){
									dc.textarea.value = '';
									$A.css(dc.textarea,
													{
													visibility: 'hidden',
													display: 'none'
													});
								}

								dc.css('left', dc.parent.accDCObj.offsetLeft + dc.parent.accDCObj.offsetWidth - dc.accDCObj.offsetWidth);
								$A.setAttr(dc.commentBtn,
												{
												title: (config.editor && config.editor.role || 'Edit') + ' ' + $A.reg[pId + 'commentTooltip'].role
												}).innerHTML = config.editor && config.editor.role || 'Edit';
							}
						},
						runAfter: function(dc){
							$A.query('button', dc.containerDiv, function(){
								dc.commentBtn = this;
								$A.bind(this,
												{
												focus: function(ev){
													if (dc.parent.children[0].loaded)
														dc.parent.children[0].close();
												},
												click: function(ev){
													if (dc.openEditor){
														dc.add.apply(this, [dc]);
														dc.parent.current.focus();
														dc.openEditor = false;
														dc.reset();
													}

													else{
														dc.openEditor = true;
														dc.reset();
													}
													ev.preventDefault();
												},
												keydown: function(ev){
													var k = ev.which || ev.keyCode;

													if (k == 27){
														if (dc.openEditor){
															dc.parent.current.focus();
															dc.openEditor = false;
															dc.reset();
														}

														else
															dc.parent.close();
														ev.preventDefault();
													}
												}
												});
							});
							dc.reset();
							dc.lock = true;

							$A.bind(window, 'resize.dateeditor', function(ev){
								dc.setPosition();
								dc.reset();
							});
						},
						tabOut: function(ev, dc){
							dc.parent.close();
						},
						runBeforeClose: function(dc){
							dc.openEditor = false;
							dc.textarea = null;

							$A.unbind(window, 'resize.dateeditor');

							if (config.ajax && typeof config.ajax === 'function')
								config.ajax.apply(dc.parent, [dc.parent, true]);

							dc.parent.setFocus.firstOpen = true;
						},
						lock: commentsEnabled && config.editor && config.editor.show ? false : true
						}
						]);
	// Form object declaration end

	};

	var trim = function(str){
		return str.replace(/^\s+|\s+$/g, '');
	};
})();