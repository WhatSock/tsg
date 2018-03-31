/*!
ARIA Calendar Module R2.0
Copyright 2010-2018 Bryan Garaventa (WhatSock.com)
Refactoring Contributions Copyright 2018 Danny Allen (dannya.com) / Wonderscore Ltd (wonderscore.co.uk)
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
			handleClick = (callback && typeof callback === 'function') ? callback : function(ev, dc){
				// format selected calendar value and set into input field
				targ.value = dc.formatDate(
					dc,
					{
						'YYYY': dc.range.current.year,
						'MMMM': dc.range[dc.range.current.month].name,
						'dddd': dc.range.wDays[dc.range.current.wDay].lng,
						'MM': ('00' + (dc.range.current.month + 1)).slice(-2),
						'DD': ('00' + dc.range.current.mDay).slice(-2),
						'Do': dc.getDateOrdinalSuffix(dc.range.current.mDay),
						'M': (dc.range.current.month + 1),
						'D': dc.range.current.mDay
					}
				);

				dc.close();
			},

			pressed = {},
			changePressed = function(ev){
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
						showHiddenClose: false,
						controlType: 'DatePicker',
						tooltipTxt: config.tooltipTxt || 'Press Escape to cancel',
						markedTxt: config.markedTxt || 'Selected',
						disabledTxt: config.disabledTxt || 'Disabled',
						commentedTxt: config.commentedTxt || 'Has Comment',
						prevTxt: config.prevTxt || 'Previous',
						nextTxt: config.nextTxt || 'Next',
						monthTxt: config.monthTxt || 'Month',
						yearTxt: config.yearTxt || 'Year',
						leftButtonYearText: config.leftButtonYearText || '&#8656;',
						rightButtonYearText: config.rightButtonYearText || '&#8658;',
						leftButtonMonthText: config.leftButtonMonthText || '&#8592;',
						rightButtonMonthText: config.rightButtonMonthText || '&#8594;',
						drawFullCalendar: (config.drawFullCalendar === true),
						highlightToday: (config.highlightToday === true),
						pageUpDownNatural: (config.pageUpDownNatural === true),
						autoPosition: isNaN(config.autoPosition) ? 9 : config.autoPosition,
						offsetTop: isNaN(config.offsetTop) ? 0 : config.offsetTop,
						offsetLeft: isNaN(config.offsetLeft) ? 0 : config.offsetLeft,
						posAnchor: config.posAnchor,
						targetObj: config.targetObj,
						inputDateFormat: config.inputDateFormat || 'dddd MMMM D, YYYY',
						audibleDateFormat: config.audibleDateFormat || 'D, MMMM YYYY (dddd)',
						initialDate: ((config.initialDate instanceof Date) ? config.initialDate : new Date()),
						minDate: ((config.minDate !== undefined) ? (config.minDate instanceof Date ? config.minDate : new Date((new Date()).setDate((new Date()).getDate() + config.minDate))) : undefined),
						maxDate: ((config.maxDate !== undefined) ? (config.maxDate instanceof Date ? config.maxDate : new Date((new Date()).setDate((new Date()).getDate() + config.maxDate))) : undefined),
						disableWeekdays: (config.disableWeekdays !== undefined) ? config.disableWeekdays : false,
						disableWeekends: (config.disableWeekends !== undefined) ? config.disableWeekends : false,
						cssObj: config.cssObj ||
										{
										position: 'absolute',
										zIndex: 1
										},
						className: config.className || 'calendar',
						range:
										{
										disabledWDays: [],
										0:
														{
														name: config.months && config.months[0] ? config.months[0] : 'January',
														max: 31,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										1:
														{
														name: config.months && config.months[1] ? config.months[1] : 'February',
														max: 28,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										2:
														{
														name: config.months && config.months[2] ? config.months[2] : 'March',
														max: 31,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										3:
														{
														name: config.months && config.months[3] ? config.months[3] : 'April',
														max: 30,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										4:
														{
														name: config.months && config.months[4] ? config.months[4] : 'May',
														max: 31,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										5:
														{
														name: config.months && config.months[5] ? config.months[5] : 'June',
														max: 30,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										6:
														{
														name: config.months && config.months[6] ? config.months[6] : 'July',
														max: 31,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										7:
														{
														name: config.months && config.months[7] ? config.months[7] : 'August',
														max: 31,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										8:
														{
														name: config.months && config.months[8] ? config.months[8] : 'September',
														max: 30,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										9:
														{
														name: config.months && config.months[9] ? config.months[9] : 'October',
														max: 31,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										10:
														{
														name: config.months && config.months[10] ? config.months[10] : 'November',
														max: 30,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
														},
										11:
														{
														name: config.months && config.months[11] ? config.months[11] : 'December',
														max: 31,
														marked: {},
														disabled: {},
														disabledWDays: [],
														comments: {},
														message: {}
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
						getDateOrdinalSuffix: function (i) {
							var j = i % 10,
								k = i % 100;

							if (j == 1 && k != 11) {
								return i + 'st';
							}
							if (j == 2 && k != 12) {
								return i + 'nd';
							}
							if (j == 3 && k != 13) {
								return i + 'rd';
							}

							return i + 'th';
						},
						formatDate: function (dc, dateFormatTokens, dateFormat) {
							// if dateFormat is not specified, use component default
							if (typeof dateFormat !== 'string') {
								dateFormat = dc.inputDateFormat;
							}

							var re = new RegExp(Object.keys(dateFormatTokens).join('|'), 'gi');

							return dateFormat.replace(re, function (matched){
								return dateFormatTokens[matched];
							});
						},
						modifyDateValues: function (values, modifications) {
							// Note: Months are zero based
							for (var key in modifications) {
								var modification = modifications[key];

								if (key === 'month') {
									values.month += modification;

									if (modification < 0) {
										// Subtraction
										if (values.month < 0) {
											values.month = 11;

											if (values.year) {
												values.year -= 1;
											}
										}

									} else {
										// Addition
										if (values.month > 11) {
											values.month = 0;

											if (values.year) {
												values.year += 1;
											}
										}
									}
								}
							}

							return values;
						},
						setFocus: function(o, p, s){
							var dc = this;

							if (!o)
								return false;

							this.current = o;
							$A.query('td.dayInMonth.selected', this.containerDiv, function(i, p){
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

							if (!s){
								if (dc.navBtn == 'PM'){
									dc.buttons.pM.focus();
									$A.announce(dc.range[dc.range.current.month].name);
									dc.navBtnS = true;
								}

								else if (dc.navBtn == 'NM'){
									dc.buttons.nM.focus();
									$A.announce(dc.range[dc.range.current.month].name);
									dc.navBtnS = true;
								}

								else if (dc.navBtn == 'PY'){
									dc.buttons.pY.focus();
									$A.announce(dc.range.current.year.toString());
									dc.navBtnS = true;
								}

								else if (dc.navBtn == 'NY'){
									dc.buttons.nY.focus();
									$A.announce(dc.range.current.year.toString());
									dc.navBtnS = true;
								}

								else
									o.focus();
							}

							if (dc.fn.navBtn)
								dc.fn.navBtn = '';

							else
								dc.navBtn = '';

							return true;
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
						setDayMarked: function (dc, dateObj, isMarked) {
							var year = dateObj.getFullYear(),
								month = dateObj.getMonth(),
								day = dateObj.getDate();

							if (isMarked) {
								// initialise marked array for month if it doesn't exist
								if (typeof dc.range[month].marked[year] !== 'object') {
									dc.range[month].marked[year] = [];
								}

								// set day as marked
								dc.range[month].marked[year].push(day);

							} else {
								// unset day as marked
								if (typeof dc.range[month].marked[year] === 'object') {
									var arrIndex = dc.range[month].marked[year].indexOf(day);

									if (arrIndex !== -1) {
										delete dc.range[month].marked[year][arrIndex];
									}
								}
							}
						},
						clearAllMarked: function (dc) {
							for (var month in dc.range) {
								dc.range[month].marked = {};
							}
						},
						setDayDisabled: function (dc, dateObj, isDisabled) {
							var year = dateObj.getFullYear(),
									month = dateObj.getMonth(),
									day = dateObj.getDate();

							if (isDisabled) {
								// initialise disabled array for month if it doesn't exist
								if (typeof dc.range[month].disabled[year] !== 'object') {
									dc.range[month].disabled[year] = [];
								}

								// set day as disabled
								dc.range[month].disabled[year].push(day);

							} else {
								// unset day as disabled
								if (typeof dc.range[month].disabled[year] === 'object') {
									var arrIndex = dc.range[month].disabled[year].indexOf(day);

									if (arrIndex !== -1) {
										delete dc.range[month].disabled[year][arrIndex];
									}
								}
							}
						},
						setMonthDisabled: function (dc, dateObj, isDisabled) {
							var year = dateObj.getFullYear(),
									month = dateObj.getMonth();

							if (isDisabled) {
								// reset month disabled array
								dc.range[month].disabled[year] = [];

								// set each day in month as disabled
								for (var day = 1; day <= dc.range[month].max; day++){
									dc.range[month].disabled[year].push(day);
								}

							} else {
								// unset month as disabled
								dc.range[month].disabled[year] = [];
							}
						},
						setDayOfWeekDisabled: function (dc, dateObj, daysOfWeek, isDisabled) {
							var year = dateObj.getFullYear(),
									month = dateObj.getMonth();

							// initialise disabled array for month if it doesn't exist
							if (typeof dc.range[month].disabled[year] !== 'object') {
								dc.range[month].disabled[year] = [];
							}

							// initialise local modifiable date that we will use to call the native getDay() method on
							var date = new Date(year, month, 1);

							for (var day = 1; day <= dc.range[month].max; day++){
								date.setDate(day);

								if (daysOfWeek.indexOf(date.getDay()) !== -1) {
									if (isDisabled) {
										dc.range[month].disabled[year].push(day);

									} else {
										// unset day as disabled
										var arrIndex = dc.range[month].marked[year].indexOf(day);

										if (arrIndex !== -1) {
											delete dc.range[month].marked[year][arrIndex];
										}
									}
								}
							}
						},
						setWeekdaysDisabled: function (dc, dateObj, isDisabled) {
							// 0 = Sunday, 6 = Saturday
							dc.setDayOfWeekDisabled(dc, dateObj, [1, 2, 3, 4, 5], isDisabled);
						},
						setWeekendsDisabled: function (dc, dateObj, isDisabled) {
							// 0 = Sunday, 6 = Saturday, which are the days we are not setting
							dc.setDayOfWeekDisabled(dc, dateObj, [0, 6], isDisabled);
						},
						clearAllDisabled: function (dc) {
							for (var month in dc.range) {
								dc.range[month].disabled = {};
							}
						},
						setMonthMessage: function (dc, dateObj, message) {
							var year = dateObj.getFullYear(),
									month = dateObj.getMonth();

							if ((typeof message === 'string') && (message.length > 0)) {
								// set month message
								dc.range[month].message[year] = message;

							} else {
								// unset month message
								delete dc.range[month].message[year];
							}
						},
						clearAllMessage: function (dc) {
							for (var month in dc.range) {
								dc.range[month].message = {};
							}
						},
						isDisabledDate: function(dc, counter, dateObj, cmpObj){
							if (!cmpObj) {
								cmpObj = dc.range.current;
							}

							var disabled = dc.range[cmpObj.month].disabled[cmpObj.year],
								disabledAll = dc.range[cmpObj.month].disabled['*'],
								disabledWDays = dc.range[cmpObj.month].disabledWDays,
								disabledAllWDays = dc.range.disabledWDays;

							var wkd = dateObj.getDay();

							return !!((disabled && $A.inArray(counter, disabled) !== -1) || (disabledAll && $A.inArray(counter, disabledAll) !== -1)
								|| (disabledWDays.length && $A.inArray(wkd, disabledWDays) !== -1)
								|| (disabledAllWDays.length && $A.inArray(wkd, disabledAllWDays) !== -1)
								|| dc.isOutsideDateRange(dateObj));

						},
						isOutsideDateRange: function(dateObj){
							var dateCmp = this.createDateComparisonValue(dateObj);

							return (
								(this.minDateComparisonValue && (dateCmp < this.minDateComparisonValue)) ||
								(this.maxDateComparisonValue && (dateCmp > this.maxDateComparisonValue))
							);
						},
						createDayCell: function(i, cellDateObj, cssClasses, isDisabled, isSelected){
							var dc = this;

							var cell = '<td ';

							// set correct ARIA attributes
							if (isSelected){
								cell += 'aria-current="date" ';
							}

							if (isDisabled){
								cell += 'aria-disabled="true" ';
							}

							cell += 'aria-label="';

							// draw comment?
							var comments = dc.range[dc.range.current.month].comments[dc.range.current.year],
								commentsAll = dc.range[dc.range.current.month].comments['*'];

							var comm = '';
							if (comments && comments[i])
								comm = comments[i];
							else if (commentsAll && commentsAll[i])
								comm = commentsAll[i];

							if (comm){
								cell += dc.commentedTxt.replace(/<|>|\"/g, '') + ' ';
							}

							var month = cellDateObj.getMonth();
							var dateFormatTokens = {
								'YYYY': cellDateObj.getFullYear(),
								'MMMM': dc.range[month].name,
								'dddd': dc.range.wDays[cellDateObj.getDay()].lng,
								'MM': ('00' + (month + 1)).slice(-2),
								'DD': ('00' + i).slice(-2),
								'Do': dc.getDateOrdinalSuffix(i),
								'M': (month + 1),
								'D': i
							};

							// set audible date value
							var re = new RegExp(Object.keys(dateFormatTokens).join('|'), 'gi');

							cell += dc.audibleDateFormat.replace(re, function (matched){
								return dateFormatTokens[matched];
							});

							if (comm){
								cell += comm.replace(/<|>|\n/g, ' ').replace(/\"/g, '\"');
							}
							cell += '" role="link" tabindex="-1" ';

							// CSS classes
							cell += 'class="day ' + (cssClasses ? cssClasses : '');

							if (dc.highlightToday === true){
								if (dc.createDateComparisonValue(cellDateObj) === dc.currentDateComparisonValue) {
									cell += ' dayToday';
								}
							}

							// set date as visually marked?
							var isMarked = (
								dc.range[dc.range.current.month].marked[dc.range.current.year] &&
								(dc.range[dc.range.current.month].marked[dc.range.current.year].indexOf(i) !== -1)
							);

							if ((isSelected && !isDisabled) || isMarked){
								cell += ' dayMarked';
							}

							if (isDisabled){
								cell += ' disabled';
							}

							if (comm){
								cell += ' comment';
							}
							cell += '" ';

							// Title attribute
							cell += 'title="';

							if (isMarked){
								cell += dc.markedTxt.replace(/<|>|\"/g, '');

							} else if (isDisabled){
								cell += dc.disabledTxt.replace(/<|>|\"/g, '');
							}

							if (comm){
								cell += ' ' + dc.commentedTxt.replace(/<|>|\"/g, '');
							}
							cell += '" id="' + dc.baseId + i + '"><span aria-hidden="true">' + i + '</span></td>';

							return cell;
						},
						createDateComparisonValue: function (dateObj){
							return parseInt(
								(
									dateObj.getFullYear() +
									('00' + dateObj.getMonth()).slice(-2) +
									('00' + dateObj.getDate()).slice(-2)
								),
								10
							);
						},
						setDate: function(dc, dateObj){
							// if dateObj is not specified, set to an initial value...
							if (dateObj === undefined){
								// ensure initialDate value is within any set date range
								if ((dc.minDate || dc.maxDate) && dc.isOutsideDateRange(dc.initialDate)) {
									// initialDate config value is outside of the valid date range, determine an optimal initial date value
									if (dc.initialDate < dc.minDate) {
										dateObj = dc.minDate;
									} else if (dc.initialDate > dc.maxDate) {
										dateObj = dc.maxDate;
									}

								} else {
									// set to initialDate config value
									dateObj = dc.initialDate;
								}
							}

							dc.date = dateObj;
							dc.setCurrent(dc);
							dc.fn.current = {};
							$A.internal.extend(true, dc.fn.current, dc.range.current);
						},
						runOnceBefore: function(dc){
							// If we have minDate / maxDate set, ensure they don't have time precision, and create comparison value
							if (dc.minDate) {
								dc.minDate.setHours(0, 0, 0, 0);
								dc.minDateComparisonValue = dc.createDateComparisonValue(dc.minDate);
							}
							if (dc.maxDate) {
								dc.maxDate.setHours(0, 0, 0, 0);
								dc.maxDateComparisonValue = dc.createDateComparisonValue(dc.maxDate);
							}

							// set date to initialDate
							this.setDate(dc);

							// Cache current date for comparison
							dc.currentDate = new Date();
							dc.currentDateComparisonValue = dc.createDateComparisonValue(dc.currentDate);
						},
						runBefore: function(dc){
							// Run custom specified function?
							if (typeof config.runBefore === 'function'){
								config.runBefore(dc);
							}

							// based on config option, disable weekdays?
							if (dc.disableWeekdays) {
								dc.setWeekdaysDisabled(dc, dc.date, true);
							}

							// based on config option, disable weekends?
							if (dc.disableWeekends) {
								dc.setWeekendsDisabled(dc, dc.date, true);
							}

							if (config.ajax && typeof config.ajax === 'function' && !dc.stopAjax && !dc.ajaxLoading){
								dc.ajaxLoading = dc.cancel = true;
								dc.fn.navBtn = dc.navBtn;
								config.ajax.apply(dc, [dc, false]);
							}

							if (dc.range.current.month === 1)
								dc.range[1].max = (new Date(dc.range.current.year, 1, 29).getMonth() == 1) ? 29 : 28;
							dc.baseId = 'b' + $A.genId();
							dc.prevBtnId = dc.baseId + 'p';
							dc.nextBtnId = dc.baseId + 'n';

							// Calculate prev/next month date values, and whether they are within the allowed date range
							var prevDateValues = dc.modifyDateValues(
												{
									month: dc.range.current.month,
									year: dc.range.current.year
												},
												{
														month: -1
												}
											);

							var prevMonth = new Date();
							prevMonth.setMonth(prevDateValues.month);
							prevMonth.setFullYear(prevDateValues.year);

							var nextDateValues = dc.modifyDateValues(
								{
									month: dc.range.current.month,
									year: dc.range.current.year
								},
								{
									month: 1
								}
							);

							var nextMonth = new Date();
							nextMonth.setMonth(nextDateValues.month);
							nextMonth.setFullYear(nextDateValues.year);

							// Draw the year display and prev/next year buttons?
							var yearSelector = '';

							if (!config.condenseYear){
								var hasPrevYear = !dc.isOutsideDateRange(new Date((dc.range.current.year - 1), 0, 1)),
									hasNextYear = !dc.isOutsideDateRange(new Date((dc.range.current.year + 1), 0, 1));

								yearSelector = '<tr class="yearSelector" role="presentation">' +
									'<td class="nav prev btn year' + (!hasPrevYear ? ' disabled' : '') + '" accesskey="1" title="'
									+ dc.prevTxt.replace(/<|>|\"/g, '') + ' '
									+ dc.yearTxt.replace(/<|>|\"/g, '') + '" aria-label="' + dc.prevTxt.replace(/<|>|\"/g, '') + ' '
									+ dc.yearTxt.replace(/<|>|\"/g, '') + '"'
									+ (!hasPrevYear ? ' aria-disabled="true" tabindex="-1"' : ' tabindex="0"')
									+ ' role="button" id="' + dc.prevBtnId + 'Y"><span aria-hidden="true">' + dc.leftButtonYearText + '</span></td>' +
									'<td title="'
									+ dc.tooltipTxt.replace(/<|>|\"/g, '') + '" colspan="5" class="year" role="presentation"><span>'
									+ dc.range.current.year + '</span></td>' +
									'<td class="nav next nav prev btn' + (!hasNextYear ? ' disabled' : '') + '" accesskey="2" title="'
									+ dc.nextTxt.replace(/<|>|\"/g, '') + ' '
									+ dc.yearTxt.replace(/<|>|\"/g, '') + '" aria-label="' + dc.nextTxt.replace(/<|>|\"/g, '') + ' '
									+ dc.yearTxt.replace(/<|>|\"/g, '') + '"'
									+ (!hasNextYear ? ' aria-disabled="true" tabindex="-1"' : ' tabindex="0"')
									+ ' role="button" id="' + dc.nextBtnId + 'Y"><span aria-hidden="true">' + dc.rightButtonYearText + '</span></td></tr>';
							}

							// Draw the month display and prev/next month buttons
							var hasPrevMonth = !dc.isOutsideDateRange(new Date(prevDateValues.year, prevDateValues.month, dc.range[prevDateValues.month].max)),
							hasNextMonth = !dc.isOutsideDateRange(new Date(nextDateValues.year, nextDateValues.month, 1));

							var monthSelector = '<tr class="monthSelector" role="presentation">' +
								'<td class="nav prev btn month' + (!hasPrevMonth ? ' disabled' : '') + '" accesskey="3" title="'
								+ dc.prevTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '" aria-label="'
								+ dc.prevTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '"'
								+ (!hasPrevMonth ? ' aria-disabled="true" tabindex="-1"' : ' tabindex="0"')
								+ ' role="button" id="' + dc.prevBtnId + '"><span aria-hidden="true">' + dc.leftButtonMonthText + '</span></td>' +
								'<td colspan="5" class="month" role="presentation"><span>'
								+ dc.range[dc.range.current.month].name + (!config.condenseYear ? '' : ' ' + dc.range.current.year) + '</span></td>' +
								'<td class="nav next btn month' + (!hasNextMonth ? ' disabled' : '') + '" accesskey="4" title="'
								+ dc.nextTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '" aria-label="'
								+ dc.nextTxt.replace(/<|>|\"/g, '') + ' ' + dc.monthTxt.replace(/<|>|\"/g, '') + '"'
								+ (!hasNextMonth ? ' aria-disabled="true" tabindex="-1"' : ' tabindex="0"')
								+ ' role="button" id="' + dc.nextBtnId + '"><span aria-hidden="true">' + dc.rightButtonMonthText + '</span></td></tr>';

							// Start constructing the Datepicker table element
							dc.source = '<table role="application" class="calendar" aria-label="' + dc.role
								+ '">' + yearSelector + monthSelector + '<tr role="presentation">';
							dc.iter = 0;

							// Draw day headers
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

							// Start drawing day cells
							var m = new Date();
							m.setDate(1);
							m.setMonth(dc.range.current.month);
							m.setFullYear(dc.range.current.year);

							var f = m.getDay();
							m.setDate(dc.range[dc.range.current.month].max);
							var e = m.getDay(),
								w = dc.iterS;

							// Draw the full calendar? (a full grid containing previous / next month cells)
							if (dc.drawFullCalendar === true){
								var daysInMonth = (new Date(prevDateValues.year, (prevDateValues.month + 1), 0)).getDate(),
									counter = (daysInMonth - (new Date(dc.range.current.year, dc.range.current.month, 0)).getDay() + dc.range.wdOffset);
							}

							while (w != f){
								w = (w + 1) > 6 ? 0 : w + 1;

								if (dc.drawFullCalendar === true){
									prevMonth.setDate(counter);
									dc.source += dc.createDayCell(counter, prevMonth, 'dayInPrevMonth', dc.isDisabledDate(dc, counter, prevMonth));
									++counter;

								} else{
									dc.source += '<td class="empty" role="presentation"><span>&nbsp;</span></td>';
								}
							}

							dc.range.track = {};

							for (var i = 1; i <= 31; i++){
								dc.range.track[dc.baseId + i] = i;
							}

							for (var i = 1; i <= dc.range[dc.range.current.month].max; i++){
								m.setDate(i);

								var isSelected = ((i == dc.fn.current.mDay) && (dc.range.current.month == dc.fn.current.month) &&
									(dc.range.current.year == dc.fn.current.year));

								// Draw calendar day cell
								dc.source += dc.createDayCell(i, m, 'dayInMonth', dc.isDisabledDate(dc, i, m), isSelected);

								var w = m.getDay();

								if (w == dc.iter && i < dc.range[dc.range.current.month].max)
									dc.source += '</tr><tr role="presentation">';
							}

							if (dc.drawFullCalendar === true){
								var counter = 1;
							}

							while (e != dc.iter){
								e = (e + 1) > 6 ? 0 : e + 1;

								if (dc.drawFullCalendar === true){
									nextMonth.setDate(counter);
									dc.source += dc.createDayCell(counter, nextMonth, 'dayInNextMonth', dc.isDisabledDate(dc, counter, nextMonth));
									++counter;

								} else{
									dc.source += '<td class="empty" role="presentation"><span>&nbsp;</span></td>';
								}
							}
							dc.source += '</tr></table>';

							// if a message is set for the month, draw it
							if (dc.range[dc.range.current.month].message[dc.range.current.year]){
								dc.source +=
									'<div class="monthMessage">' +
									'	<p>' + dc.range[dc.range.current.month].message[dc.range.current.year] + '</p>' +
									'</div>';
							}

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
							dc.buttons =
											{
											pY: config.condenseYear ? null : $A.getEl(dc.prevBtnId + 'Y'),
											nY: config.condenseYear ? null : $A.getEl(dc.nextBtnId + 'Y'),
											pM: $A.getEl(dc.prevBtnId),
											nM: $A.getEl(dc.nextBtnId)
											};

							if (!config.condenseYear && dc.disableNavPrevYearBtn)
								$A.setAttr(dc.buttons.pY, 'aria-disabled', 'true');

							if (!config.condenseYear && dc.disableNavNextYearBtn)
								$A.setAttr(dc.buttons.nY, 'aria-disabled', 'true');

							if (dc.disableNavPrevMonthBtn)
								$A.setAttr(dc.buttons.pM, 'aria-disabled', 'true');

							if (dc.disableNavNextMonthBtn)
								$A.setAttr(dc.buttons.nM, 'aria-disabled', 'true');

							if (!dc.prevCurrent)
								dc.prevCurrent = {};
							$A.internal.extend(true, dc.prevCurrent, dc.range.current);

							var nMonth = function(){
								if (dc.disableNavNextMonthBtn && ($A.getAttr(dc.buttons.nM, 'aria-disabled') == 'true'))
									return;

								$A.internal.extend(true, dc.prevCurrent, dc.range.current);

								var dateValues = dc.modifyDateValues(
									{
										month: dc.range.current.month,
										year: dc.range.current.year
									},
									{
										month: 1
									}
								);

								// Only change to next month if its first day is inside the valid date range
								if(!dc.isOutsideDateRange(new Date(dateValues.year, dateValues.month, 1))){
									var day = dc.range.current.mDay > dc.range[dateValues.month].max ? dc.range[dateValues.month].max : dc.range.current.mDay,
										intendedDate = new Date(dateValues.year, dateValues.month, day);

									// If intended selected date one month ahead is outside of date range, set
									// selected date to the next available date
									if (dc.isOutsideDateRange(intendedDate))
										dc.date = dc.maxDate;
									else
										dc.date = intendedDate;
								}

								else {
									dc.date = dc.maxDate;
								}

								dc.setCurrent(dc);
								dc.reopen = true;
								dc.open();

							}, pMonth = function(){
								if (dc.disableNavPrevMonthBtn && ($A.getAttr(dc.buttons.pM, 'aria-disabled') == 'true'))
									return;

								$A.internal.extend(true, dc.prevCurrent, dc.range.current);

								var dateValues = dc.modifyDateValues(
									{
										month: dc.range.current.month,
										year: dc.range.current.year
									},
									{
										month: -1
									}
								);

								// Only change to previous month if its last day is inside the valid date range
								if(!dc.isOutsideDateRange(new Date(dateValues.year, dateValues.month, dc.range[dateValues.month].max))){
									var day = dc.range.current.mDay > dc.range[dateValues.month].max ? dc.range[dateValues.month].max : dc.range.current.mDay,
										intendedDate = new Date(dateValues.year, dateValues.month, day);

									// If intended selected date one month previously is outside of date range, set
									// selected date to the next available date
									if(dc.isOutsideDateRange(intendedDate))
										dc.date = dc.minDate;
									else
										dc.date = intendedDate;
								}

								else{
									dc.date = dc.minDate;
								}

								dc.setCurrent(dc);
								dc.reopen = true;
								dc.open();

							}, gYear = function(forward){
								if ((!forward && ((!config.condenseYear && $A.getAttr(dc.buttons.pY, 'aria-disabled') == 'true')
									|| (config.condenseYear && dc.disableNavPrevYearBtn)))) {

									return;

								} else if ((forward && ((!config.condenseYear && $A.getAttr(dc.buttons.nY, 'aria-disabled') == 'true')
										|| (config.condenseYear && dc.disableNavNextYearBtn)))) {

									return;
								}

								$A.internal.extend(true, dc.prevCurrent, dc.range.current);

								var month = dc.range.current.month,
									year = forward ? dc.range.current.year + 1 : dc.range.current.year - 1;

								if (month === 1)
									dc.range[1].max = 28;
								var day = dc.range.current.mDay > dc.range[month].max ? dc.range[month].max : dc.range.current.mDay;

								// Only change year if the intended date is inside of any set date range
								var intendedDate = new Date(year, month, day);

								if (dc.isOutsideDateRange(intendedDate)){
									return;
								}

								dc.date = intendedDate;
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
												// If items from a previous / next month are selected, modify the date accordingly
												if ($A.hasClass(this, 'dayInPrevMonth')){
													var prevDateValues = dc.modifyDateValues(
														{
															month: dc.range.current.month,
															year: dc.range.current.year
														},
														{
															month: -1
														}
													);

													dc.date = new Date(prevDateValues.year, prevDateValues.month, dc.range.track[this.id]);

												} else if ($A.hasClass(this, 'dayInNextMonth')){
													var nextDateValues = dc.modifyDateValues(
														{
															month: dc.range.current.month,
															year: dc.range.current.year
														},
														{
															month: 1
														}
													);

													dc.date = new Date(nextDateValues.year, nextDateValues.month, dc.range.track[this.id]);

												} else {
													// Selection in current month, just adjust the date
													dc.date.setDate(dc.range.track[this.id]);
												}

												dc.setCurrent(dc);

												if ($A.hasClass(this, 'selected') || (!commentsEnabled && !$A.hasClass(this, 'comment'))){
													if ($A.getAttr(this, 'aria-disabled') != 'true'){
														$A.internal.extend(true, dc.fn.current, dc.range.current);
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

													if ($A.getAttr(this, 'aria-disabled') != 'true'){
														$A.internal.extend(true, dc.fn.current, dc.range.current);
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
														// Left arrow key
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

														if (dc.range.current.mDay > 1){
															dc.range.current.mDay--;
															dc.range.current.wDay = !wd ? 6 : wd - 1;

															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else if (dc.range.current.mDay == 1
															&& $A.getAttr(dc.buttons.pM, 'aria-disabled') != 'true'){

															var dateValues = dc.modifyDateValues(
																{
																	month: dc.range.current.month,
																	year: dc.range.current.year
																},
																{
																	month: -1
																}
															);
															var day = dc.range[dateValues.month].max;

															if (dateValues.month === 1)
																day = (new Date(dateValues.year, 1, 29).getMonth() == 1) ? 29 : 28;

															dc.date = new Date(dateValues.year, dateValues.month, day);
															dc.setCurrent(dc);
															dc.reopen = true;
															dc.open();
														}
													}

													else if (k == 39){
														// Right arrow key
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

														if (dc.range.current.mDay < dc.range[dc.range.current.month].max){
															dc.range.current.mDay++;
															dc.range.current.wDay = wd == 6 ? 0 : wd + 1;

															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else if (dc.range.current.mDay == dc.range[dc.range.current.month].max
															&& $A.getAttr(dc.buttons.nM, 'aria-disabled') != 'true'){

															var dateValues = dc.modifyDateValues(
																{
																	month: dc.range.current.month,
																	year: dc.range.current.year
																},
																{
																	month: 1
																}
															);

															dc.date = new Date(dateValues.year, dateValues.month, 1);
															dc.setCurrent(dc);
															dc.reopen = true;
															dc.open();
														}
													}

													else if (k == 38){
														// Up arrow key
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

														if ((dc.range.current.mDay - 7) > 0){
															dc.range.current.mDay -= 7;

															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else if ($A.getAttr(dc.buttons.pM, 'aria-disabled') != 'true'){
															// Go to previous month
															var dateValues = dc.modifyDateValues(
																{
																	month: dc.range.current.month,
																	year: dc.range.current.year
																},
																{
																	month: -1
																}
															);

															if (dateValues.month === 1 && (new Date(dateValues.year, 1, 29).getMonth() == 1))
																dc.range[dateValues.month].max = 29;

															else if (dateValues.month === 1)
																dc.range[dateValues.month].max = 28;

															var day = dc.range[dateValues.month].max + (dc.range.current.mDay - 7),
																intendedDate = new Date(dateValues.year, dateValues.month, day);

															// If intended selected date one month previous is outside of date range, do not attempt
															// to select the date cell
															if (!dc.isOutsideDateRange(intendedDate)){
																dc.date = intendedDate;
																dc.setCurrent(dc);
																dc.reopen = true;
																dc.open();
															}
														}
													}

													else if (k == 40){
														// Down arrow key
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

														if ((dc.range.current.mDay + 7) <= dc.range[dc.range.current.month].max){
															dc.range.current.mDay += 7;

															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}

														else if ($A.getAttr(dc.buttons.nM, 'aria-disabled') != 'true'){
															// Go to next month
															var dateValues = dc.modifyDateValues(
																{
																	month: dc.range.current.month,
																	year: dc.range.current.year
																},
																{
																	month: 1
																}
															);

															var day = dc.range.current.mDay + 7 - dc.range[dc.range.current.month].max,
																intendedDate = new Date(dateValues.year, dateValues.month, day);

															// If intended selected date one month ahead is outside of date range, do not attempt
															// to select the date cell
															if (!dc.isOutsideDateRange(intendedDate)){
																dc.date = intendedDate;
																dc.setCurrent(dc);
																dc.reopen = true;
																dc.open();
															}
														}
													}

													else if (k == 27){
														// Esc key
														dc.close();
													}

													else if (k == 33){
														// PageUp key
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

														if (dc.pageUpDownNatural === true){
															if (pressed.alt){
																gYear(false);
															} else{
																pMonth();
															}

														} else{
															if (pressed.alt){
																gYear(true);
															} else{
																nMonth();
															}
														}
													}

													else if (k == 34){
														// PageDown key
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

														if (dc.pageUpDownNatural === true){
															if (pressed.alt){
																gYear(true);
															} else{
																nMonth();
															}

														} else{
															if (pressed.alt){
																gYear(false);
															} else{
																pMonth();
															}
														}
													}

													else if (k == 36){
														// Home key (goes to the first day of the row)
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

														if (wd != dc.iterS && dc.range.current.mDay > 1){
															while (dc.range.current.wDay != dc.iterS && $A.getEl(dc.baseId + (dc.range.current.mDay - 1))){
																dc.range.current.wDay = (dc.range.current.wDay - 1) < 0 ? 6 : dc.range.current.wDay - 1;
																dc.range.current.mDay--;
															}
															dc.setFocus(dc.range.index[dc.range.current.mDay - 1], this);
														}
													}

													else if (k == 35){
														// End key (goes to the last day of the row)
														$A.internal.extend(true, dc.prevCurrent, dc.range.current);

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
													// Tab key (without any simultaneous modifiers Alt / Ctrl / Shift)
													$A.internal.extend(true, dc.prevCurrent, dc.range.current);

													if (!config.condenseYear && $A.getAttr(dc.buttons.pY, 'aria-disabled') != 'true')
														dc.buttons.pY.focus();

													else if (!config.condenseYear && $A.getAttr(dc.buttons.nY, 'aria-disabled') != 'true')
														dc.buttons.nY.focus();

													else if ($A.getAttr(dc.buttons.pM, 'aria-disabled') != 'true')
														dc.buttons.pM.focus();

													else if ($A.getAttr(dc.buttons.nM, 'aria-disabled') != 'true')
														dc.buttons.nM.focus();

													ev.preventDefault();
												}

												else if (k == 9 && !pressed.alt && !pressed.ctrl && pressed.shift){
													// Tab key (with simultaneous Shift modifier)
													$A.internal.extend(true, dc.prevCurrent, dc.range.current);

													if ($A.getAttr(dc.buttons.nM, 'aria-disabled') != 'true')
														dc.buttons.nM.focus();

													else if ($A.getAttr(dc.buttons.pM, 'aria-disabled') != 'true')
														dc.buttons.pM.focus();

													else if (!config.condenseYear && $A.getAttr(dc.buttons.nY, 'aria-disabled') != 'true')
														dc.buttons.nY.focus();

													else if (!config.condenseYear && $A.getAttr(dc.buttons.pY, 'aria-disabled') != 'true')
														dc.buttons.pY.focus();

													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 && !isKP && !dc.isAdd){
													if ($A.getAttr(this, 'aria-disabled') != 'true'){
														$A.internal.extend(true, dc.fn.current, dc.range.current);

														if (!dc.setFocus.firstOpen)
															handleClick.apply(this, [ev, dc, targ]);
													}

													ev.preventDefault();
												}

												isKP = dc.setFocus.firstOpen = dc.isAdd = false;
											}
											});

							$A.bind(dc.buttons.pM,
											{
											click: function(ev){
												dc.navBtn = 'PM';
												pMonth();
												ev.preventDefault();
											},
											keydown: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 || k == 32){
													dc.navBtn = 'PM';
													pMonth();
													ev.preventDefault();
												}

												else if (k == 27){
													dc.close();
													ev.preventDefault();
												}

												else if (!config.condenseYear && k == 38){
													dc.buttons.pY.focus();
													ev.preventDefault();
												}

												else if (k == 39){
													dc.buttons.nM.focus();
													ev.preventDefault();
												}

												else if (k == 37 || k == 40){
													ev.preventDefault();
												}

												else if (k == 9 && !pressed.alt && !pressed.ctrl && !pressed.shift){
													if ($A.getAttr(dc.buttons.nM, 'aria-disabled') != 'true')
														dc.buttons.nM.focus();

													else
														$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();

													ev.preventDefault();
												}

												else if (k == 9 && !pressed.alt && !pressed.ctrl && pressed.shift){
													if (!config.condenseYear && $A.getAttr(dc.buttons.nY, 'aria-disabled') != 'true')
														dc.buttons.nY.focus();

													else if (!config.condenseYear && $A.getAttr(dc.buttons.pY, 'aria-disabled') != 'true')
														dc.buttons.pY.focus();

													else
														$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();

													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
											}
											});
							$A.bind(dc.buttons.nM,
											{
											click: function(ev){
												dc.navBtn = 'NM';
												nMonth();
												ev.preventDefault();
											},
											keydown: function(ev){
												changePressed(ev);
												var k = ev.which || ev.keyCode;

												if (k == 13 || k == 32){
													dc.navBtn = 'NM';
													nMonth();
													ev.preventDefault();
												}

												else if (k == 27){
													dc.close();
													ev.preventDefault();
												}

												else if (!config.condenseYear && k == 38){
													dc.buttons.nY.focus();
													ev.preventDefault();
												}

												else if (k == 37){
													dc.buttons.pM.focus();
													ev.preventDefault();
												}

												else if (k == 39 || k == 40){
													ev.preventDefault();
												}

												else if (k == 9 && !pressed.alt && !pressed.ctrl && !pressed.shift){
													$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();
													ev.preventDefault();
												}

												else if (k == 9 && !pressed.alt && !pressed.ctrl && pressed.shift){
													if ($A.getAttr(dc.buttons.pM, 'aria-disabled') != 'true')
														dc.buttons.pM.focus();

													else if (!config.condenseYear && $A.getAttr(dc.buttons.nY, 'aria-disabled') != 'true')
														dc.buttons.nY.focus();

													else if (!config.condenseYear && $A.getAttr(dc.buttons.pY, 'aria-disabled') != 'true')
														dc.buttons.pY.focus();

													else
														$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();

													ev.preventDefault();
												}
											},
											keyup: function(ev){
												changePressed(ev);
											}
											});

							if (!config.condenseYear)
								$A.bind(dc.buttons.pY,
												{
												click: function(ev){
													dc.navBtn = 'PY';
													gYear();
													ev.preventDefault();
												},
												keydown: function(ev){
													changePressed(ev);
													var k = ev.which || ev.keyCode;

													if (k == 13 || k == 32){
														dc.navBtn = 'PY';
														gYear();
														ev.preventDefault();
													}

													else if (k == 27){
														dc.close();
														ev.preventDefault();
													}

													else if (k == 39){
														dc.buttons.nY.focus();
														ev.preventDefault();
													}

													else if (k == 40){
														dc.buttons.pM.focus();
														ev.preventDefault();
													}

													else if (k == 37 || k == 38){
														ev.preventDefault();
													}

													else if (k == 9 && !pressed.alt && !pressed.ctrl && !pressed.shift){
														if ($A.getAttr(dc.buttons.nY, 'aria-disabled') != 'true')
															dc.buttons.nY.focus();

														else if ($A.getAttr(dc.buttons.pM, 'aria-disabled') != 'true')
															dc.buttons.pM.focus();

														else if ($A.getAttr(dc.buttons.nM, 'aria-disabled') != 'true')
															dc.buttons.nM.focus();

														else
															$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();

														ev.preventDefault();
													}

													else if (k == 9 && !pressed.alt && !pressed.ctrl && pressed.shift){
														$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();
														ev.preventDefault();
													}
												},
												keyup: function(ev){
													changePressed(ev);
												}
												});

							if (!config.condenseYear)
								$A.bind(dc.buttons.nY,
												{
												click: function(ev){
													dc.navBtn = 'NY';
													gYear(true);
													ev.preventDefault();
												},
												keydown: function(ev){
													changePressed(ev);
													var k = ev.which || ev.keyCode;

													if (k == 13 || k == 32){
														dc.navBtn = 'NY';
														gYear(true);
														ev.preventDefault();
													}

													else if (k == 27){
														dc.close();
														ev.preventDefault();
													}

													else if (k == 37){
														dc.buttons.pY.focus();
														ev.preventDefault();
													}

													else if (k == 40){
														dc.buttons.nM.focus();
														ev.preventDefault();
													}

													else if (k == 38 || k == 39){
														ev.preventDefault();
													}

													else if (k == 9 && !pressed.alt && !pressed.ctrl && !pressed.shift){
														if ($A.getAttr(dc.buttons.pM, 'aria-disabled') != 'true')
															dc.buttons.pM.focus();

														else if ($A.getAttr(dc.buttons.nM, 'aria-disabled') != 'true')
															dc.buttons.nM.focus();

														else
															$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();

														ev.preventDefault();
													}

													else if (k == 9 && !pressed.alt && !pressed.ctrl && pressed.shift){
														if ($A.getAttr(dc.buttons.pY, 'aria-disabled') != 'true')
															dc.buttons.pY.focus();

														else
															$A.query('td.day[tabindex="0"]', dc.containerDiv)[0].focus();

														ev.preventDefault();
													}
												},
												keyup: function(ev){
													changePressed(ev);
												}
												});

							dc.range.index = $A.query('td.dayInMonth', dc.containerDiv);
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

							if (!dc.navBtnS){
								if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0))
									$A.announce(dc.helpText);
							}
							dc.navBtnS = false;
						},
						helpText: helpText,
						runAfterClose: function(dc){
							if (!dc.reopen){
								if (config.resetCurrent){
									dc.date = new Date();
									dc.setCurrent(dc);
									$A.internal.extend(true, dc.fn.current, dc.range.current);
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

							// Run custom specified function?
							if (typeof config.runAfterClose === 'function'){
								config.runAfterClose(dc);
							}
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
																dc.parent.isAdd = true;
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
														dc.parent.isAdd = true;
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

							$A.bind($A.query('textarea', dc.containerDiv)[0], 'keydown', function(ev){
								var k = ev.which || ev.keyCode;

								if (k == 9 && !ev.altKey && !ev.ctrlKey && ev.shiftKey){
									$A.query('button', dc.containerDiv)[0].focus();
									ev.preventDefault();
								}
							});
						},
						tabOut: function(ev, dc){
							$A.query('textarea', dc.containerDiv)[0].focus();
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