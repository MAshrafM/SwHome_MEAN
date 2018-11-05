const express = require('express');
const mongoose = require('mongoose');
const Match = require('../models/match');

const router = express.Router();

// get all user matches
router.get('/match', (req, res, next) => {
  if(req.isAuthenticated()){
    const user = req.user._id;
    
    Match.find({userRequest1: user, userRequest2: user}).then((matches, err) => {
      if(err){
        res.json(err);
        return;
      }
      
      res.json(matches);
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// create a match
router.post('/match/:id1/:id2', (req, res, next) => {
  if(req.isAuthenticated()){
    const userRequest1 = req.params.id1;
    const userRequest2 = req.params.id2;
    
    const match = new Match({
      userRequest1,
      userRequest2
    });
    
    match.save().then(match => {
      res.json({message: 'Match Added'});
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// accept a match
router.put('/match/accept/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const matchId = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(matchId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Match.findOne({_id: matchId}).then(match => {
      if(!match.confirmed1){
        match.set({confirmed1: true});
        match.save(updatedMatch => {
          return res.json({message: 'Match Confirmed'});
        });
      } else {
        match.set({confirmed2: true});
        match.save(updatedMatch => {
          return res.json({message: 'Match Confirmed'});
        });
      }
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// decline a match
router.put('/match/decline/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const matchId = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(matchId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Match.findOne({_id: matchId}).then(match => {
      if(match.confirmed1){
        match.set({confirmed1: false});
        match.save(updatedMatch => {
          return res.json({message: 'Match Confirmed'});
        });
      } else {
        match.set({confirmed2: false});
        match.save(updatedMatch => {
          return res.json({message: 'Match Confirmed'});
        });
      }
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

module.exports = router;