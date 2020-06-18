var sitecontext;
(function (sitecontext) {
    var SiteContext = (function () {
        function SiteContext() {
            throw "Don't instantiate SiteContext";
        }
        SiteContext.isStandalone = function () {
            return window.parent == window || window.parent == null;
        };
        SiteContext.isHosted = function () {
            return !this.isStandalone();
        };
        SiteContext.getHref = function (loc) {
            var href = (loc != null) ? loc.href : window.location.href;
            var urlParms = window['urlParms'];
            if (typeof (urlParms) != 'undefined') {
                href = window.location.href.replace(window.location.search, '');
                if (urlParms.indexOf('?') == -1) {
                    href += '?';
                }
                href += urlParms;
            }
            return href;
        };
        SiteContext.getParameters = function () {
            var params = {};
            var query = this.getHref();
            if (query.indexOf('?') != -1) {
                query = query.substring(query.indexOf('?') + 1);
            }
            while (query.length > 0) {
                var index = query.indexOf('&') != -1 ? query.indexOf('&') : query.length;
                var term = query.substring(0, index);
                query = query.substring(index + 1);
                index = term.indexOf('=');
                var key = index != -1 ? term.substring(0, index) : term;
                var value = index != -1 ? term.substring(index + 1) : '';
                params[key] = value;
            }
            return params;
        };
        SiteContext.trimParameters = function (params) {
            // setup the blacklist of url params that should be stripped off
            var trim = ['bypassdetectcapabilities', 'rooturl', 'cashierurl', 'lobbyurl', 'loginurl', 'errorurl',
                'depositurl', 'responsiblegamingurl', 'contacturl', 'keepaliveurl', 'keepaliveinterval',
                'partnercode', 'partneraccountid', 'partnerticket', 'useragent', 'width',
                'height', 'webaudio', 'localstorage', 'canvas', 'geolocation',
                'requestanimationframe', 'xhr2', 'typedarrays', 'bandwidth', 'debug',
                'gaffing', 'demo', 'profile', 'touchdevice', 'overrideversion',
                'resourceversion', 'lobby', 'game'];
            var keys = Object.keys(params);
            keys = keys.filter(function (element, index, array) {
                return trim.indexOf(element) == -1;
            });
            var result = {};
            for (var i = 0; i < keys.length; i++) {
                result[keys[i]] = params[keys[i]];
            }
            return result;
        };
        SiteContext.resolveContext = function () {
            var params = this.getParameters();
            var context = 'mobile';
            if (params['context'] != null) {
                context = params['context'];
            }
            else if (params['contextname'] != null) {
                context = params['contextname'];
            }
            return context;
        };
        SiteContext.applyContext = function (params, context) {
            if (params['context'] == null) {
                params['context'] = context;
            }
            if (params['contextname'] != null) {
                delete params['contextname'];
            }
        };
        return SiteContext;
    }());
    sitecontext.SiteContext = SiteContext;
})(sitecontext || (sitecontext = {}));


var bootstrapping;
(function (bootstrapping) {
    var ApplicationLoader = (function () {
        var cdnRoot;
		function ApplicationLoader(win, localeResolver, params) {
            this.win = win;
            this.localeResolver = localeResolver;
            this.params = params;
        }
        ApplicationLoader.prototype.load = function (cdnRoot, resourceversion, appcode, gaffingenabled, demoenabled, debugenabled, touchdevice, partnercode, realmoney, gamecode, locale, webaudio, screenwidth, screenheight, allDoneCallback, allErrorCallback) {
			var _this = this;
            var url = "";
            url += "https://lon-pt-gls.wi-gameserver.com/rgs";
            //url += "/semistatic";
			//url += cdnRoot;
            url += "/manifestjson";
            url += "/manifest_"+encodeURIComponent(appcode)+".json";
            url += "?appcode=" + encodeURIComponent(appcode);
            url += "&gaffingenabled=" + encodeURIComponent(gaffingenabled);
            url += "&demoenabled=" + encodeURIComponent(demoenabled);
            url += "&debugenabled=" + encodeURIComponent(debugenabled);
            url += "&touchdevice=" + encodeURIComponent(touchdevice);
            url += "&partnercode=" + encodeURIComponent(partnercode);
            url += "&realmoney=" + encodeURIComponent(realmoney);
            url += "&gamecode=" + encodeURIComponent(gamecode);
            url += "&locale=" + encodeURIComponent(locale);
            url += "&webaudio=" + encodeURIComponent(webaudio);
            url += "&screenwidth=" + encodeURIComponent(screenwidth);
            url += "&screenheight=" + encodeURIComponent(screenheight);
            url += "&resourceversion=" + encodeURIComponent(resourceversion);
            this.loadManifest(url, function (manifest) { return _this.handleManifestDone(manifest, allDoneCallback, allErrorCallback, locale); }, function (error) { return allErrorCallback(error); });
        };
        ApplicationLoader.prototype.loadManifest = function (url, callback, allErrorCallback) {
            if (window.XMLHttpRequest)
                var request = new XMLHttpRequest();
            else
                var request = new ActiveXObject("Microsoft.XMLHTTP");
            // var request = new XMLHttpRequest();
            request.onload = function () {
                if (request.status !== 200) {
                    allErrorCallback(new Error('Request to url: ' + url + 'failed with status: ' + request.status + ' and message: \n' + request.responseText));
                    return;
                }
                //TODO: Marshall this object maybe?
                try {
                    var jsonObject = JSON.parse(request.responseText);
                }
                catch (e) {
                    allErrorCallback(new Error('Failed parsing manifest with error: ' + e));
                    return;
                }
                var manifest;
                manifest = jsonObject;
                callback(manifest);
            };
            request.onerror = function (e) {
                //TODDO: Retry?
                console.error('Failed to download: ' + url);
                var error = new Error('Failed loading file:' + url + ' status: ' + request.status);
                allErrorCallback(error);
            };
            request.onprogress = function () {
                console.log(".");
            };
            request.open("get", url, true);
            request.send();
        };
        ApplicationLoader.prototype.handleManifestDone = function (manifest, allDoneCallback, allErrorCallback, locale) {
            var _this = this;
            var resolvedLocale = this.localeResolver.resolve(manifest.supported_locales, locale, manifest.default_locale);
            console.log("Manifest done, locale: " + resolvedLocale);
            this.inject(manifest.inject);
            // this function will be called recursively until we have downloaded all javascripts
            this.loadJavascriptPart(manifest.javascripts, [], resolvedLocale, function (javascripts) {
            //this.loadJavascriptPart(manifest.jsons, [], resolvedLocale, function (javascripts) {
                // take all javascript strings and eval them in a closure and return a function that returns a instance of the main class
                var bootstrappingFunction;
                try {
                    bootstrappingFunction = _this.generateBootstrapFunction(javascripts, manifest.main_class);
                    // callback out to the Main class with the function that when runned creates the application
                    allDoneCallback(bootstrappingFunction);
                }
                catch (error) {
                    allErrorCallback(error);
                }
            }, allErrorCallback);
        };
        ApplicationLoader.prototype.inject = function (tags) {
            if (tags != null) {
                var head = document.getElementsByTagName('head')[0];
                for (var i = 0; i < tags.length; i++) {
                    var tag = tags[i];
                    for (var tagName in tag) {
                        var element = document.createElement(tagName);
                        var attrs = tag[tagName];
                        for (var attr in attrs) {
                            element.setAttribute(attr, attrs[attr]);
                        }
                        head.appendChild(element);
                        break;
                    }
                }
            }
        };
        ApplicationLoader.prototype.loadJavascriptPart = function (urls, javascripts, locale, callback, allErrorCallback) {
            var _this = this;
            if (urls.length === 0) {
                callback(javascripts);
                return;
            }
            var url = urls.pop();
            // replace for locale placeholder
            url = url.replace(/#\{locale\}/g, locale);
            if (!this.isUrlCachable(url)) {
                // if url shouldn't be cached then we add a parameter with a timestamp value so the url is different every time
                url += (/\?/.test(url) ? "&" : "?") + "cache_bust=" + Date.now();
            }
            if (window.XMLHttpRequest)
                var request = new XMLHttpRequest();
            else
                var request = new ActiveXObject("Microsoft.XMLHTTP");
            // var request = new XMLHttpRequest();
            request.onload = function () {
                if (request.status !== 200) {
                    allErrorCallback(new Error('Request to url: ' + url + 'failed with status: ' + request.status + ' and message: \n' + request.responseText));
                    return;
                }
                // add the script
                var fullScript = request.responseText;
                // add source path so we can debug it
                fullScript += "\n//# sourceURL=" + url;
                var countrycode = "UNKNOWN";
                if (_this.params['countrycode'] != null) {
                    countrycode = _this.params['countrycode'];
                }
                fullScript = fullScript.replace(/\$\{countrycode\}/, countrycode);
                javascripts.push(fullScript);
                _this.loadJavascriptPart(urls, javascripts, locale, callback, allErrorCallback);
            };
            request.onerror = function (e) {
                //TODDO: Retry?
                var error = new Error('Failed loading file:' + url + ' status: ' + request.status);
                allErrorCallback(error);
            };
            request.onprogress = function (ev) {
                console.log('.');
            };
            // TODO: Handle errors
            // TODO: Handle progress
            // TODO: Do reties
            request.open("get", url, true);
            request.send();
        };
        ApplicationLoader.prototype.isUrlCachable = function (url) {
            // generally .js should be cached but not the meta data files
            if (/MetaDataBundle.js/i.test(url)) {
                return false;
            }
            return true;
        };
        ApplicationLoader.prototype.generateBootstrapFunction = function (javascripts, mainClassName) {
            // the eval will create variables in the local scope closures
            for (var i = 0; i < javascripts.length; i++) {
                try {
                    this.win.eval.call(this.win, javascripts[i]); // TODO: Wrap this in a testable class	
                }
                catch (e) {
                    console.error("Error when trying to evaluate downloaded code.");
                    throw e;
                }
            }
            var bootstrappingFunction;
            try {
                bootstrappingFunction = this.win.eval.call(this.win, mainClassName);
                if (typeof bootstrappingFunction == "undefined") {
                    // this error will get caught in the catch directly below
                    throw new Error();
                }
            }
            catch (e) {
                console.error("Trying to get the function to start the application with: " + mainClassName + " but it's not defined in any of the downloaded sources");
                throw e;
            }
            return bootstrappingFunction;
        };
        ApplicationLoader.prototype.loadApplicationSpecification = function (partnerCode, gameCode, successCallback, errorCallback) {
            var url = "./application/" + partnerCode + "/" + gameCode;
            var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            request.onload = function () {
                if (request.status !== 200) {
                    errorCallback(new Error('Request to url: ' + url + 'failed with status: ' + request.status + ' and message: \n' + request.responseText));
                    return;
                }
                try {
                    var jsonObject = JSON.parse(request.responseText);
                }
                catch (e) {
                    errorCallback(new Error('Failed parsing manifest with error: ' + e));
                    return;
                }
                var appSpecDTO;
                appSpecDTO = jsonObject;
                successCallback(appSpecDTO);
            };
            request.onerror = function (e) {
                console.error('Failed to download: ' + url);
                var error = new Error('Failed loading file:' + url + ' status: ' + request.status);
                errorCallback(error);
            };
            request.onprogress = function () {
                console.log(".");
            };
            request.open("get", url, true);
            request.send();
        };
        return ApplicationLoader;
    }());
    bootstrapping.ApplicationLoader = ApplicationLoader;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var AudioContextShimmer = (function () {
        function AudioContextShimmer(win) {
            this.win = win;
        }
        AudioContextShimmer.prototype.shim = function () {
            if (typeof AudioContext !== 'undefined') {
                var __AudioContext = AudioContext;
                this.win.AudioContext = function () {
                    var ctx = new __AudioContext();
                    function onTouch(ev) {
                        document.body.removeEventListener('touchend', onTouch, true);
                        document.body.removeEventListener('click', onTouch, true);
                        if ('resume' in ctx) {
                            ctx.resume();
                        }
                    }
                    document.body.addEventListener('touchend', onTouch, true);
                    document.body.addEventListener('click', onTouch, true);
                    return ctx;
                };
            }
        };
        return AudioContextShimmer;
    }());
    bootstrapping.AudioContextShimmer = AudioContextShimmer;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var ConsoleShimmer = (function () {
        function ConsoleShimmer(win) {
            this.win = win;
        }
        ConsoleShimmer.prototype.shim = function () {
            if (!this.win['console']) {
                this.win['console'] = {
                    info: function () { },
                    profile: function () { },
                    assert: function () { },
                    msIsIndependentlyComposed: function () { },
                    clear: function () { },
                    dir: function () { },
                    warn: function () { },
                    error: function () { },
                    log: function () { },
                    profileEnd: function () { },
                    count: function () { },
                    groupEnd: function () { },
                    time: function () { },
                    timeEnd: function () { },
                    trace: function () { },
                    group: function () { },
                    dirxml: function () { },
                    debug: function () { },
                    groupCollapsed: function () { },
                    select: function () { }
                };
            }
        };
        return ConsoleShimmer;
    }());
    bootstrapping.ConsoleShimmer = ConsoleShimmer;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var DivSizeWorkarounder = (function () {
        function DivSizeWorkarounder(win) {
            this.iphoneHeights = [672,
                370, 337,
                331,
                232]; // iphone 5,4,3,etc
            this.win = win;
        }
        DivSizeWorkarounder.prototype.start = function () {
            // this.updateScroll();
            this.fixIphoneScalingIssue();
        };
        /*
         * This will fix responsiveness on iOS devices
         */
        DivSizeWorkarounder.prototype.updateScroll = function () {
            var _this = this;
            var y = 1;
            var i = 0;
            for (i = 0; i < this.iphoneHeights.length; i++) {
                if (this.iphoneHeights[i] == this.win.innerHeight) {
                    y = -1;
                    break;
                }
            }
            this.win.scrollTo(0, y);
            this.win.setTimeout(function () { return _this.updateScroll(); }, 320);
        };
        /*
        This fixes an issue where iPhone iOS 10.3.x and 11.x Mobile Safari reports that the window size is larger than
        the viewable area in landscape, which was causing the game screen to be cut off at the top and/or bottom.
        This affects any non-fullscreen game.
        The fix resizes the game container height to be the height of the viewable area.
         */
        DivSizeWorkarounder.prototype.fixIphoneScalingIssue = function () {
            var _this = this;
            var isAffectedDevice = this.win.navigator && (/iPhone OS 10_3/.test(this.win.navigator.userAgent) || /iPhone OS 11/.test(this.win.navigator.userAgent));
            var isChromeBrowser = /CriOS/.test(this.win.navigator.userAgent);
            var isInIframe = this.win.top != this.win.self;
            var isFullscreenGame = !!document.getElementById("full-screen-body");
            var isMGAGame = !!document.getElementById("game-background-container");
            var isOpenBet = !!window.wiOpenBetAdapter;
            var wasFixEnabled = false;
            if (isAffectedDevice &&
                !isChromeBrowser &&
                !isInIframe &&
                !isFullscreenGame) {
                wasFixEnabled = true;
                if (!isMGAGame) {
                    // GLS games
                    // fix for Core games, which override the min-height of the game-container div
                    document.getElementById("game-container").style.minHeight = "0";
                    this.win.setInterval(function () {
                        var windowHeight = _this.win.innerHeight;
                        var containerHeight = document.getElementById("game-container").offsetHeight; // will be 0 when the div isn't visible
                        if (containerHeight != 0 && containerHeight != windowHeight) {
                            console.log("fixIphoneScalingIssue: window height is " + windowHeight + ", scaling GLS content to fit");
                            setElementHeight("game-container", windowHeight);
                            setElementHeight("progress-bar-modal", windowHeight);
                            _this.win.scrollTo(0, 0);
                        }
                    }, 100);
                }
                else {
                    // MGA games
                    // The game container and game background container height depend on the height of the window, so their heights need to be fixed.
                    // Any other element should have the correct height already and just needs to have it's vertical position adjusted.
                    this.win.setInterval(function () {
                        var windowHeight = _this.win.innerHeight;
                        var containerHeight = document.getElementById("modal-window-wrapper").offsetHeight;
                        if (containerHeight != 0 && containerHeight != windowHeight) {
                            setElementHeight("modal-window-wrapper", windowHeight);
                            console.log("fixIphoneScalingIssue: window height is " + windowHeight + ", scaling MGA content to fit");
                            var emSize = parseInt(_this.win.getComputedStyle(document.body).getPropertyValue('font-size'));
                            if (!isOpenBet) {
                                // non-OpenBet
                                var topBarHeight = document.getElementById("top-bar-background").offsetHeight;
                                var tickerBarHeight = document.getElementById("ticker-bar").offsetHeight;
                                setElementHeight("game-container", windowHeight - topBarHeight - tickerBarHeight);
                                setElementHeight("game-background-container", windowHeight - topBarHeight);
                                setElementHeight("progress-bar-modal", windowHeight);
                                setElementTop("ticker-bar", windowHeight - tickerBarHeight);
                            }
                            else {
                                // OpenBet
                                var bottomAreaHeight = document.getElementById("top-bar-background").offsetHeight + document.getElementById("ticker-bar").offsetHeight;
                                setElementHeight("game-container", windowHeight - bottomAreaHeight);
                                setElementHeight("game-background-container", windowHeight);
                                setElementHeight("progress-bar-modal", windowHeight);
                                setElementTop("bet-bubble-bet-per-line-container", windowHeight - emSize * 13);
                                setElementTop("bet-bubble-bet-lines-container", windowHeight - emSize * 13);
                                setElementTop("top-bar-background", windowHeight - emSize * 3.5);
                                setElementTop("top-bar-info", windowHeight - emSize * 0.8);
                                setElementTop("top-bar", windowHeight - emSize * 3.8);
                                setElementTop("bottom-bar", windowHeight - emSize * 3.6);
                                setElementTop("ticker-bar", windowHeight - emSize * 1.0);
                                setElementTop("status-bar", windowHeight - emSize * 1.7);
                            }
                            // on larger iphones there is a media query that positions the spin button from the top of the screen
                            // but on smaller iphones we need to adjust the top of the spin button relative to the bottom of the screen
                            if (windowHeight < 350) {
                                setElementTop("spin-button", windowHeight - emSize * 10);
                            }
                            _this.win.scrollTo(0, 0);
                        }
                    }, 100);
                }
            }
            console.log("fixIphoneScalingIssue: iPhone 10.3.x scaling fix is: " + (wasFixEnabled ? "" : "NOT ") + "ENABLED");
            function setElementHeight(id, height) {
                document.getElementById(id).style.height = height + "px";
            }
            function setElementTop(id, top) {
                document.getElementById(id).style.top = top + "px";
                document.getElementById(id).style.bottom = "auto";
            }
        };
        return DivSizeWorkarounder;
    }());
    bootstrapping.DivSizeWorkarounder = DivSizeWorkarounder;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var GoogleAnalyticsTagInjector = (function () {
        function GoogleAnalyticsTagInjector(win, doc, analyticsId, gameCode, partnerCode, realMoney, resourceVersion) {
            this.win = win;
            this.doc = doc;
            this.analyticsId = analyticsId;
            this.gameCode = gameCode;
            this.partnerCode = partnerCode;
            this.realMoney = realMoney;
            this.resourceVersion = resourceVersion;
        }
        GoogleAnalyticsTagInjector.prototype.inject = function () {
            var self = this;
            /*
                
                This is the original analytics injection string:
                
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            
            */
            // translation of the minified code since typescript doesn't really like hacking too hard
            this.win['GoogleAnalyticsObject'] = 'ga';
            if (!this.win['ga']) {
                this.win['ga'] = function () {
                    if (!self.win['ga']['q']) {
                        self.win['ga']['q'] = [];
                    }
                    self.win['ga']['q'].push(arguments);
                };
            }
            var elem = this.doc.createElement('script');
            var parentElem = this.doc.getElementsByTagName('script')[0];
            elem.async = true;
            elem.src = '//www.google-analytics.com/analytics.js';
            parentElem.parentNode.insertBefore(elem, parentElem);
            if (this.win.location.hostname === "localhost") {
                //create with a testing client id
                this.win['ga']('create', this.analyticsId, // Mobile Wagering
                {
                    'cookieDomain': 'none',
                    'allowLinker': true
                });
            }
            else {
                this.win['ga']('create', this.analyticsId, // Mobile Wagering
                {
                    'allowLinker': true
                });
            }
            // set the page & partner code
            // mark that we are in the game now
            this.win['ga']('set', {
                'page': "/" + this.gameCode,
                'dimension1': this.partnerCode,
                'dimension2': this.realMoney,
                'dimension3': this.resourceVersion
            });
            // track the page
            this.win['ga']('send', 'pageview');
        };
        return GoogleAnalyticsTagInjector;
    }());
    bootstrapping.GoogleAnalyticsTagInjector = GoogleAnalyticsTagInjector;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var LanguageAndCountryLocaleCodeResolver = (function () {
        function LanguageAndCountryLocaleCodeResolver(defaultRequestedLocale) {
            this.defaultRequestedLocale = this.normalize(defaultRequestedLocale);
        }
        LanguageAndCountryLocaleCodeResolver.prototype.resolve = function (availableTwoLetterLocales, requestedLocale, defaultTwoLetterLocale) {
            var localeNumber = availableTwoLetterLocales.length;
            for (var index = 0; index < localeNumber; index++) {
                if (availableTwoLetterLocales[index] === requestedLocale) {
                    return requestedLocale;
                }
            }
            for (var index = 0; index < localeNumber; index++) {
                var requestedLanguageCode = requestedLocale.substring(0, 2);
                if ((requestedLanguageCode === "fr") && (this.contains(availableTwoLetterLocales, "fr_FR"))) {
                    return "fr_FR";
                }
                if ((requestedLanguageCode === "en") && (this.contains(availableTwoLetterLocales, "en_GB"))) {
                    return "en_GB";
                }
                for (var index = 0; index < localeNumber; index++) {
                    var supportedLanguageCode = availableTwoLetterLocales[index].substring(0, 2);
                    if (supportedLanguageCode === requestedLanguageCode) {
                        return availableTwoLetterLocales[index];
                    }
                }
            }
            return this.getDefault(availableTwoLetterLocales);
        };
        LanguageAndCountryLocaleCodeResolver.prototype.contains = function (codeList, code) {
            console.log("looking for " + code);
            for (var index = 0; index < codeList.length; index++) {
                console.log("Code: " + codeList[index]);
                if (code === codeList[index]) {
                    return true;
                }
            }
            return false;
        };
        LanguageAndCountryLocaleCodeResolver.prototype.getDefault = function (supportedCodes) {
            if (this.contains(supportedCodes, "en_GB")) {
                return "en_GB";
            }
            return "en";
        };
        LanguageAndCountryLocaleCodeResolver.prototype.normalize = function (requestedCode) {
            if (requestedCode.length < 2) {
                return "en";
            }
            if (requestedCode.length < 5) {
                return requestedCode.substring(0, 2).toLowerCase();
            }
            var localeCode = requestedCode.substring(0, 2).toLowerCase();
            localeCode = localeCode + "_" + requestedCode.substring(3, 5).toUpperCase();
            return localeCode;
        };
        return LanguageAndCountryLocaleCodeResolver;
    }());
    bootstrapping.LanguageAndCountryLocaleCodeResolver = LanguageAndCountryLocaleCodeResolver;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var LocaleResolver = (function () {
        function LocaleResolver(win) {
            this.win = win;
        }
        /**
        * Try to figure out what locales that are available.
        * We always just checks the two first letters for the locale (except the location part).
        * i.e. for "en_GB" we are only interested in "en"
        *
        * We first checks if requestedLocale is available, then systemLocale and last defaultLocale.
        *
        * Returns two letter locale e.g. en, sv or es
        */
        LocaleResolver.prototype.resolve = function (availableTwoLetterLocales, requestedLocale, defaultTwoLetterLocale) {
            var systemLocale = this.win.navigator.language;
            if (systemLocale == null) {
                systemLocale = this.win.navigator.browserLanguage;
            }
            var requestedTwoLetterLocale = requestedLocale.substring(0, 2);
            var systemTwoLetterLocale = systemLocale.substring(0, 2);
            if (this.isAvailable(availableTwoLetterLocales, requestedTwoLetterLocale)) {
                return requestedTwoLetterLocale;
            }
            else if (this.isAvailable(availableTwoLetterLocales, systemTwoLetterLocale)) {
                return systemTwoLetterLocale;
            }
            else {
                return defaultTwoLetterLocale;
            }
        };
        LocaleResolver.prototype.isAvailable = function (availableTwoLetterLocales, twoLetterLocale) {
            for (var i = 0; i < availableTwoLetterLocales.length; i++) {
                if (twoLetterLocale === availableTwoLetterLocales[i]) {
                    return true;
                }
            }
            return false;
        };
        return LocaleResolver;
    }());
    bootstrapping.LocaleResolver = LocaleResolver;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var ManifestDTO = (function () {
        function ManifestDTO(javascripts, inject, main_class, supported_locales, default_locale) {
            this.javascripts = javascripts;
            this.inject = inject;
            this.main_class = main_class;
            this.supported_locales = supported_locales;
            this.default_locale = default_locale;
            console.log("ManifestDTO: " + JSON.stringify(this));
        }
        return ManifestDTO;
    }());
    bootstrapping.ManifestDTO = ManifestDTO;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var PerformanceTimingShimmer = (function () {
        function PerformanceTimingShimmer(win) {
            this.win = win;
        }
        PerformanceTimingShimmer.prototype.shim = function () {
            var _this = this;
            // shim performance timing
            this.win.performance = this.win.performance || {};
            this.win.performance.timing = this.win.performance.timing || {};
            this.win.performance.timing.navigationStart = this.win.performance.timing.navigationStart || Date.now();
            this.win.performance.now = this.win.performance.now || (function () {
                return Date.now() - _this.win.performance.timing.navigationStart;
            });
        };
        return PerformanceTimingShimmer;
    }());
    bootstrapping.PerformanceTimingShimmer = PerformanceTimingShimmer;
})(bootstrapping || (bootstrapping = {}));
var bootstrapping;
(function (bootstrapping) {
    var RequestAnimationFrameShimmer = (function () {
        function RequestAnimationFrameShimmer(win) {
            this.win = win;
        }
        RequestAnimationFrameShimmer.prototype.shim = function () {
            var _this = this;
            this.win.requestAnimationFrame =
                this.win['requestAnimationFrame'] ||
                    this.win['msRequestAnimationFrame'] ||
                    this.win['mozRequestAnimationFrame'] ||
                    this.win['webkitRequestAnimationFrame'] ||
                    this.win['oRequestAnimationFrame'];
            if (!this.win.requestAnimationFrame) {
                var lastTime = 0;
                this.win.requestAnimationFrame = function (callback) {
                    var currTime = Date.now();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = _this.win.setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
            this.win.cancelAnimationFrame =
                this.win['cancelAnimationFrame'] ||
                    this.win['msCancelAnimationFrame'] ||
                    this.win['mozCancelAnimationFrame'] ||
                    this.win['webkitCancelAnimationFrame'] ||
                    this.win['oCancelAnimationFrame'] ||
                    this.win['msCancelRequestAnimationFrame'] ||
                    this.win['mozCancelRequestAnimationFrame'] ||
                    this.win['webkitCancelRequestAnimationFrame'] ||
                    this.win['oCancelRequestAnimationFrame'];
            if (!this.win.cancelAnimationFrame) {
                this.win.cancelAnimationFrame = function (id) {
                    _this.win.clearTimeout(id);
                };
            }
        };
        return RequestAnimationFrameShimmer;
    }());
    bootstrapping.RequestAnimationFrameShimmer = RequestAnimationFrameShimmer;
})(bootstrapping || (bootstrapping = {}));


var appspec;
(function (appspec) {
    var ApplicationSpecification = (function () {
        function ApplicationSpecification(appSpecDTO) {
            this.suppressErrorDialogs = false;
            this.enableViewForPlatformEvents = true;
            this.messageEventBus = "NO_BUS";
            if (typeof appSpecDTO == "object") {
                if (typeof appSpecDTO.suppressErrorDialogs === "boolean") {
                    this.suppressErrorDialogs = !!appSpecDTO.suppressErrorDialogs;
                }
                if (typeof appSpecDTO.enableViewForPlatformEvents === "boolean") {
                    this.enableViewForPlatformEvents = !!appSpecDTO.enableViewForPlatformEvents;
                }
                if (typeof appSpecDTO.messageEventBus === "string") {
                    this.messageEventBus = appSpecDTO.messageEventBus;
                }
            }
        }
        ApplicationSpecification.prototype.getSuppressErrorDialogs = function () {
            return this.suppressErrorDialogs;
        };
        ApplicationSpecification.prototype.getEnableViewForPlatformEvents = function () {
            return this.enableViewForPlatformEvents;
        };
        ApplicationSpecification.prototype.getMessageEventBus = function () {
            return this.messageEventBus;
        };
        return ApplicationSpecification;
    }());
    appspec.ApplicationSpecification = ApplicationSpecification;
})(appspec || (appspec = {}));


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


var bootstrapper;
(function (bootstrapper) {
    var Bootstrapper = (function () {
        function Bootstrapper(win, doc, cdnRoot, portfolioBaseUrl, analyticsId, gameCode, partnerCode, partnerAdapter, realMoney, locale, resourceVersion, platformCode, gameConfiguration) {
            var _this = this;
            this.win = win;
            this.doc = doc;
            this.cdnRoot = cdnRoot;
            this.portfolioBaseUrl = portfolioBaseUrl;
            this.analyticsId = analyticsId;
            this.gameCode = gameCode;
            this.partnerCode = partnerCode;
            this.partnerAdapter = partnerAdapter;
            this.realMoney = realMoney;
            this.locale = locale;
            this.resourceVersion = resourceVersion;
            this.platformCode = platformCode;
            this.audioContextShimmer = new bootstrapping.AudioContextShimmer(this.win);
            this.audioContextShimmer.shim();
            // shim window.performance.timing if it doesn't exist
            this.performanceTimingShimmer = new bootstrapping.PerformanceTimingShimmer(this.win);
            this.performanceTimingShimmer.shim();
            // shim requestAnimationFrame if it doesn't exist
            this.requestAnimationFrameShimmer = new bootstrapping.RequestAnimationFrameShimmer(this.win);
            this.requestAnimationFrameShimmer.shim();
            this.consoleShimmer = new bootstrapping.ConsoleShimmer(this.win);
            this.consoleShimmer.shim();
            // add the google ananlytics tracking code and track initial params
            this.tagInjector = new bootstrapping.GoogleAnalyticsTagInjector(this.win, this.doc, this.analyticsId, this.gameCode, this.partnerCode, this.realMoney, this.resourceVersion);
            this.tagInjector.inject();
            // add scripts to workaround the iOS bug that stopps divs from updating
            this.divSizeWorkarounder = new bootstrapping.DivSizeWorkarounder(this.win);
            this.divSizeWorkarounder.start();
			this.gameConfiguration = gameConfiguration;
            this.localeResolver = new bootstrapping.LanguageAndCountryLocaleCodeResolver(this.getBrowserLanguage());
            // create an application loader to load the external javascripts
            this.applicationLoader = new bootstrapping.ApplicationLoader(this.win, this.localeResolver, sitecontext.SiteContext.getParameters());
            // TODO: Send actual params
            //load the capabilities detector
            /**this.applicationLoader.load(this.cdnRoot, this.resourceVersion, "capabilities-detector", //appcode
            "true", //gaffingenabled 
            "true", //"demoenabled:string, 
            "true", //debugenabled:string, 
            "false", //touchdevice:string, 
            this.partnerCode, //partnercode:string, 
            this.realMoney, this.gameCode, this.locale, // locale
            "true", //webaudio:string, 
            "800", //screenwidth:string, 
            "600", //screenheight:string, 
            function (mainClassFunction) { return _this.handleCapabilitiesDetectorLoaded(mainClassFunction); }, function (e) { return _this.handleError(e); });*/
			
			//Albin HardCode
			var scripts = ["translationjs/bundles/translations/"+this.locale.split("_")[0]+"/capabilitiesdetector.LocalizationBundle.js?resourceversion="+this.resourceVersion+"&appcode=capabilities-detector", "mainjs/application/capabilitiesdetector.CapabilitiesDetectorBootstrapper.js?resourceversion="+this.resourceVersion+"&appcode=capabilities-detector"];
			applicationLoader = this.applicationLoader;
			this.applicationLoader.loadJavascriptPart(scripts, [], this.locale, function (javascripts,applicationLoader) {
            //this.loadJavascriptPart(manifest.jsons, [], resolvedLocale, function (javascripts) {
                // take all javascript strings and eval them in a closure and return a function that returns a instance of the main class
                var bootstrappingFunction;
                try {
                    bootstrappingFunction = this.applicationLoader.generateBootstrapFunction(javascripts, "capabilitiesdetector.CapabilitiesDetectorBootstrapper");
                    // callback out to the Main class with the function that when runned creates the application
                    _this.handleCapabilitiesDetectorLoaded(bootstrappingFunction);
                }
                catch (error) {
                    _this.handleError(error);
                }
            }, function (e) { return _this.handleError(e);});
        }
        Bootstrapper.prototype.getBrowserLanguage = function () {
            return this.win.navigator.language != undefined ? this.win.navigator.language : this.win.navigator.browserLanguage;
        };
        Bootstrapper.prototype.handleCapabilitiesDetectorLoaded = function (capabilitiesMainClass) {
            var _this = this;
            console.log("capabilities detector loaded");
            // create the application
            try {
                new capabilitiesMainClass(this.gameConfiguration, function (detectedCapabilities) { return _this.handleCapabilitiesDone(detectedCapabilities); });
            }
            catch (e) {
                console.error("Error when instantiating capabilities detector");
                console.error(e);
                throw e;
            }
        };
        Bootstrapper.prototype.handleCapabilitiesDone = function (detectedCapabilities) {
            var _this = this;
            // load the application specification
            this.applicationLoader.loadApplicationSpecification(this.partnerCode, this.gameCode, function (appSpecDTO) {
                _this.appSpec = new appspec.ApplicationSpecification(appSpecDTO);
                _this.handleAppSpecDone(detectedCapabilities);
            }, function (e) {
                console.error("Error loading application specification." + e.message);
                _this.appSpec = new appspec.ApplicationSpecification({});
                _this.handleAppSpecDone(detectedCapabilities);
            });
        };
        Bootstrapper.prototype.handleAppSpecDone = function (detectedCapabilities) {
            var _this = this;
            console.log("capabilities detector done: object is: " + JSON.stringify(detectedCapabilities, null, "\t"));
            // To make it look good at a desktop use innerHeight and innerWidth in case of no touch events
            // otherwise we-ll just use the screed width and height
            var clientWidth = this.win.screen.width;
            var clientHeight = this.win.screen.height;
            if (!detectedCapabilities['touchdevice']) {
                clientWidth = this.win.innerWidth;
                clientHeight = this.win.innerHeight;
            }
            // use the biggest value as width and the other as height
            var actualWidth = Math.max(clientWidth, clientHeight).toString();
            var actualHeight = Math.min(clientWidth, clientHeight).toString();
            var webAudio = detectedCapabilities['webaudio'] ? 'true' : 'false';
            var touchDevice = detectedCapabilities['touchdevice'] ? 'true' : 'false';
            var locale = detectedCapabilities['locale'];
            var debug = detectedCapabilities['debug'] ? detectedCapabilities['debug'] : "false";
            var gaffing = detectedCapabilities['gaffing'] ? detectedCapabilities['gaffing'] : "false";
            var demo = detectedCapabilities['demo'] ? detectedCapabilities['demo'] : "false";
            //load the platform adapter
			
			/*"mainjs/application/glsplatform.GlsPlatform.js?resourceversion=4.72.0.2-1564155912&appcode=gls-platform","metadatajs/bundles/metadata/glsplatform.MetaDataBundle.js?resourceversion=4.72.0.2-1564155912&appcode=gls-platform&gaffingenabled=false&demoenabled=false&debugenabled=false&touchdevice=false&partnercode=mockogs5&realmoney=true&gamecode=eightyeightfortunes&locale=en_US&webaudio=true","translationjs/bundles/translations/#{locale}/glsplatform.LocalizationsBundle.js?resourceversion=4.72.0.2-1564155912&appcode=gls-platform"*/
			
			//Albin Reduced Dynamicity
			var scripts = ["mainjs/application/glsplatform.GlsPlatform.js?resourceversion="+this.resourceVersion+"&appcode=gls-platform", "metadatajs/bundles/metadata/glsplatform.MetaDataBundle.js?resourceversion="+this.resourceVersion+"&appcode=gls-platform","translationjs/bundles/translations/"+this.locale+"/glsplatform.LocalizationsBundle.js?resourceversion="+this.resourceVersion+"&appcode=gls-platform"];
			applicationLoader = this.applicationLoader;
			this.applicationLoader.loadJavascriptPart(scripts, [], this.locale, function (javascripts,applicationLoader) {
            //this.loadJavascriptPart(manifest.jsons, [], resolvedLocale, function (javascripts) {
                // take all javascript strings and eval them in a closure and return a function that returns a instance of the main class
                var bootstrappingFunction;
                try {
                    bootstrappingFunction = this.applicationLoader.generateBootstrapFunction(javascripts, "glsplatform.GlsPlatform");
                    // callback out to the Main class with the function that when runned creates the application
                    _this.handlePlatformLoaded(bootstrappingFunction);
                }
                catch (error) {
                    _this.handleError(error);
                }
            }, function (e) 
			{ 
				return _this.handleError(e);
			});

            /*this.applicationLoader.load(this.cdnRoot, this.resourceVersion, this.platformCode, //appcode
            gaffing, //gaffingenabled 
            demo, //demoenabled:string, 
            debug, //debugenabled:string, 
            touchDevice, //touchdevice:string, 
            this.partnerCode, //partnercode:string, 
            this.realMoney, this.gameCode, locale, // locale
            webAudio, //webaudio:string, 
            actualWidth, //screenwidth:string, 
            actualHeight, //screenheight:string, 
            function (mainClassFunction) { return _this.handlePlatformLoaded(mainClassFunction); }, function (e) { return _this.handleError(e); });*/
			
            //load the partner adapter
			/*"mainjs/application/leanpartneradapter.LeanPartnerAdapter.js?resourceversion=4.72.0.2-1564155912&appcode=lean-ogs-gcm-partner-adapter","metadatajs/bundles/metadata/leanpartneradapter.MetaDataBundle.js?resourceversion=4.72.0.2-1564155912&appcode=lean-ogs-gcm-partner-adapter&gaffingenabled=false&demoenabled=false&debugenabled=false&touchdevice=false&partnercode=mockogs5&realmoney=true&gamecode=eightyeightfortunes&locale=en_US&webaudio=true","translationjs/bundles/translations/#{locale}/leanpartneradapter.LocalizationsBundle.js?resourceversion=4.72.0.2-1564155912&appcode=lean-ogs-gcm-partner-adapter"*/			
			//Albin Reduced Dynamicity
			var scripts = ["mainjs/application/leanpartneradapter.LeanPartnerAdapter.js?resourceversion="+this.resourceVersion+"&appcode=lean-ogs-gcm-partner-adapter", "metadatajs/bundles/metadata/leanpartneradapter.MetaDataBundle.js?resourceversion="+this.resourceVersion+"&appcode=lean-ogs-gcm-partner-adapter","translationjs/bundles/translations/"+this.locale+"/leanpartneradapter.LocalizationsBundle.js?resourceversion="+this.resourceVersion+"&appcode=lean-ogs-gcm-partner-adapter"];
			applicationLoader = this.applicationLoader;
			this.applicationLoader.loadJavascriptPart(scripts, [], this.locale, function (javascripts,applicationLoader) {
            //this.loadJavascriptPart(manifest.jsons, [], resolvedLocale, function (javascripts) {
                // take all javascript strings and eval them in a closure and return a function that returns a instance of the main class
                var bootstrappingFunction;
                try {
                    bootstrappingFunction = this.applicationLoader.generateBootstrapFunction(javascripts, "leanpartneradapter.GameEventListeningPartnerAdapter");
                    // callback out to the Main class with the function that when runned creates the application
                    _this.handlePartnerAdapterLoaded(bootstrappingFunction);
                }
                catch (error) {
                    _this.handleError(error);
                }
            }, function (e) 
			{ 
				return _this.handleError(e);
			});
			
			
            /*this.applicationLoader.load(this.cdnRoot, this.resourceVersion, this.partnerAdapter, //appcode
            gaffing, //gaffingenabled 
            demo, //"demoenabled:string, 
            debug, //debugenabled:string, 
            touchDevice, //touchdevice:string, 
            this.partnerCode, //partnercode:string, 
            this.realMoney, this.gameCode, locale, // locale
            webAudio, //webaudio:string, 
            actualWidth, //screenwidth:string, 
            actualHeight, //screenheight:string, 
            function (mainClassFunction) { return _this.handlePartnerAdapterLoaded(mainClassFunction); }, function (e) { return _this.handleError(e); });*/
			
            //load the game
			
			//Albin Reduced Dynamicity
			/*"content/eightyeightfortunes/app/eightyeightfortunes.Game.js?resourceversion=4.72.0.2-1564155912&appcode=eightyeightfortunes&gaffingenabled=false&demoenabled=false&debugenabled=false&touchdevice=false&partnercode=mockogs5&realmoney=true&gamecode=eightyeightfortunes&locale=en_US&webaudio=true","content/eightyeightfortunes/bundles/metadata/eightyeightfortunes.MetaDataBundle.js?resourceversion=4.72.0.2-1564155912&appcode=eightyeightfortunes&gaffingenabled=false&demoenabled=false&debugenabled=false&touchdevice=false&partnercode=mockogs5&realmoney=true&gamecode=eightyeightfortunes&locale=en_US&webaudio=true"*/			
			//var scripts = ["content/"+this.gameCode+"/app/"+this.gameCode+".Game.js?resourceversion="+this.resourceVersion+"&appcode="+this.gameCode, "content/"+this.gameCode+"/bundles/metadata/"+this.gameCode+".MetaDataBundle.js?resourceversion="+this.resourceVersion+"&appcode="+this.gameCode];
			var scripts = ["content/"+this.gameCode+"/resources/js/"+this.gameCode+".game.js?resourceversion="+this.resourceVersion+"&appcode="+this.gameCode, "metadatajs/bundles/gamemetadata/"+this.gameCode+".MetaDataBundle.js?resourceversion="+this.resourceVersion+"&appcode="+this.gameCode];
			applicationLoader = this.applicationLoader;
			gameCode = this.gameCode;
			this.applicationLoader.loadJavascriptPart(scripts, [], this.locale, function (javascripts,applicationLoader,gameCode) {
            //this.loadJavascriptPart(manifest.jsons, [], resolvedLocale, function (javascripts) {
                // take all javascript strings and eval them in a closure and return a function that returns a instance of the main class
                var bootstrappingFunction;
                try {
                    bootstrappingFunction = this.applicationLoader.generateBootstrapFunction(javascripts, this.gameCode+".Game");
                    // callback out to the Main class with the function that when runned creates the application
                    _this.handleGameLoaded(bootstrappingFunction);
                }
                catch (error) {
                    _this.handleError(error);
                }
            }, function (e) 
			{ 
				return _this.handleError(e);
			});
			
            /*this.applicationLoader.load(this.cdnRoot, this.resourceVersion, this.gameCode, //appcode
            gaffing, //gaffingenabled 
            demo, //"demoenabled:string, 
            debug, //debugenabled:string, 
            touchDevice, //touchdevice:string, 
            this.partnerCode, //partnercode:string, 
            this.realMoney, this.gameCode, locale, // locale
            webAudio, //webaudio:string, 
            actualWidth, //screenwidth:string, 
            actualHeight, //screenheight:string, 
            function (gameMainFunction) { return _this.handleGameLoaded(gameMainFunction); }, function (e) { return _this.handleError(e); });*/
        };
        Bootstrapper.prototype.handlePlatformLoaded = function (platformMainFunction) {
            console.log("platform loaded");
            try {
                this.platformInstance = new platformMainFunction(this.gameConfiguration);
            }
            catch (e) {
                this.handleError(new Error("Error when instantiating platform"));
                console.error(e);
                return;
            }
            this.tryToSetAll();
        };
        Bootstrapper.prototype.handlePartnerAdapterLoaded = function (partnerAdapterMainFunction) {
            var _this = this;
            console.log("partner adapter loaded");
            var newPartnerAdapter = function () {
                var standalone = window.navigator.standalone, userAgent = window.navigator.userAgent.toLowerCase(), safari = /safari/.test(userAgent), ios = /iphone|ipod|ipad/.test(userAgent);
                if (ios) {
                    //not standalone or browser means it runs in webview
                    if (!standalone && !safari) {
                        var stats = 'width=device-width';
                        var viewport = document.querySelector('meta[name=viewport]');
                        if (viewport == null) {
                            var meta = document.createElement('meta');
                            meta.setAttribute('name', 'viewport');
                            meta.setAttribute('content', stats);
                            document.getElementsByTagName('head')[0].appendChild(meta);
                            viewport = meta;
                        }
                        var fixViewport = function () {
                            var orientation = window.orientation;
                            var width = screen.width;
                            var height = screen.height;
                            if ([0, 180].some(function (i) { return window.orientation == i; })) {
                                //portrait
                                stats = 'width=' + width;
                            }
                            else {
                                //landscape
                                stats = 'width=' + height;
                            }
                            viewport.setAttribute('content', stats);
                        };
                        window.addEventListener('orientationchange', function () {
                            setTimeout(function () { return fixViewport(); }, 250);
                        });
                        setTimeout(function () { return fixViewport(); }, 1000);
                    }
                    if (safari && /version\/7/.test(userAgent)) {
                        var fixSafari7 = function () {
                            setTimeout(function () {
                                window.scrollTo(0, -100);
                            }, 250);
                        };
                        window.addEventListener('orientationchange', fixSafari7);
                        fixSafari7();
                    }
                }
                try {
                    _this.partnerAdapterInstance = new partnerAdapterMainFunction(_this.appSpec,_this.gameConfiguration);
                    _this.partnerAdapterInstance.showProgressBar(true, false);
                }
                catch (e) {
                    _this.handleError(new Error("Error when instantiating partner adapter"));
                    console.error(e);
                    return;
                }
                _this.tryToSetAll();
            };
            try {
                var pau = window['partneradapterutil'];
                if (!pau)
                    throw 'partneradapterutil not found';
                pau.wmscomm.Instance.init(this.cdnRoot, this.partnerCode, this.resourceVersion, newPartnerAdapter);
            }
            catch (ee) {
                console.log('[ERROR]: Unable to initialize WmsComm');
                console.log(ee);
                newPartnerAdapter();
            }
        };
        Bootstrapper.prototype.handleGameLoaded = function (gameMainFunction) {
            console.log("game loaded");
            try {
                var gameInstance = new gameMainFunction();
				var inject = JSON.parse('{"inject": [{"script": {"data-main": "lib/require/require_cfg.js?resourceversion=4.72.0.2-1566990050&appcode=eightyeightfortunes&gaffingenabled=false&demoenabled=false&debugenabled=false&touchdevice=false&partnercode=mockogs5&realmoney=true&gamecode=eightyeightfortunes&locale=en_GB&webaudio=true","src": "lib/require/require.js","type": "text/javascript"}},{"link": {"rel": "stylesheet","href": "resources/css/game.css"}}]}');
				this.applicationLoader.inject(inject.inject);
				window.gameConfiguration = this.gameConfiguration;
				this.gameInstance = gameInstance;
            }
            catch (e) {
                this.handleError(new Error("Error when instantiating game"));
                console.error(e);
                return;
            }
            this.tryToSetAll();
        };
        // TODO put this into a game configuration service
        Bootstrapper.prototype.getGameOrientation = function (game) {
            var portrait = ['rocketreturns'];
            var both = ['threecardpoker'];
            console.log("Game orientation for " + this.gameCode);
            if (portrait.indexOf(this.gameCode) >= 0) {
                return partneradapterapi.ORIENTATION_MODE.PORTRAIT;
            }
            else if (both.indexOf(this.gameCode) >= 0) {
                return partneradapterapi.ORIENTATION_MODE.BOTH;
            }
            return partneradapterapi.ORIENTATION_MODE.LANDSCAPE;
        };
        Bootstrapper.prototype.tryToSetAll = function () {
            var _this = this;
            if (this.platformInstance && this.partnerAdapterInstance && this.gameInstance) {
                try {
                    this.platformInstance.authenticate(
                    /*success*/ function () {
                        _this.partnerAdapterInstance.setPlatform(_this.platformInstance);
                        _this.gameInstance.getOrientationMode = function () { return _this.getGameOrientation(_this.gameInstance); };
                        _this.partnerAdapterInstance.setGame(_this.gameInstance);
                        _this.gameInstance.setPartnerAdapter(_this.partnerAdapterInstance);
                        try {
                            var dbgFrame = document.getElementById('dbgFrame');
                            if (dbgFrame) {
                                var w = dbgFrame.contentDocument.defaultView;
                                w.debug.init(window, _this.platformInstance, _this.partnerAdapterInstance, _this.gameInstance);
                            }
                        }
                        catch (e) {
                            console.error('[ERROR]: ' + e.toString());
                        }
                    }, 
                    /*failed*/ function (url, error, status) {
                        if (typeof (_this.partnerAdapterInstance['showLoginFailed']) == 'function') {
                            _this.partnerAdapterInstance['showLoginFailed'](error);
                        }
                        else {
                            _this.handleError(new Error(error));
                        }
                    });
                }
                catch (e) {
                    this.handleError(new Error("Error when connecting platform, game and partner adapter: " + e.toString()));
                    console.error(e);
                    return;
                }
            }
        };
        Bootstrapper.prototype.handleError = function (e) {
            //TODO: Should we have a go back button here as well?
            var _this = this;
            // we can get translations but we'd probably want to skip that
            var mess = "";
            mess += 'Crashed while bootstrapping' + '\n';
            //if ('message' in e) mess += e['message'] + '\n';
            if ('stack' in e)
                mess += e['stack'] + '\n';
            console.error(mess);
            var errorContainer = this.doc.createElement('div');
            errorContainer.id = 'boostrap-error-container';
            errorContainer.style['zIndex'] = '99999999';
            errorContainer.style['position'] = 'fixed';
            errorContainer.style['top'] = '0';
            errorContainer.style['bottom'] = '0';
            errorContainer.style['left'] = '0';
            errorContainer.style['right'] = '0';
            errorContainer.style['background'] = '#000000';
            errorContainer.style['color'] = '#FFFFFF';
            errorContainer.style['textAlign'] = 'center';
            var errorText = this.doc.createElement('div');
            errorText.style['position'] = 'relative';
            errorText.style['top'] = '4em';
            errorText.style['fontSize'] = '1em';
            errorText.innerHTML = this.getErrorMessage(this.locale);
            errorContainer.appendChild(errorText);
            var button = this.doc.createElement('input');
            button.type = 'button';
            button.value = 'Reload';
            button.style['position'] = 'relative';
            button.style['top'] = '6em';
            button.style['border'] = '1em';
            button.style['borderRadius'] = '1em';
            button.style['width'] = '10em';
            button.style['height'] = '3em';
            button.style['backgroundColor'] = '#FFFFFF';
            button.style['fontSize'] = '1em';
            button.onclick = function () {
                _this.win.location.reload();
            };
            errorContainer.appendChild(button);
            this.doc.body.appendChild(errorContainer);
        };
        Bootstrapper.prototype.getErrorMessage = function (locale) {
            return 'There was an error loading the game.';
        };
        return Bootstrapper;
    }());
    bootstrapper.Bootstrapper = Bootstrapper;
})(bootstrapper || (bootstrapper = {}));
