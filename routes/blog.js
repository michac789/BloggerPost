const express = require('express')
const router = express.Router()

const asyncWrap = require('../utils/asyncWrap')
const { loginRequired } = require('../middleware/loginRequired')
const Blog = require('../controller/blog')


router.get('', asyncWrap(Blog.viewAll))

router.route('/create')
    .get(loginRequired, Blog.createForm)
    .post(loginRequired, asyncWrap(Blog.createDo))

router.route('/:id')
    .get(asyncWrap(Blog.viewBlog))
    .put(asyncWrap(Blog.updateDo))
    .delete(asyncWrap(Blog.deleteBlog))

router.route('/:id/edit')
    .get(asyncWrap(Blog.updateForm))

module.exports = router
