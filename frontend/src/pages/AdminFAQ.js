import React, {useState, useEffect} from 'react'
import { Container, Accordion, Button } from 'react-bootstrap'
import CreateFAQ from '../components/CreateFAQ'
import EditFAQ from '../components/EditFAQ'
import ViewFAQ from '../components/ViewFAQ'
import axios from 'axios'
import { useAuth } from '../context/authContext'

const AdminFAQ = () => {

  const [questions, setQuestions] = useState([])
  const [editQuestion, setEditQuestion] = useState(null)
  const [createQuestion, setCreateQuestion] = useState(null)
  const {getToken} = useAuth()
  const token = getToken()
  const url = process.env.REACT_APP_SERVER_URL

    const getQuestions = async () => {
      const response = await axios.get(`${url}/question/getQuestions`, { headers: {
        'Authorization': 'Bearer ' + token
      }})
      setQuestions(response.data)
    }

    const updateQuestion = async () => {
      const response = await axios.put(`${url}/question/editById/${editQuestion?._id}`, editQuestion, { headers: {
        'Authorization': 'Bearer ' + token
      }})
      getQuestions()
      setEditQuestion(null)
    }

    const deleteQuestion = async (id) => {
      const response = await axios.delete(`${url}/question/deleteById/${id}`, { headers: {
        'Authorization': 'Bearer ' + token
      }})
      getQuestions()
    }

    const createNewQuestion = async () => {
      const response = await axios.post(`${url}/question/addQuestion`, 
      createQuestion,
      { headers: {
        'Authorization': 'Bearer ' + token
      }})
      getQuestions()
      setCreateQuestion(null)
    }
    
    useEffect(() => {
      getQuestions()
    }, [])

  return (
    <div>
      <Container>
        <h3>Manage Frequently Asked Questions</h3>

        <CreateFAQ createQuestion={createNewQuestion} newQuestion={createQuestion} setNewQuestion={setCreateQuestion}/>

        {editQuestion && <EditFAQ question={editQuestion} setQuestion={setEditQuestion} updateQuestion={updateQuestion}/> }

        <Accordion>
            {
                questions.map((q, i) => {
                    return (
                      <div>
                      <div className='d-flex flex-row justify-content-start align-items-center'>
                      <ViewFAQ question={q.question} answer={q.answer} eventKey={i}/>
                      <Button variant="secondary" className='ms-3' onClick={() => setEditQuestion(q)}>Edit</Button>
                      <Button variant="danger" className='ms-3' onClick={() => deleteQuestion(q._id)}>Delete</Button>
                    </div>

                    </div>
                  )
                })
            }

        </Accordion>
    </Container>
        
    </div>
  )
}

export default AdminFAQ