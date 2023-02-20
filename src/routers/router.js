const express = require("express");
const BookController = require("../controllers/BookController.js").BookController;

const router = express.Router();

router.get('/books', BookController.findAll);
router.get('/books/:id', BookController.findOne);
router.get('/books/search', BookController.searched);
router.post('/books', BookController.create);
router.delete('/book/:id', BookController.delete);
router.put('/books', BookController.update);

module.exports = router;
