import React, {useState, useEffect} from 'react'
import { Carousel } from 'react-bootstrap'
import styles from '../styles/Suggestions.module.css'
import { IKImage } from 'imagekitio-react'
import { useAuth } from '../context/authContext';
import axios from 'axios';

const Suggestions = () => {

    const {getToken, user, userId} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL
    const [posts, setPosts] = useState([])
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const getSuggestions = async () => {
        const response = await axios.get(`${url}/posts/suggestions`)
        setPosts(response?.data?.suggestions)
    }
  

    useEffect(() => {
        getSuggestions()
    }, [])

    return (
    <div>
        <h4 className='ms-5'>Suggestions</h4>
        <Carousel activeIndex={index} className={styles.carousel}  onSelect={handleSelect}>
            {
                posts.length > 0 && posts?.map((post) => {
                    return (
                        <Carousel.Item interval={2000}>
                        {post?.image ? <IKImage className={styles.image} path={`posts/${post?.image}`}/> : <img className={styles.image} src='/no-image-yet.jpg'/> }
                        <div className={styles.content}>
                        <h3>{post?.title}</h3>
                        <div className={styles.tags}>
                            <span className={styles.city}>{post?.city}</span>
                            <span className={styles.category}>{post?.category}</span>
                        </div>
                        <p>{post?.description.substring(0, 80) + "..."}</p>
                        </div>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>

    </div>
  )
}

export default Suggestions