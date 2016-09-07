// database.js
var counter;

//Creació de la base de dades amb sql
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("AMusic", "0.1", "A Database of Songs I Like", 1024 * 1024);
    
    mydb.transaction(function (t) {
        //RESETEJAR LA DATABASE -->
        // t.executeSql("DROP TABLE playlist");
        // t.executeSql("DROP TABLE songsplayed");
        t.executeSql("CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY ASC, song TEXT, artist TEXT, album TEXT, image TEXT, preview_song TEXT, popularity INT, url_Artist TEXT)");
        t.executeSql("CREATE TABLE IF NOT EXISTS songsplayed (id TEXT PRIMARY KEY , title TEXT, artist TEXT, album TEXT, counter INT,artistID TEXT)");
    });

} else {
    alert("WebSQL is not supported by your browser!");
}

//Actualitza les cançons favorites de l'usuari
function updateFavoritedSongs(transaction, results) {
    var i;
    $("#songsListFavorited").empty();
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
       $("#songsFavorited").tmpl(row).appendTo("#songsListFavorited");
    }

}

//Actualitza els albums favorits de l'usuari
function updateFavoritedAlbums(transaction, results) {
    var i;
    $("#albumsListFavorited").empty();
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        $("#albumsFavorited").tmpl(row).appendTo("#albumsListFavorited");
    }

}

//Actualitza els artistes favorits de l'usuari
function updateFavoritedArtists(transaction, results) {
    var i;
    $("#artistsListFavorited").empty();
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        
        $("#artistsFavorited").tmpl(row).appendTo("#artistsListFavorited");
    }

}

function outputPlaylist() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM playlist", [], updateFavoritedSongs);
            t.executeSql("SELECT DISTINCT album,image FROM playlist", [], updateFavoritedAlbums);
            t.executeSql("SELECT DISTINCT artist,image,popularity,url_Artist FROM playlist GROUP BY artist", [], updateFavoritedArtists);
        });
    } else {
        alert("ERROR: db not found, your browser does not support web sql!");
    }

}

//Afegeix una cançó especifica a la llista de favorits
function addItemPlaylist(song, artist, album, image, preview, id, popularity, path) {
    
    var urlArtist = " ";
    $.getJSON(path, function(data) {
        urlArtist = data.images[0].url;
    }); 

    id.children[0].innerHTML = "star";

    if (mydb) {
       
        if (song !== "" && artist !== "") {

            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO playlist(song,artist,album,image,preview_song,popularity,url_Artist) VALUES (?, ?, ?, ?, ?, ?, ?)", [song, artist, album, image, preview, popularity, urlArtist]);
                outputPlaylist();
            });
            updateBadges();

        } else {
            alert("You must enter a make and model!");
        }
    } else {
        alert("ERROR: db not found, your browser does not support web sql!");
    }

}

//Elimina una cançó especifica de la llista de favorits
function deleteItemPlayList(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM playlist WHERE id=?", [id], outputPlaylist);
        });
        
        updateBadges();     

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

//Eliminia un artista de la llista de favorits
function deleteArtistPlayList(artist) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM playlist WHERE artist=?", [artist], outputPlaylist);
        });

        updateBadges();

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}

//Afegeix una canço reproduida a la base de dades corresponent
function addItemSongsPlayed(id, title, artist, album, timesplayed,IDartist) { 
    if (mydb) {

        mydb.transaction(function (t) {

            var counter="";
            t.executeSql("SELECT ID FROM songsplayed WHERE ID =?",[id],
            function(transaction, results){
            counter=results.rows.length;
        
            if (counter >= 1){
                t.executeSql("UPDATE songsplayed SET counter = counter+1 WHERE ID =?",[id]);
            }else{
                t.executeSql("INSERT INTO songsplayed(id,title,artist,album,counter,artistID) VALUES (?,?,?,?,?,?)", [id,title,artist,album,timesplayed,IDartist]);       
            }
         
         });
        
        });

    } else {
        alert("db not found, your browser does not support web sql!");
    }

}


function updateBadgeSongs(transaction, results) {
    document.getElementById("songBadge").innerHTML = results.rows[0].numSongs;
}


function updateBadgeAlbums(transaction, results) {
    document.getElementById("albumBadge").innerHTML = results.rows[0].numAlbums;
}


function updateBadgeArtists(transaction, results) {
    document.getElementById("artistBadge").innerHTML = results.rows[0].numArtists;;
}

function updateBadges() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT COUNT(DISTINCT song) AS numSongs FROM playlist", [], updateBadgeSongs);
            t.executeSql("SELECT COUNT(DISTINCT album) AS numAlbums FROM playlist", [], updateBadgeAlbums);
            t.executeSql("SELECT COUNT(DISTINCT artist) AS numArtists FROM playlist", [], updateBadgeArtists);
        });
    } else {
        alert("ERROR: db not found, your browser does not support web sql!");
    }
}


function checkSongsPlayed(){
    counter = 0;
     if (mydb) {
 
        mydb.transaction(function (t) {
            t.executeSql("SELECT ID FROM songsplayed",[], NoScope2);
        });
       
    } else {
        alert("db not found, your browser does not support web sql!");
    }  
}

function mostPlayed(){

    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT artistID FROM songsplayed group by  artistID order by counter desc limit 1", [],  function(transaction, results){
                    // group by  artist order by counter desc limit
                    var artista;   
                    var row = results.rows.item(0);
                    artista = row.artistID;
                    changeNameArtist(artista);

                
            });
        });
    } else {
        alert("ERROR: db not found, your browser does not support web sql!");
    }
}

function NoScope2(transaction, results){
    counter=results.rows.length;
    if (counter === 0){
        checkPlayedDatabase(false);
    }else{
        checkPlayedDatabase(true);
    }
}




