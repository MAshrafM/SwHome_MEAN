const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/review');

const router = express.Router();

// add review
router.post('/review', (req, res, next) => {
  if(req.isAuthenticated()){
    const user = req.user._id;
    const {home, rating, comment} = req.body;
    
    const homeReview = new Review({
      user,
      home,
      rating,
      comment
    });
        
    homeReview.save().then(homeReview => {
      res.json({message: 'Review Added!'});
    }).catch(err => {next(err);});
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// edit review
router.put('/review/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const reviewId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(reviewId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    const reviewUpdate = {
      rating: req.body.rating,
      comment: req.body.comment
    };
    Review.findOneAndUpdate(reviewId, reviewUpdate, {new: true}).then(review => {
      res.json({message: 'Review Updated!'});
    }).catch(err => {next(err);});     
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// delete review
router.delete('/review/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const reviewId = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(reviewId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Review.deleteOne({_id: reviewId}).then(message => {
      return res.json({message: 'Review Deleted!'});
    }).catch(err => next(err));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

module.exports = router;