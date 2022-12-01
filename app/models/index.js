const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;
db.Op = Op;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.tutorial = require("./tutorial.model.js")(sequelize, DataTypes);
db.comment = require("./comment.model.js")(sequelize, DataTypes);
db.tag = require("./tag.model.js")(sequelize, DataTypes);

// many-to-many relationship between users and roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.ROLES = ["user", "admin", "moderator"];

// one-to-many relationship between tutorial and comments
db.tutorial.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.tutorial, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

// many-to-many relationship between tutorials and tags
db.tag.belongsToMany(db.tutorial, {
  through: "tutorial_tags",
  as: "tutorials",
  foreignKey: "tag_id",
});
db.tutorial.belongsToMany(db.tag, {
  through: "tutorial_tags",
  as: "tags",
  foreignKey: "tutorial_id",
});

module.exports = db;
