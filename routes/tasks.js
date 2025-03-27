// here it's where all the calls to the server are managed, so I'm going to use the functions in the taskController to do my stuff

const express = require("express");
const router = express.Router();

// import utility functions
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware); // apply auth middleware to all routes under /tasks

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
