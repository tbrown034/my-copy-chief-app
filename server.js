import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Use CORS middleware to allow all origins
app.use(cors());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
