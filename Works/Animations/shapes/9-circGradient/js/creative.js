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
    bgtl: gsap.timeline({
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
                getById("headingFrame").style.setProperty('padding', '14px 0px 14px 0px');
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
    
    bgAnimation: function(){
        Creative.bgtl.addLabel("reset",0)
        .set("#ellipseWrapper",{rotation:"0",},"reset")
        .set("#ellipse1, #ellipse2", {scale:0.36},"reset")

        //F1
        .addLabel("frame1")
        // ellipse 1st anim - from outside the stage
        .from("#ellipse1",1,{x:"+=350", y:"-=90", ease:"expo.out"},"frame1+=0.2")

            .addLabel("frame1Out","-=0.1")
            // ellipse 2nd anim - wrapper rotation
            .to("#ellipseWrapper",2.4,{rotation:"-360", ease:"power1.inOut"},"frame1Out-=0.3")
            // top and bottom ellipse Figma F2 positioning
            .to("#ellipse1",1,{y:-90, ease:"power2.in"},"frame1Out-=0.3")
            .to("#ellipse2",1,{y:90, ease:"power2.in"},"frame1Out-=0.3")
            .to("#ellipse1",0.5,{y:-70, ease:"power2.in"},"frame1Out+=1.3")
            .to("#ellipse2",0.5,{y:70, ease:"power2.in"},"frame1Out+=1.3")
            .to("#ellipse2",0.001,{opacity:1},"frame1Out+=1.3")
            
        //-------- F2  -------------------------------
        .addLabel("frame2","-=0.4")
        // top and bottom ellipse merge in the middle animation
        .to("#ellipse1",0.35,{x:-75, y:109, scale:0.6, ease:"power2.in"},"frame2")
        .to("#ellipse2",0.35,{x:59, y:-121, scale:0.6, ease:"power2.in"},"frame2")
        .to("#ellipseWrapper",0.001,{zIndex:"0"},"frame2")
        .to("#ellipse1 svg g:nth-of-type(1)",0.001,{fill:"none"},"frame2")

        //-------- F3  -------------------------------
        .addLabel("frame3","+=0.05")
        // // top and bottom ellipse split animation
        .to("#ellipse1",0.4,{x:-74, y:-140, scale:1, ease:"power2.inOut"},"frame3")
        .to("#ellipse2",0.4,{x:64, y:126, scale:1, ease:"power2.inOut"},"frame3")

        //-------- F4  -------------------------------
        .addLabel("frame4","+=0.9")
        // top and bottom ellipse merge back to center
        .to("#ellipse1",0.4,{x:-75, y:109, scale:0.6, ease:"power2.in"},"frame4")
        .to("#ellipse2",0.4,{x:59, y:-121, scale:0.6, ease:"power2.in"},"frame4")

        .to("#ellipse3_innerCic, #ellipse3_outerCirc", 0.001,{opacity:1, ease:"power4.in"},"frame4+=0.32")
        .to("#ellipse1, #ellipse2",0.001,{opacity:0, ease:"power4.out"},"frame4+=0.32")
        .from("#ellipse3_outerCirc", 0.6,{scale:0.8, x:1, y:-1, ease:"power4.out"},"frame4+=0.35")
        .from("#ellipse3_innerCic", 0.6,{scale:0.54, x:1, y:-1, ease:"power4.out"},"frame4+=0.35")
        
        //-------- F5  -------------------------------
        .addLabel("frame5","+=0.1")
        .to("#ellipse3_innerCic, #ellipse3_outerCirc",0.5,{scale:1.35, ease:"power3.in"},"frame5")

        //-------- F6  -------------------------------
        .addLabel("frame6","+=2.6")
        .to("#ellipse3_innerCic, #ellipse3_outerCirc",0.5,{scale:1.5, ease:"power3.in"},"frame6")
        .to("#ellipse3_innerCic, #ellipse3_outerCirc",0.3,{opacity:0},"frame6+=0.3")
        
    },

    init: function() {
        Creative.splitLines(["h1Heading","h2Heading","h5Heading","h6Heading","h7Heading","endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        
        //init background
        Creative.bgAnimation();

        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        
        .set("#ctaArrow", {autoAlpha: 0, x:-77}, "reset")

        .to("#logoContainer", 0.001, {clipPath:""},"reset")
        .to(["#logoTop","#logoBottom"],0.001, {opacity:1}, "reset")   
        .to("#logoTop", 0.001, {width: "100%"}, "reset")
        .to("#logoTopSVG", 0.001, {x: 0}, "reset")
        .to("#logoBottomMask", 0.001, {height: 13}, "reset")

        //-------- F1 IN -------------------------------
        .addLabel("frame1","+=0.01")
        .from("#h1Heading .splitted-lines1", 0.35, {y:45, ease: "power3.out"}, "frame1")
        .from("#h1Heading .splitted-lines1", 0.0001, {opacity:0, ease: "power4.out"}, "frame1")
        .from("#h1Heading .splitted-lines2", 0.3, {y:107, ease: "power3.out"}, "frame1+=0.07")
        .from("#h1Heading .splitted-lines2", 0.0001, {opacity:0, ease: "power4.out"}, "frame1+=0.07")

            //F1 OUT
            .addLabel("frame1Out","+=0.7")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out","-=1")
            .to("#h1Heading .splitted-lines1", 0.35, {y:"-=60", ease: "power3.in"}, "frame1Out")
            .to("#h1Heading .splitted-lines1", 0.0001, {opacity:0, ease: "power4.out"}, "frame1Out+=0.32")
            .to("#h1Heading .splitted-lines2", 0.35, {y:"-=60", ease: "power3.in"}, "frame1Out+=0.1")
            .to("#h1Heading .splitted-lines2", 0.0001, {opacity:0, ease: "power4.out"}, "frame1Out+=0.41")
            
        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.02")
        .from("#h2Heading .splitted-lines", 0.35, {y:25, stagger:0.1, ease: "power3.out"}, "frame2")
        .from("#h2Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.04, ease: "power4.out"}, "frame2")
        // logo OUT
        .to(["#logoTop","#logoBottom"], 0.001, {opacity:0, ease: "power3.in"}, "frame2+=0.42")

            //F2 OUT
            .addLabel("frame2Out","+=0.665")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out","-=0.665")
            .to("#h2Heading .splitted-lines", 0.35, {y:"-=70", stagger:0.1, ease: "power3.in"}, "frame2Out")
            .to("#h2Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.07, ease: "power4.out"}, "frame2Out+=0.35")

        //-------- F3 IN -------------------------------
        .addLabel("frame3","+=0.43")
        .from("#h3Heading", 0.35, {y:45, ease: "power3.out"}, "frame3")
        .from("#h3Heading", 0.0001, {opacity:0, ease: "power4.out"}, "frame3")

            //F3 OUT
            .addLabel("frame3Out","+=0.4")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out","-=0.4")
            .to("#h3Heading", 0.4, {y:"-=50", ease: "power3.in"}, "frame3Out")
            .to("#h3Heading", 0.0001, {opacity:0, ease: "power4.out"}, "frame3Out+=0.4")

        //-------- F4 IN -------------------------------
        .addLabel("frame4","+=0.3")
        .from("#h4Heading", 0.35, {scale:0.35, ease: "power3.out"}, "frame4")
        .from("#h4Heading", 0.0001, {opacity:0, ease: "power4.out"}, "frame4")

            //F4 OUT
            .addLabel("frame4Out","+=0.3")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame4Out","-=0.3")
            .to("#h4Heading", 0.5, {scale:1.2, y:-30, ease: "power3.in"}, "frame4Out")
            .to("#h4Heading", 0.0001, {opacity:0, ease: "power4.out"}, "frame4Out+=0.5")

        //-------- F5 IN -------------------------------
        .addLabel("frame5","+=0.02")
        .from("#h5Heading .splitted-lines", 0.35, {y:80, stagger:0.1, ease: "power3.out"}, "frame5")
        .from("#h5Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame5")

            //F5 OUT
            .addLabel("frame5Out","+=0.82")
            .add(() => LogFrameTimeStamp("Frame 5"), "frame5Out","-=0.82")
            .to("#h5Heading .splitted-lines", 0.4, {y:"-=100", stagger:0.1, ease: "power3.in"}, "frame5Out+=0.1")
            .to("#h5Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.08, ease: "power4.out"}, "frame5Out+=0.4")
        
        //-------- F6 IN -------------------------------
        .addLabel("frame6","-=0.1")
        .from("#h6Heading .splitted-lines", 0.35, {y:90, stagger:0.1, ease: "power3.out"}, "frame6")
        .from("#h6Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame6")
        
            //F6 OUT
            .addLabel("frame6Out","+=1")
            .add(() => LogFrameTimeStamp("Frame 6"), "frame6Out","-=1")
            .to("#h6Heading .splitted-lines", 0.4, {y:"-=60", stagger:0.1, ease: "power3.in"}, "frame6Out")
            .to("#h6Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.08, ease: "power4.out"}, "frame6Out+=0.38")

        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.01")
        
        .set(["#logoTop","#logoBottom"], {x:0,opacity:0}, "endFrame")
        .set("#logoTopSVG", {x:12}, "endFrame")
        .set("#logoBottomMask", {height:0}, "endFrame")
        .set("#logoContainer", {clipPath:""},"endFrame")

        .from("#endFrameHeading .splitted-lines1", 0.35, {y:45, ease: "power3.out"}, "endFrame")
        .from("#endFrameHeading .splitted-lines1", 0.0001, {opacity:0, ease: "power4.out"}, "endFrame")
        .from("#endFrameHeading .splitted-lines2", 0.2, {y:45, ease: "power3.out"}, "endFrame+=0.1")
        .from("#endFrameHeading .splitted-lines2", 0.0001, {opacity:0, ease: "power4.out"}, "endFrame+=0.1")

        .from("#endFrameHeading .splitted-lines3", 0.35, {y:45, ease: "power3.out"}, "endFrame+=0.58")
        .from("#endFrameHeading .splitted-lines3", 0.0001, {opacity:0, ease: "power4.out"}, "endFrame+=0.58")

        //Logo
        .addLabel("ctaLogo","+=0.8")
        .set(["#logoTop","#logoBottom"], {opacity:1}, "ctaLogo")  
        .from("#logoTop", 0.3, {width: "0%", ease: "power3.out"}, "ctaLogo")
        .from("#logoTopSVG", 0.3, {x: 15, ease: "power3.out"}, "ctaLogo")
        .from("#logoBottomMask", 0.5, {height: 0, ease: "power3.out"}, "ctaLogo+=0.6")

        .from("#arrowOnly", 0.01, {opacity: 0}, "ctaLogo+=0.25")
        .from("#arrowOnly", 0.3, {x:-45, ease:"power3.out"}, "ctaLogo+=0.25")
        .add(() => LogFrameTimeStamp("EndFrame"), ">")

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