import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Link from 'next/link';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const userData = {
      email,
      fullname,
      password,
      did: '', // Initialize did as an empty string
    };
  
    try {
      const response = await axios.post('/api/register', userData);
  
      if (response.status === 200) {
        const { did } = response.data; // Get the generated DID from the response
        userData.did = did; // Assign the generated DID to the userData object
  
        console.log(response.data);
        window.location.href = '/dashboard/dashboard';
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className={styles.container}>
      <img className={styles.img} src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" /> <br />
      <h1 className={styles.title}>Merchant Registration Page</h1>
      <form className={styles.form} onSubmit={handleRegister}>
        <label>Full Name:</label>
        <input
          className={styles.input}
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">Register</button>
        <h3>
          Already a user?{' '}
          <Link href="/index">Log In!</Link>
        </h3>
      </form>
    </div>
  );
};

export default RegisterPage;
