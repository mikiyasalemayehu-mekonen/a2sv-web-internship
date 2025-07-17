Contact Form React Application
Project Description
This is a simple Contact Form application built using React and the react-hook-form library. The form includes fields for Name, Email, and Message, with validation to ensure all fields are filled and the email follows a valid format. The form is styled with Tailwind CSS for a clean and responsive user interface. Upon submission, the form data is logged to the console, and the form resets.

Technologies Used

React: JavaScript library for building user interfaces.
react-hook-form: Library for managing form state and validation.
Tailwind CSS: Utility-first CSS framework for styling.
JavaScript (ES6+): For modern JavaScript syntax.
Babel: For JSX transformation in the browser.

Setup Instructions

Clone the repository:git clone https://github.com/mikiyasalemayehu-mekonen/a2sv-web-internship/
cd contact-form


Install dependencies:npm install
npm install react-hook-form
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Configure Tailwind CSS:
Update tailwind.config.js with:module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};


Add to src/index.css:@tailwind base;
@tailwind components;
@tailwind utilities;




Run the application:npm start

The app will be available at http://localhost:3000.

Usage

Fill in the Name, Email, and Message fields.
The form validates inputs:
Name: Required, cannot be empty.
Email: Required, must be a valid email format (e.g., user@example.com).
Message: Required, cannot be empty.


Error messages appear below fields if validation fails.
Click "Submit" to log the form data to the console and reset the form.

Testing

Empty fields: Try submitting with empty fields to see error messages.
Invalid email: Enter an invalid email (e.g., "invalid") to check email validation.
Valid submission: Enter valid data and submit to verify console output and form reset.
Responsiveness: Resize the browser to ensure the form is mobile-friendly.


