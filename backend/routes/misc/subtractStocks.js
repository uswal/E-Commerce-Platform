const mongoose = require("mongoose");

const transactionSchema = require("../../schema/transactionsSchema");
const inventorySchema = require("../../schema/inventorySchema");
const Transaction = mongoose.model("Transaction", transactionSchema);
const Inventory = mongoose.model("Inventory", inventorySchema);

//TODO: Add item size to transaction
//Sadly we got to
async function SubtractStocks(item_list) {
  console.log(item_list);
  for (let i = 0; i < item_list.item_id.length; i++) {
    if (item_list.item_id[i] === null || item_list.item_id[i] === undefined)
      continue;

    await updateOneByOne(
      item_list.item_id[i],
      item_list.item_quantity[i],
      item_list.item_size[i]
    );
  }
}

async function updateOneByOne(id, quantity, size) {
  await Inventory.findOne({ _id: id }, function (err, doc) {
    const i = doc.size.indexOf(size);
    doc.stock[i] -= quantity;
    doc.markModified("stock");
    doc.save();
    return doc;
  });
}

module.exports = { SubtractStocks };
