
//hoxton.timeline = Creative.tl;
gsap.defaults({overwrite: "auto", duration:0, ease:"none"});

// as we are using className to target elements in certain sizes in the TL, we want to suppress warnings:
gsap.config({nullTargetWarn:false});


// looping config vars
var _currentLoop    = 0;
var _totalLoops     = 0;
var _endFrameDelay  = 4;
var _useReplayBtn   = true;

// content
var container       = getById("main");

// Tooltip opacity
var isVisible = false;  

// exit and replay
//var btn_replay   = getById("btn_replay");

// split array
var splittedLines = [];

// frame
var _totalFrames    = 5;
var _currentFrame   = 0;
var _previousFrame  = 0;
var _arrFrameObjs   = [];

var bannerData = {
    f1HeadlineText:"<div class='Line1A'>210+</div><br><div class='Line1A'>destinations</div>",
    f1Image:"images/Image1.jpg",
    f2HeadlineText:"<div class='Line2A1'>Unlimited</div><br><div class='Line2A2'>data</div><br><div class='Line2A3'>calls</div><br><div class='Line2A4'>texts</div>",
    f2Image:"images/Image2.jpg",
    f3HeadlineTextA:"Your world",
    f3HeadlineTextB:"<div class='Line3B'>connected</div><br><div class='Line3B'>connected</div><br><div class='Line3B'>connected</div><br><div class='Line3B stone'>connected</div>",
    f4HeadlineText:"<div class='Line4A black'>Stay in touch</div><br><div class='Line4A black'>wherever</div><br><div class='Line4A black'>you go with</div><br><div class='Line4A red'>TravelPass</div>",
    
    ctaText:"Learn more",
    
    
};

// Create and provide timeline to Hoxton
var Creative = {
    
    tl: gsap.timeline( { defaults: { duration:0 , ease:"none" } } ),

    onReplay: function() 
    {
        _currentLoop++;
        Creative.tl.repeat(0);
        Creative.tl.seek("reset");
        Creative.tl.play();
    },

    onBannerStart: function() 
    {
        console.log("Creative.onBannerStart()");
        gsap.ticker.add(() => {
            parent.postMessage({ type: 'timelineProgress', progress: Creative.tl.progress() }, "*");
        });
 
        window.addEventListener("message", (event) => {
            if (event.data.type === 'scrub') {
                Creative.tl.progress(event.data.progress);
            }
        });
    },

    onBannerRepeat: function() 
    {   
        _currentLoop++;
    },

    onBannerComplete: function() 
    {
        if( _currentLoop === _totalLoops && _useReplayBtn === true )
        {
            //Creative.tl.to( btn_replay , {display:"block"} , "end" );
        }
    },

    jumpToEndFrame: function() 
    {
        Creative.tl.pause();
        Creative.tl.seek( "end", false);
        gsap.to(btn_replay,{display:"none"});
    },

    startAd: function() 
    {  
        Creative.createButtons();
        Creative.setUpTimeline();
        Creative.displayBanner();
        Creative.populateData(bannerData);

        const adSizeMeta = document.querySelector('meta[name="ad.size"]');
        if (adSizeMeta) {
            const [width, height] = adSizeMeta.content.split(",").map(size => size.replace(/(width=|height=)/, '').trim());
            getById("main").style.setProperty('--ad-width', `${width}px`);
            getById("main").style.setProperty('--ad-height', `${height}px`);
        }

        Creative.init();
    },

    createButtons: function()
    {
        //btn_replay.addEventListener( "click" , Creative.onReplay , false );
    },

    setUpTimeline: function()
    {
        Creative.tl.repeat(_totalLoops);
        Creative.tl.repeatDelay(_endFrameDelay);
        Creative.tl.eventCallback("onStart", Creative.onBannerStart);
        Creative.tl.eventCallback("onRepeat", Creative.onBannerRepeat);
        Creative.tl.eventCallback("onComplete", Creative.onBannerComplete);
    },

    displayBanner: function()
    {
        gsap.to(container,{display:"block"});
    },

    resetFrameObjs: function() 
    {
        for(var i = 0; i < _arrFrameObjs.length; i ++)
        {
            _arrFrameObjs[i].ifShowing = false;
            gsap.set([_arrFrameObjs[i].eleRef], {alpha:0});
        }
    },
    
    init: function() {
        Creative.splitLines(["f1HeadlineText", "f2HeadlineText", "f3HeadlineTextB", "f4HeadlineText"]);

        // ---------- FRAME 1 INTRO ----------
        
            Creative.tl.addLabel("Frame1", 0.5)
            .to("#main", 0.01,{opacity:1},"Frame1+=0.0")
            .to("#bubbleShape1, #tailShape", 0.01,{opacity:1},"Frame1+=0.0")
            .to(".verizonLogo", 0.001 ,{fill:"#F50A23"},"Frame1+=0.0")
            .to("#flexBox", 0.001 ,{rotation: 0.0001},"Frame1+=0.0")
            .to("#ctaContainer, #ctaArrow", 0.001 ,{opacity: 0},"Frame1+=0.0")
            
            // INITIALIZE SMALL BUBBLE
            .to("#maskBox", 0.001 ,{clipPath: "polygon(64.7% 80.1%, 65% 68.6%, 65.5% 67.5%, 66.5% 66.3%, 67.3% 65.7%, 68.7% 65.3%, 90.8% 65.2%, 92.5% 65.6%, 93.6% 66.4%, 94.3% 67.3%, 94.8% 68.2%, 95% 68.7%, 95.3% 70.2%, 95.3% 84%, 95.3% 93.2%, 94.9% 94.1%, 94.6% 94.4%, 94% 94.7%, 93.1% 94.6%, 92.3% 93.9%, 84% 84.5%, 82.5% 83.6%, 80.9% 83.4%, 68.8% 83.28%, 67.2% 82.8%, 66.2% 82%, 65.4% 81%, 65% 80.2%, 64.65% 79%)"},"Frame1+=0.0")
        
            // MASKING SHAPE INTRO
            .from("#f1Image", 0.01,{y: 15},"Frame1+=0.0")
        
            .to("#maskBox", 0.01,{autoAlpha: 1, ease:"power1.in"},"Frame1")
            .from("#maskBox", 0.4,{y: "20px", ease:"power1.out", rotation: 0.00001},"Frame1+=0.05")

                // SEMI BOX MORPH
                .to("#maskBox", 0.1,{
                clipPath: "polygon(4.7% 80.1%, 5% 68.6%, 5.5% 67.5%, 6.5% 66.3%, 7.3% 65.7%, 8.7% 65.3%, 90.8% 65.2%, 92.5% 65.6%, 93.6% 66.4%, 94.3% 67.3%, 94.8% 68.2%, 95% 68.7%, 95.3% 70.2%, 95.3% 84%, 95.3% 93.2%, 94.9% 94.1%, 94.6% 94.4%, 94% 94.7%, 93.1% 94.6%, 92.3% 93.9%, 84% 84.5%, 82.5% 83.6%, 80.9% 83.4%, 8.8% 83.28%, 7.2% 82.8%, 6.2% 82%, 5.4% 81%, 5% 80.2%, 4.65% 79%)", 
                    ease:"linear.out", 
                    rotation: 0.00001
                },"Frame1+=0.05")
        
                // LARGE BOX MORPH
                .to("#maskBox", 0.2,{clipPath: "polygon(4.7% 10.1%, 5% 8.6%, 5.5% 7.5%, 6.5% 6.3%, 7.3% 5.7%, 8.7% 5.3%, 90.8% 5.2%, 92.5% 5.6%, 93.6% 6.4%, 94.3% 7.3%, 94.8% 8.2%, 95% 8.7%, 95.3% 10.2%, 95.3% 84%, 95.3% 93.2%, 94.9% 94.1%, 94.6% 94.4%, 94% 94.7%, 93.1% 94.6%, 92.3% 93.9%, 84% 84.5%, 82.5% 83.6%, 80.9% 83.4%, 8.8% 83.28%, 7.2% 82.8%, 6.2% 82%, 5.4% 81%, 5% 80.2%, 4.65% 79%)", 
                    ease:"linear.out", 
                    rotation: 0.00001
                },"Frame1+=0.15")
        
                // IMAGE MOVEMENT
                .to("#f1Image", 2.9,{y:-15, rotation: 0.00001},"Frame1+=0.3")
        
            // TEXT INTRO
            .from(".Line1A", 0.01,{opacity:"0", stagger: 0.15, ease: "power1.out"},"Frame1+=0.15")
            .from(".Line1A", 0.3,{y:"150%", stagger: 0.08, ease: "power1.out"},"Frame1+=0.2")
        
            // ---------- FRAME 1 EXIT ----------
        
                // TEXT EXIT
                .to(".Line1A", 0.3,{y:"-110%", stagger: 0.08, ease: "power1.out"},"Frame1+=3")
                .to(".Line1A, #f1Image", 0.01,{opacity:0, ease: "power1.out"},"Frame1+=3.3")
        
        // ---------- FRAME 2 INTRO ----------
        
            .addLabel("Frame2", "-=0.08")
        
            .to("#flexBox", 0.001 ,{rotation: 0.0001},"Frame2+=0.0")
            .to(".verizonLogo", 0.001 ,{fill:"#F3EDE0"},"Frame2+=0.0")
            // TEXT INTRO
        
            // BG CHANGE COLOR
            .to("#bgColor", 0.01,{backgroundColor:"#F50A23", ease:"power4.in", rotation: 0.00001},"Frame2+=0.0")
                
                // IMAGE TRANSITION
                .from("#f2Image", 0.01,{opacity:0, ease:"power4.in"},"Frame2+=0.0")
                .from("#f2Image", 0.2,{y: 15},"Frame2+=0.0")
        
                // TEXT INTRO
                .from(".Line2A1, .Line2A2", 0.01,{opacity:"0", stagger: 0.15, ease: "power1.out"},"Frame2+=0.0")
                .from(".Line2A1, .Line2A2", 0.3,{y:"150%", stagger: 0.08, ease: "power1.out"},"Frame2-=0.1")
        
                // TEXT ANIMATION
                    .to("#f2HeadlineText .splitted-container:nth-child(2)", 0.01,{overflow:"hidden", ease: "power1.out"},"Frame2+=0.5")

                    .to(".Line2A2", 0.4,{y:"-100%", ease: "power1.inOut"},"Frame2+=1.30")
                    .from(".Line2A3", 0.4,{y:"100%", ease: "power1.inOut"},"Frame2+=1.45")
                    .to(".Line2A3", 0.4,{y:"-100%", ease: "power1.inOut"},"Frame2+=2.55")
                    .from(".Line2A4", 0.4,{y:"100%", ease: "power1.inOut"},"Frame2+=2.70")
        
                // IMAGE MOVEMENT
                .to("#f2Image", 2.9,{y:-15, rotation: 0.00001},"Frame2+=0.1")
        
        
            // ---------- FRAME 2 EXIT ----------
        
                // RESET MORPH BUBBLE FOR ENDFRAME
                .to("#maskBox", 0.3,{scale: 0, ease:"power4.out", rotation: 0.00001},"Frame2+=3.4")
        
                .to("#maskBox, #f1HeadlineText, #f2HeadlineText, #f2Image", 0.01,{opacity: 0, rotation: 0.00001},"Frame2+=3.5")
                .to("#maskBox", 0.001,{clipPath: "polygon(4.7% 60.1%, 5% 48.6%, 5.5% 47.5%, 6.5% 46.3%, 7.3% 45.7%, 8.7% 45.3%, 90.8% 45.2%, 92.5% 45.6%, 93.6% 46.4%, 94.3% 47.3%, 94.8% 48.2%, 95% 48.7%, 95.3% 50.2%, 95.3% 64%, 95.3% 93.2%, 94.9% 94.1%, 94.6% 94.4%, 94% 94.7%, 93.1% 94.6%, 92.3% 93.9%, 84% 84.5%, 82.5% 83.6%, 80.9% 83.4%, 8.8% 83.28%, 7.2% 82.8%, 6.2% 82%, 5.4% 81%, 5% 80.2%, 4.65% 79%)", rotation: 0.00001},"Frame2+=3.5")
                
                .to(".verizonLogo", 0.001 ,{fill:"#F50A23", opacity: 0},"Frame2+=3.5")
        
        
        // ---------- FRAME 3 INTRO ----------
        
            .addLabel("Frame3", "-=0.2")
            
            .to("#flexBox", 0.001 ,{rotation: 0.0001},"Frame3+=0.0")
                // TEXT INTRO
                .from("#f3HeadlineboxA", 0.01,{opacity:"0", ease: "power1.out"},"Frame3+=0.0")
                .from(".Line3B", 0.01,{opacity:"0", stagger: 0.1, ease: "power1.out"},"Frame3+=0.1")
                .to(".Line3B", 0.1,{color:"#FF3C2D", stagger: 0.1, ease: "power1.out"},"Frame3+=0.18")
                .to(".Line3B:nth-last-child(4)", 0.1,{color:"#FFFFFF", ease: "power1.out"},"Frame3+=0.35")

                // ---------- FRAME 3 EXIT ----------
        
                .to("#maskBox", 0.01,{scale: 1},"Frame3+=1")
        
                // IMAGE MOVEMENT
                .to("#frame3", 1,{y:"-15%", ease:"expo.inOut"},"Frame3+=1")
                .to("#frame3", 0.01,{opacity: 0, ease:"expo.inOut"},"Frame3+=1.6")
        
        // ---------- FRAME 4 INTRO ----------
        
            .addLabel("Frame4", "-=0.4")
        
            .to("#flexBox", 0.001 ,{rotation: 0.0001},"Frame4+=0.0")
            .to(".verizonLogo, #ctaContainer, #arrow-fill", 0.001 ,{fill:"#F50A23", color:"#F50A23", opacity: 1},"Frame4+=0")
            .from("#ctaArrow", 0.5, {x:-90,opacity: 1},"Frame4+=0")
            .from("#ctaMask", 0.5, {width:"0%"},"Frame4+=0")
            
            .to("#logoBox", 0.001 ,{bottom: "51px", left: "28px"},"Frame4+=0")
        
            // MASKING SHAPE MORPH
            .from("#bubbleShape4", 0.001,{autoAlpha: 0, rotation: 0.00001},"Frame4")
            .to("#tailShape", 0.001,{autoAlpha: 1},"Frame4")

            .to("#maskBox", 0.01,{opacity: 1},"Frame4+=0.0")
            .to("#maskBox", 0.3,{clipPath: "polygon(4.7% 10.1%, 5% 8.6%, 5.5% 7.5%, 6.5% 6.3%, 7.3% 5.7%, 8.7% 5.3%, 90.8% 5.2%, 92.5% 5.6%, 93.6% 6.4%, 94.3% 7.3%, 94.8% 8.2%, 95% 8.7%, 95.3% 10.2%, 95.3% 84%, 95.3% 93.2%, 94.9% 94.1%, 94.6% 94.4%, 94% 94.7%, 93.1% 94.6%, 92.3% 93.9%, 84% 84.5%, 82.5% 83.6%, 80.9% 83.4%, 8.8% 83.28%, 7.2% 82.8%, 6.2% 82%, 5.4% 81%, 5% 80.2%, 4.65% 79%)", ease:"power4.inOut", rotation: 0.00001},"Frame4+=0.0")
        
            // TEXT INTRO
                .from(".Line4A", 0.3,{y:"110%", stagger: 0.08, ease: "power1.out"},"Frame4+=0.15")
                .from(".Line4A", 0.001,{opacity:"0", stagger: 0.08},"Frame4+=0.25")
        
            console.log(Creative.tl.duration());    
    }
};


function getById( eleID ) 
{
    return document.getElementById(eleID);
}

/*
* Function gets cumulative time for frame/labels
*/
function getLabelTime(frameIndex) {
    var totalTime = 0;

    var arrCumulativeTime = [];
    arrCumulativeTime.push(totalTime);

    for(var i= 0; i < _arrFrameWaits.length; i++)
    {
        totalTime += _arrFrameWaits[i];
        arrCumulativeTime.push(totalTime);
    }

    if(arrCumulativeTime.length > frameIndex)
    {
        return arrCumulativeTime[frameIndex];
    }
    else
    {
        return 0;
    }
}

window.onload = Creative.startAd;
