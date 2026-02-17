var _ = function(a) {return new q(a);},
    q = function (a) {var b = (typeof a === 'string') ? document.querySelector(a) : a;this.c = b;return this;};

function domLoaded() {
    preloadImages(imageArr,animate);
}

//Sample in array images below
//Replace images on the images folder
imageArr = ['img/f3-t7.png',
            'img/f3-t5.png',
            'img/f3-t6.png',
            'img/bg1-model.png',
            'img/bg1.jpg',
            'img/bg2-model.png',
            'img/bg2.jpg',
            'img/cta-text1.png',
            'img/dust1.png',
            'img/dust2.png',
            'img/dust3.png',
            'img/dust4.png',
            'img/f1-prod1_refect.png',
            'img/f1-prod1_shadow.png',
            'img/f1-prod1.png',
            'img/f1-t1.png',
            'img/f1-t2.png',
            'img/f1-t3.png',
            'img/f2-t1.png',
            'img/f2-t2.png',
            'img/f3-t1.png',
            'img/f3-t2.png',
            'img/f3-t3.png',
            'img/f3-t4.png'
            ];
            
function animate() {
    var tl = gsap.timeline({delay: 0.2});

    /**
     * Inconsistent border color fix
     */
    if (navigator.platform.toLowerCase().indexOf("win") > -1) {
        var MSIE = window.navigator.userAgent.indexOf("MSIE ");
        var Edge = window.navigator.userAgent.indexOf("Edge/");
        var Trdt = window.navigator.userAgent.indexOf("Trident/");
        if (MSIE > 0 || Edge > 0 || Trdt > 0) {
            if (window.devicePixelRatio != 1 && window.devicePixelRatio != 2) {
                document.getElementById("border").style.border = "0.5px solid #000000";
                document.getElementById("ieFIX").style.display = "block";
            }
        }
    }

    //--------------- SET -----------------
    gsap.set('#main_content', {display: "block", opacity: 1});
    gsap.set('.imgfix', { rotation: 0.09, force3D: true });
    gsap.set('#cvs', {rotation:180});
    gsap.set(['.f1-prod1', '.f1-prod1_refect'], {transformOrigin: '50% 70%'});
    gsap.set('.productHolder', {transformOrigin: 'center 55%'});
    gsap.set(['.boxL','.boxR'], {scaleY:0});
    gsap.set(['.boxT','.boxB'], {scaleX:0});
    gsap.set('.productHolder', {scale:0.415, x:89, y:318});
    gsap.set('.model2holder', {scale:0.7, skewY: 10, x:-450, y:-425, transformOrigin: 'top left'})
    addEvent();
    // ~~~~~ START ANIMATION ~~~~~ //
    tl
    //==========================
        .add('Scene1')
        .add(purpleBoxAnim, 'Scene1+=0.4')
        .add(dust, 'Scene1')
            // Packshot in
        .from('.productHolder', {duration:1.2, x: 300, ease: 'power4.inOut'}, 'Scene1')
        .to(['.f1-prod1', '.f1-prod1_refect'], {duration:0.6, scale:0.94, ease:'power1.inOut', yoyo:true, repeat:1}, 'Scene1')
            // copies in
        .from('.f1stg', {duration:1, x:-30, opacity:0, ease:'expo.out', stagger:0.17}, 'Scene1+=1')
        .from('.f1-t3', {duration:1, opacity:0, ease:'expo.out'}, 'Scene1+=1')

    //==========================
        .add('Scene2')
        .to('.bg1-model', {duration:1.2, x:-80, y:-20, ease:'power3.inOut'}, 'Scene2')
        .from('.bg2-model', {duration:1.7, x:-20, ease:'power4.inOut'}, 'Scene2+=0.35')
        .from('.bg2', {duration:2.3, x:-40, ease:'power4.inOut'}, 'Scene2+=0.1')
        .to('.model2holder',   {duration:1.7, scale:1, skewY: 0, x:0, y:0, ease:'power3.inOut'}, 'Scene2')
        .to('.model1holder',   {duration:1.7, scale:3, x:1050, y:570,transformOrigin:'left top', ease:'power3.inOut'}, 'Scene2')
        .to('.bg1', {duration:1.5, skewY: -6,transformOrigin:'left top', ease:'power3.inOut'}, 'Scene2')
            // copies in
        .from('.f2stg', {duration:1, x:-30, opacity:0, ease:'expo.out', stagger:0.17}, 'Scene2+=1.7')

    //==========================
        .add('Scene3','Scene2+=4')
        .to('.f1-t3', {duration:0.3, opacity:0}, 'Scene3')
            // bg in
        .from('.bg3', {duration:0.4, opacity:0, ease:'none'}, 'Scene3')
        .add(unloadCanvas, 'Scene3+=0.4')
            // product move
        .to('.productHolder', {duration: 0.7, scale:1, x:-22, y:36, ease:'power2.inOut'}, 'Scene3+=0.5')    
        .to('.f1-prod1_shadow', {duration:1, opacity:1, scale:1.25, y:-12, ease:'none'}, 'Scene3+=1')

        .from('.f3-t7', {duration:1, opacity:0, ease:'expo.out'}, 'Scene3+=1.2')
        .from('.f3-t1', {duration:1.2, x:30, opacity:0, ease:'expo.out'}, 'Scene3+=1.3')
        .from('.f3stg', {duration:1.2, y:10, opacity:0, ease:'expo.out', stagger:0.17}, 'Scene3+=1.8')
        .from(['#cta','.f3-t5'], {duration: 0.5, opacity:0, ease:'power2.out'}, 'Scene3+=3')
        .from('.f3-t6', {duration:1, opacity:0, ease:'expo.out'}, 'Scene3+=3.6')
        .add(addHover)
        // .timeScale(0.2)
}

function purpleBoxAnim() {
    var box = gsap.timeline();
    box
    .add('draw')
    .fromTo('.boxB', {scaleX:0},{duration:0.17, scaleX:1, transformOrigin:"right center",  ease:'none'}, 'draw')
    .fromTo('.boxL', {scaleY:0},{duration:0.17, scaleY:1, transformOrigin:"center bottom", ease:'none'}, 'draw+=0.17')
    .fromTo('.boxT', {scaleX:0},{duration:0.17, scaleX:1, transformOrigin:"left center",   ease:'none'}, 'draw+=0.34')
    .fromTo('.boxR', {scaleY:0},{duration:0.17, scaleY:1, transformOrigin:"top center",    ease:'none'}, 'draw+=0.51')
}

function dust() {
    //DUST
    init(_('#cvs').c,300,600);
    gsap.fromTo('#cvs', {opacity:0},{opacity:1, duration:1, ease:'sine.out'})
}

function addEvent() {
    document.getElementById("clickthru").addEventListener("click", function(){
        window.open(clickTag1)
        setTimeout(function(){
            gsap.to('.ctaBg', {duration:0.3, backgroundColor:'#ffd300', ease:'power1.out'})
        }, 500);
    })
}

function addHover() {
    document.getElementById("clickthru").addEventListener("mouseenter", function(){
        gsap.to('.ctaBg', {duration:0.3, backgroundColor:'#ffffff', ease:'power1.out'})
    })

    document.getElementById("clickthru").addEventListener("mouseleave", function(){
        gsap.to('.ctaBg', {duration:0.3, backgroundColor:'#ffd300', ease:'power1.out'})
    })
}

//--------------- PRELOAD -----------------
function preloadImages(imgArray, callbackFunction) {
    var totalImages = imgArray.length,
    loadedImages = 0,
    img = null,
    i;
    for (i = 0; i < totalImages; i++) {
        img = document.createElement("img");
        img.src = imgArray[i];
        img.onload = function () {
            loadedImages++;
            if (loadedImages === totalImages) {
                callbackFunction();
            }
        }
    }   
}

document.addEventListener('DOMContentLoaded', domLoaded);
