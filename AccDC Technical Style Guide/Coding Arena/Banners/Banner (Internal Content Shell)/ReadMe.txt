This shell template includes no CSS styling for the banner.

Nevertheless, if you view this page using a screen reader, you will hear the exact same feedback as you do with the other banners that include styling. This is very important to keep in mind. If the structure and functionality of the component is accessible from the start, it will remain so no matter what you style it to look like. This is why Functional Accessibility must always come first.

Functional Accessibility means that the component is fully accessible from the keyboard with or without a screen reader running.

This implementation pulls banner content from within the same page.
When loaded, the DOM node for each banner container is removed from the DOM, and stored within the AccDC Object that is associated with the banner ID.
This is done to prevent ID conflicts when event handlers are applied after a banner opens.