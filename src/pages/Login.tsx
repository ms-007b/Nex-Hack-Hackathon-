import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Github } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {fetchUser} = useAuth();
  const navigate = useNavigate();

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
      const res = await axios.post("http://localhost:8080/auth/login", {email, password,});
      await fetchUser
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful ✅");
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
          type="email"
          placeholder="Email"
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
        {message && <p>{message}</p>}
        {/* OAuth */}
        <div className="mt-4 flex flex-col gap-2">
          <a
            href="http://localhost:8080/auth/google"
            className="w-full bg-white text-black py-2 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </a>
          <a
            href="http://localhost:8080/auth/github"
            className="w-full bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <Github className="w-5 h-5 mr-2" />
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