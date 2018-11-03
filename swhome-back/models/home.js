const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
  homeType: {type: String, required: true},
  locationType: {type: String, required: true},
  settingType: {type: String, required: true},
  address: {
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
    country: {type: String, required: true}
  },
  description: {type: String, required: true},
  images: [{
    url: String,
    id: String,
  }],
  reviews: {type : Schema.Types.ObjectId, ref: 'Reviews'}
});

homeSchema.set('timestamps', true);

const Home = mongoose.model('Homes', homeSchema);

module.exports = Home;