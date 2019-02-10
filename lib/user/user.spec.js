"use strict";

var mocha = require("mocha");

var describe = mocha.describe;
var should = require("should");
var app = require("../../app");
var request = require("supertest");

describe('GET /users', function () {
    it('should return 200 status code', function (done) {
        request(app).get('/users') //테스트하고 싶은 api 주소
        .expect(200) //기대하는 응답상태
        .end(function (err, res) {
            if (err) throw err;
            res.body.should.be.an.instanceOf(Array).and.have.length(3);
            res.body.map(function (user) {
                user.should.have.properties("id", "name");
                user.id.should.be.a.Number();
                user.name.should.be.a.String();
            });
            done();
        });
    });
});