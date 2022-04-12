const router = require('express').Router();
const userRoutes = require('./userRoutes');
const GameRoutes = require('./gameRoutes')

router.use('/users', userRoutes);
router.use('/games', GameRoutes)


module.exports = router