const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  give_course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  get_courses: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: 'course',
      },
    },
  ],
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
