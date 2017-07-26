'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../app.js');
const config = require('../config');
const User = require('../models/user').User;

const should = chai.should();
chai.use(chaiHttp);

describe('Wrong API calls', () => {
  describe('GET /index', () => {
    it('it should return 404', done => {
      chai.request(app)
        .get('/index')
        .end((err,res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/index', () => {
    it('it should return 404', done => {
      chai.request(app)
        .get('/api/index')
        .end((err,res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('API without Token', () => {
  describe('GET api/practices', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices/1')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices/1/technologies')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies/:technology_id', () => {
    it('it should return 401', done => {
      chai.request(app)
        .get('/api/practices/1/technologies/1')
        .end((err,res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('API with token', () => {
  let token;

  function getAuthorizationHeaders() {
    return { 'Authorization': token };
  }

  before(done => {
    User.findOne({
      email: 'admin@mail.com'
    }, (err, user) => {
      if (err) {
        done();
      } else {
        token = jwt.sign(
          { _id: user._id },
          config.get('secret'),
          { expiresIn: 60 * 5 }
        );
        done();
      }
    });
  });

  describe('GET api/practices', () => {
    it('it should return 200 and res should be an array', done => {
      chai.request(app)
        .get('/api/practices')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id', () => {
    it('it should return 200 and res should be an array', done => {
      chai.request(app)
        .get('/api/practices/1')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies', () => {
    it('it should return 200 and res should be an array', done => {
      chai.request(app)
        .get('/api/practices/1/technologies')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('GET api/practices/:practice_id/technologies/:technology_id', () => {
    it('it should return 200 and res should be an array', done => {
      chai.request(app)
        .get('/api/practices/1/technologies/1')
        .set(getAuthorizationHeaders())
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

});
