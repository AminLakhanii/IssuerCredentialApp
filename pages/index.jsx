  import Link from 'next/link';
  import { useRouter } from 'next/router';
  import React, { useState } from 'react';
  import styles from './styles.module.css';

  const Index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          // Redirect to the dashboard page or perform any other action
          router.push('/dashboard/dashboard');
        } else {
          setMessage(data.error);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setMessage('Internal server error');
      }
    };

    return (
      <div className={styles.container}>
        <h1 className={styles.title}><img className={styles.img} src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" /> <br />  Merchant Login page</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className={styles.button} type="submit">
            Login
          </button>
            <h3>
            Don't have an account?{' '}
            <Link href="/register">Sign up!</Link>
          </h3>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  };

  export default Index;
