$A.bind(window, 'load', function(){

	// Syntax : setCalendar( ID , TriggeringElement , TargetEditField , EnableComments , clickHandler , config )

	$A.setCalendar('UniqueCalendarId', $A.getEl('dateIcon'), $A.getEl('date'), true, function(ev, dc, targ){

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
					posAnchor: '',

					// Configure the Comments tooltip pane
					comments:
									{
									role: 'Comment',
									autoPosition: 1,
									offsetTop: 0,
									offsetLeft: 0,
									className: 'commentTooltip'
									},

					// Configure the editor form pane
					editor:
									{
									// Choose to show the form, defaults to false
									show: true,
									// Set the section name, and the Edit button text
									role: 'Edit',
									autoPosition: 6,
									offsetTop: 0,
									offsetLeft: 0,
									className: 'commentAdd',
									// Set the Save button text
									action1: 'Save'
									},

					// Manually configure the calendar using AJAX or a customization script
					ajax: function(dc, save){
						// 'save' is true when closing the Editor, false otherwise for fetching content when the calendar is opened.

						// If save is false, execute load script

						if (!save){

							// Optionally load custom values into the dc.range associative array.

							// And optionally prevent this script from running again
							// dc.stopAjax = true;

							// Then open the calendar after processing is finished
							dc.open();
						}

						else{
						// Otherwise do something with the newly saved values within the dc.range associative array.
						}
					}
					});
});