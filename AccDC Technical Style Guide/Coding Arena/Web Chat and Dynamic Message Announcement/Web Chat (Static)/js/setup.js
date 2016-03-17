$A.fn.debug = true;
$A.bind(window, 'load', function(){

	// Configure the Chat Popup AccDC Object

	var chatObjId = $A.setPopup(
					{

					// Set a unique ID for the popup AccDC Object, which can be referenced through $A.reg['id']
					id: 'myPopup',

					// Set the screen reader accessible boundary text values
					role: 'Chat',
					accStart: 'Start',
					accEnd: 'End',

					// Set a file path to pull the popup content from and reference the container element ID
					source: 'files/popup.html #popup-chat',

// Disable the auto movement of focus to the beginning of the chat content, since we are setting focus to the edit field anyway
					forceFocus: false,
					trigger: 'button#startChatBtn',

					// Position the popup over the triggering element
					autoPosition: 9,

					// Move the Popup AccDC Object 80px up when opened
					offsetTop: 0,

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

					// Run config script after the chat popup opens
					runAfter: function(dc){
						dc.chatDiv = $A.query('#chatPaneInsert', dc.containerDiv)[0];
						dc.msgField = $A.query('textarea', dc.containerDiv)[0];

						// Set bindings for the message field
						$A.bind(dc.msgField, 'keypress', function(ev){
							var k = ev.which || ev.keyCode;

							if (k == 13){
								if (this.value){
									dc.submitNew(this.value);
									this.value = '';
								}
								ev.preventDefault();
							}
						});

						// Set focus to the message field
						dc.msgField.focus();

						$A.setAttr(dc.triggerObj, 'disabled', 'disabled');

						dc.converse = 0;
						dc.timerSet = true;
						dc.timer = setTimeout(function(){
							if (!$A.reg[tooltipId].loaded)
								$A.reg[tooltipId].open();
						}, 3000);

						// Now let's make the chat window keyboard accessible
						$A.makeScrollable(dc.chatDiv.parentNode);
					},

					// Run cleanup script before the chat popup closes
					runBeforeClose: function(dc){
						if ($A.reg[tooltipId].loaded)
							$A.reg[tooltipId].close();
						$A.remAttr(dc.triggerObj, 'disabled');
						dc.chatDiv.innerHTML = '';
						$A.unbind(dc.chatDiv, '.scrollable');
						$A.unbind(dc.msgField, 'keypress');
						$A.unbind(window, '.scrollable');
					},

					// Store a name (can be set via dc.name or $A.reg.myPopup.name also)
					name: 'Rincewind',

					// Create a custom function for handling new message submissions
					submitNew: function(text, name){
						var dc = this;
						var div = $A.createEl('div');
						div.innerHTML = '<strong>' + (name || dc.name) + ':</strong> ' + dc.format(text);
						dc.chatDiv.appendChild(div);
						div.scrollIntoView();
						// Announce the latest message to screen reader users and suppress repeat messages via 'true'
						$A.announce(div, true);

						if (!name && !dc.timerSet && dc.converse < 12){
							dc.timerSet = true;
							dc.timer = setTimeout(function(){
								$A.reg[tooltipId].open();
							}, 3000);
						}
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
					},

					// Set up the stock conversation for the demo
					conversation:
									[
									"Hi there, my name is Blurt! How are you today?",
									"That's awesome! I've been thinking about this for a while now, but can't figure it out. Maybe you can help me with the answer. How many roads must a man walk down?",
									"Wow!",
									"Hey, I have an idea, let's play virtual Charades! Are you game?",
									"Sweet! I'll go first! Okay, here I go...",
									"I'm hopping up and down on one leg, my arms are flapping, my hair is sticking out like I have horns, and I'm making a noise like AAAAARGQEEEEEEEE!!!!! Okay okay, what am I?!",
									"Ooooh! You're good at this! Wow! Alright, now it's your turn... Go ahead.",
									"I got it I got it! Okay, you're a tiger! No no! Definitely a donkey! Am I close?",
									"Gosh!",
									"Really? Hmm... Let's try a different one and see if I can get it. Go ahead. I'm all set!",
									"OOOH! I know that one! Your a Chiquita Banana! Pheueu, wow that was a hard one. but I got it! I always come through in the end... Yea!",
									"It's been great talking, but I've got to go... Thanks a million! By by!"
									]
					}),

	// Set up a tooltip object that we can control later
	tooltipId = $A.setTooltip(
					{
					// Set a unique ID for the tooltip AccDC Object, which can also be referenced through $A.reg['uniqueId']
					id: 'typingTooltip',

					// Override default bindings so we can manually invoke the tooltip later
					bind: 'custom',
					role: 'tooltip',

					// Specify that literal content is to be rendered
					mode: 0,

					// Set the tooltip text
					source: 'Blurt is typing a message...',

					// Position the tooltip on the right of the triggering element
					autoPosition: 1,
					offsetTop: -20,

					// Set the class name for the top level container element
					className: 'tooltip',
					timeoutVal: 4000,
					timeout: function(dc){
						dc.close();
					},

						runAfter: function(dc){
// Invoke setPosition using preconfigured values
dc.setPosition('#coding-arena'); },
					// Run script before the tooltip AccDC Object opens
					runBefore: function(dc){
						// Manually set a triggering object node so that positioning can be calculated accurately.
						dc.triggerObj = $A.reg[chatObjId].msgField;
					},
					runAfterClose: function(dc){
						var popup = $A.reg[chatObjId];

						if (popup.loaded){
							popup.timerSet = false;
							var i = popup.converse;

							if (i < 12)
								popup.submitNew(popup.conversation[i], 'Blurt');

							if (i == 2 || i == 4 || i == 8 || i == 10){
								popup.timerSet = true;
								popup.timer = setTimeout(function(){
									$A.reg[tooltipId].open();
								}, 2000);
							}
							popup.converse++;
						}
					}
					});
});