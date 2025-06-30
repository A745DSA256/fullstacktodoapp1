const Todo = require("../models/Todo");


const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ deleted: { $ne: true } }); 
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a Todo
const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a Todo
const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Soft Delete a Todo
const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Deleted successfully", todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
