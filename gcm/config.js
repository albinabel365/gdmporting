var GCMConfig = (function () {
    var _gcmList = {
            "production": "gcm/gcm/gcm.js",
            "dev": "gcm/gcm/gcm.js",
            "stage": "gcm/gcm/gcm.js",
        };

    var _getGCMUrl = function (environment) {
        var gcm = _gcmList[environment];
        if (gcm === undefined) {
            gcm = _gcmList.production;
        }
        return gcm
    };

    return {
        getGCMUrl: _getGCMUrl
    };
})();
