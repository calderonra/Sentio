var holding = false;
var track = document.getElementById('track');
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var art = document.getElementById('art');
var current_track = 0;
var song, audio, duration;
var playing = false;
var songs = [{
    title: 'Descapcito',
    artist: 'Luis Fonsi ft. Daddy Yankee',
    url: 'https://raw.githubusercontent.com/calderonra/Sentio/master/assets/tracks/Despacito.mp3?token=AjcXjK-5_x9ANETlCNFbDMom9mxAdEgMks5b6OsAwA%3D%3D',
    art: 'https://www.buenamusica.com/media/fotos/discos/l/luis-fonsi/luis-fonsi_despacito.jpg'
},
/*   
{
    title: 'Macintosh Plus',
    artist: 'リサフランク420 / 現代のコンピュ',
    url: '',
    art: 'https://cdn.shopify.com/s/files/1/1090/5356/products/R-10960101-1507236505-5542_jpeg_300x300.jpg?v=1537323822'
},

{
    title: 'All Star',
    artist: 'Smash Mouth',
    url: '',
    art: 'https://upload.wikimedia.org/wikipedia/en/1/16/All_star.jpg'
}*/];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    audio.src = song.url;
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
}


audio.addEventListener('timeupdate', updateTrack, false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;
    console.log(holding);
}
track.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
    console.log(holding);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.innerHTML = '<i class="fas fa-play"></i>';
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.innerHTML = '<i class="fas fa-pause"></i>';
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);


function updateTrack() {
    curtime = audio.currentTime;
    percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
}

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
function nextTrack() {
    current_track++;
    current_track = current_track % (songs.length);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    art.onload = function() {
        audio.play();
    }
}