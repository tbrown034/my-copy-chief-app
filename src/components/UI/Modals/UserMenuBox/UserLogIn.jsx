import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../config/Firebase.jsx";

export const UserLogin = ({
  toggleUserMenu,
  handleUserAction,
  setUserMenuView,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new submission
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully"); // Use an alert for user feedback
      toggleUserMenu(); // Close the user menu upon successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message); // Set error message to display to the user
      alert("Error logging in: " + error.message); // Display error to the user
    }
  };
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user:", user, "token:", token);
      setUserMenuView("profile");
      // Handle successful sign in here (e.g., update application state, redirect, etc.)
    } catch (error) {
      // Handle Errors here.
      console.error("Error logging in with Google:", error.code, error.message);
      setError(error.message); // Update the state to display the error message
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col items-center justify-center p-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full mb-4 px-5 py-2.5 text-sm font-medium text-center text-white bg-[#4285F4] rounded-lg hover:bg-[#357ae8]"
        >
          <i className="fab fa-google"></i> Sign in with Google
        </button>
        <div className="flex items-center w-full mb-4">
          <hr className="w-full" />
          <p className="px-2">OR</p>
          <hr className="w-full" />
        </div>
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
              type="button"
              onClick={() => toggleUserMenu(false)}
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
          onClick={() => setUserMenuView("register")}
          className="mt-4 text-sm text-center text-gray-600 cursor-pointer hover:underline"
        >
          Not Registered Yet? Sign Up For Free Now!
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
