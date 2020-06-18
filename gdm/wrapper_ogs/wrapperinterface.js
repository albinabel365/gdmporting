function wrapperAPI() {
    if (0 < arguments.length) {
        var a = 0;
        switch (arguments[0]) {
        case "SEND_MESSAGE":
            a = sendMsgToServer(arguments[1]);
            break;
        case "BUTTON_PRESSED":
            a = handleInGameButton(arguments[1]);
            break;
        case "API_READY":
            wrapperinterface = !0;
            gameAPI = gameiframe.contentWindow.gameAPI;
            break;
        case "GAME_READY":
            a = gameReady();
            break;
        case "GET_WINDOW_SIZE":
            a = 0 < gameiframe.width && 0 < gameiframe.height ? {
                w: gameiframe.width,
                h: gameiframe.height
            } : isGameHalfScaled(urlParameters.gameName) ? {
                w: 2 * $(window).width(),
                h: 2 * ($(window).height() - iframeHeightOffset)
            } : {
                w: $(window).width(),
                h: $(window).height() - iframeHeightOffset
            };
            break;
        case "VALUE_CHANGED":
            valueChanged(arguments[1], arguments[2]);
            break;
        case "GET_LANGUAGE_CODE":
            a = languageCode;
            break;
        case "GET_OPERATOR_ID":
            a = getOperatorID();
            break;
        case "GET_OPERATOR_NAME":
            a = getOperatorName();
            break;
        case "GET_CUSTOM_SETTINGS":
            a = getCustomSettings();
            break;
        case "GET_QUALITY":
            a = quality;
            break;
        case "GET_PREFERRED_RENDERER":
            a = urlParameters.renderer;
            break;
        case "GET_JURISDICTION":
            a = urlParameters.jurisdiction;
            break;
        case "GET_INTERFACE":
            a = "auto" == urlParameters.interfaceID ? ios || android ? "touch" : "mouse" : urlParameters.interfaceID;
            break;
        case "ROUND":
            a = valueChanged("ROUND", Number(arguments[1]));
            break;
        case "RESULT_SHOWN":
            break;
        case "START_AUTOPLAY":
            a = autoPlayNotification(arguments[1], arguments[2], arguments[3]);
            break;
        case "GAME_SHOWN":
            a = 0 < gameiframe.width && 0 < gameiframe.height ? {
                w: gameiframe.width,
                h: gameiframe.height
            } : isGameHalfScaled(urlParameters.gameName) ? {
                w: 2 * $(window).width(),
                h: 2 * ($(window).height() - iframeHeightOffset)
            } : {
                w: $(window).width(),
                h: $(window).height() - iframeHeightOffset
            };
            break;
        case "GET_CONFIG_FILE":
            break;
        case "RELOAD_GAME":
            reloadGame();
            break;
        case "METRICS":
            sendMetricsData(arguments[1]);
            break;
        case "LOAD_PROGRESS":
            "function" === typeof updateProgress && updateProgress(arguments[1], null);
            break;
        case "DELEGATE_ERROR":
            a = !1;
            "function" === typeof delegatedErrorHandling && (a = !0,
            delegatedErrorHandling(arguments[1], arguments[2], arguments[3]));
            break;
        default:
            console.log("!!! Unknown wrapperAPI call: " + arguments[0])
        }
        return a
    }
    console.log("!!! wrapperAPI called with no arguments")
}
function handleInGameButton(a) {
    var b = 0;
    switch (a) {
    case "HOME":
        b = homeButtonPressed();
        break;
    case "CASHIER":
        b = gameButtonPressed(a)
    }
    return b
}
function handleValueChanged(a, b) {
    console.log(a + ": " + b)
}
;/* Version 3.0.17 Date: 20200514 */
