const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');
const app = require('../app');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const newUser = new User({
  username: 'mashraf',
  password: '123456',
  firstName: 'm',
  lastName: 'ashraf',
  email: 'ee.mashraf@gmail.com'
});

const userParams = {
  username: 'hisho',  password: '123456', firstName: 'h',lastName: 'ashraf', email: 'ee.hashraf@gmail.com'
}

let cookie;

describe('Connect to User Model', () => {
  before((done) => {
    User.deleteMany({}, (err) => {done();});
  });
  
  it('it should save dummy user', (done) => {
    newUser.save(done);
  });  
});

describe('Sign up users', () => {
  
  it('it check required params', (done) => {
    chai.request(app).post('/api/signup')
      .send({username: '',  password: '123456', firstName: 'm',lastName: 'ashraf', email: 'ee.mashraf@gmail.com'})
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message');
        done();
      });
  });
  
  it('it check unique username', (done) => {
    chai.request(app).post('/api/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        });
  });
  
  it('it should add new user', (done) => {
    chai.request(app).post('/api/signup')
      .send(userParams)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('avatarUrl');
        done();
      });
  });
  
});

describe('login', () => {
  
  it('it should return error when no user passed', (done) => {
    chai.request(app).post('/api/login')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        done();
      });
  });
  
  it('it should authenticate local logged in user', (done) => {
    chai.request(app).post('/api/login')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        done();
      });
  });
  
  it('it should login authenticate current logged in user', (done) => {
    chai.request(app).post('/api/login')
      .send(userParams)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        cookie = res.headers['set-cookie'];
        done();
      });
  });
});

describe('private logged in user', () => {
  it('it should check if user is logged in', (done) => {
    chai.request(app)
      .get('/api/private')
      .set('cookie', cookie)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  
  it('it should through error with no authentication cookie', (done) =>{
    chai.request(app)
      .get('/api/private')
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.json;
        done();
      });
  });
});

describe('logout users', () => {
  it('it should logout users', (done) => {
    chai.request(app)
      .post('/api/logout')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        cookie = res.headers['set-cookie'];
        done();
      });
  });
  
  it('it should check if user is logged in', (done) => {
    chai.request(app)
      .get('/api/private')
      .set('cookie', cookie)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.json;
        done();
      });
  });
  
});