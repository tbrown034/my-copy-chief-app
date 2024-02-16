// server.js (backend)

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(cors());

app.get("/articles", async (req, res) => {
  const numOfArticles = req.query.num || 2; // Example: Allow specifying number of articles through query params
  const API_KEY = process.env.NYT_API_KEY;

  try {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Slice the results to get the number of articles requested
    res.json(data.results.slice(0, numOfArticles));
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ message: "Error fetching articles" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
