const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manjot Ratol'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Manjot Singh Ratol'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Manjot',
        title: 'Help',
        helpText: 'This is some help text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must give an address'
        })
    }

    geocode(req.query.address, (error, {latitude, location, longitude} = {}) => { //object destructuring
        if (error) {
            return res.send({
                error               //object property short-hand syntax
            })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: "Manjot Ratol",
        title: "404",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: "Manjot Ratol",
        title: "404",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})