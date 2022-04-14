// router.get('/', async (req, res) => {
//     try {
//         await function gameFetch(url = 'https://api.igdb.com/v4/games/', data = {userSearch}) {
    
//     const response = await fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         headers: {
//             'Content-Type': 'application/json',
//             'Client-ID': process.env.client_id,
//             'Authorization': process.env.authorization
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         return response.json()
//     })
//     .then(gameData => {
//         console.log(gameData.name)
//     })
// }
//     } catch (err) {
//         console.log(err)
//     }
// } 
// )


// AXIOS method
// url: "https://api.igdb.com/v4/platforms",
// method: 'POST',
// headers: {
//     'Accept': 'application/json',
//     'Client-ID: Client ID',
//     'Authorization: Bearer access_token',
// },
// data: "fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites;"
// })
// .then(response => {
//     console.log(response.data);
// })
// .catch(err => {
//     console.error(err);
// });


// let unixDate = '${first_release_date}'

// module.exports = {
    
// }
// const moment = require('moment')
// let unixDate = (1638921600 * 1000)
// let releaseDate = moment(unixDate).format("DD-MM-YYYY");
// console.log(releaseDate)

// function timeConverter(unixDate) {
//     let releaseDate = moment(unixDate).format("DD-MM-YYYY");
//     console.log(releaseDate)
// }

// function timeConverter(unixDate) {
//     let releaseDate = new Date(unixDate).toLocaleDateString("en-GB")
//     console.log(releaseDate)
// }
// timeConverter()