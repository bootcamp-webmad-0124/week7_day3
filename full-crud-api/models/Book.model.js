const { model, Schema } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    codeISBN: {
        type: String,
        maxlength: 13,
        unique: true,
        match: /[0-9]{5}[A-D]{3}/,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    lastPublished: {
        type: Date,
        default: Date.now,
        required: true
    },
    genre: {
        type: String,
        enum: ["romance", "fiction", "biography", "poetry"],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'                   // NOMBRE DEL MODELO RELACIONADO
    }
}, {
    timestamps: true
})

const Book = model("Book", bookSchema)

module.exports = Book