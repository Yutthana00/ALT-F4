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

document.querySelector("#post-form").addEventListener("submit", postReviewBtn);
