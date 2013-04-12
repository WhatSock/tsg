Required attributes:

• id="uniqueId" : All Toggle elements must have a unique ID attribute, which is passed as the first parameter in the JavaScript invocation statement.

HTML markup rules for differing element types:

Important: Only elements that support innerHTML can be used as Non-ARIA simulated Checkboxes.

For all container elements that support innerHTML such as A tags, DIVs, and SPANs, the following attributes and rules are required to ensure accessibility for the widest range of screen readers:
1. Inner Text : Specifies a textual label for screen reader users. This may be visible or positioned using offscreenText. (Must not be hidden using display:none or visibility:hidden however) offscreenText is required to ensure the same level of accessibility for iOS devices using Voiceover.
2. No Embedded Active Elements : Don't embed any other active elements, including mouse clickable images, links, or anything else that needs to be activated separately.
3. To add a tooltip for sighted mouse users, use the Title attribute. This must match the text contained within the innerText label.
4. Do not add any ARIA attributes to the markup.
