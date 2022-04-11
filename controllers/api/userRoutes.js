const router = require('express').Router()

const { User } = require('../../models')


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll()
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})


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


// Might need moving to homeroutes?????
  router.post('/signUp', async (req, res) => {
      try {
          const userData = await User.create({
             name: req.body.name,
             email: req.body.email,
             password: req.body.password, 
          })

          res.json(userData.get({ plain: true}))

        //   redirect to dashboard if withAuth doesn't redirect once tested
      } catch (err) {
          res.status(400).json({ message: 'Please fill in all the required details!' })
      }
  })
  
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });





module.exports = router