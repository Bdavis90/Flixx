const global = {
  currentPage: location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    API_URL: "https://api.themoviedb.org/3/",
    API_TOKEN:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTRiNTZhMWM4NmJlNjQzNTYzNzM2OWMxMGE4NDliYyIsIm5iZiI6MTcyMjIzMjY4MC44NDU2NTEsInN1YiI6IjVlN2VjMjZmNzAzMDlmMDAxNDYwN2YzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SjTbcKDXcsE9Zp7imamA-fhmNsQwvAz5hRX0M1xBjYE",
  },
};

const fetchAPIData = async (endpoint) => {
  showSpinner();

  const response = await fetch(`${global.api.API_URL}${endpoint}`, {
    method: "get",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${global.api.API_TOKEN}`,
    },
  });

  const data = await response.json();
  hideSpinner();
  return data;
};

const searchAPIData = async () => {
  showSpinner();

  console.log(
    `${global.api.API_URL}search/${global.search.type}?query=${global.search.term}`
  );
  const response = await fetch(
    `${global.api.API_URL}search/${global.search.type}?query=${global.search.term}&page=${global.search.page}`,
    {
      method: "get",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${global.api.API_TOKEN}`,
      },
    }
  );

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
};

const displaySearchResults = (results) => {
  const searchResults = document.getElementById("search-results");
  const pagination = document.getElementById("pagination");
  const searchResultsHeading = document.getElementById(
    "search-results-heading"
  );
  searchResults.innerHTML = "";
  pagination.innerHTML = "";
  searchResultsHeading.innerHTML = "";
  let title;
  let releaseDate;
  let detailsPage;

  results.forEach((res) => {
    if (global.search.type === "movie") {
      title = res.title;
      releaseDate = res.release_date;
      detailsPage = `movie-details.html?id=${res.id}`;
    } else {
      title = res.name;
      releaseDate = res.first_air_date;
      detailsPage = `tv-details.html?id=${res.id}`;
    }
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
                  <a href="${detailsPage}">
                  ${
                    res.poster_path
                      ? `<img
                            src="https://image.tmdb.org/t/p/w500${res.poster_path}"
                            class="card-img-top"
                            alt="${title}"/>`
                      : `<img src="images/no-image.jpg" class="card-img-top" alt="${title}" />`
                  }
                            </a>
                            <div class="card-body">
                              <h5 class="card-title">${title}</h5>
                              <p class="card-text">
                                <small class="text-muted">Release: ${releaseDate}</small>
                              </p>
                            </div>`;

    searchResultsHeading.innerHTML = `
                  <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;

    searchResults.appendChild(div);
  });

  displayPagination();
};

const displayPagination = () => {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
            <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
    `;
  document.getElementById("pagination").appendChild(div);

  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (global.search.page === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (global.search.page === global.search.totalPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  nextBtn.addEventListener("click", async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });

  prevBtn.addEventListener("click", async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
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

const displaySlider = async () => {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

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
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
        1
      )} / 10
    </h4>
    `;
    document.querySelector(".swiper-wrapper").appendChild(div);
  });

  initSwiper();

  console.log(results);
};

const search = async () => {
  const urlParams = new URLSearchParams(location.search);
  global.search.term = urlParams.get("search-term");
  global.search.type = urlParams.get("type");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    console.log(total_pages, page, global.search.totalResults);
    if (results.length === 0) {
      showAlert("No results found", "success");
    }
    displaySearchResults(results);
  } else {
    showAlert("Please enter a search term.", "error");
  }
};

const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freemode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
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

const showAlert = (message, className) => {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
};

// Init App
const init = () => {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      displayPopularMovies();
      displaySlider();
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
      search();
      break;
    default:
      break;
  }

  highlightActiveLink();
};

document.addEventListener("DOMContentLoaded", init);
