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
    xsplitLines: function(copyId) {
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

    

    init: function() {
        Creative.splitLines(["h1Heading"]);
        Creative.xsplitLines(["h4outlineTextTop","h4outlineTextBot"]);
        Creative.splitChars(["h2Heading"]);
        Creative.splittedChars(["h3Heading","h5Heading","h6Heading","endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#businessLogo", { display:"flex", xPercent:0, autoAlpha:1 }, "reset")
        // .set("#ellipse3, #ellipse4",{x:-10, opacity:0}, "reset")
        .set("#ellipse1, #ellipse2",{opacity:1}, "reset")
        .set("#ellipseWrapper",{rotation:"0",},"reset")
        .set("#ellipse1", {boxShadow: "0 0 0 -2px #F8F3E8, 0 0 0 0px #000000"},"reset")
        .set("#h2Heading, #h3Heading",{autoAlpha:0},"reset")
        .set("#h2HeadingCirc1, #h2HeadingCirc2",{autoAlpha:0},"reset")
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        // ellipse 1st anim - from outside the stage
        .from("#ellipse1",1,{x:"-=200", y:"-=200", ease:"expo.out"},"frame1")
        .from("#ellipse2",1,{x:"+=200", y:"+=200", ease:"expo.out"},"frame1")
        // frame 1 headline intro animation
        .from("#h1Heading",0.001,{opacity:0, ease:"power4.out"},"frame1")
        .from("#h1Heading .splitted-container",0.3,{y:"20", stagger:0.08, ease:"expo.out", force3D: false, rotation:0.001},"frame1+=0.4")
        .from("#h1Heading .splitted-container",0.001,{opacity:0, stagger:0.08, ease:"power4.out"},"frame1+=0.4")
        // logo
        .to("#businessLogo", 0.001,{autoAlpha:1},"frame1")
        .from("#businessLogo", 0.5,{x:-100, ease:"power3.out"},"frame1")
        .to("#LogoMask1A", 0.5, {right:"0px", ease:"power4.inOut"}, "frame1")
        .to("#LogoMask1A", 0.001, {opacity:1}, "frame1")
        .to("#BottomLogoA", 0.8,{height:"16px", ease:"power4.inOut"},"frame1+=0.3")

            //F1 OUT
            .addLabel("frame1Out","-=0.5")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")
            // ellipse 2nd anim - wrapper rotation
            .to("#ellipseWrapper",1.5,{rotation:"-240", ease:"power2.inOut"},"frame1Out")
            // ellipse 2nd anim - ellipse turning small before exiting the frame
            .to("#ellipse1, #ellipse2",1,{scale:.3, ease:"power2.inOut"},"frame1Out+=0.5")
            .to("#ellipse1",1,{x:-2, y:0, ease:"power2.in"},"frame1Out+=0.2")
            .to("#ellipse2",1,{x:2, y:-0, ease:"power2.in"},"frame1Out+=0.2")
            // ellipse 2nd anim - ellipse exiting the frame
            .to("#ellipse1",0.75,{x:127, y:270, ease:"power2.in"},"frame1Out+=.9")
            .to("#ellipse2",0.75,{x:-127, y:-270, ease:"power2.in"},"frame1Out+=.9")
            // logo
            .to("#businessLogo", 0.001,{autoAlpha:0},"frame1Out+=0.62")
            .to("#businessLogo", 0.001,{x:-100},"frame1Out+=0.62")

        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.3")
        .set("#h1Heading",{autoAlpha:0},"frame2+=0.12")
        .set("#h2HeadingCirc1, #h2HeadingCirc2",{backgroundColor:"transparent"},"frame2+=0.12")
        .set("#h2Heading",{autoAlpha:1},"frame2+=0.2")
        .set("#h2HeadingCirc1, #h2HeadingCirc2",{autoAlpha:1},"frame2")
        // frame 2 circle stroke comes in
        .from("#h2HeadingCirc1",0.5,{x:-150, ease:"power2.out"},"frame2")
        .from("#h2HeadingCirc2",0.5,{x:150, ease:"power2.out"},"frame2")
        // frame 1 headline intro animation
        .from("#h2Heading",0.3,{scale:0.75, ease:"power3.out", rotation:0.001},"frame2+=0.2")
        // frame 2 circle stroke rotation
        .to("#h2HeadingCirc1Wrapper1",1,{rotation:"180", ease:"power2.inOut"},"frame2+=0.5")
        .to("#h2HeadingCirc1Wrapper2",1,{rotation:"180", ease:"power2.inOut"},"frame2+=0.5")
        
            //F2 OUT
            .addLabel("frame2Out","-=0.1")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out")
            // frame 2 circle stroke moving to center
            .to("#h2HeadingCirc1",0.5,{x:32, ease:"expo.out"},"frame2Out")
            .to("#h2HeadingCirc2",0.5,{x:-31, ease:"expo.out"},"frame2Out")
            
        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=0.7")
        // frame 3 circle background comes in from the middle
        .from("#h3HeadingCirc1",0.5,{scale:0, transformOrigin:"50% 55%", ease:"power3.in"},"frame3")
        // frame 3 headline intro animation
        .from("#h3Heading",0.5,{scale:0.4, ease:"power2.out",onStart:()=>{ gsap.set("#h3Heading",{autoAlpha:1}) }},"frame3+=0.5")
        // frame 3 circle stroke top and bottom comes in from top and bottom
        .from("#h3HeadingCirc2",0.5,{y:-100,ease:"expo.out"},"frame3+=0.5")
        .from("#h3HeadingCirc4",0.5,{y:100,ease:"expo.out"},"frame3+=0.5")
        .from("#h3HeadingCirc3",0.5,{y:-100,ease:"expo.out"},"frame3+=0.6")
        .from("#h3HeadingCirc5",0.5,{y:100,ease:"expo.out"},"frame3+=0.6")
        // ---- Copy animations ------- note: added 5 splitted lines just in case copy reach 5 lines
        .to("#h3Heading .splitted-lines2 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"frame3+=0.8")
        
            //F3 OUT

            .addLabel("frame3Out","+=.5")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out-=.5")
            // frame 3 circle stroke top and bottom exiting the frame
            .to("#h3HeadingCirc2",0.5,{y:-100,ease:"expo.in"},"frame3Out")
            .to("#h3HeadingCirc4",0.5,{y:100,ease:"expo.in"},"frame3Out")
            .to("#h3HeadingCirc3",0.5,{y:-100,ease:"expo.in"},"frame3Out")
            .to("#h3HeadingCirc5",0.5,{y:100,ease:"expo.in"},"frame3Out")
            // frame 3 background masking
            .to("#h3HeadingTopRect",0.3,{clipPath:'polygon(0% 0%, 100% 0, 100% 100%, 0 100%)'},"frame3Out+=0.3")
            .to("#h3HeadingBotRect",0.3,{clipPath:'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)'},"frame3Out+=0.3")

        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=0.3")
        .set("#heading4", {opacity:1}, "frame4")
        // frame 4 headline intro animation
        .from("#h4Heading",0.001,{opacity:0},"frame4+=0.28")
        .from("#h4Heading, .h4outlineText, .h4outlineTextBot",0.3,{scale:0.95, ease:"power2.out"},"frame4+=0.28")
        .from(".h4outlineText",0.001,{opacity:0},"frame4+=0.35")
        // TOP OUTLINE COPIES AIMATION
        .from("#h4outlineTextTop", { y: (i, target, targets) => {
            // return value will be the distance from the center and the multiplier on the end will be the distance each line
            return 60 + (targets.length - 1 - i) * 140;
        }, duration: 0.6, ease: "power4.out"}, "frame4+=0.35")
        // BOTTOM OUTLINE COPIES AIMATION
        .from("#h4outlineTextBot", { y: (i, target, targets) => {
            // return value will be the distance from the center and the multiplier on the end will be the distance each line
            return -60 + i * -140;
        }, duration: 0.6, ease: "power4.out"}, "frame4+=0.35")
        //show the outer spot copy
        .set("#h4outlineTextTop .splitted-lines",{opacity:1},"frame4+=.95")
        .set("#h4outlineTextBot .splitted-lines",{opacity:1},"frame4+=.95")
            //F4 OUT
            .addLabel("frame4Out","-=0.2")
            .add(() => LogFrameTimeStamp("frame 4"), "frame4Out")
            // frame 4 headline exit animation
            .to("#heading4",1,{y:1000, ease:"power2.in", rotation:0.001},"frame4Out")

        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=0.1")
        // frame 5 lines and circle intro animation
        .fromTo("#h5ShapeWrapper",{x:-300},{x:400, ease:"none", duration:2},"frame5")
        // frame 5 headline intro animation
        .from("#h5Heading .splitted-lines",0.65,{x:"-300", stagger:0.08, ease:"power4.out"},"frame5+=0.2")

            //F5 OUT
            .addLabel("frame5Out","-=0.7")
            .add(() => LogFrameTimeStamp("frame 5"), "frame5Out")
            // frame 5 headline exit animation
            .to("#h5Heading",0.5,{x:300, ease:"power3.in"},"frame5Out")

        //-------- F6 IN -------------------------------
        .addLabel("frame6","-=0.2")
        // frame 6 lines and circle intro animation
        .fromTo("#h6ShapeWrapper",{x:300},{x:-400, ease:"none", duration:2},"frame6")
        // frame 6 headline intro animation
        .from("#h6Heading .splitted-lines",0.65,{x:"300", stagger:0.08, ease:"power4.out"},"frame6")
            //F6 OUT
            .addLabel("frame6Out","-=0.4")
            .add(() => LogFrameTimeStamp("frame 6"), "frame6Out")
            // frame 6 background masking
            .to("#endframeRect",0.3,{clipPath:'polygon(0% 0%, 100% 0, 100% 100%, 0 100%)'},"frame6Out")
        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.6")
        .set("#endframe", {opacity:1}, "endFrame")
        .set("#LogoMask1A", {right:"-160px",opacity:0}, "endFrame")
        .set("#BottomLogoA", {height:"0px"}, "endFrame")
        .set(".logo-fill", {fill:"#F8F3E9"}, "endFrame-=0.2")
        // endframe headline intro animation
        .from("#endFrameHeading",0.001,{opacity:0, ease:"power4.out"},"endFrame+=0.5")
        .from("#endFrameHeading .splitted-lines",0.65,{x:"-300", stagger:0.08, ease:"power4.out"},"endFrame+=0.7")
        .to("#endFrameHeading .splitted-lines3 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"endFrame+=1.5")

        //Logo
        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"endFrame+=0.7")
        .to("#businessLogo", 0.3,{x:0, ease:"power3.out"},"endFrame+=0.75")
        .to("#LogoMask1A", 0.5, {right:"0px", ease:"power4.inOut"}, "endFrame+=0.7")
        .to("#LogoMask1A", 0.001, {opacity:1}, "endFrame+=0.55")
        .to("#BottomLogoA", 0.8,{height:"16px", ease:"power4.inOut"},"endFrame+=1.3")
        
        // CTA
        Creative.tl.addLabel("cta","-=1.1") 
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