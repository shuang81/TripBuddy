import React from 'react'
import { Accordion } from 'react-bootstrap'

const ViewFAQ = ({question, answer, eventKey}) => {
  return (
    <div className='my-3 w-75'>
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>{question}</Accordion.Header>
            <Accordion.Body>
            {answer}
            </Accordion.Body>

        </Accordion.Item>
    </div>
  )
}

export default ViewFAQ