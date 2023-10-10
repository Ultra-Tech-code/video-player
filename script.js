const fetchMoviesButton = document.getElementById("fetchMovies");
const cancelFetchButton = document.getElementById("cancelFetch");

let controller = null;

fetchMoviesButton.addEventListener("click", async () => {
    try {
    log("Request started...");
    const response = await fetch("/movies", {
        signal: controller.signal
    });
    const movies = await response.json();
    log(`Fetched movies: ${JSON.stringify(movies)}`);
    } catch (error) {
    log(`Fetch error: ${error.name}`);
    }
    controller = null;
});

cancelFetchButton.addEventListener("click", () => {
    if (controller) {
    controller.abort();
    }
});

function log(message) {
    document.getElementById("message").innerText = message;
}
