const searchBtn = async (event) => {
  userSearch = document.querySelector("#user-search").value;

  document.location.replace(`/search/${encodeURIComponent(userSearch)}`);
};

document.querySelector("#search-btn").addEventListener("click", searchBtn);

//  for review page id finding
const gameIdHref = async (event) => {
  game_id = document.querySelector("#game_id").value.trim();

  document.location.replace(`/review/${encodeURIComponent(game_id)}`);
};
