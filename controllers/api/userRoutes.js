const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get ALL the users in our db
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    console.log(userData);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a User & add to our db
router.post("/signUp", async (req, res) => {
  console.log(req.body);
  try {
    // Take the body of the request and map it to our User model
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // create a session once signed up
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are signed up and logged in!" });
    });
  } catch (err) {
    console.log(err);
    // If there is an error, respond with this error message.
    res
      .status(400)
      .json({ message: "Please fill in all the required details!" });
  }
});

// User Login & Save the Session
router.post("/login", async (req, res) => {
  console.log("login triggered");
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Logout & End the Session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
