import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

//  USER REGISTRATION
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//  FOR REGISTERED USERS

router.post("/login", (req, res, next) => {
  res.status(501).json({ message: "Local login not implemented yet" });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:8080/login" }),
  (req, res) => {
    res.redirect("http://localhost:8080/dashboard");
  }
);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "http://localhost:8080/login" }),
  (req, res) => {
    res.redirect("http://localhost:8080/dashboard");
  }
);
// GET CURRENT USER
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});
// LOGOUT
router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
});
export default router;