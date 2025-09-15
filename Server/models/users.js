import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  name: String,
  email: String,
});

export default mongoose.model("User", userSchema);
