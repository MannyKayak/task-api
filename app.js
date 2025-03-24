const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks"); // import the tasks route from /routes/tasks.js

// Middleware to parse JSON request bodies
app.use(express.json());
// inject the tasks route this means that all the .get, .post... stuff is managed in the file tasks.js
// post --> send info to server
app.use("/tasks", taskRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
