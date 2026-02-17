
//hoxton.timeline = Creative.tl;
gsap.defaults({overwrite: "auto", duration:0, ease:"none"});

// as we are using className to target elements in certain sizes in the TL, we want to suppress warnings:
gsap.config({nullTargetWarn:false});


// content
var container       = getById("main");

// Tooltip opacity
var isVisible = false;  

// Tooltip Hotspot
var hotspotCreated = false;

// split array
var splittedLines = [],
    splittedChars = [];

// frame
var _totalFrames    = 5;
var _currentFrame   = 0;
var _previousFrame  = 0;
var _arrFrameObjs   = [];

var bannerData = {
    h1Heading: "$300",
    h4Heading: "Switch",

    f1Heading1: "Get a $300",
    f1subHeading1: "Visa® Prepaid card",
    f1Legal1: "With select Fios plans and a 2-year term.<br>Terms apply. Limited-time offer.",
    
    f2Heading1: "when",
    f3Heading1: "you",
    f4Heading1: "to",
    f5Heading1: "Fios Business",
    f5Heading2: "Internet",
    f6Heading1: "Switch to Fios",
    f6Heading2: "Get a $300",
    f6Heading3: "Visa® card on us",
    f6Legal1: "With select Fios plans and a 2-year term. Terms apply. Limited-time offer.",
    
    disclaimer: "<b>iPhone:</b> $829.99 (128 GB only) purchase w/new smartphone line on Unlimited Ultimate plan (min. $90/mo w/Auto Pay (+taxes/fees) for 36 mos) req'd first. Less $830 trade-in/promo credit applied over 36 mos.; promo credit ends if eligibility req’s are no longer met; 0% APR. <b>Smartphone trade-in must be from Apple, Google or Samsung; trade-in terms apply. iPad:</b> $499.99 (64 GB only) device payment purchase w/new line on service plan (min. $20/mo w/Auto Pay (+taxes/fees) for 36 mos) req'd. Less $499.99 promo credit applied over 36 mos.; 0% APR. All promo credits for iPhone/iPad offers end if eligibility req's per device are no longer met. <b>Apple One:</b> Perk requires new smartphone line subscribed to Unlimited Ultimate plan; perk must be added to eligible plan and registered w/Apple w/in 90 days of activation. $10/mo perk credit ends after 6 mos or if perk is canceled or line is moved to an ineligible plan during the promo period. After 6 mos, perk bills at $10/mo unless perk is canceled or unregistered. One offer per eligible Verizon line. Add'l terms apply. Limited time offer.",
    tooltipEdgeGap: "15"
};

// Function for RepeatFrame[Element ID, # of Lines, FontSize, LineHeight, Data Value]

function RepeatFrame(elementID,limit,fontvalue,lineheight,data){
    var divElement = document.createElement("div");
    divElement.setAttribute("id", "box");
    divElement.classList.add("relFrame");
    
    for(var x = 0; x < limit; x++){
        var contentElement = document.createElement("div");
        contentElement.setAttribute("id", "text"+x);
        contentElement.classList.add("repeat");
        
        // if(parseInt((limit/2)) != x){
        //     contentElement.classList.add("textStroke");
        // }
        
        document.querySelector("#"+elementID).appendChild(divElement);
        document.querySelector("#"+elementID+" #box").appendChild(contentElement);
        
        document.querySelector("#"+elementID+" .relFrame").style.lineHeight = lineheight+"px";
        document.querySelector("#"+elementID+" #text"+x).style.fontSize = fontvalue+"px";
        document.querySelector("#"+elementID+" #text"+x).innerHTML = data;
    }
}

// Create and provide timeline to Hoxton
var Creative = {
    
    tl: gsap.timeline( { defaults: { duration:0 , ease:"none" } } ),

    onBannerStart: function() 
    {
        console.log("Creative.onBannerStart()");
        if(hotspotCreated){
            gsap.set("#hotspot", { autoAlpha: 0 }, "reset")
        }
        gsap.ticker.add(() => {
            parent.postMessage({ type: 'timelineProgress', progress: Creative.tl.progress() }, "*");
        });
 
        window.addEventListener("message", (event) => {
            if (event.data.type === 'scrub') {
                Creative.tl.progress(event.data.progress);
            }
        });
    },

    onBannerComplete: function() 
    {
        console.log("Creative.onBannerComplete()");
    },

    startAd: function() 
    {  
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

    setUpTimeline: function()
    {
        Creative.tl.eventCallback("onStart", Creative.onBannerStart);
        Creative.tl.eventCallback("onRepeat", Creative.onBannerRepeat);
        Creative.tl.eventCallback("onComplete", Creative.onBannerComplete);
    },

    displayBanner: function()
    {
        gsap.to(container,{visibility:"visible"});
    },

    resetFrameObjs: function() 
    {
        for(var i = 0; i < _arrFrameObjs.length; i ++)
        {
            _arrFrameObjs[i].ifShowing = false;
            gsap.set([_arrFrameObjs[i].eleRef], {autoAlpha:0});
        }
    },

    showContainer: function( contId )
    {
        const targetCont = getById(contId)
        gsap.set(targetCont, { display: "flex" });
    },

    hideContainer: function( contId )
    {
        const targetCont = getById(contId)
        gsap.set(targetCont, { display: "none" });
    },

    setLogoProps: function ( version )
    {
        switch(version)
        {
            case "default":
                gsap.set("#logoMask", { display:"flex", xPercent:-180, autoAlpha:1 });
                break;

            case "vlogo":
                gsap.set("#vMask", { display:"flex", clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 1 });
                break;
        }
    },

    setCtaProps: function ( version )
    {
        switch(version)
        {
            case "textCta":
                    gsap.set("#ctaArrow", {autoAlpha: 0}, "reset")
                    gsap.set("#ctaMask", {width: "8%"}, "reset")
                break;

            case "arrowCta":
                gsap.set("#vMask", { display:"flex", clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 1 });
                break;
        }
    },

    init: function() {
        // ODD Numbers Only to have Center Copy 
        // RepeatFrame[Element ID, # of Lines, FontSize, LineHeight, DataValue]
        RepeatFrame("repeatFrame", 3, 117.18, 111, bannerData.h1Heading);
        RepeatFrame("switchFrame", 3, 93.41, 80, bannerData.h4Heading);

        
        Creative.splitLines(["h1Heading", "h2Heading", "h3Heading"]);
        Creative.splitChars(["h3Subheading"]);
        
        Creative.tl.addLabel("reset", 0)
            // reset elements to initial states
            // .call(Creative.hideContainer, ["vMask"], "reset")
            .call(Creative.hideContainer, ["legalFrame"], "reset")
            .call(Creative.hideContainer, ["legalContainer"], "reset")
            .call(Creative.setLogoProps, ["default"], "reset")
            .to("#container", {autoAlpha:1}, "reset")
            .set("#heading2, #heading3, #heading5",{opacity:0})
            .set("#f4Heading1, #switchFrame",{autoAlpha:0})
            
            //-------- Frame1 in -------------------------------
            .addLabel("frame1")
            .from("#repeatFrame", 0.9,{ y:-180, ease: "expo.out"},"frame1")
        
            .to("#repeatFrame .repeat",0.01,{color:"#F3EDE0", stagger: 0.15},"frame1+=0.3")
            .to("#repeatFrame .repeat",0.01,{color:"#F3EDE000", stagger: 0.15},"frame1+=0.45")
        
            //-------- Frame1 out -------------------------------
            .set("#repeatFrame",{ opacity:0},"frame1+=0.8")

            //-------- Frame2 in -------------------------------
            .addLabel("frame2")
            .from("#LogoMask1", 0.5,{x:"150%", ease: "power4.out"},"frame2+=0.0")
            .from("#LogoMask2", 0.3,{height:"0"},"frame2+=0.5")
            .from(["#f1Heading1, #f1subHeading1"], 0.3, {yPercent: 100, autoAlpha: 0, stagger: 0.1, ease:"power2.out"}, "frame2+=0")
            .from("#f1Legal1", 0.4, {autoAlpha: 0, ease:"power2.out"}, "frame2+=0.3")

            //-------- Frame2 out -------------------------------
            .to("#heading1",0.5,{scale:0.5,transformOrigin:"50% 50%", ease:"expo.in"}, "frame2+=1.7")
            .to("#LogoMask1, #LogoMask2", 0.5,{x:-100, ease: "expo.in"},"frame2+=1.6")

            //-------- Frame3 in -------------------------------
            .addLabel("frame3","-=0.1")
            .set("#main",{backgroundColor:"#F3EDE0"}, "frame3")
            .set("#heading1",{opacity:0}, "frame3")
            .set("#heading2",{opacity:1}, "frame3")
            .from("#f2Heading1",0.5,{scale:4,transformOrigin:"50% 50%", ease:"expo.out"}, "frame3-=0.1")
            .from("#VBox", 0.8,{height:"0px", transformOrigin:"50% top", ease: "expo.in"},"frame3-=0.5")
            
            //-------- Frame3 out -------------------------------
            .set("#heading2",{opacity:0}, "frame3+=0.7")
            .set("#heading3",{opacity:1}, "frame3+=0.7")

            //-------- Frame4 in -------------------------------
            .addLabel("frame4")
            .to("#f3Heading1",1,{y:200, ease:"power2.in"}, "frame4")
            .from("#switchFrame", 1.6,{ y:-170, ease: "expo.out", onStart:()=>{ gsap.set("#switchFrame", {autoAlpha:1})}},"frame4+=0.7")
            .set("#heading3",{opacity:0}, "frame4+=0.7")
            .set("#VBox",{opacity:0}, "frame4+=0.7")
        
            .to("#switchFrame .repeat",0.01,{color:"#F50A23", textStroke:0, stagger: 0.15},"frame4+=1.1")
            .to("#switchFrame .repeat",0.01,{color:"#F3EDE000", textStroke: '0.6px #000000', stagger: 0.15},"frame4+=1.25")
            
            .to("#switchFrame", 0.001,{opacity:0, stagger: -0.2, ease: "power1.out"},"frame4+=1.6")
            .set("#VBox",{opacity:1}, "frame4+=1.7")
            //-------- Frame5 in -------------------------------
            .addLabel("frame5", "-=0.6")
            .from("#f4Heading1", 0.5, {y: 50, ease:"expo.out", onStart:()=>{ gsap.set("#f4Heading1", {autoAlpha:1})} }, "frame5")

            //-------- Frame5 out -------------------------------
            .to("#f4Heading1", 0.5, {x: 50, ease:"expo.in"}, "frame5+=0.4")

            //-------- Frame6 in -------------------------------
            .addLabel("frame6", "+=0.3")
            .set("#main",{backgroundColor:"#F50A23"}, "frame6-=0.3")
            .set("#heading4, #VBox",{opacity:0}, "frame6-=0.3")
            .set("#heading5",{opacity:1}, "frame6-=0.3")
            .from("#f5Heading1", 0.9, {x: -200, ease:"expo.out"}, "frame6-=0.3")
            .from("#f5Heading2", 0.9, {x: 200, ease:"expo.out"}, "frame6-=0.3")
            .from("#heading5",1.5,{scale:1.05,transformOrigin:"50% 50%", ease:"expo.in"}, "frame6-=0.3")
            
            //-------- Frame6 out -------------------------------
            .to("#heading5",1.1,{scale:0.95,transformOrigin:"50% 50%", ease:"none", onComplete:()=>{ gsap.to("#heading5", 0.5, {scale:0.3, ease:"expo.in", delay:-0.1})} }, "frame6+=0.1")
            
            //-------- Frame7 in -------------------------------
            .addLabel("frame7", "+=0.7")
            .set("#heading5",{opacity:0}, "frame7-=0.3")
            .set("#main",{backgroundColor:"#F3EDE0"}, "frame7-=0.3")
            .set("#logo",{fill: '#F50A23'}, "frame7-=0.3")
            .set("#LogoMask1, #LogoMask2",{x:"150%", ease: "power4.out"}, "frame7-=0.3")
            .set("#LogoMask2",{height:"0"}, "frame7-=0.3")

            .set("#BottomLogo",{bottom:"10px"}, "frame7-=0.3")

            .from(["#f6Heading1, #f6Heading2, #f6Heading3"], 0.3, {yPercent: 100, autoAlpha: 0, stagger: 0.1, ease:"power2.out"}, "frame7-=0.3")
            .from("#f6Legal1", 0.4, {autoAlpha: 0, ease:"power2.out"}, "frame7+=0.2")
            .to("#LogoMask1, #LogoMask2", 0.4,{x:0, ease: "power4.out"},"frame7-=0.3")
            .to("#LogoMask2, #LogoMask2", 0.3,{height:"14px"},"frame7+=0.25")
            .from("#CTAArrow", 0.3,{x:"-150%", ease: "power4.out"},"frame7+=0.2")
            console.log( Creative.tl.duration() )
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

window.onload = checkFontsLoaded(['VerizonNHGeDSRegular', 'VerizonNHGeDSBold'],Creative.startAd);
