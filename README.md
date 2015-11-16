AccDC Technical Style Guide for Standalone and jQuery (11/16/2015)
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

ARIA Comboboxes
Including editable auto-suggest filter fields, readonly input dropdowns, simulated active element support, dynamic population, startstring matches, substring matches, word matches, and full programmatic control.

ARIA Data Grids
Including: Readonly grids, single or multi-row select, editable strings and toggle values, automatic pagination, infinite scrolling, full programmatic control, and callbacks.

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

The Accessibility Tree - A Training Guide for Advanced Web Development: https://github.com/accdc/training

The ARIA Role Conformance Matrices: https://github.com/accdc/aria-matrices

AccDC API
Standalone: https://github.com/accdc/accdc
For jQuery: https://github.com/accdc/accdc-jquery
For Dojo: https://github.com/accdc/accdc-dojo
For MooTools: https://github.com/accdc/accdc-mootools

AccDC Bootstrap
Standalone: https://github.com/accdc/bootstrap
For jQuery: https://github.com/accdc/bootstrap-jquery
For Dojo: https://github.com/accdc/bootstrap-dojo
For MooTools: https://github.com/accdc/bootstrap-mootools

AccDC Technical Style Guide and Coding Arena
For AccDC Standalone and jQuery: https://github.com/accdc/tsg
For Dojo: https://github.com/accdc/tsg-dojo
For MooTools: https://github.com/accdc/tsg-mootools

Understanding AccDC: A Quick Start Guide
-----

It helps to understand precisely what AccDC is and how it works at the most basic level.

The AccDC API is designed to process and normalize code across the three most widely used JavaScript libraries and frameworks, jQuery, Dojo, and MooTools.

To be specific, the AccDC API is an extension for jQuery, Dojo, and MooTools.

The AccDC API module interfaces with each of these libraries and frameworks in order to utilize all of the available rendering, AJAX, event handling, and associated processes, and extends them, so that any relevant command that is processed using the $A namespace, is automatically powered by the core processes within jQuery, Dojo, or MooTools.

An example showing the value of this, is described in the LinkedIn article at
http://lnkd.in/b9VGQxf

This means that, any widget that uses the following AccDC API methods, will automatically normalize equally across jQuery, Dojo, and MooTools, without requiring any coding changes to work correctly.

* $A.getEl // Get the element with the specified ID
* $A.createEl // Create a new element node, plus optional attributes, styling, and content
* $A.getAttr // Get the value of a specified attribute
* $A.setAttr // Set the value of one or more attributes
* $A.remAttr // Remove one or more attributes
* $A.getText // Get the textual content of a container element
(Coding documentation: WhatSock.com > Core API > Misc)

* $A.css // Get or Set the styling properties of one or more elements
* $A.hasClass // Check if an element includes one or more class names
* $A.addClass // Add one or more class names to an element
* $A.remClass // Remove one or more class names from an element
(Coding documentation: WhatSock.com > Core API > CSS)

* $A.bind // Add event handlers for one or more elements
* $A.unbind // Remove event handlers for one or more elements
* $A.trigger // Fire the specified event on an element
(Coding documentation: WhatSock.com > Core API > Events)

* $A.load // Pull markup code from an external resource and load into a container element
* $A.get // Pull code from an external resource and process it
* $A.getJSON // Pull JSON code from an external resource and process it
* $A.getScript // Execute an external JavaScript file
* $A.post // Submit data to a server side script using a POST request
* $A.ajax // Manually configure custom AJAX GET or POST requests
(Coding documentation: WhatSock.com > Core API > AJAX)

* $A.announce // Announce a string or the content of a container element to screen reader users
(Coding documentation: WhatSock.com > Core API > Accessibility)

There are many more AccDC API commands and customizable rendering functionalities documented on the Core API tab at WhatSock.com, but these cover all of the most commonly used public methods.

In order to test and verify this functionality, there are three dedicated TSG GitHub projects, all of which use the same component code for each widget type shared between them, which tie into the AccDC API for automatic normalization.

* Powered by jQuery: https://github.com/accdc/tsg
* Powered by Dojo: https://github.com/accdc/tsg-dojo
* Powered by MooTools: https://github.com/accdc/tsg-mootools

In order to ensure the highest level of accessibility possible for all user types, including non-sighted screen reader users, mobility impaired keyboard only users, voice navigation software users, and low vision screen magnification software users, all of the scalable widgets provided within the TSG archives are programmed specifically to be as accessible as possible using all current standards, with specific adherence to the principles and guidelines documented at:

http://whatsock.com/training

Also available for download at:
https://github.com/accdc/training

For community support, please address any questions to the Accessibility Innovators LinkedIn group, at:
https://www.linkedin.com/groups/Accessibility-Innovators-4512178

Future updates and announcements will be posted on Twitter, at
https://twitter.com/bryanegaraventa