import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// hash admin password ON START
let hashedPassword;
bcrypt.hash(ADMIN_PASSWORD, 10).then(hash => hashedPassword = hash);

// LOGIN
router.post("/login", async (req,res)=>{
  const { email, password } = req.body;

  if(email !== ADMIN_EMAIL)
    return res.status(401).json({message:"Invalid email"});

  const valid = await bcrypt.compare(password, hashedPassword);
  if(!valid) return res.status(401).json({message:"Invalid password"});

  const token = jwt.sign({ role:"admin" }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"strict"
  });

  res.json({message:"Logged in"});
});

// LOGOUT
router.post("/logout",(req,res)=>{
  res.clearCookie("token");
  res.json({message:"Logged out"});
});

export default router;
