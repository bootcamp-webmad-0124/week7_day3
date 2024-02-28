const express = require("express")
const logger = require("morgan")
const app = express()

// MIDDLEWARE
app.use(logger("dev"))
app.use(express.static("public"))


// ROUTES: query strings
// http://localhost:5005/api/flight-results?origin=MAD&destination=BER&date=11-11-2024
// http://localhost:5005/api/flight-results?origin=OVD&destination=MAD&date=10-11-2023

app.get('/api/flight-results', (req, res) => {
    const { origin, destination, date } = req.query
    res.send(`Enviaríamos a la BBDD una consulta para vuelos de ${origin} a ${destination} el día ${date}`)
})


// ROUTES: route params
// http://localhost:5005/api/festivals/897468746874648
// http://localhost:5005/api/festivals/468543654360092

app.get('/api/festivals/:festivalId', (req, res) => {
    const { festivalId } = req.params
    res.send(`Buscaremos en la BBDD el festival con ID ${festivalId}`)
})



app.listen(5005, () => console.log("App listening on port 5005"))