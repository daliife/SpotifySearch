// petitioncontroller.js
var spotifyApi = new SpotifyWebApi();
var numSongs = 10;
var numArtists = 6;
var numAlbums = 6;
var isEmpty;
var hasAnySongPlayed;
var nameArtist="";


//Funció que obté les cançons demanades per l'usuari i les afegeix a la llista de cançons obtingudes
function getSongs(petitionName, numSongs){	
		
		$("#songsList").empty();

		spotifyApi.searchTracks(petitionName, {limit: numSongs}).then(function(data) {    
		    for (var i = 0; i < numSongs; i++) {
		    	 $("#songTemplate").tmpl(data.tracks.items[i]).appendTo("#songsList");
		    } 	
		  }, function(err) {
		    console.error(err);
		  });

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

//Crida de les tres funcions de busca
function searchAction(petitionName){

		getSongs(petitionName, numSongs);
		getAlbums(petitionName,numAlbums);
		getArtists(petitionName,numArtists);

}

function getRecSongs(petitionName, numSongs){

		spotifyApi.searchTracks(petitionName, {limit: numSongs}).then(function(data) {    
		    for (var i = 0; i < numSongs; i++) {
		    	 $("#songTemplate").tmpl(data.tracks.items[i]).appendTo("#songsListRecomendation");
		    } 	
		  }, function(err) {
		    console.error(err);
		  });

}

function getRecAlbums(petitionName, numAlbums){

		spotifyApi.searchAlbums(petitionName, {limit: numAlbums}).then(function(data) {        
		    for (var i = 0; i < numAlbums; i++) {
		    	 $("#albumTemplate").tmpl(data.albums.items[i]).appendTo("#albumsListRecomendation");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

function getRecArtists(petitionName, numArtists){

		spotifyApi.searchArtists(petitionName, {limit: numArtists}).then(function(data) {    
			//console.log(data);		   
		    for (var i = 0; i < numArtists; i++) {
		    	 $("#artistTemplate").tmpl(data.artists.items[i]).appendTo("#artistsListRecomendation");
		    }   	
		  }, function(err) {
		    console.error(err);
		  });

}

//Funció que obté les cançons, albums i artistes recomanats
function recomendedSongs(artist){

	spotifyApi.getArtistRelatedArtists(artist, null).then(function(data) {  
	    for(var i = 0; i<numArtists;i++){
			getRecArtists(data.artists[i].name,1);
		}
		for(var i = 0; i<numSongs;i++){
			getRecSongs(data.artists[i].name,1);
		}
		for(var i = 0; i<numSongs;i++){
			getRecAlbums(data.artists[i].name,1);
		}

	  }, function(err) {
	    console.error(err);
	  });

}

function changeEmpty(flag){
	if (!flag) {
		isEmpty = false;
		console.log("Esta full!");
	}else{
		isEmpty = true;
		console.log("Esta empty!");
	};

}

function checkPlayedDatabase(flag){

	if (flag) {
		hasAnySongPlayed = true;
	}else{
		hasAnySongPlayed = false;
	};
}

function updateSuggestions(){
	
	$("#songsListRecomendation").empty();
	$("#artistsListRecomendation").empty();
	$("#albumsListRecomendation").empty();

	mostPlayed();
	checkSongsPlayed();
	
	setTimeout(function(){
   		if(!hasAnySongPlayed){

			trendingSongs();	
	
		}else{
		
			recomendedSongs(nameArtist);		
		}
	
	}, 500);
	
}

function trendingSongs(){

	$.ajax({
		url:"http://developer.echonest.com/api/v4/artist/top_hottt?api_key=KLQS7H9RMIF0J7KNS&format=json&results="+numArtists+"&start=0&bucket=hotttnesss",
		type:"GET",
		dataType:"json",
		success:function(json){
			for (var i=0 ; i<json.response.artists.length; i++){
				getRecArtists(json.response.artists[i].name,1);
				getRecSongs(json.response.artists[i].name,2);
				getRecAlbums(json.response.artists[i].name,2);
			}
		},error: function(){
			console.log("error: Cannot get trendingSongs");
		}
	});
}

function  changeNameArtist(name){
	nameArtist = name;
}