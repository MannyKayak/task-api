require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const taskRouter = require("./routes/tasks"); // import the tasks route from /routes/tasks.js
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Middleware to parse JSON request bodies
app.use(express.json());
// inject the tasks route this means that all the .get, .post... stuff is managed in the file tasks.js
// post --> send info to server
app.use("/tasks", taskRouter);
app.use("/auth", authRoutes);
app.use(errorHandler);
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
