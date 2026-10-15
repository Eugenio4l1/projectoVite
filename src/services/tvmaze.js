const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return response.json();
};

export const getShowData = async (id) => {
  const data = await fetchJSON(`https://api.tvmaze.com/shows/${id}`);

  return {
    name: data.name,
    rating: data.rating?.average ?? null,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE
  };
};

export const getEpisodeList = async (id) => {
  const episodes = await fetchJSON(`https://api.tvmaze.com/shows/${id}/episodes`);

  const episodeList = episodes
    .filter((episode) => episode.number !== null) // ignora especiales
    .map((episode) => ({
      number: episode.number,
      season: episode.season,
      rating: episode.rating?.average ?? null
    }));

  return Object.groupBy(episodeList, (episode) => episode.season);
};