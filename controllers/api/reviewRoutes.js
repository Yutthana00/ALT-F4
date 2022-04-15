// const express = require('express')
const router = require("express").Router();
const { Review, Game, User } = require("../../models");
const withAuth = require("../../utils/auth");


router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll()
        console.log('Test to show review data ' + reviewData)
        res.status(200).json(reviewData)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get('/:game_id', async (req, res) => {
    console.log(req.params.game_id)
    try {
        const reviewData = await Review.findAll({
            where: {
                game_id: req.params.game_id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ]
        })

        if (!reviewData) {
            res
            .status(404)
            .json({ message: 'Review id not found!'})
            return
        }

        res.status(200).json(reviewData)
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
})


router.post('/:game_id', withAuth, async (req, res) => {
    try {
        console.log('you are here')

        // let body = req.body

        const newReview = await Review.create({
            game_id: req.params.game_id,
            body: req.body.body,
            user_id: req.session.user_id,
        })

        console.log(newReview)

        if (!withAuth) {
            console.log('You need to be logged in to post a Review!')
            return
        }

        res.status(200).json(newReview)
    } catch (err) {
        res.status(400).json(err)
    }
})


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const reviewData = await Review.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if (!reviewData) {
            res.status(404).json({ message: 'No review with this id! '})
            return
        }

        res.status(200).json(reviewData)
        console.log('Review deleted!')
    } catch (err) {
        res.status(500).json(err)
    }
})

// body.body is easier then making the server again after altering the models
router.put('/:id', withAuth, async (req, res) => {
    try {
        const reviewUpdate = await Review.update(
            {
            title: req.body.title,
            user_id: req.session.user_id,
            body: req.body.body
            },
            {
            where: {
                id: req.params.id
            },
            }
        )

        if (!reviewUpdate) {
            console.log('No review to update with this id!')
            res.status(404).json(err)
            return
        }
        
        res.status(200).json(reviewUpdate)

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router