// BV RC

function RealityCheckBV() {
	var bvRC = null;
	
	if (urlParameters.rcUrl.length > 0) {
		$("body").append("<iframe src='"+urlParameters.rcUrl+"' id='bvdisclaimer'></iframe>");
		bvRC = $("#bvdisclaimer");
		bvRC.css({
			"position":	"absolute", 
			"top":		"0px",
			"left":		"0px", 
			"width":	"100%",
			"height":	"100%", 
			"display":	"none",
			"z-index": 	"900",
			"border":	"none",
			"margin":	"0px",
			"padding":	"0px",
			"overflow":	"auto"
		});	
	}
	window.addEventListener("message", returnMessage, false);
	
	this.showRC = function() {
		if (urlParameters.rcUrl.length > 0) {
			bvRC.css("display", "block");
			waitToEndRound = false;
			if(wrapperinterface) {
				gameAPI("STOP_AUTOPLAY", true);
			} else {
				gameiframe.contentWindow.apiExt("PAUSE_AUTOPLAY", true);
				//gameiframe.contentWindow.apiExt("ENABLE_ALL_UI", false);	
			}
		}
	};
	
	this.hideRC = function() {
		if (urlParameters.rcUrl.length > 0) {
			bvRC.css("display", "none");
			if(wrapperinterface) {
				gameAPI("STOP_AUTOPLAY", false);
			} else {
				gameiframe.contentWindow.apiExt("PAUSE_AUTOPLAY", false);
				//gameiframe.contentWindow.apiExt("ENABLE_ALL_UI", true);
			}
		}
	};
	
	this.postMessage = function(msg) {
		if (urlParameters.rcUrl.length > 0) {
			//document.getElementById("bvdisclaimer").contentWindow.postMessage("gameLoaded", "*");
			document.getElementById("bvdisclaimer").contentWindow.postMessage("gameReady", "*");
		} else if (window.parent != window.self){
			window.parent.window.postMessage("gameReady", "*");
		}
	}
	
	function returnMessage(event) {
		var objMessage = null;
		try
		{
			objMessage = event.data;
										
			switch (objMessage)
			{
				case "confirmHandshake" :
					//TODO
				break;
				case "pauseGame" :
				case "stopGame" :
					if (inGameRound) {
						waitToEndRound = true;
					} else {
						if (urlParameters.rcUrl.length > 0) {
							realityCheckBV.showRC();
						} else if (window.parent != window.self) {
							waitToEndRound = false;
							if(wrapperinterface) {
								gameAPI("STOP_AUTOPLAY", false);
							} else {
								gameiframe.contentWindow.apiExt("PAUSE_AUTOPLAY", false);
							}
							window.parent.window.postMessage("gameStopped", "*");
						}
					}
					//TODO
				break;
				case "resumeGame" :
				case "restartGame" :
					if (urlParameters.rcUrl.length > 0) {
						realityCheckBV.hideRC();
					} else if (window.parent != window.self) {
						waitToEndRound = false;
						if(wrapperinterface) {
							gameAPI("STOP_AUTOPLAY", true);
						} else {
							gameiframe.contentWindow.apiExt("PAUSE_AUTOPLAY", true);
						}
					}
					//TODO
				break;	
			}
		}
		catch(error)
		{
			console.log("[Game Wrapper] failed to parse received message");
		}
	}
	
}