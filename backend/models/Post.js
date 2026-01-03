import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    category: String,
    
    createdAt: { type: Date, default: Date.now },

    isFeatured: { type: Boolean, default: false },

    // ⭐ NEW — COMMENTS FIELD
    comments: [
      {
        name: String,
        text: String,
        date: {
          type: Date,
          default: Date.now
        },
        likes: {
          type: Number,
          default: 0
        },
        likedBy: [String]   // store unique browser ids
      }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
