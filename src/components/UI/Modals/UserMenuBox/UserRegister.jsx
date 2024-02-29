import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../../../config/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const UserRegister = ({ toggleUserMenu, setUserMenuView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      alert("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(
        "User registered successfully with email/password:",
        userCredential.user
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userName,
        createdAt: new Date().toISOString(),
      });
      console.log(
        "Firestore document created for email/password user:",
        userCredential.user.uid
      );
      alert("Registration successful! Redirecting to your profile...");
      setUserMenuView("profile");
    } catch (error) {
      console.error("Error during email/password registration:", error);
      setError(error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      console.log("Google sign-in result:", user);
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: user.displayName || "Anonymous User",
          createdAt: new Date().toISOString(),
        });
        console.log("New Google user added to Firestore:", user.uid);
        alert("Welcome! Your account has been created.");
      } else {
        console.log("Existing Google user logged in:", user.uid);
      }
      setUserMenuView("profile"); // Navigate to the profile view
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError(`Error signing in with Google: ${error.message}`);
      alert(`Error signing in with Google: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full mb-4 px-5 py-2.5 text-sm font-medium text-center text-white bg-[#4285F4] rounded-lg hover:bg-[#357ae8]"
        >
          <i className="fab fa-google"></i> Register with Google
        </button>
        <div className="flex items-center w-full mb-4">
          <hr className="w-full" />
          <p className="px-2">OR</p>
          <hr className="w-full" />
        </div>
        <p className="pt-2 text-xl font-bold text-center">
          Register with Email
        </p>
        {error && <div className="my-2 text-sm text-red-500">{error}</div>}
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
      </div>
    </div>
  );
};

export default UserRegister;
