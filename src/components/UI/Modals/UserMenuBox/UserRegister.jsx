import React, { useState } from "react";
import { auth } from "../../../../config/Firebase.jsx";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const UserRegister = ({
  handleOpenLogIn,
  handleOpenProfile,
  toggleUserMenu,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // Optional: Add additional scopes
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in with Google:", user.email);
        // Optionally, handle additional tasks like navigation or profile setup here
        handleOpenProfile(); // Assuming this is a method to handle post-sign-in actions
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during Google sign-in:", errorCode, errorMessage);
        // Optionally, handle error states, such as showing an error message to the user
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents form from refreshing the page

    // Basic validation for matching passwords
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      // Here you can set an error state and show an error message to the user
      return;
    }

    // Firebase user registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User registered successfully with email:", user.email);
        // Optionally handle user profile setup or navigation here
        handleOpenProfile(); // or any other post-registration logic
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during registration:", errorCode, errorMessage);
        // Handle errors here, such as displaying a notification to the user
      });
  };

  return (
    <div>
      <p className="pt-2 text-xl font-bold">Register</p>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              <i className="mr-2 fa-regular fa-check"></i> Register
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4">
          {/* Placeholder for Google Sign-In Button for Registration */}
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 flex items-center justify-center w-full max-w-md px-5 py-2.5 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            <i className="mr-2 fab fa-google"></i> Register with Google
          </button>
          <div>
            <button
              onClick={handleOpenLogIn}
              className="cursor-pointer hover:underline hover:text-gray-700"
            >
              Already registered? Log in now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
