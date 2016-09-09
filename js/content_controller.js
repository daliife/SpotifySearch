//content_controller.js

$(document).ready(function(){

	showMainSearch();

	$( "#navbar-search-button" ).click(function() {
	  searchPetition("navbar-form");
	});	

	$( "#main-search-button" ).click(function() {
	  searchPetition("main-form");
	});		

});

function searchPetition(formID){
	
	var petition = document.getElementById(formID).value;
	$(".filler").html("<small>Results for:</small> " + petition);
	console.log("Petition: " + petition);

	getSongsObject(petition);
	getAlbumsObject(petition);
	getArtistsObject(petition);

	showResults();

}

function showResults(){
	$('#main-search').hide();
	$('#result-search').show();	
}

function showMainSearch(){
	$('#main-search').show();
	$('#result-search').hide();	
}

function clearResults(){
	$('#songs-container').empty();
	$('#albums-container').empty();
	$('#artists-container').empty();
	showMainSearch();
}

