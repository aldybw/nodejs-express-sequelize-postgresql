module.exports = (app) => {
  const tags = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Create a new Tag
  router.post("/", tags.create);

  // Find all Tags
  router.get("/", tags.findAll);

  // Find a single Tag with id
  router.get("/:id", tags.findById);

  // Add Tutorial to Tag
  router.post("/add-tutorial", tags.addTutorial);

  app.use("/api/tags", router);
};
