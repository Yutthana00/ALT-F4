const axios = require("axios");
const { platform } = require("os");

// Axios request as an async function
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

// function where the usersearch is fed into the Axios fetch request
// data fields are set the for API
const searchForGame = async (userSearch) => {
  const data = `search "${userSearch}"; fields id, name, cover.url, genres.name, first_release_date, screenshots.url, platforms.name, websites.url, summary;`;
 const games = await makeRequest("/games", data);
 return games
};

// search field from the api that makes sure the games are popular and highly rated
// offest of 12 to help the design layout
const homePageGames = async () => {
  const data = `fields id, name, genres.name, cover.url, summary; limit 12;
    where rating > 85 & release_dates.date > 1640998861;`;

  const games = await makeRequest("/games", data);
  return games;
};

// gamereivew page opens based on the game_id
const gameReviewPage = async (game_id) => {
    const data  = `fields id, name, genres.name, summary, first_release_date, cover.url, screenshots.url, rating; where id = ${game_id};`
    const games = await makeRequest("/games", data)
    return games
}

module.exports = {
  searchForGame,
  homePageGames,
  gameReviewPage
};
