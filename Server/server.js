import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// Session setup (required for Passport)
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🔹 Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

// 🔹 Database + Server Start
const PORT = 8080;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}
).catch((err) => console.error("❌ DB connection error:", err));