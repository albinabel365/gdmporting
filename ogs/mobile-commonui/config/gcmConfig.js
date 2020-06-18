var GCMConfig = (function() {
    // Set this variable to OGS launcher's hostname for the environment.
    var _launcherHostName = "http://localhost:2015";
    var _ccy_formatter_url = "http://localhost:2015/ogs/mobile-commonui/js/utils/currencyFormat.js";
    var _translations_url = "http://localhost:2015/ogs/mobile-commonui/js/translations/";
    return {
      launcherHostName: _launcherHostName,
      ccyFormatterUrl: _ccy_formatter_url,
      translationUrl: _translations_url
    };
})();
