// const userSearch = async (event) => {

//     searchTerm = document.getElementById("#user-search").value

//     const response = await searchForGame(searchTerm)

//     if (response.ok) {
//       document.location.replace("search");
//     } else {
//       alert(response.statusText);
//     }
//   };


const searchBtn = async (event) => {
  userSearch = document.querySelector("#user-search").value.trim();

  document.location.replace(`/search/${encodeURIComponent(userSearch)}`)

  /* const response = await fetch(`/api/games/${encodeURIComponent(userSearch)}`);

  if (response.ok) {
    document.location.replace("/:search");
  } else {
    alert("Nothing searched!");
  } */
};

// IM TRYING!!!
// Im sorry man theres nothing I can do
document.querySelector("#search-btn").addEventListener("click", searchBtn);