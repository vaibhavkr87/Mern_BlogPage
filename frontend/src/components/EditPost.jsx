import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

export default function EditPost({ post, close, refresh }) {

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category || "General");
  const [image, setImage] = useState(null);
  const [isFeatured, setIsFeatured] = useState(post.isFeatured || false);

  const submit = async (e) => {
    e.preventDefault();

    try {

      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      form.append("category", category);
      form.append("isFeatured", isFeatured);
      if (image) form.append("image", image);
      else form.append("image", post.image); // keep old if unchanged

      await axios.put(
        `http://localhost:5000/api/posts/${post._id}`,
        form,
        { withCredentials: true }
      );

      toast.success("Post updated ✨");

      refresh();
      close();

    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Could not update post 😞"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[450px] shadow-xl relative">

        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300"
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold dark:text-white">
          Edit Post
        </h2>

        <form onSubmit={submit} className="space-y-3 mt-3">

          <input
            className="w-full border p-2 rounded 
              dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full border p-2 rounded h-24 
              dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />

          {/* CATEGORY */}
          <select
            className="w-full border p-2 rounded 
              dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>Technology</option>
            <option>Business</option>
            <option>Design</option>
            <option>Lifestyle</option>
            <option>General</option>
          </select>

          {/* IMAGE */}
          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
          />

          {/* FEATURED TOGGLE */}
          <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={e => setIsFeatured(e.target.checked)}
            />
            Mark as Featured ⭐
          </label>

          <button
            type="submit"
            className="
              bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
              text-white px-4 py-2 rounded
              transition transform duration-200 active:scale-95
            "
          >
            Save Changes
          </button>

        </form>
      </div>

    </div>
  );
}
