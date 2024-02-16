import React, {useState, useEffect} from 'react'
import {getFormattedDateTime} from '../utils/utilFunctions'
import styles from '../styles/Checklist.module.css'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { useAuth } from '../context/authContext';

const defaultChecklist = [
    {
        value: "passport",
        content: "Passport",
        checked: false
    },
    {   value: "itinerary",
        content: "Travel itinerary",
        checked: false
    },
    {   value: "booking",
        content: "Booking information",
        checked: false
    },
    {   value: "cash",
        content: "Cash",
        checked: false
    },
    {   value: "card",
        content: "Credit/Debit card",
        checked: false
    },
    {
        value: "adapter",
        content: "Travel adapter",
        checked: false
    },
    {   value: "charger",
        content: "Phone charger",
        checked: false
    },
    {   value: "shoes",
        content: "Comfortable walking shoes",
        checked: false
    },
    {   value: "clothes",
        content: "Weather-appropriate clothing",
        checked: false
    },
    {   value: "toothbrush",
        content: "Toothbrush",
        checked: false
    },
    {   value: "toothpaste",
        content: "Toothpaste",
        checked: false
    },
    {   value: "soap-shampoo",
        content: "Soap and shampoo",
        checked: false
    },
    {   value: "first-aid",
        content: "First-aid kit",
        checked: false
    },
    {   value: "sunscreen",
        content: "Sunscreen",
        checked: false
    },
    {   value: "snacks",
        content: "Snacks",
        checked: false
    },
    {   value: "pillow",
        content: "Travel pillow",
        checked: false
    },
    {   value: "headphones",
        content: "Headphones",
        checked: false
    },
    {   value: "bank",
        content: "Power bank",
        checked: false
    },
    {   value: "medications",
        content: "Medications",
        checked: false
    }
]

const Checklist = () => {
    const [checklist, setChecklist] = useState([])
    const {getToken, user, userId} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL

    const getUserChecklist = async () => {
        const response = await axios.get(`${url}/profile/getChecklist`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        return response.data
    }

    const initializeChecklist = async () => {
        const completedChecklist = await getUserChecklist()

        if (completedChecklist.length > 0){
            setChecklist(completedChecklist)
        } else {
            setChecklist(defaultChecklist) // set to default
        }
    }

    const saveChecklist = async () => {
        await axios.put(`${url}/profile/updateChecklist`, checklist, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }

    const handleCheckChange = (index) => {
        const updated = checklist.map((item, i) => {
            if (i == index){
                return {
                    content: item.content,
                    checked: !item.checked
                }
            } else {
                return item
            }
        })
        return updated;
    }

    useEffect(() => {
        initializeChecklist()
    }, [])

  return (
    <div className={styles.list}>
        <h4 className='mb-4 ms-5'>Checklist</h4>
      <Form>
        <div>
        {checklist.length > 0 
        
        && checklist.map((item, i) => {
            return (
                <Form.Check 
                    className='my-2'
                    key={i}
                    type='checkbox'
                    id={item.value}
                    label={item.content}
                    checked={item.checked}
                    onChange={(e) => setChecklist(handleCheckChange(i))}
                />
            )
            })
            }
        </div>
        <Button variant="success" type='button' onClick={() => saveChecklist()}>Save Checklist</Button>
        </Form>
    </div>
  )
}

export default Checklist