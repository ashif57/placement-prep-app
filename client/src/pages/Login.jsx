import React, { useState } from 'react';
import { login } from '../services/auth';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      console.log(data);
      // Handle successful login (e.g., redirect, store token)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">Login</button>
        <div className={styles.links}>
          <Link to="/forgot-password" className={styles.link}>Forgot Password?</Link>
          <Link to="/register" className={styles.link}>Don't have an account? Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;