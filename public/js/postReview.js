const postReviewBtn = async (event) => {
  event.preventDefault();

  const body = document.querySelector("#post-body").value.trim();
  const game_id = document.getElementById("game-id").innerHTML.trim();

  const res = await fetch(`/api/review/${game_id}`, {
    method: "POST",
    body: JSON.stringify({ body }),
    headers: { "content-Type": "application/json" },
  });

  if (res.ok) {
    document.reload;
  } else {
    console.log("it did not work");
  }
};

// const postReviewBtn = async (event) => {
//     event.preventDefault()
//     // game_id = document.querySelector('#game_id').value.trim()

//     document.location.replace(`/review/${encodeURIComponent(game_id)}`)
// }

document.querySelector("#post-form").addEventListener("submit", postReviewBtn);
