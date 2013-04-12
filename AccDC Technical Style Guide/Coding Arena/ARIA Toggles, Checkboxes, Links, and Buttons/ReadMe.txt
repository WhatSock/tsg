ARIA Toggles and Checkboxes

The Toggle Control is a multipurpose control type, that covers checkboxes, toggle buttons, and even simulated links and buttons.

Expected behaviors: The general behavior of a Toggle control is to receive keyboard focus in the tab order regardless of the active select state, to be toggleable or actionable by pressing the Spacebar or by pressing Enter on the control, and to be toggleable or actionable by clicking it as usual.

The Toggle Module automates these processes by adding all related event handlers.

HTML Syntax

The HTML syntax varies depending on which type of implementation is desired, and each type has specific rules that must be observed in order to ensure the highest level of accessibility for screen reader users.

IMG

For IMG tags, the following attributes are required to ensure accessibility for the widest range of screen readers:
1. aria-label : Specifies a textual label for screen reader users. (The Alt alone won't work for this purpose)
2. alt="" : Hides the image from screen reader users when no tooltip is desired for mouse users.
To add a tooltip for sighted mouse users, use both the Alt and Title attributes. The text for both must match the text contained within the aria-label attribute, so that all three are the same. This will also maximize accessibility in iOS devices using Voiceover.
3. role="button" must be added for toggles, or role="checkbox" must be added for checkboxes.
4. A unique ID must be added for proper event binding.

Examples:

<img role="button"
aria-label="Toggle Button Label"
alt="Toggle Button Label"
title="Toggle Button Label"
id="uniqueId1"
src="icon.png"
/>

<img role="checkbox"
aria-label="Checkbox Label"
alt="Checkbox Label"
title="Checkbox Label"
id="uniqueId2"
src="icon.png"
/>

INPUT

For INPUT tags with type="image", the following attributes are required to ensure accessibility for the widest range of screen readers:
1. aria-label : Specifies a textual label for screen reader users. (The Alt alone won't work for this purpose)
2. Title : Specifies a textual label for screen reader users. This must match the text contained within the aria-label attribute.
(Both the Title and aria-label attributes are required to correct differing screen reader feedback when tabbing versus arrowing down the page using JAWS.)
3. To add a tooltip for sighted mouse users, use both the Alt and Title attributes. The text for both must match the text contained within the aria-label attribute, so that all three are the same.
4. role="button" must be added for toggles, or role="checkbox" must be added for checkboxes.
5. A unique ID must be added for proper event binding.

Examples:

<input type="image"
role="button"
aria-label="Toggle Button Label"
alt="Toggle Button Label"
title="Toggle Button Label"
id="uniqueId3"
src="icon.png"
/>

<input type="image"
role="checkbox"
aria-label="Checkbox Label"
alt="Checkbox Label"
title="Checkbox Label"
id="uniqueId4"
src="icon.png"
/>

Container Elements

For all other container elements that support innerHTML such as DIVs and SPANs, the following attributes and rules are required to ensure accessibility for the widest range of screen readers:
1. Inner Text : Specifies a textual label for screen reader users. This may be visible or positioned using offscreenText.
OffscreenText is required to ensure the same level of accessibility for iOS devices using Voiceover.
2. No Embedded Active Elements : Don't embed any other active elements, including mouse clickable images, links, or anything else that needs to be activated separately. (The only actionable element should be the element with role="button" or role="checkbox".)
3. To add a tooltip for sighted mouse users, use the Title attribute. This must match the text contained within the innerText label.
4. role="button" must be added for toggles, or role="checkbox" must be added for checkboxes.
5. A unique ID must be added for proper event binding.

Examples:

<div role="button"
title="Toggle Button Label"
id="uniqueId5">
<span class="lbl">
Toggle Button Label
</span>
</div>

<div role="checkbox"
title="Checkbox Label"
id="uniqueId6">
<span class="lbl">
Checkbox Label
</span>
</div>

The following attributes are handled automatically by the Toggle Module:

• tabindex
• aria-checked (if applicable)
• aria-pressed (if applicable)

JavaScript invocation statement syntax:

var myToggle = new $A.Toggle('uniqueId', {
// Configure key / value mappings
});

Parameters

The first parameter is the ID attribute value of the element that will become actionable.

The second parameter is the key / value map that configures specific functionality.

Example:

{

// Disable ARIA
// (only for simulated Checkboxes and Toggle Buttons, leave out otherwise)
noARIA: true,

// Disable toggling
// (only for ARIA Links and Buttons, leave out otherwise)
noToggle: true,

// Set the initial state
// (only for simulated Checkboxes and Toggle Buttons, leave out otherwise)
state: false,

// Declare a callback to run every time the state changes
callback: function(state){
// 'state' is the proposed state change, true or false
// 'this' is the triggering element
// Return true to accept the ARIA state change, or false to prevent
return true;
}

}

Programmatic Control

After a Toggle control is instantiated, the following public properties and methods are available:

myToggle.state // Reflects the current select state of the toggle (true or false)

myToggle.set(Boolean) // Set the Toggle with the specified state (true or false)

Styling

The samples in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled checkbox or button will be accessible.
