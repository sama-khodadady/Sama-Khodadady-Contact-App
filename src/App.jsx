import { useEffect, useState } from "react";
import { v4 } from "uuid";

import Header from "./components/Header";
import ContactsList from "./components/ContactsList";
import ContactForm from "./components/ContactForm";

const App = () => {
  //states
  const [isShow, setIsShow] = useState(false);
  const [alert, setAlert] = useState({});
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    checked: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [contactEmpty, setContactEmpty] = useState(contacts.length === 0);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //save contacts to localstorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    setContactEmpty(contacts.length === 0);
  }, [contacts]);

  //filter contacts for search input
  const filterContacts = (SearchItem) => {
    if (SearchItem === "") {
      setFilteredContacts([]);
    } else {
      const filtered = contacts.filter(
        (contact) =>
          contact.name
            .toLocaleLowerCase()
            .includes(SearchItem.toLocaleLowerCase()) ||
          contact.lastName
            .toLocaleLowerCase()
            .includes(SearchItem.toLocaleLowerCase()) ||
          contact.email
            .toLocaleLowerCase()
            .includes(SearchItem.toLocaleLowerCase()) ||
          contact.phone
            .toLocaleLowerCase()
            .includes(SearchItem.toLocaleLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const displayedContacts =
    filteredContacts.length > 0 ? filteredContacts : contacts;

  //validate form inputs
  const validateForm = () => {
    let newAlert = {};
    // Define regex patterns
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+98|0)?9\d{9}$/;

    // Validate name
    if (!contact.name) {
      newAlert.name = "This field is required";
    } else if (!namePattern.test(contact.name.trim().toLocaleLowerCase())) {
      newAlert.name = "Name must contain only letters";
    }

    // Validate last name
    if (!contact.lastName) {
      newAlert.lastName = "This field is required";
    } else if (!namePattern.test(contact.lastName.trim().toLocaleLowerCase())) {
      newAlert.lastName = "Last name must contain only letters";
    }

    // Validate email
    if (!contact.email) {
      newAlert.email = "This field is required";
    } else if (!emailPattern.test(contact.email.trim().toLocaleLowerCase())) {
      newAlert.email = "Please enter a valid email address";
    }

    // Validate phone
    if (!contact.phone) {
      newAlert.phone = "This field is required";
    } else if (!phonePattern.test(contact.phone.trim())) {
      newAlert.phone = "Phone number must be between 10-15 digits";
    }

    // Validate gender
    if (!contact.gender) {
      newAlert.gender = "This field is required";
    }

    setAlert(newAlert);
    return Object.keys(newAlert).length === 0;
  };

  //add new contact buttonhandler
  const addHandler = () => {
    if (!validateForm()) return;

    const newContact = { ...contact, id: isEdit ? editId : v4() };

    if (isEdit) {
      setContacts(
        contacts.map((contact) =>
          contact.id === editId ? newContact : contact
        )
      );
      setIsEdit(false);
      setEditId(null);
    } else {
      setContacts((contacts) => [...contacts, newContact]);
    }

    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      checked: false,
    });
    setIsShow(false);
  };

  //get the contact info from inputs value
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
    setAlert((alert) => ({ ...alert, [name]: "" }));
  };

  //show/hide contactform component
  const showHandler = () => {
    setIsShow(true);
  };

  //deleteAll handler
  const deleteAllHandler = () => {
    const newContacts = contacts.filter((contact) => !contact.checked);
    setContacts(newContacts);
  };

  //editing a contact
  const editHandler = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setContact(contactToEdit);
    setIsShow(true);
    setIsEdit(true);
    setEditId(id);
  };

  //delete a contact
  const deleteHandler = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <>
      {isShow ? (
        <ContactForm
          alert={alert}
          contact={contact}
          addHandler={addHandler}
          changeHandler={changeHandler}
          isEdit={isEdit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <>
          <Header addContact={showHandler} filterContacts={filterContacts} />
          <ContactsList
            contacts={displayedContacts}
            contactEmpty={contactEmpty}
            setContacts={setContacts}
            deleteAll={deleteAllHandler}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </>
  );
};

export default App;
