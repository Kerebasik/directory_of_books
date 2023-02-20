const BookService = require("../services/BookService.js").BookService;

class BookController {

    static async create(req,res){
        if(!req.body) return res.sendStatus(400);
        const {name, author, description} = req.body;
        try {
            const book = await BookService.create({name, author, description});
            res.json({book});
        }
        catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };

    static async findOne(req, res){
        const {id} = req.params
        try {
            const book = await BookService.findOne(id);
            if(book) res.json({book});
            else res.sendStatus(404);
        } catch (err){
            console.log(err);
            res.sendStatus(500);
        }
    };

    static async findAll(req, res){
        try {
            const book = await BookService.findAll();
            res.json({book});
        } catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };

    static async update(req, res){
        if(!req.body) return res.sendStatus(400);
        const {post} = req.body
            try {
                const result = await BookService.update(post);
                if (result) res.json({result});
                else res.sendStatus(404);
            } catch (err){
                console.error(err);
                res.sendStatus(500);
            }
    };

    static async delete(req, res){
        const {id} = req.params
        try{
            const result = await BookService.delete(id);
            if(result) res.send(result);
            else res.sendStatus(404);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    static async search(req, res){
        const {name} = req.query;
        try{
            const result = await BookService.findName(name)
            if(result && !!result.length) res.send(result);
            else res.sendStatus(404);
        } catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };
}

module.exports = { BookController };