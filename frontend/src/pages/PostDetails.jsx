import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CommentSkeleton } from "../components/Skeletons";
import ReadingProgress from "../components/ReadingProgress";

axios.defaults.withCredentials = true;

export default function PostDetails({ auth }) {

  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(true);

  // Load saved username
  useEffect(() => {
    const saved = localStorage.getItem("blog_username");
    if (saved) setName(saved);
  }, []);

  // Auto-fill admin
  useEffect(() => {
    if (auth) setName("Admin");
  }, [auth]);

  // Unique browser ID for likes
  useEffect(() => {
    let id = localStorage.getItem("client_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("client_id", id);
    }
    setClientId(id);
  }, []);

  const loadPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/posts/${id}`
      );
      setPost(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  // Submit comment
  const submitComment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        { name, text }
      );

      if (!auth) localStorage.setItem("blog_username", name);

      toast.success("Comment added 💬");
      setText("");
      loadPost();

    } catch {
      toast.error("Failed to add comment 😢");
    }
  };

  // Delete comment (admin only)
  const deleteComment = async (cid) => {
    if (!confirm("Delete this comment?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${id}/comments/${cid}`
      );

      toast.success("Comment removed 🧹");
      loadPost();

    } catch {
      toast.error("Failed to delete comment ❌");
    }
  };

  // Like comment
  const likeComment = async (cid) => {
    await axios.post(
      `http://localhost:5000/api/posts/${id}/comments/${cid}/like`,
      { clientId }
    );
    loadPost();
  };

  // 🗑 DELETE POST (ADMIN)
  const deletePost = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${id}`
      );

      toast.success("Post deleted 🗑️");
      window.location.href = "/";

    } catch {
      toast.error("Failed to delete post ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 dark:text-white">

      {/* Reading Progress */}
      {typeof window !== "undefined" && <ReadingProgress />}

      {/* LOADING */}
      {loading ? (
        <div className="space-y-4 animate-pulse">

          <div className="h-64 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

          <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>

          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>

          <div className="mt-10 space-y-3">
            {[1,2,3].map(i => <CommentSkeleton key={i} />)}
          </div>

        </div>
      ) : (
        post && (
          <>
            {/* IMAGE */}
            <img
              src={post.image || "https://picsum.photos/800"}
              className="rounded-2xl w-full h-[350px] object-cover"
            />

            {/* ⭐ ADMIN POST BUTTONS (IMAGE KE NEECHAY) ⭐ */}
            {auth && (
              <div className="flex gap-3 mt-4">

                <Link
                  to={`/post/${post._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  ✏ Edit Post
                </Link>

                <button
                  onClick={deletePost}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  🗑 Delete Post
                </button>

              </div>
            )}

            {/* CATEGORY */}
            <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 px-3 py-1 mt-4 inline-block rounded">
              {post.category || "General"}
            </span>

            {/* TITLE */}
            <h1 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
              {post.title}
            </h1>

            {/* DATE */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
            </p>

            {/* CONTENT */}
            <p className="mt-4 leading-7 text-gray-800 dark:text-gray-200 whitespace-pre-line">
              {post.content}
            </p>


            {/* ================= COMMENTS ================= */}
            <div className="mt-10">

              <h2 className="text-2xl font-semibold mb-4">
                Comments ({post.comments?.length || 0})
              </h2>

              {/* ADD COMMENT */}
              <form onSubmit={submitComment} className="space-y-3 mb-6">

                <input
                  className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={auth}
                  required
                />

                <textarea
                  className="w-full border p-2 rounded h-24 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Write a comment..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                />

                <button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded">
                  Post Comment
                </button>
              </form>

              {/* COMMENT LIST */}
              <div className="space-y-4">

                {(post.comments || []).map(c => (
                  <div
                    key={c._id}
                    className="border dark:border-gray-700 p-3 rounded relative"
                  >

                    {/* ADMIN DELETE COMMENT */}
                    {auth && (
                      <button
                        onClick={() => deleteComment(c._id)}
                        className="absolute top-2 right-2 text-red-500"
                      >
                        Delete
                      </button>
                    )}

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {c.name}
                    </p>

                    <p className="text-gray-800 dark:text-gray-200">
                      {c.text}
                    </p>

                    <div className="flex justify-between items-center mt-2">

                      <p className="text-xs text-gray-500">
                        {c.date ? new Date(c.date).toLocaleString() : ""}
                      </p>

                      <button
                        onClick={() => likeComment(c._id)}
                        className="text-sm flex items-center gap-1 text-pink-600 dark:text-pink-400"
                      >
                        ❤️ {c.likes || 0}
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          </>
        )
      )}
    </div>
  );
}
