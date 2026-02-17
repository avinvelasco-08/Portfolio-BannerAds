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
        var legal = "wide";
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
                getById("headingFrame").style.setProperty('padding', '15px 15px 15px 15px');
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
                var splitText = new SplitText(targetCopy, {type:"chars", charsClass:"splitted-chars++ splitted-chars"});
                splittedChars[index] = splitText.chars;
            }
        })
    },
    
    splitWords: function(copyId) {
        copyId.forEach((ids, index) => {
            const targetCopy = getById(ids);
            if (targetCopy && targetCopy.innerHTML.length > 0) {
                var splitText = new SplitText(targetCopy, {type:"words", wordsClass:"splitted-words++ splitted-words"});
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
        Creative.splitLines(["h1Heading","h2Heading","h3Heading","h4Heading","h5Heading","endFrameEyebrow","endFrameHeading"]);
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
        const arrowsF1 = gsap.utils.toArray("#f1ArrowContainer .arrow-rect img");
        const firstFourF1 = gsap.utils.toArray("#f1ArrowContainer .arrow-rect").slice(0, 5);
        const arrowsF5 = gsap.utils.toArray("#f5ArrowContainer .arrow-rect img");
        const firstFourF5 = gsap.utils.toArray("#f5ArrowContainer .arrow-rect").slice(0, 5);
        const centerIndex = 3;
        const spread = 30;

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
        .addLabel("frame1")

        .from("#h1Heading .splitted-lines", 0.35, {y:45, stagger:0.1, ease: "power3.out"}, "frame1")
        .from("#h1Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame1")

        .addLabel("frame1Arrow", "+=0.01")
        .from(firstFourF1, 1.2, {
            ease: "power4.out", y: "120%",
            stagger:{  
                each: 0.125,
                from: 5
            },
            onStart:()=>{
                gsap.to(arrowsF1, {
                    duration: 0.5,
                    delay:0.9,
                    ease: "sine.in",
                    y: (i) => {
                        if (i === 2) return 0; // 3rd element stays in place (no movement)
                        const offset = i - centerIndex;
                        if (offset === 0) return spread; // 4th moves down based on value of cons spread
                        return offset > 0
                        ? spread + offset * 60 // elements below move down more
                        : -(spread + Math.abs(offset) * 10); // elements above move up
                    },
                })
                gsap.to("#f1ArrowContainer",3.69,{delay: 1.35, y:"-500%",ease:"power1.in"})
            }
        }, "frame1Arrow")
            //F1 OUT
            .addLabel("frame1Out","-=0.7")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")
            .to("#h1Heading .splitted-lines", 0.35, {y:"-=100", stagger:0.1, ease: "power3.in"}, "frame1Out+=0.1")
            .to("#h1Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame1Out+=0.3")

            .to(["#logoTop","#logoBottom"], 0.705, {x:-300, ease: "power3.in"}, "frame1Out")
            .fromTo("#logoContainer", 0.45, {clipPath:"polygon(0% 0, 100% 0, 100% 100%, 0% 100%)"}, {clipPath:"polygon(25% 0, 100% 0, 100% 100%, 25% 100%)", ease: "power3.in"}, "frame1Out-=0.1")

            // .set("#f1ArrowContainer",{autoAlpha:0})

        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.32")
        .from("#h2Heading .splitted-lines", 0.35, {y:50, stagger:0.1, ease: "power3.out"}, "frame2")
        .from("#h2Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame2")
         
            //F2 OUT
            .addLabel("frame2Out","+=1")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out-=0.68")
            .to("#h2Heading .splitted-lines", 0.35, {y:"-=100", stagger:0.08, ease: "power3.in"}, "frame2Out")
            .to("#h2Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame2Out+=0.3")
        
        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=0.08")
        .from("#h3Heading .splitted-lines1", 0.35, {y:50, ease: "power3.out"}, "frame3")
        .from("#h3Heading .splitted-lines1", 0.0001, {opacity:0, ease: "power4.out"}, "frame3")
        .from("#h3Heading .splitted-lines2", 0.35, {scale:1.5, ease: "power3.out"}, "frame3+=0.6")
        .from("#h3Heading .splitted-lines2", 0.0001, {opacity:0, ease: "power4.out"}, "frame3+=0.6")
        
            //F3 OUT
            .addLabel("frame3Out","+=0.6")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out-=0.5")
            .to("#h3Heading .splitted-lines", 0.465, {y:"-=50", stagger:0.08, ease: "power3.in"}, "frame3Out")
            .to("#h3Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame3Out+=0.465")

        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=0.07")
        .from("#h4Heading .splitted-lines", 0.35, {x:-250, stagger:0.1, ease: "power3.out"}, "frame4")
        .from("#h4Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame4")
        
            //F4 OUT
            .addLabel("frame4Out","+=0.9")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame4Out-=0.83")
            .to("#h4Heading .splitted-lines", 0.35, {x:"+=300", stagger:0.1, ease: "power3.in"}, "frame4Out")
            .to("#h4Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame4Out+=0.335")

        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=0.12")
        .from("#h5Heading .splitted-lines", 0.45, {x:-200, stagger:0.1, ease: "power3.out"}, "frame5")
        .from("#h5Heading .splitted-lines", 0.0001, {opacity:0, stagger: 0.05, ease: "power4.out"}, "frame5")
        // .from("#f5ArrowContainer .arrow-rect", 1.2, {ease: "back.out(1.5)", y: "100%", stagger:-0.08}, "frame5-=0.5")
        // .to("#f5ArrowContainer",2,{x:"400%",ease:"power2.in"}, "frame5+=0.25")

        .addLabel("frame5Arrow", "-=1.42")
        .from(firstFourF5, 1.2, {
            ease: "power4.out", y: "120%",
            stagger:{  
                each: 0.125,
                from: 4
            },
            onStart:()=>{
                gsap.to(arrowsF5, {
                    duration: 0.5,
                    delay:0.9,
                    ease: "sine.in",
                    y: (i) => {
                        if (i === 2) return 0; // 3rd element stays in place (no movement)
                        const offset = i - centerIndex;
                        if (offset === 0) return spread; // 4th moves down based on value of cons spread
                        return offset > 0
                        ? spread + offset * 60 // elements below move down more
                        : -(spread + Math.abs(offset) * 10); // elements above move up
                    },
                })
                gsap.to("#f5ArrowContainer",2,{delay: 1.35, x:"500%",ease:"power1.in"})
            }
        }, "frame5Arrow")
        
            //F5 OUT
            .addLabel("frame5Out","+=0.6")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame5Out-=0.82")
            .set("#f5ArrowContainer",{autoAlpha:0},"frame5Out+=0.3")
            .to("#h5Heading .splitted-lines", 0.35, {x:"+=250", stagger:0.08, ease: "power3.in"}, "frame5Out")
            .to("#h5Heading .splitted-lines", 0.0001, {opacity:0, ease: "power4.out"}, "frame5Out+=0.388")
        
        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.04")

        //.set("#logo", {xPercent:"-350"},"endFrame")
        .set(["#logoTop","#logoBottom"], {x:0,opacity:0}, "endFrame") 
        .set("#logoTopSVG", {x:12}, "endFrame")
        .set("#logoBottomMask", {height:0}, "endFrame")
        .set("#logoContainer", {clipPath:""},"endFrame")

        .from("#endFrameEyebrow .splitted-lines", 0.3, {y:30, stagger:0.1, ease: "power3.out"}, "endFrame")
        .from("#endFrameEyebrow .splitted-lines", 0.0001, {opacity:0, stagger: 0.08, ease: "power4.out"}, "endFrame")

        .from("#endFrameHeading .splitted-lines", 0.3, {y:30, stagger:0.1, ease: "power3.out"}, "endFrame+=0.6")
        .from("#endFrameHeading .splitted-lines", 0.0001, {opacity:0, stagger: 0.08, ease: "power4.out"}, "endFrame+=0.6")
          
        .addLabel("ctaLogo","+=0.5")
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
        // }},"endFrame+=0.4")
        
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

