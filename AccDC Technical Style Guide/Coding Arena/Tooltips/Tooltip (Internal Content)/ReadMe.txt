This implementation pulls tooltip content from within the same page.
When loaded, the DOM node for each tooltip container is removed from the DOM, and stored within the AccDC Object that is associated with the tooltip ID.
This is done to prevent ID conflicts when event handlers are applied after a tooltip opens.

When an A tag is used as the triggering element, it must adhere to the following:
1. If the element contains no link text and no Img element, then the link should include an informative Title attribute. (This is only valid if there is no link text at all)
2. If the element contains an Img tag and no link text, then the Img tag should include an informative Alt attribute and Title attribute, both of which should match.
3. The A tag must include an Href attribute, to ensure keyboard accessibility.
