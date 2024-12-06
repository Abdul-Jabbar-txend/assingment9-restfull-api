import React from "react";

function TaskList({ tasks, markComplete, editTask, openDeleteModal }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task">
          <h3>Task Title:{task.title}</h3>
          <p>Description:{task.description}</p>
          <p>Status: {task.status}</p>
          <button className="complete" onClick={() => markComplete(task._id)}>
            Mark as Complete
          </button>
          <button className="edit" onClick={() => editTask(task)}>
            Edit
          </button>
          <button className="delete" onClick={() => openDeleteModal(task)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
