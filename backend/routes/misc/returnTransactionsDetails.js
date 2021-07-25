const mongoose = require("mongoose");
const transactionSchema = require("../../schema/transactionsSchema");

const Transaction = mongoose.model("Transaction", transactionSchema);

async function returnTransactionsDetails(ids, res) {
  var list = [];
  for (let i = 0; i < ids.length; i++) {
    list.push({ _id: ids[i] });
  }
  if (list.length < 1) {
    res.json("NOTHING");
    return;
  }
  await Transaction.find({ $or: list }).then((result) => {
    //console.log(result);
    res.json(result);
    return result;
  });
}

module.exports = { returnTransactionsDetails };
