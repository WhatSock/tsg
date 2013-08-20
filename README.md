AccDC Technical Style Guide (08/20/2013)
===

The AccDC Technical Style Guide is designed to provide reliable and consistent interaction designs that are accessible to the highest percentage of people possible, and to establish a baseline for Functional Accessibility that can be utilized, built upon, studied, and tested against. 

Functional Accessibility means that each component is fully accessible from the keyboard, with or without a screen reader running. 

Supported by the Royal Society of Arts, AccDC was awarded the "Above and Beyond Accessibility Award" from the United States Department of Labor, and was presented at the Developing with Accessibility Event, hosted by the Federal Communications Commission in Washington DC in 2012.

Included with the AccDC Technical Style Guide, is the fully interactive Coding Arena, where developers and engineering students can gladiatorially hack it out with the cut and thrust of accessible development!

All of the AccDC Technical Style Guide design patterns have been fully tested for maximum accessibility using all of the following combinations:

* Strictly from the keyboard with no mouse and no screen reader running.
* Using NVDA and JAWS 11 through 14 in IE8 with Win XP.
* Using NVDA and JAWS 12 through 14 in IE 9 and 10 with Win7.
* Using NVDA and JAWS 14 in IE 10 with Win8.
* Using NVDA and JAWS 12 through 14 in FF with Win XP, Win7, and Win8.
* Using Voiceover in Safari with iOS on the iPhone/iPad.
* Using Dragon Naturally Speaking in IE and FF with Win7 and Win8 via standard keyboard interaction commands.

The Coding Arena includes all of the following top level categories and implementation types:

Accordions
Including: Internally and externally referenced content with markup and image preloading, programmatic control of accordion panels, flow control, callbacks, and HTML5 Bootstrapping.

ARIA and Non-ARIA Tabs
Including: Internally and externally referenced content with markup and image preloading, programmatic control of tab panels, flow control, callbacks, and HTML5 Bootstrapping.

ARIA Date Pickers
Including: Optional content and functionality overrides, disabled date ranges, dynamic comments, programmatic control of calendar objects, form field binding, callbacks, and HTML5 Bootstrapping.

ARIA Listboxes
Including: standard listboxes, multiselect listboxes, sortable listboxes, popup listboxes, dynamic addition or removal of Listbox Option Nodes, external querying for current value selections, programmatic control of listbox objects, form field binding, and callbacks.

ARIA Menus
Including: Horizontal flyout menus, vertical drop down menus, internally and externally referenced content, optional markup preloading, programmatic control of menu objects, callbacks, and HTML5 Bootstrapping.

ARIA Radio Buttons
Including: With inner labels, outer labels, form field binding, embedded form fields, programmatic control of radio buttons, and callbacks.

ARIA Sliders
Including: Horizontal sliders, vertical sliders, programmatic control of slider controls, callbacks, and Voiceover support on iOS touch screen devices.

ARIA Toggles, Checkboxes, Links, and Buttons
Including: ARIA Buttons and Toggle Buttons, ARIA Checkboxes, ARIA Links, Non-ARIA simulated buttons and checkboxes, programmatic control of Toggles and Checkboxes, and callbacks.

ARIA Trees
Including: XML tree parsing, auto rendering, programmatic control of tree objects, and callbacks.

Banners
Including: Internally and externally referenced content with markup preloading, programmatic control of banner objects, flow control, callbacks, and HTML5 Bootstrapping.

Carousels, Slideshows, and Wizards
Including: XML content parsing, auto rendering, programmatic control of carousel objects, internal data storage, flow control, nav button event binding, and callbacks.

Drag and Drop
Including: DOM element morphing, programmatic control of draggable objects, drag and drop event callbacks, automatic keyboard accessibility, and Voiceover support on iOS touch screen devices.

Footnotes
Including: Automatic rendering and binding, multiple footnote reference support, triggering element tracking, and HTML5 Bootstrapping.

Inline Form Field Validation and Dynamic Help Tooltips
Including: Automatic binding and rendering, validation callbacks, programmatic control of tooltip objects, custom class assignments, and optional overrides.

Modals
Including: Internally and externally referenced content with markup preloading, programmatic control of modal objects, flow control, callbacks, automatic background hiding for screen reader users, and HTML5 Bootstrapping.

Popups
Including: Internally and externally referenced content with markup preloading, programmatic control of popup objects, flow control, callbacks, and HTML5 Bootstrapping.

Progress Bars
Including: Explicit rendering using a target zone, unobtrusive rendering with no target zone, and programmatic control of progress bar objects.

Scrollable Divs
Including: Automatic region announcement for screen reader users, keyboard accessibility, and Voiceover support for iOS touch screen devices.

Tooltips
Including: Internally and externally referenced content with markup preloading, programmatic control of tooltip objects, flow control, callbacks, and HTML5 Bootstrapping.

Web Chat and Dynamic Message Announcement 
Including: Unobtrusive announcement for screen reader users viewing the same page, aggressive announcement for screen reader users viewing any page or window, DOM node text announcement, string announcement, prototyped string announcement, optionally suppress repeat string announcement, automatic message queuing for rapid message stacking, and programmatic control of the message stack to cancel further announcement.

The AccDC Technical Style Guide also includes important information, including ARIA pitfalls to be aware of, event triggering model differences between screen readers, widget type variations and conceptual differences, current screen reader incompatibilities, and key structural markup instructions.

Distributed under the terms of the Open Source Initiative OSI - MIT License.

Developed and maintained by: Bryan Garaventa

Project home:
-----

http://whatsock.com/tsg

Related projects:
-----

AccDC Technical Style Guide: https://github.com/accdc/tsg
Standalone AccDC API: https://github.com/accdc/accdc
AccDC API for jQuery: https://github.com/accdc/accdc-jquery
Standalone AccDC Bootstrap: https://github.com/accdc/bootstrap
AccDC Bootstrap for jQuery: https://github.com/accdc/bootstrap-jquery
