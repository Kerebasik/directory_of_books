const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
    openapi: "3.0.3",
    info: {
        version: '1.0.0',      // by default: '1.0.0'
        title: 'REST API BOOK OF DIRECTORY',        // by default: 'REST API'
        description: 'My PET project book of directory',  // by default: ''
    },
    servers:[{ url:"http://localhost:3000/api"}],      // by default: 'localhost:3000'
    schemes: ['http'],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
        {
            name: 'Book',         // Tag name
            description: 'API for book in system',  // Tag description
        },
    ],
    components: {
        '@schemas': {
           Book:{
               type:"object",
               required:['name', 'author'],
               properties:{
                   _id:{
                       type: 'string',
                   },
                   author:{
                       type:'string'
                   },
                   name:{
                       type:'string'
                   },
                   description: {
                       type:'string'
                   },
                   tags:{
                       type:'array',
                       example: [
                           "tag1","tag2","tag3"
                       ]
                   },
                   image:{
                       type:'string'
                   }
               }
           }
        }
    }
};

const outputFile = './src/swagger_output.json'
const endpointsFiles = ['./src/routes/bookRouter.js']

swaggerAutogen(outputFile, endpointsFiles, doc)