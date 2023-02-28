const express = require("express");
const BookController = require("../controllers/bookController.js").BookController;

const bookRouter = express.Router();

bookRouter.get('/books', BookController.findAll);
bookRouter.get('/books/search', BookController.findBook);
bookRouter.get('/books/:id', BookController.findOne);
bookRouter.post('/books', BookController.create);
bookRouter.delete('/book/:id', BookController.delete);
bookRouter.put('/books', BookController.update);

module.exports = bookRouter;
