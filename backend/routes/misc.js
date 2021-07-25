const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Schema = mongoose.Schema;

const miscSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    type: {
      type: String,
    },
    details: {
      type: Object,
    },
  },
  { _id: false }
);

const Misc = mongoose.model("Misc", miscSchema);

var material = [],
  collection = [],
  color = [];

var country = [],
  region_name = [],
  city = [],
  ip = [];

var name = [],
  imgPath = [],
  title1 = [],
  title2 = [],
  caption = [],
  description = [],
  link = [];

var lookbook = {
  pointPerspective: { img: [], id: [], title: [] },
  intoTheGarden: { img: [], id: [], title: [] },
};

var chronicles = {
  press: { img: [], title: [], cap: [], desc: [] },
  collab: { img: [], title: [], cap: [], desc: [] },
  diary: { img: [], title: [], cap: [], desc: [] },
  curated: { img: [], title: [], cap: [], desc: [] },
};

//What's the plan?
//First we check if there exist our misc or not, if not we are going to create empty misc else load
//We are also going to make a copy of old to our memory
function onStartup() {
  Misc.findOne({ type: "shop" }, function (err, result) {
    if (result === null) createEmptyRecordShop(1);
    //1 is id assigned
    else {
      material = result.details.material;
      collection = result.details.collection;
      color = result.details.color;
    }
  });

  Misc.findOne({ type: "locations" }, function (err, result) {
    if (result === null) createEmptyRecordLocations(2);
    else {
      country = result.details.country;
      region_name = result.details.region_name;
      city = result.details.city;
      ip = result.details.ip;
    }
  });

  Misc.findOne({ type: "fslides" }, (err, result) => {
    if (result === null) defaultFslides(3);
    else {
      name = result.details.name;
      imgPath = result.details.imgPath;
      title1 = result.details.title1;
      title2 = result.details.title2;
      caption = result.details.caption;
      description = result.details.description;
      link = result.details.link;
    }
  });

  Misc.findOne({ type: "lookbook" }, (err, result) => {
    if (result === null) defaultLookbook(4);
    else {
      lookbook = result.details;
    }
  });

  Misc.findOne({ type: "chronicles" }, (err, result) => {
    if (result === null) defaultChronicles(5);
    else chronicles = result.details;
  });
}
function defaultChronicles(_id) {
  console.log("Setting default chronicles!");
  const type = "chronicles";
  const details = chronicles;
  const newMisc = new Misc({ _id, type, details });
  newMisc.save().catch((err) => {
    console.log(err);
  });
}
function defaultLookbook(_id) {
  console.log("Setting default look book.");
  const type = "lookbook";
  const details = lookbook;
  const newMisc = new Misc({ _id, type, details });
  newMisc.save().catch((err) => {
    console.log(err);
  });
}

function defaultFslides(_id) {
  console.log("Setting default covers for featured sldies.");
  const type = "fslides";
  name = ["f1", "f2", "f3", "f4", "f5", "f6", "f7"];
  imgPath = [
    "/assets/featuredslides/Banner.jpg",
    "/assets/featuredslides/Banner_10.jpg",
    "/assets/featuredslides/Banner_3.jpg",
    "/assets/featuredslides/Banner_11.jpg",
    "/assets/featuredslides/f1.jpg",
    "/assets/featuredslides/f2.jpg",
    "/assets/featuredslides/f3.jpg",
  ];
  title1 = [
    "Trans-seasonal pieces  made from eco-friendly materials.",
    "Grab a Resilient & handcrafted ensemble made from natural fabric.",
    "Timeless One for all !",
    "Modern & relaxed luxury with sustainability",
    "title1",
    "title1",
    "title1",
  ];
  title2 = ["", "", "", "", "title2", "title2", "title2"];
  caption = [
    "Occasionwear...one is not enough",
    "Gonna Be a while?",
    "It's a bit of warmer weather isn't exactly all here",
    "What more could you want?",
    "caption",
    "caption",
    "caption",
  ];
  description = ["", "", "", "", "description", "description", "description"];
  link = [
    "/itemview/606807f6b053df4f9a5dafaf",
    "/itemview/6069918af9c73d63e144de36",
    "/itemview/60684d92f153ac50edb6b36c",
    "/itemview//6069a97691d290649e1a4528",
    "/itemview/#",
    "/itemview/#",
    "/itemview/#",
  ];
  const details = {
    imgPath,
    name,
    title1,
    title2,
    caption,
    description,
    link,
  };
  const newMisc = new Misc({ _id, type, details });
  newMisc.save().catch((err) => {
    console.log(err);
  });
}
function createEmptyRecordLocations(_id) {
  console.log("Creating empty locations record in misc collection.");
  const type = "locations";
  const details = {
    country: country,
    region_name: region_name,
    city: city,
    ip: ip,
  };
  const newMisc = new Misc({ _id, type, details });
  newMisc.save().catch((err) => {
    console.log(err);
  });
}

function createEmptyRecordShop(_id) {
  console.log("Creating emptry shop record in misc collection.");
  const type = "shop";
  const details = {
    material: material,
    collection: collection,
    color: color,
  };

  const newMisc = new Misc({ _id, type, details });
  newMisc.save().catch((err) => {
    console.log(err);
  });
}
onStartup();

//APIs are Below
router.route("/get-shop-details").post((req, res) => {
  res.json({ material, collection, color });
});

router.route("/update-shop-details").post((req, res) => {
  material = req.body.details.material;
  collection = req.body.details.collection;
  color = req.body.details.color;
  Misc.findOne({ _id: 1 }, function (err, doc) {
    doc.details = req.body.details;
    doc.markModified("details");
    doc.save();
    res.json("Misc - shop - updated");
  });
});

router.route("/add-location-to-db").post((req, res) => {
  const id = ip.indexOf(req.body.ip);
  if (id === -1) {
    if (ip.length > 100) {
      country.shift();
      region_name.shift();
      city.shift();
      ip.shift();
    }

    country.push(req.body.country);
    region_name.push(req.body.region_name);
    city.push(req.body.city);
    ip.push(req.body.ip);

    Misc.findOne({ _id: 2 }, function (err, doc) {
      doc.details = {
        country: country,
        region_name: region_name,
        city: city,
        ip: ip,
      };
      doc.save();
      res.json("Misc - locations - updated");
    });
  }
});

router.route("/get-location-from-db").post((req, res) => {
  res.json({ country: country, region_name: region_name, city: city });
});

router.route("/serve-fslides").post((req, res) => {
  res.json({ name, imgPath, title1, title2, caption, description, link });
});

router.route("/save-fslides").post((req, res) => {
  // console.log(req.body);
  Misc.findOne({ type: "fslides" }, (err, doc) => {
    doc.details = req.body;
    doc.markModified("details");
    doc.save();
    name = req.body.name;
    title1 = req.body.title1;
    title2 = req.body.title2;
    caption = req.body.caption;
    description = req.body.description;
    link = req.body.link;
    imgPath = req.body.imgPath;
    res.json("done");
  });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/root/sootifiles/ss/build/assets/lookbook/");
    //cb(null, "../public/assets/lookbook/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).array("file");

router.route("/lookbook-saveimages").post((req, res) => {
  console.log("Look book images called");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    //console.log("200 time");
    return res.status(200).json(true);
  });
});

router.route("/update-lookbook").post((req, res) => {
  //console.log(req.body);
  if (req.body.type === "point-perspective")
    lookbook.pointPerspective = req.body.obj;
  else if (req.body.type === "into-the-garden")
    lookbook.intoTheGarden = req.body.obj;

  Misc.findOne({ type: "lookbook" }, (err, doc) => {
    doc.details = lookbook;
    doc.markModified("details");
    doc.save();
    res.json(true);
  });
});

router.route("/serve-lookbook").post((req, res) => {
  if (req.body.type === "point-perspective")
    res.json(lookbook.pointPerspective);
  else res.json(lookbook.intoTheGarden);
});

router.route("/serve-chronicles").post((req, res) => {
  if (req.body.type === "press") res.json(chronicles.press);
  else if (req.body.type === "collaboration") res.json(chronicles.collab);
  else if (req.body.type === "client-diary") res.json(chronicles.diary);
  else res.json(chronicles.curated);
});

router.route("/update-chronicles").post((req, res) => {
  //console.log(req.body);

  if (req.body.type === "press") chronicles.press = req.body.obj;
  else if (req.body.type === "collaboration") chronicles.collab = req.body.obj;
  else if (req.body.type === "client-diary") chronicles.diary = req.body.obj;
  else if ((req.body.type = "curated-trends"))
    chronicles.curated = req.body.obj;

  console.log(req.body);
  Misc.findOne({ type: "chronicles" }, (err, doc) => {
    doc.details = chronicles;
    doc.markModified("details");
    doc.save();
    res.json(true);
  });
});

module.exports = { router };
