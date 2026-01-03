import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message
      });

      toast.success("Message sent successfully 🎉");

      setName("");
      setEmail("");
      setMessage("");

    } catch (err) {
      console.log(err);
      toast.error("Failed to send message ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="
        max-w-4xl w-full 
        bg-white dark:bg-[#0f172a] 
        rounded-3xl shadow-2xl 
        border border-indigo-100 dark:border-gray-700 
        p-6 md:p-10
      ">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Let’s Connect 👋
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
          Have something to say? Contact me anytime 😊
        </p>

        {/* GRID LAYOUT */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">

          {/* LEFT SECTION */}
          <div className="space-y-4">

            {/* Email */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-[#111827] border dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200">
                📧 <strong>Email</strong>
              </p>

              <a 
                href="mailto:vaibhavkr87097@gmail.com"
                className="text-indigo-600 dark:text-indigo-400 underline"
              >
                vaibhavkr87097@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-[#111827] border dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200">
                🏠 <strong>Location</strong>
              </p>

              <p className="text-gray-600 dark:text-gray-400">
                India 🇮🇳
              </p>
            </div>

            {/* SOCIAL ICON BUTTONS — PREMIUM STYLE */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-[#111827] border dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200 mb-3">
                🔗 <strong>Social Profiles</strong>
              </p>

              <div className="flex flex-wrap gap-3">

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/vaibhavkr03/"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl 
                  bg-blue-600 hover:bg-blue-700 
                  text-white shadow hover:scale-105 transition"
                >
                  🔵 LinkedIn
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/vaibhavkr87"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl 
                  bg-gray-900 hover:bg-black 
                  text-white shadow hover:scale-105 transition"
                >
                  🐙 GitHub
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/_vaibhavkr03_/"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl 
                  bg-gradient-to-r from-pink-500 to-yellow-400 
                  hover:opacity-90 text-white shadow hover:scale-105 transition"
                >
                  📸 Instagram
                </a>

              </div>
            </div>

          </div>

          {/* RIGHT — CONTACT FORM */}
          <form onSubmit={submit} className="space-y-4">

            <input
              className="w-full border p-3 rounded-xl dark:bg-gray-800 dark:border-gray-700"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="w-full border p-3 rounded-xl dark:bg-gray-800 dark:border-gray-700"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              className="w-full border p-3 rounded-xl h-28 dark:bg-gray-800 dark:border-gray-700"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="
                w-full bg-indigo-600 hover:bg-indigo-700 
                dark:bg-indigo-500 dark:hover:bg-indigo-600 
                text-white py-3 rounded-xl font-medium 
                transition active:scale-95 shadow
              "
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-5">
          I usually reply within 24 hours 🙂
        </p>

      </div>
    </div>
  );
}
