import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatePost({ refresh, auth }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("General");
  const [isFeatured, setIsFeatured] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      form.append("category", category);
      form.append("isFeatured", isFeatured);
      if (image) form.append("image", image);

      await axios.post(
        "http://localhost:5000/api/posts",
        form,
        { withCredentials: true }
      );

      toast.success("Post published 🚀");

      // reset form
      setTitle("");
      setContent("");
      setCategory("General");
      setIsFeatured(false);
      setImage(null);

      refresh();

    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Could not publish post 😞"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mt-6">

      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Create New Post
      </h2>

      <form onSubmit={submit} className="space-y-3">

        <input
          className="w-full p-2 border rounded 
            bg-white text-black 
            dark:bg-gray-800 dark:text-white 
            dark:border-gray-700"
          placeholder="Post Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 border rounded 
            bg-white text-black 
            dark:bg-gray-800 dark:text-white 
            dark:border-gray-700"
          placeholder="Content..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />

        {/* CATEGORY */}
        <select
          className="w-full p-2 border rounded 
            bg-white text-black 
            dark:bg-gray-800 dark:text-white 
            dark:border-gray-700"
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
          className="w-full"
        />

        {/* FEATURED CHECKBOX — ONLY ADMIN */}
        {auth && (
          <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={e => setIsFeatured(e.target.checked)}
            />
            Mark as Featured ⭐
          </label>
        )}

        <button
          type="submit"
          className="
            bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
            text-white px-4 py-2 rounded
            transition transform duration-200 active:scale-95
          "
        >
          Publish
        </button>

      </form>

    </div>
  );
}
