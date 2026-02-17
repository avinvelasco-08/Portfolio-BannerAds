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
                getById("headingFrame").style.setProperty('padding', '14px 10px 14px 10px');
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
        Creative.splitLines(["h1Heading","h2Heading","h3Heading","h4Heading","h5Heading","h6Heading","endFrameHeading"]);
        Creative.splitChars(["h6Heading"])
        
        // reset elements to initial states -------------------------------
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#ctaArrow", {autoAlpha: 0, x:-77}, "reset")
        .set("#h1Heading", {opacity: 0}, "reset")
        .set("#heading4", {opacity: 0}, "reset")
        .set("#heading5", {opacity: 0}, "reset")
        .set("#heading6", {opacity: 0}, "reset")
        .set("#h3Heading .splitted-container:nth-child(2)",{opacity:0}, "reset")
        .set("#h3Heading .splitted-container:nth-child(3)",{opacity:0}, "reset")
        .set("#h4Heading .splitted-container:nth-child(3)",{opacity:0}, "reset")
        .set("#BottomLogoA",{clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}, "reset")
        .set("#powerButton",{y:0},"reset")

        //-------- F1 IN -------------------------------
        .addLabel("frame1", "+=0.1")
        .from("#powerButton",0.7,{y:115, ease:"expo.out"},"frame1")
        .to("#powerRecRed",0.4,{scaleY:0, ease:"expo.out"},"frame1+=0.15")
        .set("#powerCirc, #powerRecBeige",{fill:"#F3EDE0"},"frame1+=0.6")
        .set("#h1Heading", {opacity: 1, onComplete: () => LogFrameTimeStamp("frame1Out","Frame 1")},"frame1+=0.6")
            
            //F1 OUT
            .addLabel("frame1Out","+=0.4")
            .to("#powerButton",1.6,{transform: "translate3d(0%, 0%, 1px) scale(0.7)", ease:"expo.out"},"frame1Out")
            .to("#heading1",1.6,{transform: "translate3d(0%, 2%, 1px) scale(0.7)", ease:"expo.out"},"frame1Out")
            
        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.9")
        .set("#powerButton, #heading1",{opacity:0},"frame2")
        .from("#h2Heading",0.001,{opacity:0, ease:"power3.out"},"frame2")
        .from("#h2Eyebrow",0.35,{y:"20", stagger:0.08, ease:"power3.out"},"frame2")
        .from("#h2Eyebrow",0.001,{opacity:0, stagger:0.08, ease:"power3.out"},"frame2")
        .from("#h2Heading .splitted-container",0.35,{y:"60", stagger:0.08, ease:"power3.out"},"frame2+=0.1")
        .from("#h2Heading .splitted-container",0.001,{opacity:0, stagger:0.08,  ease:"power3.out"},"frame2+=0.1")
        .from("#h2SubHead",0.5,{opacity:0, ease:"power3.out"},"frame2+=0.5")
        .from("#h2SubLegal",0.5,{autoAlpha:0, onComplete: () => LogFrameTimeStamp("frame2Out","Frame 2")},"frame2+=0.6")

            //F2 OUT
            .addLabel("frame2Out","+=0.2")
            .to("#h2Heading .splitted-container",0.5,{y:"-100", stagger:0.05, ease:"power3.out"},"frame2Out")
        
        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=0.4")
        .set("#heading2",{opacity:0},"frame3")
        
        .from("#h3CircMask",0.6,{transform: "translate3d(0%, 0%, 1px) scale(2.7)", ease:"expo.out"},"frame3-=0.1")
        .from("#h32Heading",0.001,{opacity:0, ease:"power3.out"},"frame3-=0.1")
        .from("#h3Heading",0.35,{y:"20", ease:"power3.out"},"frame3+=0.1")
        .from("#h3Heading",0.001,{opacity:0, ease:"power3.out"},"frame3+=0.1")

        .set("#h3Heading .splitted-container:nth-child(1)",{color:"#000000"}, "frame3+=0.7")
        .set("#h3Heading .splitted-container:nth-child(2)",{opacity:1}, "frame3+=0.76")
        .set("#h3Heading .splitted-container:nth-child(3)",{opacity:1}, "frame3+=0.76")

        .to("#h3CircMask",0.6,{transform: "translate3d(0%, 0%, 1px) scale(1.34)", ease:"expo.out"},"frame3+=0.7")
        .to("#h3Heading .splitted-container:nth-child(1)",0.3,{y:-56, ease:"power3.out"},"frame3+=0.7")
        .from("#h3Heading .splitted-container:nth-child(2)",0.3,{transform: "translate3d(0%, 0%, 1px) scale(.7)", ease:"power3.out"},"frame3+=0.76")
        .to("#h3Heading .splitted-container:nth-child(3)",0.3,{y:20, ease:"power3.out"},"frame3+=0.76")
        
        .from("#h3SubLegal",0.5,{autoAlpha:0, onComplete: () => LogFrameTimeStamp("frame3Out","Frame 3")},"frame3+=0.76")

            //F3 OUT
            .addLabel("frame3Out","+=0.7")
            .to("#h3Heading .splitted-container",0.3,{y:"-=150", stagger:0.03, ease:"expo.in"},"frame3Out")
            .to("#h3CircMask",0.3,{y:"-150",transform: "translate3d(0%, 0%, 1px) scale(1.1)", ease:"expo.in"},"frame3Out+=0.05")

        //-------- F4 IN -------------------------------
        .addLabel("frame4", "-=0.05")
        .set("#heading3",{opacity:0},"frame4")
        .set("#heading4",{opacity:1},"frame4")
        .set("#main", {backgroundColor: "#F3EDE0"}, "frame4")
        .from("#h4Heading",0.5,{transform: "translate3d(0%, 0%, 1px) scale(.5)", ease:"power3.out"},"frame4")
        .to("#h4Heading .splitted-container:nth-child(1)",0.5,{x:-85, ease:"power3.out"},"frame4+=0.3")
        .to("#h4Heading .splitted-container:nth-child(2)",0.5,{x:-67, ease:"power3.out"},"frame4+=0.3")

        .set("#h4Heading .splitted-container:nth-child(3)",{opacity:1,x:-98},"frame4+=0.8")
        .to("#h4Heading",0.5,{y:-52, ease:"power3.out"},"frame4+=0.8")
        
        .from("#h4SubLegal",0.5,{autoAlpha:0, onComplete: () => LogFrameTimeStamp("frame4Out","Frame 4")},"frame4+=0.8")
            //F4 OUT
            .addLabel("frame4Out")
            .to("#h4Heading",0.5,{y:-200, ease:"power3.inOut"},"frame4Out")

        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=0.2")
        .set("#heading4", {opacity: 0}, "frame5")
        .set("#heading5", {opacity: 1}, "frame5")
        .from("#h5Heading",0.5,{y:100, ease:"power3.out"}, "frame5")
        .to("#h5Heading .splitted-container",0.2,{marginTop:9, marginBottom:9}, "frame5+=0.2")
        .from("#h5SubLegal",0.5,{autoAlpha:0, onComplete: () => LogFrameTimeStamp("frame5Out","Frame 5")},"frame5")

            //F5 OUT
            .addLabel("frame5Out")
            .to("#h5Heading .splitted-container",1,{x:"-350", stagger:0.08, ease:"power3.inOut"},"frame5Out")
        
        //-------- F6 IN -------------------------------
        .addLabel("frame6","-=0.6")
        .set("#heading5", {opacity: 0}, "frame6")
        .set("#heading6", {opacity: 1}, "frame6")
        .set("#main", {backgroundColor: "#F50A23"}, "frame6")
        .from("#h6Circ",1,{x:200, ease:"power3.out"}, "frame6")
        .from("#heading6 .splitted-container",0.5,{x:200, stagger:0.02, ease:"power3.out"},"frame6")
        .set("#heading6 .splitted-container:nth-child(2) div",{color:"#FFFFFF", stagger:0.08},"frame6+=0.4")
        .to("#heading6 .splitted-container:nth-child(2)",0.3,{fontSize:60, stagger:0.08},"frame6+=0.4")
        .from("#h6SubLegal",0.5,{autoAlpha:0, onComplete: () => LogFrameTimeStamp("frame6Out","Frame 6")},"frame6+=0.4")
            
            //F6 OUT
            .addLabel("frame6Out","+=0.3")
            .to("#h6Heading",0.5,{y:-200, ease:"power3.inOut"},"frame6Out")
            .to("#h6Circ",0.75,{y:-200, ease:"power3.inOut"}, "frame6Out-=0.1")
        
            //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.4")
        .set("#heading6", {opacity: 0}, "endFrame")
        .set("#main", {backgroundColor: "#F3EDE0"}, "endFrame")
        .from("#endFrameHeading",0.001,{opacity:0, ease:"power3.out"},"endFrame")
        .from("#endFrameEyebrow",0.35,{y:"20", stagger:0.08, ease:"power3.out"},"endFrame")
        .from("#endFrameEyebrow",0.001,{opacity:0, stagger:0.08, ease:"power3.out"},"endFrame")
        .from("#endFrameHeading .splitted-container",0.35,{y:"20", stagger:0.08, ease:"power3.out"},"endFrame+=0.2")
        .from("#endFrameHeading .splitted-container",0.001,{opacity:0, stagger:0.08, ease:"power3.out"},"endFrame+=0.2")
        
        //Logo
        .set("#businessLogo", {autoAlpha: 1},"endFrame") //clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        .from("#TopLogoA",0.3,{x:-100}, "endFrame+=0.05")
        .to("#BottomLogoA",0.3,{clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, "endFrame+=0.5")
        .from("#endFrameSubHead",0.5,{opacity:0, ease:"power3.out", onComplete:function(){
            console.log("======== END FRAME ========");
        }},"endFrame+=0.5")
        
        // CTA
        Creative.tl.addLabel("cta","-=1") 
        .set("#ctaArrowOnly", {autoAlpha: 1},"cta")
        .from("#ctaArrowOnly svg",0.3, {xPercent: -100},"cta")

        Creative.tl.from("#endFrameSubLegal",0.5,{autoAlpha:0, ease:"power3.out", onComplete: function() {
            /* ENABLE HOTSPOT */
            if(getById('underlinedText') !== null){
               Creative.addTooltip();
               gsap.set("#hotspot", { autoAlpha: 1 });
            }else{
               gsap.set("#hotspot", { autoAlpha: 1 }); 
            }
            /* END ENABLE HOTSPOT */
        }},"endFrame+=0.8")
        
		console.log("Total Ad Duration = ", Creative.tl.duration() )
    }
};

function LogFrameTimeStamp(label,name) {
    const diff = Creative.tl.labels[label] - Creative.tl.time();
    //  console.log(`${name} = ${diff} seconds`);
    console.log(`======== ${name}:`, diff+" seconds ======== ");
}

function getById(eleID) {
    return document.getElementById(eleID);
}