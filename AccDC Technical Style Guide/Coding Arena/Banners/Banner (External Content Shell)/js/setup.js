$A.bind(window, "load", function() {
  // Set a banner to be loaded, and save a public reference to the ID

  window.bannerId = $A.setBanner({
    // Set a unique ID for the banner AccDC Object, which can also be referenced through $A.reg['uniqueId']
    id: "myBanner",

    // Set the boundary text for screen reader users
    role: "Banner",
    accStart: "Start",
    accEnd: "End",

    // Specify the path and ID of the banner content to be loaded
    source: "files/overlays.html #ad-1",

    // Disable automatic positioning
    autoFix: 0,

    // Specify that the banner should open as soon as the page loads
    autoStart: true,

    // Set a class name for the banner top level container element
    className: "banner",

    // Specify that the textual content of the banner should automatically be announced to screen reader users when opened
    announce: true,

    // Choose the container element where the banner will be inserted
    isStatic: "body",
    // Choose to prepend the banner instead of replacing the content within the container element
    prepend: true,

    // Set a hidden close link to appear for screen reader users
    showHiddenClose: true,
    // Remove the hidden close link from the tab order so it doesn't appear when tabbing
    displayHiddenClose: false,

    // Set the heading level that will be accessible for screen reader users
    ariaLevel: 2,

    // Run a script after the banner finishes loading
    runAfter: function(dc) {
      // Set a submit handler on the form within the banner
      $A.bind("div.banner form", "submit", function(ev) {
        // Prevent the page from refreshing
        ev.preventDefault();

        // Get a reference to the email edit field, and check for an entry
        var email = $A.getEl("email").value;

        if (email) alert("Do something with " + email);

        // Get a reference to the Banner AccDC Object using its ID
        var dc = $A.reg[bannerId];
        // Then close the banner
        dc.close();
      });
    }

    // Other AccDC API properties and methods can go here as well.
  });
});
