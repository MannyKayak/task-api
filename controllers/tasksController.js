// in this file I'm writing all the utility functions that I need to complete the operations of my application, like adding tasks or showing them...

// import data from data/tasks
const Task = require("../models/Task");

// function to get all the tasks as a json object
// const getTasks = (req, res) => {
//   res.json(tasks);
// };
// getTasks with Mongoose
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user.userId,
    }).populate("user", "email role");

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("user", "email");
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};
// function to create a new task
const createTask = async (req, res, next) => {
  console.log("Utente proveniente dal middleware", req.user);
  try {
    const { title } = req.body;
    if (!title) {
      const err = new Error("Title is required");
      res.status(400);
      next(err);
    }
    //   const newTask = {
    //     id: tasks.length + 1,
    //     title,
    //     completed: false,
    //   };

    const newTask = new Task({
      title: req.body.title,
      user: req.user.userId,
    });
    await newTask.save();
    //   tasks.push(newTask);
    res.status(200).json(newTask);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  //   // get the right task to modify --> get the id of the task
  //   const taskToUpdate = tasks.find(
  //     (task) => task.id === parseInt(req.params.id)
  //   );
  //   if (!taskToUpdate) {
  //     return res.status(404).json({ error: "Task not found" });
  //   }
  //   // update the task
  //   const { title, completed } = req.body;
  //   taskToUpdate.title = title || taskToUpdate.title;
  //   taskToUpdate.completed = completed || taskToUpdate.completed;
  //   // return the updated task
  //   res.json(taskToUpdate);
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (task.user.toString() !== req.user.userId) {
      const err = new Error("YOu don't have the required permissions");
      err.status = 403;
      next(err);
    }

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (e) {
    next(e);
    res.status(500).json({
      error: e.message,
      message: "Errore durante l'aggiornamento del task",
    });
  }
};

const deleteTask = async (req, res, next) => {
  //   // get the right task to delete --> get the id of the task
  //   const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  //   if (index === -1) {
  //     return res.status(404).json({ error: "Task not found" });
  //   }
  //   // remove the task from the array
  //   const removed = tasks.splice(index, 1);
  //   // return a success message
  //   res.json(removed[0]);
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (e) {
    next(e);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getAllTasks };
