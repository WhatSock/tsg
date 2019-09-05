$A.bind(window, "load", function() {
  // Configure ARIA Tabs

  $A.setTabs(
    "a.accTab",
    {
      // Preload HTML markup when pulling content from external content files to speed rendering
      preload: true,

      // Preload images within preloaded HTML markup when pulling content from external content files to speed rendering
      preloadImages: true,

      // Allow tabs to be toggled
      // isToggle: true,

      // Customize the Start and End boundary text keywords for screen reader users for localization if needed
      role: "Tab",
      accStart: "Start",
      accEnd: "End",

      // Customize the heading level for screen reader users (defaults to 3 if omitted)
      ariaLevel: 2,

      // Set a className that will be added to the triggering element for the currently active tab
      toggleClass: "active"

      // Any other AccDC API properties and methods can be applied here as overrides if desired
    },
    true,
    document,
    function(dc) {
      // Optional callback that runs after a tab finishes loading
      // 'this' refers to the triggering element
      // E.G alert( this.id )
      // 'dc' refers to the current AccDC Object for the tab content, so all AccDC API properties and methods apply to this object as well.
      // E.G The property dc.containerDiv provides access to the DOM node where the tab content is rendered
      // alert(dc.containerDiv.innerHTML);
      // If additional scripting is used to configure tab panel content after it is loaded, set preload to false so that this script will only be run after the tab panel content is fully loaded in the DOM.
    }
  );
});
