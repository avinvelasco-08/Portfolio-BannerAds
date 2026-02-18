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
    svgPattern   = _dynamicData.svgPattern
    Creative.setExitURL( _dynamicData.exitURL );
    checkFontsLoaded(['VerizonNHGeDSBold','VerizonNHGeDSRegular'],Creative.startAd)
}


