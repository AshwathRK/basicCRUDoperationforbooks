const bookifyModel = require('../Module/books')

// GET route to retrieve all books

const handleGetBooks = async (req, res) => {
    try {
        const result = await bookifyModel.find();
        console.log("Result:", result)
        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully.',
            result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to retrieve books: ${error.message}`
        });
    }
}

// POST route to create a new book
const handlePostBooks = (req, res) => {
    const Purpose = new bookifyModel(req.body)
    const result = Purpose.save()
    const { name, author } = req.body;

    if (!name || !author) {
        return res.status(400).json({
            success: false,
            message: `${result._id}ID, name and author are required.`
        });
    }

    if (result.some(book => book.id == id)) {
        return res.status(400).json({
            success: false,
            message: 'Book with this ID already exists.'
        });
    }

    try {
        result.push({ name, author });
        return res.status(201).json({
            success: true,
            message: 'Book added successfully.',
            data: { id, name, author }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to add book: ${error.message}`
        });
    }
}

// PUT route to create a update a book by id

const handleUpdateBooksByID = (req, res) => {
    const bookID = req.params.bookID;
    const index = books.findIndex(book => book.id == bookID);

    if (index === -1) {
        return res.status(404).json({
            message: 'Book not found',
            status: false
        });
    }

    // Update the book using request body
    books[index] = { ...books[index], ...req.body };

    return res.status(200).json({
        message: 'Book Updated',
        status: true,
        book: books[index]
    });
}

// Delete route to create a delete a book by id
const handleDeleteBooksByID = (req, res) => {
    const bookID = req.params.bookID;
    const index = books.findIndex(book => book.id == bookID);

    if (index === -1) {
        return res.status(404).json({
            message: 'Book not found',
            status: false
        });
    }

    // delete the book using request body
    books.splice(index, 1);

    return res.status(200).json({
        message: 'Book Deleted',
        status: true,
        book: books[index]
    });
}

module.exports = {
    handleGetBooks,
    handlePostBooks,
    handleUpdateBooksByID,
    handleDeleteBooksByID
}