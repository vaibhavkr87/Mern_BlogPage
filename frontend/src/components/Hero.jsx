export default function Hero() {
  return (
    <section
      className="
      bg-gradient-to-r 
      from-indigo-500 via-purple-500 to-pink-500 
      dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700
      text-white py-14 md:py-20
      shadow-lg relative overflow-hidden
      "
    >

      {/* Soft Glow Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="w-60 h-60 bg-white/20 rounded-full blur-3xl absolute -top-10 -left-10"></div>
        <div className="w-72 h-72 bg-white/10 rounded-full blur-2xl absolute bottom-0 right-0"></div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 text-center relative">

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Welcome to My Blog
        </h1>

        <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto">
          Explore articles on technology, business, design & lifestyle ✨
        </p>

        {/* CTA Buttons (Optional but looks amazing 😎) */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#posts"
            className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 
            backdrop-blur border border-white/30 transition shadow-md"
          >
            Browse Posts
          </a>

          <a
            href="/contact"
            className="px-6 py-3 rounded-xl bg-black/20 hover:bg-black/30 
            backdrop-blur border border-white/30 transition shadow-md"
          >
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
}
