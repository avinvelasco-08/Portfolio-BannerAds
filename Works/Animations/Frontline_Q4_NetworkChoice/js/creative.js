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
var verticalText = getById("verticalText")
var container = getById("main");
var loadingContent = getById("loading_content");

// Tooltip opacity
var isVisible = false;

// Tooltip Hotspot Checker
var hotspotCreated = false;

// split array
var splittedLines = [],
    splittedChars = [],
    splittedWords = [];

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
        // console.log("Creative.onBannerStart()");
        if (hotspotCreated) {
            gsap.set("#hotspot", {
                autoAlpha: 0
            }, "reset")
        }
    },

    onBannerComplete: function() {
        // console.log("Creative.onBannerComplete()");
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
        
        /**** CONFIGURATION ****/
        var adSizeMeta = document.querySelector('meta[name="ad.size"]');
        /**** CONFIGURATION ****/
        
        
        if (adSizeMeta) {
            var [width, height] = adSizeMeta.content.split(",").map(size => size.replace(/(width=|height=)/, '').trim());
            getById("main").style.setProperty('--ad-width', `${width}px`);
            getById("main").style.setProperty('--ad-height', `${height}px`);
            
            switch (width) {
              case "160":
                getById("headingFrame").style.setProperty('padding', '0px 5px 14px 5px');
                break;
              default:
                getById("headingFrame").style.setProperty('padding', '0 0 15px 0');
                break;
            }
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
    
    bgGridAnim: function(frame,anim){
        switch(frame) {
        case 1:
            if(anim=="in"){
                gsap.set("#gridF1-top", {autoAlpha:1})
                gsap.from("#gridF1-top",0.6,{
                    x:145, 
                    ease:"power3.out",
                    // fromX: "-100%",
                    // toX: "0%",
                    // exitX: "100%",
                    // inDuration: 0.7,
                    // outDuration: 0.6,
                    // inEase: "power3.out",
                    // outEase: "power3.in"
                });
            }else{
                gsap.to("#gridF1-top",1,{x:-350, ease:"power3.in"});
            }
            break;
        case 2:
            if(anim=="in"){
                gsap.set("#gridF2-bot", {autoAlpha:1})
                gsap.from("#gridF2-bot",0.5,{x:145, ease:"power3.out"});
            }else{
                gsap.to("#gridF1-top",1,{x:-600, ease:"power3.in"});
                gsap.to("#gridF2-bot",1,{x:-600, ease:"power3.in"});
                
            }
            break;
        case 3:
            if(anim=="in"){
                gsap.set("#gridF3-left", {autoAlpha:1})
                gsap.set("#gridF3-right", {autoAlpha:1})
                gsap.from(["#gridF3-left","#gridF3-right"],0.8,{x:145, ease:"power3.out"});
            }else{
                gsap.to(["#gridF3-left","#gridF3-right"],0.9,{x:-540, ease:"power3.in"});
            }
            break;
        case 4:
            if(anim=="in"){
                gsap.set("#gridF4", {autoAlpha:1})
                gsap.from("#gridF4",0.8,{x:145, ease:"power3.out"});
            }else{
                gsap.to("#gridF3-right",0.5,{x:-740, ease:"power3.in"});
                gsap.to("#gridF4",1,{x:-634, ease:"power3.in"});
            }
            break;
        
        case 5:
            if(anim=="in"){
            }else{
                gsap.to("#gridF4",0.6,{x:-1266, ease:"power3.in"});
            }
            break;
         case 6:
            if(anim=="in"){
            }else{
                gsap.to("#gridF4",0.6,{x:-1466, ease:"power3.in"});
            }
            break;
         case 7:
                gsap.set("#gridF7-top", {autoAlpha:1})
                gsap.set("#gridF7-bot", {autoAlpha:1})
                gsap.from("#gridF7-top",0.8,{x:325, ease:"power3.out"});
                gsap.from("#gridF7-bot",0.8,{x:-160, ease:"power3.out"});
          
            break;
        default:
            // code block
        }
    },
    
    init: function() {
        Creative.splitLines(["h1Heading","h4Heading","h5Heading","h7Heading"]);
        Creative.splitChars(["h1Heading","h2Number","h4Heading","h7Heading"]); 
        
        let digits = _dynamicData.h2Number.toString().split('').map(char => {
            let num = parseInt(char, 10);
            return num === 0 ? 10 : num;
        });
        let multiplier = 78; // height of the individual number div
        const digitContainerIds = [
            'fifthDigitCont',
            'fourthDigitCont',
            'thirdDigitCont',
            'secondDigitCont',
            'firstDigitCont'
        ];
        
        //Creative.bgBackground();

        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .set("#main", {autoAlpha:1}, "reset")
        .set("#h6Heading", {autoAlpha:0}, "reset")

        .set("#gridF1-top", {autoAlpha:0}, "reset")
        .set("#gridF2-bot", {autoAlpha:0}, "reset")
        .set("#gridF3-left", {autoAlpha:0}, "reset")
        .set("#gridF3-right", {autoAlpha:0}, "reset")
        .set("#gridF4", {autoAlpha:0}, "reset")
        .set("#gridF7-top", {autoAlpha:0}, "reset")
        .set("#gridF7-bot", {autoAlpha:0}, "reset")
        
        //-------- F1 IN -------------------------------
        .addLabel("frame1")

        .set("#logoBottomMask", {x:-1}, "frame1")

        .from("#logoTop", 0.3, {width: "80%", ease: "power3.out"}, "frame1")
        .from("#logoTopSVG", 0.3, {x: 12, ease: "power3.out"}, "frame1")
        .from("#logoBottomMask", 0.5, {height: 0, ease: "power3.out"}, "frame1+=0.5")

        .from("#h1Heading .splitted-container:nth-child(1)", 0.25, {x:20, ease: "power2.out"}, "frame1")
        .from("#h1Heading .splitted-container:nth-child(1) div", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame1")
        .from("#h1Heading .splitted-container:nth-child(2)", 0.25, {x:120, ease: "power2.out"}, "frame1+=0.25")
        .from("#h1Heading .splitted-container:nth-child(2) div", 0.0001, {opacity:0, stagger: 0.02, ease: "power4.out"}, "frame1+=0.25")

        .set("#gridF1-top", {autoAlpha:1}, "frame1")
        .from("#gridF1-top",0.6,{x:145, ease:"power3.out"}, "frame1")
        .to("#gridF1-top",1,{x:-10, ease:"linear"}, "frame1+=0.55")

            //F1 OUT
            .addLabel("frame1Out","-=0.05")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")
            .to("#h1Heading", 0.4, {x:-300, ease: "power3.in"}, "frame1Out")
            .to(["#logoTop","#logoBottom"], 0.4, {x:-300, ease: "power3.in"}, "frame1Out")
            .fromTo("#logoContainer", 0.4, {clipPath:"polygon(0% 0, 100% 0, 100% 100%, 0% 100%)"}, {clipPath:"polygon(25% 0, 100% 0, 100% 100%, 25% 100%)", ease: "power3.in"}, "frame1Out-=0.1")
            .to("#gridF1-top",1,{x:-350, ease:"power2.inOut"}, "frame1Out-=0.2")
            .to("#gridF1-top",2,{x:"-=17", ease:"linear"}, "frame1Out+=0.75")
            
        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=2.4")
        .from("#heading2", 0.5, {x:300, ease: "power3.out"}, "frame2")
        for (let i = digits.length - 1, containerIndex = 0; i >= 0 && containerIndex < digitContainerIds.length; i--, containerIndex++) {
            let digitValue = (digits[i]+1);
            let containerId = digitContainerIds[containerIndex];
            Creative.tl.to(`#${containerId}`, 2, {y:-(multiplier*digitValue), ease: "power3.out"}, `frame2+=${0.05*containerIndex}`)
        }
        Creative.tl.from("#commaCont", 0.5, {y:"150%", ease: "power3.out"}, "frame2+=0.9")
        .set("#gridF2-bot", {autoAlpha:1}, "frame2-=0.2")
        .from("#gridF2-bot",0.6,{x:145, ease:"power3.out"}, "frame2-=0.2")
        .to("#gridF2-bot",2,{x:-25, ease:"linear"}, "frame2+=0.25")

            //F2 OUT
            .addLabel("frame2Out")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out")
            .to("#h2NumberCont", 0.4, {x:-300, ease: "power3.in"}, "frame2Out")
            .to("#h2Heading", 0.4, {x:-300, ease: "power3.in"}, "frame2Out+=0.05")
            .to("#gridF1-top",1,{x:-600, ease:"power3.in"}, "frame2Out-=0.5")
            .to("#gridF2-bot",1,{x:-600, ease:"power3.in"}, "frame2Out-=0.475")

        //-------- F3 IN -------------------------------
        .addLabel("frame3", "-=0.25")
        .from("#h3Heading", 1, {x:750, ease: "power3.out"}, "frame3")
        .from("#h3Heading div", 0.0001, {opacity:0, ease: "power4.out"}, "frame3")

        .set("#gridF3-left", {autoAlpha:1}, "frame3")
        .set("#gridF3-right", {autoAlpha:1}, "frame3")
        .from(["#gridF3-left","#gridF3-right"],1,{x:750, ease:"power3.out"}, "frame3")

        .to(["#h3Heading","#gridF3-left","#gridF3-right"],1.3,{x:"-=15", ease:"linear"}, "frame3+=0.7")

            //F3 OUT
            .addLabel("frame3Out", "-=0.35")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out")
            .to(["#h3Heading","#gridF3-left","#gridF3-right"],1,{x:-560, ease:"power3.inOut"}, "frame3Out")
            .to(["#h3Heading","#gridF3-left","#gridF3-right"],1.3,{x:"-=20", ease:"linear"}, "frame3Out+=0.9")

        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=1.4")
        .set("#h4Heading", {scale: 0.7}, "frame4")
        .from("#h4Heading .splitted-container:nth-child(1)", 0.25, {x:20, ease: "power2.out"}, "frame4")
        .from("#h4Heading .splitted-container:nth-child(1) div", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame4")

        .from("#h4Heading .splitted-container:nth-child(2)", 0.25, {x:-20, ease: "power2.out"}, "frame4")
        .from("#h4Heading .splitted-container:nth-child(2) div", 0.0001, {opacity:0, stagger: -0.02, ease: "power4.out"}, "frame4")
        .to("#h4Heading",0.3,{scale:1}, "frame4+=0.3")

        .set("#gridF4", {autoAlpha:1}, "frame4-=0.15")
        .from("#gridF4",0.8,{x:145, ease:"power3.out"}, "frame4-=0.15")
        .to("#gridF4",1,{x:"-=15", ease:"linear"}, "frame4+=0.6")

            //F4 OUT
            .addLabel("frame4Out", "-=0.4")
            .add(() => LogFrameTimeStamp("Frame 4"), "frame4Out")
            .to("#h4Heading", 0.5, {x:-350, ease: "power3.in"}, "frame4Out+=0.05")
            .to("#gridF3-right",0.5,{x:-740, ease:"power3.in"}, "frame4Out")
            .to("#gridF4",1,{x:-610, ease:"power3.in"}, "frame4Out-=0.1")
            .to("#gridF4",1.5,{x:"-=25", ease:"linear"}, "frame4Out+=0.95")

        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=1.5")
        .from("#h5Heading .splitted-container:nth-child(1)", 0.35, {x:250, ease: "power4.out"}, "frame5")
        .from("#h5Heading .splitted-container:nth-child(1)", 0.0001, {opacity:0, ease: "power4.out"}, "frame5")
        .from("#h5Heading .splitted-container:nth-child(2)", 0.35, {x:250, ease: "power4.out"}, "frame5+=0.05")
        .from("#h5Heading .splitted-container:nth-child(2)", 0.0001, {opacity:0, ease: "power4.out"}, "frame5+=0.05")

            //F5 OUT
            .addLabel("frame5Out-=0.2")
            .add(() => LogFrameTimeStamp("Frame 5"), "frame5Out")
            .to("#h5Heading .splitted-container:nth-child(1)", 0.5, {x:-300, ease: "power4.in"}, "frame5Out+=0.1")
            .to("#h5Heading .splitted-container:nth-child(2)", 0.5, {x:-300, ease: "power4.in"}, "frame5Out")
            .to("#gridF4",0.9,{x:-1266, ease:"power3.in"}, "frame5Out")
            .to("#gridF4",0.9,{x:"-=15", ease:"linear"}, "frame5Out+=1")

        //-------- F6 IN -------------------------------
        .addLabel("frame6","-=1.1")
        .set("#h6Heading",{autoAlpha:1}, "frame6")
        .from("#h6Heading",0.2,{scale:6, ease:"power4.in"}, "frame6-=0.1")

            //F6 OUT
            .addLabel("frame6Out","-=0.1")
            .add(() => LogFrameTimeStamp("Frame 6"), "frame6Out")
            .to("#h6Heading", 0.75, {x:-300, ease: "power3.in"}, "frame6Out")
            .to("#gridF4",0.75,{x:-1466, ease:"power3.in"}, "frame6Out")
            

        .addLabel("frame7")
        .set("#h7Heading", {autoAlpha:1}, "frame7")
        .set(["#logoTop","#logoBottom"], {x:0,opacity:0,width: "80%"}, "frame7") 
        .set("#logoTopSVG", {x:12}, "frame7")
        .set("#logoBottomMask", {height:0,x:16}, "frame7")
        .set("#logoContainer", {clipPath:"polygon(0% 0, 100% 0, 100% 100%, 0% 100%)"})

        .from("#h7Heading .splitted-container:nth-child(1)", 0.15, {x:50, ease: "power2.out"}, "frame7")
        .from("#h7Heading .splitted-container:nth-child(1) div", 0.0001, {opacity:0, stagger: 0.01, ease: "power4.out"}, "frame7")

        .from("#h7Heading .splitted-container:nth-child(2)", 0.15, {x:50, ease: "power2.out"}, "frame7+=0.15")
        .from("#h7Heading .splitted-container:nth-child(2) div", 0.0001, {opacity:0, stagger: 0.01, ease: "power4.out"}, "frame7+=0.15")

        .from("#h7Heading .splitted-container:nth-child(3)", 0.15, {x:50, ease: "power2.out"}, "frame7+=0.30")
        .from("#h7Heading .splitted-container:nth-child(3) div", 0.0001, {opacity:0, stagger: 0.01, ease: "power4.out"}, "frame7+=0.30")

        .from("#h7LegalSubhead", { duration: 0.5, autoAlpha: 0, ease: "power4.out"},"frame7+=0.5")

        .set("#gridF7-top", {autoAlpha:1}, "frame7-=0.3")
        .set("#gridF7-bot", {autoAlpha:1}, "frame7+=0.15")
        .from("#gridF7-top",1,{x:450, ease:"power3.out"}, "frame7-=0.3")
        .from("#gridF7-bot",0.7,{x:-400, ease:"power2.out"}, "frame7+=0.15")

        .set(["#logoTop","#logoBottom"], {opacity:1}, "frame7+=0.7")   
        .to("#logoTop", 0.3, {width: "100%", ease: "power3.out"}, "frame7+=0.7")
        .to("#logoTopSVG", 0.3, {x: 0, ease: "power3.out"}, "frame7+=0.7")
        .to("#logoBottomMask", 0.5, {height: 11, ease: "power3.out"}, "frame7+=1.3")

        .from("#arrowOnly", 0.01, {autoAlpha: 0}, "frame7+=0.6")
        .from("#arrowOnly", 0.3, {x:-40}, "frame7+=0.6")
        .add(() => LogFrameTimeStamp("Frame 7"), ">")

		console.log("Total Ad Duration = ", Creative.tl.duration() )
    }
};

function LogFrameTimeStamp(name) {
    const diff = Creative.tl.time();
    // captureScreenshot();
    console.log(`${name}:`, diff+"sec");
}

// Function to capture the screenshot
function captureScreenshot() {
    html2canvas(document.querySelector("#main")).then(canvas => {
      const img = canvas.toDataURL("image/png");
      // Trigger download of the captured image
      downloadImage(img);
    });
}

// Function to download the image
function downloadImage(imgSrc) {
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = "screenshot.png";  // Set the download filename
    link.click();  // Programmatically click the link to start the download
}

function getById(eleID) {
    return document.getElementById(eleID);
}

