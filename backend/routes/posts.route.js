const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller')
const authUtils = require('../utils/auth.js')

router.post('/', authUtils.isAuthenticated, PostsController.createNewPost)
router.get('/getById/:id', PostsController.getPostDetails) //get post detail by post id
router.get('/getByUser', authUtils.isAuthenticated, PostsController.getUsersPosts) // get posts of authenticated user
router.get('/getByUser/:id', authUtils.isAuthenticated, PostsController.getOtherUsersPosts) // get posts of another user
router.delete('/deleteById/:id', authUtils.isAuthenticated, PostsController.deletePost) // get to delete post by id
router.put('/editById/:id', authUtils.isAuthenticated, PostsController.editPost)// post route to edit post by id
router.put('/search', PostsController.searchForPosts) // fetch posts with filters (use put to provide body)
router.put('/save/:id', authUtils.isAuthenticated, PostsController.savePost)
router.get('/saved', authUtils.isAuthenticated, PostsController.getSavedPostsForUser) // get to delete post by id
router.put('/removeSaved/:id', authUtils.isAuthenticated, PostsController.deletePostFromSaved) // remove posts from saved list
router.put('/addComment/:id', authUtils.isAuthenticated, PostsController.addComment)// API to add comment to post
router.get('/getComments/:id',PostsController.getComments)//get post comments by post id
router.put('/addLike/:id', authUtils.isAuthenticated, PostsController.addlikes)
router.get('/likes/:id', PostsController.getlikes)
router.post('/report', authUtils.isAuthenticated, PostsController.reportPost)
router.put('/unreportByUser/:id', authUtils.isAuthenticated, PostsController.unreportPostByUser)//API for user to cancel report on post
router.put('/unreportByManager/:id', authUtils.isAuthenticated, PostsController.unreportPostByManager)//API for manager to clear report on post
router.get('/getReported', authUtils.isAuthenticated, PostsController.getReportedPosts)
router.get('/suggestions', PostsController.getSuggestions)
router.get('/getUserPostStats/:id', authUtils.isAuthenticated, PostsController.getUserPostStats)
router.get('/getUserAllPostsStats', authUtils.isAuthenticated, PostsController.getUserAllPostsStats)
router.put('/recordViewed/:id',PostsController.recordView)//API to record each view on post

module.exports = router;