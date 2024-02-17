import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "build")));

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

// Serve any other route to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server IS running on port ${PORT}`));
