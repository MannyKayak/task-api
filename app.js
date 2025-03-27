require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const taskRouter = require("./routes/tasks"); // import the tasks route from /routes/tasks.js
const authRoutes = require("./routes/auth");

// Middleware to parse JSON request bodies
app.use(express.json());
// inject the tasks route this means that all the .get, .post... stuff is managed in the file tasks.js
// post --> send info to server
app.use("/tasks", taskRouter);
app.use("/auth", authRoutes);

connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
