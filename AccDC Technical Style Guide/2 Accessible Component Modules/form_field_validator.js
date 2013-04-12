/*!
Form Field Validator R1.1
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){

	$A.setFormFields = function(form, fields, submitFn){
		var track = {}, rFields = [];

		for (var field in fields){
			rFields.push($A.getEl(field));
			track[field] = false;
		}

		$A.query(rFields, function(i, o){
			var id = o.id, f = fields[id];

			$A(
							[
							{
							id: id,
							role: (f.overrides && f.overrides.role) || (f.helpText ? 'Help' : 'Error'),
							source: f.helpText || f.errorText,
							triggerObj: o,
							returnFocus: false,
							showHiddenClose: false,
							allowReopen: true,
							className: (f.overrides && f.overrides.className) || 'errorTooltip',
							autoPosition: isNaN(f.overrides && f.overrides.autoPosition) ? 3 : f.overrides.autoPosition,
							offsetLeft: isNaN(f.overrides && f.overrides.offsetLeft) ? 10 : f.overrides.offsetLeft,
							ariaLevel: isNaN(f.overrides && f.overrides.ariaLevel) ? 3 : f.overrides.ariaLevel,
							cssObj:
											{
											position: 'absolute'
											},
							runAfter: function(dc){
								if (!f.togglePassed)
									$A.addClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');
								$A.announce(dc.source, true);
							},
							runAfterClose: function(dc){
								if (!f.togglePassed)
									$A.remClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');
							},
							allowCascade: true
							}
							], f.overrides);

			$A.bind(window, 'resize', function(ev){
				$A.reg[id].setPosition();
			});

			$A.setAttr(o, 'aria-required', 'true');

			$A.bind(o,
							{
							focusin: function(ev){
								if (f.helpText){
									var dc = $A.reg[id];
									track[id] = f.validate.apply(this, [ev, dc]);

									if (!track[id]){
										if (f.togglePassed)
											$A.remClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');
									}

									else if (f.togglePassed)
										$A.addClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');
								}
							},
							focusout: function(ev){
								var dc = $A.reg[id];
								track[id] = f.validate.apply(this, [ev, dc]);

								if (f.helpText){
									dc.close();

									if (f.togglePassed){
										if (!track[id])
											$A.remClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');

										else
											$A.addClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');
									}
								}

								else{
									if (!track[id]){
										if (!f.hideError)
											dc.open();

										else
											dc.runAfter.apply(dc, [dc]);
									}

									else{
										if (!f.hideError)
											dc.close();

										else
											dc.runAfterClose.apply(dc, [dc]);
									}
								}
							}
							});

			if (f.helpText){
				var str = '';
				$A.bind(o, 'keypress keyup', function(ev){
					if (str !== this.value){
						str = this.value;
						var dc = $A.reg[this.id];
						track[this.id] = f.validate.apply(this, [ev, dc]);

						if (f.togglePassed){
							if (!track[this.id])
								$A.remClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');

							else
								$A.addClass(dc.classObj || dc.targetObj || dc.triggerObj, f.toggleClass || 'validateError');
						}
					}
				});
			}
		});

		$A.bind(form, 'submit', function(ev){
			var v = [];

			$A.query(rFields, function(i, o){
				var t = o.id;

				track[t] = fields[t].validate.apply(o, [ev, $A.reg[t]]);

				if (!track[t])
					v.push(t);
			});

			if (v.length){
				var gdc = $A.reg[v[0]];

				if (!fields[v[0]].helpText && !fields[v[0]].hideError)
					gdc.open();
				gdc.triggerObj.focus();
				ev.preventDefault();
			}

			else if (submitFn && typeof submitFn === 'function')
				submitFn.apply(this, [ev, rFields]);
		});
	};
})();