To enable bootstrapping, the module "accdc_bootstrap.js" must be loaded after all desired Accessible Component Modules have been loaded.

When a control is bootstrapped, there is no setup.js file. All configurations are controlled through HTML5 attributes within the markup and by editing the "accdc_bootstrap.js" file as desired to customize functionality.

Bootstrapping is designed to handle common control types that span multiple pages with similar setup configurations.

Load syntax:

<head>

<script type="text/javascript" src="../Coding Arena/_common/js/jquery-1.8.3.min.js">
// Load jQuery.
// This is not necessary if using the Standalone AccDC API version.
</script>

<script type="text/javascript" src="../1 AccDC API/For jQuery/Acc.DC.API.js">
// Load the AccDC API, which all modules are plugged into as the common interface.
</script>

<!-- Now load all desired modules, which plugs them into AccDC. -->
<script type="text/javascript" src="../2 Accessible Component Modules/acordion_generator.min.js"></script>

<script type="text/javascript" src="accdc_bootstrap.js">
// Load AccDC Bootstrap to enable HTML parsing.
</script>

</head>