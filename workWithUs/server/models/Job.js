const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This is required",
  },
  description: {
    type: String,
    required: "This is required",
  },
  email: {
    type: String,
    required: "This is required",
  },
  ingredients: {
    type: Array,
    required: "This is required",
  },
  category: {
    type: String,
    enum: ["blacksmith", "carpenter", "nurse", "maid", "plumber"],
    required: "This is required",
  },
  image: {
    type: String,
    required: "This is required",
  },
});

jobSchema.index({ name: "text", description: "text" });
// wild card
// jobSchema.index({ "$**": "text" });

module.exports = mongoose.model("Job", jobSchema);
