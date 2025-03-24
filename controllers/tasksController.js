// in this file I'm writing all the utility functions that I need to complete the operations of my application, like adding tasks or showing them...

// import data from data/tasks
const tasks = require("../data/tasks");

// function to get all the tasks as a json object
const getTasks = (req, res) => {
  res.json(tasks);
};

// function to create a new task
const createTask = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  // create the response
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  // get the right task to modify --> get the id of the task
  const taskToUpdate = tasks.find(
    (task) => task.id === parseInt(req.params.id)
  );
  if (!taskToUpdate) {
    return res.status(404).json({ error: "Task not found" });
  }

  // update the task
  const { title, completed } = req.body;
  taskToUpdate.title = title || taskToUpdate.title;
  taskToUpdate.completed = completed || taskToUpdate.completed;
  // return the updated task
  res.json(taskToUpdate);
};

const deleteTask = (req, res) => {
  // get the right task to delete --> get the id of the task
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  // remove the task from the array
  const removed = tasks.splice(index, 1);
  // return a success message
  res.json(removed[0]);
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
