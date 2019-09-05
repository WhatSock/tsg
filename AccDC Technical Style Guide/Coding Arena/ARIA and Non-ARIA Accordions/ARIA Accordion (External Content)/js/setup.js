$A.bind(window, "load", function() {
  $A.generateAccordion(
    ".accAccordion",
    {
      // Set the hidden text role and state that will be added to the triggering element for screen reader users
      accordionRole: "Accordion",
      accordionState: "Expanded",

      // Set the class name that will be added to the triggering element of the currently open accordion
      toggleClass: "open",

      // Preload HTML markup to speed rendering
      preload: true,

      // Preload images to speed rendering
      preloadImages: true,

      // Choose whether or not to make accordion expand/collapse links toggles as well
      isToggle: false
    },
    $A.getEl("accordionGroup"),
    function(dc) {
      // Optional callback
      // This function is executed every time a section opens or closes.
      // 'this' refers to the triggering element
      // This is how to differentiate between them at runtime
      // if (dc.loaded)
      // The alert applies only to the currently open section
      // alert(this.id);
      // if (!dc.loaded)
      // The alert applies only to the newly closed section
      // alert(this.id);
      // dc.containerDiv is the DOM node that contains the newly loaded content,
      // and 'this' or dc.triggerObj is the triggering element.
      // dc is an AccDC Object, and all AccDC API properties and methods apply.
      // E.G dc.close() will close the accordion.
    }
  );
});
