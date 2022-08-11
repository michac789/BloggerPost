const express = require('express')
const router = express.Router()

const asyncWrap = require('../utils/asyncWrap')
const { loginRequired } = require('../middlewares/loginRequired')
const Blog = require('../controllers/blog')

const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.get('', asyncWrap(Blog.viewAll))

router.route('/create')
    .get(loginRequired, Blog.createForm)
    .post(loginRequired, 
        upload.single('image'),
        (req, res) => {
            console.log(req.body, req.file)
        }
        //asyncWrap(Blog.createDo)
        )

router.route('/:id')
    .get(asyncWrap(Blog.viewBlog))
    .put(asyncWrap(Blog.updateDo))
    .delete(asyncWrap(Blog.deleteBlog))

router.route('/:id/edit')
    .get(asyncWrap(Blog.updateForm))

module.exports = router
