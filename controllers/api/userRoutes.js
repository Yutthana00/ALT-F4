const router = require("express").Router();

const { User } = require("../../models");

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
  try {
    // Take the body of the request and map it to our User model
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Respond with our serialization step to return the raw data of the user
    // This is achieved by running .get on the instance of the model
    // Provide an object with 'plain: true' as the argument.
    res.json(userData.get({ plain: true }));

    //  @TODO: redirect to dashboard if withAuth doesn't redirect once tested
  } catch (err) {
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

// Do we need this bit? !!!
// router.post('/', async (req, res) => {
//     try {
//       const userData = await User.create(req.body);

//       req.session.save(() => {
//         req.session.user_id = userData.id;
//         req.session.logged_in = true;

//         res.status(200).json(userData);
//       });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

module.exports = router;
