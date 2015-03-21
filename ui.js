var URLInput = document.getElementById('videoURL');
var goButton = document.getElementById('go');

if (location.search) {
	document.getElementById("ui").style.display = 'none';
}

function go() {
	// Because it's TerribleHack, screw URL parsers
	var videoIDMatch = URLInput.value.match(/\?(?:.*&)?v=([^&#]+)/);
	if (videoIDMatch !== null) {
		location.search = "v=" + videoIDMatch[1];
	}
}

goButton.addEventListener('click', go);

addEventListener('keypress', function(e) {
	if ((e.keyCode || e.which) == 13) // enter key
		go();
});
