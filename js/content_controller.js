// petitioncontroller.js

var spotifyApi = new SpotifyWebApi();

var numSongs = 10;
var numArtists = 6;
var numAlbums = 6;


//Funció que obté les cançons demanades per l'usuari i les afegeix a la llista de cançons obtingudes
function getSongsObject(petitionName, numSongs){	
		
	var songsObject = new Array();

	spotifyApi.searchTracks(petitionName, {limit: numSongs}).then(function(data) {    
	    console.log(data);
	    for (var i = 0; i < numSongs; i++) {
	    	
	    	var songInfo = { song: data.tracks.items[i].name,
	    				album: data.tracks.items[i].album.name, 
	    				album_image: data.tracks.items[i].album.images[1].url,
	    				artist: data.tracks.items[i].artists[0].name,
	    				audio_preview: data.tracks.items[i].preview_url
	    			};
	    			
	    	songsObject.push(songInfo);
	    }	
	}, function(err) {
		console.error(err);
	});

	//console.log(songsObject);
	return songsObject;

}

//Funció que obté els àlbums demanats per l'usuari i els afegeix a la llista d'àlbums obtingudes
function getAlbums(petitionName, numAlbums){	
		
		$("#albumsList").empty();

		spotifyApi.searchAlbums(petitionName, {limit: numAlbums}).then(function(data) {        
		    for (var i = 0; i < numAlbums; i++) {
		    	 $("#albumTemplate").tmpl(data.albums.items[i]).appendTo("#albumsList");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

//Funció que obté els artistes demanats per l'usuari i els afegeix a la llista d'artistes obtingudes
function getArtists(petitionName, numArtists){	
		
		$("#artistsList").empty();

		spotifyApi.searchArtists(petitionName, {limit: numArtists}).then(function(data) {    
		    for (var i = 0; i < numArtists; i++) {
		    	 $("#artistTemplate").tmpl(data.artists.items[i]).appendTo("#artistsList");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

var so = new Array();
so = getSongsObject("ac", numSongs);
console.log(so);