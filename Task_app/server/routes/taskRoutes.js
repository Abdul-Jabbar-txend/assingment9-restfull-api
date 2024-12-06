const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// POST /api/tasks: Add a new task
router.post("/", taskController.addTask);

// GET /api/tasks: Retrieve all tasks
router.get("/", taskController.getAllTasks);

// PUT /api/tasks/:id: Update a task by its ID
router.put("/:id", taskController.updateTask);

// DELETE /api/tasks/:id: Delete a task by its ID
router.delete("/:id", taskController.deleteTask);

module.exports = router;
