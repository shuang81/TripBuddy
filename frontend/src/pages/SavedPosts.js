import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Button, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ConfirmationPopup from '../components/ConfirmationPopup'
import PostCardHorizontal from '../components/PostCardHorizontal'
import styles from '../styles/Posts.module.css'
import { useAuth } from '../context/authContext';
import NotFound from '../components/NotFound'

const SavedPosts = () => {
    const [savedPosts, setSavedPosts] = useState([])
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [error, setError] = useState(false)
    const {getToken} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL;

    const removeFromSaved = async (id) => {
        const confirmed = window.confirm("Are you sure you want to remove this post from saved?");
        if (confirmed){
            try {
            await axios.put(`${url}/posts/removeSaved/${id}`, {}, { headers: {
                'Authorization': 'Bearer ' + token
              }})
            setError(null)
            setSavedPosts(savedPosts.filter((post) => post?._id != id))
          } catch (error) {
            setError(error)
          }
        }
    }

    const getSavedPosts = async () => {
        const response = await axios.get(`${url}/posts/saved`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setSavedPosts(response.data)
    }

    useEffect(() => {
        getSavedPosts()
    }, [])

  return (
    <Container>
        <h2 className='text-center mb-5'>Saved Destinations</h2>
        <div className='posts-list'>
            {
                savedPosts.length > 0 
                ? savedPosts?.map((post) => {
                    return (<div className={styles["post-horizontal-container"]}>
                        <PostCardHorizontal post={post} mainPage={'saved'} showPostedBy={true}/>
                        {error && <div className='alert alert-danger my-3 w-90 mx-auto'>{`Error happened while removing the post from saved list: ${error?.message}`}</div>}
                        <ConfirmationPopup doAction={() => navigate('/saved')} title={"Successful !"} message={"Post removed from saved list !"} show={showPopup} setShow={setShowPopup}/>
                        <div className={styles['remove-btn']} onClick={() => removeFromSaved(post?._id)}><img src="remove.png"/></div>
                    </div>
                    )
                })
                : <NotFound />
            }
        </div>

    </Container>
  )
}

export default SavedPosts