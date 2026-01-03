export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 dark:text-white">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">
          About Me
        </h1>

        <p className="text-gray-600 dark:text-gray-400">
          Developer • Blogger • Learner
        </p>
      </div>

      {/* PROFILE IMAGE — GLASS GLOW */}
      <div className="flex justify-center mb-10">
        <div className="relative">

          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-60"></div>

          {/* Image */}
          <img
            src="/profile.jpg"
            alt="Vaibhav Kumar"
            className="relative w-44 h-44 md:w-52 md:h-52 
            rounded-full object-cover 
            border-4 border-white dark:border-gray-800 
            shadow-2xl"
          />
        </div>
      </div>

      {/* ===== ABOUT TEXT ===== */}
      <div className="space-y-6 text-lg leading-8 text-gray-800 dark:text-gray-300">

        <p>
          Hi 👋 I'm <span className="font-semibold text-indigo-600 dark:text-indigo-400">Vaibhav Kumar</span>, 
          a passionate web developer who loves building clean, modern, and meaningful digital experiences.
          Technology constantly evolves — and I enjoy learning, experimenting, and growing with it every day.
        </p>

        <p>
          This blog is my digital space where I share thoughts, ideas, tutorials, and experiences related to 
          <span className="font-semibold text-purple-500"> web development, learning, productivity, and life.</span>
          My goal is simple — to create content that is useful, honest, and helps someone move one step forward.
        </p>

        <p>
          Whether you're a beginner, a developer, or just someone curious — 
          I hope you find something valuable here ✨
        </p>

        {/* ===== WHAT I DO CARD ===== */}
        <div className="bg-white dark:bg-[#0f172a] border dark:border-gray-700 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-3">
            🧑‍💻 What I Do
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Frontend Development (React, JavaScript, UI/UX)</li>
            <li>Building Projects & Real-world Applications</li>
            <li>Writing Tech & Learning-based Content</li>
            <li>Improving Skills — every single day</li>
          </ul>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

          {[
            ["4+", "Projects"],
            ["MERN", "Stack Dev"],
            ["24/7", "Learner"],
            ["100%", "Passion"],
          ].map((s, i) => (
            <div
              key={i}
              className="
                text-center bg-indigo-50 dark:bg-indigo-900/30 
                p-4 rounded-xl 
                border border-indigo-100 dark:border-indigo-900
              "
            >
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                {s[0]}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{s[1]}</p>
            </div>
          ))}

        </div>

        {/* ===== BLOG MISSION CARD ===== */}
        <div className="bg-white dark:bg-[#0f172a] border dark:border-gray-700 rounded-2xl p-6 shadow mt-6">
          <h2 className="text-2xl font-semibold mb-3">
            🎯 Mission of This Blog
          </h2>
          <p>
            To simplify learning, share real experiences, and inspire people to build, grow, and stay curious 🚀
          </p>
        </div>

        <p>
          Thanks for being here — it truly means a lot 😊  
          Feel free to explore, read, and share your thoughts in the comments.
        </p>

        <p className="font-semibold text-indigo-500 dark:text-indigo-400">
          — Vaibhav Kumar
        </p>
      </div>
    </div>
  );
}
