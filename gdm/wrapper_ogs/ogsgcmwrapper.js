wrapperCallBacks = {
    gameRevealed: gameRevealed,
    gcmReady: gcmReady,
    playGame: playGame,
    endGamePlay: endGamePlay,
    optionHasChanged: gcmOptionHasChanged,
    balancesHasChanged: balancesHasChanged,
    toggleMute: toggleMute,
    configReady: configReady,
    resume: resume,
    resize: resize,
    getGameName: getGameName,
    reload: reload,
    redirect: redirect,
    getPreferredCommonUIPosition: getPreferredCommonUIPosition,
    getConfig: getConfig,
    getOgsClientToken: getOgsClientToken
};
var currentURL = window.location.href
  , resumable = !1
  , isErrorInProgress = !1
  , isMute = !1
  , isPaytableVisible = !1
  , balance = 0
  , freebetBalance = 0
  , currencyFormat = ""
  , ogsParams = {}
  , ogsClientToken = ""
  , isGameReady = !1;
function gameRevealed() {
    enableUI()
}
function gcmReady(a) {
    gcmObj = a;
    a.regOption("PAYTABLE");
    isMute = a.regOption("MUTE")
}
function getGameName() {
    try {
        if (gameiframe) {
            if (wrapperinterface)
                return gameAPI("GET_GAME_NAME");
            if ($.isFunction(gameiframe.contentWindow.apiExt))
				console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext GET_GAME_NAME");
                return gameiframe.contentWindow.apiExt("GET_GAME_NAME")
        }
        return ""
    } catch (a) {
        return ""
    }
}
function playGame() {}
function endGamePlay() {}
function gcmOptionHasChanged(a, b) {
    switch (a) {
    case "MUTE":
        toggleMute();
        break;
    case "ABOUT":
        togglePaytable();
        break;
    case "GAME_PREFERENCES":
        break;
    case "PAYTABLE":
        togglePaytable();
        break;
    default:
        throw Error("unknown option [" + a + "] changed by gcm ");
    }
}
function balancesHasChanged(a) {
    balance = a.CASH.amount;
    freebetBalance = a.FREEBET.amount;
    "object" == typeof a.FREESPIN && (freespinBalance = a.FREESPIN.amount,
    freespinCount = a.FREESPIN.count);
    isDebug() && console.log("GDM from gcm - balancesHasChanged- bal : " + balance + "  freebet " + freebetBalance);
	console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext SET_BALANCE");
    wrapperinterface ? gameAPI("SET_BALANCE", 100 * (balance + freebetBalance)) : gameiframe.contentWindow.apiExt("SET_BALANCE", 100 * (balance + freebetBalance))
}
function toggleMute() {
    isMute = !isMute;
    isDebug() && console.log("GDM from gcm - toggleMute-  value: " + isMute);
    toggleSound()
}
function isJsonEmpty(a) {
    for (var b in a)
        if (a.hasOwnProperty(b))
            return !1;
    return !0
}
function configReady(a) {
    isDebug() && console.log("GDM from gcm - configReady");
    isJsonEmpty(ogsParams) && (ogsParams = a);
    initilise();
    postInit();
    gcmObj.loadProgressUpdate(0);
    a = gcmObj.paidUpdate(1);
    var b = gcmObj.paidUpdate(.01);
    gcmObj.paidUpdate(0);
    currencyFormat = "CUR=ISO:";
    currencyFormat += a.code + "|";
    currencyFormat += a.ccy_thousand_separator + "|";
    currencyFormat += a.ccy_decimal_separator + "|";
    var d = "";
    if (void 0 != a.currency_symbol)
        for (var c = 0; c < a.currency_symbol.length; c++)
            d += a.currency_symbol.charCodeAt(c) + ";";
    else
        for (c = 0; c < a.code.length; c++)
            d += a.code.charCodeAt(c) + ";";
    currencyFormat += d + "|";
    currencyFormat += (isNaN(a.display.charAt(0)) ? "L" : "R") + "|";
    if (a.currency_symbol == b.currency_symbol)
        currencyFormat += "32;|";
    else {
        d = "";
        for (c = 0; c < b.currency_symbol.length; c++)
            d += b.currency_symbol.charCodeAt(c) + ";";
        currencyFormat += d + "|"
    }
    currencyFormat += isNaN(b.display.charAt(0)) ? "L" : "R";
    loadgame()
}
function resume(a) {
    isDebug() && console.log("GDM from gcm - resume - index " + a);
    isErrorInProgress = !1;
    if (!resumable)
        location.reload();
    else if (lastXmlResponse) {
        showOperatorMessage();
        resumable = !1;
        return
    }
    realityCheck.resumeRealityCheck()
}
function customBridgeLoaded(a) {}
function updateProgress(a, b) {
    a = null == b ? a : Math.floor(a / b * 100);
    gcmObj.loadProgressUpdate(a);
    gameiframe.width != gameiframeSize.width && gameiframe.height != gameiframeSize.height && setGameIframeSizeFromParentWindow();
    100 <= a && (isDebug() && console.log("GDM to gcm - gameReady - paidUpdate 0.00 "),
    checkIsGameReady(),
    gcmObj.paidUpdate(0))
}
function checkIsGameReady() {
    isGameReady || (gcmObj.gameReady(),
    isGameReady = !0)
}
function resumeCallback() {
    !inGameRound && waitToEndRound ? 0 < urlParameters.rcUrl.length ? realityCheckBV.showRC() : null != realityCheck && realityCheck.handleClientRealityCheck(xmlGDMString) : enableUI();
	console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext TEMP_PAUSE_AUTOPLAY");
    wrapperinterface || gameiframe.contentWindow.apiExt("TEMP_PAUSE_AUTOPLAY", !1)
}
function enableUI() {
	console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext ENABLE_ALL_UI");
    wrapperinterface ? gameAPI("DISABLE_UI", !1) : gameiframe.contentWindow.apiExt("ENABLE_ALL_UI", !0)
}
function disableUI() {
	console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext ENABLE_ALL_UI - false");
    wrapperinterface ? gameAPI("DISABLE_UI", !0) : gameiframe.contentWindow.apiExt("ENABLE_ALL_UI", !1)
}
function toggleSound() {
	console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext SET_MUTE");
    wrapperinterface ? gameAPI("MUTE", isMute) : gameiframe.contentWindow.apiExt("SET_MUTE", isMute)
}
function togglePaytable() {
    isPaytableVisible = !isPaytableVisible;
	console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext SHOW_GAME_INFO");
    wrapperinterface ? gameAPI("SHOW", "GAME_INFO", isPaytableVisible) : gameiframe.contentWindow.apiExt("SHOW_GAME_INFO", isPaytableVisible);
	console.log("#####WRAPPER_INTERACTION-GameIFrame API Ext PAUSE_AUTOPLAY");
    wrapperinterface ? gameAPI("STOP_AUTOPLAY", !0) : gameiframe.contentWindow.apiExt("PAUSE_AUTOPLAY", !0)
}
function handleServerError(a, b) {
    isDebug() && console.log("GDM to gcm - handleServerError - errorMSG " + b);
    gcmObj.handleServerError(a, b)
}
function getCSRFToken() {
    isDebug() && console.log("GDM to gcm - getCSRFToken");
    return gcmObj.getCSRFToken()
}
function updateBalances(a, b, d) {
    try {
        lastResponse.ALLBALANCES && (lastResponse.ALLBALANCES.BONUSBALANCE && (b = lastResponse.ALLBALANCES.BONUSBALANCE,
        b = Number(b) / 100),
        lastResponse.ALLBALANCES.REALBALANCE && 0 < b && (a -= b))
    } catch (e) {}
    var c = {
        CASH: {
            amount: a
        },
        BONUS: {
            amount: b
        }
    };
    isDebug() && console.log("GDM to gcm - updateBalances - bal : " + a + "  freebet: " + b);
    gcmObj.balancesUpdate(c, d)
}
function resize(a, b) {
    isDebug() && console.log("GDM from gcm - resize - w : " + a + " h : " + b);
    postMessage(JSON.stringify({
        msgId: "windowSizeChanged",
        width: a,
        height: b
    }), "*")
}
function reload() {
    window.reload()
}
function redirect(a) {
    window.location = a
}
function getPreferredCommonUIPosition() {
    return "right"
}
function getConfig(a) {
    ogsParams = a;
    if ("undefined" == typeof ogsParams || "undefined" == typeof ogsParams.gameid)
        return {
            gameName: "",
            gameLoadingScreen: !1,
            cuiPosition: "right"
        };
    a = "sgdigital" == getGameProvider(ogsParams.gameid) ? !1 : !0;
    return {
        gameName: ogsParams.gameid,
        gameLoadingScreen: a,
        cuiPosition: "right"
    }
}
function getOgsClientToken() {
    return ogsClientToken
}
function parseOGSData(a) {
    "undefined" !== typeof a.OGSCLIENTTOKEN && 2 < a.OGSCLIENTTOKEN.length && (ogsClientToken = a.OGSCLIENTTOKEN)
}
;/* Version 3.0.17 Date: 20200514 */
