const express = require('express')
const router = express.Router()
require("dotenv").config();
const axios = require('axios');
const { response } = require('express');

router.post('/:search', async (req, res) => {

const userSearch = req.params.search
// we don't have the search yet

    try {
        axios({
            url: `https://api.igdb.com/v4/games/${userSearch}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.client_id,
                'Authorization': process.env.authorization,
            },
            data: "fields id, cover, game_modes, genres, release_dates, screenshots, platforms, summary;"
          })
    .then((response) => {
        console.log(response.data)
        res.json(response.data)
    })
   
} catch (err) {
        console.log(err)
    }
} 
)

module.exports = router
