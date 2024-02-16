import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Status.module.css';
import { useAuth } from '../context/authContext';

const Status = () => {
    const navigate = useNavigate();
    const [currentStatus, setCurrentStatus] = useState({
        status: '',
    });
    const [selectedStatus, setSelectedStatus] = useState({
        status: '',
    });
    const {getToken} = useAuth();
    const token = getToken();

    useEffect(() => {
    const fetchStatus = async () => {
        try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get('/status', config);
            setCurrentStatus({
                status: response.data.status,
            });
            setSelectedStatus({
                status: response.data.status,
            });
        } catch (err) {
            console.error(err);
        }
        };
        fetchStatus();
    }, []);

    const handlePlanChange = (e) => {
        setSelectedStatus({ ...selectedStatus, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            await axios.put('/status', selectedStatus, config);
            alert('Status Change Successfully');
            navigate('/home');
          } catch (err) {
            console.error(err);
          }
      };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h3>Current Status: {currentStatus.status}</h3>
      <h1>Select a status:</h1>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="status"
          value='IT'
          onChange={handlePlanChange}
        />
        <label htmlFor="IT">&nbsp;IT Manager</label>
      </div>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="status"
          value='Security'
          onChange={handlePlanChange}
        />
        <label htmlFor="Security">&nbsp;Security Manager</label>
      </div>
      <br />
      <button className={styles.button} type="submit">Change</button>

      </form>
    </div>
  );
};

export default Status;
