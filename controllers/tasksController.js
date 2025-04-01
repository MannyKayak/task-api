// in this file I'm writing all the utility functions that I need to complete the operations of my application, like adding tasks or showing them...

// import data from data/tasks
const tasks = require("../data/tasks");
const Task = require("../models/Task");

// function to get all the tasks as a json object
// const getTasks = (req, res) => {
//   res.json(tasks);
// };
// getTasks with Mongoose
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Errore nel recupero dei task" });
  }
};

// function to create a new task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    //   const newTask = {
    //     id: tasks.length + 1,
    //     title,
    //     completed: false,
    //   };
    const newTask = new Task({
      title: req.body.title,
      user: req.user.id,
    });
    await newTask.save();
    //   tasks.push(newTask);
    res.status(200).json(newTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Errore nella creazione del task", error: err.message });
  }
};

const updateTask = async (req, res) => {
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

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Errore durante l'aggiornamento del task",
    });
  }
};

const deleteTask = async (req, res) => {
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
    res.status(500).json({
      error: e.message,
      message: "Errore durante la cancellazione del task",
    });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
