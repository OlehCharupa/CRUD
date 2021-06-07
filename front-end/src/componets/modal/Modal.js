import React, { useEffect } from "react";
import style from "./Modal.module.css";

const Modal = ({ children, openModal, toggleModal }) => {


  useEffect(() => {
    document.body.className = openModal ? style.open : style.close;
  }, [openModal]);

  const handleClick = (e) => {
    if (e.target.dataset.name !== "overlay") {
      return;
    }
    toggleModal();
  };

  return (
    <>
      {openModal && (
        <div
          className={style.overlay}
          onClick={handleClick}
          data-name="overlay"
        >
          <div className={style.modal} data-name="modal">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
