
// Example 15 - files included: app.js, geoCode.js & forecast.js

const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2b81603a191c29b5a41e2cfe3437185d&query=' + longitude + ',' + latitude
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('ERROR: ' + response.body.error, undefined)
        } else {
            const body = response.body
            const current = body.current
            const data = {
                description: current.weather_descriptions[0],
                temperature: current.temperature,
                feelsLike: current.feelslike
            }

            callback(undefined, data)
        }
    })
}

//---------------------------------------------------------------------------------------
            // Example 16 - files included: app.js, geoCode.js & forecast.js

const forecastD = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2b81603a191c29b5a41e2cfe3437185d&query=' + longitude + ',' + latitude
    request({url: url, json: true}, (error, { body }) => { // body is a destructure of response and is the only thing that we need
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('ERROR: ' + body.error, undefined)
        } else {
            const current = body.current
            const data = {
                description: current.weather_descriptions[0],
                temperature: current.temperature,
                feelsLike: current.feelslike
            }

            callback(undefined, data)
        }
    })
}

//---------------------------------------------------------------------------------------

            // Shared area.

module.exports = {
    forecast,
    forecastD
}