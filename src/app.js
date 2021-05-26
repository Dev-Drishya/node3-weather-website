const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Serup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Devendra Bhagat'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Devendra Bhagat'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Devndra Bhagat'
    })
})

app.get('/weather', (req, res) => {
    //error handling
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    // getting address
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error) {
            return res.send({error})
        }

        // forecast(data.longitude, data.latitude, (error, forecastdata) => {
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            // console.log(data.location)
            //console.log(location)
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Devdnra Bhagat',
        errorMessage: 'Help article not found.'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Devdnra Bhagat',
        errorMessage: 'Page not found.'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.');
})


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))