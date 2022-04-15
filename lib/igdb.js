const axios = require("axios");
const { platform } = require("os");

const makeRequest = async (uri, data) => {
  console.log("Make request triggered:", uri, data);
  console.log(process.env.client_id);
  console.log(process.env.authorization);
  return await axios({
    url: `https://api.igdb.com/v4${uri}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.client_id,
      Authorization: process.env.authorization,
    },
    data,
  });
};

const searchForGame = async (searchTerm) => {
  const data = `search "${searchTerm}"; fields id, name, cover.url, genres.name, first_release_date, screenshots.url, platforms.name, websites.url, summary;`;

  return makeRequest("/games", data);
};

// much nicer search field to get games that will have all fields required
const homePageGames = async () => {
  const data = `fields id, name, genres.name, cover.url, summary;
    where rating > 80 & release_dates.date > 1640998861;`;

  const games = await makeRequest("/games", data);
  return games;
};

module.exports = {
  searchForGame,
  homePageGames,
};
