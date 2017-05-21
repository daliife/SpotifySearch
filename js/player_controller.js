// player.js
var song = document.createElement('audio');
var isPlaying = false;
song.setAttribute("id","audio");

function progress() {
	
	//Update slider
	document.getElementById("progress").value = ((song.currentTime/song.duration)*1000);
	
	//Update time of miniplayer
	var date = new Date(null);
	date.setSeconds(song.currentTime); // specify value for SECONDS here
	document.getElementById("start-time").innerHTML = date.toISOString().substr(14, 5);
	date.setSeconds(song.duration - song.currentTime );
	document.getElementById("end-time").innerHTML = date.toISOString().substr(14, 5);
	
}

function toggleMiniplayer(){	

	if(!isPlaying){
		$("#miniplayer").removeClass('animated');
		$("#miniplayer").removeClass('slideOutRight');
		$("#miniplayer").toggleClass('animated slideInRight');
		isPlaying = true;
	}else{
		$("#miniplayer").removeClass('animated');
		$("#miniplayer").removeClass('slideInRight');
		$("#miniplayer").toggleClass('animated slideOutRight');
		isPlaying = false;
	}

}

function addPlayer(url){

	song.pause();
	updateSource(url);
	song.play();
	isPlaying = true;

}

function updateSource(url){ 

    song.src = url;
    song.load();
    song.addEventListener("timeupdate", progress, false);
    song.volume = 1.0;

}

function setTiming(percent){
	if (isPlaying) {
		song.currentTime = song.duration/100*percent;
	};
}

song.onended = function() {
	toggleMiniplayer();
};

function playSong(url, urlImage, nameSong, nameAlbum, id, nameArtist, IDArtist){
    updatePlayerInfo(urlImage, nameSong, nameAlbum, nameArtist);
    if(!isPlaying) toggleMiniplayer();
    addPlayer(url);
}

function updatePlayerInfo(urlImage, nameSong, nameAlbum, nameArtist){
    document.getElementById("imagePlayingSong").src = urlImage;
    document.getElementById("namePlayingSong").innerHTML = nameSong;
    var htmlAlbumIcon = '<span class="glyphicon glyphicon-cd" aria-hidden="true"></span> ';
    var htmlArtistIcon = '<span class="glyphicon glyphicon-user" aria-hidden="true"></span> ';
    document.getElementById("albumPlayingSong").innerHTML = htmlAlbumIcon + nameAlbum;     
    document.getElementById("artistPlayingSong").innerHTML = htmlArtistIcon + nameArtist;     
}