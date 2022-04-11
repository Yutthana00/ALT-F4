async function gameFetch(url = 'https://api.igdb.com/v4/games/', data = {userSearch}) {
    
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Client-ID': $clientID,
            'Authorization': 'Bearer ' + $access_token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .then(gameData => {
        console.log(gameData.name)
    })

}


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