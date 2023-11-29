const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleString(), 
  },
  feature_image: {
    type: String,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  permaLink: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subcategory: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
