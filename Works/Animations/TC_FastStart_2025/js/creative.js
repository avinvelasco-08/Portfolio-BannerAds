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

    setExitURL: function (strURL) {
        _exitURL = strURL;
    },

    onExit: function (e) {
        hoxton.exit("Exit", _dynamicData.exitURL);
    },

    onBannerStart: function () {
        console.log("Creative.onBannerStart()");
        if (hotspotCreated) {
            gsap.set("#hotspot", {
                autoAlpha: 0
            }, "reset")
        }
    },

    onBannerComplete: function () {
        console.log("Creative.onBannerComplete()");
    },

    jumpToEndFrame: function () {
        Creative.tl.pause();
        Creative.tl.seek("end", false);
    },

    checkIsBackup: function () {
        return (window.location.href.indexOf('hoxtonBackup') >= 0) ? true : false;
    },

    startAd: function () {
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

    createButtons: function () {
        // exitBtn.addEventListener("click", Creative.onExit, false);
    },

    setUpTimeline: function () {
        Creative.tl.repeat(_totalLoops);
        Creative.tl.repeatDelay(_endFrameDelay);
        Creative.tl.eventCallback("onStart", Creative.onBannerStart);
        Creative.tl.eventCallback("onComplete", Creative.onBannerComplete);
    },

    displayBanner: function () {
        loadingContent.style.display = "none";
        container.style.display = "block";
        container.style.opacity = "0";
    },

    applyHeadlineFontsizeScaling: function (selectors) {
        (Array.isArray(selectors) ? selectors : [selectors]).forEach(function (selector) {

            // Expecting selector to be an element ID string (no "#")
            const element = document.getElementById(selector);
            if (!element) return;

            // Decode HTML entities so things like "&All on us&" work correctly
            let html = decodeHTMLEntities(element.innerHTML);

            // Replace *text* → pill pill
            html = html.replace(/\*([^*]+)\*/g, function (_, text) {
                return `
                    <span class="pill yellow"><b>${text}</b></span>
                    <span class="pill white"><b>${text}</b></span>
                `;
            });

            // Replace |text| → outlined outlined
            html = html.replace(/\|([^|]+)\|/g, function (_, text) {
                return `
                    <span class="y-outlined"><b>${text}</b></span>
                    <span class="outlined"><b>${text}</b></span>
                `;
            });

            // Inject final processed HTML
            console.log("html = = = = = = = " + html)
            element.innerHTML = html.trim();
        });
    },

    init: function () {

        console.log("🧩 Version Sequence: " + selectedFrameSequence);

        // reset elements to initial states
        Creative.tl.addLabel("reset", 0)
            .to("#main", { autoAlpha: 1 }, "reset")
            //.set("#devices", {y:250}, "reset")
            //.set("#cta", { clipPath: 'inset(0% 100% 0% 0%)' }, "reset")
            .set("#cta", {alpha: 0, clipPath: "polygon(0% 0%, 0% 0%, 9.56% 50.46%, 0% 100%, 0% 100%)"}, "reset")
            .set("#carret", { alpha: 0, x: -110 }, "reset")
            .set("#verizonLogo", { xPercent: -120 }, "reset")

            .set("#imgBg2", { xPercent: -120 }, "reset")
            .set("#frame1, #frame3, #frame4, #frame6, #devicesFrame", { alpha: 0 }, "reset")
            .set("#f3Heading, #f4Heading, #f4Eyebrow", { alpha: 0 }, "reset")
            .set("#f5Heading .splitted-container span.pill", { autoAlpha: 0, borderColor: "rgba(0,0,0,0)" }, "reset")


        if (selectedFrameSequence === "tc") {
            //-------- F1 IN ----------------------------------------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------------------------------------------------------
            console.log("🧩 tc Play");
            Creative.tl
                .addLabel("frame1", 0.001)
                .set("#frame1", { alpha: 1 }, "frame1")
                .set("#f1Heading", { alpha: 1 }, "frame1")
                .set("#f1Heading  .splitted-container span.pill",{autoAlpha:0},"frame1")

                .addLabel("bubbleHeart", "+=0.7")
                .from("#icon-bubHeart1", 0.7, { scale: 0, opacity: 0, yPercent: 20, ease: "power4.out", transformOrigin: "bottom right" }, "bubbleHeart")
                .from("#svg-Heart1", 0.8, { scale: 0, ease: "power4.out", transformOrigin: "bottom right" }, "bubbleHeart+=0.3")
               

                .set("#carret, #cta", { alpha: 1 }, "frame1+=0.15")
                .to("#verizonLogo", 0.6, { xPercent: 0, ease: "power4.out" }, "frame1+=0.15")
                .to("#carret", 0.4, { x: 0, ease: "linear:EaseNone" }, "frame1+=0.15")
                .to("#cta", 0.4,{clipPath: "polygon(0% 0%, 100% 0%, 115% 55.25%, 100% 100%, 0% 100%)", ease:"linear:EaseNone"}, "frame1+=0.15")
                
                .to("#frame1 .sub-legal", { alpha: 1, duration: 0.1, ease: "power3.out" }, "frame1+=0.15")
                .from(["#f1Heading .splitted-container1","#f1Heading .splitted-container2",["#f1Heading .splitted-container3","#f1Heading .splitted-container4"]], {
                    x: "-115%",
                    ease: "power3.out",
                    duration: 0.5,
                    stagger: 0.05
                }, "frame1")

                .from("#f1Heading .splitted-container .outlined div", {
                    opacity: 0,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.2
                }, "frame1")

                // Y-OUTLINED FADE IN AFTER ANIMATION
                .to("#f1Heading  .splitted-container .y-outlined", {
                    opacity: 1,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.001
                }, "frame1")

                if (navigator.userAgent.toLowerCase().includes('firefox')) {
                    // EXTRUDE "BEAT" ANIMATION FOR FIREFOX
                    Creative.tl.to("#f1Heading .splitted-container .outlined", {
                        y: -4,
                        x: -4,
                        force3D: false,
                        ease: "power4.out",
                        duration: 0.2
                    }, "frame1+=0.6")

                        .to("#f1Heading .splitted-container .outlined", {
                            y: -2,
                            x: -2,
                            force3D: false,
                            ease: "power4.out",
                            duration: 0.2
                        }, ">")
                } else {
                    // EXTRUDE "BEAT" ANIMATION FOR OTHER BROWSERS
                    Creative.tl.to("#f1Heading .splitted-container .outlined", {
                        y: -4,
                        x: -4,
                        force3D: false,
                        ease: "power4.out",
                        duration: 0.5
                    }, "frame1+=0.3")

                        .to("#f1Heading .splitted-container .outlined", {
                            y: -1,
                            x: -1,
                            force3D: false,
                            ease: "power4.out",
                            duration: 0.3
                        }, ">")
                }

                
                Creative.tl
                // .from(["#f1Heading  .splitted-container:last-child", "#f1Heading  .splitted-container:nth-last-child(2)"], { 
                //     duration: 0.001, opacity:0, stagger: 0.08, ease: "power3.out"
                // },"frame1+=0.12")
                // .from(["#f1Heading  .splitted-container:last-child", "#f1Heading  .splitted-container:nth-last-child(2)"], {
                //     xPercent: -150, duration: 0.5, ease: "power3.out", stagger: 0.08
                // },"frame1")
                    
                // Animate pillContainers AFTER slides
                .to("#f1Heading  .splitted-container span.pill", {
                    autoAlpha: 1,
                    duration: 0.01,
                    borderColor: "rgba(0,0,0,1)",
                    ease: "power2.out"
                }, "frame1+=0.37")

                // Expand pill spans from width: 0
                .from("#f1Heading  .splitted-container span.pill", {
                    width: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, ">-=0.03")

                // After they expand, move only non-yellow pills upward
                .to("#f1Heading  .splitted-container span.pill.white", { y: -10, x: -10, duration: 0.45, ease: "power3.out" }, ">-=0.037")
                
                // pill moving downward
                .to("#f1Heading  .splitted-container span.pill.white", { y: -5, x: -4, duration: 0.4, ease: "power3.out" }, ">-=0.1")
                // .from("#f1SubHead",{ duration: 0.5, xPercent: -300, ease: "power3.out" },"frame1+=0.3")
                // .from("#f1SubLegal",{ duration: 0.5, autoAlpha: 0, ease: "power4.out" },">-=0.15")
                .to("#frame1 .sub-legal", { alpha: 1, duration: 0.1, ease: "power3.out" }, "frame1+=0.15")

                //-------- F1 OUT -------------------------------
                Creative.tl
                .addLabel("frame1Out", ">+=1.5")
                .to(["#f1Heading .splitted-container1","#f1Heading .splitted-container2",["#f1Heading .splitted-container3","#f1Heading .splitted-container4"]], 0.5, { x: "140%", ease: "power1.inOut", stagger: 0.05 }, "frame1Out")
                .to(["#f1Heading .splitted-container1","#f1Heading .splitted-container2",["#f1Heading .splitted-container3","#f1Heading .splitted-container4"]], 0.001, { opacity: 0, ease: "power1.inOut", stagger: 0.03 }, "frame1Out+=0.2")
                .to("#verizonLogo, #cta, #carret, #frame1 .sub-legal", 0.3, { alpha: 0, ease: "power1.out" }, "frame1Out")
                 .to("#icon-bubHeart1", 0.6, { xPercent: -20, yPercent: -70, opacity: 0, scale: 1.1, ease: "power3.in" }, "bubbleHeart+=0.7")
             

                //-------- Device In ----------------------------------------------------------------------------------------------------------------------------
                //-------------------------------------------------------------------------------------------------------------------------------------------
                .addLabel("deviceFrame", ">+=0.0")
                .set("#devicesFrame", { alpha: 1 }, "deviceFrame")
                .set("#devices", { y: 250, opacity: 0 }, "deviceFrame")
                .to("#devices", 0.9, { y: 0, ease: "power4.out" }, "deviceFrame")
                .set("#devices", { opacity: 1 }, "deviceFrame")
                // .set("#frame1", { opacity: 0 }, "deviceFrame+=0.08")
                .from("#deviceName", 0.7, { opacity: 0, ease: "power4.out" }, "deviceFrame")

                //-------- Device Out -------------------------------
                .addLabel("deviceOut", "+=0.2")
                .to("#deviceName", 0.4, { opacity: 0, ease: "power4.in" }, "deviceOut")
                .to("#devices", 0.5, { y: 250, ease: "power4.in" }, "deviceOut+=0.1")



                //-------- F3 IN ----------------------------------------------------------------------------------------------------------------------------
                //-------------------------------------------------------------------------------------------------------------------------------------------
                .addLabel("frame3", ">+=0.0")
                .set("#verizonLogo", { xPercent: -120, alpha: 1 }, "frame3")
                .set("#cta", { clipPath: "polygon(0% 0%, 0% 0%, 9.56% 50.46%, 0% 100%, 0% 100%)"}, "frame3")
                .set("#carret", { x: -110 }, "frame3")
                .set("#frame3", { alpha: 1 }, "frame3")
                .set("#cta, #carret",{opacity:1},"frame3+=0.03")

                .set("#f3Heading", { alpha: 1 }, "frame3+=0.15")
                .addLabel("bubbleLike", "+=0.5")
                .from("#icon-bubLike", 0.7, { scale: 0, opacity: 0, yPercent: 20, ease: "power4.out", transformOrigin: "bottom right" }, "bubbleLike")
                .to("#icon-bubLike", 0.6, { xPercent: -20, yPercent: -70, opacity: 0, scale: 1.1, ease: "power3.in" }, "bubbleLike+=0.7")
                .from("#svg-Like", 0.8, { scale: 0, ease: "power4.out", transformOrigin: "bottom left" }, "bubbleLike+=0.3")

                .from("#icon-phone", 0.5, { scale: 0, opacity: 0, ease: "power4.out", transformOrigin: "center center" }, "bubbleLike+=0.3")
                .from(".svg-phone-move, .svg-phone", 0.2, { xPercent: 8, yPercent: 8, ease: "none" }, "bubbleLike+=0.5")
                .from(".svg-phone", 0.2, { opacity: 0 }, "bubbleLike+=0.5")
                .fromTo(".svg-phone",
                    { rotate: 0 },
                    { duration: 0.15, rotate: -15, repeat: 3, yoyo: true, ease: "power4.out" },
                    "bubbleLike+=0.7"
                )

                .from("#frame3 .yellow-box", 0.5, { width: 0, ease: "power4.out" }, "frame3")
                .to("#frame3 .yellow-box", { "--afterOpacity1": 1 }, "frame3+=0.01")
                
                .to("#verizonLogo", 0.6, { xPercent: 0, ease: "power4.out" }, "frame3")
                .to("#carret", 0.4, { x: 0, ease: "linear:EaseNone" }, "frame3+=0.03")
                .to("#cta", 0.4,{clipPath: "polygon(0% 0%, 100% 0%, 115% 55.25%, 100% 100%, 0% 100%)", ease:"linear:EaseNone"}, "frame3+=0.03")
                .from("#f3SubLegal", 0.5, { opacity: 0, ease: "power4.out" }, "frame3+=0.3")

                .from("#f3Heading .splitted-container .outlined div", {
                    opacity: 0,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.2
                }, "frame3")

                // Y-OUTLINED FADE IN AFTER ANIMATION
                .to("#f3Heading  .splitted-container .y-outlined", {
                    opacity: 1,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.001
                }, "frame3")


            if (navigator.userAgent.toLowerCase().includes('firefox')) {
                // EXTRUDE "BEAT" ANIMATION FOR FIREFOX
                Creative.tl.to("#f3Heading .splitted-container .outlined", {
                    y: -4,
                    x: -4,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.2
                }, "frame3+=0.6")

                    .to("#f3Heading .splitted-container .outlined", {
                        y: -2,
                        x: -2,
                        force3D: false,
                        ease: "power4.out",
                        duration: 0.2
                    }, ">")
            } else {
                // EXTRUDE "BEAT" ANIMATION FOR OTHER BROWSERS
                Creative.tl.to("#f3Heading .splitted-container .outlined", {
                    y: -4,
                    x: -4,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.3
                }, "frame3+=0.3")

                    .to("#f3Heading .splitted-container .outlined", {
                        y: -1,
                        x: -1,
                        force3D: false,
                        ease: "power4.out",
                        duration: 0.2
                    }, ">")
            }

            //-------- F3 OUT -------------------------------
            Creative.tl.addLabel("frame3Out", "+=0.1")
                .to("#f3Heading", 0.001, { opacity: 0, ease: "power2.out" }, "frame3Out+=0.45")
                .to("#frame3 .yellow-box", 0.59, { width: 16, ease: "power4.in" }, "frame3Out+=0.1")
                .to("#frame3 .yellow-box", 0.001, { opacity: 0, ease: "power4.out" }, ">")
                .to("#icon-phone", 0.59, { scale: 0, ease: "power4.in", transformOrigin: "67% 67%" }, "frame3Out+=0.1")
                .to(".svg-phone-move, .svg-phone", 0.59, { xPercent: 8, yPercent: 8, ease: "power4.out" }, "frame3Out+=0.1")
                .to("#f3SubLegal", 0.4, { opacity: 0, ease: "power4.out" }, "frame3Out+=0.1")



                //-------- F4 IN ----------------------------------------------------------------------------------------------------------------------------
                //-------------------------------------------------------------------------------------------------------------------------------------------
                .addLabel("frame4")
                .set("#frame4", { alpha: 1 }, "frame4")

                .set("#f4Heading, #f4Eyebrow", { alpha: 1 }, "frame4+=0.15")

                .addLabel("bubblePlane", "+=0.7")
                .from("#icon-bubPlane", 0.7, { scale: 0, opacity: 0, yPercent: 20, ease: "power4.out", transformOrigin: "bottom left" }, "bubblePlane")
                .from(".svg-bubblePlane", 0.8, { scale: 0, y: 10, ease: "power4.out", transformOrigin: "bottom left" }, ">-=0.5")
                .to("#icon-bubPlane", 0.6, { xPercent: 20, yPercent: -70, opacity: 0, scale: 1.1, ease: "power3.in" }, "bubblePlane+=0.7")

                .addLabel("flash", "bubblePlane+=0.2")
                .from("#icon-flash", { scale: 0, duration: 0.4, ease: "power2.inOut" }, "flash")
                .to(".icon-flash-outline", { duration: .4, x: -1, y: -3, transformBox: "fill-box", transformOrigin: "50% 50%", ease: "power4.out" }, "flash+=0.4")



                .from("#frame4 .yellow-box", 0.5, { width: 0, ease: "power4.out" }, "frame4")
                .to("#frame4 .yellow-box", { "--afterOpacity1": 1 }, "frame4+=0.01")
                .from("#f4SubLegal", 0.5, { opacity: 0, ease: "power4.out" }, "frame4+=0.3")
                // .from("#f4Eyebrow", 0.2, { x: "-20%", ease: "power4.out" }, "frame4+=0.1")
                .from("#f4Heading .splitted-container .outlined div", {
                    opacity: 0,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.2
                }, "frame4")

                // Y-OUTLINED FADE IN AFTER ANIMATION
                .to("#f4Heading  .splitted-container .y-outlined", {
                    opacity: 1,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.001
                }, "frame4")


            if (navigator.userAgent.toLowerCase().includes('firefox')) {
                // EXTRUDE "BEAT" ANIMATION FOR FIREFOX
                Creative.tl.to("#f4Heading .splitted-container .outlined", {
                    y: -4,
                    x: -4,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.2
                }, "frame4+=0.6")

                    .to("#f4Heading .splitted-container .outlined", {
                        y: -2,
                        x: -2,
                        force3D: false,
                        ease: "power4.out",
                        duration: 0.2
                    }, ">")
            } else {
                // EXTRUDE "BEAT" ANIMATION FOR OTHER BROWSERS
                Creative.tl.to("#f4Heading .splitted-container .outlined", {
                    y: -4,
                    x: -4,
                    force3D: false,
                    ease: "power4.out",
                    duration: 0.3
                }, "frame4+=0.3")

                    .to("#f4Heading .splitted-container .outlined", {
                        y: -1,
                        x: -1,
                        force3D: false,
                        ease: "power4.out",
                        duration: 0.2
                    }, ">")
            }

            //-------- F4 OUT -------------------------------
            Creative.tl.addLabel("frame4Out", "+=0.1")
                .to("#f4Eyebrow", 0.001, { opacity: 0, ease: "power2.out" }, "frame4Out+=0.45")
                .to("#f4Heading", 0.001, { opacity: 0, ease: "power2.out" }, "frame4Out+=0.45")

                .to(".icon-flash-outline", { duration: .4, x: 0, y: 0, transformBox: "fill-box", transformOrigin: "50% 50%", ease: "power1.out" }, "frame4out-=0.4")
                .to("#icon-flash", 0.59, { scale: 0, duration: 0.4, ease: "power4.in" }, "frame4Out+=0.1")
                .to("#frame4 .yellow-box", 0.59, { width: 8, ease: "power4.in" }, "frame4Out+=0.1")
                .to("#frame4 .yellow-box", 0.001, { opacity: 0, ease: "power4.out" }, ">")
                .to("#frame4 .yellow-box", { "--afterOpacity1": 0 }, "frame4Out+=0.68")
                
                
                .to("#icon-phone", 0.3, { scale: 0, ease: "power4.out", transformOrigin: "67% 67%" }, "frame4Out+=0.1")
                .to(".svg-phone-move, .svg-phone", 0.2, { xPercent: 8, yPercent: 8, ease: "power4.out" }, "frame4Out+=0.1")
                .to("#f4SubLegal", 0.4, { opacity: 0, ease: "power4.out" }, "frame4Out+=0.1")

                // NOTE: Even if #f4Heading line breaks change or this duration gets extended,
                // using ">-0.4" means the next animation (endCta) will ALWAYS start
                // 0.4s before this animation fully ends.




                //-------- F5 IN ----------------------------------------------------------------------------------------------------------------------------
                //-------------------------------------------------------------------------------------------------------------------------------------------
                .addLabel("frame5", ">+=0.07")
                .set("#frame5", { alpha: 1 }, "frame5+=0.12")
             

                .addLabel("endCta", ">+0.12")
                //.to("#carret", 0.6, { x: 0, ease: "power4.out" }, "endCta")
                //.to("#cta", 0.6, { clipPath: 'inset(0% 0% 0% 0%)', ease: "power4.out" }, "endCta")

                .from(["#f5Heading  .splitted-container:nth-child(1)", "#f5Heading  .splitted-container:nth-child(2)"], {
                    duration: 0.001, opacity: 0, stagger: 0.08, ease: "power3.out"
                }, "frame5+=0.12")
                .from(["#f5Heading  .splitted-container:nth-child(1)", "#f5Heading  .splitted-container:nth-child(2)"], {
                    xPercent: -150, duration: 0.5, ease: "power3.out", stagger: 0.08
                }, "frame5")


            

                // Animate pillContainers AFTER slides
                .to("#f5Heading  .splitted-container span.pill", {
                    autoAlpha: 1,
                    duration: 0.01,
                    borderColor: "rgba(0,0,0,1)",
                    ease: "power2.out"
                }, "frame5+=0.12")

                // Expand pill spans from width: 0
                .from("#f5Heading  .splitted-container span.pill", {
                    width: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, ">-=0.03")


                // After they expand, move only non-yellow pills upward
                .to("#f5Heading  .splitted-container span.pill.white", { y: -10, x: -10, duration: 0.45, ease: "power3.out" }, ">-=0.037")
                
                // pill moving downward
                .to("#f5Heading  .splitted-container span.pill.white", { y: -5, x: -4, duration: 0.4, ease: "power3.out" }, ">-=0.1")
                .to("#frame5 .sub-legal", { alpha: 1, duration: 0.1, ease: "power3.out" }, "frame5+=0.15")


                .from("#f5SubHead", { duration: 0.5, xPercent: -140, ease: "power3.out" }, "frame5+=0.2")
                .from("#f5SubLegal", {
                    duration: 0.5, autoAlpha: 0, ease: "power4.out", onComplete: function () {
                        if (getById('underlinedText') !== null) Creative.addTooltip();
                    }
                }, ">-=0.15")

                .addLabel("bubbleHeart", "-=0.7")
                .from("#icon-bubHeart2", 0.7, { scale: 0, opacity: 0, yPercent: 20, ease: "power4.out", transformOrigin: "bottom right" }, "bubbleHeart")
                .from("#svg-Heart2", 0.8, { scale: 0, ease: "power4.out", transformOrigin: "bottom right" }, "bubbleHeart+=0.3")

                .addLabel("end", ">")
        }

        //console.log( Creative.tl.duration() )

        console.log(Creative.tl.duration())
    }
};
function bubble(imgtype, delays) {
    const tl = gsap.timeline();

    tl.addLabel(`bubble${imgtype}`, delays);

    tl.from(`#icon-bub${imgtype}`, {
        duration: 0.7,
        scale: 0,
        opacity: 0,
        yPercent: 50,
        ease: "power4.out",
        transformOrigin: "bottom left"
    }, `bubble${imgtype}`);

    tl.to(`#icon-bub${imgtype}`, {
        duration: 0.6,
        xPercent: 10,
        yPercent: -70,
        opacity: 0,
        scale: 1.1,
        ease: "power3.in"
    }, `bubble${imgtype}+=0.7`);

    tl.from(`#svg-${imgtype}`, {
        duration: 0.8,
        scale: 0,
        ease: "power4.out",
        transformOrigin: "bottom left"
    }, `bubble${imgtype}+=0.3`);

    return tl;
}
function getById(eleID) {
    return document.getElementById(eleID);
}

function decodeHTMLEntities(text) {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}
