// AddTaskForm.js
import React from "react";
import "./AddTask.css";

function AddTaskForm({
  newTask,
  setNewTask,
  addTask,
  updateTask,
  editingTask,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(e); // Call updateTask if we are editing
    } else {
      addTask(e); // Otherwise, add a new task
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={newTask.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={newTask.description}
        onChange={handleInputChange}
        required
      ></textarea>
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}

export default AddTaskForm;
