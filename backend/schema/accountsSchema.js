const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    wishlist: {
      type: [String],
      trim: true,
      default: [],
    },
    cart: {
      type: Object,
      trim: true,
      default: {
        item_img: [],
        item_name: [],
        item_id: [],
        item_price: [],
        item_quantity: [],
        item_size: [],
        item_avail_sizes: [],
      },
    },
    phone: {
      type: [String],
      default: [null, null], // First index being country code and second being the number
    },
    transaction: {
      type: [String],
      default: [],
    },
    account_type: {
      type: String,
      default: "USER",
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = accountsSchema;
