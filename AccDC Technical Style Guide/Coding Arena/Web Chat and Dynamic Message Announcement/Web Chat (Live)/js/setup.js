$A.bind(window, 'load', function(){

	var key =
					{
					val: 49,
					alt: false,
					ctrl: true,
					shift: false
					}, pressed = {}, changePressed = function(ev){
		pressed.alt = ev.altKey;
		pressed.ctrl = ev.ctrlKey;
		pressed.shift = ev.shiftKey;
	};

	// Configure the Chat Popup AccDC Object

	var chatObjId = $A.setPopup(
					{

					// Set a unique ID for the popup AccDC Object, which can be referenced through $A.reg['id']
					id: 'chat',

					// Set the screen reader accessible boundary text values
					role: 'Chat',
					accStart: 'Start',
					accEnd: 'End',

					// Set a file path to pull the popup content from and reference the container element ID
					source: 'files/popup.html #popup-chat',

// Disable the auto movement of focus to the beginning of the chat content, since we are setting focus to the edit field anyway
					forceFocus: false,
					autoFix: 1,

					// Set the class name for the top level container element
					className: 'popup',

// Set the class name for the screen reader accessible close link
// This must match the class name for any close links or buttons within the popup content, which will cause Close Method Binding to automatically occur when the content is rendered.
					closeClassName: 'popupClose',

					// Set a visually hidden close link for screen reader users to appear at the end of the popup content
					showHiddenClose: true,

					// Remove the visually hidden close link from the tab order
					displayHiddenClose: false,

					// Set the heading level that will be accessible for screen reader users
					ariaLevel: 2,

					// Set the 'body' as the DOM insertion point
					isStatic: 'body',

// Insert the content at the bottom of the body content instead of overwriting what is already there
// This is important, so that the arrival of incomming messages doesn't automatically change the line numbers in the virtual buffer for screen reader users when navigating body content
					append: true,

					// Run config script before the chat popup opens
					runBefore: function(dc){
						// Manually set a triggering element since we didn't include this earlier
						dc.triggerObj = $A.getEl('startChatBtn');
					},

					// Run config script after the chat popup opens
					runAfter: function(dc){
						$A.getEl('your-name').innerHTML = dc.format(dc.name);

						dc.chatDiv = $A.query('#chatPaneInsert', dc.containerDiv)[0];
						dc.msgField = $A.query('textarea', dc.containerDiv)[0];

						// Set bindings for the message field
						$A.bind(dc.msgField,
										{
										keypress: function(ev){
											var k = ev.which || ev.keyCode;

											if (k == 13){
												if (this.value){
													dc.submitNew(this.value);
													this.value = '';
												}
												ev.preventDefault();
											}
										},
										keydown: function(ev){
											changePressed(ev);
										},
										keyup: function(ev){
											var k = ev.which || ev.keyCode;

											if (k == key.val && pressed.ctrl == key.ctrl && pressed.alt == key.alt && pressed.shift == key.shift){
												var r = dc.tmp.tags, c = 0, l = r.length;

												while (c < 5 && l){
													c++;
													l--;
												}

												for (l; l <= r.length; l++){
													if (r[l - 1])
														$A.announce($A.getText(r[l - 1]), true);
												}
												ev.preventDefault();
											}
											changePressed(ev);
										}
										});

						// Set focus to the message field
						dc.msgField.focus();

						$A.setAttr(dc.triggerObj, 'disabled', 'disabled');
						// Now let's make the chat window keyboard accessible
						$A.makeScrollable(dc.chatDiv.parentNode);

						$A.getScript(dc.tmp.url + 'a=g&inc=' + (dc.tmp.inc += 1));
					},

					// Run cleanup script before the chat popup closes
					runBeforeClose: function(dc){
						$A.remAttr(dc.triggerObj, 'disabled');
						dc.chatDiv.innerHTML = '';
						$A.unbind(dc.chatDiv, '.scrollable');
						$A.unbind(dc.msgField, 'keypress');
						$A.unbind(window, '.scrollable');
						clearTimeout(dc.tmp.check);
					},

					// Store a name (can be set via dc.name or $A.reg.myPopup.name also)
					name: '',

					// Set up a tmp namespace for doing stuff
					tmp:
									{
									first: true,
									inc: 0,
									hash: '',
									msgs: {},
									tags: [],
									check: null,
									url: 'http://whatsock.com/modules/accessible_chat_dialog_module/chat/load.js?',
									setTO: function(){
										var dc = $A.reg[chatObjId];
										dc.tmp.check = setTimeout(function(){
											$A.getScript(dc.tmp.url + 'a=g&t=' + dc.tmp.hash + '&inc=' + (dc.tmp.inc += 1));
										}, 2000);
									},
									success: function(){
										var dc = $A.reg[chatObjId];
										dc.msgField.value = '';
										clearTimeout(dc.tmp.check);
										$A.getScript(dc.tmp.url + 'a=g&t=' + dc.tmp.hash + '&inc=' + (dc.tmp.inc += 1));
									},
									load: function(msgs){
										var dc = $A.reg[chatObjId];

										if (msgs.length){
											dc.tmp.tags = [];
											dc.chatDiv.innerHTML = '';

											for (var i = 0; i < msgs.length; i++){
												var msg = msgs[i];
												var d = $A.createEl('div');
												d.innerHTML = '<b>' + dc.format(msg[0]) + ':</b> ' + dc.format(msg[1]);
												dc.tmp.tags.push(d);
												dc.chatDiv.appendChild(d);
												var y = $A.getText(d);

												if (!dc.tmp.msgs[y]){
													dc.tmp.msgs[y] = true;

													if (!dc.tmp.first)
														$A.announce(y, true);
												}
											}
											dc.tmp.tags[dc.tmp.tags.length - 1].scrollIntoView();
										}
										dc.tmp.setTO();

										if (dc.tmp.first){
											dc.tmp.first = false;
											var d = dc.tmp.tags[dc.tmp.tags.length - 1];
											$A.announce($A.getText(d), true);
										}
									}
									},

					// Create a custom function for handling new message submissions
					submitNew: function(text){
						var dc = this;

						if (dc.name)
							$A.getScript(dc.tmp.url + 'a=s&n=' + encodeURIComponent(dc.name) + '&m=' + encodeURIComponent(text));
					},

					// Create a custom function for formatting text using special characters
					format: function(str, q){
						var i = str.length, aRet = [];

						while (i--){
							var iC = str[i].charCodeAt();

							if (str[i] != "\n" && (iC < 65 || iC > 127 || (iC > 90 && iC < 97)))
								aRet[i] = '&#' + iC + ';';

							else
								aRet[i] = str[i];
						}
						return aRet.join('');
					}
					});

	$A.bind('button#startChatBtn', 'click', function(ev){
		ev.preventDefault();
		var dc = $A.reg[chatObjId], name = $A.getEl('y-name').value;

		if (dc.loaded)
			return false;

		if (name.length < 5){
			alert("I'm sorry, your name must be between 5 and 20 characters in length");
			return false;
		}
		dc.name = name;
		dc.open();
	});
});