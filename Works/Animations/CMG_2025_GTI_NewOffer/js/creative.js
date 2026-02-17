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

// pattern variables
//    patternW = 59.2, // Set the width based on columns (patternW per column)
//    patternH = 87.5, // Set the height based on rows (patternH per row)
//    patternOverlap = 14, // Apply horizontal overlap to the grid cell itself
//    patternRowOff = 6; // Apply horizontal offset between rows

    patternW = 65.5, // Set the width based on columns (patternW per column)
    patternH = 90.5, // Set the height based on rows (patternH per row)
    patternOverlap = 17, // Apply horizontal overlap to the grid cell itself
    patternRowOff = 5; // Apply horizontal offset between rows

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
//var isFirstFrame = [false,false,false,false,false,false];

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
         exitBtn.addEventListener("click", Creative.onExit, false);
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
                var splitText = new SplitText(targetCopy, {type:"lines", linesClass:"splitted-lines++ splitted-lines"});
                splittedLines[index] = splitText.lines;
            }
        })
    },

    splitChars: function(copyId) {
        copyId.forEach((ids, index) => {
            const targetCopy = getById(ids);
            if (targetCopy && targetCopy.innerHTML.length > 0) {
                var splitText = new SplitText(targetCopy, {type:"chars", charsClass:"splitted-chars"});
                splittedChars[index] = splitText.chars;
            }
        })
    },
    
    splitWords: function(copyId) {
        copyId.forEach((ids, index) => {
            const targetCopy = getById(ids);
            if (targetCopy && targetCopy.innerHTML.length > 0) {
                var splitText = new SplitText(targetCopy, {type:"words", wordsClass:"splitted-words"});
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
    
    appendSVGToGrid: function (svgFilePath, rows, cols) {
        // Create a container for the grid
        const gridContainer = document.createElement('div');
        gridContainer.id = 'patternCont';
        gridContainer.style.position = 'absolute';
        gridContainer.style.display = 'flex';
        gridContainer.style.flexWrap = 'wrap';
        gridContainer.style.width = `${cols * patternW}px`; // Set the width based on columns (patternW per column)
        gridContainer.style.height = `${rows * patternH}px`; // Set the height based on rows (patternH per row)
    
        // Create the grid cells (divs)
        for (let i = 0; i < rows * cols; i++) {
            const gridCell = document.createElement('div');
            gridCell.style.width = patternW+'px'; // Set a fixed width for each cell
            gridCell.style.height = patternH+'px'; // Set a fixed height for each cell
            gridCell.style.position = 'relative'; // Make the cell's position relative to contain absolute images
            gridContainer.appendChild(gridCell);
        }
    
        // Append the grid container to the body (or a specific container)
        getById("patternFrame").insertBefore(gridContainer, getById("patternFrame").firstChild);
    
        // Create an <img> element with the SVG file as the source
        const svgImage = document.createElement('img');
        svgImage.src = svgFilePath; // Set the source to the SVG file path
        svgImage.style.position = 'absolute'; // Position the image absolutely inside the cell
        svgImage.style.width = '100%'; // Ensure the image fits within the grid cell
        svgImage.style.height = '100%'; // Ensure the image fits within the grid cell
        
    
        // Select all grid cells
        const gridCells = gridContainer.querySelectorAll('div');
    
        // Loop through the grid cells and append the SVG image sequentially
        let currentCell = 0;
        let rowNumber = 0;
        while (currentCell < gridCells.length) {
            const gridCell = gridCells[currentCell];
            svgImage.setAttribute("class","");
            // Apply horizontal overlap (patternOverlap offset) to the grid cell itself
            if (currentCell % cols !== 0) {  // For subsequent cells in a row
                const overlapOffset = patternOverlap * (currentCell % cols); // patternOverlap horizontal overlap
                gridCell.style.left = `-${overlapOffset}px`; // Apply left offset to the cell
                svgImage.classList.add("Row" + rowNumber);
            } else {
                gridCell.style.left = '0px'; // Reset left offset for first cell in a row
                rowNumber++;
                svgImage.classList.add("Row" + rowNumber);
            }
    
            // Apply horizontal offset between rows (patternRowOff offset)
            const rowOffset = patternRowOff * Math.floor(currentCell / cols); // Shift each row by patternRowOff to the right
            gridCell.style.left = `${parseFloat(gridCell.style.left || 0) + rowOffset}px`; // Apply row offset to the cell
    
            // Append the cloned SVG image to the grid cell
            const clonedImage = svgImage.cloneNode(); // Clone the image for each cell
            gridCell.appendChild(clonedImage); // Append the image inside the grid cell
            currentCell++;
        }
    },

    init: function() {
        var delay1 = 0, 
            delay2 = parseFloat(_dynamicData.patternGap);
        
        Creative.splitLines(["h1Heading", "h2Heading", "h2Heading2", "h4Heading", "h5Heading", "h2Heading3", "h4Heading2", "h4Subheading", "h5Heading2", "h2Subheading", "h2LegalSubheading"]);
//        Creative.splitWords(["h2Heading2", "h4Heading2", "h5Heading2"]);
        
        Creative.appendSVGToGrid(_dynamicData.svgPattern1, _dynamicData.patternRow, _dynamicData.patternColumn);
        Creative.appendSVGToGrid(_dynamicData.svgPattern2, _dynamicData.patternRow, _dynamicData.patternColumn);
        
        Creative.tl.addLabel("reset", 0)
        
        Creative.tl.set("#main",{autoAlpha: 1})
        // reset elements to initial states
        .call(Creative.hideContainer, ["vMask"], "reset")
        .call(Creative.hideContainer, ["legalFrame"], "reset")
        .call(Creative.hideContainer, ["legalContainer"], "reset")
        .call(Creative.setCtaProps, ["textCta"], "reset")
        .to("#container", {autoAlpha:1}, "reset")
        .set("#logoMask", {display:"flex", xPercent:-180, autoAlpha:1 }, "reset")
        
        .addLabel("frame1")
            .from("#h1HeadingBot,#h1Heading,#h1HeadingTop",1,{y:"-100%", stagger:-0.05, ease:"power4.out"},"frame1")
            .from("#h1HeadingBot,#h1Heading,#h1HeadingTop",0.001,{opacity:0, stagger:-0.05, ease:"power4.out"},"frame1+=0.13")
            .from("#f1UnitImage",1,{y:"-40%", ease:"power4.out"},"frame1+=0.05")
            .from("#f1UnitImage",0.001,{opacity:0, ease:"power4.out"},"frame1+=0.17")
            .from("#f1UnitShadow",1,{opacity:0, ease:"power4.out"},"frame1+=0.35")
            
            //Frame1Out
            .to("#h1HeadingBot, #h1HeadingTop",0.5,{scale:0.7, ease:"power4.in"},"frame1+=1.9")
            .to("#h1HeadingTop",0.5,{y:"30px", ease:"power4.in"},"frame1+=1.9")
            .to("#h1HeadingBot",0.5,{y:"-30px", ease:"power4.in"},"frame1+=1.9")
            .to("#h1HeadingBot, #h1HeadingTop",0.001,{opacity:0, ease:"power4.in"},"frame1+=2.4")
            .to("#h1Heading",0.5,{scale:1.3, ease:"power4.in"},"frame1+=1.9")
            .to("#h1Heading",0.001,{opacity:0, ease:"power4.in"},"frame1+=2.4")

        .addLabel("pattern","-=0.7")
            for(var x = 1; x <= parseFloat(_dynamicData.patternRow); x++){
                delay1 += parseFloat(_dynamicData.patternDelay1);
                delay2 += parseFloat(_dynamicData.patternDelay2);
                
                Creative.tl.from("#patternCont:nth-child(1) .Row"+x, parseFloat(_dynamicData.patternDuration), {clipPath: "inset(100% 0% 0% 0%)", stagger: {each:-0.06}, ease: "expo.inOut"}, "pattern-="+delay1)
                Creative.tl.from("#patternCont:nth-child(2) .Row"+x, parseFloat(_dynamicData.patternDuration), {clipPath: "inset(100% 0% 0% 0%)", stagger: {each:-0.06}, ease: "expo.inOut"}, "pattern-="+delay2)
                Creative.tl.from("#patternFrame",3,{x:70, ease:"power4.out", onStart:()=>{
                    gsap.to("#patternFrame",12,{x:"-=80", ease:"none", delay:1.2})
                }},"pattern-="+delay1)
            }
        
        Creative.tl.addLabel("frame2","-=2.11")
            .to("#heading2",0.01,{opacity: "1"},"frame2-=0.1")

            // Logo
            .set("#logoMask", { display:"flex", xPercent:-180, autoAlpha:1 }, "frame2+=0.25")
            .to("#logoMask", 0.5, {xPercent: 0, ease:"power1.inOut"}, "frame2+=0.25")
            // CTA
            .from("#ctaArrow", 0.01, {autoAlpha: 0}, "frame2+=0.43")
            .to("#logoMask", 0.35, {xPercent: 0, ease:"power1.inOut"}, "frame2+=0.43")
            .set("#ctaArrow", {autoAlpha: 0}, "frame2+=0.43")
            .set("#ctaText", {display:"flex", width: "8%"}, "frame2+=0.43")
            .set("#ctaArrow", {autoAlpha:1}, "frame2+=0.43")
            .to("#ctaText", 0.5, {width: "100%" ,ease:"power1.inOut", onStart:()=>{ gsap.to("#ctaArrow", 0.001, {display:"block"});} }, "frame2+=0.43")
            .from("#ctaText", 0.45, {clipPath: 'inset(0% 100% 0% 0%)', ease:"power2.out", onStart:()=>{ gsap.set("#ctaText", {autoAlpha:1});}}, "frame2+=0.43")
            
            .from("#h2Eyebrow",0.7,{y:10, stagger:0.08, ease:"power4.out"},"frame2-=0.1")
            .from("#h2Heading .splitted-lines",0.4,{y:"-30px",  ease:"power4.out"},"frame2-=0.1")
            .from("#h2Heading .splitted-lines",0.001,{opacity:0, ease:"power4.out"},"frame2-=0.1")
            .from("#h2Heading2 .splitted-lines",0.4,{y:10, scale:0.5, transformOrigin:"center center", ease:"power4.out"},"frame2-=0.1")
            .from("#h2Heading2 .splitted-lines",0.001,{opacity:0, transformOrigin:"center center", ease:"power4.out"},"frame2-=0.1")
            .from("#h2Heading3 .splitted-lines",0.4,{y:"20px", stagger:0.08, ease:"power4.out"},"frame2-=0.1")
            .from("#h2Heading3 .splitted-lines",0.001,{opacity:0, ease:"power4.out"},"frame2-=0.1")
            .from("#h2Subheading .splitted-lines",0.8,{y:20, stagger:0.08, ease:"power4.out"},"frame2+=0.2")
            .from("#h2Subheading .splitted-lines",0.001,{opacity:0, stagger:0.08, ease:"power4.out"},"frame2+=0.2")
            .from("#h2LegalSubheading .splitted-lines",0.8,{y:20, stagger:0.08, ease:"power4.out"},"frame2+=0.35")
            .from("#h2LegalSubheading .splitted-lines",0.001,{opacity:0, stagger:0.08, ease:"power4.out"},"frame2+=0.35")
            
            //Frame2Out
            .to("#logoMask", 0.5, {xPercent: -180, ease: "power4.in"}, "frame2+=3.7")
            .set("#ctaText, #ctaArrow", {opacity:0}, "frame2+=4.2")

            .to("#h2Eyebrow",0.4,{y:"-100px", stagger:0.08, ease:"expo.in"},"frame2+=3.7")
            .to("#h2Heading .splitted-lines",.6,{y:"-10px",  ease:"expo.in"},"frame2+=3.7")
            .to("#h2Heading",0.001,{opacity:0, ease:"expo.in"},"frame2+=4.3")

            .to("#h2Heading2 .splitted-lines",.6,{y:10, scale:1.5, transformOrigin:"center center", ease:"expo.in"},"frame2+=3.7")
            .to("#h2Heading2",0.001,{opacity:0, transformOrigin:"center center", ease:"expo.in"},"frame2+=4.3")
            .to("#h2Heading3 .splitted-lines",.6,{y:"20px", stagger:0.08, ease:"expo.in"},"frame2+=3.7")
            .to("#h2Heading3",0.001,{opacity:0, ease:"expo.in"},"frame2+=4.3")

            .to("#h2Subheading, #h2LegalSubheading",0.5,{opacity:"0", stagger:0.04, ease:"expo.in"},"frame2+=3.5")
        
        .addLabel("frame3")//,"-=0.05"
            .from("#h3Device",0.9,{scale:0.7, stagger:0.08, ease:"power4.out"},"frame3") //-=0.1
            .from("#h3Device",0.001,{opacity:"0", stagger:0.08, ease:"power4.out"},"frame3") //-=0.1
            .from("#h3DeviceLogo",1,{opacity:"0", stagger:0.08, ease:"power4.out"},"frame3+=0.16")
            
            //Frame3Out
            .to("#h3DeviceLogo",0.7,{opacity:"0", stagger:0.08, ease:"power4.in"},"frame3+=1")
            
            .to("#h3Device",0.5,{y:"-300%", opacity:"0", stagger:0.08, ease:"power4.in"},"frame3+=1.5")
            .set("#h3Device",{opacity:"0"},"frame3+=1.8")
        
        .addLabel("frame4")
            .to("#heading4",0.01,{opacity: "1"},"frame4-=0.5")
            .from("#h4Heading .splitted-lines", 0.8, {y: 60, stagger: 0.03, ease: "power4.out"},"frame4-=0.2")
            .from("#h4Heading .splitted-lines", 0.001, {opacity:0, stagger: 0.03, ease: "power4.out"},"frame4-=0.2")

            // Logo
            .set("#logoMask", { display:"flex", xPercent:-180, autoAlpha:1 }, "frame4-=0.15")
            .to("#logoMask", 0.5, {xPercent: 0, ease:"power1.inOut"}, "frame4-=0.15")
            // CTA
            .set("#ctaArrow", {autoAlpha: 0}, "frame4+=0.05")
            .set("#ctaText", {display:"flex", width: "8%"}, "frame4+=0.05")
            .set("#ctaArrow", {autoAlpha:1, x:0}, "frame4+=0.05")
            .set("#ctaText", {clipPath: 'inset(0% 100% 0% 0%)'}, "frame4+=0.05")
            .to("#ctaText", 0.5, {width: "100%" ,ease:"power1.inOut", onStart:()=>{ gsap.to("#ctaArrow", 0.001, {display:"block"});} }, "frame4+=0.05")
            .to("#ctaText", 0.45, {clipPath: 'inset(0% 0% 0% 0%)', ease:"power2.out", onStart:()=>{ gsap.set("#ctaText", {autoAlpha:1});}}, "frame4+=0.05")
        
            .from("#h4Heading2 .splitted-lines", 0.8, {y: 20, stagger: 0.01, ease: "power4.out"},"frame4+=0.1")
            .from("#h4Heading2 .splitted-lines", 0.001, {opacity:0, stagger: 0.03, ease: "power4.out"},"frame4+=0.1")
            .from("#h4Subheading .splitted-lines", 0.8, {y: 40, stagger: 0.03, ease: "power4.out"},"frame4+=0.2")
            .from("#h4Subheading .splitted-lines", 0.001, {opacity:0, stagger: 0.03, ease: "power4.out"},"frame4+=0.2")
            .from("#h4LegalSubheading", 0.5, {opacity:0, ease: "power4.out"},"frame4+=0.3")
        
            //frame4Out
            .to("#h4Eyebrow, #heading4 .splitted-lines",0.8,{y:"-600", stagger:0.03, ease:"power4.in"},"frame4+=3.5")
            .to("#h4Eyebrow, #heading4 .splitted-lines",0.001,{opacity:0, stagger:0.03, ease:"power4.in"},"frame4+=4")
            .to("#h4Heading2 .splitted-lines",0.8,{y:"-500", stagger:0.03, ease:"power4.in"},"frame4+=4")
            .to("#h4Heading2 .splitted-lines",0.001,{opacity:0, stagger:0.03, ease:"power4.in"},"frame4+=4.5")
            .to("#h4Subheading", 0.5, {y:0, opacity:"0", stagger:0.001,  ease: "power4.in"},"frame4+=3.3")
            .to("#h4LegalSubheading", 0.5, {opacity:"0", ease: "power4.in"},"frame4+=3.4")
        
        .addLabel("frame5","-=0.7")
            .to("#heading5",0.01,{opacity: "1"},"frame5-=0.1")
            .from("#h5Eyebrow, #heading5 .splitted-lines",0.8,{y:30, stagger:0.08, ease:"power4.out"},"frame5-=0.1")
            .from("#h5Eyebrow, #heading5 .splitted-lines",0.001,{opacity:"0", stagger:0.08, ease:"power4.out"},"frame5-=0.1")
        
            .from("#h5Heading2 .splitted-lines",0.8,{stagger:0.08, ease:"power4.out"},"frame5+=0.1")
            .from("#h5Heading2 .splitted-lines",0.001,{opacity:"0", stagger:0.08, ease:"power4.out"},"frame5+=0.1")
        
            .from("#h5Subheading",0.8,{stagger:0.8, ease:"power4.out"},"frame5+=0.3")
            .from("#h5Subheading",0.001,{opacity:"0", stagger:0.8, ease:"power4.out"},"frame5+=0.3")
        
            .from("#h5LegalSubheading",0.5,{opacity:"0", ease:"power4.out", onComplete: function() {
                if(!hotspotCreated){
                    hotspotCreated = true;
                    if (getById('underlinedText') !== null) Creative.addTooltip();
                    gsap.set("#hotspot", { autoAlpha: 1 });
                }else{
                    gsap.set("#hotspot", { autoAlpha: 1 });
                } 
            }},"frame5+=0.5")
        

        console.log( Creative.tl.duration() )
        
        Creative.tl.addLabel("end")
    }
};

function getById(eleID) {
    return document.getElementById(eleID);
}