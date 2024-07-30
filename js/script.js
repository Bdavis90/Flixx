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

const displayMovieDetails = async () => {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData("movie/" + movieId);

  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
    <div class="details-top">
        <div>
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
        </div>
        <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((g) => `<li>${g.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Budget:</span> ${new Intl.NumberFormat(
          "en-US",
          { style: "currency", currency: "USD" }
        ).format(`${movie.budget}`)}</li>
        <li><span class="text-secondary">Revenue:</span> ${new Intl.NumberFormat(
          "en-US",
          { style: "currency", currency: "USD" }
        ).format(`${movie.revenue}`)}</li>
        <li><span class="text-secondary">Runtime:</span> ${
          movie.runtime
        } minutes</li>
        <li><span class="text-secondary">Status:</span>${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movie.production_companies
          .map((prod) => prod.name)
          .join(", ")}</div>
    </div>
    `;

  document.getElementById("movie-details").appendChild(div);

  console.log(movie);
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

const displayTVShowDetails = async () => {
  const showId = location.search.split("=")[1];
  const show = await fetchAPIData("tv/" + showId);
  displayBackgroundImage("show", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = ` <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((g) => `<li>${g.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((prod) => prod.name)
            .join(", ")}</div>
        </div>`;

  document.querySelector("#show-details").appendChild(div);
  console.log(show);
};

const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
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
      displayMovieDetails();
      break;
    case "/tv-details.html":
      console.log("TV Details");
      displayTVShowDetails();
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
