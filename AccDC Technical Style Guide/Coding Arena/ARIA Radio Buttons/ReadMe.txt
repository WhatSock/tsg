ARIA Radio Buttons

ARIA Radio buttons provide a means for rendering standard links as a radio button group.

Expected behaviors: Only one radio button should receive focus in the tab order, regardless whether one or no radio button in the group is selected. If a radio button is selected, only the currently selected radio button should appear in the tab order. The arrow keys should move focus to the next or previous radio button in the group, and the act of moving to that radio button should automatically select it.

The Radio Button Module automates these processes by adding all related event handlers and managing keyboard focus appropriately.

HTML Syntax

<ul id="radiogroupId" role="radiogroup">
<li>
<a href="#" role="radio" class="accRadio" id="rOpt1" aria-labelledby="rOpt1Lbl">
<span id="rOpt1Lbl"> Radio One Label Text </span>
</a>
</li>
<li>
<a href="#" role="radio" class="accRadio" id="rOpt2" aria-labelledby="rOpt2Lbl">
<span id="rOpt2Lbl"> Radio Two Label Text </span>
</a>
</li>
<li>
<a href="#" role="radio" class="accRadio" id="rOpt3" aria-labelledby="rOpt3Lbl">
<span id="rOpt3Lbl"> Radio Three Label Text </span>
</a>
</li>
</ul>

Markup requirements:

• The Radio container element must include the attribute role="radiogroup", and all radio option nodes must include the attribute role="radio" to ensure accessibility for screen reader users.

• Both the Radio container element and all radio option nodes must include unique ID values.
This is used by the module script to differentiate individual radios, and to set a value for the control as a whole.
The current value for a Radio Control is the ID attribute of the currently selected radio button.

• The innerHTML for each radio option node must contain a textual label, which may be positioned offscreen to hide it visually if desired.
This textual label is critical so that screen reader users will be able to identify the purpose of the radio button.
If the textual label is included within another tag (such as a Span tag) for formatting purposes, aria-labelledby must be used to explicitly associate the label text with the element that includes role="radio" by referencing its ID.
This will ensure the highest level of accessibility for the highest percentage of people.
Additionally, the textual label must be included within the opening and closing tags of the element with role="radio".
If this is not done, the radio buttons will not be accessible in iOS devices using Voiceover, because iOS does not support aria-label, aria-labelledby, nor aria-describedby at this time.

• If using an A tag, an href attribute is required to ensure keyboard accessibility.

• Images may also be used within radio option nodes if desired.
If an image is present however, it should include the attribute alt="" to hide it from screen reader users.
An image with a textual Alt value won't be reliably announced as the radio button label in all browsers, which is why alt="" is used to hide it from screen reader users.
A textual label must be used instead to ensure the highest level of accessibility for the highest percentage of people.
To add a tooltip for sighted mouse users, use the Title attribute on the IMG tag instead.
The value within the Title attribute must match the text contained within the textual label however, especially when the textual label is positioned off screen to hide it visually. (This will ensure equal accessibility for all user types)

The following attributes are handled automatically by the Radio Button Module:

• tabindex
• aria-owns
• aria-setsize
• aria-posinset
• aria-selected
• aria-checked

JavaScript invocation statement syntax:

var myRadioGroup = new $A.RadioGroup( 'radiogroupId' , 'CSS Selector for All Radio Elements' , DefaultIndexValue , 'Optional Legend Text' ,
callbackFunction(selectedRadioNode, radiosArray){
// Do something whenever a radio is selected
// this.value is the ID value of the newly selected radio element
} );

Parameters

Parameter 1: The ID attribute of the radio group container. (This is the element with role="radiogroup")

Parameter 2: The CSS Selector that identifies all elements with role="option" (all of which must be contained within the container specified in parameter 1)

Parameter 3: The array index of the radio button that you want to be selected by default when instantiated.
(Simply pass -1 to specify that no radio button should be selected by default)

Parameter 4: The shared legend text that will be announced to screen reader users whenever a radio button group receives initial focus.
The legend text will be announced in addition to the textual label for the radio button.
To use a visually displayed legend instead (as demonstrated within the Coding Arena samples), use aria-labelledby on the element with role="radiogroup", and pass "" to this parameter to skip it.

Parameter 5: The callback function that will be executed whenever a new radio button is activated.

Programmatic Control

When a radio button grouping is instantiated as a new Radio Group Control, all of the following public properties and methods are available:
('myRadiogroup' refers to the variable instance name)

myRadiogroup.radios // The array of all radio option DOM nodes

myRadiogroup.index // The array index of the currently selected radio option

myRadiogroup.value // The string ID attribute value of the currently selected radio option

myRadiogroup.set('radioId') // Sets the radio option with id="radioId"

myRadiogroup.set(arrayIndex) // Sets the radio option at the specified array index (relative to myRadiogroup.radios)

Styling

The sample radios in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the radio group. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled radio group will be accessible.
