const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/review');
const Home = require('../models/home');

const router = express.Router();

// get all reviews for a home

router.get('/review/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const homeId = req.params.id;
    
    Review.find({home: homeId}).then((homeReviews, err) => {
      if(err){
        res.json(err);
        return;
      }
      
      res.json(homeReviews);
    }).catch(err => next(err));
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// add review
router.post('/review', (req, res, next) => {
  if(req.isAuthenticated()){
    const user = req.user._id;
    let homeReviewId;
    let homeId;
    const {home, rating, comment} = req.body;
    
    const homeReview = new Review({
      user,
      home,
      rating,
      comment
    });
        
    homeReview.save().then(review => {
      homeReviewId = review._id;
      homeId = review.home;
      
      Home.updateOne({_id: homeId}, {$push: {reviews: homeReviewId}}, {new: true}).then(home => {
        res.json({message: 'Review Added!'});
      }).catch(err => {next(err);});
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