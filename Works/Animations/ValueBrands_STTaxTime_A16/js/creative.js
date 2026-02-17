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
var container = getById("main");
var loadingContent = getById("loading_content");

// Tooltip opacity
var isVisible = false;

// Tooltip Hotspot Checker
var hotspotCreated = false;

// exit and replay
//var btn_replay   = getById("btn_replay");

// split array
var splittedLines = [],
    splittedChars = [],
    splittedWords = [];

//Specs Variables
var bubbleInnerColor,
    bubbleBorderColor,
    bubbleSmallWidth,
    bubbleSmallHeight,
    bubbleBigWidth,
    bubbleBigHeight;

// exit
var exitBtn = getById("bannerExit");
var disclaimerBtn = getById("disclaimerBtn");
var disclaimerContent = getById("disclaimerContent");
var closeBtn = getById("closeBtn");

// Create and provide timeline to Hoxton
var CreativeBG = {
    tl: gsap.timeline({
        defaults: {
            ease: "none"
        }
    })
}
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

    onDisclaimerClick: function(e) {
        gsap.to("#disclaimerContent, #closeBtn", { autoAlpha: 1, duration: 0.3 });
        gsap.set("#disclaimerBtn", { autoAlpha: 0})
    },

    onCloseClick: function(e) {
        gsap.to("#disclaimerContent, #closeBtn", { autoAlpha: 0, duration: 0.3 });
        gsap.set("#disclaimerBtn", { autoAlpha: 1})
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
        var adSizeMeta = document.querySelector('meta[name="ad.size"]');
        if (adSizeMeta) {
            var [width, height] = adSizeMeta.content.split(",").map(size => size.replace(/(width=|height=)/, '').trim());
            getById("main").style.setProperty('--ad-width', `${width}px`);
            getById("main").style.setProperty('--ad-height', `${height}px`);
        }
        //SET COLORS
        gsap.to("#main",{backgroundColor:bgColor});
        gsap.to(".bubbleBorder",{fill:bubbleBorderColor});
        gsap.to(".bubbleInner",{fill:bubbleInnerColor});

        Creative.init();

        Creative.checkIsBackup() ? Creative.jumpToEndFrame() : null;
    },

    createButtons: function() {
        disclaimerBtn.addEventListener("click", Creative.onDisclaimerClick);
        closeBtn.addEventListener("click", Creative.onCloseClick);
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
        container.style.opacity = "1";
        container.style.visibility = "visible";
    },

    init: function() {

        CreativeBG.tl.to(".thinLine", {
            duration: 2.5,
            morphSVG: "#thickLine", 
            ease: "power1.inOut",
            y: "5%", x: "1%", //To offset the movement of lines during morphing; the points of the zigzag must remain aligned along the same vertical axis; the values here may vary for different sizes, so it's best to use trial and error to find the optimal settings.
            stagger:{each: 0.6, yoyo: true, repeat: 8, from: "center"},
        })
        
        Creative.splitLines(["h1Heading","h2Heading", "h3Heading"]);
        
        Creative.tl.addLabel("reset", 0)
        .set("#bubbleFrame, #caret",{backgroundColor:bubbleInnerColor})
        .set("#bubbleFrame, #caret",{borderColor:bubbleBorderColor})
        .set("#heading1, #heading2, #heading3",{autoAlpha:0})
        .set("#disclaimerBtn, #topLogo, #botLogo, #closeBtn",{autoAlpha:0})
        .set("#heading1, #heading2, #heading3",{autoAlpha:0})
        gsap.registerPlugin(MorphSVGPlugin);
        //------------------------------- FRAME1 IN -------------------------------
        Creative.tl.addLabel("frame1","+=0.0")
        
        .to(["#bubbleFrame","#headingFrame","#heading1","#logoFrame","#botLogo","#ctaText"],0.3,{autoAlpha:1}, "frame1")
            //------------------------------- FRAME1 Exit -------------------------------
            .to(["#heading1","#logoFrame","#botLogo"],0.5,{autoAlpha:0}, "frame1+=4.1")
        
        //------------------------------- FRAME2 IN -------------------------------
        Creative.tl.addLabel("frame2") 
        .to("#bubbleFrame",0.3,{width:`${bubbleSmallWidth}px`, height:`${bubbleSmallHeight}px`}, "frame2")
        .to(["#heading2"],0.5,{autoAlpha:1}, "frame2+=0.32")
        .to(["#deviceFrame","#device"],0.3,{autoAlpha:1}, "frame2")
        .from(["#deviceBack, #deviceFront"],0.5,{x:100, stagger: 0.05, ease: "power1.inOut"}, "frame2-=0.1")
        
            //------------------------------- FRAME2 Exit -------------------------------
            .to(["#heading2"],0.5,{autoAlpha:0}, "frame2+=4.2")
            .to(["#deviceFrame","#device"],0.65,{autoAlpha:0}, "frame2+=4.8")
            .to(["#deviceBack, #deviceFront"],0.5,{x:150, stagger: -0.05, ease: "power1.inOut"}, "frame2+=4.8")
        
        //------------------------------- FRAME3 IN -------------------------------
        Creative.tl.addLabel("frame3")
        .to("#bubbleFrame",0.5,{width:`${bubbleBigWidth}px`, height:`${bubbleBigHeight}px`}, "frame3-=0.7")
        .to(["#heading3","#logoFrame","#topLogo","#botLogo","#disclaimerBtn"],0.5,{autoAlpha:1}, "frame3-=0.2")
        .to(["#main"],4,{autoAlpha:1, onComplete:function(){CreativeBG.tl.kill()}}, "frame3")
        
        console.log( Creative.tl.duration() )
    }
};

function getById(eleID) {
    return document.getElementById(eleID);
}