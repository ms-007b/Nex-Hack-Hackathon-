import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  githubId: { type: String },
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
});

export default mongoose.model("User", userSchema);
