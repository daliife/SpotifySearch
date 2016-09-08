// petitioncontroller.js

var spotifyApi = new SpotifyWebApi();
var constants = Object.freeze({
    num_songs: 8,
    num_albums: 6,
    num_artists: 5
});

getSongsObject("ac");
getAlbumsObject("ac");
getArtistsObject("ac");

function getSongsObject(petitionName){	

	spotifyApi.searchTracks(petitionName, {limit: constants.num_songs}).then(function(data) {    

		var source = $("#song-template").html();
		var template = Handlebars.compile(source);		

	    for (var i = 0; i < constants.num_songs; i++) {

	    	var songInfo = { song: data.tracks.items[i].name,
	    				album: data.tracks.items[i].album.name, 
	    				album_image: data.tracks.items[i].album.images[1].url,
	    				artist: data.tracks.items[i].artists[0].name,
	    				audio_preview: data.tracks.items[i].preview_url
			};

			var html = template(songInfo);
			$('#songs-container').append(html);	    	
	    }	

	}, function(err) {
		console.error(err);
	});
}

function getAlbumsObject(petitionName){	
		
	var albumsObject = new Array();

	spotifyApi.searchAlbums(petitionName, {limit: constants.num_albums}).then(function(data) {        
		console.log(data);
		var source = $("#albums-template").html();
		var template = Handlebars.compile(source);	

	    for (var i = 0; i < constants.num_albums; i++) {
	    	var albumInfo = { album_image: data.albums.items[i].images[1].url,
	    				name: data.albums.items[i].name, 
	    				spotify_link: data.albums.items[i].external_urls.spotify
			};			
			
			var html = template(albumInfo);
			$('#albums-container').append(html);	    	
		}   	
	}, function(err) {
		console.error(err);
	});
}

function getArtistsObject(petitionName){	

	spotifyApi.searchArtists(petitionName, {limit: constants.num_artists}).then(function(data) {    

		var source = $("#artists-template").html();
		var template = Handlebars.compile(source);

	    for (var i = 0; i < constants.num_artists; i++) {
    		var artistInfo = { name: data.artists.items[i].name,
    				popularity: data.artists.items[i].popularity, 
    				num_followers: data.artists.items[i].followers.total,
    				spotify_link: data.artists.items[i].external_urls.spotify,
    				artist_image: data.artists.items[i].images[2].url,
    				genres: data.artists.items[i].genres
			};	
			
			var html = template(artistInfo);
			$('#artists-container').append(html);
	    }   	
	}, function(err) {
		console.error(err);
	});
}
