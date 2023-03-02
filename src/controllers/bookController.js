const BookService = require("../services/bookService.js").BookService;

class BookController {

    static async create(req,res){
        if(!req.body) return res.sendStatus(400);
        let image;
        if(!!req.file){
            image = req.file.filename;
        }
        const {name, author, description, tags} = req.body;
        try {
            const book = await BookService.create({name, author, description, tags, image});
            res.json({book});
        }
        catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };

    static async findOne(req, res){
        const {id} = req.params
        if(id.length > 24 || id.length < 24){
            res.sendStatus(400);
        }
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
        let image
        if(!!req.file){
            image = req.file.filename
        }
        const {_id, name, author, description, tags} = req.body;
            try {
                const book = await BookService.update({_id, name, author, description, tags, image});
                if (book) res.json({book});
                else res.sendStatus(404);
            } catch (err){
                console.error(err);
                res.sendStatus(500);
            }
    };

    static async delete(req, res){
        const {id} = req.params
        if(id.length > 24 || id.length < 24){
                res.sendStatus(400);
        }
        try{
            const book = await BookService.delete(id);
            if(book) res.json({book});
            else res.sendStatus(404);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    static async findBook(req, res){
        const {data, typeSearch} = req.query;
        let book;
        try{
            switch (typeSearch){
                case 'author':
                    book = await BookService.findByAuthor(data)
                    break;
                case 'name':
                    book = await BookService.findByName(data);
                    break;
            }
            if(book && !! book.length) res.json({book});
            else res.sendStatus(404);
        } catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };
}

module.exports = { BookController };