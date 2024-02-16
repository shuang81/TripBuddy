import React, {useState} from 'react'

const EditFAQ = ({question, setQuestion, updateQuestion}) => {
  
  return (<>
    <div class="my-2 w-50">
        <input className='form-control' placeholder='Question' value={question?.question} onChange={(e) => setQuestion({...question, question: e.target.value})}/>
        <input className='form-control  mb-2' placeholder='Answer' value={question?.answer}  onChange={(e) => setQuestion({...question, answer: e.target.value})}/>
        <button className='btn btn-dark' onClick={() => updateQuestion()}>Edit</button>
    </div>
    </>
  )
}

export default EditFAQ