const router = require("express").Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/root/sootifiles/ss/build/assets/featuredslides/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).array("file");

router.route("/saveimage").post((req, res) => {
  console.log("Save image called");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    //console.log("200 time");
    return res.status(200).send(req.body.file);
  });
});

router.route("/check").post((req, res) => {
  console.log("check");
  res.json("WORKING");
});
module.exports = { router };
