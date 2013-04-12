Required attributes:

• role="link" or role="button" : Specifies that the element is to be configured as an ARIA Link or Button Control.
• id="uniqueId" : All Toggle elements must have a unique ID attribute, which is passed as the first parameter in the JavaScript invocation statement.

HTML markup rules for differing element types:

For IMG tags, the following attributes are required to ensure accessibility for the widest range of screen readers:
1. aria-label : Specifies a textual label for screen reader users. (The Alt alone won't work for this purpose)
2. alt="" : Hides the image from screen reader users when no tooltip is desired for mouse users.
To add a tooltip for sighted mouse users, use both the Alt and Title attributes. The text for both must match the text contained within the aria-label attribute, so that all three are the same. This will also maximize accessibility in iOS devices using Voiceover.

For INPUT tags with type="image", the following attributes are required to ensure accessibility for the widest range of screen readers:
1. aria-label : Specifies a textual label for screen reader users. (The Alt alone won't work for this purpose)
2. Title : Specifies a textual label for screen reader users. This must match the text contained within the aria-label attribute.
(Both the Title and aria-label attributes are required to correct differing screen reader feedback when tabbing versus arrowing down the page using JAWS.)
3. To add a tooltip for sighted mouse users, use both the Alt and Title attributes. The text for both must match the text contained within the aria-label attribute, so that all three are the same.

For all other container elements that support innerHTML such as DIVs and SPANs, the following attributes and rules are required to ensure accessibility for the widest range of screen readers:
1. Inner Text : Specifies a textual label for screen reader users. This may be visible or positioned using offscreenText. (Must not be hidden using display:none or visibility:hidden however) offscreenText is required to ensure the same level of accessibility for iOS devices using Voiceover.
2. No Embedded Active Elements : Don't embed any other active elements, including mouse clickable images, links, or anything else that needs to be activated separately. (The only actionable element should be the element with role="link" or role="button".)
3. To add a tooltip for sighted mouse users, use the Title attribute. This must match the text contained within the innerText label.
