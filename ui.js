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
