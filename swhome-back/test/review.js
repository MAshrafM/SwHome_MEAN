const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Home = require('../models/home');
const User = require('../models/user');
const Review = require('../models/review');
const app = require('../app');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const newUser = new User({
  username: 'aaa',
  password: '123456',
  firstName: 'm',
  lastName: 'ashraf',
  email: 'ee.mashraf@gmail.com'
});

const newHome = new Home({
  owner: newUser._id,
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
newHome.save();

const r = {
  user: newUser._id,
  home: newHome._id,
  rating: 4,
  comment: 'nice'
};

const editedReview = {
  rating : 5,
  comment: 'cool'
};

const homeReview = new Review(r);

var cookie;

describe('Test Review Model and Route', () => {
  before((done) => {
    Review.deleteMany({}, (err) => {done();});
  })
  
  it('it should signup and login user', (done) =>{
    chai.request.agent(app).post('/api/signup').send(newUser).end((err, res) =>{
      res.should.have.status(200);
      cookie = res.headers['set-cookie'];
      done();
    })
  });
  
  it('it should post a review', (done) => {
    chai.request(app).post('/api/review').set('cookie', cookie).send(homeReview).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should not post a review without auth', (done) => {
    chai.request(app).post('/api/review').send(homeReview).end((err, res) => {
      res.should.have.status(403);
      res.should.be.json;
      done();
    })
  });
    
  it('it should edit a review', (done) => {
    chai.request(app).put(`/api/review/${homeReview._id}`).set('cookie', cookie).send(editedReview).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should not edit a review without auth', (done) => {
    chai.request(app).put(`/api/review/${homeReview._id}`).send(editedReview).end((err, res) => {
      res.should.have.status(403);
      res.should.be.json;
      done();
    })
  });
  
  it('it should delete a review', (done) => {
    chai.request(app).delete(`/api/review/${homeReview._id}`).set('cookie', cookie).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });
  
  it('it should not delete a review without auth', (done) => {
    chai.request(app).put(`/api/review/${homeReview._id}`).end((err, res) => {
      res.should.have.status(403);
      res.should.be.json;
      done();
    })
  });
  
});