var eightyeightfortunes;
(function (eightyeightfortunes){
var MetaDataBundle = (function() {
function MetaDataBundle() {
}
var gameConfiguration={};
MetaDataBundle.prototype.setGameConfiguration= function(gameConfiguration)
{
	this.gameConfiguration = gameConfiguration;
};
MetaDataBundle.prototype.getGameConfiguration= function(gameConfiguration)
{
	return this.gameConfiguration;
};

MetaDataBundle.prototype.isDebugEnabled = function(){
return this.gameConfiguration.debug;
};
MetaDataBundle.prototype.isGaffingEnabled = function(){
return this.gameConfiguration.gaffing;
};
MetaDataBundle.prototype.getResourceVersion = function(){
return this.gameConfiguration.resourceVersion;
};
MetaDataBundle.prototype.getLocale = function(){
return this.gameConfiguration.locale;
};
MetaDataBundle.prototype.isDemoEnabled = function(){
return this.gameConfiguration.demo; 
};
MetaDataBundle.prototype.getWebaudio = function(){
return this.gameConfiguration.webaudio; 
};
MetaDataBundle.prototype.isRealMoney = function() {
return this.gameConfiguration.isRealMoney; 
}
MetaDataBundle.prototype.getGameCode = function() {
return this.gameConfiguration.gameCode;
}
MetaDataBundle.prototype.getCdnRoot = function() {
 return this.gameConfiguration.cdnRoot;
}
MetaDataBundle.prototype.getLogicUrl = function() {
return  this.gameConfiguration.glsURL;
}

MetaDataBundle.prototype.getMaxWinStatus = function() {
return  this.gameConfiguration.maxWinStatus;
}

MetaDataBundle.prototype.getPartnerCode = function() {
    return  this.gameConfiguration.partnerCode;
}

MetaDataBundle.prototype.getCurrency = function() {
    return  this.gameConfiguration.currency;
}

MetaDataBundle.prototype.getCountryCode = function(){
    return "IN";
};

return MetaDataBundle;
})();
eightyeightfortunes.MetaDataBundle = MetaDataBundle;
})(eightyeightfortunes || (eightyeightfortunes = {}));
