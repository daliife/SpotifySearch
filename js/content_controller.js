//content_controller.js
var TRANSITION_RATE = 1000;

$(document).ready(function(){

	
	//Onloaded animation
	$('#result-search').hide();
	$('#navigation-bar').hide();	
	$('#navigation-bar').fadeIn(TRANSITION_RATE);	
	$('#navigation-bar').show();
	$('#main-search').hide();	
	$('#main-search').fadeIn(TRANSITION_RATE);	
	$('#main-search').show();	


	setInterval(function() {
		updateWallpaper();
	}, 6000);


	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": true,
	  "progressBar": false,
	  "positionClass": "toast-bottom-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "500",
	  "timeOut": "3000",
	  "extendedTimeOut": "5jd00",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}

	$( "#navbar-search-button" ).click(function() {
		if(checkSubmitNavbar()){
			searchPetition("navbar-form");
		}else {
			toastr.info('Write any song, artist or album!','INFO');
		}
	});	

	$( "#main-search-button" ).click(function() {
		if(checkSubmitMain()){
			searchPetition("main-form");
		}else {
			toastr.info('Write any song, artist or album!','INFO');
		}
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
	$('#main-search').fadeOut(TRANSITION_RATE);
	$('#main-search').hide();
	$('#result-search').fadeIn(TRANSITION_RATE);	
	$('#result-search').show();	
}

function showMainSearch(){
	$('#result-search').fadeOut(TRANSITION_RATE);
	$('#result-search').hide();
	$('#main-search').fadeIn(TRANSITION_RATE);	
	$('#main-search').show();	
}

function clearResults(){
	showMainSearch();
	$('#songs-container').empty(TRANSITION_RATE);
	$('#albums-container').empty(TRANSITION_RATE);
	$('#artists-container').empty(TRANSITION_RATE);	
}

function checkSubmitNavbar() {
	return !(document.getElementById("navbar-form").value == "")
}

function checkSubmitMain() {
    return !(document.getElementById("main-form").value == "")
}


function updateWallpaper(){

	var path_image = "wallpapers/" + String(Math.floor(Math.random() * 2) + 1) + ".jpg";
 	var oldImg = $("#wallpaper");  
    var img = new Image();
    img.src = path_image;
    img.id = "wallpaper";
    var newImg = $(img).hide();
    $("#fadeContainer").append(img);  
    oldImg.stop(true).fadeOut(3000, function() {
        $(this).remove();
    });
    newImg.fadeIn(3000);

}