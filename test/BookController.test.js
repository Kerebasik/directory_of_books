const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const expect = require('chai').expect

chai.use(chaiHttp);

describe('Testing Api', function (){
    it('GET /books', function(done) {
        chai.request(app)
            .get('/api/books')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(err).to.be.null;
                done();
            });
    });
    it('POST /books', function (done){
        chai.request(app)
            .post('/api/books')
            .send({
                name: "Check my dead",
                author: "Junior Back",
                description: "Dead is my end"
            })
            .end(function (err, res){
                expect(res).to.have.status(200)
                expect(res).to.be.json;
                expect(err).to.be.null;
                done()
            })
    });
    it('PUT /books', function (done){
        chai.request(app)
            .put('/api/books')
            .send({
                _id: "63e10d064e94222145a08cd4",
                name: "Vinter is life2",
                author: "Vinter2",
                description: "Vinter"
            })
            .end(function (err, res){
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                done()
            })
    });
   // it('GET /books/:id',  async function(done){
   //      const book = await Book.create({name:"Test", author:"test", description:"test"})
   //      chai.request(app)
   //          .get('/api/books/' + book._id)
   //          .send(book)
   //          .end((err, res)=>{
   //              expect(res).have.status(200);
   //              expect(res).be.json;
   //              expect(res).body.should.be.a('object');
   //              done();
   //          })
   //  })
})



