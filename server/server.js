const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Use Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

//  Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});
