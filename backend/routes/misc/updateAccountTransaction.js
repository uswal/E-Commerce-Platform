const mongoose = require("mongoose");

const accountsSchema = require("../../schema/accountsSchema");

const Accounts = mongoose.model("Accounts", accountsSchema);

async function addTransactionToAccount(obj) {
  await Accounts.findOne({ _id: obj.userId }, function (err, doc) {
    if (err) throw err;
    doc.transaction.push(obj.orderId);
    doc.markModified("transaction");
    doc.save();
    return doc;
  });

  return 0;
}

module.exports = { addTransactionToAccount };
