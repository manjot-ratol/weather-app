const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2713526d3b8d38b688ef052e6db9f9e8&query=' + latitude + ',' +longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('could not reach forecast service.', undefined)
        }
        else if (response.body.error) {
            callback(response.body.error, undefined)
        }
        else {
            const temperature = response.body.current.temperature
            const feelslike = response.body.current.feelslike
            const weather_descriptions = response.body.current.weather_descriptions[0]
            callback(undefined, weather_descriptions + '. Its ' + temperature + ' degrees out there, and feels like ' + feelslike + ' degrees. ')
        }
    })
}

module.exports = forecast