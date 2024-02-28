const express = require("express")
const logger = require("morgan")
const PORT = 5005

const app = express()

// DDBB connection
require('./db')

// MIDDLEWARE
app.use(logger("dev"))
app.use(express.json())

const Book = require("./models/Book.model")
const Author = require("./models/Author.model")

// BOOK ROUTES
app.post('/api/books', (req, res) => {

    const { title, year, codeISBN, quantity, genre, author } = req.body

    Book
        .create({ title, year, codeISBN, quantity, genre, author })
        .then(createdBook => res.status(201).json(createdBook))
        .catch(err => res.status(500).json(err))
})

app.get('/api/books', (req, res) => {

    Book
        .find()
        .populate('author')             // NOMBRE DEL CAMPO A POPULAR
        .then(allBooks => res.json(allBooks))
        .catch(err => res.status(500).json(err))
})

app.get('/api/books/:id', (req, res) => {

    const { id: bookId } = req.params

    Book
        .findById(bookId)
        .populate('author')             // NOMBRE DEL CAMPO A POPULAR
        .then(bookInfo => res.json(bookInfo))
        .catch(err => res.status(500).json(err))
})

app.put('/api/books/:id', (req, res) => {

    const { id: bookId } = req.params
    const { title, year, codeISBN, quantity, genre, author } = req.body

    Book
        .findByIdAndUpdate(
            bookId,
            { title, year, codeISBN, quantity, genre, author },
            { new: true, runValidators: true }
        )
        .then(updatedBook => res.json(updatedBook))
        .catch(err => res.status(500).json(err))
})

app.delete('/api/books/:id', (req, res) => {

    const { id: bookId } = req.params

    Book
        .findByIdAndDelete(bookId)
        .then(() => res.sendStatus(202))
        .catch(err => res.status(500).json(err))
})


// AUTHOR ROUTES
app.post('/api/authors', (req, res) => {

    const { firstName, lastName, bio } = req.body

    Author
        .create({ firstName, lastName, bio })
        .then(() => res.sendStatus(201))
        .catch(err => res.status(500).json(err))
})



app.listen(PORT, () => console.log(`App listening on port ${PORT}`))