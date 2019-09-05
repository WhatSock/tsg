$A.bind(window, "load", function() {
  // Tooltip AccDC Object
  var tooltipId = $A.setTooltip({
    // Set a unique ID for the tooltip AccDC Object, which can also be referenced through $A.reg['uniqueId']
    id: "myTooltip",

    // Set the role name for the container
    role: "tooltip",

    // Set the triggering element using a DOM node or a CSS Selector
    trigger: "a#helpIcon",

    // Set an optional time delay in milliseconds
    wait: 1500,

    // Set the file path and ID of the tooltip container
    source: "files/tooltip.html #tooltip-help",

    // Position the tooltip on the right of the triggering element
    autoPosition: 3,

    // Move the Tooltip AccDC Object 10px to the right when opened
    offsetLeft: 10,

    // Set the class name for the top level container element
    className: "tooltip"

    // (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)
  });

  var passwordTooltipId = $A.setTooltip({
    // Set a unique ID for the tooltip AccDC Object, which can also be referenced through $A.reg['uniqueId']
    id: "myPasswordTooltip",
    role: "tooltip",

    // Set the triggering element using a DOM node or a CSS Selector
    trigger: "input#pWord",

    // Set an optional time delay in milliseconds
    wait: 1500,

    // Set the file path and ID of the tooltip container
    source: "files/tooltip.html #tooltip-password",

    // Position the tooltip on the right of the triggering element
    autoPosition: 3,

    // Move the Tooltip AccDC Object 10px to the right when opened
    offsetLeft: 10,

    // Set the class name for the top level container element
    className: "tooltip"

    // (Other AccDC API properties and methods can be declared here also to customize functionality and behavior)
  });
});
