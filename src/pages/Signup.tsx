import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
      });
      alert("Account created!");
      navigate("/login");
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-pink-300 to-blue-400">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-6 text-white">Create Account</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 rounded-lg focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded-lg focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg"
        >
          Sign Up
        </button>

        <p className="mt-4 text-white">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
