"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!formData.name || formData.name.length < 2) {
      setError("Name must be at least 2 characters long");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      const res = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Signup successful! Please verify your email.");
        setTimeout(
          () =>
            router.push(
              `/verify-email?email=${encodeURIComponent(formData.email)}`
            ),
          2000
        );
       
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className=" mx-auto  p-8 ">
      <h2 className="font-poppins font-black text-[32px] leading-[120%] text-center align-middle text-black mb-6">
        Sign Up Today!
      </h2>

      <div className="flex justify-center">
        <button className="w-[402px] h-[40px] flex items-center justify-center gap-[10px] border border-gray-300 rounded-[5px] px-4 py-3 text-blue-900 font-bold  opacity-100">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Sign Up with Google
        </button>
      </div>


      <div className="flex items-center justify-center text-gray-500 my-4">
        <div className="w-27 border-t border-gray-300"></div>
        <span className="px-3">Or{"  "} Sign Up with Email</span>
        <div className="w-27 border-t border-gray-300"></div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4   px-100">
        <div>
          <label htmlFor="name" className="block text-indigo-900 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-2 border rounded-lg"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-indigo-900 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full p-2 border rounded-lg"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-indigo-900 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-1xl"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-indigo-900 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-900 text-white rounded-lg hover:bg-indigo-700"
        >
          Continue
        </button>
      </form>
      <p className="text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-900 hover:underline font-medium">
          Login
        </a>
      </p>
      <p className="text-center text-gray-500 text-sm mt-2">
        By clicking 'Continue', you acknowledge that you have read<br></br> and
        accepted our{" "}
        <a className="text-blue-900 hover:underline"> Terms of Service </a> and{" "}
        <a className="text-blue-900 hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
}
