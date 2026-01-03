import { Link } from "react-router-dom";
import { getCategoryClasses } from "../utils/categoryColors";
import { FeaturedSkeleton } from "./Skeletons";

export default function FeaturedPosts({ posts = [] }) {

  const safePosts = Array.isArray(posts) ? posts : [];

  if (!safePosts.length) return <FeaturedSkeleton />;

  const featuredList = safePosts.filter(p => p?.isFeatured);
  const featured = featuredList[0] || safePosts[0];
  const trending =
    featuredList.length > 1
      ? featuredList.slice(1, 4)
      : safePosts.slice(1, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-10 space-y-8">

      {/* FEATURED CARD */}
      <div className="
        grid grid-cols-1 md:grid-cols-2 gap-6 items-center 
        bg-white dark:bg-[#0f172a]
        rounded-3xl shadow-xl
        border border-gray-200 dark:border-gray-700
        p-4 md:p-6
        hover:shadow-2xl transition
      ">

        <img
          src={featured?.image || 'https://picsum.photos/600'}
          className="w-full h-72 object-cover rounded-2xl"
        />

        <div className="p-2">

          <span className={`px-3 py-1 rounded text-sm ${getCategoryClasses(featured?.category)}`}>
            {featured?.category || "General"}
          </span>

          <h2 className="text-3xl font-bold mt-3
            text-gray-900 dark:text-white
            transition-colors duration-200 
            hover:text-indigo-600 dark:hover:text-indigo-400">
            <Link to={`/post/${featured?._id}`}>
              {featured?.title}
            </Link>
          </h2>

          <p className="mt-3 text-gray-700 dark:text-gray-300 line-clamp-3">
            {featured?.content}
          </p>

        </div>
      </div>

      {/* TRENDING */}
      {trending?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3 dark:text-white">
            Trending 🔥
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {trending.map(post => (
              <Link
                to={`/post/${post?._id}`}
                key={post?._id}
                className="
                  bg-white dark:bg-[#0f172a]
                  rounded-2xl shadow 
                  border border-gray-200 dark:border-gray-700
                  p-4 transition hover:-translate-y-1 hover:shadow-xl
                "
              >
                <img
                  src={post?.image || 'https://picsum.photos/400'}
                  className="rounded-xl h-40 w-full object-cover"
                />

                <h4 className="
                  mt-2 font-semibold 
                  text-gray-900 dark:text-white
                  transition-colors duration-200 
                  hover:text-indigo-600 dark:hover:text-indigo-400">
                  {post?.title}
                </h4>

              </Link>
            ))}

          </div>
        </div>
      )}

    </section>
  );
}
