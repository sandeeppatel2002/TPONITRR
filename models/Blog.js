const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: String, // String is shorthand for {type: String}
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
