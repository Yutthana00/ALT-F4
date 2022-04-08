const { Comment } = require("../models");

const commentData = [
  {
    commenter: "yazzie121",
    comment: "I agree with this comment",
  },
];

module.export = seedComment;
// In Comment Module do we need a reference to
// which review it links too?
