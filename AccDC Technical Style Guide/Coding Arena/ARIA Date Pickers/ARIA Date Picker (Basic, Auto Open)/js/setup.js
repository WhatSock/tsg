$A.bind(window, 'load', function(){

	// Syntax : setCalendar( ID , TriggeringElement , TargetEditField , EnableComments , clickHandler , config )

	$A.setCalendar('UniqueCalendarId', document.getElementById('dateIcon'), document.getElementById('date'), false,
		undefined,
					{
					openOnFocus: true,
					openOnFocusHelpText: 'Date picker expanded. Press Down arrow to browse the calendar, or Escape to collapse.',
					helpTextOnClose: 'Calendar collapsed.',
					inputDateFormat: 'MM/DD/YYYY',

					// Always restore today's date as being selected when calendar is activated.
					resetCurrent: true,
					highlightToday: true,

					// Set CSS positioning calculation for the calendar
					autoPosition: 3,
					// Customize with positive or negative offsets
					offsetTop: 0,
					offsetLeft: 5
					});
});