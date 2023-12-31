document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const songTitle = document.getElementById('songTitle');
    const addSongBtn = document.getElementById('addSongBtn');
    const songUrlInput = document.getElementById('songUrlInput');
    const songList = document.getElementById('songList');

    let currentSongIndex = 0;
    let songs = [];

    function loadSong(index) {
        if (songs.length > 0) {
            audioPlayer.src = songs[index].url;
            audioPlayer.load(); // Load the new source
            audioPlayer.play();
            songTitle.textContent = `Now Playing: ${songs[index].title}`;
        }
    }

    function playPause() {
        if (audioPlayer.paused && songs.length > 0) {
            audioPlayer.play();
            playPauseBtn.textContent = '❚❚';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '►';
        }
    }

    function playNext() {
        if (songs.length > 0) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
        }
    }

    function playPrev() {
        if (songs.length > 0) {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
        }
    }

    function handleAddSong() {
        const songUrl = songUrlInput.value.trim();
        if (songUrl !== '') {
            const title = `Custom Song ${songs.length + 1}`; // You can customize the title
            songs.push({ title, url: songUrl });
            currentSongIndex = songs.length - 1;
            loadSong(currentSongIndex);
            displaySongList();
            songUrlInput.value = ''; // Clear the input field
        }
    }

    function displaySongList() {
        // Clear existing list
        songList.innerHTML = '';

        // Display the updated list of songs
        songs.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${song.title}`;
            songList.appendChild(listItem);
        });
    }

    loadSong(currentSongIndex);

    playPauseBtn.addEventListener('click', playPause);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);
    addSongBtn.addEventListener('click', handleAddSong);
});
