const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  deadline: {
    type: String,
    required: false,
  },
  category: String,
  status: {
    type: String,
    default: "Not Started",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
