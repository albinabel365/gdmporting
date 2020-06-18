var userAgent = navigator.userAgent.toLowerCase()
  , android = /Android/i.test(userAgent)
  , androidversion = android ? parseFloat(userAgent.slice(userAgent.indexOf("android") + 8)) : 0
  , chrome = /chrome/i.test(userAgent)
  , chromeiOS = /crios/i.test(userAgent)
  , ios = /iphone|ipad|ipod/i.test(userAgent)
  , iphone = /iphone/i.test(userAgent)
  , ios_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent) && !window.navigator.standalone
  , iphone_uiwebview = /(iphone).*AppleWebKit(?!.*Safari)/i.test(userAgent) && !window.navigator.standalone
  , iosVer = parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || -1
  , ios7URLAppear = !0
  , gameiframe = null
  , gameiframeSize = {
    width: 0,
    height: 0
}
  , iframeHeightOffset = 0;
function gup(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    a = (new RegExp("[\\?&]" + a + "=([^&#]*)")).exec(window.location.href);
    return null == a ? "" : a[1]
}
var iframeMode = gup("iframemode");
"true" != iframeMode && (iframeMode = gup("embedded"));
try {
    "true" != iframeMode && isIframeGcm() && (iframeMode = "undefined" !== typeof window.orientation || -1 !== navigator.userAgent.indexOf("IEMobile") ? "true" : "false")
} catch (a) {}
iframeMode = "false";
var viewportmeta = document.querySelector('meta[name="viewport"]');
(navigator.userAgent.match(/iPhone/i) || android && chrome) && viewportmeta && !(window.navigator.standalone && 8.3 <= iosVer && 9 > iosVer && navigator.userAgent.match(/iPhone/i)) && ~userAgent.indexOf("tipico") && (viewportmeta.content = "viewport-fit=cover,initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width,viewport-fit=cover");
function processTouchStartIOS8(a) {
	console.log("#####WRAPPER_INTERACTION-GameIFrame IOS touch start");
    gameiframe.contentWindow.game.showRules || gameiframe.contentWindow.game.processClick({
        x: a.changedTouches[0].pageX,
        y: a.changedTouches[0].pageY
    }, a)
}
function processTouchEndIOS8(a) {
	console.log("#####WRAPPER_INTERACTION-GameIFrame IOS touch end");
    gameiframe.contentWindow.game.showRules || (gameiframe.contentWindow.game.processClickRelease({
        x: a.changedTouches[0].pageX,
        y: a.changedTouches[0].pageY
    }, a),
    gameiframe.contentWindow.game.buttonsUp())
	console.log("#####WRAPPER_INTERACTION-GameIFrame IOS buttons up");

}
function processTouchMoveIOS8(a) {
	console.log("#####WRAPPER_INTERACTION-GameIFrame IOS touch move scroll top 200");
    $(gameiframe.contentWindow).scrollTop(200);
    gameiframe.contentWindow.game.showRules || "undefined" === gameiframe.contentWindow.game.processMouseOver || gameiframe.contentWindow.game.processMouseOver({
        x: a.changedTouches[0].pageX,
        y: a.changedTouches[0].pageY
    }, a)
}
function orientationChange() {
    null != gameiframe && (setiFrameSize(),
    ios ? iosOrientationChange() : androidOrientationChange())
}
function getScrollMode() {
    return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) ? "true" == iframeMode ? 2 : window.parent != window.self ? 3 : 0 : 0
}
function setiFrameSize() {
    if (null != gameiframe)
        if (ios)
            if (isGameHalfScaled(urlParameters.gameName)) {
                var a = window.navigator.standalone;
                568 >= document.documentElement.clientWidth ? (gameiframe.width = 2 * document.documentElement.clientWidth,
                a = a || 320 == document.documentElement.clientHeight ? 2 * document.documentElement.clientHeight : 7 <= iosVer ? 2 * document.documentElement.clientHeight : 2 * document.documentElement.clientHeight + 120) : (gameiframe.width = 2 * document.documentElement.clientWidth,
                a || 640 == document.documentElement.clientHeight ? a = 2 * document.documentElement.clientHeight : (a = document.documentElement.clientHeight + 120,
                7 <= iosVer && (a = 552 == document.documentElement.clientHeight ? 640 : 2 * document.documentElement.clientHeight)));
                gameiframe.height = a + 2;
                $(document.body).height(window.innerHeight);
                gameiframe.height -= 2 * iframeHeightOffset;
                window.navigator.standalone && 8.3 <= iosVer && 9 > iosVer && (Number(gameiframe.height) > Number(gameiframe.width) ? (gameiframe.height = Number(gameiframe.height) / 2,
                gameiframe.width = Number(gameiframe.width) / 2) : (gameiframe.width = Number(gameiframe.width),
                gameiframe.height = Number(gameiframe.height)))
            } else
                gameiframe.width = document.documentElement.clientWidth,
                gameiframe.height = document.documentElement.clientHeight + 1,
                gameiframe.height -= iframeHeightOffset;
        else
            android ? 4 > androidversion ? (gameiframe.width = screen.width,
            gameiframe.height = 1 == window.devicePixelRatio ? window.outerHeight : window.outerHeight - window.screenTop) : (gameiframe.width = document.documentElement.clientWidth,
            chrome || 4.1 < androidversion ? (gameiframe.height = window.innerHeight,
            $(document.body).height(window.innerHeight)) : gameiframe.height = screen.height - window.screenTop) : (gameiframe.width = document.documentElement.clientWidth,
            gameiframe.height = document.documentElement.clientHeight),
            gameiframe.height -= iframeHeightOffset
}
function iosOrientationChange() {
	console.log("#####WRAPPER_INTERACTION-GameIFrame IOS orientation change");
    $.isFunction(gameiframe.contentWindow.changeOrientation) && (gameiframe.contentWindow.iPhoneiOS7AboveBrowserMode && iphone_uiwebview && (gameiframe.contentWindow.iPhoneiOS7AboveBrowserMode = !1),
    gameiframe.contentWindow.changeOrientation(window.orientation));
    setTimeout(function() {
        window.scrollTo(0, 1)
    }, 300)
}
function androidOrientationChange() {
	console.log("#####WRAPPER_INTERACTION-GameIFrame android orientation change");
    null != gameiframe && ($.isFunction(gameiframe.contentWindow.changeOrientation) && gameiframe.contentWindow.changeOrientation($(window).width() > $(window).height() ? 90 : 0),
    setTimeout(function() {
        window.scrollTo(0, 1)
    }, 300))
}
function createClass(a, b) {
    var c = gameiframe.contentWindow.document.createElement("style");
    c.type = "text/css";
    gameiframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(c);
    (c.sheet || {}).insertRule ? c.sheet.insertRule(a + "{" + b + "}", 0) : (c.styleSheet || c.sheet).addRule(a, b)
}
function frameload() {
    setGameIframeSizeFromParentWindow()
}
function nggGameReady() {
    ios ? iosOrientationChange() : androidOrientationChange();
    gameiframe.contentWindow.focus()
}
var receiveMessage = function(a) {
    var b = null;
    try {
        try {
            b = JSON.parse(a.data)
        } catch (d) {
            b = a.data
        }
        switch (b.msgId) {
        case "windowSizeChanged":
            gameiframeSize.width = Number(b.width);
            gameiframeSize.height = Number(b.height);
            try {
                if ("true" != iframeMode) {
                    iframeMode = "true";
                    try {
                        (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) && "undefined" !== typeof gameiframe.contentWindow.scrollMode && (gameiframe.contentWindow.scrollMode = 2)
                    } catch (d) {
                        console.log("contentWindow and scrollMode is not defined yet. It will be set in getScrollMode")
                    }
                    $(window).unbind("resize");
                    $(window).unbind("orientationchange");
                    isGameHalfScaled(urlParameters.gameName) && (createClass("#msgBox", "-webkit-transform: scale(0.5);"),
                    createClass("#help, #ops", "-webkit-transform: scale(0.5); background:none; -webkit-transform-origin-x: 0; -webkit-transform-origin-y: 0; \t\t                     width:200%; height:200%"),
                    $(gameiframe).css({
                        "-webkit-transform": "scale(1)"
                    }))
                }
            } catch (d) {}
            if (null == gameiframe)
                return;
            setGameIframeSizeFromParentWindow();
            break;
        case "balancedChanged":
            var c = Number(b.balance);
			console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext SET_BALANCE");
            wrapperinterface ? gameAPI("SET_BALANCE", c) : gameiframe.contentWindow.apiExt("SET_BALANCE", c)
        }
        switch (b.event) {
        case "playInterrupted":
			console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext PAUSE_AUTOPLAY, game interrupted");
            console.log("playInterrupted received."),
            wrapperinterface ? gameAPI("STOP_AUTOPLAY", !0) : gameiframe.contentWindow.apiExt("PAUSE_AUTOPLAY", !0)
        }
        try {
            if (null != b.payload.gameClientSize) {
                gameiframeSize.width = Number(b.payload.gameClientSize.width);
                gameiframeSize.height = Number(b.payload.gameClientSize.height);
                try {
                    if ("true" != iframeMode) {
                        iframeMode = "true";
                        try {
                            (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) && "undefined" !== typeof gameiframe.contentWindow.scrollMode && (gameiframe.contentWindow.scrollMode = 2)
                        } catch (d) {
                            console.log("contentWindow and scrollMode is not defined yet. It will be set in getScrollMode")
                        }
                        $(window).unbind("resize");
                        $(window).unbind("orientationchange");
                        isGameHalfScaled(urlParameters.gameName) && (createClass("#msgBox", "-webkit-transform: scale(0.5);"),
                        createClass("#help, #ops", "-webkit-transform: scale(0.5); background:none; -webkit-transform-origin-x: 0; -webkit-transform-origin-y: 0; \t\t                     width:200%; height:200%"),
                        $(gameiframe).css({
                            "-webkit-transform": "scale(1)"
                        }))
                    }
                } catch (d) {}
                null != gameiframe && setGameIframeSizeFromParentWindow()
            }
        } catch (d) {
            console.log("Received message doesn't include payload.gameClientSize")
        }
    } catch (d) {
        console.log("[Game Wrapper] failed to JSON parse received message")
    }
};
function setGameIframeSizeFromParentWindow() {
    0 < gameiframeSize.width && 0 < gameiframeSize.height && (gameiframe.width = gameiframeSize.width,
    gameiframe.height = gameiframeSize.height - iframeHeightOffset,
    ios ? iosOrientationChange() : androidOrientationChange(),
    "undefined" != typeof wrapperinterface && wrapperinterface && gameAPI("RESIZE", gameiframe.width, gameiframe.height))
}
function nggGetSize() {
    return {
        w: gameiframe.width,
        h: gameiframe.height
    }
}
function fullscreenPromptForAndroid() {
    var a = window.document;
    android && window == window.top && (a.fullscreenEnabled || a.webkitFullscreenEnabled || a.mozFullScreenEnabled || a.msFullscreenEnabled) && message.messageBox("", wrappertexts.language[wrapperLang].MESSAGE_FULL_SCREEN, [wrappertexts.language[wrapperLang].MESSAGE_BTN_YES, wrappertexts.language[wrapperLang].MESSAGE_BTN_NO], function(a) {
        0 == a && toggleFullScreen()
    })
}
function toggleFullScreen() {
    var a = window.document
      , b = a.documentElement
      , c = b.requestFullscreen || b.mozRequestFullScreen || b.webkitRequestFullScreen || b.msRequestFullscreen
      , d = a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen || a.msExitFullscreen;
    a.fullscreenElement || a.mozFullScreenElement || a.webkitFullscreenElement || a.msFullscreenElement ? d.call(a) : c.call(b)
}
window.addEventListener("message", receiveMessage);
$(window).bind("resize", function() {
    orientationChange();
    "undefined" != typeof wrapperinterface && wrapperinterface && (isGameHalfScaled(urlParameters.gameName) ? gameAPI("RESIZE", 2 * $(window).width(), 2 * ($(window).height() - iframeHeightOffset)) : gameAPI("RESIZE", $(window).width(), $(window).height() - iframeHeightOffset))
}).bind("orientationchange", function() {
    ios && (orientationChange(),
    "undefined" != typeof wrapperinterface && wrapperinterface && (isGameHalfScaled(urlParameters.gameName) ? gameAPI("RESIZE", 2 * $(window).width(), 2 * ($(window).height() - iframeHeightOffset)) : gameAPI("RESIZE", $(window).width(), $(window).height() - iframeHeightOffset)))
});
function setIframeHeightOffset(a) {
    iframeHeightOffset = a
}
function initIframe() {
    0 < arguments.length && (iframeHeightOffset = arguments[0]);
    try {
        window.top.window.postMessage({
            source: "gameClient",
            type: "requestGameWindowConfig",
            payload: {}
        }, "*")
    } catch (a) {}
    try {
        window.parent != window.self && window.parent.window.postMessage(JSON.stringify({
            msgId: "gameLoaderReady"
        }), "*")
    } catch (a) {}
    "true" != iframeMode && (setiFrameSize(),
    window.parent == window.self && 7 <= iosVer && iphone && !iphone_uiwebview && !window.navigator.standalone && !chromeiOS && (handleIOS(),
    setInterval(handleIOS, 200)));
    8 <= iosVer && window.navigator.standalone && (window.addEventListener("touchstart", processTouchStartIOS8, !0),
    window.addEventListener("touchend", processTouchEndIOS8, !0),
    window.addEventListener("touchmove", processTouchMoveIOS8, !0));
    $(gameiframe).ready(function(a) {
        isGameHalfScaled(urlParameters.gameName) && "true" != iframeMode && ($(gameiframe).css({
            "-webkit-transform": "scale(0.5)",
            "-webkit-transform-origin-x": 0,
            "-webkit-transform-origin-y": 0
        }),
        $("#msgBox").css("-webkit-transform", "scale(0.5)"));
        frameload()
    });
    gameiframe.onload = function() {
        isGameHalfScaled(urlParameters.gameName) && ("true" == iframeMode ? (createClass("#msgBox", "-webkit-transform: scale(0.5);"),
        createClass("#help, #ops", "-webkit-transform: scale(0.5); background:none; -webkit-transform-origin-x: 0; -webkit-transform-origin-y: 0; width:200%; height:200%"),
        $("#msgBox").css("-webkit-transform", "scale(0.5)")) : window.navigator.standalone && 8.3 <= iosVer && 9 > iosVer && navigator.userAgent.match(/iPhone/i) && (createClass("#msgBox", "-webkit-transform: scale(0.5);"),
        createClass("#help, #ops", "-webkit-transform: scale(0.5); background:none; -webkit-transform-origin-x: 0; -webkit-transform-origin-y: 0; width:200%; height:200%")))
    }
    ;
    0 < gameiframeSize.width && 0 < gameiframeSize.height && (gameiframe.width = gameiframeSize.width,
    gameiframe.height = gameiframeSize.height)
}
var handleIOS = function(a) {
    window.innerHeight < window.innerWidth ? (0 == $("#Mask").length && ($("<div>").attr("id", "Mask").on("touchstart", maskTouchStart).on("touchend", maskTouchEnd).on("touchmove", maskTouchMove).css({
        filter: "alpha(opacity=90)",
        opacity: "0.9",
        position: "absolute",
        top: "0px",
        left: "0px",
        background: "#333",
        width: "100%",
        height: "100%",
        display: "none",
        "z-index": "997"
    }).height(gameiframe.height).appendTo($("body")),
    $("<div>").attr("id", "swipearrow").css({
        position: "absolute",
        left: "50%",
        top: "50%",
        "margin-left": "-94px",
        "margin-top": "-310px",
        visibility: "hidden",
        "-webkit-transform": "scale(0.5)",
        "z-index": "998"
    }).append($("<img>").attr("src", "transarrow.png").css({
        "pointer-events": "none"
    })).appendTo($("#Mask")),
    $("<div>").attr("id", "swipeup").css({
        position: "absolute",
        left: "50%",
        top: "60%",
        "margin-left": "-50px",
        "margin-top": "-80px",
        "-webkit-transform": "scale(0.5)",
        visibility: "hidden",
        "z-index": "999"
    }).append($("<img>").attr("src", "transfinger.png")).appendTo($("#Mask")),
    8 <= iosVer && ($("#Mask").css("height", "120%"),
    $("#swipearrow").css("margin-top", "-300px"))),
    "undefined" !== typeof gameiframe.contentWindow.game && gameiframe.contentWindow.game.showRules) || (window.innerHeight < document.documentElement.clientHeight ? (ios7URLAppear || $(document).off("touchmove"),
    ios7URLAppear = !0,
    maskPressed) ? "visible" == $("#swipeup").css("visibility") && ($("#swipeup").css("visibility", "hidden"),
    $("#swipeup").stop()) : ($("#Mask").css({
        display: "block",
        filter: "alpha(opacity=85)",
        opacity: "0.85"
    }),
    $("#swipeup").css("visibility", "visible"),
    $("#swipearrow").css({
        visibility: "visible"
    }),
    $("#swipeup").animate({
        top: "15%",
        opacity: 0
    }, 1500, function() {
        $(this).css("top", "60%");
        $(this).css("opacity", 1)
    }),
    $(window).scrollTop(0, 200)) : window.innerHeight >= document.documentElement.clientHeight && ios7URLAppear && (ios7URLAppear = !1,
    $("#Mask").css("display", "none"),
    $("#swipeup").css("visibility", "hidden"),
    $(gameiframe.contentWindow.document).on("touchmove", function(a) {
        "undefined" !== typeof gameiframe.contentWindow.game && gameiframe.contentWindow.game.showRules || a.preventDefault()
    }),
    $(document).on("touchmove", function(a) {
        a.preventDefault()
    }))) : ($("#Mask").css("display", "none"),
    $("#swipeup").css("visibility", "hidden"),
    $("#swipearrow").css("visibility", "hidden"))
}
  , maskPressed = !1
  , maskTouchStart = function() {
    maskPressed = !0;
    "visible" == $("#swipeup").css("visibility") && $("#swipeup").css("visibility", "hidden")
}
  , maskTouchEnd = function() {
    maskPressed = !1
}
  , maskTouchMove = function() {
    $("#swipearrow").css("visibility", "hidden")
};
/* Version 3.0.17 Date: 20200514 */
