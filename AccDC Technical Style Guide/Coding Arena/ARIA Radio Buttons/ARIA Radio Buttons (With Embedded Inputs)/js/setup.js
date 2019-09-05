$A.bind(window, "load", function() {
  // Create a RadioGroup instance

  var radioGroup = new $A.RadioGroup(
    "radiogroupId",
    "a.accRadio",
    -1,
    "",
    function(selectedRadioNode, radiosArray) {
      // Callback function

      // When this.value changes, update the mirrored Input tag with type="radio"
      var inputs = document.getElementsByName("employment");

      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == this.value) inputs[i].checked = "checked";
      }
    }
  );

  $A.bind("#formId", "submit", function(ev) {
    var o = $A.query('input[name="employment"]:checked')[0];
    alert(o ? o.value : "None Selected");
    ev.preventDefault();
  });
});
