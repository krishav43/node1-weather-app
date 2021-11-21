const request = require('request')

const forecast = (logititude,latitude, weathercallback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c6fcfd9f9b3383bc15eb3f1e6b6d4f0a&query='+latitude+','+logititude+'&units=f'
    request({ url,json: true }, (error, {body : data}) => {
        if(error){
            weathercallback('Unable to connect to weather service!',undefined)
        }
        else if(data.error){
            weathercallback('Unable to find location',undefined)
        }
        else{
            weathercallback(undefined,`${data.current.weather_descriptions[0]} It is currently ${data.current.temperature}
            degree out. It feels link ${data.current.feelslike} degree out`)
        }
    })
}

module.exports = forecast