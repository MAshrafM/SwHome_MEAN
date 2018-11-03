const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {type : Schema.Types.ObjectId, ref: 'Users', required:true},
  home: {type : Schema.Types.ObjectId, ref: 'Homes', required:true},
  rating: {type: Number, required: true},
  comment: {type: String, default: ''}
});

reviewSchema.set('timestamps', true);

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;