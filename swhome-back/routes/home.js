const express = require('express');
const mongoose = require('mongoose');
const Home = require('../models/home');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'homes',
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
})

const parser = multer({storage: storage}).array('file', 10);

const router = express.Router();

// index user homes
router.get('/myhome', (req, res, next) => {
  if(req.isAuthenticated()){
    const userId = req.user._id;
    Home.find({owner: userId}).then((userHomes, err) => {
      if(err){
        res.json(err);
        return;
      }
      res.json(userHomes);
    }).catch(error => next(error));
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});
});

// home details
router.get('/myhome/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const homeId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(homeId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Home.findById(homeId).then((userHome, err) => {
      if(err){
        res.json(err);
        return;
      }
      res.json(userHome);
    }).catch(error => next(error));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'});  
});

// add home
router.post('/myhome', parser, (req, res, next) => {
  if(req.isAuthenticated()){
    const owner = req.user._id;
    const { home, setting, landscape, description, bedrooms, beds, baths } = req.body;
    const parsedAddress = JSON.parse(req.body.address);
    const file = req.files;
    let images = [];
    for(let i = 0; i < file.length; i++){
      let img = {
        url: file[i].url,
        id: file[i].id
      };
      images.push(img);
    }
    
    const address = {
      street: parsedAddress.street,
      city: parsedAddress.city,
      state: parsedAddress.state,
      zipCode: parsedAddress.zipCode,
      country: parsedAddress.country
    }; 
    
    const userHome = new Home({
      owner,
      home,
      setting,
      landscape,
      bedrooms,
      beds,
      baths,
      address,
      description,
      images
    });
    
    userHome.save().then(userHome => {
      res.json({message: 'New Home Added!'});
    }).catch(error => next(error));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'}); 
});

// edit home
router.put('/myhome/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const homeId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(homeId)) {
      res.status(400).json({ message: 'id not found' });
      return;
    }
    
    const homeUpdate = {
      home: req.body.home, 
      setting: req.body.setting, 
      landscape: req.body.landscape,
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      beds: req.body.beds,
      baths: req.body.baths,
      description: req.body.description
    }
    
    Home.findByIdAndUpdate(homeId, homeUpdate, {new: true}).then(home => {
      return res.json({message: 'Home updated!'});
    }).catch(error => next(error));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'}); 
});

// delete home
router.delete('/myhome/:id', (req, res, next) => {
  if(req.isAuthenticated()){
    const homeId = req.params.id;
  
    if(!mongoose.Types.ObjectId.isValid(homeId)){
      res.status(400).json({message: 'id not found'});
      return;
    }
    
    Home.remove({_id: homeId}).then((message) => {
      return res.json({message: 'Home removed!'});
    }).catch(error => next(error));
    
    return;
  }
  
  res.status(403).json({message: 'Unauthorized access'}); 
});

module.exports = router;