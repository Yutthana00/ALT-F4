const router = require("express").Router();
const { json } = require("express/lib/response");
const { first } = require("lodash");
const { homePageGames, searchForGame, gameReviewPage } = require("../lib/igdb");
const { User, Comment, Review } = require("../models");
const withAuth = require("../utils/auth");

// When the user wants to see the homepage:
router.get("/", async (req, res) => {
  try {
    // Rendering all models that are needed for the homepage
    // Expand with our own data to display ie Game
    const response = await homePageGames();
    console.log(JSON.stringify(response.data));
    let games = response.data;
    for (let i = 0; i < games.length; i++) {
      let url = games[i].cover.url;
      let newUrl = url.replace("t_thumb", "t_1080p");
      games[i].cover.url = newUrl;
    }

    console.log("Final formatted:", games);

    res.render("homepage", {
      // This is where models will be rendered
      logged_in: req.session.logged_in,
      // Data for games for rendering
      games,
    });
  } catch (err) {
    // Or provide an error if this was unable to go through
    res.status(500).json(err);
  }
});

// When a user wants to look at their dashboard:
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Finds the users previous session with their id
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    // Render this .handlebar partial &
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/search/:search", async (req, res) => {
  const userSearch = req.params.search;
  // selects the user inout to sreach

  try {
    const response = await searchForGame(userSearch);
    console.log(JSON.stringify(response.data));
    let games = response.data;
    for (let i = 0; i < games.length; i++) {
      if (!games[i].cover) {
        continue;
      }
      let url = games[i].cover.url;
      let newUrl = url.replace("t_thumb", "t_1080p");
      games[i].cover.url = newUrl;
    }

    console.log("Final formatted:", games);

    res.render("search", {
      games,
    });
  } catch (err) {
    console.log(err);
  }
});

// A user wants to look at the Game Page of any Game available:
router.get("/review/:game_id", async (req, res) => {
  // When the user clicks on a Game...
  let game_id = req.params.game_id;

  try {
    const response = await gameReviewPage(game_id);
    console.log(JSON.stringify(response.data));
    let game = response.data[0];

    console.log(JSON.stringify(game));

    let url = game.cover.url;
    let newUrl = url.replace("t_thumb", "t_1080p");
    game.cover.url = newUrl;

    const reviewData = await Review.findAll({
      where: { game_id },
      include: [User],
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render("gamePage", {
      game,
      reviews,
    }); // Render this .handlebar partial
  } catch (err) {
    // Or provide an error if this was unable to go through
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/review/:game_id", withAuth, async (req, res) => {
  try {
    let user_id = req.session.user_id;
    let game_id = req.params.game_id;
    console.log("you are in the post review");
    console.log("The body is ", req.body);
    console.log("userid is ", user_id);
    console.log("gameid is ", game_id);

    const newReview = await Review.create({
      body: req.body.body,
      game_id: req.params.game_id,
      user_id: user_id,
    });

    console.log(newReview);

    if (!withAuth) {
      console.log("You need to be logged in to post a Review!");
      return;
    }

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// When a user wants to login to our website:
router.get("/login", async (req, res) => {
  // When a user clicks one of the 'login' buttons...
  try {
    // If user is logged in, redirect them to another route (dashboard)
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }

    res.render("login"); // If not, rneder this .handlebar partial
  } catch (err) {
    // Or provide an error if this was unable to go through
    res.status(500).json(err);
  }
});

// When a user wants to sign up to our website:
router.get("/signUp", async (req, res) => {
  // When the user clicks one of the 'sign up' buttons...
  try {
    // If user is logged in redirect them to another route (dashboard)
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("signUp"); // If not, render this .handlebar partial
  } catch (err) {
    // Or provide an error if this was unable to go through
    res.status(500).json(err);
  }
});

// A user wants to read about ALT-F4 on the About Us page:
router.get("/aboutUs", async (req, res) => {
  // When the user clicks 'about us' in nav bar...
  try {
    res.render("aboutUs"); // Render this .handlebar partial
  } catch (err) {
    // Or provide an error if this was unable to go through
    res.status(500).json(err);
  }
});


module.exports = router;
