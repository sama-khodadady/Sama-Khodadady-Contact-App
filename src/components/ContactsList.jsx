import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaCheckDouble, FaTrash } from "react-icons/fa6";

import Modal from "./Modal";
import ContactsTable from "./ContactsTable";

import styles from "./ContactsList.module.css";

const ContactsList = ({
  contacts,
  deleteAll,
  editHandler,
  deleteHandler,
  setContacts,
  contactEmpty,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [showButton, setShowButton] = useState(false);

  // show/hide buttons
  const showButtonHandler = () => {
    setShowButton((showButton) => !showButton);
  };

  //  check/uncheck the checkbox
  const toggleCheckBox = (id) => {
    setContacts((contacts) =>
      contacts.map((contact) =>
        contact.id === id ? { ...contact, checked: !contact.checked } : contact
      )
    );
  };

  //deleteAllHandler and show the modal
  const handleDeleteAll = () => {
    setIsModalOpen(true);
  };
  const confirmDeleteAll = () => {
    deleteAll();
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          message="Are you sure you want to delete the selected contacts?"
          onConfirm={confirmDeleteAll}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      <div className={styles.container}>
        <button className={styles.goBack} onClick={showButtonHandler}>
          <IoArrowBackCircle />
        </button>

        <div className={styles.devider}></div>

        <table className={styles.table}>
          <div className={styles.tableHeader}>
            <button
              className={styles.button}
              onClick={showButton ? handleDeleteAll : showButtonHandler}
            >
              {showButton ? (
                <>
                  <span>Delete All</span>
                  <FaTrash className={styles.deleteAllButton} />
                </>
              ) : (
                <>
                  <span>Select All</span>
                  <FaCheckDouble className={styles.selectAllButton} />
                </>
              )}
            </button>
            <thead>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </thead>
          </div>

          {contactEmpty ? (
            <p className={styles.contactEmpty}>No Contacts Yet!</p>
          ) : (
            <tbody>
              {contacts.map((contact) => (
                <ContactsTable
                  key={contact.id}
                  contactData={contact}
                  showButton={showButton}
                  toggleCheckBox={toggleCheckBox}
                  editHandler={editHandler}
                  deleteHandler={deleteHandler}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default ContactsList;
