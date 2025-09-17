import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };
  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/auth/github";
  };
  // Capture token from OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
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
        onSubmit={handleLogin}
        className="bg-white/80 p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 rounded-lg focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded-lg focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg"
        >
          Log In
        </button>
        {/* OAuth */}
        <div className="mt-4 flex flex-col gap-2">
          <a
            href="http://localhost:8080/api/auth/google"
            className="w-full bg-white text-black py-2 rounded-lg"
          >
            Continue with Google
          </a>
          <a
            href="http://localhost:8080/api/auth/github"
            className="w-full bg-gray-800 text-white py-2 rounded-lg"
          >
            Continue with GitHub
          </a>
        </div>
        <p className="mt-4 text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline">
            Create one
          </Link>
        </p>
      </form >
    </div>
  );
}