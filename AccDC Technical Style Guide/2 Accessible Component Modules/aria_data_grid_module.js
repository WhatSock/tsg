/*!
ARIA Data Grid Module R1.6
Copyright 2010-2017 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(pL) {
  var baseId = "grid" + $A.genId(),
    gridInc = 1;

  $A.DataGrid = function(container) {
    var that = this,
      container =
        typeof container === "string" ? $A.getEl(container) : container,
      isArray = function(v) {
        return (
          v &&
          typeof v === "object" &&
          typeof v.length === "number" &&
          typeof v.splice === "function" &&
          !v.propertyIsEnumerable("length")
        );
      },
      config = {
        gridClass: "data-grid",
        gridReadOnlyClass: "data-grid-readonly",
        cellReadOnlyClass: "data-grid-cell-readonly",
        gridEditableClass: "data-grid-editable",
        gridSelectableClass: "data-grid-selectable",
        gridRowClass: "data-grid-row",
        gridCellClass: "data-grid-cell",
        gridCellToggleClass: "data-grid-cell-toggle",
        gridCellTogglePressedClass: "data-grid-cell-toggle-pressed",
        gridCellLinkClass: "data-grid-cell-link",
        gridRowFocusedClass: "data-grid-row-focused",
        gridCellFocusedClass: "data-grid-cell-focused",
        editFieldClass: "data-grid-cell-link-edit",
        edit: false,
        colHeaders: {
          map: []
        },
        rowHeaders: {
          enabled: false,
          id: null
        },
        page: {
          row: {
            max: 0,
            collectionMap: [],
            collection: {},
            toggleButtonRole: "Toggle Button",
            toggleButtonState: "Pressed",
            disabledText: "Disabled",
            editLinkAction: "Editable",
            build: function(rowObject) {
              gridInc++;
              var bid = baseId + "tr" + gridInc;
              rowObject.rowNodeId = bid;
              rowObject.rowNode = $A.createEl(
                "tr",
                {
                  role: "row",
                  id: bid
                },
                null,
                config.gridRowClass
              );

              for (id in rowObject.cells) {
                gridInc++;
                var cid = baseId + "td" + gridInc;
                rowObject.cells[id].id = id;
                rowObject.cells[id].cellNodeId = cid;
                rowObject.cells[id].data = {};
                rowObject.cells[id].cellNode = $A.createEl(
                  "td",
                  {
                    id: cid
                  },
                  null,
                  config.gridCellClass
                );

                config.page.row.bindCell(
                  rowObject.cells[id],
                  rowObject.cells[id].cellNode,
                  rowObject,
                  rowObject.rowNode
                );
                rowObject.cells[id].cellNodeA = $A.createEl(
                  "strong",
                  {
                    id: cid + "a"
                  },
                  null,
                  rowObject.cells[id].type == "toggle"
                    ? config.gridCellToggleClass
                    : config.gridCellLinkClass
                );

                rowObject.cells[id].cellNodeS1 = $A.createEl("span");
                rowObject.cells[id].cellNodeS2 = $A.createEl(
                  "span",
                  null,
                  $A.sraCSS
                );
                rowObject.cells[id].cellNodeS3 = $A.createEl(
                  "span",
                  null,
                  $A.sraCSS
                );
                rowObject.cells[id].cellNode.appendChild(
                  rowObject.cells[id].cellNodeA
                );
                rowObject.cells[id].cellNodeA.appendChild(
                  rowObject.cells[id].cellNodeS1
                );
                rowObject.cells[id].cellNodeA.appendChild(
                  rowObject.cells[id].cellNodeS2
                );
                rowObject.cells[id].cellNodeA.appendChild(
                  rowObject.cells[id].cellNodeS3
                );
                rowObject.cells[id].rowObject = rowObject;
                pL.data(rowObject.cells[id].cellNode, "celldata", {
                  rowId: rowObject.id,
                  rowNodeId: rowObject.rowNodeId,
                  cellId: id,
                  cellNodeId: rowObject.cells[id].cellNodeId
                });
              }

              pL.data(rowObject.rowNode, "rowdata", {
                rowId: rowObject.id,
                rowNodeId: rowObject.rowNodeId
              });
            },
            trackPos: {
              row: 0,
              col: 0
            },
            resetPos: function(cellNode) {
              var d = pL.data(cellNode, "celldata");
              config.page.row.trackPos.row =
                $A.inArray(d.rowId, config.page.rendered) || 0;

              for (var i = 0; i < config.colHeaders.map.length; i++) {
                if (d.cellId == config.colHeaders.map[i].id) {
                  config.page.row.trackPos.col = i;
                  break;
                }
              }
              return d;
            },
            dblClickTitle: "Click to activate",
            editFieldTitle: "Press Enter to save, or Escape to cancel.",
            cellOffset: function(cellObject) {
              var o = $A.xOffset(cellObject.cellNodeA);
              o.height = $A.xHeight(cellObject.cellNodeA);
              o.width = $A.xWidth(cellObject.cellNodeA);
              return o;
            },
            bindCell: function(cellObject, cellNode, rowObject, rowNode) {
              var trigger = function() {
                  cellNode = cellObject.cellNode;
                  rowObject = cellObject.rowObject;
                  rowNode = cellObject.rowObject.rowNode;

                  if (config.edit && !cellObject.readonly) {
                    if (cellObject.type == "toggle") {
                      config.page.row.changed(
                        cellNode,
                        cellObject,
                        cellObject.value ? false : true
                      );
                    } else {
                      if (config.page.row.editFieldActive) clearEdit();
                      config.page.row.editFieldActive = cellObject;
                      $A.bind(config.page.row.editField, {
                        "keydown.gridcontrol": function(ev) {
                          var k = ev.which || ev.keyCode;

                          if (k == 13 || k == 27 || k == 9) {
                            ev.preventDefault();
                            ev.stopPropagation();

                            if (k == 13)
                              config.page.row.changed(
                                cellNode,
                                config.page.row.editFieldActive,
                                this.value
                              );
                            clearEdit(true);
                          }
                        },
                        "blur.gridcontrol": function(ev) {
                          ev.preventDefault();
                        }
                      });
                      config.page.row.editField.value = cellObject.value;
                      $A.setAttr(config.page.row.editField, {
                        title: config.page.row.editFieldTitle
                      });

                      $A.query("body > *", function(i, o) {
                        $A.setAttr(o, "aria-hidden", "true");
                      });
                      document.body.appendChild(config.page.row.editFieldDiv);
                      $A.css(
                        config.page.row.editFieldDiv,
                        config.page.row.cellOffset(cellObject)
                      );
                      config.page.row.editField.focus();

                      if (
                        config.page.row.editLoad &&
                        typeof config.page.row.editLoad === "function"
                      )
                        config.page.row.editLoad.apply(
                          config.page.row.editField,
                          [config.page.row.editField, cellObject]
                        );
                    }
                  } else if (config.page.row.selectEnabled) {
                    var wasSelected = rowObject.selected;

                    if (!config.page.row.multiSelect)
                      config.page.row.unselectAll();

                    if (!wasSelected || config.page.row.multiSelect)
                      config.page.row.select(cellObject);

                    if (!config.page.row.ariaSelect)
                      $A.announce(cellObject.cellNode);
                  }
                },
                nav = function(k, ev) {
                  cellNode = cellObject.cellNode;
                  rowObject = cellObject.rowObject;
                  rowNode = cellObject.rowObject.rowNode;

                  // PageUp 33
                  // PageDown 34
                  // End 35
                  // Home 36
                  // Left 37
                  // Up 38
                  // Right 39
                  // Down 40
                  if (k == 33) {
                    if (pressed.alt) config.page.first(cellObject, rowObject);
                    else config.page.prev(cellObject, rowObject);
                  } else if (k == 34) {
                    if (pressed.alt) config.page.last(cellObject, rowObject);
                    else config.page.next(cellObject, rowObject);
                  } else if (k >= 35 && k <= 40) {
                    var move = false,
                      rowMax = config.page.rendered.length - 1,
                      colMax = config.colHeaders.map.length - 1;

                    if (
                      k == 35 &&
                      pressed.ctrl &&
                      config.page.current < config.page.total
                    ) {
                      config.page.last(cellObject, rowObject, true);
                      return;
                    } else if (
                      k == 35 &&
                      pressed.ctrl &&
                      config.page.current == config.page.total
                    ) {
                      config.page.row.trackPos.row = rowMax;
                      move = true;
                    } else if (
                      k == 35 &&
                      config.page.row.trackPos.col < colMax
                    ) {
                      config.page.row.trackPos.col = colMax;
                      move = true;
                    } else if (
                      k == 36 &&
                      pressed.ctrl &&
                      config.page.current > 1
                    ) {
                      config.page.first(cellObject, rowObject);
                      return;
                    } else if (
                      k == 36 &&
                      pressed.ctrl &&
                      config.page.current == 1
                    ) {
                      config.page.row.trackPos.row = 0;
                      move = true;
                    } else if (k == 36 && config.page.row.trackPos.col > 0) {
                      config.page.row.trackPos.col = 0;
                      move = true;
                    } else if (k == 37 && config.page.row.trackPos.col > 0) {
                      config.page.row.trackPos.col -= 1;
                      move = true;
                    } else if (
                      k == 38 &&
                      config.page.row.trackPos.row > 0 &&
                      pressed.alt
                    ) {
                      config.page.row.trackPos.row = 0;
                      move = true;
                    } else if (k == 38 && config.page.row.trackPos.row > 0) {
                      config.page.row.trackPos.row -= 1;
                      move = true;
                    } else if (k == 38 && config.page.row.trackPos.row == 0) {
                      config.page.prev(cellObject, rowObject, true);
                      return;
                    } else if (
                      k == 39 &&
                      config.page.row.trackPos.col < colMax
                    ) {
                      config.page.row.trackPos.col += 1;
                      move = true;
                    } else if (
                      k == 40 &&
                      config.page.row.trackPos.row < rowMax &&
                      pressed.alt
                    ) {
                      config.page.row.trackPos.row = rowMax;
                      move = true;
                    } else if (
                      k == 40 &&
                      config.page.row.trackPos.row < rowMax
                    ) {
                      config.page.row.trackPos.row += 1;
                      move = true;
                    } else if (
                      k == 40 &&
                      config.page.row.trackPos.row >= rowMax
                    ) {
                      config.page.next(cellObject, rowObject);
                      return;
                    }

                    if (move) {
                      config.page.row.move({
                        rowId:
                          config.page.rendered[config.page.row.trackPos.row],
                        cellId:
                          config.colHeaders.map[config.page.row.trackPos.col].id
                      });
                    }
                  }
                };

              var pressed = {
                ctrl: false,
                alt: false
              };

              $A.bind(cellNode, {
                "click.gridcontrol": function(ev) {
                  var t = ev.srcElement || ev.target;

                  if (t != this || this != config.page.row.focusedCell)
                    config.page.row.move(config.page.row.resetPos(this));

                  if (
                    "ontouchstart" in window ||
                    navigator.maxTouchPoints > 0 ||
                    navigator.msMaxTouchPoints > 0
                  ) {
                    cellObject = getCellObject(this);
                    trigger();
                  }
                  ev.preventDefault();
                },
                "dblclick.gridcontrol": function(ev) {
                  if (useDblClick) {
                    if (this != config.page.row.focusedCell)
                      config.page.row.move(config.page.row.resetPos(this));

                    if (
                      !(
                        "ontouchstart" in window ||
                        navigator.maxTouchPoints > 0 ||
                        navigator.msMaxTouchPoints > 0
                      )
                    ) {
                      cellObject = getCellObject(this);
                      trigger();
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                  }
                },
                "mouseup.gridcontrol": function(ev) {
                  if (!useDblClick) {
                    if (!ev.which && ev.button && ev.button & 1) ev.which = 1;

                    if (ev.which === 1) {
                      if (this != config.page.row.focusedCell)
                        config.page.row.move(config.page.row.resetPos(this));

                      if (
                        !(
                          "ontouchstart" in window ||
                          navigator.maxTouchPoints > 0 ||
                          navigator.msMaxTouchPoints > 0
                        )
                      ) {
                        cellObject = getCellObject(this);
                        trigger();
                      }
                      ev.stopPropagation();
                      ev.preventDefault();
                    }
                  }
                },
                "keydown.gridcontrol": function(ev) {
                  var k = ev.which || ev.keyCode;
                  pressed.ctrl = ev.ctrlKey;
                  pressed.alt = ev.altKey;

                  if (
                    (k >= 33 && k <= 40) ||
                    k == 13 ||
                    k == 32 ||
                    k == 46 ||
                    k == 65
                  ) {
                    cellObject = getCellObject(this);

                    if (k == 13 || k == 32) {
                      if (k == 32 && pressed.ctrl) {
                        var str = "";

                        for (var i = 0; i < config.colHeaders.map.length; i++) {
                          var o = config.colHeaders.map[i];
                          str +=
                            $A.getText(
                              cellObject.rowObject.cells[o.id].cellNode
                            ) + ", ";
                        }
                        $A.announce(str);
                      } else trigger();
                    } else if (k >= 33 && k <= 40) nav(k, ev);
                    else if (k == 46 && config.page.row.deleteRow.enabled) {
                      config.page.row.deleteRow.callback();
                      config.page.row.move();
                    } else if (
                      k == 65 &&
                      pressed.ctrl &&
                      config.page.row.selectEnabled
                    ) {
                      config.page.row.selectAll();
                      $A.announce(config.page.row.selectState);
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                  }
                },
                "keyup.gridcontrol": function(ev) {
                  pressed.ctrl = false;
                  pressed.alt = false;
                },
                "focus.gridcontrol": function(ev) {
                  cellObject = getCellObject(this);
                  $A.addClass(this, config.gridCellFocusedClass);
                  $A.addClass(
                    cellObject.rowObject.rowNode,
                    config.gridRowFocusedClass
                  );

                  if (this != config.page.row.focusedCell)
                    config.page.row.move(config.page.row.resetPos(this), true);
                },
                "blur.gridcontrol": function(ev) {
                  $A.query(
                    "tr." +
                      config.gridRowFocusedClass +
                      ", td." +
                      config.gridCellFocusedClass,
                    config.dc.containerDiv,
                    function(i, o) {
                      $A.remClass(
                        o,
                        config.gridRowFocusedClass +
                          " " +
                          config.gridCellFocusedClass
                      );
                    }
                  );
                }
              });
            },
            clean: function(rowObject, keepData) {
              $A.remAttr(rowObject.rowNode, [
                "title",
                "aria-selected",
                "aria-rowindex",
                "aria-owns"
              ]);

              $A.remClass(
                rowObject.rowNode,
                config.gridRowFocusedClass + " " + config.page.row.selectClass
              );

              if (!keepData) pL.removeData(rowObject.rowNode, "rowdata");

              for (var n in rowObject.cells) {
                $A.remAttr(rowObject.cells[n].cellNode, [
                  "aria-activedescendant",
                  "aria-labelledby",
                  "aria-describedby",
                  "tabindex",
                  "aria-colindex",
                  "aria-selected",
                  "aria-readonly"
                ]);

                $A.remClass(
                  rowObject.cells[n].cellNode,
                  config.cellReadOnlyClass +
                    " " +
                    config.gridCellFocusedClass +
                    " " +
                    (rowObject.cells[n].toggleClass ||
                      config.gridCellTogglePressedClass)
                );

                $A.remAttr(rowObject.cells[n].cellNodeA, [
                  "title",
                  "role",
                  "aria-pressed",
                  "aria-disabled"
                ]);

                rowObject.cells[n].cellNodeS1.innerHTML = "";
                rowObject.cells[n].cellNodeS2.innerHTML = "";
                rowObject.cells[n].cellNodeS3.innerHTML = "";

                if (!keepData)
                  pL.removeData(rowObject.cells[n].cellNode, "celldata");
              }
            },
            changed: function(cellNode, cellObject, val) {
              var ret =
                config.page.row.changed.cb &&
                typeof config.page.row.changed.cb === "function"
                  ? config.page.row.changed.cb.apply(cellNode, [
                      cellObject,
                      val,
                      cellObject.rowObject,
                      that
                    ])
                  : true;

              if (typeof ret !== "boolean") ret = true;

              if (ret) {
                config.page.row.update(
                  cellObject.rowObject.id,
                  cellObject.id,
                  val
                );
              }
            },
            selectEnabled: false,
            selectState: "Selected",
            selectClass: "selected",
            multiSelect: false,
            preserveSelect: false,
            ariaSelect: false,
            selected: [],
            select: function(cellObject, sv) {
              var newVal = sv || (cellObject.rowObject.selected ? false : true),
                ret =
                  config.page.row.select.cb &&
                  typeof config.page.row.select.cb === "function"
                    ? config.page.row.select.cb.apply(
                        cellObject.rowObject.rowNode,
                        [
                          cellObject.rowObject,
                          newVal,
                          config.page.row.selected,
                          that
                        ]
                      )
                    : true;

              if (typeof ret !== "boolean") ret = true;

              if (ret) {
                cellObject.rowObject.selected = newVal;
                var found = false;

                for (var i = config.page.row.selected.length - 1; i >= 0; i--) {
                  if (
                    config.page.row.selected[i] === cellObject.rowObject.id &&
                    !cellObject.rowObject.selected
                  )
                    config.page.row.selected.splice(i, 1);
                  else if (
                    config.page.row.selected[i] === cellObject.rowObject.id &&
                    cellObject.rowObject.selected
                  )
                    found = true;
                }

                if (!found && cellObject.rowObject.selected)
                  config.page.row.selected.push(cellObject.rowObject.id);
                var isR =
                  $A.inArray(cellObject.rowObject.id, config.page.rendered) !==
                  -1;

                if (isR) {
                  var altTxt = "";

                  if (cellObject.rowObject.selected) {
                    $A.addClass(
                      cellObject.rowObject.rowNode,
                      config.page.row.selectClass
                    );
                    altTxt = config.page.row.selectState
                      ? config.page.row.selectState + ". "
                      : "";
                  } else {
                    $A.remClass(
                      cellObject.rowObject.rowNode,
                      config.page.row.selectClass
                    );
                  }
                  altTxt += config.page.row.dblClickTitle;
                  $A.setAttr(cellObject.rowObject.rowNode, "title", altTxt);

                  if (config.page.row.ariaSelect)
                    $A.setAttr(
                      cellObject.rowObject.rowNode,
                      "aria-selected",
                      cellObject.rowObject.selected ? "true" : "false"
                    );

                  for (var i = 0; i < config.colHeaders.map.length; i++) {
                    if (config.page.row.ariaSelect)
                      $A.setAttr(
                        cellObject.rowObject.cells[config.colHeaders.map[i].id]
                          .cellNode,
                        "aria-selected",
                        cellObject.rowObject.selected ? "true" : "false"
                      );
                    else
                      cellObject.rowObject.cells[
                        config.colHeaders.map[i].id
                      ].cellNodeS3.innerHTML = cellObject.rowObject.selected
                        ? "<span>&nbsp;" +
                          formatStr(config.page.row.selectState) +
                          "</span>"
                        : "";
                  }
                }
              }
            },
            unselectAll: function() {
              for (var i = config.page.row.selected.length - 1; i >= 0; i--) {
                var rowId = config.page.row.selected[i];
                config.page.row.select(
                  config.page.row.collection[rowId].cells[
                    config.colHeaders.map[0].id
                  ],
                  false
                );
                config.page.row.selected.splice(i, 1);
              }
            },
            selectAll: function() {
              if (
                config.page.row.selectEnabled &&
                config.page.row.multiSelect
              ) {
                if (!config.page.row.preserveSelect)
                  config.page.row.unselectAll();

                for (var i = 0; i < config.page.rendered.length; i++) {
                  config.page.row.select(
                    config.page.row.collection[config.page.rendered[i]].cells[
                      config.colHeaders.map[0].id
                    ],
                    true
                  );
                }
              }
            },
            deleteRow: {
              enabled: false,
              callback: function(ids) {
                var rt =
                  config.page.row.deleteRow.callback.runBefore &&
                  typeof config.page.row.deleteRow.callback.runBefore ===
                    "function"
                    ? config.page.row.deleteRow.callback.runBefore.apply(that, [
                        ids && ids.length ? ids : config.page.row.selected
                      ])
                    : true;

                if (typeof rt !== "boolean") rt = true;

                if (!rt) return false;

                var deleted = [];

                if (ids && ids.length) {
                  config.page.row.unselectAll();

                  for (var i = 0; i < ids.length; i++) {
                    if (
                      config.page.row.collection[ids[i]] &&
                      config.page.row.collection[ids[i]].cells
                    )
                      config.page.row.selected.push(ids[i]);
                  }
                }
                var si = config.page.row.selected.length;

                for (var i = config.page.row.selected.length - 1; i >= 0; i--) {
                  var rowObject =
                      config.page.row.collection[config.page.row.selected[i]],
                    pos = $A.inArray(
                      rowObject.id,
                      config.page.row.collectionMap
                    );

                  if (pos !== -1) {
                    var ret =
                      config.page.row.deleteRow.callback.cb &&
                      typeof config.page.row.deleteRow.callback.cb ===
                        "function"
                        ? config.page.row.deleteRow.callback.cb.apply(
                            rowObject.rowNode,
                            [rowObject, that]
                          )
                        : true;

                    if (typeof ret !== "boolean") ret = true;

                    if (ret) {
                      deleted.push(rowObject.id);
                      config.page.row.clean(rowObject);

                      for (var n in rowObject.cells) {
                        pL(rowObject.cells[n].cellNode).remove();
                      }
                      pL(rowObject.rowNode).remove();
                      var isR = $A.inArray(rowObject.id, config.page.rendered);

                      if (isR !== -1) config.page.rendered.splice(isR, 1);
                      config.page.row.selected.splice(i, 1);
                      config.page.row.collectionMap.splice(pos, 1);
                      delete config.page.row.collection[rowObject.id];
                    }
                  }
                }

                if (si != config.page.row.selected.length) {
                  config.page.row.trackPos.row = 0;
                  config.page.sync();
                  config.page.open(config.page.current);

                  if (
                    config.page.row.deleteRow.callback.runAfter &&
                    typeof config.page.row.deleteRow.callback.runAfter ===
                      "function"
                  )
                    config.page.row.deleteRow.callback.runAfter.apply(that, [
                      deleted
                    ]);
                  return true;
                }
                return false;
              }
            },
            update: function(rowId, cellId, val, silent) {
              if (
                !config.page.row.collection[rowId] ||
                !config.page.row.collection[rowId].cells[cellId]
              )
                return;
              var cellObject = config.page.row.collection[rowId].cells[cellId],
                type = cellObject.type;
              config.page.row.collection[rowId].cells[cellId].value =
                type == "toggle" ? (val ? true : false) : val;
              var inA = $A.inArray(rowId, config.page.rendered);

              if (inA !== -1) {
                if (type == "toggle") {
                  var accText =
                    "&nbsp;" + formatStr(config.page.row.toggleButtonRole);

                  if (val) {
                    $A.setAttr(cellObject.cellNodeA, {
                      "aria-describedby": $A.getAttr(
                        cellObject.cellNode,
                        "aria-describedby"
                      ),
                      role: "button",
                      "aria-pressed": "true"
                    });

                    $A.addClass(
                      cellObject.cellNodeA,
                      cellObject.toggleClass ||
                        config.gridCellTogglePressedClass
                    );
                    accText +=
                      "&nbsp;" + formatStr(config.page.row.toggleButtonState);
                  } else {
                    $A.setAttr(cellObject.cellNodeA, {
                      "aria-describedby": $A.getAttr(
                        cellObject.cellNode,
                        "aria-describedby"
                      ),
                      role: "button",
                      "aria-pressed": "false"
                    });

                    $A.remClass(
                      cellObject.cellNodeA,
                      cellObject.toggleClass ||
                        config.gridCellTogglePressedClass
                    );
                  }

                  if (
                    cellObject.readonly ||
                    config.page.row.selectEnabled ||
                    !config.edit
                  )
                    // accText += '&nbsp;' + formatStr(config.page.row.disabledText);
                    $A.setAttr(cellObject.cellNodeA, "aria-disabled", "true");

                  // cellObject.cellNodeS2.innerHTML = '<span>' + accText + '</span>';
                } else {
                  cellObject.cellNodeS1.innerHTML =
                    "<span>" + formatStr(val) + "</span>";
                }

                if (!silent) $A.announce(cellObject.cellNodeA);
              }
            },
            focusedCell: null,
            move: function(o, s) {
              if (!o && config.page.row.focusedCell) {
                setTimeout(function() {
                  config.page.row.focusedCell.focus();
                }, 1);
                return;
              }
              var oldCell = config.page.row.focusedCell,
                newCell =
                  config.page.row.collection[o.rowId].cells[o.cellId].cellNode;

              if (oldCell && oldCell != newCell)
                $A.setAttr(oldCell, "tabindex", "-1");
              config.page.row.focusedCell = newCell;
              config.page.row.resetPos(newCell);
              $A.setAttr(newCell, "tabindex", "0");

              if (!s) newCell.focus();

              if (
                config.page.row.move.cb &&
                typeof config.page.row.move.cb === "function"
              )
                config.page.row.move.cb.apply(newCell, [
                  newCell,
                  oldCell,
                  config.dc,
                  that
                ]);
            }
          },
          pageRole: "Page",
          current: 1,
          total: 1,
          sync: function(n) {
            var prevC = config.page.current,
              prevT = config.page.total;

            if (!config.page.row.max || !config.page.row.collectionMap.length) {
              config.page.current = config.page.total = 1;
            } else {
              var rMax = config.page.row.max,
                tRows = config.page.row.collectionMap.length;

              if (rMax >= tRows) config.page.current = config.page.total = 1;
              else {
                var p = Math.ceil(tRows / rMax);
                config.page.total = p;

                if (config.page.current > p) config.page.current = p;
              }
            }

            var r = [];

            if (n) {
              if (n > config.page.row.total) n = config.page.row.total;
              var g = (n - 1) * config.page.row.max,
                l = g + config.page.row.max;
              config.page.current = n;

              if (!config.page.row.max)
                l = config.page.row.collectionMap.length;

              for (var u = g; u < l; u++) {
                var rowId = config.page.row.collectionMap[u];

                if (!(isNaN(rowId) && !rowId)) {
                  config.page.row.collection[rowId].rowIndex = u + 1;
                  r.push(rowId);
                }
              }
            }

            if (prevC != config.page.current || prevT != config.page.total) {
              if (
                config.page.indexChanged &&
                typeof config.page.indexChanged === "function"
              )
                config.page.indexChanged.apply(that, [
                  config.page.current,
                  config.page.total,
                  that
                ]);
            }

            if (n) return r;
          },
          on: {
            open: null,
            close: null,
            change: null,
            add: null,
            rem: null
          },
          open: function(n, reOpen) {
            if (config.page.row.editFieldActive) clearEdit(true, true);

            if (isNaN(n) || n < 1) n = 1;

            if (reOpen && config.dc.loaded) config.page.close();
            var isLoaded = config.dc.loaded;

            if (!isLoaded) config.dc.open();
            config.page.render(config.page.sync(n));

            if (
              !isLoaded &&
              config.page.on.open &&
              typeof config.page.on.open === "function"
            )
              config.page.on.open.apply(container, [
                container,
                config.dc,
                that
              ]);
          },
          close: function() {
            if (config.page.row.editFieldActive) clearEdit(true, true);

            if (
              config.page.on.close &&
              typeof config.page.on.close === "function"
            )
              config.page.on.close.apply(container, [
                container,
                config.dc,
                that
              ]);

            config.page.row.unselectAll();
            config.page.removeRendered();
            config.dc.close();
          },
          rendered: [],
          removeRendered: function() {
            if (!config.page.row.preserveSelect) config.page.row.unselectAll();

            for (var i = 0; i < config.page.rendered.length; i++) {
              var id = config.page.rendered[i],
                rowObject = config.page.row.collection[id];
              config.page.row.clean(rowObject, true);

              if (
                config.page.on.rem &&
                typeof config.page.on.rem === "function"
              )
                config.page.on.rem.apply(rowObject.rowNode, [
                  rowObject,
                  config.dc,
                  that
                ]);

              for (var n in rowObject.cells) {
                if (rowObject.cells[n].cellNode.parentNode)
                  rowObject.cells[n].cellNode.parentNode.removeChild(
                    rowObject.cells[n].cellNode
                  );
              }
              rowObject.rowNode.parentNode.removeChild(rowObject.rowNode);
            }
            config.page.rendered = [];
          },
          render: function(ids) {
            if (config.page.row.editFieldActive) clearEdit(true, true);

            if (config.page.row.selectEnabled && config.edit)
              config.edit = false;

            if (!config.dc.loaded) return;

            if (config.page.rendered.length) config.page.removeRendered();
            config.page.rendered = ids;
            var initPos = {},
              aoIds = [];

            for (var h = 0; h < ids.length; h++) {
              gridInc++;
              var tr = config.page.row.collection[ids[h]].rowNode,
                colIndex = 1,
                selected = config.page.row.collection[ids[h]].selected,
                altTxt = selected ? config.page.row.selectState + ". " : "";

              $A.addClass(tr, config.gridRowClass);

              aoIds.push(config.page.row.collection[ids[h]].rowNodeId);

              if (config.page.row.selectEnabled) {
                $A.setAttr(tr, {
                  title: altTxt + config.page.row.dblClickTitle
                });

                if (config.page.row.ariaSelect)
                  $A.setAttr(tr, {
                    "aria-selected": selected ? "true" : "false"
                  });

                if (selected) {
                  $A.addClass(tr, config.page.row.selectClass);
                }
              }

              $A.setAttr(
                tr,
                "aria-rowindex",
                config.page.row.collection[ids[h]].rowIndex
              );

              var aoIds2 = [];

              for (var i = 0; i < config.colHeaders.map.length; i++) {
                gridInc++;
                var o = config.colHeaders.map[i],
                  cellObject = config.page.row.collection[ids[h]].cells[o.id];

                $A.addClass(cellObject.cellNode, config.gridCellClass);

                aoIds2.push(cellObject.cellNodeId);

                if (o.colClass) $A.addClass(cellObject.cellNode, o.colClass);

                $A.setAttr(cellObject.cellNode, {
                  role: "gridcell",
                  "aria-colindex": colIndex,
                  "aria-labelledby": cellObject.cellNodeId + "a",
                  "aria-describedby":
                    config.rowHeaders.enabled &&
                    config.rowHeaders.id &&
                    config.rowHeaders.id != cellObject.id &&
                    cellObject.rowObject.cells[config.rowHeaders.id]
                      ? cellObject.rowObject.cells[config.rowHeaders.id]
                          .cellNodeId +
                        " " +
                        o.thId
                      : o.thId,
                  tabindex: "-1"
                });

                if (
                  cellObject.type == "toggle" ||
                  (config.edit && !cellObject.readonly)
                )
                  $A.setAttr(cellObject.cellNode, {
                    "aria-activedescendant": cellObject.cellNodeId + "a"
                  });

                if (
                  config.rowHeaders.enabled &&
                  config.rowHeaders.id &&
                  config.rowHeaders.id == cellObject.id
                )
                  $A.setAttr(cellObject.cellNode, {
                    role: "rowheader",
                    scope: "row"
                  });

                if (config.page.row.selectEnabled) {
                  if (
                    cellObject.type == "toggle" &&
                    (config.page.row.toggleButtonRole ||
                      config.page.row.toggleButtonState)
                  ) {
                    var altTxt = cellObject.value
                      ? config.page.row.toggleButtonRole +
                        " " +
                        config.page.row.toggleButtonState
                      : config.page.row.toggleButtonRole;
                    $A.setAttr(cellObject.cellNodeA, "title", altTxt);
                  }

                  if (config.page.row.ariaSelect)
                    $A.setAttr(
                      cellObject.cellNode,
                      "aria-selected",
                      selected ? "true" : "false"
                    );
                  else if (selected)
                    cellObject.cellNodeS3.innerHTML = selected
                      ? "<span>&nbsp;" +
                        formatStr(config.page.row.selectState) +
                        "</span>"
                      : "";
                } else if (config.edit && !cellObject.readonly) {
                  var altTxt = "";

                  if (
                    cellObject.type == "toggle" &&
                    (config.page.row.toggleButtonRole ||
                      config.page.row.toggleButtonState)
                  ) {
                    altTxt = cellObject.value
                      ? config.page.row.toggleButtonRole +
                        " " +
                        config.page.row.toggleButtonState
                      : config.page.row.toggleButtonRole;
                    altTxt += ". ";
                  } else if (config.page.row.editLinkAction) {
                    altTxt = config.page.row.editLinkAction + ". ";
                  }
                  $A.setAttr(
                    cellObject.cellNodeA,
                    "title",
                    altTxt + config.page.row.dblClickTitle
                  );
                } else if (
                  cellObject.type == "toggle" &&
                  (config.page.row.toggleButtonRole ||
                    config.page.row.toggleButtonState)
                ) {
                  var altTxt = cellObject.value
                    ? config.page.row.toggleButtonRole +
                      " " +
                      config.page.row.toggleButtonState
                    : config.page.row.toggleButtonRole;
                  $A.setAttr(cellObject.cellNodeA, "title", altTxt);
                }

                if (
                  h === config.page.row.trackPos.row &&
                  i === config.page.row.trackPos.col
                )
                  initPos = {
                    rowId: ids[h],
                    cellId: o.id
                  };

                if (cellObject.readonly || config.page.row.selectEnabled) {
                  $A.setAttr(cellObject.cellNode, "aria-readonly", "true");
                  $A.addClass(cellObject.cellNode, config.cellReadOnlyClass);
                }

                if (cellObject.type == "toggle") {
                  cellObject.cellNodeS1.innerHTML =
                    "<span>" + formatStr(cellObject.name) + "</span>";

                  var accText =
                    "&nbsp;" + formatStr(config.page.row.toggleButtonRole);

                  if (cellObject.value) {
                    $A.setAttr(cellObject.cellNodeA, {
                      "aria-describedby": $A.getAttr(
                        cellObject.cellNode,
                        "aria-describedby"
                      ),
                      role: "button",
                      "aria-pressed": "true"
                    });

                    $A.addClass(
                      cellObject.cellNodeA,
                      cellObject.toggleClass ||
                        config.gridCellTogglePressedClass
                    );
                    accText +=
                      "&nbsp;" + formatStr(config.page.row.toggleButtonState);
                  } else {
                    $A.setAttr(cellObject.cellNodeA, {
                      "aria-describedby": $A.getAttr(
                        cellObject.cellNode,
                        "aria-describedby"
                      ),
                      role: "button",
                      "aria-pressed": "false"
                    });

                    $A.remClass(
                      cellObject.cellNodeA,
                      cellObject.toggleClass ||
                        config.gridCellTogglePressedClass
                    );
                  }

                  if (
                    cellObject.readonly ||
                    config.page.row.selectEnabled ||
                    !config.edit
                  )
                    // accText += '&nbsp;' + formatStr(config.page.row.disabledText);
                    $A.setAttr(cellObject.cellNodeA, "aria-disabled", "true");

                  // cellObject.cellNodeS2.innerHTML = '<span>' + accText + '</span>';
                } else {
                  cellObject.cellNodeS1.innerHTML =
                    "<span>" + formatStr(cellObject.value) + "</span>";

                  if (config.edit && !cellObject.readonly) {
                    $A.setAttr(cellObject.cellNodeA, {
                      "aria-describedby": $A.getAttr(
                        cellObject.cellNode,
                        "aria-describedby"
                      ),
                      role: "button"
                    });

                    var accText =
                      "&nbsp;" + formatStr(config.page.row.editLinkAction);

                    cellObject.cellNodeS2.innerHTML =
                      "<span>" + accText + "</span>";
                  } else {
                    $A.setAttr(cellObject.cellNodeA, "role", "presentation");
                  }
                }
                tr.appendChild(cellObject.cellNode);
                colIndex += 1;
              }

              $A.setAttr(tr, "aria-owns", aoIds2.join(" "));

              config.dc.tbody.appendChild(tr);

              if (
                config.page.on.add &&
                typeof config.page.on.add === "function"
              )
                config.page.on.add.apply(tr, [
                  config.page.row.collection[ids[h]],
                  config.dc,
                  that
                ]);
            }

            $A.setAttr(config.dc.tbody, "aria-owns", aoIds.join(" "));

            if ("rowId" in initPos && "cellId" in initPos)
              config.page.row.move(initPos, true);
          },
          prev: function(cellObject, rowObject, byArrow) {
            if (config.page.current > 1) {
              config.page.render(config.page.sync(config.page.current - 1));
              config.page.row.move({
                rowId:
                  config.page.rendered[
                    byArrow ? config.page.rendered.length - 1 : 0
                  ],
                cellId: cellObject.id
              });

              $A.announce(config.page.pageRole + " " + config.page.current);

              if (
                config.page.on.change &&
                typeof config.page.on.change === "function"
              )
                config.page.on.change.apply(container, [
                  config.page.current,
                  config.page.total,
                  that
                ]);
            }
          },
          next: function(cellObject, rowObject) {
            if (config.page.current < config.page.total) {
              config.page.render(config.page.sync(config.page.current + 1));
              config.page.row.move({
                rowId: config.page.rendered[0],
                cellId: cellObject.id
              });

              $A.announce(config.page.pageRole + " " + config.page.current);

              if (
                config.page.on.change &&
                typeof config.page.on.change === "function"
              )
                config.page.on.change.apply(container, [
                  config.page.current,
                  config.page.total,
                  that
                ]);
            }
          },
          first: function(cellObject, rowObject) {
            if (config.page.current > 1) {
              config.page.render(config.page.sync(1));
              config.page.row.move({
                rowId: config.page.rendered[0],
                cellId: cellObject.id
              });

              $A.announce(config.page.pageRole + " " + config.page.current);

              if (
                config.page.on.change &&
                typeof config.page.on.change === "function"
              )
                config.page.on.change.apply(container, [
                  config.page.current,
                  config.page.total,
                  that
                ]);
            }
          },
          last: function(cellObject, rowObject, lr) {
            if (config.page.current < config.page.total) {
              config.page.render(config.page.sync(config.page.total));
              config.page.row.move({
                rowId: lr
                  ? config.page.rendered[config.page.rendered.length - 1]
                  : config.page.rendered[0],
                cellId: cellObject.id
              });

              $A.announce(config.page.pageRole + " " + config.page.current);

              if (
                config.page.on.change &&
                typeof config.page.on.change === "function"
              )
                config.page.on.change.apply(container, [
                  config.page.current,
                  config.page.total,
                  that
                ]);
            }
          }
        }
      };

    gridInc++;
    var uId = baseId + "u" + gridInc,
      getCellObject = function(cellNode) {
        var o = pL.data(cellNode || config.page.row.focusedCell, "celldata");
        return config.page.row.collection[o.rowId].cells[o.cellId];
      };

    config.page.row.editMaxLength = 255;
    config.page.row.editFieldDiv = $A.createEl(
      "div",
      {
        role: "application"
      },
      null,
      config.editFieldClass
    );

    config.page.row.editField = $A.createEl(
      "input",
      {
        type: "text",
        maxlength: config.page.row.editMaxLength
      },
      null,
      config.editFieldClass
    );

    config.page.row.editFieldDiv.appendChild(config.page.row.editField);
    $A.bind(window, "resize." + uId, function() {
      if (config.page.row.editFieldActive) {
        $A.css(
          config.page.row.editFieldDiv,
          config.page.row.cellOffset(config.page.row.editFieldActive)
        );
      }
    });

    var clearEdit = function(ret, sk) {
      config.page.row.editField.value = "";
      $A.unbind(config.page.row.editField, ".gridcontrol");
      pL(config.page.row.editFieldDiv).remove();

      if (ret) {
        config.page.row.editFieldActive = null;
        $A.query("body > *", function(i, o) {
          $A.setAttr(o, "aria-hidden", "false");
          $A.remAttr(o, "aria-hidden");
        });

        if (!sk) config.page.row.move();
      }
    };

    $A([
      {
        id: uId,
        role: "Grid",
        showHiddenBounds: false,
        isStatic: container,
        runAfter: function(dc) {
          gridInc++;
          dc.tableId = baseId + "t" + gridInc;
          dc.theadId = baseId + "tth" + gridInc;
          dc.trId = baseId + "tthtr" + gridInc;
          dc.tbodyId = baseId + "ttb" + gridInc;

          dc.table = $A.createEl(
            "table",
            {
              role: "grid",
              id: dc.tableId,
              "aria-owns": dc.theadId + " " + dc.tbodyId
            },
            null,
            config.gridClass
          );

          if (config.edit) $A.addClass(dc.table, config.gridEditableClass);
          else if (config.page.row.selectEnabled) {
            $A.addClass(dc.table, config.gridSelectableClass);

            if (config.page.row.multiSelect)
              $A.setAttr(dc.table, "aria-multiselectable", "true");
          } else if (!config.edit && !config.page.row.selectEnabled) {
            $A.addClass(dc.table, config.gridReadOnlyClass);
            $A.setAttr(dc.table, "aria-readonly", "true");
          }

          dc.thead = $A.createEl("thead", {
            role: "rowgroup",
            id: dc.theadId,
            "aria-owns": dc.trId
          });

          dc.tbody = $A.createEl("tbody", {
            role: "rowgroup",
            id: dc.tbodyId
          });

          dc.tr = $A.createEl(
            "tr",
            {
              role: "row",
              id: dc.trId
            },
            null,
            config.gridRowClass
          );

          dc.table.appendChild(dc.thead);
          dc.table.appendChild(dc.tbody);
          dc.thead.appendChild(dc.tr);

          var ids = [];

          for (var i = 0; i < config.colHeaders.map.length; i++) {
            gridInc++;
            var o = config.colHeaders.map[i],
              th = $A.createEl(
                "th",
                {
                  role: "columnheader",
                  id: baseId + "th" + gridInc,
                  scope: "col",
                  "aria-labelledby": baseId + "th" + gridInc + "s",
                  tabindex: "-1"
                },
                null,
                config.gridCellClass
              );

            config.colHeaders.map[i].thId = baseId + "th" + gridInc;

            ids.push(baseId + "th" + gridInc);

            if (o.colClass) $A.addClass(th, o.colClass);

            $A.bind(th, "click", function(ev) {
              config.page.row.move();
            });
            th.innerHTML =
              '<strong id="' +
              baseId +
              "th" +
              gridInc +
              "s" +
              '"><span>' +
              formatStr(o.name) +
              "</span></strong>";
            dc.tr.appendChild(th);
          }

          $A.setAttr(dc.tr, "aria-owns", ids.join(" "));

          dc.containerDiv.appendChild(dc.table);
        },
        runBeforeClose: function(dc) {
          if (dc.table) pL(dc.table).remove();
          dc.table = dc.thead = dc.tbody = dc.tr = null;
        }
      }
    ]);

    config.dc = $A.reg[uId];

    that.id = uId;

    that.getAccDCObject = function() {
      return config.dc;
    };

    that.container = container;

    that.mapColumnNames = function(o) {
      if (!o || (typeof o !== "object" && !o.length)) return;

      config.colHeaders.map = [];

      for (var n = 0; n < o.length; n++) {
        config.colHeaders.map.push({
          id: o[n].id,
          name: o[n].lbl,
          colClass: o[n].colClass || ""
        });
      }
    };

    that.changeColumnOrder = function(oldVal, newVal) {
      if (
        isNaN(oldVal) ||
        isNaN(newVal) ||
        !config.colHeaders.map[oldVal] ||
        newVal >= config.colHeaders.map.length
      )
        return;

      var o = config.colHeaders.map.splice(oldVal, 1);
      o.splice(0, 0, newVal, 0);
      [].splice.apply(config.colHeaders.map, o);
    };

    that.enableRowHeaders = function(bool, colId) {
      config.rowHeaders = {
        enabled: bool ? true : false,
        id: colId
      };
    };

    that.setRowMax = function(n) {
      config.page.row.max = isNaN(n) ? 0 : n;
    };

    that.editable = function(bool) {
      config.edit = bool ? true : false;
    };

    that.add = function(rows) {
      if (!isArray(rows)) rows = [rows];

      for (var ri = 0; ri < rows.length; ri++) {
        var row = rows[ri];

        if (!(!row || (isNaN(row.id) && !row.id) || !row.cells)) {
          if (row.id in config.page.row.collection) {
            var pos = $A.inArray(row.id, config.page.row.selected);

            if (pos !== -1) config.page.row.selected.splice(pos, 1);
            config.page.row.clean(config.page.row.collection[row.id]);
            pL(config.page.row.collection[row.id].rowNode).remove();
            pos = $A.inArray(row.id, config.page.row.collectionMap);

            if (pos !== -1) config.page.row.collectionMap.splice(pos, 1);
            delete config.page.row.collection[row.id];
          }
          config.page.row.build(row);
          config.page.row.collectionMap.push(row.id);
          config.page.row.collection[row.id] = row;
          config.page.sync();
        }
      }
    };

    that.setChangeListener = function(fn) {
      if (typeof fn !== "function") return;

      config.page.row.changed.cb = fn;
    };

    that.setPageChangeListener = function(fn) {
      if (typeof fn !== "function") return;

      config.page.on.change = fn;
    };

    that.setEditMaxLength = function(n) {
      if (isNaN(n)) n = 0;
      config.page.row.editMaxLength = n;
    };

    that.setEditLoadListener = function(fn) {
      if (typeof fn !== "function") return;

      config.page.row.editLoad = fn;
    };

    that.setPageIndexChangeListener = function(fn) {
      if (typeof fn !== "function") return;

      config.page.indexChanged = fn;
    };

    that.setSelect = function(o, undefined) {
      if (!o || typeof o !== "object") return;

      if ("enable" in o)
        config.page.row.selectEnabled = o.enable ? true : false;

      if ("toggleClass" in o)
        config.page.row.selectClass = o.toggleClass || "selected";

      if ("multiSelect" in o)
        config.page.row.multiSelect = o.multiSelect ? true : false;

      if ("ariaSelect" in o)
        config.page.row.ariaSelect = o.ariaSelect ? true : false;

      if ("preserve" in o)
        config.page.row.preserveSelect = o.preserve ? true : false;

      if ("callback" in o)
        config.page.row.select.cb =
          typeof o.callback === "function" ? o.callback : null;
    };

    that.unselectAll = function() {
      config.page.row.unselectAll();
    };

    that.selectAll = function() {
      config.page.row.selectAll();
    };

    that.getSelected = function() {
      var ret = [];

      for (var i = 0; i < config.page.row.selected.length; i++)
        ret.push(config.page.row.collection[config.page.row.selected[i]]);
      return ret;
    };

    that.select = function(ids) {
      if (!isArray(ids)) ids = [ids];

      for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i],
          rowObject = config.page.row.collection[rowId];

        if (
          rowObject &&
          rowObject.cells &&
          rowObject.cells[config.colHeaders.map[0].id]
        ) {
          config.page.row.select(
            rowObject.cells[config.colHeaders.map[0].id],
            true
          );
        }
      }
    };

    that.setDelete = function(o) {
      if (!o || typeof o !== "object") return;

      if ("enable" in o)
        config.page.row.deleteRow.enabled = o.enable ? true : false;

      if ("callback" in o)
        config.page.row.deleteRow.callback.cb =
          typeof o.callback === "function" ? o.callback : null;

      if ("runBefore" in o)
        config.page.row.deleteRow.callback.runBefore =
          typeof o.runBefore === "function" ? o.runBefore : null;

      if ("runAfter" in o)
        config.page.row.deleteRow.callback.runAfter =
          typeof o.runAfter === "function" ? o.runAfter : null;
    };

    that.deleteRows = function(ids) {
      if (config.page.row.deleteRow.enabled) {
        if (ids && ids.length) return config.page.row.deleteRow.callback(ids);
        else return config.page.row.deleteRow.callback();
      }

      return false;
    };

    that.deleteAllRows = function() {
      if (config.page.row.deleteRow.enabled) {
        return config.page.row.deleteRow.callback(
          config.page.row.collectionMap
        );
      }
      return false;
    };

    that.setAccessibleText = function(o) {
      if (!o || typeof o !== "object") return;

      if ("toggleButtonRole" in o)
        config.page.row.toggleButtonRole = o.toggleButtonRole;

      if ("toggleButtonState" in o)
        config.page.row.toggleButtonState = o.toggleButtonState;

      if ("disabledText" in o) config.page.row.disabledText = o.disabledText;

      if ("editLinkAction" in o)
        config.page.row.editLinkAction = o.editLinkAction;

      if ("pageRole" in o) config.page.pageRole = o.pageRole;

      if ("editFieldTitle" in o)
        config.page.row.editFieldTitle = o.editFieldTitle;

      if ("dblClickTitle" in o) config.page.row.dblClickTitle = o.dblClickTitle;

      if ("selectState" in o) config.page.row.selectState = o.selectState;
    };

    that.setStaticClasses = function(o) {
      if (!o || typeof o !== "object") return;

      if ("gridClass" in o) config.gridClass = o.gridClass;

      if ("gridReadOnlyClass" in o)
        config.gridReadOnlyClass = o.gridReadOnlyClass;

      if ("cellReadOnlyClass" in o)
        config.cellReadOnlyClass = o.cellReadOnlyClass;

      if ("gridEditableClass" in o)
        config.gridEditableClass = o.gridEditableClass;

      if ("gridSelectableClass" in o)
        config.gridSelectableClass = o.gridSelectableClass;

      if ("gridRowClass" in o) config.gridRowClass = o.gridRowClass;

      if ("gridCellClass" in o) config.gridCellClass = o.gridCellClass;

      if ("gridCellToggleClass" in o)
        config.gridCellToggleClass = o.gridCellToggleClass;

      if ("gridCellTogglePressedClass" in o)
        config.gridCellTogglePressedClass = o.gridCellTogglePressedClass;

      if ("gridCellLinkClass" in o)
        config.gridCellLinkClass = o.gridCellLinkClass;

      if ("gridRowFocusedClass" in o)
        config.gridRowFocusedClass = o.gridRowFocusedClass;

      if ("gridCellFocusedClass" in o)
        config.gridCellFocusedClass = o.gridCellFocusedClass;

      if ("editFieldClass" in o) config.editFieldClass = o.editFieldClass;
    };

    that.currentPage = function() {
      return config.page.current;
    };

    that.totalPages = function() {
      return config.page.total;
    };

    that.totalRows = function() {
      return config.page.row.collectionMap.length;
    };

    that.openPage = function(n, reOpen) {
      if (isNaN(n) || n < 1) return;

      config.page.open(n, reOpen);
    };

    that.prevPage = function() {
      if (!config.dc.loaded) return;

      var cellObject = getCellObject();
      config.page.prev(cellObject, cellObject.rowObject);
    };

    that.nextPage = function() {
      if (!config.dc.loaded) return;

      var cellObject = getCellObject();
      config.page.next(cellObject, cellObject.rowObject);
    };

    that.firstPage = function() {
      if (!config.dc.loaded) return;

      var cellObject = getCellObject();
      config.page.first(cellObject, cellObject.rowObject);
    };

    that.lastPage = function() {
      if (!config.dc.loaded) return;

      var cellObject = getCellObject();
      config.page.last(cellObject, cellObject.rowObject);
    };

    that.setOpenListener = function(f) {
      if (f && typeof f === "function") config.page.on.open = f;
    };

    that.setCloseListener = function(f) {
      if (f && typeof f === "function") config.page.on.close = f;
    };

    that.setAddListener = function(f) {
      if (f && typeof f === "function") config.page.on.add = f;
    };

    that.setRemoveListener = function(f) {
      if (f && typeof f === "function") config.page.on.rem = f;
    };

    that.setMoveListener = function(f) {
      if (f && typeof f === "function") config.page.row.move.cb = f;
    };

    that.getData = function(rowId, cellId, keyName) {
      if (
        !rowId ||
        !cellId ||
        !keyName ||
        !(rowId in config.page.row.collection) ||
        !(cellId in config.page.row.collection[rowId].cells)
      )
        return null;

      return config.page.row.collection[rowId].cells[cellId].data[keyName];
    };

    that.setData = function(rowId, cellId, keyName, data) {
      if (
        !rowId ||
        !cellId ||
        !keyName ||
        !(rowId in config.page.row.collection) ||
        !(cellId in config.page.row.collection[rowId].cells)
      )
        return;

      config.page.row.collection[rowId].cells[cellId].data[keyName] = data;
    };

    that.getValue = function(rowId, cellId) {
      if (
        !rowId ||
        !cellId ||
        !(rowId in config.page.row.collection) ||
        !(cellId in config.page.row.collection[rowId].cells)
      )
        return null;

      return config.page.row.collection[rowId].cells[cellId].value;
    };

    that.setValue = function(rowId, cellId, value) {
      config.page.row.update(rowId, cellId, value, true);
    };

    that.setEditOffset = function(f) {
      if (f && typeof f === "function") config.page.row.cellOffset = f;
    };

    that.open = function(n) {
      config.page.open(n, true);
    };

    that.close = function() {
      config.page.close();
    };

    that.focus = function() {
      config.page.row.move();
    };

    var useDblClick = false;

    that.useDblClick = function(b) {
      useDblClick = b ? true : false;
    };

    return that;
  };

  var formatStr = function(s, q) {
    var str = "";

    if (typeof s === "number") str = s.toString();
    else str = s;

    var i = str.length,
      aRet = [];

    while (i--) {
      var iC = str[i].charCodeAt();

      if (str[i] != "\n" && (iC < 65 || iC > 127 || (iC > 90 && iC < 97)))
        aRet[i] = "&#" + iC + ";";
      else aRet[i] = str[i];
    }

    return aRet.join("");
  };
})($A.internal);
