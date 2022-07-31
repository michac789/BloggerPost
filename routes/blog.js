// load express
const express = require('express')
const router = express.Router()

// load models
const BlogPost = require('../models/blog')

// load utils
const asyncWrap = require('../utils/asyncWrap')
const ExpressError = require('../utils/ExpressError')

const { loginRequired } = require('../middleware/loginRequired')

// blog - read all
router.get('', loginRequired, asyncWrap(async(req, res) => {
    // if (!req.isAuthenticated()) {
    //     res.send("not logged in")
    // }
    const blogs = await BlogPost.find({})
    res.render('blog/index', { blogs })
}))

// blog - create
router.get('/create', (req, res) => {
    res.render('blog/create')
})
router.post('/create', asyncWrap(async(req, res) => {
    const newblog = new BlogPost(req.body)
    await newblog.save()
    res.redirect(`/blog/${newblog.id}`)
}))

// blog - read
router.get('/:id', asyncWrap(async(req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    res.render('blog/view', { blog })
}))

// blog - update
router.get('/:id/edit', asyncWrap(async(req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    res.render('blog/edit', { blog })
}))

// blog - save update
router.put('/:id', asyncWrap(async(req, res) => {
    const { id } = req.params
    // console.log("put route")
    // console.log(req.body)
    const blog = await BlogPost.findByIdAndUpdate(
        id, { ...req.body }
    )
    res.redirect(`/blog/${blog._id}`)
}))

// blog - delete TODO
router.delete('/:id', asyncWrap(async(req, res) => {
    console.log("DELETE ROUTE")
    const { id } = req.params
    await BlogPost.findByIdAndDelete(id)
    res.redirect('/blog')
}))

module.exports = router