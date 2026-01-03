import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

export default function Login({ setAuth, close }) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [error,setError] = useState("");

  const login = async (e)=>{
    e.preventDefault();
    setError("");

    try{

      await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      setAuth(true);

      toast.success("Logged in successfully 🎉");

      close();

    }catch(err){
      console.log(err);

      toast.error("Invalid login credentials ❌");

      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-[#0f172a] dark:text-white p-6 rounded-xl w-[400px] shadow-xl">

        {/* CLOSE */}
        <button
          type="button"
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold">Admin Login</h2>

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}

        <form onSubmit={login} className="space-y-3 mt-3">

          <input
            className="w-full border p-2 rounded dark:bg-[#020617] dark:border-gray-700"
            placeholder="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              className="w-full border p-2 rounded pr-10 dark:bg-[#020617] dark:border-gray-700"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />

            {/* 👁 Toggle button */}
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-500"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button
            type="submit"
            className="
              bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
              text-white px-4 py-2 rounded w-full
              transition transform duration-200 active:scale-95
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
