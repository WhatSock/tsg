Web Chat

The concept of Web Chat seems complicated, but it's actually quite easy to make accessible for screen reader and keyboard only users.

This may not be readily apparent by reading the JavaScript code for the chat demo in the Coding Arena however, so I'll outline the concepts that make it accessible here, to simplify things.

1. When the chat popup loads in the DOM, the content is appended to the 'body' element, so that it appears at the bottom of the page for screen reader users. This is important, because as new messages are received, the Virtual Buffer line numbers within the body content won't change. This is often what causes focus reading issues when trying to navigate within body content if nodes higher up in the DOM tree continually update themselves, which quickly becomes an accessibility issue.

2. After the chat popup is rendered, focus is automatically moved into the message field. To aid with this, the surrounding Div tag for the message field, includes the ARIA attribute role="application". This forces JAWS 14 to automatically enter Applications Mode when the field receives focus in both IE and Firefox.

3. The message field consists of a Textarea element. This is important, since this allows screen reader users to press Enter to submit new messages without automatically exiting Forms Mode, which would occur if an Input element was used instead.

4. The scrollable chat window is keyboard accessible, so that keyboard only users can simply Shift+Tab into the message field and use the Up/Down arrow keys and the PageUp/PageDown/Home/End keys to read through previously posted messages.

5. The Close icon is keyboard accessible, and pressing Escape will alternately close the Chat Popup.

6. Now, here is where the magic is for screen reader users. Whenever new messages arrive, they are automatically announced. This is accomplished using the $A.announce() method, which automatically queues incoming messages using Unobtrusive Announcement to prevent speech interruption. It also can be set to ignore repetitive messages by passing true as the second parameter.

Example:

$A.announce(LastMSG-DOM-Node, true);

The $A.announce() method is also prototyped to the String object, so it can be invoked by returning strings as well for storage if desired.

Example:

var msgHistory = [],
msgTextString = 'Howdy!';

msgHistory.push( msgTextString.announce() );

Which will both store the string contained in the variable msgTextString and announce it to screen reader users at the same time.

When a chat dialog is closed, the following method may be invoked:

String.announce.clear();

This will clear the queue so that message announcement does not continue to occur after the chat dialog is closed.

Announce Method Details

The AccDC Announce method has been tested successfully using JAWS 11-14, NVDA, and Voiceover, in Internet Explorer 8-9, Firefox, Chrome, and Safari with applicable screen readers.

JavaScript invocation statement syntax:

$A.announce( StringOrDOMNode , SuppressRepeat?<true/false> , isAggressive?<true/false> );

Or

var myString = anotherString.announce();

Parameters for $A.announce()

The first parameter may be a DOM node or text string to be announced.
(Repetitive messages will automatically be queued for announcement.)

The second parameter is a Boolean value that specifies whether the announcement of repeat message text is automatically suppressed.
If set to true, repetitive text will not be announced to screen reader users.
False is set by default if no value is specified.

The third parameter is a Boolean value that specifies whether aggressive announcement will be used to announce text.
If set to true, prior speech output will be interrupted and the latest text message will be forcibly announced. This will occur regardless which window currently has focus. (This is not desirable in most cases)
False is set by default if no value is specified.

Programmatic Control

Manually clear the message queue

String.announce.clear();

Access the last message that was announced

var last = String.announce.lastMsg;

Adjust the initial delay in milliseconds when the "$A.announce()" method queues messages to be announced sequentially

String.announce.baseDelay = 2000;

Adjust the delay in milliseconds when a message using "$A.announce()" contains two or more words including punctuation.

String.announce.charMultiplier = 160;

Implementation Notes

Important: Unobtrusive Announcement should only be used sparingly, and not for everything.

When too many things are announced on the same page, it is difficult for screen reader users to differentiate between what is being announced, and what is being navigated using the arrow keys. This is because the same voice is used for both, with no distinction.
