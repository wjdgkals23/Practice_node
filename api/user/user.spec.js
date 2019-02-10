const mocha = require("mocha");

const describe = mocha.describe;
const should = require("should");
const app = require("../../app");
const request = require("supertest");

describe('GET /users', () => {
    it('should return 200 status code', (done) => {
        request(app)
            .get('/users') //테스트하고 싶은 api 주소
            .expect(200) //기대하는 응답상태
            .end((err, res) => {
                if(err) throw err;
                res.body.should.be.an.instanceOf(Array).and.have.length(3);
                res.body.map(user => {
                    user.should.have.properties("id","name");
                    user.id.should.be.a.Number();
                    user.name.should.be.a.String();
                });
                done();
            })
    });
})
