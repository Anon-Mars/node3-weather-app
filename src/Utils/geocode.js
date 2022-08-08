
// Example 15 - files included: app.js, geoCode.js & forecast.js

const request  = require('request')

const geoCode = (address, callback) => {

    // encodeURIComponent is used in case of the usage of special character that might affect the url itself such as '?'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5vbm1hcnMiLCJhIjoiY2tqY3d5ZWtqMnduYzJ6bnFtZXU0NXNkeSJ9.pUKp8soHmbWK93i0xdPUjw&limit=1'
    request({url: url, json: true}, (error, response) => {

        if (error) {
            callback('Unable to connect to map boc geo coding services!', undefined) // error yes, response no
        } else if (response.body.features.length === 0) {
            callback('ERROR: No geo code was found!', undefined) // error yes, response no
        } else {
            const data = response.body
            const feature = data.features[0]
            const placeName = feature.place_name
            const center = feature.center
            const areaInfo = {
                placeName: placeName,
                latitude: center[1],
                longitude: center[0]
            }

            callback(undefined, areaInfo) // error no, response yes
        }
    })

}

//---------------------------------------------------------------------------------------
            // Example 16 - files included: app.js, geoCode.js & forecast.js

const geoCodeD = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5vbm1hcnMiLCJhIjoiY2tqY3d5ZWtqMnduYzJ6bnFtZXU0NXNkeSJ9.pUKp8soHmbWK93i0xdPUjw&limit=1'
    request({url: url, json: true}, (error, { body }) => { // body is a detructure of response and is the only thing that we need

        if (error) {
            callback('Unable to connect to map boc geo coding services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined)
        } else {
            const feature = body.features[0]
            const placeName = feature.place_name
            const center = feature.center
            const areaInfo = {
                placeName: placeName,
                latitude: center[1],
                longitude: center[0]
            }

            callback(undefined, areaInfo)
        }
    })
}

//---------------------------------------------------------------------------------------

            // Shared area.

module.exports = {
    geoCode,
    geoCodeD
}