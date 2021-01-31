// App require imports. Core, Installed, Custom In-app
const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// Create the app with the express call.
const app = express()

// Define paths for Express config.
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirPath))

// Routes //
// Index route.
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Devodriq Roberts"
    })
})

// About route.
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Devodriq Roberts"
    })
})

// Help route.
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: " This is a helpful message",
        name: "Devodriq Roberts"
    })
})

// Weather route.
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }
    
    geocode(req.query.address, (geocodeError, geoRes) => {
        if (geocodeError) {
            return res.send({ geocodeError })
        }

        forecast(geoRes, (forecastError, forecast) => {
            if (forecastError) {
                return res.send({ forecastError })
            }

            res.send({ forecast })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
                error: "You must provide a search term."
            })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        message: "Help article has not been found.",
        name: "Devodriq Roberts"
    })
})

// 404 route.
app.get("*", (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        message: "Sorry, this page has not been found.",
        name: "Devodriq Roberts"
    })
})


// Start the express server.
app.listen(3000, () => {
    console.log("Server is up on port 3000")
})