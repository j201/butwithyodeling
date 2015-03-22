//adapted from http://www.willmaster.com/library/features/background-image-slide-show.php

var a = new Array(
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
); 

var switchMilliseconds = 3000;
var elemID = 'bg';

function publishPicture(i) {
	document.getElementById(elemID).src = a[i]; 
	i++;
	if( i > (a.length - 1) ) { i = 0; }
	setTimeout('publishPicture('+i+')',switchMilliseconds);
}
publishPicture(0);


