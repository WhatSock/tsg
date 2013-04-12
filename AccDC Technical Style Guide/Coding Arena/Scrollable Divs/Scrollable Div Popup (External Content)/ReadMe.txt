This implementation pulls popup content from an external page.
Markup preloading is used to maximize speed and performance.

When Implementing a Close link or button, the className must match the "closeClassName" property within the JavaScript invocation statement.
(If not explicitly set, the default value "popupClose" will be set by default, and should be used for all Close links or buttons)
Doing so will automatically bind the AccDC Close Methods with this element, and return keyboard focus properly when the AccDC Object is closed.

To prevent possible accessibility issues for screen reader users, do not use role="dialog" or role="application" within the markup.