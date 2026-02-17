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
        // Creative.splitLines(["h1Heading"]);
        Creative.xsplitLines(["h6outlineTextTop","h6outlineTextBot","h5Heading"]);
        Creative.splitChars(["h2Heading"]);
        Creative.splittedChars(["h3Heading","endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        
        gsap.registerPlugin(DrawSVGPlugin);
        const dottedCircle = document.querySelector("#maskCircle");
        const length = dottedCircle.getTotalLength();

        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#businessLogo", { display:"flex", xPercent:0, autoAlpha:1 }, "reset")
        .set("#ellipseWrapper",{rotation:"0"},"reset")
        .set("#h6Heading",{scale:"1.05"},"reset")
        .set("#h5Heading .splitted-lines",{opacity:0},"reset")
        .set(".circ-red",{scale:0.95},"reset")
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        // logo
        .to("#businessLogo", 0.001,{autoAlpha:1},"frame1")
        .from("#businessLogo", 0.7,{x:-120, ease:"power4.out"},"frame1")

        .from("#h1Heading",0.6,{yPercent:200, ease:"power4.out", rotation:0.001},"frame1")
        // .to("#h1Heading",0.45,{scale:0.85, ease:"power3.inOut", rotation:0.001},"frame1+=0.8")

        .addLabel("circlesAnim","-=0.2")
        // DRAW CIRCULAR -------------------------------
        .from("#ellipse1",0.001,{opacity:0},"circlesAnim")
        .from(dottedCircle, 2.2, {strokeDashoffset: 0, ease: "none"},"circlesAnim")
        .from("#ellipseWrapper", 2.2, {rotate: -360, ease: "none", repeat:3},"circlesAnim")
        .from("#circ-red-1-path", 2.2, {drawSVG: 0, ease: "none"},"circlesAnim+=0.2")
        .from("#circ-red-2-path", 2, {drawSVG: 0, ease: "none"},"circlesAnim+=0.7")
        .to("#circ-red-2-path", 1, {strokeWidth: 26, ease: "none"},"circlesAnim+=1.4")
        .from("#circ-red-3-path", 1.3, {drawSVG: 0, ease: "none"},"circlesAnim+=2.695")

            //F1 OUT
            .addLabel("frame1Out","frame1+=1.4")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out-=1.4")
            .to("#businessLogo", 0.6,{x:-120, ease:"power4.inOut"},"frame1Out")
            .to("#h1Heading", 0.6,{scale:0, ease:"power4.inOut"},"frame1Out")


        //-------- F2 IN -------------------------------
        .addLabel("frame2","frame1Out+=0.4")
        .from("#h2Heading",0.3,{scale:0, ease:"power3.out", rotation:0.001},"frame2") 

            //F2 OUT
            .addLabel("frame2Out","frame2+=1.35")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out-=1.35")
            .to("#h2Heading", 0.6,{scale:0, ease:"power4.inOut"},"frame2Out")


        //-------- F3 IN -------------------------------
        .addLabel("frame3","frame2Out+=0.4")
        .from("#ellipse2",0.4,{scale:0, ease:"power3.out", force3D: false, rotation:0.001},"frame3") 
        .to("#ellipseWrapper", 6, {rotate: 360, ease: "none"},"frame3") // Change anim speed of the two red circles to match reference
        .from("#h3Heading",0.3,{scale:0, ease:"power3.out", force3D: false, rotation:0.001},"frame3") 

            //F3 OUT
            .addLabel("frame3Out","frame3+=1.3")
            .add(() => LogFrameTimeStamp("Frams 3"), "frame3Out-=1.3")
            .to("#h3Heading", 0.6,{scale:0, ease:"power4.inOut"},"frame3Out")


        //-------- F4 IN -------------------------------
        .addLabel("frame4","frame3Out+=0.35")
        .from("#h4Heading",0.3,{scale:0, ease:"power3.out", force3D: false, rotation:0.001},"frame4") 
        .to(".circ-red", 0.4,{scale:1.005, ease:"power1.inOut"},"frame4")
        .from("#f4-circle",0.001,{opacity:0},"frame4+=0.2") 
        .to("#f4-circle", 2,{rotate:-360, ease:"power1.inOut"},"frame4+=0.2")

            //F4 OUT
            .addLabel("frame4Out","frame4+=2.2")
            .add(() => LogFrameTimeStamp("Frame 4"), "frame4Out-=2.2")
            .to("#h4Heading", 0.6,{scale:0, ease:"power4.inOut"},"frame4Out")
            .to(".circ-red", 0.6,{scale:2, ease:"power4.inOut"},"frame4Out")
            .to("#f4-circle", 0.4,{autoAlpha: 0, ease:"power1.out"},"frame4Out")
            .to("#f4-circle", 0.4,{rotate:-720, ease:"linear"},"frame4Out")


        //-------- F5 IN -------------------------------
        .addLabel("frame5","frame4Out+=0.4")
        .to("#ellipseWrapper", 0, {autoAlpha: 0, ease: "none"},"frame5+=0.2")
        .set("#heading5", {opacity:1},"frame5")
        .from("#ellipse3-F3",0.6,{scale:0, ease:"power3.out", force3D: false, rotation:0.001},"frame5") 
        .from("#h5OutlineTextTop",1.6,{xPercent:"-=150", ease:"power3.out"},"frame5+=0.2")
        .from("#h5OutlineTextBot",1.6,{xPercent:"+=150", ease:"power3.out"},"frame5+=0.2")

        .from("#h5Heading .splitted-lines",0.5,{yPercent:150, ease:"power4.out", stagger:0.05, force3D: false, rotation:0.001},"frame5+=0.15")
        .to("#h5Heading .splitted-lines",0.001,{opacity:1, stagger:0.05},"frame5+=0.15") /* <--- snap anim in */

            //F5 OUT
            .addLabel("frame5Out","frame5+=1.3")
            .add(() => LogFrameTimeStamp("frame 5"), "frame5Out-=1.3")
            .to("#h5OutlineTextTop",0.8,{xPercent:"+=200", ease:"power3.in"},"frame5Out")
            .to("#h5OutlineTextBot",0.8,{xPercent:"-=200", ease:"power3.in"},"frame5Out")
            .to("#h5Heading", 0.6,{scale:0, rotate:20, ease:"power4.inOut"},"frame5Out+=0.3")

        //-------- F6 IN -------------------------------
        .addLabel("frame6","frame5Out+=0.7")
            .from("#h6Heading",0.3,{scale:0, rotate:-30, ease:"power3.out", force3D: false, rotation:0.001},"frame6") 
            .to("#h6Heading",0.001,{opacity:1},"frame6") /* <--- snap anim in */
            .to("#h6Heading",0.1,{scale:1, ease:"power3.out"},"frame6+=0.57")

            .from(".h6outlineText",0.001,{opacity:0},"frame6+=0.6")
            // TOP OUTLINE COPIES AIMATION
            .from("#h6outlineTextTop .splitted-lines", { y: (i, target, targets) => {
                // return value will be the distance from the center and the multiplier on the end will be the distance each line
                return 20 + (targets.length - 1 - i) * 20;
            }, duration: 0.6, ease: "power4.out"}, "frame6+=0.6")
            // BOTTOM OUTLINE COPIES AIMATION
            .from("#h6outlineTextBot .splitted-lines", { y: (i, target, targets) => {
                // return value will be the distance from the center and the multiplier on the end will be the distance each line
                return -20 + i * -20;
            }, duration: 0.6, ease: "power4.out"}, "frame6+=0.6")

            //F6 OUT
            .addLabel("frame6Out","frame6+=0.2")
            .add(() => LogFrameTimeStamp("frame 6"), "frame6Out-=0.2")
            // .to("#h5Heading, #h6Heading",0.4,{x:-50, ease:"power3.in", force3D: false, rotation:0.001},"frame6Out+=0.31") 
            .to([gsap.utils.toArray("#h6outlineTextBot .splitted-lines").reverse(),"#h6Heading",gsap.utils.toArray("#h6outlineTextTop .splitted-lines").reverse()],0.3,{xPercent:200, stagger:{each:-0.05}, ease:"power4.inOut"},"frame6Out+=1.2")


        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","frame6Out+=1.8")
        .set("#LogoMask1A", {width:0,opacity:0}, "endFrame")
        .set(".logo-fill", {fill:"#F8F3E9"}, "endFrame-=0.2")
        .set("#businessLogo", {x:0, scale:0.5, opacity:0},"endFrame")
        
        .from("#endFrameHeading .splitted-lines, #endFrameSubHead",0.65,{x:"-300", stagger:0.08, ease:"power4.out"},"endFrame")
        .to("#endFrameHeading textcolor .splitted-chars, #endFrameHeading .splitted-lines3 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"endFrame+=0.8")

        //Logo
        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"endFrame")
        .to("#businessLogo", 1,{scale:1, ease:"power4.out"},"endFrame")
        .to("#LogoMask1A", 0.8, {width:"100%", ease:"power4.inOut"}, "endFrame")
        .to("#LogoMask1A", 0.001, {opacity:1}, "endFrame")
        
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