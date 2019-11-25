// movies not included
const movies = {
	1: "movie1.mp4",
	2: "movie2.mp4",
	3: "movie3.mp4"
};
let currentMovie;
let movie;

if(!localStorage.movieTimes) {
	let movieTimes = {};
	for(key of Object.keys(movies)) {
		movieTimes[key] = 0;
	}
	localStorage.setItem("movieTimes", JSON.stringify(movieTimes));
}

document.addEventListener('DOMContentLoaded', function() {
	const input = document.getElementById("input");
	for(key of Object.keys(movies)) {
		const opt = document.createElement('option');
		opt.appendChild(document.createTextNode(key));
		opt.value = key;
		input.appendChild(opt);
	}

	movie = document.getElementById("movie");
	movie.ontimeupdate = function() {
		JSON.parse(localStorage.getItem("movieTimes"))[currentMovie] = currentMovie.currentTime = movie.currentTime;
	}

	document.getElementById("changeBtn").onclick = change();

	change();
});

function change() {
	let input = document.getElementById("input").value
	if(input == currentMovie) return;
	if(currentMovie == undefined) input = 1;
	currentMovie = input;

	movie.pause();

	const source = document.createElement('source');
	source.setAttribute('src', movies[input]);
	movie.firstChild = source;

	if(JSON.parse(localStorage.getItem("movieTimes"))[currentMovie] > 0) {
		if(!confirm("Would you like to restart at the beginning?")) {
			movie.currentTime = JSON.parse(localStorage.getItem("movieTimes"))[currentMovie];
		}
	}

	movie.load();
}