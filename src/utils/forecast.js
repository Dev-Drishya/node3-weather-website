const request = require('request');


const forecast = (longitude, latitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=c4476d7edd744bf88a694d3fb54d6509&query=' + latitude + ',' + longitude +'&units=m';
    // request({ url: url, json: true}, (error, response) => {
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast