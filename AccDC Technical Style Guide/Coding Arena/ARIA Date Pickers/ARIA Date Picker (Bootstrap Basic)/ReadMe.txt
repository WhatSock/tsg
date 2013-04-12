Since this implementation is Bootstrapped using the "accdc_bootstrap.js" module, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

Available HTML5 attributes:

• data-name : The name value for the calendar picker. The Name attribute of the accompanying text field must match the data-name attribute value. The selected date will then be inserted into the text field. (Must be on the triggering element.)

Additional HTML5 attributes can be added to enhance functionality by editing the file "accdc_bootstrap.js". The returned date string can be customized as well by editing the same file.

Required attributes:

• name="whatever" : The Input field name attribute that matches the value of data-name. (Must be on the Input field with type="text")
• class="accCalendar" : The bootstrap class name that specifies an accessible calendar picker. (Must be on the triggering element.)
• id : The unique ID of the element. This value is also registered as the ID of the calendar AccDC Object, making it possible to invoke the object programmatically. (Must be on the triggering element.)
E.G $A.reg.uniqueID.open();
// All other AccDC API properties and methods are similarly available.    
