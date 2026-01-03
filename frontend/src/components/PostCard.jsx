import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function PostCard({
  id,
  title,
  content,
  tag,
  img,
  admin,
  refresh,
}) {
  const deletePost = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        withCredentials: true,
      });

      toast.success("Post deleted 🗑️");
      refresh();
    } catch (e) {
      console.log(e);
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="
    bg-white dark:bg-[#111827]
    rounded-2xl shadow-md border
    border-gray-200 dark:border-gray-700
    p-4 
    hover:-translate-y-1 hover:shadow-2xl 
    transition
  ">
  
      {/* IMAGE */}
      <img src={img} className="rounded-xl h-44 w-full object-cover" />

      {/* ⭐ ADMIN BUTTONS BELOW IMAGE */}
      {admin && (
        <div className="flex gap-3 mt-3">
          <Link
            to={`/post/${id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>

          <button
            onClick={deletePost}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}

      {/* TAG */}
      <span className="inline-block mt-3 px-3 py-1 text-sm rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
        {tag}
      </span>

      {/* TITLE — FIXED */}
      <h2
        className="font-bold text-lg mt-2 
text-gray-900 dark:text-white 
transition-colors duration-200 
hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        {title}
      </h2>

      {/* CONTENT — FIXED VISIBILITY */}
      <p
        className="
        text-gray-700 
        dark:text-gray-300 
        line-clamp-3 
        mt-1
      "
      >
        {content}
      </p>

      {/* READ MORE */}
      <Link
        to={`/post/${id}`}
        className="inline-block mt-3 text-indigo-600 dark:text-indigo-400 font-medium"
      >
        Read more →
      </Link>
    </div>
  );
}
