import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import  ConfirmationPopup from '../components/ConfirmationPopup';
import { useAuth } from '../context/authContext';
import ImageUpload from './ImageUpload';
import { IKImage } from 'imagekitio-react';

const Profile = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    postalCode: '',
    BOD: '',
    sex: '',
    email: '',
    picture: '',
    bio: ''  
  });
  
  const {getToken} = useAuth()
  const token = getToken()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('/profile', config);
        setUserData(response.data);
        if(response.data.BOD){
          const date = new Date(response.data.BOD);
          const formattedDate = date.toISOString().slice(0, 10);
          
          setUpdateData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            address: response.data.address,
            phone: response.data.phone,
            country: response.data.country,
            city: response.data.city,
            postalCode: response.data.postalCode,
            BOD: formattedDate,
            sex: response.data.sex,
            email: response.data.email,
            bio: response.data.bio,
          });
        }
        else {
          setUpdateData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            address: response.data.address,
            phone: response.data.phone,
            country: response.data.country,
            city: response.data.city,
            postalCode: response.data.postalCode,
            BOD: response.data.BOD,
            sex: response.data.sex,
            email: response.data.email,
            bio: response.data.bio,
          });
        }
        setSelectedImage(response.data.picture)
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
      await axios.put('/profile', {...updateData, picture: selectedImage}, config);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
      <h1>Profile</h1>
      <div className={styles.wrap}>
        {selectedImage && (
          <div>
            <IKImage path={`profiles/${selectedImage}`} width={150} height={200} className={styles.image}/>
            <br />
          </div>
        )}
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
          className={styles.address}
          type="text"
          name="address"
          placeholder="Address"
          value={updateData.address}
          onChange={handleChange}
        />
          <input
          className={styles.phone}
          type="text"
          name="phone"
          placeholder="Phone"
          value={updateData.phone}
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
        <div className={styles.wrap}>
          <div className={styles.sex}>
            <label>Sex &nbsp;</label>
            <select
              name="sex"
              value={updateData.sex}
              onChange={handleChange}>
                <option value="" disabled hidden >Select&nbsp;</option>
                <option value="Male">Male&nbsp;</option>
                <option value="Female">Female&nbsp;</option>
                <option value="Hide">Hide&nbsp;</option>
          </select>
          </div>
          <input
            className={styles.email}
            type="email"
            name="email"
            placeholder="Email"
            value={updateData.email}
            onChange={handleChange}
          />
        </div>
        <textarea
          className={styles.bio}
          type="text"
          name="bio"
          placeholder="About me"
          value={updateData.bio}
          onChange={handleChange}
        />
        <ImageUpload imageFolder={'profiles'} setImageName={setSelectedImage}/>
        <br />
        <button className={styles.button} type="submit" onClick={() => setShowPopup(true)}>Save</button>
        <ConfirmationPopup doAction={() => navigate('/home')} title={"Confirmation Action Require "} message={"Are you sure you want to update this user information ?"} show={showPopup} setShow={setShowPopup}/>
      </form>
    </div>
  );
};

export default Profile;
