// script.js
console.log("Welcome to Spotify!");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Array of songs with file path and cover path
let songs = [
    { songName: "Dekha Tenu (feat Janni)", filePath: "songs/1.mp3", coverPath: "covers/cover.jpg" },
    { songName: "Jind Mahi (feat Diljit)", filePath: "songs/2.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Admirin You (feat Karan)", filePath: "songs/3.mp3", coverPath: "covers/cover2.jpeg" },
    { songName: "Biba Sada Dil (Zain Zohaib)", filePath: "songs/4.mp3", coverPath: "covers/cover3.jpeg" },
    { songName: "O Soniye (feat Arijit Singh)", filePath: "songs/5.mp3", coverPath: "covers/cover4.jpeg" },
    { songName: "Heriye (feat Arijit Singh)", filePath: "songs/6.mp3", coverPath: "covers/cover5.jpeg" },
    { songName: "Ishq Hua (feat Sonu Nigam)", filePath: "songs/7.mp3", coverPath: "covers/cover6.jpeg" },
    { songName: "Bariish (feat Bilal Saeed)", filePath: "songs/8.mp3", coverPath: "covers/cover7.jpg" },
    { songName: "Kamzarf (feat Shuja Haider)", filePath: "songs/9.mp3", coverPath: "covers/cover8.jpeg" },
    { songName: "Hass (feat Diljit Dosanjh)", filePath: "songs/10.mp3", coverPath: "covers/cover9.jpeg" },
];

// Update song details in the song items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to reset all play buttons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};

// Play/Pause the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Add event listeners to each song's play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();  // Reset all buttons to play state
        songIndex = index;  // Set the songIndex to the clicked song
        audioElement.src = songs[songIndex].filePath;  // Update the audio source
        masterSongName.innerText = songs[songIndex].songName;  // Update the displayed song name
        audioElement.currentTime = 0;  // Reset song time
        audioElement.play();  // Play the selected song
        gif.style.opacity = 1;  // Show the gif
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        e.target.classList.remove('fa-circle-play');  // Change the play button to pause
        e.target.classList.add('fa-circle-pause');
    });
});

// Next song functionality
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Previous song functionality
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

