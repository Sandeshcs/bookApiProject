const {connectToDb} = require("./db/db.connect");
connectToDb();
const Book = require("./models/book.models");

const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
    console.log("server running on ", PORT);
});

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//1,2. function to create new book.
const createNewBook = async (newBook) => {
    try{
        const newBookCreated = new Book(newBook);
        const savedNewBook = await newBookCreated.save();
        return savedNewBook;
    }
    catch (error) {
        console.log('error occured while creating new book ', error);
    }
};

app.post("/books", async (req, res) => {
    try{
        const newBookAdded = await createNewBook(req.body);
        if(newBookAdded){
            res.status(201).json({message: 'book added successfully.', book: newBookAdded});
        }else{
            res.status(404).json({error: 'book not found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: 'failed to create new book.'});
    }
});

app.get("/", (req, res) => {
    res.send('hi i am ready');
})

//3. function to get all books in db.
const readAllBooks = async () => {
    try{
        const booksFound = await Book.find();
        return booksFound;    
    }
    catch (error) {
        console.log('error occured while reading all books ', error);
    }
};

app.get("/allbooks", async (req, res) => {
    try{
        const allBooks = await readAllBooks();
        if(allBooks.length > 0){
            res.json(allBooks);
        }else{
            res.status(404).json({error: 'no books found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: 'failed to fetch book.'});
    }
});

//4. function to get book by title.
const readBookByTitle = async (bookTitle) => {
    try{
        const bookFound = await Book.findOne({title: bookTitle});
        return bookFound;    
    }
    catch (error) {
        console.log('error occured while reading book ', error);
    }
};

app.get("/books/title/:bookTitle", async (req, res) => {
    try{
        const bookFound = await readBookByTitle(req.params.bookTitle);
        if(bookFound){
            res.status(200).json(bookFound);
        }else{
            res.status(404).json({error: 'no book found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: 'failed to fetch book.'});
    }
});

//5. function to get all books by author.
const readBooksByAuthor = async (bookAuthor) => {
    try{
        const booksFound = await Book.find({author: bookAuthor});
        return booksFound;    
    }
    catch (error) {
        console.log('error occured while reading books ', error);
    }
};

app.get("/books/author/:bookAuthor", async (req, res) => {
    try{
        const booksFound = await readBooksByAuthor(req.params.bookAuthor);
        if(booksFound.length > 0){
            res.status(200).json(booksFound);
        }else{
            res.status(404).json({error: 'no books found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: 'failed to fetch book.'});
    }
});

//6. function to get all books by business genre.
const readBooksByGenre = async (bookGenre) => {
    try{
        const booksFound = await Book.find({genre: bookGenre});
        return booksFound;    
    }
    catch (error) {
        console.log('error occured while reading books ', error);
    }
};

app.get("/books/genre/:bookGenre", async (req, res) => {
    try{
        const booksFound = await readBooksByGenre(req.params.bookGenre);
        if(booksFound.length > 0){
            res.status(200).json(booksFound);
        }else{
            res.status(404).json({error: 'no books found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: 'failed to fetch book.'});
    }
});

//7. function to get all books by year 2012.
const readBooksByYear = async (bookYear) => {
    try{
        const booksFound = await Book.find({publishedYear: bookYear});
        return booksFound;    
    }
    catch (error) {
        console.log('error occured while reading books ', error);
    }
};

app.get("/books/year/:bookYear", async (req, res) => {
    try{
        const booksFound = await readBooksByYear(req.params.bookYear);
        if(booksFound.length > 0){
            res.status(200).json(booksFound);
        }else{
            res.status(404).json({error: 'no books found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: 'failed to fetch book.'});
    }
});

//8. function to update lean in book rating.
const updateBookByRating = async (bookId, bookRating) => {
    try{
        const booksFound = await Book.findByIdAndUpdate(bookId, bookRating, {new: true});
        return booksFound;    
    }
    catch (error) {
        console.log('error occured while updating book ', error);
    }
};

app.post("/books/update/:bookId", async (req, res) => {
    try{
        const bookUpdateFound = await updateBookByRating(req.params.bookId, req.body);
        if(bookUpdateFound){
            res.status(200).json({message: 'book updated successfully.', book: bookUpdateFound});
        }else{
            res.status(404).json({error: 'no book found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: `failed to update book.${error}`});
    }
});

//9. function to update shoe_dog book rating.
const updateBookShoe_DogByRating = async (bookTitle, updateData) => {
    try{
        const booksFound = await Book.findOneAndUpdate({title: bookTitle}, updateData, {new: true});
        return booksFound;    
    }
    catch (error) {
        console.log('error occured while updating book ', error);
    }
};

app.post("/books/updates/:bookTitle", async (req, res) => {
    try{
        const bookUpdateFound = await updateBookShoe_DogByRating(req.params.bookTitle, req.body);
        if(bookUpdateFound){
            res.status(200).json({message: 'book updated successfully.', book: bookUpdateFound});
        }else{
            res.status(404).json({error: 'no book found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: `failed to update book.${error}`});
    }
});

//10. function to delete book by id.
const deleteBookById = async (bookId) => {
    try{
        const bookFound = await Book.findOneAndDelete(bookId, {new: true});
        return bookFound;    
    }
    catch (error) {
        console.log('error occured while deleting book ', error);
    }
};

app.post("/books/delete/:bookId", async (req, res) => {
    try{
        const bookDeleteFound = await deleteBookById(req.params.bookId);
        if(bookDeleteFound){
            res.status(200).json({message: 'book deleted successfully', book: bookDeleteFound});
        }else{
            res.status(404).json({error: 'no book found.'});
        }
    }
    catch (error) {
        res.status(500).json({error: `failed to delete book.${error}`});
    }
});