const fetchMoviesButton = document.getElementById("fetchMovies");
const playMovieButton = document.getElementById("playMovie");


const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");

const errorMessageDiv = document.getElementById("error-message");
const successMessageDiv = document.getElementById("success-message");

const substringToRemove = "https://www.videezy.com/people/";
let videoUrl;

fetchMoviesButton.addEventListener('click', () => {
    videoUrl = "https://www.videezy.com/people/8452-dark-haired-girl-pensive-looks-at-camera";
    downloadVideoCallback(videoUrl, (error) => {
        if (error) {

            errorMessageDiv.innerHTML = `<h2>${error}</h2>`;
            errorMessageDiv.style.display = "block";
            successMessageDiv.style.display = "none";
        } else {
            successMessageDiv.style.display = "block";
            errorMessageDiv.style.display = "none";
            playMovieButton.style.display = 'inline-block'; 
        }
    });
});

playMovieButton.addEventListener('click', () => {
    if (videoUrl) {
        playVideo(videoUrl);
    } else {
        errorMessageDiv.style.display = "block";
        successMessageDiv.style.display = "none";
        errorMessageDiv.innerHTML = `<h2>Please download the video first.</h2>`;
    }
});

function downloadVideoCallback(url, callback) {
    fetch(url, {mode: 'no-cors'})
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            
            a.href = url;
            a.download = videoUrl.replace(substringToRemove, '') + "-video.mp4";
            a.click();


            videoSource.src = videoUrl;
            // Load the video source
            videoPlayer.load();
            URL.revokeObjectURL(url);
            callback(null);
        })
        .catch(error => callback(error));
}


function playVideo() {
    successMessageDiv.style.display = "none";
    videoPlayer.style.display = "block";
    videoPlayer.play();
}
