import React, { useState, useEffect } from "react";
import "./Dialog.css";

function Dialog({ autoOpen = false }) {
  const [modal, setModal] = useState(autoOpen);

  const toggleModal = () => {
    setModal(!modal);
    window.location.reload();
  };

  useEffect(() => {
    if (autoOpen) {
      setModal(true); // Directly set modal to true if autoOpen is true
    }
  }, [autoOpen]);

  useEffect(() => {
    if (modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [modal]);



  

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <i className="fa-regular fa-circle-check"></i>
            <h2 className="message-header">Login Successfull!</h2>
            <button className="close-modal" onClick={toggleModal}> OK </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dialog;
