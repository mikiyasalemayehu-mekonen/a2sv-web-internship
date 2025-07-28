"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || ""; // Safely handle null
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, OTP: otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Verification failed");

      router.push("/signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded shadow-md w-96 text-center"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Verify Email
        </h2>
        <p className="text-sm mb-6 text-gray-500">
          We sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={otp[index] || ""}
              onChange={(e) => {
                const newOtp = otp.split("");
                newOtp[index] = e.target.value;
                setOtp(newOtp.join(""));
              }}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <p className="text-sm text-gray-500 mb-6">
          You can request to <a>Resend code</a> in{" "}
          <span className="text-purple-500">0:30</span>
        </p>

        <button
          type="submit"
          className="w-full bg-[#c5bef4] text-white py-3 rounded-lg hover:bg-[#5c448f] transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
