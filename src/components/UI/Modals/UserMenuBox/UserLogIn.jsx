import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../../../config/Firebase"; // Ensure db is imported here
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

export const UserLogin = ({
  toggleUserMenu,
  handleUserAction, // Ensure this prop is used or remove it if unnecessary
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
      const { user } = result;
      console.log("Google sign-in result:", user);

      // Check Firestore to see if the user already exists
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      // If the user doesn't exist in Firestore, add them
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
      {error && <p className="text-red-500">{error}</p>}
      <div>
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
              <label
                htmlFor="email"
                className="block font-medium text-gray-900"
              >
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
    </div>
  );
};

export default UserLogin;
