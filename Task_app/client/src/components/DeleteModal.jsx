import React from "react";

function DeleteModal({ showModal, closeModal, deleteTask }) {
  return (
    showModal && (
      <div className="modal show">
        <div className="modal-content">
          <h3>Are you sure you want to delete this task?</h3>
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={deleteTask}>
            Confirm
          </button>
        </div>
      </div>
    )
  );
}

export default DeleteModal;
