"use strict";

var animate = new TimelineLite({onComplete: function(){ }}),
    strokeAnim = new TimelineLite(),
    isOpen = false, //constant do not change
    scrlData = [], //constant do not change
    $ = function(item) { //constant do not change
      return document.querySelector(item);
    },
    splitText = new TimelineLite({onComplete: function(){ }});
    gsap.ticker.fps(30); // 30fps Animation Standard.
    

function getByID(elemID){
  return document.getElementById(elemID);
}

function splitTextDiffText(elem,frame) { 
    splitText = new SplitText(elem, {type:"lines", linesClass:"Lines"+ frame + " Copy"+ frame + "++"});
    splitText = new SplitText(elem, {type:"lines", linesClass:"Cover"+ frame + " CoverCopy"+ frame + "++"});
}
function splitTextHidden(elem,frame) { 
    splitText = new SplitText(elem, {type:"lines", linesClass:"Lines"+ frame});
    splitText = new SplitText(elem, {type:"lines", linesClass:"Cover"+ frame + " CoverCopy"+ frame + "++"});
}

// Dynamic Elements
var ContentValues = { 
    ExitURL: "https://www.verizon.com",
}

function initBanner(){
    hogarth.CSSMobileandBrowser();
    hogarth.initializeElements();
    setTimeout(initializeAnim, 500);
}

var ease1 = "Power1.easeOut";
var ease2 = "Power2.easeIn";
var ease3 = "Power2.easeOut";
var ease4 = "Power3.easeIn";
var ease5 = "Power3.easeOut";
var ease6 = "Power4.easeIn";
var ease7 = "Power4.easeOut";
var ease8 = "Expo.easeOut";
var ease9 = "Strong.easeOut";
var ease10 = "Linear.easeNone";
var ease11 = "Sine.easeIn";
var ease12 = "Sine.easeOut";
var ease13 = "Expo.easeInOut";
var ease14 = "Power4.easeIn";



function initializeAnim(){

    animate.set("#MainContent",{opacity: 1, onComplete: function(){}},"+=0.0")
    //.set(".hideStroke",{opacity: 0})
    .set('#offerHotspot', {display:"none"})
    .set("#F3HeadlineBox1, #F3HeadlineBox2, #F3HeadlineBox3, #F1HeadlineBox1, #F1HeadlineBox2, #F1HeadlineBox3, #cta_white, #Disclaimer, #closeBtn, #walmart, #SeeDetails", { autoAlpha: 0})
    .set("#F1_Ribbon1",{opacity: 1, clipPath: "polygon(32% 0%, 100% 0%, 86% 0%, 48% 0%)"})
    .set("#F1_Ribbon2",{opacity: 1, clipPath: "polygon(0% 0%, 100% 0%, 38% 0%, 100% 77%)"})
    .set("#F1_Ribbon3",{opacity: 1, clipPath: "polygon(49% 100%, 100% 100%, 82% 100%, 0% 100%, 23% 100%)"})
    .set("#F1_Ribbon4",{opacity: 1, clipPath: "polygon(41% 0%, 100% 0%, 71% 0%, 17% 0%, 0% 0%)"})
    
    .set("#F2_Ribbon1",{opacity: 1, clipPath: "polygon(0% 30%, 0% 0%, 0% 74%, 0% 61%)"})
    .set("#F2_Ribbon2",{opacity: 1, clipPath: "polygon(0% 0%, 100% 0%, 68% 0%, 24% 0%)"})
    .set("#F2_Ribbon3",{opacity: 1, clipPath: "polygon(29% 100%, 79% 100%, 100% 100%, 0% 100%)"})
    
    .set("#F3_Ribbon1",{opacity: 1, clipPath: "polygon(3% 0%, 41% 0%, 25% 0%, 13% 0%)"})
    .set("#F3_Ribbon2",{opacity: 1, clipPath: "polygon(0% 0%, 7% 0%, 27% 33%, 19% 41%)"})
    .set("#F3_Ribbon3",{opacity: 1, clipPath: "polygon(52% 0%, 80% 0%, 95% 0%, 38% 0%)"})
    .set("#F3_Ribbon4",{opacity: 1, clipPath: "polygon(48% 0%, 60% 0%, 61% 100%, 48% 100%)"})
 
    
    //frame 1
    .addLabel("Frame1")
    .to("#F1_Ribbon1", 0.8, {clipPath: "polygon(32% 0%, 100% 0%, 68% 26%, 78% 53%)"},"Frame1+=0.5")
    .to("#F1_Ribbon2", 0.8, {clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 77%)"},"Frame1+=0.8")
    
    .to("#F1_Ribbon3", 0.6, {clipPath: "polygon(70% 85%, 100% 100%, 82% 100%, 0% 100%, 40% 61%)"},"Frame1+=1.55")
    .to("#F1_Ribbon4", 0.6, {clipPath: "polygon(43% 100%, 100% 100%, 73% 0%, 23% 0%, 0% 0%)"},"Frame1+=1.65")
    
    //Exit
    .to("#F1_Ribbon1", 0.6, {clipPath: "polygon(100% 74%, 100% 0%, 100% 30%, 100% 54%)"},"Frame1+=2.5")
    .to("#F1_Ribbon2", 0.6, {clipPath: "polygon(100% 3%, 100% 0%, 100% 0%, 100% 77%)"},"Frame1+=2.53")
    .to("#F1_Ribbon3", 0.6, {clipPath: "polygon(70% 85%, 100% 100%, 84% 99%, 30% 58%, 40% 61%)"},"Frame1+=2.8")
    .to("#F1_Ribbon4", 0.6, {clipPath: "polygon(43% 100%, 100% 100%, 78% 100%, 18% 100%, 1% 100%)"},"Frame1+=2.9")
    
    .from("#STlogo",0.1,{opacity:0, ease:ease2},"Frame1")
    .from("#CTA",0.5,{opacity:0, scale:1.5, transformOrigin:"1000% 0%", ease:ease4},"Frame1-=0.5")

    .to("#F1HeadlineBox1",0.5,{autoAlpha: 1, ease:ease4},"Frame1+=.2")
    .to("#F1HeadlineBox2",0.5,{autoAlpha: 1, ease:ease4},"Frame1+=.8")
    .to("#F1HeadlineBox3",0.5,{autoAlpha: 1, ease:ease4},"Frame1+=1.2")
    

    //exit frame 1
    .to("#STlogo",0.5,{opacity:0, ease:ease4},"Frame1+=3.8")
    .to("#Frame1",0.5,{opacity:0, ease:ease4},"Frame1+=3.8")
    
    .addLabel("Frame2")
    .to("#F2_Ribbon1", 0.8, {clipPath: "polygon(0% 30%, 37% 0%, 61% 15%, 0% 61%)"},"Frame2+=0.35")
    .to("#F2_Ribbon2", 0.8, {clipPath: "polygon(0% 0%, 100% 0%, 65% 92%, 29% 96%)"},"Frame2+=0.85")
    .to("#F2_Ribbon3", 0.6, {clipPath: "polygon(100% 8%, 100% 79%, 100% 100%, 0% 100%)"},"Frame2+=1.1")
    
    //Exit
    .to("#F2_Ribbon1", 0.6, {clipPath: "polygon(35% 0%, 35% 0%, 64% 11%, 63% 11%)"},"Frame2+=1.8")
    .to("#F2_Ribbon2", 0.6, {clipPath: "polygon(17% 100%, 67% 100%, 59% 100%, 26% 100%)"},"Frame2+=2.1")
    .to("#F2_Ribbon3", 0.6, {clipPath: "polygon(100% 13%, 100% 0%, 100% 99%, 100% 78%)"},"Frame2+=2.4")

    //frame 2
    .from("#iPhone",0.8,{opacity:0, ease:ease4},"Frame2-=0.5")

    //exit frame 2
    .to("#iPhone",0.5,{opacity:0, ease:ease4},"Frame2+=2.5")
    
    .set("#CTA",{opacity: 1},"Frame2+=2.5")
    .set("#offerHotspot",{display:"block"},"Frame2+=2.5")

    //frame 3
    .addLabel("Frame3", "-=0.15")
    .set("#CTA",{opacity: 1})
    .from("#CTA",0.5,{ease:ease4,onComplete:function(){
        gsap.set('#offerHotspot', {display:"block"})
        offerHotspot.addEventListener("click", function(){
            gsap.to("#Disclaimer, #closeBtn", { autoAlpha: 1, duration: 0.3 });
            gsap.set("#offerHotspot", { autoAlpha: 0})
        });
        closeBtn.addEventListener("click", function(){
            gsap.to("#Disclaimer, #closeBtn", { autoAlpha: 0, duration: 0.3 });
            gsap.to("#offerHotspot", { autoAlpha: 1, duration: 0.3 })
        });
    }},"Frame3")
    .to("#F3_Ribbon1", 0.8, {clipPath: "polygon(3% 0%, 41% 0%, 22% 10%, 22% 28%)"},"Frame3+=0.7")
    .to("#F3_Ribbon2", 0.8, {clipPath: "polygon(0% 0%, 37% 0%, 88% 0%, 19% 41%)"},"Frame3+=1.2")
    .to("#F3_Ribbon3", 0.6, {clipPath: "polygon(56% 55%, 67% 34%, 92% 0%, 45% 0%)"},"Frame3+=1.75")
    .to("#F3_Ribbon4", 0.5, {clipPath: "polygon(48% 0%, 100% 0%, 100% 53%, 48% 100%)"},"Frame3+=2.3")
    
    
    .to("#STlogo, #walmart, #SeeDetails ",0.1,{autoAlpha:1, ease:ease2},"Frame3")

    .to("#F3HeadlineBox1",0.5,{autoAlpha: 1, ease:ease4},"Frame3")
    .to("#F3HeadlineBox2",0.5,{autoAlpha: 1, ease:ease4},"Frame3+=.7")
    .to("#F3HeadlineBox3",0.5,{autoAlpha: 1, ease:ease4},"Frame3+=1.4")

    .from("#F3SubHeadlineBox",0.5,{opacity:0, ease:ease4,},"Frame3+=2.4")
    console.log("Animation Time: "+animate.duration()+"sec");
}

MainContent.addEventListener("mouseover", function(){
    gsap.to("#cta_white", { autoAlpha: 1, duration: 0.3 });
});
MainContent.addEventListener("mouseout", function(){
    gsap.to("#cta_white", { autoAlpha: 0, duration: 0.3 });
});



