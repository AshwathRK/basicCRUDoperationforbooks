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
const handlePostBooks = async (req, res) => {
    const { book_key, bookname, authoername, publisheddate } = req.body;

    if (!bookname || !authoername || !publisheddate) {
        return res.status(400).json({
            success: false,
            message: `Bookname, author name, and publish date are required.`,
        });
    }

    try {
        // Check for duplicate book_key
        const existingBook = await bookifyModel.findOne({ book_key });
        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: 'Book with this ID already exists.',
            });
        }

        const newBook = new bookifyModel({ book_key, bookname, authoername, publisheddate });
        const savedBook = await newBook.save();

        return res.status(201).json({
            success: true,
            message: 'Book added successfully.',
            data: savedBook,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to add book: ${error.message}`,
        });
    }
};


// PUT route to create a update a book by id

const handleUpdateBooksByID = async (req, res) => {
    const paramsID = req.params.bookID;
    const dbID = `ObjectID(${paramsID})`
    console.log(dbID)
    const existingBook = await bookifyModel.findOne({ dbID });

    console.log(existingBook)

    if (!existingBook) {
        return res.status(404).json({
            message: 'Book not found',
            status: false
        });
    }

    // Update the book using request body
    
    try {
        bookifyModel.updateOne({_id:bookID}, {
            $set:{
                book_key: req.body.book_key,
                bookname: req.body.bookname,
                authoername: req.body.authoername,
                authoername: req.body.authoername
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Book with this ${'ID:', req.body.bookID} is already exists.`,
        });
    }

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