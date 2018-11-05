const express = require('express');
const mongoose = require('mongoose');
const Home = require('../models/home');

const router = express.Router();

router.get('/home-details/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const homeId = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(homeId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Home.findById(homeId, {_id: 0, createdAt: 0, updatedAt: 0}).then((home, err) => {
      if(err){
        res.json(err);
        return;
      }
      
      res.json(home);
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

module.exports = router;