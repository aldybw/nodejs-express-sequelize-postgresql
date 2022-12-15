const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require("path");

// make folder if doesnt exist - explore node js more
// var fs = require("fs");
// var dir = "./tmp";

// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir);
// }

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, __basedir + "/resources/static/assets/uploads");
    cb(null, path.join(__basedir, "/resources/static/assets/uploads"));
  },
  filename: (req, file, cb) => {
    console.log(
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
    // cb(null, file.originalname);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
