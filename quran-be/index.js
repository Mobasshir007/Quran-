import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/quran", async (req, res) => {
  try {
    const response = await axios.get("https://equran.id/apidev");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Quran data" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
