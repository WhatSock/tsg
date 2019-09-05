cd AccDC Technical Style Guide\1 AccDC API\For Dojo
call uglifyjs acc.dc.api.js.uncompressed.js --comments /^!/ --compress --mangle --output acc.dc.api.js
cd ..\For jQuery
call uglifyjs Acc.DC.API.U.js --comments /^!/ --compress --mangle --output Acc.DC.API.js
cd ..\For MooTools
call uglifyjs Acc.DC.API.U.js --comments /^!/ --compress --mangle --output Acc.DC.API.js
cd ..\Standalone
call uglifyjs Acc.DC.API.U.js --comments /^!/ --compress --mangle --output Acc.DC.API.js
cd ..\..\2 Accessible Component Modules
for %%G in (acordion_generator.js aria_combobox_module.js aria_data_grid_module.js aria_listbox_generator.js aria_menu_module.js aria_radio_generator.js aria_slider.js aria_tabs_module.js aria_toggler.js aria_tree_module.js banner_module.js calendar_generator.js carousel_module.js css_drag_drop_module_for_jquery.js css_drag_drop_module_for_standalone_dojo_and_mootools.js footnote_generator.js form_field_validator.js modal_module.js popup_module.js progress_bar.js scrollable_div_generator.js tooltip_module.js) do (
call uglifyjs %%G --comments /^!/ --compress --mangle --output %%~nG.min.js
)
cd ..\..