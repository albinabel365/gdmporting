var gConfigObj = {
	/*exclusiveOperators: [
		//Italy operators
		{ id: "194", name: "Microgame" },
		{ id: "453", name: "Betpoint" },
		{ id: "877", name: "Betaland" },
		{ id: "876", name: "Bgame" },
		{ id: "878", name: "Planetwin" },
		{ id: "431", name: "Sisal" },
		{ id: "558", name: "Snai" },
		{ id: "755", name: "Lottomatica" },
		{ id: "748", name: "Goldbet" },
		{ id: "879", name: "Betclic.it" },
		{ id: "691", name: "Unibet.it" },
		{ id: "902", name: "Netbet.it" },
		{ id: "574", name: "Starcasino.it" },
		{ id: "990", name: "Leovegas.it" },
		{ id: "776", name: "Totosi.it" },
		{ id: "819", name: "888.it" },
		{ id: "980", name: "Betfair.it" },
		{ id: "970", name: "Betflag.it" },
		{ id: "797", name: "Pokerstars.it" },
		{ id: "556", name: "Giochi24.it" },
		{ id: "401", name: "Eurobet" },
		{ id: "859", name: "Bwin.it" },
		{ id: "620", name: "Mrgreen.it" }
	],*/
	inclusiveOperators: [
		//Canada LQ
		{ id: "975", name: "Unknown", minSpinTime: 3, quickStop: false },
		{ id: "959", name: "Unknown", minSpinTime: 3, quickStop: false },

		//BCLC
		{ id: "915", name: "Unknown", minSpinTime: 3, quickStop: false },
		{ id: "916", name: "Unknown", minSpinTime: 3, quickStop: false },
		{ id: "978", name: "Unknown", minSpinTime: 3, quickStop: false },
		{ id: "979", name: "Unknown", minSpinTime: 3, quickStop: false },

		//Denmark
		{ id: "983", name: "Bet365", minSpinTime: 3, quickStop: false, gambleCount: 0 },
		{ id: "297", name: "Unibet.dk", minSpinTime: 3, quickStop: false },

		//UK 
		{ id: "897",  name: "SKY", minSpinTime: 3, quickStop: false, gambleCount: 0 },
		{ id: "962",  name: "Paddy Power" },
		{ id: "963",  name: "Betfair" },
		{ id: "1287", name: "Sky Bingo", minSpinTime: 3, quickStop: false, gambleCount: 0 },
		{ id: "1347", name: "Sky Betting and Gaming", minSpinTime: 3, quickStop: false, gambleCount: 0 },
		
		//Spain
		{ id: "1286", name: "Casumo Spain", minSpinTime: 3, quickStop: false },
		
		//Sweden
		{ id: "939", name: "Svenskaspel SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1034", name: "PokerStars SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1036", name: "Viral Interactive Group SWEDEN (Finnplay)", minSpinTime: 3, quickStop: false },
		{ id: "1037", name: "LeoVegas SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1038", name: "PAF SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1039", name: "NoAccountCasino SWEDEN  (Finnplay)", minSpinTime: 3, quickStop: false },
		{ id: "1040", name: "Casinoroom SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1053", name: "888 SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1054", name: "Casumo SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1055", name: "VeraJohn SWEDEN", minSpinTime: 3, quickStop: false },
		
		{ id: "1062", name: "Bertil SWEDEN  (Mr Green)", minSpinTime: 3, quickStop: false },
		{ id: "1063", name: "MamaMia SWEDEN (Mr Green)", minSpinTime: 3, quickStop: false },
		{ id: "1064", name: "Redbet SWEDEN (Mr Green)", minSpinTime: 3, quickStop: false },
		{ id: "1066", name: "Nektan SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1070", name: "GVC - Patycasino SWEDEN (Not Used)", minSpinTime: 3, quickStop: false },
		{ id: "1071", name: "bwin SWEDEN (GVC)", minSpinTime: 3, quickStop: false },
		{ id: "1072", name: "partypoker SWEDEN (GVC) (Not Used)", minSpinTime: 3, quickStop: false },
		{ id: "1073", name: "Svecasino SWEDEN (Cherry)", minSpinTime: 3, quickStop: false },
		{ id: "1074", name: "Cherrycasino SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1075", name: "MoA SWEDEN (ComeOn)", minSpinTime: 3, quickStop: false },
		
		{ id: "1076", name: "Hajper SWEDEN (ComeOn)", minSpinTime: 3, quickStop: false },
		{ id: "1077", name: "Casinostugan SWEDEN (Comeon)", minSpinTime: 3, quickStop: false },
		{ id: "1078", name: "Snabbare SWEDEN (ComeOn)", minSpinTime: 3, quickStop: false },
		{ id: "1079", name: "ComeOn SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1081", name: "Betsson SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1082", name: "NordicBet SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1083", name: "Sverigeautomaten SWEDEN (Betsson)", minSpinTime: 3, quickStop: false },
		{ id: "1084", name: "Videoslots SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1085", name: "Voodoo dreams (Suprnation) SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1086", name: "Duelz (Suprnation) SWEDEN", minSpinTime: 3, quickStop: false },
		
		{ id: "1087", name: "NY Spins (Suprnation) SWEDEN (removed)", minSpinTime: 3, quickStop: false },
		{ id: "1088", name: "SkillonNet SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1092", name: "NY Spins (Suprnation) SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1096", name: "Betfair SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1098", name: "GiG Rizk SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1099", name: "GUTS SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1100", name: "GIG: Thrills SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1101", name: "GIG: Kaboo SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1102", name: "GIG: Super Lenny SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1103", name: "GIG: Higholler SWEDEN ", minSpinTime: 3, quickStop: false },
		
		{ id: "1104", name: "GIG: Betspin SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1105", name: "GIG: Mobil6000 SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1106", name: "GIG: Casinoland SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1107", name: "GIG: Casinofloor SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1108", name: "GIG: Cashmio SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1109", name: "GIG: Dunder SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1110", name: "GIG: Spinjuju SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1111", name: "GIG: ikibu SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1112", name: "GIG: CasinoCalzone SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1113", name: "GIG: Joreels SWEDEN", minSpinTime: 3, quickStop: false },
		
		{ id: "1114", name: "GIG: Instacasino SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1115", name: "GIG: Karjalakasino SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1116", name: "GIG: Agentspinner SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1117", name: "GIG: Chancehill SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1118", name: "GIG: OmniaCasino SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1119", name: "GIG: Dreamz SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1120", name: "GIG: Justcasino SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1121", name: "GIG: Rolla SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1122", name: "GIG: Metalcasino SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1123", name: "GIG: Wishmaker SWEDEN", minSpinTime: 3, quickStop: false },
		
		{ id: "1124", name: "Frank and Fred SWEDEN (Cherry)", minSpinTime: 3, quickStop: false },
		{ id: "1125", name: "GIG: Casinopop SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1127", name: "GIG: Shadowbet SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1130", name: "Bet365 SWEDEN", minSpinTime: 3, quickStop: false, gambleCount: 0 },
		{ id: "1131", name: "Bet365Vegas SWEDEN", minSpinTime: 3, quickStop: false, gambleCount: 0 },
		{ id: "1132", name: "MrGreen SWEDEN (Mr Green)", minSpinTime: 3, quickStop: false },
		{ id: "1134", name: "VinnaRum SWEDEN (Mr Green)", minSpinTime: 3, quickStop: false },
		{ id: "1136", name: "Bethard SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1137", name: "Betclic SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1138", name: "KarlCasino SWEDEN", minSpinTime: 3, quickStop: false },
		
		{ id: "1139", name: "NobonusCasino SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1140", name: "AllBritishCasino SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1141", name: "bestcasino SWEDEN (Optibet)", minSpinTime: 3, quickStop: false },
		{ id: "1142", name: "SvedalaCasino.com SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1143", name: "AdlerCasino.com SWEDEN  (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1144", name: "FreespinsCasino SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1145", name: "YakoCasino.com SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1150", name: "Frank Casino SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1151", name: "CasinoCasino SWEDEN  (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1152", name: "All Irish Casino SWEDEN  (LnL Europe)", minSpinTime: 3, quickStop: false },
		
		{ id: "1153", name: "NorskAutomater SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1154", name: "Norges Casino SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1155", name: "Fun Casino SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1156", name: "Yeti Casino SWEDEN (LnL Europe)", minSpinTime: 3, quickStop: false },
		{ id: "1159", name: "Casino Heroes SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1160", name: "Betser SWEDEN  (HeroGaming)", minSpinTime: 3, quickStop: false },
		{ id: "1161", name: "PlatinCasino SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1162", name: "Lapalingo SWEDEN ", minSpinTime: 3, quickStop: false },
		{ id: "1163", name: "Full Tilt SWEDEN (Pokerstars)", minSpinTime: 3, quickStop: false },
		{ id: "1164", name: "WhiteHatGaming SWEDEN", minSpinTime: 3, quickStop: false },
		
		{ id: "1166", name: "Unibet SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1167", name: "Aspireglobal SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1169", name: "GiG: NetRoulett SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1171", name: "Betsafe SWEDEN (Betsson)", minSpinTime: 3, quickStop: false },
		{ id: "1174", name: "Softswiss SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1175", name: "AhaCasino(Finnplay) SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1176", name: "Functional Games (Finnplay) SWEDEN", minSpinTime: 3, quickStop: false },
		{ id: "1237", name: "ALC CANADA", minSpinTime: 3, quickStop: false },
		{ id: "1101237", name: "ALC CANADA (QA/Dev)", minSpinTime: 3, quickStop: false },
        { id: "1001237", name: "ALC CANADA (UAT)", minSpinTime: 3, quickStop: false },

		//NJ
		{ id: "1178", name: "Bet365", gambleCount: 0 },
		
		//Bet365Games
		{ id: "347", name: "Bet365Games", gambleCount: 0 },
		
		//Bet365Vegas
		{ id: "368", name: "Bet365Vegas", gambleCount: 0 }
	],
	autoplaySetting:[ // assuming that we keep in this map all jurisdiction lowercase
		{	
			jurisdiction: "default", 	
			opid: [-1], 
			name: "default", 
			autoplayOptions: 0, 
			maxAutoplay: 100 
		},
		{ 	
			jurisdiction: "uk", 		
			opid: [-1], 
			name: "ukgc", 
			autoplayOptions: 2, 
			maxAutoplay: 100
		},
		{ 
			jurisdiction: "can", 		
			opid: [-1], 
			name: "canana", 
			autoplayOptions: 0, 
			maxAutoplay: 50 
		},
		{ 
			jurisdiction: "lt", 		
			opid: [-1], 
			name: "lithuania", 
			autoplayOptions: 0, 
			maxAutoplay: 0 
		},
		{
			jurisdiction: "pa",
			opid: [-1],
			name: "pa",
			autoplayOptions: 0,
			maxAutoplay: 50
		},
		{
			jurisdiction: "uk",
			opid: ["897", "1287", "1347"],
			name: "sky",
			autoplayOptions: 2,
			maxAutoplay: 100
		},
		{
			jurisdiction: "", 		
			opid: ["939"], 
			name: "svenskaspel", 
			autoplayOptions: 0, 
			maxAutoplay: 0 
		},
		{ 
			jurisdiction: "", 
			opid: ["957", "100957", "200957", "300957"], 
			name: "palottery", 
			autoplayOptions: 0, 
			maxAutoplay: 5
		},
		{
			jurisdiction: "",
			opid: ["1237", "1101237", "1001237"],
			name: "alc",
			autoplayOptions: 0,
			maxAutoplay: 0
		},
	],
	
	buyPassSettings:[
		{	
			opid: [-1],
			name: "default",
			enabled: false
		},
		{
			opid: [5, 104,113,152,169,176,177,179,195,196,213,215,224,225,226,227,232,239,240,247,248,283,290,297,351,
				368,376,401,413,423,424,428,446,454,467,480,500,555,560,567,574,581,587,605,620,621,622,623,626,632,
				633,644,645,649,653,656,657,658,668,671,672,673,674,675,676,681,682,683,684,686,687,691,695,697,703,
				707,709,710,713,714,718,719,731,732,743,746,750,754,761,767,769,771,783,792,800,812,815,816,817,818,
				819,820,827,828,829,831,832,833,834,860,863,870,899,907,919,920,921,924,927,928,931,937,940,956,961,
				966,968,971,981,989,990,992,995,996,997,998,999,1007,1009,1011,1012,1014,1016,1017,1018,1020,1021,
				1031,1032,1034,1036,1037,1039,1042,1053,1054,1055,1056,1061,1062,1063,1064,1073,1074,1075,1076,1077,
				1078,1079,1081,1082,1083,1084,1088,1090,1091,1114,1118,1120,1123,1124,1126,1130,1131,1136,1137,1138,
				1139,1140,1145,1149,1151,1153,1154,1155,1156,1159,1160,1166,1167,1171,1175,1176,1192,1194,1197,1198,
				1200,1206,1208,1209,1210,1211,1212,1236,1240,1241,1243,1244,1262,1273,1274,1275,1277,1278,1279,1286,
				1288,1290,1291,1295,1296,1298,1310,1326,1328,1337,1338,1341,1344,1345,1358,482,585,698,1272],
			name: "non-uk enable buy in",
			enabled: true
		},
	],
	
	iframeGutters: [
		{
			position: "top",
			size: [42],
			clientType: [],
			jurisdiction: [],
			operatorId: ["897", "1287", "1347"],
			gameName: ["gorillagowild", "gorillagowildhq", "lightninghorseman", "silverlion", "chickenfox95", "respinrhino", "chilligold2", "serengetilions"]
		},
		//For AGCC
		{
			position: "bottom",
			size: [100],
			clientType: [],
			jurisdiction: ["agcc"],
			operatorId: [],
			gameName: []
		}
	],

	// envids that overriding jurisdictions, assuming that we keep in this map all envids lowercase
	envids: [
		"pa",
		"can",
	]

	//--Version 4 Updated on 07/01/2019
	//Adding 3 Second Rule for Swedish Operators
	//Adding "lightninghorseman", "silverlion" for SKY to scale game down.
}

function getAutoplaySetting( opid, urlParameters, envid ) {
	let autoplaySetting = { "spins": 100, "steps": 5, "option": 1, "jurisdiction": "" };
	try {
		let jurisdiction = urlParameters.jurisdiction != null && urlParameters.jurisdiction != "" ? urlParameters.jurisdiction : "default";
		let i  = gConfigObj.envids.indexOf(envid.toLowerCase());
		if(i > -1) {
			jurisdiction = gConfigObj.envids[i];
		}
		let matchFound = false;
		for (let a of gConfigObj.autoplaySetting ) {
			if (a.opid.indexOf(opid) > -1) {
				autoplaySetting.spins = a.maxAutoplay;
				autoplaySetting.steps = autoplaySetting.spins >= 5 ? 5 : autoplaySetting.spins == 0 ? 0 : 1;
				autoplaySetting.option = a.autoplayOptions;
				autoplaySetting.jurisdiction = a.jurisdiction;
				matchFound = true;
				break;
			}
		}
		if(!matchFound){
			for (let a of gConfigObj.autoplaySetting ) {
				if (jurisdiction == a.jurisdiction) {
					autoplaySetting.spins = a.maxAutoplay;
					autoplaySetting.steps = autoplaySetting.spins >= 5 ? 5 : autoplaySetting.spins == 0 ? 0 : 1;
					autoplaySetting.option = a.autoplayOptions;
					autoplaySetting.jurisdiction = a.jurisdiction;
					break;
				}
			}
		}
	}
	catch (err) { }
	return autoplaySetting;
}

// Get the buyPass setting for an opid (true/false)

function isBuyPassEnabled( opid ) {
	let buyPassEnabled = false;
	try {
		// See if there is a default value for all opids (-1), if so, use it
		for (let a of gConfigObj.buyPassSettings ) {
			if (a.opid.indexOf(-1) > -1) {
				buyPassEnabled = a.enabled;
				break;
			}
		}

		// Now look for the specific opid passed in
		for (let a of gConfigObj.buyPassSettings ) {
			if (a.opid.indexOf(Number(opid)) > -1) {
				buyPassEnabled = a.enabled;
				break;
			}
		}
	}
	catch (err) {
		console.log("[GDM Wrapper:isBuyPassEnabled] failed to find buy pass setting for OPID::"+opid);
	}
	return buyPassEnabled;
}

if (typeof exports !== 'undefined') {  // Necessary for config.test.js to import/require these functions
	module.exports = {
		gConfigObj: gConfigObj,
		getAutoplaySetting: getAutoplaySetting,
		isBuyPassEnabled: isBuyPassEnabled
	};
}