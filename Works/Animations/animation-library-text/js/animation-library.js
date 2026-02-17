const splittedLines = [],
      splittedWords = [],      
      splittedChars = [];

const Animation = {
  splitLines: function(copyIds) {
    copyIds.forEach((id, index) => {
      const target = document.getElementById(id); 
      if (target && target.innerHTML.length > 0) {
        const splitText = new SplitText(target, { type: "lines", linesClass:"splitted-container"});
        splittedLines[index] = splitText.lines;
      }
    });
  },
  
  splitChars: function(copyIds) {
    copyIds.forEach((ids, index) => {
      const target = document.getElementById(ids); 
      if (target && target.innerHTML.length > 0) {
        const splitText = new SplitText(target, { type: "chars" });
        splittedChars[index] = splitText.chars;
      }
    });
  },

  splitWords: function(copyIds) {
    copyIds.forEach((ids, index) => {
      const target = document.getElementById(ids); 
      if (target && target.innerHTML.length > 0) {
        const splitText = new SplitText(target, { type: "words" });
        splittedWords[index] = splitText.words;
      }
    });
  },

  // <!------------------------------------- Mask Slide Up ------------------------------------------------>
  animateMaskedSlideUp: function(reset) {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedLines[0], {
      yPercent: 100,
      clipPath: 'inset(0% 0% 100% 0%)'
    })
    .to(splittedLines[0], {
      yPercent: 0,
      stagger: 0.1,
      delay: 0.5,
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: "power2.out"
    })
  },

  // <!------------------------------------- Mask Slide Down ------------------------------------------------>
  animateMaskedSlideDown: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedLines[1], {
      yPercent: -100,
      clipPath: 'inset(100% 0% 0% 0%)'
    })
    .to(splittedLines[1], {
      yPercent: 0,
      stagger: -0.1,
      delay: 0.5,
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: "power2.out"
    })
  },

  // <!------------------------------------- Change Color per char ------------------------------------------------>
  animatechangeColorChar: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedChars[0], {
      color:"#000000"
    })
    .to(splittedChars[0], {
      duration:0.2,
      color:"#f50a23",
      stagger:{each: 0.1, amount:1},
      delay: 0.5,
      ease: "power2.out"
    })
  },

  // <!------------------------------------- Change Color per word ------------------------------------------------>
  animatechangeColorWord: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedWords[0], {
      color:"#000000"
    })
    .to(splittedWords[0], {
      duration:0.2,
      color:"#f50a23",
      stagger:0.2,
      delay: 0.5,
      ease: "power2.out"
    })
  },

  // <!------------------------------------- Hard cut reveal lines Baseline ------------------------------------------------>
  animateHardCutRevealBase: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedLines[3], {
      yPercent: 100,
      opacity:0
    })
    .to(splittedLines[3], {
      yPercent: 0,
      stagger: 0.1,
      delay: 0.5,
      ease: "power2.out",
      onStart:()=>{
        gsap.set(splittedLines[3], {opacity:1, stagger: 0.1, delay:0.05})
      }
    })
  },

  // <!------------------------------------- Hard cut reveal lines Top ------------------------------------------------>
  animateHardCutRevealTop: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedLines[4], {
      yPercent: -100,
      opacity:0
    })
    .to(splittedLines[4], {
      yPercent: 0,
      stagger: -0.1,
      delay: 0.5,
      ease: "power2.out",
      onStart:()=>{
        gsap.set(splittedLines[4], {opacity:1, stagger: -0.1, delay:0.05})
      }
    })
  },

  // <!------------------------------------- Stomp Spread ------------------------------------------------>
  animateStompSpread: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set(splittedLines[5][1], {color: "#e00", scale:1.4, opacity:0})
    .set(splittedLines[5][0], {yPercent: 100, opacity:0})
    .set(splittedLines[5][2], {yPercent: -100, opacity:0})
    .to(splittedLines[5][1], {
      duration:0.2,
      scale: 1,
      delay: 0.5,
      ease: "power2.out",
        onStart:()=>{
          gsap.set(splittedLines[5][1], {opacity:1})
          gsap.to(splittedLines[5][0], {duration:0.2,yPercent:0, opacity:1, ease: "power2.out", delay:0.1})
          gsap.to(splittedLines[5][2], {duration:0.2,yPercent:0, opacity:1, ease: "power2.out", delay:0.1})
        }
      }
    )
  },

  // <!------------------------------------- moving Stagger reveal ------------------------------------------------>
  animatemovingStaggerReveal: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set(splittedChars[1], {opacity:0})
    .set("#movingStaggerReveal", {xPercent: -40})
    .to(splittedChars[1], {
      duration:0.001,
      stagger: {each:-0.05, amount:-0.6},
      opacity:1,
      delay: 0.5,
      ease: "power2.out"}, "movingReveal")
    .to("#movingStaggerReveal", {
      duration:0.6,
      xPercent: 0,
      delay: 0.5},"movingReveal")
  },

  // <!------------------------------------- moving Stagger Hide ------------------------------------------------>
  animatemovingStaggerHide: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set(splittedChars[2], {opacity:1})
    .set("#movingStaggerHide", {xPercent: 0})
    .to(splittedChars[2], {
      duration:0.001,
      stagger: {each:-0.05, amount:-0.6},
      opacity:0,
      delay: 0.5,
      ease: "power2.out"}, "movingHide")
    .to("#movingStaggerHide", {
      duration:0.6,
      xPercent: 30,
      delay: 0.5, onComplete:()=>{
        gsap.set(splittedChars[2], {opacity:1,delay:0.5})
        gsap.set("#movingStaggerHide", {xPercent: 0,delay:0.5})
      }},"movingHide")
  },

  // <!------------------------------------- Rotate switch ------------------------------------------------>
  animateRotateSwitch: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set("#rotateSwitch1", {opacity:1, rotate: 0})
    .set("#rotateSwitch2", {opacity:0, rotate: -180})
    .to("#rotateSwitch1", { duration:1.1, rotate:180, delay: 0.5, ease: "power4.inOut"}, "rotateAnim")
    .to("#rotateSwitch2", { duration:1.1, rotate:0, ease: "power4.inOut", delay: 0.5},"rotateAnim")
    .to("#rotateSwitch1", { duration:0.001, opacity:0},"rotateAnim+=1.05")
    .to("#rotateSwitch2", { duration:0.001, opacity:1},"rotateAnim+=1.05")
  },

  // <!------------------------------------- Trail effect ------------------------------------------------>
  animateTrailEffect: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set("#trailEffect .splitted-container", {opacity:0, color:"#000"})
    .to("#trailEffect .splitted-container", {
      duration:0.001,
      opacity: 1,
      delay: 0.5,
      ease: "none",
      stagger:0.2
    }, "trailAnim")
    .to("#trailEffect .splitted-container", {
      duration:0.001,
      color:"#DBDBDB",
      delay: 0.5,
      ease: "none",
      stagger:0.2
    }, "trailAnim+=0.2")
  },

  // <!------------------------------------- Sequential Highlight ------------------------------------------------>
  animateSeqHighlight: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set("#seqHighlight .splitted-container", {color:"#000"})
    .to("#seqHighlight .splitted-container", {
      duration:0.001,
      delay: 0.5,
      color: "#e00",
      stagger: {
        each: 0.2,
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.2},
      ease: "none"
    })
  },

  // <!------------------------------------- Slide in stagger - Left ------------------------------------------------>
  animateSlideInStaggerLeft: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set("#slideInStaggerLeft .splitted-container", {xPercent: 100})
    .to("#slideInStaggerLeft .splitted-container", {
      duration:1,
      stagger: 0.2,
      xPercent:0,
      delay: 0.5,
      ease: "power2.out"})
  },

  // <!------------------------------------- Slide in stagger - Right ------------------------------------------------>
  animateSlideInStaggerRight: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl
    .set("#slideInStaggerRight .splitted-container", {xPercent: -100})
    .to("#slideInStaggerRight .splitted-container", {
      duration:1,
      stagger: 0.2,
      xPercent:0,
      delay: 0.5,
      ease: "power2.out"})
  },

  // <!------------------------------------- Hard cut reveal words - Top ------------------------------------------------>
  animateHardCutRevealWordsTop: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedWords[1], {
      yPercent: -200,
      opacity:0
    })
    .to(splittedWords[1], {
      duration:0.3,
      yPercent: 0,
      stagger: 0.1,
      delay: 0.5,
      ease: "power2.out",
      onStart:()=>{
        gsap.set(splittedWords[1], {opacity:1, stagger: 0.1, delay:0.05})
      }
    })
  },  

  // <!------------------------------------- Hard cut reveal words - Bot ------------------------------------------------>
  animateHardCutRevealWordsBot: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set(splittedWords[2], {
      yPercent: 200,
      opacity:0
    })
    .to(splittedWords[2], {
      duration:0.3,
      yPercent: 0,
      stagger: 0.06,
      delay: 0.5,
      ease: "power4.out",
      onStart:()=>{
        gsap.set(splittedWords[2], {opacity:1, stagger: 0.06, delay:0.03})
      }
    })
  },

  // <!------------------------------------- From Scale Up ------------------------------------------------>
  animateFromScaleUp: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set("#fromScaleUp", {
      scale:2,
      opacity:0
    })
    .to("#fromScaleUp", {
      duration:0.2,
      scale:1,
      delay: 0.5,
      ease: "power2.out",
      onStart:()=>{
        gsap.set("#fromScaleUp", {opacity:1})
      }
    })
  },

  // <!------------------------------------- To Scale Up ------------------------------------------------>
  animateToScaleUp: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set("#toScaleUp", {
      scale:1,
      opacity:1
    })
    .to("#toScaleUp", {
      duration:0.2,
      scale:2,
      delay: 0.5,
      ease: "power2.in",
      onComplete:()=>{
        gsap.set("#toScaleUp", {opacity:0, delay:0.03})
        gsap.set("#toScaleUp", {opacity:1, scale:1, delay:1})
      }
    })
  },

  // <!------------------------------------- From Scale Down ------------------------------------------------>
  animateFromScaleDown: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set("#fromScaleDown", {
      scale:0,
      opacity:0
    })
    .to("#fromScaleDown", {
      duration:0.2,
      scale:1,
      delay: 0.5,
      ease: "power2.out",
      onStart:()=>{
        gsap.set("#fromScaleDown", {opacity:1})
      }
    })
  },

  // <!------------------------------------- To Scale Down ------------------------------------------------>
  animateToScaleDown: function() {
    const tl = gsap.timeline({defaults: {ease:"none"}});
    tl.set("#toScaleDown", {
      scale:1,
      opacity:1
    })
    .to("#toScaleDown", {
      duration:0.2,
      scale:0,
      delay: 0.5,
      ease: "power2.in",
      onComplete:()=>{
        gsap.set("#toScaleDown", {opacity:0, delay:0.03})
        gsap.set("#toScaleDown", {opacity:1, scale:1, delay:1})
      }
    })
  },
  
};

// Init
Animation.splitLines(["maskedSlideUp", "maskedSlideDown", "changeColor", "hardCutRevealBase", "hardCutRevealTop", "stompSpread", "trailEffect", "seqHighlight", "slideInStaggerLeft", "slideInStaggerRight"]);
Animation.splitChars(["changeColorChar", "movingStaggerReveal", "movingStaggerHide"]);
Animation.splitWords(["changeColorWord", "hardCutRevealWordsTop", "hardCutRevealWordsBot"]);
Animation.animateMaskedSlideUp();
Animation.animateMaskedSlideDown();
Animation.animatechangeColorChar();
Animation.animatechangeColorWord();
Animation.animateHardCutRevealBase();
Animation.animateHardCutRevealTop();
Animation.animateStompSpread();
Animation.animatemovingStaggerReveal();
Animation.animatemovingStaggerHide();
Animation.animateRotateSwitch();
Animation.animateTrailEffect();
Animation.animateSeqHighlight();
Animation.animateSlideInStaggerLeft();
Animation.animateSlideInStaggerRight();
Animation.animateHardCutRevealWordsTop();
Animation.animateHardCutRevealWordsBot();
Animation.animateFromScaleUp();
Animation.animateToScaleUp();
Animation.animateFromScaleDown();
Animation.animateToScaleDown();

document.querySelectorAll(".card").forEach(card => {
  const index = parseInt(card.dataset.index, 10);
  const replayBtn = card.querySelector(".replay-btn");
  const toggleBtn = card.querySelector(".toggle-btn");
  const codeWrapper = card.querySelector(".code-wrapper");

  if (!replayBtn || !toggleBtn || !codeWrapper) return;

  // Replay animation
  replayBtn.addEventListener("click", () => {
    if (index === 0) Animation.animateMaskedSlideUp();
    if (index === 1) Animation.animateMaskedSlideDown();
    if (index === 2) Animation.animateHardCutRevealBase();
    if (index === 3) Animation.animateHardCutRevealTop();
    if (index === 4) Animation.animateHardCutRevealWordsTop();
    if (index === 5) Animation.animateHardCutRevealWordsBot();
    if (index === 6) Animation.animateSlideInStaggerLeft();
    if (index === 7) Animation.animateSlideInStaggerRight();
    if (index === 8) Animation.animatemovingStaggerReveal();
    if (index === 9) Animation.animatemovingStaggerHide();
    if (index === 10) Animation.animatechangeColorChar();
    if (index === 11) Animation.animatechangeColorWord();
    if (index === 12) Animation.animateStompSpread();
    if (index === 13) Animation.animateRotateSwitch();
    if (index === 14) Animation.animateTrailEffect();
    if (index === 15) Animation.animateSeqHighlight();
    if (index === 16) Animation.animateFromScaleUp();
    if (index === 17) Animation.animateToScaleUp();
    if (index === 18) Animation.animateFromScaleDown();
    if (index === 19) Animation.animateToScaleDown();
  });

  // Toggle code snippet visibility
  toggleBtn.addEventListener("click", () => {
    const isActive = codeWrapper.classList.toggle("active");
    card.classList.toggle("active", isActive);
    toggleBtn.textContent = isActive ? "Hide Code" : "Show Code";
  });

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.nextElementSibling.querySelector('code') || btn.nextElementSibling;
      const text = code.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "✅";
        setTimeout(() => (btn.textContent = "📋"), 1200);
      }).catch(err => {
        console.error("Copy failed:", err);
      });
    });
  });
  
});