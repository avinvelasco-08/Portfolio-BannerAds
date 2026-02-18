//  HOGARTH MANILA Template Version 1.0 

"use strict";
let animate = new TimelineLite()
let thorn = gsap.timeline();
let thorn2 = gsap.timeline();

// Verizon tooltip Width x Height
var TextWidth = 146;
var TextHeight = 79;

// HTML Content Elements
const Content = {
    f1Text1: "Everything<br><span class='alt-color'>you want</span>",

    f2Text1: "",
    f2Text2: "for your new<br><span class='alt-color'>iPhone XX</span>",
    f2Text3: "",

    f3Image3:"frame3Image3.png",

    f4Text1: "any",
    f4Text2: "phone",

    f5Text1: "any",
    f5Text2: "condition",

    f6Text1: "20% off",
    f6Text2: "Select cases, screen protectors<br>and chargers for your new<br>iPhone XX",
    f6Text3: "Limited-time offer. While supplies last. Terms may apply.<br>Excludes Apple cases. <span><u>Offer details</u></span>",

    CTAText: "Shop now",
    legal: "Up to $X,XXX.99 purchase w/ new or upgrade smartphone line on Unlimited Ultimate plan req’d. Less $X,XXX trade-in/promo credit applied over 36 mos; promo credit ends if eligibility req’s are no longer met; 0% APR. For upgrades, phone must be active on account for 60 days prior to trade in. <b>Smartphone trade-in must be from Apple, Google or Samsung; trade-in terms apply.</b>",
}

function initBanner(){
    hogarthMNL.InitializeElements(); // Initialize Element in Index
    hogarthMNL.VerizonToolTip("Off"); // Value: [On/Off], [height],[width]
    hogarthMNL.AutoTooltip("Top",0,0);
    hogarthMNL.LineText("#f1Text1","1A");
    hogarthMNL.LineText("#f2Text2","2A");
    hogarthMNL.LineText("#f6Text1","6A");
    hogarthMNL.CharText("#f6Text2","6B");

    setTimeout(initializeAnim, 500);
}

// RECTANGLE BG AND THORN ANIMATION ------------------------------------------------------------------------------------------------
function thornAnim (){
    thorn
    .to("#frame-rect-1",{duration: 0.85, morphSVG: "#frame-rect-2", ease: "expoScale(7,0.8,power2.out)"},"thornAnim+=0.1")
    .to("#frame-thorn-1", 0.8,{morphSVG: "#frame-thorn-2", ease:"power4.out",},"thornAnim+=0.2")
    .to("#frame-thorn-1", 1,{morphSVG: "#frame-thorn-3", ease:"none"},"-=0.3")
    .to("#frame-thorn-1", 1,{morphSVG: "#frame-thorn-4", ease:"none"},"-=0.3")
}
function thornAnim2 (){
    thorn2
    .to("#frame-thorn-1", 0.8,{morphSVG: "#frame-thorn-2", ease:"power4.out",},"thornAnim2+=0.2")
    .to("#frame-thorn-1", 1,{morphSVG: "#frame-thorn-3", ease:"none"},"-=0.3")
    .to("#frame-thorn-1", 1,{morphSVG: "#frame-thorn-4", ease:"none"},"-=0.3")
}
// RECTANGLE BG AND THORN ANIMATION ------------------------------------------------------------------------------------------------

function initializeAnim(){
    animate.set("#MainContent",{opacity: 1})
    .to("#MainContent", 0.01,{opacity:1},"-=0.0")

    //Frame 1 Intro
    .add("Frame1")
    .from(".Line1A", 0.01,{opacity:0, stagger: 0.1, ease: "linear"},"Frame1+=0.2")
    .from(".Line1A", 0.5,{y:"230%", stagger: 0.1, ease: "expo.out"},"Frame1+=0.2")
    
    .add(thornAnim, "Frame1+=0.1")

    // Logo
    .from("#logo", 0.5,{x:"-150%", ease: "power1.out"},"Frame1+=0.0")

    // CTA
    .from("#CTACover", 0.55,{width:"0%", ease: "power1.out"},"Frame1+=0.0")
    .from("#CTAArrow", 0.01,{opacity:0, ease: "power1.out"},"Frame1+=0.0")
    .from("#CTAArrow", 0.5,{x:-78, ease: "power1.out"},"Frame1+=0.0")
       
    //Frame 1 Exit
    .to(".Line1A", 0.4,{y:"500%", stagger: -0.1, ease: "expo.in"},"Frame1+=2.5")
    .to(".Line1A", 0.01,{opacity:0, stagger: -0.125, ease: "expo.in"},"Frame1+=2.8")
    .to("#frame-thorn-1", 0.4,{morphSVG: "#frame-thorn-5", ease:"power4.in",},"Frame1+=2.5") // REMOVE THORN ANIMATION ---

    //Frame 2 Intro
    .add("Frame2")
    .set("#MainContent",{backgroundColor:"#FFFFFF"},"Frame2-=0.1")
    .from(".Line2A", 0.01,{opacity:0, stagger: 0.1, ease: "linear"},"Frame2-=0.1")
    .from(".Line2A", 0.5,{y:"230%", stagger: 0.1, ease: "expo.out"},"Frame2-=0.1")
    
    //Frame 2 Exit
    .to(".Line2A", 0.4,{y:"500%", stagger: -0.1, ease: "expo.in"},"Frame2+=1.25")
    .to(".Line2A", 0.01,{opacity:0, stagger: -0.125, ease: "expo.in"},"Frame2+=1.55")

    //Frame 3 Intro
    .add("Frame3")
    .add(thornAnim2, "Frame3")
    .set("#MainContent",{backgroundColor:"#FF3C2D"},"Frame3")
    
    .to("#f3Image1",0.3,{opacity:1},"Frame3+=0.4")
    
    .from("#f3Image1",0.5,{y:30, ease: "power2.out"},"Frame3")
    .from("#f3Image3",0.5,{y:"150%",ease: "power2.out"},"Frame3")
    .from("#f3Image3",3.5,{scale:"0.95", transformOrigin: "50% 100%", ease: "power1.inOut"},"Frame3")
    
    //Frame 3 Exit
    .to("#f3Image1", 0.5,{y:-100, stagger: 0.08, ease: "power4.in"},"Frame3+=2.5")
    .to("#f3Image3", 0.5,{y:200, ease: "power4.in"},"Frame3+=2.5")
    .to("#frame-thorn-1", 0.4,{morphSVG: "#frame-thorn-5", ease:"power4.in",},"Frame3+=2.5") // REMOVE THORN ANIMATION ---

    //Frame 6 Intro
    .add("Frame6", "-=0.5")
    .set("#MainContent",{backgroundColor:"#FFFFFF"},"Frame6")
    .from(".Line6A", 0.01,{opacity:0, stagger: 0.1, ease: "linear"},"Frame6")
    .from(".Line6A", 0.5,{y:"180%", stagger: 0.1, ease: "expo.out"},"Frame6-=0.05")

    .from(".Char6B", 0.01,{opacity:0, stagger: 0.02, ease: "power4.inOut"},"Frame6+=0.45")
    .from("#f6Text2", 0.5,{x: 3, ease: "power1.out"},"Frame6+=0.44")
    .from("#f6Text3", 0.5,{autoAlpha: 0, ease: "power2.out", onComplete: function(){
        hogarthMNL.VerizonToolTip("On");
    }},"Frame6+=1.6")
    
    console.log("Animation Time: "+animate.duration()+"sec");
}
