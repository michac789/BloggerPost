const BlogPost = require('../models/blog')


module.exports.viewAll = async (_, res) => {
    const blogs = await BlogPost.find({})
    res.render('blog/index', { blogs })
}

module.exports.createForm = (_, res) => {
    res.render('blog/create')
}

module.exports.createDo = async (req, res) => {
    const newblog = new BlogPost(req.body)
    newblog.author = req.user._id
    await newblog.save()
    req.flash('success', 'Changes saved successfully!')
    res.redirect(`/blog/${newblog.id}`)
}

module.exports.viewBlog = async (req, res) => {
    const blog = await BlogPost.findById(req.params.id)
        .populate('author')
    if (!blog) {
        req.flash('error', 'Invalid Blog ID!')
        return res.redirect('/blog')
    }
    res.render('blog/view', { blog })
}

module.exports.updateForm = async (req, res) => {
    const blog = await BlogPost.findById(req.params.id)
    if (!blog) {
        req.flash('error', 'Invalid Blog ID!')
        return res.redirect('/blog')
    }
    res.render('blog/edit', { blog })
}

module.exports.updateDo = async (req, res) => {
    console.log("barabarbarbar")
    const { id } = req.params
    const blog = await BlogPost.findByIdAndUpdate(
        id, { ...req.body }
    )
    req.flash('success', 'Changes saved successfully!')
    res.redirect(`/blog/${blog._id}`)
}

module.exports.deleteBlog = async (req, res) => {
    const { id } = req.params
    await BlogPost.findByIdAndDelete(id)
    req.flash('success', 'Blog post deleted!')
    res.redirect('/blog')
}
