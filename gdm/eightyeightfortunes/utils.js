var leanpartneradapterview;
var utils;
(function (utils) {
    var ScrollManager = (function () {
        function ScrollManager() {
        }
        ScrollManager.prototype.stopTouchmovePropagation = function (element) {
            element.addEventListener("touchmove", this.stopPropagation, false);
        };
        ScrollManager.prototype.preventDefaultDocumentTouchmove = function () {
            document.addEventListener("touchmove", this.preventDefault, false);
        };
        ScrollManager.prototype.stopPropagation = function (e) {
            e.stopPropagation();
            return true;
        };
        ScrollManager.prototype.preventDefault = function (e) {
            e.preventDefault();
            return true;
        };
        return ScrollManager;
    }());
    utils.ScrollManager = ScrollManager;
})(utils || (utils = {}));

var utils;
(function (utils) {
	var URLParamPageNavigator = (function () {
		function URLParamPageNavigator(loc, urlParams) {
			this.urlParams = urlParams;
			this.loc = loc;
			this.lobbyNavigationListeners = [];
			this.cashierNavigationListeners = [];
			this.responsibleGamingNavigationListeners = [];
			this.reloadNavigationListeners = [];
			this.helpNavigationListeners = [];
			this.historyNavigationListeners = [];
			this.navigate = true;
		}
		URLParamPageNavigator.prototype.canGoToLobby = function () {
			return this.urlParams.lobbyurl ? true : false;
		};
		URLParamPageNavigator.prototype.goToLobby = function () {
			if (this.lobbyNavigationListeners.length) {
				this.lobbyNavigationListeners.forEach(function (listener) {
					listener.handleGotoLobby();
				});
			}
			//This flag set to false for poker stars and return without navigation
			if (!this.navigate) {
				return;
			}
			this.urlParams.lobbyurl ? this.loc.href = this.urlParams.lobbyurl : this.loc.href = "content/error-page/resources/exitpage.html";
		};
		URLParamPageNavigator.prototype.canGoToErrorLobby = function () {
			return this.urlParams.errorurl ? true : false;
		};
		URLParamPageNavigator.prototype.goToErrorLobby = function () {
			this.loc.href = this.urlParams.errorurl;
		};
		URLParamPageNavigator.prototype.canGoToDeposit = function () {
			return this.urlParams.depositurl ? true : false;
		};
		URLParamPageNavigator.prototype.goToDeposit = function () {
			this.loc.href = this.urlParams.depositurl;
		};
		URLParamPageNavigator.prototype.canGoToCashier = function () {
			return this.urlParams.cashierurl ? true : false;
		};
		URLParamPageNavigator.prototype.goToCashier = function () {
			if (this.cashierNavigationListeners.length) {
				this.cashierNavigationListeners.forEach(function (listener) {
					listener.handleOpenCashier();
				});
			}
			else {
				this.loc.href = this.urlParams.cashierurl;
			}
		};
		URLParamPageNavigator.prototype.canGoToResponsibleGaming = function () {
			return this.urlParams.responsiblegamingurl ? true : false;
		};
		URLParamPageNavigator.prototype.goToResponsibleGaming = function () {
			if (this.responsibleGamingNavigationListeners.length) {
				this.responsibleGamingNavigationListeners.forEach(function (listener) {
					listener.handleOpenResponsibleGaming();
				});
			}
			else {
				this.loc.href = this.urlParams.responsiblegamingurl;
			}
		};
		URLParamPageNavigator.prototype.getHelpPageUrl = function () {
			if (this.urlParams.locale == null) {
				this.urlParams.locale = "en_GB";
			}
			var url = "content/external-help/resources/" + this.urlParams.game + "/" + this.urlParams.game + "_" + this.urlParams.locale + ".html";
			return url;
		};
		URLParamPageNavigator.prototype.goToExternalHelp = function () {
			if (this.helpNavigationListeners.length) {
				this.helpNavigationListeners.forEach(function (listener) {
					listener.handleOpenHelp();
				});
			}
			else {
				var url = this.getHelpPageUrl();
				window.open(url, "Help", "width=600, height=400, resizable = yes, scrollbars = yes");
			}
		};
		URLParamPageNavigator.prototype.canGoToLogin = function () {
			return this.urlParams.loginurl ? true : false;
		};
		URLParamPageNavigator.prototype.goToLogin = function () {
			this.loc.href = this.urlParams.loginurl;
		};
		URLParamPageNavigator.prototype.canGoToContact = function () {
			return this.urlParams.contacturl ? true : false;
		};
		URLParamPageNavigator.prototype.goToContact = function () {
			this.loc.href = this.urlParams.contacturl;
		};
		URLParamPageNavigator.prototype.canReload = function () {
			return true;
		};
		URLParamPageNavigator.prototype.reload = function () {
			this.reloadNavigationListeners.forEach(function (listener) {
				listener.handleReload();
			});
			this.loc.reload(false); // false is reload from cache
		};
		URLParamPageNavigator.prototype.canGoToRealMoney = function () {
			var canHandleRealMoneySwitch = this.urlParams.partnerticket != null || this.canGoToLogin() || this.canGoToLobby();
			return !this.urlParams.realmoney && !this.urlParams.are888EventsEnabled() && canHandleRealMoneySwitch;
		};
		URLParamPageNavigator.prototype.goToRealMoney = function () {
			if (this.urlParams.partnerticket) {
				var href = sitecontext.SiteContext.getHref(this.loc);
				this.loc.href = href.replace("realmoney=false", "realmoney=true");
			}
			else if (this.canGoToLogin()) {
				this.goToLogin();
			}
			else if (this.canGoToLobby()) {
				this.goToLobby();
			}
		};
		//US28078 - RealityButtons
		URLParamPageNavigator.prototype.goToRealityCheckHistory = function () {
			if (this.historyNavigationListeners.length) {
				this.historyNavigationListeners.forEach(function (listener) {
					listener.handleOpenHistory();
				});
			}
			else {
				var url = this.urlParams.realityCheckHistoryLink;
				window.open(url, '_blank');
			}
		};
		// Check if the realityExtra parameter is there and return that value.
		URLParamPageNavigator.prototype.getRealityExtra = function () {
			return this.urlParams.realityExtra;
		};
		URLParamPageNavigator.prototype.addLobbyNavigationListener = function (listener) {
			this.lobbyNavigationListeners.push(listener);
		};
		URLParamPageNavigator.prototype.addCashierNavigationListener = function (listener) {
			this.cashierNavigationListeners.push(listener);
		};
		URLParamPageNavigator.prototype.addResponsibleGamingNavigationListener = function (listener) {
			this.responsibleGamingNavigationListeners.push(listener);
		};
		URLParamPageNavigator.prototype.addReloadNavigationListener = function (listener) {
			this.reloadNavigationListeners.push(listener);
		};
		URLParamPageNavigator.prototype.addHelpNavigationListener = function (listener) {
			this.helpNavigationListeners.push(listener);
		};
		URLParamPageNavigator.prototype.addHistoryNavigationListener = function (listener) {
			this.historyNavigationListeners.push(listener);
		};
		URLParamPageNavigator.prototype.getNavigateFlag = function () {
			return this.navigate;
		};
		URLParamPageNavigator.prototype.setNavigateFlag = function (navigate) {
			this.navigate = navigate;
		};
		return URLParamPageNavigator;
	}());
	utils.URLParamPageNavigator = URLParamPageNavigator;
})(utils  || (utils = {}));

var utils;
(function (utils) {
	var ClickHelper = (function () {
		function ClickHelper(doc, isTouchDevice) {
			this.doc = doc;
			this.isTouchDevice = window.navigator.standalone ? false : isTouchDevice;
		}
		ClickHelper.prototype.addOnClickListenerRemoveWhenInvoked = function (element, onClickFunction) {
			var _this = this;
			var cb = function (ev) {
				_this.removeOnClickListener(element, cb);
				onClickFunction(ev);
			};
			this.addOnClickListener(element, cb);
		};
		ClickHelper.prototype.addResponsiveClickListener = function (element, onClickFunction) {
			if (this.isTouchDevice) {
				element.addEventListener("touchend", onClickFunction, false);
			}
			else {
				element.addEventListener("click", onClickFunction, false);
			}
		};
		ClickHelper.prototype.addOnClickListener = function (element, onClickFunction) {
			if (this.isTouchDevice) {
				element.addEventListener("click", onClickFunction, false);
			}
			else {
				element.addEventListener("click", onClickFunction, false);
			}
		};
		ClickHelper.prototype.removeOnClickListener = function (element, onClickFunction) {
			if (this.isTouchDevice) {
				element.removeEventListener("click", onClickFunction, false);
			}
			else {
				element.removeEventListener("click", onClickFunction, false);
			}
		};
		ClickHelper.prototype.addOnMouseDown = function (element, onMouseDownFunction) {
			if (this.isTouchDevice) {
				element.addEventListener("touchstart", onMouseDownFunction, false);
			}
			else {
				element.addEventListener("mousedown", onMouseDownFunction, false);
			}
		};
		ClickHelper.prototype.removeOnMouseDown = function (element, onMouseDownFunction) {
			if (this.isTouchDevice) {
				element.removeEventListener("touchstart", onMouseDownFunction, false);
			}
			else {
				element.removeEventListener("mousedown", onMouseDownFunction, false);
			}
		};
		ClickHelper.prototype.addOnMouseUp = function (element, onMouseUpFunction) {
			if (this.isTouchDevice) {
				element.addEventListener("touchend", onMouseUpFunction, false);
			}
			else {
				element.addEventListener("mouseup", onMouseUpFunction, false);
			}
		};
		ClickHelper.prototype.removeOnMouseUp = function (element, onMouseUpFunction) {
			if (this.isTouchDevice) {
				element.removeEventListener("touchend", onMouseUpFunction, false);
			}
			else {
				element.removeEventListener("mouseup", onMouseUpFunction, false);
			}
		};
		ClickHelper.prototype.addOnMovingOutsideElementListener = function (element, onMovingOutsideFunction) {
			var _this = this;
			if (this.isTouchDevice) {
				element.addEventListener("touchmove", function (event) {
					if (_this.doc.elementFromPoint(event["touches"][0].pageX, event["touches"][0].pageY) != element) {
						event.preventDefault();
						onMovingOutsideFunction(event);
					}
				}, false);
			}
			else {
				element.addEventListener("mouseout", function (event) {
					event.preventDefault();
					onMovingOutsideFunction(event);
				}, false);
			}
		};
		ClickHelper.prototype.addOnChangeListener = function (element, onChangeFunction) {
			element.addEventListener("change", onChangeFunction, false);
		};
		ClickHelper.prototype.cloneElementWithoutListeners = function (element) {
			var clone = null;
			if (element) {
				clone = element.cloneNode(true);
				while (element.firstChild) {
					clone.appendChild(element.lastChild);
				}
				element.parentNode.replaceChild(clone, element);
			}
			return clone;
		};
		return ClickHelper;
	}());
	utils.ClickHelper = ClickHelper;
})(utils || (utils = {}));


var utils;
(function (utils) {
	var ResourceLoader = (function () {
		function ResourceLoader() {
		}
	    ResourceLoader.prototype.loadJavaScript= function(source, callback) {
			var script = document.createElement('script');
			var prior = document.getElementsByTagName('script')[0];
			script.async = 1;
			script.onload = script.onreadystatechange = function (_, isAbort) {
				if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
					script.onload = script.onreadystatechange = null;
					script = undefined;
					if (!isAbort) {
						if (callback) {
							callback();
						}
					}
				}
			};
			script.src = source;
			prior.parentNode.insertBefore(script, prior);
		};
		
	    ResourceLoader.prototype.loadStyleSheet = function(path) {
			var link = document.createElement("LINK");
			link.rel = "stylesheet";
			link.href= path;
			document.head.appendChild(link);  
	    };  		
		return ResourceLoader;
	}());
	utils.ResourceLoader = ResourceLoader;
	
})(utils || (utils = {}));

var utils;
(function (utils) {
    var homebutton;
    (function (homebutton) {
        var InvisibleHomeButton = (function () {
            function InvisibleHomeButton(view) {
                view.hideHomeButton();
            }
            return InvisibleHomeButton;
        }());
        homebutton.InvisibleHomeButton = InvisibleHomeButton;
    })(homebutton = utils.homebutton || (utils.homebutton = {}));
})(utils || (utils = {}));

var utils;
(function (utils) {
    var homebutton;
    (function (homebutton) {
        var HomeButton = (function () {
            function HomeButton(view, dialogManager, pageNavigator) {
                this.view = view;
                this.dialogManager = dialogManager;
                this.pageNavigator = pageNavigator;
                // only show the home button if we have a lobby url available
                if (this.pageNavigator.canGoToLobby()) {
                    this.view.connectHomeButtonManager(this);
                    this.view.showHomeButton();
                }
                else {
                    this.view.hideHomeButton();
                }
            }
            HomeButton.prototype.clickedHomeButton = function () {
                // when clicked, show the confirm go back dialog
                this.dialogManager.showConfirmGoBack();
            };
            return HomeButton;
        }());
        homebutton.HomeButton = HomeButton;
    })(homebutton = utils.homebutton || (utils.homebutton = {}));
})(utils || (utils = {}));

var menudisplayview;
(function (menudisplayview) {
    var LeanMenuView = (function () {
        function LeanMenuView(localizations, doc, clickHelper, pageNavigator, gameConfiguration, gdmAdapter) {
            var _this = this;
            this.localizations = localizations;
            this.doc = doc;
            this.clickHelper = clickHelper;
            this.pageNavigator = pageNavigator;
            this.localizeTexts();
            this.setupExternalLinksMenuItems();
            this.setupClickListeners();
            this.doc.getElementById("menu-chunk-information").style.display = "none";
            this.doc.getElementById("menu-checkbox-sound-check").style.display = "inline-block";
			this.gdmAdapter = gdmAdapter;
            this.gdmAdapter.setPreferencesHandler(function (value) {
                _this.showMenu();
            });
            this.commonUIMuteHandler = this.gdmAdapter.setMuteHandler(function (value) {
            });
            this.clickHelper.addResponsiveClickListener(this.doc.getElementById("menu-checkbox-sound"), function (event) {
                _this.commonUIMuteHandler(_this.isElementVisible("menu-checkbox-sound-check"));
            });
        }
        LeanMenuView.prototype.showSubMenu = function (elementId) {
            this.showElement(elementId);
            this.hideElement("menu-items");
        };
        LeanMenuView.prototype.setupExternalLinksMenuItems = function () {
            var _this = this;
            // Home
            this.hideElement("menu-item-home");
            // Contact
            if (this.pageNavigator.canGoToContact()) {
                this.setText("menu-item-text-contact", this.localizations.getMenuContact());
                this.showElement("menu-item-contact");
                this.clickHelper.addOnClickListener(this.doc.getElementById("menu-item-contact"), function (ev) {
                    _this.pageNavigator.goToContact();
                });
            }
            else {
                this.hideElement("menu-item-contact");
            }
            // Deposit
            if (this.pageNavigator.canGoToDeposit()) {
                this.setText("menu-item-text-deposit", this.localizations.getMenuDeposit());
                this.showElement("menu-item-deposit");
                this.clickHelper.addOnClickListener(this.doc.getElementById("menu-item-deposit"), function (ev) {
                    _this.pageNavigator.goToDeposit();
                });
            }
            else {
                this.hideElement("menu-item-deposit");
            }
            // Deposit
            if (this.pageNavigator.canGoToCashier()) {
                this.setText("menu-item-text-cashier", this.localizations.getMenuCashier());
                this.showElement("menu-item-cashier");
                this.clickHelper.addOnClickListener(this.doc.getElementById("menu-item-cashier"), function (ev) {
                    _this.pageNavigator.goToCashier();
                });
            }
            else {
                this.hideElement("menu-item-cashier");
            }
            // Responsible gaming
            if (this.pageNavigator.canGoToResponsibleGaming()) {
                this.setText("menu-item-text-responsible-gaming", this.localizations.getMenuResponsibleGaming());
                this.showElement("menu-item-responsible-gaming");
                this.clickHelper.addOnClickListener(this.doc.getElementById("menu-item-responsible-gaming"), function (ev) {
                    _this.pageNavigator.goToResponsibleGaming();
                });
            }
            else {
                this.hideElement("menu-item-responsible-gaming");
            }
            // Real money
            this.hideElement("menu-item-playforreal");
            // if all are disabled then remove the chunk
            if (!this.pageNavigator.canGoToResponsibleGaming() &&
                !this.pageNavigator.canGoToDeposit() &&
                !this.pageNavigator.canGoToContact() &&
                !this.pageNavigator.canGoToCashier()) {
                this.hideElement("menu-chunk-support");
            }
        };
        LeanMenuView.prototype.setupClickListeners = function () {
            var _this = this;
            var menuBack = this.doc.getElementById("menu-topbar-back");
            this.clickHelper.addResponsiveClickListener(menuBack, function (ev) { return _this.closeMenuClicked(); });
        };
        LeanMenuView.prototype.connectAudioManager = function (audioManager) {
            this.audioManager = audioManager;
        };
        LeanMenuView.prototype.closeMenuClicked = function () {
            this.hideMenu();
        };
        LeanMenuView.prototype.showSoundOn = function () {
            this.showElement("menu-checkbox-sound-check");
        };
        LeanMenuView.prototype.showSoundOff = function () {
            this.hideElement("menu-checkbox-sound-check");
        };
        LeanMenuView.prototype.requestSoundChange = function () {
            this.audioManager.requestSoundChange();
        };
        LeanMenuView.prototype.showSoundEnabled = function (value) {
            if (value) {
                this.showSoundOn();
            }
            else {
                this.showSoundOff();
            }
        };
        LeanMenuView.prototype.openMenuClicked = function () {
            this.showMenu();
        };
        LeanMenuView.prototype.showMenu = function () {
            this.doc.getElementById("menu").style.display = "block";
        };
        LeanMenuView.prototype.hideMenu = function () {
            this.doc.getElementById("menu").style.display = "none";
        };
        LeanMenuView.prototype.localizeTexts = function () {
            // top header
            this.doc.getElementById("menu-topbar-text").innerHTML = this.localizations.getMenuSettings();
            // sub top headers
            // headers
            this.setText("menu-header-game-settings", this.localizations.getMenuGameSettings());
            this.setText("menu-header-support", this.localizations.getMenuSupport());
            // menu items
            this.setText("menu-item-text-sound", this.localizations.getMenuSound());
        };
        LeanMenuView.prototype.showElement = function (elementId) {
            this.doc.getElementById(elementId).style.display = "inline-block";
        };
        LeanMenuView.prototype.hideElement = function (elementId) {
            this.doc.getElementById(elementId).style.display = "none";
        };
        LeanMenuView.prototype.hideSubMenu = function (elementId) {
            this.hideElement(elementId);
            this.showElement("menu-items");
        };
        LeanMenuView.prototype.setText = function (elementId, text) {
            this.doc.getElementById(elementId).innerHTML = text;
        };
        LeanMenuView.prototype.isElementVisible = function (elementId) {
            return this.doc.getElementById(elementId).style.display == "inline-block";
        };
        LeanMenuView.prototype.setMenuHandler = function (type, handler) {
            var _this = this;
            var updateMethod = null;
            switch (type) {
                case 'MUTE':
                    {
                        var check = this.doc.getElementById('menu-checkbox-sound-check');
                        this.doc.getElementById('menu-item-sound')['show'] = true;
                        this.clickHelper.addResponsiveClickListener(this.doc.getElementById('menu-checkbox-sound'), function (event) {
                            var checked = check.style.display != 'none';
                            _this.showSoundEnabled(!checked);
                            handler(checked);
                        });
                        this.gdmAdapter.setMuteHandler(function (value) {
                            handler(value);
                            check.style.display = value ? "none" : "inline-block";
                        });
                        updateMethod = function (data) {
                            _this.showSoundEnabled(data);
                        };
                        break;
                    }
                case 'SETTINGS':
                    {
                        var menuButton = document.getElementById('top-bar-menu-button');
                        var menu = document.getElementById('menu');
                        var getStyle = function (element, property) {
                            var style = window.getComputedStyle(element, null);
                            if (style.getPropertyValue != null) {
                                return style.getPropertyValue(property);
                            }
                            else if (style.getPropertyCSSValue != null) {
                                return style.getPropertyCSSValue(property).cssText;
                            }
                            return null;
                        };
                        // create an observer instance
                        var observer = new MutationObserver(function (mutations, o) {
                            var trigger = false;
                            var visible = getStyle(menuButton, 'display') != 'none';
                            var open = getStyle(menu, 'display') != 'none';
                            mutations.forEach(function (mutation) {
                                console.log(mutation.type);
                                if ((mutation.target == menu || mutation.target == menuButton)
                                    && mutation.attributeName == 'style') {
                                    trigger = true;
                                }
                            });
                            if (trigger) {
                                handler({ 'visible': visible, 'open': open });
                            }
                        });
                        // configuration of the observer:
                        var config = { attributes: true, childList: true, characterData: true };
                        // pass in the target node, as well as the observer options
                        observer.observe(menuButton, config);
                        observer.observe(menu, config);
                        updateMethod = function (data) {
                            if (data == null) {
                                return;
                            }
                            if (data['open'] != null) {
                                var open = data['open'];
                                if (open) {
                                    _this.showMenu();
                                }
                                else {
                                    _this.hideMenu();
                                }
                            }
                            if (data['visible'] != null) {
                                var visible = data['visible'];
                                menuButton.style.display = (visible ? 'block' : 'none');
                            }
                        };
                        break;
                    }
            }
            this.updateSettings();
            return updateMethod;
        };
        LeanMenuView.prototype.updateSettings = function () {
            var section = this.doc.getElementById('menu-chunk-game-settings');
            var show = false;
            for (var i = 0; i < section.children.length; i++) {
                var child = section.children[i];
                if (child['show'] == true) {
                    show = true;
                    child.style.display = 'block';
                }
                else if (child.getAttribute('class') == 'menu-item') {
                    child.style.display = 'none';
                }
            }
            if (show) {
                section.style.display = 'block';
            }
            else {
                section.style.display = 'none';
            }
        };
        LeanMenuView.prototype.setEventHandler = function (handler) {
            this.eventHandler = handler;
        };
        return LeanMenuView;
    }());
    menudisplayview.LeanMenuView = LeanMenuView;
})(menudisplayview || (menudisplayview = {}));

var displayview;
(function (displayview) {
    var ViewUpdateManager = (function () {
        function ViewUpdateManager(view, currencyFormatter, gdmAdapter) {
            this.view = view;
            this.currencyFormatter = currencyFormatter;
			this.gdmAdapter = gdmAdapter;
        }
        ViewUpdateManager.prototype.setBalance = function (value) {
        };
        ViewUpdateManager.prototype.setWin = function (win, stake) {
        };
        ViewUpdateManager.prototype.setTotalBet = function (bet, caller) {
            this.stake = bet;
            this.view.setTotalBet(this.currencyFormatter.format(this.stake * 100));
			if(caller == null || caller ==  undefined || caller != "GDM_ADAPTER")
			{
				this.gdmAdapter.updateBet(this.stake);
			}
			//wiGcmAdapter.gcm.stakeUpdate(this.stake);
        };
        ViewUpdateManager.prototype.startedPlay = function () {
        };
        ViewUpdateManager.prototype.finishedPlay = function () {
        };
        ViewUpdateManager.prototype.finishedPostGameAnimations = function () {
        };
        ViewUpdateManager.prototype.resetHard = function () {
        };
        return ViewUpdateManager;
    }());
    displayview.ViewUpdateManager = ViewUpdateManager;
    var SplitBalances = (function () {
        function SplitBalances(cash, bonus) {
            this.cash = cash;
            this.bonus = bonus;
        }
        SplitBalances.prototype.getCash = function () {
            return this.cash;
        };
        SplitBalances.prototype.getBonus = function () {
            return this.bonus;
        };
        return SplitBalances;
    }());
    displayview.SplitBalances = SplitBalances;
})(displayview || (displayview = {}));


var displayview;
(function (displayview) {
    var LeanView = (function () {
        function LeanView(doc, clickHelper, menuView, scrollManager, currencyFormatter, gameConfiguration, gdmAdapter) {
            this.hasHomeButton = true;
            this.doc = doc;
            this.clickHelper = clickHelper;
            this.menuView = menuView;
            this.scrollManager = scrollManager;
            this.currencyFormatter = currencyFormatter;
			this.gameConfiguration= gameConfiguration;
			this.gdmAdapter = gdmAdapter;
        }
        LeanView.prototype.getDoc = function () {
            return this.doc;
        };
        LeanView.prototype.connectHomeButtonManager = function (homeButton) {
            var homeButtonElement = this.doc.getElementById("top-bar-home-button");
            this.clickHelper.addResponsiveClickListener(homeButtonElement, function (ev) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                homeButton.clickedHomeButton();
            });
        };
        LeanView.prototype.setHasHomeButton = function (showHomeButton) {
            this.hasHomeButton = showHomeButton;
        };
        LeanView.prototype.showHomeButton = function () {
            if (this.hasHomeButton) {
                this.doc.getElementById("top-bar-home-button").style.display = "inline-block";
            }
        };
        LeanView.prototype.hideHomeButton = function () {
            this.doc.getElementById("top-bar-home-button").style.display = "none";
        };
        LeanView.prototype.elementOrParentHasClass = function (element, className) {
            if (!element) {
                return false;
            }
            if (element.classList.contains(className)) {
                return true;
            }
            return this.elementOrParentHasClass(element.parentElement, className);
        };
        LeanView.prototype.addAcceleration = function (element, accelerator, increment) {
            this.clickHelper.addOnMouseDown(element, function (ev) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                accelerator.start(increment);
            });
            this.clickHelper.addOnMouseUp(element, function (ev) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                accelerator.stop();
            });
            this.clickHelper.addOnMovingOutsideElementListener(element, function (ev) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                accelerator.stop();
            });
        };
        LeanView.prototype.showSlowConnectionDetected = function (translatedMessage) {
            this.doc.getElementById("slow-connection-container").style.display = "block";
            this.doc.getElementById("slow-connection-text").innerHTML = translatedMessage;
        };
        LeanView.prototype.hideSlowConnectionDetected = function () {
            this.doc.getElementById("slow-connection-container").style.display = "none";
        };
        LeanView.prototype.showMenuButton = function () {
            var menuButton = this.doc.getElementById("top-bar-menu-button");
            menuButton.style.display = "block";
        };
        LeanView.prototype.hideMenuButton = function () {
            var menuButton = this.doc.getElementById("top-bar-menu-button");
            menuButton.style.display = "none";
        };
        LeanView.prototype.showGameAndPartnerAdapter = function () {
            this.doc.getElementById("game-and-partneradapter").style.display = "block";
        };
        LeanView.prototype.hideGameAndPartnerAdapter = function () {
            this.doc.getElementById("game-and-partneradapter").style.display = "none";
        };
        LeanView.prototype.setClockText = function (text) {
            this.doc.getElementById("top-bar-clock-text").innerHTML = text;
        };
        LeanView.prototype.setTotalBetLabel = function (formattedLabel) {
            //this.doc.getElementById("button-bar-total-bet-label-text").innerHTML = formattedLabel;
            this.doc.getElementById("status-bar-totalbet-label-text").innerHTML = formattedLabel;
            //this.doc.getElementById("bottom-totalbet-label-text").innerHTML = formattedLabel
            //this.doc.getElementById("betlevel-menu-totalbet-header-text").innerHTML = formattedLabel;
        };
        LeanView.prototype.setTotalBet = function (formattedBet) {
            //this.doc.getElementById("button-bar-total-bet-value-text").innerHTML = formattedBet;
            this.doc.getElementById("status-bar-totalbet-value-text").innerHTML = formattedBet;
            //this.doc.getElementById("bottom-totalbet-value-text").innerHTML = formattedBet
            //this.doc.getElementById("betlevel-menu-totalbet-value").innerHTML = formattedBet;
        };
        LeanView.prototype.setBalanceLabel = function (formattedLabel) {
            this.doc.getElementById("status-bar-balance-label-text").innerHTML = formattedLabel.toUpperCase() + ":";
        };
        LeanView.prototype.setBalance = function (formattedBalance) {
            this.doc.getElementById("status-bar-balance-value-text").innerHTML = formattedBalance;
        };
        LeanView.prototype.setWinLabel = function (formattedLabel) {
            this.doc.getElementById("status-bar-win-label-text").innerHTML = formattedLabel.toUpperCase() + ":";
        };
        LeanView.prototype.setWin = function (formattedWin) {
            this.doc.getElementById("status-bar-win-value-text").innerHTML = formattedWin;
        };
        //TODO: This should be part of a IVersionView or something
        LeanView.prototype.setAndShowVersion = function (versionString) {
            this.doc.getElementById("top-bar-version-text").innerHTML = versionString;
        };
        LeanView.prototype.getGameDiv = function () {
            return this.doc.getElementById("game-container");
        };
        //TODO: This should be a part of a new IProgressBarView or something
        LeanView.prototype.updateProgressBar = function (percentage) {
            this.doc.getElementById("progress-bar").style.width = (percentage * 100) + "%";
        };
        //TODO: This should be a part of a new IProgressBarView or something
        LeanView.prototype.hideProgressBar = function () {
            this.doc.getElementById("progress-bar-modal").style.display = "none";
        };
        //TODO: This should be a part of a new IProgressBarView or something
        LeanView.prototype.showProgressBar = function (message) {
            this.doc.getElementById("progress-bar-modal").style.display = "block";
            this.doc.getElementById("progress-bar-text").innerHTML = message;
        };
        //TODO: This should be in a ITickerView
        LeanView.prototype.showTickerMessage = function (translatedMessage) {
            this.doc.getElementById("ticker-bar-value-text").innerHTML = translatedMessage;
        };
        //TODO: This should be in a ITickerView
        LeanView.prototype.hideTickerMessage = function () {
            this.doc.getElementById("ticker-bar-value-text").innerHTML = "";
        };
        LeanView.prototype.showErrorDialog = function (title, message, buttonText, buttonCallback) {
            var errorCode = null, errorCategory = "CRITICAL", errorSeverity = "ERROR";
            // check if error message has an error code.  if so split it into separate variables.
            var reResult = /(.+) code:(.+)/.exec(message);
            if (reResult != null) {
                message = reResult[1];
                errorCode = +reResult[2];
            }
            switch (errorCode) {
                case 1:
                case 2:
                case 3:
                case 4:
                    errorCategory = "NON_RECOVERABLE_ERROR";
                    break;
                case 102:
                case 1050:
                    errorCategory = "RECOVERABLE_ERROR";
                    break;
                case 1000:
                    errorCategory = "LOGIN_ERROR";
                    break;
                case 1006:
                    errorCategory = "INSUFFICIENT_FUNDS";
                    errorSeverity = "INFO";
                    break;
            }
            switch (errorCode) {
                case 1:
                case 2:
                case 3:
                case 110:
                case 1003:
                case 1007:
                case 1008:
                case 1041:
                    message = "A technical error has occurred. If it persists please contact customer support.";
                    break;
                case 102:
                    message = "A technical error has occurred. Please try again";
                    break;
                case 1000:
                    message = "You are not currently logged in. Please log in and try again.";
                    break;
                case 1019:
                case 1109:
                    message = "Responsible gaming limits reached. The game will now close.";
                    break;
                case 1035:
                    message = "Your account is blocked. The game will now close. Please contact customer support.";
                    break;
                case 1050:
                    //TODO: This needs to be converted to use Localised messages.
                    message = "This jackpot is already claimed.";
                    break;
                case 4:
                    message = "Invalid Bet Level for Free Round.";
                    break;
            }
            // make sure gcm.gameReady() is called before showing an error message.  if there is an error during the game's initialization it may not have called this already.
            //wiGcmAdapter.gameReady();
			this.gdmAdapter.gameReady();
            var errorCodeString = (errorCode == null) ? "" : errorCode.toString();
			this.gdmAdapter.handleError(errorCategory, errorSeverity, errorCodeString, message);
            //wiGcmAdapter.gcm.handleError(errorCategory, errorSeverity, errorCodeString, message);
        };
        LeanView.prototype.showGameRecoveryDialog = function (buttonCallback) {
            // make sure gcm.gameReady() is called before showing an error message.  if there is an error during the game's initialization it may not have called this already.
            //wiGcmAdapter.gameReady();
			this.gdmAdapter.gameReady();
            this.setCallback(buttonCallback);
			this.gdmAdapter.handleError("RECOVERABLE_ERROR", "INFO", "", "A game is already in progress, resuming...");
            //wiGcmAdapter.gcm.handleError("RECOVERABLE_ERROR", "INFO", "", "A game is already in progress, resuming...");
        };
        LeanView.prototype.showInfoDialog = function (title, message, buttonText, buttonCallback) {
            // not used
        };
        LeanView.prototype.showDialogForRealityCheck = function (title, message, quitButtonText, stayButtonText, historyButtonText, quitCallback, stayCallback, historyCallback) {
            // not used
        };
        LeanView.prototype.showResponsibleGamingDialog = function (title, message, quitButtonText, stayButtonText, quitCallback, stayCallback) {
            // not used
        };
        LeanView.prototype.showInsufficientFundsDialog = function (title, message, quitButtonText, stayButtonText, quitCallback, stayCallback) {
            // not used
        };
        LeanView.prototype.showConfirmExitDialog = function (title, message, quitButtonText, stayButtonText, quitCallback, stayCallback) {
            // not used
        };
        LeanView.prototype.setCurrentGameRoundId = function (id) {
            this.doc.getElementById("top-bar-current-gameround-id").innerHTML = id;
        };
        LeanView.prototype.setLastGameRoundId = function (id) {
            this.doc.getElementById("top-bar-last-gameround-id").innerHTML = id;
        };
        LeanView.prototype.parseCurrency = function (formattedCurrency) {
            var result = "";
            for (var i = 0; i < formattedCurrency.length; i++) {
                var c = parseInt(formattedCurrency.charAt(i));
                if (!isNaN(c)) {
                    result += '' + c;
                }
            }
            // TODO: Dividing by 100 here, but might need to account for a currency multiplier too
            return Number(result) / 100;
        };
        LeanView.prototype.setCallback = function (callback) {
            //wiGcmAdapter.setResumeHandler(callback);
        };
        LeanView.prototype.setMenuHandler = function (type, handler) {
            return this.menuView.setMenuHandler(type, handler);
        };
        LeanView.prototype.setEventHandler = function (handler) {
            this.menuView.setEventHandler(handler);
        };
        LeanView.prototype.showStatusBar = function (visible) {
            var elems = ['status-bar', 'top-bar-background', 'game-container'];
            var i;
            for (i = 0; i < elems.length; i++) {
                var elem = this.doc.getElementById(elems[i]);
                if (elem) {
                    elem.setAttribute('showStatusBar', '' + visible);
                }
            }
        };
        return LeanView;
    }());
    displayview.LeanView = LeanView;
})(displayview || (displayview = {}));


