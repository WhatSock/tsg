$A.bind(window, "load", function() {
  // Create a RadioGroup instance

  var radioGroup = new $A.RadioGroup(
    "radiogroupId",
    "a.accRadio",
    4,
    "",
    function(selectedRadioNode, radiosArray) {
      // Callback function

      // When this.value changes, update the mirrored Input tag with type="radio"
      var inputs = document.getElementsByName("rating");

      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == this.value) inputs[i].checked = "checked";
      }
    }
  );

  // Bind the mirrored Input tags to dynamically control the ARIA Radiogroup declared above as 'radioGroup'

  $A.bind('#formId input[name="rating"]', "change", function(ev) {
    radioGroup.set(this.value);
  });
});
