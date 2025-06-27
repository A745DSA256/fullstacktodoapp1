const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Homework", "Office Work"],
      default: "Homework",
    },
    status: {
      type: String,
      enum: ["Not Started", "Pending", "Completed"],
      default: "Not Started",
    },
  },
  { timestamps: true } // adds createdAt, updatedAt automatically
);

module.exports = mongoose.model("Todo", todoSchema);

