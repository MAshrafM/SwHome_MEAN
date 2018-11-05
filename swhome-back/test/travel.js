const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Home = require('../models/home');
const User = require('../models/user');
const Travel = require('../models/travel');
const app = require('../app');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const newUser = new User({
  username: 'ccc',
  password: '123456',
  firstName: 'm',
  lastName: 'ashraf',
  email: 'ee.mashraf@gmail.com'
});

const newHome = new Home({
  home: 'House',
  setting: 'Urban',
  landscape: 'Coastal',
  address: {
    street: 'hallow st',
    city: 'castle rock',
    state: 'colorado',
    zipCode: '1111',
    country: 'eg'
  },
  description: 'scary house maybe haunted',
});

const newTravel = new Travel({
  beginDate: new Date(),
  endDate: new Date(),
  homeType: 'House',
  locationType: 'Urban',
  settingType: 'City'
})

const editTravel = {
  beginDate: new Date(),
  endDate: new Date(),
  homeType: 'House',
  locationType: 'Rural',
  settingType: 'City'
};

var cookie;

describe('Test Travel Model and Route', () => {
  before((done) => {
    User.deleteMany();
    Home.deleteMany();
    Travel.deleteMany({}, (err) => {done();});
  })
  
  it('it should signup and login user', (done) =>{
    chai.request.agent(app).post('/api/signup').send(newUser).end((err, res) =>{
      res.should.have.status(200);
      cookie = res.headers['set-cookie'];
      done();
    })
  });
  
  it('it should add home', (done) => {
    chai.request(app).post('/api/myhome').set('cookie', cookie).send(newHome).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should post a travel plan', (done) => {
    chai.request(app).post('/api/travel').set('cookie', cookie).send(newTravel).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should not post a travel plan without auth', (done) => {
    chai.request(app).post('/api/travel').send(newTravel).end((err, res) => {
      res.should.have.status(403);
      res.should.be.json;
      done();
    })
  });
    
  it('it should edit a travel plan', (done) => {
    chai.request(app).put(`/api/travel/${newTravel._id}`).set('cookie', cookie).send(editTravel).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should not edit a travel plan without auth', (done) => {
    chai.request(app).put(`/api/travel/${newTravel._id}`).send(editTravel).end((err, res) => {
      res.should.have.status(403);
      res.should.be.json;
      done();
    })
  });
  
  it('it should like a travel plan', (done) => {
    chai.request(app).put(`/api/like/${mongoose.Types.ObjectId()}`).set('cookie', cookie).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should not like a travel plan without auth', (done) => {
    chai.request(app).put(`/api/like/${mongoose.Types.ObjectId()}`).end((err, res) => {
      res.should.have.status(403);
      res.should.be.json;
      done();
    })
  });
  
  it('it should delete a travel plan', (done) => {
    chai.request(app).delete(`/api/travel/${newTravel._id}`).set('cookie', cookie).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should not delete a travel plan without auth', (done) => {
    chai.request(app).put(`/api/travel/${newTravel._id}`).end((err, res) => {
      res.should.have.status(403);
      res.should.be.json;
      done();
    })
  });
  
});