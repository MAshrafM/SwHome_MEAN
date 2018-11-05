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
    
    Home.findById(homeId, '-address.street -_id -createdAt -updatedAt -__v')
    .populate({
      path: 'owner',
      select: 'firstName avatarUrl createdAt -_id'
    })
    .populate({
      path: 'reviews',
      select: '-_id -createdAt -__v -home',
      populate:{
        path: 'user',
        select: 'firstName avatarUrl createdAt -_id'
      }
    }).then((home, err) => {
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