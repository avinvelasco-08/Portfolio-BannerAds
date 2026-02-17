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
    
    tooltipEdgeGap   = _dynamicData.tooltipEdgeGap
    frameOption   = _dynamicData.frameOption
    logoToggle   = _dynamicData.logoToggle
    ctaToggle   = _dynamicData.ctaToggle
    bgColor   = _dynamicData.bgColor
    h1SubHead   = _dynamicData.h1SubHead
    h2SubHead   = _dynamicData.h2SubHead
    h3SubHead   = _dynamicData.h3SubHead
    h4SubHead   = _dynamicData.h4SubHead
    h5SubHead   = _dynamicData.h5SubHead
    h6SubHead   = _dynamicData.h6SubHead
    h7SubHead   = _dynamicData.h7SubHead
    h8SubHead   = _dynamicData.h8SubHead
    h9SubHead   = _dynamicData.h9SubHead
    h4HollowTxt   = _dynamicData.h4HollowTxt

    // h5Heading2   = _dynamicData.h5Heading
    
    frameOption = _dynamicData.frameOption.split(",");
    logoToggle  = _dynamicData.logoToggle.split(",");
    ctaToggle  = _dynamicData.ctaToggle.split(",");
    bgColor  = _dynamicData.bgColor.split(",");

    Creative.setExitURL( _dynamicData.exitURL );
    


    
    checkFontsLoaded(['VerizonNHGeDSBold','VerizonNHGeDSRegular'],Creative.startAd)
}


