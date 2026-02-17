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
var _lineheight;

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
        //var sublegal = getById("legalContainerInner").innerHTML;
        var adSizeMeta = document.querySelector('meta[name="ad.size"]');
        /**** CONFIGURATION ****/
        
        
        if (adSizeMeta) {
            var [width, height] = adSizeMeta.content.split(",").map(size => size.replace(/(width=|height=)/, '').trim());
            getById("main").style.setProperty('--ad-width', `${width}px`);
            getById("main").style.setProperty('--ad-height', `${height}px`);
            
            switch (width) {
              case "160":
                // getById("headingFrame").style.setProperty('padding', '0px 5px 14px 5px');
                break;
              default:
                // getById("headingFrame").style.setProperty('padding', '16px 12px 15px 12px');
                break;
            }
        }
        
        //Legal Switcher for Frames, Endframe will always use Wide legal 
        switch (legal) {
          case "inner":
            //getById("legalContainerInner").style.setProperty('display', 'flex');
            break;
          case "wide":
            getById("legalContainerWide").style.setProperty('display', 'flex');
            break;
          default:
            getById("legalContainerWide").style.setProperty('display', 'none');
        }
        
        //Inject inner legal value to wide to have the same value across
        //getById("legalContainerWide").innerHTML = sublegal;

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
        Creative.splitLines(["h1Heading","h1Heading2","h2Heading","h4Heading","h5Heading","endFrameHeading"]);

        if(Creative.whatBrowser() === "Firefox"){ 
            console.log("Firefox")
        } 
        if(Creative.whatBrowser() === "Safari"){ 
            _lineheight = "96%";
            console.log("Safari" + _lineheight)
        }else{
            _lineheight = "93%";
        }
        
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#footerContainer",{autoAlpha:0 },"reset")
        .set("#vlogo", {autoAlpha: 1}, "reset")
        .set("#TopLogoA",{clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}, "reset")
        .set("#BottomLogoA",{clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"}, "reset")
        // SLIMMER CLIP MASK
        .set("#flipBoxBack",{clipPath: "polygon(92.87% 93.52%, 7.13% 93.52%, 7.13% 93.52%, 6.68% 93.48%, 6.25% 93.35%, 5.85% 93.14%, 5.49% 92.87%, 5.16% 92.53%, 4.88% 92.14%, 4.65% 91.7%, 4.48% 91.22%, 4.37% 90.7%, 4.33% 90.16%, 4.33% 9.32%, 4.33% 9.32%, 4.37% 8.77%, 4.48% 8.25%, 4.65% 7.77%, 4.88% 7.33%, 5.16% 6.94%, 5.49% 6.6%, 5.85% 6.33%, 6.25% 6.13%, 6.68% 6%, 7.13% 5.96%, 92.87% 5.87%, 92.87% 5.87%, 93.32% 5.91%, 93.75% 6.04%, 94.15% 6.25%, 94.52% 6.52%, 94.84% 6.86%, 95.12% 7.25%, 95.35% 7.69%, 95.52% 8.17%, 95.63% 8.69%, 95.67% 9.23%, 95.67% 90.16%, 95.67% 90.16%, 95.63% 90.71%, 95.52% 91.23%, 95.35% 91.72%, 95.12% 92.16%, 94.84% 92.55%, 94.52% 92.88%, 94.15% 93.15%, 93.75% 93.35%, 93.32% 93.48%, 92.87% 93.52%)" }, "reset")
        .set(["#h2Heading", "#h3Heading","#h4Heading","#redSkewBg"],{opacity:0},"reset")
        .set("#h1Heading",{lineHeight:_lineheight},"reset")

        //-------- F1 IN -------------------------------
        .addLabel("frame1", 0.1)
        .from("#h1Heading, #h1Heading2", 0.6, {y:"-309", ease: "steps(10)"},"frame1+=0.4")
        .from("#h1Heading2 .splitted-container", 0.001, {opacity:0},"frame1+=0.5")
        .to("#h1Heading2 .splitted-container", 0.001, {opacity:0},"frame1+=0.88")
        // FLIP
        .to("#flipBoxInner",1.85,{rotationY:-180, ease: "power4.inOut"},"frame1+=0.15")
        // SET SLIMMER CLIP MASK ON WRAPPER
        //.to("#frame1ImageWrapper",0.001,{clipPath: "polygon( 70.233% 94.08%,29.8% 93.92%,29.8% 93.92%,29.349% 93.876%,28.92% 93.747%,28.519% 93.542%,28.152% 93.267%,27.825% 92.93%,27.544% 92.538%,27.315% 92.097%,27.144% 91.616%,27.037% 91.101%,27% 90.56%,27% 9.68%,27% 9.68%,27.037% 9.129%,27.144% 8.609%,27.316% 8.125%,27.546% 7.685%,27.829% 7.295%,28.159% 6.961%,28.53% 6.69%,28.937% 6.489%,29.373% 6.363%,29.833% 6.32%,70.267% 6.48%,70.267% 6.48%,70.718% 6.524%,71.147% 6.653%,71.548% 6.858%,71.915% 7.133%,72.242% 7.47%,72.523% 7.862%,72.752% 8.303%,72.923% 8.784%,73.03% 9.299%,73.067% 9.84%,73.067% 90.68%,73.067% 90.68%,73.03% 91.231%,72.922% 91.751%,72.751% 92.235%,72.521% 92.675%,72.238% 93.065%,71.907% 93.399%,71.536% 93.67%,71.13% 93.871%,70.693% 93.997%,70.233% 94.04% )"},"frame1-=0.95")
        // ANIMATION OF WIDER CLIP MASK
        .to(["#flipBoxFront"], 0.5, {clipPath: "polygon( 70.233% 90.84%,29.8% 90.68%,29.8% 90.68%,29.349% 90.636%,28.92% 90.507%,28.519% 90.302%,28.152% 90.027%,27.825% 89.69%,27.544% 89.298%,27.315% 88.857%,27.144% 88.376%,27.037% 87.861%,27% 87.32%,27% 9.68%,27% 9.68%,27.037% 9.129%,27.144% 8.609%,27.316% 8.125%,27.546% 7.685%,27.829% 7.295%,28.159% 6.961%,28.53% 6.69%,28.937% 6.489%,29.373% 6.363%,29.833% 6.32%,70.267% 6.48%,70.267% 6.48%,70.718% 6.524%,71.147% 6.653%,71.548% 6.858%,71.915% 7.133%,72.242% 7.47%,72.523% 7.862%,72.752% 8.303%,72.923% 8.784%,73.03% 9.299%,73.067% 9.84%,73.067% 87.44%,73.067% 87.44%,73.03% 87.991%,72.922% 88.511%,72.751% 88.995%,72.521% 89.435%,72.238% 89.825%,71.907% 90.159%,71.536% 90.43%,71.13% 90.631%,70.693% 90.757%,70.233% 90.8%,70.233% 90.8% )" , ease: "power4.inOut"},"-=0.95")
        // SET TO MASK THE ENTIRE HEADING
        .to("#headingFrame", 0.001, {clipPath: "polygon(92.87% 93.52%, 7.13% 93.52%, 7.13% 93.52%, 6.68% 93.48%, 6.25% 93.35%, 5.85% 93.14%, 5.49% 92.87%, 5.16% 92.53%, 4.88% 92.14%, 4.65% 91.7%, 4.48% 91.22%, 4.37% 90.7%, 4.33% 90.16%, 4.33% 9.32%, 4.33% 9.32%, 4.37% 8.77%, 4.48% 8.25%, 4.65% 7.77%, 4.88% 7.33%, 5.16% 6.94%, 5.49% 6.6%, 5.85% 6.33%, 6.25% 6.13%, 6.68% 6%, 7.13% 5.96%, 92.87% 5.87%, 92.87% 5.87%, 93.32% 5.91%, 93.75% 6.04%, 94.15% 6.25%, 94.52% 6.52%, 94.84% 6.86%, 95.12% 7.25%, 95.35% 7.69%, 95.52% 8.17%, 95.63% 8.69%, 95.67% 9.23%, 95.67% 90.16%, 95.67% 90.16%, 95.63% 90.71%, 95.52% 91.23%, 95.35% 91.72%, 95.12% 92.16%, 94.84% 92.55%, 94.52% 92.88%, 94.15% 93.15%, 93.75% 93.35%, 93.32% 93.48%, 92.87% 93.52%)" })

            //F1 OUT
            .addLabel("frame1Out","+=0.1")
            .add(() => LogFrameTimeStamp("Frame 1"), "frame1Out-=1")
            //.from('#redSkewBg', 0.5, {left:"-160%", ease: "power2.in"},"frame1Out")
            
        //-------- F2 IN -------------------------------
        .addLabel("frame2","-=0.6")
        .set("#flipBoxFrontImage,#flipBoxFront,#flipBack",{opacity:0}, "frame2")
        .from("#h2Heading",0.35,{x:"-60", ease:"power4.out"},"frame2")
        .to("#h2Heading",0.001,{opacity:1},"frame2+=0.03")
            //F2 OUT
            .addLabel("frame2Out","-=0.2")
            .add(() => LogFrameTimeStamp("Frame 2"), "frame2Out+=0.4")
            .to("#h2Heading",0.6,{scale:1.5, transformOrigin: "50% 50%", ease:"power4.in"}, "frame2Out+=0.2")
            .set("#h2Heading",{opacity:0}, "frame2Out+=0.55")
        
        //-------- F3 IN -------------------------------
        .addLabel("frame3","-=0.25")
        .set("#h3Heading",{opacity:1},"frame3")
        .from("#h3Heading",0.75,{scale:0.7, transformOrigin: "50% 50%", ease:"power3.out"},"frame3-=0.1")
        .to("#h3Heading",0.5,{scale:5, transformOrigin: "42% 41%", ease:"power3.inOut"},"frame3+=.8")
            
            //F3 OUT
            .addLabel("frame3Out","-=0.2")
            .to("#h3Heading",0.001,{opacity:0},"frame3Out")
            //.to("#redSkewBg",0.001,{backgroundColor:"#ffffff"},"frame3Out")
            .add(() => LogFrameTimeStamp("Frame 3"), "frame3Out-=0.1")

        //-------- F4 IN -------------------------------
        .addLabel("frame4","-=0.1")
        .set("#h4Heading",{opacity:1},"frame4")
        .from("#h4Heading .splitted-container",0.35,{y:"80%", stagger:0.08, ease:"cubic.out", rotation:0.01},"frame4")
        .from("#h4Heading .splitted-container",0.001,{opacity:0, stagger:0.08, ease:"cubic.out"},"frame4")
            //F4 OUT
            .addLabel("frame4Out","+=1.2")
            .add(() => LogFrameTimeStamp("Frame 4"), "frame4Out-=1")
            .to("#h4Heading .splitted-container",0.7,{y:"-55", stagger:0.08, ease:"power4.in"},"frame4Out")
            .to("#h4Heading .splitted-container",0.001,{opacity:0, stagger:0.08},"frame4Out+=0.6")

        //-------- F5 IN -------------------------------
        .addLabel("frame5","-=0.15")
        .set("#h4Heading",{opacity:0},"frame5")
        .set("#h5Heading",{opacity:1},"frame5")
        .set("#flipBoxBack",{backgroundColor:"#ffffff"},"frame5")
        .set(".logo,.arrow-fill",{fill:"#EE001E"},"frame5-=0.5")
        .set(".cta-text",{color:"#EE001E"},"frame5-=0.5")
        
        // CTA
        Creative.tl.addLabel("cta","frame5")
            .set("#footerContainer",{autoAlpha:1 },"cta")
            .set("#ctaArrow", {autoAlpha: 0}, "cta")
            .set("#ctaText", {display:"flex", width: "8%"}, "cta")
            .set("#ctaArrow", {autoAlpha:1, x:0}, "cta")
            .set("#ctaText", {clipPath: 'inset(0% 100% 0% 0%)'}, "cta")
            .to("#ctaText", 0.5, {width: "100%" ,ease:"power1.inOut", onStart:()=>{ gsap.to("#ctaArrow", 0.001, {display:"block"});} }, "cta")
            .to("#ctaText", 0.45, {clipPath: 'inset(0% 0% 0% 0%)', ease:"power2.out", onStart:()=>{ gsap.set("#ctaText", {autoAlpha:1});}}, "cta")  

        //Logo
        .set("#logoMask", { display:"flex", xPercent:-180, autoAlpha:1 }, "frame5")
        .set("#logoMask", {xPercent: 0}, "frame5")
        .from("#logoMask", 0.6, {opacity: 0, ease:"power1.inOut"}, "frame5")

        
        // in
        .from("#h5Heading .splitted-container1, #h5Heading .splitted-container2",0.001,{opacity:0, stagger:0.1, ease:"cubic.out"},"frame5")
        .from("#h5Heading .splitted-container1, #h5Heading .splitted-container2",0.35,{y:"80%", stagger:0.1, ease:"cubic.out", rotation:0.01},"frame5")
        
        .addLabel("frame5sub","frame5-=0.3")

        // out
        .to("#h5Heading .splitted-container2",0.5,{y:"-20%", ease:"power4.in"},"frame5sub+=1.3")
        .to("#h5Heading .splitted-container2",0.001,{opacity:0},"frame5sub+=1.8")
        // in
        .from("#h5Heading .splitted-container3",0.001,{opacity:0},"frame5sub+=1.85")
        .from("#h5Heading .splitted-container3",0.5,{y:"80%", ease:"power4.out", rotation:0.01},"frame5sub+=1.8")
        // out
        .to("#h5Heading .splitted-container3",0.5,{y:"-20%", ease:"power4.in"},"frame5sub+=2.9")
        .to("#h5Heading .splitted-container3",0.001,{opacity:0},"frame5sub+=3.4")
        // in
        .from("#h5Heading .splitted-container4",0.001,{opacity:0, ease:"power4.in"},"frame5sub+=3.45")
        .from("#h5Heading .splitted-container4",0.5,{y:"80%", ease:"cubic.out", rotation:0.01},"frame5sub+=3.4")
        
            //F5 OUT
            .addLabel("frame5Out","+=0.5")
            .add(() => LogFrameTimeStamp("Frame 5"), "frame5Out-=0.5")
            .to("#h5Heading .splitted-container1, #h5Heading .splitted-container4",0.65,{y:"-40", stagger:0.03, ease:"power4.in"},"frame5Out")
            .to("#h5Heading .splitted-container1, #h5Heading .splitted-container4",0.001,{opacity:0},"frame5Out+=0.6")
        
        //-------- EndFrame IN -------------------------------
        .addLabel("endFrame", "-=0.15")
        .set("#h3Heading",{opacity:0},"endFrame")
        .set("#h5Heading",{opacity:0},"endFrame")
        .set("#flipBoxBack",{backgroundColor:"#EE001E"},"endFrame")
        .set(".logo,.arrow-fill",{fill:"#ffffff"},"endFrame")
        .set(".cta-text",{color:"#ffffff"},"endFrame")
        //.set("#redSkewBg",{backgroundColor:"#EE001E"},"endFrame")
        .from("#endFrameHeading",0.001,{opacity:0},"endFrame")
        .from("#endFrameEyebrow",0.25,{y:"20", stagger:0.08, ease:"power4.out"},"endFrame")
        .from("#endFrameEyebrow",0.001,{opacity:0, stagger:0.08, ease:"power4.out"},"endFrame")
        .from("#endFrameHeading .splitted-container",0.3,{y:"20", stagger:0.01, ease:"power4.out"},"endFrame+=0.3")
        .from("#endFrameHeading .splitted-container",0.001,{opacity:0, stagger:0.01},"endFrame+=0.3")
        .from("#endFrameSubHead",0.3,{y:"20", stagger:0.08, ease:"power4.out"},"endFrame+=0.6")
        .from("#endFrameSubHead",0.001,{opacity:0, stagger:0.08},"endFrame+=0.6")
        

        Creative.tl.from("#endFrameSubLegal",1.5,{autoAlpha:0, ease:"power4.out"},"endFrame+=0.65")
        .to("#underlinedText",1,{opacity:1, ease:"power4.out", onComplete: function() {
            /* ENABLE HOTSPOT */
            LogFrameTimeStamp("Frame EndFrame");
            if(getById('underlinedText') !== null){
               Creative.addTooltip();
               gsap.set("#hotspot", { autoAlpha: 1 });
            }else{
               gsap.set("#hotspot", { autoAlpha: 1 }); 
            }
            /* END ENABLE HOTSPOT */
        }},"endFrame+=2")
        
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