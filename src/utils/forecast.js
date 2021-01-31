const request = require("request")
const keys = require("./keys/keys")


const forecast = ({lat, lon, location}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${keys.weather_stack_key}&query=${lat},${lon}&units=f`

    request({url: url, json: true}, (err, res) => {
        if (err) {
            callback("Unable to connect to weather service!", undefined)
        } else if (res.body.error) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            const description = res.body.current.weather_descriptions[0]
            const current = res.body.current.temperature
            const feelslike = res.body.current.feelslike
            const humidity = res.body.current.humidity
            callback(undefined, {
                location: location,
                description: description,
                current: current,
                feelslike: feelslike,
                humidity: humidity,
            })
        }
    })
}

module.exports = forecast