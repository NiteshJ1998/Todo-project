const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes); // protected

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Connect DB & start server
connectDB();
app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
