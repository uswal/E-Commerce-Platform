const mongoose = require("mongoose");

const accountsSchema = require("../../schema/accountsSchema");

const Accounts = mongoose.model("Accounts", accountsSchema);

function ResetCart(id) {
  Accounts.findOne({ _id: id }, function (err, doc) {
    doc.cart = {
      item_img: [],
      item_name: [],
      item_id: [],
      item_price: [],
      item_quantity: [],
      item_size: [],
      item_avail_sizes: [],
    };
    doc.save();
  });
}

module.exports = { ResetCart };
