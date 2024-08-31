const express = require('express');
const router = express.Router();
const upload = require('multer')();
const blogController = require('../controllers/blogController');

router.post('/addNewBlog', upload.single('Image'), blogController.createBlog);
router.get('/getAllBlog', blogController.getAllBlogs);
router.get('/latestBlogs',blogController.latestBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', upload.single('Image'), blogController.updateBlogById);
router.delete('/:id', blogController.deleteBlogById);
// Add other blog routes here

module.exports = router;
