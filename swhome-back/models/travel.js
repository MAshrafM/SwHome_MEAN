const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  userHome: {
    type: Schema.Types.ObjectId,
    ref: 'Homes',
    required: true
  },
  beginDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  homeType: {
    type: String,
    enum: ['Home', 'Apt', 'Both'],
    required: true
  },
  locationType: {
    type: String,
    enum: ['Urban', 'Suburban', 'Rural', 'All'],
    required: true
  },
  settingType: {
    type: String,
    enum: ['Tropical', 'Mountainous', 'City']
  },
  active: {
    type: Boolean,
    default: true
  },
  homesLiked: [{
    type: Schema.Types.ObjectId,
    ref: 'Homes'
  }],
  homesDisliked: [{
    type: Schema.Types.ObjectId,
    ref: 'Homes'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Travel = mongoose.model('Travels', travelSchema);

module.exports = Travel;