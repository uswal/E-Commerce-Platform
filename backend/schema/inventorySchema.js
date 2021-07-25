const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema(
  {
    index: {
      type: Number,
      unique: true,
    },
    images: {
      type: [String],
    },
    item_name: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    collection_name: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: [String],
    },
    description: {
      type: String,
      default: "",
    },
    stock: {
      type: [Number],
      required: true,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
    color_1: {
      type: String,
      default: null,
    },
    color_2: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    size_xs: {
      type: Boolean,
      default: false,
    },
    size_s: {
      type: Boolean,
      default: false,
    },
    size_m: {
      type: Boolean,
      default: false,
    },
    size_l: {
      type: Boolean,
      default: false,
    },
    size_xl: {
      type: Boolean,
      default: false,
    },
    season: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = inventorySchema;
