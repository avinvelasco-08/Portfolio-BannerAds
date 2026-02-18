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
    
    frameOption   = _dynamicData.frameOption
    stLogoOption - _dynamicData.stLogoOption
    bgColor   = _dynamicData.bgColor
    bubbleInnerColor   = _dynamicData.bubbleInnerColor
    bubbleBorderColor   = _dynamicData.bubbleBorderColor
    ctaHoverColor   = _dynamicData.ctaHoverColor
    ctaDefaultColor = _dynamicData.ctaDefaultColor
    h1Eyebrow = _dynamicData.h1Eyebrow
    h2Eyebrow = _dynamicData.h2Eyebrow
    h3Eyebrow = _dynamicData.h3Eyebrow
    h4Eyebrow = _dynamicData.h4Eyebrow
    frameDuration = _dynamicData.frameDuration

    frameOption = _dynamicData.frameOption.split(",");
    frameDuration = _dynamicData.frameDuration.split(",");
    stLogoOption = _dynamicData.stLogoOption.split(",");

    Creative.setExitURL( _dynamicData.exitURL );
    
    checkFontsLoaded(['Open Sans'],Creative.startAd)
}


