const express = require('express')
const router = express.Router()
require("dotenv").config();
const axios = require('axios');
const { response } = require('express');
const { searchForGame, homePageGames } = require('../../lib/igdb')

module.exports = router
















// router.post('/:search', async (req, res) => {

// const userSearch = req.params.search
// // we don't have the search yet

//     try {
//         axios({
//             url: `https://api.igdb.com/v4/games/${userSearch}`,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Client-ID': process.env.client_id,
//                 'Authorization': process.env.authorization,
//             },
//             data: "fields id, cover, game_modes, genres, release_dates, screenshots, platforms, summary;"
//           })
//     .then((response) => {
//         console.log(response.data)
//         res.json(response.data)
//     })
   
// } catch (err) {
//         console.log(err)
//     }
// } 
// )


/* router.get('/:search', async (req, res) => {

    const userSearch = req.params.search
    // we don't have the search yet
    
    try {
        const response = await searchForGame(userSearch);
        console.log(JSON.stringify(response.data));
        let games = response.data;
        for (let i = 0; i < games.length; i++) {
          let url = games[i].cover.url;
          let newUrl = url.replace("t_thumb", "t_1080p");
          games[i].cover.url = newUrl;
        }
    
        console.log("Final formatted:", games);

        res.render("search", {
            games
        })
       
    } catch (err) {
        console.log(err)
    }
}) */

// router.post('/', async (req, res) => {
//     try {
//         const response = await homePageGames()
//         const games = response.data

//         res.json(response.data)

//         // games cover id doesn't iterate so commented out for now
//         for (i = 0; i < games.length; i++) {
//             const gameId = games[i].id
//             const gameName = games[i].name
//             // const gameCoverId = games[i].cover.id[i]
//             const gameCoverUrl = games[i].cover
//             console.log(gameId, gameName, gameCoverUrl)
//         }

//     } catch (err) {
//         console.log(err)
//     }
// })

