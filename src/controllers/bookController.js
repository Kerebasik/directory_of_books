const BookService = require("../services/bookService.js").BookService;
const fs = require('fs');

class BookController {

    static async create(req,res){
        // #swagger.tags = ['Book']
        /*
                #swagger.requestBody = {
                    required: true,
                        content:{
                            "multipart/form-data": {
                                schema: {
                                    type:'object',
                                    required: ["name", "author"],
                                    properties:{
                                        name:{

                                            type:'string'
                                        },
                                        author:{
                                            type:'string'
                                        },
                                        description:{
                                            type:'string'
                                        },
                                        tags:{
                                            type:'array',
                                            example: [
                                            "tag1","tag2","tag3"
                                            ]
                                        },
                                        image:{
                                            type:'object',
                                            example: "File jpg, png, jpeg"
                                        }
                                    }
                                }
                            }
                        }
                    }
             */
        if(!req.body) return res.sendStatus(400);
        let image;
        if(!!req.file){
            image = req.file.filename;
        }
        const {name, author, description, tags} = req.body;
        if(!name || !author){
            res.sendStatus(400)
        }
        try {
            const book = await BookService.create({name, author, description, tags, image});
            res.status(200).json(book);
            /* #swagger.responses[200] = {
                   schema: { "$ref": "#/definitions/Book" },
            } */
        }
        catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };

    static async findOne(req, res){
        // #swagger.tags = ['Book']
        const {id} = req.params
        if(id.length > 24 || id.length < 24){
            res.sendStatus(400);
        }
        try {
            const book = await BookService.findOne(id);
            if(book) res.json(book);
            else res.sendStatus(404);
            /* #swagger.responses[200] = {
                   schema: { "$ref": "#/definitions/Book" },
            } */
        } catch (err){
            console.log(err);
            res.sendStatus(500);
        }
    };

    static async findAll(req, res){
        // #swagger.tags = ['Book']
        try {
            const book = await BookService.findAll();
            res.status(200).json(book);
            /* #swagger.responses[200] = {
                   schema: {
                   type: "array",
                   "$ref": "#/definitions/Book" }
            } */
        } catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };

    static async update(req, res){
        // #swagger.tags = ['Book']
        /*
                #swagger.requestBody = {
                    required: true,
                        content:{
                            "multipart/form-data": {
                                schema: {
                                    type:'object',
                                    required: ["name", "author"],
                                    properties:{
                                        name:{

                                            type:'string'
                                        },
                                        author:{
                                            type:'string'
                                        },
                                        description:{
                                            type:'string'
                                        },
                                        tags:{
                                            type:'array',
                                            example: [
                                            "tag1","tag2","tag3"
                                            ]
                                        },
                                        image:{
                                            type:'object',
                                            example: "File jpg, png, jpeg"
                                        }
                                    }
                                }
                            }
                        }
                    }
             */
        if(!req.body) return res.sendStatus(400);
        let image
        if(!!req.file){
            image = req.file.filename
        }

        const {_id, name, author, description, tags} = req.body;
            try {
                if(!_id && !name && !author){
                    return res.sendStatus(400)
                }
                const bookData = await BookService.findOne(_id);
                // if(!!bookData[0].image){
                //     fs.unlinkSync(`uploads/${bookData[0].image}`)
                // }
                const book = await BookService.update({_id, name, author, description, tags, image});
                if (book) return res.status(200).json(book);
                /* #swagger.responses[200] = {
                   schema: { "$ref": "#/definitions/Book" },
                } */
                else return  res.sendStatus(404);
            } catch (err){
                console.error(err);
                return res.sendStatus(500);
            }
    };

    static async delete(req, res){
        // #swagger.tags = ['Book']
        const {id} = req.params
        if(id.length > 24 || id.length < 24){
                res.sendStatus(400);
        }
        try{
            const book = await BookService.delete(id);
            fs.unlinkSync(`uploads/${book[0].image}`)
            if(book) res.status(201).json();
            else res.sendStatus(404);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    static async findBook(req, res){
        // #swagger.tags = ['Book']
        /* #swagger.parameters['data'] = {
        in: 'query',
        type:'string',
        description:'Data for search'
} */
        /* #swagger.parameters['typeSearch'] = {
        in: 'query',
        type:'string',
        description:'Author or name'
} */
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
            if(book && !! book.length) res.status(200).json(book);
            /* #swagger.responses[200] = {
                   schema: { "$ref": "#/definitions/Book" },
                } */
            else res.sendStatus(404);
        } catch (err){
            console.error(err);
            res.sendStatus(500);
        }
    };
}

module.exports = { BookController };