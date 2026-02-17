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
        Creative.splitLines(["h1Heading","h3Heading"]);
        Creative.splitChars(["h2Heading"]);
        Creative.splittedChars([,"h5Heading","h6Heading","endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        //.set("#ellipse1, #ellipse2",{opacity:1}, "reset")
        .set("#ellipseWrapper",{rotation:"-15",},"reset")
        .set("#ellipse5, #ellipse8", {boxShadow: "0 0 0 -2px #F8F3E8, 0 0 0 0px #000000"},"reset")
        .set("#h2Heading, #h2HeadingCirc1Wrapper, #h3Heading, #h4Heading, #h5Heading, #h6Heading",{autoAlpha:0},"reset")
        //to delete
        .set("#h2HeadingCirc1, #h2HeadingCirc2",{autoAlpha:0},"reset")

        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        // frame 1 headline intro animation
        .from("#h1Heading",0.001,{opacity:0, ease:"power4.out"},"frame1")
        .from("#h1Heading .splitted-container",0.3,{y:"20", stagger:0.1, ease:"expo.out", force3D: false, rotation:0.001},"frame1+=0.25")
        .from("#h1Heading .splitted-container",0.001,{opacity:0, stagger:0.08, ease:"power4.out"},"frame1+=0.25")
        // logo
        .from("#logo", 0.5, {x:-100, ease: "power3.out"}, "frame1+=0.25")

        .addLabel("frame1a")
        // logo exit
        // ---- ellipse entrance animation --------
        .from(["#ellipse1","#ellipse2","#ellipse3","#ellipse4","#ellipse5","#ellipse6","#ellipse7","#ellipse8"],0.8,{
            scale:0,
            ease: "power4.inOut",
            stagger: {
                each: 0.09,
                onUpdate: function() {
                    if (this.progress() >= 0.54) {
                        gsap.to(this.targets()[0], { backgroundColor:' #E10014' })
                    }
                }
            }
        },"frame1a")
        .to("#logo", 0.5, {x: -100, ease: "power4.inOut"}, "frame1a+=0.45")
        
        .to("#ellipseWrapper",3,{rotation:"25"},"frame1a+=0.1")

        // ---- ellipse stroke animation --------
        .to("#ellipse5", {duration: 0.3, ease:"power4.out", boxShadow: "0 0 0 10px #F8F3E8, 0 0 0 11px #E10014"},"frame1a+=0.5")
        .to("#ellipse8", {duration: 0.3, ease:"power4.out", 
            boxShadow: "0 0 0 6px #F8F3E8, 0 0 0 7px #E10014, 0 0 0 11px #F8F3E8, 0 0 0 12px #E10014"
        },"frame1a+=0.7")

            //F1 OUT
            .addLabel("frame1Out","frame1+=3.52")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out-=4.12")
            .to(".ellipse",0.4,{scale:0, ease:"power2.out"},"frame1Out")
            .to("#ellipseWrapper",0.3,{rotation:"20", ease:"power2.out"},"frame1Out")
            .to("#h1Heading",0.4,{rotation:"-30", scale:0.9, ease:"power4.out"},"frame1Out")

        //-------- F2 IN -------------------------------
        .addLabel("frame2","frame1Out")
        .set("#h2Heading, #h2HeadingCirc1Wrapper",{autoAlpha:1},"frame2")
        // frame 2 circle comes in
        .from("#h2HeadingCirc",0.25,{scale:0, force3D: false,  ease:"none"},"frame2")
        // frame  headline intro animation
        .from("#h2Heading",0.4,{scale:0, force3D: false, ease:"power4.out", rotation:0.001},"frame2+=0.3")
        // frame 2 circle stroke
        .from(".h2CircOutline",1,{
            scale:0.4,
            opacity:0,
            ease: "power4.out",
            stagger: {
                each: 0.1,
                onUpdate: function() {
                    if (this.progress() >= 0.6) {
                        gsap.to(this.targets()[0], 0.2, { opacity:0, stagger:0.2, onComplete:()=>{
                            gsap.to(this.targets()[0], 0.001, { opacity:1 })
                        } })
                    }
                }
            },
            repeat:1,
            repeatDelay: -0.18
        },"frame2+=0.4")
        
            //F2 OUT
            .addLabel("frame2Out","-=0.3")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out")
            // frame 2 circle stroke moving to center
            .set("#h1Heading",{opacity:0},"frame2Out")
            .to("#h2HeadingCirc",1,{scale:4, ease:"power2.out"},"frame2Out")
            .to("#h2Heading",0.7,{scale:0.3, ease:"power3.out"},"frame2Out")
            .from("#h3CircOutline",0.1, {opacity:0},"frame2Out")
            
        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=0.81")
        .set("#h2Heading",{opacity:0},"frame3")
        .from("#h3Heading",0.4,{scale:0.6, ease:"power3.out",onStart:()=>{ gsap.set("#h3Heading",{autoAlpha:1}) }},"frame3")

        .from("#h3HeadingLiner1",0.5,{
            x:-300,
            ease: "power3.out",
            onComplete: function() {
                gsap.to(this.targets()[0], 1.7, { x:200, ease: "expo.in"},0.1)
            }
        },"frame3")
        .from("#h3HeadingLiner2",0.5,{
            x:300,
            ease: "power3.out",
            onComplete: function() {
                gsap.to(this.targets()[0], 1.7, { x:-200, ease: "expo.in" },0.1)
            }
        },"frame3")

            //F3 OUT
            .addLabel("frame3Out","+=1.03")
            .set(".h2CircOutline",{opacity:0},"frame3Out")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out-=1.03")
            .to("#h3Heading",0.3,{scale:0.2, ease:"power3.out"},"frame3Out")

        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=0.2")
        .set("#heading4", {opacity:1}, "frame4")
        .set("#h3CircOutline, #h3Heading, #h2HeadingCirc",{opacity:0},"frame4")
        .from("#h4Heading",0.3,{scale:0, ease:"power2.out",onStart:()=>{ gsap.set("#h4Heading",{autoAlpha:1}) }},"frame4")

        .from(["#h4HeadingLiner1","#h4HeadingLiner2"],1,{
            x:200,
            stagger:0.1,
            ease: "power3.out",
            onComplete: function() {
                // gsap.to(this.targets(), 0.2, { x:-300, stagger:0.05, ease: "power4.in", delay:0.1});
                gsap.to(this.targets(), 1, { x:-300, stagger:0.05, ease: "expo.in" })
            }
        },"frame4+=0.1")
        .from(["#h4HeadingLiner3","#h4HeadingLiner4"],1,{
            x:-200,
            stagger:0.1,
            ease: "power3.out",
            onComplete: function() {
                // gsap.to(this.targets(), 0.2, { x:300, stagger:0.05, ease: "power4.in", delay:0.1});
                gsap.to(this.targets(), 1, { x:300, stagger:0.05, ease: "expo.in" })
            }
        },"frame4+=0.1")

            //F4 OUT
            .addLabel("frame4Out","+=0.7")
            .add(() => LogFrameTimeStamp("frame 4"), "frame4Out-=0.7")
            .to("#h4Heading",0.5,{scale:0.5, ease:"power3.out"},"frame4Out")

        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=0.35")
        .set("#h4Heading", {opacity:0}, "frame5")
        // frame 5 lines and circle intro animation
        .fromTo("#h5ShapeWrapper",{x:-300},{x:400, ease:"none", duration:1.8},"frame5")
        // frame 5 headline intro animation
        .from("#h5Heading .splitted-lines",0.65,{x:"-300", stagger:0.08, ease:"power4.out",onStart:()=>{ gsap.set("#h5Heading",{autoAlpha:1}) }},"frame5")

            //F5 OUT
            .addLabel("frame5Out","-=0.7")
            .add(() => LogFrameTimeStamp("frame 5"), "frame5Out")
            // frame 5 headline exit animation
            .to("#h5Heading .splitted-lines",0.5,{x:300, stagger:0.08, ease:"power3.in"},"frame5Out")

        //-------- F6 IN -------------------------------
        .addLabel("frame6")
        // frame 6 lines and circle intro animation
        .fromTo("#h6ShapeWrapper",{x:300},{x:-400, ease:"none", duration:1.8},"frame6")
        // frame 6 headline intro animation
        .from("#h6Heading .splitted-lines",0.65,{x:"-300", stagger:0.08,  ease:"power4.out",onStart:()=>{ gsap.set("#h6Heading",{autoAlpha:1}) }},"frame6")
            //F6 OUT
            .addLabel("frame6Out","-=0.65")
            .add(() => LogFrameTimeStamp("frame 6"), "frame6Out")
            .to("#h6Heading .splitted-lines",0.3,{x:300, stagger:0.08, ease:"power3.in"},"frame6Out")
        
        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=0.4")
        .set("#endframe", {opacity:1}, "endFrame")
        .set(".logo-fill", {fill:"#F8F3E9"}, "endFrame")
        .set("#logo", {x: 0}, "endFrame")
        .set("#logo",{scale:0.8, clipPath:'polygon(0% 0%, 0% 0px, 0% 100%, 0px 100%)', ease:"power1.out"},"endFrame")
        // frame 6 background masking
        .to("#endframeRect",0.6,{clipPath:'polygon(0% 0%, 100% 0, 100% 100%, 0 100%)', ease:"power4.inOut"},"endFrame")
        // endframe headline intro animation
        .from("#endFrameHeading",0.001,{opacity:0, ease:"power4.out"},"endFrame+=0.28")
        .from("#endFrameHeading .splitted-lines",0.55,{x:"-300", stagger:0.08, ease:"power4.out"},"endFrame+=0.28")
        .to("#endFrameHeading .splitted-lines3 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"endFrame+=1.1")
        .to("#logo",0.4,{scale:1, clipPath:'polygon(0% 0%, 100% 0px, 100% 100%, 0px 100%)', ease:"power1.out"},"endFrame+=0.45")

        //Logo
        // .to("#logo", 0.3, {x: 0, ease: "power4.out"}, "endFrame+=0.7")
        
        // CTA
        Creative.tl.addLabel("cta","-=1.2") 
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