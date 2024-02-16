import React, {useState} from 'react'

const CreateFAQ = ({createQuestion, newQuestion, setNewQuestion}) => {

  return (
    <div class="my-5 w-50">
        <input className='form-control' placeholder='Question' value={newQuestion?.question} onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}/>
        <input className='form-control  mb-2' placeholder='Answer' value={newQuestion?.answer}  onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})}/>
        <button className='btn btn-success' onClick={() => createQuestion()}>Add</button>
    </div>
  )
}

export default CreateFAQ