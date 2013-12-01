ARIA Data Grids

An ARIA Data Grid is one of the most complicated of ARIA Widget types to make accessible, since it involves many different types of user interaction.

Expected behaviors: The entire grid should have only one tab stop, one cell should be focusable at a time, the arrow keys should move focus between cells, Home and End should move focus to the beginning or end of a row, PageUp and PageDown should open the previous or next page of the grid, Alt+PageUp and Alt+PageDown should move focus to the first or last page in the grid, Space and Enter should activate the current cell or row, and textual equivalents should indicate the role and state of each interactive control type for screen reader users.

The Data Grid Module automates these processes by adding all related event handlers and managing all related rendering procedures.

HTML Syntax

<div id="gridContainerId" ></div>

The following attributes are handled automatically by the Data Grid Module:

• tabindex
• aria-owns
• role=grid
• role=rowgroup
• role=row
• role=gridcell
• role=columnheader
• role=rowheader
• aria-rowindex
• aria-colindex
• aria-labelledby
• aria-describedby
• aria-selected
• title
• aria-hidden

JavaScript invocation statement syntax:

var grid = new $A.DataGrid( ContainerNodeOrID );

Parameters

The first parameter specifies the container element where the data grid will be rendered, and may be a DOM node or an ID string.

Programmatic Control

// Set the registered columns including unique IDs and label text
// The order of items in the array will dictate the default column ordering when rendered

grid.mapColumnNames([
{
// ID that is associated with all cells in the column
id: 'col1id',
// The text that will be rendered as the column header
lbl: 'User Name',
// Set an optional class to be added to all cells within the column
colClass: 'col1'
},
{
id: 'col2id',
lbl: 'Email Address',
colClass: 'col2'
},
{
id: 'col3id',
lbl: 'Publish Record',
colClass: 'col3'
}
]);

// Programmatically change the order of rendered columns
// This method rearanges the array order of the objects passed to grid.mapColumnNames(ObjArray)
// Which is used to determine rendering order
// This must be followed by grid.open() to rerender the grid after a change is made

// E.G Change the third column to the first column
grid.changeColumnOrder(2, 0);

// Enable row headers and specify the column ID to be used for this purpose
// This must be followed by grid.open() to rerender the grid after a change is made

grid.enableRowHeaders(true, 'col1id');
// Or disable
grid.enableRowHeaders(false);

// Set a maximum number of rows to render before pagination is applied
// If set to 0, all records will render and no pagination will occur
// This must be followed by grid.open() to rerender the grid after a change is made

grid.setRowMax(25);

// Enable or disable editability for grid cells
// This will render an edit field for strings or handle toggle events for buttons.
// This must be followed by grid.open() to rerender the grid after a change is made

grid.editable(true);
// Or to disable
grid.editable(false);

// Add rows to a grid instance

grid.add(rowObject_or_rowObjectArray);

// Each row must adhere to the following object literal format:

{

id: 'uniqueRowId',

cells: {

'col1id': {
// Set the cell type, may be either 'text' or 'toggle'
// Defaults to 'text' if omitted
type: 'text',
// Set an optional readonly flag to disable editability if the grid is editable
// Defaults to false if omitted
readonly: true,
// Set the initial value of the cell
value: 'My User Name'
},

'col2id': {
value: 'email_address@whatever.com'
},

'col3id': {
type: 'toggle',
readonly: false,
value: true,
// For toggles, set the name property to specify a visual textual label
name: 'Published',
// For toggles, specify an optional class to be added when the toggle is set to true
// This will override the general toggle class specified within grid.setStaticClasses
toggleClass: 'toggle-button-pressed'
}

}

}

// Set a value changed listener for handling serverside posting when cell values change

grid.setChangeListener(function(originalCellObject, newValue, rowObject, gridInstance){
// rowObject reflects the same object passed to grid.add
// so that rowObject.id reflects the original unique row ID
// originalCellObject reflects the cell object instance passed within 'cells' when passed to grid.add
// and cellObject.id reflects the column ID, so that rowObject.id and cellObject.id can be used as X Y coordinates to identify the correct cell in the grid.
// Compare originalCellObject.value with newValue to perform input validation or other processes.
// To prevent rendering the changed input or new toggle state, simply return false
});

// Enable or disable double click or single click mouse interaction for selectable rows and editable cells
// This must be followed by grid.open() to rerender the grid after a change is made
// When set to false, a single mouse click will toggle selectability or trigger an edit action

grid.useDblClick(false);

// Enable or disable row selectability
// This must be followed by grid.open() to rerender the grid after a change is made
// When set to true, editability will automatically be set to false to prevent functionality and keyboard accessibility conflicts

grid.setSelect({
enable: true,
// Set a class to be added to the TR node every time a row is selected
toggleClass: 'selected',
// Set single or multiSelect
multiSelect: false,
// Use ARIA for selection or cross-platform offscreen text instead
// Important: The use of aria-selected for row selection is not well supported by screen readers at this time
ariaSelect: false,
// Choose whether rendering another page will automatically unselect previously selected rows
// Set to false to unselect rows automatically, or true to keep selection active
preserve: false,
// Set a callback to execute every time a row is toggled
callback: function(rowObject, state, prevSelectedRowsArray, gridInstance){
// rowObject is the activated row object.
// rowObject.rowNode is the TR DOM node for the toggled row.
// 'state' reflects the proposed state change, which is the opposite of rowObject.selected.
// prevSelectedRowsArray is an array of all previously selected rowObjects, not counting the current rowObject.
// To cancel the toggle action, return false
}
});

// Or pass single properties to set functionality

grid.setSelect({
enable: false
});

// Unselect all previously selected rows

grid.unselectAll();

// Select all rows on the currently rendered page

grid.selectAll();

// Get an array of all currently selected rowObjects
// Each rowObject reflects the same object literal passed in grid.add()

// Get an array of selected rowObjects
var selected = grid.getSelected(),
// Get the row ID for the first selected row
rowId = selected[0].id,
// Or get the TR DOM node of the first selected row
rowNode = selected[0].rowNode;

// Programmatically select one or more rows using an array of row IDs

grid.select(['rowId1', 'rowId2']);

// Enable or disable row deletion
// This must be followed by grid.open() to rerender the grid after a change is made
// When enabled, the Delete key will delete all currently selected rows from the grid and destroy their rowObjects in the cache
// Selectability must be set to true for this functionality to be used

grid.setDelete({
enable: true,
// Set a function to execute prior to deletion
runBefore: function(selectedRowIDs_array){
// Return false to cancel deletion
},
// Set a callback to execute on every row that is deleted
callback: function(rowObject, gridInstance){
// rowObject.id is the table row ID that is being deleted
// alert(rowObject.id);
// return false to cancel deletion from the grid
},
// Set a function to execute after deletion is completed
runAfter: function(deletedRowIDs_array){
// Do something
}
});

// Or to disable

grid.setDelete({
enable: false
});

// Programmatically delete all currently selected rows and destroy their rowObjects in the cache

grid.deleteRows();

// Programmatically delete one or more rows and destroy their rowObjects in the cache using an array of row IDs

grid.deleteRows(['rowId1', 'rowId2']);

// Programmatically delete all rows in the grid instance and destroy their rowObjects in the cache

grid.deleteAllRows();

// set accessible text for screen reader users

grid.setAccessibleText({
// Set offscreen and tooltip text for toggle cells
toggleButtonRole: 'Toggle Button',
toggleButtonState: 'Pressed',
disabledText: 'Disabled',
// Set the page text to be announced to screen reader users during infinite scrolling. E.G "Page 2", "Page 3", etc.
pageRole: 'Page',
// Set the active state and help tooltip text for mouse users
selectState: 'Selected',
editLinkAction: 'Editable',
dblClickTitle: 'Click to activate',
// Set the title text for the edit field
editFieldTitle: 'Press Enter to save, or Escape to cancel.'
});

// Set static classes

grid.setStaticClasses({
// General Table element class for the grid
gridClass: 'data-grid',
// Additional Table element class when the grid is set to Readonly
gridReadOnlyClass: 'data-grid-readonly',
// Additional Table element class when the grid is set to Editable
gridEditableClass: 'data-grid-editable',
// Additional Table element class when the grid is set to Selectable
gridSelectableClass: 'data-grid-selectable',
// General TR element class for the grid
gridRowClass: 'data-grid-row',
// Additional TR element class when a grid row has focus
gridRowFocusedClass: 'data-grid-row-focused',
// General TH and TD element class for the grid
gridCellClass: 'data-grid-cell',
// Additional TD element class when a grid cell is set to Readonly
cellReadOnlyClass: 'data-grid-cell-readonly',
// Additional TD element class when a grid cell has focus
gridCellFocusedClass: 'data-grid-cell-focused',
// General STRONG element class for grid text cells
gridCellLinkClass: 'data-grid-cell-link',
// General STRONG element class for grid toggle cells
gridCellToggleClass: 'data-grid-cell-toggle',
// Additional STRONG element class for grid toggle cells when set to True
gridCellTogglePressedClass: 'data-grid-cell-toggle-pressed',
// General DIV and INPUT element class for grid edit field popups
editFieldClass: 'data-grid-cell-link-edit'
});

// Get the total number of rows in the grid instance

grid.totalRows();

// Pagination: Get the current page number

grid.currentPage();

// Pagination: Get the total number of pages in the grid instance

grid.totalPages();

// Set a page index changed listener to execute every time the current or total number of pages changes within the grid instance

grid.setPageIndexChangeListener(function(currentPage, totalPages, gridInstance){
// Do something
});

// Open a specific page without rerendering the parent grid

grid.openPage(number);

// Open the first page in the grid

grid.firstPage();

// Open the previous page in the grid

grid.prevPage();

// Open the next page in the grid

grid.nextPage();

// Open the last page in the grid

grid.lastPage();

// Execute listener every time a grid object is opened in the DOM

grid.setOpenListener(function(container, dc, gridInstance){
// 'dc' is the grid AccDC Object
});

// Execute listener every time a grid object is closed in the DOM

grid.setCloseListener(function(container, dc, gridInstance){
// 'dc' is the grid AccDC Object
});

// Execute listener every time a grid TR object is rendered in the DOM

grid.setAddListener(function(rowObject, dc, gridInstance){
// rowObject.id is the unique row ID as passed in grid.add()
// rowObject.rowNode is the rendered TR DOM node
// 'dc' is the grid AccDC Object
});

// Execute listener every time a grid TR object is removed from the DOM

grid.setRemoveListener(function(rowObject, dc, gridInstance){
// rowObject.id is the unique row ID as passed in grid.add()
// rowObject.rowNode is the rendered TR DOM node
// 'dc' is the grid AccDC Object
});

// Execute listener every time a grid TD node receives focus

grid.setMoveListener(function(newCell, oldCell, dc, gridInstance){
// 'newCell' is the TD DOM node that has been given focus
// 'oldCell' is the TD DOM node that used to have focus
// 'dc' is the grid AccDC Object
});

// Assign a character maxLength value for the edit text popup

grid.setEditMaxLength(255);

// Set a positioning override for the placement of the edit text popup
// Must return an object literal that contains the following properties: top, left, width, height

grid.setEditOffset(function(cellObject){
// cellObject.cellNode is the DOM node for the TD element that has focus
// cellObject.cellNodeA is the DOM node for the STRONG element contained within the TD element that has focus
var o = $A.xOffset(cellObject.cellNodeA); // Get top and left properties
o.height = $A.xHeight(cellObject.cellNodeA); // Add height
o.width = $A.xWidth(cellObject.cellNodeA); // Add width
return o;
});

// Set an edit field load listener to execute every time the string edit field is opened for a cell

grid.setEditLoadListener(function(editFieldNode, cellObject){
// editFieldNode is the rendered edit Input element
// cellObject is the cellObject that was triggered, providing access to all data associated with that cell
// E.G
// cellObject.cellNode is the actionable TD node that was activated
// cellObject.value is the original value of the cell
// cellObject.id is the column id for that cell
// cellObject.rowObject.id is the unique row ID for that row
// cellObject.rowObject.rowNode is the TR node for that row
});

// Set the value of a specific cell in the grid using its unique row ID and column ID as X Y coordinates
// Row ID refers to the same value stored within rowObject.id, and col ID refers to the same value stored within cellObject.id

grid.setValue('rowID', 'colID', value);

// Get the value of a specific cell in the grid using its unique row ID and column ID as X Y coordinates
// Row ID refers to the same value stored within rowObject.id, and col ID refers to the same value stored within cellObject.id

grid.getValue('rowID', 'colID');

// Programmatically store data within a specific cell in the grid using its unique row ID and column ID as X Y coordinates
// Row ID refers to the same value stored within rowObject.id, and col ID refers to the same value stored within cellObject.id
// When set, the data is alternatively available within the cellObject via cellObject.data['keyname']

grid.setData('rowID', 'colID', 'keyname', data);

// Programmatically retrieve data within a specific cell in the grid using its unique row ID and column ID as X Y coordinates
// Row ID refers to the same value stored within rowObject.id, and col ID refers to the same value stored within cellObject.id

grid.getData('rowID', 'colID', 'keyname');

// Open a grid instance and render a page within the DOM
// If no page number is passed as the first parameter, then 1 is inferred by default

grid.open();
// Or to open a specific page
grid.open(number);

// Close a grid instance and remove it from the DOM
// This will not delete any of the cached rowObjects that were added via grid.add()

grid.close();

// Programmatically set focus to the grid
// This always references the TD node that is currently active

grid.focus();

// Access the grid AccDC Object instance for optional modification

var dc = getAccDCObject();

// Access the container DOM node

var myContainer = grid.container;

Styling

The sample data grids in the Coding Arena are styled to look a certain way for the demo, but it doesn't actually matter what they look like.

You can change the styling however you wish to fit the layout of any UI, and the data grids will still be accessible to both screen reader and keyboard only users regardless.

Simply ensure that sufficient color contrast is observed for low vision users, and a focus outline clearly shows which elements have focus, and your newly styled data grid will be accessible.

Implementation Notes

Notes about keyboard interactivity

A focusable ARIA Grid is a complicated concept, and there are only a certain number of keyboard commands available that don't directly conflict with the screen reader or browser. The following keyboard commands should not be used for this reason:

• Control+PageUp/PageDown: Is automatically intercepted by JAWS and never gets passed through to the grid.
• Control+Up/Down: Is automatically intercepted by JAWS and never gets passed through to the grid.
• Alt+Home: Automatically loads the home page in the browser.
• Alt+Left/Right: Automatically activates the Back and Forward buttons in the browser.

Notes about mouse interactivity

When activating a selectable row or editable cell using the mouse, double click must be used. If a single click is used to invoke this functionality, it will conflict with screen reader behavior. For example, when browsing the page using JAWS in Virtual Cursor mode, it is necessary to press Enter on the desired grid cell to enter Applications Mode. When JAWS does this, it automatically activates the click event, which automatically invokes selection or editing for that cell. When double click is used instead, this conflict does not occur. Single tapping of a selectable or editable cell using a touch screen device however, works using one click.
