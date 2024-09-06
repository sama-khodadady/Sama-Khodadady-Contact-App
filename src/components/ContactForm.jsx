import Modal from "./Modal";
import styles from "./ContactForm.module.css";

const ContactForm = ({
  contact,
  addHandler,
  changeHandler,
  alert,
  isEdit,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const confirmEdit = () => {
    addHandler();
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <Modal
          message="Are you sure you want to apply these changes?"
          onConfirm={confirmEdit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      <form>
        <h1>{isEdit ? "Edit Contact" : "New Contact"}</h1>

        <div className={styles.name}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="First Name"
              value={contact.name}
              onChange={changeHandler}
            />
            {alert.name && <span>{alert.name}</span>}
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastname"
              placeholder="Last Name"
              value={contact.lastName}
              onChange={changeHandler}
            />
            {alert.lastName && <span>{alert.lastName}</span>}
          </div>
        </div>

        <div className={styles.email}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={contact.email}
            onChange={changeHandler}
          />
          {alert.email && <span>{alert.email}</span>}
        </div>

        <div className={styles.phone}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            value={contact.phone}
            onChange={changeHandler}
          />
          {alert.phone && <span>{alert.phone}</span>}
        </div>

        <div className={styles.gender}>
          <label htmlFor="gender">Gender:</label>
          <div className={styles.radio}>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={changeHandler}
                checked={contact.gender === "male"}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={changeHandler}
                checked={contact.gender === "female"}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="other"
                value="other"
                onChange={changeHandler}
                checked={contact.gender === "other"}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          {alert.gender && <span>{alert.gender}</span>}
        </div>
      </form>

      <button
        className={styles.formButton}
        onClick={isEdit ? handleEdit : addHandler}
      >
        {isEdit ? "Edit Contact" : "Add Contact"}
      </button>
    </div>
  );
};

export default ContactForm;
