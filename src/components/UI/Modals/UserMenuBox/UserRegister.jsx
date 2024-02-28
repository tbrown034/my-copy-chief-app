import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../config/Firebase"; // Ensure this path matches your project structure

export const UserRegister = ({ toggleUserMenu }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Enhanced state for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new submission

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered successfully:", userCredential.user);
      toggleUserMenu(false); // Close the UserMenuBox upon successful registration
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.code === "auth/email-already-in-use") {
        setError(
          "An account with this email already exists. Would you like to log in instead?"
        );
        // Optionally, show a button or link that directs the user to the login form
      } else {
        setError("Failed to register: " + error.message); // Provide specific error messages
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google");
      toggleUserMenu(false); // Close the UserMenuBox upon successful Google sign in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google: " + error.message);
    }
  };

  return (
    <div>
      <p className="pt-2 text-xl font-bold">Register</p>
      {error && <div className="my-2 text-sm text-red-500">{error}</div>}
      <div className="flex flex-col items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md gap-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="block w-full p-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
              placeholder="your-email@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full p-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => toggleUserMenu(false)}
              type="button"
              className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
            >
              <i className="mr-2 fa-regular fa-arrow-left"></i>Back
            </button>
            <button
              type="submit"
              className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
            >
              <i className="mr-2 fa-regular fa-check"></i> Register
            </button>
          </div>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 px-5 py-2.5 text-sm font-medium text-center text-white bg-[#4285F4] rounded-lg hover:bg-[#357ae8]"
        >
          <i className="mr-2 fab fa-google"></i>Sign in or Register with Google
        </button>
      </div>
    </div>
  );
};
