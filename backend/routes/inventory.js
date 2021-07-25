const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");
const inventorySchema = require("../schema/inventorySchema");

const Inventory = mongoose.model("Inventory", inventorySchema);

//Get index of last item first
var indexCount = 0;
function getLastIndex() {
  Inventory.find()
    .sort({ _id: -1 })
    .limit(1)
    .then((result) => {
      applyIndexCount(result[0].index + 1);
    });
}
function applyIndexCount(integer) {
  indexCount = integer;
  //console.log(indexCount);
}
getLastIndex();

//
router.route("/index-count").post((req, res) => {
  res.json(indexCount);
});
// router.route("/dummy-data").get((req, res) => {
//   for (let x = 0; x < 20; x++) {
//     indexCount++;
//     console.log(indexCount);

//     const images = ["194A4436.jpg", "194A4429.jpg", "194A4436.jpg"];
//     const itemName = `outerwear ${indexCount}`;
//     const collectionName = "winter";
//     const category = "outerwear";
//     const price = 999;
//     const size = ["S", "M"];
//     const description = "Smal desc";
//     const stock = [0, 10];
//     const notes = "none";
//     const tags = ["fancy", "stylish"];
//     const sku = "SK-UU-FF";
//     const material = "cotton";
//     const discount = "0";
//     const color1 = "#fff";
//     const color2 = "#000";
//     const season = "winter";

//     const newItem = new Inventory({
//       images: images,
//       item_name: itemName,
//       collection_name: collectionName,
//       category: category,
//       price: price,
//       size: size,
//       description: description,
//       stock: stock,
//       notes: notes,
//       tags: tags,
//       sku: sku,
//       material: material,
//       discount: discount,
//       index: indexCount,
//       color_1: color1,
//       color_2: color2,
//       season: season,
//     });

//     newItem
//       .save()
//       .then(() => {
//         console.log(`${indexCount} added`);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   res.json("done");
// });
router.route("/getOne").post((req, res) => {
  const id = req.body.id;

  Inventory.findOne({ _id: id }, function (err, result) {
    if (err) {
      res.status(400).json("Error: " + err);
    } else {
      if (result === null) {
        res.json(false);
        return;
      }
      res.json(result);
      const newCount = result.views === undefined ? 0 : result.views + 1;
      result.views = newCount;
      result.markModified("views");
      result.save();
    }
  });
});

router.route("/get-max-index").post((req, res) => {
  Inventory.find()
    .sort({ index: -1 })
    .limit(1)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

router.route("/search-query").post((req, res) => {
  if (req.body.query === undefined) {
    res.json("FAILED");
    return;
  }

  const query = req.body.query;
  Inventory.find(query)
    .limit(30)
    .then((result) => {
      res.json(result);
    });
});

router.route("/get").post((req, res) => {
  ///console.log(JSON.stringify(req.body.query));
  const query = req.body.query;
  const limit = req.body.limit;
  Inventory.find(query)
    .sort({ index: -1 })
    .limit(limit)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

router.route("/add-item").post((req, res) => {
  console.log("add-item");
  const images = req.body.images;
  const itemName = req.body.itemName;
  const collectionName = req.body.collectionName;
  const category = req.body.category;
  const price = req.body.price;
  const size = req.body.size;
  const description = req.body.description;
  const stock = req.body.stock;
  const notes = req.body.notes;
  const tags = req.body.tags;
  const sku = req.body.sku;
  const material = req.body.material;
  const discount = req.body.discount;
  //const colors = req.body.colors;
  const color1 = req.body.color1;
  const color2 = req.body.color2;
  const season = req.body.season;

  //Dealing with size aswell - YEAH YEAH I AM BAD - I don't have time to recreate everythign now
  var size_xs = false,
    size_s = false,
    size_m = false,
    size_l = false,
    size_xl = false;
  for (let i = 0; i < size.length; i++) {
    if (size[i] === "XS") size_xs = true;
    else if (size[i] === "S") size_s = true;
    else if (size[i] === "M") size_m = true;
    else if (size[i] === "L") size_l = true;
    else if (size[i] === "XL") size_xl = true;
  }

  //

  const newItem = new Inventory({
    index: indexCount,
    images: images,
    item_name: itemName,
    collection_name: collectionName,
    category: category,
    price: price,
    size: size,
    description: description,
    stock: stock,
    notes: notes,
    //colors: colors,
    tags: tags,
    sku: sku,
    material: material,
    discount: discount,
    size_xs: size_xs,
    size_s: size_s,
    size_m: size_m,
    size_l: size_l,
    size_xl: size_xl,
    color_1: color1,
    color_2: color2,
    season: season,
  });

  newItem
    .save()
    .then(() => {
      res.json("Success");
      console.log("Added one item");
      indexCount++;
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
});

//Save image //
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/root/sootifiles/ss/build/assets/images/uploads/");
    //cb(null, "../public/assets/images/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).array("file");
router.route("/save-image").post((req, res) => {
  console.log("Save-image-add-item");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log("200");
    return res.status(200).send(req.body.file);
  });
});

router.route("/current-stock").post((req, res) => {
  const ids = req.body.ids;
  var list = [];
  for (let i = 0; i < ids.length; i++) list.push({ _id: ids[i] });
  if (list.length < 1) {
    res.json("NOTHING");
    return;
  }
  //console.log(ids);
  Inventory.find({ $or: list }).then((result) => {
    var listOfObject = [];

    for (let i = 0; i < result.length; i++)
      listOfObject.push({ _id: result[i]._id, stock: result[i].stock });

    res.json(listOfObject);
    //console.log(listOfObject);
  });
});

router.route("/top-20-viewed-items").post((req, res) => {
  Inventory.find()
    .sort({ views: -1 })
    .limit(20)
    .then((result) => {
      res.json(result);
    });
});

router.route("/approve-order-return-details").post((req, res) => {
  const query = req.body.length > 1 ? { $or: req.body } : req.body[0];
  Inventory.find(query).then((result) => {
    var ids = [];
    var skus = [];
    var price = [];
    result.forEach((elem) => {
      ids.push(elem._id);
      skus.push(elem.sku);
      price.push(elem.price);
    });
    res.json({ ids, skus, price });
  });
});

router.route("/delete-product-from-id").post((req, res) => {
  Inventory.remove({ _id: req.body.id })
    .then((result) => {
      res.json(true);
    })
    .catch((err) => {
      res.json(false);
    });
});
module.exports = { router };
