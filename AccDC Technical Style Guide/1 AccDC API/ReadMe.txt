There are three versions of the AccDC API within this folder, all of which include two files.

The Standalone AccDC API can be used by itself and requires no third party dependencies.
The jQuery AccDC API requires jQuery to power core functionality.
The Dojo AccDC API requires Dojo to power core functionality.

Within the jQuery and Standalone folders, the file named "Acc.DC.API.js" is the minified source code version,
and the file named "Acc.DC.API.U.js" is the unminified version (hence the "U" in the name),
both of which provide the same functionality.

The smaller minified version is recommended for production use, since it will load faster and provide the same functionality.

The jQuery version requires that jQuery be loaded before the AccDC API is, since the AccDC module acts as both an extension and an interface for jQuery.

The Standalone version does not require that any other library be loaded in advance, and provides the same functionality as the jQuery version.

The naming convention for the Dojo AccDC API files is slightly different, in order to conform with the standard module naming practices within the Dojo framework. These files must be added within the root Dojo folder where dojo.js is located.

Load syntax examples are included within each of these folders for clarity.

When using AccDC with the Accessible Module components, the AccDC API must be loaded before the module files are, since each module is plugged directly into the AccDC interface.