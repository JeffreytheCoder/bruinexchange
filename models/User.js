const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  offers: [
    {
      offer: {
        type: Schema.Types.ObjectId,
        ref: 'offer',
      },
    },
  ],
});

module.exports = mongoose.model('user', UserSchema);
