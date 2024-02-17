// server.js (backend)
import path from "path";

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(cors());

app.get("/articles", async (req, res) => {
  const numOfArticles = req.query.num || 2;
  const API_KEY = process.env.NYT_API_KEY;

  try {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data.results.slice(0, numOfArticles));
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ message: "Error fetching articles" });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server IS running on port ${PORT}`));
