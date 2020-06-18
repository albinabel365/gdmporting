define(["require", "exports", "events/events", "game-data/game-data", "http-connection/http-connection"], function (require, exports, events, gamedata, httpconnection) {
    var msgIndex = 0;
	
    /**
     * @class gls-comms.PlatformInitData
     * @classdesc Platform data from Init request
     */
    var PlatformInitData = (function () {
        /**
         * @constructor
         */
        function PlatformInitData() {
            this.currencyMultiplier = 1;
            this.isRecovering = false;
        }
        /**
         * Set session id
         * @method gls-comms.PlatformInitData#setSessionId
         * @public
         * @param {string} sessionId Session id
         */
        PlatformInitData.prototype.setSessionId = function (sessionId) {
            this.sessionId = sessionId;
        };
        /**
         * Accessor for session id
         * @method gls-comms.PlatformInitData#getSessionId
         * @returns {string} Session id
         */
        PlatformInitData.prototype.getSessionId = function () {
            return this.sessionId;
        };
        /**
         * Set game id
         * @method gls-comms.PlatformInitData#setGameId
         * @public
         * @param {string} gameId Game id
         */
        PlatformInitData.prototype.setGameId = function (gameId) {
            this.gameId = gameId;
        };
        /**
         * Accessor for game id
         * @method gls-comms.PlatformInitData#getGameId
         * @returns {string} Game id
         */
        PlatformInitData.prototype.getGameId = function () {
            return this.gameId;
        };
        /**
         * Set language code
         * @method gls-comms.PlatformInitData#setLanguageCode
         * @public
         * @param {string} languageCode Session id
         */
        PlatformInitData.prototype.setLanguageCode = function (languageCode) {
            this.languageCode = languageCode;
        };
        /**
         * Accessor for language code
         * @method gls-comms.PlatformInitData#getLanguageCode
         * @returns {string} Language code
         */
        PlatformInitData.prototype.getLanguageCode = function () {
            return this.languageCode;
        };
        /**
         * Set game version
         * @method gls-comms.PlatformInitData#setVersion
         * @public
         * @param {string} version Game version
         */
        PlatformInitData.prototype.setVersion = function (version) {
            this.version = version;
        };
        /**
         * Accessor for game version
         * @method gls-comms.PlatformInitData#getVersion
         * @returns {string} Game version
         */
        PlatformInitData.prototype.getVersion = function () {
            return this.version;
        };
        /**
         * Set currency multiplier. Passing in an invalid multiplier will not modify the existing value.
         * @method gls-comms.PlatformInitData#setCurrencyMultiplier
         * @public
         * @param {number} multiplier Currency multiplier
         */
        PlatformInitData.prototype.setCurrencyMultiplier = function (multiplier) {
            if (multiplier != null) {
                this.currencyMultiplier = multiplier;
            }
        };
        /**
         * Accessor for currency multiplier
         * @method gls-comms.PlatformInitData#getCurrencyMultiplier
         * @returns {number} Currency multiplier
         */
        PlatformInitData.prototype.getCurrencyMultiplier = function () {
            return this.currencyMultiplier;
        };
        /**
         * Set currency formatting data
         * @method gls-comms.PlatformInitData#setCurrencyFormat
         * @public
         * @param {locale.ICurrencyData} currencyFormat Current formatting data
         */
        PlatformInitData.prototype.setCurrencyFormat = function (currencyFormat) {
            this.currencyFormat = currencyFormat;
        };
        /**
         * Accessor for currency formatting data
         * @method gls-comms.PlatformInitData#getCurrencyFormat
         * @returns {string} Currency formatting data
         */
        PlatformInitData.prototype.getCurrencyFormat = function () {
            return this.currencyFormat;
        };
        /**
         * Set recovery flag
         * @method gls-comms.PlatformInitData#setIsRecovering
         * @public
         * @param {boolean} isRecovering True if recovering from historical data, false if playing with new data
         */
        PlatformInitData.prototype.setIsRecovering = function (isRecovering) {
            this.isRecovering = isRecovering;
        };
        /**
         * Accessor for recovery flag
         * @method gls-comms.PlatformInitData#isRecovering
         * @returns {booleam} True if recovering from historical data, false if playing with new data
         */
        PlatformInitData.prototype.getIsRecovering = function () {
            return this.isRecovering;
        };
        return PlatformInitData;
    })();
    exports.PlatformInitData = PlatformInitData;
	
    /**
     * @class gdm-comms.PlatformInitData
     * @classdesc Platform data from Init request
     */
    var PlatformInitRequest = (function () {
        /**
         * @constructor
         */
        function PlatformInitRequest() {
            this.msgID = "INIT";
        }
        /**
         * Set session id
         * @method gdm-comms.PlatformInitData#setSessionId
         * @public
         * @param {string} sessionId Session id
         */
        PlatformInitRequest.prototype.setSessionId = function (sessionId) {
            this.sessionId = sessionId;
        };
        /**
         * Accessor for session id
         * @method gdm-comms.PlatformInitData#getSessionId
         * @returns {string} Session id
         */
        PlatformInitRequest.prototype.getSessionId = function () {
            return this.sessionId;
        };
        /**
         * Set game id
         * @method gdm-comms.PlatformInitData#setGameId
         * @public
         * @param {string} gameId Game id
         */
        PlatformInitRequest.prototype.setGameId = function (gameId) {
            this.gameId = gameId;
        };
        /**
         * Accessor for game id
         * @method gdm-comms.PlatformInitData#getGameId
         * @returns {string} Game id
         */
        PlatformInitRequest.prototype.getGameId = function () {
            return this.gameId;
        };
		
        /**
         * Set player id
         * @method gdm-comms.PlatformInitData#setGameId
         * @public
         * @param {string} playerId Player id
         */
        PlatformInitRequest.prototype.setPlayerId = function (playerId) {
            this.playerId = playerId;
        };
        /**
         * Accessor for plaeyer id
         * @method gdm-comms.PlatformInitData#getGameId
         * @returns {string} Player id
         */
        PlatformInitRequest.prototype.getPlayerId = function () {
            return this.playerId;
        };		

		//GN=foxinwinshq&amp;PID=gdmgcm495b091d-73e0-4cbf-8457-95a283910a3b&amp;MSGID=INIT&amp;MSGINDEX=1&amp;
        PlatformInitRequest.prototype.toRequestPayload = function () {
            var payload = "GN="+this.gameId+"&PID="+this.playerId+this.sessionId+"&MSGID="+this.msgID+"&MSGINDEX="+msgIndex+"&";
			msgIndex++;
			return payload;
        };
		
        return PlatformInitRequest;
    })();
    exports.PlatformInitRequest = PlatformInitRequest;
	
    /**
     * @class gdm-comms.PlatformInitData
     * @classdesc Platform data from Init request
     */
    var PlatformReelStripRequest = (function () {
        /**
         * @constructor
         */
        function PlatformReelStripRequest() {
            this.msgID = "REELSTRIP";
        }
        /**
         * Set session id
         * @method gdm-comms.PlatformInitData#setSessionId
         * @public
         * @param {string} sessionId Session id
         */
        PlatformReelStripRequest.prototype.setSessionId = function (sessionId) {
            this.sessionId = sessionId;
        };
        /**
         * Accessor for session id
         * @method gdm-comms.PlatformInitData#getSessionId
         * @returns {string} Session id
         */
        PlatformReelStripRequest.prototype.getSessionId = function () {
            return this.sessionId;
        };
        /**
         * Set game id
         * @method gdm-comms.PlatformInitData#setGameId
         * @public
         * @param {string} gameId Game id
         */
        PlatformReelStripRequest.prototype.setGameId = function (gameId) {
            this.gameId = gameId;
        };
        /**
         * Accessor for game id
         * @method gdm-comms.PlatformInitData#getGameId
         * @returns {string} Game id
         */
        PlatformReelStripRequest.prototype.getGameId = function () {
            return this.gameId;
        };
		
        /**
         * Set player id
         * @method gdm-comms.PlatformInitData#setGameId
         * @public
         * @param {string} playerId Player id
         */
        PlatformReelStripRequest.prototype.setPlayerId = function (playerId) {
            this.playerId = playerId;
        };
        /**
         * Accessor for plaeyer id
         * @method gdm-comms.PlatformInitData#getGameId
         * @returns {string} Player id
         */
        PlatformReelStripRequest.prototype.getPlayerId = function () {
            return this.playerId;
        };		

		//GN=foxinwinshq&amp;PID=gdmgcm495b091d-73e0-4cbf-8457-95a283910a3b&amp;MSGID=INIT&amp;MSGINDEX=1&amp;
        PlatformReelStripRequest.prototype.toRequestPayload = function () {
            var payload = "GN="+this.gameId+"&PID="+this.playerId+this.sessionId+"&MSGID="+this.msgID+"&MSGINDEX="+msgIndex+"&";
			msgIndex++;
			return payload;
        };
		
        return PlatformReelStripRequest;
    })();
    exports.PlatformReelStripRequest = PlatformReelStripRequest;	
	
    /**
     * @class InitResponse
     * @classdesc Data received in response to Init request
     */
    var InitResponse = (function () {
        /**
         * @constructor
         */
        function InitResponse(platformData, balanceData) {
            this.gameData = new gamedata.GameInitData();
            this.platformData = platformData;
            this.balances = balanceData;
        }
        /**
         * Accessor for game data
         * @method gdm-comms.InitResponse#getGameData
         * @public
         * @returns {GameInitData} Game data
         */
        InitResponse.prototype.getGameData = function () {
            return this.gameData;
        };
        /**
         * Accessor for platform data
         * @method gdm-comms.InitResponse#getPlatformData
         * @public
         * @returns {PlatformInitData} Platform data
         */
        InitResponse.prototype.getPlatformData = function () {
            return this.platformData;
        };
        /**
         * Retrieve specific type of balance amount
         * @method gdm-comms.InitResponse#getBalance
         * @public
         * @param {string} type Balance type
         * @returns {number} Value of specific balance
         */
        InitResponse.prototype.getBalance = function (type) {
            if (type === void 0) { type = 0 /* CASH_BALANCE */; }
            return this.balances.getBalance(type);
        };
        return InitResponse;
    })();
    exports.InitResponse = InitResponse;	


	
    /**
     * @class gdm-comms.PlatformInitData
     * @classdesc Platform data from Init request
     */
    var PlatformBetRequest = (function () {
        /**
         * @constructor
         */
        function PlatformBetRequest() {
            this.msgID = "BET";
        }
        /**
         * Set session id
         * @method gdm-comms.PlatformInitData#setSessionId
         * @public
         * @param {string} sessionId Session id
         */
        PlatformBetRequest.prototype.setSessionId = function (sessionId) {
            this.sessionId = sessionId;
        };
        /**
         * Accessor for session id
         * @method gdm-comms.PlatformInitData#getSessionId
         * @returns {string} Session id
         */
        PlatformBetRequest.prototype.getSessionId = function () {
            return this.sessionId;
        };
        /**
         * Set game id
         * @method gdm-comms.PlatformInitData#setGameId
         * @public
         * @param {string} gameId Game id
         */
        PlatformBetRequest.prototype.setGameId = function (gameId) {
            this.gameId = gameId;
        };
        /**
         * Accessor for game id
         * @method gdm-comms.PlatformInitData#getGameId
         * @returns {string} Game id
         */
        PlatformBetRequest.prototype.getGameId = function () {
            return this.gameId;
        };
		
        /**
         * Set player id
         * @method gdm-comms.PlatformInitData#setGameId
         * @public
         * @param {string} playerId Player id
         */
        PlatformBetRequest.prototype.setPlayerId = function (playerId) {
            this.playerId = playerId;
        };
        /**
         * Accessor for plaeyer id
         * @method gdm-comms.PlatformInitData#getGameId
         * @returns {string} Player id
         */
        PlatformBetRequest.prototype.getPlayerId = function () {
            return this.playerId;
        };

        PlatformBetRequest.prototype.setCreditBet = function (creditBet) {
            this.creditBet = creditBet;
        };
	    
        PlatformBetRequest.prototype.getCreditBet = function () {
            return this.creditBet;
        };

        PlatformBetRequest.prototype.setBetMultiplier = function (betMultiplier) {
            this.betMultiplier = betMultiplier;
        };
	    
        PlatformBetRequest.prototype.getBetMultiplier = function () {
            return this.betMultiplier;
        };

        PlatformBetRequest.prototype.setCurrencyMultiplier = function (currencyMultiplier) {
            this.currencyMultiplier = currencyMultiplier;
        };
	    
        PlatformBetRequest.prototype.getCurrencyMultiplier = function () {
            return this.currencyMultiplier;
        };		
		//GN=foxinwinshq&amp;PID=gdmgcm495b091d-73e0-4cbf-8457-95a283910a3b&amp;MSGID=INIT&amp;MSGINDEX=1&amp;
        PlatformBetRequest.prototype.toRequestPayload = function () {
            var payload = "GN="+this.gameId+"&PID="+this.playerId+"&MSGID="+this.msgID+"&MSGINDEX="+msgIndex+"&creditBet="+this.creditBet+"&betMulti="+this.betMultiplier+"&currencyMulti="+this.currencyMultiplier+"&";
			msgIndex++;
			return payload;
        };
		
        return PlatformBetRequest;
    })();
    exports.PlatformBetRequest = PlatformBetRequest;	
    /**
     * Entry point for making HTTP requests to GDM endpoint
     * @class GDMRequestor
     * @classdesc Encapsulating functionality to make GDM requests
     */
    var GDMRequestor = (function () {
        /**
         * @constructor
         */
        function GDMRequestor(metadata, sessionData, glmDescription, gdmAdapter) {
            /**
             * Message type for Init request/response
             * @member gdm-comms.GDMRequestor#MSG_INIT
             * @private
             * @type {string}
             */
            this.MSG_INIT = "INIT";
			
           /**
             * Message type for REELSTRIP request/response
             * @member gdm-comms.GDMRequestor#MSG_INIT
             * @private
             * @type {string}
             */
            this.MSG_REELSTRIP = "REELSTRIP";

			
            /**
             * Message type for Play request/response
             * @member gdm-comms.GDMRequestor#MSG_PLAY
             * @private
             * @type {string}
             */
            this.MSG_PLAY = "BET";
            /**
             * Message type for End request/response
             * @member gdm-comms.GDMRequestor#MSG_END
             * @private
             * @type {string}
             */
            this.MSG_END = "ENDGAME";
			
			this.gdmAdapter = gdmAdapter;
			
            this.metadata = metadata;
            this.sessionData = sessionData;
            this.glmDescription = glmDescription;
            this.endPoint = this.metadata.getLogicUrl();
            this.signal = {
                onInitResponse: null,
                onPlayResponse: null,
                onEndResponse: null,
                onError: null
            };
            this.eventDispatcher = new events.EventDispatcher(this.signal);
            this.gdmServerSessionId = sessionData.getSessionID();
            this.parserFactory = new ResponseXMLParserFactory;
			
			this.initResponse = null;
        }
        /**
         * Configure GDMRequestor with platform data
         * @method gdm-comms.GDMRequestor#configure
         * @public
         * @param {PlatformInitData} platformInitData Platform data received after initializtaion request
         */
        GDMRequestor.prototype.configure = function (platformInitData) {
            this.platformInitData = platformInitData;
        };
        /**
         * Set a custom response XML parser
         * @method gdm-comms.GDMRequestor#setXMLParserFactory
         * @public
         * @param {IResponseXMLParserFactory} factory Custom response XML parser
         */
        GDMRequestor.prototype.setXMLParserFactory = function (factory) {
            this.parserFactory = factory;
        };
        /**
         * Retrieve event dispatcher to add listeners
         * @method gdm-comms.GDMRequestor#getEvents
         * @public
         * @returns {events.EventDispatcher<IGDMRequestListener>} GDMRequestor event dispatcher
         */
        GDMRequestor.prototype.getEvents = function () {
            return this.eventDispatcher;
        };
        /**
         * Make Init request to GDM endpoint
         * @method gdm-comms.GDMRequestor#makeInitRequest
         * @public
         * @param {ICustomGDMPayload[]} requestData Request payload
         */
        GDMRequestor.prototype.makeInitRequest = function () {
            var _this = this;
			request = new PlatformInitRequest();
			sessionData = this.gdmAdapter.getSessionData();
			request.setPlayerId(sessionData.getPlayerID());
			request.setSessionId(sessionData.getSessionID());
			request.setGameId(this.gdmAdapter.gameConfiguration.gameCode);
			var response = this.gdmAdapter.makeServerRequest(this.MSG_INIT, request.toRequestPayload(), this.processInitResponse, this);
			//this.processInitResponse(response.responseText);
            /*if (requestData === void 0) { requestData = []; }
            var gdmHeader = new GDMRequestHeader(this.metadata, this.sessionData, this.glmDescription, this.gdmServerSessionId, this.platformInitData);
            var gdmPayload = new GDMRequestData(this.MSG_INIT, gdmHeader);
            requestData.forEach(function (r) {
                gdmPayload.addCustomPayload(r);
            });
            var factory = new httpconnection.HttpConnectionFactory();
            var connection = factory.createConnection(this.endPoint, gdmPayload.toXMLString(), 1 /* POST *///);
            /*connection.getEvents().add({
                onComplete: function (url, response, responseHeaders) {
                    _this.requestObject = response;
                    _this.processInitResponse(url, response.responseText, responseHeaders);
                },
                onFail: function (url, error, status) {
                    _this.processError(url, error, status);
                },
                onProgress: null
            });
            connection.send();*/
        };
		
        /**
         * Process response from Init request
         * @method GDMRequestor#processInitRequest
         * @private
         * @param {string} payload Request payload
         * @param {string} response Response contents
         * @param {string} responseHeaders Response headers
         */
        GDMRequestor.prototype.processInitResponse = function (response, caller) {
            var _this = caller;
			var xmlParser = new DOMParser();
            var xmlDoc = xmlParser.parseFromString(response, "text/xml");
            var msgType = _this.extractMessageType(xmlDoc);
            if (msgType.toUpperCase() == _this.MSG_INIT) {
                var parser = _this.parserFactory.createInitParser();
                var output = parser.parse(xmlDoc);
				output.getPlatformData().setCurrencyFormat(_this.gdmAdapter.getCurrencyFormat());
				output.getPlatformData().setCurrencyMultiplier(parseInt(_this.gdmAdapter.getCurrencyFormat().currencyMultiplier,10));
                _this.gdmServerSessionId = _this.gdmAdapter.getSessionData().getSessionID();
				_this.initResponse = output;
				_this.makeReelStripRequest();
                //this.signal.onInitResponse(output);
            }
            else {
                _this.processGDMError(xmlDoc);
            }
        };	


        GDMRequestor.prototype.makeReelStripRequest = function () 
		{
            var _this = this;
			request = new PlatformReelStripRequest();
			sessionData = this.gdmAdapter.getSessionData();
			request.setPlayerId(sessionData.getPlayerID());
			request.setSessionId(sessionData.getSessionID());
			request.setGameId(this.gdmAdapter.gameConfiguration.gameCode);
			var response = this.gdmAdapter.makeServerRequest(this.MSG_REELSTRIP, request.toRequestPayload(), this.processReelStripResponse, this);
		
		};
		
		GDMRequestor.prototype.processReelStripResponse = function (response, caller) 
		{
			var _this = caller;
            var xmlParser = new DOMParser();
            var xmlDoc = xmlParser.parseFromString(response, "text/xml");
			var parser = _this.parserFactory.createReelStripParser();
			var output = parser.parse(xmlDoc, _this.initResponse);
			_this.signal.onInitResponse(output);
		
		};
        /**
         * Make Play request to GDM endpoint
         * @method gdm-comms.GDMRequestor#makePlayRequest
         * @public
         * @param {ICustomGDMPayload[]} requestData Request payload
         * @param {object} customHeaders contains custom key/value to be send in gdm request
         */
        GDMRequestor.prototype.makePlayRequest = function (requestData, customHeaders) {
             var _this = this;
			request = new PlatformBetRequest();
			sessionData = this.gdmAdapter.getSessionData();
			request.setPlayerId(sessionData.getPlayerID());
			request.setSessionId(sessionData.getSessionID());
			request.setGameId(this.gdmAdapter.gameConfiguration.gameCode);
			request.setCurrencyMultiplier(this.gdmAdapter.getCurrencyFormat().currencyMultiplier);
			request.setBetMultiplier(requestData[0].betPerUnit);
			request.setCreditBet(requestData[0].betMultiplier);
			var response = this.gdmAdapter.makeServerRequest(this.MSG_PLAY, request.toRequestPayload(), this.processPlayResponse, this);
           
			
			/*var _this = this;
            if (requestData === void 0) { requestData = []; }
            var gdmHeader = new GDMRequestHeader(this.metadata, this.sessionData, this.glmDescription, this.gdmServerSessionId, this.platformInitData);
            gdmHeader.addCustomHeaders(customHeaders);
            var gdmPayload = new GDMRequestData(this.MSG_PLAY, gdmHeader);
            gdmPayload.addCustomPayload(new CurrencyMultiplierPayload(this.platformInitData.getCurrencyMultiplier()));
            requestData.forEach(function (r) {
                gdmPayload.addCustomPayload(r);
            });
            var factory = new httpconnection.HttpConnectionFactory();
            var connection = factory.createConnection(this.endPoint, gdmPayload.toXMLString(), 1 /* POST *///);
            /*connection.getEvents().add({
                onComplete: function (url, response, responseHeaders) {
                    _this.requestObject = response;
                    _this.processPlayResponse(url, response.responseText, responseHeaders);
                },
                onFail: function (url, error, status) {
                    _this.processError(url, error, status);
                },
                onProgress: null
            });
            connection.send();*/
        };
		
        /**
         * Process response from Play request
         * @method gdm-comms.GDMRequestor#processPlayRequest
         * @private
         * @param {string} payload Request payload
         * @param {string} response Response contents
         * @param {string} responseHeaders Response headers
         */
        GDMRequestor.prototype.processPlayResponse = function (response, caller) {
            var _this = caller;
			var xmlParser = new DOMParser();
            var xmlDoc = xmlParser.parseFromString(response, "text/xml");
            var msgType = _this.extractMessageType(xmlDoc);
            if (msgType.toUpperCase() == _this.MSG_PLAY) {
                var parser = _this.parserFactory.createPlayParser();
                var output = parser.parse(xmlDoc);
                _this.gdmServerSessionId = _this.gdmAdapter.getSessionData().getSessionID();
                _this.signal.onPlayResponse(output);
            }
            else {
                _this.processGDMError(xmlDoc);
            }
        };		
		
        /**
         * Make Play request to GDM endpoint
         * @method gdm-comms.GDMRequestor#makePlayRequest
         * @public
         * @param {ICustomGDMPayload[]} requestData Request payload
         * @param {object} customHeaders contains custom key/value to be send in gdm request
         */
        GDMRequestor.prototype.makeEndRequest = function (requestData, customHeaders) {
            /*var _this = this;
            if (requestData === void 0) { requestData = []; }
            var gdmHeader = new GDMRequestHeader(this.metadata, this.sessionData, this.glmDescription, this.gdmServerSessionId, this.platformInitData);
            gdmHeader.addCustomHeaders(customHeaders);
            var gdmPayload = new GDMRequestData(this.MSG_END, gdmHeader);
            requestData.forEach(function (r) {
                gdmPayload.addCustomPayload(r);
            });
            var factory = new httpconnection.HttpConnectionFactory();
            var connection = factory.createConnection(this.endPoint, gdmPayload.toXMLString(), 1 /* POST *///);
            /*connection.getEvents().add({
                onComplete: function (url, response, responseHeaders) {
                    _this.requestObject = response;
                    _this.processEndResponse(url, response.responseText, responseHeaders);
                },
                onFail: function (url, error, status) {
                    _this.processError(url, error, status);
                },
                onProgress: null
            });
            connection.send();*/
            var _this = this;
			request = new PlatformInitRequest();
			sessionData = this.gdmAdapter.getSessionData();
			request.setPlayerId(sessionData.getPlayerID());
			request.setSessionId(sessionData.getSessionID());
			request.setGameId(this.gdmAdapter.gameConfiguration.gameCode);
			var response = this.gdmAdapter.makeServerRequest(this.MSG_END, request.toRequestPayload(), this.processEndResponse, this);
        };

       /**
         * Process response from Play request
         * @method gdm-comms.GDMRequestor#processPlayRequest
         * @private
         * @param {string} payload Request payload
         * @param {string} response Response contents
         * @param {string} responseHeaders Response headers
         */
		 GDMRequestor.prototype.processEndResponse = function (response, caller)
		 {
			 var _this = caller;
			 _this.signal.onEndResponse(null);
		 }
		 
        /*GDMRequestor.prototype.processEndResponse = function (url, response, responseHeaders) {
            var xmlParser = new DOMParser();
            var xmlDoc = xmlParser.parseFromString(response, "text/xml");
            var msgType = this.extractMessageType(xmlDoc);
            if (msgType == this.MSG_END) {
                var parser = this.parserFactory.createEndParser();
                var output = parser.parse(xmlDoc);
                this.gdmServerSessionId = output.getPlatformData().getSessionId();
                this.signal.onEndResponse(output);
            }
            else {
                this.processGDMError(url, xmlDoc);
            }
        };*/		
		
		
        GDMRequestor.prototype.getRequestObject = function () {
            return this.requestObject;
        };


 
        /**
         * Extract message type from reponse XML
         * @method gdm-comms.GDMRequestor#extractMessageType
         * @private
         * @param {Document} xml Response XML
         * @returns {string} Message type
         */
        GDMRequestor.prototype.extractMessageType = function (xml) {
            return (xml.getElementsByTagName("GameResponse")[0]).attributes.getNamedItem("type").value;
        };
        /**
         * Process error message in GDM response
         * @method gdm-comms.GDMRequestor#processGDMError
         * @private
         * @param {string} url Request URL
         * @param {Document} xml Response XML
         */
        GDMRequestor.prototype.processGDMError = function (xml) {
            var parentNode = xml.getElementsByTagName("GameResponse")[0];
            var errorNode = parentNode.firstChild;
            var message = errorNode.attributes.getNamedItem("msg").value;
            var code = parseInt(errorNode.attributes.getNamedItem("instruction").value, 10);
            this.signal.onError("", message, code);
        };
        /**
         * Process request error
         * @method gdm-comms.GDMRequestor#processError
         * @private
         * @param {string} url Request url
         * @param {string} error Error description
         * @param {number} status Error status
         */
        GDMRequestor.prototype.processError = function (url, error, status) {
            this.signal.onError(url, error, status);
        };
        return GDMRequestor;
    })();
    exports.GDMRequestor = GDMRequestor;

	
	/**
     * Custom payload for gaffing the reels (force)
     * @class gdm-comms.GaffPayload
     * @classdesc Payload for gaff positions
     */
    var GaffPayload = (function () {
        /**
         * @constructor
         */
        function GaffPayload(stopPositions, reelSetIndex) {
            this.stopPositions = stopPositions;
            this.reelSetIndex = reelSetIndex;
        }
        /**
         * Convert custom payload data into XML
         * @method gdm-comms.GaffPayload#toXML
         * @returns {Document} XML formatted data
         */
        GaffPayload.prototype.toXML = function () {
            var xmlDoc = document.implementation.createDocument("", "FORCE", null);
            var spinElement = xmlDoc.createElement("ReelSpin");
            var reelsetAttr = document.createAttribute("reelsetIndex");
            reelsetAttr.value = this.reelSetIndex.toString();
            spinElement.attributes.setNamedItem(reelsetAttr);
            var stopsAttr = document.createAttribute("stopIndices");
            stopsAttr.value = this.stopPositions.join('|');
            spinElement.attributes.setNamedItem(stopsAttr);
            xmlDoc.documentElement.appendChild(spinElement);
            return xmlDoc;
        };
        return GaffPayload;
    })();
    exports.GaffPayload = GaffPayload;
    /**
     * @class EndResponse
     * @classdesc Data received in response to End request
     */
    var EndResponse = (function () {
        /**
         * @constructor
         */
        function EndResponse(platformData, balanceData) {
            this.platformData = platformData;
            this.balances = balanceData;
        }
        /**
         * Accessor for platform data
         * @method gdm-comms.EndResponse#getPlatformData
         * @public
         * @returns {PlatformEndData} Platform data
         */
        EndResponse.prototype.getPlatformData = function () {
            return this.platformData;
        };
        /**
         * Retrieve specific type of balance amount
         * @method gdm-comms.EndResponse#getBalance
         * @public
         * @param {string} type Balance type
         * @returns {number} Value of specific balance
         */
        EndResponse.prototype.getBalance = function (type) {
            if (type === void 0) { type = 0 /* CASH_BALANCE */; }
            return this.balances.getBalance(type);
        };
        return EndResponse;
    })();
    exports.EndResponse = EndResponse;
    /**
     * @class gdm-comms.PlatformPlayData
     * @classdesc Platform data from Play request
     */
    var PlatformPlayData = (function () {
        /**
         * @constructor
         */
        function PlatformPlayData() {
            this.currencyMultiplier = 1;
        }
        /**
         * Set session id
         * @method gdm-comms.PlatformEndData#setSessionId
         * @public
         * @param {string} sessionId Session id
         */
        PlatformPlayData.prototype.setSessionId = function (sessionId) {
            this.sessionId = sessionId;
        };
        /**
         * Accessor for session id
         * @method gdm-comms.PlatformInitData#getSessionId
         * @returns {string} Session id
         */
        PlatformPlayData.prototype.getSessionId = function () {
            return this.sessionId;
        };
        /**
         * Set game id
         * @method gdm-comms.PlatformEndData#setGameId
         * @public
         * @param {string} gameId Game id
         */
        PlatformPlayData.prototype.setGameId = function (gameId) {
            this.gameId = gameId;
        };
        /**
         * Accessor for game id
         * @method gdm-comms.PlatformEndData#getGameId
         * @returns {string} Game id
         */
        PlatformPlayData.prototype.getGameId = function () {
            return this.gameId;
        };
        /**
         * Set language code
         * @method gdm-comms.PlatformEndData#setLanguageCode
         * @public
         * @param {string} languageCode Session id
         */
        PlatformPlayData.prototype.setLanguageCode = function (languageCode) {
            this.languageCode = languageCode;
        };
        /**
         * Accessor for language code
         * @method gdm-comms.PlatformEndData#getLanguageCode
         * @returns {string} Language code
         */
        PlatformPlayData.prototype.getLanguageCode = function () {
            return this.languageCode;
        };
        /**
         * Set game version
         * @method gdm-comms.PlatformEndData#setVersion
         * @public
         * @param {string} version Game version
         */
        PlatformPlayData.prototype.setVersion = function (version) {
            this.version = version;
        };
        /**
         * Accessor for game version
         * @method gdm-comms.PlatformEndData#getVersion
         * @returns {string} Game version
         */
        PlatformPlayData.prototype.getVersion = function () {
            return this.version;
        };
        /**
         * Set currency multiplier. Passing in an invalid multiplier will not modify the existing value.
         * @method gdm-comms.PlatformEndData#setCurrencyMultiplier
         * @public
         * @param {number} multiplier Currency multiplier
         */
        PlatformPlayData.prototype.setCurrencyMultiplier = function (multiplier) {
            if (multiplier != null) {
                this.currencyMultiplier = multiplier;
            }
        };
        /**
         * Accessor for currency multiplier
         * @method gdm-comms.PlatformEndData#getCurrencyMultiplier
         * @returns {number} Currency multiplier
         */
        PlatformPlayData.prototype.getCurrencyMultiplier = function () {
            return this.currencyMultiplier;
        };
        return PlatformPlayData;
    })();
    exports.PlatformPlayData = PlatformPlayData;
    /**
     * @class gdm-comms.PlatformEndData
     * @classdesc Platform data from End request
     */
    var PlatformEndData = (function () {
        function PlatformEndData() {
        }
        /**
         * Set session id
         * @method gdm-comms.PlatformEndData#setSessionId
         * @public
         * @param {string} sessionId Session id
         */
        PlatformEndData.prototype.setSessionId = function (sessionId) {
            this.sessionId = sessionId;
        };
        /**
         * Accessor for session id
         * @method gdm-comms.PlatformInitData#getSessionId
         * @returns {string} Session id
         */
        PlatformEndData.prototype.getSessionId = function () {
            return this.sessionId;
        };
        /**
         * Set game id
         * @method gdm-comms.PlatformEndData#setGameId
         * @public
         * @param {string} gameId Game id
         */
        PlatformEndData.prototype.setGameId = function (gameId) {
            this.gameId = gameId;
        };
        /**
         * Accessor for game id
         * @method gdm-comms.PlatformEndData#getGameId
         * @returns {string} Game id
         */
        PlatformEndData.prototype.getGameId = function () {
            return this.gameId;
        };
        /**
         * Set language code
         * @method gdm-comms.PlatformEndData#setLanguageCode
         * @public
         * @param {string} languageCode Session id
         */
        PlatformEndData.prototype.setLanguageCode = function (languageCode) {
            this.languageCode = languageCode;
        };
        /**
         * Accessor for language code
         * @method gdm-comms.PlatformEndData#getLanguageCode
         * @returns {string} Language code
         */
        PlatformEndData.prototype.getLanguageCode = function () {
            return this.languageCode;
        };
        /**
         * Set game version
         * @method gdm-comms.PlatformEndData#setVersion
         * @public
         * @param {string} version Game version
         */
        PlatformEndData.prototype.setVersion = function (version) {
            this.version = version;
        };
        /**
         * Accessor for game version
         * @method gdm-comms.PlatformEndData#getVersion
         * @returns {string} Game version
         */
        PlatformEndData.prototype.getVersion = function () {
            return this.version;
        };
        return PlatformEndData;
    })();
    exports.PlatformEndData = PlatformEndData;
    /**
     * @class PlayResponseXMLParser
     * @classdesc XML parser for GDM PlayResponse payload
     */
    var PlayResponseXMLParser = (function () {
        function PlayResponseXMLParser() {
        }
        /**
         * Parse GDM PlayResponse XML payload
         * @method PlayResponseXMLParser#parse
         * @public
         * @param {Document} xml XML Document containing GDM PlayResponse payload
         * @returns {PlayResponse} PlayResponse data structure
         */
        PlayResponseXMLParser.prototype.parse = function (xml) {
            var platformData = this.parsePlatformData(xml);
            var balanceData = BalanceData.parseXML(xml.getElementsByTagName("Balances")[0]);
            var response = new PlayResponse(platformData, balanceData);
            GamePlayDataXMLParser.populateGameData(response.getGameData(), xml.getElementsByTagName("GameResult")[0]);
            return response;
        };
        /**
         * Parse GDM platform data
         * @method PlayResponseXMLParser#parsePlatformData
         * @public
         * @param {Document} xml XML Document containing GDM PlayResponse payload
         * @returns {PlatformPlayData} Platform data
         */
        PlayResponseXMLParser.prototype.parsePlatformData = function (xml) {
            var data = new PlatformPlayData();
            var gdmHeader = GDMResponseHeader.parseXML(xml.getElementsByTagName("Header")[0]);
            data.setSessionId(gdmHeader.getSessionId());
            data.setGameId(gdmHeader.getGameId());
            data.setLanguageCode(gdmHeader.getLanguageCode());
            data.setVersion(gdmHeader.getVersion());
            var currencyMultiplierNode = xml.getElementsByTagName("CurrencyMultiplier")[0];
            if (currencyMultiplierNode != null) {
                data.setCurrencyMultiplier(parseInt(currencyMultiplierNode.textContent, 10));
            }
            return data;
        };
        return PlayResponseXMLParser;
    })();
    exports.PlayResponseXMLParser = PlayResponseXMLParser;
	
	

    /**
     * Anyway pay wager payload
     * @class gdm-comms.AnywayWwagerPayload
     * @classdesc Wager payload for anyway pay game
     */
    var AnywayWagerPayload = (function () {
        /**
         * @constructor
         */
        function AnywayWagerPayload(totalStake) {
            this.totalStake = totalStake;
        }
        /**
         * Convert custom payload data into XML
         * @method gdm-comms.WagerPayload#toXML
         * @returns {Document} XML formatted data
         */
        AnywayWagerPayload.prototype.toXML = function () {
            var xmlDoc = document.implementation.createDocument("", "SpinInfo", null);
            var stakeAttr = xmlDoc.createAttribute("stake");
            stakeAttr.value = this.totalStake.toString();
            xmlDoc.documentElement.attributes.setNamedItem(stakeAttr);
            return xmlDoc;
        };
        return AnywayWagerPayload;
    })();
    exports.AnywayWagerPayload = AnywayWagerPayload;
    /**
     * Enumeration of balance types.
     * The enumerated names match the balance names in the response message, and can be used as strings.
     */
    (function (BalanceType) {
        BalanceType[BalanceType["CASH_BALANCE"] = 0] = "CASH_BALANCE";
        BalanceType[BalanceType["BONUS_BALANCE"] = 1] = "BONUS_BALANCE";
    })(exports.BalanceType || (exports.BalanceType = {}));
    var BalanceType = exports.BalanceType;
    /**
     * Container for various types of player balance
     * @class gdm-comms.BalanceData
     * @classdesc Dictinoary of different types of balance, identified by type
     */
    var BalanceData = (function () {
        /**
         * @constructor
         */
        function BalanceData(balanceData) {
            this.balances = balanceData;
        }
        /**
         * Parse balance XML
         * @method gdm-comms.BalanceData#parseXML
         * @public
         * @param {node} Node XML Node containing balance information
         * @returns {BalanceData} Balance data
         */
        BalanceData.parseXML = function (node) {
            var data = {};
            var nodeChildren = node.childNodes;
            var numChildren = nodeChildren.length;
            for (var childIndex = 0; childIndex < numChildren; ++childIndex) {
                var balanceSource = nodeChildren[childIndex];
                if (balanceSource.nodeName == "Balance") {
                    var attributes = balanceSource.attributes;
                    data[attributes.getNamedItem("name").value] = parseInt(attributes.getNamedItem("value").value, 10);
                }
            }
            return new BalanceData(data);
        };
        /**
         * Retrieve specific type of balance amount
         * @method gdm-comms.EndResponse#getBalance
         * @public
         * @param {string} type Balance type
         * @returns {number} Value of specific balance
         */
        BalanceData.prototype.getBalance = function (type) {
            var value = 0;
            var name = BalanceType[type];
            if (name != null && this.balances[name] != null) {
                value = this.balances[name];
            }
            return value;
        };
        BalanceData.prototype.hasBalance = function (type) {
            var value = false;
            var name = BalanceType[type];
            if (name != null && this.balances[name] != null) {
                value = true;
            }
            return value;
        };
        return BalanceData;
    })();
    exports.BalanceData = BalanceData;
    /**
     * @class InitResponseXMLParser
     * @classdesc XML parser for GDM InitResponse payload
     */
    var InitResponseXMLParser = (function () {
        function InitResponseXMLParser() {
        }
        /**
         * Parse GDM InitResponse XML payload
         * @method gdm-comms.InitResponseXMLParser#parse
         * @public
         * @param {Document} xml XML Document containing GDM InitResponse payload
         * @returns {InitResponse} InitResponse data structure
         */
        InitResponseXMLParser.prototype.parse = function (xml) {
            var platformData = this.parsePlatformData(xml);
            var balanceData = BalanceData.parseXML(xml.getElementsByTagName("Balances")[0]);
            var response = new InitResponse(platformData, balanceData);
            // Populate standard initialization data
            var gameData = response.getGameData();
            this.populatePaylineData(gameData, xml.getElementsByTagName("PaylineInfo")[0]);
            this.populateAwardsData(gameData, xml.getElementsByTagName("AwardsInfo")[0]);
            this.populateReelGroupData(gameData, xml.getElementsByTagName("ReelInfo")[0]);
            this.populateBetConfiguration(gameData, xml.getElementsByTagName("Stakes")[0]);
            // Retrieve RTP, if available
            var gameConstsNode = xml.getElementsByTagName("GameConsts");
            if (gameConstsNode != null) {
                var attr = gameConstsNode[0].attributes;
                gameData.setReturnToPlayer(parseFloat(attr.getNamedItem("rtp").value));
            }
            return response;
        };
        /**
         * Parse GDM platform data
         * @method gdm-comms.InitResponseXMLParser#parsePlatformData
         * @public
         * @param {Document} xml XML Document containing GDM InitResponse payload
         * @returns {PlatformInitData} Platform data
         */
        InitResponseXMLParser.prototype.parsePlatformData = function (xml) {
            var data = new PlatformInitData();
            var gdmHeader = GDMResponseHeader.parseXML(xml.getElementsByTagName("Header")[0]);
            data.setSessionId(gdmHeader.getSessionId());
            data.setGameId(gdmHeader.getGameId());
            data.setLanguageCode(gdmHeader.getLanguageCode());
            data.setVersion(gdmHeader.getVersion());
            data.setIsRecovering(gdmHeader.isRecovering());
            data.setCurrencyFormat(CurrencyFormatXMLParser.parse(xml.getElementsByTagName("CurrencyInformation")[0]));
            var currencyMultiplierNode = xml.getElementsByTagName("CurrencyMultiplier")[0];
            if (currencyMultiplierNode != null) {
                data.setCurrencyMultiplier(parseInt(currencyMultiplierNode.textContent, 10));
            }
            return data;
        };
        /**
         * Helper method for parsing bet configuration
         * @method gdm-comms.InitResponseXMLParser#populateBetConfiguration
         * @private
         * @param {gamedata.GameInitData} gameData Data structure to populate
         * @param {Node} node XML node containing bet configuration data
         */
        InitResponseXMLParser.prototype.populateBetConfiguration = function (gameData, node) {
            var config = new gamedata.BetConfiguration();
            if (node != null) {
                var attributes = node.attributes;
                config.setDefaultIndex(parseInt(attributes.getNamedItem("defaultIndex").value, 10));
                config.setAvailableBets(node.textContent.split("|").map(Number));
            }
            gameData.setBetConfiguration(config);
        };
        /**
         * Helper method for parsing pay (awards) table
         * @method gdm-comms.InitResponseXMLParser#populateAwardsData
         * @private
         * @param {gamedata.GameInitData} gameData Data structure to populate
         * @param {Node} node XML node containing pay table
         */
        InitResponseXMLParser.prototype.populateAwardsData = function (gameData, node) {
            var attributes = node.attributes;
            // Extract win cap value
            var capAmount = parseInt(attributes.getNamedItem("maxWin").value, 10);
            gameData.setWinCapAmount(capAmount);
            // Extract slot award data
            var numAwards = parseInt(attributes.getNamedItem("awardCount").value, 10);
            var nodeChildren = node.childNodes;
            for (var awardIndex = 0; awardIndex < numAwards; ++awardIndex) {
                var awardDataSource = nodeChildren[awardIndex];
                var paySummary = awardDataSource.textContent.split("|");
                var pay = new gamedata.SlotAwardData(parseInt(paySummary[0], 10), parseInt(paySummary[1], 10), parseInt(paySummary[2], 10));
                gameData.addAward(pay);
            }
        };
        /**
         * Helper method for parsing payline configuration
         * @method gdm-comms.InitResponseXMLParser#populatePaylineData
         * @private
         * @param {gamedata.GameInitData} gameData Data structure to populate
         * @param {Node} node XML node containing payline configuration
         */
        InitResponseXMLParser.prototype.populatePaylineData = function (gameData, node) {
            if (node != null) {
                var attributes = node.attributes;
                var nodeChildren = node.childNodes;
                var numPaylines = parseInt(attributes.getNamedItem("paylineCount").value, 10);
                for (var paylineIndex = 0; paylineIndex < numPaylines; ++paylineIndex) {
                    var paylineDataSource = nodeChildren[paylineIndex];
                    var offsets = paylineDataSource.textContent.split("|").map(Number);
                    var selectable = (attributes.getNamedItem("paylineCount").value == "y");
                    gameData.addPayline(new gamedata.PaylineData(offsets, selectable));
                }
            }
        };
        /**
         * Helper method for parsing reel strips
         * @method gdm-comms.InitResponseXMLParser#populateReelGroupData
         * @private
         * @param {gamedata.GameInitData} gameData Data structure to populate
         * @param {Node} node XML node containing reel strips
         */
        InitResponseXMLParser.prototype.populateReelGroupData = function (gameData, node) {
            var attributes = node.attributes;
            var nodeChildren = node.childNodes;
            // Retrieve all node children and look for ReelSet identifier to parse reel group
            var numChildren = nodeChildren.length;
            for (var childIndex = 0; childIndex < numChildren; ++childIndex) {
                var groupDataSource = nodeChildren[childIndex];
                if (groupDataSource.nodeName == "ReelSet") {
                    var groupAttributes = groupDataSource.attributes;
                    var group = new gamedata.ReelGroupData(parseInt(groupAttributes.getNamedItem("reelSetIndex").value, 10));
                    group.setFeatureId(parseInt(groupAttributes.getNamedItem("featIndex").value, 10));
                    // Retrieve all node children and look for Reel identifier to parse reel strip
                    var stripSourceLength = groupDataSource.childNodes.length;
                    for (var stripSourceIndex = 0; stripSourceIndex < stripSourceLength; ++stripSourceIndex) {
                        var stripDataSource = groupDataSource.childNodes[stripSourceIndex];
                        if (stripDataSource.nodeName == "Reel") {
                            var stripIndex = parseInt(stripDataSource.attributes.getNamedItem("reelIndex").value, 10);
                            var reel = new gamedata.ReelStripData(stripIndex);
                            reel.setSymbols(stripDataSource.textContent.split("|").map(Number));
                            group.addStrip(stripIndex, reel);
                        }
                    }
                    gameData.addReelGroup(group);
                }
            }
        };
        return InitResponseXMLParser;
    })();
    exports.InitResponseXMLParser = InitResponseXMLParser;
    /**
     * @class PlayResponse
     * @classdesc Data received in response to Play request
     */
    var PlayResponse = (function () {
        /**
         * @constructor
         */
        function PlayResponse(platformData, balanceData) {
            this.gameData = new gamedata.GamePlayData();
            this.platformData = platformData;
            this.balances = balanceData;
        }
        /**
         * Accessor for game data
         * @method gdm-comms.PlayResponse#getGameData
         * @public
         * @returns {GamePlayData} Game data
         */
        PlayResponse.prototype.getGameData = function () {
            return this.gameData;
        };
        /**
         * Accessor for platform data
         * @method gdm-comms.PlayResponse#getPlatformData
         * @public
         * @returns {PlatformPlayData} Platform data
         */
        PlayResponse.prototype.getPlatformData = function () {
            return this.platformData;
        };
        /**
         * Retrieve specific type of balance amount
         * @method gdm-comms.PlayResponse#getBalance
         * @public
         * @param {string} type Balance type
         * @returns {number} Value of specific balance
         */
        PlayResponse.prototype.getBalance = function (type) {
            if (type === void 0) { type = 0 /* CASH_BALANCE */; }
            return this.balances.getBalance(type);
        };
        PlayResponse.prototype.hasBalance = function (type) {
            if (type === void 0) { type = 0 /* CASH_BALANCE */; }
            return this.balances.hasBalance(type);
        };
        return PlayResponse;
    })();
    exports.PlayResponse = PlayResponse;
    /**
     * Wager payload for Play requests
     * @class gdm-comms.WagerPayload
     * @classdesc Standard wager payload
     */
    var WagerPayload = (function () {
        /**
         * @constructor
         */
        function WagerPayload(unitsBet, betPerUnit) {
            this.unitsBet = unitsBet;
            this.betPerUnit = betPerUnit;
        }
        /**
         * Convert custom payload data into XML
         * @method gdm-comms.WagerPayload#toXML
         * @returns {Document} XML formatted data
         */
        WagerPayload.prototype.toXML = function () {
            var xmlDoc = document.implementation.createDocument("", "SpinInfo", null);
            var stakePerLineNode = xmlDoc.createAttribute("stakePerLine");
            stakePerLineNode.value = this.betPerUnit.toString();
            xmlDoc.documentElement.attributes.setNamedItem(stakePerLineNode);
            var paylineCount = xmlDoc.createAttribute("paylineCount");
            paylineCount.value = this.unitsBet.toString();
            xmlDoc.documentElement.attributes.setNamedItem(paylineCount);
            var hiRoller = xmlDoc.createAttribute("isHiRoller");
            hiRoller.value = "0";
            xmlDoc.documentElement.attributes.setNamedItem(hiRoller);
            return xmlDoc;
        };
        return WagerPayload;
    })();
    exports.WagerPayload = WagerPayload;
    /**
     * GDM-specific request data and functionality
     * @class GDMHeader
     * @classdesc Encapsulation of all GDM-specific XML request header functionalitiy.
     */
    var GDMRequestHeader = (function () {
        /**
         * @constructor
         */
        function GDMRequestHeader(metadata, sessionData, gameDescription, gdmServerSessionId, platformInitData) {
            /** Any custom header value*/
            this.customRequestHeaders = {};
            // GDM identifiers for different partner backends
            this.GDMID_CASINARENA = "4";
            this.GDMID_FREEPLAY = "65535";
            //this.affiliate = sessionData.getContextID();
            this.freePlay = !metadata.isRealMoney();
            this.gameCodeRGI = metadata.getGameCode();
            this.gameId = gameDescription.id;
            this.gdmId = (this.freePlay ? this.GDMID_FREEPLAY : this.GDMID_CASINARENA);
            this.langCode = metadata.getLocale();
            this.sessionId = gdmServerSessionId;
            this.userId = sessionData.getPlayerID();
            this.version = gameDescription.version;
            // Setting promotions to false. Value isn't currently passed in by any adaptors
            this.promotions = false;
            // channel and userType are set to predefined GDM values -- purpose and meaning unknown
            this.channel = "I";
            this.userType = "C";
            // currencyCode is required to be present in the header but the value appears irrelevant
            this.currencyCode = "";
            if (platformInitData != null) {
                this.currencyCode = platformInitData.getCurrencyFormat().name;
            }
        }
        /**
        * Add custom header values to the request XML
        * @public
        * @param key {string}
        * @param value {any}
        **/
        GDMRequestHeader.prototype.setCustomHeader = function (key, value) {
            this.customRequestHeaders[key] = value;
        };
        /**
        * Custom Header
        * @public
        * @param customHeaders {object}
        * Object contains key/value pair to be custom header
        */
        GDMRequestHeader.prototype.addCustomHeaders = function (customHeaders) {
            if (customHeaders) {
                for (var key in customHeaders) {
                    if (customHeaders.hasOwnProperty(key)) {
                        this.setCustomHeader(key, customHeaders[key]);
                    }
                }
            }
        };
        /**
         * Serialize GDMRequestHeader data to XML string
         * @method gdm-comms.GDMRequestHeader#toXMLString
         * @public
         * @param {}
         * @returns {string} XML string representation of header data
         */
        GDMRequestHeader.prototype.toXMLString = function () {
            var xmlString = "<Header";
            xmlString += " affiliate=\"" + this.affiliate + "\"";
            xmlString += " ccyCode=\"" + this.currencyCode + "\"";
            xmlString += " channel=\"" + this.channel + "\"";
            xmlString += " freePlay=\"" + (this.freePlay ? "Y" : "N") + "\"";
            xmlString += " gameCodeRGI=\"" + this.gameCodeRGI + "\"";
            xmlString += " gameID=\"" + this.gameId + "\"";
            xmlString += " gdmID=\"" + this.gdmId + "\"";
            xmlString += " lang=\"" + this.langCode + "\"";
            xmlString += " promotions=\"" + (this.promotions ? "Y" : "N") + "\"";
            xmlString += " sessionID=\"" + this.sessionId + "\"";
            xmlString += " userID=\"" + this.userId + "\"";
            xmlString += " userType=\"" + this.userType + "\"";
            xmlString += " versionID=\"" + this.version + "\"";
            xmlString += this.customHeadersToXml();
            xmlString += "/>";
            return xmlString;
        };
        /**
        * Generates XML string for custom headers
        * @private
        * @return {string} xml string
        */
        GDMRequestHeader.prototype.customHeadersToXml = function () {
            var xmlString = "";
            for (var key in this.customRequestHeaders) {
                if (this.customRequestHeaders.hasOwnProperty(key)) {
                    xmlString += " " + key + "=\"" + this.customRequestHeaders[key] + "\"";
                }
            }
            return xmlString;
        };
        return GDMRequestHeader;
    })();
    exports.GDMRequestHeader = GDMRequestHeader;
    /**
     * GDM-specific response header data
     * @class GDMHeader
     * @classdesc Encapsulation of GDM-specific XML headers for responses.
     */
    var GDMResponseHeader = (function () {
        function GDMResponseHeader() {
        }
        /**
         * Parse GDM XML header
         * @method gdm-comms.GDMResponseHeader#parseXML
         * @public
         * @param {Node} headerNode XML node corresponding to Header field in GDM XML response
         * @returns {GDMResponseHeader} Platform response data
         */
        GDMResponseHeader.parseXML = function (headerNode) {
            var header = new GDMResponseHeader();
            if (headerNode != null) {
                var attr = headerNode.attributes;
                var attrLength = attr.length;
                for (var i = 0; i < attrLength; ++i) {
                    switch (attr[i].nodeName) {
                        case 'sessionID':
                            header.sessionId = attr[i].nodeValue;
                            break;
                        case 'gameID':
                            header.gameId = attr[i].nodeValue;
                            break;
                        case 'lang':
                            header.langCode = attr[i].nodeValue;
                            break;
                        case 'ccyCode':
                            header.currencyCode = attr[i].nodeValue;
                            break;
                        case 'deciSep':
                            header.decimalSeparator = attr[i].nodeValue;
                            break;
                        case 'thousandSep':
                            header.thousandsSeparator = attr[i].nodeValue;
                            break;
                        case 'versionID':
                            header.version = attr[i].nodeValue;
                            break;
                        case 'isRecovering':
                            header.recovering = (attr[i].nodeValue == 'Y');
                            break;
                    }
                }
            }
            return header;
        };
        /**
         * Accessor for session id
         * @method gdm-comms.GDMResponseHeader#getSessionId
         * @returns {string} Session id
         */
        GDMResponseHeader.prototype.getSessionId = function () {
            return this.sessionId;
        };
        /**
         * Accessor for game id
         * @method gdm-comms.GDMResponseHeader#getGameId
         * @returns {string} Game id
         */
        GDMResponseHeader.prototype.getGameId = function () {
            return this.gameId;
        };
        /**
         * Accessor for language code
         * @method gdm-comms.GDMResponseHeader#getLanguageCode
         * @returns {string} Language code
         */
        GDMResponseHeader.prototype.getLanguageCode = function () {
            return this.langCode;
        };
        /**
         * Accessor for currency code
         * @method gdm-comms.GDMResponseHeader#getCurrencyCode
         * @returns {string} Currency code
         */
        GDMResponseHeader.prototype.getCurrencyCode = function () {
            return this.currencyCode;
        };
        /**
         * Accessor for currency decimal separator
         * @method gdm-comms.GDMResponseHeader#getDecimalSeparator
         * @returns {string} Currency decimal separator
         */
        GDMResponseHeader.prototype.getDecimalSeparator = function () {
            return this.decimalSeparator;
        };
        /**
         * Accessor for currency thousands separator
         * @method gdm-comms.GDMResponseHeader#getThousandsSeparator
         * @returns {string} Currency thousands separator
         */
        GDMResponseHeader.prototype.getThousandsSeparator = function () {
            return this.thousandsSeparator;
        };
        /**
         * Accessor for game version
         * @method gdm-comms.GDMResponseHeader#getVersion
         * @returns {string} Game version
         */
        GDMResponseHeader.prototype.getVersion = function () {
            return this.version;
        };
        /**
         * Accessor for recovery flag
         * @method gdm-comms.GDMResponseHeader#isRecovering
         * @returns {booleam} True if recovering from historical data, false if playing with new data
         */
        GDMResponseHeader.prototype.isRecovering = function () {
            return this.recovering;
        };
        return GDMResponseHeader;
    })();
    exports.GDMResponseHeader = GDMResponseHeader;
    /**
     * @class gdm-comms.ResponseXMLParserFactory
     * @classdesc Factory to create default gdm-comms response XML parser
     * @implements IResponseXMLParserFactory
     */
    var ResponseXMLParserFactory = (function () {
        function ResponseXMLParserFactory() {
        }
        /**
         * Construct Init response XML parser
         * @method gdm-comms.IResponseXMLParserFactory#createInitParser
         * @returns {IResponseXMLParser<InitResponse>} Init response parser
         */
        ResponseXMLParserFactory.prototype.createInitParser = function () {
            return new InitResponseXMLParser;
        };
		
		ResponseXMLParserFactory.prototype.createReelStripParser = function () {
            return new ReelStripResponseXMLParser;
        };
        /**
         * Construct Play response XML parser
         * @method gdm-comms.IResponseXMLParserFactory#createPlayParser
         * @returns {IResponseXMLParser<PlayResponse>} Play response parser
         */
        ResponseXMLParserFactory.prototype.createPlayParser = function () {
            return new PlayResponseXMLParser;
        };
        /**
         * Construct End response XML parser
         * @method gdm-comms.IResponseXMLParserFactory#createEndParser
         * @returns {IResponseXMLParser<EndResponse>} End response parser
         */
        ResponseXMLParserFactory.prototype.createEndParser = function () {
            return new EndResponseXMLParser;
        };
        return ResponseXMLParserFactory;
    })();
    exports.ResponseXMLParserFactory = ResponseXMLParserFactory;
    /**
     * @class EndResponseXMLParser
     * @classdesc XML parser for GDM EndResponse payload
     */
    var EndResponseXMLParser = (function () {
        function EndResponseXMLParser() {
        }
        /**
         * Parse XML payload
         * @method gdm-comms.EndResponseXMLParser#parse
         * @public
         * @param {Document} xml XML Document containing GDM EndResponse payload
         * @returns {EndResponse} EndResponse data structure
         */
        EndResponseXMLParser.prototype.parse = function (xml) {
            var platformData = this.parsePlatformData(xml);
            var balanceData = BalanceData.parseXML(xml.getElementsByTagName("Balances")[0]);
            var response = new EndResponse(platformData, balanceData);
            return response;
        };
        /**
         * Parse GDM platform data
         * @method gdm-comms.EndResponseXMLParser#parsePlatformData
         * @public
         * @param {Document} xml XML Document containing GDM EndResponse payload
         * @returns {PlatformEndData} Platform data
         */
        EndResponseXMLParser.prototype.parsePlatformData = function (xml) {
            var data = new PlatformEndData();
            var gdmHeader = GDMResponseHeader.parseXML(xml.getElementsByTagName("Header")[0]);
            data.setSessionId(gdmHeader.getSessionId());
            data.setGameId(gdmHeader.getGameId());
            data.setLanguageCode(gdmHeader.getLanguageCode());
            data.setVersion(gdmHeader.getVersion());
            return data;
        };
        return EndResponseXMLParser;
    })();
    exports.EndResponseXMLParser = EndResponseXMLParser;
    /**
     * Currency Multiplier payload
     * @class gdm-comms.CurrencyMultiplierPayload
     * @classdesc Currency multiplier payload for play requests
     */
    var CurrencyMultiplierPayload = (function () {
        /**
         * @constructor
         */
        function CurrencyMultiplierPayload(multiplier) {
            this.multiplier = multiplier;
        }
        /**
         * Convert custom payload data into XML
         * @method gdm-comms.CurrencyMultiplierPayload#toXML
         * @returns {Document} XML formatted data
         */
        CurrencyMultiplierPayload.prototype.toXML = function () {
            var xmlDoc = document.implementation.createDocument("", "AccountData", null);
            var multiplierElement = xmlDoc.createElement("CurrencyMultiplier");
            multiplierElement.textContent = this.multiplier.toString();
            xmlDoc.documentElement.appendChild(multiplierElement);
            return xmlDoc;
        };
        return CurrencyMultiplierPayload;
    })();
    exports.CurrencyMultiplierPayload = CurrencyMultiplierPayload;
    /**
     * @class gdmcomms.GamePlayDataXMLParser
     * @classdesc XML parser for slot result data
     */
    var GamePlayDataXMLParser = (function () {
        function GamePlayDataXMLParser() {
        }
        /**
         * Helper method for parsing game play data
         * @method gdm-comms.GamePlayDataXMLParser#populateGameData
         * @public
         * @param {gamedata.GamePlayData} gameData Data structure to populate
         * @param {Node} node XML node containing game play data
         */
        GamePlayDataXMLParser.populateGameData = function (gameData, node) {
            gameData.setTotalWin(parseInt(node.attributes.getNamedItem("totalWin").value, 10));
            gameData.setWager(parseInt(node.attributes.getNamedItem("stake").value, 10));
            var reelsNode = node.childNodes;
            for (var i = 0; i < reelsNode.length; ++i) {
                if (reelsNode[i].nodeName == "ReelResults") {
                    this.populateResults(gameData, reelsNode[i]);
                }
            }
        };
        /**
         * Helper method for parsing slot game results, including stop positions and individual pays
         * @method gdm-comms.GamePlayDataXMLParser#populateResults
         * @private
         * @param {gamedata.GamePlayData} gameData Data structure to populate
         * @param {Node} node XML node containing game play data
         */
        GamePlayDataXMLParser.populateResults = function (gameData, node) {
            var spinNode = node.childNodes;
            for (var spinNodeIndex = 0; spinNodeIndex < spinNode.length; ++spinNodeIndex) {
                // Parse spin data child nodes
                var spinDataSource = spinNode[spinNodeIndex].childNodes;
                for (var spinDataIndex = 0; spinDataIndex < spinDataSource.length; ++spinDataIndex) {
                    var spinDataSubType = spinDataSource[spinDataIndex];
                    var nodeType = spinDataSubType.nodeName;
                    if (nodeType == "ReelStops") {
                        gameData.setStopPositions(spinDataSubType.textContent.split("|").map(Number));
                    }
                    else if (nodeType == "PaylineWin") {
                        this.populatePaylineWin(gameData, spinDataSubType);
                    }
                    else if (nodeType == "AnywayWin") {
                        this.populateAnywayWin(gameData, spinDataSubType);
                    }
                    else if (nodeType == "ScatterWin") {
                        this.populateScatterWin(gameData, spinDataSubType);
                    }
                }
                // Parse spin data attributes (at root level of this node only)
                var spinDataAttr = spinNode[spinNodeIndex].attributes;
                var isBonusNode = spinDataAttr.getNamedItem("bonusAwarded");
                if (isBonusNode != null) {
                    gameData.setIsBonusTriggered((isBonusNode.value == "Y"));
                }
            }
        };
        /**
         * Helper method for parsing a payline win
         * @method gdm-comms.GamePlayDataXMLParser#populatePaylineWin
         * @private
         * @param {gamedata.GamePlayData} gameData Data structure to populate
         * @param {Node} node XML node containing a payline win
         */
        GamePlayDataXMLParser.populatePaylineWin = function (gameData, node) {
            var awardId = parseInt(node.attributes.getNamedItem("awardIndex").value, 10);
            var awardValue = parseInt(node.attributes.getNamedItem("winVal").value, 10);
            var reelOffsets = node.textContent.split("|").map(Number);
            gameData.addSlotResult(new gamedata.PaylineSlotResult(awardId, awardValue, reelOffsets));
        };
        /**
         * Helper method for parsing an anyway win
         * @method gdm-comms.GamePlayDataXMLParser#populateAnywayWin
         * @private
         * @param {gamedata.GamePlayData} gameData Data structure to populate
         * @param {Node} node XML node containing an anyway win
         */
        GamePlayDataXMLParser.populateAnywayWin = function (gameData, node) {
            var awardId = parseInt(node.attributes.getNamedItem("awardIndex").value, 10);
            var awardValue = parseInt(node.attributes.getNamedItem("winVal").value, 10);
            var reelOffsets = node.textContent.split("|").map(Number);
            var numWays = parseInt(node.attributes.getNamedItem("ways").value, 10);
            gameData.addSlotResult(new gamedata.AnywaySlotResult(awardId, awardValue, reelOffsets, numWays));
        };
        /**
         * Helper method for parsing a scatter win
         * @method gdm-comms.GamePlayDataXMLParser#populateScatterWin
         * @private
         * @param {gamedata.GamePlayData} gameData Data structure to populate
         * @param {Node} node XML node containing a scatter win
         */
        GamePlayDataXMLParser.populateScatterWin = function (gameData, node) {
            var awardId = parseInt(node.attributes.getNamedItem("awardIndex").value);
            var awardValue = parseInt(node.attributes.getNamedItem("winVal").value);
            var reelOffsets = node.textContent.split("|").map(Number);
            gameData.addSlotResult(new gamedata.ScatterSlotResult(awardId, awardValue, reelOffsets, this.extractBoolAttribute("isBonusPay", node.attributes), this.extractBoolAttribute("isBonusTrigger", node.attributes)));
        };
        /**
         * Helper method to parse Y/N out of an attribute
         * @method gdm-comms.GamePlayDataXMLParser#extractBoolAttribute
         * @private
         * @param {string} attributeName Name of attribute to check
         * @param {NamedNodeMap} payAttributes Full list of attributes
         * @returns {boolean} True if attribute found and value is "Y", false if not found or value is not "Y"
         */
        GamePlayDataXMLParser.extractBoolAttribute = function (attributeName, payAttributes) {
            var value = false;
            var valueAttr = payAttributes.getNamedItem(attributeName);
            if (valueAttr != null) {
                value = (valueAttr.value == "Y");
            }
            return value;
        };
        return GamePlayDataXMLParser;
    })();
    exports.GamePlayDataXMLParser = GamePlayDataXMLParser;
    /**
     * @class gdm-comms.CurrencyFormatXMLParser
     * @classdesc Parse currency format information out of XML
     */
    var CurrencyFormatXMLParser = (function () {
        function CurrencyFormatXMLParser() {
        }
		
        /**
         * Parse currency formatting data out of XML
         * @method gdm-comms.CurrencyFormatXMLParser#parse
         * @public
         * @param {Node} currencyInformation XML node containing currency formatting information
         * @returns {locale.ICurrencyData} Currency formatting data
         */
        CurrencyFormatXMLParser.parse = function (currencyInformation) {
            var format = this.DEFAULT_FORMAT;
            if (currencyInformation != null) {
                var formatNodes = currencyInformation.childNodes;
                var formatNodesLength = formatNodes.length;
                for (var i = 0; i < formatNodesLength; ++i) {
                    switch (formatNodes[i].nodeName) {
                        case 'Currency':
                            format.name = formatNodes[i].textContent;
                            break;
                        case 'ExchangeRate':
                            format.exchangeRate = parseInt(formatNodes[i].textContent, 10);
                            break;
                        case 'CurrencySymbol':
                            format.symbol = formatNodes[i].textContent;
                            break;
                        case 'Grouping':
                            format.grouping = parseInt(formatNodes[i].textContent, 10);
                            break;
                        case 'GroupingSeparator':
                            format.groupingSeparator = formatNodes[i].textContent;
                            break;
                        case 'FracDigits':
                            format.fractionalDigits = parseInt(formatNodes[i].textContent, 10);
                            break;
                        case 'DecimalSeparator':
                            format.fractionalSeparator = formatNodes[i].textContent;
                            break;
                        case 'CurrencyCodeSpacing':
                            format.currencyCodeSpacing = parseInt(formatNodes[i].textContent, 10);
                            break;
                        case 'CodeBeforeAmount':
                            format.currencyCodeBeforeAmount = (formatNodes[i].textContent == 'true');
                            break;
                        case 'CurrencySymbolSpacing':
                            format.currencySymbolSpacing = parseInt(formatNodes[i].textContent, 10);
                            break;
                        case 'SymbolBeforeAmount':
                            format.currencySymbolBeforeAmount = (formatNodes[i].textContent == 'true');
                            break;
                    }
                }
            }
            return format;
        };
        /**
         * Default currency formatting data
         * @member gdm-comms.CurrencyFormatXMLParser#DEFAULT_FORMAT
         * @private
         * @type {locale.ICurrencyData}
         */
        CurrencyFormatXMLParser.DEFAULT_FORMAT = {
            name: "",
            symbol: "",
            exchangeRate: 1,
            grouping: 3,
            groupingSeparator: ",",
            fractionalDigits: 2,
            fractionalSeparator: ".",
            currencyCodeSpacing: 1,
            currencyCodeBeforeAmount: false,
            currencySymbolSpacing: 1,
            currencySymbolBeforeAmount: false
        };
        return CurrencyFormatXMLParser;
    })();
    exports.CurrencyFormatXMLParser = CurrencyFormatXMLParser;

    /**
     * @class gdm-comms.ReplayRequestPayload
     * @classdesc Payload containing game replay data
     */
    var ReplayRequestPayload = (function () {
        /**
         * @constructor
         */
        function ReplayRequestPayload(state) {
            this.gameState = state;
        }
        /**
         * Convert custom payload data into XML
         * @method gdm-comms.ReplayRequestPayload#toXML
         * @returns {Document} XML formatted data
         */
        ReplayRequestPayload.prototype.toXML = function () {
            var xmlDoc = document.implementation.createDocument("", "REPLAY", null);
            var playbackElement = xmlDoc.createElement("Playback");
            var stateAttr = document.createAttribute("state");
            stateAttr.value = this.gameState;
            playbackElement.attributes.setNamedItem(stateAttr);
            xmlDoc.documentElement.appendChild(playbackElement);
            return xmlDoc;
        };
        return ReplayRequestPayload;
    })();
    exports.ReplayRequestPayload = ReplayRequestPayload;
    /**
     * Basic GDM request data structure, with support for adding custom payloads
     * @class gdm-comms.GDMRequestData
     * @classdesc GDM request data
     */
    var GDMRequestData = (function () {
        /**
         * @constructor
         */
        function GDMRequestData(requestType, header) {
            this.requestType = requestType;
            this.header = header;
            this.customData = [];
        }
        /**
         * Add custom payload data to the request
         * @method gdm-comms.GDMRequestData#addCustomPayload
         * @public
         * @param {ICustomGDMPayload} payload Custom payload data
         */
        GDMRequestData.prototype.addCustomPayload = function (payload) {
            this.customData.push(payload);
        };
        /**
         * Serialize request data into XML string
         * @method gdm-comms.GDMRequestData#toXMLString
         * @public
         * @returns {string} XML string
         */
        GDMRequestData.prototype.toXMLString = function () {
            var xmlString = "<GameRequest type=\"" + this.requestType + "\">";
            xmlString += this.header.toXMLString();
            var numCustomData = this.customData.length;
            var serializer = new XMLSerializer();
            for (var i = 0; i < numCustomData; ++i) {
                xmlString += serializer.serializeToString(this.customData[i].toXML());
            }
            xmlString += "</GameRequest>";
            return xmlString;
        };
        return GDMRequestData;
    })();
    exports.GDMRequestData = GDMRequestData;
});
