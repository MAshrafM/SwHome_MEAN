const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Home = require('../models/home');
const User = require('../models/user');
const app = require('../app');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const newUser = new User({
  username: 'vvv',
  password: '123456',
  firstName: 'm',
  lastName: 'ashraf',
  email: 'ee.mashraf@gmail.com'
});

const newHome = new Home({
      owner: newUser._id,
      homeType: 'villa',
      locationType: 'coast',
      settingType: 'bedrooms',
      address: {
        street: 'hallow st',
        city: 'castle rock',
        state: 'colorado',
        zipCode: '1111',
        country: 'eg'
      },
      description: 'scary house maybe haunted',
    });

var cookie;    

// get specific home
describe('Test Home Model and Routes', () => {
  before((done) => {
    Home.deleteMany();
    User.deleteMany();
    done();
  });
  
  it('it should signup and login user', (done) =>{
    chai.request.agent(app).post('/api/signup').send(newUser).end((err, res) =>{
      res.should.have.status(200);
      cookie = res.headers['set-cookie'];
      done();
    })
  });
  
  it('it should save dummy home', (done) => {
    newHome.save(done);
  })
  
  it('it should get user homes', (done) => {
    chai.request.agent(app).get('/api/myhome').set('cookie', cookie).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
  
  it('it should get home details', (done) => {
    chai.request.agent(app).get(`/api/myhome/${newHome._id}`).set('cookie', cookie).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('owner');
      res.body.should.have.property('homeType');
      res.body.should.have.property('locationType');
      res.body.should.have.property('settingType');
      res.body.should.have.property('address');
      res.body.should.have.property('description');
      res.body.should.have.property('images');
      res.body.homeType.should.equal('villa');
      done();
    });
  });
  
  it('it should not get home details without auth', (done) => {
     chai.request.agent(app).get(`/api/myhome/${newHome._id}`).end((err, res) => {
       res.should.have.status(403);
       res.should.be.json;
       done();
     });
  });
  
  it('it should update', (done) => {
    chai.request(app).put(`/api/myhome/${newHome._id}`).set('cookie', cookie).send({'homeType': 'condo'}).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  
  it('it should not update without auth', (done) => {
     chai.request.agent(app).put(`/api/myhome/${newHome._id}`).end((err, res) => {
       res.should.have.status(403);
       res.should.be.json;
       done();
     });
  });
  
  it('it should be updated', (done) => {
    chai.request(app).get(`/api/myhome/${newHome._id}`).set('cookie', cookie).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('homeType');
      res.body.homeType.should.equal('condo');
      done();
    });
  });
  
  it('it should delete', (done) => {
    chai.request(app).delete(`/api/myhome/${newHome._id}`).set('cookie', cookie).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  
  it('it should not delete without auth', (done) => {
     chai.request.agent(app).delete(`/api/myhome/${newHome._id}`).end((err, res) => {
       res.should.have.status(403);
       res.should.be.json;
       done();
     });
  });
  
});