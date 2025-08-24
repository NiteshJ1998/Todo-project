const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create todo for logged-in user
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed || false,
      user: req.userId, // 👈 link todo to user
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // only update if it belongs to user
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete todo
const deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
