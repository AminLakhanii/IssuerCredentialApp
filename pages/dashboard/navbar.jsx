import React from 'react';
import styles from './navbar.module.css';

const Navbar = ({ username }) => {
  return (
    <div className={styles.navbar}>
      <ul className={styles.navbar}>
        <li>
          <h3>Hi, {username} </h3>
        </li>
        <li>
          <a href="#">Issuance Form</a>
        </li>
        <li>
          <a href="#">Verification Form</a>
        </li>
        <li>
          <a href="#">Manage your documents</a>
        </li>
        {/* Add other menu items here */}
        <li>
          <a href="#">Log out</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
