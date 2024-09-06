import styles from "./Modal.module.css";

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.yesButton}>
            Yes
          </button>
          <button onClick={onCancel} className={styles.noButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
