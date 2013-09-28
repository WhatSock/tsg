The Dojo AccDC API module must be placed within the root dojo folder, at the same level where dojo.js is located, to ensure that all requisite dependencies are also loaded at the same time.

Load syntax:

<head>

<script type="text/javascript" src="../../Coding Arena/_common/js/dojo/dojo.js" data-dojo-config="async:true">
// Load Dojo asynchronously.
</script>

<script type="text/javascript">

// Configure AccDC modules and scripts to be loaded synchronously for flow control
InitAccDC = [
'../../2 Accessible Component Modules/acordion_generator.min.js'
// ...
];

// Now load the AccDC API using the Dojo AMD Loader
// The referenced AccDC API file is located at ../../Coding Arena/_common/js/dojo/acc.dc.api.js
require(['dojo/acc.dc.api']);

</script>

</head>