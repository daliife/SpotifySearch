//content_controller.js

$(document).ready(function(){

	showMainSearch();

	$( "#navbar-search-button" ).click(function() {
		if(checkSubmitNavbar())searchPetition("navbar-form");
	});	

	$( "#main-search-button" ).click(function() {
		if(checkSubmitMain())searchPetition("main-form");
	});	

    $("#main-form").keydown(function (event) {
		if (event.which === 13 && checkSubmitMain()) {
			event.preventDefault();
			searchPetition("main-form");
		}
	});	
 
    $("#navbar-form").keydown(function (e) {
    	if (e.keyCode === 13 && checkSubmitNavbar()) {
    		event.preventDefault();
    		searchPetition("navbar-form");
		}    		
	});			

});

function searchPetition(formID){
	
	var petition = document.getElementById(formID).value;
	$(".filler").html("<small>Results for:</small> " + petition);

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

function checkSubmitNavbar() {
	return !(document.getElementById("navbar-form").value == "")
}

function checkSubmitMain() {
    return !(document.getElementById("main-form").value == "")
}


