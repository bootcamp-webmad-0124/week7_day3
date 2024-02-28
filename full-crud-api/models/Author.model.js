const { model, Schema } = require('mongoose')

const AuthorSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
})

const Author = model("Author", AuthorSchema)

module.exports = Author