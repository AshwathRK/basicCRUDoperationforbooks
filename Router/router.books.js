const express = require('express')
const router = express.Router();
const booksController = require('../Controllers/controller.books')

router.get('/', booksController.handleGetBooks)
router.post('/create', booksController.handlePostBooks)
router.put("/update/:bookID", booksController.handleUpdateBooksByID)
router.delete("/delete/:bookID", booksController.handleDeleteBooksByID)

module.exports = router