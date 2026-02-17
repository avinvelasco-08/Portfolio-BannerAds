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
var frameOption,
    stLogoOption,
    bubbleInnerColor,
    bubbleBorderColor,
    frameDuration,
    ctaHoverColor,
    ctaDefaultColor;

var h1Frame,
    h2Frame,
    h3Frame,
    h4Frame;

// exit
var exitBtn = getById("bannerExit");
var disclaimerBtn = getById("disclaimerBtn");
var closeBtn = getById("closeBtn");

// Create and provide timeline to Hoxton
var CreativeBG = {
    tl: gsap.timeline({
        defaults: {
            ease: "none",
        },
        repeat: 0,
        onRepeat: function() {
        
        }
    })
};
var CreativeBG2 = {
    tl: gsap.timeline({
        defaults: {
            ease: "none",
        },
        repeat: 0, 
        delay: 3.8,
        onRepeat: function() {
        
        }
    })
};

var CreativeBG3 = {
    tl: gsap.timeline({
        defaults: {
            ease: "none",
        },
        repeat: 0, 
        delay:6.5,
        onRepeat: function() {
        
        }
    })
};


function BGLoop(){
    // CIRCLE EDGES ANIMATION
   
    const groups = [
        ["#circle22 path"],
        ["#circle21 path", "#circle23 path"],
        ["#circle20 path", "#circle24 path"],
        ["#circle19 path", "#circle25 path"],
        ["#circle18 path", "#circle26 path"],
        ["#circle17 path", "#circle27 path"],
        ["#circle16 path", "#circle28 path"],
        ["#circle15 path", "#circle29 path"],
        ["#circle14 path", "#circle30 path"],
        ["#circle13 path", "#circle31 path"],
        ["#circle12 path", "#circle32 path"],
        ["#circle11 path", "#circle33 path"],
        ["#circle10 path", "#circle34 path"],
        ["#circle9 path", "#circle35 path"],
        ["#circle8 path", "#circle36 path"],
        ["#circle7 path", "#circle37 path"],
        ["#circle6 path", "#circle38 path"],
        ["#circle5 path", "#circle39 path"],
        ["#circle4 path", "#circle40 path"],
        ["#circle3 path", "#circle41 path"],
        ["#circle2 path", "#circle42 path"],
        ["#circle1 path"]
      ];
      
      const groups2 = [
        ["#circle_22 path"],
        ["#circle_21 path", "#circle_23 path"],
        ["#circle_20 path", "#circle_24 path"],
        ["#circle_19 path", "#circle_25 path"],
        ["#circle_18 path", "#circle_26 path"],
        ["#circle_17 path", "#circle_27 path"],
        ["#circle_16 path", "#circle_28 path"],
        ["#circle_15 path", "#circle_29 path"],
        ["#circle_14 path", "#circle_30 path"],
        ["#circle_13 path", "#circle_31 path"],
        ["#circle_12 path", "#circle_32 path"],
        ["#circle_11 path", "#circle_33 path"],
        ["#circle_10 path", "#circle_34 path"],
        ["#circle_9 path", "#circle_35 path"],
        ["#circle_8 path", "#circle_36 path"],
        ["#circle_7 path", "#circle_37 path"],
        ["#circle_6 path", "#circle_38 path"],
        ["#circle_5 path", "#circle_39 path"],
        ["#circle_4 path", "#circle_40 path"],
        ["#circle_3 path", "#circle_41 path"],
        ["#circle_2 path", "#circle_42 path"],
        ["#circle_1 path"]
      ];
        
      const groups3 = [
        ["#circle_g3_22 path"],
        ["#circle_g3_21 path", "#circle_g3_23 path"],
        ["#circle_g3_20 path", "#circle_g3_24 path"],
        ["#circle_g3_19 path", "#circle_g3_25 path"],
        ["#circle_g3_18 path", "#circle_g3_26 path"],
        ["#circle_g3_17 path", "#circle_g3_27 path"],
        ["#circle_g3_16 path", "#circle_g3_28 path"],
        ["#circle_g3_15 path", "#circle_g3_29 path"],
        ["#circle_g3_14 path", "#circle_g3_30 path"],
        ["#circle_g3_13 path", "#circle_g3_31 path"],
        ["#circle_g3_12 path", "#circle_g3_32 path"],
        ["#circle_g3_11 path", "#circle_g3_33 path"],
        ["#circle_g3_10 path", "#circle_g3_34 path"],
        ["#circle_g3_9 path", "#circle_g3_35 path"],
        ["#circle_g3_8 path", "#circle_g3_36 path"],
        ["#circle_g3_7 path", "#circle_g3_37 path"],
        ["#circle_g3_6 path", "#circle_g3_38 path"],
        ["#circle_g3_5 path", "#circle_g3_39 path"],
        ["#circle_g3_4 path", "#circle_g3_40 path"],
        ["#circle_g3_3 path", "#circle_g3_41 path"],
        ["#circle_g3_2 path", "#circle_g3_42 path"],
        ["#circle_g3_1 path"]
      ];
      groups.forEach((group, index) => {
        const elements = group.map(selector => document.querySelector(selector)); // Map to actual DOM elements
        CreativeBG.tl.from(elements, { scale: 0, duration: 0.9, transformOrigin: "center center" }, index * 0.3) 
        .to(elements, { scale: 1.5, morphSVG: "#star", duration: 0.7, transformOrigin: "center center", x: 35 + 17.5, y: 35 + 17.5, ease: "power3.easeOut" }, ">0.3") 
        .to(elements, { scale: 0, duration: 0.9, transformOrigin: "center center", }, ">");
      });

      groups2.forEach((group, index) => {
        const elements = group.map(selector => document.querySelector(selector)); // Map to actual DOM elements
        CreativeBG2.tl.from(elements, { scale: 0, duration: 0.9, transformOrigin: "center center" }, index * 0.3) 
        .to(elements, { scale: 1.5, morphSVG: "#star2", duration: 0.7, transformOrigin: "center center", x: 35 + 17.5, y: 35 + 17.5, ease: "power3.easeOut" }, ">0.3") 
        .to(elements, { scale: 0, duration: 0.9, transformOrigin: "center center", }, ">");
      });

      groups3.forEach((group, index) => {
        const elements = group.map(selector => document.querySelector(selector)); // Map to actual DOM elements
        CreativeBG3.tl.from(elements, { scale: 0, duration: 0.9, transformOrigin: "center center" }, index * 0.3) 
        .to(elements, { scale: 1.5, morphSVG: "#star3", duration: 0.7, transformOrigin: "center center", x: 35 + 17.5, y: 35 + 17.5, ease: "power3.easeOut" }, ">0.3") 
        .to(elements, { scale: 0, duration: 0.9, transformOrigin: "center center", }, ">");
      });
}

var Creative = {
    tl: gsap.timeline({
        defaults: {
            ease: "none",
        }
    }),

    setExitURL: function(strURL) {
        _exitURL = strURL;
    },

    onExit: function(e) {
        hoxton.exit("Exit", _dynamicData.exitURL);
    },

    onDisclaimerClick: function(e) {
        gsap.to("#disclaimerContainer, #closeBtn", { autoAlpha: 1, duration: 0.3 });
        gsap.set("#disclaimerBtn", { autoAlpha: 0})
    },

    onCloseClick: function(e) {
        gsap.to("#disclaimerContainer, #closeBtn", { autoAlpha: 0, duration: 0.3 });
        gsap.set("#disclaimerBtn", { autoAlpha: 1})
    },
    
    onMouseOver: function() {
        gsap.set("#ctaText", { color:ctaHoverColor });
    },

    onMouseOut: function() {
        gsap.set("#ctaText", { color:ctaDefaultColor });
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
        //SET COLORS
        gsap.to("#main",{backgroundColor:bgColor});
        gsap.to("#ctaText", { color:ctaDefaultColor});
        gsap.to(".bubbleBorder",{fill:bubbleBorderColor});
        gsap.to(".bubbleInner",{fill:bubbleInnerColor});

        Creative.init();

        Creative.checkIsBackup() ? Creative.jumpToEndFrame() : null;
    },

    createButtons: function() {
        // exitBtn.addEventListener("click", Creative.onExit, false);
        disclaimerBtn.addEventListener("click", Creative.onDisclaimerClick);
        closeBtn.addEventListener("click", Creative.onCloseClick);
        container.addEventListener("mouseover", Creative.onMouseOver);
        container.addEventListener("mouseout", Creative.onMouseOut);
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
        container.style.opacity = "1";
        container.style.visibility = "visible";
    },

    createPattern: function() {
        const circleSize = 36; // Size of each circle
        const gap = 5; // Gap between the circles
        const offset = 12; // Offset to push the circles outside the banner
        const bannerWidth = 300;
        const bannerHeight = 600;
        const leftOffset = 29;
        const topOffset = -5;

        // Get the banner container
        const circSVG = document.getElementById("patternFrame");

        // Calculate the number of circles for each side, factoring in the gap
        const horizontalCount = 6;
        const verticalCount = 15;

        // Helper function to create a circle SVG
        function createCircle(id, color) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("circ");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("id", id);
        svg.style.width = `${circleSize}px`;
        svg.style.height = `${circleSize}px`;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "50");
        circle.setAttribute("fill", color);

        svg.appendChild(circle);
        return svg;
        }

        // Generate circles along each side with gaps and offset in clockwise order
        let counter = 1;
        const colors = ["#ccff33"]; // Colors for variety

        // Left side (bottom to top) with offset
        for (let i = 0; i < verticalCount; i++) {
        const circle = createCircle(`circle${counter++}`, colors[i % colors.length]);
        circle.style.bottom = `${topOffset + i * (circleSize + gap)}px`; // Reverse order for bottom to top
        circle.style.left = `-${offset}px`; // Push the circles slightly outside the banner
        circSVG.appendChild(circle);
        }

        // Top side (left to right) with offset
        for (let i = 0; i < horizontalCount; i++) {
        const circle = createCircle(`circle${counter++}`, colors[i % colors.length]);
        circle.style.top = `-${offset}px`; // Push the circles slightly outside the banner
        circle.style.left = `${leftOffset + i * (circleSize + gap)}px`;
        circSVG.appendChild(circle);
        }

        // Right side (top to bottom) with offset
        for (let i = 0; i < verticalCount; i++) {
        const circle = createCircle(`circle${counter++}`, colors[i % colors.length]);
        circle.style.top = `${topOffset + i * (circleSize + gap)}px`;
        circle.style.right = `-${offset}px`; // Push the circles slightly outside the banner
        circSVG.appendChild(circle);
        }

        // Bottom side (right to left) with offset
        for (let i = 0; i < horizontalCount; i++) {
        const circle = createCircle(`circle${counter++}`, colors[i % colors.length]);
        circle.style.bottom = `-${offset}px`; // Push the circles slightly outside the banner
        circle.style.left = `${leftOffset + (horizontalCount - i - 1) * (circleSize + gap)}px`; // Reverse order for right to left
        circSVG.appendChild(circle);
        }

        

        // Convert circles into paths for morphing
        gsap.utils.toArray(".circ circle").forEach((circle) => {
        MorphSVGPlugin.convertToPath(circle);
        });

        // Create a simple star path for morphing
        // const starPath = `<path id="star" d="M50,15 L61,35 H39 L50,15 Z" fill="none" stroke="none"/>`;
        const starPath = `<path id="star" fill="none" stroke="none" d="m17,0l3.85,9.75c.35.9.53,1.35.8,1.73.24.34.54.63.87.87.38.27.83.45,1.73.8l9.75,3.85-9.75,3.85c-.9.35-1.35.53-1.73.8-.34.24-.63.54-.87.87-.27.38-.45.83-.8,1.73l-3.85,9.75-3.85-9.75c-.35-.9-.53-1.35-.8-1.73-.24-.34-.54-.63-.87-.87-.38-.27-.83-.45-1.73-.8L0,17l9.75-3.85c.9-.35,1.35-.53,1.73-.8.34-.24.63-.54.87-.87.27-.38.45-.83.8-1.73L17,0Z"/>`;
        circSVG.innerHTML += starPath;
    },
    createPattern2: function() {
        const circleSize = 36; // Size of each circle
        const gap = 5; // Gap between the circles
        const offset = 12; // Offset to push the circles outside the banner
        const bannerWidth = 300;
        const bannerHeight = 600;
        const leftOffset = 29;
        const topOffset = -5;

        // Get the banner container
        const circSVG = document.getElementById("patternFrame");

        // Calculate the number of circles for each side, factoring in the gap
        const horizontalCount = 6;
        const verticalCount = 15;

        // Helper function to create a circle SVG
        function createCircle(id, color) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("circ2");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("id", id);
        svg.style.width = `${circleSize}px`;
        svg.style.height = `${circleSize}px`;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "50");
        circle.setAttribute("fill", color);

        svg.appendChild(circle);
        return svg;
        }

        // Generate circles along each side with gaps and offset in clockwise order
        let counter = 1;
        const colors = ["#ccff33"]; // Colors for variety

        // Left side (bottom to top) with offset
        for (let i = 0; i < verticalCount; i++) {
        const circle = createCircle(`circle_${counter++}`, colors[i % colors.length]);
        circle.style.bottom = `${topOffset + i * (circleSize + gap)}px`; // Reverse order for bottom to top
        circle.style.left = `-${offset}px`; // Push the circles slightly outside the banner
        circSVG.appendChild(circle);
        }

        // Top side (left to right) with offset
        for (let i = 0; i < horizontalCount; i++) {
        const circle = createCircle(`circle_${counter++}`, colors[i % colors.length]);
        circle.style.top = `-${offset}px`; // Push the circles slightly outside the banner
        circle.style.left = `${leftOffset + i * (circleSize + gap)}px`;
        circSVG.appendChild(circle);
        }

        // Right side (top to bottom) with offset
        for (let i = 0; i < verticalCount; i++) {
        const circle = createCircle(`circle_${counter++}`, colors[i % colors.length]);
        circle.style.top = `${topOffset + i * (circleSize + gap)}px`;
        circle.style.right = `-${offset}px`; // Push the circles slightly outside the banner
        circSVG.appendChild(circle);
        }

        // Bottom side (right to left) with offset
        for (let i = 0; i < horizontalCount; i++) {
        const circle = createCircle(`circle_${counter++}`, colors[i % colors.length]);
        circle.style.bottom = `-${offset}px`; // Push the circles slightly outside the banner
        circle.style.left = `${leftOffset + (horizontalCount - i - 1) * (circleSize + gap)}px`; // Reverse order for right to left
        circSVG.appendChild(circle);
        }

        

        // Convert circles intos paths for morphing
        gsap.utils.toArray(".circ2 circle").forEach((circle) => {
        MorphSVGPlugin.convertToPath(circle);
        });

        // Create a simple star path for morphing
        // const starPath = `<path id="star" d="M50,15 L61,35 H39 L50,15 Z" fill="none" stroke="none"/>`;
        const starPath = `<path id="star2" fill="none" stroke="none" d="m17,0l3.85,9.75c.35.9.53,1.35.8,1.73.24.34.54.63.87.87.38.27.83.45,1.73.8l9.75,3.85-9.75,3.85c-.9.35-1.35.53-1.73.8-.34.24-.63.54-.87.87-.27.38-.45.83-.8,1.73l-3.85,9.75-3.85-9.75c-.35-.9-.53-1.35-.8-1.73-.24-.34-.54-.63-.87-.87-.38-.27-.83-.45-1.73-.8L0,17l9.75-3.85c.9-.35,1.35-.53,1.73-.8.34-.24.63-.54.87-.87.27-.38.45-.83.8-1.73L17,0Z"/>`;
        circSVG.innerHTML += starPath;
    },
    createPattern3: function() {
        const circleSize = 36; // Size of each circle
        const gap = 5; // Gap between the circles
        const offset = 12; // Offset to push the circles outside the banner
        const bannerWidth = 300;
        const bannerHeight = 600;
        const leftOffset = 29;
        const topOffset = -5;

        // Get the banner container
        const circSVG = document.getElementById("patternFrame");

        // Calculate the number of circles for each side, factoring in the gap
        const horizontalCount = 6;
        const verticalCount = 15;

        // Helper function to create a circle SVG
        function createCircle(id, color) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("circ3");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("id", id);
        svg.style.width = `${circleSize}px`;
        svg.style.height = `${circleSize}px`;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "50");
        circle.setAttribute("fill", color);

        svg.appendChild(circle);
        return svg;
        }

        // Generate circles along each side with gaps and offset in clockwise order
        let counter = 1;
        const colors = ["#ccff33"]; // Colors for variety

        // Left side (bottom to top) with offset
        for (let i = 0; i < verticalCount; i++) {
        const circle = createCircle(`circle_g3_${counter++}`, colors[i % colors.length]);
        circle.style.bottom = `${topOffset + i * (circleSize + gap)}px`; // Reverse order for bottom to top
        circle.style.left = `-${offset}px`; // Push the circles slightly outside the banner
        circSVG.appendChild(circle);
        }

        // Top side (left to right) with offset
        for (let i = 0; i < horizontalCount; i++) {
        const circle = createCircle(`circle_g3_${counter++}`, colors[i % colors.length]);
        circle.style.top = `-${offset}px`; // Push the circles slightly outside the banner
        circle.style.left = `${leftOffset + i * (circleSize + gap)}px`;
        circSVG.appendChild(circle);
        }

        // Right side (top to bottom) with offset
        for (let i = 0; i < verticalCount; i++) {
        const circle = createCircle(`circle_g3_${counter++}`, colors[i % colors.length]);
        circle.style.top = `${topOffset + i * (circleSize + gap)}px`;
        circle.style.right = `-${offset}px`; // Push the circles slightly outside the banner
        circSVG.appendChild(circle);
        }

        // Bottom side (right to left) with offset
        for (let i = 0; i < horizontalCount; i++) {
        const circle = createCircle(`circle_g3_${counter++}`, colors[i % colors.length]);
        circle.style.bottom = `-${offset}px`; // Push the circles slightly outside the banner
        circle.style.left = `${leftOffset + (horizontalCount - i - 1) * (circleSize + gap)}px`; // Reverse order for right to left
        circSVG.appendChild(circle);
        }

        

        // Convert circles intos paths for morphing
        gsap.utils.toArray(".circ3 circle").forEach((circle) => {
        MorphSVGPlugin.convertToPath(circle);
        });

        // Create a simple star path for morphing
        // const starPath = `<path id="star" d="M50,15 L61,35 H39 L50,15 Z" fill="none" stroke="none"/>`;
        const starPath = `<path id="star3" fill="none" stroke="none" d="m17,0l3.85,9.75c.35.9.53,1.35.8,1.73.24.34.54.63.87.87.38.27.83.45,1.73.8l9.75,3.85-9.75,3.85c-.9.35-1.35.53-1.73.8-.34.24-.63.54-.87.87-.27.38-.45.83-.8,1.73l-3.85,9.75-3.85-9.75c-.35-.9-.53-1.35-.8-1.73-.24-.34-.54-.63-.87-.87-.38-.27-.83-.45-1.73-.8L0,17l9.75-3.85c.9-.35,1.35-.53,1.73-.8.34-.24.63-.54.87-.87.27-.38.45-.83.8-1.73L17,0Z"/>`;
        circSVG.innerHTML += starPath;
    },

    init: function() {
        Creative.createPattern();
        Creative.createPattern2();
        Creative.createPattern3();
        if(h1Eyebrow.length != "0"){
            h1Frame = h1Frame + "#h1Eyebrow";
        }
        if(h2Heading.length != "0"){
            h2Frame = h2Frame + "#h2Eyebrow";
        }
        if(h3Eyebrow.length != "0"){
            h3Frame = h3Frame + "#h3Eyebrow";
        }
        if(h4Eyebrow.length != "0"){
            h4Frame = h4Frame + "#h4Eyebrow";
        }

        if(heading1.length != "0"){
            h1Frame = h1Frame + ", #heading1 .splitted-container";
        }
        if(heading2.length != "0"){
            h2Frame = h2Frame + ", #heading2 .splitted-container";
        }
        if(heading3.length != "0"){
            h3Frame = h3Frame + ", #heading3 .splitted-container";
        }
        if(heading4.length != "0"){
            h4Frame = h4Frame + ", #heading4 .splitted-container";
        }
        Creative.splitLines(["h1Heading","h2Heading", "h3Heading", "h4Heading"]);
        
        Creative.tl.addLabel("reset", 0)
        .set("#heading1, #heading2, #heading3, #heading4",{autoAlpha:0})
        .set("#h1SubHead, #h2SubHead, #h3SubHead, #h4SubHead",{autoAlpha:0})
        .set("#disclaimerBtn, #topLogo, #botLogo",{autoAlpha:0})
        .set("#h1deviceLogo, #h1device, #h2deviceLogo, #h2device, #h3deviceLogo, #h3device, #h4deviceLogo, #h4device, #disclaimerContainer, #closeBtn",{autoAlpha:0})
        
        
        //------------------------------- FRAME1 IN -------------------------------
        Creative.tl.addLabel("frame1","+=0.0")
        
        if(frameOption[0] != "off"){
            if(frameOption[0] == "text"){
                if(stLogoOption[0] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1,onStart:function(){
                        BGLoop();
                    }},"frame1")
                }
                Creative.tl.to("#heading1", 0.1,{autoAlpha: 1},"frame1")
                    .from(h1Frame, 0.5,{autoAlpha: 0, ease: "power2.in", onComplete:function(){
                        Creative.tl.to("#h1SubHead", 0.5,{autoAlpha: 1, ease: "power2.in"},"frame1+=2.5")
                    }},"frame1")
            }
            if(frameOption[0] == "image"){
                if(stLogoOption[0] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame1-=0.3")
                }
                Creative.tl.to("#h1deviceLogo, #h1device", 0.8,{autoAlpha: 1, ease: "power2.in"},"frame1-=0.3")
            } 

            //------------------------------- FRAME1 OUT -------------------------------
            Creative.tl.addLabel("frame1out","+="+frameDuration[0])
                if(frameOption[0] == "text"){
                    Creative.tl.to("#heading1", 0.5,{autoAlpha: 0},"frame1out")
                    if(frameOption[1] == "image"){
                    }
                }
                if(stLogoOption[1] == "off" && frameOption[1] != "off"){
                    Creative.tl.to("#botLogo", 0.5,{autoAlpha: 0},"frame1out")
                }else if(stLogoOption[2] == "off" && frameOption[2] != "off"){
                    Creative.tl.to("#botLogo", 0.5,{autoAlpha: 0},"frame1out")
                }else if(stLogoOption[3] == "off" && frameOption[3] != "off"){
                    Creative.tl.to("#botLogo", 0.5,{autoAlpha: 0},"frame1out")
                }
                if(frameOption[0] == "image"){
                    Creative.tl.to("#h1deviceLogo, #h1device", 0.5,{autoAlpha: 0, ease: "power2.in"},"frame1out")
                } 
        }
        
        
        
        //------------------------------- FRAME2 IN -------------------------------
        Creative.tl.addLabel("frame2","-=0.1")
        if(frameOption[1] != "off"){
            if(frameOption[1] == "text"){
                if(stLogoOption[1] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame2")
                }
                Creative.tl.to("#heading2", 0.1,{autoAlpha: 1},"frame2")
                Creative.tl.from(h2Frame, 0.5,{autoAlpha: 0, ease: "power2.in"},"frame2")
                Creative.tl.to("#h2SubHead", 0.5,{autoAlpha: 1, ease: "power2.in"},"frame2")
            }
            if(frameOption[1] == "image"){
                if(stLogoOption[1] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame2-=0.3")
                }
                Creative.tl.to("#h2deviceLogo, #h2device", 0.8,{autoAlpha: 1, ease: "power2.in"},"frame2-=0.3")
            } 
            if(frameOption[1] == "mixed"){
                if(stLogoOption[1] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame2-=0.3")
                }
                Creative.tl.to("#heading2", 0.1,{autoAlpha: 1},"frame2")
                Creative.tl.from(h2Frame, 0.5,{autoAlpha: 0, ease: "power2.in"},"frame2")
                Creative.tl.to("#h2SubHead", 0.5,{autoAlpha: 1, ease: "power2.in"},"frame2")
                Creative.tl.to("#h2deviceLogo, #h2device", 0.8,{autoAlpha: 1, ease: "power2.in"},"frame2-=0.3")
            } 

            //------------------------------- FRAME2 OUT -------------------------------
            Creative.tl.addLabel("frame2out","+="+frameDuration[1])
                if(frameOption[1] == "text"){
                    Creative.tl.to("#heading2", 0.5,{autoAlpha: 0},"frame2out")
                    if(frameOption[2] == "image"){
                    }
                }
                if(stLogoOption[2] == "off" && frameOption[2] != "off"){
                    Creative.tl.to("#botLogo", 0.5,{autoAlpha: 0},"frame2out")
                }else if(stLogoOption[3] == "off" && frameOption[3] != "off"){
                    Creative.tl.to("#botLogo", 0.5,{autoAlpha: 0},"frame2out")
                }
                if(frameOption[1] == "image"){
                    Creative.tl.to("#h2deviceLogo, #h2device", 0.5,{autoAlpha: 0, ease: "power2.in"},"frame2out")
                } 
                if(frameOption[1] == "mixed"){
                    Creative.tl.to("#heading2", 0.5,{autoAlpha: 0},"frame2out")
                    Creative.tl.to("#h2deviceLogo, #h2device", 0.5,{autoAlpha: 0, ease: "power2.in"},"frame2out")
                } 
        }
        
        
        
        //------------------------------- FRAME3 IN -------------------------------
        Creative.tl.addLabel("frame3","+=0.0")
        if(frameOption[2] != "off"){
            if(frameOption[2] == "text"){
                if(stLogoOption[2] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame3")
                }
                Creative.tl.to("#heading3", 0.1,{autoAlpha: 1},"frame3")
                Creative.tl.from(h3Frame, 0.5,{autoAlpha: 0, ease: "power2.in"},"frame3")
                Creative.tl.to("#h3SubHead", 0.5,{autoAlpha: 1, ease: "power2.in"},"frame3")
            }
            if(frameOption[2] == "image"){
                if(stLogoOption[2] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame3-=0.3")
                }
                Creative.tl.to("#h3deviceLogo, #h3device", 0.8,{autoAlpha: 1, ease: "power2.in"},"frame3-=0.3")
            } 

            //------------------------------- FRAME3 OUT -------------------------------
            Creative.tl.addLabel("frame3out","+="+frameDuration[2])
                if(frameOption[2] == "text"){
                    Creative.tl.to("#heading3", 0.5,{autoAlpha: 0},"frame3out")
                    if(frameOption[3] == "image"){       
                    }
                }
                if(stLogoOption[3] == "off" && frameOption[3] != "off"){
                    Creative.tl.to("#botLogo", 0.5,{autoAlpha: 0},"frame2out")
                }
                if(frameOption[2] == "image"){
                    Creative.tl.to("#h3deviceLogo, #h3device", 0.5,{autoAlpha: 0, ease: "power2.in"},"frame3out")
                } 
        }
        
        
        
        //------------------------------- FRAME4 IN -------------------------------
        Creative.tl.addLabel("frame4","+=0.0")
        if(frameOption[3] != "off"){
            if(frameOption[3] == "text"){
                if(stLogoOption[3] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame4")
                }
                Creative.tl.to("#heading4, #topLogo, #disclaimerBtn", 0.1,{autoAlpha: 1},"frame4")
                Creative.tl.from(h4Frame, 0.5,{autoAlpha: 0, ease: "power2.in"},"frame4")
                Creative.tl.to("#h4SubHead", 0.5,{autoAlpha: 1, ease: "power2.in"},"frame4")
                    
            }
            if(frameOption[3] == "image"){
                if(stLogoOption[3] != "off"){
                    Creative.tl.to("#botLogo", 0.1,{autoAlpha: 1},"frame4-=0.3")
                }
                Creative.tl.to("#h4deviceLogo, #h4device", 0.8,{autoAlpha: 1, ease: "power2.in"},"frame4-=0.3")
            } 
        }
        console.log( Creative.tl.duration() )
        console.log( Creative.tl.time() )
    }
};

function getById(eleID) {
    return document.getElementById(eleID);
}