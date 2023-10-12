const fetchMoviesButton = document.getElementById("fetchMovies");
const playMovieButton = document.getElementById("playMovie");
const resText = document.getElementById("response");
const downloadStatus = document.getElementById("downloadStatus")

let videoUrl;

fetchMoviesButton.addEventListener('click', () => {
    videoUrl = "https://www.videezy.com/people/8452-dark-haired-girl-pensive-looks-at-camera";
    downloadVideoCallback(videoUrl, (status) => {

        if (status.includes("Downloading: ")) {
            downloadStatus.innerHTML = `<p>${status}</p>`;
            downloadStatus.classList.add("success-message");
        } else if (status.includes("Downloaded Successfully")) {  
            downloadStatus.innerHTML = `<p>${status}</p>`;
            downloadStatus.classList.add("success-message");
        } else {
            downloadStatus.innerHTML = `<h2>${status}</h2>`;
            downloadStatus.classList.add("error-message");
        }
    });
});

playMovieButton.addEventListener('click', () => {
    if (videoUrl) {
        playVideo(videoUrl);
    } else {
        downloadStatus.classList.add("error-message");
        downloadStatus.innerHTML = `<h2>Please download the video first.</h2>`;
    }
});

function downloadVideoCallback(url, callback) {
    fetch(url, {mode: 'no-cors'})
        .then(response => {
            if (!response.ok) {
                callback("Download Failed");
                throw new Error("Download Failed");
            }

            const contentLength = response.headers.get("Content-Length");
            let downloadedBytes = 0;
            let chunks = [];

            // Create a progress bar to display download progress
            callback("Downloading: 0%");

            return response.body.getReader().read().then(function read({ done, value }) {
                if (done) {
                    // Download complete
                    callback("Downloaded Successfully");
                    const blob = new Blob(chunks);
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "video.mp4";
                    a.click();
                    URL.revokeObjectURL(url);
                    return;
                }

                downloadedBytes += value.byteLength;
                chunks.push(value);

                // Update progress bar
                const percentComplete = ((downloadedBytes / contentLength) * 100).toFixed(2);
                callback(`Downloading: ${percentComplete}%`);

                // Continue reading the response
                return response.body.getReader().read().then(read);
            });
        })
        .catch(error => {
            callback("Download Failed");
            console.error("Download failed:", error);
        });
}

function playVideo(url) {
    const videoPlayer = document.createElement('video');
    videoPlayer.src = url;
    videoPlayer.controls = true;
    videoPlayer.style.width = '100%';
    videoPlayer.load();
    resText.innerHTML = ''; // Clear previous messages
    resText.appendChild(videoPlayer);
}
