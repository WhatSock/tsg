This implementation pulls banner content from within the same page.
When loaded, the DOM node for each banner container is removed from the DOM, and stored within the AccDC Object that is associated with the banner ID.
This is done to prevent ID conflicts when event handlers are applied after a banner opens.