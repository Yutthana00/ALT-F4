const router = require("express").Router();
const userRoutes = require("./userRoutes");
const reviewRoutes = require("./reviewRoutes");
const commentRoutes = require("./commentRoutes");
const dashRoutes = require("./dashRoutes");

router.use("/users", userRoutes);
router.use("/review", reviewRoutes);
router.use("/comment", commentRoutes);
router.use("/dashboard", dashRoutes);

module.exports = router;
