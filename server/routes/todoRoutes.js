const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/deleted", async (req, res) => {
  try {
    const deletedTodos = await Todo.find({ deleted: true });
    res.json(deletedTodos);
  } catch (err) {
    console.error("Error fetching deleted todos:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ deleted: false }).select("-deleted");
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, deadline, category, status } = req.body;

  const todo = new Todo({
    title,
    description,
    deadline,  
    category,
    status,
  });

  try {
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});


// ✅ Update a task
router.put("/:id", async (req, res) => {
  const { title, description, deadline, category, status } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description, deadline, category, status },
    { new: true }
  );
  res.json(updated);
});

// ✅ Soft delete
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