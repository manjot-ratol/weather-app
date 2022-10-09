const request = require('postman-request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFuam90LXJhdG9sIiwiYSI6ImNsN3MzaGlnYjAyem8zb3BsaDljaWN1NTEifQ.WujBXE0Ny-kjH2NYPLLcGw&limit=1'
    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('could not reach geocode service.', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('unable to find location, try another search', undefined)
        }
        else {
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode