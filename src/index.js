import { getShowData, getEpisodeList } from "./services/tvmaze.js";

// ID por defecto: Stranger Things. Se puede cambiar con ?id=82
const ID = new URLSearchParams(location.search).get("id") ?? "32938";

const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

const ratingClass = (rating) => `rating-${Math.floor(rating ?? 0)}`;

const pad = (n) => String(n).padStart(2, "0");

const createHeaderHTML = ({ name, image, rating }) =>`
  <img class="poster" src="${image}" alt="Póster de ${name}">
  <h1>${name}</h1>
  <p class="show-rating">* ${rating ?? "N/A"}</p>
`;

const createEpisodeHTML = ({ number, rating }) => `
  <div class="episode episode-${number} ${ratingClass(rating)}"
       title="Episodio ${number} · Rating: ${rating ?? "N/A"}">${number}</div>
`;

const createSeasonHTML = (data, number) => `
  <article class="season">
    <header class="season-header">T${pad(number)}</header>
    ${data.map(createEpisodeHTML).join("")}
  </article>
`;

try {
  const [show, seasons] = await Promise.all([
    getShowData(ID),
    getEpisodeList(ID)
  ]);

  document.title = show.name;
  $header.setHTMLUnsafe(createHeaderHTML(show));

  const list = Object.entries(seasons).map(([number, season]) =>
    createSeasonHTML(season, number)
  );
  $episodes.setHTMLUnsafe(list.join(""));
} catch (error) {
  console.error("Error al obtener los datos: ", error);
  $header.textContent = "No se pudieron cargar los datos ";
}