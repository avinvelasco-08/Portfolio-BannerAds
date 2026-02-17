//hoxton.timeline = Creative.tl;
gsap.defaults({
    overwrite: "auto",
    duration: 0,
    ease: "none"
});

// as we are using className to target elements in certain sizes in the TL, we want to suppress warnings:
gsap.config({
    nullTargetWarn: false
});

//tooltip vars
var scrollContainer = document.querySelector('.tooltip-container');
var scrollContent = document.querySelector('.disclaimer');
var customScrollbar = document.querySelector('.scrollbar');
var scrollThumb = document.querySelector('.scroll-thumb');

// looping config vars
var _currentLoop = 0;
var _totalLoops = 0;
var _endFrameDelay = 4;
var _useReplayBtn = true;   

// content
var container = getById("main");
var loadingContent = getById("loading_content");

// Tooltip opacity
var isVisible = false;

// Tooltip Hotspot Checker
var hotspotCreated = false;

// exit and replay
//var btn_replay   = getById("btn_replay");

// split array
var splittedLines = [],
    splittedChars = [],
    splittedWords = [];

//Specs Variables
//Specs Variables
var frameOption,
    bgColor,
    logoToggle,
    ctaToggle,
    h1SubHead,
    h2SubHead,
    h3SubHead,
    h4SubHead,
    h5SubHead,
    h6SubHead,
    h7SubHead,
    h8SubHead,
    h4HollowTxt;

//Boolean to check if the frame is the first frame.
var isFirstFrame = [false,false,false,false,false,false];

// exit
var exitBtn = getById("bannerExit");

// Create and provide timeline to Hoxton
var Creative = {
    tl: gsap.timeline({
        defaults: {
            ease: "none"
        }
    }),

    setExitURL: function(strURL) {
        _exitURL = strURL;
    },

    onExit: function(e) {
        hoxton.exit("Exit", _dynamicData.exitURL);
    },

    onBannerStart: function() {
        console.log("Creative.onBannerStart()");
        if (hotspotCreated) {
            gsap.set("#hotspot", {
                autoAlpha: 0
            }, "reset")
        }
    },

    onBannerComplete: function() {
        console.log("Creative.onBannerComplete()");
    },

    jumpToEndFrame: function() {
        Creative.tl.pause();
        Creative.tl.seek("end", false);
    },

    checkIsBackup: function() {
        return (window.location.href.indexOf('hoxtonBackup') >= 0) ? true : false;
    },

    startAd: function() {
        Creative.createButtons();
        Creative.displayBanner();
        Creative.setUpTimeline();
        var adSizeMeta = document.querySelector('meta[name="ad.size"]');
        if (adSizeMeta) {
            var [width, height] = adSizeMeta.content.split(",").map(size => size.replace(/(width=|height=)/, '').trim());
            getById("main").style.setProperty('--ad-width', `${width}px`);
            getById("main").style.setProperty('--ad-height', `${height}px`);
        }

        Creative.init();

        Creative.checkIsBackup() ? Creative.jumpToEndFrame() : null;
    },

    createButtons: function() {
        // exitBtn.addEventListener("click", Creative.onExit, false);
    },

    setUpTimeline: function() {
        Creative.tl.repeat(_totalLoops);
        Creative.tl.repeatDelay(_endFrameDelay);
        Creative.tl.eventCallback("onStart", Creative.onBannerStart);
        Creative.tl.eventCallback("onComplete", Creative.onBannerComplete);
    },

    displayBanner: function() {
        loadingContent.style.display = "none";
        container.style.display = "block";
        container.style.opacity = "0";
    },

    checkTotalDuration: function(targetBlock) {
        console.log(Creative.tl.totalDuration(targetBlock));
    },

    splitLines: function(copyId) {
        copyId.forEach((ids, index) => {
            const targetCopy = getById(ids);
            if (targetCopy && targetCopy.innerHTML.length > 0) {
                var splitText = new SplitText(targetCopy, {type:"lines", linesClass:"splitted-container"});
                splittedLines[index] = splitText.lines;
            }
        })
    },

    splitChars: function(copyId) {
        copyId.forEach((ids, index) => {
            const targetCopy = getById(ids);
            if (targetCopy && targetCopy.innerHTML.length > 0) {
                var splitText = new SplitText(targetCopy, {type:"chars", linesClass:"splitted-container"});
                splittedChars[index] = splitText.chars;
            }
        })
    },
    
    splitWords: function(copyId) {
        copyId.forEach((ids, index) => {
            const targetCopy = getById(ids);
            if (targetCopy && targetCopy.innerHTML.length > 0) {
                var splitText = new SplitText(targetCopy, {type:"words", linesClass:"splitted-container"});
                splittedWords[index] = splitText.words;
            }
        })
    },

    createHotspot: function() {
        const targetTag = getById("main")
        const uTag = getById('underlinedText');

        // Get the position, width, and height of the <u> tag using getBoundingClientRect
        const rect = uTag.getBoundingClientRect();

        // Create the hotspot div
        const hotspot = document.createElement('div');
        hotspot.classList.add('hotspot');
        hotspot.id = "hotspot";

        // Set the size and position of the hotspot based on the <u> tag
        hotspot.style.width = `${rect.width}px`;
        hotspot.style.height = `${rect.height}px`;
        hotspot.style.left = `${rect.left + window.scrollX}px`; // Include scroll offsets
        hotspot.style.top = `${rect.top + window.scrollY}px`; // Include scroll offsets

        // Append the hotspot to the body
        targetTag.appendChild(hotspot);
    },

    positionArrow: function() {
        const uTag = getById('underlinedText');
        const arrow = getById('arrowTipContainer');
        const mainContainer = getById('main');

        // Get the bounding rectangle of the <u> tag and the main container
        const uRect = uTag.getBoundingClientRect();
        const containerRect = mainContainer.getBoundingClientRect();

        // Calculate the top center position of the <u> tag
        const uCenterX = uRect.left + (uRect.width / 2);
        const uTop = uRect.top;

        // Set the initial position for the arrow (centered above the <u> tag)
        const arrowHeight = arrow.offsetHeight;
        const arrowWidth = arrow.offsetWidth;

        // Calculate the left position for the arrow to center it
        let arrowLeft = uCenterX - (arrowWidth / 2) - 7;
        let arrowTop = uTop - arrowHeight - 2; // 10px margin above the <u> tag

        // Check if the arrow goes outside the main container's boundaries
        const containerLeft = containerRect.left;
        const containerRight = containerRect.right;

        // Ensure the arrow stays within the container
        if (arrowLeft < containerLeft) {
            arrowLeft = containerLeft; // Align to the left edge of the container
        } else if (arrowLeft + arrowWidth > containerRight) {
            arrowLeft = containerRight - arrowWidth; // Align to the right edge of the container
        }

        // Apply the calculated positions to the arrow
        arrow.style.left = `${arrowLeft + window.scrollX}px`;
        arrow.style.top = `${arrowTop + window.scrollY}px`;
    },

    positionTextBox: function(edgeGap) {
        const arrow = getById('arrowTipContainer');
        const tooltipContainer = getById('tooltipContainer');
        const mainContainer = getById('main');

        // Get the bounding rectangle of the arrow and the main container
        const arrowRect = arrow.getBoundingClientRect();
        const containerRect = mainContainer.getBoundingClientRect();

        // Calculate the top center position of the arrow
        const arrowCenterX = arrowRect.left + (arrowRect.width / 2);
        const arrowTop = arrowRect.top;

        // Set the initial position for the tooltipContainer (centered above the arrow)
        const tooltipContainerHeight = tooltipContainer.offsetHeight;
        const tooltipContainerWidth = tooltipContainer.offsetWidth;
        const gap = edgeGap;

        // Calculate the left position for the tooltipContainer to center it
        let tooltipContainerLeft = arrowCenterX - (tooltipContainerWidth / 2);
        let tooltipContainerTop = arrowTop - tooltipContainerHeight + 1;

        // Check if the tooltipContainer goes outside the main container's boundaries
        const containerLeft = containerRect.left + Number(gap);
        const containerRight = containerRect.right - Number(gap);

        // Ensure the tooltipContainer stays within the container
        if (tooltipContainerLeft < containerLeft) {
            tooltipContainerLeft = containerLeft; // Align to the left edge of the container
        } else if (tooltipContainerLeft + tooltipContainerWidth > containerRight) {
            tooltipContainerLeft = containerRight - tooltipContainerWidth; // Align to the right edge of the container
        }

        // Apply the calculated positions to the tooltipContainer
        tooltipContainer.style.left = `${tooltipContainerLeft + window.scrollX}px`;
        tooltipContainer.style.top = `${tooltipContainerTop + window.scrollY}px`;
    },

    // Adjust the thumb size dynamically based on the content height
    adjustThumbSize: function() {
        const contentHeight = scrollContent.scrollHeight;
        const containerHeight = scrollContainer.clientHeight;

        const maxHeight = customScrollbar.offsetHeight * 0.9;
        const thumbHeight = Math.max(containerHeight * (containerHeight / contentHeight), 10);
        scrollThumb.style.maxHeight = maxHeight + 'px';
        scrollThumb.style.height = `${thumbHeight}px`;
    },

    updateThumbPosition: function() {
        const contentHeight = scrollContent.scrollHeight - scrollContent.clientHeight;
        const scrollRatio = scrollContent.scrollTop / contentHeight;
        const thumbMaxTop = customScrollbar.clientHeight - scrollThumb.clientHeight;
        scrollThumb.style.top = `${scrollRatio * thumbMaxTop}px`;
    },

    // Sync the content scroll when dragging the thumb
    onThumbDrag: function(event) {
        const initialY = event.clientY;
        const initialThumbTop = scrollThumb.offsetTop;

        const onDragMove = (e) => {
            const deltaY = e.clientY - initialY;
            const newThumbTop = Math.min(Math.max(initialThumbTop + deltaY, 0), customScrollbar.clientHeight - scrollThumb.clientHeight);
            const scrollRatio = newThumbTop / (customScrollbar.clientHeight - scrollThumb.clientHeight);
            scrollContent.scrollTop = scrollRatio * (scrollContent.scrollHeight - scrollContent.clientHeight);
        };

        const onDragEnd = () => {
            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('mouseup', onDragEnd);
        };

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
    },

    addTooltip: function() {
        const scrollContent = getById("disclaimer");
        const scrollThumb = getById("scrollThumb");
        const closeBtn = getById("closeBtn");

        Creative.createHotspot();
        Creative.positionArrow();
        Creative.positionTextBox(tooltipEdgeGap);

        console.log(tooltipEdgeGap);

        const hotspot = getById("hotspot");

        // Listen to Open Tool tip
        hotspot.addEventListener("click", Creative.tooltipShowHide, false);
        closeBtn.addEventListener("click", Creative.tooltipShowHide, false);

        // Listen to mouse scroll to update the thumb position
        scrollContent.addEventListener('scroll', Creative.updateThumbPosition);

        // Listen to thumb drag
        scrollThumb.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent text selection while dragging
            Creative.onThumbDrag(e);
        });

        // Initialize the custom scrollbar
        Creative.adjustThumbSize();
    },

    tooltipShowHide: function() {
        if (isVisible) {
            gsap.set("#arrowTipContainer,#tooltipContainer", {
                autoAlpha: 0
            }) // Hide the Tooltip
        } else {
            gsap.set("#arrowTipContainer,#tooltipContainer", {
                autoAlpha: 1
            }) // Show the Tooltip
        }
        isVisible = !isVisible; // Toggle the state
    },

    
    imagePan: function(imageId,frame) {
        gsap.to("#"+imageId, 2.5,{scale: 1.05},frame)
    },  

    findFirstNonOffFrame: function(arr) {
        let foundFirstNonOff = false;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i] !== "off" && !foundFirstNonOff) {
            isFirstFrame[i] = true; // Set to true if the frame is the first frame
            foundFirstNonOff = true;
            break; 
          }
        }
    },

    init: function() {
        Creative.tl.addLabel("reset", 0)
        
        if(h1SubHead === ""){
            Creative.tl.set("#h1SubHead", {display:"none"})
        }
        if(h2SubHead === ""){
            Creative.tl.set("#h2SubHead", {display:"none"})
        }
        if(h3SubHead === ""){
            Creative.tl.set("#h3SubHead", {display:"none"})
        }
        if(h4SubHead === ""){
            Creative.tl.set("#h4SubHead", {display:"none"})
        }
        if(h5SubHead === ""){
            Creative.tl.set("#h5SubHead", {display:"none"})
        }
        if(h6SubHead === ""){
            Creative.tl.set("#h6SubHead", {display:"none"})
        }
        if(h7SubHead === ""){
            Creative.tl.set("#h7SubHead", {display:"none"})
        }
        if(h8SubHead === ""){
            Creative.tl.set("#h8SubHead", {display:"none"})
        }
        Creative.splitChars(["h2Heading"]);
        Creative.splitLines(["h1Heading","h4Heading","h1HollowTxt","h4HollowTxt","h6HollowTxt","h6Heading","h8Heading","h9Heading"]);
//        alert(bgColor[0])
        
        
        // reset elements to initial states
        Creative.tl.call(Creative.hideContainer, ["vMask"], "reset")
        .call(Creative.hideContainer, ["legalFrame"], "reset")
        .call(Creative.hideContainer, ["legalContainer"], "reset")
        .call(Creative.setLogoProps, ["default"], "reset")
        .to("#main", {autoAlpha:1}, "reset")
        .set([splittedLines[0], splittedLines[1], splittedWords[0], splittedLines[2]], {alpha:0})

        //-------- F1 IN -------------------------------
        .addLabel("frame1",)
        .set("#businessLogo", { display:"flex", xPercent:0, autoAlpha:1 }, "frame1")
        .set("#ctaArrow", {autoAlpha:1}, "frame1")
        .set("#h1Heading .splitted-container", {alpha:1}, "frame1")
        .set("#main", {backgroundColor: bgColor[0]}, "frame1")

        .to("#heading1", {autoAlpha:1}, "frame1")
        .to(["#h1HollowTxt .splitted-container"], 0.001, {alpha:1}, "frame1")
        .from("#h1HollowTxt", 0.8, {y: 25, ease: "expo.out"}, "frame1+=0.1")
        .from("#h1Heading .splitted-container", 0.8, {y: 60, stagger: 0.03, ease: "expo.out"}, "frame1+=0.1")
        .from("#h1SubHead", 0.8, {opacity:0, y: 20, stagger: 0.03, ease: "expo.out"}, "frame1+=0.3")

        if(logoToggle[0] === "on"){
            Creative.tl.to("#businessLogo", 0.01,{opacity:1, ease:"power1.inOut"},"frame1")
            .to("#LogoMask1A", 0.5, {right:"0px", ease:"power1.inOut"}, "frame1")
            .to("#LogoMask1A", 0.01, {opacity:1, ease:"power1.inOut"}, "frame1+=0.25")
            .to("#BottomLogoA", 0.3,{height:"16px", ease:"power1.inOut"},"frame1+=0.5")
        }

        // Pendulum animation
        Creative.tl.from("#h1Pendulum", 0.45, {x: 50, ease: "power3.out"}, "frame1+=0.5")
//            .from("#h1PenCirc", 0.5, {scale:0.6, ease: "sine.out"}, "frame1+=0.85")

            // -------- F1 OUT --------
            .addLabel("outFrame1")
            .to("#heading1", 1.2, {x: -150, ease:"expo.inOut"}, "outFrame1+=0.4")
        
            if(logoToggle[0] === "on"){
                Creative.tl.to("#businessLogo", 1.2,{x: -150, ease:"expo.inOut"}, "outFrame1+=0.4")
            }

        //-------- F2 IN -------------------------------
        Creative.tl.addLabel("frame2","-=1.2")
        .set("#businessLogo", { display:"flex", x:0, autoAlpha:0 }, "frame2+=1.2")
        .set("#LogoMask1A", { right:"-84px" }, "frame2+=1.2")
        .set("#BottomLogoA", { height:"0px" }, "frame2+=1.2")
        .to("#heading2", {autoAlpha:1}, "frame2+=0.58")
        .to("#heading1", {autoAlpha:0}, "frame2+=0.58")
        .set("#main", {backgroundColor: bgColor[1]}, "frame2+=0.58")
        .from("#heading2", 1.2, {x: 150, ease:"expo.inOut"}, "frame2")

            // -------- F2 OUT --------
            // .addLabel("outFrame2", 3)
            // .to("#h2Heading .splitted-container", 0.5, {yPercent: -50, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to("#h2Heading .splitted-container", 0.001, {alpha:0, stagger: 0.1, delay:0.1})} }, "outFrame2")

        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=0.6")
        .to("#heading2", 1.2, {scale:0.56, y:15, z:0.001, ease:"expo.in"}, "frame3")
        .from("#heading3", 2, {scale:1.56, z:0.001, ease:"sine.out"}, "frame3+=0.4")
        .from("#h2BigCirc", 0.01, {autoAlpha:0}, "frame3+=0.3")
        .to("#heading3", {autoAlpha:1}, "frame3+=1.1")
        .to("#heading2", {autoAlpha:0}, "frame3+=1.1")
        .to("#main", {backgroundColor: bgColor[2]}, "frame3+=1.1")

            // -------- F3 OUT --------
            .addLabel("outFrame3","-=0.65")
            .to("#h3Heading", 0.8, {y:-400, ease:"power4.in"}, "outFrame3+=0.05")
            .to("#h3SubHead", 0.8, {y:-400, ease:"power4.in"}, "outFrame3+=0.05")
            .to(".f3Circ", 0.4, {scale:2.7, z:0.001, ease:"power1.out"}, "outFrame3+=0.66")

        //-------- F4 IN -------------------------------
        if(h4HollowTxt === ""){
            Creative.tl.addLabel("frame4","-=0.39")
            .to("#heading4", {autoAlpha:1}, "frame4")
            .set("#main", {backgroundColor: bgColor[3]}, "frame4")
        }else{
            Creative.tl.addLabel("frame4","-=0.2")
            .to("#heading4", {autoAlpha:1}, "frame4+=0.05")
            .set("#main", {backgroundColor: bgColor[3]}, "frame4-=0.05")
        }
        Creative.tl.to(["#h4HollowTxt .splitted-container"], 0.001, {alpha:1}, "frame4")
        .from("#h4HollowTxt", 0.8, {y: 25, ease: "expo.out"}, "frame4+=0.1")
        .from("#h4Heading .splitted-container", 0.8, {y:200, stagger: 0.1, ease: "expo.out"}, "frame4")
        .to("#h4Heading .splitted-container", 0.001, {autoAlpha: 1, stagger: 0.1}, "frame4+=0.2")
        .from("#h4SubHead", 0.5, {autoAlpha: 0, ease: "power1.out"}, "frame4+=0.5")
        .to("#heading3", {autoAlpha:0}, "frame4+=1.5")

        .from("#h4PenCircL, #h4PenLineL", 0.45, {x: -70, ease: "power3.out"}, "frame4+=0.45")
        .from("#h4PenCircR, #h4PenLineR", 0.45, {x: 70, ease: "power3.out"}, "frame4+=0.45")

            // -------- F4 OUT --------
            .addLabel("outFrame4", "-=0.21")
            .to("#heading4 ", 0.5, {x:-55, ease:"power4.in"}, "outFrame4")

            
        //-------- F5 IN -------------------------------
        .addLabel("frame5")
        .to("#heading4", {autoAlpha:0}, "frame5")
        .to("#heading5", {autoAlpha:1}, "frame5")
        .set("#main", {backgroundColor: bgColor[4]}, "frame5")
        .from("#heading5 ", 0.5, {x:65, ease:"power2.out"}, "frame5")

            // -------- F5 OUT --------
            .addLabel("outFrame5")
            .to("#heading5", 0.5, {x:-55, ease:"power4.in"}, "outFrame5+=0.3")

        //-------- F6 IN -------------------------------
        .addLabel("frame6")
        .to("#heading5", {autoAlpha:0}, "frame6")
        .to("#heading6", {autoAlpha:1}, "frame6")
        .set("#main", {backgroundColor: bgColor[5]}, "frame6")
        .set("#h6HollowTxt .splitted-container", {x:30}, "frame6")
        .from("#heading6", 0.5, {x:65, ease:"power2.out"}, "frame6")
        .from(["#h6HollowTxt .splitted-container"], 0.01,{alpha:0, ease:"power2.out"}, "frame6")
        .to(["#h6HollowTxt .splitted-container"], 2.6,{x:-20, ease:"power1.inOut"}, "frame6+=0.2")

            // -------- F6 OUT --------
            .addLabel("outFrame6","-=2")
            .to("#heading6", 0.8, {x:-35, ease:"power4.in"}, "outFrame6")

            //-------- F7 IN -------------------------------
        .addLabel("frame7","-=1.2")
        .to("#heading6", {autoAlpha:0}, "frame7")
        .to("#heading7", {autoAlpha:1}, "frame7")
        .set("#main", {backgroundColor: bgColor[6]}, "frame7")
        .from("#heading7 ", 0.5, {x:65, ease:"power2.out"}, "frame7")

        // -------- F7 OUT --------
            .addLabel("outFrame7","-=0.7")
            .to("#heading7", 1, {scale:0.56, y:15, z:0.001, ease:"expo.in"}, "outFrame7")

        //-------- F8 IN -------------------------------
        .addLabel("frame8", "-=0.1")
        .from("#heading8", 1.8, {scale:1.56, z:0.001, ease:"sine.out"}, "frame8-=0.6")
        .to("#heading8", {autoAlpha:1}, "frame8")
        .to("#heading7", {autoAlpha:0}, "frame8")
        .to("#main", {backgroundColor: bgColor[7]}, "frame8")

            // -------- F8 OUT --------
            .addLabel("outFrame8","-=0.2")
            .to("#h8Heading", 0.8, {y:-330, ease:"power4.in"}, "outFrame8")
            .to(".f8Circ", 0.4, {scale:2, z:0.001, ease:"power1.out"}, "outFrame8+=0.6")

        //-------- F9 IN -------------------------------
        .addLabel("frame9","-=0.4")
        .to("#heading9", {autoAlpha:1}, "frame9")
        .to("#heading8", {autoAlpha:0}, "frame9")
        .from("#h9Heading .splitted-container", 0.8, {y:200, stagger: 0.1, ease: "expo.out"}, "frame9-=0.2")
        .to("#h9Heading .splitted-container", 0.001, {autoAlpha: 1, stagger: 0.1}, "frame9")
        .from("#h9SubHead", 0.5, {autoAlpha: 0, ease: "power1.out"}, "frame9+=0.5")

        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"frame9+=0.7")
        .to("#LogoMask1A", 0.5, {right:"0px", ease:"power1.inOut"}, "frame9+=0.7")
        .to("#LogoMask1A", 0.01, {autoAlpha:1, ease:"power1.inOut"}, "frame9+=0.95")
        .to("#BottomLogoA", 0.3,{height:"16px", ease:"power1.inOut"},"frame9+=1.4")

        .to("#ctaArrowOnly", 0.01,{opacity:1, ease:"power1.inOut"},"frame9+=1.1")
        .from("#ctaArrowOnly", 0.3,{x:"-150%", ease:"power1.inOut"},"frame9+=1.1")
        .to("#main", {backgroundColor: bgColor[8]}, "frame9")

		console.log( Creative.tl.duration() )
        Creative.tl.addLabel("end")
    }
};

function getById(eleID) {
    return document.getElementById(eleID);
}