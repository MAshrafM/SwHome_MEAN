const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

const router = express.Router();

router.get('/myaccount', (req, res, next) => {
  if(req.isAuthenticated()){
    
    User.findById({_id: req.user._id}, {password: 0, created_at: 0, updated_at: 0}).then((user, err) => {
      if(err){
        res.json(err);
        return;
      }
      
      res.json(user);
    }).catch(err => next(err));
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

module.exports = router;