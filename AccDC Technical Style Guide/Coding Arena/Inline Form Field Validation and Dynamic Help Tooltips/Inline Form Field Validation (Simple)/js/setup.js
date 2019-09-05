$A.bind(window, "load", function() {
  // Configure the form fields for the Error Validation Demo

  $A.setFormFields(
    $A.getEl("contactForm"),
    {
      // Configure error handling for Inputs with specific ID attribute values

      // For the Name field (the Input tag with id="your_name")

      your_name: {
        errorText: "Your name is required",
        validate: function(ev, dc) {
          // Is the field empty? Return true or false

          return this.value ? true : false;
        },
        overrides: {
          // Position the error tooltip above the Input field
          autoPosition: 1,
          offsetLeft: -3
          // (The autoPosition property is documented on the Core API tab at WhatSock.com)
        }
      },

      // For the Email field (the Input tag with id="your_email")

      your_email: {
        errorText: "Your email is required",
        validate: function(ev, dc) {
          // Is the field empty? Return true or false

          return this.value ? true : false;
        },
        overrides: {
          // Position the error tooltip above the Input field
          autoPosition: 1,
          offsetLeft: -3
          // (The autoPosition property is documented on the Core API tab at WhatSock.com)
        }
      }
    },
    function(ev) {
      // Optionally do stuff when the form is submitted
      alert("YAY!");

      // use preventDefault() to cancel
      ev.preventDefault();
    }
  );
});
