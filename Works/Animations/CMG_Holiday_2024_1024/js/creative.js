
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
    h1Heading: "Trade in<br><span class=\"yellow\">any<\/span> phone<br><span class=\"yellow\">any<\/span> condition",
    h1SLegalSubheading: "From Apple, Google or Samsung. With Unlimited Ultimate.",

    h2Heading: "iPhone 16 Pro<br>on us",
    h2Subheading: "<span class=\"yellow\">For everyone in the family<\/span>",
    h2LegalSubheading: "Phone trade-in from Apple, Samsung or Google req’d.<br>With Unlimited Ultimate. <u id=\"underlinedText\">Offer details<\/u>",
    
    device: "images/device.png",
    topLeftFold: "images/topLeftFold.svg",
    botRightFold: "images/botRightFold.svg",
    topRightFold: "images/topRightFold.svg",
    midLeftFold: "images/midLeftFold.svg",
    midRightFold: "images/midRightFold.svg",
    bottomFold: "images/bottomFold.svg",
    giftRibbon: "images/ribbons.svg",

    legalFrame: "Apple Intelligence coming in fall 2024.",

    disclaimer: "<b>iPhone:</b> $829.99 (128 GB only) purchase w/new smartphone line on Unlimited Ultimate plan (min. $90/mo w/Auto Pay (+taxes/fees) for 36 mos) req'd first. Less $830 trade-in/promo credit applied over 36 mos.; promo credit ends if eligibility req’s are no longer met; 0% APR. <b>Smartphone trade-in must be from Apple, Google or Samsung; trade-in terms apply. iPad:</b> $499.99 (64 GB only) device payment purchase w/new line on service plan (min. $20/mo w/Auto Pay (+taxes/fees) for 36 mos) req'd. Less $499.99 promo credit applied over 36 mos.; 0% APR. All promo credits for iPhone/iPad offers end if eligibility req's per device are no longer met. <b>Apple One:</b> Perk requires new smartphone line subscribed to Unlimited Ultimate plan; perk must be added to eligible plan and registered w/Apple w/in 90 days of activation. $10/mo perk credit ends after 6 mos or if perk is canceled or line is moved to an ineligible plan during the promo period. After 6 mos, perk bills at $10/mo unless perk is canceled or unregistered. One offer per eligible Verizon line. Add'l terms apply. Limited time offer.",

    ctaText: "<span class=\"white\">Shop now<\/span>",
    tooltipEdgeGap: "15"
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
        Creative.splitLines(["h1Heading", "h2Heading"]);

        Creative.tl.addLabel("reset", 0)
            // reset elements to initial states
            .call( Creative.resetFrameObjs ,[] , "reset" )
            .set([splittedLines[0],splittedLines[1],"#h2Subheading"], { alpha:0, rotation:0.01 }, "reset")
            .set("#contentContainer, #foldFrame", {clipPath: "polygon(0 0, 100% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 0)"}, "reset")
            .set("#topLeftFold", {rotateX: 180, transform: "rotate(-33deg)", transformOrigin:"left top"}, "reset")
            .set("#botRightFold", {rotateX: 180, transform: "rotate(-38deg)", transformOrigin:"right bottom"}, "reset")
            .set("#topRightFold", {rotateX: 180, transform: "rotate(43deg)", transformOrigin:"right top"}, "reset")
            .set("#midLeftFold", {rotateY: 180, transform: "rotate(-6deg)", transformOrigin:"left top"}, "reset")
            .set("#midRightFold", {rotateY: 180, transform: "rotate(-6deg)", transformOrigin:"left top"}, "reset")
            .set("#bottomFold", {yPercent: 100, rotateX: 180, transformOrigin:"bottom"}, "reset")
            .set("#giftWrapHolder", {perspective:900})
            .set("#giftWrap", {yPercent: 0, rotateX: 180, transformOrigin:"top", transformStyle:"preserve-3d"}, "reset")
            .set("#legalContainer, #ctaArrow, #ctaContainer", {display: "none"}, "reset")
            .to("#deviceFrame, #deviceFrame", {alpha:0}, "reset")
            .to("#container", {alpha:1}, "reset")
            .set(splittedLines[0], { opacity:0 })

            //-------- Heading1 IN -------------------------------
            .addLabel("frame1", 0.001)
            .set("#ctaArrow", {opacity: 1}, "frame1+=0.3")
            .from("#logoMask", 0.5, {x: -200, ease:"power1.inOut"}, "frame1")  
            .to("#heading1", {alpha:1}, "frame1")
            .from(splittedLines[0], 1, {yPercent: 150, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[0], 0.001, {alpha:1, stagger: 0.1})} }, "frame1+=30%")
            .from("#h1SLegalSubheading", 0.3, {alpha: 0, stagger: 0.1, ease:"power1.out"}, "frame1+=300%")
            
            //-------- Frame Fold IN -------------------------------
            .addLabel("foldFrameIn", 2)
            // -------- Top Left Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 100% 0, 100% 30%, 100% 73%, 100% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameIn") //1st fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 100% 0, 100% 30%, 100% 73%, 100% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameIn") 
            .to("#topLeftFold", 0.5, {rotateX: 0, ease:"power2.out", transformOrigin:"left top"}, "foldFrameIn")  
            // -------- Both Right Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 100% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameIn+=0.2") //2nd fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 100% 0%, 100% 30%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameIn+=0.2")
            .to("#botRightFold", 0.5, {rotateX: 0, ease:"power2.out", transformOrigin:"right bottom"}, "foldFrameIn+=0.2")
            // -------- Top Right Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 73% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameIn+=0.5") //3rd fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 72.8% 0%, 100% 30.2%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameIn+=0.5")
            .to("#topRightFold", 0.5, {rotateX: 0, ease:"power2.out", transformOrigin:"right top"}, "foldFrameIn+=0.5")

            // -------- Mid Left and Right Fold --------
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 73.67% 0%, 77% 39%, 80.33% 92%, 72% 100%, 29% 100%, 23% 38%, 20% 11%)", ease:"expo.out"}, "foldFrameIn+=1") //4th fold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34% 0%, 73% 0%, 75% 39%, 80% 92%, 72% 100%, 29% 100%, 25% 57%, 20.5% 14%)", ease:"expo.out"}, "foldFrameIn+=1")
            .to("#midLeftFold", 0.5, {rotateY: 0, ease:"power2.out", transformOrigin:"left top"}, "foldFrameIn+=1")
            .to("#midRightFold", 0.5, {rotateY: 0, ease:"power2.out", transformOrigin:"right top"}, "foldFrameIn+=1")

            // -------- Bottom Fold --------
            .to("#foldFrame", 0.1, {clipPath: "polygon(34% 0%, 73.67% 0%, 77.33% 45.8%, 81% 51.2%, 79% 70%, 26% 69.6%, 23% 38%, 20% 11%)", ease:"expo.out"}, "foldFrameIn+=1.37")
            .to("#contentContainer", 0.1, {clipPath: "polygon(34% 0%, 73% 0%, 75% 45%, 76% 49%, 75.66% 69.3%, 27% 69.4%, 26% 62.2%, 21.1% 12%)", ease:"expo.out"}, "foldFrameIn+=1.37")
            .to("#bottomFold", 0.5, {yPercent: 0, rotateX: 0, ease:"power2.out", transformOrigin:"bottom"}, "foldFrameIn+=1.3")
            
            // -------- Gift Wrap --------
            .to("#foldFrame", 0.1, {clipPath: "polygon(37% 29.6%, 75% 29.6%, 76.67% 44.6%, 81.33% 49.6%, 78.33% 69.2%, 26% 69.6%, 22.67% 38%, 21.7% 29.8%)", ease:"expo.out"}, "foldFrameIn+=1.65")
            .to("#contentContainer", 0.1, {clipPath: "polygon(43% 30%, 75% 30%, 76% 45%, 77.67% 49.4%, 77.33% 69%, 54% 69%, 26% 69%, 23.33% 30%)", ease:"expo.out"}, "foldFrameIn+=1.65")
            .to("#giftWrap", 0.3,{boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.1)"}, "foldFrameIn+=1.6")
            .to("#giftWrap", 0.3, {yPercent: 0, rotateX: 0, ease:"power2.out", transformOrigin:"top"}, "foldFrameIn+=1.65")
            .set("#logoMask", {x: -200,}, "foldFrameIn+=1.65")
            
            //-------- Frame UnFold -------------------------------
            .addLabel("foldFrameOut", 4.5)
            .set("#heading1, #footerContainer", {alpha:0}, "foldFrameOut")
            .set("#deviceFrame", {alpha:1}, "foldFrameOut")

            // -------- UnFold Gift Wrap --------
            .to("#giftWrap", 0.5, {yPercent: -115, rotateX: 180, boxShadow: "0px 30px 0px 0px rgba(0,0,0,0.1)", ease:"power2.out", transformOrigin:"top"}, "foldFrameOut")
            .to("#bottomFold", 0.5, { rotateX: 80, yPercent: 210, ease:"power2.out", transformOrigin:"bottom", rotation:0.01}, "foldFrameOut")
            .to("#foldFrame", 0.2, {yPercent: 0,clipPath: "polygon(34% 0%, 72.67% 0%, 75.33% 39%, 80% 92%, 72% 100%, 29% 100%, 25% 57%, 20.5% 14%)", ease:"power1.out"}, "foldFrameOut+=0.002") //1st unfold ------
            .to("#contentContainer", 0.21, {yPercent: 0,clipPath: "polygon(34% 0%, 72.33% 0%, 75% 39%, 80% 92%, 72% 100%, 29% 100%, 25.33% 57%, 21.17% 13.6%)", ease:"power1.out"}, "foldFrameOut")
            .from("#device", 1, {yPercent: 30, ease:"power2.out"}, "foldFrameOut+=2%")

            // -------- UnFold Mid Left and Right --------
            .to("#midLeftFold", 0.5, {rotateY: 180, ease:"power2.out", transformOrigin:"left top"}, "foldFrameOut+=0.3")
            .to("#midRightFold", 0.5, {rotateY: 180, ease:"power2.out", transformOrigin:"right top"}, "foldFrameOut+=0.3")
            .to("#foldFrame", 0.15, {clipPath: "polygon(34% 0%, 73% 0%, 100% 30%, 100% 74%, 72% 100%, 0% 100%, 0% 70%, 0% 26%)", ease:"power2.out"}, "foldFrameOut+=0.4005") //2nd unfold ------
            .to("#contentContainer", 0.15, {clipPath: "polygon(34.1% 0%, 72.8% 0%, 100% 30.2%, 100% 73.9%, 71.9% 100%, 0% 100%, 0% 70%, 0% 26.1%)", ease:"power2.out"}, "foldFrameOut+=0.4")
            
             // --------  UnFolded --------
            .to("#topLeftFold", 0.5, {rotateX: 180, ease:"power2.out", transformOrigin:"left top"}, "foldFrameOut+=0.5")
            .to("#botRightFold", 0.5, {rotateX: 180, ease:"power2.out", transformOrigin:"right bottom"}, "foldFrameOut+=0.5")
            .to("#topRightFold", 0.5, {rotateX: 180, ease:"power2.out", transformOrigin:"right top"}, "foldFrameOut+=0.5")
            .to("#contentContainer, #foldFrame", 0.25, {clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)", ease:"power2.out"}, "foldFrameOut+=0.6")

            // --------  Device Out --------
            .addLabel("deviceOut", 6.7)
            .to("#device", 0.75, {yPercent: -10, ease:"power2.in"}, "deviceOut")
            .set("#deviceFrame", {alpha:0}, "deviceOut+=0.75")
     
             // --------  Endframe --------
            .addLabel("endframe", 7.5)
            .set("#heading2, #footerContainer", {alpha:1}, "endframe")
            .set("#ctaContainer", {display: "flex"}, "endframe")
            .to("#logoMask", 0.5, {x: 0, ease:"power1.inOut"}, "endframe")            
            .from(splittedLines[1], 1, {yPercent: 100, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to(splittedLines[1], 0.001, {alpha:1, stagger: 0.1})} }, "endframe")
            .from("#ctaMask", 0.4, {width: "9px" ,ease:"power1.inOut", onStart:()=>{ gsap.to("#ctaArrow", 0.001, {display:"block"})} }, "endframe")
            .from("#h2Subheading", 1, {yPercent: 100, alpha:0, ease:"expo.out", onStart:()=>{ gsap.to("#h2Subheading", 0.001, {alpha:1, stagger: 0.1})} }, "endframe+=20%")
            .from("#h2LegalSubheading", 0.75, {alpha:0, ease:"power2.out"}, "endframe+=50%")
            .from("#yellowLace", 1, {yPercent:-60, ease:"power2.out"}, "endframe+=70%")
            .from("#stripeLace", 1, {yPercent:-60, ease:"power2.out"}, "endframe+=100%")
            .call(Creative.addTooltip, null, "endframe>")
 
            //console.log(Creative.tl.duration());
            
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
