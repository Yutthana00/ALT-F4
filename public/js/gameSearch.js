// const userSearch = async (event) => {

//     searchTerm = document.getElementById("#user-search").value

//     const response = await searchForGame(searchTerm)
  
//     if (response.ok) {
//       document.location.replace("search");
//     } else {
//       alert(response.statusText);
//     }
//   };

const { searchForGame } = require("../lib/igdb");

// IM TRYING!!!
  document
  .querySelector("search-btn")
  .addEventListener("submit", userSearch);


  const searchBtn = async (event) => {
      userSearch = document.querySelector('#user-search').value.trim()

      console.log('Searching for: ', userSearch)

      const response = await fetch(`/api/games/${userSearch}`)

      if (response.ok) {
          document.location.replace("/search")
      } else {
          alert("Nothing searched!")
      }

  }

