import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import FeaturedPosts from "../components/FeaturedPosts";
import { PostCardSkeleton } from "../components/Skeletons";

export default function Home({ posts = [], auth, loadPosts }) {

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await loadPosts();
      setLoading(false);
    };
    fetch();
  }, []);

  const safePosts = Array.isArray(posts) ? posts : [];

  const filteredPosts = safePosts
    .slice(4)
    .filter(p =>
      activeCategory === "All"
        ? true
        : (p?.category || "General") === activeCategory
    )
    .filter(p =>
      (p?.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p?.content?.toLowerCase() || "").includes(search.toLowerCase())
    );

  return (
    <div className="dark:text-white">

      <Hero />

      <FeaturedPosts posts={safePosts} />

      <CategoryFilter
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <div className="max-w-7xl mx-auto px-6 -mt-4">
        <input
          placeholder="Search posts..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded-xl"
        />
      </div>

      {auth && (
        <div className="max-w-7xl mx-auto p-6">
          <CreatePost refresh={loadPosts} />
        </div>
      )}

      <section className="max-w-7xl mx-auto p-6">

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => <PostCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <PostCard
                key={post?._id}
                id={post?._id}
                title={post?.title}
                content={post?.content}
                tag={post?.category || "General"}
                img={post?.image || "https://picsum.photos/500"}
                refresh={loadPosts}
                admin={auth}
              />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}
