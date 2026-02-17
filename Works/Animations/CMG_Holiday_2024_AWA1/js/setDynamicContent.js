// JS to set banners content to dynamic content loaded from DoubleClick

// create var to provide easy access to dynamic data
var _dynamicData = {};

//console.log("Hoxton ready!");
hoxton.timeline = Creative.tl;

// Define the function that should fire when the Ad Server is ready and assets are preloaded
hoxton.isInitialized = setDynamicContent;


/*
* Function sets any dynamic content
*/
function setDynamicContent()
{
    //console.log("setDynamicContent()");

    // for shorthand references to state object
    _dynamicData = hoxton.getState();
    
    tooltipEdgeGap = _dynamicData.tooltipEdgeGap;
    frameToggle = _dynamicData.frameToggle;
    textDelay = _dynamicData.textDelay;
    
    logoColor = _dynamicData.logoColor;
    bgColor = _dynamicData.bgColor;
    contentColor = _dynamicData.contentColor;
    giftBoxColor = _dynamicData.giftBoxColor;
    deviceFrameColor = _dynamicData.deviceFrameColor;
    ctaColor = _dynamicData.ctaColor;

    topLeftFoldColor = _dynamicData.topLeftFoldColor;
    botRightFoldColor = _dynamicData.botRightFoldColor;
    topRightFoldColor = _dynamicData.topRightFoldColor;
    midLeftFoldColor = _dynamicData.midLeftFoldColor;
    midRightFoldColor = _dynamicData.midRightFoldColor;
    bottomFoldColor = _dynamicData.bottomFoldColor;
    
    arrFrToggle = frameToggle.split(",");
    arrtextDelay  = textDelay.split(",");

    Creative.setExitURL( _dynamicData.exitURL );
    


    
    Creative.startAd();
}


