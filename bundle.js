(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//adapted from http://www.willmaster.com/library/features/background-image-slide-show.php

var switchMilliseconds = 5000;

// images - array of URLs of images to show
// bg - the background element to put them on
module.exports = function(images, bg) {
	var preloadImage;
	function publishPicture(i) {
		bg.src = images[i]; 
		bg.style.minHeight = Math.max(700, window.innerHeight) + 'px';
		bg.style.opacity = 1;

		// preload next image
		preloadImage = new Image();
		preloadImage.src = images[(i + 1) % images.length];

		setTimeout(function() {
			bg.style.opacity = 0;
			setTimeout(publishPicture.bind(null, (i + 1) % images.length), 400);
		}, switchMilliseconds);
	}
	publishPicture(0);
};

},{}],2:[function(require,module,exports){
var slideshow = require('./slideshow');
var yodel = require('./yodel');

var URLInput = document.getElementById('videoURL');
var goButton = document.getElementById('go');

if (location.search) {
	document.getElementById("ui").style.display = 'none';
	document.getElementById("home").style.display = 'block';
}

function go() {
	// Because it's TerribleHack, screw URL parsers
	var videoIDMatch = URLInput.value.match(/\?(?:.*&)?v=([^&#]+)/);
	if (videoIDMatch !== null) {
		location.search = "v=" + videoIDMatch[1];
	} else {
		if (URLInput.value === '')
			showError('No YouTube link given. Put one in that box up there.');
		else
			showError('Could not find the video ID from the given URL. Try going to a YouTube video and copying the URL from your address bar.');
	}
}

goButton.addEventListener('click', go);

addEventListener('keypress', function(e) {
	if ((e.keyCode || e.which) === 13) // enter key
		go();
});

function showError(s) {
	var errorBox = document.getElementById('error');
	errorBox.textContent = s;
	error.style.display = 'block';
}

slideshow([
	"http://www.andermatt-swissalps.ch/fileadmin/user_upload/Location/Andermatt/Back_Andermatt.jpg",
	"http://upload.wikimedia.org/wikipedia/commons/d/da/Lauterbrunnental_train.jpg",
	"https://brandondarnell.files.wordpress.com/2012/12/swiss-alps-lauterbrunnen-hiking.jpg",
	"http://i.imgur.com/usDQNuO.jpg",
	"http://www.blki.hu/~szucs/S_22w.jpg",
	"http://i.imgur.com/PO9mdPz.jpg",
	"http://freewallpaperwide.com/wp-content/uploads/2015/03/Swiss-Alps-Images-03-HD-Wallpaper.jpg",
	"http://thecambrianadelboden.com/images/backgrounds/background_4.jpg",
	"http://dimitrijeostojic.com/blog/wp-content/uploads/2011/08/matterhorn_00B.jpg",
	"http://i.imgur.com/oX956Oc.png"	
], document.getElementById('bg')); 

yodel();

},{"./slideshow":1,"./yodel":3}],3:[function(require,module,exports){
// TODO: make a decent API - might be hard since Youtube has a crappy API
module.exports = function() {
	var userVid;
	var yodelVid;
	var userVidReady = false; // See this, kids? This is why promises are good.
	var yodelVidReady = false;

	window.onYouTubeIframeAPIReady = function() {
		if (location.search) {
			userVid = new YT.Player('userVid', {
				height: '390',
				width: '640',
				videoId: location.search.replace("?v=",""),
				playerVars: {
					showinfo: 0,
					modestbranding: 1,
					html5: 1
				},
				events: {
					onReady: function() {
						userVidReady = true;
						if (yodelVidReady) onVideosReady();
					},
					onStateChange: function(e) {
						if (yodelVidReady) {
							onUserVidStateChange(e);
						}
					}
				}
			});

			yodelVid = new YT.Player('yodelVid', {
				height: '390',
				width: '640',
				videoId: 'vQhqikWnQCU',
				playerVars: {
					start: 2,
					html5: 1,
					loop: 1
				},
				events: {
					onReady: function() {
						yodelVidReady = true;
						if (userVidReady) onVideosReady();
					},
				}
			});
		}
	};

	function onVideosReady() {
		userVid.mute();
		if (userVid.getAvailablePlaybackRates().indexOf(2) === -1) {
			showError("The video is either using Flash or your browser doesn't support HTML5 playback speed. You could try another video, but you probably need a better browser.");
		} else {
			userVid.setPlaybackRate(2);
		}
		userVid.playVideo();
		document.body.className += "flashing";

		yodelVid.unMute();
		yodelVid.setVolume(100);
		yodelVid.playVideo();
	}

	function onUserVidStateChange(e) {
		if (e.data === YT.PlayerState.PLAYING) {
			yodelVid.playVideo();
			document.body.className += "flashing";
		} else {
			yodelVid.pauseVideo();
			document.body.className = '';
		}
	}
};

},{}]},{},[2]);
