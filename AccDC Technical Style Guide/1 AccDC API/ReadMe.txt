There are two versions of the AccDC API within this folder, both of which include two files.

The file named "Acc.DC.API.js" is the minified source code version,
and the file named "Acc.DC.API.U.js" is the unminified version (hence the "U" in the name),
both of which provide the same functionality.

The smaller minified version is recommended for production use, since it will load faster and provide the same functionality.

The jQuery version requires that jQuery be loaded before the AccDC API is, since the AccDC module acts as both an extension and an interface for jQuery.

The Standalone version does not require that any other library be loaded in advance, and provides the same functionality as the jQuery version.

When using AccDC with the Accessible Module components, the AccDC API must be loaded before the module files are, since each module is plugged directly into the AccDC interface.
