import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const {saveToken} = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', formData);
      if (response.data.token){
        saveToken(response.data.token);
        navigate('/home');
      } else {
        alert('Authentication failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 403) {
        alert('Your account has been restricted');
      } else {
        alert('Error logging in');
      }
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
        <input
          className={styles.username}
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className={styles.password}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <button className={styles.button} type="submit">Login</button>
        <br />
        <br />
        <p id="create" className="text-center text-muted small">
        Don't have an account?&nbsp;
        <a className="link" href="/register">Register Here!</a>
        </p>
      </form>
    </div>
  );
};

export default Login;