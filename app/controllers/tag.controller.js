const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.create = async (req, res) => {
  if (!req.body.text) {
    res.status(400).send({
      message: "Text can not be empty!",
    });
    return;
  }

  const tag = {
    name: req.body.name,
  };

  try {
    const data = await Tag.create(tag);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while creating the Tutorial",
    });
  }
};

exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  try {
    const data = await Tag.findAll({
      where: condition,
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description", "published"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findByPk(id, {
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description", "published"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Tutorial with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id,
    });
  }
};

exports.addTutorial = async (req, res) => {
  const tagId = req.body.tagId;
  const tutorialId = req.body.tutorialId;

  try {
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).send({
        message: "Tag not found!",
      });
    }
    const tutorial = await Tutorial.findByPk(tutorialId);
    if (!tutorial) {
      if (!tag) {
        return res.status(404).send({
          message: "Tutorial not found!",
        });
      }
    }

    await tag.addTutorial(tutorial);
    res.send(`Added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id,
    });
  }
};
