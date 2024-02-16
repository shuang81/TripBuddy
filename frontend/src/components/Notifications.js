import React, {useState, useEffect} from 'react'
import {getFormattedDateTime} from '../utils/utilFunctions'
import styles from '../styles/Notification.module.css'
import { Alert, Button } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import axios from 'axios'


const Notifications = () => {

    const [notifications, setNotifications] = useState([])
    const {getToken, user, userId} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL

    const getNotifications = async () => {
        const response = await axios.get(`${url}/notification/getNotifications`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        setNotifications(response?.data)
    }

    const viewNotification = async (id) => {
        const response = await axios.delete(`${url}/notification/deleteById/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        getNotifications()
    }

    useEffect(() => {
        getNotifications()
    }, [])

  return (
    <div>
        <h4 className='mb-4'>Notifications</h4>
      {notifications.length > 0 
      
      ? notifications.map((not, i) => {
        return (
        <Alert key={i} variant="success" className="my-3 w-75 d-flex flex-row justify-content-between align-items-start">
            <div>
            {not.notification}
            <span className={styles.notificationDate}>{getFormattedDateTime(not.date)}</span>
            </div>
            <Button variant="light" onClick={() => viewNotification(not._id)}>OK</Button>
        </Alert>)
        })
        : <div>
            <h5 className='text-secondary mt-5'>You have no notifications</h5>
        </div>
        }
    </div>
  )
}

export default Notifications