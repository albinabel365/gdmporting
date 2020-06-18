var TXT_LOADING = "Loading...";
var TXT_LOADING_SOUND		= "Loading Sound";
var TXT_GAME_OVER = "Game Over";
var TXT_SPIN_MSG = " ";
var TXT_GAMES_REMAINING = "Free Game %c of %t";
var TXT_FREE_GAME_WON = "Free Game Won";
var TXT_FREE_GAMES_WON = "Free Games Won";
var TXT_PICK_BONUS = "Congratulations! Bonus Won";
var TXT_PICK_AGAIN = "Pick Again";
var TXT_OF_A_KIND = "OF A KIND";
var TXT_RETURN_TO_GAME = "Return to Game";
var TXT_CONFIRM = "Confirm";
var TXT_USE_SOUND = "Play with Sound?";
var TXT_WARNING = "Warning";
var TXT_NOT_ENOUGH_BALANCE = "Not enough balance for the Bet";
var TXT_RECOVERING = "Recovering...";
var TXT_CONNECTING_TO_SERVER = "Connecting to server...";

// for the following scroll messages, if the message is too long to fit into the message bar it can be broken onto consecutive lines. 
var TXT_SCROLL_MESSAGES = [
	"WIN 10 FREE GAMES with DOUBLED PRIZES",
    "Look for 3 or more POT",
    "Play SUPERBET&#8482; for maximum FOX ACTION",
    "Fox Pups in the Reels turn symbols WILD!",
    "Increase SUPERBET&#8482; to ADD FOX PUPS",
    "MORE FOX PUPS for MORE WILD WINS!",
    "In Free Games, Fox Pups make EVEN MORE WILDS!",
    "Have a FOXIN' good time, with FOXIN' big prizes",
    "Did you just hear a LEPRECHAUN?",
    "Play SUPERBET&#8482; for MAX WILD ACTION!",
    "These Fox friends could make you FOXIN' RICH",
    "Win a BONUS after ANY Paid Spin",
    "WIN a Cash Top-Up in the FOX FUNDS BONUS",
    "Tackle a tricky LEPRECHAUN and SHAKE OUT his GOLD!",
    "DON'T let him GET AWAY!",
    "Play SUPERBET&#8482; for MORE WILD WINS!",
    "Little Green Men?...",
    "GET FOXED with FOXIN' WINS!",
    "GO FOXIN' WILD!"];

var TXT_BONUS_CATCH_ESCAPE = "DON'T let him GET AWAY!";

var TXT_INTRO_MESSAGES = ["Fox Pups in the Reels TURN SYMBOLS WILD!",
    "",
    "Play SUPERBET&#8482; to ADD MORE FOX PUPS",
    "for MORE WILD WINS!",
    "",
    "WIN 10 FREE GAMES with DOUBLED PRIZES!",
    "Look for 3 or more SCATTERED POT"
];


var TXT_GAME_RULES_HEADER = "Game Rules";


var TXT_GAME_RULES_CONTENT = ["Play 25 lines",
    "Payouts are made according to the Paytable",
    "Payline wins are multiplied by the amount staked per payline",
    "Scatter wins are multiplied by the total amount staked (Excluding SUPERBET&#8482;)",
    "Scatter wins are added to payline wins",
    "Highest win only on each selected payline",
    "Coinciding wins on different paylines are added",
    "All wins occur on selected lines except scattered POT",
    "All wins begin with leftmost reel and pay left to right on consecutive reels, except SCATTER which pays any",
    "FOX substitutes for all other symbols except scattered POT",
    "On any spin, a Fox Pup inside a Reel may turn a symbol WILD",
    "Malfunction voids all pays and plays"];

var TXT_SUPER_BET_HEADER = "SUPERBET&#8482;";

var TXT_SUPER_BET_CONTENT = ["SUPERBET&#8482; is an ADDITIONAL WAGER that can be adjusted with the control beside the Reels to provide the following enhancements",
    "SUPERBET&#8482; off (25 Coins): Fox Pup in Reel 3",
    "SUPERBET&#8482; 1 (35 Coins): Fox Pups in Reels 2, 3, 4",
    "SUPERBET&#8482; 2 (50 Coins): Fox Pups in Reels 1, 2, 3, 4, 5"];

var TXT_RANDOM_BONUS_HEADER = "Random Bonus";

var TXT_RANDOM_BONUS_CONTENT = ["The Random Bonus can be awarded after any paid spin",
    "Keep a lookout for either Fox Funds or Leprechaun Shakedown and win the prizes shown",
    "During Leprechaun Shakedown, Prizes are awarded only if the Leprechaun is caught",
	"Fox Funds Bonus can award a maximum of 250 coins multiplied by the stake per line",
	"Leprechaun Shake Bonus can award a maximum of 1250 coins multiplied by the stake per line",
    "All prizes are awarded as displayed"
];

var TXT_FREE_GAMES_HEADER = "Free Games Feature";

var TXT_FREE_GAMES_FEATURE = ["10 Free Games are awarded when 3 or more POT appear",
    "During the Free Games Fox Pups appear more frequently",
    "All prizes are doubled during the Free Games Feature",
    "The Free Games Feature can be retriggered",
    "Free Games are played at the lines and bet of the triggering game",
    "Free Game wins are added to payline and scatter wins"];

// --- FREE GAMES -----------------------------------

var FREE_GAMES_FORMAT = {
    color: '#FFFFFF',
    rside: 0,
    lside: 0,
    font: "Griffon",
    size: 24,
    bold: false,
    italic: true,
    textBaseline: "middle",
    align: "center"
};

var TXT_FREE_GAMES_INTRO_TITLE = {
    text: "CONGRATULATIONS!",
    size: 28,
    x: 208,
    y: 100,
    hq: {
        size: 28,
        x: 195,
        y: 125
    }
};

var TXT_FREE_GAMES_INTRO_WON = {
    text: "10 FREE GAMES WON",
    color: "#FFD633",
    x: 208,
    y: 150,
    hq: {
        size: 24,
        x: 195,
        y: 180
    }
};

var TXT_FREE_GAMES_WITH = {
    text: "with",
    x: 208,
    y: 200,
    hq: {
        size: 24,
        x: 194,
        y: 210
    }
};

var TXT_ALL_PRIZES_DOUBLED = {
    text: "DOUBLED PRIZES",
    color: "#FFD633",
    x: 208,
    y: 250,
    hq: {
        size: 24,
        x: 200,
        y: 240
    }
};

var TXT_FREE_GAMES_GOOD_LUCK = {
    text: " ",
    x: 208,
    y: 300,
    hq: {
        size: 26,
        x: 195,
        y: 290
    }
};

var TXT_FREE_GAMES_SUMMARY_TITLE = {
    text: "CONGRATULATIONS!",
    size: 30,
    color: "#68e068",
    x: 208,
    y: 115,
    hq: {
        size: 32,
        color: "#FFF",
        x: 195,
        y: 145
    }
};

var TXT_FREE_GAMES_TOTAL_WIN = {
    text: "TOTAL WIN",
    x: 208,
    y: 175,
    hq: {
        size: 32,
        color: "#FFD633",
        x: 195,
        y: 205
    }
};

var TXT_FREE_TOTAL_AMAUNT = {
    text: "9000",
    color: "#ffff00",
    size: 42,
    x: 208,
    y: 250,
    hq: {
        size: 55,
        color: "#FFF",
        x: 195,
        y: 230,
        maxWidth: 310
    }
};

//-------------------------------------------------------------------------------------------------------------------
// Common to all games
var MESSAGE_BTN_NO = "No";
var MESSAGE_BTN_YES = "Yes";
var MESSAGE_BTN_CANCEL = "Cancel";
var MESSAGE_BTN_SUBMIT = "Submit";
var MESSAGE_BTN_OK = "OK";

var TXT_METERS_BALANCE = "Balance:";
var TXT_METERS_BET = "Total Bet:";
var TXT_METERS_WIN = "Win:";

var TXT_WILD = "WILD";
var TXT_SCATTER = "SCATTER";

var TXT_COPY_RIGHT_MESSAGES = "Copyright \u00A9 2013-2017 NextGen Gaming";
var TXT_RTP_STRING = "The Theoretical Return to Player is: <br> NO SUPERBET&#8482;: %1<br>10CR SUPERBET&#8482;: %2<br>25CR SUPERBET&#8482;: %3";
//------------------------------------------------------------------------------------------------------
// Error messages - Common to all games 
var TXT_ERROR = "Error";
var TXT_ERROR_PROTOCOL = "Unknown protocol message";
var TXT_ERROR_PROTOCOL_SEQUENCE = "Incorrect Sequence of messages";
var TXT_ERROR_UNKNOWN_PARAMETER = "Unknown parameter in protocol";
var TXT_ERROR_MISSING_PARAMETER = "Missing parameter in protocol";
var TXT_ERROR_PARAMETER_VALUE = "Parameter Values is wrong";
var TXT_ERROR_BET_LIMITS = "Bet amount out of limits";
var TXT_ERROR_LINES = "Incorrect number of lines";
var TXT_ERROR_FEATURE_PARAMETERS = "Feature Parameters incorrect";
var TXT_ERROR_JACKPOT = "Unknown Jackpot error";
var TXT_ERROR_UNKNOWN = "Unknown error";
var TXT_ERROR_NULL = "Server communications lost";
var TXT_ERROR_INSUFFICIENTFUNDS = "Not enough balance for the Bet";
var TXT_ERROR_STATESAVE = "Error trying to save the state";
var TXT_ERROR_STARTGAME = "Error trying to start the game";
var TXT_ERROR_ENDGAME = "Error trying to end the game";
var TXT_ERROR_GAMENOTSUPPORTED = "Game isn't supported by the system";
var TXT_ERROR_TIMEOUT = "You have been disconnected from the Server.  Please restart the game.";
var TXT_ERROR_SERVLET = "Server communications lost";
var TXT_ERROR_DEFAULT = "Server communications lost";
var TXT_ERROR_GAMING_LIMITS = "Gaming limits reached";
var TXT_ERROR_INVALID_SESSION = "Player session is not valid";
var TXT_ERROR_ACCOUNT_BLOCKED = "Player account locked";

var TXT_FR_INTRO     				= "Congratulations! <br> You have %1 Free Spins.";
var TXT_FR_INTRO_ONE 				= "Congratulations! <br> You have %1 Free Spin.";
var TXT_FR_INTRO_GOOD_LUCK 			= "<br> ";
var TXT_FR_YES_NO_QUESTION 			= "<br>Play Free Spins Now?";
var TXT_FR_OUTRO_START 				= "Congratulations! <br> You have won %1 in Free Spins.<br>";
var TXT_FR_OUTRO_END 				= "Free Spins has now ended. <br> Funds will now be used from your account. <br> Your bet amount will now be reset <br> back to the default.";
var TXT_FR_ERROR 					= "You were awarded Free Spins, <br> but an error has occurred. <br> Please contact the Casino.";
var TXT_FR_TITLE 					= "Free Spins";
var TXT_FR_WIN_METER_LABEL 			= "Total Free Spins Win: ";
var TXT_FR_ROUND_NUMBER_METER_LABEL = "Free Spins Remaining: %1";
var TXT_FR_INTRO2 					= "Free Spins Awarded. Please choose your option.";
var TXT_FR_EXPIRY 					= "Expiry Time: %1";
var TXT_USE_NOW 					= "USE NOW";
var TXT_USE_LATER 					= "USE LATER";

var INTRO_FORMAT = {
    color: '#FFFFFF',
    rside: 0,
    lside: 0,
    font: "Griffon",
    size: 36,
    bold: false,
    italic: true,
    textBaseline: "middle",
    align: "center"
};

var TXT_INTRO_1 = {
    text: "Play",
    x: 208,
    y: 45,
    hq: {
        size: 34,
        x: 193,
        y: 65
    }
};

var TXT_INTRO_2 = {
    text: "to ",
    size: 26,
    x: 69,
    y: 183,
    hq: {
        size: 24,
        x: 52,
        y: 193
    }
};

var TXT_INTRO_3 = {
    text: "GET MORE WILD WINS!",
    size: 26,
    x: 234,
    y: 183,
    color: "#FFC908",
    hq: {
        x: 218,
        y: 190
    }
};

var TXT_INTRO_4 = {
    text: "Bet increases with",
    size: 27,
    x: 212,
    y: 217,
    hq: {
        size: 25,
        x: 198,
        y: 225
    }
};

var TXT_INTRO_5 = {
    text: "each option",
    size: 27,
    x: 205,
    y: 248,
    hq: {
        size: 25,
        x: 195,
        y: 259
    }
};

var TXT_INTRO_6 = {
    text: "Press Anywhere",
    size: 22,
    x: 210,
    y: 295,
    color: "#02FBFE",
    hq: {
        x: 196,
        y: 304
    }
};

var TXT_INTRO_7 = {
    text: "to START",
    size: 22,
    x: 210,
    y: 325,
    color: "#02FBFE",
    hq: {
        x: 196,
        y: 334
    }
};

//----------------------------- BIG WIN -------------------------------------------------------------------------------
var languageFormats = {};
languageFormats['winMeter'] =
{
    styleSettings: [
        {
            lineWidth: 4,
            gradientType: "v",
            gradientModifier: 0,
            strokeStyle: [
                ['#7c4000', 0],
                ['#ffff99', 0.11],
                ['#8e5802', 0.23],
                ['#fdc501', 0.39],
                ['#fcf7a9', 0.65],
                ['#ffc653', 0.87],
                ['#bb7d00', 1]
            ]
        }
        ,{
            lineWidth: 2,
            strokeStyle: '#7c4000'
        }
        ,{
            gradientType: "v",
            gradientPosition: 0,
            gradientModifier: 0.15,
            fillStyle: [
                ['#b76631', 0],
                ['#fff331', 0.2],
                ['#ffffff', 0.32],
                ['#fef008', 0.39],
                ['#b96a30', 0.65],
                ['#d39b1e', 0.87],
                ['#f7e206', 1]
            ]
        }
    ]
};

var winMeterTextProperty = {
    fontType: "arial",
    fontSize: 48,
    fontWeight: 'bold',
    offsetX: -10,
    offsetY: 151,
    padding: { left: 0, right: 0, top: 0, bottom: 0, all: 0 },
    format: "winMeter"
};

var TXT_BIG_WIN = "BIG WIN";
var BIG_WIN_FORMAT = {
    font: "Nougat",
    lside: 0,
    rside: 960,
    y: 0,
    size: 80,
    bold: true,
    align: "center",
    textBaseline: "middle",
    //maxWidth: (quality == "hq") ? 580: 720,
    color: "#ff8100 0.45, #fff700 0.75",
    stroke: "#FFFFFF 5, #247DAB 12, #FF0000 22"
};
//----------------------------- MESSAGE BAR -------------------------------------------------------------------------------
var MESSAGE_ROTATION_SPEED = 7000;

var MESSAGE_BAR_FORMAT_HQ = {
    font: "Arial",
    size: 22,
    bold: true,
    align: "center",
    textBaseline: "middle",
    color: "#FFF9D9",
    stroke: "#000000 1",
    shadowColor: "rgba( 0, 0, 0, 0.5 )",
    shadowOffsetX: 1,
    shadowOffsetY: 1
};
//TODO copy to other languages and translate
//----------------------------- TOOLTIPS -------------------------------------------------------------------------------
var TXT_TOOLTIP_SPIN = "SPIN";
var TXT_TOOLTIP_STOP = "STOP";
var TXT_TOOLTIP_CONTINUE = "CONTINUE";
var TXT_TOOLTIP_BET_UP = "BET UP";
var TXT_TOOLTIP_BET_DOWN = "BET DOWN";
var TXT_TOOLTIP_MAX_BET = "MAX BET";

var TOOLTIP_PROPERTIES = {
    spin: {
        txt: "SPIN",
        x: 0,
        y: 0
    },
    stop: {
        txt: "STOP",
        x: 0,
        y: 0
    },
    continuebtn: {
        txt: "CONTINUE",
        x: 0,
        y: 0
    },
    betup: {
        txt: "BET UP",
        x: 0,
        y: 0
    },
    betdown: {
        txt: "BET DOWN",
        x: 0,
        y: 0
    },
    maxbet: {
        txt: "MAX BET",
        x: 0,
        y: 0
    }
};
//----------------------------- TOOLTIPS ------------------------------------------------------------------------------

var TOOLTIP_STYLE = {
    dX: 3,//0, // X offset (for all)
    dY: 20,//0, // Y offset (for all)
    font: "Arial",
    size: 11,
    align: "center",
    textBaseline: "middle",
    color: "#ffffff",
    stroke: "#000000 4",
    bold: true,
    shadowColor: "rgba( 0, 0, 0, 0.5 )",
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    lside: 0,
    rside: 0
};


//----------------------------- AUTOPLAY ------------------------------------------------------------------------------

var TXT_AP_STOP_IF = "Stop Autoplay";
var TXT_AP_AUTOPLAY_SPINS = "Autoplay Spins";
var TXT_AP_LOSS_LIMIT_TITLE = "If Loss Exceeds:";
var TXT_AP_SINGLE_WIN_TITLE = "If Single Win Exceeds:";
var TXT_AP_JACKPOT_WIN_TITLE = "Jackpot Win:";
var TXT_AP_NO_LIMIT = "No Limit";
var TXT_AP_ENTER_VALUE = "Choose";
var TXT_AP_AUTOPLAY = "Autoplay";
var TXT_AP_REASONS = "Autoplay has stopped for the following reasons:";
var TXT_AP_LOSS_LIMIT_EXCEEDED = "<br>\u2022 The Loss Limit would be exceeded.";
var TXT_AP_SINGLE_WIN_EXCEEDED = "<br>\u2022 The Single Win Limit has been exceeded.";
var TXT_AP_REASON_CANT_START = "Cannot start Autoplay because your Bet exceeds your loss limit. Please adjust your bet or your loss limit";

//=================== DO NOT TRANSLATE BELOW THIS LINE =============================================

//TODO copy to other languages
/*var TOOLTIP_STYLE = {
    dX: 0, // X offset (for all)
    dY: 0, // Y offset (for all)
    size: 17,
    align: "center",
    textBaseline: "middle",
    color: "#ffffff",
    stroke: "#000000 4",
    bold: false,
    shadowColor: "rgba( 0, 0, 0, 0.5 )",
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    lside: 0,
    rside: 0
};  */

//---------------------------------------------------------------
// Language specific format information
//
// ----- Size of meter fields --------------
// these should add up to 98% as 2% is reserved for padding.
var METER_BALANCE_WIDTH = '34%';
var METER_BET_WIDTH = '28%';
var METER_WIN_WIDTH = '30%';
var METER_LABEL_SIZE_L = '24px';
var METER_LABEL_SIZE_P = '17px';
var METER_VALUE_SIZE_L = '24px';
var METER_VALUE_SIZE_P = '17px';

// sizes of other fonts
var MESSAGE_BAR_FONT = '24px arial';

// Change in orientation - landscape = 1, portrait = 0 
function orientationChangeLanguage(landscape) {
    if (landscape) {
        $("span.meterLabel").css("font-size", METER_LABEL_SIZE_L);
        $("span.meterValue").css("font-size", METER_VALUE_SIZE_L);
    }
    else {
        $("span.meterLabel").css("font-size", METER_LABEL_SIZE_P);
        $("span.meterValue").css("font-size", METER_VALUE_SIZE_P);
    }
}

// This function is called when this file is loaded. 
function formatLanguage() {
    $("#field_balance").width(METER_BALANCE_WIDTH);
    $("#field_bet").width(METER_BET_WIDTH);
    $("#field_win").width(METER_WIN_WIDTH);

    $("span.meterLabel").css("font-size", METER_LABEL_SIZE_L);
    $("span.meterValue").css("font-size", METER_VALUE_SIZE_L);
}

//-------------------------------------------------------------------							   

function loadHelpLanguage() {
    if ($(".exitHelp").size() > 0)
        $(".exitHelp").val(TXT_RETURN_TO_GAME);

    if ($("#txtwild").size() > 0)
        $("#txtwild").html(TXT_WILD);

    if ($("#txtscatter").size() > 0)
        $("#txtscatter").html(TXT_SCATTER);

    if ($(".ofakind").size() > 0)
        $(".ofakind").html(TXT_OF_A_KIND);

    if ($(".titlerules").size() > 0)
        $(".titlerules").html(TXT_GAME_RULES_HEADER);

    if ($(".titlefree").size() > 0)
        $(".titlefree").html(TXT_FREE_GAMES_HEADER);

    if ($(".titlesuperbet").size() > 0)
        $(".titlesuperbet").html(TXT_SUPER_BET_HEADER);

    if ($(".titlerandombonus").size() > 0)
        $(".titlerandombonus").html(TXT_RANDOM_BONUS_HEADER);

    $("#gamerulestext").find("li").remove();
    $.each(TXT_GAME_RULES_CONTENT, function (index, value) {
        $("#gamerulestext").append($("<li>").html(value))
    });

    $("#freegamestext").find("li").remove();
    $.each(TXT_FREE_GAMES_FEATURE, function (index, value) {
        $("#freegamestext").append($("<li>").html(value))
    });

    $("#superbettext").find("li").remove();
    $.each(TXT_SUPER_BET_CONTENT, function (index, value) {
        $("#superbettext").append($("<li>").html(value))
    });

    $("#randombonustext").find("li").remove();
    $.each(TXT_RANDOM_BONUS_CONTENT, function (index, value) {
        if ($.trim(value) == "") {
            $("#randombonustext").append("<br/>");
        }
        else if (value == "FOX FUNDS" || value == "LEPRECHAUN SHAKE DOWN") {
            $("#randombonustext").append($("<div style='font-weight:bold;'>").html(value));
        }
        else {
            $("#randombonustext").append($("<li>").html(value));
        }
    });


}

formatLanguage();
