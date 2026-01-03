import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ auth, onLoginClick, onLogout, dark, setDark }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const active = path =>
    location.pathname === path
      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
      : "text-gray-700 dark:text-gray-300";

  return (
    <nav className="
      bg-white/80 dark:bg-[#0f172a]/80 
      backdrop-blur border-b border-indigo-50 dark:border-indigo-900/40
      shadow dark:shadow-gray-900 sticky top-0 z-50
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1
          className="
            text-2xl font-bold text-indigo-600 dark:text-indigo-400
            transition transform duration-200 hover:scale-105
          "
        >
          VAIBHAV KUMAR
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-6">

          <li>
            <Link className={`${active("/")} relative group`} to="/">
              Home
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

          <li>
            <Link className={`${active("/categories")} relative group`} to="/categories">
              Categories
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

          <li>
            <Link className={`${active("/about")} relative group`} to="/about">
              About
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

          <li>
            <Link className={`${active("/contact")} relative group`} to="/contact">
              Contact
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

        </ul>

        {/* RIGHT SIDE DESKTOP */}
        <div className="hidden md:flex gap-3 items-center">

          {/* DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="
              bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
              text-white px-4 py-2 rounded 
              transition transform duration-200 
              active:scale-95
            "
          >
            {dark ? "🌙 Dark" : "☀ Light"}
          </button>

          {/* AUTH BUTTON */}
          {auth ? (
            <button
              onClick={onLogout}
              className="
                bg-red-600 hover:bg-red-700
                text-white px-4 py-2 rounded 
                transition transform duration-200 
                active:scale-95
              "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="
                bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                text-white px-4 py-2 rounded 
                transition transform duration-200 
                active:scale-95
              "
            >
              Login
            </button>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>


      {/* MOBILE PANEL */}
      <div
        className={`
          md:hidden w-full bg-white dark:bg-[#0f172a] border-t dark:border-gray-700
          transition-all duration-300 overflow-hidden
          ${menuOpen ? "max-h-96 py-4" : "max-h-0 py-0"}
        `}
      >
        <ul className="flex flex-col gap-4 px-6">

          <li>
            <Link
              className={`${active("/")} relative group`}
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

          <li>
            <Link
              className={`${active("/categories")} relative group`}
              to="/categories"
              onClick={() => setMenuOpen(false)}
            >
              Categories
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

          <li>
            <Link
              className={`${active("/about")} relative group`}
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

          <li>
            <Link
              className={`${active("/contact")} relative group`}
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
              <span className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-indigo-600 dark:bg-indigo-400 
                group-hover:w-full transition-all duration-300
              " />
            </Link>
          </li>

          {/* DARK + AUTH */}
          <li className="flex gap-3 pt-3">

            <button
              onClick={() => setDark(!dark)}
              className="
                bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                text-white px-4 py-2 rounded 
                transition transform duration-200 
                active:scale-95
              "
            >
              {dark ? "🌙 Dark" : "☀ Light"}
            </button>

            {auth ? (
              <button
                onClick={() => { onLogout(); setMenuOpen(false); }}
                className="
                  bg-red-600 hover:bg-red-700
                  text-white px-4 py-2 rounded 
                  transition transform duration-200 
                  active:scale-95
                "
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => { onLoginClick(); setMenuOpen(false); }}
                className="
                  bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                  text-white px-4 py-2 rounded 
                  transition transform duration-200 
                  active:scale-95
                "
              >
                Login
              </button>
            )}

          </li>
        </ul>
      </div>
    </nav>
  );
}
