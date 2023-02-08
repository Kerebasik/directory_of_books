import Router from "express";
import BookController from "../controllers/BookController.js";



const router = new Router();

router.get('/books', BookController.findAll);

router.get('/books/:id', BookController.findOne);

router.post('/books', BookController.create);

router.delete('/book/:id', BookController.delete);

router.put('/books', BookController.update);

export default router;
