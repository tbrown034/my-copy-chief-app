import React, { useEffect, useState } from "react";
import Header from "./components/UI/Layout/Header";
import Home from "./components/UI/Layout/Home";
import GameBoard from "./components/UI/Layout/GameBoard";
import Footer from "./components/UI/Layout/Footer";
import { useDarkMode } from "./hooks/useDarkMode";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./config/Firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

import SettingsBox from "./components/UI/Modals/SettingBoxes/SettingsBox";
import AboutBox from "./components/UI/Modals/AboutBox";
import HowToBox from "./components/UI/Modals/HowToBox/HowToBox";
import UserMenuBox from "./components/UI/Modals/UserMenuBox/UserMenuBox";
import { fetchMostPopular } from "./utils/apiFetch";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [showHowTo, setShowHowTo] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [duration, setDuration] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [numOfHeadlines, setNumOfHeadlines] = useState(2);
  const [showUserMenu, setUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuView, setUserMenuView] = useState("");
  const [user, setUser] = useState(null);
  const [isDailyGame, setIsDailyGame] = useState(false);
  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [gameMetadata, setGameMetadata] = useState(null);
  const [hasWonDailyGame, setHasWonDailyGame] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const calculateNextEditionNumber = async () => {
    const puzzlesRef = collection(db, "dailyPuzzles");
    const lastPuzzleQuery = query(
      puzzlesRef,
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(lastPuzzleQuery);
    let nextEditionNumber = 1; // Default to 1 if no puzzles are found
    querySnapshot.forEach((doc) => {
      if (doc.exists() && doc.data().metadata && doc.data().metadata.edition) {
        nextEditionNumber = doc.data().metadata.edition + 1;
      }
    });
    return nextEditionNumber;
  };

  const formatDate = (date) => {
    // Options for US date format with Eastern Timezone
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/New_York",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatTime = (date) => {
    // Options for 12-hour time format with Eastern Timezone
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Function to get a Firestore document reference for a puzzle on a specific date.
  const getPuzzleDateRef = (date) => doc(db, "dailyPuzzles", formatDate(date));

  /**
   * Fetches and stores the daily headlines.
   * If today's puzzle doesn't exist, it fetches new headlines and stores them.
   * If it fails to fetch new headlines, it throws an error.
   */
  const fetchAndStoreHeadlines = async () => {
    const today = new Date();

    const docRef = getPuzzleDateRef(today);

    // Attempt to get today's puzzle from Firestore.
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Log the use of existing puzzle data.
      console.log("Using existing daily puzzle from Firestore.");
      return docSnap.data().articles; // Use the existing articles array.
    }

    // Fetch new headlines as today's puzzle does not exist.
    const articles = await fetchMostPopular(); // This function must always return an array.
    if (articles.length === 0) {
      // Log the error when no articles are fetched.
      console.error("Failed to fetch articles for the daily puzzle.");
      throw new Error("No articles fetched");
    }

    // Calculate the next edition number for the new puzzle.
    const nextEdition = await calculateNextEditionNumber();

    // Store the new puzzle data in Firestore.
    await setDoc(docRef, {
      articles,
      createdAt: serverTimestamp(),
      metadata: {
        edition: nextEdition,
        winCount: 0,
      },
    });

    // Log the creation of a new puzzle.
    console.log("New daily puzzle created with edition:", nextEdition);
    return articles; // Return the newly fetched articles.
  };

  /**
   * Sets up and starts the daily game by fetching headlines and setting up game metadata.
   * It also handles any errors during the game setup.
   */
  const playDailyGame = async () => {
    try {
      const articles = await fetchAndStoreHeadlines();
      if (articles && articles.length > 0) {
        const today = new Date();
        const currentEdition = await getCurrentEdition(today);
        setGameMetadata({
          id: formatDate(today),
          createdAt: today.toISOString(),
          edition: currentEdition, // Set the edition here
        });
        setDailyPuzzle(articles);
        setIsDailyGame(true);
        setGameDisplay(true);
        setShowHowTo(true);
      } else {
        console.log("No articles available for the daily puzzle.");
      }
    } catch (error) {
      console.error("Error playing the daily game:", error);
    }
  };

  const getCurrentEdition = async (date) => {
    const docRef = getPuzzleDateRef(date);
    const docSnap = await getDoc(docRef);
    if (
      docSnap.exists() &&
      docSnap.data().metadata &&
      docSnap.data().metadata.edition
    ) {
      return docSnap.data().metadata.edition; // Return the current edition number.
    } else {
      console.error(
        "No metadata found for the current edition, defaulting to 1."
      );
      return 1; // Default to edition 1 if no metadata is found.
    }
  };

  const updateUserWinCount = async (userId) => {
    if (!userId) {
      console.error("User ID is not available. Cannot update win count.");
      return;
    }
    const userRef = doc(db, "users", userId);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentWins = userData.wins || 0;
        await updateDoc(userRef, {
          wins: currentWins + 1,
        });
        console.log("Win count updated successfully for user:", userId);
      } else {
        console.log("User document does not exist in Firestore:", userId);
      }
    } catch (error) {
      console.error("Error updating win count for user:", userId, error);
    }
  };

  const handleUserAction = (action) => {
    if (isLoggedIn && (action === "login" || action === "register")) {
      console.log("Error: You are already logged in.");
      return;
    }
    if (!isLoggedIn && action === "profile") {
      console.log("Error: You must be logged in to view your profile.");
      return;
    }
    setUserMenu(true);
    setUserMenuView(action);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        setUserMenu(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const toggleHowTo = () => setShowHowTo((prev) => !prev);
  const handleSetNumOfHeadlines = (num) => setNumOfHeadlines(num);
  const toggleAbout = () => setShowAbout((prev) => !prev);
  const handleDifficultyChange = (value) => setNumOfHeadlines(value);
  const handleDurationChange = (value) => setDuration(value);
  const toggleSettings = () => setShowSettings((prev) => !prev);
  const toggleUserMenu = () => setUserMenu((prev) => !prev);

  const playGame = () => {
    setGameDisplay(true);
    setShowHowTo(false);
    setShowSettings(false);
    setIsDailyGame(false); // Ensure this is reset for non-daily games
  };

  const restartGame = () => {
    setGameDisplay(false);
    setTimeout(() => setGameDisplay(true), 0);
  };

  const toggleHowToAndSettings = () => {
    setShowHowTo(false); // Close the HowTo box
    setShowSettings(true); // Open the Settings box
  };

  const showHomeScreen = () => {
    setGameDisplay(false); // Hide the game board
    setShowHowTo(false); // Ensure the HowToBox is closed
    setShowSettings(false); // Ensure the SettingsBox is closed
    // Add any other state resets you need here to ensure the home screen is shown
  };

  return (
    <div
      className={`flex flex-col min-h-screen justify-between gap-4 p-4 ${
        isDarkMode ? "dark:bg-zinc-900 dark:text-white" : ""
      }`}
    >
      <Header
        darkMode={isDarkMode}
        setDarkMode={setDarkMode}
        toggleSettings={toggleSettings}
        gameDisplay={gameDisplay}
        setGameDisplay={setGameDisplay}
        toggleHowTo={toggleHowTo}
        handleDurationChange={handleDurationChange}
        handleDifficultyChange={handleDifficultyChange}
        setNumOfHeadlines={setNumOfHeadlines}
        setDuration={setDuration}
        playGame={playGame}
        toggleAbout={toggleAbout}
        isLoggedIn={isLoggedIn}
        handleUserAction={handleUserAction}
        playDailyGame={playDailyGame}
      />
      {!gameDisplay ? (
        <Home
          setShowHowTo={setShowHowTo}
          isLoggedIn={isLoggedIn}
          handleUserAction={handleUserAction}
          user={user}
          playDailyGame={playDailyGame}
        />
      ) : (
        <GameBoard
          setGameDisplay={setGameDisplay}
          numOfHeadlines={numOfHeadlines}
          duration={duration}
          playGame={playGame}
          updateUserWinCount={updateUserWinCount}
          user={user} // Pass the current user state as a prop
          playDailyGame={playDailyGame}
          isDailyGame={isDailyGame}
          setIsDailyGame={setIsDailyGame}
          dailyPuzzle={dailyPuzzle} // Ensure this prop is correctly used within GameBoard
          gameMetadata={gameMetadata}
          formatTime={formatTime}
        />
      )}
      <Footer
        toggleAbout={toggleAbout}
        toggleHowToPlay={toggleHowTo}
        toggleSettings={toggleSettings}
      />
      {showHowTo && (
        <HowToBox
          setDuration={setDuration}
          showHomeScreen={showHomeScreen}
          toggleHowToAndSettings={toggleHowToAndSettings}
          duration={duration}
          toggleHowTo={toggleHowTo}
          handleSetNumOfHeadlines={handleSetNumOfHeadlines}
          setNumOfHeadlines={setNumOfHeadlines}
          numOfHeadlines={numOfHeadlines}
          handleDurationChange={handleDurationChange}
          toggleAbout={toggleAbout}
          playGame={playGame}
          setShowHowTo={setShowHowTo}
          showHowTo={showHowTo}
          isDarkMode={isDarkMode}
          handleDifficultyChange={handleDifficultyChange}
        />
      )}
      {showAbout && <AboutBox toggleAbout={toggleAbout} />}
      {showSettings && (
        <SettingsBox
          handleDifficultyChange={handleDifficultyChange}
          handleDurationChange={handleDurationChange}
          duration={duration}
          numOfHeadlines={numOfHeadlines}
          toggleSettings={toggleSettings}
          playGame={playGame}
          showHowTo={showHowTo}
          isDarkMode={isDarkMode}
          playDailyGame={playDailyGame}
        />
      )}
      {showUserMenu && (
        <UserMenuBox
          toggleUserMenu={toggleUserMenu}
          userMenuView={userMenuView}
          setUserMenuView={setUserMenuView}
          handleLogOut={handleLogOut}
        />
      )}
    </div>
  );
}

export default App;
