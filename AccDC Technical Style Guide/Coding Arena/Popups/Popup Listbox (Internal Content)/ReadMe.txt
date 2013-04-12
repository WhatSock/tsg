This implementation pulls popup content from within the same page.
When loaded, the DOM node for each popup container is removed from the DOM, and stored within the AccDC Object that is associated with the popup ID.
This is done to prevent ID conflicts when event handlers are applied after a popup opens.

When Implementing a Close link or button, the className must match the "closeClassName" property within the JavaScript invocation statement.
(If not explicitly set, the default value "popupClose" will be set by default, and should be used for all Close links or buttons)
Doing so will automatically bind the AccDC Close Methods with this element, and return keyboard focus properly when the AccDC Object is closed.

To prevent possible accessibility issues for screen reader users, do not use role="dialog" or role="application" within the markup.