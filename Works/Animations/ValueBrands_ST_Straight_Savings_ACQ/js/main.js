"use strict";

var animate = new TimelineLite({onComplete: function(){ }}),
    strokeAnim = new TimelineLite(),
    isOpen = false, //constant do not change
    scrlData = [], //constant do not change
    $ = function(item) { //constant do not change
      return document.querySelector(item);
    },
    splitText = new TimelineLite({onComplete: function(){ }});
    gsap.ticker.fps(60); // 30fps Animation Standard.
    

function getByID(elemID){
  return document.getElementById(elemID);
}

function splitTextWord(elem,frame) { 
    splitText = new SplitText(elem, {type:"lines", linesClass:"Lines"+ frame});
    splitText = new SplitText(elem, {type:"lines", linesClass:"Cover"+ frame + " Line++"});
}
function splitTextChar(elem,frame) { 
    splitText = new SplitText(elem, {type:"lines", linesClass:"Cover"+ frame, tag:"div"});
    Char1 = new SplitText(elem, {type:"chars", charsClass:"Chars"+ frame, tag:"span"});
}
var splitText, Char1;

// Dynamic Elements
var ContentValues = { 
    // Frame 1
    F1HeadlineText: "Bring your phone<br>to save now &<br><green>get rewarded later.</green>",
    // Frame 2
    F2HeadlineText: "Save on a<br>single line for<br><span style='color:#CCFF33'>only $25/mo.</span>",
    F2SubHeadlineText: "Plus get a $200 phone<br>credit after 12 mos.",
    // Frame 3
    F3HeadlineText: "<span style='color:#CCFF33'>Straight</span>SAVINGS!",
    F3SubHeadlineText: "<span class='sup1'>$</span>25<span class='sup2'>/mo.</span><span class='sub1'>Single Line</span>",
    // CTA
    ImageCTAin: "cta_in.png",
    ImageCTAout: "cta_out.png",
    // LEGAL
    LegalButtonText: "See details.",    
    Legal: "StraightSAVINGS! plan enrollment requires a compatible, unlocked device that has not been activated on Straight Talk for prior 12 mos.<br>New line of service required. Bonus device credit requires active service on StraightSAVINGS! plan for 12 mos. and a Straight Talk Rewards membership to redeem device credit. You must remain on an eligible device for the first 12 mos of service to be eligible for StraightSAVINGS! plan. Cannot be combined with other offers.<br>Taxes and fees apply. © 2024 Verizon",
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
    splitTextChar("#F1HeadlineText","1A");
    splitTextChar("#F2HeadlineText","2A");
    splitTextChar("#F3HeadlineText","3A");

    animate.set("#MainContent",{opacity: 1, onComplete: function(){}},"+=0.0")
    .set(".hideStroke",{opacity: 0})
    .set("#cta_white, #Legal, #closeBtn", { autoAlpha: 0})
    .add(AnimateBackground, "-=0.57")
    //frame 1
    .addLabel("Frame1")
    
    .from("#STlogo, #CTA",0.3,{opacity:0, scale:1.4, ease:"power1.out", onComplete:function(){
        MainContent.addEventListener("mouseover", function(){
            gsap.to("#cta_white", { autoAlpha: 1, duration: 0.3 });
        });
        MainContent.addEventListener("mouseout", function(){
            gsap.to("#cta_white", { autoAlpha: 0, duration: 0.3 });
        });
    }},"Frame1")
    .from("#ChatboxAnimation", 0.5,{scale:1.3, ease:"power1.out"},"Frame1")
    .from(".Chars1A", 0.01,{opacity:0, stagger:0.05, ease:"none"}, "Frame1+=0.7")
    
    //exit frame 1
    .to(".Chars1A",0.5,{opacity:0, ease:"power1.out"},"Frame1+=4")

    //frame 2
    .addLabel("Frame2")
    .from(".Chars2A", 0.01,{opacity:0, stagger:0.05, ease:"none"}, "Frame2")
    .from("#F2SubHeadlineBox", 0.8, {opacity:0, ease:"power1.out"}, "Frame2+=1.8")
    
    //exit frame 2
    .to(".Chars2A, #F2SubHeadlineText",0.5,{opacity:0, ease:"power1.out"},"Frame2+=4")

    //frame 3
    .addLabel("Frame3")
    .from("#Walmart",0.5,{opacity:0, ease:"power1.out"},"Frame3")
    .from("#Eyebrow",0.5,{opacity:0, ease:"power1.out"},"Frame3")
    .from(".Chars3A", 0.5,{opacity:0, ease:"power1.out"}, "Frame3")
    .from("#F3SubHeadlineBox", 0.5, {opacity:0, ease:"power1.out"}, "Frame3")
    .from("#LegalButtonBox",0.5,{opacity:0, ease:"power1.out",onComplete:function(){
        gsap.set('#offerHotspot', {display:"block"})
        offerHotspot.addEventListener("click", function(){
            gsap.to("#Legal, #closeBtn", { autoAlpha: 1, duration: 0.3 });
            gsap.set("#offerHotspot", { autoAlpha: 0})
        });
        closeBtn.addEventListener("click", function(){
            gsap.to("#Legal, #closeBtn", { autoAlpha: 0, duration: 0.3 });
            gsap.to("#offerHotspot", { autoAlpha: 1, duration: 0.3 })
        });
    }},"Frame3")
    
    console.log("Animation Time: "+animate.duration()+"sec");
}

function AnimateBackground(){
    strokeAnim
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke6", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke6", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }})
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke7", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke7", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke8", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke8", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke9", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke9", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke10", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke10", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke11", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke11", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke12", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke12", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke13", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke13", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke14", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke14", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke15", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke15", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke16", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke16", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke17", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke17", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke18", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke18", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke19", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke19", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke20", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke20", {duration: 1.9, morphSVG: "#strokeGuide1", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none",  onComplete:function(){
        gsap.to("#mainStroke21", {duration: 0.001, opacity:1, ease:"none"})
        gsap.to("#shape1", {duration: 0.001, morphSVG: "#shape1", ease:"none", onComplete:function(){
            gsap.to("#mainStroke21", {duration: 1, morphSVG: "#strokeGuide2", ease:"none"})
        }})    
    }}, "+=0.3")
    .to("#shape1", {duration: 0.6, morphSVG: "#shape2", ease:"none"}, "+=0.3")
}