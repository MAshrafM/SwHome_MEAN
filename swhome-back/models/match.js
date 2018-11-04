const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  userRequest1: {type : Schema.Types.ObjectId, ref: 'Travels'},
  userRequest2: {type : Schema.Types.ObjectId, ref: 'Travels'},
  confirmed1: {type: Boolean, default: false},
  confirmed2: {type: Boolean, default: false},
  active: {type: Boolean, default: true}
});

matchSchema.set('timestamps', true);

const Match = mongoose.model('Matches', matchSchema);

module.exports = Match;