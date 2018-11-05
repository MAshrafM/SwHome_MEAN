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
  home: {
    type: String,
    enum: ['House', 'Apt', 'All'],
    required: true
  },
  setting: {
    type: String,
    enum: ['Urban', 'Suburban', 'Rural', 'All'],
    required: true
  },
  landscape: {
    type: String,
    enum: ['Tropical', 'Mountainous', 'City', 'Coastal', 'All'],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  homesLiked: [{
    type: Schema.Types.ObjectId,
    ref: 'Travels'
  }],
  homesDisliked: [{
    type: Schema.Types.ObjectId,
    ref: 'Travels'
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Travel = mongoose.model('Travels', travelSchema);

module.exports = Travel;