const express = require('express');
const { result } = require('lodash');
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes')

// create express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://DuongLe:Duong305@nodetuts.tgenezq.mongodb.net/node-tuts?retryWrites=true&w=majority";

// view engine
app.set('view engine', 'ejs');

// listen for requrest
// app.listen(3000);

// app.use((req, res, next) => {
//     console.log('request made');
//     console.log('host: ' + req.hostname);
//     console.log('path: ' + req.path);
//     console.log('method: ' + req.method);
//     next();
// });

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000)
        console.log('db connected')
    })
    .catch((err) => console.log(err));

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New title 2',
//         snippet: 'My blog snippet',
//         body: 'blog body'
//     })
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('63e240eec3a82c6baafc1507')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err));
// })

app.get('/', (req, res) => {
    // const blogs = [
    //     {title: 'Do magna velit deserunt sint dolore.', snippet: 'Officia cupidatat in ad minim dolore sunt reprehenderit sint excepteur.'},
    //     {title: 'Pariatur sunt enim non aliqua id exercitation magna.', snippet: 'Labore nisi pariatur qui ipsum ea est anim ea ipsum nostrud nisi.'},
    //     {title: 'Ipsum proident quis mollit adipisicing cillum qui enim occaecat proident.', snippet: 'In est elit in veniam.'},
    // ];
    // res.render('index', { title: 'Home', blogs});

    res.redirect('/blogs');
});

app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.use((req, res) => {
    res.status(404).render('404');
});
