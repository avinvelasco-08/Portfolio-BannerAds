
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

// shadow variables
var shadowOffsetX = 0.005,
    shadowOffsetY = 0.015;

var bannerData = {
    h1Heading: "Stuck with<br>your old<br>phone?",

    h2Heading: "Be free<br>to break<br>free",
    
    device: "images/device.png",

    tooltipEdgeGap: "15"
};

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

    createShadowEffect: function ( angleX, angleY, color, limit ) {
        // Initialize shadow string and variables for counting shadows
        let shadowDescription = `0.001em 0.001em 0.000em ${color}, `;
        let offsetX = 0.000;
        let offsetY = 0.000;
        const shadowVisibility = 0.018;
    
        // Loop through the shadow positions up to the specified limit
        for (let i = 0; i <= limit; i++) {
            // Increment the offsets based on the given angles
            offsetX += angleX;
            offsetY += angleY;
    
            // Only add shadows if the angle is non-zero and limit is not zero
            if (limit !== 0 && angleX !== "0.000" && angleY !== "0.000") {
                shadowDescription += `${parseFloat(offsetX).toFixed(3)}em ${parseFloat(offsetY).toFixed(3)}em ${shadowVisibility}em ${color}`;
            }
    
            // If it's not the last shadow, add a comma for separation
            if (i !== limit) {
                shadowDescription += ", ";
            }
        }
    
        // Log the final shadow description and return it
        // console.log(shadowDescription);
        return shadowDescription;
    },    

    appendSVGToGrid: function (svgFilePath, rows, cols) {
        // Create a container for the grid
        const gridContainer = document.createElement('div');
        gridContainer.id = 'patternCont';
        gridContainer.style.position = 'absolute';
        gridContainer.style.display = 'flex';
        gridContainer.style.flexWrap = 'wrap';
        gridContainer.style.width = `${cols * 67.2}px`; // Set the width based on columns (67.2px per column)
        gridContainer.style.height = `${rows * 100.5}px`; // Set the height based on rows (100.5px per row)
    
        // Create the grid cells (divs)
        for (let i = 0; i < rows * cols; i++) {
            const gridCell = document.createElement('div');
            gridCell.style.width = '67.2px'; // Set a fixed width for each cell
            gridCell.style.height = '100.5px'; // Set a fixed height for each cell
            gridCell.style.position = 'relative'; // Make the cell's position relative to contain absolute images
            gridContainer.appendChild(gridCell);
        }
    
        // Append the grid container to the body (or a specific container)
        getById("deviceFrame").insertBefore(gridContainer, getById("deviceFrame").firstChild);
    
        // Create an <img> element with the SVG file as the source
        const svgImage = document.createElement('img');
        svgImage.src = svgFilePath; // Set the source to the SVG file path
        svgImage.style.position = 'absolute'; // Position the image absolutely inside the cell
        svgImage.style.width = '100%'; // Ensure the image fits within the grid cell
        svgImage.style.height = '100%'; // Ensure the image fits within the grid cell
    
        // Select all grid cells
        const gridCells = gridContainer.querySelectorAll('div');
    
        // Loop through the grid cells and append the SVG image sequentially
        let currentCell = 0;
        while (currentCell < gridCells.length) {
            const gridCell = gridCells[currentCell];
    
            // Apply horizontal overlap (16px offset) to the grid cell itself
            if (currentCell % cols !== 0) {  // For subsequent cells in a row
                const overlapOffset = 16 * (currentCell % cols); // 16px horizontal overlap
                gridCell.style.left = `-${overlapOffset}px`; // Apply left offset to the cell
            } else {
                gridCell.style.left = '0px'; // Reset left offset for first cell in a row
            }
    
            // Apply horizontal offset between rows (6px offset)
            const rowOffset = 6 * Math.floor(currentCell / cols); // Shift each row by 6px to the right
            gridCell.style.left = `${parseFloat(gridCell.style.left || 0) + rowOffset}px`; // Apply row offset to the cell
    
            // Append the cloned SVG image to the grid cell
            const clonedImage = svgImage.cloneNode(); // Clone the image for each cell
            gridCell.appendChild(clonedImage); // Append the image inside the grid cell
    
            currentCell++;
        }
    },

    init: function() {

        Creative.splitChars(["h1Heading","h2Heading"]);
        Creative.splitLines(["h1Heading","h2Heading"]);
        Creative.appendSVGToGrid('images/pattern.svg', 3, 7);
        
        Creative.tl.addLabel("reset", 0)
            // reset elements to initial states
            .call(Creative.hideContainer, ["vMask"], "reset")
            .call(Creative.hideContainer, ["legalFrame"], "reset")
            .call(Creative.hideContainer, ["legalContainer"], "reset")
            .call(Creative.setLogoProps, ["default"], "reset")
            .to("#container", {autoAlpha:1}, "reset")
            
            //-------- F1 IN DEFAULT LOGO -------------------------------
            .addLabel("frame1", 0.1)
            .set("#logoMask", { display:"flex", xPercent:-180, autoAlpha:1 }, "frame1")
            .set("#ctaArrow", {autoAlpha:1}, "frame1")
            .set("#h1Heading .splitted-container", {alpha:0}, "frame1")
            
            .to("#heading1", {autoAlpha:1}, "frame1")
            .to("#logoMask", 0.5, {xPercent: 0, ease:"power1.inOut"}, "frame1")

            .from("#h1Heading .splitted-container", 0.5, {yPercent: 70, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to("#h1Heading .splitted-container", 0.001, {alpha:1, stagger: 0.1})} }, "frame1")

            .set("#h1Heading .splitted-container div", {textShadow: Creative.createShadowEffect(0.000,0.000,"#00000000", 20)}, "frame1")
        
            .from("#h1Heading .splitted-container div", 0.3, {x: 7, y: 20, stagger: 0.025, ease: "expo.out"}, "frame1+=0.5")
            .to("#h1Heading .splitted-container div", 0.3, {textShadow: Creative.createShadowEffect(shadowOffsetX,shadowOffsetY,"#000000",20), stagger: 0.025, ease: "expo.out"}, "frame1+=0.5")
            
            .to("#h1Heading .splitted-container div", 0.3, {x: 7, y: 20, stagger: 0.01, ease: "expo.in"}, "frame1+=1")
            .to("#h1Heading .splitted-container div", 0.3, {textShadow: Creative.createShadowEffect(0.001,0.001,"#00000000",20), stagger: 0.01, ease: "expo.in"}, "frame1+=1")

            // -------- F1 OUT --------
            .addLabel("outFrame1", 2.25)
            .to("#h1Heading .splitted-container", 0.5, {yPercent: -50, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to("#h1Heading .splitted-container", 0.001, {alpha:0, stagger: 0.1, delay:0.1})} }, "outFrame1")
            .to("#logoMask", 0.5, {xPercent: -180, ease:"power1.inOut"}, "outFrame1")

            //-------- F2 IN -------------------------------
            .addLabel("frame2", 2.85)
            
            .set("#h2Heading .splitted-container", {alpha:0}, "frame2")
            .to("#heading2", {autoAlpha:1}, "frame2")

            .from("#h2Heading .splitted-container", 0.5, {yPercent: 70, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to("#h2Heading .splitted-container", 0.001, {alpha:1, stagger: 0.1})} }, "frame2")

            .set("#h2Heading .splitted-container div", {textShadow: Creative.createShadowEffect(0.000,0.000,"#00000000", 20)}, "frame2")
        
            .from("#h2Heading .splitted-container div", 0.3, {x: 7, y: 20, stagger: 0.025, ease: "expo.out"}, "frame2+=0.5")
            .to("#h2Heading .splitted-container div", 0.3, {textShadow: Creative.createShadowEffect(shadowOffsetX,shadowOffsetY,"#000000",20), stagger: 0.025, ease: "expo.out"}, "frame2+=0.5")
            
            .to("#h2Heading .splitted-container div", 0.3, {x: 7, y: 20, stagger: 0.01, ease: "expo.in"}, "frame2+=1")
            .to("#h2Heading .splitted-container div", 0.3, {textShadow: Creative.createShadowEffect(0.001,0.001,"#00000000",20), stagger: 0.01, ease: "expo.in"}, "frame2+=1")

            // -------- F2 OUT --------
            .addLabel("outFrame2", 4.85)
            .to("#h2Heading .splitted-container", 0.5, {yPercent: -50, stagger: 0.1, ease:"expo.out", onStart:()=>{ gsap.to("#h2Heading .splitted-container", 0.001, {alpha:0, stagger: 0.1, delay:0.1})} }, "outFrame2")

            //-------- F3 IN -------------------------------
            .addLabel("frame3", 4.85)
            .to("#deviceFrame", {autoAlpha:1}, "frame3")
            .from("#device", 0.5, {y: "100%", ease: "power4.inOut"}, "frame3+=0.5")
            .from("#patternCont div img", 0.5, {clipPath: "inset(100% 0% 0% 0%)", stagger: 0.02, ease: "power4.inOut"}, "frame3+=0.5")
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
