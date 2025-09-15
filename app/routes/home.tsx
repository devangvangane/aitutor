import type { Route } from "./+types/home";
import { useLanguage } from "../contexts/LanguageContext";
import { Link, useNavigate } from "react-router"; // ✅ useNavigate for redirect
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Education Portal" },
    { name: "description", content: "Login to access your education portal" },
  ];
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Sign In Function
  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }

      // Example API call (replace with your backend endpoint)
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // ✅ Store token if provided
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Login successful!");
      navigate("/dashboard"); // ✅ redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center relative">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === "en"
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === "hi"
                ? "bg-orange-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            हि
          </button>
          <button
            onClick={() => setLanguage("gu")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === "gu"
                ? "bg-green-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            ગુ
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <div className="flex gap-2 justify-center">
              <Link
                to="/language"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {t("language.select")}
              </Link>
              <Link
                to="/standards"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                {t("standards.select")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
