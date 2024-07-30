const global = {
  currentPage: location.pathname,
};

const fetchAPIData = async (endpoint) => {
  const API_URL = "https://api.themoviedb.org/3/";
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTRiNTZhMWM4NmJlNjQzNTYzNzM2OWMxMGE4NDliYyIsIm5iZiI6MTcyMjIzMjY4MC44NDU2NTEsInN1YiI6IjVlN2VjMjZmNzAzMDlmMDAxNDYwN2YzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SjTbcKDXcsE9Zp7imamA-fhmNsQwvAz5hRX0M1xBjYE";

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "get",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const data = await response.json();
  hideSpinner();
  return data;
};

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};

const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

const displayPopularMovies = async () => {
  const { results } = await fetchAPIData("movie/popular");
  const movieList = document.getElementById("popular-movies");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `            <img
              src="./images.no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

    movieList.appendChild(div);
  });

  console.log(results);
};

const displayPopularTVShows = async () => {
  const { results } = await fetchAPIData("tv/popular");

  const showList = document.getElementById("popular-shows");
  console.log(results);

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `<a href="tv-details.html?id=${show.id}">
    ${
      show.poster_path
        ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
        : `            <img
              src="./images.no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
    }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>`;

    showList.appendChild(div);
  });
};

const highlightActiveLink = () => {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};

// Init App
const init = () => {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      displayPopularTVShows();
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
    default:
      break;
  }

  highlightActiveLink();
};

document.addEventListener("DOMContentLoaded", init);
