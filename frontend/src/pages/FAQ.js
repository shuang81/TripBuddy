import React, {useEffect, useState} from 'react'
import { Container, Accordion, Button } from 'react-bootstrap'
import ViewFAQ from '../components/ViewFAQ'
import { useAuth } from '../context/authContext'
import axios from 'axios'

const FAQ = () => {

    const [questions, setQuestions] = useState([])
    const {getToken} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL
  
    const getQuestions = async () => {
        const response = await axios.get(`${url}/question/getQuestions`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setQuestions(response.data)
    }

    useEffect(() => {
        getQuestions()
    }, [])

  return (
    <div>
    <Container>
        <h3>Frequently Asked Questions</h3>


        <Accordion>
            {
                questions.map((q, i) => {
                    return <ViewFAQ question={q.question} answer={q.answer} eventKey={i} />
                    
                })
            }

        </Accordion>
    </Container>

    </div>
  )
}

export default FAQ