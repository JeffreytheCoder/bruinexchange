const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tickets: [
    {
      ticket: {
        type: Schema.Types.ObjectId,
        ref: 'ticket',
      },
    },
  ],
});

module.exports = mongoose.model('user', UserSchema);
