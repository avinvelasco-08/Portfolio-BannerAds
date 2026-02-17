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
        var legal = "inner";
        var exposedlegal = getById("legalContainerInner").innerHTML;
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
                getById("headingFrame").style.setProperty('padding', '0 15px 14px 15px');
                break;
            }
        }
        
        switch (legal) {
          case "inner":
            getById("legalContainerInner").style.setProperty('display', 'flex');
            break;
          case "wide":
            getById("legalContainerWide").style.setProperty('display', 'flex');
            break;
          default:
            getById("legalContainerWide").style.setProperty('display', 'none');
        }
        
        getById("legalContainerWide").innerHTML = exposedlegal;

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
    durationFrame: function(Frame){
            console.log(Frame + ": "+Creative.tl.time()+"sec");
        //,onComplete:function(){Creative.durationFrame("frame1Out");}
        },
    whatBrowser: function() {
       var BrowserType;
       (function (BrowserType) {
           BrowserType["OPERA"] = "Opera";
           BrowserType["OPERA2"] = "OPR";
           BrowserType["EDGE"] = "Edg";
           BrowserType["CHROME"] = "Chrome";
           BrowserType["SAFARI"] = "Safari";
           BrowserType["FIREFOX"] = "Firefox";
           BrowserType["UNKNOWN"] = "unknown";
       })(BrowserType || (BrowserType = {}));
  
       // Detect browser function
       const detectBrowser = () => {
           const detected = Object.values(BrowserType).find((browser) => navigator.userAgent.indexOf(browser) !== -1);
           return detected || BrowserType.UNKNOWN; // Return the detected browser or "unknown" if not found
       };
  
       // Return the result of the browser detection
       return detectBrowser();  // Call and return the detected browser
    },
    
    
    init: function() {
        const circle = document.querySelector("#progressCircle");
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
        Creative.splitChars(["h4Heading"]);
        Creative.splitLines(["h1Heading"]);
        Creative.splitChars(["h2Heading"]);
        Creative.splitLines(["h3Heading"]);
        Creative.splitLines(["h4Heading"]);
        Creative.splitLines(["h5Heading"]);
        Creative.splitLines(["endFrameHeading"]);

        
        
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha: 1}, "reset")
        // .set("#h4HeadingB div", {opacity: 0}, "reset")
        .set("#ctaArrow", {autoAlpha: 0, x: -77}, "reset")
        .set(["#circleFrame, #innerCircleLine1, #innerCircleLine2"], {opacity: 0}, "reset")
        .set(["#h2Heading, #h3Heading, #heading4, #heading5", "#endFrameHeading", "#endFrame"], {opacity: 0}, "reset")
        
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        .from("#h1Heading .splitted-container", 0.3, {y:"20", stagger:0.08, ease:"expo.out", force3D: false, rotation:0.001},"frame1+=0.25")
        .from("#h1Heading .splitted-container", 0.001, {opacity:0, stagger:0.08, ease:"power4.out"},"frame1+=0.25")

        .from("#logo path", 0.001, {opacity: 0, stagger: -0.03, ease: "power4.out"}, "frame1+=0.4")
        .from("#logo", 1, {scale: 0.85, ease: "power4.out"}, "frame1+=0.4")

            //F1 OUT
            .addLabel("frame1Out","-=0.5")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")

            .to("#h1Heading",0.5,{scale:.6, ease:"power4.out"},"frame1Out+=0.5")
            .to("#h1Heading",0.1,{opacity:0, ease:"power4.out"},"frame1Out+=0.6")
            .to("#logo path", 0.01, {opacity:0, ease:"power4.out"},"frame1Out+=0.6") 
            
        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.4")
        .to('#circleFrame', 0.001, {opacity: 1}, "frame2")
        .from(['#innerRedBG, #h2Heading, #circleLine'], 0.8, {scale: 1.25, ease: "power2.out"}, "frame2")
        .to(circle, {strokeDashoffset: 0, duration: .5, ease: "power1.out"}, "frame2+=0.2")
        .to("#h2Heading",0.1,{ opacity:1, ease:"power4.out"},"frame2+=0.1")
        .from("#h2Heading div", 0.05, {opacity:0, stagger: 0.05}, "frame2+=0.1")
       
        .to('#innerRedBG', 0.2, {scale: 1.3, ease: "power2.out"}, "frame2+=0.9")
        // .to('#innerCircleLine1', 0.25, {rotation: "30", opacity: 1, ease: "power2.out"}, "frame2+=0.9")
        .to("#h2Heading", 0.35,{ color: '#F5FF1E', ease:"power4.out"},"frame2+=0.75")
        // .to('#innerCircleLine2', 0.25, {rotation: "30",  opacity: 1, ease: "power2.out"}, "frame2+=1.15")

        .from("#f2-circle-white-wrp, #f2-circle-yellow-wrp",0.5,{scale:0.4, ease:"power4.out", stagger:0.2},"frame2+=0.4")
        .to(".f2-circles",0.001,{opacity:1},"frame2+=1") /* <--- snap anim in */
        .to("#f2-circle-white",2.5,{rotate:-360, ease:"none"},"frame2+=1.05")
        .to("#f2-circle-yellow",2.5,{rotate:360, ease:"none"},"frame2+=1.05")
        //   .addPause()
            //F2 OUT
            .addLabel("frame2Out","-=2")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out")
            // .to('#f2Circle', 0.9, {scale: 1.9, ease: "power2.out"}, "frame2Out+=0.05")
            // .to(['#innerCircleLine1', "#innerCircleLine2"], 0.45, {opacity: 0, ease: "power2.out"}, "frame2Out+=0.15")
            .to(["#f2Circle, #f2-circle-yellow-wrp", "#f2-circle-white-wrp"],1.2,{scale:3, ease:"power4.inOut", stagger:0.02, force3D: false},"frame2Out+=0.05")
            .to(["#f2-circle-yellow-wrp", "#f2-circle-white-wrp"],1.2,{opacity:0, ease:"power4.out"},"frame2Out+=0.2")
            .to("#h2Heading", 0.5,{ y: -50, ease:"power3.in"},"frame2Out+=0.05")
            .set("#h2Heading",{ opacity: 0},"frame2Out+=0.55")

        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=1.2")
        // .set("#h2Heading",{opacity:0},"frame3-=0.25")
        .set("#h3Heading",{opacity:1},"frame3-=0.25")
        .from("#h3Heading .splitted-container",0.3,{y:"20", stagger:0.08, ease:"power4.out", force3D: false, rotation:0.001},"frame3")
        .from("#h3Heading .splitted-container",0.001,{opacity:0, stagger:0.08, ease:"power4.out"},"frame3")
        
                //F3 OUT
                .addLabel("frame3Out","-=0.6") 
                .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out")
                .set("#h3Heading", {overflow: "hidden"},"frame3Out")
                .to("#h3Heading .splitted-container:nth-child(1)",0.5,{y:"-30", stagger:0.08, ease:"power4.in", force3D: false, rotation:0.001},"frame3Out+=0.4")
                .to("#h3Heading .splitted-container:nth-child(2)",0.5,{y:"30", stagger:0.08, ease:"power4.in", force3D: false, rotation:0.001},"frame3Out+=0.4")
                // frame 3 background masking
                .to("#h3HeadingTopRect",0.3,{clipPath:'polygon(0% 0%, 100% 0, 100% 100%, 0 100%)', ease: 'power1.out'},"frame3Out+=1")
                .to("#h3HeadingBotRect",0.3,{clipPath:'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)', ease: 'power1.out'},"frame3Out+=1")


        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=0.28")
        .set("#heading4", {opacity: 1}, "frame4")
        .from("#h4Heading .splitted-container:nth-child(1)",0.5,{x:-300, ease: 'power3.out'},"frame4")
        .from("#h4Heading .splitted-container:nth-child(2)",0.5,{x:300, ease: 'power3.out'},"frame4")
        .from("#heading4 .topLine",0.35,{x:-300, stagger:-0.08, ease: 'power1.out'},"frame4-=0.1")
        .from("#heading4 .bottomLine",0.35,{x:300, stagger:0.08, ease: 'power1.out'},"frame4-=0.1")
      
                //F4 OUT
                .addLabel("frame4Out","+=0.5")
                .add(() => LogFrameTimeStamp("Frame 4"), "frame4Out-=0.5") 
                // .set("#h4HeadingB", {opacity: 1}, "frame4Out")
                
                .set("#h4Heading .splitted-container:nth-child(1) div, #h4Heading .splitted-container:nth-child(2) div", {color:"#E10014", stagger: 0.02}, "frame4Out-=0.4")
                .to(["#h4Heading"], 0.6, {scale: 0.4, ease: 'power2.in'}, "frame4Out+=0.4")
                .to("#heading4 .topLine",0.4,{x:-200, stagger:-0.08, ease: 'power1.out'},"frame4Out+=0.5")
                .to("#heading4 .bottomLine",0.4,{x:200, stagger:0.08, ease: 'power1.out'},"frame4Out+=0.5")
                // .to(["#h4Heading"], 0.1, {opacity: 0}, "frame4Out+=0.7")
               
        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=0.15")
        .set("#heading5", {opacity: 1}, "frame5")
        .set("#heading4", {opacity: 0}, "frame5")
        .from("#heading5", 0.5, {scale: 1.4, ease: 'power1.out'}, "frame5")

            //F5 OUT
            .addLabel("frame5Out","+=0.7")
            .add(() => LogFrameTimeStamp("Frame 5"), "frame5Out-=0.7") 
            .to("#heading5 .splitted-container", 0.5, {x: 300, stagger: 0.025, ease: 'power1.out'}, "frame5Out")
            
        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.5")
        .set("#endFrame", {opacity: 1}, "endFrame")
        .from("#endFrame", 0.5, {x: -300, ease: 'power1.out'}, "endFrame")
        .set("#endFrameHeading", {opacity: 1}, "endFrame+=0.25")
        .from("#endFrameHeading  .splitted-container", 0.5, {x: -300, stagger: 0.08, ease: 'power1.out'}, "endFrame+=0.25")
        .to("textcolor", 0.3, {color: '#F5FF1E', ease: 'power1.out'}, "endFrame+=1.15") 
        

        // .from("#endFrameLegalSubheading",0.5,{opacity:0, ease:"power4.out", onComplete: function() {
        //     /* ENABLE HOTSPOT */
        //     LogFrameTimeStamp("Frame 4");
        //     if(getById('underlinedText') !== null){
        //     Creative.addTooltip();
        //     gsap.set("#hotspot", { autoAlpha: 1 });
        //     }else{
        //     gsap.set("#hotspot", { autoAlpha: 1 }); 
        //     }
        //     /* END ENABLE HOTSPOT */
        // }},"endFrame+=0.45") 
        
         // CTA
         Creative.tl.addLabel("ctaEndFrame","-=0.85")
         .set("#ctaContainer", {display:"flex", autoAlpha:1},"ctaEndFrame") 
         .set(".logo-fill", {fill: '#F8F3E9'},"ctaEndFrame") 
        
         
         .set("#ctaMask", {opacity:1, clipPath: "polygon(0% 0%, 21.16% 0%, 25.56% 50.46%, 21.29% 100%, 0% 100%)"}, "ctaEndFrame")

        .to("#logo path", 0.001, {opacity: 1, stagger: -0.03, ease: "power3.out"}, "ctaEndFrame")
        .fromTo("#logo", 1, { scale: 0.85 }, { scale: 1, ease: "power3.out" }, "ctaEndFrame")

        .set("#ctaArrowOnly", {autoAlpha: 1},"ctaEndFrame")
        .from("#ctaArrowOnly",0.7, {xPercent: -100, ease:'power4.out'},"ctaEndFrame")
        
        //  .to("#ctaMask", 0.4,{clipPath: "polygon(0% 0%, 89% 0%, 92.75% 55.25%, 89% 100%, 0% 100%)", ease:"linear:EaseNone"}, "ctaEndFrame+=0")
        //  .to("#ctaArrow", 0.001,{autoAlpha:1}, "ctaEndFrame+=0.11")
        //  .to("#ctaArrow", 0.33,{x:0, ease:"linear:EaseNone"}, "ctaEndFrame+=0.11")
       
        Creative.tl.add(() => {
        

          
        }, "ctaEndFrame+=0.11")
        
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

