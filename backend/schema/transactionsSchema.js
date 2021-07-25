const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    _id: {
      //id will be order_id
      type: String,
    },
    payment_id: {
      type: String,
    },
    email: {
      type: String,
    },
    user_id: {
      type: String,
    },
    amount: {
      type: Number, //In rs
    },
    item_list: {
      type: Object,
    },
    shipping_address: {
      type: Object,
    },
    signature: {
      type: String,
    },
    payment_status: {
      type: String,
    },
    payment_mode: {
      // COD RAZORPAY
      type: String,
    },
    status: {
      type: String, //ORDERED VERIFIED DELIVERED CANCELLED
      default: "ORDERED",
    },
  },
  { _id: false, timestamps: true }
);

module.exports = transactionSchema;
