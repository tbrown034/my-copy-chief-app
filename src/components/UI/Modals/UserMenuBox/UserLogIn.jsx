import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../config/Firebase.jsx";

export const UserLogin = ({
  handleOpenRegister,
  handleOpenProfile,
  toggleUserMenu,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form from refreshing the page

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully:", userCredential.user);
      handleOpenProfile(); // Proceed to open the user profile or similar action
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Here you can handle errors, such as showing an error message to the user
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in with Google:", user.email);
        handleOpenProfile(); // Navigate to the user profile or similar action
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
        // Handle errors here, such as showing an error message to the user
      });
  };

  return (
    <div>
      <p className="pt-2 text-xl font-bold ">Log In</p>
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
              className="block w-full p-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm "
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
              className="block w-full p-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm "
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
        <div className="flex flex-col gap-4">
          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 flex items-center justify-center w-full max-w-md px-5 py-2.5 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            <i className="mr-2 fab fa-google"></i> Sign in with Google
          </button>
          <div>
            <button
              onClick={handleOpenRegister}
              className="cursor-pointer hover:underline hover:text-gray-700"
            >
              Not Registered Yet? Sign Up For Free Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
