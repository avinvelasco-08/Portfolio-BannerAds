let hogarth = {
    initializeElements: function(){
        let elems = document.querySelectorAll("body *");
        for(i = 0; i < elems.length; i++){
            if(elems[i].getAttribute("hogarthText") != null){
                document.querySelector("#"+elems[i].id).innerHTML = ContentValues[elems[i].getAttribute("hogarthText")];
            }
            
            if(elems[i].getAttribute("hogarthImage") != null){
                if(ContentValues[elems[i].getAttribute("hogarthImage")] == ""){
                    ContentValues[elems[i].getAttribute("hogarthImage")] = "images/blank.png";
                }else{
                    document.querySelector("#"+elems[i].id).setAttribute("src","images/" +ContentValues[elems[i].getAttribute("hogarthImage")]);
                }
            }else{
                ContentValues[elems[i].getAttribute("hogarthImage")] = "images/blank.png";
            }
        }
    },
    CSSMobileandBrowser: function(){
        let elems = document.querySelectorAll("body *");
        for(i = 0; i < elems.length; i++){
            elems[i].classList.add(obj.browserFix());
        }
    },
    browserFix: function(){
        if(navigator.maxTouchPoints == 0 && OS.indexOf("Mac") > -1){
            if (Browser.indexOf("Chrome") > -1) 
                return "macChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "macFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "macSafari";
        }else if(OS.indexOf("Win") > -1){
            if (Browser.indexOf("Chrome") > -1) 
                return "winChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "winFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "winSafari";
        }else if (OS.indexOf("iPhone") > -1) {
            if (Browser.indexOf("Chrome") > -1) 
                return "macChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "macFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "macSafari";
        }else if(navigator.maxTouchPoints >= 5 && OS.indexOf("Mac") > -1){
            if (Browser.indexOf("Chrome") > -1) 
                return "IpadChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "IpadFirefox";
            if (Browser.indexOf("Safari") > -1) 
                if(Browser.indexOf("Chrome") == -1)
                    return "IpadSafari";
        }else if (OS.indexOf("Linux") > -1 && Browser.indexOf("Android")) {
            if (Browser.indexOf("Chrome") > -1) 
                return "androidPhoneChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "androidPhoneFirefox";
        }else if (OS.indexOf("Linux") > -1 && Browser.indexOf("Android")) {
            if (Browser.indexOf("Chrome") > -1) 
                return "androidTabChrome";
            if (Browser.indexOf("Firefox") > -1) 
                return "androidTabFirefox";
        }
    }
}

const obj = hogarth;
let Browser = navigator.userAgent;
let OS = navigator.platform;