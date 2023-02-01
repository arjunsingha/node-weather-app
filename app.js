const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//set up handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

const port = 3000
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Arjun'
    });
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Arjun'
    });
})
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        help_message: 'this is a help message',
        name: 'Arjun'
    });
})
app.get('/weather', (req, res) => {

    if(!req.query || !req.query.address){
        let error = {"code": 404,
            "type": "request_failed",
            "info": "ADDRESS PARAM NOT FOUND."
        }
        return res.send({
            error: error
        })
    }
    geoCode.geoCode(req.query.address, (error, data)=>{
        if(!error){
            console.log(data.location)
            let location = data.location
            forecast.getCurrentWeather(data,(error, data)=>{
                if(!error){
                    res.send({
                        forecast: data.weather_descriptions[0]+". It is "+data.temperature+" degrees out. It feels like "+data.feelslike+" degrees out.",
                        location: location,
                        error:null
                    })
                    console.log(data.weather_descriptions[0]+". It is "+data.temperature+" degrees out. It feels like "+data.feelslike+" degrees out.");
                }else{
                    res.send({
                        error: error
                    })

                }
                
            })
        }else{
            console.log('Error: ', error)
        }
    })
})

app.get('/products', (req, res) => {
    console.log('Request: ', req.query)
    res.send({
        products:[],
        search: req.query.search,
        rating: req.query.rating
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: 'Help',
        name: 'Arjun',
        message:'help article not found'
    });
});


app.get('*',(req, res)=>{
    res.render('error',{
        title: '404',
        name: 'Arjun',
        message:'Page Not Found'
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})