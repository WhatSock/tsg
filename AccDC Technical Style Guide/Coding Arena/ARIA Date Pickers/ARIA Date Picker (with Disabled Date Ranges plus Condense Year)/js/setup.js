$A.bind(window, 'load', function(){

	// Syntax : setCalendar( ID , TriggeringElement , TargetEditField , EnableComments , clickHandler , config )

	$A.setCalendar('UniqueCalendarId', $A.getEl('dateIcon'), $A.getEl('date'), false, function(ev, dc, targ){

		// Save the desired date string
		// Format: mm/dd/yyyy
		targ.value = ('0' + (dc.range.current.month + 1)).slice(-2) + '/' + ('0' + dc.range.current.mDay).slice(-2) + '/'
			+ dc.range.current.year;

		// Or variable
		/*
				targ.value = dc.range.wDays[dc.range.current.wDay].lng + ' ' + dc.range[dc.range.current.month].name + ' '
					+ dc.range.current.mDay + ', ' + dc.range.current.year;
		*/

		// Then close the date picker
		dc.close();
	},
					{

					// Configure optional overrides

					// Condense the year display by removing the year nav buttons
					condenseYear: true,

					// Configure flexible disabled date ranges
					ajax: function(dc, save){

						// Run before the datepicker renders

						if (!dc.firstResetDate){
// Store a variable in the dc object to ensure this only runs when the date picker first opens, and not every time such as when switching between months
							dc.firstResetDate = true;

							// Set current date variables
							var cur = new Date(),

							// Set future date variables for +30 days
							fut = new Date();
							fut.setDate(cur.getDate() + 30);

							// Set a custom variable to store the disabled date range starting point
							// This will be used to validate a static date against the moveable datepicker selection
							dc.startDate =
											{
											day: cur.getDate(),
											month: cur.getMonth(),
											year: cur.getFullYear(),
											weekDay: cur.getDay()
											};

							// Set a custom variable to store the disabled date range end point
							// This will be used to validate a static date against the moveable datepicker selection
							dc.endDate =
											{
											day: fut.getDate(),
											month: fut.getMonth(),
											year: fut.getFullYear(),
											weekDay: fut.getDay()
											};
						}

						// Now dynamically adjust the disabled date range always starting with dc.startDate, and end with dc.endDate
						var current = dc.startDate, last = dc.endDate;

// Disable all dates prior to the current day and after the last day by disabling previous and next month and year navigation
						dc.disableNavPrevYearBtn = dc.disableNavNextYearBtn = true;
						dc.disableNavPrevMonthBtn = dc.disableNavNextMonthBtn = false;

						var isOutOfRange = false;

						if ((current.year > dc.range.current.year
							|| (current.year === dc.range.current.year && current.month > dc.range.current.month))
							|| (last.year < dc.range.current.year
								|| (last.year === dc.range.current.year && last.month < dc.range.current.month))){
							isOutOfRange = true;
						}

// Disable all dates prior to the current day and after the last day when current months match the start and end date objects
						if ((current.year === dc.range.current.year && current.month === dc.range.current.month)
							|| (last.year === dc.range.current.year && last.month === dc.range.current.month)){
							dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];

							if (current.year === dc.range.current.year && current.month === dc.range.current.month){
								dc.disableNavPrevMonthBtn = true;

								for (var day = 1; day < current.day; day++){
									dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
								}
							}

							if (last.year === dc.range.current.year && last.month === dc.range.current.month){
								dc.disableNavNextMonthBtn = true;

								for (var day = last.day; day < 31; day++){
									dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
								}
							}
						}

						// Clean up the disabled array by filtering duplicates.
						if (dc.range[dc.range.current.month].disabled[dc.range.current.year]
							&& dc.range[dc.range.current.month].disabled[dc.range.current.year].length)
							dc.range[dc.range.current.month].disabled[dc.range.current.year]
								= dc.range[dc.range.current.month].disabled[dc.range.current.year].filter(function(o, i, a){
								return a.indexOf(o) == i;
							});

						// Now render the datepicker after configuring the disabled date ranges only if within the given range
						if (isOutOfRange)
							$A.internal.extend(true, dc.range.current, dc.prevCurrent);
						dc.open();
					},

					// If not included, all of the below values are set by default

					// Set role name text for screen reader users
					role: 'Calendar',

					// Set tooltip text
					tooltipTxt: 'Press Escape to cancel',
					disabledTxt: 'Disabled',
					commentedTxt: 'Has Comment',
					prevTxt: 'Previous',
					nextTxt: 'Next',
					monthTxt: 'Month',
					yearTxt: 'Year',

					// Set month names
					months:
									[
									'January',
									'February',
									'March',
									'April',
									'May',
									'June',
									'July',
									'August',
									'September',
									'October',
									'November',
									'December'
									],

					// Set short and long weekday names
					days:
									[
									{
									s: 'S',
									l: 'Sunday'
									},
									{
									s: 'M',
									l: 'Monday'
									},
									{
									s: 'T',
									l: 'Tuesday'
									},
									{
									s: 'W',
									l: 'Wednesday'
									},
									{
									s: 'T',
									l: 'Thursday'
									},
									{
									s: 'F',
									l: 'Friday'
									},
									{
									s: 'S',
									l: 'Saturday'
									}
									],

					// Set positive or negative offset for differing column arrangements, or 0 for none
					wdOffset: 0,

					// Set CSS positioning calculation for the calendar
					autoPosition: 3,
					// Customize with positive or negative offsets
					offsetTop: 0,
					offsetLeft: 5,
					// Set class for the calendar container
					className: 'calendar',

// Choose a different insertion point in the DOM; must be a DOM node; defaults to the triggering element if not specified.
					targetObj: null,

// Choose a different focus element in the DOM for CSS autoPositioning; may be a DOM node or CSS Selector; defaults to the triggering element if not specified.
					posAnchor: ''
					});
});