var translation;
(function (translation){
var LocalizationsBundle = (function() {
function LocalizationsBundle() {
}
LocalizationsBundle.prototype.getRealityCheckMessage_1 = function(realityCheckDuration){
return decodeURIComponent('You have requested a Reality Check after every %7B0%7D minutes of play.')
.replace( /\{0\}/g , realityCheckDuration);
};
LocalizationsBundle.prototype.getMenuSound = function(){
return decodeURIComponent('Sound');
};
LocalizationsBundle.prototype.getSessionErrorMessage = function(errorCode){
return decodeURIComponent('The game session has expired%2C reload the game to continue playing%2C %7B0%7D')
.replace( /\{0\}/g , errorCode);
};
LocalizationsBundle.prototype.getRealityCheckMessage_5 = function(history){
return decodeURIComponent('You can see your history by clicking %7B0%7D.')
.replace( /\{0\}/g , history);
};
LocalizationsBundle.prototype.getMenuExternalHelp = function(){
return decodeURIComponent('Help');
};
LocalizationsBundle.prototype.getNo = function(){
return decodeURIComponent('No');
};
LocalizationsBundle.prototype.getRealityCheckMessage_4 = function(){
return decodeURIComponent('Do you want to continue%3F');
};
LocalizationsBundle.prototype.getReload = function(){
return decodeURIComponent('Reload');
};
LocalizationsBundle.prototype.getRealityCheckMessage_3 = function(wonlostTxt, wonlost){
return decodeURIComponent('You have %7B0%7D %7B1%7D.')
.replace( /\{0\}/g , wonlostTxt)
.replace( /\{1\}/g , wonlost);
};
LocalizationsBundle.prototype.getRealityCheckMessage_2 = function(realitySessionTime){
return decodeURIComponent('You have been playing for %7B0%7D minutes.')
.replace( /\{0\}/g , realitySessionTime);
};
LocalizationsBundle.prototype.getServerDownError = function(){
return decodeURIComponent('The game server is down for maintenance.');
};
LocalizationsBundle.prototype.getFreegamesDoneTitle = function(){
return decodeURIComponent('Free Spins Complete');
};
LocalizationsBundle.prototype.getRealityCheckMessage_6 = function(ok){
return decodeURIComponent('Click %7B0%7D to continue.')
.replace( /\{0\}/g , ok);
};
LocalizationsBundle.prototype.getButtonContinueText = function(){
return decodeURIComponent('Continue');
};
LocalizationsBundle.prototype.getAutoplayCountTitle = function(){
return decodeURIComponent('NUMBER OF AUTOSPINS');
};
LocalizationsBundle.prototype.getButtonHistory = function(){
return decodeURIComponent('History');
};
LocalizationsBundle.prototype.getAllCustomErrorRealityCheck = function(realityCheckDuration, sessionElapsedTime, stayText, quitText){
return decodeURIComponent('You have requested a Reality Check after every %7B0%7D minutes of play. Your gaming session has now reached %7B1%7D minutes. To continue playing select %7B2%7D below or to stop playing click %7B3%7D. You may also view your account history to review your playing history.')
.replace( /\{0\}/g , realityCheckDuration)
.replace( /\{1\}/g , sessionElapsedTime)
.replace( /\{2\}/g , stayText)
.replace( /\{3\}/g , quitText);
};
LocalizationsBundle.prototype.getMenuCashier = function(){
return decodeURIComponent('Cashier');
};
LocalizationsBundle.prototype.getAutoPlayComplete = function(){
return decodeURIComponent('AUTOPLAY COMPLETE');
};
LocalizationsBundle.prototype.getAutoplaySettingTitle = function(){
return decodeURIComponent('AUTO PLAY');
};
LocalizationsBundle.prototype.getWon = function(){
return decodeURIComponent('won');
};
LocalizationsBundle.prototype.getMenuRules = function(){
return decodeURIComponent('Rules');
};
LocalizationsBundle.prototype.getMenuSupport = function(){
return decodeURIComponent('OPTIONS');
};
LocalizationsBundle.prototype.getConfirmGoBack = function(){
return decodeURIComponent('You are about to leave the game. Do you really want to quit%3F');
};
LocalizationsBundle.prototype.getFreegamesDoneButton = function(){
return decodeURIComponent('Continue Playing%21');
};
LocalizationsBundle.prototype.getResponsibleGaming = function(minutes){
return decodeURIComponent('You have been playing for %7B0%7D minutes. Do you want to continue%3F')
.replace( /\{0\}/g , minutes);
};
LocalizationsBundle.prototype.getIncompleteGame = function(){
return decodeURIComponent('An incomplete game was found%2C resuming now...');
};
LocalizationsBundle.prototype.getMaxAmountAchieved = function(arg0){
return decodeURIComponent('Maximum win amount has been achieved - %7B0%7D%21')
.replace( /\{0\}/g , arg0);
};
LocalizationsBundle.prototype.getInsufficientFunds = function(){
return decodeURIComponent('Insufficient funds to place wager');
};
LocalizationsBundle.prototype.getMenuPlayForReal = function(){
return decodeURIComponent('Play for real');
};
LocalizationsBundle.prototype.getMenuInformation = function(){
return decodeURIComponent('Information');
};
LocalizationsBundle.prototype.getBetfairCustomErrorRealityCheck = function(realityCheckDuration, sessionElapsedTime){
return decodeURIComponent('You have been playing for %7B0%7D minutes. You have made a profit%2Floss of %7B1%7D. You can check your betting history for more details.')
.replace( /\{0\}/g , realityCheckDuration)
.replace( /\{1\}/g , sessionElapsedTime);
};
LocalizationsBundle.prototype.getTotalBet = function(){
return decodeURIComponent('TOTAL BET');
};
LocalizationsBundle.prototype.getFreegamesAwardedButton = function(){
return decodeURIComponent('Spin%21');
};
LocalizationsBundle.prototype.getAutoplayCancelTitle = function(){
return decodeURIComponent('CANCEL');
};
LocalizationsBundle.prototype.getLoggedOutError = function(){
return decodeURIComponent('You have been logged out. Click to return to the lobby. Once you have logged in you can continue to play.');
};
LocalizationsBundle.prototype.getFreegamesDoneWithoutWinBody = function(){
return decodeURIComponent('You didn%27t win this round%2C but keep playing for your chance at big wins. Good luck%21');
};
LocalizationsBundle.prototype.getMenuDeposit = function(){
return decodeURIComponent('Deposit');
};
LocalizationsBundle.prototype.getAutoplayLosslimitTitle = function(){
return decodeURIComponent('STOP WHEN LOST MORE THAN %E2%80%A6');
};
LocalizationsBundle.prototype.getGenericError = function(){
return decodeURIComponent('Unfortunately an unspecified error has occurred. We are sorry for the inconvenience.');
};
LocalizationsBundle.prototype.getFreegamesAwardedTitle = function(){
return decodeURIComponent('Free Spins Offer');
};
LocalizationsBundle.prototype.getMenuPaytable = function(){
return decodeURIComponent('Paytable');
};
LocalizationsBundle.prototype.getLost = function(){
return decodeURIComponent('lost');
};
LocalizationsBundle.prototype.getButtonHistoryText = function(){
return decodeURIComponent('History');
};
LocalizationsBundle.prototype.getRealityCheckErrorTitle = function(){
return decodeURIComponent('Reality Check');
};
LocalizationsBundle.prototype.getFreegamesAwardedBody = function(freeGameCount, freeGameValue){
return decodeURIComponent('Congratulations%21 You have %7B0%7D free spins at %0A%7B1%7D per spin. Good luck%21')
.replace( /\{0\}/g , freeGameCount)
.replace( /\{1\}/g , freeGameValue);
};
LocalizationsBundle.prototype.getAutoplayStart = function(){
return decodeURIComponent('START');
};
LocalizationsBundle.prototype.getGoToDeposit = function(){
return decodeURIComponent('Go to Deposit');
};
LocalizationsBundle.prototype.getYes = function(){
return decodeURIComponent('Yes');
};
LocalizationsBundle.prototype.getLoginFailedError = function(){
return decodeURIComponent('An error occurred while logging in. We are sorry for the inconvenience.');
};
LocalizationsBundle.prototype.getStart = function(){
return decodeURIComponent('Start');
};
LocalizationsBundle.prototype.getMenuContact = function(){
return decodeURIComponent('Contact');
};
LocalizationsBundle.prototype.getFreegamesRemaining = function(gamesRemaining, formattedAmountWon){
return decodeURIComponent('%7B0%7D Free Game spins remaining - Total Won%3A %7B1%7D')
.replace( /\{0\}/g , gamesRemaining)
.replace( /\{1\}/g , formattedAmountWon);
};
LocalizationsBundle.prototype.getAutoplayNeverTitle = function(){
return decodeURIComponent('NEVER');
};
LocalizationsBundle.prototype.getButtonLogoutText = function(){
return decodeURIComponent('Log Out');
};
LocalizationsBundle.prototype.getQuit = function(){
return decodeURIComponent('Quit');
};
LocalizationsBundle.prototype.getServerUnconfirmedError = function(){
return decodeURIComponent('Temporary problem contacting the system. The problem should resolve itself automatically within a minute%2C sorry for any inconvenience caused. If the problem persists%2C please contact Customer Support.');
};
LocalizationsBundle.prototype.getBalance = function(){
return decodeURIComponent('Balance');
};
LocalizationsBundle.prototype.getRealityCheckMessage_param1_profit = function(wonlost){
return decodeURIComponent('You have made a profit%2Floss of %7B0%7D.')
.replace( /\{0\}/g , wonlost);
};
LocalizationsBundle.prototype.getRealityCheckMessage_param2_history = function(){
return decodeURIComponent('You can check your betting history for more details.');
};
LocalizationsBundle.prototype.getWincapTitle = function(){
return decodeURIComponent('Congratulations%21');
};
LocalizationsBundle.prototype.getMenuGameSettings = function(){
return decodeURIComponent('Game Settings');
};
LocalizationsBundle.prototype.getErrorTitle = function(){
return decodeURIComponent('Error');
};
LocalizationsBundle.prototype.getMenuMore = function(){
return decodeURIComponent('More');
};
LocalizationsBundle.prototype.getGoToLobby = function(){
return decodeURIComponent('Go to Lobby');
};
LocalizationsBundle.prototype.getBannedError = function(){
return decodeURIComponent('You have been banned');
};
LocalizationsBundle.prototype.getAutoplayExpanderText = function(){
return decodeURIComponent('CLICK EXPANDER ARROW FOR MORE OPTIONS');
};
LocalizationsBundle.prototype.getMenuSettings = function(){
return decodeURIComponent('SETTINGS');
};
LocalizationsBundle.prototype.getWin = function(){
return decodeURIComponent('WIN');
};
LocalizationsBundle.prototype.getMenuBetLevel = function(){
return decodeURIComponent('Bet Level');
};
LocalizationsBundle.prototype.getButtonViewAccountHistoryText = function(){
return decodeURIComponent('View Account History');
};
LocalizationsBundle.prototype.getOk = function(){
return decodeURIComponent('Ok');
};
LocalizationsBundle.prototype.getAutoplayWinlimitTitle = function(){
return decodeURIComponent('STOP ON A SINGLE WIN OVER %E2%80%A6');
};
LocalizationsBundle.prototype.getConnectionError = function(){
return decodeURIComponent('You have lost the connection. Please retry.');
};
LocalizationsBundle.prototype.getButtonContinuePlayingText = function(){
return decodeURIComponent('Continue Playing');
};
LocalizationsBundle.prototype.getAlreadyLoggedInError = function(){
return decodeURIComponent('You are already logged in.');
};
LocalizationsBundle.prototype.getGoToLogin = function(){
return decodeURIComponent('Go to Login');
};
LocalizationsBundle.prototype.getInfoTitle = function(){
return decodeURIComponent('Info');
};
LocalizationsBundle.prototype.getMenuResponsibleGaming = function(){
return decodeURIComponent('Responsible Gaming');
};
LocalizationsBundle.prototype.getMenuAutospin = function(){
return decodeURIComponent('Autospin');
};
LocalizationsBundle.prototype.getIncorrectCredentialsError = function(){
return decodeURIComponent('Please make sure you are logged in and try again.');
};
LocalizationsBundle.prototype.getFreegamesDoneWithWinBody = function(amountWon){
return decodeURIComponent('You have completed your free spins. Your Total Win %0A%7B0%7D will appear in your account. Good luck%21')
.replace( /\{0\}/g , amountWon);
};
return LocalizationsBundle;
})();
translation.LocalizationsBundle = LocalizationsBundle;
})(translation || (translation = {}));
