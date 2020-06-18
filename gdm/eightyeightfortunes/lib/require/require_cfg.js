requirejs.config({
	waitSeconds: 100,
    baseUrl: "lib",
    paths: {
        TweenLite: "gsap/TweenLite",
        TweenMax:  "gsap/TweenMax",
        TimelineMax: "gsap/TimelineMax",
        TimelineLite: "gsap/TimelineLite",
		socketio: "../app",
        app: "../app"
    },
    shim : {
        'spine/spine' : {
          exports : 'spine'
        },
		'createjs/createjs' : {
          exports : 'createjs'
		},
		'socket': {
		  exports: 'io'
		},
		'stats/stats' : {
          exports : 'stats'
		},
		'howler/howler' : {
			exports: 'howler'
		}
    }
});