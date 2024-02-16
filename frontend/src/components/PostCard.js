import { IKImage } from 'imagekitio-react'
import React, {useState, useEffect} from 'react'
import { Card, Button } from 'react-bootstrap'
import styles from '../styles/Browse.module.css'

const PostCard = ({post, viewPost, setPostedBy}) => {
  
    return (
    <>
        <Card className={styles['post-preview']}>
        {post?.image ? (<IKImage path={`/posts/${post?.image}`}/> || <img src="/no-image.jpg"/>) : <img src="/no-image.jpg"/> }
        <Card.Body>
            
            <Card.Title>{post?.title}</Card.Title>
            <div className={styles['tag-container']}>
                <Card.Subtitle className={styles['location-tag']}>{post?.country}, {post?.city}</Card.Subtitle>
                <span className={styles['tag']}>{post?.category}</span>
            </div>
            
            <Card.Text>
                {post?.description.substring(0, 80) + "..."}
            </Card.Text>
            <Card.Text>By <a className={styles['author-tag']} onClick={() => setPostedBy(post?.postedBy?._id)}>{post?.postedBy?.username}</a></Card.Text>
            <Button className={styles["post-button"]} variant='secondary' onClick={viewPost}>View post</Button>
        </Card.Body>
        </Card>
    </>
  )
}

export default PostCard