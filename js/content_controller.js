//content_controller.js

$(document).ready(function(){

	showMainSearch();

	$( "#navbar-search-button" ).click(function() {
	  searchPetition("navbar-form");
	});	

	$( "#main-search-button" ).click(function() {
	  searchPetition("main-form");
	});	

    $("#main-form").keydown(function (event) {
    	console.log("hahah");
    	if (event.which === 13) {
    		event.preventDefault();
    		searchPetition("main-form");
		}
	});	
 
    $("#navbar-form").keydown(function (e) {
    	if (e.keyCode === 13) {
    		event.preventDefault();
    		searchPetition("navbar-form");
		}    		
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

function checkSubmit() {
    if ( document.getElementById("addon2").value == "" ){
        return 0;
    }else{
        return 1;
    }
}


