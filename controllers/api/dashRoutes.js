const router = require('express').Router();
const { Comment, User, Review, Game } = require("../../models");
const withAuth = require("../../utils/auth");

router.get('/', withAuth, async (req, res) => {
    try {

        if (!withAuth) {
            res.status(401).json(alert({ message: 'Log in to view your Dashboard!' }))
        }

        res.render("dashboard", {
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router