const mongoose = require("mongoose");
const inventorySchema = require("../../schema/inventorySchema");

const Inventory = mongoose.model("Inventory", inventorySchema);

function returnWishlistWithDetails(ids, res) {
  if (ids.length < 1) {
    res.json([]);
    return;
  }

  var list = [];
  ids.forEach((elem) => {
    list.push({ _id: elem });
  });
  Inventory.find({ $or: list }).then((result) => {
    //console.log(result);

    var item_img = [],
      item_name = [],
      item_id = [],
      item_price = [],
      item_avail_sizes = [];
    item_stocks = [];

    result.forEach((elem) => {
      item_img.push(elem.images[0]);
      item_name.push(elem.item_name);
      item_id.push(elem._id);
      item_price.push(elem.price);
      item_avail_sizes.push(elem.size);
      item_stocks.push(elem.stock);
    });

    res.json({
      item_img,
      item_name,
      item_id,
      item_price,
      item_avail_sizes,
      item_stocks,
    });
  });
}

module.exports = { returnWishlistWithDetails };
