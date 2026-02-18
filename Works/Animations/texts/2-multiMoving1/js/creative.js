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
        Creative.xsplitLines(["h2OutlineTextTop","h2OutlineTextBot","h2Heading"]);
        Creative.splittedChars(["endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        
        gsap.registerPlugin(DrawSVGPlugin);
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#businessLogo", { display:"flex", xPercent:0, autoAlpha:1 }, "reset")
        .set("#heading2",{opacity:0},"reset")
        .set(["#h2Heading, #h3Heading, #heading4"], {opacity: 0}, "reset")
        .set("#h5Heading, #h6Heading",{opacity:0},"reset")
        .set(["#circlesWrapper", "#dotterPath", "#ellipseWrapper"],{opacity:0,},"reset")
        .set(["#circlePath1", "#circ-dotted-Wrapper", "#circlePath2"],{opacity:0},"reset")
        
        
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        // logo
        .to("#businessLogo", 0.001,{autoAlpha:1},"frame1")
        .from("#businessLogo", 0.5,{x:-100, ease:"power4.out"},"frame1")
        // F1 headline
        .from("#h1Heading .splitted-container", 0.001, {opacity:0, stagger:0.08, ease:"power4.out"},"frame1")
        .from("#h1Heading .splitted-container", 0.3, {y:"20", stagger:0.08, ease:"power4.out"},"frame1")
        .from("#h1OutlineTextTop",1.6,{xPercent:-150, ease:"power3.out", force3D: false, rotation:0.001},"frame1")
        .from("#h1OutlineTextBot",1.6,{xPercent:90, ease:"power3.out", force3D: false, rotation:0.001},"frame1")
        
        .to("#h1OutlineTextTop",1,{xPercent:"+=250", ease:"power3.in"},"frame1+=1.3")
        .to("#h1OutlineTextBot",1,{xPercent:"-=250", ease:"power3.in"},"frame1+=1.3")
        .to("#businessLogo", 0.5,{x:-100, ease:"power3.in"},"frame1+=1.3")

            //F1 OUT
            .addLabel("frame1Out","-=1.5")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")
            .to("#h1Heading",0.8,{scale:0.7, rotate:'180', ease:"expo.inOut"},"frame1Out+=0.9")
            .from("#h2Heading",0.8,{rotate:'-70', scale:0.7, ease:"expo.inOut"},"frame1Out+=0.9")
            
        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.5")
        .set("#heading2",{opacity:1},"frame2")
        .set("#h1Heading",{opacity:0},"frame2") 

        // .to("#h2Heading",0.001,{opacity:1},"frame2") /* <--- snap anim in */
        .set("#h2Heading",{opacity:1},"frame2-=0.2")
        .to("#h2Heading",0.6,{scale:1.05, ease:"power4.out"},"frame2")
        .to("#h2Heading",0.1,{scale:1, ease:"power3.out"},"frame2+=0.57")

        .from(".h2outlineText",0.001,{opacity:0},"frame2+=0.61")
        // TOP OUTLINE COPIES AIMATION
        .from("#h2OutlineTextTop .splitted-lines", { y: (i, target, targets) => {
            // return value will be the distance from the center and the multiplier on the end will be the distance each line
            return 28 + (targets.length - 1 - i) * 10;
        }, duration: 0.6, ease: "power4.out"}, "frame2+=0.61")
        // BOTTOM OUTLINE COPIES AIMATION
        .from("#h2OutlineTextBot .splitted-lines", { y: (i, target, targets) => {
            // return value will be the distance from the center and the multiplier on the end will be the distance each line
            return -28 + i * -10;
        }, duration: 0.6, ease: "power4.out"}, "frame2+=0.61")
            
            //F2 OUT
            .addLabel("frame2Out","-=0.85")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out")
            .to([gsap.utils.toArray("#h2OutlineTextBot .splitted-lines").reverse(),"#h2Heading",gsap.utils.toArray("#h2OutlineTextTop .splitted-lines").reverse()],0.001,{opacity: 0, stagger:{each:0.05}, ease:"power4.inOut"},"frame2Out+=0.9")

        //-------- F3 IN -------------------------------
        .addLabel("frame3","frame2Out+=1.4")
        .set("#h3Heading",{opacity:1},"frame3")
  
        .from("#h3Heading",0.3,{y:30, ease:"power4.out", rotation:0.001},"frame3")
        .set(["#h3OutlineTextTop", "#h3OutlineTextBot"], {opacity: 1},"frame3")
        
        .to("#h3OutlineTextTop",1.6,{xPercent:75, ease:"power3.out", force3D: false, rotation:0.001},"frame3-=0.15")
        .to("#h3OutlineTextBot",1.6,{xPercent:-75, ease:"power3.out", force3D: false, rotation:0.001},"frame3-=0.15")
        
            //F3 OUT
            .addLabel("frame3Out","-=0.4")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out")
            .to("#h3Heading", 0.4,{scale:0.5, ease:"power4.inOut"},"frame3Out-=0.3")
            .set("#heading3", {opacity: 0}, "frame3Out+=0.5")


        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=0.5")
        .set("#heading3, #heading2",{opacity:0},"frame4")

        .set("#circlesWrapper",{opacity:1},"frame4")
        .set("#circlePath1, #circ-dotted-Wrapper, #circlePath2, #heading4",{opacity:1, stagger:0.1},"frame4")
        .set("#ellipseWrapper",{opacity:1},"frame4+=0.1")
        
        .from("#h4Heading", 0.5, {scale: 0.5, ease: "power4.out"}, "frame4+=0.1")

        .fromTo("#ellipseWrapper", 0.5, {scale: 0.5},{scale:1, ease: "power4.out"}, "frame4+=0.08")
        .fromTo("#circlePath1, #circ-dotted-Wrapper, #circlePath2", 0.5, {scale: 0.5},{scale:1, stagger:0.08, ease: "power4.out"}, "frame4")
        //.to("#circlePath1, #circ-dotted-Wrapper, #circlePath2",0.5,{scale:1, stagger:0.08, ease: "power4.out"}, "frame4+=0.5")
        
        .to("#ellipseWrapper",0.5,{scale:1 ,ease: "power4.out"}, "frame4+=0.58")

        //MOVING ELLIPSE AND BORDER COLOR CHANGE
        .to(["#circ-dotted-Wrapper", "#ellipseWrapper"], {duration: 4.5, rotate: 360, ease: "linear"}, "frame4+=0.3")
            
        .set("#ellipse", {backgroundColor: "#000000"}, "frame4+=1.7")
        .set(["#circlePath1","#circlePath2"], {borderColor: "#000000"}, "frame4+=1.7")
        .set("#circ-dotted circle", {stroke: "#E10014"}, "frame4+=1.7")
        .set("#h4Heading", {opacity:0}, "frame4+=1.7")
        .set("#h5Heading", {opacity:1}, "frame4+=1.7")
        
        .set("#ellipse", {backgroundColor: "#E10014"}, "frame4+=3.3")
        .set(["#circlePath1","#circlePath2"], {borderColor: "#E10014"}, "frame4+=3.3")
        .set("#circ-dotted circle", {stroke: "#000000"}, "frame4+=3.3")
        .set("#h5Heading", {opacity:0}, "frame4+=3.3")
        .set("#h6Heading", {opacity:1}, "frame4+=3.3")

            //F4 OUT
            .addLabel("frame4Out","-=0.4")
            .add(() => LogFrameTimeStamp("Frame 4"), "frame4Out")
            // .to("#h4Heading", 0.6,{scale:0, ease:"power4.inOut"},"frame4Out")
            //.to("#ellipse",0.3,{scale:0.3, transformOrigin:"50% 50%", ease:"power3.in"},"frame4Out+=0.3")
            .from("#ellipseEndFrame",0.5,{scale:0, transformOrigin:"50% 50%", ease:"power3.in"},"frame4Out+=0.1")
            // .to("#ellipse",0.5,{scale:0, transformOrigin:"50% 50%", ease:"power3.in"},"frame4Out")
            
            .to("#h6Heading", 0.5, {scale: 0, ease: "power4.out"}, "frame4Out+=0.5")

        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.4")
        .set("#h6Heading",{opacity:0},"endFrame")
        .set("#LogoMask1A", {width:0,opacity:0}, "endFrame")
        .set(".logo-fill", {fill:"#F8F3E9"}, "endFrame-=0.2")
        .set("#businessLogo", {x:0, scale:0.5, opacity:0},"endFrame")
        //Logo
        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"endFrame")
        .to("#businessLogo", 1,{scale:1, ease:"power4.out"},"endFrame")
        .to("#LogoMask1A", 0.8, {width:"100%", ease:"power4.inOut"}, "endFrame")
        .to("#LogoMask1A", 0.001, {opacity:1}, "endFrame")
        
        .from("#endFrameHeading .splitted-lines, #endFrameSubHead",0.65,{x:"-300", stagger:0.08, ease:"power4.out"},"endFrame")
        .to("#endFrameHeading .splitted-lines2 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"endFrame+=0.8")

        // CTA
        Creative.tl.addLabel("cta","-=0.8") 
        .set("#ctaArrowOnly", {autoAlpha: 1},"cta")
        .from("#ctaArrowOnly",0.7, {xPercent: -200, ease:'power4.out'},"cta")

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