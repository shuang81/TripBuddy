import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import styles from '../styles/PostAnalytics.module.css'
import { IKImage } from 'imagekitio-react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { Table, Button } from 'react-bootstrap'
import { getFormattedDateTime, getFormattedDate } from '../utils/utilFunctions'
import cn from 'classnames'
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const PostAnalytics = () => {

    const [postAnalytics, setPostAnalytics] = useState({})
    const [allPostsAnalytics, setAllPostsAnalytics] = useState({})
    const {getToken} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL
    const {id} = useParams()

    const getPostAnalytics = async () => {
        const response = await axios.get(`${url}/posts/getUserPostStats/${id}`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setPostAnalytics(response?.data?.stats)
    }

    const getAllAnalytics = async () => {
        const response = await axios.get(`${url}/posts/getUserAllPostsStats`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setAllPostsAnalytics(response?.data?.stats)
    }

    const currentPostBarData = {
        labels: ' ',
        datasets: [
            {
              label: 'Likes',
              data: [postAnalytics?.totalLikes],
              backgroundColor: [
                'rgb(255, 217, 102)',
              ],
            },
            {
                label: 'Comments',
                data: [postAnalytics?.totalComments],
                backgroundColor: [
                  'rgb(187, 214, 184)',
                ],
            },
            {
                label: 'Views',
                data: [postAnalytics?.totalViews],
                backgroundColor: [
                  'rgb(255, 165, 89)',
                ],
            },
        ],
    }

    const viewsComparisonData = {
        labels: ['Post Views', 'Total Views'],
        datasets: [
          {
            label: 'Views',
            data: [postAnalytics?.totalViews, allPostsAnalytics?.totalViews - postAnalytics?.totalViews],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      };

      const commentsComparisonData = {
        labels: ['Post Comments', 'Total Comments'],
        datasets: [
          {
            label: 'Comments',
            data: [postAnalytics?.totalComments, allPostsAnalytics?.totalComments - postAnalytics?.totalComments],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      };

      const likesComparisonData = {
        labels: ['Post Likes', 'Total Likes'],
        datasets: [
          {
            label: 'Likes',
            data: [postAnalytics?.totalLikes, allPostsAnalytics?.totalLikes - postAnalytics?.totalLikes],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      };

    useEffect(() => {
        getPostAnalytics()
        getAllAnalytics()
    }, [])

  return (
    <>
    {postAnalytics &&
    <div className={styles.layout}>
        <h2 className={styles.title}>Analytics for Post "{postAnalytics?.title}"</h2>
        <div className={styles.back}><Button variant='light' href={"/my-posts"}>Back to posts</Button></div>
        <div className={styles.sectionBox}>
         <h5>Likes, Comments, Views</h5>
            <Table>
                <tbody>
                    <tr>
                        <td>Likes: </td>
                        <td>{postAnalytics?.totalLikes}</td>
                    </tr>

                    <tr>
                        <td>Comments: </td>
                        <td>{postAnalytics?.totalComments}</td>
                    </tr>

                    <tr>
                        <td>Views: </td>
                        <td>{postAnalytics?.totalViews}</td>
                    </tr>
                </tbody>
            </Table>
        </div>

        <div className={styles.sectionBox}>
            <h5>Post Info</h5>
            <Table>
                <tbody>
                    <tr>
                        <td>Category: </td>
                        <td>{postAnalytics?.category}</td>
                    </tr>

                    <tr>
                        <td>Country: </td>
                        <td>{postAnalytics?.country}</td>
                    </tr>

                    <tr>
                        <td>City: </td>
                        <td>{postAnalytics?.city}</td>
                    </tr>

                    <tr>
                        <td>Created at: </td>
                        <td>{getFormattedDateTime(postAnalytics?.createdAt)}</td>
                    </tr>

                    <tr>
                        <td>Last updated at: </td>
                        <td>{getFormattedDateTime(postAnalytics?.updatedAt)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>

        <div className={cn(styles.sectionBox, styles.centered)}>
            {postAnalytics?.image ? (<IKImage path={`/posts/${postAnalytics?.image}`}/> || <img src="/no-image.jpg"/>) : <img src="/no-image.jpg"/> }
        </div>

        <div className={styles.sectionBox}>
            {/* bar chart for likes, comments and views */}
            <h5>Current Post</h5>
            <Bar options={{
                plugins: {
                    title: {
                    display: true,
                    text: 'Current Post',
                    },
                },
                responsive: true,
                scales: {
                    y: {
                    beginAtZero: true,
                    },
                },
                }} 
                data={currentPostBarData} 
            />
        </div>

        <div className={styles.sectionBox}>
            <h5>All Posts</h5>
            <div className={styles.pieCharts}>
            <Pie
                data={likesComparisonData}
                options={{
                    responsive: true,
                    plugins: {
                    title: {
                        display: true,
                        text: 'Post Likes to Total Likes',
                        font: { size: 16 },
                    },
                    },
                }}
            />

            <Pie
                data={commentsComparisonData}
                options={{
                    responsive: true,
                    plugins: {
                    title: {
                        display: true,
                        text: 'Post Comments to Total Comments',
                        font: { size: 16 },
                    },
                    },
                }}
            />

            <Pie
                data={viewsComparisonData}
                options={{
                    responsive: true,
                    plugins: {
                    title: {
                        display: true,
                        text: 'Post Views to Total Views',
                        font: { size: 16 },
                    },
                    },
                }}
            />
            </div>
        </div>

        <div className={styles.sectionBox}>
            <h5>Total Likes, Comment, Views</h5>
            <Table>
                <tbody>
                    <tr>
                        <td>All Posts Likes: </td>
                        <td>{allPostsAnalytics?.totalLikes}</td>
                    </tr>

                    <tr>
                        <td>All Posts Comments: </td>
                        <td>{allPostsAnalytics?.totalComments}</td>
                    </tr>

                    <tr>
                        <td>All Posts Views: </td>
                        <td>{allPostsAnalytics?.totalViews}</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    </div>
    }
    </>
  )
}

export default PostAnalytics