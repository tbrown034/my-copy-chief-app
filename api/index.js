import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(cors());

// Assuming you're using async functions for fetching data
app.get("/articles", async (req, res) => {
  const numOfArticles = req.query.num || 2; // Default to fetching 2 articles if no specific number is provided
  const API_KEY = process.env.NYT_API_KEY; // Your New York Times API Key from .env

  try {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data.results.slice(0, numOfArticles));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching articles" });
  }
});

// Export the app for Vercel
export default app;
