/*!
ARIA Tree From XML Module R2.3
Copyright 2010-2015 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
	*/

(function(){

	$A.setTree = function(config){

		var config = config || {}, treeTitle = config.title, insertionPoint = config.container, tree = config.treeTag || 'ul',
			treeClass = config.treeClass || 'branch', dividerTag = config.dividerTag || 'li',
			treeitem = config.treeItemTag || 'a', treeitemClass = config.treeItemClass || 'leaf',
			selCls = config.selectClass || 'selected', cur = xmlDoc = null,

		// Function to create initial markup
		createTree = function(dc){
			dc.tree =
							{
							node: $A.createEl(tree),
							childNodes: [],
							ids: []
							};

			for (var i = 0; i < dc.xmlNodes.length; i++){
				var n = dc.xmlNodes[i];

				if (!(n.nodeType !== 1 || n.nodeName == '#text')){
					var c = $A.createEl(dividerTag), d = $A.createEl(treeitem);

					if (d.nodeName.toLowerCase() == 'a')
						$A.setAttr(d, 'href', '#');
					$A.setAttr(d, 'id', n.attributes.getNamedItem('id').value);
					dc.tree.ids.push(d.id);

					var isBranch = false;

					for (var j = 0; j < n.childNodes.length; j++){
						if (!(n.childNodes[j].nodeType !== 1 || n.childNodes[j].nodeName == '#text'))
							isBranch = true;
					}

					if (isBranch)
						$A.addClass(d, treeClass);

					else
						$A.addClass(d, treeitemClass);
					d.innerHTML = '<span>' + n.attributes.getNamedItem('name').value + '</span>';
					$A.setAttr(d, 'aria-label', $A.getText(d));
					c.appendChild(d);
					dc.tree.node.appendChild(c);
					dc.tree.childNodes.push(d);
				}
			}

			if (dc.tree.ids.length)
				$A.setAttr(dc.tree.node, 'aria-owns', dc.tree.ids.join(' '));
		},

		// Function to assign ARIA attributes and event handlers
		createARIATree = function(dc, folderClass){
			var folderClass = folderClass || 'folder', parent = dc.tree.node, children = dc.tree.childNodes;

			if (dc.ariaLevel === 1)
				$A.setAttr(parent,
								{
								role: 'tree',
								'aria-label': treeTitle
								});

			else{
				var tid = 'aria' + $A.genId();
				$A.setAttr(parent,
								{
								role: 'group',
								id: tid
								});

				$A.setAttr(cur, 'aria-owns', tid);
			}

			for (var i = 0; i < children.length; i++){
				var l = children[i];
				$A.setAttr(l,
								{
								role: 'treeitem',
								'aria-setsize': children.length,
								'aria-posinset': i + 1,
								'aria-level': dc.ariaLevel
								});

				if (!i && dc.ariaLevel === 1)
					$A.setAttr(l,
									{
									tabindex: '0',
									'aria-selected': 'true'
									});

				else
					$A.setAttr(l,
									{
									tabindex: '-1',
									'aria-selected': 'false'
									});

				if ($A.hasClass(l, folderClass))
					$A.setAttr(l, 'aria-expanded', 'false');
				$A.bind(l,
								{
								focustreeitem: function(ev){
									$A.query('.' + selCls, dc.top.accDCObj, function(i, o){
										$A.setAttr(o,
														{
														'aria-selected': 'false',
														tabindex: '-1'
														});

										$A.remClass(o, selCls);
									});

									if (cur)
										dc.triggerObj = cur;

									cur = this;
									$A.addClass(cur, selCls);
									$A.setAttr(cur,
													{
													tabindex: '0',
													'aria-selected': 'true'
													}).focus();
								},
								clicktreeitem: function(ev){
									if (!$A.hasClass(this, selCls))
										$A.trigger(this, 'focustreeitem');

									else if ($A.hasClass(this, treeClass) && $A.getAttr(this, 'aria-expanded') == 'false'){
										$A.setAttr(this, 'aria-expanded', 'true');
										$A.reg[this.id].open();
									}

									else if ($A.hasClass(this, treeClass) && $A.getAttr(this, 'aria-expanded') == 'true'){
										$A.setAttr(this, 'aria-expanded', 'false');
										$A.reg[this.id].close();
									}
									ev.preventDefault();
								},
								focus: function(ev){
									if (!$A.hasClass(this, selCls))
										$A.trigger(this, 'focustreeitem');
								},
								click: function(ev){
									ev.preventDefault();
									$A.trigger(this, 'clicktreeitem');
								},
								keydown: function(ev){
									var k = ev.which || ev.keyCode;

									if (k == 13 || k == 32){
										$A.trigger(this, 'click');
										ev.preventDefault();
									}

									// 35 end, 36 home, 37 left, 38 up, 39 right, 40 down
									else if (k >= 35 && k <= 40){
										if (k == 35){
											var pdc = dc;

											while (pdc.parent)
															pdc = pdc.parent;
											var cn = pdc.tree.childNodes;

											while ($A.hasClass(cn[cn.length - 1], treeClass) && $A.getAttr(cn[cn.length - 1], 'aria-expanded') == 'true')
															cn = $A.reg[cn[cn.length - 1].id].tree.childNodes;

											if (cn[cn.length - 1] != this)
												$A.trigger(cn[cn.length - 1], 'focustreeitem');
										}

										else if (k == 36){
											var pdc = dc;

											while (pdc.parent)
															pdc = pdc.parent;
											$A.trigger(pdc.tree.childNodes[0], 'focustreeitem');
										}

										else if (k == 37){
											if (dc.parent && (($A.hasClass(this, treeClass) && $A.getAttr(this, 'aria-expanded') == 'false')
												|| $A.hasClass(this, treeitemClass))){
												var cn = dc.parent.tree.childNodes, go = null;

												for (var y = 0; y < cn.length; y++){
													if (cn[y].id == dc.id){
														go = cn[y];
														break;
													}
												}

												if (go)
													$A.trigger(go, 'focustreeitem');
											}

											else if ($A.hasClass(this, treeClass) && $A.getAttr(this, 'aria-expanded') == 'true'){
												$A.setAttr(this, 'aria-expanded', 'false');
												$A.reg[this.id].close();
											}
										}

										else if (k == 39){
											if ($A.hasClass(this, treeClass) && $A.getAttr(this, 'aria-expanded') == 'true'){
												var n = $A.reg[this.id].tree.childNodes[0];
												$A.trigger(n, 'focustreeitem');
											}

											else
												$A.trigger(this, 'clicktreeitem');
										}

										else if (k == 38){
											if (dc.parent && this == children[0]){
												var cn = dc.parent.tree.childNodes, go = null;

												for (var y = 0; y < cn.length; y++){
													if (cn[y].id == dc.id){
														go = cn[y];
														break;
													}
												}

												if (go)
													$A.trigger(go, 'focustreeitem');
											}

											else if (this != children[0]){
												var i = $A.inArray(this, children), t = children[i - 1];

												while ($A.hasClass(t, treeClass) && $A.getAttr(t, 'aria-expanded') == 'true'){
													var cn = $A.reg[t.id].tree.childNodes;
													t = cn[cn.length - 1];
												}

												if (t)
													$A.trigger(t, 'focustreeitem');
											}
										}

										else if (k == 40){
											if ($A.hasClass(this, treeClass) && $A.getAttr(this, 'aria-expanded') == 'true'){
												var go = $A.reg[this.id].tree.childNodes[0];

												if (go)
													$A.trigger(go, 'focustreeitem');
											}

											else{
												var i = $A.inArray(this, children);

												if (i < (children.length - 1))
													$A.trigger(children[i + 1], 'focustreeitem');

												else{
													var id = dc.id, pdc = dc.parent, go = null;

													while (pdc){
														var cn = pdc.tree.childNodes;

														for (var g = 0; g < cn.length; g++){
															if (cn[g].id == id && g < (cn.length - 1)){
																go = cn[g + 1];
																break;
															}
														}

														if (go){
															$A.trigger(go, 'focustreeitem');
															break;
														}
														id = pdc.id;
														pdc = pdc.parent;
													}
												}
											}
										}
										ev.preventDefault();
									}

									else if ((k >= 48 && k <= 57) || (k >= 65 && k <= 90)){
										var move = function(l){
											if (ix === -1)
												return;

											for (var i = ix + 1; i <= dc.tree.childNodes.length; i++){
												if (l.toLowerCase()
													== $A.getText(dc.tree.childNodes[i]).replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
													$A.trigger(dc.tree.childNodes[i], 'focustreeitem');
													return;
												}
											}

											for (var i = 0; i < ix; i++){
												if (l.toLowerCase()
													== $A.getText(dc.tree.childNodes[i]).replace(/^\s+|\s+$/g, '').substring(0, 1).toLowerCase()){
													$A.trigger(dc.tree.childNodes[i], 'focustreeitem');
													return;
												}
											}
										}, ix = $A.inArray(this, dc.tree.childNodes);
										move(String.fromCharCode(k));
										ev.preventDefault();
									}
								}
								});
			}
		},

		// Function to recursively call after each AccDC Object opens
		runAfter = function(dc){
			createARIATree(dc, treeClass);
			var subTreeObjects = [];

			// Generate an array of AccDC Object declarations, one for every new subfolder node
			for (var i = 0; i < dc.tree.childNodes.length; i++){
				var e = dc.tree.childNodes[i];

				if ($A.hasClass(e, treeClass))
					subTreeObjects.push(
									{
									id: e.id,
									role: $A.getText(e),
									isStatic: e.parentNode,
									append: true,
									runBefore: function(dc){
										dc.xmlNodes = $A.query('*[id=' + dc.id + '] > *', xmlDoc);
										createTree(dc);
										dc.source = dc.tree.node;
									},
									runAfter: runAfter,
									ariaLevel: dc.ariaLevel + 1
									});
			}

			if (config.bind && config.callback && typeof config.callback === 'function')
				$A.bind(dc.tree.childNodes, config.bind, function(ev){
					config.callback.apply(this, [ev, dc]);
				});

// Then register all newly formed AccDC Objects to set recursive functionality
// Parameters : dc = this as the parent AccDC Object, subTreeObjects = array, overrides = method and property overrides for all AccDC Objects being registered
			$A(dc, subTreeObjects, overrides);
		},

		// Property and / or method overrides for every newly registered AccDC Object
		overrides =
						{
						// Don't display beginning and ending boundaries using screen reader accessible hidden text
						showHiddenBounds: false,
						// Allow multiple AccDC Objects to be open at the same time
						allowMultiple: true,
						allowCascade: true,
						// Set the AccDC Object className
						className: config.topClass || 'TreeView'
						}, treeId = config.id || $A.genId();

		if (config.overrides)
			$A.internal.extend(overrides, config.overrides);

		// Register the initial Tree AccDC Object
		$A(
						[
						{
						id: treeId,
						role: 'TreeView',
						autoStart: true,
						isStatic: insertionPoint,
						allowReopen: true,
						// Set the resource type to AJAX
						mode: 6,
						ajaxOptions:
										{
										url: config.path,
										dataType: 'text'
										},
						hSuccess: function(options, data, textStatus, xhRequest, dc){
							xmlDoc = dc.xmlDocument = str2xml(data);
							dc.xmlTop = xmlDoc.documentElement;
							dc.xmlNodes = $A.query(dc.xmlTop.nodeName + ' > *', xmlDoc);
							createTree(dc);
							dc.content = dc.tree.node;
						},
						runAfter: runAfter,
						// Execute script after the AccDC Object opens; only once
						runOnceAfter: function(dc){
							// Manually assign a triggering element
							dc.triggerObj = dc.tree.childNodes[0];
						},
						ariaLevel: 1
						}
						], overrides, true);

		return treeId;
	};

	var str2xml = function(data){
		if (!data)
			data = '';
		var doc;

		if (window.DOMParser){
			var parser = new DOMParser();
			doc = parser.parseFromString(data, "text/xml");
		}

		else{
			doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(data);
		}
		return doc;
	};
})();