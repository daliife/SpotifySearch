// petitioncontroller.js

//Instance of SpotifyWepApi (more info: https://github.com/JMPerez/spotify-web-api-js)
var spotifyApi = new SpotifyWebApi();

//Results of search parameters
var constants = Object.freeze({
    num_songs: 6,
    num_albums: 6,
    num_artists: 3
});

var curr_num_songs = constants.num_songs;
var curr_num_albums = constants.num_albums;
var curr_num_artists = constants.num_artists;
var curr_petition_name;

//TODO: Control undefined/error variables of data
function getSongsObject(petitionName){	

	var source = $("#song-template").html();
	var template = Handlebars.compile(source);

	curr_petition_name = petitionName;


	$('#songs-container').empty();

	spotifyApi.searchTracks(petitionName, {limit: curr_num_songs}).then(function(data) {    

		if (data.tracks.total > 0) {
			
		    for (var i = 0; i < curr_num_songs; i++) {

		    	var is_not_last_song = (i == data.tracks.items.length - 1)? false : true; 

		    	var songInfo = { song: data.tracks.items[i].name,
		    				album: data.tracks.items[i].album.name, 
		    				album_image: data.tracks.items[i].album.images[1].url,
		    				artist: data.tracks.items[i].artists[0].name,
		    				audio_preview: data.tracks.items[i].preview_url,
		    				last_song: is_not_last_song
				};

				var html = template(songInfo);
				$('#songs-container').append(html);	

		    }

		    curr_num_songs += constants.num_songs;	

		}else{

			var html_error = '<div class="media"><div class="media-body"><h4 class="media-heading text-center"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> No songs found.</h4>	</div></div>';
			$('#songs-container').append(html_error);

		};

	}, function(err) {
		console.error(err);
	});
}

function getAlbumsObject(petitionName){	

	var source = $("#albums-template").html();
	var template = Handlebars.compile(source);	

	$('#albums-container').empty();
	
	spotifyApi.searchAlbums(petitionName, {limit: curr_num_albums}).then(function(data) {        
		
		if (data.albums.total > 0) {

		    for (var i = 0; i < curr_num_albums; i++) {
		    	var albumInfo = { album_image: data.albums.items[i].images[1].url,
		    				name: data.albums.items[i].name, 
		    				spotify_link: data.albums.items[i].external_urls.spotify
				};			
				
				var html = template(albumInfo);
				$('#albums-container').append(html);	    	
			}

			var finalLoad ='<div class="col-xs-12"><div id="show" class="media"><div class="media-body"><a href="javascript:void(0);" onclick="toggleLoadMore(1);"><h4 id="load-more" class="media-heading green-spotify">LOAD MORE ALBUMS</h4></a></div></div></div>'; 

			$('#albums-container').append(finalLoad);

			curr_num_albums += constants.num_albums;			 

		}else{
			var html_error = '<div class="media"><div class="media-body"><h4 class="media-heading text-center"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> No albums found.</h4>	</div></div>';
			$('#albums-container').append(html_error);
		};  

	}, function(err) {
		console.error(err);
	});

}

function getArtistsObject(petitionName){	

	var source = $("#artists-template").html();
	var template = Handlebars.compile(source);

	$('#artists-container').empty();

	spotifyApi.searchArtists(petitionName, {limit: curr_num_artists}).then(function(data) {    

		if (data.artists.total > 0) {

		    for (var i = 0; i < curr_num_artists; i++) {
	   			
				var genres_temp;
				if(data.artists.items[i].genres.length == undefined){
					genres_temp = ["none"];
				}else{
					genres_temp = data.artists.items[i].genres.slice(0,3);
				}
				var is_not_last_artist = (i == data.artists.items.length - 1)? false : true; 

	    		var artistInfo = { name: data.artists.items[i].name,
	    				popularity: data.artists.items[i].popularity, 
	    				num_followers: data.artists.items[i].followers.total,
	    				spotify_link: data.artists.items[i].external_urls.spotify,
	    				artist_image: data.artists.items[i].images[2].url,
	    				genres: genres_temp,
	    				last_artist: is_not_last_artist
				};	
	
				var html = template(artistInfo);
				$('#artists-container').append(html);

				curr_num_artists += constants.num_artists;

		    }

		}else{
			var html_error = '<div class="media"><div class="media-body"><h4 class="media-heading text-center"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> No artists found.</h4>	</div></div>';
			$('#artists-container').append(html_error);
		}; 	       	

	}, function(err) {
		console.error(err);
	});
}

//TODO: Implement some day trending, reccomendations and favorites.
function getSpotifyTopHundredTracks(){

	spotifyApi.searchPlaylists('Top 100 tracks currently on Spotify', {limit:10}).then(function(data) {    

	console.log(data);

	}, function(err) {
		console.error(err);
	});

}