import React, {useState, useEffect} from 'react'
import PostCard from '../components/PostCard'
import ContentProviders from '../components/ContentProviders'
import SearchBar from '../components/SearchBar'
import styles from '../styles/Browse.module.css'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import NotFound from '../components/NotFound'
import { useNavigate } from 'react-router-dom'
import ContentProviderProfile from '../components/ContentProviderProfile'

const Browse = () => {

  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [followedContentProviders, setFollowedContentProviders] = useState([])

  const [keyword, setKeyword] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedContentProviders, setSelectedContentProviders] = useState([])

  const {getToken} = useAuth()
  const token = getToken()
  const url = process.env.REACT_APP_SERVER_URL
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const [postedBy, setPostedBy] = useState(null)

  useEffect(() => {
    getContentProviders()
    getCategories()
  }, [])

  useEffect(() => {
      if (selectedCategory == ""){
        setSelectedCategory(null)
      }
      searchPosts()
  }, [selectedCategory, keyword, selectedContentProviders])

  const searchPosts = async () => {
    let requestBody = {
        category: selectedCategory,
        contentProviders: selectedContentProviders,
        keyword: keyword
    }

    try {
        const response = await axios.put(`${url}/posts/search`, requestBody, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setPosts(response.data)
        setError(false)
    } catch (error) {
        setError(true)
    }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/category/getAll`)
            setCategories(response.data)
            setError(false)
        } catch (error) {
            setError(true)
        }
    }
    
    const getContentProviders = async () => {
        try {
            const response = await axios.get(`${url}/profile/getSubscribedTo`, { headers: {
                'Authorization': 'Bearer ' + token
            }})
            setFollowedContentProviders(response.data)
            setError(false)
        } catch (error) {
            setError(true)
        }
    }

  return (
      <div className={styles['browsing-posts-layout']}>
          <SearchBar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setKeyword={setKeyword} keyword={keyword} search={searchPosts}/>
          <ContentProviders contentProviders={followedContentProviders} selectedContentProviders={selectedContentProviders} setSelectedContentProviders={setSelectedContentProviders}/>
          {posts.length > 0 ? 
          <div className={styles['posts-grid']}>
                  {
                      posts?.map((post) => {
                          return <PostCard post={post} viewPost={() => navigate(`/browse/${post?._id}`)} setPostedBy={setPostedBy} />
                      })
                  }

          </div>

          : <div className={styles['not-found']}><NotFound /></div>}

          {postedBy && <ContentProviderProfile id={postedBy} setPostedBy={setPostedBy}/>}
      </div>
      
  )
}

export default Browse