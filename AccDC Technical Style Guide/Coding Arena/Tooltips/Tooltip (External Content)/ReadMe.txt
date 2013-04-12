This implementation pulls tooltip content from an external page.
Markup preloading is used to maximize speed and performance.

When an A tag is used as the triggering element, it must adhere to the following:
1. If the element contains no link text and no Img element, then the link should include an informative Title attribute. (This is only valid if there is no link text at all)
2. If the element contains an Img tag and no link text, then the Img tag should include an informative Alt attribute and Title attribute, both of which should match.
3. The A tag must include an Href attribute, to ensure keyboard accessibility.
