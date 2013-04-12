This shell template includes no CSS styling for the radio buttons.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other radio buttons that include styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

The Radio container element must include the attribute role="radiogroup", and all radio option nodes must include the attribute role="radio" to ensure accessibility for screen reader users.
(There are other associated ARIA attributes that will automatically be added later, but roles cannot be added dynamically without rerendering the object in the browser. This is why they must be declared within the markup.)

Both the Radio container element and all radio option nodes must include unique ID values.
This is used by the module script to differentiate individual radios, and to set a value for the control as a whole.
The current value for a Radio Control is the ID attribute of the currently selected radio button.

The innerHTML for each radio option node must contain a textual label, which may be positioned offscreen to hide it visually if desired.
This textual label is critical so that screen reader users will be able to identify the purpose of the radio button.
If the textual label is included within another tag (such as a Span tag) for formatting purposes, aria-labelledby must be used to explicitly associate the label text with the element that includes role="radio" by referencing its ID.
This will ensure the highest level of accessibility for the highest percentage of people.
Additionally, the textual label must be included within the opening and closing tags of the element with role="radio".
If this is not done, the radio buttons will not be accessible in iOS devices using Voiceover, because iOS does not support aria-label, aria-labelledby, nor aria-describedby at this time.
However, including the textual label within the opening and closing tags of the element with role="radio", will cause Voiceover to announce the radio button label regardless.

If using an A tag, an href attribute is required to ensure keyboard accessibility.
Images may also be used within radio option nodes if desired.
If an image is present however, it should include the attribute alt="" to hide it from screen reader users.
An image with a textual Alt value won't be reliably announced as the radio button label in all browsers, which is why alt="" is used to hide it from screen reader users.
A textual label must be used instead to ensure the highest level of accessibility for the highest percentage of people.
To add a tooltip for sighted mouse users, use the Title attribute on the IMG tag instead.
The value within the Title attribute must match the text contained within the textual label however, especially when the textual label is positioned off screen to hide it visually. (This will ensure equal accessibility for all user types)
