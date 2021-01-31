const request = require("request")

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHIwMjY1MSIsImEiOiJja2tnYTR6cXEwNGZhMnZvZDM5ZzM0YjRsIn0.HPamwquNaXT1tmRVsnOF1Q`

    request({url: url, json: true}, (err, res) => {
        if (err) {
            callback("Unable to connect to location services!", undefined)
        } else if (res.body.message) {
            callback("Unable to find location. Try another search.", undefined)
        } else if (res.body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            callback(undefined, {
                lat: res.body.features[0].center[1],
                lon: res.body.features[0].center[0],
                location: res.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode