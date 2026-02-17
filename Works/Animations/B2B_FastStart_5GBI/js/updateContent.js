/*
* For content in your creative that Hoxton can not update by targeting a DOM element
* use this function to manually refresh and have control over the display when working in Hoxton.
*/
Creative.updateContent = function (item) {
    
    console.log("Creative.updateContent");

    //hoxton.setState(item);
    _dynamicData = hoxton.getState();

    //setDynamicNonDomData(); // update data


    var ifNeedsRebuilt = false; // if we need to rebuild the timeline
    var ifRebuiltButContinuePlayback = false; // if we need to rebuild the timeline and resume at same position

    switch(item.name)
    {
        case "h1Eyebrow":
        case "h1Heading":
        case "h1SubHead":
        case "h1HollowTxtIn":
        case "h1HollowTxtOut":
        
        case "h2Eyebrow":
        case "h2Heading":
        case "h2SubHead":
        
        case "h3Eyebrow":
        case "h3Heading":
        case "h3SubHead":
        
        case "h4Eyebrow":
        case "h4Heading":
        case "h4SubHead":
        
        case "h5Eyebrow":
        case "h5Heading":
        case "h5SubHead":
        
        case "h6Eyebrow":
        case "h6Heading":
        case "h6SubHead":
        case "h6HollowTxt":
        
        case "h7Eyebrow":
        case "h7Heading":
        case "h7SubHead":
        
        case "h8Eyebrow":
        case "h8Heading":
        case "h8SubHead":
        case "h8HollowTxtIn":
        case "h8HollowTxtOut":

        case "h9Eyebrow":
        case "h9SubHead":
        case "h9SubHead":
            
        case "tooltipEdgeGap":
        case "disclaimer":
            
        case "ctaText":
        case "versionCss":
        case "exitURL":
            
        case "frameOption":
        case "bgColor":
        case "logoToggle":
        case "ctaToggle":
            
        case "f1Image":
        case "f2Image":
        case "f3Image":
        case "f4Image":
        case "f5Image":
        case "f6Image":
        case "f7Image":
        case "f8Image":
        case "f9Image":
        
        case "brandCss":
            ifNeedsRebuilt = true;
            ifRebuiltButContinuePlayback = false;
            break;
        default:
        ifRebuiltButContinuePlayback = ifNeedsRebuilt = false;
    }


    // If we need to renuild the timeline to refresh the updates in Hoxton
    if(ifNeedsRebuilt === true && hoxton.timeline.time() > 0.1)
    {   
        // SELDA'S SOLUTION
        debounceRate = 1000;
        if (hoxton.timer) { clearTimeout(hoxton.timer) }
        hoxton.timer = setTimeout(function () { window.location.reload() }, debounceRate)


    } else if(ifRebuiltButContinuePlayback === true && hoxton.timeline.time() > 0.1){

        // if values are changed that require the TL to be rebuilt but we dont want to skip back to TL start point,
        // instead continue playback from the playhead position at time of edit:
        
        var currPlayheadPos = Creative.tl.time();
        Creative.tl.clear(); // clear timline
        Creative.init(); // rebuild timeline
        Creative.tl.time(currPlayheadPos);
        Creative.tl.play();
        
    }

}
