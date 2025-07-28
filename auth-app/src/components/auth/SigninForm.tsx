"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

export default function SigninForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className=" mx-auto mt-20  p-8 ">
      <h2 className="font-black text-[32px] leading-[120%] text-center align-middle font-[Poppins] mb-6 text-black ">
        Welcome Back,
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6  px-100">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-gray-700 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-gray-700 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-700 text-white py-2  transition rounded-4xl"
        >
          Login
        </button>
        <div className="text-center  text-gray-600 mt-4 text-1xl">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-900 hover:underline font-medium "
          >
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
