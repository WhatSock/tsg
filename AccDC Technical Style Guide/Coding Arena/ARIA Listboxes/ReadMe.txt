ARIA Listboxes

The ARIA Listbox is a simple concept, turned into a powerful component.

Expected behaviors: ARIA Listboxes should only receive one tab stop, the Up/Down/Home/End keys should move focus appropriately, and every listbox and listbox option should be explicitly labeled.

The Listbox Module automates these processes by adding all related event handlers and managing all related rendering procedures.

HTML Syntax

<ul role="listbox" id="uniqueId1" >
<li>
<a href="#" role="option" id="uniqueId2" >
<span class="lbl"> Option One Name </span>
</a>
</li>
<li>
<a href="#" role="option" id="uniqueId3" >
<span class="lbl"> Option Two Name </span>
</a>
</li>
<li>
<a href="#" role="option" id="uniqueId4" >
<span class="lbl"> Option Three Name </span>
</a>
</li>
</ul>

Required attributes:

• role="listbox" : Specifies a Listbox group container for screen reader users.
(Must be on the container element that surrounds the list items.)
• role="option" : Specifies a Listbox Option node for screen reader users.
(Must be on the keyboard focusable link elements that comprise the listbox option elements.)
• ID : Specifies unique ID attribute values for both the listbox container element and all list option links.
• Href : Included within every list option A tag, this ensures keyboard accessibility.

The following attributes are handled automatically by the Listbox Module:

• tabindex
• aria-label
• aria-owns
• aria-setsize
• aria-posinset
• aria-selected
• aria-checked (if applicable)
• aria-grabbed (if applicable)
• aria-dropeffect (if applicable)

JavaScript invocation statement syntax:

var myListbox = new $A.Listbox( $A.getEl('uniqueId1'), {
// Configuration key / value mappings
});

Parameters

The first parameter is the DOM node for the listbox container element that includes role="listbox".

The second parameter is the object literal used to configure listbox functionality using key / value map overrides.

Example:

{

// Set the initial list option node to be selected
defaultIndex: 0,

// Set a label for screen reader users
label: 'Unique field label text',

// Choose whether the Listbox is single or multiselect (multiselect is ignored when isSortable=true)
isMultiselect: false,

// Choose whether the Listbox is sortable
isSortable: false,

// Choose whether the Delete key can be used to remove list option nodes
allowDelete: false,

// Help messages that are announced to screen reader users when isSortable=true
grabInstruct: 'Press Space to grab',
dropInstruct: 'Press Space to drop',
grabMsg: 'Grabbed',
dropMsg: 'Moved',
cancelDrop: 'Grab canceled',

// Do stuff whenever the selection changes
callback: function(optionNode, optionsArray){
// this.val() returns the current value of the Listbox control, a string if single-select or an array of strings if multiselect
}

}

Programmatic Control

Since the Listbox control is an instantiated object, all of the following public properties and methods are available:

myListbox.container // The Listbox DOM node for the element with role="listbox"

myListbox.options // The array of list option DOM nodes that contain role="option"

myListbox.index // The array index number for the currently selected list option element (relative to myListbox.options)

myListbox.grabbed // The ID string value of the currently grabbed list option DOM node (when isSortable=true)

myListbox.val() // Returns the current value of the Listbox control: An ID string when the listbox is single-select; an array of ID strings when the Listbox is a multiselect.

myListbox.val(indexValue) // Sets the current Listbox selection to the specified array index value (relative to myListbox.options)

myListbox.val('IdString') // Sets the current Listbox selection to the specified list option DOM node that matches this ID (contained within myListbox.options)

myListbox.val(['IdString1', 'IdString2']) // Sets the current Listbox selection to all of the list option DOM nodes that match the ID strings in the array (when isMultiselect=true and contained within myListbox.options)

myListbox.val([]) // Clears all previously 'grabbed' or 'checked' list options if either isSortable or isMultiselect is set to True.

myListbox.rem(indexValue) // Removes the list option DOM node from myListbox.options at the specified array index value, and returns the removed A tag DOM node.

myListbox.rem('IdString') // Removes the list option DOM node from myListbox.options by matching the ID, and returns the removed A tag DOM node.

myListbox.rem(['IdString1', 'IdString2']) // Removes the array of list option DOM nodes from myListbox.options by matching the IDs, and returns the removed A tag DOM nodes in an array.

myListbox.add(A-TagDOM-Node) // Adds a new list option to the Listbox. (Must be an A tag DOM node that includes a unique ID attribute value, an Href attribute for keyboard accessibility, and innerText to set the screen reader accessible label text)

myListbox.add([A-TagDOM-Node1, A-TagDOM-Node2]) // Adds an array of new list options to the Listbox. (Must include A tag DOM nodes that include a unique ID attribute value, an Href attribute for keyboard accessibility, and innerText to set the screen reader accessible label text)

myListbox.activate.apply(listOptionDOM-Node) // Programmatically activate the 'grab' or 'check' functionality for a specific list option DOM node (within myListbox.options when either isSortable or isMultiselect is set to True). The single parameter for this statement must consist of the A tag DOM node for the list option that you wish to activate. This simply performs a toggle action on the specified option, and does not specify a particular state.

Styling

The sample listboxes in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like. This is demonstrated within the "Shell" folders, where there is no CSS styling for the listbox. This is also useful as a practice template for trying out different styling designs with custom content.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled listbox will be accessible.

Implementation Notes

All list option elements must be marked up as links (A tags with an Href attribute) to ensure backwards compatibility and graceful degradation. These are the only elements that will receive keyboard focus.

All list option elements, as well as the listbox container, must include unique ID attribute values.

In the case of the list option elements, the ID is used as the value of the Listbox control, so when an item is activated, the value of the Listbox will be returned as the ID value for the active A tag.
For standard Listboxes, this is the ID of the currently selected list option as a string. E.G "uniqueId2"
For Multiselect Listboxes, This is an array of the ID strings of the currently checked list options. E.G ["uniqueId2", "uniqueId4"]

An innerText label for each A tag must be included to ensure accessibility for screen reader users, though you may position this text offscreen to hide it visually if desired.

Alternatively, you may also include IMG tags within the A tags to form image links. When an IMG tag includes an informative Alt attribute, this text is also included as part of the list option label for screen reader users.

If a background image is used instead however, then there must be an innerText label, even if positioned offscreen, to ensure accessibility for screen reader users.

All list option label text must be unique, to prevent confusion for screen reader users.
