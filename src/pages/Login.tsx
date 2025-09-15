import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-pink-300 to-blue-400">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-6 text-white">WOMEN SAFEGUARD</h1>

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
      </div>
    </div>
  );
}
