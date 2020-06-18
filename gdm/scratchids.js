/**
 *
 * <scratchgame ExternalgameId> : <casino game ogs Game ID>
 *
 * **/
var casinoIds =
{
    'scratchfoxinwins' : '70044',
    'scratchdrlove' : '70005',
    'scratchdrloveonvacation' : '70043',
    'scratchemperorsgarden' : '70059',
    'scratchirsheyes' : '70006',
    'scratchirisheyes2' : '70042',
    'scratchmedusa' : '70020',
    'scratchmerlinsmillions' : '70030',
    'scratchramessesriches' : '70007',
    'scratchthecodfather' : '70060',
    'scratchvolcanoeruption' : '70001',
    'scratchgorillagowild' : '70090',
    'scratchoilmania' : '70036',
    'scratchvenetianrose' : '70022',
    'scratchthesnakecharmer' : '70026',
    'scratchpandamania' : '70082',
    'scratchjokerjester' : '70034',
    'scratchgeniewild' : '70033',
    'scratcheasterndragon' : '70049',
    'scratchbigfoot' : '70010',
    'scratchcherryblossoms' : '70013',
    'scratchcallofthecolosseum' : '70011',
    'scratchmadmadmonkey' : '70002',
    'scratchjamesdean' : '70147',
    'scratchadragonsstory': '70136',
    'scratchrobinhood': '70151',
    'scratchwitchpickings': '70148',
    'scratchmissmidas': '70089',
    'scratchdoubleplaysuperbet': '70138',
    'scratchcleoswish' : '70299',
    'scratchqueenofthecastle' : '70349',
	'scratchqueenofthecastle96' : '70348',
    'scratchshangrila' : '70178',
	'scratchmonsterwins' : '70159',
	'scratchprosperitytwin' : '70209',
	'scratchgoldenmane' : '70222',
	'scratchwildrun' : '70235',
	'scratchspinsorceress' : '70152',
	'scratchstarmania' : '70146'

};

var casinoIdsForGCM = 
{
	'scratchfoxinwins' : '70233',
    'scratchdrlove' : '70005',
    'scratchdrloveonvacation' : '70043',
    'scratchemperorsgarden' : '70059',
    'scratchirsheyes' : '70006',
    'scratchirisheyes2' : '70042',
    'scratchmedusa' : '70020', //Changing it back to flash game id as hq ('70232') is not ready yet,
    'scratchmerlinsmillions' : '70262',
    'scratchramessesriches' : '70007',
    'scratchthecodfather' : '70060',
    'scratchvolcanoeruption' : '70001',
    'scratchgorillagowild' : '70227',
    'scratchoilmania' : '70036',
    'scratchvenetianrose' : '70022',
    'scratchthesnakecharmer' : '70026',
    'scratchpandamania' : '70082',
    'scratchjokerjester' : '70034',
    'scratchgeniewild' : '70033',
    'scratcheasterndragon' : '70049',
    'scratchbigfoot' : '70010',
    'scratchcherryblossoms' : '70013',
    'scratchcallofthecolosseum' : '70011',
    'scratchmadmadmonkey' : '70367',
    'scratchjamesdean' : '70147',
    'scratchadragonsstory': '70136',
    'scratchrobinhood': '70151',
    'scratchwitchpickings': '70363',
    'scratchmissmidas': '70089',
    'scratchdoubleplaysuperbet': '70228',
    'scratchcleoswish' : '70299',
    'scratchqueenofthecastle' : '70349',
	'scratchqueenofthecastle96' : '70348',
    'scratchshangrila' : '70178',
	'scratchmonsterwins' : '70159',
	'scratchprosperitytwin' : '70209',
	'scratchgoldenmane' : '70222',
	'scratchwildrun' : '70235',
	'scratchspinsorceress' : '70152',
	'scratchstarmania' : '70368'

}



////////////////////////////////
//
//
function lookup(gameName){
	if(typeof(gcmObj) === "undefined") {
		return casinoIds[gameName];
	} else {
		return casinoIdsForGCM[gameName];
	}
}
