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
	if ((e.keyCode || e.which) == 13) // enter key
		go();
});

function showError(s) {
	var errorBox = document.getElementById('error');
	errorBox.textContent = s;
	error.style.display = 'block';
}
