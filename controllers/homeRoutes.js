const router = require("express").Router();
const { homePageGames } = require("../lib/igdb");
const { User, Comment, Review, Game } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // const for rendering all models we want on the page
    // expand with our own data to display ie Game
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
      // this is where models will be rendered
      logged_in: req.session.logged_in,
      // data for games for rendering
      games,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Using withAuth middleware to prevent access to dashboard without a login
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // finds
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // include: [{ model: Review }]
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  // if user is logged in redirect them to another route (dashboard)
  try {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signUp", async (req, res) => {
  // if user is logged in redirect them to another route (dashboard)
  try {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("signUp");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/aboutUs", async (req, res) => {
  // when the user clicks 'about us' in nav bar send them to the about us page.
  try {
    res.render("aboutUs");
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/gamerview', async (req, res) => {
//   try {
//     const gameData = await Game.findByPk()

//   } catch (err){
//     res.status(500).json(err)
// })

module.exports = router;
