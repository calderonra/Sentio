var holding = false;
var play = document.getElementById('play');
var art = document.getElementsByClassName('slide');
var current_track = 0;

var playing = false;
var songs =[{
    art: 'https://www.buenamusica.com/media/fotos/discos/l/luis-fonsi/luis-fonsi_despacito.jpg',
    url: '../tracks/Despacito.mp3'
}]

window.addEventListener('load',init(),false);

function init(){
    song = songs[current_track];
    audio = new audio();
    audio.src = song.url;
    art.src = song.art;
}

track.onmusedown = function(e){
    holding = true;
    seekTrack(e);
    console.log(holding);
}

audio.addEventListener("playing", function(){
    playing = false;
}, false);

audio.addEventListener("playing", function(){
    playing = true;
}, false);

function seekTrack(e) {
    event = e || window.event;
    var x = e.pageX - player.offsetLeft - track.offsetLeft;
    percent = Math.round((x * 100) / track.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
    audio.play();
    audio.currentTime = (percent * duration) / 100
}
