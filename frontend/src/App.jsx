import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PostDetails from "./pages/PostDetails";

import useDarkMode from "./hooks/useDarkMode";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

export default function App() {

  const [dark, setDark] = useDarkMode();
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const loadPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(Array.isArray(res.data) ? res.data.reverse() : []);
    } catch {
      setPosts([]);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout");
    setAuth(false);
    toast.success("Logged out 👋");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F3F6FF] dark:bg-[#0B1220] overflow-x-hidden">

        <Navbar
          auth={auth}
          onLoginClick={() => setShowLogin(true)}
          onLogout={logout}
          dark={dark}
          setDark={setDark}
        />

        {showLogin && (
          <Login setAuth={setAuth} close={() => setShowLogin(false)} />
        )}

        <Routes>
          <Route
            path="/"
            element={<Home posts={posts} auth={auth} loadPosts={loadPosts} />}
          />

          <Route path="/categories" element={<Categories posts={posts} />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/post/:id" element={<PostDetails auth={auth} />} />
        </Routes>

        <Footer />
      </div>

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
