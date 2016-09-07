// petitioncontroller.js

var spotifyApi = new SpotifyWebApi();
var constants = Object.freeze({
    num_songs: 10,
    num_albums: 6,
    num_artists: 6
});

function getSongsObject(petitionName){	
		
	var songsObject = new Array();

	spotifyApi.searchTracks(petitionName, {limit: constants.num_songs}).then(function(data) {    

	    for (var i = 0; i < constants.num_songs; i++) {
	    	
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

	console.log(songsObject);
	return songsObject;

}

function getAlbumsObject(petitionName){	
		
	var albumsObject = new Array();

	spotifyApi.searchAlbums(petitionName, {limit: constants.num_albums}).then(function(data) {        

	    for (var i = 0; i < constants.num_albums; i++) {
	    	var albumInfo = { album_image: data.albums.items[i].images[1].url,
	    				name: data.albums.items[i].name, 
	    				spotify_link: data.albums.items[i].external_urls.spotify
			};			
	    	albumsObject.push(albumInfo);	    	
		}   	
	}, function(err) {
		console.error(err);
	});

	//console.log(albumsObject);
	return albumsObject;		

}

function getArtistsObject(petitionName){	

	var artistsObject = new Array();

	spotifyApi.searchArtists(petitionName, {limit: constants.num_artists}).then(function(data) {    

	    for (var i = 0; i < constants.num_artists; i++) {
    		var artistInfo = { name: data.artists.items[i].name,
    				popularity: data.artists.items[i].popularity, 
    				num_followers: data.artists.items[i].followers.total,
    				spotify_link: data.artists.items[i].external_urls.spotify,
    				artist_image: data.artists.items[i].images[2].url
			};			
    		artistsObject.push(artistInfo);
	    }   	
	}, function(err) {
		console.error(err);
	});

	//console.log(artistsObject);
	return artistsObject;

}
