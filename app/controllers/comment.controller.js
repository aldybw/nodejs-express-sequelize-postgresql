const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;
const Tag = db.tags;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.tutorialId) {
    res.status(400).send({
      message: "Tutorial ID can not be empty!",
    });
    return;
  }
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  if (!req.body.text) {
    res.status(400).send({
      message: "Text can not be empty!",
    });
    return;
  }

  const tutorial = await Tutorial.findByPk(comment.tutorialId);
  if (!tutorial) {
    return res.status(404).send({ message: "Tutorial was not found" });
  }

  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId,
  };

  try {
    const data = await Comment.create(comment);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while creating the Tutorial",
    });
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Comment.findByPk(id, { include: ["tutorial"] });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Tutorial with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Comment with id=" + id,
    });
  }
};
