import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("User Registration successful!");
        window.location.href = "/login";
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url('./src/assets/login_bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSignup}
        className="bg-white/80 p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
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
      </form>
    </div>
  );
}