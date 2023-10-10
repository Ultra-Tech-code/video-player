const fetchMoviesButton = document.getElementById("fetchMovies");
const playMovieButton = document.getElementById("playMovie");

let videoUrl;

fetchMoviesButton.addEventListener('click', () => {
    videoUrl = "https://www.videezy.com/people/8452-dark-haired-girl-pensive-looks-at-camera";
    downloadVideoCallback(videoUrl, (error) => {
        if (error) {
            resText.innerHTML = `<h2>Error downloading video: ${error}</h2>`;
        } else {
            resText.innerHTML = `<h2>Video Downloaded Successfully</h2>`;
            playBtn.style.display = 'inline-block'; 
        }
    });
});

playBtn.addEventListener('click', () => {
    if (videoUrl) {
        playVideo(videoUrl);
    } else {
        resText.innerHTML = `<h2>Please download the video first.</h2>`;
    }
});

function downloadVideoCallback(url, callback) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "video.mp4";
            a.click();
            URL.revokeObjectURL(url);
            callback(null);
        })
        .catch(error => callback(error));
}

function playVideo(url) {
    const videoPlayer = document.createElement('video');
    videoPlayer.src = url;
    videoPlayer.controls = true;
    videoPlayer.style.width = '100%';
    resText.innerHTML = ''; // Clear previous messages
    resText.appendChild(videoPlayer);
}
