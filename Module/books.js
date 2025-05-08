const m = require('mongoose');

const booksSchema = new m.Schema({
    bookname: {type: String, required: true},
    authoername: {type: String, required: true},
    publisheddate: {type: Date, required: true},
},{ timestamps: true })

const books = m.model('books', booksSchema, 'BooksDetails')

module.exports = books;