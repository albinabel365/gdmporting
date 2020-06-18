 var game;
 var partneradapterapi;
(function (partneradapterapi) {
    var ORIENTATION_MODE;
    (function (ORIENTATION_MODE) {
        ORIENTATION_MODE[ORIENTATION_MODE["LANDSCAPE"] = 0] = "LANDSCAPE";
        ORIENTATION_MODE[ORIENTATION_MODE["PORTRAIT"] = 1] = "PORTRAIT";
        ORIENTATION_MODE[ORIENTATION_MODE["BOTH"] = 2] = "BOTH";
    })(ORIENTATION_MODE = partneradapterapi.ORIENTATION_MODE || (partneradapterapi.ORIENTATION_MODE = {}));
    ;
})(partneradapterapi || (partneradapterapi = {}));

 var gameConfiguration;
 (function (gameConfiguration) {
    var GameConfiguration = (function () {
        function GameConfiguration() 
		{
		}
		return GameConfiguration;
    }());
    gameConfiguration.GameConfiguration = GameConfiguration;
})(gameConfiguration || (gameConfiguration = {}));

var sessionData = (function () {
	function sessionData(playerId, sessionToken) 
	{
		this.playerId = playerId;
		this.sessionId = sessionToken;
	}
	
	sessionData.prototype.getPlayerID = function () 
	{	
		return this.playerId;
	};

	sessionData.prototype.getSessionID = function () 
	{	
		return this.sessionId;
	};	

	
	return sessionData;
}());




var gdmadapter;
(function (gdmadapter) {
    var GDMAdapter = (function () {
        function GDMAdapter(doc) 
		{
			this.doc = doc;
			
			this.windowObj = this.getwindowObj();
			doc.title = this.windowObj.getGameName().toLowerCase();
			window.processServerMsg = this.processServerMsg;
			window.gdmAdapter = this;
			
			this.gameConfiguration = new gameConfiguration.GameConfiguration;
			
			this.gameConfiguration.debug = false;
			this.gameConfiguration.gaffing = false;
			this.gameConfiguration.lang = this.windowObj.languageCode;
			var localeArr = this.windowObj.nogsLang.split('_');
			this.gameConfiguration.locale = localeArr[0].toLowerCase()+"_"+localeArr[1].toUpperCase();
			var currencyArr = this.windowObj.currencyFormat.split('|');
			this.gameConfiguration.currency = currencyArr[0].split(':')[1];
			this.gameConfiguration.operatorId = this.windowObj.opid;
			this.gameConfiguration.demo = this.windowObj.isFreeMode();
			this.gameConfiguration.webaudio = true;
			this.gameConfiguration.isRealMoney = !this.windowObj.isFreeMode();
			this.gameConfiguration.gameCode = this.windowObj.getGameName().toLowerCase();
			this.gameConfiguration.cdnRoot = "";
			this.gameConfiguration.isTouchDevice = this.windowObj.android || this.windowObj.ios;
			this.gameConfiguration.quality = this.windowObj.quality;
			this.gameConfiguration.urlParams = this.windowObj.urlParameters;
			this.game = null;
			
			var _this = this;
			var loader = new utils.ResourceLoader();
			
			loader.loadStyleSheet("common/css/fonts.css");
			loader.loadStyleSheet("common/css/betbubbles.css");
			loader.loadStyleSheet("common/css/bottombarandbettingbuttons.css");
			loader.loadStyleSheet("common/css/detectcapabilities.css");
			loader.loadStyleSheet("common/css/gamecontainer.css");
			loader.loadStyleSheet("common/css/menu.css");
			loader.loadStyleSheet("common/css/menubetlevel.css");
			loader.loadStyleSheet("common/css/modalwindow.css");
			loader.loadStyleSheet("common/css/progressbar.css");
			loader.loadStyleSheet("common/css/spinbuttons.css");
			loader.loadStyleSheet("common/css/statusbar.css");
			loader.loadStyleSheet("common/css/ticker.css");
			loader.loadStyleSheet("common/css/topbar.css");
			loader.loadStyleSheet("common/css/mediaqueries.css");
			loader.loadStyleSheet("common/css/autoplaymanager.css");
			
			loader.loadJavaScript("common/translation/"+this.gameConfiguration.locale+"/localizationsbundle.js", function () 
			{
			var locales = new translation.LocalizationsBundle();
			var pageNavigator = new utils.URLParamPageNavigator(window.location, {});
				var scrollManager;
				scrollManager = new utils.ScrollManager();
				//create a currency formatter. 
				var currencyFormatterFactory;
				currencyFormatterFactory = new stringutil.CurrencyFormatterFactory();
				var currencyFormatter = currencyFormatterFactory.createUninitialiedCurrencyFormatter();
				var clickHelper = new utils.ClickHelper(doc, _this.gameConfiguration.isTouchDevice,_this.gameConfiguration);
				_this.menuView = new menudisplayview.LeanMenuView(locales, doc, clickHelper, pageNavigator,_this.gameConfiguration, _this);
				_this.view = new displayview.LeanView(doc, clickHelper, _this.menuView, scrollManager, currencyFormatter,_this.gameConfiguration, _this);
				//this.view.setAndShowVersion(metaData.getResourceVersion());
				_this.view.setBalanceLabel(locales.getBalance());
				_this.view.setWinLabel(locales.getWin());
				_this.view.setTotalBetLabel(locales.getTotalBet());
				//create an updater to update the PA view
				_this.viewUpdater = new displayview.ViewUpdateManager(_this.view, currencyFormatter, _this);
				
				new bootstrapper.Bootstrapper(window, document, adapter, adapter.isRealMoney(), adapter.getLocale(), adapter.getGamecode(), adapter.gameConfiguration);
			});
			
			
		}
		
		GDMAdapter.prototype.getwindowObj = function () 
		{	
			return window.parent != window.self ? window.parent.window : window;
		};
		
		GDMAdapter.prototype.setGame = function (gameObj) 
		{	
			game = gameObj;
			this.game = gameObj;
			gameObj.addWinDisplayListener(new GDMAdapter.WinEventListener(this));
            gameObj.addPlatformBalanceListener(new GDMAdapter.BalanceEventListener(this));
            gameObj.addGamePlayEventListener(new GDMAdapter.GamePlayEventListener(this));

		};
		
	

		GDMAdapter.prototype.getSessionData = function ()
		{
			if(this.sessionData == null || this.sessionData == undefined)
			{
				
				this.sessionData = new sessionData(this.gameConfiguration.urlParams.playerName,this.gameConfiguration.urlParams.token);
			}
			return this.sessionData;
		};
		
		GDMAdapter.prototype.getGameDomElement = function()
		{
			return this.doc.getElementById("game");
		}
		
		GDMAdapter.prototype.showProgressBar = function ()
		{
			console.log("#########Show progress bar ");
			this.view.showProgressBar('');
		}
		
		GDMAdapter.prototype.hideProgressBar = function ()
		{
			console.log("#########hide progress bar ");
			this.view.hideProgressBar();
			this.windowObj.updateProgress(1,1);
		}
		
		GDMAdapter.prototype.gameReady = function ()
		{
			console.log("#########game Ready ");
			this.windowObj.gameReady();
			
		}		
		
		GDMAdapter.prototype.updatedLoadingProgress = function (progress)
		{
			console.log("#########Loading progress "+progress);
			this.view.updateProgressBar(progress);
			if(progress<1)
			{
				this.windowObj.updateProgress(progress,1)
			}
		}
		
        GDMAdapter.prototype.onPlatformError = function (error) 
		{
            try {
                this.game.stopAutoplay();
            }
            catch (e) {
                console.log(e);
            }
            try {
                this.game.resetHard();
            }
            catch (e) {
                console.log(e);
            }
            try {
                this.viewUpdater.resetHard();
            }
            catch (e) {
                console.log(e);
            }
			this.windowObj.delegatedErrorHandling("CRITICAL", error, true);
        };		
		
		GDMAdapter.prototype.showError = function (error)
		{
			console.log("######### Show Error "+error);
			this.onPlatformError(error);
		}
		
		GDMAdapter.prototype.handleError = function(errorCategory, errorSeverity, errorCodeString, message)
		{
			var errorType = "CRITICAL";
			if(errorCategory =="INSUFFICIENT_FUNDS"){ errorType = "NOT_ENOUGH_BALANCE";}
			var severity = errorSeverity == "ERROR";
            try {
                this.game.stopAutoplay();
            }
            catch (e) {
                console.log(e);
            }
            try {
                this.game.resetHard();
            }
            catch (e) {
                console.log(e);
            }
            try {
                this.viewUpdater.resetHard();
            }
            catch (e) {
                console.log(e);
            }
			this.windowObj.delegatedErrorHandling(errorType, message, severity);
		}
		
		GDMAdapter.prototype.getOrientation = function () 
		{	
			// ORIENTATION_MODE.PORTRAIT; ORIENTATION_MODE.BOTH; ORIENTATION_MODE.LANDSCAPE;
			return partneradapterapi.ORIENTATION_MODE.LANDSCAPE;;
		};
		
		GDMAdapter.prototype.isRealMoney = function () 
		{	
			return this.gameConfiguration.isRealMoney;
		};		

		GDMAdapter.prototype.getLocale = function () 
		{	
			return this.gameConfiguration.locale;
		};
		
		GDMAdapter.prototype.getGamecode = function () 
		{	
			return this.gameConfiguration.gameCode;
		};
		
		GDMAdapter.prototype.getCurrencyFormat = function () 
		{	
			if(this.currencyFormat == null || this.currencyFormat == undefined)
			{
				var locale = this.gameConfiguration.locale.replace("_","-");
;
				var currency = this.gameConfiguration.currency;
				
				this.currencyFormat = new currencyFormat.CurrencyFormat(currency, locale);
			}
			return this.currencyFormat.format;
		};

        GDMAdapter.prototype._setHandler = function (type, handler) 
		{
            var _this = this;
            if (typeof (handler) !== 'function')
			{
                return;
			}
			//this.gcm.regOption(type);
			if (typeof (this._handlers) === 'undefined')
			{
				this._handlers = {};
			}
			this._handlers[type] = handler;
            
            return function (newValue) {
                //_this.gcm.optionHasChanged(type, 'GAME', newValue);
				_this.windowObj.valueChanged(type,newValue);
            };
        };			

		GDMAdapter.prototype.setPreferencesHandler = function (handler)
		{
			return this._setHandler('GAME_PREFERENCES', handler);
		}
		GDMAdapter.prototype.setMuteHandler = function (handler)
		{
			return this._setHandler('MUTE', handler);
		}
		
        GDMAdapter.prototype.setMenuHandler = function (type, handler) {
            return this.view.setMenuHandler(type, handler);
        };
        GDMAdapter.prototype.formatCurrency = function (cents) {
            return this.currencyFormatter.format(cents);
        };
        GDMAdapter.prototype.onShowSettings = function () {
            this.game.pauseGame();
        };
        GDMAdapter.prototype.onHideSettings = function () {
            this.game.resumeGame();
        };


        GDMAdapter.prototype.startedPlay = function () {
            //wiGcmAdapter.gameAnimationStart();
            /*if (_super.prototype.getPlatform.call(this).getPromoInfo() != undefined) {
                _super.prototype.getPromoInfo.call(this);
            }*/
			this.viewUpdater.startedPlay();
			this.windowObj.valueChanged('ROUND',1);
        };	

		GDMAdapter.prototype.finishedPlay = function ()
		{
			this.viewUpdater.finishedPlay();
			this.windowObj.valueChanged('REEL_STOPPED',"");
		}
		
        GDMAdapter.prototype.finishedPostGameAnimations = function () {
            /*if (_super.prototype.getPlatform.call(this).getPromoInfo() != undefined) {
                console.log("[FREEROUNDS]:gameAnimationComplete(callback);");
                wiGcmAdapter.gameAnimationComplete(true); //isFreeRounds=true
            }
            else {
                wiGcmAdapter.gameAnimationComplete(false);
            }
            _super.prototype.finishedPostGameAnimations.call(this);
			"*/
			this.viewUpdater.finishedPostGameAnimations();
			this.windowObj.valueChanged('ROUND',0);
        };
		
	
		GDMAdapter.prototype.makeServerRequest = function (msgID, payload, callback, callbackObject)
		{
			console.log("Received server request "+payload);
			if(msgID == "ENDGAME")
			{
				callback("",callbackObject);
			}
			else
			{
				window.gdmAdapter = this;
				window.gdmAdapter.serverMsgCallback = callback;
				window.gdmAdapter.serverMsgCallbackObj = callbackObject;
				window.processServerMsg = this.processServerMsg;
				this.windowObj.sendMsgToServer(payload);
			}
		}
		
		GDMAdapter.prototype.processServerMsg = function (payload)
		{
			if( window.gdmAdapter.serverMsgCallback != null && window.gdmAdapter.serverMsgCallback != undefined && window.gdmAdapter.serverMsgCallbackObj != null && window.gdmAdapter.serverMsgCallbackObj != undefined)
			{
				window.gdmAdapter.serverMsgCallback(payload,window.gdmAdapter.serverMsgCallbackObj);
			}

		}
		
		GDMAdapter.prototype.paidUpdate = function (win)
		{
			this.windowObj.valueChanged("TOTAL_WIN",win);
		}
		
		GDMAdapter.prototype.updateBet = function (bet)
		{
			this.viewUpdater.setTotalBet(bet,"GDM_ADAPTER");
			this.windowObj.valueChanged("TOTAL_BET",bet);
		}
		
        GDMAdapter.prototype.onShowSettings = function () {
            this.game.pauseGame();
        };
        GDMAdapter.prototype.onHideSettings = function () {
            this.game.resumeGame();
        };		

		GDMAdapter.prototype.balancesUpdate = function (splitBalances)
		{
			this.windowObj.valueChanged("BALANCE",splitBalances.CASH.amount);
		}

		GDMAdapter.prototype.gameInitialized = function (splitBalances, isResumeGame)
		{
			this.isRecovering = isResumeGame;
		}
		
		var WinEventListener = (function () {
			function WinEventListener(gdmAdapter) {
				this.gdmAdapter = gdmAdapter;
			}
			WinEventListener.prototype.handleWinDisplayEvent = function (event) {
				console.log("Win display event received!");
				if (event.winAmount === NaN) {
					throw new TypeError("Win amount must be a number.");
				}
				this.gdmAdapter.paidUpdate(event.winAmount);
			};
			return WinEventListener;
		}());
		GDMAdapter.WinEventListener = WinEventListener;
		
		var BalanceEventListener = (function () {
			function BalanceEventListener(gdmAdapter) {
				this.gdmAdapter = gdmAdapter;
			}
			BalanceEventListener.prototype.handlePlatformDisplayEvent = function (event) {
				console.log("Platform balance event received.");
				var splitBalances = {
					"CASH": { "amount": event.CASH  },
					"BONUS": { "amount": event.FREEBET  }
				};
				this.gdmAdapter.balancesUpdate(splitBalances);
			};
			return BalanceEventListener;
		}());
		GDMAdapter.BalanceEventListener = BalanceEventListener;
		
		var GamePlayEventListener = (function () {
			function GamePlayEventListener(gdmAdapter) {
				this.gdmAdapter = gdmAdapter;
			}
			GamePlayEventListener.prototype.handleGameInitializedEvent = function (event) {
				this.gdmAdapter.gameInitialized(new displayview.SplitBalances(event.CASH , event.FREEBET ), event.isResumeGame);
			};
			return GamePlayEventListener;
		}());
		GDMAdapter.GamePlayEventListener = GamePlayEventListener;
		
		return GDMAdapter;
    }());
    gdmadapter.GDMAdapter = GDMAdapter;
})(gdmadapter || (gdmadapter = {}));
 
 function apiExt() {
    if (!(1 > arguments.length)) {
        var b = 1 < arguments.length ? arguments[1] : "";
        switch (arguments[0]) {
        case "JSON_TO_GDM_GSD":
            return translateGSD("JSON_GDM", b);
        case "GDM_TO_JSON_GSD":
            return translateGSD("GDM_JSON", b);
        case "AUTOPLAY_TOTAL":
            return game.autoPlayGamesToPlay;
        case "AUTOPLAY_CURRENT":
            return game.autoPlayGames;
        case "AUTOPLAY_MODE":
            return game.autoPlay;
        case "SET_BALANCE":
            return setBalance(b),
            "";
        case "SET_HISTORY_MODE":
            game.setHistoryMode(Boolean(b));
            break;
        case "SERVER_ERROR":
            return "function" === typeof b ? handleServerError(b) : handleServerError(),
            "";
        case "SHOW_GAME_INFO":
            (game.gameState == SS_STOPPED || game.gameState == SS_WIN_PAYLINE) && !(game.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && (!(game.slotResult.winType & WT_FEATURE_TRIGGER) && !game.autoPlay) && game.uapi_info();
            break;
        case "SHOW_SETTINGS":
            (game.gameState == SS_STOPPED || game.gameState == SS_WIN_PAYLINE) && !(game.slotResult.winType & WT_PICK_FEATURE_TRIGGER) && (!(game.slotResult.winType & WT_FEATURE_TRIGGER) && !game.autoPlay) && togglePanel();
            break;
        case "SET_MENU_BTN_SWITCH":
            game.ui.setHomeBtnMidRoundState(b);
            break;
        case "MSG_POP_UP":
            4 == arguments.length ? handlePopUp(arguments[1], arguments[2], arguments[3]) : 3 == arguments.length && handlePopUp(arguments[1], arguments[2]);
            break;
        case "CONFIRM_POP_UP":
            handleConfirmPopUp(arguments[1], arguments[2], arguments[3]);
            break;
        case "SET_ONE_PICK_ME_GAME":
            feature.apiSetOneGame();
            break;
        case "SET_PICK_ME_WIN_AMOUNT":
            feature.apiSetPrize(arguments[1], arguments[2]);
            break;
        case "SET_MAX_AUTOPLAYS":
            game.maxAutoPlays = 5 * Math.floor(Number(arguments[1] / 5));
            game.useUI3 && game.ui.autoPlayMan.setMaxAutoPlays(game.maxAutoPlays);
            break;
        case "SET_AUTOPLAY_STOP_OPTIONS":
            game.useUI3 && game.ui.autoPlayMan.setMandatory(arguments[1]);
            break;
        case "PLAY_SLOT":
            handlePlaySlotPopUp(arguments[1], arguments[2], arguments[3]);
            break;
        case "SHOW_CASHIER_BUTTON":
            "undefined" !== typeof game.ui.setCashierVisibility && game.ui.setCashierVisibility(b);
            break;
        case "SHOW_BUTTON":
            game.useUI3 && "CASHIER_SETTINGS" == arguments[1] && game.ui.setCashierSettingsVisibility(Boolean(arguments[2]));
            "PLAY_SLOT" == arguments[1] && (game.showPlaySlotBtn = arguments[2]);
            break;
        case "SHOW_HOME_BUTTON":
            //"undefined" !== typeof game.ui.setHomeVisibility && game.ui.setHomeVisibility(b);
            break;
        case "SHOW_CLOCK":
            game.clock.enabled = !0 == arguments[1] ? !0 : !1;
            break;
        case "HIDE_PORTRAIT_MODE":
            "undefined" !== typeof game.showPortraitMode && game.showPortraitMode(b);
            break;
        case "SHOW_RTP":
            game.showRTP = !0 == arguments[1] ? !0 : !1;
            break;
        case "SET_CLIENT_PLATFORM":
            "undefined" !== typeof game.setGameClientPlatform && (3 == arguments.length ? game.setGameClientPlatform(arguments[1], arguments[2]) : 2 == arguments.length && game.setGameClientPlatform(arguments[1]));
            break;
        case "ENABLE_ALL_UI":
            !0 == arguments[1] ? game.gameRevealed():null;
            break;
        case "SET_MUTE":
            !0 == arguments[1] ? window.gdmAdapter._handlers["MUTE"](true) : window.gdmAdapter._handlers["MUTE"](false);
            break;
        case "PAUSE_AUTOPLAY":
            !0 == arguments[1] ? game.stopAutoPaly(!0) : game.stopAutoPaly(!1);
            break;
        case "TEMP_PAUSE_AUTOPLAY":
            //!0 == arguments[1] ? game.pauseAutoPlay(!0) : game.pauseAutoPlay(!1);
            break;
        case "GDM_ERROR_POP_UP":
            3 == arguments.length ? handlePopUp(TXT_ERROR, parseErrorMsg(arguments[1]), arguments[2]) : 2 == arguments.length && handlePopUp(TXT_ERROR, parseErrorMsg(arguments[1]));
            break;
        case "GET_ERROR_MESSAGE":
            return parseErrorMsg(arguments[1]);
        case "GET_MIN_BET":
            return game.getMinimumBet();
        case "SET_CREDIT_CURRENCY":
            "undefined" !== typeof game.account.setDisplayAsCredits && game.account.setDisplayAsCredits(arguments[1]);
            break;
        case "SET_CLOCK_SIZE":
            "undefined" !== typeof game.clock.setClockSize && game.clock.setClockSize(arguments[1]);
            break;
        case "SET_GAME_MARGIN":
            "undefined" !== typeof game.setGameMargin && ("0" == arguments[1] ? game.setGameMargin(60) : "1" == arguments[1] ? game.setGameMargin(30) : "2" == arguments[1] && game.setGameMargin(0));
            break;
        case "INSUFFICIENT_BALANCE_POP_UP":
            game.message.messageBox(TXT_WARNING, TXT_NOT_ENOUGH_BALANCE, [this.message.BTN_OK], arguments[1]);
            break;
        case "CUSTOMIZED_BUTTONS_POP_UP":
            5 == arguments.length && handleCustomizedButtonPopUp(arguments[1], arguments[2], arguments[3], arguments[4]);
            break;
        case "GET_ROUND_TOTAL_WIN":
            return game.slotResult.winAmount;
        case "ENABLE_GAME_PLAY":
            !0 == arguments[1] ? (game.enableGamePlay(!0),
            game.enableAllUI(!0)) : (game.enableAllUI(!1),
            game.enableGamePlay(!1));
            break;
        case "UNMUTE_GAME_SOUND":
            !0 == arguments[1] ? game.setVolume(1) : game.setVolume(0);
            break;
        case "GET_GAME_NAME":
            return document.title;
        default:
            return ""
        }
    }
}