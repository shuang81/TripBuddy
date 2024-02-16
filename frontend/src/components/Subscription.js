import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Subscription.module.css';
import { useAuth } from '../context/authContext';

const Subscription = () => {
    const navigate = useNavigate();
    const {getToken} = useAuth();
    const token = getToken();
    const [currentSubscription, setCurrentSubscription] = useState({
      subscription: '',
    });
    const [selectedSubscription, setSelectedSubscription] = useState({
      subscription: '',
    });

    useEffect(() => {
    const fetchSubscription = async () => {
        try {
            const response = await axios.get('/subscription', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setCurrentSubscription({
              subscription: response.data.subscription,
            });
            setSelectedSubscription({
                subscription: response.data.subscription,
              });
        } catch (err) {
            console.error(err);
        }
        };
        fetchSubscription();
    }, []);

    const handlePlanChange = (e) => {
        setSelectedSubscription({ ...selectedSubscription, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/subscription', selectedSubscription, {
              headers: { Authorization: `Bearer ${token}` },
            });
            alert('Subscribe successfully');
            navigate('/home');
          } catch (err) {
            console.error(err);
          }
      };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h3>Current Plan: {currentSubscription.subscription}</h3>
      <h1>Select a subscription plan:</h1>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="subscription"
          value='Basic'
          onChange={(e) => handlePlanChange(e)}
        />
        <label htmlFor="basic">&nbsp;Basic Plan</label>
      </div>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="subscription"
          value='Premium'
          onChange={(e) => handlePlanChange(e)}
        />
        <label htmlFor="premium">&nbsp;Premium Plan</label>
      </div>
      <div className={styles.wrap}>
        <input
          type="radio"
          name="subscription"
          value='Business'
          onChange={(e) => handlePlanChange(e)}
        />
        <label htmlFor="business">&nbsp;Business Plan</label>
      </div>
      <button className={styles.button} type="submit">Subscribe</button>

      </form>
    </div>
  );
};

export default Subscription;
