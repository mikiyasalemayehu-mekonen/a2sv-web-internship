import { useForm } from "react-hook-form";
import { useState } from "react";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Contact Us
        </h2>
        {submitted && (
          <p className="text-green-600 font-medium mb-6 text-center animate-pulse">
            Form submitted successfully!
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`mt-2 block w-full p-3 border border-gray-300 rounded-lg transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className={`mt-2 block w-full p-3 border border-gray-300 rounded-lg transition-all duration-200 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className={`mt-2 block w-full p-3 border border-gray-300 rounded-lg transition-all duration-200 ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2`}
              rows="5"
              placeholder="Enter your message"
            ></textarea>
            {errors.message && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
