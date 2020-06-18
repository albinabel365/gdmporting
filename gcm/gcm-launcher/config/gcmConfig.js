var GCMConfig = (function () {
    var _gameProviderHostNameList = [
        "localhost",
        "127.0.0.1",
		"localhost:8000",
		"localhost:2015",
        "1x2uk.com",
        "1x2-cloud-1.com",
        "blueprintgaming.com",
        "bornlucky-test.gamevy.com",
        "cloudfront.net",
        "inspiredvirgo.com",
        "gamelauncher-stage.contentmedia.eu",
        "greentube.com",
        "h5grgs.co",
        "h5grgs.com",
        "nagarro.com",
        "nektan.com",
        "nyx-ogs-2pp-int.s3.amazonaws.com",
        "nyx-ogs-cstatic-test.s3.amazonaws.com",
        "nyx.prerelease-env.biz",
        "finrings.com",
        "nyxop.net",
        "agtonline.com",
        "openbet.com",
        "pariplaydev.com",
        "qa.tgcn.io",
        "wagerworks.com",
        "wi-gameserver.com",
        "gamevy.com",
        "pragmaticplay.net",
        "realistic-uat.com",
        "thunderkick.com",
        "pariplaygames.com",
        "gameiom.com",
    ];

    var _operator_Properties = {
        "26": {
            "desktop": {
              commonUIUrl: "ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-gg.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "default": {
            "desktop": {
              commonUIUrl: "/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "http://localhost:2015/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "176": {
            "desktop": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "preview",
                apiKey: "Y373148qVtmA",
                credential: "device",
                gsUrl: "http://gam-registration-stage-mt.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "897": {
            "desktop": {
              commonUIUrl: "http://www.staging.skyvegas.com/commonui",
            },
            "mobile": {
              commonUIUrl: "http://www.staging.skyvegas.com/commonui",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "C382228mA4Ep",
                credential: "device",
                gsUrl: "http://gam-registration-stage-gg.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-gg.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "963": {
            "desktop": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "662": {
            "desktop": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ogs/mobile-commonui/commonui.html",
              scriptUrl: "http://ogs-gcm-eu-stage.nyxop.net/bede/bede-bridge.js",
              containerUrls: {
                  "qa02-grosvenorcasinos.bedegaming.net": "http://qa02-grosvenorcasinos.bedegaming.net/in-game-notifications",
                  "np03-grosvenorcasinos.rank.bedegaming.net": "http://np03-grosvenorcasinos.rank.bedegaming.net/in-game-notifications",
                  "np03-meccabingo.rank.bedegaming.net": "http://np03-meccabingo.rank.bedegaming.net/in-game-notifications",
                  "qa02-meccabingo.bedegaming.net": "http://qa02-meccabingo.bedegaming.net/in-game-notifications",
              },
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
            }
        },
        "962": {
            "desktop": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-mt.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "661": {
            "desktop": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ogs/mobile-commonui/commonui.html",
              scriptUrl: "http://ogs-gcm-eu-stage.nyxop.net/bede/bede-bridge.js",
              containerUrls: {
                  "qa02-grosvenorcasinos.bedegaming.net": "http://qa02-grosvenorcasinos.bedegaming.net/in-game-notifications",
                  "mcasino.test.sites.rocket9.co.uk": "http://mcasino.test.sites.rocket9.co.uk/bridge-container",
                  "21.test.sites.rocket9.co.uk": "http://21.test.sites.rocket9.co.uk/bridge-container",
                  "slotto.test.sites.rocket9.co.uk": "http://slotto.test.sites.rocket9.co.uk/bridge-container",
                  "betuk.test.sites.rocket9.co.uk": "http://betuk.test.sites.rocket9.co.uk/bridge-container",
                  "pinkcasino.test.sites.rocket9.co.uk": "http://pinkcasino.test.sites.rocket9.co.uk/bridge-container",
                  "crownbingo.test.sites.rocket9.co.uk": "http://crownbingo.test.sites.rocket9.co.uk/bridge-container",
                  "bingogodz.test.sites.rocket9.co.uk": "http://bingogodz.test.sites.rocket9.co.uk/bridge-container",
                  "castlejackpot.test.sites.rocket9.co.uk": "http://castlejackpot.test.sites.rocket9.co.uk/bridge-container",
                  "bingoloopy.test.sites.rocket9.co.uk": "http://bingoloopy.test.sites.rocket9.co.uk/bridge-container",
                  "slotmob.test.sites.rocket9.co.uk": "http://slotmob.test.sites.rocket9.co.uk/bridge-container",
                  "bingostars.test.sites.rocket9.co.uk": "http://bingostars.test.sites.rocket9.co.uk/bridge-container",
                  "legs11.test.sites.rocket9.co.uk": "http://legs11.test.sites.rocket9.co.uk/bridge-container",
                  "slotboss.test.sites.rocket9.co.uk": "http://slotboss.test.sites.rocket9.co.uk/bridge-container",
                  "ukcasino.test.sites.rocket9.co.uk": "http://ukcasino.test.sites.rocket9.co.uk/bridge-container",
                  "bingos.test.sites.rocket9.co.uk": "http://bingos.test.sites.rocket9.co.uk/bridge-container",
                  "qa02-meccabingo.bedegaming.net": "http://qa02-meccabingo.bedegaming.net/in-game-notifications",
              },
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
            }
        },
        "1096": {
            "desktop": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
            }
        },
        "100897": {
            "desktop": {
              commonUIUrl: "http://www.test2.skyvegas.com/commonui",
            },
            "mobile": {
              commonUIUrl: "http://www.test2.skyvegas.com/commonui",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: true,
                mode: "live",
                apiKey: "C382228mA4Ep",
                credential: "device",
                gsUrl: "http://gam-registration-stage-gg.nyxop.net/gs-registration"
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-gg.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "5": {
            "desktop": {
              commonUIUrl: "http://localhost:2015/ogs/desktop-commonui/commonui.html",
            },
            "mobile": {
              commonUIUrl: "http://localhost:2015/ogs/mobile-commonui/commonui.html",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
              gamesparks: {
                enabled: false,
              },
              jackpotQuery: {
                jqUrl: "http://jackpot-query-stage-gg.nyxop.net/v3/jackpots",
                interval: "1000",
              },
            }
        },
        "980": {
            "desktop": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },
            "mobile": {
              commonUIUrl: "http://ogs-gcm-eu-stage.nyxop.net/ppb/html/client-adapter.html",
              operatorPostMsgLibrary: "http://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-launcher/lib/ppw/ppbPostMsgLib.js",
            },

            "default": {
              footerEnabled: false,
              footerSize: {
                width: "100%",
                height: "10%",
              },
            }
        },
    };


    var _hasOperatorSpecificProperty = function(operator_id) {
        return _operator_Properties[operator_id] !== undefined;
    };

    var _hasDeviceSpecificProperty = function(operator_id, device, propertyName) {
        return _operator_Properties[operator_id][device] !== undefined && _operator_Properties[operator_id][device][propertyName];
    };

    var _getOperatorSpecificProperty = function(propertyName, operator_id, device) {

        if(operator_id == undefined || !_hasOperatorSpecificProperty(operator_id)) {
            operator_id = "default";
        }

        if(device == undefined || !_hasDeviceSpecificProperty(operator_id, device, propertyName)) {
            device = "default";
        }

        if(propertyName == undefined) {
            console.log("Error: getOperatorSpecificProperty: property name is undefined");
            return;
        } else {
            return _operator_Properties[operator_id][device][propertyName];
        }
    };

    var _getCMAScriptUrl = function(host_name,operator_id, device) {

        var scriptUrl = _getOperatorSpecificProperty('scriptUrl', operator_id, device);
        var containerUrls = _getOperatorSpecificProperty('containerUrls', operator_id, device);
        if(scriptUrl && containerUrls && containerUrls[host_name]) {
            return scriptUrl + "?containerUrl=" +  containerUrls[host_name];
        } else {
            console.log("Error: getCMAScriptUrl: Either scriptUrl or containerUrl is missing");
            return;
        }
    };

    var _gcmServiceConfiguration = {
        "liveserv": {
            "Enabled": false
        },
        "analytics": {
            "Enabled": false,
            "Parameters": {
                "trackingid": "1234567",
                "samplerate": "100"
            }
        },
        "gameoption": {
            "Enabled": true,
            "Parameters": {
                "MUTE": false
            }
        }
    };

    var _getGCMServiceConfiguration = function () {
        return _gcmServiceConfiguration;
    };

    return {
        gameProviderHostNameList: _gameProviderHostNameList,
        getOperatorSpecificProperty: _getOperatorSpecificProperty,
        getGCMServiceConfiguration: _getGCMServiceConfiguration,
        getCMAScriptUrl: _getCMAScriptUrl
    };
})();
