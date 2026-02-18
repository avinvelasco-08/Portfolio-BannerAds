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
        case "f1Eyebrow":
        case "f1Heading":
        case "f1SubHead":
        case "f1SubLegal":
        case "f2Eyebrow":
        case "f2Heading":
        case "f2SubHead":
        case "f2SubLegal":
        case "f3Eyebrow":
        case "f3Heading":
        case "f3SubHead":
        case "f3SubLegal":
        case "f4Eyebrow":
        case "f4Heading":
        case "f4SubHead":
        case "f4SubLegal":
        case "f5Eyebrow":
        case "f5Heading":
        case "f5SubHead":
        case "f5SubLegal":
        case "f6Eyebrow":
        case "f6Heading":
        case "f6SubHead":
        case "f6SubLegal":
        case "frameSequence":
        case "tooltipEdgeGap":
            adjustNonTargetedContent();
            ifNeedsRebuilt = true;
            ifRebuiltButContinuePlayback = false;
            break;

        case "f1EyebrowWeight":
        case "f2EyebrowWeight":
        case "f3EyebrowWeight":
        case "f4EyebrowWeight":
        case "f5EyebrowWeight":
        case "f6EyebrowWeight":
        case "f1HeadingWeight":
        case "f2HeadingWeight":
        case "f3HeadingWeight":
        case "f4HeadingWeight":
        case "f5HeadingWeight":
        case "f6HeadingWeight":
        case "f1SubHeadWeight":
        case "f2SubHeadWeight":
        case "f3SubHeadWeight":
        case "f4SubHeadWeight":
        case "f5SubHeadWeight":
        case "f6SubHeadWeight":
            adjustNonTargetedContent();
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
