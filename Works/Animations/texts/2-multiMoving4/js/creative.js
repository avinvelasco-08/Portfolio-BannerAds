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
        Creative.xsplitLines(["h3OutlineTextTop","h3OutlineTextBot", "h7Heading"]);
        Creative.splitChars(["h2Heading"]);
        Creative.splittedChars(["h3Heading","endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#businessLogo", { display:"flex", xPercent:0, autoAlpha:1 }, "reset")
        .set("#ellipse1, #ellipse2",{opacity:1}, "reset")
        .set("#ellipseWrapper",{rotation:"0",},"reset")
        .set("#h7Heading .splitted-lines",{opacity:"0",},"reset")
        
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        .from("#h1OutlineTextTop",1.6,{xPercent:-150, ease:"power3.out", force3D: false, rotation:0.001},"frame1+=0.1")
        .from("#h1OutlineTextBot",1.6,{xPercent:90, ease:"power3.out", force3D: false, rotation:0.001},"frame1+=0.1")
        
        // logo
        .to("#businessLogo", 0.001,{autoAlpha:1},"frame1")
        .from("#businessLogo", 0.7,{x:-150, ease:"power4.out"},"frame1")
        .to("#LogoMask1A", 0.6, {right:"0px", ease:"power4.inOut"}, "frame1")
        .to("#LogoMask1A", 0.001, {opacity:1}, "frame1")
        .to("#BottomLogoA", 0.8,{height:"16px", ease:"power4.inOut"},"frame1+=0.5")

        .from("#ellipse1",0.6,{scale:0, ease:"power4.out"},"frame1+=0.74")
        .from("#h1Heading",0.2,{scale:0, ease:"power4.out", force3D: false, rotation:0.001},"frame1+=1.05")

            //F1 OUT
            .addLabel("frame1Out","-=0.5")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")
            .to("#h1OutlineTextTop",1,{xPercent:"+=150", ease:"power3.in"},"frame1Out")
            .to("#h1OutlineTextBot",1,{xPercent:"-=150", ease:"power3.in"},"frame1Out")
            .to("#businessLogo", 0.6,{x:-150, ease:"power4.in"},"frame1Out")


        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.4")
        .to("#h1Heading",0.6,{scale:0.625, x:-3, y:-17, ease:"power3.inOut", force3D: false, rotation:0.001},"frame2+=0.15")
        .to("#ellipse1",0.6,{scale:1.4145, ease:"power4.inOut"},"frame2+=0.2")
        
        .from("#h2Heading",0.3,{yPercent:"-=30", ease:"power3.out", force3D: false, rotation:0.001},"frame2+=0.6") 
        .to("#h2Heading",0.001,{opacity:1},"frame2+=0.6") /* <--- snap anim in */
        .from("#f2-circle-black-wrp, #f2-circle-red-wrp",0.5,{scale:0.4, ease:"power4.out", stagger:0.2},"frame2+=0.4")
        .to(".f2-circles",0.001,{opacity:1},"frame2+=0.4") /* <--- snap anim in */
        .to("#f2-circle-black",2.5,{rotate:-360, ease:"none"},"frame2+=0.5")
        .to("#f2-circle-red",2.5,{rotate:360, transformOrigin:"49% 50.5%",ease:"none"},"frame2+=0.5")

            //F2 OUT
            .addLabel("frame2Out","frame2+=1.6")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out-=1.6")
            .to(["#f2-circle-red-wrp", "#f2-circle-black-wrp", "#ellipse1"],1.2,{scale:5, ease:"power4.inOut", stagger:0.09, force3D: false},"frame2Out")
            .to("#heading1, #heading2",1.2,{rotate:90, ease:"power4.inOut", transformOrigin:"center 60%", force3D: false},"frame2Out+=0.3")


        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=0.75")
        .to("#heading3",0.001,{opacity:1},"frame3")
        .to("#heading1, #heading2",0.001,{opacity:0},"frame3")
        .from("#heading3",0.5,{rotate:-45, ease:"power4.out", transformOrigin:"center 60%", force3D: false},"frame3")
        .to("#h3OutlineTextTop",0.3,{y:-116, ease:"power4.out"},"frame3+=0.45")
        .to("#h3OutlineTextBot",0.3,{y:117, ease:"power4.out"},"frame3+=0.45")
        .from("#h3Heading",0.001,{opacity:0},"frame3+=0.45") /* <--- snap anim in */
        .to("#h3OutlineTextBot .splitted-lines",0.001,{opacity:1},"frame3+=0.7") /* <--- snap anim in */

            //F3 OUT
            .addLabel("frame3Out","+=0.15")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out-=0.1")
            .to("#heading3",0.5,{y:-900, ease:"power4.in"},"frame3Out")


        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=0.01")
        .set("#heading4, #h4Heading", {opacity:1},"frame4")
        .set("#ellipse1", {opacity:0},"frame4")
        .set("#main", {backgroundColor:"#E10014"},"frame4")
        .from("#ellipse2",0.6,{scale:0, ease:"power4.out"},"frame4")
        .from("#h4Heading",0.3,{scale:0, ease:"power4.out", force3D: false, rotation:0.001},"frame4+=0.3")

        .from("#f4-circle-black-wrp, #f4-circle-yellow-wrp",0.5,{scale:0.4, ease:"power4.out", stagger:0.1},"frame4+=0.1")
        .to(".f4-circles",0.001,{opacity:1},"frame4+=0.15") /* <--- snap anim in */
        .to("#f4-circle-black",3,{rotate:-360, ease:"none"},"frame4+=0.1")
        .to("#f4-circle-yellow",3,{rotate:360, transformOrigin:"49% 50.5%",  ease:"none"},"frame4+=0.1")

            //F4 OUT
            .addLabel("frame4Out","-=1.75")
            .add(() => LogFrameTimeStamp("frame 4"), "frame4Out")
            .to(["#f4-circle-yellow-wrp", "#f4-circle-black-wrp", "#ellipse2"],1,{scale:3, ease:"power4.inOut", stagger:0.09, force3D: false},"frame4Out")
            .to("#heading4",0.8,{scale:1.8, ease:"power4.inOut", transformOrigin:"center 55%", force3D: false},"frame4Out+=0.2")


        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=1.24")
        .from(".f5-circle-t",0.6,{yPercent:-50, ease:"power4.out", stagger:0.05},"frame5")
        .from(".f5-circle-b",0.6,{yPercent:50, ease:"power4.out", stagger:0.05},"frame5")

        .set("#heading4", {opacity:0},"frame5+=0.1")
        .set("#heading5", {opacity:1},"frame5+=0.1")

        .from("#h5Heading",0.3,{scale:0.7, ease:"power4.out", force3D: false, rotation:0.001},"frame5+=0.1")
        .to("#h5Heading",0.001,{opacity:1},"frame5+=0.1") /* <--- snap anim in */

            //F5 OUT
            .addLabel("frame5Out","-=0.1")
            .add(() => LogFrameTimeStamp("frame 5"), "frame5Out")
            // .set("#h5Heading",{letterSpacing:1})
            .to("#h5Heading",0.6,{scale:0.6, x:-3, y:-7, ease:"power3.inOut", force3D: false, rotation:0.001},"frame5Out")
            .to(".f5-circle-t",0.6,{yPercent:-50, ease:"power4.in", stagger:-0.05},"frame5Out")
            .to(".f5-circle-b",0.6,{yPercent:50, ease:"power4.in", stagger:-0.05},"frame5Out")


        //-------- F6 IN -------------------------------
        .addLabel("frame6","-=0.62")
            .from("#h6OutlineTextTop",1.6,{xPercent:"+=150", ease:"power3.out"},"frame6+=0.2")
            .from("#h6OutlineTextBot",1.6,{xPercent:"-=150", ease:"power3.out"},"frame6+=0.2")

            .from("#h6Heading",0.3,{yPercent:"+=120", ease:"power3.out", force3D: false, rotation:0.001},"frame6+=0.35") 
            .to("#h6Heading",0.001,{opacity:1},"frame6+=0.35") /* <--- snap anim in */

            //F6 OUT
            .addLabel("frame6Out","-=0.2")
            .add(() => LogFrameTimeStamp("frame 6"), "frame6Out")
            .to("#h6OutlineTextTop",0.8,{xPercent:"-=150", ease:"power3.in"},"frame6Out")
            .to("#h6OutlineTextBot",0.8,{xPercent:"+=150", ease:"power3.in"},"frame6Out")
            .to("#h5Heading, #h6Heading",0.4,{y:-50, ease:"power3.in", force3D: false, rotation:0.001},"frame6Out+=0.31") 


        //-------- F7 IN -------------------------------
        .addLabel("frame7","-=0.29")
            .from("#h7OutlineTextTop",1.6,{xPercent:"-=150", ease:"power3.out"},"frame7")
            .from("#h7OutlineTextBot",1.6,{xPercent:"+=150", ease:"power3.out"},"frame7")

            .set("#h5Heading, #h6Heading", {opacity:0},"frame7+=0.2")
            .from("#h7Heading .splitted-lines",0.4,{yPercent:"+=100", ease:"power4.out", stagger:0.1},"frame7+=0.2") 
            .to("#h7Heading .splitted-lines",0.001,{opacity:1, stagger:0.1},"frame7+=0.2") /* <--- snap anim in */

            //F7 OUT
            .addLabel("frame7Out","-=0.4")
            .add(() => LogFrameTimeStamp("frame 7"), "frame7Out")
            .to("#h7OutlineTextTop",1,{xPercent:"+=150", ease:"power3.in"},"frame7Out")
            .to("#h7OutlineTextBot",1,{xPercent:"-=150", ease:"power3.in"},"frame7Out")
            .from("#endframeBg",1,{clipPath: "inset(0 100% 0 0)", ease:"power4.out"},"frame7Out+=0.65")
            
        
        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.25")
        .set("#LogoMask1A", {right:"-160px",opacity:0}, "endFrame")
        .set("#BottomLogoA", {height:"0px"}, "endFrame")
        .set(".logo-fill", {fill:"#F8F3E9"}, "endFrame-=0.2")
        
        .from("#endFrameHeading .splitted-lines",0.65,{x:"-300", stagger:0.08, ease:"power4.out"},"endFrame")
        .to("#endFrameHeading .splitted-lines2 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"endFrame+=0.8")
        .to("#endFrameHeading .splitted-lines3 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"endFrame+=0.8")

        //Logo
        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"endFrame")
        .to("#businessLogo", 0.3,{x:0, ease:"power3.out"},"endFrame+=0.32")
        .to("#LogoMask1A", 0.8, {right:"0px", ease:"power4.inOut"}, "endFrame")
        .to("#LogoMask1A", 0.001, {opacity:1}, "endFrame+=0.15")
        .to("#BottomLogoA", 1,{height:"16px", ease:"power4.inOut"},"endFrame+=0.5")
        
        // CTA
        Creative.tl.addLabel("cta","-=1.1") 
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