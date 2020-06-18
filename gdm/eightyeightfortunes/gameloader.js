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

var bootstrapper;
(function (bootstrapper) {
    var Bootstrapper = (function () {
        function Bootstrapper(win, doc, partnerAdapter, realMoney, locale, gameCode, gameConfiguration) 
	{
		
		var _this = this;
		this.win = win;
		this.doc = doc;
        this.gameCode = gameCode;
		this.locale = locale;
		this.gameConfiguration = gameConfiguration;
		this.partnerAdapterInstance =  partnerAdapter;
		var browserLanguage = this.win.navigator.language != undefined ? this.win.navigator.language : this.win.navigator.browserLanguage;
		this.localeResolver = new bootstrapping.LanguageAndCountryLocaleCodeResolver(browserLanguage);
		this.applicationLoader = new bootstrapping.ApplicationLoader(this.win, this.localeResolver, sitecontext.SiteContext.getParameters());
		var scripts = ["resources/js/"+this.gameCode+".Game.js?appcode="+this.gameCode, "bundles/metadata/"+this.gameCode+".MetaDataBundle.js?appcode="+this.gameCode];
			//var scripts = ["content/"+this.gameCode+"/resources/js/"+this.gameCode+".game.js?resourceversion="+this.resourceVersion+"&appcode="+this.gameCode, "metadatajs/bundles/gamemetadata/"+this.gameCode+".MetaDataBundle.js?resourceversion="+this.resourceVersion+"&appcode="+this.gameCode];
		this.loadGame(scripts);

	}
	
	Bootstrapper.prototype.loadGame = function (scripts) 
	{
		_this = this;
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
	};
	Bootstrapper.prototype.handleGameLoaded = function (gameMainFunction) {
		console.log("game loaded");
		try {
			var gameInstance = new gameMainFunction();
			var inject = JSON.parse('{"inject": [{"script": {"data-main": "lib/require/require_cfg.js","src": "lib/require/require.js","type": "text/javascript"}},{"link": {"rel": "stylesheet","href": "resources/css/game.css"}},{"link": {"rel": "stylesheet","href": "resources/css/help.css"}},{"link": {"rel": "stylesheet","href": "resources/css/pays.css"}}]}');
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
	
	Bootstrapper.prototype.tryToSetAll = function () {
		var _this = this;
		if (this.partnerAdapterInstance && this.gameInstance) {
			try {
					_this.gameInstance.getOrientationMode = function () { return _this.partnerAdapterInstance.getOrientation(); };
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
