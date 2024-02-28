const mongoose = require("mongoose")

const databaseName = 'books-app-m3-0124'
const connectionString = `mongodb://127.0.0.1:27017/${databaseName}`

mongoose
    .connect(connectionString)
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err))