const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: '../public/images/profile_default.jpg'
  },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  }
);

const User = mongoose.model('Users', userSchema);
module.exports = User;