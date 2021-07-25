const mongoose = require("mongoose");
const inventorySchema = require("../../schema/inventorySchema");
const Inventory = mongoose.model("Inventory", inventorySchema);

async function returnItemDetails(ids) {
  var list = [];
  //console.log(ids);
  var query;
  if (ids.length <= 1) query = { _id: ids[0] };
  else {
    for (let i = 0; i < ids.length; i++) list.push({ _id: ids[i] });
    query = { $or: list };
  }

  var rez;
  await Inventory.find(query).then((result) => {
    //console.log(result);
    //return result;
    rez = result;
  });
  //console.log(rez);
  return rez;
}
module.exports = returnItemDetails;
