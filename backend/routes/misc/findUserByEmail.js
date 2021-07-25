const mongoose = require("mongoose");
const accountsSchema = require("../../schema/accountsSchema");

const Accounts = mongoose.model("Accounts", accountsSchema);

async function findUserByEmail(email) {
  var obj = await Accounts.findOne({ email }).then(async (doc, err) => {
    return doc;
  });
  return obj;
}

module.exports = findUserByEmail;
