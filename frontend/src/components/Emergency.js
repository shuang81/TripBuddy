import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Emergency.module.css';
import { Button, Container, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap'
import { useAuth } from '../context/authContext';

const Emergency = () => {
  const [email, setEmail] = useState(null)
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState(false);
  const {getToken} = useAuth();
  const token = getToken()
  const url = process.env.REACT_APP_SERVER_URL
  const [error, setError] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const navigate = useNavigate();
  const [messageTo, setMessageTo] = useState(null);

  const getEmergencyContacts = async () => {
    try {
      const response = await axios.get(`${url}/emergency`, { headers: {
          'Authorization': 'Bearer ' + token
      }})
      setContacts(response.data)
      setError(null)
    } catch (error) {
      setError(error.response?.data?.message)
    }
  }

  const sendMessage = async (id) => {
    try {
      setMessageError(null)
      if (!messageTo){
        return setMessageError("Please select the contact")
      }
      if (!message){
        return setMessageError("Please enter a message")
      }
      const response = await axios.put(`${url}/emergency/sendMessage/${id}`, {message: message}, { headers: {
          'Authorization': 'Bearer ' + token
      }});
      alert("Successfully Sended the message!");
      setMessage("");
    } catch (error) {
      setMessageError(error.response?.data?.message);
    }
  }

  const addEmergencyContact = async () => {
    const confirmToAdd = window.confirm("Are you sure you want to add this email as your emergency contact ?")
    if (confirmToAdd)
      {
      try {
        if (!email){
          return setError("Please provide a valid email");
        }
        await axios.put(`${url}/emergency/add/${email}`, {}, { headers: {
          'Authorization': 'Bearer ' + token
        }});

        setError(null);
        setUpdated(true);
        alert("Successfully Added!");
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }
  }

  const removeEmergencyContact = async (id) => {
    const confirmationForDelete = window.confirm("Are you sure you want to remove this emergency contact information ?")
    if (confirmationForDelete)
    {
      try {
        await axios.put(`${url}/emergency/remove/${id}`, {}, { headers: {
          'Authorization': 'Bearer ' + token
        }})
        setError(null);
        setUpdated(true);
        alert("Successfully Remove!");
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getEmergencyContacts()
    setUpdated(false)
  }, [updated])

  return (
    <div className={styles.form}>
      <h1>My Emergency Contacts</h1>
        <Container>
        <Link className="btn btn-primary mt-4" to="/emergency-info">Other users</Link>
          
          <div className={styles.addContact}>
          <FormGroup className='w-75 mx-auto text-start my-5'>
          <FormLabel>Enter Emergency Contact's email: </FormLabel>
          <FormControl className='mt-2 mb-4' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
          <span className='text-danger d-block mb-3'>{error}</span>
          <button className={styles.button} onClick={() => addEmergencyContact()}>Add</button>
          </FormGroup>
          </div>
               
          {
            contacts.length > 0 && contacts?.map((contact, index) => {
              return (
              <div className={styles.emergencyContact} key={index}>
                <h5>{contact.firstName} {contact.lastName}</h5>
                <h6>{contact.username}</h6>
                <h6>{contact.email}</h6>
                <h6>{contact.phone}</h6>
                <Button variant='danger' className='mt-4 mb-2' onClick={() => removeEmergencyContact(contact._id)}>Remove</Button>
              </div>)
            })
          }

          <div className={styles.addContact}>
          <FormGroup className='w-75 mx-auto text-start my-5'>
          <FormSelect onChange={(e) => setMessageTo(e.target.value)}>
          <option disabled selected>Please select the contact</option>
            {
              contacts?.map((contact, index) => {
                 return <option key={index} value={contact._id}>{contact?.username}</option>
              })
            }
          </FormSelect>
          <textarea className='my-4 w-90 form-control' placeholder='Enter your message here' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <Button variant='success' className='' onClick={() => sendMessage(messageTo)}>Send Message</Button>
          <span className='text-danger d-block mb-3'>{messageError}</span>
          </FormGroup>
          </div>
          
          
        </Container>
    
    </div>
    
  );
};

export default Emergency;
