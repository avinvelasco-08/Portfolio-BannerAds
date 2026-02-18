let hogarthMNL = {
    InitializeElements: function(){
        let elems = document.querySelectorAll("body *");
        for(i = 0; i < elems.length; i++){
            if(elems[i].getAttribute("hogarthText") != null){
                document.querySelector("#"+elems[i].id).innerHTML = Content[elems[i].getAttribute("hogarthText")];
            }
            
            if(elems[i].getAttribute("hogarthImage") != null){
                if(Content[elems[i].getAttribute("hogarthImage")] == ""){
                    Content[elems[i].getAttribute("hogarthImage")] = "images/blank.png";
                }else{
                    document.querySelector("#"+elems[i].id).setAttribute("src","images/" +Content[elems[i].getAttribute("hogarthImage")]);
                }
            }else{
                Content[elems[i].getAttribute("hogarthImage")] = "images/blank.png";
            }
        }
    },
    CSSMobileandBrowser: function(){
        let elems = document.querySelectorAll("body *");
        for(i = 0; i < elems.length; i++){
            elems[i].classList.add(obj.browserFix());
        }
    },
    browserFix: function(){
        if(navigator.maxTouchPoints == 0 && OS.indexOf("Mac") > -1){
            if (Browser.indexOf("Chrome") > -1) 
                return "macChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "macFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "macSafari";
        }else if(OS.indexOf("Win") > -1){
            if (Browser.indexOf("Chrome") > -1) 
                return "winChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "winFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "winSafari";
        }else if (OS.indexOf("iPhone") > -1) {
            if (Browser.indexOf("Chrome") > -1) 
                return "macChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "macFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "macSafari";
        }else if(navigator.maxTouchPoints >= 5 && OS.indexOf("Mac") > -1){
            if (Browser.indexOf("Chrome") > -1) 
                return "IpadChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "IpadFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "IpadSafari";
        }else if (OS.indexOf("Linux") > -1 && Browser.indexOf("Android")) {
            if (Browser.indexOf("Chrome") > -1) 
                return "androidPhoneChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "androidPhoneFirefox";
        }else if (OS.indexOf("Linux") > -1 && Browser.indexOf("Android")) {
            if (Browser.indexOf("Chrome") > -1) 
                return "androidTabChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "androidTabFirefox";
        }
    },
    VerizonToolTip: function(Trigger){
        var isOpen = false, //constant do not change
            scrlData = [], //constant do not change
            $ = function(item) { //constant do not change
                return document.querySelector(item);
            }
        
        
        function getByID(elemID){
            return document.getElementById(elemID);
        }
        
        if(Trigger == "On"){
            gsap.set(".ToolTip",{autoAlpha: 0});
            gsap.set(".ToolTipHotspot",{autoAlpha: 1});
        }else if(Trigger == "Off"){
            gsap.set(".ToolTip, .ToolTipHotspot",{autoAlpha: 0})
        }
        
        function addBtnListener(){
            getByID("ToolTipHotspot").addEventListener('click', openTooltip, false);
            getByID("closeBtn").addEventListener('click', closeTooltip, false);
            initializeScrollbar();
        }
        function openTooltip() {
            gsap.to('#ToolTip', 0.5, {autoAlpha: 1,ease: Power2.easeInOut})
        }
        function closeTooltip() {
            gsap.to('#ToolTip', 0.25, {autoAlpha: 0,ease: Power2.easeInOut})
        }

        // Tool Tip
        function initializeScrollbar(){
            // Spacing Vars
            var txtTopSpacing = 5,
            scrlRightSpacing = 11,
            scrlTopSpacing = 12;

            // Text W - H Buffer Vars
            var txtScrollBuff = 5; // Adds a few pixels to text height for scroll distange purposes

            // Close X Buffer Vars
            var closeDims = 6;

            // Scrollbar Vars
            var scrlWidth = 4; 

            var legalText = $('#textScroller');
            var scrlWdgtBKG = $('#scrollTrack');
            var scrlWdgt = $('#scrollKnob');

            var tooltipBox = $('#ToolTip');
            var tooltipInnerBox = $('#scrollerCont');
            var tooltipContent = $('#tooltipCont');
            // Height of the wrapper of the scroll text
            var txtHolderHeight = TextHeight;
            
            // Set scroll widget vars
            var scrlTxtH = legalText.clientHeight + txtScrollBuff;
            var txtScaleDiff = txtHolderHeight / scrlTxtH;

            // ------------------------------------------------------------------------------------------------------
            // Set Scroll Bar ON / OFF Toggle
            if(legalText.clientHeight  > (txtHolderHeight)) {
                // Set Scroll Bar Vars
                var wdgtTop = (txtTopSpacing + closeDims + scrlTopSpacing);
                var wdgtTrackHeight = ((txtHolderHeight - (closeDims + scrlTopSpacing)) - 20);
                var wdgtHeight = (wdgtTrackHeight) * txtScaleDiff;
                var scrollOffset = ((scrlTxtH - txtHolderHeight) / (wdgtTrackHeight - wdgtHeight));

                // Set scroll widget props
                gsap.set(scrlWdgtBKG, {right: scrlRightSpacing, top: wdgtTop, width: scrlWidth, height: (wdgtTrackHeight + 8), display:"block", backgroundColor:"#F6F6F6"}, 0);

                gsap.set(scrlWdgt, {right: scrlRightSpacing, top: wdgtTop, width: scrlWidth, height: (wdgtHeight), display:"block", backgroundColor:"#DAD8D8", cursor:"pointer"}, 0);


                gsap.set(legalText, {className:("set_scroll")}, 0);
                document.getElementById("tooltipCont").style.height = (txtHolderHeight)+"px";

                // Activate Mouse Wheel Scroll
                scrlData = [scrlTxtH, txtHolderHeight, wdgtTop, wdgtTrackHeight];
                legalText.addEventListener('scroll', resetScrollPos);

                // Activate Scollbar Drag
                dragElement(document.getElementById("scrollKnob"), wdgtHeight, wdgtTop, wdgtTrackHeight, scrollOffset);
            }
            // Set legal text height ( set after above variables are calcualted )
            gsap.set(legalText, {height:txtHolderHeight - 25}, 0);
            gsap.set(tooltipBox, {height: txtHolderHeight}, 0);
            document.getElementById("ToolTip").style.width = TextWidth + "px";
            gsap.set(tooltipInnerBox, {width: (TextWidth - 40)}, 0);
        }

        // Make the DIV element draggable:
        function dragElement(elmnt, elemHeight, trackTop, trackHeight, scrollOffset) {

        var legalText = $('#textScroller');
        var pos1 = 0;
        var pos2 = 0;

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();

            // get the mouse cursor position at startup:
            pos2 = e.clientY;

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            legalText.removeEventListener('scroll', resetScrollPos);

            // calculate the new cursor position:
            pos1 = pos2 - e.clientY;
            pos2 = e.clientY;

            elmnt.style.top = (elmnt.offsetTop - pos1) + "px";

            // Stop at top of scroll channel
            if(elmnt.offsetTop < trackTop) {
                elmnt.style.top = trackTop + "px";
            }

            // Stop at bottom of scroll channel
            if(elmnt.offsetTop > (trackTop + ((trackHeight - elemHeight) + 8))) {
                elmnt.style.top = (trackTop + ((trackHeight - elemHeight) + 8)) + "px";
            }

            legalText.scrollTop = (((elmnt.offsetTop - trackTop) * scrollOffset));
        }

        function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
                legalText.addEventListener('scroll', resetScrollPos);
            }
        }

        function resetScrollPos () {
            var scrlTxtH = scrlData[0];
            var txtHolderHeight = scrlData[1];
            var wdgtTop = scrlData[2];
            var wdgtTrackHeight = scrlData[3];
            var legalText = $('#textScroller');

            var scrlPerc = legalText.scrollTop / ((scrlTxtH - txtHolderHeight));
            scrollKnob.style.top = (wdgtTop + ((wdgtTrackHeight - scrollKnob.clientHeight) * scrlPerc)) + "px";
        }
        addBtnListener();
    },
    AutoTooltip: function(Position, ToolTipLeft, ToolTipTop){
        HotspotLeft = document.querySelector("u").getBoundingClientRect().left;
        HotspotTop = document.querySelector("u").getBoundingClientRect().top;
        HotspotWidth = document.querySelector("u").offsetWidth;
        HotspotHeight = document.querySelector("u").offsetHeight;
        
        TooltipWidth = document.querySelector("#ToolTip").offsetWidth;
        TooltipHeight = document.querySelector("#ToolTip").offsetHeight;
        
        MidCutHotspot = HotspotWidth / 2;
        MidCutToolTip = TooltipWidth / 2;
        
        CenterCutHotspot = HotspotHeight / 2;
        CenterCutToolTip = TooltipHeight / 2;
        
        switch(Position){
            case "Top":
                ToolTip.style.left = (((HotspotLeft - MidCutToolTip) + MidCutHotspot) - 0) + 4 + "px";
                ToolTip.style.top = ((HotspotTop - TooltipHeight) - 5) + "px";

                ToolTipArrow.style.left =  (((MidCutToolTip) - ToolTipLeft) - 4) + "px";
                ToolTipArrow.style.top =  (TooltipHeight - 1) + "px";
                
                ToolTipArrow.style.transform = "rotate(0deg)";
                
                ToolTip.style.marginLeft = ToolTipLeft + "px";
                ToolTip.style.marginTop = ToolTipTop + "px";
                
                break;
            case "Left":
                ToolTip.style.left = ((HotspotLeft - TooltipWidth) - 10) + "px";
                ToolTip.style.top = ((HotspotTop - CenterCutToolTip) + CenterCutHotspot) + "px";

                ToolTipArrow.style.left =  (TooltipWidth - 3) + "px";
                ToolTipArrow.style.top =  ((CenterCutToolTip - 2) - ToolTipTop) + "px";
                ToolTipArrow.style.transform = "rotate(-90deg)";
                
                ToolTip.style.marginLeft = ToolTipLeft + "px";
                ToolTip.style.marginTop = ToolTipTop + "px";

                break;
            case "Right":
                ToolTip.style.left = ((HotspotLeft + HotspotWidth) + 5) + "px";
                ToolTip.style.top = ((HotspotTop - CenterCutToolTip) + CenterCutHotspot) + "px";

                ToolTipArrow.style.left =  (0 - 6) + "px";
                ToolTipArrow.style.top =  ((CenterCutToolTip - 2) - ToolTipTop) + "px";
                ToolTipArrow.style.transform = "rotate(-270deg)";
                
                ToolTip.style.marginLeft = ToolTipLeft + "px";
                ToolTip.style.marginTop = ToolTipTop + "px";

                break;
            case "Bottom":
                ToolTip.style.left = (((HotspotLeft - MidCutToolTip) + MidCutHotspot) - 4) + "px";
                ToolTip.style.top = ((HotspotTop + HotspotHeight) + 4) + "px";

                ToolTipArrow.style.left =  (MidCutToolTip - ToolTipLeft) + "px";
                ToolTipArrow.style.top =  (0 - 4) + "px";
                ToolTipArrow.style.transform = "rotate(-180deg)";
                
                
                ToolTip.style.marginLeft = ToolTipLeft + "px";
                ToolTip.style.marginTop = ToolTipTop + "px";

                break;
            case "CustomCSS":
                gsap.set("#ToolTip",{x: ToolTipLeft+"px", y: ToolTipTop+"px"})
                
                ToolTipArrow.style.left =  ((MidCutToolTip) - ToolTipLeft) + "px";
                ToolTipArrow.style.top =  (TooltipHeight - 4) + "px";
                ToolTipArrow.style.transform = "rotate(0deg)";
                
                break;
            default:
                break;
        }
    
        ToolTipHotspot.style.top = HotspotTop + "px";
        ToolTipHotspot.style.left = HotspotLeft + "px";
        ToolTipHotspot.style.width = HotspotWidth + "px";
        ToolTipHotspot.style.height = HotspotHeight + "px";
    },
    SplitText: function(elem){
        elem.forEach((element, index) => {
            var splitText = new SplitText(element, {type:"words,chars,lines"});
            chars[index] = splitText.lines;
        })
    },
    SplitParentMask: function(elemParent){
        elemParent.forEach((element, index) => {
            var splitText = new SplitText(element, {type:"lines", linesClass:parentClass[index]});
            charParent[index] = splitText.lines;
        })
    },
    SplitChildMask: function(elemChild){
        elemChild.forEach((element, index) => {
            var splitText = new SplitText(element, {type:"lines"});
            charChild[index] = splitText.lines;
        })  
    },
    
    MaskText: function(elem,frame){
        var splitText = new SplitText(elem, {type:"lines", linesClass:"Line Line"+ frame});
        var splitText = new SplitText(elem, {type:"lines", linesClass:"Flex Middle Center Cover Cover"+ frame});
        gsap.set(".Cover"+frame,{overflow:"hidden"});
    },
    LineText: function(elem,frame){
        var splitText = new SplitText(elem, {type:"lines", linesClass:"Line"+ frame});
    },
    WordText: function(elem,frame){
        var splitText = new SplitText(elem, {type:"lines", linesClass:"Line"+ frame});
        var splitText = new SplitText(elem, {type:"words", wordClass:"Word"+ frame});
    },
    CharText: function(elem,frame){
        var splitText = new SplitText(elem, {type:"lines", linesClass:"Line"+ frame});
        var splitText = new SplitText(elem, {type:"chars", charsClass:"Char"+ frame});
    },
    
}

const obj = hogarthMNL;
let Browser = navigator.userAgent;
let OS = navigator.platform;
var HotspotDimension, HotspotWidth, HotspotHeight, TooltipWidth, TooltipHeight, MidCutHotspot, CenterCutHotspot, MidCutToolTip, CenterCutToolTip;
var chars = [];
var charParent = [], charChild = [], parentClass= [];
var TextWidth, TextHeight;