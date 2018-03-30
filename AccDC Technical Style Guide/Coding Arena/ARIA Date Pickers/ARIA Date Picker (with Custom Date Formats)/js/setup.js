$A.bind(window, 'load', function(){

	// Syntax : setCalendar( ID , TriggeringElement , TargetEditField , EnableComments , clickHandler , config )

	$A.setCalendar('UniqueCalendarId', $A.getEl('dateIcon'), $A.getEl('date'), false, undefined,
					{

					// Configure optional overrides

					// Condense the year display by removing the year nav buttons
					condenseYear: true,

					// Configure visual and audible date formats
					inputDateFormat: 'DD/MM/YYYY',
					audibleDateFormat: 'D, MMMM YYYY (dddd)',

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