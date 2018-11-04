const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Travel = require('../models/travel');
const Home = require('../models/home');

const router = express.Router();

// create travel event
router.post('/travel', (req, res, next) => {
  if(req.isAuthenticated()){
    const user = req.user._id;
    let userHome;
    
    const {
      beginDate,
      endDate,
      homeType,
      locationType,
      settingType
    } = req.body;
    
    Home.find({owner: ObjectId(user)}, {owner: 1, _id: 0}).exec().then((result) => {
      userHome = result[0].owner;
      const travelRequest = new Travel({
        user,
        userHome,
        beginDate,
        endDate,
        homeType,
        locationType,
        settingType
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
      homeType : req.body.homeType,
      locationType : req.body.locationType,
      settingType : req.body.settingType
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

module.exports = router;