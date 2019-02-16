ARIA Date Pickers

The ARIA Date Picker is a complex control type with a simple implementation.

Expected behaviors: The associated INPUT field should not include readonly, an external triggering element should activate the date picker, the arrow keys should move between calendar cells and the calendar should scroll automatically between months, PageUp/PageDown should switch between months, Alt+PageUp/PageDown should switch between years, Enter should activate the selected date, and pressing Escape or Tab should close the calendar and return focus to the triggering element.

The Calendar Module automates these processes by adding all related event handlers and managing all related rendering procedures.



HTML Syntax

<input type="text" id="dateInputId" title="Label text if no Label element is associated" />

<a href="#" id="datePickerId"> Calendar Icon Name </a>



Form field HTML markup requirements:

• The INPUT field must not be set to readonly, so that users can manually edit date string entries.
• Form field constraints, such as the desired date string format, must also be included with the form field label to maximize clarity. E.G "MM/DD/YYYY"



JavaScript invocation statement syntax:

$A.setCalendar( 'UniqueCalendarId' , $A.getEl('datePickerId'), $A.getEl('dateInputId'), EnableComments<true/false>, undefined, {
    // Configuration key / value map overrides
});



Parameters

The first parameter must be unique for every calendar declaration, since this is registered as the ID of the Calendar AccDC Object when instantiated.

The second parameter is the DOM object for the triggering element.

The third parameter is the DOM object for the target INPUT element.

The fourth parameter is a Boolean that determines whether comments will be displayed when associated with dates.
False is set by default if no value is specified.

The fifth parameter specifies a callback function where the returned date string can be customized.

The sixth parameter is a key / value map where overrides can be declared to further customize functionality.

Example:

{

    // Configure optional overrides

    // If not included, all of the below values are set by default

    // Set role name text for screen reader users
    role: 'Calendar',

    // Set screen reader text to automatically be announced
    // This is also set within the data-helptext attribute in the top level div element of the calendar for CSS pseudo element referencing via attr(data-helptext) for sighted keyboard only users if desired.
    helpText: 'Press the arrow keys to navigate by day, PageUp and PageDown to navigate by month, Alt+PageUp and Alt+PageDown to navigate by year, or Escape to cancel.',

    // Set tooltip text
    tooltipTxt: 'Press Escape to cancel',
    disabledTxt: 'Disabled',
    markedTxt: 'Selected',
    commentedTxt: 'Has Comment',
    prevTxt: 'Previous',
    nextTxt: 'Next',
    monthTxt: 'Month',
    yearTxt: 'Year',

    // Set month names
    months: [
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
    days: [
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

    // Switch the behaviour when the PageUp or PageDown keys are pressed to a "natural" behaviour
    // (PageUp goes to previous month, PageDown goes to next month)
    pageUpDownNatural: false,

    // Append a "dayToday" CSS class to the current day cell element - this allows styling to be targeted to this specific element
    highlightToday: true,

    // Fill in the day cells outside of the current month so that the calendar grid is always filled with day cells
    drawFullCalendar: true,

    // Run custom functions at the end of the code within the following component functions.
    // Receives a single parameter "dc", which provides access to the Datepicker object.
    runBefore: function (dc) {
        console.log('runBefore');
        console.log(dc);
    },
    runAfterClose: function (dc) {
        console.log('runAfterClose');
        console.log(dc);
    },

    // Override the character used on the month / year change buttons
    leftButtonYearText: '&lt;',
    rightButtonYearText: '&gt;',
    leftButtonMonthText: '&lt;',
    rightButtonMonthText: '&gt;',

    // Specify if the calendar should open when the input field receives focus.
    // If true, the Down arrow must be pressed to move focus from the input field into the calendar for manual traversal, and Escape will collapse the calendar.
    openOnFocus: false,
    openOnFocusHelpText: 'Press Down arrow to browse the calendar, or Escape to close.',

    // Display a Close button
    showEscBtn: true,
    escBtnName: 'Close',
    escBtnIcon: '&times;',

    // Set specific start / end boundaries of a date range. Can be Date objects (absolute boundaries), or positive/negative integers (relative boundaries).
    // If undefined, no date range will be enforced.
    minDate: undefined,
    maxDate: undefined,

    // Using a token system, set a specific date string format to be used when setting the selected value into the calendar input box
    // 'YYYY': 4 digit year, 2019
    // 'MMMM': Full name of month, January, etc.
    // 'dddd': Full name of weekday, Monday, etc.
    // 'MM': 2 digit month, 01, etc.
    // 'DD': 2 digit day, 01, etc.
    // 'Do': getDateOrdinalSuffix, 1st, 2nd, 3rd.
    // 'M': 1 or 2 digit month, 1 through 12
    // 'D': 1 or 2 digit day, 1 through 31.

    inputDateFormat: 'MM/DD/YYYY',

    // Using a token system, set a specific date string format to be read out to screen reader users
    audibleDateFormat: 'D, dddd MMMM YYYY',

    // Allow a date that isn't today to be set as the initial date. If unset, this value is initialised to today's date
    initialDate: new Date(),

    // Disable weekdays from selection
    disableWeekdays: false,

    // Disable weekends from selection
    disableWeekends: false,

    // Set positive or negative offset for differing column arrangements, or 0 for none
    wdOffset: 0,

    // Set CSS positioning calculation for the calendar
    // Set to 0 to disable auto positioning
    autoPosition: 9,

    // Customize with positive or negative offsets
    offsetTop: 0,
    offsetLeft: 0,

    // Set class for the calendar container
    className: 'calendar',

    // Set custom CSS styling for the calendar container when rendered
    cssObj: {
        position: 'absolute',
        zIndex: 1
    },

    // Choose a different insertion point in the DOM; must be a DOM node; defaults to the triggering element if not specified.
    targetObj: null,

    // Choose a different focus element in the DOM for CSS autoPositioning; may be a DOM node or CSS Selector; defaults to the triggering element if not specified.
    posAnchor: '',

    // Reset date to the current calendar date every time the date picker opens
    resetCurrent: false,

    // Configure the Comments tooltip pane
    comments: {
        role: 'Comment',
        autoPosition: 1,
        offsetTop: 0,
        offsetLeft: 0,
        className: 'commentTooltip'
    },

    // Configure the editor form pane
    editor: {
        // Choose to show the form, defaults to false
        show: false,
        // Set the section name, and the Edit button text
        role: 'Edit',
        autoPosition: 6,
        offsetTop: 0,
        offsetLeft: 0,
        className: 'commentAdd',
        // Set the Save button text
        action1: 'Save'
    },

    // Condense the year display by removing the year nav buttons. Requires the Calendar Module version 1.25 or greater.
    condenseYear: false,

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
}



Programmatic Control

Every Date Picker is registered as an AccDC Object, the ID of which matches the ID string declared in the first parameter of the invocation statement.

This also makes it possible to control the calendar programmatically using JavaScript, like so:

var dc = $A.reg['UniqueCalendarId'];

// Which you can then open

dc.open();

// Or close

dc.close();

// All other AccDC API properties and methods can be applied here as well.



Additional Programmatic Control

There are some additional methods which allow altering the Date Picker state after invocation:

• dc.setDayMarked(dc, dateObj, isMarked)

• dc.clearAllMarked(dc)

• dc.setDayDisabled(dc, dateObj, isDisabled)

• dc.setMonthDisabled(dc, dateObj, isDisabled)

• dc.setDayOfWeekDisabled(dc, dateObj, daysOfWeekArray, isDisabled)

• dc.setWeekdaysDisabled(dc, dateObj, isDisabled)

• dc.setWeekendsDisabled(dc, dateObj, isDisabled)

• dc.clearAllDisabled(dc)

• dc.setMonthMessage(dc, dateObj, message)

• dc.clearAllMessage(dc)

• dc.setDate(dc, dateObj)



Triggering Element Requirements

Regarding the triggering element, you should always use an active element for this purpose to ensure accessibility for both screen reader and keyboard only users.

Within the Coding Arena samples, these are standard image links (A tags with an Href attribute and an embedded IMG tag with an informative Alt attribute). However, you can use whatever type of triggering element you wish, a standard link, button, or image link, with any type of styling. There must be an active element as a triggering element though, to ensure accessibility.



Styling

The sample calendars in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

You can change the styling however you wish to fit the layout of any UI, and the calendars will still be accessible to both screen reader and keyboard only users regardless.

Simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled calendar will be accessible.



Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The calendars within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accCalendar", then configures the same module declaration as previously described using these HTML5 attributes.



Available HTML5 attributes for the triggering element:

• data-name : The name value for the calendar picker. The Name attribute of the accompanying text field must match the data-name attribute value. The selected date will then be inserted into the text field. (Must be on the triggering element.)

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".



Required attributes:

• name="whatever" : The Input field name attribute that matches the value of data-name. (Must be on the Input field with type="text")
• class="accCalendar" : The bootstrap class name that specifies an accessible calendar picker. (Must be on the triggering element.)
• id : The unique ID of the element. This value is also registered as the ID of the calendar AccDC Object, making it possible to invoke the object programmatically. (Must be on the triggering element.)



Implementation Notes

The date string format is configurable within the callback function, or within the "accdc_bootstrap.js" module if bootstrapped.

The variables to reference are as follows:

dc.range.wDays[dc.range.current.wDay].lng = 'Friday'

dc.range[dc.range.current.month].name = 'November'
// or
(dc.range.current.month+1) = numerical month string

dc.range.current.mDay = '30'

dc.range.current.year = '2012'

The returned values will reflect the date selected.