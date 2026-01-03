import express from "express";
import upload from "../middleware/upload.js";
import { cloudinary } from "../cloudinary.js";
import Post from "../models/Post.js";
import isAdmin from "../middleware/auth.js";

const router = express.Router();


// =========================
// CREATE POST  (Admin only)
// =========================
router.post("/", isAdmin, upload.single("image"), async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_uploads",
      });
      imageUrl = uploaded.secure_url;
    }

    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
      category: req.body.category || "General",
    });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

router.put("/:id/feature", async (req, res) => {
  const { isFeatured } = req.body;

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { isFeatured },
    { new: true }
  );

  res.json(post);
});

// =========================
// UPDATE POST (Admin only)
// =========================
router.put("/:id", isAdmin, upload.single("image"), async (req, res) => {
  try {
    let imageUrl = req.body.image;

    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_uploads",
      });
      imageUrl = uploaded.secure_url;
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        image: imageUrl,
        category: req.body.category,
      },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});


// =========================
// DELETE POST (Admin only)
// =========================
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});



// =========================
// GET ALL POSTS (Public)
// =========================
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


// =========================
// GET SINGLE POST (Public)
// =========================
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


// =========================
// ADD COMMENT TO POST (Public)
// =========================
router.post("/:id/comments", async (req, res) => {
  try {
    const { name, text } = req.body;

    if (!name || !text) {
      return res.status(400).json({ message: "Name and comment text are required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ name, text });

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add comment" });
  }
});

router.delete("/:postId/comments/:commentId", isAdmin, async (req, res) => {
  const { postId, commentId } = req.params;

  const post = await Post.findById(postId);

  post.comments = post.comments.filter(
    c => c._id.toString() !== commentId.toString()
  );

  await post.save();

  res.json({ success: true });
});

router.post("/:postId/comments/:commentId/like", async (req, res) => {
  const { postId, commentId } = req.params;
  const { clientId } = req.body;   // browser id

  const post = await Post.findById(postId);

  const comment = post.comments.id(commentId);

  if (!comment.likedBy) comment.likedBy = [];

  // already liked?
  if (comment.likedBy.includes(clientId)) {
    return res.json({ liked: false, likes: comment.likes });
  }

  comment.likes += 1;
  comment.likedBy.push(clientId);

  await post.save();

  res.json({ liked: true, likes: comment.likes });
});




export default router;
