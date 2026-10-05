import React from "react";
import { useState } from "react";
import Button from "../Button/Button";
import "./DeleteWithConfirm.css";

function DeleteWithConfirm({ onDelete, modalMessage, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsOpen(true);
  };
  const handleClose = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsOpen(false);
  };
  const handleConfirm = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    onDelete();
    setIsOpen(false);
  };
  return (
    <>
      <Button
        text="✕"
        className="delete-icon-btn"
        type="button"
        onClick={handleOpen}
        title={title}
      />

      {isOpen && (
        <div className="confirm-modal-overlay" onClick={handleClose}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <div className="confirm-modal-actions" title={title}>
              <Button
                text="מחק"
                className="confirm-btn confirm-btn-delete"
                onClick={handleConfirm}
              />

              <Button
                text="ביטול"
                className="confirm-btn confirm-btn-cancel"
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteWithConfirm;
