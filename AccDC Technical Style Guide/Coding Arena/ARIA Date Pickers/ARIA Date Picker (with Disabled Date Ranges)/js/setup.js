$A.bind(window, 'load', function(){

	// Syntax : setCalendar( ID , TriggeringElement , TargetEditField , EnableComments , clickHandler , config )

	$A.setCalendar('UniqueCalendarId', $A.getEl('dateIcon'), $A.getEl('date'), false, function(ev, dc, targ){

		// Save the desired date string
		targ.value = dc.range.wDays[dc.range.current.wDay].lng + ' ' + dc.range[dc.range.current.month].name + ' '
			+ dc.range.current.mDay + ', ' + dc.range.current.year;

		// Then close the date picker
		dc.close();
	},
					{

					// Configure optional overrides

					// If not included, all of the below values are set by default

					// Set role name text for screen reader users
					role: 'Calendar',

					// Set boundary text wording for screen reader users
					accStart: 'Start',
					accEnd: 'End',

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

	// Set disabled date ranges for the newly created Calendar AccDC Object using it's ID "UniqueCalendarId"

	// Get a reference to the AccDC Object

	var bc = $A.reg['UniqueCalendarId'];

	// Disable dates in January. (Change '*' to a year such as 2013 to localize date ranges)

	bc.range[0].disabled['*'] = [1];

	// Disable dates in July. (Change '*' to a year such as 2013 to localize date ranges)

	bc.range[6].disabled['*'] = [4];

	// Disable dates in October. (Change '*' to a year such as 2013 to localize date ranges)

	bc.range[9].disabled['*'] = [31];

	// Disable dates in December. (Change '*' to a year such as 2013 to localize date ranges)

	bc.range[11].disabled['*'] =
					[
					24,
					25
					];
});