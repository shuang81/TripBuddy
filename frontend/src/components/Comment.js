import React from 'react'
import styles from '../styles/Comment.module.css'
import { getFormattedDateTime } from '../utils/utilFunctions'

const Comment = ({comment}) => {
  return (
    <div className={styles.comment}>
        <span className='d-block' style={{fontWeight: "bold"}}>{comment?.postedBy[0]?.username}</span>
        <p>{comment?.body}</p>
        <span className='d-block'  style={{fontStyle: "italic"}}>{getFormattedDateTime(comment?.date)}</span>
    </div>
  )
}

export default Comment