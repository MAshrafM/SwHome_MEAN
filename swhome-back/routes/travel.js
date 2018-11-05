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

// get travel requests of users
router.get('/travel/:id/results', (req, res, next) => {
  if(req.isAuthenticated()){
    const travelId = req.params.id;
    
    Travel.findOne({_id: mongoose.Types.ObjectId(travelId)}).then((results) => {
      if(results){
        const {
          beginDate,
          endDate,
          home,
          setting,
          landscape
        } = results;
        
        Home.find({home: home, setting: setting, landscape: landscape}, {_id: 1}).then((homeIds) => {
          Travel.find({beginDate, endDate, _id: {$ne: mongoose.Types.ObjectId(travelId)}, userHome: {$in: homeIds}}).populate('userHome').then((travelPlans) => {
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
    
    Travel.findOneAndUpdate(travelId, updateTravel, {new: true}).then(travel => {
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
    let travelId;
    
    if(!mongoose.Types.ObjectId.isValid(likeId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    Travel.find({$and: [{user: mongoose.Types.ObjectId(req.user._id)}, {active: true}]}, {_id: 1}).exec().then((result) => {
      travelId = result[0]._id;
      Travel.updateOne({_id: travelId}, {$push: {homesLiked: likeId}}).then(() => {
        return res.json({message: 'Like Added'});
      }).catch(err => next(err));
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// dislike plan
router.put('/travel/dislike/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const dislikeId = mongoose.Types.ObjectId(req.params.id);
    let travelId;
    
    if(!mongoose.Types.ObjectId.isValid(dislikeId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Travel.find({$and: [{user: mongoose.Types.ObjectId(req.user._id)}, {active: true}]}, {_id: 1}).exec().then((result) => {
      travelId = result[0]._id;
      Travel.updateOne({_id: travelId}, {$push: {homesDisliked: dislikeId}}).then(() => {
        return res.json({message: 'Dislike Added'});
      }).catch(err => next(err));
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

module.exports = router;