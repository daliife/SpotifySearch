// player.js
var song = document.createElement('audio');
var isPlaying = false;
song.setAttribute("id","audio");



//Actualitza l'slider de progress de la canço al minireproductor
function progress() {
	document.getElementById("progress").value = ((song.currentTime/song.duration)*100);
}

//Actualitza la src del tag audio que s'esta utilitzant i reseteja l'estat del volum 
function updateSource(url){ 
    song.src = url;
    song.load();
    song.addEventListener("timeupdate", progress, false);
    song.volume = 0.5;
    document.getElementById("volumeSlider").value = 50;
}

//Reprodueix una cançó concreta a partir de la url passada per paràmetre
function addPlayer(url){
	song.pause();
	updateSource(url);
	song.play();
	changeIconPlay(true);
	isPlaying = true;
}

//Fixa un volum de la cançó i de l'slider corresponent a aquest
function setVolume(volum){
  song.volume=volum/100;
  document.getElementById("volumeSlider").value = volum;
}

//Funció que fixa el temps concret d'una canço a partir del parametre percent
function setTiming(percent){
	if (isPlaying) {
		song.currentTime = song.duration/100*percent;
	};
}

//Funció que oculta el minireproductor quan la canço s'acaba
song.onended = function() {
	$( "#miniplayer" ).hide('slow');
	isPlaying = false;   
};

//Funció utilitzada per debbuging per obtenir el volum
function getVolume(){
	console.log("El volum actual es de: " + song.volume*100 + "%");
}

//Funció utilitzada per debbuging per obtenir el temps de la canço
function getSongTime(){
    console.log("Current song time: "+ song.currentTime + " seconds");
}