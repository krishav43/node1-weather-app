const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
const app = express()

const port = process.env.PORT || 3000

// Setup handlebars engine and view locations
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rishav'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rishav'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Welcome to Help section of this Applications',
        name: 'Rishav'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }
    let address = req.query.address

    geocode(address, (error ,{latitude, logititude, placeName} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,logititude,(error,forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                forecast: forecastData,
                location: placeName,
                address: address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404 Page',
        errorMessage: 'Help article not found',
        name: 'Rishav'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Rishav'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
