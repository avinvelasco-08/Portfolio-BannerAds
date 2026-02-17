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

// Tooltip opacity
var isVisible = false;

// Tooltip Hotspot Checker
var hotspotCreated 	= false;

// exit and replay
//var btn_replay   = getById("btn_replay");

// split array
var splittedLines = [];

// frame
var _totalFrames = 5;
var _currentFrame = 0;
var _previousFrame = 0;
var _arrFrameObjs = [];

// dynamic array
var arrblock12;
var arrblock1;
var arrblock2;
var arrblock3;
var arrblock4;
var arrblock5;

var arrblock12Delay;

// dynamic delay
var block1And2Delay;
var block1Delay;
var block2Delay;
var block3Delay;
var block4Delay;
var block5Delay;

// dynamic timeline position
var block1And2Scene;
var block1Scene;
var block2Scene;
var block3Scene;
var block4Scene;
var block5Scene;
var block6Scene;
var toolTip;
var TextWidth;
var TextHeight;

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
			if(hotspotCreated){
				gsap.set("#hotspot", { autoAlpha: 0 }, "reset")
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

            const imgElements = document.querySelectorAll('.to-inline-svg');
            Creative.inlineAllSvgs(imgElements)
            .then(() => {
                console.log('All SVGs inlined successfully. Proceeding to the next function...');
                // Call the next function here
                Creative.init();
            })
            .catch(error => {
                console.error('There was an error inlining SVGs:', error);
            });

			
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
			container.style.display = "block";
			container.style.opacity = "0";
		},

		resetFrameObjs: function() {
			for (var i = 0; i < _arrFrameObjs.length; i++) {
				_arrFrameObjs[i].ifShowing = false;
				gsap.set([_arrFrameObjs[i].eleRef], {
					alpha: 0
				});
			}
		},

		checkTotalDuration: function(targetBlock) {
			console.log(Creative.tl.totalDuration(targetBlock));
		},

		splitLines: function(copyId) {
			copyId.forEach((ids, index) => {
				const targetCopy = getById(ids);
				if (targetCopy && targetCopy.innerHTML.length > 0) {
					var splitText = new SplitText(targetCopy, {
						type: "lines",
						linesClass: "splitted-container"
					});
					splittedLines[index] = splitText.lines;
				}
			})
		},

		updateColor: function() {
			gsap.set("#ctaText", { color: ctaColor })
			gsap.set("#arrowFill", { fill: ctaColor })
			gsap.set("#logo", { fill: logoColor.split(",")[0] })
			gsap.set("#main", { backgroundColor: bgColor })
			gsap.set("#contentContainer", { backgroundColor: contentColor })
			gsap.set("#giftWrap", { backgroundColor: giftBoxColor })
			gsap.set("#deviceFrame", { backgroundColor: deviceFrameColor })

			// svg colors
			gsap.set("#botRightFoldPath", { fill: botRightFoldColor })
			gsap.set("#bottomFoldPath", { fill: bottomFoldColor })
			gsap.set("#midLeftFoldPath", { fill: midLeftFoldColor })
			gsap.set("#midRightFoldPath", { fill: midRightFoldColor })
			gsap.set("#topLeftFoldPath", { fill: topLeftFoldColor })
			gsap.set("#topRightFoldPath", { fill: topRightFoldColor })
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

			const maxHeight = customScrollbar.offsetHeight *  0.9;
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

        toInlineSvg: function(imgElement) {
            const imgSrc = imgElement.src;

            // Return a promise that resolves when the SVG has been inlined
            return fetch(imgSrc)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(svgText => {
                    // Create a parent div with the same id and class as the img element
                    const parentDiv = document.createElement('div');
                    if (imgElement.id) {
                        parentDiv.id = imgElement.id;
                    }
                    if (imgElement.className) {
                        parentDiv.className = imgElement.className;
                    }
        
                    // Insert the SVG into the parent div
                    parentDiv.innerHTML = svgText;
        
                    // Get the SVG element from the parent div
                    const svgElement = parentDiv.firstChild;
        
                    // Set the dimensions of the parent div to match the SVG
                    if (svgElement.hasAttribute('width')) {
                        parentDiv.style.width = svgElement.getAttribute('width') + 'px';
                    }
                    if (svgElement.hasAttribute('height')) {
                        parentDiv.style.height = svgElement.getAttribute('height') + 'px';
                    }
        
                    // Replace the img element with the parent div containing the SVG
                    imgElement.parentNode.replaceChild(parentDiv, imgElement);
                });
        },

        inlineAllSvgs: function(imgElements) {
            const promises = Array.from(imgElements).map(imgElement => Creative.toInlineSvg(imgElement));
        
            // Wait for all SVG inlining to complete
            return Promise.all(promises);
        },
    
        init: function() {
            Creative.splitLines(["f1Heading", "f2Heading", "f5Eyebrow", "f5Heading", "f6Heading"]);
			
            Creative.tl.addLabel("reset", 0)
                // reset elements to initial states
				Creative.tl
				.call( Creative.resetFrameObjs ,[] , "reset" )
                .set("#f1Image, #f2Image", {alpha:0}, "reset")
                .set("#arrowTipContainer,#tooltipContainer", { autoAlpha: 0 })
                .call(Creative.updateColor, null, "reset")
                .set([splittedLines[0],splittedLines[1],splittedLines[2],splittedLines[3],splittedLines[4], "#f6Subheading"], { alpha:0, rotation:0.01 }, "reset")
                .set("#main", {alpha:1}, "reset")
                .set("#contentContainer, #foldFrame", {clipPath: "polygon(0 0, 100% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 0)"}, "reset")
                .set("#topLeftFold", {rotateX: 180, transform: "rotate(-33deg)", transformOrigin:"left top"}, "reset")
                .set("#botRightFold", {rotateX: 180, transform: "rotate(-38deg)", transformOrigin:"right bottom"}, "reset")
                .set("#topRightFold", {rotateX: 180, transform: "rotate(43deg)", transformOrigin:"right top"}, "reset")
                .set("#midLeftFold", {rotateY: 180, transform: "rotate(-6deg)", transformOrigin:"left top"}, "reset")
                .set("#midRightFold", {rotateY: 180, transform: "rotate(-6deg)", transformOrigin:"left top"}, "reset")
                .set("#bottomFold", {yPercent: 100, rotateX: 180, transformOrigin:"bottom"}, "reset")
                .set("#giftWrapHolder", {perspective:900})
                .set("#giftWrap", {yPercent: 0, rotateX: 180, transformOrigin:"top", transformStyle:"preserve-3d"}, "reset")
                .set("#legalContainer, #ctaArrow, #ctaContainer", {display: "none"}, "reset")
                .to("#deviceFrame, #deviceFrame", {alpha:0}, "reset")
                .to("#container", {alpha:1}, "reset")
                .set(splittedLines[0], { opacity:0 })
            
                //FRAME 1
                //-------- Heading1 IN -------------------------------
            if(arrFrToggle[0] == "on"){
            
                Creative.tl.addLabel("frame1", 0.001)
                .set("#ctaArrow", {opacity: 1}, "frame1+=0.3")
				.from("#logoMask", 0.5, {x: -200, ease:"power1.inOut"}, "frame1")  
				.to("#heading1", {alpha:1}, "frame1")
                .set("#f1Image", {alpha:1}, "frame1")
                .set("#f2Image", {x:300, alpha:1}, "frame1")
                .from(splittedLines[0], 1, {yPercent: 150, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[0], 0.001, {alpha:1, stagger: 0.1})} }, "frame1+=30%")
            	.from("#f1SLegalSubheading", 0.3, {alpha: 0, stagger: 0.1, ease:"power1.out"}, "frame1+=300%")
            
                        // -------- F1 OUT --------
                        .addLabel("outFrame1", "+="+arrtextDelay[0])
                        .to("#f1Image", 0.3, {x:-300, ease:"power1.out"}, "outFrame1+=20%")
                        .to(splittedLines[0], 0.3, {yPercent: -130, stagger: 0.1, clipPath: 'inset(130% 0% 0% 0%)', ease:"power2.out"}, "outFrame1")
                        .to(["#f1SLegalSubheading"], 0.3, {yPercent: -100, alpha: 0, stagger: 0.1, ease:"power2.out"}, "outFrame1+=100%")
            }
                //FRAME 2
                //-------- Heading2 IN -------------------------------
            if(arrFrToggle[1] == "on"){
                
                if(arrFrToggle[0] == "off"){
                    Creative.tl.addLabel("frame2", "0")
                    .to("#heading2", {alpha:1}, "frame2")
                    .from("#logoMask", 0.5, {x: -200, ease:"power1.inOut"}, "frame1")
                    .to("#f2Image", 0.3, {x:0, alpha:1, ease:"power1.out"}, "frame2")
                    .from(splittedLines[1], 1, {yPercent: 150, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[1], 0.001, {alpha:1, stagger: 0.1})} }, "frame2+=30%")
                    .from("#f2SLegalSubheading", 0.3, {alpha: 0, stagger: 0.1, ease:"power1.out"}, "frame2+=300%")
                }else{
                    Creative.tl.addLabel("frame2", "-=0.3")
                    .to("#heading2", {alpha:1}, "frame2")
                    .to("#f2Image", 0.3, {x:0, alpha:1, ease:"power1.out"}, "frame2-=0.24")
                    .from(splittedLines[1], 1, {yPercent: 150, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[1], 0.001, {alpha:1, stagger: 0.1})} }, "frame2")
                    .from("#f2SLegalSubheading", 0.3, {alpha: 0, stagger: 0.1, ease:"power1.out"}, "frame2+=100%")
                }
                
                
                //-------- Frame Fold IN -------------------------------
                Creative.tl
                .addLabel("foldFrameIn", "+="+arrtextDelay[1])
                
                // -------- Top Left Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 100% 0, 100% 30%, 100% 73%, 100% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameIn") //1st fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 100% 0, 100% 30%, 100% 73%, 100% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameIn") 
            .to("#topLeftFold", 0.5, {rotateX: 0, ease:"power2.out", transformOrigin:"left top"}, "foldFrameIn")  
            // -------- Both Right Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 100% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameIn+=0.2") //2nd fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 100% 0%, 100% 30%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameIn+=0.2")
            .to("#botRightFold", 0.5, {rotateX: 0, ease:"power2.out", transformOrigin:"right bottom"}, "foldFrameIn+=0.2")
            // -------- Top Right Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 73% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameIn+=0.5") //3rd fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 72.8% 0%, 100% 30.2%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameIn+=0.5")
            .to("#topRightFold", 0.5, {rotateX: 0, ease:"power2.out", transformOrigin:"right top"}, "foldFrameIn+=0.5")

            // -------- Mid Left and Right Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 73.67% 0%, 77% 39%, 80.33% 92%, 72% 100%, 29% 100%, 23% 38%, 20% 11%)", ease:"expo.out"}, "foldFrameIn+=1") //4th fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34% 0%, 73% 0%, 75% 39%, 80% 92%, 72% 100%, 29% 100%, 25% 57%, 20.5% 14%)", ease:"expo.out"}, "foldFrameIn+=1")
            .to("#midLeftFold", 0.5, {rotateY: 0, ease:"power2.out", transformOrigin:"left top"}, "foldFrameIn+=1")
            .to("#midRightFold", 0.5, {rotateY: 0, ease:"power2.out", transformOrigin:"right top"}, "foldFrameIn+=1")

            // -------- Bottom Fold --------
            .to("#foldFrame", 0.1, {clipPath: "polygon(34% 0%, 73.67% 0%, 77.33% 45.8%, 81% 51.2%, 79% 70%, 26% 69.6%, 23% 38%, 20% 11%)", ease:"expo.out"}, "foldFrameIn+=1.37")
            .to("#contentContainer", 0.1, {clipPath: "polygon(34% 0%, 73% 0%, 75% 45%, 76% 49%, 75.66% 69.3%, 27% 69.4%, 26% 62.2%, 21.1% 12%)", ease:"expo.out"}, "foldFrameIn+=1.37")
            .to("#bottomFold", 0.5, {yPercent: 0, rotateX: 0, ease:"power2.out", transformOrigin:"bottom"}, "foldFrameIn+=1.3")
            
            // -------- Gift Wrap --------
            .to("#foldFrame", 0.1, {clipPath: "polygon(37% 29.6%, 75% 29.6%, 76.67% 44.6%, 81.33% 49.6%, 78.33% 69.2%, 26% 69.6%, 22.67% 38%, 21.7% 29.8%)", ease:"expo.out"}, "foldFrameIn+=1.65")
            .to("#contentContainer", 0.1, {clipPath: "polygon(43% 30%, 75% 30%, 76% 45%, 77.67% 49.4%, 77.33% 69%, 54% 69%, 26% 69%, 23.33% 30%)", ease:"expo.out"}, "foldFrameIn+=1.65")
            .to("#giftWrap", 0.3,{boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.1)"}, "foldFrameIn+=1.6")
            .to("#giftWrap", 0.3, {yPercent: 0, rotateX: 0, ease:"power2.out", transformOrigin:"top"}, "foldFrameIn+=1.65")
            .set("#logoMask", {x: -200,}, "foldFrameIn+=1.65")
                
            }

                //FRAME 3
                //-------- Frame UnFold -------------------------------
                Creative.tl.addLabel("foldFrameOut", "+=0.85")
                .set("#imageFrame", {alpha:0}, "instantFold")
                //set gift to fold already
                // -------- Top Left Fold --------
				.set("#foldFrame", {clipPath: "polygon(34% 0%, 100% 0, 100% 30%, 100% 73%, 100% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "instantFold") //1st fold ------
				.set("#contentContainer", {clipPath: "polygon(34.1% 0%, 100% 0, 100% 30%, 100% 73%, 100% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "instantFold") 
				.set("#topLeftFold", {rotateX: 0, ease:"power2.out", transformOrigin:"left top"}, "instantFold")  
				// -------- Both Right Fold --------
				.set("#foldFrame", {clipPath: "polygon(34% 0%, 100% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "instantFold") //2nd fold ------
				.set("#contentContainer", {clipPath: "polygon(34.1% 0%, 100% 0%, 100% 30%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "instantFold")
				.set("#botRightFold", {rotateX: 0, ease:"power2.out", transformOrigin:"right bottom"}, "instantFold")
				// -------- Top Right Fold --------
				.set("#foldFrame", {clipPath: "polygon(34% 0%, 73% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "instantFold") //3rd fold ------
				.set("#contentContainer", {clipPath: "polygon(34.1% 0%, 72.8% 0%, 100% 30.2%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "instantFold")
				.set("#topRightFold", {rotateX: 0, ease:"power2.out", transformOrigin:"right top"}, "instantFold")

				// -------- Mid Left and Right Fold --------
				.set("#foldFrame", {clipPath: "polygon(34% 0%, 73.67% 0%, 77% 39%, 80.33% 92%, 72% 100%, 29% 100%, 23% 38%, 20% 11%)", ease:"expo.out"}, "instantFold") //4th fold ------
				.set("#contentContainer", {clipPath: "polygon(34% 0%, 73% 0%, 75% 39%, 80% 92%, 72% 100%, 29% 100%, 25% 57%, 20.5% 14%)", ease:"expo.out"}, "instantFold")
				.set("#midLeftFold", {rotateY: 0, ease:"power2.out", transformOrigin:"left top"}, "instantFold")
				.set("#midRightFold", {rotateY: 0, ease:"power2.out", transformOrigin:"right top"}, "instantFold")

				// -------- Bottom Fold --------
				.set("#foldFrame", {clipPath: "polygon(34% 0%, 73.67% 0%, 77.33% 45.8%, 81% 51.2%, 79% 70%, 26% 69.6%, 23% 38%, 20% 11%)", ease:"expo.out"}, "instantFold")
				.set("#contentContainer", {clipPath: "polygon(34% 0%, 73% 0%, 75% 45%, 76% 49%, 75.66% 69.3%, 27% 69.4%, 26% 62.2%, 21.1% 12%)", ease:"expo.out"}, "instantFold")
				.set("#bottomFold", {yPercent: 0, rotateX: 0, ease:"power2.out", transformOrigin:"bottom"}, "instantFold")
				
				// -------- Gift Wrap --------
				.set("#foldFrame", {clipPath: "polygon(37% 29.6%, 75% 29.6%, 76.67% 44.6%, 81.33% 49.6%, 78.33% 69.2%, 26% 69.6%, 22.67% 38%, 21.7% 29.8%)", ease:"expo.out"}, "instantFold")
				.set("#contentContainer", {clipPath: "polygon(43% 30%, 75% 30%, 76% 45%, 77.67% 49.4%, 77.33% 69%, 54% 69%, 26% 69%, 23.33% 30%)", ease:"expo.out"}, "instantFold")
				.set("#giftWrap", {boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.1)"}, "instantFold")
				.set("#giftWrap", {yPercent: 0, rotateX: 0, ease:"power2.out", transformOrigin:"top"}, "instantFold")
				.set("#logoMask", {x: -200,}, "instantFold")
            
                .set("#heading2, #footerContainer", {alpha:0}, "instantFold")
                .set("#deviceFrame", {alpha:1}, "instantFold")
            
            

                // -------- UnFold Gift Wrap --------
            .to("#giftWrap", 0.5, {yPercent: -115, rotateX: 180, boxShadow: "0px 30px 0px 0px rgba(0,0,0,0.1)", ease:"power2.out", transformOrigin:"top"}, "foldFrameOut")
            .to("#bottomFold", 0.5, { rotateX: 80, yPercent: 210, ease:"power2.out", transformOrigin:"bottom", rotation:0.01}, "foldFrameOut")
            .to("#foldFrame", 0.2, {yPercent: 0,clipPath: "polygon(34% 0%, 72.67% 0%, 75.33% 39%, 80% 92%, 72% 100%, 29% 100%, 25% 57%, 20.5% 14%)", ease:"power1.out"}, "foldFrameOut+=0.002") //1st unfold ------
            .to("#contentContainer", 0.21, {yPercent: 0,clipPath: "polygon(34% 0%, 72.33% 0%, 75% 39%, 80% 92%, 72% 100%, 29% 100%, 25.33% 57%, 21.17% 13.6%)", ease:"power1.out"}, "foldFrameOut")
            .from("#device", 1, {yPercent: 30, ease:"power2.out"}, "foldFrameOut+=2%")

            // -------- UnFold Mid Left and Right --------
            .to("#midLeftFold", 0.5, {rotateY: 180, ease:"power2.out", transformOrigin:"left top"}, "foldFrameOut+=0.3")
            .to("#midRightFold", 0.5, {rotateY: 180, ease:"power2.out", transformOrigin:"right top"}, "foldFrameOut+=0.3")
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 73% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameOut+=0.4005") //2nd unfold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 72.8% 0%, 100% 30.2%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameOut+=0.4")
            
             // --------  UnFolded --------
            .to("#topLeftFold", 0.5, {rotateX: 180, ease:"power2.out", transformOrigin:"left top"}, "foldFrameOut+=0.5")
            .to("#botRightFold", 0.5, {rotateX: 180, ease:"power2.out", transformOrigin:"right bottom"}, "foldFrameOut+=0.5")
            .to("#topRightFold", 0.5, {rotateX: 180, ease:"power2.out", transformOrigin:"right top"}, "foldFrameOut+=0.5")
            .to("#contentContainer, #foldFrame", 0.25, {clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)", ease:"power2.out"}, "foldFrameOut+=0.6")

                // --------  Device Out --------
                .addLabel("deviceOut", "+=1.6")
                .to("#device", 0.75, {yPercent: -10, ease:"power2.in"}, "deviceOut")
            	.set("#deviceFrame", {alpha:0}, "deviceOut+=0.75")
            
                //FRAME 5
                //-------- heading5 IN -------------------------------
            if(arrFrToggle[2] == "on"){
                Creative.tl.addLabel("frame5", "+=0")
                .set("#logo", {fill:logoColor.split(",")[1]})
                .set("#ctaArrow", {opacity: 1}, "frame5")
                .set("#footerContainer", {alpha:1}, "frame5")
                .set("#ctaContainer", {display: "flex"}, "frame5")
                .to("#logoMask", 0.5, {x: 0, ease:"power1.inOut"}, "frame5")       
                .from("#ctaMask", 0.4, {width: "9px" ,ease:"power1.inOut", onStart:()=>{ gsap.to("#ctaArrow", 0.001, {display:"block"})} }, "frame5")
                .to("#heading5, f5Eyebrow", {alpha:1}, "frame5")
                .from(splittedLines[2], 1, {yPercent: 100, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[2], 0.001, {alpha:1, stagger: 0.1})} }, "frame5")
                .from(splittedLines[3], 1, {yPercent: 100, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[3], 0.001, {alpha:1, stagger: 0.1})} }, "frame5+=30%")
                .from("#f5SLegalSubheading", 0.3, {alpha: 0, stagger: 0.1, ease:"power1.out"}, "frame5+=300%")
            
                        // -------- F1 OUT --------
                        .addLabel("outframe5", "+="+arrtextDelay[2])
                        .to(splittedLines[2], 0.3, {yPercent: -100, stagger: 0.1, clipPath: 'inset(130% 0% 0% 0%)', ease:"power2.out"}, "outframe5")
                        .to(splittedLines[3], 0.3, {yPercent: -100, stagger: 0.1, clipPath: 'inset(130% 0% 0% 0%)', ease:"power2.out"}, "outframe5+=30%")
                        .to(["#f5SLegalSubheading"], 0.3, {yPercent: -100, alpha: 0, stagger: 0.1, ease:"power2.out"}, "outframe5+=100%")
            }
                
                // --------  Endframe --------
                Creative.tl.addLabel("endframe", "+=0")
                if(arrFrToggle[2] == "off"){
                Creative.tl.set("#logo", {fill:logoColor.split(",")[1]})
                .set("#ctaArrow", {opacity: 1}, "endframe")
                .set("#footerContainer", {alpha:1}, "endframe")
                .set("#ctaContainer", {display: "flex"}, "endframe")
                .to("#logoMask", 0.5, {x: 0, ease:"power1.inOut"}, "endframe")    
                .from("#ctaMask", 0.4, {width: "9px" ,ease:"power1.inOut", onStart:()=>{ gsap.to("#ctaArrow", 0.001, {display:"block"})} }, "endframe")   
                }
                Creative.tl.set("#heading6", {alpha:1}, "endframe")
                .from(splittedLines[4], 1, {yPercent: 100, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[4], 0.001, {alpha:1, stagger: 0.1})} }, "endframe")
                .from("#f6Subheading", 1, {yPercent: 100, alpha:0, ease:"expo.out", onStart:()=>{ gsap.to("#f6Subheading", 0.001, {alpha:1, stagger: 0.1})} }, "endframe+=35%")
                .from("#f6LegalSubheading", 0.75, {alpha:0, ease:"power2.out", onComplete: function() {
					if(!hotspotCreated){
						hotspotCreated = true;
						Creative.addTooltip();
						gsap.set("#hotspot", { autoAlpha: 1 });
					}else{
						gsap.set("#hotspot", { autoAlpha: 1 });
					}
                }}, "endframe+=85%")
                .from("#yellowLace", 1, {yPercent:-60, ease:"power2.out"}, "endframe+=70%")
           		.from("#stripeLace", 1, {yPercent:-60, ease:"power2.out"}, "endframe+=100%")
            
                console.log(Creative.tl.duration());

            Creative.tl
            .addLabel("end")
        }
    };

function getById(eleID) 
{
    return document.getElementById(eleID);
}
