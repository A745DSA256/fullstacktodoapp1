const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    status: {
      type: String,
      default: "Not Started",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Todo", todoSchema);
