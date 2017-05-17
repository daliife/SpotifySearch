// buttonscontroler.js
var showingMiniplayer = false;


function callSnackBarPause(){
    document.getElementById("snackButton").setAttribute('data-content',"Paused");
    $("#snackButton").snackbar("toggle");  
}

function callSnackBar(nameSong, nameAlbum){
        document.getElementById("snackButton").setAttribute('data-content',"Playing "+ nameSong + ", from " + nameAlbum);
        $("#snackButton").snackbar("toggle");  
}

function checkSubmit() {
    if ( document.getElementById("addon2").value == "" ){
        return 0;
    }else{
        return 1;
    }
}

//Reprodueix la canço corresponent i actualitza la info del miniplayer
function playSong(url, urlImage, nameSong, nameAlbum, id, nameArtist, IDArtist){
    updatePlayerInfo(urlImage, nameSong, nameAlbum, nameArtist);
    toggleMiniplayer();
    addPlayer(url);
    addItemSongsPlayed(id,nameArtist,nameSong,nameAlbum,1,IDArtist);       
}

function show(){
    switch(this.id) {

        case "menu-toggle":
            $("#wrapper").toggleClass("toggled");
            break;

        case "searchButton":
            if (checkSubmit()){
                $("#formSearch").show();
                $("#resultsSearch").show();
                $("#recomendations").hide();
                console.log("PETICIO --> " + document.getElementById("addon2").value);
                searchAction(document.getElementById("addon2").value);
            };

        case "linkSearch":
            $("#formSearch").show();
            $("#resultsSearch").show();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").hide();
            break;

        case "linkRecomendations":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").show();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").hide();
            updateSuggestions();              
            break;

        case "linkSongs":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").show();
            $("#albums").hide();
            $("#artists").hide(); 
            break;

        case "linkAlbums":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").show();
            $("#artists").hide(); 
            break;

        case "linkArtists":
            $("#formSearch").show();
            $("#resultsSearch").hide();
            $("#recomendations").hide();
            $("#songs").hide();
            $("#albums").hide();
            $("#artists").show(); 
            break;

        case "volumeMin":
            setVolume(0);
            break;

        case "volumeMax":
            setVolume(100);
            break;

        case "playButton":
            if(song.paused){
                changeIconPlay(true);
                song.play();
            }else{
                changeIconPlay(false);
                song.pause();
            }                
            break;

        default:
            alert("info: ID ERROR");
            break;
    }
}

$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip();
    outputPlaylist();
    updateSuggestions();

    $('.form-control').keyup(function (e) {
        if (e.keyCode === 13 && checkSubmit()) {
            $("#formSearch").show();
            $("#resultsSearch").show();
            $("#recomendations").hide(); 
            searchAction(document.getElementById("addon2").value);
        }
      });


    document.onscroll = function() {
        if( $(window).scrollTop() > $('header').height() ) {
            $('nav > div.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');    
        }
        else {
            $('nav > div.navbar').removeClass('navbar-fixed-top').addClass('navbar-static-top');
        }
    };    

    $(document).click(function (e){
        var container = $("#wrapper");
        if (!container.is(e.target) && container.has(e.target).length === 0 && event.target.id!=="sidebar-wrapper"){
            container.addClass("toggled"); 
        }
    });

    $("#menu-toggle").click(show);

    $("#searchButton").click(show);

    $("#linkSearch").click(show);

    $("#linkRecomendations").click(show);

    $("#linkSongs").click(show);

    $("#linkAlbums").click(show);

    $("#linkArtists").click(show);

    $("#playButton").click(show);

    $("#volumeMin").click(show);    

    $("#volumeMax").click(show); 

});
