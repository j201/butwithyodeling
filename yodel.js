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
			},
			events: {
				onReady: function() {
					userVidReady = true;
					if (yodelVidReady) onVideosReady();
				},
				onStateChange: onUserVidStateChange,
			}
		});

		yodelVid = new YT.Player('yodelVid', {
			height: '390',
			width: '640',
			videoId: 'vQhqikWnQCU',
			playerVars: {
				start: 2
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
