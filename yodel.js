var player;

window.onYouTubeIframeAPIReady = function() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'OEoXaMPEzfM',
		html5: 1,
		events: {
			'onReady': onPlayerReady,
		}
	});
};

function onPlayerReady(event) {
	console.log(player.getAvailablePlaybackRates());
	player.mute();
	player.setPlaybackRate(2);
	player.playVideo();
}
