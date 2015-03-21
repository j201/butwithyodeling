var userVid, yodelVid;

window.onYouTubeIframeAPIReady = function() {
	userVid = new YT.Player('userVid', {
		height: '390',
		width: '640',
		videoId: '0T8A38OHQMQ',
		html5: 1,
		events: {
			onReady: onUserVidReady,
			onStateChange: onUserVidStateChange,
		}
	});
	
	yodelVid = new YT.Player('yodelVid', {
		height: '390',
		width: '640',
		videoId: 'vQhqikWnQCU',
		html5: 1,
		events: {
			onReady: onYodelVidReady,
		}
	});
};

function onUserVidReady() {
	userVid.mute();
	if (userVid.getAvailablePlaybackRates().indexOf(2) === -1) {
		// show error div
	} else {
		userVid.setPlaybackRate(2);
	}
	userVid.playVideo();
}

function onYodelVidReady() {
	yodelVid.unMute();
	yodelVid.setVolume(100);
	yodelVid.playVideo();
}

function onUserVidStateChange(e) {
	if (e.data === YT.PlayerState.PLAYING) {
		yodelVid.playVideo();
	} else {
		yodelVid.pauseVideo();
	}
}
