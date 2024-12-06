import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import DeleteModal from "./components/DeleteModal";
import Header from "./components/Header"; // Add Header for the light/dark mode toggle
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) =>
        console.error("There was an error fetching tasks!", error)
      );
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      axios
        .post("http://localhost:5000/api/tasks", newTask)
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask({ title: "", description: "" });
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
  };

  const updateTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      axios
        .put(`http://localhost:5000/api/tasks/${editingTask._id}`, newTask)
        .then((response) => {
          const updatedTasks = tasks.map((task) =>
            task._id === editingTask._id ? response.data : task
          );
          setTasks(updatedTasks);
          setNewTask({ title: "", description: "" });
          setEditingTask(null); // Clear editing state after update
        })
        .catch((error) => console.error("Error updating task:", error));
    }
  };

  const markComplete = (id) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { status: "completed" })
      .then(() => {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, status: "completed" } : task
          )
        );
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const openDeleteModal = (task) => {
    setShowModal(true);
    setTaskToDelete(task);
  };

  const closeModal = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const deleteTask = () => {
    if (taskToDelete) {
      axios
        .delete(`http://localhost:5000/api/tasks/${taskToDelete._id}`)
        .then(() => {
          setTasks(tasks.filter((task) => task._id !== taskToDelete._id));
          closeModal();
        })
        .catch((error) => console.error("Error deleting task:", error));
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <div className="main-container">
        <section className="add-task-section">
          <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
            updateTask={updateTask}
            editingTask={editingTask}
          />
        </section>

        <section className="task-list-section">
          <h2>Task List</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              markComplete={markComplete}
              editTask={editTask}
              openDeleteModal={openDeleteModal}
            />
          )}
        </section>
      </div>

      <DeleteModal
        showModal={showModal}
        closeModal={closeModal}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
