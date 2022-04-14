const axios = require('axios');
const { platform } = require('os');

const makeRequest = async (uri, data) => {
    return await axios({
        url: `https://api.igdb.com/v4${uri}`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': process.env.client_id,
            'Authorization': process.env.authorization,
        },
        data
    })
}

const searchForGame = async (searchTerm) => {
    const data = `search "${searchTerm}"; fields id, name, cover.url, genres.name, first_release_date, screenshots.url, platforms.name, websites.url, summary;`

    return makeRequest('/games', data)
}

// much nicer search field to get games that will have all fields required
const homePageGames = async () => {
    const data = `fields id, name, cover.url;
    where rating > 80 & release_dates.date > 1640998861;`

    return makeRequest('/games', data)
}

module.exports = {
    searchForGame,
    homePageGames
}