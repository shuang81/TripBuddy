import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Payment.module.css';
import  ConfirmationPopup from '../components/ConfirmationPopup';
import { useAuth } from '../context/authContext';
import cn from 'classnames';

const Payment = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState({
      cardNumber: '',
      expirationDate: '',
      CVC: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      country: '',
      city: '',
      postalCode: '',
      BOD: '',
  });



  const {getToken} = useAuth();
  const token = getToken()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('/payment', config);
        setUserData(response.data);
        if(response.data.BOD && response.data.expirationDate){
          const expirationDate = new Date(response.data.expirationDate);
          const formattedExpirationDate = expirationDate.toISOString().slice(0, 7);
          const BOD = new Date(response.data.BOD);
          const formattedBOD = BOD.toISOString().slice(0, 10);
          setUpdateData({
              cardNumber: response.data.cardNumber,
              expirationDate: formattedExpirationDate,
              CVC: response.data.CVC,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              phone: response.data.phone,
              address: response.data.address,
              country: response.data.country,
              city: response.data.city,
              postalCode: response.data.postalCode,
              BOD: formattedBOD,
          });
        }
        else if(response.data.BOD && !response.data.expirationDate){
          const BOD = new Date(response.data.BOD);
          const formattedBOD = BOD.toISOString().slice(0, 10);
          setUpdateData({
              cardNumber: response.data.cardNumber,
              expirationDate: response.data.expirationDate,
              CVC: response.data.CVC,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              phone: response.data.phone,
              address: response.data.address,
              country: response.data.country,
              city: response.data.city,
              postalCode: response.data.postalCode,
              BOD: formattedBOD,
          });
        }
        else if(!response.data.BOD && response.data.expirationDate){
          const expirationDate = new Date(response.data.expirationDate);
          const formattedExpirationDate = expirationDate.toISOString().slice(0, 7);
          setUpdateData({
              cardNumber: response.data.cardNumber,
              expirationDate: formattedExpirationDate,
              CVC: response.data.CVC,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              phone: response.data.phone,
              address: response.data.address,
              country: response.data.country,
              city: response.data.city,
              postalCode: response.data.postalCode,
              BOD: response.data.BOD,
          });
        }
        else {
          setUpdateData({
            cardNumber: response.data.cardNumber,
            expirationDate: response.data.expirationDate,
            CVC: response.data.CVC,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
            address: response.data.address,
            country: response.data.country,
            city: response.data.city,
            postalCode: response.data.postalCode,
            BOD: response.data.BOD,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put('/payment', updateData, config);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePayment = async () => {
    try {
      await axios.delete('/payment', {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Payment info removed successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h1>Payment Info</h1>
        <div className={styles.wrap}>
          <input
            className={styles.cardNumber}
            type="text"
            name="cardNumber"
            placeholder="Debit/Credit Card Number"
            value={updateData.cardNumber}
            onChange={handleChange}
          />
          <input
            className={styles.expirationDate}
            type="month"
            name="expirationDate"
            placeholder="MM/YY"
            value={updateData.expirationDate}
            onChange={handleChange}
          />
          <input
            className={styles.CVC}
            maxLength="3"
            type="text"
            name="CVC"
            placeholder="CVC"
            value={updateData.CVC}
            onChange={handleChange}
          />
          </div>
        <br />
          <div className={styles.wrap}>
            <input
              className={styles.firstName}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={updateData.firstName}
              onChange={handleChange}
            />
            <input
              className={styles.lastName}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={updateData.lastName}
              onChange={handleChange}
            />
          </div>
        <br />
          <div className={styles.wrap}>
            <input
              className={styles.phone}
              type="text"
              name="phone"
              placeholder="Phone"
              value={updateData.phone}
              onChange={handleChange}
            />
            <input
              className={styles.address}
              type="text"
              name="address"
              placeholder="Address"
              value={updateData.address}
              onChange={handleChange}
            />
          </div>
        <br />
        <div className={styles.wrap}>
            <input
              className={styles.country}
              type="text"
              name="country"
              placeholder="Country"
              value={updateData.country}
              onChange={handleChange}
            />
            <input
              className={styles.city}
              type="text"
              name="city"
              placeholder="City"
              value={updateData.city}
              onChange={handleChange}
            />
          </div>
        <br />
          <div className={styles.wrap}>
            <input
              className={styles.postalCode}
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={updateData.postalCode}
              onChange={handleChange}
            />
            <input
              className={styles.BOD}
              type="Date"
              name="BOD"
              placeholder="YYYY/MM/DD"
              value={updateData.BOD}
              onChange={handleChange}
            />
            </div>
        <br />
        <button className={styles.button} type="submit" onClick={() => setShowPopup(true)}>Save</button>
        <button className={cn(styles.deleteButton, "mx-2")} type="button" onClick={() => deletePayment()}>Delete</button>
        <ConfirmationPopup doAction={() => navigate('/home')} title={"Confirmation Action Require "} message={"Are you sure you want to update this payment information ?"} show={showPopup} setShow={setShowPopup}/>
      </form>
    </div>
  );
};

export default Payment;
