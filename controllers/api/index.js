const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes')
const reviewRoutes = require('./reviewRoutes')
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/games', gameRoutes)
router.use('/review', reviewRoutes)
// router.use('/comment', commentRoutes)

module.exports = router
