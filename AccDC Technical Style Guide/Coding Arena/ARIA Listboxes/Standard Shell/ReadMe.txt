This shell template includes no CSS styling for the listbox.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other listboxes that include styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

The Listbox container element must include the attribute role="listbox", and all list item nodes must include the attribute role="option" to ensure accessibility for screen reader users. 
The Listbox container element and all list item nodes must include unique ID values.
The innerHTML for each list item node must contain a textual label, which may be positioned offscreen to hide it visually if desired.
(This textual label is necessary so that screen reader users will be able to identify the purpose of the node.)
Images may also be used within list item nodes if desired, and if an Alt attribute is present and contains informative text, this too is added to the list item label for screen reader users.
If an image is present but is not informative, it should include the attribute alt="" to hide it from screen reader users.
All list item nodes (with role="option") must consist of A tags with href attributes to ensure keyboard accessibility, and the A tag must be a first level childNode of the parent LI tag. (This markup structure is required by the module to work correctly)
