const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 4000;


const pathFile = path.join(__dirname, '../public');

const viewPath = path.join(__dirname, './templates/views');
const partialPath = path.join(__dirname, './templates/partials');
const geoLocation = require('./utils/geocode');
const weatherShow = require('./utils/wethershow')




app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(pathFile));


app.get('/', (req, res) => {
    res.render('index', {
        name: 'musa',
        title: 'weather app'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'musa'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'for help',
        message: 'contact us through mosmondy@gmail.com',
        name: 'musa'
    })
})


app.get('/products', (req, res, next) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('/weather', (req, res, next) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        });
    };

    geoLocation(req.query.address, (err, { latitude, longitude, location }={}) => {

        if (err) {
            return res.send({
                error: err
            });
        }

        weatherShow(latitude, longitude, (err, data) => {
            if (err) {
                return res.send({
                    error: err
                });
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });


        })

    })
})

app.use('/help/*', (req, res, next) => {
    res.status(404).render('404', {
        name: 'andrew error helper',
        title: 'help article not found',
        errorMsg: 'help page not found'

    })
})

app.use('/', (req, res, next) => {
    res.status(404).render('404', {
        name: 'musa error page',
        title: '404 error page',
        errorMsg: 'page not found'
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
