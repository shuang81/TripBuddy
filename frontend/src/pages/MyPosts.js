import React, {useState, useEffect} from 'react'
import PostCardHorizontal from '../components/PostCardHorizontal'
import {Container} from 'react-bootstrap';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from '../components/ConfirmationPopup';
import {Button} from 'react-bootstrap';
import styles from '../styles/Posts.module.css'
import NotFound from '../components/NotFound';

const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const {getToken} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)

    const getUsersPosts = async () => {
        const response = await axios.get(`${url}/posts/getByUser`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setPosts(response.data)
    }

    const deletePost = async (id) => {

        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (confirmed) 
        {    
        try { 
            const response = await axios.delete(`${url}/posts/deleteById/${id}`, { headers: {
                'Authorization': 'Bearer ' + token
              }})
            setError(null)
            setPosts(posts.filter((post) => post?._id != id))
          } catch (error) {
            setError(error)
          }
      } 
    }
    useEffect(() => {
        getUsersPosts()
    }, [])

  return (
    <Container>
        <h2 className='text-center mb-5'>Past Destinations</h2>
        <div className='posts-list'>
            {
                posts.length > 0 ? 
                posts?.map((post) => {
                    return (
                    <div className={styles["post-horizontal-container"]}>
                        <PostCardHorizontal post={post} mainPage={'my-posts'} deletePost={(id) => deletePost(id)}/>
                        <div className={styles['buttons-div']}>
                            <Button variant='success' onClick={() => navigate(`/analytics/${post?._id}`)}> Analytics </Button>
                            <Button variant='outline-secondary' onClick={() => navigate(`/my-posts/edit/${post?._id}`)}> Update </Button>
                            <Button variant='outline-danger' onClick={() => deletePost(post?._id)}> Delete </Button>
                        </div>
                        
                        {error && <div className='alert alert-danger my-3 w-90 mx-auto'>{`Error happened while deleting the post: ${error?.message}`}</div>}
                        <ConfirmationPopup doAction={() => navigate('/my-posts')} title={"Sucessful !"} message={"Post deleted !"} show={showPopup} setShow={setShowPopup}/>

                    </div>
                    )
                })
                : <NotFound />
            }
        </div>

    </Container>
  )
}

export default MyPosts