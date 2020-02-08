const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"]
  },
  source: {
    type: String,
    required: [true, "title is required"]
  },
  likes: {
    type: String,
    required: [true, "content can't be blank"]
  },
  comments: {
    type: String,
    required: [true, "content can't be blank"]
  },
  isVideo: {
    type: String,
    required: [true, "content can't be blank"]
  }
});

module.exports = mongoose.model("Article", articleSchema);
