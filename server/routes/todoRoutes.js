const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");


router.get("/deleted", async (req, res) => {
  try {
    const deletedTodos = await Todo.find({ deleted: true });
    res.json(deletedTodos);
  } catch (err) {
    console.error("Error fetching deleted todos:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Regular CRUD routes after
router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.get('/test-deleted', (req, res) => {
  
});

// Soft delete (not permanent)
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;
