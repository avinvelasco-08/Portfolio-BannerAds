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
        Creative.splittedChars(["h3Heading","endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#businessLogo", { display:"flex", xPercent:0, autoAlpha:1 }, "reset")
        .set("#ellipse3, #ellipse4",{x:-10, opacity:0}, "reset")
        .set("#ellipse1, #ellipse2",{opacity:1}, "reset")
        .set("#ellipseWrapper",{rotation:"0",},"reset")
        .set("#ellipse1", {boxShadow: "0 0 0 -2px #F8F3E8, 0 0 0 0px #000000"},"reset")
        
        //-------- F1 IN -------------------------------
        .addLabel("frame1")
        .from("#h1Heading",0.001,{opacity:0, ease:"power4.out"},"frame1")
        .from("#h1Heading .splitted-container",0.3,{y:"20", stagger:0.08, ease:"expo.out", force3D: false, rotation:0.001},"frame1+=0.4")
        .from("#h1Heading .splitted-container",0.001,{opacity:0, stagger:0.08, ease:"power4.out"},"frame1+=0.4")
        // logo
        .to("#businessLogo", 0.001,{autoAlpha:1},"frame1")
        .from("#businessLogo", 0.5,{x:-100, ease:"power3.out"},"frame1")
        .to("#LogoMask1A", 0.5, {right:"0px", ease:"power4.inOut"}, "frame1")
        .to("#LogoMask1A", 0.001, {opacity:1}, "frame1")
        .to("#BottomLogoA", 0.8,{height:"16px", ease:"power4.inOut"},"frame1+=0.5")

        // ellipse 1st anim - from outside the stage
        .from("#ellipse1",1,{x:"+=350", y:"-=90", ease:"expo.out"},"frame1+=0.45")
        .from("#ellipse2",1,{x:"-=350", y:"+=50", ease:"expo.out"},"frame1+=0.45")

            //F1 OUT
            .addLabel("frame1Out","-=0.41")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out")
            // ellipse 2nd anim - wrapper rotation
            .to("#ellipseWrapper",1.85,{rotation:"-300", ease:"power2.inOut"},"frame1Out")
            // logo
            .to("#businessLogo", 0.001,{autoAlpha:0},"frame1Out+=0.75")
            .to("#businessLogo", 0.001,{x:-100},"frame1Out+=0.75")
            // ellipse 2nd anim - ellipse moving closer to center
            .to("#ellipse1",1.25,{x:126, y:81, ease:"power2.in"},"frame1Out+=0.2")
            .to("#ellipse2",1.25,{x:-112, y:-126, ease:"power2.in", onComplete:()=>{ 
                gsap.set("#ellipse3, #ellipse4", {opacity:1}) 
                gsap.set("#ellipseWrapper", {zIndex: 0, rotation:"0"})
            }},"frame1Out+=0.2")
            .to("#h1Heading",0.5,{scale:"0", ease:"power2.in", force3D: false, rotation:0.001},"frame1Out+=0.65")
            .to("#h1Heading",0.001,{opacity:0},"frame1Out+=1.2")


        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.26")
        // ---- ellipse2 setup to black stroke before expanding--------
        .to("#ellipse2", {duration: 0.001, boxShadow: "0 0 0 -2px #F8F3E8, 0 0 0 0px #000000"},"frame2")
        // 4 ellipses expands animation
        .to("#ellipse1",0.5,{x:44, y:4, scale:1.29, ease:"expo.out"},"frame2")
        .to("#ellipse2",0.5,{x:-30, y:-49, scale:1.29, ease:"expo.out"},"frame2")
        .to("#ellipse3",0.5,{x:73, y:-78, scale:1.29, ease:"expo.out"},"frame2")
        .to("#ellipse4",0.5,{x:-92, y:78, scale:1.29, ease:"expo.out"},"frame2")
        .from("#h2HeadingRect",0.6,{scale:0, ease:"power3.out"},"frame2+=0.05")
        .from("#h2Heading",0.3,{scale:0, ease:"power3.out", force3D: false, rotation:0.001},"frame2+=0.2")
        // ---- ellipse stroke animation --------
        .to("#ellipse1", {duration: 0.3, ease:"power4.out", boxShadow: "0 0 0 6px #F8F3E8, 0 0 0 7px #000000"},"frame2+=0.3")
        .to("#ellipse2", {duration: 0.3, ease:"power4.out", boxShadow: "0 0 0 6px #F8F3E8, 0 0 0 7px #000000"},"frame2+=0.3")
        
            //F2 OUT
            .addLabel("frame2Out","+=0.65")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out-=1.5")
            .to("#h2Heading",0.5,{xPercent:-50, force3D: false, rotation:0.001, ease:"power1.in"}, "frame2Out")
            .to("#h2Heading .splitted-chars",0.001,{opacity:0, stagger:0.05}, "frame2Out")
            .to("#h2HeadingRect",0.7,{scale:0, ease:"expo.in"},"frame2Out")
            
            // ---- all ellipses Place to center --------
            .to("#ellipse1",0.7,{x:126, y:82, scale:2.3, ease:"expo.in"},"frame2Out")
            .to("#ellipse2",0.7,{x:-123, y:-116, scale:2.3, ease:"expo.in"},"frame2Out")
            .to("#ellipse3",0.7,{x:-10, y:0, scale:2.3, ease:"expo.in"},"frame2Out")
            .to("#ellipse4",0.7,{x:-10, y:0, scale:2.3, ease:"expo.in", onComplete:()=>{ 
                gsap.set("#ellipse2, #ellipse3, #ellipse4", {opacity:0})
            }},"frame2Out")
            
            // ---- ellipse stroke animation out --------
            .to("#ellipse1", {duration: 0.7, ease:"power4.out", boxShadow: "0 0 0 -2px #F8F3E8, 0 0 0 0px #000000"},"frame2Out")
            .to("#ellipse2", {duration: 0.7, ease:"power4.out", boxShadow: "0 0 0 -2px #F8F3E8, 0 0 0 0px #000000"},"frame2Out")
            
            
        //-------- F3 IN -------------------------------
        .addLabel("frame3")
        // ---- ellipse1 setup before expanding--------
        .to("#ellipse1", {duration: 0.001, boxShadow: "0 0 0 -0.1em #F8F3E8, 0 0 0 0px #000000, 0 0 0 0em #F8F3E8, 0 0 0 0em #E10014"},"frame3")
        .from("#h3Heading",0.4,{scale:0.7, ease:"power4.out",onStart:()=>{ gsap.set("#h3Heading",{opacity:1}) }},"frame3")
        .to("#ellipse1",0.5,{scale:2.9, x:125, y:81, ease:"expo.out"},"frame3")
        // BLACK BIG STROKE -----
        .to("#ellipse1", 0.3, {ease:"power4.out", force3D: false, rotation:0.001,
            boxShadow: "0 0 0 0.2em #F8F3E8, 0 0 0 0.23em #000000, 0 0 0 -1em #F8F3E8, 0 0 0 -1em #E10014"
        },"frame3+=0.3")
        // RED BIG STROKE -----
        .to("#ellipse1", 0.3, {ease:"power4.out", force3D: false, rotation:0.001,
            boxShadow: "0 0 0 0.2em #F8F3E8, 0 0 0 0.23em #000000, 0 0 0 0.57em #F8F3E8, 0 0 0 0.6em #E10014"
        },"frame3+=0.35")

        // .to("#ellipse1",5,{scale:2.9, ease:"none", rotation:0.01, force3d:false},"frame3+=0.5")
        .to("#h3Heading",5,{scale:1.1, ease:"none", rotation:0.01, force3d:false},"frame3+=0.5")

        // ---- Copy animations ------- note: added 5 splitted lines just in case copy reach 5 lines
        .to("#h3Heading .splitted-lines1 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"frame3+=0.8")
        .to("#h3Heading .splitted-lines2 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"frame3+=0.8")
        .to("#h3Heading .splitted-lines3 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"frame3+=0.8")
        .to("#h3Heading .splitted-lines4 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"frame3+=0.8")
        .to("#h3Heading .splitted-lines5 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"frame3+=0.8")

            //F3 OUT
            .addLabel("frame3Out","-=4.2")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out")
            .to("#ellipse1", {duration: 0.15, ease:"back.in(3)", boxShadow: "0 0 0 1.27em #F8F3E8, 0 0 0 1.3em #000000, 0 0 0 1.27em #F8F3E8, 0 0 0 1.3em #E10014"},"frame3Out+=0.5")
            .to("#ellipse1",0.3,{scale:4, ease:"expo.in"},"frame3Out+=0.7")
            .to("#h3Heading",0.8,{scale:1.16, rotate:'180', ease:"expo.inOut"},"frame3Out+=0.7")
            .from("#h4Heading",0.8,{rotate:'-70', scale:0.5, ease:"expo.inOut"},"frame3Out+=0.7")

        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=3.15")
        .set("#main", {backgroundColor:"#E10014"}, "frame4+=0.1")
        .set("#h3Heading", {opacity:0 }, "frame4")
        .set("#ellipse1", {opacity:0 }, "frame4+=1")
        .set("#heading4", {opacity:1}, "frame4")
        .set("#h4Heading",{opacity:1},"frame4-=0.2")
        .to("#h4Heading",0.6,{scale:1.1, ease:"power4.out"},"frame4")
        .to("#h4Heading",0.1,{scale:1, ease:"none"},"frame4+=0.5")

        .from(".h4outlineText",0.001,{opacity:0},"frame4+=0.6")
        // TOP OUTLINE COPIES AIMATION
        .from("#h4outlineTextTop .splitted-lines", { y: (i, target, targets) => {
            // return value will be the distance from the center and the multiplier on the end will be the distance each line
            return 28 + (targets.length - 1 - i) * 30;
        }, duration: 0.6, ease: "power4.out"}, "frame4+=0.6")
        // BOTTOM OUTLINE COPIES AIMATION
        .from("#h4outlineTextBot .splitted-lines", { y: (i, target, targets) => {
            // return value will be the distance from the center and the multiplier on the end will be the distance each line
            return -28 + i * -30;
        }, duration: 0.6, ease: "power4.out"}, "frame4+=0.6")

            //F4 OUT
            .addLabel("frame4Out","-=0.5")
            .add(() => LogFrameTimeStamp("frame 4"), "frame4Out")
            .to([gsap.utils.toArray("#h4outlineTextBot .splitted-lines").reverse(),"#h4Heading",gsap.utils.toArray("#h4outlineTextTop .splitted-lines").reverse()],0.001,{opacity:0, stagger:{each:0.05}, ease:"power4.out"},"frame4+=1.2")

        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame","-=1.95")
        .set("#endframe", {opacity:1}, "endFrame")
        .set("#LogoMask1A", {right:"-160px",opacity:0}, "endFrame")
        .set("#BottomLogoA", {height:"0px"}, "endFrame")
        .set(".logo-fill", {fill:"#F8F3E9"}, "endFrame-=0.2")
        
        .from("#endFrameHeading",0.001,{opacity:0, ease:"power4.out"},"endFrame")
        .from("#endFrameHeading .splitted-lines",0.65,{x:"-300", stagger:0.08, ease:"power4.out"},"endFrame+=0.2")
        .to("#endFrameHeading .splitted-lines1 .splitted-chars",0.01, {color:"#F5FF1E", stagger:{each: 0.02, amount:0.15}},"endFrame+=1")

        //Logo
        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"endFrame+=0.3")
        .to("#businessLogo", 0.3,{x:0, ease:"power3.out"},"endFrame+=0.45")
        .to("#LogoMask1A", 0.5, {right:"0px", ease:"power4.inOut"}, "endFrame+=0.3")
        .to("#LogoMask1A", 0.001, {opacity:1}, "endFrame+=0.15")
        .to("#BottomLogoA", 0.8,{height:"16px", ease:"power4.inOut"},"endFrame+=1.1")
        
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