import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  profile: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 28,
  },
  img: {
    type: String,
    required: true,
  },
  date: {
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  review: {
    type: String,
    trim: true,
  },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 40,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 100,
    maxlength: 250,
  },
  img: {
    type: String,
    required: true,
  },
  featured_img: {
    type: String
  },
  featured:{
    required : true,
    type : Boolean
  },
  date: {
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    enum: ["life", "education", "health", "travel"],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  reviews: [reviewsSchema],
  content: [{ type: String }],
});

const Post = mongoose.models.Post || mongoose.model("Post", blogSchema);
export default Post;
