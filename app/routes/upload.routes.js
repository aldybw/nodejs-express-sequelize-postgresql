const express = require("express");
const router = express.Router();
const files = require("../controllers/file.controller");

let routes = (app) => {
  router.post("/upload", files.upload);
  router.get("/files", files.getListFiles);
  router.get("/files/:name", files.download);

  app.use(router);
};

module.exports = routes;
