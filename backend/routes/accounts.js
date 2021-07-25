const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//var path = require("path");
const accountsSchema = require("../schema/accountsSchema");
const transactions = require("./misc/returnTransactionsDetails");
const wishlistDetails = require("./misc/returnWishlistWithDetails");

const Accounts = mongoose.model("Accounts", accountsSchema);

router.route("/register").post((req, res) => {
  const email = req.body.email;
  //const password = req.body.password;
  const password = bcrypt.hashSync(req.body.password, 10);
  const name = req.body.name;
  const newsletter = req.body.newsletter;

  const newAccount = new Accounts({ email, password, name, newsletter });

  newAccount
    .save()
    .then(() =>
      Accounts.findOne({ email: email }, function (err, result) {
        if (err) throw err;
        res.json({ status: "pass", id: result._id });
      })
    ) //.then(() => res.json({ status: "success" }))
    .catch((err) => {
      res.json({ status: "failed", errorCode: err.code });
      console.log(err);
    });
});

router.route("/login").post((req, res) => {
  const getEmail = req.body.email;
  const getPassword = req.body.password;
  // console.log("login");
  Accounts.findOne({ email: getEmail }, function (err, result) {
    if (err) {
      res.status(400).json("Error: " + err);
      throw err;
    } else {
      if (result != null) {
        if (bcrypt.compareSync(getPassword, result.password)) {
          res.json({
            status: "pass",
            email: result.email,
            wishlist: result.wishlist,
            cart: result.cart,
            name: result.name,
            id: result._id,
          });
        } else {
          res.json({ status: "failed" });
        }
      } else {
        res.json(result);
      }
    }
  });
});

router.route("/get-from-id").post((req, res) => {
  const id = req.body.id;
  if (id === null) {
    res.json("FAIL");
    return;
  }
  if (id === undefined || id === null) res.json({ status: "failed" });
  else {
    Accounts.findOne({ _id: id }, function (err, result) {
      if (err) {
        res.status(400).json("Error: " + err);
        throw err;
      } else {
        if (result !== null) {
          const obj = {
            status: "pass",
            _id: result._id,
            email: result.email,
            name: result.name,
            newsletter: result.newsletter,
          };
          res.json({
            acc: obj,
            cart: removeThrashFromCart(result.cart),
            wishlist: result.wishlist,
          });
          //console.log(obj);
        } else {
          res.json({ acc: { status: "failed" } });
        }
      }
    });
  }
});

function removeThrashFromCart(oldCart) {
  var item_img = [],
    item_name = [],
    item_id = [],
    item_price = [],
    item_quantity = [],
    item_size = [],
    item_avail_sizes = [];

  for (let i = 0; i < oldCart.item_id.length; i++) {
    if (oldCart.item_id[i] === null) {
      continue;
    }

    item_img.push(oldCart.item_img[i]);
    item_name.push(oldCart.item_name[i]);
    item_id.push(oldCart.item_id[i]);
    item_price.push(oldCart.item_price[i]);
    item_quantity.push(oldCart.item_quantity[i]);
    item_size.push(oldCart.item_size[i]);
    item_avail_sizes.push(oldCart.item_avail_sizes[i]);
  }

  return {
    item_img: item_img,
    item_name: item_name,
    item_id: item_id,
    item_price: item_price,
    item_quantity: item_quantity,
    item_size: item_size,
    item_avail_sizes: item_avail_sizes,
  };
}
router.route("/add-to-cart").post((req, res) => {
  // console.log(req.body.cart);
  // console.log(req.body.id);
  // var t0 = Date.now();

  Accounts.findOne({ _id: req.body.id }, function (err, doc) {
    if (err) throw err;
    if (doc.cart === null || doc.cart === undefined) {
      console.log("CAN't set property 'cart' of null");
      //console.log(doc?.cart);
      res.json("FAILED");
      return;
    }
    doc.cart = req.body.cart;
    doc.save();
    res.json("Added to cart");
    //var t1 = Date.now();
    //console.log(" " + (t1 - t0) + " milliseconds.");
  });
});

router.route("/get-cart").post((req, res) => {
  const id = req.body.id;
  if (id === null || id === "" || id === undefined) {
    res.json(false);
    return;
  }
  Accounts.findOne({ _id: id }, function (err, result) {
    res.json({ cart: result.cart });
  });
});

router.route("/transaction-history").post((req, res) => {
  const id = req.body._id;
  if (id === null || id === undefined) {
    res.json("NONONNO");
    return;
  }

  Accounts.findOne({ _id: req.body._id }, function (err, result) {
    transactions.returnTransactionsDetails(result.transaction, res);
    //Res.json is in transactions
  });
});

router.route("/add-to-wishlist").post((req, res) => {
  //console.log(req.body);

  Accounts.findOne({ _id: req.body._id }, function (err, result) {
    if (err) throw err;
    result.wishlist = req.body.newWishlist;
    result.save();
    res.json(result.wishlist);
  });
});

router.route("/get-details-from-wishlist").post((req, res) => {
  wishlistDetails.returnWishlistWithDetails(req.body.ids, res);
});

router.route("/get-account-information").post((req, res) => {
  Accounts.findOne({ _id: req.body._id }, function (err, result) {
    const obj = {
      memberSince: result.createdAt,
      name: result.name,
      newsletter: result.newsletter,
      phone: result.phone,
      email: result.email,
    };
    res.json(obj);
  });
});

router.route("/update-newsletter-status").post((req, res) => {
  Accounts.findOne({ _id: req.body._id }, function (err, doc) {
    doc.newsletter = req.body.newStatus;
    doc.markModified("newsletter");
    doc.save();
    //console.log(req.body);
    res.json("Done");
  });
});

router.route("/update-password").post((req, res) => {
  Accounts.findOne({ _id: req.body._id }, function (err, doc) {
    const bool = bcrypt.compareSync(req.body.oldPwd, doc.password);
    if (bool) {
      doc.password = bcrypt.hashSync(req.body.newPwd, 10);
      doc.markModified("password");
      doc.save();
      res.json({ status: "success" });
    } else {
      res.json({ status: "failed" });
    }
  });
});

module.exports = { router };
