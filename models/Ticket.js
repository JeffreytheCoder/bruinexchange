const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  course: {
    type: Number,
    required: true,
  },
  lec: {
    type: Number,
  },
  disc: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('ticket', TicketSchema);
