import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../config/Firebase.jsx";

export const UserLogin = ({ toggleUserMenu }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      toggleUserMenu(); // Close the user menu upon successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google");
      toggleUserMenu(); // Close the user menu upon successful Google sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <p className="pt-2 text-xl font-bold">Log In</p>
      <div className="flex flex-col items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md gap-4"
        >
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
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleUserMenu}
              type="button"
              className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
            >
              <i className="mr-2 fa-regular fa-arrow-left"></i>Back
            </button>
            <button
              type="submit"
              className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
            >
              <i className="mr-2 fa-regular fa-check"></i> Enter
            </button>
          </div>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 flex items-center justify-center gap-2 p-2 px-4 text-white bg-[#4285F4] rounded-lg hover:bg-[#357ae8]"
        >
          <i className="fab fa-google"></i> Sign in with Google
        </button>
        <p
          onClick={() => {
            /* Function to switch to the registration view */
          }}
          className="mt-4 text-sm text-center text-gray-600 cursor-pointer hover:underline"
        >
          Not Registered Yet? Sign Up For Free Now!
        </p>
      </div>
    </div>
  );
};
