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
        case "h1HeadingTop":
        case "h1Heading":
        case "h1HeadingBot":
        
        case "h2Eyebrow":
        case "h2Heading":
        case "h2Heading2":
        case "h2Subheading":
        case "h2LegalSubheading":
            
        case "h4Eyebrow":
        case "h4Heading":
        case "h4Heading2":
        case "h4Subheading":
        case "h4LegalSubheading":
        
        case "disclaimer":
            
        case "tooltipEdgeGap":
            
        case "ctaText":
        case "versionCss":
        case "exitURL":
            
        case "f1UnitImage":
        case "f1Lifestyle":
        case "h3Device":
        case "h3DeviceLogo":
        case "patternRow":
        case "patternColumn":
        case "patternGap":
        case "patternDelay1":
        case "patternDelay2":
        case "patternDelay2":
        case "patternDuration":
        case "svgPattern":
        
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
