const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Home = require('../models/home');
const app = require('../app');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const newHome = new Home({
      owner: new mongoose.mongo.ObjectId(),
      homeType: 'villa',
      locationType: 'coast',
      settingType: 'bedrooms',
      address: {
        street: 'hallow st',
        city: 'castle rock',
        state: 'colorado',
        zipCode: '1111',
      },
      description: 'scary house maybe haunted',
    });
    

// get specific home
describe('/GET home details', () => {
  before((done) => {
    Home.deleteMany({}, (err) => {done();});
  });
  
  it('it should save dummy home', (done) => {
    newHome.save(done);
  })
  
  it('it should get home details', (done) => {
    chai.request(app).get(`/api/myhome/${newHome._id}`).end((err, res) => {
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
      res.body.should.have.property('reviews');
      res.body.homeType.should.equal('villa');
      done();
    });
  });
  
  it('it should update', (done) => {
    chai.request(app).put(`/api/myhome/${newHome._id}`).send({'homeType': 'condo'}).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  
  it('it should be updated', (done) => {
    chai.request(app).get(`/api/myhome/${newHome._id}`).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('homeType');
      res.body.homeType.should.equal('condo');
      done();
    });
  });
  
  it('it should delete', (done) => {
    chai.request(app).delete(`/api/myhome/${newHome._id}`).end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  
});