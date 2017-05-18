// player.js
var song = document.createElement('audio');
var isPlaying = false;
song.setAttribute("id","audio");

function progress() {
	
	//Update slider
	document.getElementById("progress").value = ((song.currentTime/song.duration)*100);
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
    song.volume = 0.1;

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
    //TODO: addItemSongsPlayed(id,nameArtist,nameSong,nameAlbum,1,IDArtist);       
}

function updatePlayerInfo(urlImage, nameSong, nameAlbum, nameArtist){
    document.getElementById("imagePlayingSong").src = urlImage;
    document.getElementById("namePlayingSong").innerHTML = nameSong;
    document.getElementById("albumPlayingSong").innerHTML = nameAlbum + " | " + nameArtist;     
}