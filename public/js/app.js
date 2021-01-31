
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")

message1.textContent = ""
message2.textContent = ""

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value
    message1.textContent = "Loading..."
    message2.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        
        res.json().then((data) => {
            if (data.geocodeError) {
                message1.textContent = data.geocodeError
            } else if (data.forecastError) {
                message1.textContent = data.forecastError
            } else {
                const forecast = `Conditions are ${data.forecast.description}. It is currently ${data.forecast.current} degrees, but feels like ${data.forecast.feelslike}.`
                message1.textContent = data.forecast.location
                message2.textContent = forecast
            }
        })
    })
})