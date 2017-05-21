//content_controller.js
var TRANSITION_RATE = 600;
var idActualPage = 0;

$(document).ready(function(){
	
	hideAllDivs();

	//Hide miniplayer on load page
	$("#miniplayer").toggleClass('animated slideOutRight');

	//Onloaded animation
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

   $(document).scroll(function () {
    	var $nav = $("#navigation-bar");
    	$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  	});

});

function hideAllDivs(){

	$('#result-search').hide();
	$('#navigation-bar').hide();
	$('#trending').hide();
	$('#recommendations').hide();
	$('#favorites').hide();

}

function searchPetition(formID){

	var petition = document.getElementById(formID).value;
	$(".filler").html("<small>Results for:</small> " + petition);
	
	togglePages(1);

	setTimeout(function() {
		getSongsObject(petition);
		getAlbumsObject(petition);
		getArtistsObject(petition);
	}, TRANSITION_RATE);

}

function togglePages(id_forward_page){

	if(idActualPage != id_forward_page){

		switch(idActualPage){
			case 0:
				$('#main-search').fadeOut(TRANSITION_RATE, function() {
	   				fadeInAnimation(id_forward_page);
				});
				break;
			case 1:
				$('#result-search').fadeOut(TRANSITION_RATE, function() {
	   				fadeInAnimation(id_forward_page);
				});
				break;
			case 2:
				$('#trending').fadeOut(TRANSITION_RATE, function() {
	   				fadeInAnimation(id_forward_page);
				});
				break;
			case 3:
				$('#recommendations').fadeOut(TRANSITION_RATE, function() {
	   				fadeInAnimation(id_forward_page);
				});
				break;
			case 4:
				$('#favorites').fadeOut(TRANSITION_RATE, function() {
	   				fadeInAnimation(id_forward_page);
				});
				break;
			default:
				break;
		}

		idActualPage = id_forward_page;

	}

	if(idActualPage == 1 && id_forward_page == 1){
		$('#song-results').fadeOut(TRANSITION_RATE);
		$('#album-results').fadeOut(TRANSITION_RATE);
		$('#artist-results').fadeOut(TRANSITION_RATE, function() {
			fadeInAnimation(5); //Special case
		});	
	}


}

function fadeInAnimation(id_forward_page){

	switch(id_forward_page){
		case 0:
			$('#main-search').fadeIn(TRANSITION_RATE);
			break;
		case 1:
			$('#result-search').fadeIn(TRANSITION_RATE);
			break;
		case 2:
			$('#trending').fadeIn(TRANSITION_RATE);
			break;
		case 3:
			$('#recommendations').fadeIn(TRANSITION_RATE);
			break;
		case 4:
			$('#favorites').fadeIn(TRANSITION_RATE);
			break;
		case 5:
			$('#song-results').fadeIn(TRANSITION_RATE);
			$('#album-results').fadeIn(TRANSITION_RATE);
			$('#artist-results').fadeIn(TRANSITION_RATE);
			break;
		default:
			break;
	}

}

function toggleLoadMore(type){
	
	switch(type){
		case 0:
			$('#song-results').fadeOut(TRANSITION_RATE, function() {
				getSongsObject(curr_petition_name);
				$('#song-results').fadeIn(TRANSITION_RATE);
			});
			break;
		case 1:
			
			$('#album-results').fadeOut(TRANSITION_RATE, function() {
				getAlbumsObject(curr_petition_name);
				$('#album-results').fadeIn(TRANSITION_RATE);
			});
			break;
		case 2:
			$('#artist-results').fadeOut(TRANSITION_RATE, function() {
				getArtistsObject(curr_petition_name);
				$('#artist-results').fadeIn(TRANSITION_RATE);
			});
			break;
		default:
			break;
	}

}

function clearResults(){
	togglePages(0);
	setTimeout(function() {
		$('#songs-container').empty(TRANSITION_RATE);
		$('#albums-container').empty(TRANSITION_RATE);
		$('#artists-container').empty(TRANSITION_RATE);	
	}, TRANSITION_RATE);
}

function checkSubmitNavbar() {
	return !(document.getElementById("navbar-form").value == "")
}

function checkSubmitMain() {
    return !(document.getElementById("main-form").value == "")
}

function updateWallpaper(){

	var path_image = "wallpapers/" + String(Math.floor(Math.random() * 5) + 1) + ".jpg";
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