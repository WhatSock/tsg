XML syntax for a grouped carousel with one slide per group, and no cycling:

Important: All attributes must remain within the XML markup.
Attributes that are not required may be set to null. E.G. attributeName=""

<?xml version="1.0" encoding="UTF-8" ?>
<carousel
role="Wizard" accStart="Start" accEnd="End"
height="285" width="525"
className="carouselCls"
prevTitle="Previous" nextTitle="Next" slideName="Step" groupName="Group"
showGroup="yes" groupPosTop="yes"
btnPText="&#8592;" btnNText="&#8594;" btnPGText="" btnNGText=""
isGrouped="yes"
btnPAccesskey="1" btnNAccesskey="2" btnPGAccesskey="" btnNGAccesskey=""
direction="lr" cycle="no" timer="0" animDelay="2000" forward="yes"
hiddenMsg="All fields are required" >
<group name="Step 1 of 3: Group Name" >
<slide announce="All fields are required" ><![CDATA[

HTML content to render goes here

]]></slide>
</group>
<group name="Step 2 of 3: Group Name" >
<slide announce="All fields are required" ><![CDATA[

HTML content to render goes here

]]></slide>
</group>
<group name="Step 3 of 3: Group Name" >
<slide announce="All fields are required" ><![CDATA[

HTML content to render goes here

]]></slide>
</group>
</carousel>

Important: If the group tag 'name' attribute value matches the slide tag 'announce' attribute value, then set announce to "" to prevent redundancy.

Header attribute definitions:

role : Hidden text role for screen reader users
accStart : Hidden text start keyword for screen reader users
accEnd : Hidden text end keyword for screen reader users

height : Total height of control (must be greater than the CSS height of the left/center/right content panels)
width : Total width of control (must be greater than the combined CSS height of the left+center+right content panels)

className : The class name for styling the top level AccDC Object container

prevTitle : Title and screen reader text for the previous button (Must be unique)
nextTitle : Title and screen reader text for the next button (Must be unique)
slideName : Shared name for a slide, appended to prevTitle and nextTitle for Next Slide and Previous Slide button labeling

isGrouped : Must be 'yes' or 'no': Must match the syntax of the XML markup (whether or not the group tag is present)
groupName : Shared name for a group, appended to prevTitle and nextTitle for Next Group and Previous Group button labeling

showGroup : If 'yes', group names will be displayed above or below the carousel (depending on the value of groupPosTop)
groupPosTop : If 'yes', group names are displayed above the carousel, if not, then they are displayed below (only if showGroup='yes')

btnPText : Visible textual label for the Previous Slide button; uses innerHTML to insert
btnNText : Visible textual label for the Next Slide button; uses innerHTML to insert
btnPGText : Visible textual label for the Previous Group button; uses innerHTML to insert
btnNGText : Visible textual label for the Next Group button; uses innerHTML to insert

btnPAccesskey : AccessKey for the Previous Slide button (for screen reader users)
btnNAccesskey : AccessKey for the Next Slide button (for screen reader users)
btnPGAccesskey : AccessKey for the Previous Group button (for screen reader users)
btnNGAccesskey : AccessKey for the Next Group button (for screen reader users)

direction : Must be either 'lr' (left to right), or 'tb' (top to bottom)
cycle : Must be either 'yes' or 'no' to set the behavior of infinite looping
timer : Set to '0' to disable auto rotation, or set a positive integer for N milliseconds
animDelay : Slide animation length in N milliseconds; set to '0' for instant rendering
forward : Set to 'yes' or 'no' to configure auto rotation to move backwards or forwards (relative to direction)

hiddenMsg : Hidden text message for screen reader users to convey supplementary information
