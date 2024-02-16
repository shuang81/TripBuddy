import React from 'react'
import styles from '../styles/Icons.module.css'

const SavedPost = ({saved, saveAction}) => {
  return (
    <div className={styles.saved} onClick={() => saveAction()}>
        {
            saved ? <img src="/saved.png" /> : <img src='/not-saved.png'/>
        }
    </div>
  )
}


export {SavedPost}