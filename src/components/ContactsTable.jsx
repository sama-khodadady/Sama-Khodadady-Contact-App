import { useState } from "react";

import Modal from "./Modal";
import styles from "./ContactsTable.module.css";

const ContactsTable = ({
  contactData: { id, name, lastName, email, phone, checked },
  showButton,
  toggleCheckBox,
  editHandler,
  deleteHandler,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //delete contact and show modal
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteHandler(id);
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      <tr className={styles.row}>
        <td>{name}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>

        <div className={styles.buttonDiv}>
          <div className={styles.checkbox}>
            {showButton && (
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleCheckBox(id)}
              />
            )}
          </div>
          <button className={styles.button} onClick={() => editHandler(id)}>
            Edit
          </button>
          <button className={styles.button} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </tr>
    </>
  );
};

export default ContactsTable;
