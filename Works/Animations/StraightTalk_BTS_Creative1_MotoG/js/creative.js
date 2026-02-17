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

var counter = 1;

// content
var verticalText = getById("verticalText")
var container = getById("main");
var loadingContent = getById("loading_content");
var disclaimerBtn = getById("disclaimerBtn");
var disclaimerContent = getById("disclaimerContent");
var closeBtn = getById("closeBtn");


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
    bg: gsap.timeline({
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
        // if (hotspotCreated) {
            // gsap.set("#hotspot", {
            //     autoAlpha: 0
            // }, "reset")
        // }
    },

    onDisclaimerClick: function(e) {
        gsap.to("#disclaimerContent, #closeBtn", { autoAlpha: 1, duration: 0.3 });
        gsap.set("#disclaimerBtn", { autoAlpha: 0})
    },

    onCloseClick: function(e) {
        gsap.to("#disclaimerContent, #closeBtn", { autoAlpha: 0, duration: 0.3 });
        gsap.set("#disclaimerBtn", { autoAlpha: 1})
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
                getById("headingFrame").style.setProperty('padding', '24px 10px 14px 10px');
                break;
            }
        }
        Creative.init();

        Creative.checkIsBackup() ? Creative.jumpToEndFrame() : null;
    },

    createButtons: function() {
        // closeBtn.addEventListener("click", Creative.onCloseClick);
        closeBtn.style.display="none";
        // exitBtn.addEventListener("mouseout", Creative.onCloseClick);
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
        Creative.splitLines(["h1Eyebrow","h1Heading","h1SubHead","endFrameEyebrow","endFrameHeading","endFrameSubHead"]);
        
        // bg pattern movement
        Creative.bg.addLabel("patternAnim", 0)
        .to("#stripes",{duration:22, x:100, ease:"power4.out"}, "patternAnim+=4.55")
        // bg pattern animation
        .to(".patternLine", {
            duration: 3.9,
            scaleY: 5.3,
            transformOrigin: "center",
            ease: "power2.inOut",
            stagger:{from:"end", each: 0.6, yoyo: true, repeat:9, repeatDelay:-0.12},
        }, "patternAnim")
        Creative.bg.seek(4.55)
        .add(() => Creative.bg.pause(), 13);

        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#closeBtn",{autoAlpha:0}, "reset")
        .set(".stripes-thin-rect", {fill: _dynamicData.bgPatternColor }, "reset")
        .set("#main", {backgroundColor: _dynamicData.bgColor }, "reset")
        .set("#innerBubble", {fill: _dynamicData.bubbleInnerColor }, "reset")
        .set("#outerBubble", {fill: _dynamicData.bubbleOuterColor }, "reset")
        
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        .from("#heading1 .splitted-container",0.7,{y:"20", stagger:0.2, ease:"power4.out"},"frame1")
        .from("#heading1 .splitted-container",0.5,{opacity:0, stagger:0.2, ease:"power4.out"},"frame1")

            //F1 OUT
            .addLabel("frame1Out","frame1+=3")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out-=3")
            .to(["#heading1 .splitted-container"],0.5,{opacity:0, ease:"power4.out"},"frame1Out")


        //-------- F2 DEVICE IN -------------------------------
        .addLabel("device",3.2)
        .to("#deviceFrame",0.001,{autoAlpha:1},"device")
        .from("#f2Device_name",0.5,{autoAlpha:0, ease:"power4.out"},"device")
        .from(["#f2Device_left","#f2Device_right"],1,{y:"100%", stagger:0.2, ease:"power4.out"},"device")
        
            //F2 DEVICE OUT
            .addLabel("deviceOut","device+=3.2") 
            .add(() => LogFrameTimeStamp("Frame 3"), "deviceOut-=3.2")
            .to("#f2Device_name",0.5,{autoAlpha:0, ease:"power4.out"},"deviceOut")
            .to(["#f2Device_left","#f2Device_right"],0.35,{opacity:0, ease:"power4.out"},"deviceOut")


        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame",6.6)
        .from("#endframe .splitted-container",0.7,{y:"20", stagger:0.2, ease:"power4.out"},"endFrame")
        .from("#endframe .splitted-container",0.5,{opacity:0, stagger:0.2, ease:"power4.out"},"endFrame")
        .from("#disclaimerBtn",0.5,{autoAlpha:0, ease:"power4.out", onComplete: function() {
            LogFrameTimeStamp("Frame 4");
            disclaimerBtn.addEventListener("click", Creative.onDisclaimerClick);
            exitBtn.addEventListener("mouseout", Creative.onCloseClick);
        }},">")
        
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

