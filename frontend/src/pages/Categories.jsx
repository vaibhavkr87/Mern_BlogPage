import { Link } from "react-router-dom";
import { getCategoryClasses } from "../utils/categoryColors";


export default function Categories({ posts }) {

  const categories = ["Technology","Business","Design","Lifestyle","General"];

  if (!posts || posts.length === 0)
    return (
      <div className="max-w-6xl mx-auto p-6 dark:text-white">
        <h1 className="text-3xl font-bold mb-4">Browse by Category</h1>
        <p>No posts available yet.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 dark:text-white">

      <h1 className="text-3xl font-bold mb-6">Browse by Category</h1>

      {categories.map(cat => {

        const filtered = posts.filter(
          p => (p.category || "General") === cat
        );

        if (filtered.length === 0) return null;

        return (
          <div key={cat} className="mb-10">

<h2 className={`inline-block px-4 py-2 rounded-lg text-xl font-semibold ${getCategoryClasses(cat)}`}>
  {cat}
</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {filtered.map(post => (
                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                  className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow
                             hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold">{post.title}</h3>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {post.content}
                  </p>
                </Link>
              ))}

            </div>

          </div>
        );
      })}
    </div>
  );
}
