const Blog = require('../models/blog');

const blogIndex = (req, res) => {
    Blog.find().sort({ updatedAt: -1})
    .then((result) => {
        res.render('blogs/index', { title: 'All blog', blogs: result})
    })
    .catch((err) => console.log(err));
}

const blogCreatePost = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}

const blogCreateGet = (req, res) => {
    res.render('blogs/create', { title: 'Create'});
}

const blogGetById = (req, res) => {
    const id = req.params.id; 
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { title: 'Details', blog: result})
        })
        .catch((err) => {
            res.status(404).render('404', {title: 'blog not found'})
        })
}

const blogDelete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect: '/blogs'})
        })
        .catch((err) => console.log(err));
}

module.exports = {
    blogIndex,
    blogCreatePost,
    blogCreateGet,
    blogGetById,
    blogDelete,
}