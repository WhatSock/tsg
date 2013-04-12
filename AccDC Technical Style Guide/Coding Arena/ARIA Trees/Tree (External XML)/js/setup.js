$A.bind(window, 'load', function(){

	// Set the ARIA Tree control

	var treeId = $A.setTree(
					{

					// Set the XML file to parse
					path: 'files/tree.xml',

					// Set the label that will be announced to screen reader users
					title: 'Browse Hamlet, by William Shakespeare',

					// Specify the container element where the tree nodes will be inserted
					container: 'div.tree',

					// Set the class name shared by all tree AccDC Objects when rendered
					topClass: 'TreeView',

					// Set the container tree node type
					treeTag: 'ul',

					// Set the divider node type that will be appended to treeTag
					dividerTag: 'li',

					// Set the focusable tree item node type that will be inserted within dividerTag
					treeItemTag: 'a',

					// Set the shared class name for all tree items that expand into subfolders
					treeClass: 'branch',

					// Set the shared class name for all tree items that do not expand into subfolders
					treeItemClass: 'leaf',

					// Set the class name that is only set on the tree item node that has focus
					selectClass: 'selected',

					// Set the handler type that will trigger the callback
					bind: 'click',

					// Declare a callback function
					callback: function(ev, dc){

						// Only perform this action on tree items that are not subfolder nodes
						if ($A.hasClass(this, 'leaf')){

							// Check for duplicate classes and then add a custom class for the currently active tree node
							$A.query('a.leaf.active', dc.top.accDCObj, function(i, o){
								$A.remClass(o, 'active');
							});
							$A.addClass(this, 'active');

							// Get the XML node that matches the ID attribute of the currently triggered element
							var xNode = $A.query('#' + this.id, dc.top.xmlDocument)[0],

							// Then store the 'load' attribute value set on this XML node
							loadVal = xNode.attributes.getNamedItem('load').nodeValue;

							// To learn more about the XML DOM and supported properties and methods, visit
							// http://www.w3schools.com/dom/default.asp

							// Now load the page content specified in loadVal and put it within the container with id="book"
							$A.load('#book', loadVal, function(responseText, textStatus, XMLHttpRequest){
								// After the new content is loaded, do the following:

								// Confirm that processing is complete by announcing a status message to screen reader users
								$A.announce('Content Loaded');
							});
						}
					}
					});

	// Set the container element with id="book" to be accessible for keyboard only users
	$A.makeScrollable($A.getEl('book'));
});