import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();   // ✅ create app FIRST

// ----- Middleware -----
app.use(cors({
  origin: ["http://localhost:5173",
  "https://mern-blog-page-3ocqudmzz-vaibhavkr87097gmailcoms-projects.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());   // ✅ now it's fine
app.use("/api/contact", contactRoutes);


// ----- DB -----
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ----- Routes -----
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);


// ----- Start server -----
app.listen(5000, () => console.log("Server running on port 5000"));
