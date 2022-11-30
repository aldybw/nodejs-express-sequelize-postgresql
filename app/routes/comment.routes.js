module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  // Create a new Comment
  router.post("/", comments.create);

  // Get a single Comment with Id
  router.get("/:id", comments.findById);

  app.use("/api/comments", router);
};
