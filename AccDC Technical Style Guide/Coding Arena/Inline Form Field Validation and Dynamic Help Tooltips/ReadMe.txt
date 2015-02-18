Inline Form Field Validation

Error Tooltips provide a simple way to validate user input prior to server side interaction.

Dynamic Help Tooltips work in a similar fashion, by suggesting responses that must also pass validation. 

Both fulfill the same role, but on opposite spectrums.

Error Tooltips occur after a form field loses focus, which is when validation occurs.

Dynamic Help Tooltips validate user input as the interaction occurs, so that responses can be adjusted before focus is moved to the next field.

The Form Field Validation Module automates these processes by adding all related event handlers and managing all related rendering procedures.

HTML Syntax

Any standard form field.

Examples:

<label for="field1"> My Text Field: </label>
<input type="text" id="field1" name="whatever1" />

<label for="field2"> My Select : </label>
<select id="field2" name="whatever2">
<option value="v0"> Option One </option>
<option value="v1"> Option Two </option>
</select>

<input type="checkbox" id="field3" name="whatever3" />
<label for="field3"> My Checkbox </label>

<input type="radio" id="field4" name="whatever4" />
<label for="field4"> My Radio Button </label>

The following attributes are handled automatically by the Form Field Validation Module:

• aria-required

JavaScript invocation statement syntax:

$A.setFormFields( FormElementDOM-Node , {

'formFieldId1': {
// Configure error handling for the form field with id="formFieldId1"
},

'formFieldId2': {
// Configure error handling for the form field with id="formFieldId2"
}

}, function(ev){
// 'ev' is the onSubmit event object for the form element passed in parameter one
// 'this' is the form element
// Optionally do stuff before the form is submitted
// use ev.preventDefault() to cancel if desired
});

Parameters

The first parameter is the form element where the onSubmit event is attached.

The second parameter configures form field bindings using a key / value map.

Example:

{

// Configure an error handling tooltip for a form field with a specific ID attribute value

'formFieldId1': {

errorText: 'Initial error text to be displayed',

// Fire every time the field loses focus
validate: function(ev, dc){
// 'this' is the form field to be validated
// 'dc' is the Tooltip AccDC Object
// All other AccDC API properties and methods apply to the 'dc' object as well
// return true to pass validation, or false to fail
},

// Optionally choose to hide or show the tooltip visually
// false is set by default if omitted
hideError: false,

// Set a class to be toggled when an error is detected
// This will be bound to the dc.triggerObj DOM node, or optionally to the dc.targetObj or dc.classObj DOM node instead if declared.
// 'validateError' is set by default if omitted
toggleClass: 'validateError',

overrides: {

// Change the beginning and ending boundary role text for screen reader users
role: 'error',

// Set a class for the tooltip container
className: 'errorTooltip',

// Change the DOM insertion point to another DOM node by setting targetObj.
// The triggering Input field is used by default if omitted
targetObj: DOM-Node,

// Set a node where the toggleClass property value will be toggled when validation fails
// The triggering Input field or targetObj element is used by default if omitted
classObj: DOM-Node,

// Optionally set the element where visual positioning calculations will be bound to
posAnchor: DOM-Node

// Additional AccDC API properties and methods to set as functionality and behavior overrides go here as well

}

},

// Configure a dynamic help tooltip for a form field with a specific ID attribute value

'formFieldId2': {

helpText: 'Initial help text to be displayed',

// Fire every time the value changes
validate: function(ev, dc){
// 'this' is the form field to be validated
// 'dc' is the Tooltip AccDC Object
// dc.source can be used to dynamically change the tooltip content (HTML markup is accepted)
// dc.open() will reopen the tooltip and display the updated content
// dc.close() will close the tooltip if desired
// All other AccDC API properties and methods apply to the 'dc' object as well
// return true to pass validation, or false to fail
},

// Assign a class to be toggled
toggleClass: 'passedValidation',

// Set the above class to be toggled only when validation is true, and not when false
togglePassed: true,

overrides: {

// Change the beginning and ending boundary role text for screen reader users
role: 'help',

// Set a class for the tooltip container
className: 'helpTooltip',

// Change the DOM insertion point to another DOM node by setting targetObj.
// The triggering Input field is used by default if omitted
targetObj: DOM-Node,

// Set a node where the toggleClass property value will be toggled when validation passes or fails
// (Depends whether 'togglePassed' is set to true or false)
// The triggering Input field or targetObj element is used by default if omitted
classObj: DOM-Node,

// Optionally set the element where visual positioning calculations will be bound to
posAnchor: DOM-Node

// Additional AccDC API properties and methods to set as functionality and behavior overrides go here as well

}

}

}

The third parameter is an optional onSubmit handler that will run just before the form is submitted after validation passes.

Styling

The sample tooltips in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled tooltips will be accessible.

Implementation Notes

All form fields must be explicitly labeled to ensure accessibility for the highest percentage of people.

Explicit labelling can be achieved using the LABEL and INPUT elements, by matching the LABEL tag's For attribute with the INPUT tag's Id attribute,
or by setting the Title attribute on the INPUT tag with an informative label,
or by setting the aria-label attribute on the INPUT tag with an informative label,
or by setting the aria-labelledby attribute on the INPUT tag that references the ID of an informative label.

The advantage of using an explicitly associated LABEL and INPUT tag, is that mouse users can click the label text and automatically activate the form field that it applies to. Voice navigation software also uses explicit LABEL/INPUT tag associations to aid navigation.

This type of functionality does not occur with any of the other methods for explicit labelling.

When an INPUT element has an explicitly associated LABEL tag, a Title attribute should not be included. Screen readers often use an order of precedence when reading form field labels, and will often announce one or the other, but not both.

When a form field has an explicit LABEL, additional information can also be associated with that form field using aria-describedby, which will automatically be announced to screen reader users when tab is used to navigate.

Example:

<label for="field1"> My Text Field: </label>
<input type="text" id="field1" aria-describedby="additional1" name="whatever" />
<span id="additional1"> Supplementary Text </span>

Important: When implementing supplementary text to be announced for screen reader users, never use "display:none" or "visibility:hidden" to hide the text that is being announced. 
Doing so will make it impossible for screen reader users to browse the supplementary text using the arrow keys if clarification is needed.
If you wish to hide the supplementary text from sighted users, use offscreenText instead.
