const BookService = require("../services/BookService.js").BookService;

class BookController {
    static async create(req,res){
        if(!req.body) return res.sendStatus(400);
        const {name, author, description} = req.body
        try {
            const book = await BookService.create({name, author, description});
            res.send(book);
        }
        catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    }

    static async findOne(req,res){
        const id = req.params.id
        try {
            const book = await BookService.findOne(id);
            if(book) res.sendStatus(200).send(book);
            else res.sendStatus(404);
        } catch (err){
            console.log(err);
            res.sendStatus(500);
        }
    }

    static async findAll(req,res){
        try {
            const book = await BookService.findAll();
            res.send(book)
        } catch (err){
            console.error(err)
            res.sendStatus(500)
        }
    }

    static async update(req,res){
        if(!req.body) return res.sendStatus(400);
        const post = req.body
            try {
                const result = await BookService.update(post);
                if (result) res.send(result);
                else res.sendStatus(404);
            } catch (err){
                console.error(err)
                res.sendStatus(500)
            }
    }

    static async delete(req,res){
        const idBook = req.params.id
        try{
            const result = await BookService.delete(idBook);
            if(result) res.send(result);
            else res.sendStatus(404);
        } catch (err) {
            console.error(err);
            res.sendStatus(500)
        }
    }
}

module.exports = { BookController };