const router = require("express").Router();
const { Comment, User, Review } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Review,
        },
        {
          model: Game,
        },
        {
          model: User,
        },
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment with that id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      include: [
        {
          model: Game,
        },
        {
          model: Review,
        },
        {
          model: User,
        },
      ],
    });

    if (!withAuth) {
      console.log("You need to be logged in to post a Comment!");
      return;
    }

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No review with this id! " });
      return;
    }

    res.status(200).json(commentData);
    console.log("Review deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentUpdate = await Comment.update(
      {
        user_id: req.session.user_id,
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!commentUpdate) {
      console.log("No review to update with this id!");
      res.status(404).json(err);
      return;
    }

    res.status(200).json(commentUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
