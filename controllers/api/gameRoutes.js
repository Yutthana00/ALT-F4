const express = require('express')
const router = express.Router()
require("dotenv").config();
const axios = require('axios');
const { response } = require('express');
const { searchForGame, homePageGames } = require('../../lib/igdb')

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


router.post('/:search', async (req, res) => {

    const userSearch = req.params.search
    // we don't have the search yet
    
    try {
        const response = await searchForGame(userSearch)
        const games = response.data;

        // games.forEach(game => {
        //     // Get platform names
        //     // getPlatformNames(game.platforms)
        //     // Get cover
        //     // etc...
        // });

        res.json(response.data)
       
    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const response = await homePageGames()
        const games = response.data

        res.json(response.data)

        // games cover id doesn't iterate so commented out for now
        for (i = 0; i < games.length; i++) {
            const gameId = games[i].id
            const gameName = games[i].name
            // const gameCoverId = games[i].cover.id[i]
            const gameCoverUrl = games[i].cover
            console.log(gameId, gameName, gameCoverUrl)
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router
