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
