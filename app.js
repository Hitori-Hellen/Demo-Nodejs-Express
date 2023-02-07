const express = require('express');
const morgan = require('morgan');

// create express app
const app = express();

// view engine
app.set('view engine', 'ejs');

// listen for requrest
app.listen(3000);

// app.use((req, res, next) => {
//     console.log('request made');
//     console.log('host: ' + req.hostname);
//     console.log('path: ' + req.path);
//     console.log('method: ' + req.method);
//     next();
// });

app.use(express.static('public'))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Do magna velit deserunt sint dolore.', snippet: 'Officia cupidatat in ad minim dolore sunt reprehenderit sint excepteur.'},
        {title: 'Pariatur sunt enim non aliqua id exercitation magna.', snippet: 'Labore nisi pariatur qui ipsum ea est anim ea ipsum nostrud nisi.'},
        {title: 'Ipsum proident quis mollit adipisicing cillum qui enim occaecat proident.', snippet: 'In est elit in veniam.'},
    ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

app.use((req, res) => {
    res.status(404).render('404');
});
