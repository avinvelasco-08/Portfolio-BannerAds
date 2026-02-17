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
        var adSizeMeta = document.querySelector('meta[name="ad.size"]');
        if (adSizeMeta) {
            var [width, height] = adSizeMeta.content.split(",").map(size => size.replace(/(width=|height=)/, '').trim());
            getById("main").style.setProperty('--ad-width', `${width}px`);
            getById("main").style.setProperty('--ad-height', `${height}px`);
        }

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

    init: function() {
        for (let i = 1; i <= 9; i++) {
            let f1HeadingElement = document.getElementById(`f1Heading${i}`);
        
            // Alternate between f2Heading and f1Heading for each index
            if (i % 2 === 1) {
                // Odd indices (1, 3, 5, 7, 9) get f2Heading
                f1HeadingElement.innerText = _dynamicData.f2Heading;
            } else {
                // Even indices (2, 4, 6, 8) get f1Heading
                f1HeadingElement.innerText = _dynamicData.f1Heading;
            }
        }
        Creative.splitLines(["f3Heading","f4Heading","f5Heading"]);
        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set(".device",{opacity:0},"reset")
        .set("#businessLogo",{autoAlpha: 0},"reset")
        //-------- F1-F2 IN -------------------------------
        .addLabel("frame1")
        .from("#heading1 .heading", .5,{rotation: "-=20", stagger:-0.05, ease: "power4.out", onStart:()=>{
            Creative.tl.set("#heading1 .heading",{opacity:1, stagger:-0.05, delay:0.05},"frame1+=0.2")
        }},"frame1+=0.2")
        .set("#f1Heading4",{color:"#F50A23"},"frame1+=0.7")
        .set("#f1Heading4",{color:"#000000"},"frame1+=1.7")
        .set("#f1Heading5",{color:"#F50A23"},"frame1+=1.7")
        .from("#heading1",3,{rotation:"-20", transformOrigin:"right 50%", ease: "power4.out"},"frame1+=0.43")
        .to("#heading1",2.5,{rotation:"+=50", transformOrigin:"right 50%", ease: "linear"},"frame1+=0.5")
        .to("#heading1",0.25,{rotation:"+=30", transformOrigin:"right 50%", ease: "linear"},"frame1+=2.6")

        //-------- F3 IN -------------------------------
        .addLabel("frame3", "-=0.6")
        .set("#main",{backgroundColor:"#F50A23"},"frame3")
        .set("#vlogo, #heading1",{autoAlpha:0},"frame3")
        .set("#lines",{autoAlpha:1},"frame3")
        .from("#f3Heading .splitted-container", 0.001,{opacity:0, stagger: 0.08, ease: "power4.out"},"frame3")
        .from("#f3Heading .splitted-container", 0.4,{y: "75%", stagger: 0.08, ease: "power4.out"},"frame3")
        .to("#lines",1.6,{rotation:15, transformOrigin:"50% 50%", ease: "none", onComplete:()=>{
            gsap.to("#lines",0.5,{rotation:50, transformOrigin:"50% 50%", ease: "power1.in", delay:-0.1})
        }},"frame3")

        //-------- F3 OUT -------------------------------
        .add("frame3out")
        .to("#f3Heading .splitted-container", 0.4,{y: "-200%", stagger: 0.08, ease: "power1.in",onStart:()=>{
            gsap.to("#f3Heading .splitted-container", 0.001,{opacity:0, stagger: 0.08, ease: "power1.out", delay:0.23})
        }},"frame3out")
        .to("#lines", {opacity:0}, "frame3out+=0.3")

        //-------- F4 IN -------------------------------
        .add("frame4", "-=0.37")
        .set("#f3Heading,#lines",{opacity:0},"frame4")
        .set("#main",{backgroundColor:"#F3EDE0"},"frame4")
        .set("#deviceFrame", {opacity:1,backgroundColor:"#000000"}, "frame4")
        .from(".device", 0.6, {y:"15%",stagger: 0.05, ease: "power4.out"}, "frame4")      
        .set("#f3Device_name",{opacity:1},"frame4")
        .set("#f3Device_sub",{opacity:1},"frame4+=0.1")
        .set("#f3Device",{opacity:1},"frame4+=0.15")

       


        //-------- F4 OUT -------------------------------
        .add("frame4out")
        .to("#deviceFrame", 0.6, {y:-300, ease: "power4.out"}, "frame4out+=1.6")
        .from("#heading4", 0.48, {y: 300, ease: "power4.out"},  "frame4out+=1.6")
        
        //-------- F5 IN -------------------------------
        //.add("frame5","-=0.4")
        //.addPuase()
        //.set("#f4Heading",{opacity:1},"frame5")
        //.from("#heading4", 0.5, {y: 300, ease: "power4.out"}, "frame5")

        //-------- F5 OUT -------------------------------
        .add("frame5out","+=1.4")
        .to("#f4Heading .splitted-container", 0.4,{y: "-100%", stagger: 0.08, ease: "power1.in",onStart:()=>{
            gsap.to("#f4Heading .splitted-container", 0.001,{opacity:0, stagger: 0.08, ease: "power1.out", delay:0.23})
        }},"frame5out")
        .to("#f4LegalSubheading",0.5,{opacity:0, ease: "power4.out"},"frame5out") 

        //-------- F6 IN -------------------------------
        .add("frame5","-=0.28")
        //logo set
        .set("#f4Heading",{opacity:0},"frame5")
        .set("#blogo,.slogo", {fill:"#F50A23"},"frame5-=0.2")
        //.set("#LogoMask1A", {x:"-50%"},"frame5")
        //.set("#LogoMask1A", {left:"6px",top:"0px",width:"100%"},"frame5")
        .set("#LogoMask2A", {left:"28px",bottom:"-3px"},"frame5")
        .set("#slogocover", {opacity:1},"frame5")
        .set("#logoContainer",{zIndex: "5"},"frame5")
        

        //logo end

        .from("#heading5 .splitted-container", 0.4, {y: "130%", stagger: 0.08, ease: "power4.out"}, "frame5")
        .from("#heading5 .splitted-container", 0.001, {opacity: 0, stagger: 0.08, ease: "power4.out"}, "frame5")
        .from("#f5Subheading", 0.5, {opacity:0, ease: "expo.out"}, "frame5+=0.3")  
        .from("#f5LegalSubheading", 0.5, {opacity:0, ease: "power1.inOut"}, "frame5+=0.3")  
        
        
        
        // Logo
        .to("#businessLogo", 0.01,{autoAlpha:1, ease:"power1.inOut"},"frame5+=0.0722")
        //.to("#LogoMask1A", 0.5, {x:"0", ease:"power1.inOut"},"frame5","frame5+=0.1")
        .to("#coverTop", 0.408,{xPercent:100,ease:"power1.inOut"},"frame5+=0.1")
        .to("#slogocover", 0.2,{bottom:"-15px",ease:"power1.inOut"},"frame5+=0.65")
        .from("#ctaArrowOnly", 0.49,{opacity:0, ease:"power1.inOut"},"frame5+=0.08")
        .from("#ctaArrowOnly", 0.5,{x:"-70%", ease:"power1.inOut"},"frame5+=0.08")

        
        // .timeScale(0.2)
		console.log( Creative.tl.duration() )
    }
};

function getById(eleID) {
    return document.getElementById(eleID);
}