const express = require('express');
const mongoose = require('mongoose');

const Travel = require('../models/travel');
const Home = require('../models/home');

const router = express.Router();

// get travel plans
router.get('/travel', (req, res, next) => {
  if(req.isAuthenticated()){
    const user = req.user._id;
    
    Travel.find({user: mongoose.Types.ObjectId(user)}).then((travels) => {
      return res.json(travels);
    }).catch(err => console.log(err));
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// get travel plan
router.get('/travel/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const travelId = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(travelId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Travel.findById(travelId).then((travel) => {
      return res.json(travel);
    }).catch(err => console.log(err));
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// get travel requests of users
router.get('/travel/results/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const travelId = mongoose.Types.ObjectId(req.params.id);
    
    Travel.findOne({_id: travelId}).then((results) => {
      if(results){
        const {
          beginDate,
          endDate,
          home,
          setting,
          landscape,
          homesLiked,
          homesDisliked
        } = results;
        
        Home.find({home: home, setting: setting, landscape: landscape}, {_id: 1}).then((homeIds) => {
          Travel.find({beginDate, endDate, $and: [{_id: {$ne: travelId}}, {_id: {$nin: homesLiked}}, {_id: {$nin: homesDisliked}}], userHome: {$in: homeIds}}).populate('userHome').then((travelPlans) => {
            return res.json(travelPlans);
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      } else {
        return res.json({message: 'No Travel Plans Found!'});
      }
    }).catch(err => console.log(err));
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// create travel event
router.post('/travel', (req, res, next) => {
  if(req.isAuthenticated()){
    const user = req.user._id;
    let userHome;
    
    const {
      beginDate,
      endDate,
      home,
      setting,
      landscape
    } = req.body;
    
    Home.find({owner: mongoose.Types.ObjectId(user)}, {_id: 1}).exec().then((result) => {
      userHome = result[0]._id;
      const travelRequest = new Travel({
        user,
        userHome,
        beginDate,
        endDate,
        home,
        setting,
        landscape
      });
      travelRequest.save().then(travelRequest => {
        res.json({message: 'Travel Added'});
      }).catch(err => next(err));
    }).catch(err => console.log(err));
    
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// edit travel plan
router.put('/travel/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const travelId = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(travelId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    const updateTravel = {
      beginDate : req.body.beginDate,
      endDate : req.body.endDate,
      home : req.body.home,
      setting : req.body.setting,
      landscape : req.body.landscape
    };
    
    Travel.findOneAndUpdate({ _id: travelId}, updateTravel, {new: true}).then(travel => {
      res.json({message: 'Travel Updated'});
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// delete travel
router.delete('/travel/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const travelId = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(travelId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Travel.deleteOne({_id: travelId}).then(message => {
      return res.json({message: 'Travel Deleted!'});
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// like plan
router.put('/travel/like/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const likeId = mongoose.Types.ObjectId(req.params.id);
    const travelId = mongoose.Types.ObjectId(req.body.id);
    
    if(!mongoose.Types.ObjectId.isValid(likeId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    Travel.findOneAndUpdate({_id: travelId}, {$push: {homesLiked: likeId}}).then((result) => {
      return res.json({message: 'Like Added'});
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// dislike plan
router.put('/travel/dislike/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const dislikeId = mongoose.Types.ObjectId(req.params.id);
    const travelId = mongoose.Types.ObjectId(req.body.id);
    
    if(!mongoose.Types.ObjectId.isValid(dislikeId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Travel.findOneAndUpdate({_id: travelId}, {$push: {homesDisliked: travelId}}).then((result) => {
      return res.json({message: 'Dislike Added'});
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

router.get('/travel/:travelid/matchcheck/:likeid', (req, res, next) =>{
  const travelId = req.params.travelid;
  const likeId = mongoose.Types.ObjectId(req.params.likeid);
  let match = false;
  
  Travel.findById(likeId).then((results) => {
    if(results){
      for(let i = 0; i < results.homesLiked.length; i++){
        if(results.homesLiked[i] == travelId){
          match = true;
          return res.json(match);
        }
      }
    } else {
      return res.json({message: 'No Results!'});
    }
  }).catch(err => next(err));
});

module.exports = router;