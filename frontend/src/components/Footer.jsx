export default function Footer() {
  return (
    <footer
      className="
        mt-14
        relative
        bg-white/80 dark:bg-[#0f172a]/70
        backdrop-blur-xl
        border-t border-indigo-100 dark:border-indigo-900
        shadow-[0_-10px_30px_rgba(0,0,0,0.05)]
      "
    >
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Top Section */}
        <div className="text-center">

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Blog.By.Vaibhav
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            MERN Based Personal Blogging Platform ✨
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-5">

            <a
              href="https://www.linkedin.com/in/vaibhavkr87"
              target="_blank"
              className="px-4 py-2 rounded-xl 
              bg-white dark:bg-gray-800 
              border dark:border-gray-700
              hover:bg-indigo-100 dark:hover:bg-gray-700 
              transition"
            >
              💼 LinkedIn
            </a>

            <a
              href="https://github.com/vaibhavkr87"
              target="_blank"
              className="px-4 py-2 rounded-xl 
              bg-white dark:bg-gray-800 
              border dark:border-gray-700
              hover:bg-indigo-100 dark:hover:bg-gray-700 
              transition"
            >
              💻 GitHub
            </a>

            <a
              href="https://instagram.com/_vaibhavkr03_/"
              target="_blank"
              className="px-4 py-2 rounded-xl 
              bg-white dark:bg-gray-800 
              border dark:border-gray-700
              hover:bg-indigo-100 dark:hover:bg-gray-700 
              transition"
            >
              📸 Instagram
            </a>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-6"></div>

        {/* Bottom Text */}
        <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
          © {new Date().getFullYear()} <strong>Vaibhav Kumar</strong> — All rights reserved.
        </p>

      </div>
    </footer>
  );
}
