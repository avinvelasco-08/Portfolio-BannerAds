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
    splitCharsSpan = [],
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
        var sublegal = getById("legalContainerInner").innerHTML;
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
                getById("headingFrame").style.setProperty('padding', '0px 0px 14px 0px');
                break;
            }
        }
        
        //Legal Switcher for Frames, Endframe will always use Wide legal 
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
        
        //Inject inner legal value to wide to have the same value across
        getById("legalContainerWide").innerHTML = sublegal;

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
    splitCharsSpan: function(copyId) {
      copyId.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        const span = el.querySelector("span");
        if (!span || !span.textContent.trim()) return;

        // Reset span content to avoid duplicate wrapping
        span.innerHTML = span.textContent;

        // Apply SplitText to span only
        const split = new SplitText(span, {
          type: "chars",
          charsClass: "splitted-chars"
        });

        // Optional: store split chars if needed
        splittedChars[index] = split.chars;
      });
    },

    splittedChars: function(copyId) {
        copyId.forEach((ids, index) => {
            const targetCopy = getById(ids);
            if (targetCopy && targetCopy.innerHTML.length > 0) {
                var splitText = new SplitText(targetCopy, {type:"lines", linesClass:"splitted-lines++ splitted-lines"});
                splittedLines[index] = splitText.lines;
                //split chars
                var splitText = new SplitText(targetCopy, {type:"chars", charsClass:"splitted-chars++ splitted-chars"});
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
//        Creative.splitLines(["h1Heading"]);
    //    Creative.xsplitLines(["h5Heading","endFrameHeading"]);
//        Creative.splittedChars(["h3Heading","h5Heading","h6Heading","endFrameHeading"]);
        Creative.splitChars(["h2Heading"]);
        Creative.splitLines(["h5Heading","endFrameHeading"]);
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#businessLogo", { display:"flex", xPercent:0, autoAlpha:1 }, "reset")
        .set("#h2Heading, #h3Heading",{autoAlpha:0},"reset")
        .set("#h2HeadingCirc1, #h2HeadingCirc2",{autoAlpha:0},"reset")
        // F1 SVG texts initial position ------------
        .set("#h1_small", {x:-17, y:-57}, "reset")
        .set("#h1_busi", {x:-11, y:-23}, "reset")
        .set("#h1_ness", {x:-11, y:23}, "reset")
        .set("#h1_days", {x:21, y:46, transformOrigin:"center bottom"}, "reset")
        .set("#h1_arrow", {scale:0, transformOrigin:"center 80%"}, "reset")
        //Lines Animation drawSVG
        gsap.from(["#redline_path","#yellowline_path"], 7, {drawSVG:"0%", delay:0.1, stagger:0.4, ease:"power4.out"})

        Creative.tl
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        //SMB Days Logo
        .to(["#h1_small", "#h1_busi", "#h1_ness", "#h1_days"], 0.4, { x:0, ease:"power3.out" }, "frame1")
        .to(["#h1_small", "#h1_busi", "#h1_ness", "#h1_days"], 0.9, { y:0, ease:"expo.out" }, "frame1+=0.35")
        .to(".i_dot", 0.001, { opacity:0 }, "frame1+=0.4")
        .to("#h1_small", 0.8, { height:"75px", ease:"expo.out" }, "frame1+=0.2")
        .to("#h1_days", 0.6, { height:"91px", ease:"expo.out" }, "frame1+=0.2")
        .to(".i_busi", 0.3, { scaleY:0, ease:"power1.out" }, "frame1+=0.25")
        .to("#h1_arrow", 0.25, {scale:1, transformOrigin:"center 80%", ease:"power1.out"}, "frame1+=0.7")
        // logo
        .addLabel("logo", "frame1+=0.9")
        .to("#businessLogo", 0.001,{autoAlpha:1}, "logo")
        .from("#businessLogo", 0.5,{x:-100, ease:"power3.out"}, "logo")
        .to("#LogoMask1A", 0.5, {right:"0px", ease:"power4.inOut"}, "logo")
        .to("#LogoMask1A", 0.001, {opacity:1}, "logo")
        .to("#BottomLogoA", 0.8,{height:"16px", ease:"power4.inOut"}, "logo+=0.5")

            //F1 OUT
            .addLabel("frame1Out","+=0.2")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")
            .to("#lines", 0.5, {x:-105, ease:"power4.out"}, "frame1Out")
            .from("#redtangle, .coverMaskF3", 0.5, {x:"400", ease:"power4.out"}, "frame1Out+=0.1")
            .set("#lines", {opacity:0})
            .from("#coverMaskF3-L",0.1,{opacity:0})

        //-------- F2 IN --------------------------------------------------------------
        .addLabel("frame2","-=0.4")
        .set("#h1Heading",{autoAlpha:0},"frame2")
        .to("#h2Heading", 0.001, {autoAlpha:1, ease:"power4.out"}, "frame2")
        .from("#h2Heading span", 0.001, {opacity:0, stagger: 0.12, ease: "power4.out"}, "frame2")
        .from("#h2Heading", 0.5, {xPercent:"30", ease: "power4.out"}, "frame2")
        .to("#h2Heading span", 0.5, {x:40, stagger: 0.12, ease: "power4.out"}, "frame2")
        .from("#h2Heading span:nth-child(2) div", 0.001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame2+=0.1")
        
            //F2 OUT
            .addLabel("frame2Out","+=0.65")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out")
            .to("#coverMaskF3-L", 0.4, {x:169, ease: "power4.out"}, "frame2Out")
            .to("#coverMaskF3-R", 0.4, {x:-169, ease: "power4.out"}, "frame2Out")
            .to("#h2Heading", 0.2, {opacity:0, ease: "power4.out"}, "frame2Out+=0.1")
            .addLabel("showLines","-=0.2")
            .set("#lines", {x:0, opacity:1, zIndex:"4"}, "showLines")
            .set("#yellowline", {x:165}, "showLines")
            .set("#redline", {x:-165}, "showLines")


        //-------- F3 IN --------------------------------------------------------------
        .addLabel("frame3","-=0.05")
        .to("#yellowline", 1.1, {x:0, ease: "power4.out"}, "frame3")
        .to("#redline", 1.1, {x:0, ease: "power4.out"}, "frame3")
        .to("#redline_path", 0.01, {stroke:"#F8FF3C"}, "frame3+=0.05") // WILL TURN TO YELLOW AS PER FIGMA
        .from("#h3Heading", 0.4, {scale:0, ease: "power3.out"}, "frame3+=0.2")
        .to("#h3Heading", 0.001, {autoAlpha:1, opacity:1}, "frame3+=0.1")

            //F3 OUT
            .addLabel("frame3Out","+=0.45")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out")
            .to("#h3Heading", 0.6, {fontSize:"1000", x:-100, y:230, ease: "power1.inOut", force3D: true}, "frame3Out")
            .to("#lines", 0.6, {scale:20, ease: "power1.inOut"}, "frame3Out")


        //-------- F4 IN --------------------------------------------------------------
        .addLabel("frame4","-=0.28")
        .set("#heading3", {opacity:0}, "frame4")
        .set("#heading4, #f4Lifestyle_img", {opacity:1}, "frame4")
        .set("#heading4, #f4Lifestyle_img", {opacity:1}, "frame4")
        .to("#f4Lifestyle_img", 3, {x:-40, ease: "none"}, "frame4+=0.1")
        .from("#coverMaskF4-L", 0.7, {x:400, ease: "power4.out"}, "frame4+=0.1")
        .from("#coverMaskF4-R", 0.7, {x:50, ease: "power4.out"}, "frame4+=0.1")

            //F4 OUT
            .addLabel("frame4Out","-=1.6")
            .set("#lines", {scale:1}, "frame4Out")
            .set("#yellowline", {x:-100}, "frame4Out")
            .set("#redline", {x:100}, "frame4Out")
            .set("#redline_path", {stroke:"#F8F3E9"}, "frame4Out") // WILL TURN TO STONE AS PER FIGMA
            .add(() => LogFrameTimeStamp("frame 4"), "frame4Out")
            .to("#coverMaskF4-L", 0.42, {x:169, ease: "power4.in"}, "frame4Out")
            .to("#coverMaskF4-R", 0.42, {x:-169, ease: "power4.in"}, "frame4Out")


        //-------- F5 IN --------------------------------------------------------------
        .addLabel("frame5","-=1.1")
        .to("#h5Heading", 0.001, {autoAlpha:1}, "frame5")
        .from("#h5Heading .splitted-container:first-child", 0.3, {yPercent:50, ease:"power3.out"}, "frame5")
            .to("#h5Heading .splitted-container:first-child", 0.001, {opacity:1}, "frame5")
        .from("#h5Heading .splitted-container:nth-child(2)", 0.6, {xPercent:-50, ease:"power3.out"}, "frame5+=0.15")
            .to("#h5Heading .splitted-container:nth-child(2)", 0.001, {opacity:1}, "frame5+=0.15")
        .from("#h5Heading .splitted-container:last-child", 0.3, {yPercent:50, ease:"power3.out"}, "frame5+=0.4")
            .to("#h5Heading .splitted-container:last-child", 0.001, {opacity:1}, "frame5+=0.4")
        .to("#yellowline, #redline", 0.4, {x:0, ease:"power3.out"}, "frame5+=0.2")

            //F5 OUT
            .addLabel("frame5Out","+=0.3")
            .add(() => LogFrameTimeStamp("frame 5"), "frame5Out")
            .to("#h5Heading .splitted-container", 0.7, {xPercent:150, stagger:0.05, ease:"power3.inOut"}, "frame5Out")
            .to("#yellowline", 0.4, {x:-100, ease:"power3.inOut"}, "frame5Out+=0.1")
            .to("#redline", 0.4, {x:100, ease:"power3.inOut"}, "frame5Out+=0.1")

        
        //-------- EndFrame IN --------------------------------------------------------------
        .addLabel("endFrame","-=0.45")
        .to("#endframe, #endFrameHeading", 0.001, {autoAlpha:1, opacity:1}, "endFrame")
        .set(".coverMaskF4", {backgroundColor: "#F8F3E9"}, "endFrame+=0.1")
        // endframe headline intro animation
        .from("#endFrameHeading .splitted-container", 0.7, {xPercent:-150, stagger:0.05, ease:"power3.inOut"}, "endFrame")
        .from("#yellowBorderFrame", 0.5, {height:0, ease:"power2.out"}, "endFrame+=0.3")
        .from("#endFrameSubHeading", 1.5, {opacity:0, ease:"power3.out"}, "endFrame+=0.6")
        
        .set("#endframe", {opacity:1}, "endFrame")
        .set("#businessLogo", {zIndex:3}, "endFrame")
        .set("#businessLogo", {x:-100}, "endFrame")
        .set("#LogoMask1A", {right:"-160px",opacity:0}, "endFrame")
        .set("#BottomLogoA", {height:"0px"}, "endFrame")
        .set(".logo-fill", {fill:"#E10014"}, "endFrame-=0.2")

        //Logo
        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"endFrame+=0.4")
        .to("#businessLogo", 0.5,{x:0, ease:"power3.out"},"endFrame+=0.45")
        .to("#LogoMask1A", 0.5, {right:"0px", ease:"power4.inOut"}, "endFrame+=0.4")
        .to("#LogoMask1A", 0.001, {opacity:1}, "endFrame+=0.25")
        .to("#BottomLogoA", 0.8,{height:"16px", ease:"power4.inOut"},"endFrame+=1")
        
        // CTA
        Creative.tl.addLabel("cta","-=1.45") 
        .set("#ctaArrowOnly", {autoAlpha: 1},"cta")
        .from("#ctaArrowOnly",0.7, {xPercent: -100, ease:'power4.out'},"cta")

        // Creative.tl.from("#endFrameSubLegal",0.5,{autoAlpha:0, ease:"power4.out", onComplete: function() {
        //     /* ENABLE HOTSPOT */
        //     LogFrameTimeStamp("Frame 4");
        //     if(getById('underlinedText') !== null){
        //        Creative.addTooltip();
        //        gsap.set("#hotspot", { autoAlpha: 1 });
        //     }else{
        //        gsap.set("#hotspot", { autoAlpha: 1 }); 
        //     }
        //     /* END ENABLE HOTSPOT */
        // }},"endFrame+=0.8")
        
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