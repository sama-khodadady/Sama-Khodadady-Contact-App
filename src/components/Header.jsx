import { FaAddressBook } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

import styles from "./Header.module.css";

const Header = ({ addContact, filterContacts }) => {
  const searchHandler = (event) => {
    const SearchItem = event.target.value;
    filterContacts(SearchItem);
  };

  return (
    <div className={styles.container}>
      <h1>
        Contacts List
        <FaAddressBook className={styles.contact} />
      </h1>

      <div>
        {/* button for add a new contact */}
        <button onClick={addContact}>+ Add Contact</button>

        {/* search input */}
        <div className={styles.inputDiv}>
          <input
            type="text"
            name="header"
            placeholder="Search Contact"
            onChange={searchHandler}
          />
          <IoSearch className={styles.search} />
        </div>
      </div>
    </div>
  );
};

export default Header;
