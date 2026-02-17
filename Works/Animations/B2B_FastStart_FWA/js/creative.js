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
    tlArw: gsap.timeline({
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

    arrowBgwAnim: function() {
        Creative.tlArw
            .addLabel("arwFrm0")
            .to(["#f0ArrowRect-5","#f0ArrowRect-4","#f0ArrowRect-3"],0.6,{xPercent:170, stagger:0.01, ease:"power2.in"},"arwFrm0")
            .to(["#f0ArrowRect-2","#f0ArrowRect-1"],0.6,{xPercent:170, stagger:0.04, ease:"power3.in",onComplete:function(){
                Creative.tlArw.set("#f0ArrowRect-1,#f0ArrowRect-2,#f0ArrowRect-3,#f0ArrowRect-4,#f0ArrowRect-5",{autoAlpha:0, display:"none"})
            }},"arwFrm0+=0.04")
            
            .addLabel("arwFrm1",">-0.1")
            .to("#f1ArrowRect",2.4,{xPercent:300, stagger:0.01, ease:"none"},"arwFrm1")

            .addLabel("arwFrm2",">-1")
            .to("#f2ArrowRect",2.5,{xPercent:300, stagger:0.01, ease:"none"},"arwFrm2")
         
            .addLabel("arwFrm3",">-1.4")
            .to("#f3ArrowRect",2.6,{xPercent:300, stagger:0.01, ease:"none"},"arwFrm3")
              
            .addLabel("arwFrm4",">-1.1")  
            .to(["#f4ArrowRect-2","#f4ArrowRect-1","#f4ArrowRect-3"],2,{xPercent:190, stagger:0.05, ease:"power2.linear"},"arwFrm4")
            .to(["#f4ArrowRect-5","#f4ArrowRect-4","#f4ArrowRect-6"],2,{xPercent:190, stagger:0.02, ease:"power2.linear"},"arwFrm4+=0.04")
            
            .addLabel("arwFrm5",">-1")
            .to("#f5ArrowRect",1.2,{xPercent:300, stagger:0.01, ease:"power1.in"},"arwFrm5")
  
            .addLabel("arwFrm6",">-0.45")
            .to("#f6ArrowRect",2.6,{xPercent:300, stagger:0.01, ease:"none"},"arwFrm6")

            .addLabel("arwFrm7",">-1.3")
            .to("#f7ArrowRect",2.5,{xPercent:300, stagger:0.01, ease:"power1.in"},"arwFrm7")

             .addLabel("arwFrm8",">-4.2")
            .from("#f8ArrowRect",5.6,{xPercent:-300, stagger:0.01, ease:"none"},"arwFrm8")


    },

    init: function() {

        console.log("🧩 Version Sequence: " + selectedFrameSequence);

        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
        .to("#main", {autoAlpha:1}, "reset")
        .set("#devices", {y:250}, "reset")
        .set("#imgBg2", { xPercent: -120 }, "reset")
        .set("#frame1, #frame2, #frame3, #frame4, #frame5, #frame6, #devicesFrame", { alpha: 0 }, "reset")
        .set("#ctaArrow", {autoAlpha: 0, x:-77}, "reset")
        .set("#footer",{opacity:1},"reset")
       

        if(selectedFrameSequence === "fwa"){
           
            console.log("🧩 AWA Full Play");
            //-------- F1 IN -------------------------------
            Creative.tl
            .addLabel("frame0", 0.001)
            .add(Creative.arrowBgwAnim, "frame0")

            .addLabel("frame1", ">+=0.5")
            .set("#frame1", { alpha: 1 }, "frame1")
            .from("#f1Heading .splitted-container",0.3,{xPercent:-80, stagger:0.15, ease:"power3.out"},"frame1")
            .from("#f1Heading .splitted-container1 .splitted-chars",0.01,{stagger:0.04,opacity:0, ease:"power3.out"},"frame1+=0.1")
            .from("#f1Heading .splitted-container2 .splitted-chars",0.01,{stagger:0.04,opacity:0, ease:"power3.out"},"frame1+=0.2")

            // NOTE: Even if #f1Heading line breaks change or this duration gets extended,
            // using ">-0.4" means the next animation (introCta) will ALWAYS start 
            // 0.4s before this animation fully ends.
            
            .addLabel("introCta",">-0.7")
            .set(["#logoTop","#logoBottom"], {opacity:1}, "introCta")   
            .from("#logoTop", 0.3, {width: "0%", ease: "power3.out"}, "introCta")
            .from("#logoTopSVG", 0.3, {x: 15, ease: "power3.out"}, "introCta")
            .from("#logoBottomMask", 0.5, {height: 0, ease: "power3.out"}, "introCta+=0.6")

            //-------- F1 OUT -------------------------------
            .addLabel("frame1Out", ">+=0.5")
            .to("#f1Heading .splitted-container",0.5,{xPercent:70, stagger:0.05,ease:"power3.out"},"frame1Out")
            .to("#f1Heading .splitted-container1 .splitted-chars",0.01,{opacity:0, stagger:0.03,ease:"power3.out"},"frame1Out")
            .to("#f1Heading .splitted-container2 .splitted-chars",0.01,{opacity:0, stagger:0.03,ease:"power3.out"},"frame1Out+=0.03")
            .to("#f1Heading",0.0001,{opacity:0},"frame1Out+=0.3")
            
            .addLabel("introOutCta",">-0.4")
            .to("#logoTop", 0.3, {x: -100, ease: "power3.out"}, "introOutCta+=0.2")
            .to("#logoBottomMask", 0.2, {height: 0, ease: "power3.out"}, "introOutCta")
            
           
            //-------- F2 / Image IN and Out -------------------------------
            .addLabel("frame2", "-=0.4")
            .set("#frame2", { alpha: 1 }, "frame2")
            .from("#f2Heading .splitted-container",0.3,{xPercent:-80, stagger:0.05, ease:"power3.out"},"frame2")
            .from("#f2Heading .splitted-container1 .splitted-chars",0.01,{stagger:0.03,opacity:0, ease:"power3.out"},"frame2+=0.08")
            .from("#f2Heading .splitted-container2 .splitted-chars",0.01,{stagger:0.03,opacity:0, ease:"power3.out"},"frame2+=0.16")
            .from("#f2Heading .splitted-container3 .splitted-chars",0.01,{stagger:0.03,opacity:0, ease:"power3.out"},"frame2+=0.24")
            .from("#f2Heading .splitted-container4 .splitted-chars",0.01,{stagger:0.03,opacity:0, ease:"power3.out"},"frame2+=0.32")
            
            //-------- F2 OUT -------------------------------
            .addLabel("frame2Out", ">+=0.6")
            .to("#f2Heading .splitted-container",0.5,{xPercent:70, stagger:0.05,ease:"power3.out"},"frame2Out")
            .to("#f2Heading .splitted-container1 .splitted-chars",0.01,{opacity:0, stagger:0.05,ease:"power3.out"},"frame2Out")
            .to("#f2Heading .splitted-container2 .splitted-chars",0.01,{opacity:0, stagger:0.05,ease:"power3.out"},"frame2Out+=0.03")
            .to("#f2Heading .splitted-container3 .splitted-chars",0.01,{opacity:0, stagger:0.05,ease:"power3.out"},"frame2Out+=0.06")
            .to("#f2Heading .splitted-container4 .splitted-chars",0.01,{opacity:0, stagger:0.05,ease:"power3.out"},"frame2Out+=0.09")
            .to("#f2Heading",0.0001,{opacity:0},"frame2Out+=0.3")
            
            //-------- F3 IN -------------------------------
            .addLabel("frame3",">-=0.05")
            .set("#frame3", { alpha: 1 }, "frame3")
            .from("#f3Heading ", 0.3, {scale:10, ease:"power4.out", force3D:false, rotation:0.001},"frame3")
            .from("#f3Eyebrow .splitted-container",0.3,{xPercent:-80, stagger:0.02, ease:"power3.out"},"frame3+=0.2")
            .from("#f3Eyebrow .splitted-container1 .splitted-chars",0.01,{stagger:0.04,opacity:0, ease:"power3.out"},"frame3+=0.23")
            //-------- F3 OUT -------------------------------
            .addLabel("frame3Out", ">+=0.8")
            .to("#f3Eyebrow .splitted-container, #f3Heading .splitted-container",0.5,{xPercent:70, stagger:0.05,ease:"power3.out"},"frame3Out")
            .to("#f3Eyebrow .splitted-container1 .splitted-chars",0.01,{opacity:0, stagger:0.03,ease:"power3.out"},"frame3Out")
            .to("#f3Heading .splitted-container1 .splitted-chars",0.01,{opacity:0, stagger:0.03,ease:"power3.out"},"frame3Out+=0.03")
            .to("#f3Heading .splitted-container2 .splitted-chars",0.01,{opacity:0, stagger:0.03,ease:"power3.out"},"frame3Out+=0.06")
            .to("#f3Heading",0.0001,{opacity:0},"frame3Out+=0.3")

            //-------- F4 IN -------------------------------
            .addLabel("frame4",">+0.1")
            .set("#frame4", { alpha: 1 }, "frame4")
            .from("#f4Heading .splitted-container",0.3,{xPercent:-80, stagger:0.02, ease:"power3.out"},"frame4")
            .from("#f4Heading .splitted-container1 .splitted-chars",0.01,{stagger:0.04,opacity:0, ease:"power3.out"},"frame4")

            //-------- F4 OUT -------------------------------
            .addLabel("frame4Out", ">+=0.9")
            .to("#f4Heading .splitted-container",0.5,{xPercent:70, stagger:0.05,ease:"power3.out"},"frame4Out")
            .to("#f4Heading .splitted-container1 .splitted-chars",0.01,{opacity:0, stagger:0.03,ease:"power3.out"},"frame4Out")
            .to("#f4Heading",0.0001,{opacity:0},"frame4Out+=0.3")

            //-------- F5 IN -------------------------------
            .addLabel("frame5",">")
            .set("#frame5", { alpha: 1 }, "frame5")
            .from("#f5Eyebrow ", 0.3, {scale:10, ease:"power4.out", force3D:false, rotation:0.001},"frame5")
            .from("#f5Heading .splitted-container, #f5SubHead .splitted-container",0.3,{xPercent:-80, stagger:0.05, ease:"power3.out"},"frame5+=0.3")
            .from("#f5Heading .splitted-container1 .splitted-chars",0.01,{stagger:-0.03,opacity:0, ease:"power3.out"},"frame5+=0.38")
            .from("#f5SubHead .splitted-container1 .splitted-chars",0.01,{stagger:-0.03,opacity:0, ease:"power3.out"},"frame5+=0.46")
            .from("#f5SubHead .splitted-container2 .splitted-chars",0.01,{stagger:-0.03,opacity:0, ease:"power3.out"},"frame5+=0.54")
            //-------- F5 OUT -------------------------------
            .addLabel("frame3Out", ">+=0.7")
            .to("#f5Heading .splitted-container, #f5Eyebrow .splitted-container, #f5SubHead .splitted-container",0.5,{xPercent:90, stagger:0.05,ease:"power3.out"},"frame3Out")
            .to("#f5Heading .splitted-container .splitted-chars",0.01,{opacity:0, stagger:-0.05,ease:"power3.out"},"frame3Out")
            .to("#f5Eyebrow .splitted-container .splitted-chars",0.01,{opacity:0, stagger:-0.05,ease:"power3.out"},"frame3Out+=0.03")
            .to("#f5SubHead .splitted-container1 .splitted-chars",0.01,{opacity:0, stagger:-0.05,ease:"power3.out"},"frame3Out+=0.06")
            .to("#f5SubHead .splitted-container2 .splitted-chars",0.01,{opacity:0, stagger:-0.05,ease:"power3.out"},"frame3Out+=0.07")
            .to("#f5Heading",0.0001,{opacity:0},"frame5Out+=0.15")

            //-------- F6 IN -------------------------------
            .addLabel("frame6",">-=0.4")
            .set("#frame6", { alpha: 1 }, "frame6")
            .from("#f6Heading .splitted-container",0.3,{xPercent:-50, stagger:0.05, ease:"power3.out"},"frame6")
            .from("#f6Heading .splitted-container1 .splitted-chars",0.01,{stagger:-0.05,opacity:0, ease:"power3.out"},"frame6")
            .from("#f6Heading .splitted-container2 .splitted-chars",0.01,{stagger:-0.05,opacity:0, ease:"power3.out"},"frame6+=0.03")

            //-------- F6 OUT -------------------------------
            .addLabel("frame6Out", ">+=1.1")
            .to("#f6Heading .splitted-container",0.5,{xPercent:80, stagger:0.05,ease:"power3.out"},"frame6Out")
            .to("#f6Heading .splitted-container1 .splitted-chars",0.01,{opacity:0, stagger:-0.03,ease:"power3.out"},"frame6Out+=0.03")
            .to("#f6Heading .splitted-container2 .splitted-chars",0.01,{opacity:0, stagger:-0.03,ease:"power3.out"},"frame6Out+=0.06")
            .to("#f6Heading",0.0001,{opacity:0},"frame6Out+=0.3")

            

            //-------- F7 IN -------------------------------
            
            .addLabel("frame7",">")
            .set("#frame7", { alpha: 1 }, "frame7")
            .from("#f7Eyebrow .splitted-container, #f7Heading .splitted-container",0.3,{xPercent:-80, stagger:0.02,opacity:0, ease:"power3.out"},"frame7")
            .from("#f7Eyebrow .splitted-container1 .splitted-chars",0.01,{stagger:0.03,opacity:0, ease:"power3.out"},"frame7+=0.08")
            .from("#f7Eyebrow .splitted-container2 .splitted-chars",0.01,{stagger:0.03,opacity:0, ease:"power3.out"},"frame7+=0.16")
            .from("#f7Heading .splitted-container1 .splitted-chars",0.01,{stagger:0.02,opacity:0, ease:"power3.out"},"frame7+=0.2")

            .from("#f7SubLegal",0.5,{opacity:0,ease:"power3.out"},"frame7")
            .from("#f7SubHead",0.5,{opacity:0,ease:"power3.out"},"frame7+=0.05")
           
            .addLabel("ctaLogo", ">-=0.5")
            .set("#footer", { paddingBottom: "55px" },"ctaLogo")
            .set(["#logoTop","#logoTopSVG"],{x:0},"ctaLogo")
            .fromTo(["#logoTop","#logoBottom"],0.01,{opacity:0},{opacity:1},"ctaLogo")
            .fromTo("#logoTop",0.3,{width:"0%"},{width:"100%",ease:"power3.out"},"ctaLogo")
            .fromTo("#logoTopSVG",0.3,{x:15},{x:0,ease:"power3.out"},"ctaLogo")
            .fromTo("#logoBottomMask",0.5,{height:0},{height:"11px",ease:"power3.out"},"ctaLogo+=0.4")
            .fromTo("#ctaContainer",0.3,{autoAlpha:0,x:-45},{autoAlpha:1,x:0,ease:"power3.out"},"ctaLogo-=0.1");

        }
           
    
		console.log( Creative.tl.duration() )
    }
};

function getById(eleID) {
    return document.getElementById(eleID);
}

// gsap.globalTimeline.timeScale(0.25);