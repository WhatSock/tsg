Scrollable Divs

A Scrollable Div is a very simple control type, which can easily be made accessible.

Expected behaviors: Ensure that the scrollable container element receives keyboard focus, and ensure that the Up/Down/Left/Right arrow keys and the PageUp/PageDown and the Home/End keys scroll content appropriately.

The Scrollable Div Module automates these processes by making the scrollable container keyboard accessible.

HTML Syntax

<div id="scrollableDivId">
<div>
Scrollable content goes here.
</div>
</div>

The following attributes are handled automatically by the Scrollable Div Module:

• tabindex

JavaScript invocation statement syntax:

$A.makeScrollable(scrollableDivDOM_Node, 'textMessageForScreenReaderUsers');

Parameters

The first parameter is the DOM node of the scrollable div container (with 'overflow:auto' in the CSS).

The second parameter is the text string that will be announced to screen reader users the first time that focus moves into the Scrollable Div.
(This message alerts Voiceover users that the region is scrollable.)
'Scrollable Region' is set by default if no value is specified.

Styling

The sample Scrollable Divs in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

When applying new styles, simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled Scrollable Div will be accessible.

Bootstrapping

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

The Scrollable Divs within the Bootstrap folders are configured using HTML5 "data-" attributes within the HTML markup.

When the Bootstrap Module ("accdc_bootstrap.js") is executed, it parses the newly loaded DOM, recognizes the class "accScrollable", then configures the same module declaration as previously described using these HTML5 attributes.

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js".

Required attributes:

• class="accScrollable" : The bootstrap class name that specifies an accessible Scrollable Div.    

Implementation Notes

Do not use aria-haspopup.

It might sound like a good idea to notify screen reader users that a 'popup' is attached by adding the attribute aria-haspopup="true" to the triggering element (if applicable),
but this is not a good idea.

Screen readers announce different feedback based on the various combinations of element types and ARIA roles in the markup, which can lead to confusion and misrepresent the purpose of the feature altogether.

Examples:

<!-- Triggering Element One
JAWS 13 and 14 announces as "Has Popup"
NVDA2013 announces as "SubMenu"
-->

<a href="#" aria-haspopup="true"> Triggering Element One </a>

<!-- Triggering Element Two
JAWS 13 and 14 announces as "Menu"
NVDA2013 announces as "Menu Button SubMenu"
-->

<a href="#" role="button" aria-haspopup="true"> Triggering Element Two </a>

<!-- Triggering Element Three
JAWS 13 and 14 announces as "Menu"
NVDA2013 announces as "Menu Button SubMenu"
-->

<button aria-haspopup="true"> Triggering Element Three </button>

In short, don't use aria-haspopup unless you are triggering a menu.

Additionally, no ARIA attributes are necessary to make a Scrollable Div accessible for screen reader users.

Voiceover instructions for use on iOS touch screen devices:

To navigate the content of a Scrollable Div using Voiceover, use the Rotator (turn three fingers like turning a knob) to select Line Mode, then use one finger to swipe up and down within the scrollable content to navigate.

(Credit goes to David Hilbert Poehlman for providing Voiceover rotator navigation technique instructions.)