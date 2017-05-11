ARIA Comboboxes

ARIA Comboboxes are used to trigger dynamic lists of related options, such as with auto-suggest filters and custom dropdowns.

Expected behaviors:
• All Combobox controls are keyboard focusable unless explicitly disabled, and must include an accessible close or toggle icon for sighted mouse and mobile touch device users when applicable.
• Interactive editable Combobox controls that use an Input+type=text element, open using the Down arrow, are navigated using Up and Down, are saved and closed by pressing Alt+Up or Enter, are canceled and closed by pressing Escape, and support uninterrupted editability when Left or Right or any other non-control key is pressed.
• Interactive readonly Combobox controls that use an Input+type=text element, open using the Down arrow, are navigated using Up and Down, are saved and closed by pressing Alt+Up or Enter, are canceled and closed by pressing Escape, and require a toggleable triggering element for sighted mouse and mobile touch device users.
• Interactive Combobox controls that use simulated active elements such as Divs or Spans, open using the Down arrow or Enter key, are navigated using Up and Down, are saved and closed by pressing Alt+Up or Enter, are canceled and closed by pressing Escape, and act as their own actionable toggle control.

The ARIA Combobox Module automates these processes by adding all related event handlers.

HTML Syntax

The HTML syntax varies depending on which type of implementation is desired.

Editable Input

<input role="combobox" type="text" title="Explicit label text" />

Readonly Input

<input role="combobox" type="text" readonly title="Explicit label text" />

Simulated Active Element

<span title="Explicit label text" role="combobox" tabindex="0" class="focusableElement" >
<span class="childContainerToUpdate"></span>
</span>

• The markup structure for simulated active elements doesn't require the use of Spans, and may consist of any HTML container markup with embedded tags.
• The tabindex attribute is required on the same container element that includes role=combobox to ensure keyboard accessibility, and an empty child container element must be included where dynamically saved values will be inserted.

Hidden Select Element

All Combobox controls are bound to a standard Select element instance, which may be hidden within the page using CSS, or dynamically generated using JavaScript to support dynamic population via AJAX.

To enable multiselect functionality, add the attribute multiple="multiple" to the hidden select element. (Only available when using the ARIA Combobox Module R2.0 or greater.)

<select name="control-name">
<option value="value-1"> Value 1 name </option>
<option value="value-2"> Value 2 name </option>
<option value="value-3"> Value 3 name </option>
</select>

To set a default value for the Combobox other than index[0], add the 'selected' attribute to the default option.

The following attributes are handled automatically by the Combobox Module:

• aria-activedescendant
• aria-expanded
• aria-controls
• aria-autocomplete
• aria-describedby
• role=listbox
• role=option

JavaScript invocation statement syntax:

// Create a new Combobox instance and bind the relevant elements

var myCombobox = new $A.Combobox( selectElementDOM-Node , inputDOM-Node , optionalChildDOM-Node );

// Configure settings here prior to invocation

// Then invoke the Combobox for auto-rendering

myCombobox.start();

Parameters

The first parameter is the hidden Select element DOM node that will be bound to the Combobox control.

The second parameter is the focusable role=combobox element that will be bound to the hidden Select element.

The third parameter is the embedded child container element that will be bound to the role=combobox element, which is only applicable if the role=combobox element is not a standard Input or Textarea element.

Programmatic Control

After a Combobox control is instantiated, the following public properties and methods are available:

Methods

// Set the listbox to render all Select Options regardless of the current value
myCombobox.setShowAll(Boolean); // Default: False

// Set the listbox to render only Select Options that match the substring value
myCombobox.setSubstringMatch(Boolean); // Default: False

// Set the listbox to render only Select Options that include all of the space delimited words in the current value
myCombobox.setWordMatch(Boolean); // Default: False

// Set the Combobox to automatically display the currently selected value within the hidden Select element onStart
myCombobox.setDefault(Boolean); // Default: True

// Set the currently selected listbox value to automatically be saved when focus moves away from the Combobox control
myCombobox.setAutoComplete(Boolean); // Default: False

// Set the parent/child tag markup structure for the dynamically rendered listbox
myCombobox.setTags({
parentTag: 'ul',
childTag: 'li'
});

// Set dynamic class names
myCombobox.setClassNames({
toplevelClass: 'toplevel-div clearfix', // Top level Div class of Combobox listbox
middleClass: 'middle-div clearfix', // Mid level Div class of Combobox listbox
listboxClass: 'listbox clearfix', // // parentTag class
optionClass: 'option clearfix', // childTag class
activeClass: 'active', // Currently active Combobox listbox option
toggleClass: 'pressed' // Pressed state class of the altTrigger element
});

// Set CSS autopositioning relative to the triggering Combobox element.
// Accepted AccDC API values between 0-disabled-default and 12
// For details, see WhatSock.com > Core API > CSS > .autoPosition
myCombobox.setAutoPosition(Number); // Default: 0

	// Set a positive or negative top/left offset to be applied to the autoPosition property calculation
myCombobox.setOffset({
top: Number,
left: Number
});

// Set the number of listbox options to render when displayed
myCombobox.setSize(Number); // Default: 5

// Set a different element to act as an autoPosition focus element instead of the Combobox control
myCombobox.setPosAnchor(alternateDOM-Node); // Will not change the DOM insertion point and reading order

// Set a different element to act as an insertion point and autoPosition focus element instead of the Combobox control
myCombobox.setTargetObj(alternateDOM-Node); // Will change the DOM reading order

// Invoke the Combobox control and apply all saved settings
myCombobox.start();

// Close the Combobox control and pause functionality
myCombobox.stop();

// Manually open the Combobox listbox using all applied settings
myCombobox.open();

// Set a handler to execute every time the Combobox listbox is rendered
myCombobox.onOpen(function(dc){
// this = the Combobox control
// dc = the AccDC Object instance for the Combobox listbox
});

// Manually close the Combobox listbox
myCombobox.close();

// Set a handler to execute every time the Combobox listbox is closed
myCombobox.onClose(function(dc){
// this = the Combobox control
// dc = the AccDC Object instance for the Combobox listbox
});

// Set a toggle control to open or close the Combobox listbox
// Must always be set when implementing readonly Input+type=text elements to ensure sighted mouse and mobile touch device support
myCombobox.setAltTrigger(toggleElementDOM-Node);

// Set a handler to execute every time the toggle altTrigger element is activated
myCombobox.onTriggerChange(function(altTriggerElement, toggleState){
// this = altTriggerElement
// toggleState = true or false
});

// Set a handler to execute every time a new value is saved to the Combobox control
// This will override the default functionality
myCombobox.onSelect(function(optionName, optionValue, comboboxControl, selectElement){
// this = comboboxControl
// optionName = the visible string for the hidden Select option that is highlighted.
// optionValue = the value attribute for the hidden Select option that is selected. This parameter changes to an array of selected option nodes when multiple is set instead. (Only available when using the ARIA Combobox Module R2.0 or greater.)
// comboboxControl = the Combobox control element
// selectElement = the hidden Select element
// Save the new value accordingly
// then return the saved string to prevent auto reopening of the Combobox listbox
return 'saved string';
});

// Set multiple divider to break up list item markup properly when updated.
// Automatically becomes available when the multiple attribute is set on the hidden select element. (Only available when using the ARIA Combobox Module R2.0 or greater.)
myCombobox.setMultipleDivider(function(values){
// 'values' is an array of string names for the selected option nodes.
return values.join('	');
});

// Clear all selected options when multiple is set on the hidden select element.
// (Only available when using the ARIA Combobox Module R2.0 or greater.)
myCombobox.clearAll();

// Set a character minimum when typing into an editable combobox before autosuggested options are rendered.
// (Only available when using the ARIA Combobox Module R2.0 or greater.)
myCombobox.setCharMin(#); // Default = 0

// Get the current value of the hidden select element
// Returns a value property string for single select elements, or an array of selected option DOM nodes when the multiple attribute is set on the select element.
// (Only available when using the ARIA Combobox Module R2.0 or greater.)
myCombobox.getValue();

// Manually resynchronize the hidden Select to rebuild available Options for the Combobox listbox
// This can be used to repopulate rendered options after remote API queries via AJAX cause the hidden Select to contain new Options
myCombobox.update();

// Set a string to be announced to screen reader users when the Combobox control receives focus
myCombobox.setPromptText(String); // Default: ''

// Set a name for the offscreen Close link for screen reader users
// Necessary for non-sighted touch screen device users to detect the end of the Combobox listbox when rendered
// To disable the offscreen Close link when needed, pass a null value ("") to the method.
myCombobox.setCloseText(String); // Default: 'Close Popup'

Properties

// Access the hidden Select element DOM node
myCombobox.select

// Access the role=combobox element DOM node
myCombobox.combobox

// Access the dynamically rendered listbox AccDC Object, including all AccDC API properties and methods
// View the Core API tab at WhatSock.com for a full index of available AccDC API properties and methods.
myCombobox.dc

Styling

The samples in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled combobox will be accessible.
