import React, { useEffect, useState }  from 'react';
import { Formik, Field, Form, useFormikContext } from 'formik';
import Select from 'react-select'
import axios from 'axios'
import { useAuth } from '../context/authContext';
import ImageUpload from '../components/ImageUpload'
import { IKImage } from 'imagekitio-react'
import cn from 'classnames'
import { useNavigate } from "react-router-dom";
import {Container} from 'react-bootstrap'
import  ConfirmationPopup from '../components/ConfirmationPopup';
import styles from '../styles/Post.module.css';
import { useParams } from 'react-router-dom';
import { getFormattedDate } from '../utils/utilFunctions';


const EditPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState(null);
  const {getToken} = useAuth()
  const token = getToken()
  const url = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])

  // get the id from query paramaters and make the request
  const { postId } = useParams()
  const [post, setPost] = useState(null)

  const getPost = async () => {
      const response = await axios.get(`${url}/posts/getById/${postId}`, { headers: {
          'Authorization': 'Bearer ' + token
      }})
      setPost(response.data)
      setSelectedImage(response.data.image)
      setCategory(response.data.category)
  }
 
  const editPost = async (values) => {
    try {
      const edittedPost = {...values, image: selectedImage, category: category}
      const response = await axios.put(`${url}/posts/editById/${postId}`, edittedPost, { headers: {
          'Authorization': 'Bearer ' + token
        }})
      setError(null)
      setShowPopup(true)
    } catch (error) {
      setError(error)
    }
  }

  const getCategories = async () => {
    try {
        const response = await axios.get(`${url}/category/getAll`)
        const categories = response?.data?.map((category) => {
          return { value: category, label: category }
        })

        setCategoryOptions(categories)
        setError(false)
    } catch (error) {
        setError(true)
    }
  } 

  useEffect(() => {
    getPost()
    getCategories()
  }, [])


  return (
    <div>
    <h2 className='text-center mb-5'>Edit Post</h2>
    {post &&
    <Formik
      initialValues={{
        title: post?.title,
        description: post?.description,
        country: post?.country,
        city: post?.city,
        rating: post?.rating,
        date: getFormattedDate(post?.date)
        }}
        onSubmit={async (values) => {
            editPost(values)
      }}
    >
      <Form>
      <div>
        {selectedImage && (
          <div>
            <IKImage path={`posts/${selectedImage}`} width={400} height={300}/>
            <br />
            <button className="btn btn-warning" onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
      <br />
        <ImageUpload imageFolder={'posts'} setImageName={setSelectedImage} />
      </div>
            <label className={styles.label}>Title:</label>
            <Field 
            id="title" 
            name="title" 
            placeholder="Title" className="form-control"/>

        <label className={styles.label}>Description:</label>
        <Field className="form-control" name="description" placeholder="Description" rows={6} cols={50} />

        <br />
        <label className={styles.label}>Category:</label>
        <Select id="category" name="category" options={categoryOptions} onChange={(e) => setCategory(e.value)}  value={categoryOptions?.filter((option) => option.value == category)[0]}  />
        <br /> 

        <div className={styles.wrap}>
          <div className={styles.country}>
            <label className={styles.label}>Country:</label>
            <Field 
            className="form-control" 
            id="country" 
            name="country" 
            placeholder="Country" />
          <br/>
          </div>

          <div className={styles.city}>
            <label className={styles.label}>City:</label>
            <Field 
            className="form-control" 
            id="city" 
            name="city" 
            placeholder="City" />
          <br/>
          </div>
        </div>

        <div className={styles.wrap}>
          <div className={styles.date}>
            <label className={styles.label}>Date Visisted:</label>
            <Field 
            className="form-control" 
            id="date" 
            name="date" 
            placeholder="MM/DD/YYYY" />
          <br/>
          </div>

          <div className={styles.rating}>
          <label className={styles.label}>Rating:</label>
            <Field 
            className="form-control" 
            id="rating" 
            name="rating" 
            placeholder="Rating" />
          <br/>
          </div>
        </div>



        <br/>
        <div className='text-center'>
        <button type="submit" className={'btn btn-success me-3'} >Edit Post</button>
        <button onClick={() => navigate('/my-posts')} type="reset" className={'btn btn-warning'}>Cancel</button>
        </div>

      </Form>
    </Formik>
    }
    <Container>{error && <div className='alert alert-danger my-3'>{`Error happened: ${error?.message}`}</div>}</Container>
    <ConfirmationPopup doAction={() => navigate('/my-posts')} title={"Confirmation Action Require "} message={"Are you sure you want to update this post ?"} show={showPopup} setShow={setShowPopup}/>
    </div>
  );
};

export default EditPost;