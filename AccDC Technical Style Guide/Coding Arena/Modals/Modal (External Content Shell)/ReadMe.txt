This shell template includes limitted CSS styling for the modal.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other modals that include additional styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

This implementation pulls modal content from an external page.
Markup preloading is used to maximize speed and performance.

Required HTML5 attributes for the modal container element:

• data-first="true" : Must be added to the first focusable active element within the modal to control circular tabbing and shift+tabbing.
• data-last="true" : Must be added to the last focusable active element within the modal to control circular tabbing and shift+tabbing.

Also, when Implementing a Close link or button, the className must match the "closeClassName" property within the JavaScript invocation statement.
(If not explicitly set, the default value "lbClose" will be set by default, and should be used for all Close links or buttons)
Doing so will automatically bind the AccDC Close Methods with this element, and return keyboard focus properly when the AccDC Object is closed.
